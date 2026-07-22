# Artifact distillation — promoted mockups

Ngày đối chiếu: 2026-07-21  
Phạm vi: `mockups/*.html` đối chiếu với `DESIGN.md` và `EXPERIENCE.md`.  
Nguyên tắc: mockup chỉ minh họa composition; hai spine thắng khi có xung đột. Khung cửa sổ trình duyệt, thanh địa chỉ, chấm chrome, URL mẫu, dữ liệu/tên người minh họa và glyph icon tạm không phải quyết định sản phẩm.

## `work-queue.html`

### Đã được spine bao phủ

- App shell đỏ–trắng, sidebar theo quyền, role-switcher hiện Vai trò/ngữ cảnh, notification item, task-card có việc–đối tượng–hạn–hành động tiếp theo và status-badge.
- Hàng đợi theo Vai trò, tìm kiếm/lọc có URL state, trạng thái loading/empty/error/offline/permission change, card hóa trên mobile và liên kết inline gạch chân.
- Nội dung “đang chờ người khác” và notification preview chịu cùng quy tắc phân quyền, không rò kết quả trước công bố.

### Delta được lift

- `DESIGN.md/Layout & Spacing`: dải chỉ số → toolbar → task stack + panel “Đang chờ người khác”, dùng card primitive hiện có và xếp một cột trên mobile.
- `EXPERIENCE.md/Information Architecture`: số đếm, tìm kiếm theo mã/tên, lọc trạng thái/hạn và việc tải lại toàn bộ vùng khi đổi Vai trò.

### Orphan check

Không còn quyết định visual/behavior thực chất chỉ nằm trong mockup. Seal DNTU phác thảo và chuông dạng glyph là placeholder, không được nâng thành asset/component.

## `topic-detail.html`

### Đã được spine bao phủ

- Hub Đề tài xuyên Bước 01–07, một trạng thái tổng quan, actor kế tiếp, tài liệu hiện hành, audit, checklist cổng và luồng yêu cầu hủy trước `Chờ nghiệm thu`.
- Timeline dùng ordered list với current/complete/future có nhãn; bản tài liệu current/superseded và lịch sử giữ khả năng truy vết.
- Responsive chuyển timeline ngang thành dọc và bố cục hai cột thành một cột mà không đổi thứ tự đọc.

### Delta được lift

- `DESIGN.md/Layout & Spacing`: callout hành động kế tiếp nền đỏ nhạt/marker đỏ; thứ tự timeline–tài liệu và checklist/audit ở cột phụ.
- `EXPERIENCE.md/Information Architecture`: callout phải nêu biểu mẫu/phiên bản, actor tiếp theo, hạn và thời điểm lưu khi có; trạng thái nguồn không suy diễn phía client.

### Orphan check

Không còn orphan. Nút “Yêu cầu hủy”, panel điều kiện và hoạt động gần đây đều là composition của component/quy tắc đã có.

## `meeting-dashboard.html`

### Đã được spine bao phủ

- Tiến độ `{valid}/{denominator}`, mẫu số chỉ gồm Chủ tịch/Thành viên có trách nhiệm đánh giá, Thư ký độc quyền, không có BM02.
- Cổng 100% phiếu → Mốc chốt one-and-only-one → BM03 hai chữ ký → kết thúc → công bố riêng; action bị chặn có lý do và quyền xem kết quả trước/sau công bố.
- Bảng có caption/header semantics, status có text, snapshot checkpoint lưu count/time/ID và không tái tính từ mutable data.

### Delta được lift

- `DESIGN.md/Layout & Spacing`: hàng tổng quan progress+cổng, bảng mẫu số toàn chiều rộng và cách biểu diễn chuỗi cổng phẳng.
- `EXPERIENCE.md/Information Architecture`: Thư ký phải nằm ngoài bảng mẫu số với nhãn “Không thuộc mẫu số”; thứ tự chuỗi cổng không cho nhảy bước.

### Orphan check

Không còn orphan. Mockup đang ở state 4/5 nên BM03/result bị khóa; các state sau chốt đã được spine quy định dù không được vẽ trong artifact này.

## `evidence-workspace.html`

### Đã được spine bao phủ

- Tách dữ liệu nguồn, PDF xuất, PDF đã ký và hành động `Nộp`; upload không đồng nghĩa nộp.
- File evidence anatomy gồm tên, dung lượng, phiên bản tệp/dữ liệu, trạng thái xử lý, checksum, actor, thời gian và hiệu lực; version-list giữ bản current/superseded và lý do.
- Viewer có zoom/trang/tải xuống/toàn màn hình, đường HTML dữ liệu nguồn và disclaimer không xác minh chữ ký/nội dung.
- Checklist nộp, save state, sticky action bar, disabled reason, idempotency, terminal lock và pipeline BM08 tuần tự đã có trong spine.

### Delta được lift

- `DESIGN.md/Layout & Spacing`: cột nội dung + cột điều kiện/phiên bản khoảng 350px, tab underline đỏ và action bar bám đáy.
- `EXPERIENCE.md/Information Architecture`: bốn vùng điều hướng nội dung → preview → PDF ký & Nộp → lịch sử, cùng quy tắc giữ đúng version/context khi responsive.

### Orphan check

Không còn orphan. CSS mockup cho bốn tab cuộn ngang ở màn hình hẹp không thay thế hợp đồng spine: dưới 768px, PDF và vùng quyết định phải thành hai tab cấp layout; các vùng nghiệp vụ bên trong vẫn giữ thứ tự và truy cập được.

## Kết luận

Mọi quyết định có giá trị triển khai trong bốn mockup hiện đã nằm trong `DESIGN.md` hoặc `EXPERIENCE.md`. Không đưa các chi tiết framing/placeholder của bản dựng HTML vào spine. `status` của cả hai spine được giữ nguyên `draft` theo yêu cầu; bước này không final hóa tài liệu.
