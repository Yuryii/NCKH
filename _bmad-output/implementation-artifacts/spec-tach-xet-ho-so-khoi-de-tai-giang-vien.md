---
title: 'Tách Xét hồ sơ thành mục điều hướng riêng của Giảng viên'
type: 'refactor'
created: '2026-07-23'
status: 'done'
review_loop_iteration: 0
baseline_commit: '0384c2c14928ef16963883ff680593e190ae579a'
context:
  - '{project-root}/_bmad-output/implementation-artifacts/spec-lam-lai-mockup-giang-vien-tu-sinh-vien.md'
  - '{project-root}/_bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/EXPERIENCE.md'
  - '{project-root}/_bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/role-screen-atlas.html'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Hồ sơ Sinh viên được phân công xét duyệt hiện nằm trong `Đề tài > Cần bạn xử lý`, làm lẫn hàng chờ duyệt BM01B với công việc trên đề tài của Giảng viên và khiến nghiệp vụ này khó nhận biết.

**Approach:** Tạo mục left nav riêng `Xét hồ sơ` cho Giảng viên, dùng trang xét duyệt hiện có làm đích; trả danh sách `Đề tài` về đúng phạm vi đề tài của Giảng viên. Luồng duyệt BM01B yêu cầu tải PDF, ký ngoài hệ thống và tải lại PDF đã ký trước khi xác nhận; chức năng `Trả hồ sơ` chỉ yêu cầu lý do.

## Boundaries & Constraints

**Always:** Mọi trang Giảng viên có sidebar phải dùng cùng thứ tự `Đề tài → Đợt đăng ký → Xét hồ sơ`; item `Xét hồ sơ` có badge hàng chờ và chỉ active tại bề mặt xét duyệt/không quyền; trang xét duyệt kiểm tra assignment, xem đúng BM01B V1, tải PDF để ký, chỉ cho Duyệt sau khi PDF đã ký được tải lại hợp lệ, và có action `Trả hồ sơ` với lý do bắt buộc.

**Ask First:** Đổi trang landing mặc định của Giảng viên, thêm hàng chờ hoặc màn hình xét duyệt mới, hoặc thay đổi nghiệp vụ duyệt BM01B.

**Never:** Sửa suite Sinh viên; tạo mã màn hình mới; giữ card/filter Hồ sơ Sinh viên trong danh sách Đề tài; cho Duyệt trước khi có PDF đã ký; thay visual system `lecturer.css/js`; làm rò dữ liệu ngoài assignment.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|---------------|----------------------------|----------------|
| Mở hàng chờ | Giảng viên chọn `Xét hồ sơ` | Mở trang 10, item active và badge `1` | Link local phải hợp lệ |
| Duyệt hồ sơ | Giảng viên tải BM01B V1, ký ngoài hệ thống và tải PDF đã ký | Nút Duyệt được mở; xác nhận lưu PDF đã ký và chuyển trạng thái | Chặn Duyệt khi chưa có PDF đã ký/không phải PDF |
| Trả hồ sơ | Hồ sơ cần chỉnh sửa | Dialog yêu cầu lý do, trả BM01B về Sinh viên, không cần ký | Chặn xác nhận khi lý do trống |
| Hoàn tất quyết định | Duyệt hoặc Trả hồ sơ thành công | Badge hàng chờ về `0` hoặc ẩn; item vẫn tồn tại | Khóa cả hai thao tác sau quyết định |
| Mất assignment | Mở trạng thái không quyền | Trang 10b active `Xét hồ sơ`, không có dữ liệu Sinh viên | CTA quay về `Xét hồ sơ` |
| Xem Đề tài | Mở danh sách đề tài | Chỉ còn 5 đề tài, 2 cần xử lý, không có BM01B/assignment filter | Empty/filter giữ hoạt động |

</frozen-after-approval>

## Code Map

- `_bmad-output/tools/generate_actor_mockups.py` -- nguồn canonical sinh sidebar, danh sách Đề tài và trang xét duyệt Giảng viên.
- `_bmad-output/tools/validate_actor_mockups.py` -- hợp đồng kiểm tra nav, active state, counts và IA Giảng viên.
- `_bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/EXPERIENCE.md` -- ma trận sidebar và quy tắc điều hướng.
- `_bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/role-screen-atlas.html` -- Atlas actor/màn hình và nav demo.

## Tasks & Acceptance

**Execution:**
- [x] `generate_actor_mockups.py` -- thêm `Xét hồ sơ|1` vào sidebar mọi trang clone, active đúng trang 10/10b và cập nhật badge sau quyết định.
- [x] `generate_actor_mockups.py` -- bỏ review card/filter khỏi Đề tài; khôi phục counts `5/2/3/2` và breadcrumb/CTA độc lập cho Xét hồ sơ.
- [x] `generate_actor_mockups.py`, `lecturer.js` -- bổ sung download BM01B, upload PDF đã ký, gate Duyệt và lưu dấu vết PDF ký; thêm action `Trả hồ sơ` dùng dialog lý do bắt buộc.
- [x] `validate_actor_mockups.py` -- kiểm tra thứ tự/href/active item đồng nhất, không còn assignment trong Đề tài, gate PDF ký và vẫn đủ 53 trang/69 mã.
- [x] `EXPERIENCE.md`, `DESIGN.md`, `role-screen-atlas.html` -- cập nhật IA: Xét hồ sơ là item riêng, landing vẫn là Đề tài.

**Acceptance Criteria:**
- Given bất kỳ trang Giảng viên có sidebar, when kiểm tra nav, then có đúng một link `Xét hồ sơ` tới trang 10 và thứ tự nav ổn định.
- Given trang 10 hoặc 10b, when render, then chỉ `Xét hồ sơ` active; các trang khác không active item này.
- Given BM01B được phân công, when chưa tải PDF đã ký, then Duyệt bị khóa và hướng dẫn tải/ký/tải lại hiển thị rõ.
- Given PDF đã ký hợp lệ, when Giảng viên xác nhận Duyệt, then trạng thái, dấu vết PDF và badge hàng chờ được cập nhật.
- Given Giảng viên chọn `Trả hồ sơ`, when lý do hợp lệ, then BM01B trở về Sinh viên, badge giảm và không yêu cầu PDF ký.
- Given danh sách Đề tài, when lọc và đếm card, then không có `HS-SV-2026-044`, relation `advisor` hoặc CTA xét BM01B.
- Given suite Sinh viên, when so sánh với baseline, then không có file nào bị thay đổi.

## Spec Change Log

## Design Notes

Không tạo thêm trang: `10-xet-duyet-ho-so-sinh-vien.html` là hàng chờ/chi tiết đại diện, còn `10b-xet-duyet-khong-quyen.html` là trạng thái bảo mật. Trên trang 10, action bar tách hai nhánh: `Tải BM01B` → ký ngoài hệ thống → `Tải PDF đã ký` → `Duyệt`; hoặc `Trả hồ sơ` mở dialog nhập lý do. Badge khởi tạo `1`; sau quyết định runtime cập nhật badge nhưng không xóa item nav. Trang mặc định sau đăng nhập vẫn là `Đề tài`.

## Verification

**Commands:**
- `python _bmad-output/tools/generate_actor_mockups.py --check` -- không drift.
- `python _bmad-output/tools/validate_actor_mockups.py` -- 53 trang/69 mã và hợp đồng nav đạt.
- `node --check _bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/giang-vien/lecturer.js` -- JavaScript hợp lệ.
- `git diff --name-only 0384c2c -- _bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/sinh-vien` -- không có output.

**Manual checks:**
- Ở 1440px và 390px, mở `Xét hồ sơ`, tải/ký/tải lại PDF, Duyệt/Trả sửa và kiểm tra active item/badge/drawer.

## Suggested Review Order

**Luồng Xét hồ sơ**

- Bắt đầu từ nguồn canonical của sidebar, tải PDF và hai nhánh quyết định.
  [`generate_actor_mockups.py:307`](../tools/generate_actor_mockups.py#L307)

- Kiểm tra bề mặt sinh ra và trạng thái khóa sau quyết định.
  [`10-xet-duyet-ho-so-sinh-vien.html:1`](../planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/giang-vien/10-xet-duyet-ho-so-sinh-vien.html#L1)

**Hợp đồng IA và kiểm thử**

- IA xác nhận Xét hồ sơ là mục riêng của Giảng viên.
  [`EXPERIENCE.md:35`](../planning-artifacts/ux-designs/ux-NCKH-2026-07-21/EXPERIENCE.md#L35)

- Validator khóa counts, quyền, gate PDF và trạng thái bảo mật.
  [`validate_actor_mockups.py:191`](../tools/validate_actor_mockups.py#L191)
