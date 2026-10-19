# VDocs architecture report

- [Architecture PDF](VDocs_Architecture.pdf): 26-page A4 report in a formal paper format, with abstract, contents, numbered sections, equations, 11 vector figures, limitations and references.
- [Editable Markdown source](VDocs_Architecture.md): the report content, including Mermaid versions of the diagrams.
- [PDF builder](../../scripts/build-architecture-pdf.py): reproduces the PDF from the Markdown source and checks page overflow.

The presentation follows the user-supplied `AI-AVC-5.pdf`. Its speech research and performance claims are not used as VDocs evidence. Current implementation is described against repository baseline `7dd2f79`; production and shared-hospital deployment sections are explicitly proposed work. Cost examples retain the date and assumptions from the existing cost guide.

To rebuild, use Python with PyMuPDF installed:

```sh
python3 -m pip install PyMuPDF
python3 scripts/build-architecture-pdf.py
```

Explicit page-break comments preserve the layout. If a page overflows after an edit, shorten/reorganize its content or adjust the layout in the builder. Diagram drawing specifications are in `GRAPHS`; keep them consistent with the Mermaid source. The generated PDF contains selectable text, vector figures, section bookmarks and clickable reference links.
