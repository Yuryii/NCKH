# FRS template distillation contract

- Reference: `C:\Users\dungl\Downloads\FRS_Mau.docx`
- SHA-256: `0B8E41A1229D2842569D3C264E7AD7BAFFD0F769EE922D582217160EF94C3A95`
- Reference structure: 1 A4 portrait section, 83 body paragraphs, 17 tables, dynamic TOC content control, PAGE and NUMPAGES footer fields.
- Page system: A4 portrait (8.27 x 11.69 in); margins left 1.25 in, right 1.00 in, top/bottom 1.00 in. Added wide-data sections may use A4 landscape with the same margins and must return to portrait.
- Typography: Arial from document defaults. User override: Normal, List Paragraph, captions, notes, and every table cell are 13 pt. Heading 1/2/3 and cover roles remain larger than 13 pt to preserve hierarchy.
- Heading roles: Heading 1 for chapters; Heading 2 for numbered sections/modules; Heading 3 for module subsections. All navigation headings must use real heading styles.
- Tables: reuse the source blue-header/light-border visual language; fixed DXA geometry, repeating header rows, expandable row height, vertically centered cells, and no split rows.
- Components to preserve: source styles/theme, page dimensions, margins, header/footer relationships, page-number fields, confidentiality wording, metadata/history pattern, priority/status definitions, and confirmation table pattern.
- Editable content: all body content is rewritten for the NCKH FRS. Source placeholder text and examination-system examples must be removed.
- New content: 6 chapters, 14 functional modules, 73 in-scope UC requirements, 6 NFR groups, traceability matrices, open-issues appendix, and confirmation block.
- Package preservation: preserve styles, theme, numbering, settings where compatible, headers, footers, relationships, and core package parts. Body XML, TOC cache/bookmarks, and section layout may change as required by the user-approved structure.
- Fidelity gates: source file remains byte-identical; final document opens in Word; TOC/page fields update; body/table font size is 13 pt; all wide tables fit landscape sections; all pages render without clipping or overlap.
- Rendering note: LibreOffice is not available in the environment. Use installed Microsoft Word to update fields/export PDF, then rasterize the PDF for full-page visual QA. If automation fails, perform structural OOXML QA and disclose the limitation.
