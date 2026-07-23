#!/usr/bin/env python3
"""Generate the seven non-student actor mockup suites from explicit page schemas."""

from __future__ import annotations

import argparse
import html
import json
import re
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

# Giảng viên dùng cùng visual system với Sinh viên. Các tệp này được clone từ
# nguồn Sinh viên ở mỗi lần sinh output để hai suite không thể drift về layout.
LECTURER_CLONES = {
    "00-dang-ky-xac-minh.html": "00-dang-ky-xac-minh.html",
    "01-danh-sach-de-tai.html": "01-danh-sach-de-tai.html",
    "02-dot-dang-ky.html": "02-dot-dang-ky.html",
    "03-bm01a-ho-so.html": "03-bm01b-ho-so.html",
    "03b-bm01a-truong-don-vi-tra.html": "03b-bm01b-gvhd-tu-choi.html",
    "04-chi-tiet-de-tai.html": "04-chi-tiet-de-tai.html",
    "05-yeu-cau-huy.html": "05-yeu-cau-huy.html",
    "06-workspace-buoc-03-07.html": "06-workspace-buoc-03-07.html",
    "07-ket-qua-hoan-tat.html": "07-ket-qua-hoan-tat.html",
    "08-thong-bao.html": "08-thong-bao.html",
    "09-ho-so-ca-nhan.html": "09-ho-so-va-khong-quyen.html",
}

LECTURER_OLD_FILES = {
    "01-viec-can-lam.html", "03-bm01a.html",
    "04-de-tai-cua-toi.html", "05-xet-ho-so-sinh-vien.html",
    "06-yeu-cau-huy.html", "07-tai-lieu-buoc-03-07.html",
    "08-ket-qua-da-cong-bo.html",
}

LECTURER_PAGE_CODES = {
    "00-dang-ky-xac-minh.html": [],
    "01-danh-sach-de-tai.html": ["GV-01"],
    "02-dot-dang-ky.html": ["GV-02", "GV-03"],
    "03-bm01a-ho-so.html": ["GV-04"],
    "03b-bm01a-truong-don-vi-tra.html": [],
    "04-chi-tiet-de-tai.html": ["GV-05", "GV-06"],
    "05-yeu-cau-huy.html": ["GV-09"],
    "06-workspace-buoc-03-07.html": ["GV-10", "GV-11", "GV-12", "GV-13"],
    "07-ket-qua-hoan-tat.html": ["GV-14"],
    "08-thong-bao.html": [],
    "09-ho-so-ca-nhan.html": [],
    "10-xet-duyet-ho-so-sinh-vien.html": ["GV-07", "GV-08"],
    "07b-ket-qua-chua-cong-bo.html": [],
    "10b-xet-duyet-khong-quyen.html": [],
}


def lecturer_transform(raw, target):
    replacements = {
        "student.css": "lecturer.css", "student.js": "lecturer.js",
        "data-current-role=\"student\"": "data-current-role=\"lecturer\"",
        "Vai trò: Sinh viên": "Vai trò: Giảng viên",
        "Sinh viên": "Giảng viên",
        "Nguyễn Minh An": "TS. Nguyễn Thị Lan", ">NA<": ">NL<",
        "22112345": "GV-2026-0088", "22112661": "GV-2024-0042",
        "GV-2026-0088@sv.dntu.edu.vn": "lan.nguyen@dntu.edu.vn",
        "BM01B": "BM01A", "HS-SV-": "HS-GV-", "NCKH-SV-": "NCKH-GV-",
        "DK-SV-": "DK-GV-", "ĐK-SV-": "ĐK-GV-", "Dành cho Sinh viên": "Dành cho Giảng viên",
        "09-ho-so-va-khong-quyen.html": "09-ho-so-ca-nhan.html",
        "03-bm01b-ho-so.html": "03-bm01a-ho-so.html",
        "03b-bm01b-gvhd-tu-choi.html": "03b-bm01a-truong-don-vi-tra.html",
        "Giảng viên hướng dẫn": "Trưởng đơn vị", "GVHD": "Trưởng đơn vị",
        "Chờ Giảng viên hướng dẫn": "Chờ Trưởng đơn vị",
        "Trưởng đơn vị từ chối ký": "Trưởng đơn vị trả sửa",
        "Hồ sơ BM01A cần được thay thế": "BM01A cần chỉnh sửa và nộp V2",
    }
    for old, new in replacements.items():
        raw = raw.replace(old, new)
    codes = " ".join(LECTURER_PAGE_CODES.get(target, []))
    if target.endswith(".html"):
        raw = re.sub(r'<body([^>]*)>', lambda m: f'<body{m.group(1)} data-actor="gv" data-page-codes="{codes}">', raw, count=1)
        raw = raw.replace('Đề tài <span class="nav-count">5</span>', 'Đề tài <span class="nav-count">6</span>')
    # BM01A không có trường chọn người hướng dẫn và không có gate tương ứng.
    if target == "03-bm01a-ho-so.html":
        raw = re.sub(r'<section class="form-section" data-advisor-section>.*?</section>\s*', '', raw, flags=re.S)
        raw = re.sub(r'<div class="check blocked" data-advisor-check>.*?</div>', '', raw, flags=re.S)
        raw = raw.replace('Hồ sơ chỉ được nộp một lần.', 'Hồ sơ được gửi tới Trưởng đơn vị sau khi nộp.')
        raw = raw.replace('Sau khi tạo Hồ sơ, nội dung và tệp PDF sẽ bị khóa, không thể sửa hoặc thay thế.', 'Sau khi tạo Hồ sơ, dữ liệu được khóa trong thời gian Trưởng đơn vị xử lý; nếu bị trả, bạn sửa và nộp lại thành phiên bản mới.')
        raw = raw.replace('Không có Lưu nháp, sửa Hồ sơ, nộp lại hoặc tạo phiên bản mới.', 'Nếu Trưởng đơn vị trả sửa, hệ thống giữ bản đã nộp và mở form để tạo phiên bản mới.')
        raw = raw.replace('<input id="topic-name"', '<input id="topic-name" required data-bm01-required')
        raw = raw.replace('<select id="research-field">', '<select id="research-field" required data-bm01-required>')
        raw = raw.replace('<textarea id="objective">', '<textarea id="objective" required data-bm01-required>')
        raw = raw.replace('phù hợp với năng lực và tiến độ học tập của từng sinh viên', 'phù hợp với nhu cầu tra cứu và quản lý tri thức của đơn vị')
        extra_fields = '<div class="field full"><label for="importance">Tính cấp thiết</label><textarea id="importance" required data-bm01-required>Làm rõ nhu cầu tự động hóa phân loại tài liệu nghiên cứu trong đơn vị.</textarea></div><div class="field full"><label for="expected-products">Sản phẩm dự kiến</label><textarea id="expected-products" required data-bm01-required>Bộ dữ liệu, mô hình thử nghiệm và báo cáo khoa học.</textarea></div><div class="field full"><label for="research-content">Nội dung nghiên cứu</label><textarea id="research-content" required data-bm01-required>Khảo sát dữ liệu, xây dựng mô hình, đánh giá và chuyển giao kết quả.</textarea></div><div class="field"><label for="duration">Thời gian thực hiện</label><input id="duration" value="12 tháng" required data-bm01-required></div><div class="field"><label for="budget">Kinh phí dự kiến</label><input id="budget" value="25.000.000 đồng" required data-bm01-required></div><div class="field full"><label for="application-effect">Khả năng ứng dụng và hiệu quả</label><textarea id="application-effect" required data-bm01-required>Ứng dụng tại thư viện số và giảm thời gian phân loại thủ công.</textarea></div>'
        raw = raw.replace('</textarea></div></div></section>', '</textarea></div>' + extra_fields + '</div></section>', 1)
        raw = raw.replace('<div class="check ok">✓ Thông tin đề tài đầy đủ</div>', '<div class="check ok" data-required-check>✓ Thông tin BM01A đầy đủ</div>')
        raw = raw.replace('<div class="check ok">✓ Nhóm nghiên cứu hợp lệ</div>', '<div class="check ok" data-eligibility-check>✓ Nhóm nghiên cứu và tư cách Chủ nhiệm hợp lệ</div><div class="check ok" data-route-check>✓ Tuyến xử lý: Trưởng đơn vị Khoa Công nghệ</div>')
        raw = raw.replace('GV-2024-0042 · Thành viên tham gia', 'GV-2024-0042 · ha.tran@dntu.edu.vn · Thành viên tham gia')
        raw = raw.replace('Mô hình gợi ý tài liệu học tập theo năng lực', 'Ứng dụng học máy trong phân loại tài liệu nghiên cứu')
        raw = raw.replace('Đề xuất mô hình gợi ý tài liệu phù hợp với nhu cầu tra cứu và quản lý tri thức của đơn vị.', 'Xây dựng mô hình học máy hỗ trợ phân loại tài liệu nghiên cứu theo nhóm chủ đề.')
        raw = raw.replace('data-application-page>', 'data-application-page data-v1-pdf-hash="618b23c5563ac2eeb4e78a0f0a6d34a95a444aee66a91d984f3b6508cacd887c">')
    if target == "03b-bm01a-truong-don-vi-tra.html":
        raw = raw.replace('Trưởng đơn vị từ chối ký BM01A', 'Trưởng đơn vị trả sửa BM01A')
        raw = raw.replace('Không ký duyệt', 'Trả sửa')
        raw = raw.replace('Hồ sơ không được Trưởng đơn vị ký duyệt.', 'Trưởng đơn vị đã trả Hồ sơ để chỉnh sửa.')
        raw = raw.replace('Hồ sơ và PDF đã nộp được giữ nguyên để đối chiếu; bạn không thể sửa, thay tệp hoặc nộp lại trên mã Hồ sơ này.', 'Bản BM01A V1 và PDF đã nộp được giữ nguyên để đối chiếu. Bạn có thể sửa dữ liệu và nộp PDF mới để tạo V2 trên cùng Hồ sơ.')
        raw = raw.replace('Hồ sơ cũ đã kết thúc và bị khóa', 'BM01A V1 đã khóa và được giữ lịch sử')
        raw = raw.replace('Được tạo một Hồ sơ thay thế mới', 'Được sửa và nộp lại thành BM01A V2')
        raw = raw.replace('Hồ sơ mới có mã riêng, liên kết tới HS-GV-2026-031 và phải chọn một PDF mới trước khi tạo.', 'Phiên bản V2 giữ cùng mã Hồ sơ, liên kết V1 và yêu cầu chọn PDF mới trước khi nộp lại.')
        raw = raw.replace('Tạo Hồ sơ thay thế', 'Sửa và nộp lại BM01A')
        raw = raw.replace('#thay-the-HS-GV-2026-031', '#nop-lai-HS-GV-2026-031')
        raw = raw.replace('Hồ sơ thay thế', 'phiên bản nộp lại')
        raw = raw.replace('tạo thay thế', 'nộp lại')
        raw = raw.replace('Sinh viên chỉ có thể xem Hồ sơ', 'Giảng viên chỉ có thể xem Hồ sơ')
        raw = raw.replace('không thể sửa, thay tệp hoặc nộp lại', 'được giữ bất biến; chỉnh sửa thực hiện trên phiên bản V2')
        raw = raw.replace('Hồ sơ mới', 'Phiên bản V2')
        raw = raw.replace('bị từ chối ký', 'bị trả sửa')
        raw = raw.replace('từ chối ký', 'trả sửa')
        raw = raw.replace('<main class="content">', '<main class="content" data-returned-application>')
        raw = raw.replace('<a class="primary button-link" href="03-bm01a-ho-so.html#nop-lai-HS-GV-2026-031">', '<a class="primary button-link" data-action="resubmit-returned-bm01" href="03-bm01a-ho-so.html#nop-lai-HS-GV-2026-031">')
        raw = raw.replace('<a class="primary" href="03-bm01a-ho-so.html#nop-lai-HS-GV-2026-031">', '<a class="primary" data-action="resubmit-returned-bm01" href="03-bm01a-ho-so.html#nop-lai-HS-GV-2026-031">')
        raw = raw.replace('Không được sao chép tự động sang phiên bản nộp lại.', 'Được giữ làm V1; V2 phải dùng PDF mới.')
    if target == "01-danh-sach-de-tai.html":
        raw = raw.replace('Các đề tài bạn làm Chủ nhiệm hoặc tham gia với tư cách Thành viên.', 'Các đề tài bạn làm Chủ nhiệm hoặc tham gia, cùng Hồ sơ Sinh viên được phân công xét duyệt.')
        raw = raw.replace('5</strong><span>Tổng số đề tài', '6</strong><span>Tổng số đề tài')
        raw = raw.replace('2</strong><span>Cần bạn xử lý', '3</strong><span>Cần bạn xử lý')
        raw = raw.replace('Cần bạn xử lý <span class="tab-count">2</span>', 'Cần bạn xử lý <span class="tab-count">3</span>')
        raw = raw.replace('<option value="member">Thành viên tham gia</option>', '<option value="member">Thành viên tham gia</option><option value="advisor">Hồ sơ Sinh viên được phân công</option>')
        raw = raw.replace('Giảng viên hướng dẫn duyệt Hồ sơ BM01A đã nộp.', 'Trưởng đơn vị duyệt Hồ sơ BM01A đã nộp.')
        review_card = '<article class="topic-card" data-relation="advisor" data-status="waiting" data-round="2026-1" data-action="true"><div><div><span class="badge member">Bạn được phân công xét duyệt</span> <span class="badge warning">Chờ quyết định</span></div><h2 class="topic-title">Hồ sơ Sinh viên: Phân loại tài liệu nghiên cứu</h2><span class="meta">HS-SV-2026-044 · BM01B V1 · Sinh viên Lê Hoàng Minh</span><div class="next-action"><b>Hành động tiếp theo:</b> Xem snapshot BM01B và Duyệt hoặc Trả sửa có lý do.</div></div><div class="topic-actions"><span class="badge warning">Còn 2 ngày</span><a class="primary" href="10-xet-duyet-ho-so-sinh-vien.html">Xét Hồ sơ</a></div></article>'
        raw = raw.replace('</section><div class="empty" id="empty">', review_card + '</section><div class="empty" id="empty">')
        raw = raw.replace('href="04-chi-tiet-de-tai.html">Xem chi tiết</a></div></article>\n<article class="topic-card" data-relation="member"', 'href="04-chi-tiet-de-tai.html">Xem Hồ sơ</a></div></article>\n<article class="topic-card" data-relation="member"', 1)
        raw = raw.replace('<strong>2</strong><span>Bạn là Chủ nhiệm', '<strong>3</strong><span>Bạn là Chủ nhiệm')
        raw = raw.replace('<strong>3</strong><span>Bạn là Thành viên', '<strong>2</strong><span>Bạn là Thành viên')
        raw = raw.replace('<article class="topic-card" data-relation="member" data-status="active" data-round="2025-2" data-action="true"><div><div><span class="badge member">Bạn là Thành viên tham gia</span> <span class="badge warning">Đang thực hiện</span></div><h2 class="topic-title">Xây dựng bộ dữ liệu phục vụ dự báo tuyển sinh</h2><span class="meta">NCKH-GV-2025-066 · Đợt 2/2025 · Chủ nhiệm: Trần Thu Hà</span><div class="next-action"><b>Hành động tiếp theo:</b> Bổ sung sản phẩm được phân công vào bộ BM09.</div>', '<article class="topic-card" data-relation="owner" data-status="active" data-round="2025-2" data-action="true"><div><div><span class="badge owner">Bạn là Chủ nhiệm đề tài</span> <span class="badge warning">Đang thực hiện</span></div><h2 class="topic-title">Xây dựng bộ dữ liệu phục vụ dự báo tuyển sinh</h2><span class="meta">NCKH-GV-2025-066 · Đợt 2/2025 · Chủ nhiệm: TS. Nguyễn Thị Lan</span><div class="next-action"><b>Hành động tiếp theo:</b> Hoàn thiện BM09 và bộ sản phẩm với quyền Chủ nhiệm.</div>')
        raw = raw.replace('<span class="badge">Bước 05</span><a class="secondary" href="04-chi-tiet-de-tai.html">Xem chi tiết</a>', '<span class="badge">Bước 05</span><span class="secondary button-link" aria-disabled="true">Chi tiết chưa có trong prototype</span>')
    if target == "02-dot-dang-ky.html":
        raw = raw.replace('<div class="toolbar"><div class="field search"><label>Tìm kiếm</label><input placeholder="Tên hoặc mã đợt đăng ký"></div><div class="field"><label>Trạng thái</label><select>', '<form class="toolbar" id="round-filters"><div class="field search"><label for="round-search">Tìm kiếm</label><input id="round-search" placeholder="Tên hoặc mã đợt đăng ký"></div><div class="field"><label for="round-status">Trạng thái</label><select id="round-status"><option value="all">Tất cả</option>')
        raw = raw.replace('</select></div></div>\n<section class="topic-list">', '</select></div></form>\n<section class="topic-list" id="round-list">')
        raw = raw.replace('<option>Đang mở</option>', '<option value="open">Đang mở</option>').replace('<option>Sắp mở</option>', '<option value="upcoming">Sắp mở</option>').replace('<option>Đã đóng</option>', '<option value="closed">Đã đóng</option>')
        raw = raw.replace('<article class="topic-card">', '<article class="topic-card" data-round-status="open">', 1)
        raw = raw.replace('<article class="topic-card">', '<article class="topic-card" data-round-status="upcoming">', 1)
        raw = raw.replace('<article class="topic-card">', '<article class="topic-card" data-round-status="closed">', 1)
        raw = raw.replace('</section>\n</main>', '</section><div class="empty" id="round-empty"><h2>Không có Đợt đăng ký phù hợp</h2><p>Hãy đổi từ khóa hoặc trạng thái.</p></div>\n</main>')
        raw = raw.replace('</main></div></div><script src="lecturer.js"></script>', '</main></div></div><script>const roundCards=[...document.querySelectorAll(\'[data-round-status]\')],roundSearch=document.getElementById(\'round-search\'),roundStatus=document.getElementById(\'round-status\'),roundEmpty=document.getElementById(\'round-empty\');function filterRounds(){const query=roundSearch.value.trim().toLowerCase(),status=roundStatus.value;let visible=0;roundCards.forEach(card=>{const show=(!query||card.innerText.toLowerCase().includes(query))&&(status===\'all\'||card.dataset.roundStatus===status);card.hidden=!show;if(show)visible++});roundEmpty.classList.toggle(\'show\',visible===0)}roundSearch.addEventListener(\'input\',filterRounds);roundStatus.addEventListener(\'change\',filterRounds);filterRounds();</script><script src="lecturer.js"></script>')
        raw = raw.replace('href="04-chi-tiet-de-tai.html">Xem đề tài', 'href="06-workspace-buoc-03-07.html">Mở workspace đề tài')
    if target == "04-chi-tiet-de-tai.html":
        raw = raw.replace('NCKH-GV-2025-066', 'HS-GV-2026-031').replace('Xây dựng bộ dữ liệu phục vụ dự báo tuyển sinh', 'Mô hình gợi ý tài liệu học tập theo năng lực')
        raw = raw.replace('Bạn là Thành viên tham gia', 'Bạn là Chủ nhiệm đề tài').replace('Đang thực hiện · Bước 06', 'Chờ Trưởng đơn vị · Bước 01')
        raw = re.sub(r'<div class="next-action">.*?</div>', '<div class="next-action"><b>Đang chờ Trưởng đơn vị xử lý BM01A V1.</b><br>Hồ sơ HS-GV-2026-031 đã khóa; bạn sẽ nhận thông báo nếu được duyệt hoặc trả sửa.</div>', raw, count=1, flags=re.S)
        raw = re.sub(r'<aside><section class="card"><h2>Thông tin đề tài</h2>.*?</section>', '<aside><section class="card"><h2>Thông tin đề tài</h2><p><b>Chủ nhiệm:</b><br>TS. Nguyễn Thị Lan</p><p><b>Đơn vị:</b><br>Khoa Công nghệ</p><p><b>Vai trò của bạn:</b><br>Chủ nhiệm đề tài</p><div class="notice">Tuyến duyệt hiện tại: Trưởng đơn vị Khoa Công nghệ.</div></section>', raw, count=1, flags=re.S)
        timeline = '<ol class="timeline"><li class="step active"><i>1</i>Bước 01<br>Chờ Trưởng đơn vị</li><li class="step"><i>2</i>Bước 02<br>Xét hồ sơ</li><li class="step"><i>3</i>Bước 03<br>Thuyết minh</li><li class="step"><i>4</i>Bước 04<br>Triển khai</li><li class="step"><i>5</i>Bước 05<br>Tiến độ</li><li class="step"><i>6</i>Bước 06<br>Nghiệm thu</li><li class="step"><i>7</i>Bước 07<br>Hoàn tất</li></ol>'
        raw = re.sub(r'<ol class="timeline">.*?</ol>', timeline, raw, count=1, flags=re.S)
        raw = re.sub(r'<section class="card"><h2>Tài liệu hiện hành</h2>.*?</section>', '<section class="card"><h2>Tài liệu hiện hành</h2><div class="doc-row"><div><b>BM01A — Hồ sơ đăng ký</b><br><span class="meta">V1 · PDF đã nộp · chỉ đọc</span></div><span class="badge warning">Chờ Trưởng đơn vị</span></div></section>', raw, count=1, flags=re.S)
        raw = raw.replace('<h2>Hoạt động gần đây</h2><p><b>Chủ nhiệm tạo BM09 V1</b><br><span class="meta">22/07/2026 08:10</span></p><p><b>P.KHCN tiếp nhận BM08 V3</b><br><span class="meta">18/07/2026 14:25</span></p>', '<h2>Hoạt động gần đây</h2><p><b>Chủ nhiệm nộp BM01A V1</b><br><span class="meta">20/07/2026 14:20</span></p><p><b>Hồ sơ chuyển Trưởng đơn vị</b><br><span class="meta">20/07/2026 14:21</span></p>')
    if target == "06-workspace-buoc-03-07.html":
        raw = raw.replace('Bạn là Thành viên tham gia · được phân công bổ sung sản phẩm dữ liệu', 'Bạn là Chủ nhiệm đề tài · quản lý bộ tài liệu Bước 03–07')
        raw = raw.replace('Phụ trách: TS. Nguyễn Thị Lan · bắt buộc', 'Phụ trách: TS. Nguyễn Thị Lan · Chủ nhiệm · bắt buộc')
        raw = raw.replace('<h2>Quyền của bạn</h2><p>Bạn chỉ tải và thay thế sản phẩm được Chủ nhiệm phân công.</p><div class="notice">Chủ nhiệm đề tài là người xác nhận và Nộp toàn bộ BM09 đến P.KHCN.</div>', '<h2>Quyền của bạn</h2><p>Bạn là Chủ nhiệm, được quản lý tài liệu và sản phẩm của đề tài.</p><div class="notice">Chỉ nộp BM09 khi đủ báo cáo và từng tệp sản phẩm bắt buộc.</div>')
        raw = raw.replace("<script>const tabs=[...document.querySelectorAll('.tab')],views=[...document.querySelectorAll('.workspace-view')];tabs.forEach(tab=>tab.addEventListener('click',()=>{tabs.forEach(t=>t.classList.toggle('active',t===tab));views.forEach(v=>v.hidden=v.id!==tab.dataset.view)}));</script>", "<script>const tabs=[...document.querySelectorAll('.tab')],views=[...document.querySelectorAll('.workspace-view')],uploadAction=document.querySelector('[data-action=\"upload-demo\"]');function activateWorkspace(tab){tabs.forEach(item=>item.classList.toggle('active',item===tab));views.forEach(view=>view.hidden=view.id!==tab.dataset.view);const bm09Active=tab.dataset.view==='bm09';uploadAction.hidden=!bm09Active;uploadAction.disabled=!bm09Active;uploadAction.dataset.activeDocument=tab.dataset.view}tabs.forEach(tab=>tab.addEventListener('click',()=>activateWorkspace(tab)));activateWorkspace(document.querySelector('.tab.active'));</script>")
        raw = raw.replace('<a class="link" href="04-chi-tiet-de-tai.html">NCKH-GV-2025-066</a>', '<a class="link" href="01-danh-sach-de-tai.html">NCKH-GV-2025-066</a>')
    if target == "07-ket-qua-hoan-tat.html":
        raw = raw.replace('Bạn đang xem phiên bản hiện hành.', 'Bạn đang xem kết luận đã công bố; hệ thống không hiển thị điểm đánh giá.')
    if target == "08-thong-bao.html":
        raw = raw.replace('<span class="badge warning">Được phân công</span><h3 style="margin-top:6px">Bổ sung sản phẩm cho BM09</h3><p class="meta">NCKH-GV-2025-066 · Chủ nhiệm giao bạn tải bộ dữ liệu đã làm sạch.', '<span class="badge warning">Chủ nhiệm cần xử lý</span><h3 style="margin-top:6px">Hoàn thiện sản phẩm cho BM09</h3><p class="meta">NCKH-GV-2025-066 · Bạn là Chủ nhiệm, cần hoàn thiện bộ dữ liệu đã làm sạch.')
    if target == "09-ho-so-ca-nhan.html":
        raw = raw.replace('Thông tin Giảng viên', 'Thông tin Giảng viên')
        raw = raw.replace('Mã Giảng viên', 'Mã Giảng viên')
        raw = raw.replace('GV-2026-0088@sv.dntu.edu.vn', 'lan.nguyen@dntu.edu.vn')
        raw = raw.replace('<label>Khoa</label><input value="Khoa Công nghệ" readonly>', '<label>Đơn vị</label><input value="Khoa Công nghệ" readonly>')
        raw = raw.replace('<label>Chuyên ngành</label><input value="Công nghệ thông tin">', '<label>Chuyên môn</label><input value="Học máy, xử lý dữ liệu">')
        raw = raw.replace('<h2>Thông tin học thuật</h2><div class="form-grid"><div class="field"><label>Khóa học</label><input value="2022–2026"></div><div class="field"><label>Lớp</label><input value="22DTH1"></div><div class="field full"><label>Lĩnh vực quan tâm</label><input value="Học máy, xử lý dữ liệu"></div></div>', '<h2>Thông tin chuyên môn</h2><div class="form-grid"><div class="field"><label>Chức danh</label><input value="Tiến sĩ · Giảng viên"></div><div class="field"><label>Đơn vị công tác</label><input value="Khoa Công nghệ" readonly></div><div class="field full"><label>Lĩnh vực nghiên cứu</label><input value="Học máy, xử lý dữ liệu"></div></div>')
    if target == "lecturer.js":
        raw = raw.replace('Tạo Hồ sơ thay thế', 'Sửa và nộp lại BM01A')
        raw = raw.replace('Hồ sơ thay thế', 'phiên bản nộp lại')
        raw = raw.replace('không được sửa hoặc sao chép tự động', 'được giữ làm lịch sử và không bị ghi đè')
        raw = raw.replace("title: 'Nộp PDF và tạo Hồ sơ?',", "title: replacementSource ? 'Nộp/cập nhật BM01A V2 trên cùng Hồ sơ?' : 'Nộp PDF và tạo Hồ sơ?',")
        raw = raw.replace("confirmLabel: 'Nộp & tạo Hồ sơ',", "confirmLabel: replacementSource ? 'Nộp/cập nhật BM01A V2' : 'Nộp & tạo Hồ sơ',")
        raw = raw.replace("submitApplication.textContent = 'Đã nộp · Hồ sơ đã tạo';", "submitApplication.textContent = replacementSource ? 'Đã cập nhật BM01A V2' : 'Đã nộp · Hồ sơ đã tạo';")
        raw = raw.replace("showToast(`Đã nộp PDF và tạo Hồ sơ ${applicationId}.`);", "showToast(replacementSource ? `Đã nộp/cập nhật BM01A V2 trên cùng Hồ sơ ${applicationId}.` : `Đã nộp PDF và tạo Hồ sơ ${applicationId}.`);")
        raw = raw.replace("document.querySelectorAll('[data-action=\"upload-demo\"]').forEach(button => button.addEventListener('click', () => {", "document.querySelectorAll('[data-action=\"upload-demo\"]').forEach(button => button.addEventListener('click', () => {\n      if (button.dataset.activeDocument && button.dataset.activeDocument !== 'bm09') { showToast('Chỉ tải sản phẩm khi đang mở tab BM09.', 'warning'); return; }")
        raw = raw.replace("return dialog;\n  }\n\n  function setUnreadCount", "return dialog;\n  }\n\n  window.NCKHUI = { openDialog, showToast, escapeHtml };\n\n  function setUnreadCount")
        raw = raw.replace("const replacementSource = window.location.hash.startsWith('#thay-the-') ? window.location.hash.slice('#thay-the-'.length) : '';\n    const applicationId = replacementSource ? 'HS-GV-2026-032' : 'HS-GV-2026-031';", "const replacementSource = window.location.hash === '#nop-lai-HS-GV-2026-031' ? 'HS-GV-2026-031' : '';\n    const createdApplicationId = 'HS-GV-2026-045';\n    const applicationId = replacementSource || createdApplicationId;\n    const applicationVersion = replacementSource ? 'V2' : 'V1';\n    const roundClosed = new URLSearchParams(window.location.search).get('round') === 'closed';")
        raw = raw.replace("document.querySelector('[data-application-page] h1').textContent = 'BM01A — Sửa và nộp lại BM01A';", "document.querySelector('[data-application-page] h1').textContent = 'BM01A — Sửa và nộp lại V2';")
        raw = raw.replace("document.querySelector('[data-application-lead]').textContent = `Hồ sơ mới sẽ liên kết tới ${replacementSource} · chưa được tạo cho đến khi nộp PDF thành công`;", "document.querySelector('[data-application-lead]').textContent = `${applicationId} · đang soạn BM01A V2 trên cùng Hồ sơ`;" )
        raw = raw.replace("rule.innerHTML = `<b>Đây là phiên bản nộp lại cho ${escapeHtml(replacementSource)}.</b><br>Thông tin và PDF cũ được giữ làm lịch sử và không bị ghi đè. Hãy hoàn thiện phản hồi của Trưởng đơn vị, chọn một PDF mới và nộp một lần.`;", "rule.innerHTML = `<b>Đang sửa BM01A V2 trên cùng Hồ sơ ${escapeHtml(applicationId)}.</b><br>V1 và PDF cũ được giữ bất biến; hãy cập nhật nội dung theo phản hồi của Trưởng đơn vị và chọn PDF mới.`;")
        raw = raw.replace("rule.innerHTML = `<b>Đang sửa BM01A V2 trên cùng Hồ sơ ${escapeHtml(applicationId)}.</b><br>V1 và PDF cũ được giữ bất biến; hãy cập nhật nội dung theo phản hồi của Trưởng đơn vị và chọn PDF mới.`;", "rule.innerHTML = `<b>Đang sửa BM01A V2 trên cùng Hồ sơ ${escapeHtml(applicationId)}.</b><br>V1 và PDF cũ được giữ bất biến; hãy cập nhật nội dung theo phản hồi của Trưởng đơn vị và chọn PDF mới.`;\n      document.title = 'NCKH — BM01A V2 · HS-GV-2026-031';\n      const v2Values = { 'topic-name': 'Mô hình gợi ý tài liệu học tập theo năng lực', objective: 'Đề xuất mô hình gợi ý tài liệu phù hợp với nhu cầu tra cứu và quản lý tri thức của đơn vị.', importance: 'Làm rõ nhu cầu tự động hóa quản lý và gợi ý tài liệu trong đơn vị.', 'expected-products': 'Bộ dữ liệu, mô hình gợi ý thử nghiệm và báo cáo khoa học.', 'research-content': 'Khảo sát nhu cầu, xây dựng mô hình gợi ý, đánh giá và chuyển giao kết quả.', duration: '12 tháng', budget: '25.000.000 đồng', 'application-effect': 'Ứng dụng tại thư viện số và hỗ trợ tra cứu tài liệu theo nhu cầu.' };\n      Object.entries(v2Values).forEach(([id, value]) => { const field = document.getElementById(id); if (field) field.value = value; });\n      document.querySelector('[data-action=\"submit-create-application\"]').textContent = 'Nộp/cập nhật BM01A V2 trên cùng Hồ sơ';")
        raw = raw.replace("description: 'Tìm bằng mã Giảng viên hoặc email Trường. Thành viên được thêm vào dữ liệu tạm trước khi tạo Hồ sơ.',", "description: 'Tìm bằng mã Giảng viên hoặc email Trường. Chỉ Tài khoản đủ điều kiện mới được thêm.',")
        raw = raw.replace('value="22112788"', 'value="GV-2025-0112"')
        raw = raw.replace('Phạm Bảo Trâm', 'ThS. Phạm Bảo Trâm')
        raw = raw.replace('22112788 · Khoa Công nghệ', 'GV-2025-0112 · tram.pham@dntu.edu.vn · Khoa Công nghệ')
        raw = raw.replace('</div><span class="badge success">Đủ điều kiện</span></div>', '</div><span class="badge success">Đủ điều kiện</span></div><p id="member-search-error" class="meta" aria-live="polite"></p>')
        raw = raw.replace("onConfirm: () => {\n          if (document.querySelector('[data-member-id=\"22112788\"]'))", "onConfirm: dialogNode => {\n          const query = dialogNode.querySelector('#member-search').value.trim().toLowerCase();\n          const error = dialogNode.querySelector('#member-search-error');\n          if (!['gv-2025-0112', 'tram.pham@dntu.edu.vn'].includes(query)) { error.textContent = 'Không tìm thấy Giảng viên đủ điều kiện theo mã/email đã nhập.'; showToast('Không thể thêm: mã hoặc email không hợp lệ/không đủ điều kiện.', 'danger'); dialogNode.querySelector('#member-search').focus(); return false; }\n          if (document.querySelector('[data-member-id=\"22112788\"]'))")
        raw = raw.replace('[data-member-id="22112788"]', '[data-member-id="GV-2025-0112"]')
        raw = raw.replace("row.dataset.memberId = '22112788';", "row.dataset.memberId = 'GV-2025-0112';\n          row.dataset.memberRow = '';")
        raw = raw.replace('22112788 · Thành viên tham gia', 'GV-2025-0112 · tram.pham@dntu.edu.vn · Thành viên tham gia')
        raw = raw.replace("const selectedAdvisorName = advisorSelected && !advisorSelected.hidden ? document.querySelector('[data-advisor-name]').textContent : 'Chưa chọn Trưởng đơn vị';", "const selectedAdvisorName = 'Trưởng đơn vị Khoa Công nghệ';")
        raw = raw.replace('<div class="pdf-sheet-row"><span>Đơn vị:</span><span class="pdf-sheet-value" data-live-pdf="unit">${escapeHtml(unit.value)}</span></div>', '')
        raw = raw.replace('<div class="field"><label for="preview-unit">Đơn vị</label><input id="preview-unit" value="${escapeHtml(unit.value)}" readonly></div>', '')
        raw = raw.replace("const objective = document.querySelector('#objective');", "const objective = document.querySelector('#objective');\n      const importance = document.querySelector('#importance');\n      const expectedProducts = document.querySelector('#expected-products');\n      const researchContent = document.querySelector('#research-content');\n      const duration = document.querySelector('#duration');\n      const budget = document.querySelector('#budget');\n      const applicationEffect = document.querySelector('#application-effect');")
        pdf_required_rows = '<div class="pdf-sheet-row"><span>Tính cấp thiết:</span><span class="pdf-sheet-value" data-live-pdf="importance">${escapeHtml(importance.value)}</span></div><div class="pdf-sheet-row"><span>Sản phẩm:</span><span class="pdf-sheet-value" data-live-pdf="products">${escapeHtml(expectedProducts.value)}</span></div><div class="pdf-sheet-row"><span>Nội dung:</span><span class="pdf-sheet-value" data-live-pdf="content">${escapeHtml(researchContent.value)}</span></div><div class="pdf-sheet-row"><span>Thời gian:</span><span class="pdf-sheet-value" data-live-pdf="duration">${escapeHtml(duration.value)}</span></div><div class="pdf-sheet-row"><span>Kinh phí:</span><span class="pdf-sheet-value" data-live-pdf="budget">${escapeHtml(budget.value)}</span></div><div class="pdf-sheet-row"><span>Ứng dụng/hiệu quả:</span><span class="pdf-sheet-value" data-live-pdf="application-effect">${escapeHtml(applicationEffect.value)}</span></div>'
        raw = raw.replace('</span></div></div><div class="pdf-sheet-section"><h4>2. Nhóm nghiên cứu</h4>', '</span></div>' + pdf_required_rows + '</div><div class="pdf-sheet-section"><h4>2. Nhóm nghiên cứu</h4>')
        preview_required_fields = '<div class="field"><label for="preview-importance">Tính cấp thiết</label><textarea id="preview-importance">${escapeHtml(importance.value)}</textarea></div><div class="field"><label for="preview-products">Sản phẩm dự kiến</label><textarea id="preview-products">${escapeHtml(expectedProducts.value)}</textarea></div><div class="field"><label for="preview-content">Nội dung nghiên cứu</label><textarea id="preview-content">${escapeHtml(researchContent.value)}</textarea></div><div class="field"><label for="preview-duration">Thời gian</label><input id="preview-duration" value="${escapeHtml(duration.value)}"></div><div class="field"><label for="preview-budget">Kinh phí</label><input id="preview-budget" value="${escapeHtml(budget.value)}"></div><div class="field"><label for="preview-application-effect">Khả năng ứng dụng và hiệu quả</label><textarea id="preview-application-effect">${escapeHtml(applicationEffect.value)}</textarea></div>'
        raw = raw.replace('</textarea></div><div class="live-form-readonly"><b>Nhóm nghiên cứu</b>', '</textarea></div>' + preview_required_fields + '<div class="live-form-readonly"><b>Nhóm nghiên cứu</b>')
        raw = raw.replace("['#preview-objective', objective, '[data-live-pdf=\"objective\"]']", "['#preview-objective', objective, '[data-live-pdf=\"objective\"]'],\n        ['#preview-importance', importance, '[data-live-pdf=\"importance\"]'],\n        ['#preview-products', expectedProducts, '[data-live-pdf=\"products\"]'],\n        ['#preview-content', researchContent, '[data-live-pdf=\"content\"]'],\n        ['#preview-duration', duration, '[data-live-pdf=\"duration\"]'],\n        ['#preview-budget', budget, '[data-live-pdf=\"budget\"]'],\n        ['#preview-application-effect', applicationEffect, '[data-live-pdf=\"application-effect\"]']")
        raw = raw.replace("const pdfReady = pdfInput?.dataset.ready === 'true';\n      const advisorReady = !isStudentRole || Boolean(advisorSelected && !advisorSelected.hidden);\n      submitApplication.disabled = !(pdfReady && advisorReady);", "const pdfReady = pdfInput?.dataset.ready === 'true';\n      const requiredFields = [...document.querySelectorAll('[data-bm01-required]')];\n      const fieldsReady = requiredFields.every(field => field.value.trim());\n      const requiredCheck = document.querySelector('[data-required-check]');\n      if (requiredCheck) { requiredCheck.className = `check ${fieldsReady ? 'ok' : 'blocked'}`; requiredCheck.textContent = fieldsReady ? '✓ Thông tin BM01A đầy đủ' : '! Còn trường BM01A bắt buộc chưa nhập'; }\n      submitApplication.disabled = !(pdfReady && fieldsReady);")
        raw = raw.replace("submitApplication.disabled = !(pdfReady && fieldsReady);", "submitApplication.disabled = roundClosed || !(pdfReady && fieldsReady);")
        raw = raw.replace("if (!file.name.toLowerCase().endsWith('.pdf')) {", "if (!file.name.toLowerCase().endsWith('.pdf') || (file.type && file.type !== 'application/pdf')) {")
        raw = raw.replace("if (pdfInput && submitApplication) {", "document.querySelectorAll('[data-bm01-required]').forEach(field => field.addEventListener('input', refreshEligibility));\n\n    if (pdfInput && submitApplication) {")
        raw = raw.replace("${replacementSource ? `<br>Hồ sơ mới sẽ liên kết tới ${escapeHtml(replacementSource)}.` : ''}", "${replacementSource ? `<br>BM01A V2 sẽ cập nhật trên cùng Hồ sơ ${escapeHtml(applicationId)}; V1 không bị ghi đè.` : ''}")
        raw = raw.replace("`${applicationId} · Đã tạo lúc ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} · Không thể chỉnh sửa${replacementSource ? ` · Thay thế ${replacementSource}` : ''}`", "`${applicationId} · ${applicationVersion} đã nộp lúc ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} · Chờ Trưởng đơn vị`")
        raw = raw.replace("rule.innerHTML = '<b>Hồ sơ đã được tạo và khóa.</b><br>PDF đã nộp một lần thành công; không có thao tác sửa, nộp lại hoặc thay tệp.';", "rule.innerHTML = `<b>${applicationVersion} đã được nộp và khóa.</b><br>Hồ sơ chuyển tới Trưởng đơn vị; phiên bản trước được giữ lịch sử.`;")
        raw = re.sub(r"document\.querySelectorAll\('\[data-action=\"view-submitted-bm01\"\]'\).*?\}\)\)\);", "document.querySelectorAll('[data-action=\"view-submitted-bm01\"]').forEach(button => button.addEventListener('click', () => {\n      const studentReview = button.dataset.pdfId === 'HS-SV-2026-044';\n      openDialog({\n        title: studentReview ? 'BM01B — PDF đã nộp' : 'BM01A — PDF đã nộp',\n        description: studentReview ? 'HS-SV-2026-044 · V1 bất biến' : 'HS-GV-2026-031 · V1 bất biến',\n        content: studentReview ? '<div class=\"document-preview\"><b>BM01B-HS-SV-2026-044-V1.pdf</b><p>Phân loại tài liệu nghiên cứu bằng học máy</p><p class=\"meta\">Lê Hoàng Minh nộp 22/07/2026 10:14 · 2,04 MB · đúng assignment hiện hành.</p></div>' : '<div class=\"document-preview\"><b>BM01A-HS-GV-2026-031-V1.pdf</b><p>Mô hình gợi ý tài liệu học tập theo năng lực</p><p class=\"meta\">TS. Nguyễn Thị Lan nộp 20/07/2026 14:20 · bản bị Trưởng đơn vị trả sửa và được giữ bất biến.</p></div>'\n      });\n    }));", raw, flags=re.S)
        raw = re.sub(r"\n    const isStudentRole =.*?\n    const refreshEligibility =", "\n    const refreshEligibility =", raw, flags=re.S)
        raw = re.sub(r"\n    if \(advisorPicker\).*?\n    document\.querySelectorAll\('\[data-bm01-required\]'\)", "\n    document.querySelectorAll('[data-bm01-required]')", raw, flags=re.S)
        raw = re.sub(r"\n        if \(isStudentRole && advisorSelected\.hidden\) \{.*?\n        \}", "", raw, flags=re.S)
        raw = raw.replace(', [data-action="select-advisor"]', '')
        raw = raw.replace("overlay.addEventListener('click', () => toggle(false));", "overlay.addEventListener('click', () => toggle(false));\n      document.addEventListener('keydown', event => {\n        if (event.key === 'Escape' && sidebar.classList.contains('open')) {\n          toggle(false);\n          menu.focus();\n        }\n      });")

        upload_block = '''pdfInput.addEventListener('change', async () => {
        const file = pdfInput.files?.[0];
        const status = document.querySelector('[data-pdf-status]');
        const check = document.querySelector('[data-pdf-check]');
        const rejectFile = (message, checkMessage) => {
          pdfInput.value = '';
          pdfInput.dataset.ready = 'false';
          refreshEligibility();
          status.className = 'notice danger';
          status.innerHTML = `<b>Tệp không hợp lệ.</b><br>${message}`;
          check.className = 'check blocked';
          check.textContent = checkMessage;
          pdfInput.focus();
        };
        pdfInput.dataset.ready = 'false';
        refreshEligibility();
        if (!file) {
          status.className = 'notice warning';
          status.innerHTML = '<b>Chưa chọn tệp PDF.</b><br>Chỉ một tệp PDF được gắn với Hồ sơ khi nộp.';
          check.className = 'check blocked';
          check.textContent = '! Chưa chọn PDF đã ký';
          return;
        }
        if (roundClosed) { rejectFile('Đợt đăng ký đã đóng; không thể tải tệp.', '! Đợt đăng ký đã đóng'); return; }
        if (file.size === 0) { rejectFile('Tệp rỗng (0 byte) không thể nộp.', '! Tệp PDF rỗng'); return; }
        if (!file.name.toLowerCase().endsWith('.pdf') || (file.type && file.type !== 'application/pdf')) {
          rejectFile('Chỉ chấp nhận tệp có định dạng PDF.', '! Tệp đã chọn không phải PDF');
          return;
        }
        let signature = '';
        let contentHash = '';
        try {
          const buffer = await file.arrayBuffer();
          signature = String.fromCharCode(...new Uint8Array(buffer.slice(0, 5)));
          const digest = await crypto.subtle.digest('SHA-256', buffer);
          contentHash = [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
        } catch (_error) {
          rejectFile('Không thể đọc hoặc băm nội dung tệp. Hãy chọn lại PDF.', '! Không đọc được tệp PDF');
          return;
        }
        if (pdfInput.files?.[0] !== file) return;
        if (signature !== '%PDF-') { rejectFile('Nội dung tệp không có chữ ký %PDF-.', '! Nội dung không phải PDF'); return; }
        const v1PdfHash = document.querySelector('[data-application-page]')?.dataset.v1PdfHash || '';
        if (replacementSource && v1PdfHash && contentHash === v1PdfHash) {
          rejectFile('BM01A V2 phải dùng nội dung PDF mới; bản V1 không được nộp lại dù đã đổi tên.', '! Nội dung PDF trùng V1');
          return;
        }
        status.className = 'notice success';
        status.innerHTML = `<b>${escapeHtml(file.name)}</b><br>${(file.size / 1024 / 1024).toFixed(2)} MB · chữ ký %PDF- hợp lệ · sẵn sàng nộp`;
        check.className = 'check ok';
        check.textContent = '✓ Đã chọn một PDF mới hợp lệ';
        pdfInput.dataset.ready = 'true';
        refreshEligibility();
      });'''
        raw = re.sub(r"pdfInput\.addEventListener\('change', \(\) => \{.*?\n      \}\);\n\n      submitApplication\.addEventListener", upload_block + "\n\n      submitApplication.addEventListener", raw, count=1, flags=re.S)
        raw = raw.replace("const file = pdfInput.files?.[0];\n        if (!file) {", "const file = pdfInput.files?.[0];\n        if (roundClosed) {\n          showToast('Đợt đăng ký đã đóng; không thể nộp Hồ sơ.', 'danger');\n          refreshEligibility();\n          return;\n        }\n        if (!file || pdfInput.dataset.ready !== 'true') {")
        raw = raw.replace("onConfirm: () => {\n            document.querySelectorAll('[data-application-form]", "onConfirm: () => {\n            if (roundClosed) { showToast('Đợt đăng ký đã đóng; thao tác nộp đã hết hạn.', 'danger'); return false; }\n            document.querySelectorAll('[data-application-form]")
        raw = raw.replace("document.querySelectorAll('[data-bm01-required]').forEach(field => field.addEventListener('input', refreshEligibility));\n\n    if (pdfInput && submitApplication) {", "document.querySelectorAll('[data-bm01-required]').forEach(field => field.addEventListener('input', refreshEligibility));\n\n    if (roundClosed && document.querySelector('[data-application-page]')) {\n      const rule = document.querySelector('[data-application-rule]');\n      rule.className = 'notice warning';\n      rule.innerHTML = `<b>Đợt đăng ký đã đóng.</b><br>${replacementSource ? 'BM01A V2' : 'Hồ sơ mới'} chỉ được xem; tải PDF và nộp Hồ sơ đã hết hạn.`;\n      document.querySelector('[data-application-lead]').textContent = 'Đợt đăng ký đã đóng · không thể tải hoặc nộp PDF';\n    }\n\n    if (pdfInput && submitApplication) {")
        raw = raw.replace("document.querySelector('[data-application-lead]').textContent = 'Đợt đăng ký đã đóng · không thể tải hoặc nộp PDF';\n    }", "document.querySelector('[data-application-lead]').textContent = 'Đợt đăng ký đã đóng · biểu mẫu chỉ đọc, không thể tải hoặc nộp PDF';\n      document.querySelectorAll('[data-application-form] input, [data-application-form] select, [data-application-form] textarea, [data-action=\"add-member\"], [data-action=\"remove-member\"], [data-action=\"download-application-pdf\"]').forEach(control => { control.disabled = true; });\n    }")
        raw = raw.replace("pdfInput.dataset.ready = 'false';\n      refreshEligibility();", "pdfInput.dataset.ready = 'false';\n      pdfInput.disabled = roundClosed;\n      refreshEligibility();", 1)
        raw = raw.replace("if (downloadApplication) downloadApplication.addEventListener('click', () => showToast('PDF BM01A đã được tạo để tải xuống và ký.'));", "if (downloadApplication) downloadApplication.addEventListener('click', () => {\n      if (roundClosed) { showToast('Đợt đăng ký đã đóng; không thể tạo hoặc tải PDF.', 'danger'); return; }\n      showToast('PDF BM01A đã được tạo để tải xuống và ký.');\n    });")
        raw = raw.replace("dialog.classList.add('preview-dialog');", "dialog.classList.add('preview-dialog');\n      if (roundClosed) {\n        dialog.querySelectorAll('.live-form-pane input, .live-form-pane select, .live-form-pane textarea').forEach(control => { control.disabled = true; });\n        const previewNotice = dialog.querySelector('.live-form-pane .notice');\n        previewNotice.innerHTML = '<b>Bản xem trước chỉ đọc.</b><br>Đợt đăng ký đã đóng; không thể chỉnh sửa dữ liệu từ cửa sổ này.';\n      }")
        raw = raw.replace("\n  function setupNotifications() {", "\n  function setupReturnedRoundClosure() {\n    const page = document.querySelector('[data-returned-application]');\n    if (!page) return;\n    const actions = [...page.querySelectorAll('[data-action=\"resubmit-returned-bm01\"]')];\n    const isClosed = () => new URLSearchParams(window.location.search).get('round') === 'closed';\n    actions.forEach(action => action.addEventListener('click', event => {\n      if (!isClosed()) return;\n      event.preventDefault();\n      showToast('Đợt đăng ký đã đóng; không thể nộp lại BM01A.', 'danger');\n    }));\n    if (!isClosed()) return;\n    actions.forEach(action => { action.hidden = true; action.removeAttribute('href'); action.setAttribute('aria-disabled', 'true'); });\n    const notice = document.createElement('div');\n    notice.className = 'notice warning';\n    notice.dataset.roundClosedNotice = '';\n    notice.innerHTML = '<b>Đợt đăng ký đã đóng.</b><br>BM01A V1 và phản hồi chỉ còn ở chế độ xem; không có đường sửa hoặc nộp lại.';\n    page.querySelector('.page-head').insertAdjacentElement('afterend', notice);\n  }\n\n  function setupNotifications() {")
        raw = raw.replace("setupBm01();\n    setupNotifications();", "setupBm01();\n    setupReturnedRoundClosure();\n    setupNotifications();")
        raw = raw.replace("\n  function setupNotifications() {", "\n  function syncReviewQueue() {\n    const saved = localStorage.getItem('nckh-gv-review-decision');\n    if (!saved) return;\n    document.querySelectorAll('[data-review-nav-count]').forEach(node => { node.textContent = '0'; node.hidden = true; });\n  }\n\n  function setupNotifications() {")
        raw = raw.replace("setupReturnedRoundClosure();\n    setupNotifications();", "setupReturnedRoundClosure();\n    syncReviewQueue();\n    setupNotifications();")
    if target.endswith(".html"):
        active = "Xét hồ sơ" if target in {"10-xet-duyet-ho-so-sinh-vien.html", "10b-xet-duyet-khong-quyen.html"} else "Đề tài"
        if target == "02-dot-dang-ky.html": active = "Đợt đăng ký"
        elif target == "08-thong-bao.html": active = "Thông báo"
        elif target == "09-ho-so-ca-nhan.html": active = "Hồ sơ cá nhân"
        raw = re.sub(r'<aside class="sidebar">.*?</aside>', lecturer_sidebar(active), raw, count=1, flags=re.S)
        if target == "01-danh-sach-de-tai.html":
            raw = re.sub(r'<article class="topic-card" data-relation="advisor".*?</article>', '', raw, flags=re.S)
            raw = raw.replace('Các đề tài bạn làm Chủ nhiệm hoặc tham gia, cùng Hồ sơ Sinh viên được phân công xét duyệt.', 'Các đề tài bạn làm Chủ nhiệm hoặc tham gia với tư cách Thành viên.')
            raw = raw.replace('6</strong><span>Tổng số đề tài', '5</strong><span>Tổng số đề tài').replace('3</strong><span>Cần bạn xử lý', '2</strong><span>Cần bạn xử lý')
            raw = raw.replace('Cần bạn xử lý <span class="tab-count">3</span>', 'Cần bạn xử lý <span class="tab-count">2</span>')
            raw = raw.replace('<option value="advisor">Hồ sơ Sinh viên được phân công</option>', '')
            raw = raw.replace('<strong>3</strong><span>Bạn là Chủ nhiệm', '<strong>2</strong><span>Bạn là Chủ nhiệm').replace('<strong>2</strong><span>Bạn là Thành viên', '<strong>3</strong><span>Bạn là Thành viên')
            raw = raw.replace('data-relation="owner" data-status="active" data-round="2025-2"', 'data-relation="member" data-status="active" data-round="2025-2"').replace('Bạn là Chủ nhiệm đề tài</span> <span class="badge warning">Đang thực hiện', 'Bạn là Thành viên tham gia</span> <span class="badge warning">Đang thực hiện').replace('Chủ nhiệm: TS. Nguyễn Thị Lan', 'Chủ nhiệm: Trần Thu Hà').replace('Hoàn thiện BM09 và bộ sản phẩm với quyền Chủ nhiệm.', 'Bổ sung sản phẩm được phân công vào bộ BM09.')
    return raw


def lecturer_sidebar(active):
    def item(label, href, count=""):
        selected = " active" if label == active else ""
        badge = f' <span class="nav-count" data-review-nav-count>{count}</span>' if label == "Xét hồ sơ" else (f' <span class="nav-count">{count}</span>' if count else "")
        return f'<a class="nav-item{selected}" href="{href}">{label}{badge}</a>'
    return f'<aside class="sidebar"><div class="nav-title">Nghiệp vụ</div>{item("Đề tài", "01-danh-sach-de-tai.html", "5")}{item("Đợt đăng ký", "02-dot-dang-ky.html")}{item("Xét hồ sơ", "10-xet-duyet-ho-so-sinh-vien.html", "1")}<div class="nav-title">Tài khoản</div>{item("Thông báo", "08-thong-bao.html", "3")}{item("Hồ sơ cá nhân", "09-ho-so-ca-nhan.html")}</aside>'


def lecturer_review_page():
    sidebar = lecturer_sidebar("Xét hồ sơ")
    return '''<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>NCKH — Xét hồ sơ Sinh viên</title><link rel="stylesheet" href="lecturer.css"></head>
<body data-actor="gv" data-page-codes="GV-07 GV-08"><div class="browser"><div class="chrome"><i class="dot"></i><i class="dot"></i><i class="dot"></i><div class="address">nckh.dntu.edu.vn/xet-ho-so/HS-SV-2026-044</div></div><header class="topbar"><button class="mobile-menu ghost" type="button">☰</button><div class="brand"><span class="seal">DNTU</span><span>NCKH<small>Quản lý nghiên cứu khoa học</small></span></div><div class="top-actions"><div class="role-label">Vai trò: Giảng viên</div><a class="bell" href="08-thong-bao.html">● 3</a><div class="account"><span class="avatar">NL</span><span class="account-name">TS. Nguyễn Thị Lan</span>⌄</div></div></header><div class="shell">__SIDEBAR__
<main class="content" data-assignment-surface><div class="breadcrumb"><a class="link" href="../index.html">Bộ vai trò</a> / Xét hồ sơ</div><div class="page-head"><div><h1>Xét hồ sơ Sinh viên</h1><p class="lead">Chỉ hiển thị Hồ sơ BM01B được phân công cho bạn.</p></div><span class="badge warning" data-review-status>Chờ quyết định</span></div>
<div class="grid-2"><div><section class="form-section"><h2>Snapshot BM01B · V1</h2><dl class="detail-list"><div><dt>Mã Hồ sơ</dt><dd>HS-SV-2026-044</dd></div><div><dt>Tên đề tài</dt><dd>Phân loại tài liệu nghiên cứu bằng học máy</dd></div><div><dt>Chủ nhiệm đề tài</dt><dd>Lê Hoàng Minh · 22112788</dd></div><div><dt>Đơn vị</dt><dd>Khoa Công nghệ</dd></div><div><dt>Giảng viên hướng dẫn</dt><dd>TS. Nguyễn Thị Lan · được phân công cho bạn</dd></div></dl></section><section class="form-section"><h2>Quy trình ký BM01B</h2><ol class="meta"><li>Tải BM01B V1 về máy.</li><li>Ký ngoài hệ thống.</li><li>Tải lại đúng PDF đã ký để mở Duyệt.</li></ol><div class="doc-row"><div><b>BM01B-HS-SV-2026-044-V1.pdf</b><br><span class="meta">2,04 MB · nộp 22/07/2026 10:14 · Bản bất biến</span></div><a class="secondary button-link" href="data:application/pdf,%25PDF-1.4%0A%25%E1%BA%A3" download="BM01B-HS-SV-2026-044-V1.pdf" data-action="download-student-bm01">Tải BM01B</a></div><div class="field"><label for="signed-bm01b">Tải PDF BM01B đã ký *</label><input id="signed-bm01b" type="file" accept="application/pdf,.pdf" data-signed-bm01b><p class="meta" data-signed-pdf-status>Chưa có PDF đã ký.</p></div></section></div>
<aside><section class="card"><h2>Phạm vi xử lý</h2><div class="checklist"><div class="check ok">✓ Hồ sơ thuộc assignment hiện hành</div><div class="check ok">✓ Snapshot BM01B và PDF đã khóa</div><div class="check blocked" data-signed-pdf-check>! Chưa tải PDF đã ký</div><div class="check blocked" data-review-check>! Chưa có quyết định</div></div></section><section class="card"><h2>Nguyên tắc</h2><p>Duyệt chỉ khả dụng sau khi PDF BM01B đã ký hợp lệ được tải lại. Trả hồ sơ bắt buộc nhập lý do và không cần PDF ký.</p></section></aside></div>
<div class="action-bar" data-review-actions><a class="secondary" href="01-danh-sach-de-tai.html">Quay lại Đề tài</a><button class="danger" type="button" data-action="return-student-application">Trả hồ sơ</button><button class="primary" type="button" data-action="approve-student-application" disabled>Duyệt hồ sơ</button></div></main></div></div><script src="lecturer.js"></script><script>
(()=>{{const ui=window.NCKHUI,input=document.querySelector('[data-signed-bm01b]'),approve=document.querySelector('[data-action="approve-student-application"]'),status=document.querySelector('[data-signed-pdf-status]'),check=document.querySelector('[data-signed-pdf-check]');let signedFile='';const badge=()=>document.querySelector('[data-review-nav-count]');const finish=(decision,tone,message)=>{{document.querySelector('[data-review-status]').textContent=decision;document.querySelector('[data-review-status]').className='badge '+tone;document.querySelector('[data-review-check]').textContent='✓ '+message;document.querySelector('[data-review-check]').className='check ok';document.querySelector('[data-review-actions]').querySelectorAll('button').forEach(button=>button.disabled=true);if(input)input.disabled=true;const count=badge();if(count){{count.textContent='0';count.hidden=true}}ui.showToast(message)}};input.addEventListener('change',async()=>{{const file=input.files?.[0];signedFile='';approve.disabled=true;if(!file){{status.textContent='Chưa có PDF đã ký.';return}}if(file.size===0||!file.name.toLowerCase().endsWith('.pdf')||(file.type&&file.type!=='application/pdf')){{status.textContent='Chỉ chấp nhận PDF đã ký, có dữ liệu.';check.textContent='! PDF đã ký không hợp lệ';return}}const signature=String.fromCharCode(...new Uint8Array(await file.slice(0,5).arrayBuffer()));if(signature!=='%PDF-'){{status.textContent='Nội dung tệp không phải PDF hợp lệ.';check.textContent='! PDF đã ký không hợp lệ';return}}signedFile=file.name;status.textContent=`${{file.name}} · PDF đã ký hợp lệ, sẵn sàng duyệt.`;check.textContent='✓ Đã tải PDF BM01B đã ký';check.className='check ok';approve.disabled=false}});approve.addEventListener('click',()=>ui.openDialog({{title:'Duyệt Hồ sơ BM01B?',description:'HS-SV-2026-044 · PDF ký: '+signedFile,content:'<div class="notice warning">PDF đã ký sẽ được lưu cùng quyết định. Snapshot BM01B V1 vẫn bất biến.</div>',confirmLabel:'Duyệt hồ sơ',onConfirm:()=>finish('Đã duyệt','success','Đã duyệt và lưu PDF đã ký')}}));document.querySelector('[data-action="return-student-application"]').addEventListener('click',()=>{{const dialog=ui.openDialog({{title:'Trả hồ sơ',description:'Lý do sẽ được gửi cho Sinh viên và gắn với BM01B V1.',content:'<div class="field"><label for="review-return-reason">Lý do trả hồ sơ *</label><textarea id="review-return-reason" required></textarea><p class="meta" aria-live="polite" data-return-error></p></div>',confirmLabel:'Trả hồ sơ',confirmTone:'danger',onConfirm:node=>{{const reason=node.querySelector('#review-return-reason');if(!reason.value.trim()){{node.querySelector('[data-return-error]').textContent='Lý do trả hồ sơ là bắt buộc.';reason.focus();return false}}finish('Đã trả hồ sơ','danger','Đã trả BM01B về Sinh viên')}}}});dialog.querySelector('#review-return-reason').focus()}})})();
</script></body></html>'''.replace('__SIDEBAR__', sidebar).replace('{{', '{').replace('}}', '}')


def lecturer_neutral_page(kind):
    if kind == "unpublished":
        title = "Kết quả chưa công bố"
        heading = "Chưa có kết quả được phép hiển thị"
        message = "Đề tài đang chờ công bố. Trang này không cung cấp điểm, kết luận, số phiếu, tài liệu kết quả hoặc metadata đánh giá."
        address = "nckh.dntu.edu.vn/de-tai/ket-qua/chua-cong-bo"
    else:
        title = "Không thể truy cập"
        heading = "Bạn không thể truy cập nội dung này"
        message = "Phân công không tồn tại, đã hết hiệu lực hoặc quyền truy cập đã thay đổi. Trang này không cung cấp định danh người học, mã Hồ sơ, trạng thái hoặc tài liệu."
        address = "nckh.dntu.edu.vn/xet-duyet/khong-quyen"
    active = "Xét hồ sơ" if kind == "denied" else "Đề tài"
    home = "10-xet-duyet-ho-so-sinh-vien.html" if kind == "denied" else "01-danh-sach-de-tai.html"
    return f'''<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>NCKH — {title}</title><link rel="stylesheet" href="lecturer.css"></head><body data-actor="gv" data-page-codes=""><div class="browser"><div class="chrome"><i class="dot"></i><i class="dot"></i><i class="dot"></i><div class="address">{address}</div></div><header class="topbar"><button class="mobile-menu ghost" type="button">☰</button><div class="brand"><span class="seal">DNTU</span><span>NCKH<small>Quản lý nghiên cứu khoa học</small></span></div><div class="top-actions"><div class="role-label">Vai trò: Giảng viên</div><a class="bell" href="08-thong-bao.html">● 3</a><div class="account"><span class="avatar">NL</span><span class="account-name">TS. Nguyễn Thị Lan</span>⌄</div></div></header><div class="shell">{lecturer_sidebar(active)}<main class="content"><div class="breadcrumb"><a class="link" href="{home}">{active}</a> / {title}</div><section class="card"><h1>{heading}</h1><div class="notice warning">{message}</div><a class="primary" href="{home}">Về {active}</a></section></main></div></div><script src="lecturer.js"></script></body></html>'''


def lecturer_outputs():
    student = MOCKUPS / "sinh-vien"
    responsive_overrides = '''
/* Lecturer clone hardening: long academic metadata must not force horizontal scroll. */
.content,.page-head>div,.doc-row>div,.topic-card>div,.action-bar>*{min-width:0}
.page-head,.doc-row,.topic-card,.topbar,.top-actions,.action-bar{overflow-wrap:anywhere}
@media(max-width:520px){html,body,.browser{max-width:100%;overflow-x:hidden}.content{padding-left:12px;padding-right:12px}.page-head,.doc-row,.topic-card,.action-bar{align-items:stretch;flex-direction:column}.page-head>a,.doc-row>button,.topic-actions,.action-bar>*{width:100%}.topbar{gap:6px;padding-left:10px;padding-right:10px}.brand{flex:0 0 auto;min-width:58px}.top-actions{max-width:calc(100% - 64px);min-width:0;gap:4px}.account{flex:0 0 auto;padding:6px}.account-name,.role-label{max-width:108px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pdf-actions,.pdf-tool-actions{flex-wrap:wrap}.pdf-tool-actions>*{flex:1 1 180px}}
@media(max-width:520px){.preview-dialog{display:flex;flex-direction:column;width:calc(100vw - 16px);height:calc(100dvh - 16px);max-height:none}.preview-dialog .dialog-head,.preview-dialog .dialog-actions{flex:0 0 auto}.preview-dialog .dialog-body{flex:1 1 auto;min-height:0;max-height:none;overflow-y:auto;overscroll-behavior:contain}.preview-dialog .live-preview-layout{display:block;min-height:0}.preview-dialog .live-preview-pane,.preview-dialog .live-form-pane{min-height:0;overflow:visible}.preview-dialog .pdf-sheet{min-width:0;padding:24px 18px}}
'''
    review_page = lecturer_review_page()
    review_page = re.sub(r"\(\(\)=>\{const ui=window\.NCKHUI, surface=.*?const finish=", "(()=>{const ui=window.NCKHUI;const finish=", review_page, flags=re.S)
    review_page = review_page.replace(
        "(()=>{const ui=window.NCKHUI,input=",
        "(()=>{if(location.hash==='#assignment-revoked'){location.replace('10b-xet-duyet-khong-quyen.html');return}const ui=window.NCKHUI,stateKey='nckh-gv-review-decision',input=",
    )
    review_page = review_page.replace(
        "const finish=(decision,tone,message)=>{",
        "const finish=(decision,tone,message,detail='')=>{localStorage.setItem(stateKey,JSON.stringify({decision,tone,message,detail,at:new Date().toLocaleString('vi-VN')}));",
    )
    review_page = review_page.replace(
        "if(count){count.textContent='0';count.hidden=true}ui.showToast(message)};input.addEventListener",
        "if(count){count.textContent='0';count.hidden=true}const evidence=document.createElement('p');evidence.className='meta';evidence.dataset.reviewEvidence='';evidence.textContent=detail?`Dấu vết quyết định: ${detail}`:'Dấu vết quyết định đã được lưu trong mockup.';document.querySelector('[data-review-actions]').before(evidence);ui.showToast(message)};const stored=localStorage.getItem(stateKey);if(stored){const saved=JSON.parse(stored);finish(saved.decision,saved.tone,saved.message,saved.detail)}input.addEventListener",
    )
    review_page = review_page.replace(
        "const file=input.files?.[0];signedFile='';approve.disabled=true;if(!file)",
        "const file=input.files?.[0];signedFile='';approve.disabled=true;check.className='check blocked';check.textContent='! Chưa tải PDF đã ký';if(!file)",
    )
    review_page = review_page.replace(
        "const signature=String.fromCharCode(...new Uint8Array(await file.slice(0,5).arrayBuffer()));if(signature!==",
        "let signature='';try{signature=String.fromCharCode(...new Uint8Array(await file.slice(0,5).arrayBuffer()))}catch(_error){status.textContent='Không thể đọc PDF đã ký.';check.textContent='! Không đọc được PDF đã ký';return}if(input.files?.[0]!==file)return;if(signature!==",
    )
    review_page = review_page.replace(
        "finish('Đã duyệt','success','Đã duyệt và lưu PDF đã ký')",
        "finish('Đã duyệt','success','Đã duyệt và lưu PDF đã ký',`PDF ký: ${signedFile} · ${new Date().toLocaleString('vi-VN')}`)",
    )
    review_page = review_page.replace(
        "finish('Đã trả hồ sơ','danger','Đã trả BM01B về Sinh viên')",
        "finish('Đã trả hồ sơ','danger','Đã trả BM01B về Sinh viên',`Lý do: ${reason.value.trim()} · ${new Date().toLocaleString('vi-VN')}`)",
    )
    outputs = {
        "lecturer.css": (student / "student.css").read_text(encoding="utf-8") + responsive_overrides,
        "lecturer.js": lecturer_transform((student / "student.js").read_text(encoding="utf-8"), "lecturer.js"),
        "10-xet-duyet-ho-so-sinh-vien.html": review_page,
        "07b-ket-qua-chua-cong-bo.html": lecturer_neutral_page("unpublished"),
        "10b-xet-duyet-khong-quyen.html": lecturer_neutral_page("denied"),
    }
    for target, source in LECTURER_CLONES.items():
        outputs[target] = lecturer_transform((student / source).read_text(encoding="utf-8"), target)
    return outputs


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
    page("pk", "01-viec-can-lam.html", ["PK-01"], "Việc cần làm P.KHCN", "8 tác vụ vận hành theo đúng vai trò; không có phiếu cá nhân hoặc chữ ký Chủ tịch.", rows=[
        row("pk-cancel", "Xử lý yêu cầu hủy NCKH-GV-2026-011", "Đề tài · Chủ nhiệm gửi 22/07/2026 09:12", "Chờ quyết định"),
        row("pk-bm09", "Kiểm tra bộ BM09/sản phẩm", "Tài liệu Bước 06 · NCKH-SV-2025-018 · 4 tệp", "Chờ kiểm tra"),
        row("pk-round", "Công bố Đợt đăng ký NCKH 2026", "Đợt đăng ký · cấu hình Nháp đã đủ điều kiện", "Chờ công bố"),
        row("pk-council", "Xác nhận cơ cấu HĐNT-2026-006", "Hội đồng · còn 1 lời mời chưa chấp nhận", "Chưa sẵn sàng", state="blocked"),
        row("pk-minutes", "Ghi nhận BM12 đủ hai chữ ký", "Cuộc họp · HĐNT-2026-006 · checkpoint đã khóa", "Chờ tài liệu"),
        row("pk-bm08", "Ghi nhận BM08 V3", "Báo cáo tiến độ · đủ chữ ký Chủ nhiệm và Trưởng đơn vị", "Chờ ghi nhận"),
        row("pk-bm13", "Xác nhận BM13 giải trình", "Hậu nghiệm thu · yêu cầu 02 của BM12 V3", "Chờ xác nhận"),
        row("pk-bm14", "Lưu BM14 hoàn chỉnh", "Hoàn tất Bước 07 · đề tài có hợp đồng phải thanh lý", "Chờ lưu")]),
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
    lecturer_codes = [code for codes in LECTURER_PAGE_CODES.values() for code in codes]
    expected_lecturer_codes = [f"GV-{index:02d}" for index in range(1, 15)]
    if sorted(lecturer_codes) != expected_lecturer_codes or len(set(lecturer_codes)) != 14:
        errors.append("lecturer clone page mapping must cover GV-01–14 exactly once")
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
        if p["actor"] == "gv":
            continue
        folder = MOCKUPS / ACTORS[p["actor"]][0]
        target = folder / p["filename"]
        expected = render_page(p)
        if args.check:
            if not target.exists() or target.read_text(encoding="utf-8") != expected:
                drift.append(str(target.relative_to(ROOT)))
        else:
            folder.mkdir(parents=True, exist_ok=True)
            target.write_text(expected, encoding="utf-8", newline="\n")
    lecturer_folder = MOCKUPS / "giang-vien"
    legacy_targets = [lecturer_folder / filename for filename in sorted(LECTURER_OLD_FILES)]
    if args.check:
        drift.extend(str(target.relative_to(ROOT)) + " (legacy)" for target in legacy_targets if target.exists())
    else:
        for target in legacy_targets:
            if target.exists():
                target.unlink()
    lecturer_expected = lecturer_outputs()
    for filename, expected in lecturer_expected.items():
        target = lecturer_folder / filename
        if args.check:
            if not target.exists() or target.read_text(encoding="utf-8") != expected:
                drift.append(str(target.relative_to(ROOT)))
        else:
            lecturer_folder.mkdir(parents=True, exist_ok=True)
            target.write_text(expected, encoding="utf-8", newline="\n")
    if drift:
        print("Output lệch generator:\n- " + "\n- ".join(drift), file=sys.stderr)
        return 1
    rendered_pages = len([p for p in PAGES if p["actor"] != "gv"]) + len(LECTURER_CLONES) + 3
    print(f"OK: {rendered_pages} trang, {sum(len(p['codes']) for p in PAGES)} mã; schema/action/gate hợp lệ" + ("; không có drift" if args.check else "; đã sinh output"))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
