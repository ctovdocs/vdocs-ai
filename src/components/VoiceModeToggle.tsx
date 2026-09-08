import { Segmented, Tooltip } from 'antd';
import { AudioOutlined, ThunderboltFilled } from '@ant-design/icons';
import { useVoiceMode } from '../lib/voiceMode';

export function VoiceModeToggle() {
  const [mode, setMode] = useVoiceMode();
  return <Tooltip title={mode === 'live' ? 'Live dictation — text appears as you speak' : 'Push-to-talk — hold the mic, speak, release'}>
    <Segmented size="small" className="voice-mode-toggle" value={mode} onChange={value => setMode(value as typeof mode)}
      options={[
        { value: 'pushToTalk', icon: <AudioOutlined />, label: 'Push-to-talk' },
        { value: 'live', icon: <ThunderboltFilled />, label: 'Live' },
      ]} />
  </Tooltip>;
}
