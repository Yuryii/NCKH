from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path
import re
import zipfile

from docx import Document
from docx.oxml import OxmlElement


ROOT = Path(__file__).resolve().parents[2]
DOCS = ROOT / "docs"


def set_paragraph_text(paragraph, text: str) -> None:
    """Replace text while retaining the formatting of the first run."""
    if paragraph.runs:
        paragraph.runs[0].text = text
        for run in paragraph.runs[1:]:
            run.text = ""
    else:
        paragraph.add_run(text)


def replace_all(document: Document, replacements: dict[str, str]) -> set[str]:
    found: set[str] = set()
    for paragraph in document.paragraphs:
        old = paragraph.text.strip()
        if old in replacements:
            set_paragraph_text(paragraph, replacements[old])
            found.add(old)
    for table in document.tables:
        for row in table.rows:
            for cell in row.cells:
                for paragraph in cell.paragraphs:
                    old = paragraph.text.strip()
                    if old in replacements:
                        set_paragraph_text(paragraph, replacements[old])
                        found.add(old)
    return found


def mark_table_header(row) -> None:
    tr_pr = row._tr.get_or_add_trPr()
    if tr_pr.find("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tblHeader") is None:
        tr_pr.append(OxmlElement("w:tblHeader"))


sources = [
    p
    for p in DOCS.glob("*.docx")
    if "01" in p.name
    and "02" in p.name
    and not p.name.startswith("~$")
    and "Hoàn thiện" not in p.name
]
if not sources:
    raise SystemExit("Không tìm thấy DOCX đặc tả Bước 01–02.")

source = max(sources, key=lambda p: p.stat().st_mtime)
output = DOCS / f"{source.stem} - Hoàn thiện.docx"
doc = Document(source)

replacements = {
    "Phiên bản": "Phiên bản",
    "1.0": "1.1 — Bản hoàn thiện có kiểm soát giả định",
    "25 use case của Bước 01 và Bước 02; áp dụng cho đề tài Giảng viên và Sinh viên.":
        "26 use case của Bước 01 và Bước 02; áp dụng cho đề tài Giảng viên và Sinh viên.",
    "Tài liệu đặc tả mục tiêu, tiền/hậu điều kiện, luồng xử lý, ngoại lệ và quy tắc nghiệp vụ cho hai bước đầu của quy trình NCKH. Các use case dùng chung về phân quyền, form/PDF, thông báo và truy vết được viện dẫn như yêu cầu xuyên suốt, không tách thành đặc tả riêng trong tài liệu này.":
        "Tài liệu đặc tả mục tiêu, tiền/hậu điều kiện, luồng xử lý, ngoại lệ và quy tắc nghiệp vụ cho hai bước đầu của quy trình NCKH. Các use case dùng chung về phân quyền, form/PDF và truy vết được viện dẫn như yêu cầu xuyên suốt, không tách thành đặc tả riêng. Chi tiết chưa được nguồn xác nhận được ghi rõ là Cần xác minh và không được coi là yêu cầu bắt buộc để triển khai.",
    "Các quy tắc đã được thay thế trong brainstorming không được dùng: không yêu cầu 100% phiếu; không có P.KHCN mở lại quyền nộp phiếu sau chốt; Thư ký là thành viên đánh giá và vẫn lập biên bản.":
        "Các quy tắc đã được thay thế trong brainstorming không được dùng: không yêu cầu 100% phiếu; không có P.KHCN mở lại quyền nộp phiếu sau chốt; Thư ký là thành viên đánh giá và vẫn lập biên bản. Mọi quy tắc về hạn mức đề tài, lệnh cấm, hạn nộp tuyến đầu, kênh thông báo và trạng thái hủy chỉ áp dụng sau khi được stakeholder xác nhận.",
    "3. Hệ thống kiểm tra lệnh cấm và điều kiện khởi tạo tối thiểu.":
        "3. Hệ thống kiểm tra điều kiện khởi tạo tối thiểu đã được cấu hình; bộ điều kiện chi tiết cần xác minh.",
    "A1 — Bị cấm: Hệ thống từ chối tạo hồ sơ và nêu thời điểm hết cấm (nếu có).":
        "A1 — Không đạt điều kiện khởi tạo: Hệ thống từ chối tạo và nêu điều kiện chưa đạt; quy tắc hạn chế/cấm đăng ký cần xác minh.",
    "Đề tài giao trực tiếp chỉ được chọn trong danh mục của đợt; trạng thái Nháp không giữ chỗ.":
        "Đề tài giao trực tiếp được chọn trong danh mục của đợt; thời điểm giữ chỗ và xử lý cạnh tranh cần xác minh.",
    "Hạn mức tối đa hai đề tài được kiểm tra quyết định ở thời điểm nộp hợp lệ.":
        "Cần xác minh có áp dụng hạn mức số đề tài hay không, đối tượng tính hạn mức và thời điểm kiểm tra.",
    "3. Hệ thống kiểm tra lệnh cấm và điều kiện khởi tạo.":
        "3. Hệ thống kiểm tra điều kiện khởi tạo đã được cấu hình; bộ điều kiện chi tiết cần xác minh.",
    "A1 — Thiếu giảng viên hướng dẫn: Không thể hoàn tất tạo hồ sơ đủ điều kiện nộp; hệ thống yêu cầu gán Giảng viên hướng dẫn.":
        "A1 — Thiếu Giảng viên hướng dẫn: Hồ sơ có thể lưu nháp nhưng không đủ điều kiện nộp; hệ thống yêu cầu gán Giảng viên hướng dẫn trước khi nộp.",
    "4. Hệ thống ghi phiên bản dữ liệu và lịch sử thay đổi.":
        "4. Hệ thống lưu dữ liệu và dấu vết cập nhật theo chính sách truy vết được xác nhận.",
    "A2 — Đợt hết hạn: Hệ thống khóa sửa và nộp lại đối với hồ sơ chưa hoàn tất.":
        "A2 — Đợt hết hạn: Cách xử lý quyền sửa/nộp lại của hồ sơ nháp hoặc bị trả cần xác minh.",
    "Bất kỳ chỉnh sửa nào sau khi bị trả làm BM01 đã ký trước đó mất hiệu lực; phải sinh, ký và tải lại BM01.":
        "Khi hồ sơ bị trả và dữ liệu BM01 thay đổi, cần tạo bản BM01/PDF mới để nộp lại; cơ chế đánh dấu hiệu lực phiên bản cần xác minh.",
    "2. Hệ thống đối chiếu trùng lặp người tham gia trong cùng hồ sơ.":
        "2. Hệ thống kiểm tra tính đầy đủ và trùng lặp dữ liệu thành viên trong cùng hồ sơ.",
    "3. Hệ thống kiểm tra lệnh cấm và khả năng tham gia theo hạn mức.":
        "3. Hệ thống kiểm tra các điều kiện tham gia đã được cấu hình; hạn mức và quy tắc hạn chế cần xác minh.",
    "A1 — Thành viên bị cấm: Hệ thống không cho lưu thành viên đó.":
        "A1 — Thành viên không đạt điều kiện: Hệ thống nêu điều kiện chưa đạt; danh mục điều kiện cần xác minh.",
    "A2 — Vượt hạn mức: Hệ thống chỉ cảnh báo ở lúc cập nhật; chặn quyết định khi nộp hợp lệ.":
        "A2 — Vi phạm quy tắc tham gia: Cách cảnh báo hoặc chặn cần được xác định sau khi chốt quy tắc hạn mức.",
    "Hạn mức tối đa hai áp dụng cho Chủ nhiệm và mọi thành viên nghiên cứu; không áp dụng cho Giảng viên hướng dẫn của hồ sơ sinh viên.":
        "Cần xác minh hạn mức số đề tài, phạm vi áp dụng cho Chủ nhiệm/thành viên và việc loại trừ Giảng viên hướng dẫn.",
    "3. Hệ thống kiểm tra lệnh cấm của mọi người tham gia.":
        "3. Hệ thống kiểm tra điều kiện tham gia của các cá nhân theo quy tắc đã được phê duyệt.",
    "4. Hệ thống tính hạn mức hai đề tài trên mọi người tham gia.":
        "4. Nếu stakeholder xác nhận có hạn mức, hệ thống tính hạn mức theo đối tượng và cách tính được chốt.",
    "Hồ sơ Quá hạn, Không được chọn hoặc trả sửa không thể nộp lại do hết hạn không chiếm hạn mức.":
        "Cần xác minh các trạng thái được tính/không tính vào hạn mức nếu quy tắc hạn mức được áp dụng.",
    "Giảng viên tính chung hạn mức giữa tuyển chọn và giao trực tiếp.":
        "Cần xác minh có tính chung hạn mức giữa tuyển chọn và giao trực tiếp hay không.",
    "5. Hệ thống gửi thông báo chuông cho người xét duyệt phù hợp và người đăng ký.":
        "5. Hệ thống cập nhật hàng chờ xử lý; kênh, nội dung và người nhận thông báo cần xác minh.",
    "A1 — Đợt đã hết hạn: Hệ thống từ chối nộp, kể cả khi hồ sơ từng nộp đúng hạn rồi bị trả sửa.":
        "A1 — Đợt đã hết hạn: Quyền nộp lần đầu và nộp lại hồ sơ bị trả cần xác minh theo chính sách thời hạn.",
    "Thông báo chuông dùng cho nộp, trả, duyệt, quá hạn và không được chọn.":
        "Các sự kiện, người nhận, kênh và nội dung thông báo ngoài thông báo gia hạn biên bản cần xác minh.",
    "A1 — Đợt hết hạn: Hệ thống không cho duyệt; hồ sơ chờ xét duyệt chuyển Quá hạn.":
        "A1 — Đợt hết hạn khi hồ sơ đang chờ duyệt: Trạng thái và quyền xử lý tiếp cần xác minh.",
    "A1 — Hết hạn: Hệ thống không cho trả sửa; hồ sơ chuyển Quá hạn.":
        "A1 — Hết hạn khi đang xét duyệt: Quyền trả sửa và trạng thái tiếp theo cần xác minh.",
    "A2 — Đề tài giao trực tiếp đã có chủ nhiệm: Hệ thống không cho duyệt hồ sơ đó và chuyển trạng thái Không được chọn – đề tài đã có chủ nhiệm.":
        "A2 — Có nhiều hồ sơ cho cùng đề tài giao trực tiếp: Quy tắc chọn, giữ chỗ và trạng thái hồ sơ còn lại cần xác minh.",
    "Hồ sơ giao trực tiếp giữ chỗ theo thời điểm Trưởng đơn vị duyệt sớm nhất, không theo thời điểm tạo/nộp.":
        "Cần xác minh mốc giữ chỗ và quy tắc xử lý cạnh tranh đối với đề tài giao trực tiếp.",
    "A1 — Quá hạn: Hệ thống chặn nộp lại và hồ sơ không tiếp tục xử lý.":
        "A1 — Quá hạn: Quyền nộp lại và trạng thái kết thúc cần xác minh.",
    "Không được sửa/nộp lại sau hạn đợt, kể cả hồ sơ đã nộp lần đầu đúng hạn.":
        "Chính sách sửa/nộp lại sau hạn đợt chưa được chốt và cần stakeholder xác nhận.",
    "A1 — Hồ sơ chưa được duyệt: Hệ thống không cho dùng chức năng này.":
        "A1 — Hồ sơ không thuộc trạng thái được yêu cầu hủy: Hệ thống từ chối; danh sách trạng thái được phép cần xác minh.",
    "Người đăng ký không tự rút hồ sơ đã nộp; chỉ P.KHCN xử lý yêu cầu hủy.":
        "Yêu cầu hủy do Chủ nhiệm gửi và P.KHCN xử lý; quyền hủy theo từng trạng thái cần xác minh.",
    "3. Nếu chấp thuận, P.KHCN nhập thông tin thời hạn cấm (nếu áp dụng).":
        "3. Nếu chấp thuận, P.KHCN cập nhật trạng thái hủy theo quy tắc được xác nhận.",
    "A1 — Hủy đề tài giao trực tiếp: Khi chấp thuận, đề tài không được mở lại cho Giảng viên khác trong cùng đợt.":
        "A1 — Hủy đề tài giao trực tiếp: Việc mở lại đề tài cho hồ sơ khác trong cùng đợt cần xác minh.",
    "Người bị cấm không được tham gia bất kỳ hồ sơ nào, kể cả làm thành viên; hết hạn cấm hệ thống tự gỡ.":
        "Cần xác minh có áp dụng lệnh cấm đăng ký/tham gia hay không, phạm vi, thời hạn và cơ chế gỡ bỏ.",
    "6. Hệ thống gửi thông báo kết quả cho Chủ nhiệm.":
        "6. Hệ thống cập nhật kết quả để Chủ nhiệm tra cứu; cơ chế thông báo chủ động cần xác minh.",
    "5. Hệ thống gửi thông báo chuông cho Thư ký kèm hạn mới.":
        "5. Hệ thống gửi thông báo cho Thư ký kèm hạn mới; kênh thông báo cần xác minh.",
    "5. Hệ thống gửi thông báo cho Sinh viên.":
        "5. Hệ thống cập nhật kết quả để Sinh viên tra cứu; cơ chế thông báo chủ động cần xác minh.",
    "4. Hệ thống mở form, đổi trạng thái và gửi thông báo cho Sinh viên.":
        "4. Hệ thống mở form, đổi trạng thái để Sinh viên tiếp tục xử lý; cơ chế thông báo chủ động cần xác minh.",
    "5. Hệ thống gửi thông báo cho Giảng viên.":
        "5. Hệ thống cập nhật kết quả để Giảng viên tra cứu; cơ chế thông báo chủ động cần xác minh.",
    "4. Hệ thống mở form, lưu lịch sử và gửi thông báo.":
        "4. Hệ thống mở form và lưu lịch sử; cơ chế thông báo chủ động cần xác minh.",
    "5. Hệ thống chuyển hồ sơ về đúng actor xét duyệt và gửi thông báo.":
        "5. Hệ thống chuyển hồ sơ về đúng actor xét duyệt; cơ chế thông báo chủ động cần xác minh.",
    "5. Hệ thống lưu kết quả và gửi thông báo cho Chủ nhiệm.":
        "5. Hệ thống lưu kết quả để Chủ nhiệm tra cứu; cơ chế thông báo chủ động cần xác minh.",
    "4. Hệ thống gửi thông báo cho Thư ký.":
        "4. Hệ thống cập nhật trạng thái để Thư ký tiếp tục xử lý; cơ chế thông báo chủ động cần xác minh.",
    "2. Giảng viên nhập lý do/yêu cầu chỉnh sửa bắt buộc.":
        "2. Giảng viên nhập lý do/yêu cầu chỉnh sửa; tính bắt buộc của trường này cần xác minh.",
    "2. Trưởng đơn vị nhập lý do/yêu cầu chỉnh sửa bắt buộc.":
        "2. Trưởng đơn vị nhập lý do/yêu cầu chỉnh sửa; tính bắt buộc của trường này cần xác minh.",
    "2. Chủ nhiệm nhập lý do bắt buộc.":
        "2. Chủ nhiệm nhập lý do yêu cầu hủy; tính bắt buộc cần xác minh.",
    "4. Nếu từ chối, P.KHCN nhập lý do bắt buộc.":
        "4. Nếu từ chối, P.KHCN nhập lý do; tính bắt buộc cần xác minh.",
    "Bộ trường cấu hình đợt, trạng thái đợt và quy tắc sửa trước/sau công bố.":
        "Bộ trường cấu hình đợt, trạng thái đợt, quy tắc sửa trước/sau công bố và thời điểm đóng tự động.",
    "Định dạng tệp, dung lượng tối đa, quy ước tên tệp và cơ chế đối chiếu PDF đã ký với snapshot dữ liệu.":
        "Định dạng tệp, dung lượng tối đa, quy ước tên tệp, tiêu chí nhận biết PDF đã ký và cơ chế đối chiếu PDF với snapshot dữ liệu.",
    "Tiêu chí cụ thể để phân công đề tài cho Hội đồng và cách gán các chức danh trong Hội đồng.":
        "Bộ trường Hội đồng, tiêu chí phân công đề tài, cách gán Chủ tịch/Thư ký/thành viên và phạm vi được sửa trước mốc chốt.",
    "Bộ trạng thái kết luận BM03 cho từng đề tài, nhất là nhánh không thực hiện và quan hệ với yêu cầu hủy đang chờ xử lý.":
        "Bộ trạng thái kết luận BM03 cho từng đề tài, nhất là nhánh không thực hiện và quan hệ với yêu cầu hủy đang chờ xử lý.",
    "Đợt còn mở; người dùng có vai trò Giảng viên; không bị cấm đăng ký.":
        "Đợt đã công bố và còn mở; người dùng có vai trò Giảng viên. Các điều kiện hạn chế khác cần xác minh.",
    "Hồ sơ BM01A ở trạng thái Nháp; chưa chiếm hạn mức và chưa giữ chỗ đề tài giao trực tiếp.":
        "Hồ sơ BM01A ở trạng thái Nháp; chưa chuyển vào tuyến xét duyệt. Cách tính hạn mức/giữ chỗ cần xác minh.",
    "Đợt tuyển chọn còn mở; Sinh viên không bị cấm đăng ký.":
        "Đợt tuyển chọn đã công bố và còn mở; người dùng có vai trò Sinh viên. Các điều kiện hạn chế khác cần xác minh.",
    "Ghi nhận đầy đủ Chủ nhiệm và thành viên nghiên cứu trong BM01.":
        "Ghi nhận Chủ nhiệm và thông tin nhóm nghiên cứu theo BM01; cấu trúc dữ liệu chi tiết cần đối chiếu mẫu được phê duyệt.",
    "Cho người đăng ký biết chính xác hồ sơ có thể nộp hợp lệ hay không.":
        "Cho người đăng ký biết hồ sơ có đáp ứng các điều kiện nộp đã được cấu hình hay không.",
    "Ghi nhận yêu cầu hủy một đề tài đã duyệt tuyến đầu để P.KHCN xử lý.":
        "Ghi nhận yêu cầu hủy hồ sơ/đề tài để P.KHCN xử lý theo trạng thái được phép; phạm vi trạng thái cần xác minh.",
    "Người dùng là Chủ nhiệm; hồ sơ đã được duyệt tuyến đầu; chưa có kết quả hủy trước đó.":
        "Người dùng là Chủ nhiệm; hồ sơ thuộc trạng thái được phép yêu cầu hủy; danh sách trạng thái cần xác minh.",
    "Yêu cầu có kết quả; nếu chấp thuận hồ sơ/đề tài dừng theo trạng thái quy định và có thể ghi thời hạn cấm.":
        "Yêu cầu hủy có kết quả; nếu chấp thuận hồ sơ/đề tài chuyển trạng thái theo quy tắc được xác nhận.",
    "Yêu cầu hủy; lệnh cấm đăng ký":
        "Yêu cầu hủy; lịch sử xử lý",
}

found = replace_all(doc, replacements)

# Append the remaining unresolved decisions under section 8 using the same body style.
body_style = doc.paragraphs[-1].style
additional_open_points = [
    "Điều kiện nộp cụ thể của BM01A/B, gồm quy tắc hạn mức số đề tài và quy tắc hạn chế/cấm tham gia (nếu có).",
    "Cấu trúc dữ liệu nhóm nghiên cứu, kiểm tra trùng lặp và phạm vi áp dụng điều kiện đối với Chủ nhiệm, thành viên và Giảng viên hướng dẫn.",
    "Chính sách thời hạn đối với hồ sơ đang chờ duyệt, hồ sơ bị trả sửa và việc nộp lại sau khi đợt hết hạn.",
    "Quyền yêu cầu hủy theo từng trạng thái, trạng thái sau xử lý, và quy tắc đối với đề tài giao trực tiếp sau khi hủy.",
    "Mốc giữ chỗ và cách xử lý nhiều hồ sơ cùng chọn một đề tài giao trực tiếp.",
    "Kênh, nội dung, người nhận và danh sách sự kiện thông báo; riêng thông báo gia hạn biên bản cho Thư ký đã được xác nhận.",
    "Mã trạng thái đầy đủ cho hồ sơ, BM01, BM02, tập phiếu, BM03 và các phiên bản PDF/chữ ký.",
]
for item in additional_open_points:
    paragraph = doc.add_paragraph(style=body_style)
    set_paragraph_text(paragraph, item)

# Only these tables have a semantic column-header row. The 25 two-column
# metadata blocks are definition lists and must not be marked as headers.
for table_index in (0, 1, 2, 29):
    mark_table_header(doc.tables[table_index].rows[0])

doc.core_properties.title = "Đặc tả use case Bước 01 và Bước 02 - Hệ thống NCKH"
doc.core_properties.subject = "26 use case áp dụng cho đề tài Giảng viên và Sinh viên"
doc.core_properties.version = "1.1"
doc.core_properties.modified = datetime.now(timezone.utc)
doc.save(output)

# Structural shipping checks.
with zipfile.ZipFile(output) as package:
    bad_member = package.testzip()
    if bad_member:
        raise RuntimeError(f"DOCX package is corrupt at {bad_member}")

reopened = Document(output)
all_text = "\n".join(
    [p.text for p in reopened.paragraphs]
    + [cell.text for table in reopened.tables for row in table.rows for cell in row.cells]
)
use_case_ids = re.findall(r"\bUC-(?:DK|HD|PH|CHOT|BB)-\d{2}\b", all_text)
unique_use_case_ids = sorted(set(use_case_ids))
if len(unique_use_case_ids) != 26:
    raise RuntimeError(f"Expected 26 use cases, found {len(unique_use_case_ids)}: {unique_use_case_ids}")

unsupported_assertions = [
    "Hạn mức tối đa hai đề tài được kiểm tra quyết định",
    "Hạn mức tối đa hai áp dụng",
    "không bị cấm đăng ký",
    "thời hạn cấm (nếu áp dụng)",
    "giữ chỗ theo thời điểm Trưởng đơn vị duyệt sớm nhất",
    "Thông báo chuông dùng cho",
    "Giảng viên nhập lý do/yêu cầu chỉnh sửa bắt buộc",
    "Trưởng đơn vị nhập lý do/yêu cầu chỉnh sửa bắt buộc",
    "Chủ nhiệm nhập lý do bắt buộc",
]
remaining = [phrase for phrase in unsupported_assertions if phrase in all_text]
if remaining:
    raise RuntimeError(f"Unsupported assertions remain: {remaining}")

print(f"SOURCE={source}")
print(f"OUTPUT={output}")
print(f"REPLACEMENTS_FOUND={len(found)}")
print(f"REPLACEMENTS_TOTAL={len(replacements)}")
print(f"USE_CASE_COUNT={len(unique_use_case_ids)}")
print(f"TABLE_COUNT={len(reopened.tables)}")
missing = sorted(set(replacements) - found)
if missing:
    print("MISSING_REPLACEMENTS:")
    for item in missing:
        print(item)
