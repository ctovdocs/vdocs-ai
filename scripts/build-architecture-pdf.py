#!/usr/bin/env python3
"""Build the VDocs paper-style architecture PDF from its Markdown source.

Requires PyMuPDF (import fitz). No cloud access, browser, or LaTeX required.
"""
from pathlib import Path
import math
import re
import fitz

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs/architecture/VDocs_Architecture.md"
OUTPUT = SOURCE.with_suffix(".pdf")
W, H = 595.276, 841.89
LEFT, RIGHT, TOP, BOTTOM = 72, 72, 74, 773
WIDTH = W - LEFT - RIGHT
FONT, BOLD, MONO = "tiro", "tibo", "cour"
SIZE, LEADING = 11.5, 15

# Each diagram is vector artwork; rows establish reading order.
GRAPHS = {
    "current": ([ ["React clinical workspace"], ["Reads and command hooks", "AI / voice / insurer HTTP"], ["Workflow store + command engine", "Vite / Vercel server handlers"], ["Browser storage / Supabase", "External model / speech providers"] ], [(0,1),(0,2),(1,3),(2,4),(3,5),(4,6)]),
    "records": ([["Hospital"],["Patient", "Encounter / admission"],["Orders and reports", "Requests and tasks"],["Discharge + summary", "Handover source snapshots"]],[(0,1),(1,2),(2,3),(2,4),(2,5),(2,6)]),
    "commands": ([["Page sends a typed command"],["Store adds UUID, actor and time"],["Engine checks scope, version and transition"],["Persist under Web Lock or revision check"],["Refresh workflow query / show error"]],[(0,1),(1,2),(2,3),(3,4)]),
    "orders": ([["Place lab / imaging investigation"],["Pending or processing order"],["Publish validated source report"],["Order completed; report linked"],["Clinician explicitly reviews result"]],[(0,1),(1,2),(2,3),(3,4)]),
    "referral": ([["Request received"],["Receiving specialist accepts"],["Assessment in progress"],["Completed response"],["Requesting team reviews response"]],[(0,1),(1,2),(2,3),(3,4)]),
    "discharge": ([["Active IPD admission; start planning"],["Resolve investigations / requests / review gaps"],["Save summary; obtain doctor sign-off"],["Save clinical readiness"],["Recheck blockers and complete discharge"]],[(0,1),(1,2),(2,3),(3,4)]),
    "handover": ([["Select shift and eligible patients"],["Capture sources + draft each patient"],["Review next actions and escalation"],["Refresh changed sources before approval"],["Outgoing approval; incoming readback"]],[(0,1),(1,2),(2,3),(3,4)]),
    "ai": ([["Brief or chart question"],["Browser supplies chart context"],["Server prompt and provider adapter"],["Provider JSON; citation-ID filtering"],["Clinician reads answer and opens evidence"]],[(0,1),(1,2),(2,3),(3,4)]),
    "voice": ([["Push-to-talk", "Live dictation"],["WAV to server transcription", "Token; browser to speech WebSocket"],["Original transcript", "Recovered streaming transcript"],["Conservative cleanup + validation"],["Review / recover / insert into form"]],[(0,2),(1,3),(2,4),(3,5),(4,6),(5,6),(6,7)]),
    "production": ([["React frontend + verified identity"],["Trusted clinical API and tenant policy"],["Normalized PostgreSQL", "Internal AI service"],["Private documents + audit", "Provider adapters"],["Outbox + jobs + hospital / payer integrations"]],[(0,1),(1,2),(1,3),(2,4),(3,5),(2,6)]),
    "shared": ([["Hospitals 1 to 5: isolated access"],["One server: HTTPS, frontend, API and jobs"],["One PostgreSQL database", "One private document bucket"],["Paid AI API, on demand", "Backups and basic monitoring"]],[(0,1),(1,2),(1,3),(1,4),(2,5)]),
}


def clean(text):
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = text.replace("**", "").replace("`", "")
    for src, dst in [("₹", "INR "), ("→", " -> "), ("×", " x "), ("≥", ">="), ("≤", "<="), ("∈", " in "), ("∧", " and "), ("∅", "empty")]:
        text = text.replace(src, dst)
    return text


def width(text, size=SIZE, font=FONT):
    return fitz.get_text_length(text, fontname=font, fontsize=size)


def wrap(text, max_width=WIDTH, size=SIZE, font=FONT):
    lines, line = [], ""
    for word in clean(text).split():
        candidate = (line + " " + word).strip()
        if line and width(candidate, size, font) > max_width:
            lines.append(line)
            line = word
        else:
            line = candidate
        if width(line, size, font) > max_width + .5:
            raise ValueError(f"Unbreakable text exceeds column: {line}")
    if line:
        lines.append(line)
    return lines


class Paper:
    def __init__(self):
        self.doc = fitz.open()
        self.page = None
        self.y = TOP
        self.bookmarks = []
        self.figure_no = 0

    def new_page(self):
        self.page = self.doc.new_page(width=W, height=H)
        self.y = TOP
        n = str(len(self.doc))
        self.page.insert_text(((W-width(n,11))/2,H-37),n,fontname=FONT,fontsize=11)

    def room(self, height):
        if self.y + height > BOTTOM:
            raise ValueError(f"Page {len(self.doc)} overflows: y={self.y:.1f}, next={height:.1f}")

    def line(self, text, x, y, font=FONT, size=SIZE, justify=False, max_width=WIDTH):
        text=clean(text)
        words=text.split()
        if justify and len(words)>1:
            gap=(max_width-sum(width(word,size,font) for word in words))/(len(words)-1)
            if gap < width(" ",size,font)*2.6:
                for word in words:
                    self.page.insert_text((x,y),word,fontname=font,fontsize=size)
                    x+=width(word,size,font)+gap
                return
        self.page.insert_text((x,y),text,fontname=font,fontsize=size)

    def paragraph(self, text, *, size=SIZE, font=FONT, indent=0, centered=False, gap=8):
        lines=wrap(text,WIDTH-indent,size,font)
        lead=LEADING*size/SIZE
        self.room(len(lines)*lead+gap)
        for i,line in enumerate(lines):
            x=(W-width(line,size,font))/2 if centered else LEFT+indent
            self.line(line,x,self.y+size,font,size,justify=not centered and i<len(lines)-1,max_width=WIDTH-indent)
            self.y+=lead
        self.y+=gap

    def heading(self,text,level=1):
        size=17.2 if level==1 else 14.3
        space=3 if self.y==TOP else 10
        lines=wrap(text,WIDTH,size,BOLD)
        self.room(space+len(lines)*size*1.2+12)
        self.y+=space
        for line in lines:
            self.line(line,LEFT,self.y+size,BOLD,size)
            self.y+=size*1.2
        self.y+=10
        if level==1:
            self.bookmarks.append([1,clean(text),len(self.doc)])

    def bullet(self,text):
        lines=wrap(text,WIDTH-17)
        self.room(len(lines)*LEADING+5)
        self.line("•",LEFT+1,self.y+SIZE)
        for line in lines:
            self.line(line,LEFT+17,self.y+SIZE)
            self.y+=LEADING
        self.y+=5

    def equation(self,text):
        self.paragraph(text,size=10.8,font=MONO,centered=True,gap=12)

    def table(self,rows):
        n=len(rows[0])
        ratios={2:[.34,.66],3:[.26,.35,.39],4:[.32,.22,.23,.23]}.get(n,[1/n]*n)
        cols=[WIDTH*r for r in ratios]
        size=9.4 if n>2 else 10.2
        for index,row in enumerate(rows):
            cells=[wrap(cell,cols[i]-12,size,BOLD if index==0 else FONT) for i,cell in enumerate(row)]
            height=max(map(len,cells))*size*1.28+12
            self.room(height+8)
            if index==0:
                self.page.draw_rect(fitz.Rect(LEFT,self.y,LEFT+WIDTH,self.y+height),color=None,fill=(.95,.95,.95))
            x=LEFT
            for i,cell in enumerate(cells):
                for k,line in enumerate(cell):
                    self.line(line,x+6,self.y+7+size+k*size*1.28,BOLD if index==0 else FONT,size)
                x+=cols[i]
            self.page.draw_line((LEFT,self.y+height),(LEFT+WIDTH,self.y+height),color=(.35,.35,.35),width=.35)
            self.y+=height
        self.y+=13

    def figure(self,key,caption):
        rows,edges=GRAPHS[key]
        row_height,box_height=41,29
        height=len(rows)*row_height+17
        self.room(height+42)
        nodes=[]
        for r,row in enumerate(rows):
            bw=(WIDTH-16*(len(row)-1))/len(row)
            for c,label in enumerate(row):
                x=LEFT+c*(bw+16)
                rect=fitz.Rect(x,self.y+r*row_height,x+bw,self.y+r*row_height+box_height)
                nodes.append((rect,label))
        for a,b in edges:
            ra,rb=nodes[a][0],nodes[b][0]
            start=fitz.Point((ra.x0+ra.x1)/2,ra.y1)
            end=fitz.Point((rb.x0+rb.x1)/2,rb.y0)
            self.page.draw_line(start,end,color=(.28,.28,.28),width=.7)
            angle=math.atan2(end.y-start.y,end.x-start.x)
            for offset in [-.45,.45]:
                tip=fitz.Point(end.x-5*math.cos(angle+offset),end.y-5*math.sin(angle+offset))
                self.page.draw_line(tip,end,color=(.28,.28,.28),width=.7)
        for rect,label in nodes:
            self.page.draw_rect(rect,color=(.2,.2,.2),fill=(.97,.97,.97),width=.7)
            lines=wrap(label,rect.width-10,9.2,BOLD)
            if len(lines)>2:raise ValueError(f"Diagram label too long: {label}")
            for i,line in enumerate(lines):
                self.line(line,rect.x0+(rect.width-width(line,9.2,BOLD))/2,rect.y0+(box_height-len(lines)*11)/2+8+i*11,BOLD,9.2)
        self.y+=height
        self.figure_no+=1
        self.paragraph(f"Figure {self.figure_no}: {caption}",size=10.2,centered=True,gap=13)

    def contents(self,sections):
        self.heading("Contents")
        self.y+=8
        for page_no,text in sections:
            size=11.4
            n=str(page_no)
            self.room(23)
            self.line(text,LEFT,self.y+size,BOLD if not re.match(r"\d+\.\d",text) else FONT,size)
            self.line(n,W-RIGHT-width(n,size),self.y+size,FONT,size)
            start=LEFT+width(text,size,BOLD)+12
            end=W-RIGHT-width(n,size)-10
            if start<end:
                dots="."*int((end-start)/width(". ",9))
                self.line(" ".join(dots),start,self.y+size,FONT,9)
            self.y+=23

    def render(self,chunk):
        lines=chunk.strip().splitlines()
        i=0
        while i<len(lines):
            s=lines[i].strip()
            if not s or s.startswith("<!--"):
                i+=1;continue
            if s.startswith("# "):
                i+=1;continue
            if s.startswith("```mermaid"):
                block=[];i+=1
                while i<len(lines) and not lines[i].startswith("```"):
                    block.append(lines[i]);i+=1
                meta=next(x for x in block if "%% figure:" in x)
                key,caption=meta.split("%% figure:",1)[1].strip().split(" | ",1)
                self.figure(key,caption);i+=1;continue
            if s.startswith("```"):
                block=[];i+=1
                while i<len(lines) and not lines[i].startswith("```"):
                    block.append(lines[i]);i+=1
                for line in block:self.equation(line)
                i+=1;continue
            if s.startswith("| "):
                rows=[]
                while i<len(lines) and lines[i].strip().startswith("|"):
                    row=[clean(c.strip()) for c in lines[i].strip().strip("|").split("|")]
                    if not all(re.fullmatch(r"[-: ]+",c) for c in row):rows.append(row)
                    i+=1
                self.table(rows);continue
            if s.startswith("## "):
                self.heading(s[3:]);i+=1;continue
            if s.startswith("### "):
                self.heading(s[4:],2);i+=1;continue
            if s.startswith("- "):
                self.bullet(s[2:]);i+=1;continue
            p=[s];i+=1
            while i<len(lines) and lines[i].strip() and not lines[i].startswith(("#","|","- ","```","<!--")):
                p.append(lines[i].strip());i+=1
            self.paragraph(" ".join(p))


def build():
    chunks=SOURCE.read_text().split("<!-- PAGEBREAK -->")
    paper=Paper()
    toc=[]
    for n,chunk in enumerate(chunks,1):
        first=re.search(r"^## (.+)$",chunk,re.M)
        if first:toc.append((n,first[1]))
    for n,chunk in enumerate(chunks,1):
        paper.new_page()
        if n==1:
            paper.y=92
            paper.paragraph("VDocs: An AI-Assisted Clinical Workflow Architecture for Patient-Centric Hospital Operations",size=20.2,centered=True,gap=17)
            paper.paragraph("System Architecture and Production Evolution",size=12,centered=True,gap=5)
            paper.paragraph("19 October 2026  |  Source baseline: 7dd2f79",size=10.5,centered=True,gap=28)
            paper.paragraph("Abstract",font=BOLD,centered=True,gap=9)
            paper.render(chunk)
        elif "<!-- CONTENTS -->" in chunk:
            paper.contents(toc)
        else:
            paper.render(chunk)
    paper.doc.set_metadata({"title":"VDocs: An AI-Assisted Clinical Workflow Architecture","author":"VDocs","subject":"Current implementation, clinical flows and proposed production architecture","keywords":"VDocs, architecture, clinical workflow, AI, hospital, TypeScript, AWS","creator":"VDocs architecture document builder / PyMuPDF"})
    paper.doc.set_toc([[1,"Abstract",1],[1,"Contents",2],*paper.bookmarks])
    for label,target in re.findall(r"\[([^\]]+)\]\((https?://[^)]+)\)",SOURCE.read_text()):
        for page in paper.doc:
            for rect in page.search_for(clean(label)):
                page.insert_link({"kind":fitz.LINK_URI,"from":rect,"uri":target})
    paper.doc.save(OUTPUT,garbage=4,deflate=True)
    print(f"Created {OUTPUT.relative_to(ROOT)}: {len(paper.doc)} pages; {paper.figure_no} vector figures")


if __name__=="__main__":
    build()
