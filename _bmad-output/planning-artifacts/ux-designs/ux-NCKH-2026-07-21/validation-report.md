# Validation Report — NCKH

- **DESIGN.md:** `DESIGN.md`
- **EXPERIENCE.md:** `EXPERIENCE.md`
- **Run at:** 2026-07-21T14:10:00+07:00

## Overall verdict

Cặp spine có nền mạnh: đủ UJ-1–UJ-7, token tham chiếu được, 21 component có hợp đồng hai phía và các invariant chính của chuỗi phiếu–Biên bản–công bố được giữ. Trước khi sửa, inheritance bị hỏng do đường dẫn PRD sai và còn các khoảng trống đáng kể về accessibility cùng workflow/phân quyền.

Ba reviewer không phát hiện lỗi critical. Các finding high đã dẫn đến bản cập nhật trực tiếp cho hai spine: sửa source path, contrast, reflow/PDF/xác thực/timeout, luồng yêu cầu hủy, ma trận xem kết quả, phiên bản điều chỉnh, assignment Thư ký và isolation của Cuộc họp thay thế.

## Category verdicts

- Flow coverage — **strong**
- Token completeness — **strong**
- Component coverage — **adequate**
- State coverage — **strong**
- Visual reference coverage — **strong**
- Bloat & overspecification — **adequate**
- Inheritance discipline — **broken** *(tại thời điểm review; source path đã được sửa)*
- Shape fit — **strong**

## Findings by severity

### Critical (0)

Không có.

### High (12)

- **[Rubric]** Đường dẫn PRD không resolve từ workspace. *Fix applied:* đổi thành `../../prds/...` trong cả hai spine.
- **[Accessibility]** Viền control không đạt 3:1. *Fix applied:* thêm `{colors.control-border}` và tách divider trang trí.
- **[Accessibility]** `ink-muted` không đạt 4.5:1 trên nền xám. *Fix applied:* đổi token và thêm bảng cặp tương phản.
- **[Accessibility]** Reflow chỉ cam kết cho tác vụ ngắn. *Fix applied:* toàn bộ luồng cốt lõi ở 320 CSS px/zoom 400%.
- **[Accessibility]** PDF bắt buộc thiếu nội dung tương đương truy cập được. *Fix applied:* HTML cấu trúc song song; tagged PDF/PDF-UA khi khả thi; quy trình bản thay thế.
- **[Accessibility]** Timeout chưa bắt buộc cảnh báo/gia hạn. *Fix applied:* countdown truy cập được, gia hạn và phục hồi bước/focus.
- **[Accessibility]** Xác thực chưa đáp ứng WCAG 2.2 Accessible Authentication. *Fix applied:* paste/password manager/autofill và cấm puzzle không có phương án tương đương.
- **[Workflow]** Thiếu luồng yêu cầu hủy Hồ sơ/Đề tài. *Fix applied:* surface, state, cổng quyền và named flow.
- **[Workflow]** Thiếu ma trận xem kết quả trước/sau công bố. *Fix applied:* bảng quyền áp dụng cả preview, notification, search và deep link.
- **[Workflow]** Thiếu phiên bản điều chỉnh sau công bố. *Fix applied:* immutable adjustment workflow và flow riêng.
- **[Workflow]** Vai trò kép Thư ký/người đánh giá làm mơ hồ mẫu số. *Fix applied:* assignment Thư ký độc quyền trong baseline MVP.
- **[Workflow]** Cuộc họp thay thế chưa cô lập quyền/bằng chứng. *Fix applied:* namespace, assignment, invitation, snapshot, denominator và evidence riêng.

### Medium (18)

- **Rubric:** primitive nền chưa có UI system; pipeline bằng chứng lặp ở nhiều nơi. *Resolution:* chọn shadcn/ui + Radix làm baseline giả định; `Evidence & PDF Contract` là nguồn chuẩn.
- **Accessibility:** bổ sung skip link/landmark/focus SPA; dialog/tabs semantics; table/card semantics; announcement matrix; skeleton busy state; uploader; repeatable fieldset; DOM order; target size; link underline; widget semantics.
- **Workflow:** bổ sung state gate hủy Cuộc họp; BM05/BM10 upload-vs-publish; tuyến actor BM08; checkpoint idempotency; snapshot Hồ sơ cá nhân; ma trận quyền audit và bỏ export khỏi MVP.

### Low (5)

- Tên UJ-7 chưa verbatim; đã sửa capitalization.
- Mục tiêu chuẩn accessibility trước đây chỉ nêu WCAG 2.1; đã nâng baseline sản phẩm lên 2.2 AA, chờ stakeholder xác nhận.
- Token disabled có nguy cơ dùng cho nội dung cần đọc; đã cấm trong DESIGN.md.
- Nháp Biên bản sau hủy chưa rõ retention/chủ thể xem; giữ là policy mở, nháp không phải bằng chứng.
- Bằng chứng bị lặp trong flow; cần giữ các flow chỉ như minh họa, không tạo quy tắc mới ngoài Evidence Contract.

## Reviewer files

- `review-rubric.md`
- `review-accessibility.md`
- `review-workflow-integrity.md`

