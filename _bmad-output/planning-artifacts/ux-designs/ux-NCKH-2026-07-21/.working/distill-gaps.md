# Distill gaps — Pass 1 coverage

Ngày chạy: 2026-07-21  
Phạm vi: kiểm tra cơ học `DESIGN.md` + `EXPERIENCE.md` sau bước Spines distilled. Đây không phải reviewer report.

## Coverage đã đóng

- **Flow coverage:** UJ-1 đến UJ-7 đều có Key Flow giữ nguyên tên/ý chính từ PRD, nhân vật có tên, bước đánh số, climax và failure path.
- **Token completeness:** toàn bộ màu trong frontmatter có mã hex; mọi `{path.to.token}` đang dùng đều trỏ tới token được khai báo. Các tổ hợp chịu tải có mục tiêu tương phản WCAG rõ.
- **Component coverage:** 21 component có cùng tên trong `DESIGN.md.Components`, bảng visual spec và `EXPERIENCE.md` Component Patterns; không có tên lệch giữa hai spine.
- **State coverage:** 17 IA surface đều có tập trạng thái bắt buộc; State Patterns bổ sung cold-load, empty, save/error, xử lý dài, permission, offline, stale, hết phiên, immutable, replaced và not-applicable.
- **Visual reference coverage:** `imports/dntu-visual-reference.md` được liên kết inline ở cả hai spine và nêu rõ chỉ là nguồn nhận diện; quy tắc spine thắng khi xung đột đã ghi một lần trong `DESIGN.md`.
- **Shape:** `DESIGN.md` theo canonical order; `EXPERIENCE.md` có đầy đủ Foundation, Information Architecture, Voice and Tone, Component Patterns, State Patterns, Interaction Primitives, Accessibility Floor, Key Flows cùng Responsive & Platform, Inspiration & Anti-patterns và Evidence & PDF Contract.
- **Sources:** đường dẫn PRD tương đối từ workspace và import đều tồn tại; spine tham chiếu nguồn thay vì chép lại danh sách FR.

## Gap còn lại — không chặn spine draft

1. **Từ điển dữ liệu biểu mẫu:** chưa có field-level contract cho BM01A/B, BM02, BM03, BM06, BM07, BM08, BM11, BM12, BM13. Đây là cổng PRD trước khi thiết kế/phát triển form chi tiết; spine chỉ khóa pattern form và validation.
2. **Chính sách tài khoản/lời mời:** miền email Trường, TTL, gửi lại/thu hồi và hành vi phiên khi khóa chưa chốt (OQ-4, OQ-5).
3. **Chính sách tệp:** định dạng ngoài PDF, dung lượng, tên tệp, quét mã độc và thời hạn lưu chưa chốt (OQ-6). UI phải đọc cấu hình, không hard-code.
4. **Quy mô và danh sách:** quy mô dữ liệu, bộ lọc, sort mặc định, pagination, export danh sách và KPI dashboard chưa chốt (OQ-7); các hành vi server-side đang là `[ASSUMPTION]`.
5. **Chuẩn vận hành:** baseline hiệu năng, RPO/RTO, WCAG và mục tiêu pilot chờ xác nhận (OQ-8, OQ-10).
6. **Bề mặt:** responsive web là baseline PRD nhưng vẫn cần phê duyệt UX chính thức theo OQ-9; ưu tiên desktop-first/mobile tác vụ ngắn đang là `[ASSUMPTION]`.
7. **Nguồn master data:** danh mục đơn vị, đối chiếu mã GV/SV, cách gán Giảng viên hướng dẫn, loại Đợt đăng ký và logic `Không được chọn` chưa đủ chi tiết cho control/data binding.
8. **Notification:** quy tắc read/unread, gom nhóm, lưu giữ và tần suất chưa chốt; in-app notification vẫn là baseline.
9. **Concurrency/recovery:** autosave interval, giữ dữ liệu qua hết phiên, xung đột nhiều tab và upload resume cần kiến trúc xác nhận; spine đánh dấu `[ASSUMPTION]` và khóa outcome UX.
10. **UI system kỹ thuật:** chưa chọn thư viện component cụ thể; Foundation yêu cầu thư viện web đáp ứng WCAG nhưng để kiến trúc quyết định.

Không phát hiện gap cơ học critical/high trong Pass 1. Các mục trên cần được chốt hoặc chuyển thành quyết định kiến trúc/story acceptance criteria trước khi triển khai phần phụ thuộc.
