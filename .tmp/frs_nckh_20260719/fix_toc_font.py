from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

from lxml import etree


SRC = Path(r"C:\Users\dungl\Downloads\NCKH\_bmad-output\FRS Hệ thống quản lý hoạt động NCKH cấp trường - Dự thảo.docx")
TMP = SRC.with_suffix(".fontfix.docx")
NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
W = "{%s}" % NS["w"]


def ensure(parent, tag):
    node = parent.find(f"w:{tag}", NS)
    if node is None:
        node = etree.SubElement(parent, W + tag)
    return node


with ZipFile(SRC, "r") as zin, ZipFile(TMP, "w", ZIP_DEFLATED) as zout:
    for info in zin.infolist():
        data = zin.read(info.filename)
        if info.filename == "word/styles.xml":
            root = etree.fromstring(data)
            for style in root.findall("w:style", NS):
                sid = style.get(W + "styleId")
                if sid in {"TOC1", "TOC2", "TOC3"}:
                    rpr = ensure(style, "rPr")
                    ensure(rpr, "sz").set(W + "val", "26")
                    ensure(rpr, "szCs").set(W + "val", "26")
                    fonts = ensure(rpr, "rFonts")
                    for attr in ("ascii", "hAnsi", "eastAsia", "cs"):
                        fonts.set(W + attr, "Arial")
            data = etree.tostring(root, xml_declaration=True, encoding="UTF-8", standalone="yes")
        elif info.filename == "word/document.xml":
            root = etree.fromstring(data)
            for p in root.findall(".//w:p", NS):
                ps = p.find("w:pPr/w:pStyle", NS)
                if ps is None or ps.get(W + "val") not in {"TOC1", "TOC2", "TOC3"}:
                    continue
                ppr = p.find("w:pPr", NS)
                if ppr is not None:
                    para_rpr = ppr.find("w:rPr", NS)
                    if para_rpr is None:
                        para_rpr = etree.SubElement(ppr, W + "rPr")
                    ensure(para_rpr, "sz").set(W + "val", "26")
                    ensure(para_rpr, "szCs").set(W + "val", "26")
                for run in p.findall(".//w:r", NS):
                    rpr = run.find("w:rPr", NS)
                    if rpr is None:
                        rpr = etree.Element(W + "rPr")
                        run.insert(0, rpr)
                    ensure(rpr, "sz").set(W + "val", "26")
                    ensure(rpr, "szCs").set(W + "val", "26")
                    fonts = ensure(rpr, "rFonts")
                    for attr in ("ascii", "hAnsi", "eastAsia", "cs"):
                        fonts.set(W + attr, "Arial")
            data = etree.tostring(root, xml_declaration=True, encoding="UTF-8", standalone="yes")
        zout.writestr(info, data)

TMP.replace(SRC)
print(SRC)
