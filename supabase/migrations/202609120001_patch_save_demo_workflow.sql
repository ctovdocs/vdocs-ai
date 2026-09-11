-- save_demo_workflow (full-state replace) sends and validates the ENTIRE workflow
-- tree on every save, even a single doctor note — ~100 patients' full clinical
-- histories over the wire and through validation for one note. save_demo_workflow
-- keeps working exactly as before (seed / legacy-migration write-back / client
-- fallback still use it); this adds save_demo_workflow_patch, which the client's
-- hot path (dispatchWorkflow) now calls instead: it accepts only the records that
-- actually changed (see src/services/workflowDiff.ts) and applies them to the
-- stored jsonb with targeted jsonb_set/append/prepend/upsert operations under the
-- same advisory lock + expected_revision optimistic-concurrency check. Validation
-- scope shrinks with it — from every patient/record in the whole tree to just the
-- handful of records present in the patch.

create or replace function public.jsonb_array_upsert(arr jsonb, item jsonb, key text default 'id')
returns jsonb language sql immutable as $$
  select case
    when arr is null then jsonb_build_array(item)
    when exists (select 1 from jsonb_array_elements(arr) e where e->>key = item->>key)
      then (select jsonb_agg(case when e->>key = item->>key then item else e end) from jsonb_array_elements(arr) e)
    else arr || jsonb_build_array(item)
  end
$$;

create or replace function public.jsonb_array_append(arr jsonb, items jsonb)
returns jsonb language sql immutable as $$
  select coalesce(arr, '[]'::jsonb) || coalesce(items, '[]'::jsonb)
$$;

create or replace function public.jsonb_array_prepend(arr jsonb, items jsonb)
returns jsonb language sql immutable as $$
  select coalesce(items, '[]'::jsonb) || coalesce(arr, '[]'::jsonb)
$$;

create or replace function public.save_demo_workflow_patch(target_hospital uuid, expected_revision bigint, patch jsonb)
returns void language plpgsql security definer set search_path = '' as $$
declare
  actual_revision bigint;
  state jsonb;
  rec jsonb;
  history_patch jsonb;
  history_idx int;
  target_history jsonb;
  group_name text;
begin
  if not exists (select 1 from public.hospital_memberships where user_id = auth.uid() and hospital_id = target_hospital) then
    raise exception 'Hospital membership required' using errcode = '42501';
  end if;
  perform pg_advisory_xact_lock(hashtextextended(target_hospital::text, 0));
  select revision, demo_workflow_state.state into actual_revision, state from public.demo_workflow_state where hospital_id = target_hospital for update;
  if coalesce(actual_revision, -1) <> expected_revision then
    raise exception 'Workflow changed; reload before saving' using errcode = '40001';
  end if;
  if state is null then
    raise exception 'No workflow state to patch; seed the workflow first' using errcode = 'PATCH1';
  end if;
  if patch->>'hospital_id' is distinct from target_hospital::text or (patch->>'schema_version')::integer is distinct from 1
    or (patch->>'revision')::bigint is distinct from expected_revision + 1 then
    raise exception 'Invalid workflow scope or revision';
  end if;

  if patch ? 'patients' then
    if exists (
      select 1 from jsonb_array_elements(patch->'patients') as p
      where p->>'hospital_id' is distinct from target_hospital::text
         or not exists (select 1 from public.demo_patients dp where dp.id = (p->>'id')::uuid and dp.hospital_id = target_hospital)
    ) then raise exception 'Patient outside hospital scope'; end if;
    for rec in select * from jsonb_array_elements(patch->'patients') loop
      state := jsonb_set(state, array['patients'], public.jsonb_array_upsert(state->'patients', rec));
    end loop;
  end if;

  for group_name in select unnest(array['discharges', 'handovers']) loop
    if patch ? group_name then
      if exists (
        select 1 from jsonb_array_elements(patch->group_name) as r
        where r->>'hospital_id' is distinct from target_hospital::text
           or not exists (select 1 from public.demo_patients dp where dp.id = (r->>'patient_id')::uuid and dp.hospital_id = target_hospital)
      ) then raise exception 'Clinical record outside hospital scope'; end if;
      for rec in select * from jsonb_array_elements(patch->group_name) loop
        state := jsonb_set(state, array[group_name], public.jsonb_array_upsert(state->group_name, rec));
      end loop;
    end if;
  end loop;

  if patch ? 'reports' and patch->'reports' ? 'upsert' then
    if exists (
      select 1 from jsonb_array_elements(patch->'reports'->'upsert') as r
      where r->>'hospital_id' is distinct from target_hospital::text
         or not exists (select 1 from public.demo_patients dp where dp.id = (r->>'patient_id')::uuid and dp.hospital_id = target_hospital)
    ) then raise exception 'Clinical record outside hospital scope'; end if;
    for rec in select * from jsonb_array_elements(patch->'reports'->'upsert') loop
      state := jsonb_set(state, array['reports'], public.jsonb_array_upsert(state->'reports', rec));
    end loop;
  end if;
  if patch ? 'reports' and patch->'reports' ? 'order' then
    state := jsonb_set(state, array['reports'], (
      select coalesce(jsonb_agg(e order by array_position(array(select jsonb_array_elements_text(patch->'reports'->'order')), e->>'id')), '[]'::jsonb)
      from jsonb_array_elements(state->'reports') e
    ));
  end if;

  if patch ? 'histories' then
    for history_patch in select * from jsonb_array_elements(patch->'histories') loop
      select ord - 1 into history_idx
      from jsonb_array_elements(state->'histories') with ordinality as h(elem, ord)
      where h.elem->'context'->>'patient_id' = history_patch->>'patient_id';

      if history_patch ? 'full' then
        if history_patch->'full'->'context'->>'hospital_id' is distinct from target_hospital::text
           or not exists (select 1 from public.demo_patients dp where dp.id = (history_patch->>'patient_id')::uuid and dp.hospital_id = target_hospital)
        then raise exception 'History outside hospital scope'; end if;
        if history_idx is null then
          state := jsonb_set(state, array['histories'], (state->'histories') || jsonb_build_array(history_patch->'full'));
        else
          state := jsonb_set(state, array['histories', history_idx::text], history_patch->'full');
        end if;
        continue;
      end if;

      if history_idx is null then
        raise exception 'Patch target not found' using errcode = 'PATCH1';
      end if;

      if exists (
        select 1 from unnest(array['encounters', 'orders', 'requests', 'work_items', 'notes', 'timeline']) as grp
        cross join lateral jsonb_array_elements(coalesce(history_patch->grp, '[]'::jsonb)) as nested
        where nested->>'hospital_id' is distinct from target_hospital::text
           or nested->>'patient_id' is distinct from history_patch->>'patient_id'
      ) then raise exception 'History record outside scope'; end if;

      target_history := state->'histories'->history_idx;
      if history_patch ? 'encounters' then
        for rec in select * from jsonb_array_elements(history_patch->'encounters') loop
          target_history := jsonb_set(target_history, array['encounters'], public.jsonb_array_upsert(target_history->'encounters', rec));
        end loop;
      end if;
      if history_patch ? 'orders' then
        for rec in select * from jsonb_array_elements(history_patch->'orders') loop
          target_history := jsonb_set(target_history, array['orders'], public.jsonb_array_upsert(target_history->'orders', rec));
        end loop;
      end if;
      if history_patch ? 'requests' then
        for rec in select * from jsonb_array_elements(history_patch->'requests') loop
          target_history := jsonb_set(target_history, array['requests'], public.jsonb_array_upsert(target_history->'requests', rec));
        end loop;
      end if;
      if history_patch ? 'work_items' then
        for rec in select * from jsonb_array_elements(history_patch->'work_items') loop
          target_history := jsonb_set(target_history, array['work_items'], public.jsonb_array_upsert(target_history->'work_items', rec));
        end loop;
      end if;
      if history_patch ? 'notes' then
        target_history := jsonb_set(target_history, array['notes'], public.jsonb_array_append(target_history->'notes', history_patch->'notes'));
      end if;
      if history_patch ? 'timeline' then
        target_history := jsonb_set(target_history, array['timeline'], public.jsonb_array_prepend(target_history->'timeline', history_patch->'timeline'));
      end if;
      state := jsonb_set(state, array['histories', history_idx::text], target_history);
    end loop;
  end if;

  if patch ? 'reviews' then
    state := jsonb_set(state, array['reviews'], coalesce(state->'reviews', '{}'::jsonb) || patch->'reviews');
  end if;
  if patch ? 'update_receipts' then
    state := jsonb_set(state, array['update_receipts'], coalesce(state->'update_receipts', '{}'::jsonb) || patch->'update_receipts');
  end if;

  state := jsonb_set(state, array['commands'], public.jsonb_array_append(state->'commands', coalesce(patch->'commands', '[]'::jsonb)));
  state := jsonb_set(state, array['audit'], public.jsonb_array_append(state->'audit', coalesce(patch->'audit', '[]'::jsonb)));
  state := jsonb_set(state, array['revision'], to_jsonb(expected_revision + 1));

  insert into public.demo_workflow_state(hospital_id, revision, state, updated_by)
    values (target_hospital, expected_revision + 1, state, auth.uid())
    on conflict (hospital_id) do update set revision = excluded.revision, state = excluded.state, updated_by = excluded.updated_by, updated_at = now();
end;
$$;

revoke all on function public.save_demo_workflow_patch(uuid, bigint, jsonb) from public, anon;
grant execute on function public.save_demo_workflow_patch(uuid, bigint, jsonb) to authenticated;
