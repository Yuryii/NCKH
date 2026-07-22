---
title: 'Hoàn thiện mockup cho bảy actor nghiệp vụ còn lại'
type: 'feature'
created: '2026-07-23'
status: 'done'
review_loop_iteration: 5
baseline_commit: '09f4a2f1a52468f84136900ca66be29689688aed'
context:
  - '{project-root}/_bmad-output/planning-artifacts/prds/prd-NCKH-2026-07-20/prd.md'
  - '{project-root}/_bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/EXPERIENCE.md'
  - '{project-root}/_bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/DESIGN.md'
  - '{project-root}/_bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/role-screen-atlas.html'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Chỉ Sinh viên có mockup chi tiết; bảy actor khác mới ở mức Atlas nên chưa đủ để review luồng, quyền và trạng thái.

**Approach:** Tạo bộ HTML tương tác cho bảy actor theo chuẩn Sinh viên; nhóm các mã liên quan thành một trang nghiệp vụ và liên kết trực tiếp từ Bộ vai trò.

## Boundaries & Constraints

**Always:** Phủ đủ mã GV/TD/PK/CT/TV/TK/QT trong Atlas; sidebar, fixture, CTA và trạng thái đúng vai trò/phạm vi; không render hành động bị cấm; responsive desktop/mobile; control chính có tương tác minh họa và nhãn truy cập được; dùng tiếng Việt. Khi xung đột: PRD quyết định nghiệp vụ/quyền, EXPERIENCE/DESIGN quyết định cách thể hiện, Atlas quyết định coverage màn hình.

**Ask First:** Thay đổi quyền/nghiệp vụ đã khóa, thêm actor, hoặc sửa luồng Sinh viên ngoài liên kết điều hướng.

**Never:** Xây backend/API hay lưu dữ liệu thật; thêm ngoài MVP; cho P.KHCN nộp phiếu, Thư ký có phiếu, lộ kết quả trước công bố hoặc hiện menu ngoài quyền.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|---------------|----------------------------|----------------|
| Mở actor | Chọn card | Mở trang đầu đúng actor | Validator báo link hỏng |
| Tác vụ chính | Duyệt/trả, nộp, công bố, khóa | Dialog/form đổi trạng thái và toast | Nêu gate thiếu, giữ dữ liệu |
| Dữ liệu nhạy cảm | Chưa công bố/mất quyền | Ẩn dữ liệu và CTA bị cấm | Không lộ metadata |
| Responsive | 390px/1440px | Không tràn; sidebar thành drawer | Control vẫn dùng được |

</frozen-after-approval>

## Code Map

- `_bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/sinh-vien/` -- baseline shell, component và tương tác.
- `_bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/role-screen-atlas.html` -- nguồn mã màn hình, sidebar và quyền.
- `_bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/index.html` -- điểm vào các bộ chi tiết.

## Tasks & Acceptance

**Execution:**
- [x] `mockups/shared/actor.css`, `mockups/shared/actor.js` -- shell, dialog/toast, drawer có Escape/focus restore, tab/select đồng bộ, target-specific action state và gate validation.
- [x] `mockups/giang-vien/` -- 8 trang phủ GV-01–14; BM01A có trường nghiệp vụ/preview/PDF gate; review có cả Duyệt và Trả Hồ sơ để sửa theo FR-16; tuyệt đối không render metadata kết quả chưa công bố.
- [x] `mockups/truong-don-vi/` -- 6 trang phủ TD-01–06; không render đối tượng ngoài đơn vị; BM01/BM08 có cả nhánh duyệt/chuyển và trả lý do; chỉ liệt kê kết quả đã công bố.
- [x] `mockups/p-khcn/` -- 7 trang phủ PK-01–23; gate theo fixture thật; PK-12–15 có hủy/thay thế, kết thúc, công bố, điều chỉnh; PK-16–22 có action riêng cho BM08–BM14 và Hoàn tất Bước 07.
- [x] `mockups/chu-tich-hoi-dong/`, `mockups/thanh-vien-hoi-dong/`, `mockups/thu-ky-hoi-dong/` -- 8/6/6 trang; official inputs chỉ đọc; phiếu/Biên bản/chữ ký có upload gate đúng role; Thành viên không thấy aggregate trước công bố; Thư ký 4/5 không được hiện checkpoint hoàn tất.
- [x] `mockups/quan-tri-vien/` -- 6 trang không có menu NCKH; duyệt/từ chối vai trò, tạo P.KHCN không upload, và đủ khóa/mở khóa/đặt lại mật khẩu.
- [x] `mockups/index.html`, `mockups/role-screen-atlas.html`, `EXPERIENCE.md`, `DESIGN.md` -- liên kết bộ chi tiết và cập nhật bằng chứng UX sau khi validator/review đạt.
- [x] `_bmad-output/tools/validate_actor_mockups.py` -- kiểm tra coverage/link/asset/metadata cùng scope leak, unpublished metadata, role counts, required branches, dashboard gates, upload authorization/gates và semantics điều khiển.

**Acceptance Criteria:**
- Given Bộ vai trò, when chọn actor, then mở đúng bộ chi tiết và quay lại được điểm vào.
- Given một vai trò, when duyệt mọi trang, then shell ổn định và không có menu/hành động của vai trò khác.
- Given gate chưa đạt, when kích hoạt CTA, then giải thích điều kiện thiếu và không báo thành công sai.
- Given desktop/mobile, when duyệt các trang, then không tràn, drawer/dialog dùng được và không có link hỏng.
- Given validator chạy, when bộ mockup hoàn tất, then đủ mã GV/TD/PK/CT/TV/TK/QT và exit 0.

## Spec Change Log

- **Review loop 1 — generic page model làm sai quyền và nhánh nghiệp vụ:** Tasks được siết theo từng nhóm actor/page, yêu cầu action branches, gate state, upload authorization và unpublished-data guard; validator phải kiểm tra các invariant này thay vì chỉ đếm file/mã. Tránh trạng thái “4/5 nhưng đã chốt”, record ngoài scope vẫn render, upload trên trang chỉ đọc và flow chỉ có nhánh thuận. **KEEP:** shared shell/assets, 47 trang nhóm phủ 69 mã, index/Atlas entry, responsive không tràn, fixture tiếng Việt và không thay `student.css`/`student.js`.
- **Review loop 2 — coverage bằng nhãn và gate không chuyển trạng thái:** CT/TV phải minh họa đủ BM02/BM06/BM11 với xem trước–xuất–nộp; TK phải minh họa đủ BM03/BM07/BM12; nhóm PK phải có hành vi tạo/cập nhật/thống kê/readiness và chuỗi gate có đường chuyển thực tế. Sidebar không được trỏ mục thiếu trang về queue; action phải có target thật, khóa nhánh mâu thuẫn, cập nhật row/gate/count, và validator phải dùng tập mã/quyền upload độc lập với generator. **KEEP:** schema trang chuyên biệt, 47 trang/69 mã, các nhánh return/reject/security/PK đã có, unpublished guards, upload modes theo vai trò, shared responsive shell và các liên kết index/Atlas/docs.
- **Review loop 3 — đối chiếu trực tiếp FR-16 và hành vi điều khiển:** thay nhánh “Từ chối/kết thúc Hồ sơ” bằng “Trả Hồ sơ để sửa” có giữ phiên bản/lý do; thêm control chọn đúng BM02/BM06/BM11 và BM03/BM07/BM12 thay vì chỉ ghi coverage trong tiêu đề; hoàn thiện popover thông báo và focus trap drawer. **KEEP:** toàn bộ coverage 47 trang/69 mã, schema/gate/role boundaries và tài liệu liên kết đã đạt ở vòng 2.
- **Review loop 4 — coverage nghiệp vụ còn mỏng và transition chưa khóa chéo:** BM01A phải có nhóm nghiên cứu; Đợt/Hội đồng phải có field cấu hình thực; BM09/BM13 có đủ nhánh chấp nhận–trả; sản phẩm BM09 quản lý từng tệp; phiếu/Biên bản không được nộp sai giai đoạn; các action kết thúc/hủy/nộp/nộp lại phải khóa nhánh mâu thuẫn và giữ focus hợp lệ. **KEEP:** 47 trang/69 mã, quyền upload/publication guards, lựa chọn biểu mẫu theo giai đoạn, chuỗi gate P.KHCN, responsive shell và liên kết tài liệu hiện có.
- **Review loop 5 — readiness phải phát sinh từ cấu hình và fixture giai đoạn phải chuyển được:** cặp giai đoạn–official input Hội đồng được kiểm tra động; nhóm nghiên cứu BM01A dùng trường lặp có cấu trúc; CT/TV/TK có selector fixture để thao tác đủ ba loại BM mà không nộp sai giai đoạn; tình huống Biên bản bị trả chỉ mở nhánh nộp lại; bề mặt dùng chung giữ vai trò qua fragment và deep-link về queue đúng actor. **KEEP:** toàn bộ transition locks, two-file BM09, PK return/accept branches, 49-page responsive QA và validator độc lập từ vòng 4.

## Design Notes

Mỗi trang tương ứng một mục sidebar/workspace; dải mã dùng section/tab trên cùng trang. Page schema phải khai báo rõ `rows/actionable`, `actions`, `gates`, `upload mode` và `visibility`, không suy các thuộc tính này từ màu hoặc page kind chung. Action luôn gắn target DOM cụ thể, kiểm tra validity/định dạng reason/file/form trước thành công, vô hiệu nhánh quyết định mâu thuẫn và cập nhật `data-state`, row, gate, count liên quan. Gate false phải có action hợp lệ để đạt hoặc được trình bày như kịch bản bị chặn riêng; các chuỗi readiness → kết thúc → công bố và BM14 → Hoàn tất Bước 07 phải đi hết được. BM01A gồm nhóm nghiên cứu; PK có cấu hình Đợt/Hội đồng đủ để review invariant; BM09/BM13 có cả nhánh chấp nhận và trả. CT/TV bao phủ BM02/BM06/BM11; TK bao phủ BM03/BM07/BM12 với xem trước/xuất/nộp, nhưng fixture nghiệm thu chỉ cho nộp BM11/BM12. Trang read-only không render upload; actor bị chặn chỉ thấy empty state trung tính, không fixture “ẩn” có metadata. Mục sidebar chưa có trang riêng liên kết đến bề mặt dùng chung có thật, không fallback về queue. Tải lại phục hồi fixture. Shared assets không thay `student.css`/`student.js`.

## Verification

**Commands:**
- `python _bmad-output/tools/validate_actor_mockups.py` -- expected: đủ coverage, không link/asset lỗi, exit 0.
- `python _bmad-output/tools/generate_actor_mockups.py --check` -- expected: cấu hình page/action/gate hợp lệ và output không lệch generator.
- `git diff --check` -- expected: không lỗi whitespace.

**Manual checks:**
- Từ `mockups/index.html`, đi hết bảy actor ở 1440×900 và 390×844; kiểm tra dialog, filter, drawer, gate, toast, trạng thái khóa và quyền.

## Suggested Review Order

**Mô hình màn hình và quyền**

- Bắt đầu tại registry duy nhất của 47 trang và 69 mã.
  [`generate_actor_mockups.py:55`](../tools/generate_actor_mockups.py#L55)

- BM01A dùng nhóm nghiên cứu có cấu trúc và PDF gate bất biến.
  [`generate_actor_mockups.py:64`](../tools/generate_actor_mockups.py#L64)

- Đợt và Hội đồng khai báo đủ cấu hình để tính readiness.
  [`generate_actor_mockups.py:111`](../tools/generate_actor_mockups.py#L111)

**Tương tác và transition**

- Dialog kiểm tra gate, khóa nhánh mâu thuẫn và giữ focus hợp lệ.
  [`actor.js:51`](../planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/shared/actor.js#L51)

- Validation ghép đúng giai đoạn, biểu mẫu và official input.
  [`actor.js:130`](../planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/shared/actor.js#L130)

- Form gates phản ứng với cấu hình Đợt, Hội đồng và phiên bản trả.
  [`actor.js:269`](../planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/shared/actor.js#L269)

**Biên quyền và kiểm chứng**

- Validator đối chiếu mã Atlas bằng tập canonical độc lập.
  [`validate_actor_mockups.py:95`](../tools/validate_actor_mockups.py#L95)

- Ma trận branch và field chặn coverage chỉ bằng nhãn.
  [`validate_actor_mockups.py:115`](../tools/validate_actor_mockups.py#L115)

**Điểm vào và bằng chứng UX**

- Index mở trực tiếp từng bộ actor chi tiết.
  [`index.html:8`](../planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/index.html#L8)

- EXPERIENCE ghi nhận đầy đủ bảy bộ và bằng chứng review.
  [`EXPERIENCE.md:99`](../planning-artifacts/ux-designs/ux-NCKH-2026-07-21/EXPERIENCE.md#L99)
