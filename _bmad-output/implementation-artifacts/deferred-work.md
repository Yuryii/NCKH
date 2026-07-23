# Deferred Work

- source_spec: `spec-lam-lai-mockup-giang-vien-tu-sinh-vien.md`
  summary: Bộ lọc tìm kiếm và trạng thái trên trang Đợt đăng ký chưa cập nhật danh sách theo lựa chọn.
  evidence: Hành vi này có sẵn trong baseline Sinh viên `mockups/sinh-vien/02-dot-dang-ky.html` và được suite Giảng viên clone nguyên trạng; sửa nguồn Sinh viên nằm ngoài phạm vi đã duyệt.

- source_spec: `spec-lam-lai-mockup-giang-vien-tu-sinh-vien.md`
  summary: Hành động upload BM09 vẫn hiện khi chuyển sang tab tài liệu khác trong workspace.
  evidence: Đây là hành vi có sẵn trong baseline Sinh viên `mockups/sinh-vien/06-workspace-buoc-03-07.html`, không phát sinh từ nội dung/quyền riêng Giảng viên.

- source_spec: `spec-lam-lai-mockup-giang-vien-tu-sinh-vien.md`
  summary: Menu mobile chưa hỗ trợ đóng bằng phím Escape.
  evidence: Logic menu được clone trực tiếp từ `mockups/sinh-vien/student.js`; sửa nguồn Sinh viên nằm ngoài ranh giới không thay đổi bộ Sinh viên của đặc tả.

## Trạng thái xử lý — review hiện tại

- **Đã giải quyết, không còn outstanding:** Bộ lọc tìm kiếm/trạng thái trên trang Đợt đăng ký. Suite Giảng viên đã có runtime filter riêng trong canonical generator và validator kiểm tra card hooks/empty state.
- **Đã giải quyết, không còn outstanding:** Hành động upload BM09 khi chuyển tab. Suite Giảng viên ẩn/vô hiệu action ngoài tab BM09 và runtime từ chối mutation sai tab.
- **Outstanding duy nhất:** Menu mobile chưa đóng bằng phím `Escape`. Nội dung này vẫn bị chặn bởi ranh giới không sửa nguồn Sinh viên.

> Các record lịch sử phía trên được giữ nguyên theo nguyên tắc append-only. Downstream chỉ được coi mục có nhãn **Outstanding duy nhất** trong phần trạng thái mới nhất này là công việc còn lại.

## Trạng thái xử lý — release patch round 4

- **Đã giải quyết, không còn outstanding:** Menu mobile riêng của Giảng viên đóng bằng phím `Escape`, đồng thời trả focus về nút mở menu.
- **Không còn mục outstanding** trong các record hiện tại của đặc tả làm lại mockup Giảng viên.

> Đây là phần trạng thái mới nhất và thay thế kết luận outstanding của phần review trước; các record lịch sử vẫn được giữ nguyên, không bị sửa hoặc xóa.
