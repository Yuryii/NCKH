---
review: role-permission-regression
date: 2026-07-22
result: pass
critical: 0
high: 0
medium: 0
---

# Role & Permission Regression Review

## Kết luận

**PASS** — không còn finding Critical/High/Medium chặn Finalize trong phạm vi quyền UX.

## Phạm vi đã kiểm tra

- Ma trận 8 vai trò, role switch, object relation và assignment trong `EXPERIENCE.md`.
- Sidebar và task isolation của 8 vai trò hiện được hợp nhất trong `mockups/role-screen-atlas.html`.
- Onboarding, lời mời, pending role và Quản trị Tài khoản.
- Tuyến GVHD, Trưởng đơn vị và BM08 tuần tự.
- Bốn phép chiếu Cuộc họp: P.KHCN, Chủ tịch, Thành viên, Thư ký.
- Wrong-role, out-of-scope, revoked mid-session và pre-publish.
- Các mockup Giảng viên hiện hành: queue, chi tiết Đề tài và workspace bằng chứng.

## Acceptance evidence

1. Giảng viên không có `Hội đồng`, BM02/BM06/BM11 hoặc preview kết quả trước công bố.
2. `Xét duyệt` của Giảng viên chỉ xuất hiện khi có assignment GVHD.
3. P.KHCN có quyền vận hành nhưng không đọc nội dung/tệp Phiếu nháp; chỉ thấy tiến độ/hợp lệ.
4. Chủ tịch/Thành viên/Thư ký chỉ có `Hội đồng của tôi` theo assignment; không có danh sách Đề tài toàn cục.
5. Thư ký không có Phiếu đánh giá ở sidebar, queue, Dashboard hoặc deep link.
6. Chủ tịch không mặc nhiên thấy roster progress; chỉ thấy dữ liệu cần cho nhiệm vụ cá nhân.
7. Quản trị viên không thấy Đợt đăng ký, Đề tài NCKH hoặc Hội đồng.
8. Deep link kiểm tra Tài khoản + vai trò đang hoạt động + object scope và trả thông điệp trung tính khi không hợp lệ.
9. Thu hồi quyền dừng mutation, xóa cache phạm vi cũ và tải lại app shell.
10. Trước công bố không có badge, count, notification, search hit hoặc metadata kết quả cho vai trò không được phép.

## Kiểm tra tĩnh

- 10 mockup HTML; mỗi tệp có một cặp `html/body` cân bằng.
- Atlas có 8 role definitions và JavaScript qua `node --check`.
- `role-queue-variants.html` render 8 app-shell/queue.
- `council-role-projections.html` render 4 phép chiếu Cuộc họp.
- `permission-boundaries.html` render 4 trạng thái biên quyền.
- Tất cả liên kết local trong hai spine resolve thành công.
