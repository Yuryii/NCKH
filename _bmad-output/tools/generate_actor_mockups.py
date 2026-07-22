#!/usr/bin/env python3
"""Generate the seven non-student actor mockup suites from explicit page schemas."""

from __future__ import annotations

import argparse
import html
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MOCKUPS = ROOT / "_bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups"

NAV = {
    "gv": ["Việc cần làm", "Thông báo", "Đợt đăng ký", "Xét duyệt", "Đề tài NCKH", "Hồ sơ cá nhân"],
    "td": ["Việc cần làm", "Thông báo", "Xét duyệt", "Đề tài NCKH", "Hồ sơ cá nhân"],
    "pk": ["Việc cần làm", "Thông báo", "Đợt đăng ký", "Đề tài NCKH", "Hội đồng", "Hồ sơ cá nhân"],
    "ct": ["Việc cần làm", "Thông báo", "Hội đồng của tôi", "Hồ sơ cá nhân"],
    "tv": ["Việc cần làm", "Thông báo", "Hội đồng của tôi", "Hồ sơ cá nhân"],
    "tk": ["Việc cần làm", "Thông báo", "Hội đồng của tôi", "Hồ sơ cá nhân"],
    "qt": ["Việc cần làm", "Thông báo", "Tài khoản", "Yêu cầu vai trò", "Hồ sơ cá nhân"],
}

ACTORS = {
    "gv": ("giang-vien", "Giảng viên", "Khoa Công nghệ · vai trò hiện hành", "LN", "Lan Nguyễn"),
    "td": ("truong-don-vi", "Trưởng Khoa/Trưởng đơn vị", "Khoa Công nghệ", "HT", "Hoàng Trần"),
    "pk": ("p-khcn", "P.KHCN", "Phòng Khoa học Công nghệ", "DN", "Dũng Nguyễn"),
    "ct": ("chu-tich-hoi-dong", "Chủ tịch Hội đồng", "HĐNT-2026-006 · được phân công", "DN", "Dũng Nguyễn"),
    "tv": ("thanh-vien-hoi-dong", "Thành viên Hội đồng", "HĐNT-2026-006 · được phân công", "HH", "Hùng Hoàng"),
    "tk": ("thu-ky-hoi-dong", "Thư ký Hội đồng", "HĐNT-2026-006 · được phân công", "MM", "Mai Minh"),
    "qt": ("quan-tri-vien", "Quản trị viên", "Quản trị Tài khoản", "QA", "Quỳnh Anh"),
}
TASK_COUNTS = {"gv": 3, "td": 5, "pk": 8, "ct": 2, "tv": 1, "tk": 2, "qt": 4}


def page(actor, filename, codes, title, lead, *, kind="list", active=None, visibility="assigned", rows=(), actions=(), gates=(), upload="none", fields=(), tabs=()):
    return dict(actor=actor, filename=filename, codes=codes, title=title, lead=lead, kind=kind,
                active=active or NAV[actor][0], visibility=visibility, rows=list(rows), actions=list(actions),
                gates=list(gates), upload=upload, fields=list(fields), tabs=list(tabs))


def row(row_id, title, meta, status, *, state="open", scope="assigned"):
    return dict(id=row_id, title=title, meta=meta, status=status, state=state, scope=scope)


def action(action_id, label, *, branch="primary", target="page", require="none", tone="primary", result="Đã cập nhật trạng thái mô phỏng.", unlocks=""):
    return dict(id=action_id, label=label, branch=branch, target=target, require=require, tone=tone, result=result, unlocks=unlocks)


def gate(gate_id, label, ready, detail):
    return dict(id=gate_id, label=label, ready=ready, detail=detail)


PAGES = [
    # Giảng viên — 8 pages / 14 codes
    page("gv", "01-viec-can-lam.html", ["GV-01"], "Việc cần làm", "Chỉ việc của Giảng viên; không chứa tác vụ Hội đồng.", rows=[
        row("gv-bm01", "Hoàn thiện BM01A", "Đợt NCKH 2026 · còn 3 ngày", "Cần bạn xử lý", state="open"),
        row("gv-bm08", "Bổ sung PDF BM08 có chữ ký Chủ nhiệm", "NCKH-GV-2026-014 · V2", "Thiếu bằng chứng", state="blocked"),
        row("gv-wait", "BM04 đang chờ P.KHCN kiểm tra", "NCKH-GV-2026-009", "Đang chờ người khác", state="waiting")]),
    page("gv", "02-dot-dang-ky.html", ["GV-02", "GV-03"], "Đợt đăng ký", "Danh sách và chi tiết các đợt đã công bố cho Giảng viên.", active="Đợt đăng ký", visibility="published", rows=[
        row("dot-2026", "Đợt đăng ký NCKH Giảng viên 2026", "01/07/2026 08:00 – 31/07/2026 17:00", "Đã công bố", state="published"),
        row("dot-2025", "Đợt đăng ký NCKH Giảng viên 2025", "Đã kết thúc", "Đã đóng", state="closed")], tabs=["Đang mở", "Đã đóng"]),
    page("gv", "03-bm01a.html", ["GV-04"], "BM01A — Đăng ký đề tài Giảng viên", "Dữ liệu tạm chưa tạo Hồ sơ; xem trước, xuất PDF, tải đúng PDF đã ký rồi nộp một lần.", kind="form", active="Đợt đăng ký", visibility="owner", upload="signed-pdf", fields=[
        ("topic", "Tên đề tài", "text", "Ứng dụng thị giác máy tính trong kiểm định chất lượng", True),
        ("field", "Lĩnh vực nghiên cứu", "select", "Công nghệ thông tin", True),
        ("team-1-name", "Thành viên 1 — Họ tên", "text", "Nguyễn Thị Lan", True),
        ("team-1-email", "Thành viên 1 — Email", "email", "lan.nguyen@dntu.edu.vn", True),
        ("team-1-role", "Thành viên 1 — Vai trò", "select", "Chủ nhiệm", True),
        ("team-2-name", "Thành viên 2 — Họ tên", "text", "Trần Minh Sơn", True),
        ("team-2-email", "Thành viên 2 — Email", "email", "son.tran@dntu.edu.vn", True),
        ("team-2-role", "Thành viên 2 — Vai trò", "select", "Thành viên", True),
        ("team-unit", "Đơn vị chủ trì", "text", "Khoa Công nghệ", True),
        ("objective", "Mục tiêu nghiên cứu", "textarea", "Xây dựng mô hình nhận diện lỗi sản phẩm có thể kiểm chứng.", True),
        ("products", "Sản phẩm dự kiến", "textarea", "Bộ dữ liệu, mô hình thử nghiệm và báo cáo khoa học.", True)], gates=[
        gate("bm01-fields", "Đủ trường nghiệp vụ BM01A", True, "Tên đề tài, lĩnh vực, mục tiêu và sản phẩm dự kiến đã có."),
        gate("bm01-pdf", "Có PDF đã ký", False, "Chọn một PDF hợp lệ để mở cổng nộp.")], actions=[
        action("preview-bm01", "Xem trước BM01A", branch="preview", target="page-form", require="form", tone="secondary", result="Bản xem trước đã phản ánh dữ liệu hiện tại."),
        action("export-bm01", "Tải PDF BM01A", branch="export", target="page-form", require="form", tone="secondary", result="Đã tạo PDF để ký ngoài hệ thống."),
        action("submit-bm01", "Nộp PDF & tạo Hồ sơ", branch="submit", target="page-form", require="form,file:bm01-pdf", result="Đã tạo Hồ sơ và khóa dữ liệu BM01A.")]),
    page("gv", "04-de-tai-cua-toi.html", ["GV-05", "GV-06"], "Đề tài của tôi", "Chỉ đề tài làm Chủ nhiệm hoặc được giao Giảng viên hướng dẫn.", active="Đề tài NCKH", visibility="owner-or-advisor", rows=[
        row("gv-topic-1", "NCKH-GV-2026-014 · Thị giác máy tính", "Bạn là Chủ nhiệm đề tài · Bước 04", "Đang thực hiện", state="active", scope="owner"),
        row("gv-topic-2", "NCKH-SV-2026-031 · Gợi ý học tập", "Bạn là Giảng viên hướng dẫn · Bước 01", "Chờ Hội đồng", state="waiting", scope="advisor")], tabs=["Cần bạn xử lý", "Tất cả đề tài"]),
    page("gv", "05-xet-ho-so-sinh-vien.html", ["GV-07", "GV-08"], "Xét Hồ sơ Sinh viên", "Chỉ Hồ sơ Sinh viên được gán; BM01/PDF là bản bất biến.", active="Xét duyệt", visibility="advisor-assignment", rows=[
        row("hs-sv-031", "HS-SV-2026-031 · Mô hình gợi ý học tập", "Nguyễn Minh An · BM01B V1 · được gán cho bạn", "Chờ quyết định", state="open")], actions=[
        action("approve-bm01", "Duyệt", branch="approve", target="hs-sv-031", result="Hồ sơ đã chuyển thẳng tới tập đủ điều kiện lập Hội đồng."),
        action("return-bm01", "Trả Hồ sơ để sửa", branch="return", target="hs-sv-031", require="reason", tone="danger", result="Hồ sơ đã trả cho Chủ nhiệm sửa; bản V1 và lý do trả được giữ để đối chiếu.")]),
    page("gv", "06-yeu-cau-huy.html", ["GV-09"], "Yêu cầu hủy Đề tài", "Yêu cầu này chờ P.KHCN quyết định và không xóa lịch sử.", kind="form", active="Đề tài NCKH", visibility="owner", fields=[("cancel-reason", "Lý do yêu cầu hủy", "textarea", "Thiết bị thí nghiệm không còn khả dụng.", True)], gates=[gate("cancel-eligible", "Còn trước trạng thái Chờ nghiệm thu", True, "Đề tài đang ở giai đoạn thực hiện.")], actions=[action("request-cancel", "Gửi yêu cầu hủy", branch="cancel-request", target="page-form", require="form,reason,gate:cancel-eligible", tone="danger", result="Đã gửi yêu cầu; đề tài chưa bị hủy cho đến khi P.KHCN xử lý.")]),
    page("gv", "07-tai-lieu-buoc-03-07.html", ["GV-10", "GV-11", "GV-12", "GV-13"], "Tài liệu Bước 03–07", "Mỗi biểu mẫu có đúng kiểu nhập liệu và cổng bằng chứng của Chủ nhiệm.", kind="documents", active="Đề tài NCKH", visibility="owner", upload="owner-evidence", rows=[
        row("bm04", "BM04 · Thuyết minh hoàn chỉnh", "Tải tệp hoàn chỉnh; hệ thống không cung cấp form soạn", "Chưa nộp", state="blocked"),
        row("bm08", "BM08 · Báo cáo tiến độ", "Form điện tử → PDF Chủ nhiệm ký → Trưởng đơn vị", "Cần chữ ký Chủ nhiệm", state="open"),
        row("bm09", "BM09 · Báo cáo tổng kết và sản phẩm", "Báo cáo cùng từng tệp sản phẩm", "Thiếu 1 sản phẩm", state="blocked"),
        row("bm13", "BM13 · Giải trình sau nghiệm thu", "Chỉ phát sinh theo yêu cầu BM12", "Cần giải trình", state="open")], actions=[
        action("submit-bm04", "Nộp BM04", branch="submit-bm04", target="bm04", require="file:bm04-file", result="BM04 V1 đã được nộp."),
        action("route-bm08", "Gửi BM08 đến Trưởng đơn vị", branch="route-bm08", target="bm08", require="form,file:bm08-file", result="BM08 đúng phiên bản đã chuyển tới Trưởng đơn vị."),
        action("submit-bm09", "Nộp BM09 và từng sản phẩm", branch="submit-bm09", target="bm09", require="file:bm09-file,file:product-code-file,file:product-data-file", result="BM09 và hai tệp sản phẩm có phiên bản riêng đã được nộp để P.KHCN kiểm tra."),
        action("submit-bm13", "Nộp BM13", branch="submit-bm13", target="bm13", require="form,file:bm13-file", result="BM13 đã khóa và chuyển P.KHCN kiểm tra.")], fields=[("bm08-progress", "Tiến độ và nội dung đã thực hiện", "textarea", "Hoàn tất thu thập 80% dữ liệu.", True), ("bm13-response", "Nội dung giải trình theo yêu cầu BM12", "textarea", "Đã hiệu chỉnh bảng số liệu theo nhận xét 02.", True)]),
    page("gv", "08-ket-qua-da-cong-bo.html", ["GV-14"], "Kết quả và tài liệu", "Trang chỉ nhận bản đã công bố; trạng thái chưa công bố không render metadata.", active="Đề tài NCKH", visibility="published-only", rows=[
        row("published-result", "Kết quả xét duyệt hồ sơ · NCKH-GV-2025-018", "Công bố ngày 18/08/2025 · BM03 hiện hành", "Đã công bố", state="published", scope="published")]),

    # Trưởng đơn vị — 6 pages / 6 codes
    page("td", "01-viec-can-lam.html", ["TD-01"], "Việc cần làm", "Hồ sơ và BM08 đang chờ đúng đơn vị.", rows=[row("td-hs", "Duyệt HS-GV-2026-042", "Khoa Công nghệ · BM01A V1", "Chờ duyệt", state="open"), row("td-bm08", "Ký BM08 NCKH-GV-2026-014", "Khoa Công nghệ · V2", "Chờ ký", state="open")]),
    page("td", "02-hang-cho-xet-duyet.html", ["TD-02"], "Hàng chờ xét duyệt", "Bộ lọc không thể mở đối tượng ngoài Khoa Công nghệ.", active="Xét duyệt", visibility="unit-assignment", rows=[row("td-q1", "HS-GV-2026-042", "Khoa Công nghệ · Nguyễn Thị Lan", "Chờ duyệt", state="open"), row("td-q2", "HS-GV-2026-039", "Khoa Công nghệ · Trần Minh Sơn", "Đã duyệt", state="done")], tabs=["Chờ xử lý", "Đã xử lý"]),
    page("td", "03-duyet-bm01.html", ["TD-03"], "Duyệt BM01 Giảng viên", "Quyết định gắn đúng HS-GV-2026-042 và BM01A V1 bất biến.", active="Xét duyệt", visibility="unit-assignment", rows=[row("hs-gv-042", "HS-GV-2026-042 · Ứng dụng thị giác máy tính", "Nguyễn Thị Lan · Khoa Công nghệ · BM01A V1", "Chờ quyết định")], actions=[action("td-approve", "Duyệt & chuyển Hội đồng", branch="approve", target="hs-gv-042", result="Hồ sơ đã vào tập đủ điều kiện lập Hội đồng."), action("td-return", "Trả chỉnh sửa", branch="return", target="hs-gv-042", require="reason", tone="danger", result="Đã trả Hồ sơ với lý do và giữ bản V1 bất biến.")]),
    page("td", "04-ky-bm08.html", ["TD-04"], "Ký và chuyển BM08", "Chỉ tải bản ký bổ sung của Trưởng đơn vị; có nhánh trả bắt buộc lý do.", active="Xét duyệt", visibility="unit-assignment", upload="unit-signed-pdf", rows=[row("td-bm08-v2", "BM08 V2 · NCKH-GV-2026-014", "Đã có chữ ký Chủ nhiệm · đang chờ Trưởng đơn vị", "Chờ xử lý")], actions=[action("td-route-bm08", "Tải bản ký & chuyển P.KHCN", branch="sign-route", target="td-bm08-v2", require="file:td-bm08-file", result="BM08 V2 đã chuyển P.KHCN."), action("td-return-bm08", "Trả BM08", branch="return", target="td-bm08-v2", require="reason", tone="danger", result="BM08 đã trả về Chủ nhiệm cùng lý do.")]),
    page("td", "05-de-tai-don-vi.html", ["TD-05"], "Đề tài của đơn vị", "Chỉ dữ liệu thuộc Khoa Công nghệ hoặc nhiệm vụ được giao.", active="Đề tài NCKH", visibility="unit-or-assignment", rows=[row("unit-topic-1", "NCKH-GV-2026-014", "Khoa Công nghệ · Nguyễn Thị Lan", "Đang thực hiện", scope="unit"), row("unit-topic-2", "NCKH-SV-2026-031", "Nhiệm vụ ký BM08 được giao", "Chờ đơn vị", scope="assignment")]),
    page("td", "06-trang-thai-ket-qua.html", ["TD-06"], "Trạng thái và kết quả", "Không có preview, badge hoặc count cho kết quả chưa công bố.", active="Đề tài NCKH", visibility="published-only", rows=[row("td-result", "NCKH-GV-2025-018 · Kết quả nghiệm thu", "Công bố ngày 10/12/2025 · BM12 hiện hành", "Đã công bố", state="published", scope="published")]),

    # P.KHCN — 7 pages / 23 codes
    page("pk", "01-viec-can-lam.html", ["PK-01"], "Việc cần làm P.KHCN", "Tác vụ vận hành; không có phiếu cá nhân hoặc chữ ký Chủ tịch.", rows=[row("pk-cancel", "Xử lý yêu cầu hủy NCKH-GV-2026-011", "Chủ nhiệm gửi 22/07/2026 09:12", "Chờ quyết định"), row("pk-bm09", "Kiểm tra bộ BM09/sản phẩm", "NCKH-SV-2025-018 · 4 tệp", "Chờ kiểm tra")]),
    page("pk", "02-quan-ly-dot.html", ["PK-02", "PK-03", "PK-04"], "Quản lý Đợt đăng ký", "Tạo, cập nhật, công bố và thống kê dựa trên cùng fixture danh sách.", kind="form", active="Đợt đăng ký", visibility="pk", fields=[("round-name", "Tên Đợt đăng ký", "text", "Đợt NCKH Giảng viên 2026", True), ("round-type", "Loại Đợt", "select", "Giảng viên đăng ký|Sinh viên đăng ký|Đề tài giao trực tiếp", True), ("round-direct-topics", "Danh mục đề tài giao trực tiếp (nếu áp dụng)", "textarea", "Không áp dụng cho loại đợt hiện tại.", False), ("round-start", "Bắt đầu", "datetime-local", "2026-07-01T08:00", True), ("round-end", "Kết thúc", "datetime-local", "2026-07-31T17:00", True)], gates=[gate("round-fields", "Đủ loại, tên và thời gian hợp lệ", True, "Kết thúc sau bắt đầu; danh mục bắt buộc khi giao trực tiếp.")], rows=[row("round-draft", "Đợt NCKH Giảng viên 2026", "12 nháp · 0 đã nộp · thống kê cập nhật theo fixture", "Nháp", state="draft")], actions=[action("save-round", "Lưu cấu hình Đợt", branch="save-round", target="round-draft", require="form", tone="secondary", result="Đã lưu bản nháp cấu hình Đợt."), action("update-round", "Cập nhật Đợt", branch="update-round", target="round-draft", require="form", tone="secondary", result="Đợt và số liệu danh sách đã cập nhật."), action("publish-round", "Công bố Đợt", branch="publish", target="round-draft", require="form,gate:round-fields", result="Đợt đã công bố; số liệu giữ đồng bộ với danh sách.")]),
    page("pk", "03-de-tai-va-huy.html", ["PK-05", "PK-06", "PK-07"], "Đề tài và yêu cầu hủy", "Xem chi tiết và xử lý yêu cầu; chấp thuận không xóa dữ liệu.", active="Đề tài NCKH", visibility="pk", rows=[row("cancel-request-011", "NCKH-GV-2026-011 · Yêu cầu hủy", "Đang thực hiện · lý do: thiếu thiết bị", "Chờ quyết định")], actions=[action("approve-cancel", "Chấp thuận hủy", branch="approve-cancel", target="cancel-request-011", require="reason", tone="danger", result="Đề tài chuyển Đã hủy; lịch sử và tài liệu được giữ lại."), action("reject-cancel", "Từ chối yêu cầu", branch="reject-cancel", target="cancel-request-011", require="reason", tone="secondary", result="Đề tài tiếp tục và Chủ nhiệm nhận lý do.")]),
    page("pk", "04-hoi-dong-readiness.html", ["PK-08", "PK-09", "PK-10", "PK-11"], "Hội đồng và readiness", "Tạo/cập nhật Hội đồng, dashboard và checklist dựa trên fixture thực; không hard-code một cổng chung.", kind="form", active="Hội đồng", visibility="pk", fields=[("council-stage", "Giai đoạn Hội đồng", "select", "Nghiệm thu|Xét duyệt hồ sơ|Xét duyệt thuyết minh", True), ("council-input", "Hồ sơ đầu vào chính thức", "select", "BM09 V2 + 3 sản phẩm|BM01 hiện hành|BM04 hiện hành", True), ("council-chair", "Chủ tịch", "select", "TS. Dũng Nguyễn", True), ("council-secretary", "Thư ký (ngoài mẫu số)", "select", "ThS. Mai Minh", True), ("council-members", "Thành viên đánh giá", "textarea", "TS. Hùng Hoàng; TS. Linh Phạm; TS. Sơn Trần; TS. An Lê", True)], gates=[gate("chair", "Đúng một Chủ tịch", True, "TS. Dũng Nguyễn đã chấp nhận."), gate("secretary", "Đúng một Thư ký độc quyền", True, "ThS. Mai Minh không thuộc mẫu số."), gate("members", "Tất cả người ngoài đã chấp nhận lời mời", False, "Còn 1 lời mời chưa chấp nhận."), gate("official-input", "Đã chọn official input", True, "BM09 V2 và 3 sản phẩm đã kiểm tra.")], rows=[row("meeting-draft", "HĐNT-2026-006", "Nghiệm thu · 5 người đánh giá + 1 Thư ký · 1 lời mời chờ", "Chưa sẵn sàng", state="blocked")], actions=[action("save-council", "Lưu/cập nhật Hội đồng", branch="save-council", target="meeting-draft", require="form", tone="secondary", result="Đã kiểm tra cơ cấu và lưu cấu hình nháp."), action("accept-last-invite", "Mô phỏng chấp nhận lời mời cuối", branch="accept-invite", target="meeting-draft", tone="secondary", result="Lời mời cuối đã chấp nhận; readiness được tính lại.", unlocks="members"), action("open-meeting", "Mở Cuộc họp", branch="open", target="meeting-draft", require="form,gate:chair,gate:secretary,gate:members,gate:official-input", result="Cuộc họp đã mở và cấu trúc bị khóa.")]),
    page("pk", "05-cuoc-hop-ket-qua.html", ["PK-12", "PK-13", "PK-14", "PK-15"], "Cuộc họp và kết quả", "Bốn nhánh độc lập: hủy/thay thế, kết thúc, công bố và điều chỉnh.", active="Hội đồng", visibility="pk", gates=[gate("votes", "Đủ 5/5 phiếu hợp lệ", True, "Snapshot CP-2026-006 không thể thay đổi."), gate("minutes", "BM12 đủ hai chữ ký", False, "Đang chờ Chủ tịch tải bản đủ hai chữ ký."), gate("ended", "Cuộc họp đã kết thúc", False, "Chỉ đạt sau cổng phiếu và Biên bản."), gate("publish-source", "Đúng BM12 hiện hành", True, "BM12 V3 là nguồn dự kiến.")], rows=[row("meeting-live", "HĐNT-2026-006", "Đang diễn ra · checkpoint CP-2026-006", "Chờ hoàn tất BM12")], actions=[action("receive-minutes", "Ghi nhận BM12 đủ hai chữ ký", branch="receive-minutes", target="meeting-live", tone="secondary", result="Đã ghi nhận đúng BM12 V3 đủ hai chữ ký.", unlocks="minutes"), action("cancel-meeting", "Hủy Cuộc họp", branch="cancel-meeting", target="meeting-live", require="reason", tone="danger", result="Cuộc họp đã hủy; dùng hành động tạo Cuộc họp thay thế."), action("replace-meeting", "Tạo Cuộc họp thay thế", branch="replace-meeting", target="meeting-live", require="form", tone="secondary", result="Đã tạo namespace mới; không sao chép phiếu hoặc Biên bản hợp lệ."), action("end-meeting", "Kết thúc Cuộc họp", branch="end", target="meeting-live", require="gate:votes,gate:minutes", result="Cuộc họp kết thúc và chuyển Chờ công bố.", unlocks="ended"), action("publish-result", "Công bố kết quả", branch="publish", target="meeting-live", require="gate:ended,gate:publish-source", result="Đã mở quyền xem đúng actor và tạo thông báo."), action("adjust-result", "Công bố phiên bản điều chỉnh", branch="adjust", target="meeting-live", require="reason,gate:publish-source", tone="secondary", result="Bản điều chỉnh trở thành published-current; bản cũ mất hiệu lực.")], fields=[("replacement-note", "Ghi chú cấu hình Cuộc họp thay thế", "textarea", "Tái xác nhận cơ cấu và gửi lời mời mới.", True)]),
    page("pk", "06-tai-lieu-buoc-03-07.html", ["PK-16", "PK-17", "PK-18", "PK-19", "PK-20", "PK-21", "PK-22"], "Vận hành tài liệu Bước 03–07", "Mỗi BM05–BM14 và cổng Hoàn tất Bước 07 có action riêng.", kind="documents", active="Đề tài NCKH", visibility="pk", upload="pk-official", rows=[row("pk-bm05", "BM05 · Quyết định HĐ thuyết minh", "Tệp lập/ký bên ngoài", "Chờ công bố"), row("pk-bm08", "BM08 · Tiếp nhận báo cáo tiến độ", "V3 · đủ chữ ký Chủ nhiệm và Trưởng đơn vị", "Chờ ghi nhận"), row("pk-bm09", "BM09 · Báo cáo tổng kết và sản phẩm", "Thiếu phụ lục dữ liệu", "Cần trả bổ sung", state="blocked"), row("pk-bm10", "BM10 · Quyết định HĐ nghiệm thu", "Tệp lập/ký bên ngoài", "Chờ công bố"), row("pk-bm13", "BM13 · Giải trình", "V2 · liên kết yêu cầu 02 của BM12", "Chờ xác nhận"), row("pk-bm14", "BM14 · Thanh lý hợp đồng", "Đề tài có hợp đồng phải thanh lý", "Chưa lưu", state="blocked"), row("pk-step07", "Hoàn tất Bước 07", "Nghiệm thu đạt · BM13 đã xác nhận · còn thiếu BM14", "Bị chặn", state="blocked")], gates=[gate("step07-bm12", "BM12 nghiệm thu đạt", True, "BM12 V3 hiện hành."), gate("step07-bm13", "BM13 đã xác nhận khi áp dụng", True, "Yêu cầu giải trình 02 đã đóng."), gate("step07-bm14", "BM14 đã lưu khi bắt buộc", False, "Đề tài này có hợp đồng phải thanh lý.")], actions=[action("publish-bm05", "Công bố BM05", branch="publish-bm05", target="pk-bm05", require="file:pk-bm05-file", result="BM05 đã công bố và có thể dùng làm official input."), action("accept-bm08", "Ghi nhận đã nhận BM08", branch="accept-bm08", target="pk-bm08", result="BM08 V3 hoàn tất tuyến; P.KHCN không ký."), action("return-bm09", "Trả BM09 bổ sung", branch="return-bm09", target="pk-bm09", require="reason", tone="danger", result="Đã trả bộ BM09 cùng danh sách tệp thiếu."), action("publish-bm10", "Công bố BM10", branch="publish-bm10", target="pk-bm10", require="file:pk-bm10-file", result="BM10 đã công bố."), action("confirm-bm13", "Xác nhận BM13", branch="confirm-bm13", target="pk-bm13", result="Giải trình hoàn tất mà không triệu tập lại Hội đồng."), action("store-bm14", "Lưu BM14 hoàn chỉnh", branch="store-bm14", target="pk-bm14", require="file:pk-bm14-file", result="BM14 đã lưu với phiên bản và thời điểm."), action("complete-step07", "Hoàn tất Bước 07", branch="complete-step07", target="pk-step07", require="gate:step07-bm12,gate:step07-bm13,gate:step07-bm14", result="Đề tài đã chuyển Hoàn tất Bước 07.")]),
    page("pk", "07-audit-nghiep-vu.html", ["PK-23"], "Audit nghiệp vụ", "Lịch sử theo actor, vai trò, phiên bản và lý do; không cho sửa hoặc xuất.", active="Đề tài NCKH", visibility="pk-audit", rows=[row("audit-1", "Trả BM09 bổ sung", "Dũng Nguyễn · Vai trò P.KHCN · 22/07/2026 09:14 · V2", "Có lý do", state="done"), row("audit-2", "Tạo Mốc chốt phiếu", "Hệ thống · 21/07/2026 16:40 · CP-2026-006", "Bất biến", state="locked")]),

    # Chủ tịch — 8 pages / 8 codes
    page("ct", "01-viec-can-lam.html", ["CT-01"], "Việc cần làm", "Phiếu cá nhân, review Biên bản và chữ ký thứ hai trong assignment.", rows=[row("ct-ballot", "Nộp BM11 của bạn", "HĐNT-2026-006", "Chưa nộp"), row("ct-minutes", "Review BM12 V3", "Đã có chữ ký Thư ký", "Chờ Chủ tịch")]),
    page("ct", "02-hoi-dong-cua-toi.html", ["CT-02"], "Hội đồng của tôi", "Chỉ assignment Chủ tịch còn hiệu lực hoặc lịch sử được cấp.", active="Hội đồng của tôi", rows=[row("ct-meeting", "HĐNT-2026-006", "Vai trò: Chủ tịch · Nghiệm thu", "Đang diễn ra")]),
    page("ct", "03-chi-tiet-cuoc-hop.html", ["CT-03"], "Chi tiết Cuộc họp", "Không có setup, kết thúc hoặc công bố của P.KHCN.", active="Hội đồng của tôi", rows=[row("ct-task", "Phiếu BM11 của tôi", "Official input: BM09 V2 + BM10 hiện hành", "Đã nộp"), row("ct-minute-state", "BM12 V3", "Đã có chữ ký Thư ký", "Chờ review")]),
    page("ct", "04-tai-lieu-chinh-thuc.html", ["CT-04"], "Tài liệu chính thức", "Chỉ đọc đúng snapshot gắn với HĐNT-2026-006; không có upload.", active="Hội đồng của tôi", visibility="official-readonly", rows=[row("ct-bm09", "BM09 V2 · Báo cáo tổng kết", "Snapshot lúc mở Cuộc họp", "Chính thức", state="locked"), row("ct-bm10", "BM10 · Quyết định Hội đồng", "Bản đã công bố", "Chính thức", state="locked")]),
    page("ct", "05-phieu-cua-toi.html", ["CT-05"], "Phiếu BM02/BM06/BM11 của tôi", "Chọn đúng giai đoạn; xem trước, xuất PDF, ký ngoài hệ thống và nộp phiếu cá nhân.", kind="form", active="Hội đồng của tôi", visibility="own-ballot", upload="own-ballot", fields=[("ct-ballot-kind", "Biểu mẫu theo giai đoạn", "select", "BM11 · Nghiệm thu|BM02 · Xét duyệt hồ sơ|BM06 · Xét duyệt thuyết minh", True), ("ct-score", "Tổng điểm đánh giá", "number", "82", True), ("ct-comment", "Nhận xét chuyên môn", "textarea", "Đề tài đáp ứng mục tiêu và có sản phẩm kiểm chứng.", True)], gates=[gate("ct-meeting-open", "Cuộc họp đang diễn ra", True, "HĐNT-2026-006 chưa kết thúc."), gate("ct-ballot-file", "Có PDF phiếu đã ký", False, "Chọn PDF của chính bạn.")], actions=[action("preview-ct-ballot", "Xem trước phiếu", branch="preview", target="page-form", require="form", tone="secondary"), action("export-ct-ballot", "Xuất PDF phiếu", branch="export", target="page-form", require="form", tone="secondary"), action("submit-ct-ballot", "Nộp phiếu của tôi", branch="submit-ballot", target="page-form", require="form,file:ct-ballot-file,gate:ct-meeting-open", result="Phiếu của bạn đã khóa và được tính đúng một phiếu.")]),
    page("ct", "06-review-bien-ban.html", ["CT-06"], "Review Biên bản", "Chỉ trả chỉnh sửa, không có từ chối vĩnh viễn.", active="Hội đồng của tôi", rows=[row("ct-bm12-v3", "BM12 V3 · chữ ký Thư ký", "Mai Minh nộp 22/07/2026 14:12", "Chờ review")], actions=[action("return-minutes", "Trả chỉnh sửa", branch="return", target="ct-bm12-v3", require="reason", tone="danger", result="BM12 chuyển Trả chỉnh sửa và chỉ Thư ký được sửa."), action("accept-minutes", "Chấp nhận để ký thứ hai", branch="approve", target="ct-bm12-v3", result="BM12 chuyển Chờ chữ ký thứ hai.")]),
    page("ct", "07-chu-ky-thu-hai.html", ["CT-07"], "Chữ ký thứ hai", "Tải đúng BM12 V3 có chữ ký Thư ký, ký ngoài hệ thống và tải bản đủ hai chữ ký.", active="Hội đồng của tôi", upload="chair-second-signature", rows=[row("ct-sign-bm12", "BM12 V3", "Checksum snapshot · chữ ký Thư ký đã có", "Chờ bản đủ hai chữ ký")], actions=[action("download-minutes", "Tải BM12 V3 để ký", branch="download", target="ct-sign-bm12", tone="secondary", result="Đã tải đúng BM12 V3 có chữ ký Thư ký."), action("complete-minutes", "Tải bản đủ hai chữ ký & hoàn tất", branch="second-signature", target="ct-sign-bm12", require="file:ct-minutes-file", result="BM12 V3 hoàn tất; giữ cả bản chữ ký Thư ký và bản đủ hai chữ ký.")]),
    page("ct", "08-ket-qua.html", ["CT-08"], "Kết quả theo nhiệm vụ", "Chủ tịch được xem tổng hợp trước/sau công bố trong đúng Hội đồng.", active="Hội đồng của tôi", visibility="chair-assignment", rows=[row("ct-result", "Kết luận dự kiến HĐNT-2026-006", "Nguồn: BM12 V3 · phạm vi Chủ tịch", "Chờ công bố", state="waiting")]),

    # Thành viên — 6 pages / 6 codes
    page("tv", "01-viec-can-lam.html", ["TV-01"], "Việc cần làm", "Chỉ nhiệm vụ phiếu cá nhân của Thành viên.", rows=[row("tv-ballot-task", "Hoàn thiện BM11 của bạn", "HĐNT-2026-006 · Cuộc họp đang diễn ra", "Chưa nộp")]),
    page("tv", "02-hoi-dong-cua-toi.html", ["TV-02"], "Hội đồng của tôi", "Chỉ assignment Thành viên.", active="Hội đồng của tôi", rows=[row("tv-meeting", "HĐNT-2026-006", "Vai trò: Thành viên · không gồm dữ liệu Hội đồng khác", "Đang diễn ra")]),
    page("tv", "03-chi-tiet-cuoc-hop.html", ["TV-03"], "Chi tiết Cuộc họp", "Không hiển thị roster progress, phiếu người khác, Biên bản hay tổng hợp trước công bố.", active="Hội đồng của tôi", visibility="member-assignment", rows=[row("tv-personal", "Nhiệm vụ cá nhân", "BM11 của bạn · official input BM09 V2", "Chưa nộp")]),
    page("tv", "04-tai-lieu-chinh-thuc.html", ["TV-04"], "Tài liệu chính thức", "Bộ official input chỉ đọc; trang này không cho tải lên.", active="Hội đồng của tôi", visibility="official-readonly", rows=[row("tv-bm09", "BM09 V2 · Báo cáo tổng kết", "Snapshot tại thời điểm mở Cuộc họp", "Chính thức", state="locked"), row("tv-bm10", "BM10 · Quyết định Hội đồng", "Bản đã công bố", "Chính thức", state="locked")]),
    page("tv", "05-phieu-cua-toi.html", ["TV-05"], "Phiếu BM02/BM06/BM11 của tôi", "Chọn đúng giai đoạn; xem trước, xuất PDF, ký ngoài hệ thống và nộp phiếu cá nhân.", kind="form", active="Hội đồng của tôi", visibility="own-ballot", upload="own-ballot", fields=[("tv-ballot-kind", "Biểu mẫu theo giai đoạn", "select", "BM11 · Nghiệm thu|BM02 · Xét duyệt hồ sơ|BM06 · Xét duyệt thuyết minh", True), ("tv-score", "Tổng điểm đánh giá", "number", "78", True), ("tv-comment", "Nhận xét chuyên môn", "textarea", "Cần làm rõ khả năng tái lập của kết quả.", True)], gates=[gate("tv-open", "Cuộc họp đang diễn ra", True, "Còn quyền nộp phiếu cá nhân."), gate("tv-file", "Có PDF phiếu đã ký", False, "Chọn PDF của chính bạn.")], actions=[action("preview-tv-ballot", "Xem trước phiếu", branch="preview", target="page-form", require="form", tone="secondary"), action("export-tv-ballot", "Xuất PDF phiếu", branch="export", target="page-form", require="form", tone="secondary"), action("submit-tv-ballot", "Nộp phiếu của tôi", branch="submit-ballot", target="page-form", require="form,file:tv-ballot-file,gate:tv-open", result="Phiếu cá nhân đã nộp và khóa.")]),
    page("tv", "06-ket-qua-da-cong-bo.html", ["TV-06"], "Kết quả", "Trước công bố trang trung tính, không có badge/count/metadata; fixture này chỉ là bản đã công bố.", active="Hội đồng của tôi", visibility="published-only", rows=[row("tv-published", "Kết quả HĐHS-2025-012", "Công bố ngày 18/08/2025 · theo assignment lịch sử", "Đã công bố", state="published", scope="published")]),

    # Thư ký — 6 pages / 6 codes
    page("tk", "01-viec-can-lam.html", ["TK-01"], "Việc cần làm", "Theo dõi Mốc chốt và Biên bản; không có phiếu đánh giá.", rows=[row("tk-wait", "Chờ Mốc chốt HĐNT-2026-006", "4/5 phiếu hợp lệ · bạn không thuộc mẫu số", "Chưa mở Biên bản", state="blocked")]),
    page("tk", "02-hoi-dong-cua-toi.html", ["TK-02"], "Hội đồng của tôi", "Chỉ assignment Thư ký.", active="Hội đồng của tôi", rows=[row("tk-meeting", "HĐNT-2026-006", "Vai trò: Thư ký · nằm ngoài mẫu số", "Đang diễn ra")]),
    page("tk", "03-dashboard-thu-ky.html", ["TK-03"], "Dashboard Thư ký", "4/5 chưa tạo Mốc chốt và tuyệt đối chưa cho hoàn tất.", active="Hội đồng của tôi", visibility="secretary-assignment", gates=[gate("tk-votes", "Đủ 5/5 phiếu hợp lệ", False, "Hiện có 4/5; Thư ký không thuộc mẫu số."), gate("tk-checkpoint", "Mốc chốt phiếu đã tạo", False, "Chỉ hệ thống tạo khi đủ 100%.")], rows=[row("tk-progress", "Tiến độ HĐNT-2026-006", "4/5 người đánh giá đã nộp · Thư ký ở ngoài mẫu số", "Chưa đủ 100%", state="blocked")]),
    page("tk", "04-tai-lieu-chinh-thuc.html", ["TK-04"], "Tài liệu chính thức", "Official input chỉ đọc; không render upload.", active="Hội đồng của tôi", visibility="official-readonly", rows=[row("tk-bm09", "BM09 V2 · Báo cáo tổng kết", "Snapshot của HĐNT-2026-006", "Chính thức", state="locked"), row("tk-bm10", "BM10 · Quyết định Hội đồng", "Bản đã công bố", "Chính thức", state="locked")]),
    page("tk", "05-bien-ban.html", ["TK-05"], "Biên bản BM03/BM07/BM12", "Chọn đúng giai đoạn; xem trước, xuất PDF, nộp sau Mốc chốt và sửa khi bị trả.", kind="form", active="Hội đồng của tôi", visibility="secretary-assignment", upload="secretary-minutes", fields=[("minutes-kind", "Biên bản theo giai đoạn", "select", "BM12 · Nghiệm thu|BM03 · Xét duyệt hồ sơ|BM07 · Xét duyệt thuyết minh", True), ("meeting-date", "Ngày họp", "date", "2026-07-22", True), ("meeting-time", "Giờ họp", "time", "14:00", True), ("meeting-place", "Địa điểm", "text", "Phòng A203", True), ("minutes-conclusion", "Kết luận Biên bản", "textarea", "Đề tài đạt, yêu cầu bổ sung giải trình theo nhận xét 02.", True)], gates=[gate("tk-five-votes", "Đủ 5/5 phiếu và có Mốc chốt", True, "CP-2026-006 · 22/07/2026 13:42."), gate("tk-meeting-open", "Cuộc họp đang diễn ra", True, "Có thể nộp phiên bản mới."), gate("tk-returned", "Có phiên bản bị Chủ tịch trả", True, "BM12 V2 đã bị trả kèm nhận xét; nhánh nộp lại sẽ tạo V3.")], actions=[action("preview-minutes", "Xem trước Biên bản", branch="preview", target="page-form", require="form", tone="secondary"), action("export-minutes", "Xuất PDF Biên bản", branch="export", target="page-form", require="form", tone="secondary"), action("submit-minutes", "Nộp Biên bản cho Chủ tịch", branch="submit-minutes", target="page-form", require="form,file:tk-minutes-file,gate:tk-five-votes,gate:tk-meeting-open", result="Biên bản đã khóa và chuyển Chờ chữ ký thứ hai."), action("resubmit-minutes", "Sửa & nộp lại Biên bản", branch="resubmit-minutes", target="page-form", require="form,file:tk-minutes-file,gate:tk-meeting-open,gate:tk-returned", tone="secondary", result="Phiên bản V3 thay thế bản V2 bị trả; bằng chứng V2 mất hiệu lực.")]),
    page("tk", "06-ket-qua.html", ["TK-06"], "Kết quả theo nhiệm vụ", "Thư ký xem Biên bản/tổng hợp trong đúng assignment trước và sau công bố.", active="Hội đồng của tôi", visibility="secretary-assignment", rows=[row("tk-result", "Kết luận HĐNT-2026-006", "Nguồn BM12 V3 · phạm vi Thư ký", "Chờ công bố", state="waiting")]),

    # Quản trị viên — 6 pages / 6 codes; no NCKH navigation and no upload
    page("qt", "01-viec-can-lam.html", ["QT-01"], "Việc cần làm", "Yêu cầu vai trò và tác vụ Tài khoản; không có dữ liệu NCKH.", rows=[row("role-request", "Yêu cầu vai trò Giảng viên · An Nguyễn", "GV-2026-0088 · email đã xác minh", "Chờ duyệt")]),
    page("qt", "02-danh-sach-tai-khoan.html", ["QT-02"], "Danh sách Tài khoản", "Tìm và lọc theo trạng thái tài khoản.", active="Tài khoản", visibility="account-admin", rows=[row("acct-an", "An Nguyễn · an.nguyen@dntu.edu.vn", "Giảng viên · đăng nhập gần nhất 22/07/2026", "Hoạt động", state="active"), row("acct-binh", "Bình Trần · binh.tran@dntu.edu.vn", "Sinh viên · khóa ngày 20/07/2026", "Đã khóa", state="locked")]),
    page("qt", "03-duyet-vai-tro.html", ["QT-03"], "Chi tiết yêu cầu vai trò", "Duyệt hoặc từ chối dựa trên mã định danh và Hồ sơ cá nhân.", active="Yêu cầu vai trò", visibility="account-admin", rows=[row("request-an", "An Nguyễn · Yêu cầu Giảng viên", "Email đã xác minh · Mã GV-2026-0088", "Chờ quyết định")], actions=[action("approve-role", "Duyệt vai trò", branch="approve", target="request-an", result="Tài khoản đã nhận vai trò Giảng viên."), action("reject-role", "Từ chối vai trò", branch="reject", target="request-an", require="reason", tone="danger", result="Yêu cầu bị từ chối; lịch sử được giữ lại.")]),
    page("qt", "04-tao-tai-khoan-pkhcn.html", ["QT-04"], "Tạo Tài khoản P.KHCN ban đầu", "Nhập dữ liệu định danh; quy trình này không có tải tệp.", kind="form", active="Tài khoản", visibility="account-admin", upload="none", fields=[("pk-name", "Họ và tên", "text", "Lê Thanh Dũng", True), ("pk-email", "Email Trường", "email", "dung.le@dntu.edu.vn", True), ("pk-code", "Mã cán bộ", "text", "CB-0042", True)], actions=[action("create-pk-account", "Tạo Tài khoản P.KHCN", branch="create-account", target="page-form", require="form", result="Tài khoản ban đầu đã tạo; người dùng phải đặt mật khẩu qua liên kết một lần.")]),
    page("qt", "05-bao-mat-tai-khoan.html", ["QT-05"], "Bảo mật Tài khoản", "Đủ khóa, mở khóa và đặt lại mật khẩu; không xóa vai trò hoặc lịch sử.", active="Tài khoản", visibility="account-admin", rows=[row("security-an", "An Nguyễn · an.nguyen@dntu.edu.vn", "Vai trò Giảng viên · trạng thái hoạt động", "Hoạt động", state="active"), row("security-binh", "Bình Trần · binh.tran@dntu.edu.vn", "Vai trò Sinh viên · bị khóa", "Đã khóa", state="locked")], actions=[action("lock-account", "Khóa Tài khoản", branch="lock", target="security-an", require="reason", tone="danger", result="Tài khoản đã khóa; dữ liệu và lịch sử được giữ."), action("unlock-account", "Mở khóa Tài khoản", branch="unlock", target="security-binh", result="Tài khoản đã mở khóa."), action("reset-password", "Đặt lại mật khẩu", branch="password-reset", target="security-an", result="Đã tạo liên kết đặt lại mật khẩu dùng một lần.")]),
    page("qt", "06-audit-tai-khoan.html", ["QT-06"], "Audit Tài khoản", "Chỉ lịch sử quản trị Tài khoản; không lẫn audit nghiệp vụ.", active="Tài khoản", visibility="account-audit", rows=[row("qt-audit-1", "Khóa Tài khoản Bình Trần", "Quỳnh Anh · Quản trị viên · 20/07/2026 10:18", "Có lý do", state="done"), row("qt-audit-2", "Duyệt vai trò Giảng viên cho An Nguyễn", "Quỳnh Anh · 18/07/2026 08:20", "Bất biến", state="locked")]),
]

# Các nhánh đối nghịch được khai báo bổ sung trên cùng fixture để reviewer có thể
# kiểm tra cả bộ hợp lệ và bộ bị trả mà không nhân đôi mã màn hình Atlas.
_pk_documents = next(p for p in PAGES if "PK-18" in p["codes"])
_pk_documents["actions"].insert(3, action("accept-bm09", "Đánh dấu BM09 đủ thành phần", branch="accept-bm09", target="pk-bm09", result="Bộ BM09 và từng sản phẩm đã đủ thành phần để chọn làm official input."))
_pk_documents["actions"].insert(6, action("return-bm13", "Trả BM13 chỉnh sửa", branch="return-bm13", target="pk-bm13", require="reason", tone="danger", result="BM13 đã trả Chủ nhiệm kèm lý do; phiên bản hiện tại được giữ lịch sử."))
_ct_ballot = next(p for p in PAGES if "CT-05" in p["codes"])
_ct_ballot["fields"].insert(0, ("ct-ballot-stage", "Fixture Cuộc họp được phân công", "select", "Nghiệm thu|Xét duyệt hồ sơ|Xét duyệt thuyết minh", True))
_tv_ballot = next(p for p in PAGES if "TV-05" in p["codes"])
_tv_ballot["fields"].insert(0, ("tv-ballot-stage", "Fixture Cuộc họp được phân công", "select", "Nghiệm thu|Xét duyệt hồ sơ|Xét duyệt thuyết minh", True))
_tk_minutes = next(p for p in PAGES if "TK-05" in p["codes"])
_tk_minutes["fields"].insert(0, ("minutes-stage", "Fixture Cuộc họp được phân công", "select", "Nghiệm thu|Xét duyệt hồ sơ|Xét duyệt thuyết minh", True))
_tk_minutes["fields"].insert(2, ("minutes-scenario", "Tình huống phiên bản", "select", "Bản bị Chủ tịch trả|Lần nộp đầu", True))


def esc(value):
    return html.escape(str(value), quote=True)


def render_field(field):
    field_id, label, kind, value, required = field
    number_rules = ' min="0" max="100" step="0.1"' if kind == "number" else ""
    attrs = f'id="{esc(field_id)}" name="{esc(field_id)}" data-business-field {"required" if required else ""}{number_rules}'
    if kind == "textarea":
        control = f'<textarea {attrs}>{esc(value)}</textarea>'
    elif kind == "select":
        options = str(value).split("|")
        rendered = "".join(f'<option value="{esc(option)}" {"selected" if index == 0 else ""}>{esc(option)}</option>' for index, option in enumerate(options))
        control = f'<select {attrs}>{rendered}</select>'
    else:
        control = f'<input type="{esc(kind)}" value="{esc(value)}" {attrs}>'
    return f'<div class="field"><label for="{esc(field_id)}">{esc(label)}{" *" if required else ""}</label>{control}</div>'


def render_rows(rows):
    if not rows:
        return ""
    items = []
    for r in rows:
        items.append(f'''<article class="work-row" id="{esc(r['id'])}" data-record data-state="{esc(r['state'])}" data-row-scope="{esc(r['scope'])}">
          <div><h3>{esc(r['title'])}</h3><p>{esc(r['meta'])}</p></div><span class="status" data-record-status>{esc(r['status'])}</span>
        </article>''')
    return '<section class="panel" id="records-panel" role="tabpanel" aria-labelledby="records-title"><div class="panel-head"><h2 id="records-title">Dữ liệu trong phạm vi</h2><output data-visible-count aria-live="polite"></output></div>' + ''.join(items) + '</section>'


def render_filters(rows):
    if len(rows) < 2:
        return ""
    states = sorted({r["state"] for r in rows})
    labels = {"open": "Chờ xử lý", "blocked": "Bị chặn", "waiting": "Đang chờ", "published": "Đã công bố", "closed": "Đã đóng", "active": "Đang thực hiện", "done": "Đã xử lý", "draft": "Nháp", "locked": "Đã khóa"}
    options = ''.join(f'<option value="{esc(s)}">{esc(labels.get(s, s))}</option>' for s in states)
    return f'''<section class="toolbar" aria-label="Tìm và lọc dữ liệu"><label for="page-search">Tìm theo mã hoặc tên</label><input id="page-search" type="search" data-search placeholder="Nhập từ khóa"><label for="page-filter">Trạng thái</label><select id="page-filter" data-filter><option value="all">Tất cả</option>{options}</select></section>'''


def render_tabs(tabs):
    if not tabs:
        return ""
    tab_filters = {"Đang mở": "published", "Đã đóng": "closed", "Chờ xử lý": "open", "Đã xử lý": "done", "Cần bạn xử lý": "active", "Tất cả đề tài": "all"}
    buttons = ''.join(f'<button id="records-tab-{i}" type="button" role="tab" aria-controls="records-panel" aria-selected="{str(i == 0).lower()}" data-tab="tab-{i}" data-tab-filter="{esc(tab_filters.get(tab, "all"))}">{esc(tab)}</button>' for i, tab in enumerate(tabs))
    return f'<div class="tabs" role="tablist" aria-label="Chế độ xem">{buttons}</div>'


def render_gates(gates):
    if not gates:
        return ""
    items = ''.join(f'''<li data-gate-id="{esc(g['id'])}" data-gate-ready="{str(g['ready']).lower()}" class="{'ready' if g['ready'] else 'blocked'}"><span aria-hidden="true">{'✓' if g['ready'] else '!'}</span><div><b>{esc(g['label'])}</b><p>{esc(g['detail'])}</p></div></li>''' for g in gates)
    missing = sum(not g["ready"] for g in gates)
    return f'<aside class="gate-panel" aria-labelledby="gate-title"><h2 id="gate-title">{"Sẵn sàng" if not missing else f"Còn {missing} điều kiện"}</h2><ul>{items}</ul></aside>'


def upload_ids(page_data):
    ids = []
    for a in page_data["actions"]:
        for requirement in a["require"].split(","):
            if requirement.startswith("file:"):
                ids.append(requirement.split(":", 1)[1])
    return list(dict.fromkeys(ids))


def render_uploads(page_data):
    ids = upload_ids(page_data)
    if page_data["upload"] == "none":
        return ""
    controls = ''.join(f'<div class="file-control"><label for="{esc(file_id)}">Chọn tệp bằng chứng cho {esc(file_id)}</label><input id="{esc(file_id)}" type="file" accept="{".pdf,.zip,.csv,.xlsx,.docx" if file_id.startswith("product-") else ".pdf"}" data-file-for="{esc(file_id)}" aria-describedby="{esc(file_id)}-help"><p id="{esc(file_id)}-help">Tải tệp chưa đồng nghĩa với nộp; mỗi tệp được giữ phiên bản riêng và hành động đích sẽ kiểm tra lại.</p></div>' for file_id in ids)
    return f'<section class="panel evidence" data-upload-mode="{esc(page_data["upload"])}"><h2>Bằng chứng được phép tải lên</h2>{controls}</section>'


def render_actions(actions):
    if not actions:
        return ""
    buttons = ''.join(f'''<button type="button" class="button {esc(a['tone'])}" data-action-id="{esc(a['id'])}" data-action-branch="{esc(a['branch'])}" data-target="{esc(a['target'])}" data-require="{esc(a['require'])}" data-unlocks="{esc(a['unlocks'])}" data-result="{esc(a['result'])}">{esc(a['label'])}</button>''' for a in actions)
    return f'<section class="action-bar" aria-label="Hành động trang">{buttons}</section>'


def render_page(page_data):
    folder, role, scope, initials, user = ACTORS[page_data["actor"]]
    links = []
    first_page = next(p for p in PAGES if p["actor"] == page_data["actor"])
    for nav in NAV[page_data["actor"]]:
        candidate = next((p for p in PAGES if p["actor"] == page_data["actor"] and p["active"] == nav), first_page)
        if nav == "Thông báo":
            href = f"../shared/notifications.html#{page_data['actor']}"
        elif nav == "Hồ sơ cá nhân":
            href = f"../shared/profile.html#{page_data['actor']}"
        else:
            href = candidate["filename"]
        badge = f'<span class="task-count" aria-label="{TASK_COUNTS[page_data["actor"]]} việc cần làm">{TASK_COUNTS[page_data["actor"]]}</span>' if nav == "Việc cần làm" else ""
        links.append(f'<a class="nav-link {"active" if nav == page_data["active"] else ""}" href="{esc(href)}" {"aria-current=page" if nav == page_data["active"] else ""}><span>{esc(nav)}</span>{badge}</a>')
    codes = " ".join(page_data["codes"])
    form = f'<section class="panel form-panel" data-business-form id="page-form"><h2>Thông tin nghiệp vụ</h2>{"".join(render_field(f) for f in page_data["fields"])}</section>' if page_data["fields"] else ""
    schema = {key: page_data[key] for key in ("codes", "visibility", "upload")}
    schema_json = json.dumps(schema, ensure_ascii=False).replace("<", "\\u003c")
    return f'''<!doctype html>
<html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{esc(page_data['title'])} — {esc(role)}</title><link rel="stylesheet" href="../shared/actor.css"></head>
<body data-actor="{esc(page_data['actor'])}" data-page-codes="{esc(codes)}" data-visibility="{esc(page_data['visibility'])}" data-upload-mode="{esc(page_data['upload'])}">
<a class="skip-link" href="#main">Bỏ qua đến nội dung chính</a><header class="topbar"><button class="menu-button" type="button" aria-controls="sidebar" aria-expanded="false">☰ <span>Mở menu</span></button><a class="brand" href="../index.html"><span class="seal">DNTU</span><span>NCKH<small>Bộ mockup theo vai trò</small></span></a><div class="role-static"><small>Vai trò hiện hành</small><b>{esc(role)}</b><span>{esc(scope)}</span></div><div class="notification-wrap"><button class="bell" type="button" aria-label="2 thông báo chưa đọc" aria-controls="notification-popover" aria-expanded="false">♢<span>2</span></button><section class="notification-popover" id="notification-popover" aria-label="Thông báo gần đây" hidden><h2>Thông báo gần đây</h2><p><b>Nhiệm vụ được cập nhật</b><br>Kiểm tra danh sách việc cần làm theo vai trò hiện hành.</p><p><b>Nhắc hạn xử lý</b><br>Một tác vụ sẽ đến hạn trong 3 ngày.</p><a href="../shared/notifications.html#{esc(page_data['actor'])}">Xem tất cả thông báo đúng vai trò</a></section></div><div class="account"><span>{esc(initials)}</span><b>{esc(user)}</b></div></header>
<div class="shell"><nav class="sidebar" id="sidebar" aria-label="Điều hướng {esc(role)}"><a class="back-link" href="../index.html">← Bộ vai trò</a><p class="nav-group">Công việc và nghiệp vụ</p>{''.join(links)}</nav><button class="sidebar-overlay" type="button" aria-label="Đóng menu" hidden></button>
<main id="main" tabindex="-1"><nav class="breadcrumb" aria-label="Đường dẫn"><a href="../index.html">Bộ vai trò</a><span>/</span><span>{esc(role)}</span><span>/</span><span>{esc(page_data['title'])}</span></nav>
<div class="page-heading"><div><p class="screen-codes">{esc(' · '.join(page_data['codes']))}</p><h1>{esc(page_data['title'])}</h1><p>{esc(page_data['lead'])}</p></div><span class="scope-chip">Phạm vi: {esc(page_data['visibility'])}</span></div>
{render_tabs(page_data['tabs'])}{render_filters(page_data['rows'])}<div class="workspace"><div>{form}{render_rows(page_data['rows'])}{render_uploads(page_data)}</div>{render_gates(page_data['gates'])}</div>{render_actions(page_data['actions'])}
<p class="empty-filter" data-filter-empty hidden>Không có dữ liệu phù hợp bộ lọc. Hãy đổi điều kiện tìm kiếm.</p><script type="application/json" data-page-schema>{schema_json}</script></main></div>
<div class="toast-region" aria-live="polite" aria-atomic="true"></div><script src="../shared/actor.js"></script></body></html>
'''


def validate_model():
    errors = []
    expected = {"gv": 14, "td": 6, "pk": 23, "ct": 8, "tv": 6, "tk": 6, "qt": 6}
    page_expected = {"gv": 8, "td": 6, "pk": 7, "ct": 8, "tv": 6, "tk": 6, "qt": 6}
    seen = set()
    for actor, count in expected.items():
        actor_pages = [p for p in PAGES if p["actor"] == actor]
        codes = [code for p in actor_pages for code in p["codes"]]
        if len(actor_pages) != page_expected[actor]: errors.append(f"{actor}: expected {page_expected[actor]} pages, got {len(actor_pages)}")
        if len(codes) != count: errors.append(f"{actor}: expected {count} codes, got {len(codes)}")
        for code in codes:
            if code in seen: errors.append(f"duplicate code: {code}")
            seen.add(code)
    for p in PAGES:
        if p["upload"] == "none" and upload_ids(p): errors.append(f"{p['filename']}: file requirement on upload=none page")
        for a in p["actions"]:
            if not any(r["id"] == a["target"] for r in p["rows"]) and a["target"] not in {"page", "page-form", "topic-cancel", "pk-account-form", "ct-ballot", "tv-ballot", "tk-minutes"}:
                errors.append(f"{p['filename']}: unknown action target {a['target']}")
    return errors


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    errors = validate_model()
    drift = []
    if errors:
        print("Schema không hợp lệ:\n- " + "\n- ".join(errors), file=sys.stderr)
        return 1
    for p in PAGES:
        folder = MOCKUPS / ACTORS[p["actor"]][0]
        target = folder / p["filename"]
        expected = render_page(p)
        if args.check:
            if not target.exists() or target.read_text(encoding="utf-8") != expected:
                drift.append(str(target.relative_to(ROOT)))
        else:
            folder.mkdir(parents=True, exist_ok=True)
            target.write_text(expected, encoding="utf-8", newline="\n")
    if drift:
        print("Output lệch generator:\n- " + "\n- ".join(drift), file=sys.stderr)
        return 1
    print(f"OK: {len(PAGES)} trang, {sum(len(p['codes']) for p in PAGES)} mã; schema/action/gate hợp lệ" + ("; không có drift" if args.check else "; đã sinh output"))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
