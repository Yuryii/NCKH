---
title: 'Hoàn thiện logic demo luồng Hội đồng (Chủ tịch - Thư ký - Thành viên)'
type: 'feature'
created: '2026-07-23'
status: 'draft'
review_loop_iteration: 1
context:
  - '{project-root}/_bmad-output/planning-artifacts/prds/prd-NCKH-2026-07-20/prd.md'
  - '{project-root}/_bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/EXPERIENCE.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Các trang CT (Chủ tịch), TV (Thành viên) và TK (Thư ký) đã có cấu trúc shell tĩnh, nhưng chưa có sự liên kết trạng thái động. Người dùng kiểm thử mockup của từng vai trò một cách cô lập và không thể chứng minh toàn bộ luồng nghiệp vụ liên kết: Thành viên nộp phiếu $\rightarrow$ Hệ thống chốt Tập phiếu và mở cổng Biên bản $\rightarrow$ Thư ký lập/nộp Biên bản $\rightarrow$ Chủ tịch review/ký thứ hai.

**Approach:** Xây dựng một trạng thái cuộc họp dùng chung (Meeting State) lưu trữ trong `localStorage` trình duyệt. Nối toàn bộ trang thuộc bộ ba actor này vào trạng thái chung đó. Luồng mô phỏng sự dịch chuyển trạng thái động của cả ba vai trò qua ba giai đoạn: BM02/BM03, BM06/BM07 và BM11/BM12, bao gồm cả các luồng rẽ nhánh (trả Biên bản bổ sung, nộp lại Biên bản).

## Boundaries & Constraints

**Always:**
- **Mẫu số đánh giá:** Hội đồng gồm đúng 1 Chủ tịch (thuộc mẫu số đánh giá) và 4 Thành viên (tổng cộng 5 phiếu đánh giá). Thư ký Hội đồng là vai trò riêng, không có phiếu đánh giá và nằm ngoài mẫu số.
- **Mốc chốt phiếu:** Tập phiếu chỉ khóa (Mốc chốt được tạo tự động) khi đủ 100% (5/5) phiếu đánh giá của người có trách nhiệm đánh giá.
- **Biên bản hội đồng:** Chỉ được mở để lập (đối với Thư ký) sau Mốc chốt phiếu.
- **Tuyến 2 chữ ký:** Thư ký ký và nộp trước $\rightarrow$ Chủ tịch review, chọn duyệt hoặc trả sửa (yêu cầu lý do) $\rightarrow$ Nếu duyệt, Chủ tịch ký thứ hai và nộp tệp hoàn tất.
- **Trạng thái Cuộc họp:** Chỉ cho phép nộp phiếu hoặc Biên bản khi cuộc họp đang mở (`Open`).

**Ask First:**
- Thay đổi cơ cấu phân vai trò trong PRD hoặc đổi thiết kế các tệp biểu mẫu nghiệp vụ.

**Never:**
- Cho Thư ký nộp phiếu đánh giá cá nhân; cho Chủ tịch ký Biên bản trước khi Thư ký ký; ghi đè phiên bản Biên bản đã ký trước đó; lưu trữ dữ liệu thật trên máy chủ (backend/API).

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|---|---|---|---|
| TV/CT Nộp phiếu | Cuộc họp đang mở, biểu mẫu hợp lệ, PDF đã chọn | Lưu phiếu cá nhân vào state chung; nếu đây là phiếu thứ 5/5, tự động khóa tập phiếu và kích hoạt Mốc chốt | Chặn nộp nếu thiếu PDF, sai mẫu theo giai đoạn, hoặc cuộc họp đã kết thúc/phiếu đã khóa |
| TK Xem tiến độ | Chưa đủ 5/5 phiếu đánh giá | Dashboard (TK-03) báo Chưa đủ 100%; nút Lập biên bản (TK-05) bị khóa | Hiện rõ danh sách thành viên chưa nộp |
| TK Lập & Nộp Biên bản | Đã có Mốc chốt (5/5 phiếu), nhập đủ form và chọn PDF đã ký | Đổi trạng thái Biên bản sang Chờ chữ ký thứ hai; khóa form lập | Chặn nếu thiếu tệp, hoặc cuộc họp không mở |
| CT Review Biên bản | Thư ký đã nộp Biên bản | Hiển thị nút Duyệt & Trả chỉnh sửa (CT-06) | Không cho phê duyệt nếu chưa có bản ký của Thư ký |
| CT Trả Biên bản | Chọn Trả chỉnh sửa, nhập lý do | Đổi trạng thái Biên bản sang Trả chỉnh sửa; chỉ cho phép Thư ký chỉnh sửa trên TK-05 | Bắt buộc nhập lý do trả |
| TK Nộp lại Biên bản | Biên bản đang ở trạng thái Trả chỉnh sửa | Cho phép Thư ký sửa form và nộp bản ký mới (V3 thay V2) | Chặn nếu không đúng trạng thái Trả chỉnh sửa |
| CT Ký thứ hai | Biên bản ở trạng thái Chờ ký; tải PDF đủ 2 chữ ký | Đổi trạng thái Biên bản sang Hoàn tất; cập nhật kết quả (CT-08 / TK-06) | Chặn tệp trống hoặc sai định dạng PDF |
| Reset Demo | Nhấn nút reset trên bất kỳ trang nào của CT/TK/TV | Xóa sạch state cuộc họp trong localStorage, đưa về fixture mặc định ban đầu | Không ảnh hưởng đến state của P.KHCN hoặc actor khác |

</frozen-after-approval>

## Code Map

- `_bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/shared/actor.js` -- logic quản lý trạng thái động trong `localStorage` dùng chung cho bộ ba actor và xử lý transition/validation.
- `_bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/chu-tich-hoi-dong/*.html` -- 8 trang Chủ tịch Hội đồng.
- `_bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/thanh-vien-hoi-dong/*.html` -- 6 trang Thành viên Hội đồng.
- `_bmad-output/planning-artifacts/ux-designs/ux-NCKH-2026-07-21/mockups/thu-ky-hoi-dong/*.html` -- 6 trang Thư ký Hội đồng.

## Tasks & Acceptance

**Execution:**
- [ ] `mockups/shared/actor.js` -- bổ sung logic khởi tạo và quản lý `localStorage` state cho cuộc họp HĐNT-2026-006 (lưu số lượng phiếu đã nộp, trạng thái Mốc chốt, trạng thái Biên bản, tệp PDF đính kèm, lịch sử phản hồi).
- [ ] `mockups/shared/actor.js` -- xử lý hành động nộp phiếu cá nhân cho `data-actor="ct"` và `data-actor="tv"`, tự động cập nhật số lượng phiếu đã nộp và kích hoạt checkpoint.
- [ ] `mockups/shared/actor.js` -- xử lý hành động nộp Biên bản cho `data-actor="tk"`, bao gồm cả luồng nộp lần đầu (V2) và nộp lại (V3) sau khi bị trả.
- [ ] `mockups/shared/actor.js` -- xử lý hành động trả Biên bản và ký thứ hai cho `data-actor="ct"`.
- [ ] Gắn các hook cập nhật giao diện tự động trên các trang:
  - `chu-tich-hoi-dong/`: `01-viec-can-lam.html`, `03-chi-tiet-cuoc-hop.html`, `05-phieu-cua-toi.html`, `06-review-bien-ban.html`, `07-chu-ky-thu-hai.html`.
  - `thanh-vien-hoi-dong/`: `01-viec-can-lam.html`, `03-chi-tiet-cuoc-hop.html`, `05-phieu-cua-toi.html`.
  - `thu-ky-hoi-dong/`: `01-viec-can-lam.html`, `03-dashboard-thu-ky.html`, `05-bien-ban.html`.
- [ ] Gắn thêm nút "Reset Demo" trực quan ở góc hoặc sidebar trên tất cả các trang thuộc 3 actor này.

## Acceptance Criteria
- Given người dùng ở vai trò Thành viên (TV) hoặc Chủ tịch (CT), when nộp thành công phiếu cá nhân, then số lượng phiếu đã nộp trong state tăng lên; nếu đạt 5/5, tập phiếu lập tức khóa và hệ thống tự động tạo Mốc chốt.
- Given Thư ký (TK) truy cập dashboard, when số lượng phiếu chưa đạt 5/5, then nút lập biên bản bị vô hiệu hóa; when đã có Mốc chốt (5/5 phiếu), then cho phép lập và nộp Biên bản.
- Given Thư ký đã nộp Biên bản, when Chủ tịch (CT) truy cập trang review Biên bản, then thấy tệp Biên bản V2 có chữ ký Thư ký và hiển thị nút Duyệt / Trả chỉnh sửa.
- Given Chủ tịch chọn Trả chỉnh sửa kèm lý do, when Thư ký quay lại trang lập Biên bản, then thấy Biên bản ở trạng thái `Trả chỉnh sửa`, lý do trả từ Chủ tịch hiển thị trực quan, và chỉ cho phép nộp bản ký mới (V3).
- Given Biên bản được chấp nhận, when Chủ tịch tải bản đủ hai chữ ký lên, then Biên bản chuyển trạng thái `Hoàn tất` và phản ánh kết quả trên tất cả trang việc cần làm/kết quả tương ứng của HĐNT-2026-006.
- Given người dùng bấm Reset Demo, when trang tải lại, then toàn bộ dữ liệu cuộc họp trong `localStorage` bị xóa sạch, đưa mockup về trạng thái ban đầu (4/5 phiếu đã nộp, chưa lập Biên bản).

## Spec Change Log

- 24/07/2026 · Mở rộng đặc tả từ riêng actor Chủ tịch Hội đồng thành spec chung quản lý logic liên kết ba vai trò của luồng Hội đồng (Chủ tịch - Thư ký - Thành viên) để đảm bảo tính toàn vẹn kiểm thử chéo vai trò.

## Design Notes

Dùng một key state riêng của Chair trong `localStorage` để các trang HTML tĩnh cùng nhìn thấy fixture và transition đã thực hiện. Nút reset demo phải chỉ xóa state Chair để review có thể chạy lại mà không làm nhiễu actor khác.

## Verification

**Commands:**
- `python _bmad-output/tools/validate_actor_mockups.py` -- expected: coverage, asset và guard đều hợp lệ, exit 0.
- `git diff --check` -- expected: không lỗi whitespace.

**Manual checks:**
- Chạy static server, kiểm thử fixture cho cả ba cặp BM; thử thiếu PDF, trả Biên bản, phiên bản cũ và nộp/ký lặp.
