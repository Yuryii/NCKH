---
title: 'Làm lại mockup Giảng viên từ giao diện Sinh viên'
type: 'refactor'
created: '2026-07-23'
status: 'done'
review_loop_iteration: 0
baseline_commit: '8423b76ac903c638ae871c16b24abfb037619f99'
context:
  - '{project-root}/_bmad-output/planning-artifacts/prds/prd-NCKH-2026-07-20/prd.md'
  - '{project-root}/_bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/role-screen-atlas.html'
  - '{project-root}/docs/Đặc tả use case Bước 01 và Bước 02 - Hệ thống NCKH - Hoàn thiện.docx'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Bộ Giảng viên hiện dùng shell actor mới nên khác giao diện Sinh viên, trong khi luồng Chủ nhiệm đề tài của hai vai trò gần như giống nhau. Khác biệt chính là Giảng viên dùng BM01A, không chọn Giảng viên hướng dẫn/không xem điểm, Hồ sơ đi Trưởng đơn vị và có thêm nhiệm vụ duyệt Hồ sơ Sinh viên được phân công.

**Approach:** Clone trực tiếp giao diện, component và hành vi của bộ Sinh viên thành bộ Giảng viên; chỉ thay fixture, nhãn, trường và quyền khác biệt, đồng thời thêm một trang xét duyệt Hồ sơ Sinh viên cùng phong cách.

## Boundaries & Constraints

**Always:** Giao diện Giảng viên phải nhìn và vận hành như biến thể của Sinh viên; giữ topbar/sidebar/card/form/dialog/toast/responsive; dùng BM01A và tuyến Trưởng đơn vị; giữ các luồng Chủ nhiệm chung; thêm duyệt/trả Hồ sơ Sinh viên đúng assignment; nội dung theo PRD và use case docs.

**Ask First:** Thay đổi nghiệp vụ Sinh viên, sửa quyền của actor khác, hoặc thêm chức năng Giảng viên ngoài PRD/docs.

**Never:** Dùng lại shell `shared/actor.css` cho Giảng viên; hiển thị chọn Giảng viên hướng dẫn, điểm đánh giá chưa/không được phép xem, phiếu Hội đồng hoặc dữ liệu ngoài assignment; thay đổi file trong `mockups/sinh-vien/`.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|---------------|----------------------------|----------------|
| Đăng ký đề tài | Giảng viên mở Đợt | Form BM01A giống BM01B về UX, không có GVHD; nộp xong chờ Trưởng đơn vị | Chặn khi thiếu dữ liệu/PDF |
| Hồ sơ bị trả | BM01A ở Trả sửa | Mở lại form, giữ lịch sử và cho tạo PDF mới | Không ghi đè bản đã nộp |
| Duyệt Sinh viên | Hồ sơ BM01B được gán | Xem snapshot, Duyệt hoặc Trả sửa với lý do | Không render Hồ sơ ngoài assignment |
| Kết quả | Chưa công bố | Không hiện điểm/kết luận/metadata nhạy cảm | Hiện trạng thái trung tính |

</frozen-after-approval>

## Code Map

- `_bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/sinh-vien/` -- nguồn clone tuyệt đối về visual shell và interaction patterns.
- `_bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/giang-vien/` -- bộ cần thay toàn bộ giao diện hiện tại.
- `_bmad-output/tools/generate_actor_mockups.py` -- hiện đang sinh bộ Giảng viên theo shell actor, cần ngừng ghi đè bộ clone.
- `_bmad-output/tools/validate_actor_mockups.py` -- cần kiểm tra Giảng viên dùng lecturer assets và đủ GV-01–14.

## Tasks & Acceptance

**Execution:**
- [x] `mockups/giang-vien/lecturer.css`, `lecturer.js` -- clone `student.css/js`, chỉ sửa logic/chuỗi riêng Giảng viên; không tác động asset Sinh viên.
- [x] `mockups/giang-vien/00-dang-ky-xac-minh.html`, `01-danh-sach-de-tai.html` đến `09-ho-so-ca-nhan.html` -- clone toàn bộ bề mặt tương ứng của Sinh viên và thay fixture Giảng viên/BM01A/tuyến Trưởng đơn vị.
- [x] `mockups/giang-vien/03b-bm01a-truong-don-vi-tra.html` -- clone trạng thái Hồ sơ bị trả nhưng dùng semantics sửa và nộp lại BM01A, không tạo Hồ sơ thay thế.
- [x] `mockups/giang-vien/10-xet-duyet-ho-so-sinh-vien.html` -- thêm hàng chờ, chi tiết snapshot BM01B, Duyệt và Trả sửa có lý do theo đúng visual system Sinh viên.
- [x] `generate_actor_mockups.py`, `validate_actor_mockups.py` -- tách Giảng viên khỏi renderer shell actor, bảo vệ suite clone khỏi drift và kiểm tra coverage/quyền.
- [x] `mockups/index.html`, `role-screen-atlas.html`, `EXPERIENCE.md`, `DESIGN.md` -- cập nhật link và mô tả đúng chiến lược clone.

**Acceptance Criteria:**
- Given đặt hai bộ cạnh nhau, when mở trang danh sách/form/chi tiết, then Giảng viên dùng cùng layout và component Sinh viên.
- Given form BM01A, when kiểm tra nội dung, then không có GVHD/điểm và sau nộp hiển thị Chờ Trưởng đơn vị.
- Given nhiệm vụ duyệt Sinh viên, when Duyệt hoặc Trả sửa, then trạng thái đổi đúng đối tượng và lý do bắt buộc ở nhánh trả.
- Given các trang Giảng viên ở 1440px và 390px, when thao tác, then không tràn và dialog/drawer/toast dùng được.
- Given bộ Sinh viên, when so sánh git diff, then không có file nào trong `mockups/sinh-vien/` bị thay đổi.

## Spec Change Log

## Design Notes

Ưu tiên clone markup trước rồi thay nội dung theo mapping: đăng ký/xác minh, danh sách đề tài, Đợt, BM01, trạng thái bị Trưởng đơn vị trả, chi tiết, hủy, workspace Bước 03–07, kết quả, thông báo và hồ sơ cá nhân. Trang xét duyệt Sinh viên là phần bổ sung duy nhất; phải ghép từ card/list/dialog đã có của Sinh viên, không tạo component mới nếu pattern tương đương đã tồn tại.

## Verification

**Commands:**
- `python _bmad-output/tools/generate_actor_mockups.py --check` -- các actor khác không drift, Giảng viên không bị renderer cũ ghi đè.
- `python _bmad-output/tools/validate_actor_mockups.py` -- đủ GV-01–14, link/assets/quyền hợp lệ.
- `git diff --name-only 8423b76 -- mockups/sinh-vien` -- không có output.

**Manual checks:**
- So sánh screenshot Sinh viên/Giảng viên ở 1440×900 và 390×844; kiểm tra BM01A và Duyệt/Trả Hồ sơ Sinh viên.

## Suggested Review Order

**Chiến lược clone và ánh xạ nghiệp vụ**

- Bắt đầu từ transformer tách Giảng viên khỏi shell actor cũ.
  [`generate_actor_mockups.py:78`](../tools/generate_actor_mockups.py#L78)

- Mỗi bề mặt clone được gắn rõ mã GV-01–14.
  [`generate_actor_mockups.py:60`](../tools/generate_actor_mockups.py#L60)

**Luồng BM01A và quyền Giảng viên**

- Form BM01A giữ visual Sinh viên nhưng dùng trường và tuyến Giảng viên.
  [`03-bm01a-ho-so.html:7`](../planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/giang-vien/03-bm01a-ho-so.html#L7)

- Runtime phân biệt tạo mới, V2, Đợt đóng và kiểm tra PDF.
  [`lecturer.js:153`](../planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/giang-vien/lecturer.js#L153)

- Danh sách hợp nhất đề tài riêng và Hồ sơ Sinh viên được giao.
  [`01-danh-sach-de-tai.html:11`](../planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/giang-vien/01-danh-sach-de-tai.html#L11)

**Xét duyệt và trạng thái bảo mật**

- Trang assignment dùng dialog/toast chung cho Duyệt và Trả sửa.
  [`10-xet-duyet-ho-so-sinh-vien.html:4`](../planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/giang-vien/10-xet-duyet-ho-so-sinh-vien.html#L4)

- Trạng thái ngoài assignment không chứa dữ liệu Hồ sơ Sinh viên.
  [`10b-xet-duyet-khong-quyen.html:1`](../planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/giang-vien/10b-xet-duyet-khong-quyen.html#L1)

- Trạng thái chưa công bố không chứa kết luận hoặc tài liệu kết quả.
  [`07b-ket-qua-chua-cong-bo.html:1`](../planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/giang-vien/07b-ket-qua-chua-cong-bo.html#L1)

**Hợp đồng kiểm tra và tài liệu**

- Validator kiểm tra thật từng trang clone, mã, quyền và nhánh trạng thái.
  [`validate_actor_mockups.py:142`](../tools/validate_actor_mockups.py#L142)

- IA xác nhận Giảng viên dùng Đề tài và tab Cần bạn xử lý.
  [`EXPERIENCE.md:33`](../planning-artifacts/ux-designs/ux-NCKH-2026-07-21/EXPERIENCE.md#L33)

- Nhật ký deferred mới nhất xác nhận không còn mục outstanding.
  [`deferred-work.md:17`](deferred-work.md#L17)
