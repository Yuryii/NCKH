---
title: 'Hoàn thiện mockup vận hành P.KHCN'
type: 'feature'
created: '2026-07-23'
status: 'done'
review_loop_iteration: 1
baseline_commit: '1bad324'
context:
  - '{project-root}/_bmad-output/planning-artifacts/prds/prd-NCKH-2026-07-20/prd.md'
  - '{project-root}/_bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/EXPERIENCE.md'
  - '{project-root}/_bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/DESIGN.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Bộ P.KHCN hiện phủ PK-01–PK-23 nhưng dồn nghiệp vụ vào bảy trang khái quát, thiếu ngữ cảnh, trạng thái, bằng chứng và liên kết hành động để có thể review đầy đủ quy trình.

**Approach:** Giữ bảy bề mặt và mã PK hiện hành, nâng chúng thành mockup vận hành chi tiết dựa trên PRD baseline, EXPERIENCE/DESIGN, danh mục use case, đặc tả Bước 01–02 và lưu đồ Bước 01–07; ưu tiên task-first, official snapshot, gate và audit.

## Boundaries & Constraints

**Always:** PRD mới nhất thắng nguồn cũ khi xung đột: P.KHCN không tiếp nhận trung gian BM01; Thư ký không nộp phiếu/không thuộc mẫu số; đủ 100% phiếu mới tự tạo Mốc chốt; P.KHCN chỉ kết thúc Cuộc họp sau Biên bản đủ hai chữ ký. Mọi action âm/không đảo ngược có lý do, xác nhận hệ quả, version và audit. BM05/BM10/BM14 được lập-ký-xử lý ngoài hệ thống; P.KHCN chỉ lưu/công bố. BM08 chỉ ghi nhận, không ký. Không hiện nội dung/tệp nháp phiếu cá nhân.

**Ask First:** Thêm mã PK mới, mở rộng sau Bước 07/BM15, sửa quyền actor khác hoặc thay hệ visual chung.

**Never:** Cho P.KHCN duyệt BM01, nộp phiếu/chữ ký Chủ tịch khi đang ở vai trò P.KHCN, sửa cấu trúc Hội đồng sau mở Cuộc họp, mở lại Tập phiếu, ghi đè phiên bản công bố, hoặc thao tác tài chính.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|---|---|---|---|
| Queue | 8 tác vụ khác loại | Nhóm/lọc được và đi đúng bề mặt | Empty/count dùng cùng scope |
| Đợt | Nháp/công bố/đóng | Chỉ Nháp sửa đầy đủ; công bố xác nhận; hết hạn tự đóng | Chặn thời gian/danh mục sai |
| Hủy đề tài | Yêu cầu hợp lệ trước Chờ nghiệm thu | Chấp thuận/từ chối đều có lý do và audit | Chặn stale/sau ngưỡng |
| Hội đồng | Cơ cấu + official input | Readiness rõ; mở xong khóa cấu trúc | Chặn trùng vai trò/lời mời thiếu |
| Cuộc họp | Phiếu, checkpoint, biên bản | 100% → Mốc chốt → Biên bản → Kết thúc → Công bố | Chặn nhảy bước; hủy tạo namespace mới |
| Bước 03–07 | BM05/08/09/10/13/14 | Đúng loại thao tác, phiên bản và gate | Trả có lý do; N/A không chặn |
| Audit | Actor/role/object/version/reason | Lọc và xem timeline bất biến | Không lộ dữ liệu ngoài scope |

</frozen-after-approval>

## Code Map

- `_bmad-output/tools/generate_actor_mockups.py` -- schema canonical và renderer bảy bề mặt P.KHCN.
- `_bmad-output/tools/validate_actor_mockups.py` -- hợp đồng coverage, quyền, action, gate và chống rò dữ liệu.
- `_bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/p-khcn/` -- output cần hoàn thiện.
- `_bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/shared/actor.css` và `actor.js` -- primitive shell/interaction hiện hành.

## Tasks & Acceptance

**Execution:**
- [x] `generate_actor_mockups.py` -- bổ sung nội dung chuyên biệt, navigation và fixtures đầy đủ cho PK-01–PK-23.
- [x] `actor.css`, `actor.js` hoặc asset P.KHCN riêng -- hỗ trợ summary, lifecycle, linked actions, dialog/gate/version/audit chi tiết và responsive.
- [x] `validate_actor_mockups.py` -- khóa các invariant PRD, count 8, trạng thái, quyền và liên kết.
- [x] `EXPERIENCE.md`, `DESIGN.md`, `role-screen-atlas.html` -- đồng bộ mô tả bề mặt P.KHCN sau hoàn thiện.

**Acceptance Criteria:**
- Given bảy trang P.KHCN, when đi hết liên kết và thao tác, then mọi PK-01–PK-23 có bề mặt chi tiết, phản hồi trạng thái và không có link hỏng.
- Given nguồn cũ mâu thuẫn PRD, when kiểm tra mockup, then chỉ quy tắc 100% phiếu, Thư ký ngoài mẫu số và không tiếp nhận BM01 được render.
- Given action bị chặn hoặc destructive, when thao tác, then UI nêu gate/lý do và không thay đổi state sai.
- Given viewport 1440px và 390px, when dùng form, bảng, dialog và drawer, then không tràn ngang và hành động chính truy cập được.

## Spec Change Log

- 23/07/2026 · Review loop 1: review phát hiện fixture BM09/checkpoint mâu thuẫn chéo trang, CTA sai anchor, thiếu stale/N-A guard và transition không đồng bộ summary/lifecycle/audit. Bổ sung yêu cầu re-derive: mọi object/version/timestamp dùng chung phải nhất quán; CTA phải trỏ đúng action anchor; quyết định phải revalidate ngay lúc confirm; nhánh BM14 N/A phải thao tác được; metric/lifecycle/audit phải phản ánh transition. Tránh trạng thái lỗi đã biết: BM09 V2 vừa thiếu vừa là official input, checkpoint có hai timestamp, filter audit chỉ lọc row. KEEP: giữ nguyên 7 workspace, PK-01–PK-23, quyền P.KHCN, mẫu số 100%, Thư ký ngoài mẫu số, BM05/BM10/BM14 ngoài hệ thống và responsive hiện có.

## Design Notes

Bảy trang là bảy workspace theo miền nghiệp vụ, không phải bảy form khổng lồ. Mỗi trang đặt summary/gate trước, danh sách có CTA đúng action anchor ở giữa, bằng chứng/audit ở cuối. Vai trò Hội đồng tách bằng role switch; P.KHCN chỉ thấy aggregate tiến độ và official input. Fixture chéo trang phải dùng mã đề tài/version/timestamp phân biệt hoặc đồng nhất rõ ràng. Runtime mockup phải revalidate stale/gate khi xác nhận và đồng bộ trạng thái hàng, metric, lifecycle, audit sau mutation.

## Verification

**Commands:**
- `python _bmad-output/tools/generate_actor_mockups.py --check`
- `python _bmad-output/tools/validate_actor_mockups.py`
- `node --check` cho JavaScript liên quan.
- Kiểm tra link, count, code coverage 53 trang/69 mã và diff suite Sinh viên.
- Kiểm tra fragment đích, object/version/timestamp chéo trang, reason của action không đảo ngược và các nhánh BM09 thiếu/N-A BM14.

**Manual checks:**
- Thao tác bảy workspace ở 1440×900 và 390×844; kiểm tra từng nhánh happy/blocked/return/cancel/publish.

**Kết quả triển khai 23/07/2026:** generator `--check`, validator 53 trang/69 mã, `node --check` và `git diff --check` đều đạt. Validator chạy thêm bảy chuỗi DOM thật bằng Edge headless cho Hội đồng, BM09/BM14, kết quả, hủy/thay thế, yêu cầu hủy, Đợt và Audit. CSS khóa reflow metric/lifecycle/detail/action group về một cột dưới 620px; suite Sinh viên và output actor ngoài P.KHCN không có diff.

## Suggested Review Order

**Mô hình nghiệp vụ và dữ liệu**

- Điểm vào canonical giữ bảy workspace nhưng tăng chiều sâu vận hành PK-01–PK-23.
  [`generate_actor_mockups.py:555`](../tools/generate_actor_mockups.py#L555)

- Hội đồng khóa official input, mẫu số 1+4 và Thư ký ngoài mẫu số.
  [`generate_actor_mockups.py:627`](../tools/generate_actor_mockups.py#L627)

- Cuộc họp ép thứ tự 100% → checkpoint → BM12 → kết thúc → công bố.
  [`generate_actor_mockups.py:645`](../tools/generate_actor_mockups.py#L645)

- Bước 03–07 phân quyền BM05/08/09/10/13/14 và nhánh N/A.
  [`generate_actor_mockups.py:657`](../tools/generate_actor_mockups.py#L657)

**Runtime, gate và audit**

- Transition đồng bộ row, metric, lifecycle và audit theo từng quyết định.
  [`actor.js:67`](../planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/shared/actor.js#L67)

- Revalidation lúc xác nhận chặn stale, sai roster, sai hợp đồng và sai bản ký.
  [`actor.js:257`](../planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/shared/actor.js#L257)

- Filter Audit dùng chung nội dung row và timeline, cập nhật đúng metric.
  [`actor.js:335`](../planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/shared/actor.js#L335)

**Bằng chứng kiểm thử**

- Edge headless chạy bảy chuỗi DOM thật, không chỉ kiểm literal token.
  [`validate_actor_mockups.py:32`](../tools/validate_actor_mockups.py#L32)

- Self-test thao tác roster, BM09/BM14, kết quả, hủy, Đợt và Audit.
  [`actor.js:484`](../planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/shared/actor.js#L484)

- Validator khóa quyền, anchor, reason, fixture chéo trang và timestamp bất biến.
  [`validate_actor_mockups.py:180`](../tools/validate_actor_mockups.py#L180)

**Tài liệu UX hỗ trợ**

- Experience spine mô tả bốn lớp bằng chứng của bảy workspace.
  [`EXPERIENCE.md:79`](../planning-artifacts/ux-designs/ux-NCKH-2026-07-21/EXPERIENCE.md#L79)

- Design spine khóa composition desktop/mobile và action group theo đối tượng.
  [`DESIGN.md:250`](../planning-artifacts/ux-designs/ux-NCKH-2026-07-21/DESIGN.md#L250)
