import re
import sys
from collections import Counter
from pathlib import Path
from zipfile import ZipFile

from lxml import etree


DOC = Path(r"C:\Users\dungl\Downloads\NCKH\_bmad-output\FRS Hệ thống quản lý hoạt động NCKH cấp trường - Dự thảo.docx")
NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
W = "{%s}" % NS["w"]

with ZipFile(DOC) as z:
    document = etree.fromstring(z.read("word/document.xml"))
    styles = etree.fromstring(z.read("word/styles.xml"))


def text(node):
    return "".join(node.itertext()).strip()


def cell_text(cell):
    return "".join(t.text or "" for t in cell.findall(".//w:t", NS)).strip()


errors = []
full_text = "\n".join(t.text or "" for t in document.findall(".//w:t", NS))
for banned in ("ngân hàng câu hỏi", "ghép đề thi", "tổ chức thi", "chấm điểm tự động"):
    if banned in full_text.lower():
        errors.append(f"Residual text: {banned}")

tables = document.findall(".//w:tbl", NS)
req_codes = []
us_codes = []
headers_ok = 0
rows_total = 0
rows_nosplit = 0
for tbl in tables:
    rows = tbl.findall("w:tr", NS)
    if not rows:
        continue
    rows_total += len(rows)
    if rows[0].find("w:trPr/w:tblHeader", NS) is not None:
        headers_ok += 1
    rows_nosplit += sum(1 for r in rows if r.find("w:trPr/w:cantSplit", NS) is not None)
    first = [cell_text(c) for c in rows[0].findall("w:tc", NS)]
    if first[:2] == ["Mã YC", "Tên chức năng"]:
        for row in rows[1:]:
            cells = row.findall("w:tc", NS)
            if cells:
                code = cell_text(cells[0])
                if re.fullmatch(r"UC-[A-Z]+-\d+", code):
                    req_codes.append(code)
    if first[:2] == ["Mã US", "UCTQ"]:
        for row in rows[1:]:
            cells = row.findall("w:tc", NS)
            if len(cells) > 1:
                us_codes.append(cell_text(cells[1]))

if len(req_codes) != 73 or len(set(req_codes)) != 73:
    errors.append(f"Requirements={len(req_codes)}, unique={len(set(req_codes))}")
if "UC-TR-01" in req_codes or "UC-TR-01" not in full_text:
    errors.append("UC-TR-01 scope handling invalid")
if len(us_codes) != 19 or len(set(us_codes)) != 19:
    errors.append(f"UCTQ user stories={len(us_codes)}, unique={len(set(us_codes))}")
if headers_ok != len(tables):
    errors.append(f"Repeating headers={headers_ok}/{len(tables)}")
if rows_nosplit != rows_total:
    errors.append(f"No-split rows={rows_nosplit}/{rows_total}")

# All non-heading body/table content inherits 13 pt (26 half-points) or has 26 directly.
style_sizes = {}
for st in styles.findall("w:style", NS):
    sid = st.get(W + "styleId")
    sz = st.find("w:rPr/w:sz", NS)
    style_sizes[sid] = sz.get(W + "val") if sz is not None else None
for sid in ("Normal", "ListParagraph", "TOC1", "TOC2", "TOC3"):
    if style_sizes.get(sid) != "26":
        errors.append(f"Style {sid} size={style_sizes.get(sid)}")

direct_sizes = Counter(x.get(W + "val") for x in document.findall(".//w:rPr/w:sz", NS))
allowed = {"26", "28", "30", "34", "36", "44"}
unexpected = sorted(set(direct_sizes) - allowed)
if unexpected:
    errors.append(f"Unexpected direct font sizes={unexpected}")

section_count = len(document.findall(".//w:sectPr", NS))
print({
    "tables": len(tables), "rows": rows_total, "sections": section_count,
    "requirements": len(req_codes), "uctq_user_stories": len(us_codes),
    "header_flags": headers_ok, "no_split_rows": rows_nosplit,
    "direct_font_sizes_half_points": dict(direct_sizes), "errors": errors,
})
sys.exit(1 if errors else 0)
