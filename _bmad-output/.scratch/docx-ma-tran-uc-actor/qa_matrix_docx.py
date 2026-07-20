from pathlib import Path
import re
from docx import Document
from docx.enum.section import WD_ORIENT
from docx.oxml.ns import qn


ROOT = Path(r"C:\Users\dungl\Downloads\NCKH")
SOURCE = ROOT / "_bmad-output" / "planning-artifacts" / "danh-muc-use-case-chi-tiet-va-doi-chieu-tong-quan.md"
DOCX = ROOT / "_bmad-output" / "planning-artifacts" / "ma-tran-use-case-actor.docx"


def source_rows():
    text = SOURCE.read_text(encoding="utf-8")
    block = text[text.index("## 3. Ma trận use case – actor"):text.index("## 4. Ghi chú phạm vi")]
    rows = []
    for line in block.splitlines():
        if re.match(r"^\| UC-[A-Z]+-\d+ \|", line):
            rows.append([cell.strip() for cell in line.strip().strip("|").split("|")])
    return rows


expected = source_rows()
doc = Document(DOCX)
assert len(doc.tables) == 1, f"Expected 1 table, got {len(doc.tables)}"
table = doc.tables[0]
assert len(table.rows) == 73, f"Expected 73 rows, got {len(table.rows)}"
assert len(table.columns) == 9, f"Expected 9 columns, got {len(table.columns)}"
actual = [[cell.text.strip() for cell in row.cells] for row in table.rows[1:]]
assert len(expected) == len(actual) == 72
for index, (src, dst) in enumerate(zip(expected, actual), start=1):
    assert src == dst, f"Mismatch at row {index}: {src!r} != {dst!r}"
    assert any(cell == "✓" for cell in dst[2:]), f"No actor tick at row {index}"
section = doc.sections[0]
assert section.orientation == WD_ORIENT.LANDSCAPE
assert section.page_width > section.page_height
header_tr_pr = table.rows[0]._tr.get_or_add_trPr()
assert header_tr_pr.find(qn("w:tblHeader")) is not None, "Header row is not repeating"
assert all(row.height is None for row in table.rows), "Found fixed table row height"
print("PASS: 72 source rows match DOCX exactly")
print("PASS: 1 table, 73 rows including header, 9 columns")
print("PASS: every use case has at least one actor tick")
print("PASS: A4 landscape section and repeating table header")
