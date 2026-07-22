# Accessibility Review — NCKH

## Overall verdict

Hai spine có nền accessibility khá tốt: dùng ngữ nghĩa HTML thay `div` click, focus nhìn thấy, lỗi tại trường + error summary, trạng thái không chỉ bằng màu, hỗ trợ bàn phím, giảm chuyển động và mục tiêu 44×44 px cho control quan trọng. Tuy nhiên, hợp đồng chưa đủ để downstream triển khai nhất quán ở WCAG 2.1/2.2 AA. Các rủi ro lớn nhất là token viền không đạt tương phản, reflow chỉ cam kết cho tác vụ ngắn, PDF bắt buộc chưa có chiến lược nội dung truy cập được, timeout còn tùy điều kiện và luồng xác thực chưa đáp ứng Accessible Authentication của WCAG 2.2.

**Finding counts:** critical 0 · high 6 · medium 11 · low 2.

## Findings

### High

- **[high] Viền control và focus-adjacent boundaries không đạt 3:1.** `{colors.border-default}` `#D9D9D9` trên trắng chỉ khoảng **1.41:1** và `{colors.border-strong}` `#A9AAAC` trên trắng khoảng **2.32:1**, nhưng hai token này được dùng cho `role-switcher`, `data-table`, `form-section`, `file-evidence-panel`, `document-viewer`, `action-bar` và nhiều control/panel chịu tải. Điều này mâu thuẫn trực tiếp với tuyên bố 3:1 cho ranh giới control. (DESIGN.md: Colors; YAML `border-default`, `border-strong`; Components). *Fix:* thêm token `control-border` đạt ≥3:1 trên từng surface và dùng nó cho input, button outline, dropdown, uploader, tab, viewer toolbar và ranh giới cần nhận biết; giữ divider trang trí nhạt riêng và ghi rõ divider nào được miễn 1.4.11.

- **[high] Chữ muted thất bại trên surface xám nhạt.** `{colors.ink-muted}` `#737477` đạt khoảng 4.67:1 trên trắng nhưng chỉ **4.32:1** trên `{colors.surface-subtle}` `#F6F6F6`; token này được dùng cho metadata/empty state và các surface xám xuất hiện rộng rãi. (DESIGN.md: YAML colors; Colors; `audit-timeline`, `empty-state`). *Fix:* đổi `ink-muted` sang màu đạt ≥4.5:1 trên cả trắng và `surface-subtle`, hoặc tách `ink-muted-on-base` và `ink-muted-on-subtle` với cặp nền được kiểm chứng; lập bảng contrast token-pair trong DESIGN.md.

- **[high] Reflow được giới hạn sai cho “tác vụ theo dõi và tác vụ ngắn”.** WCAG 1.4.10 áp dụng cho toàn bộ nội dung/chức năng ở chiều rộng 320 CSS px, trừ phần thật sự cần bố cục hai chiều; spine hiện cho phép các luồng dài/phức tạp không có cam kết reflow đầy đủ. (EXPERIENCE.md: Accessibility Floor, Responsive & Platform). *Fix:* cam kết mọi luồng cốt lõi dùng được ở 320 CSS px/zoom tương đương 400%; chỉ miễn canvas PDF/bảng dữ liệu thật sự hai chiều, và với phần miễn phải có vùng cuộn hai chiều được gắn nhãn, không tạo cuộn ngang toàn trang, giữ action/focus truy cập được.

- **[high] Nội dung PDF bắt buộc chưa có đường truy cập tương đương.** Spine chấp nhận PDF đầu vào có thể không accessible và chỉ cung cấp metadata/tải xuống, trong khi người dùng phải đọc, đối chiếu và ký/nộp các BM để hoàn tất luồng. Metadata không thay thế nội dung tài liệu theo WCAG. Tài liệu do hệ thống xuất cũng chưa bắt buộc tagged PDF, ngôn ngữ, heading/table structure, reading order hoặc alt text. (EXPERIENCE.md: Accessibility Floor; Evidence & PDF Contract; `document-viewer`; PRD FR-11/24/27/46/49). *Fix:* yêu cầu PDF do hệ thống sinh đạt PDF/UA ở mức khả thi (tag, `vi`, reading order, heading, bảng, form text, Unicode); luôn cung cấp HTML có cấu trúc của dữ liệu nguồn song song với preview; với tài liệu tải lên không truy cập được, định nghĩa quy trình cung cấp bản thay thế/assistance và không buộc người dùng phụ thuộc duy nhất vào canvas PDF.

- **[high] Cảnh báo timeout còn “nếu chính sách cho phép”.** Một timeout phiên có thể làm mất hoặc khóa tác vụ dài nhưng contract không buộc cảnh báo trước, cho gia hạn hoặc ngoại lệ cho dữ liệu thiết yếu; giữ dữ liệu “khi an toàn” cũng chưa đủ xác định. (EXPERIENCE.md: State Patterns — Session expired; Accessibility Floor). *Fix:* theo WCAG 2.2.1, cảnh báo trước khi hết phiên, cho gia hạn bằng thao tác đơn giản ít nhất 10 lần thời lượng mặc định khi không có ngoại lệ bảo mật chính đáng; công bố countdown truy cập được, giữ bản nháp an toàn, và sau đăng nhập lại phục hồi đúng bước/focus sau khi kiểm tra quyền và phiên bản.

- **[high] Luồng đăng nhập/đặt lại mật khẩu chưa có Accessible Authentication của WCAG 2.2.** IA chỉ liệt kê trạng thái xác thực; chưa cấm bài kiểm tra trí nhớ/nhận thức, chưa bảo đảm paste/password manager/autofill và chưa có phương án CAPTCHA truy cập được. (EXPERIENCE.md: IA — Đăng nhập & khôi phục truy cập; PRD FR-1, NFR-16). *Fix:* thêm contract WCAG 2.2 SC 3.3.8: cho phép paste và password manager, dùng `autocomplete` đúng (`username`, `current-password`, `new-password`, `one-time-code`), không yêu cầu chép/nhớ bí mật hoặc giải puzzle nếu không có cơ chế thay thế, và cung cấp CAPTCHA đa phương thức hoặc kiểm soát chống lạm dụng không tạo bài kiểm tra nhận thức.

### Medium

- **[medium] App shell chưa có cơ chế bỏ qua vùng lặp.** Header + sidebar/drawer xuất hiện trên mọi surface nhưng contract không yêu cầu “Bỏ qua đến nội dung chính”, landmarks có tên duy nhất hoặc focus đích sau navigation. (EXPERIENCE.md: Foundation; IA; Accessibility Floor; `app-shell`). *Fix:* thêm skip link là phần tử focus đầu tiên, `header/nav/main/aside` đúng ngữ nghĩa, tên truy cập cho nhiều `nav`, và chuyển focus tới `h1`/`main` khi điều hướng kiểu SPA.

- **[medium] Focus management cho dialog, drawer, popover và tab chưa đủ.** Spine chỉ nêu `Esc` đóng và trả focus về trigger; chưa khóa focus, đặt initial focus, làm nền `inert`, xử lý trigger biến mất, hoặc quy tắc tab PDF/quyết định trên mobile. (EXPERIENCE.md: IA; Interaction Primitives; DESIGN.md `decision-dialog`). *Fix:* quy định WAI-ARIA dialog pattern: `aria-modal`, name/description, initial focus theo mức rủi ro, focus trap, close button, background inert, return-focus fallback; drawer/popover có semantics và dismissal rõ; tabs dùng `tablist/tab/tabpanel`, arrow keys, `aria-selected` và focus không bị reset khi đổi tab.

- **[medium] Bảng và bản card mobile chưa bảo toàn ngữ nghĩa dữ liệu.** Contract có table header chung nhưng thiếu caption/tên, `scope`/header association cho bảng phức tạp, `aria-sort`, trạng thái filter, pagination announcement và cách card giữ nhãn cột. Row click cũng dễ tạo target lồng nhau. (EXPERIENCE.md: `data-table`; Accessibility Floor). *Fix:* định nghĩa table pattern theo độ phức tạp; sort là button trong `th` với `aria-sort`; filter có label và summary kết quả live; pagination có `nav` name; card mobile lặp nhãn trường; không đặt button/link tương tác bên trong một row/card clickable lồng nhau—dùng link tiêu đề riêng.

- **[medium] Các thay đổi trạng thái bất đồng bộ chưa có ma trận announcement.** `aria-live phù hợp` quá chung cho autosave, upload/export, lỗi nền, thay đổi 4/5→5/5 phiếu, tạo Mốc chốt và hành động bất biến; implementation có thể đọc quá nhiều hoặc bỏ sót sự kiện quan trọng. (EXPERIENCE.md: `feedback-message`, `progress-meter`; State Patterns; Accessibility Floor). *Fix:* thêm bảng sự kiện → cơ chế: `role=status`/polite cho save/progress hoàn tất, `role=alert` cho lỗi chặn, `aria-valuenow/min/max/text` cho progress, `aria-busy` cho vùng cập nhật; không announce từng phần trăm, và chỉ move focus khi workflow chuyển sang surface/bước mới.

- **[medium] Loading/skeleton thiếu semantics.** Cold-load mô tả skeleton và retry nhưng không nói ẩn skeleton khỏi accessibility tree, đánh dấu vùng bận hay duy trì tên vùng khi dữ liệu thay thế. (EXPERIENCE.md: State Patterns — Cold load). *Fix:* skeleton `aria-hidden=true`, container có `aria-busy=true` và accessible status ngắn; khi load xong bỏ busy, giữ focus hiện tại và announce lỗi/retry nếu có.

- **[medium] Upload/PDF processing thiếu contract input và lỗi lập trình được.** File picker bàn phím đã có, nhưng chưa yêu cầu accessible name, mô tả định dạng/dung lượng liên kết bằng `aria-describedby`, danh sách file, remove/retry bằng bàn phím, lỗi theo từng tệp và cancel/progress semantics. (EXPERIENCE.md: `file-evidence-panel`; Interaction Primitives; Evidence & PDF Contract). *Fix:* đặc tả uploader như input file chuẩn + nút, dropzone chỉ bổ trợ; constraints và error ID được liên kết; mỗi tệp là một item có tên/size/state/action; progress dùng `progress` hoặc ARIA range; xử lý nhiều tệp và duplicate có thông báo rõ.

- **[medium] Form động/repeatable chưa có group semantics và xử lý lỗi khi ẩn/xóa.** Stable ID là tốt nhưng chưa có `fieldset/legend`, required/optional programmatic state, thông báo khi thêm/xóa, hoặc quy tắc dọn lỗi của nhánh điều kiện không còn áp dụng. (EXPERIENCE.md: `form-section`, `repeatable-fieldset`; Accessibility Floor). *Fix:* dùng `fieldset/legend` cho nhóm và từng item lặp, nhãn duy nhất “Thành viên 2…”, announce add/remove, đưa focus tới item mới/đích hợp lý sau xóa, cập nhật thứ tự trong accessible name, và loại lỗi/`aria-invalid` của field đã bị ẩn khỏi summary.

- **[medium] Thứ tự DOM khi responsive/master-detail chưa được khóa.** Quy tắc “Tab theo thứ tự đọc” không quyết định source order cho PDF–quyết định, sticky action bar, metadata panel và card/table khi đổi breakpoint; CSS visual order có thể khác focus order. (EXPERIENCE.md: IA; Interaction Primitives; Responsive & Platform). *Fix:* quy định DOM order bất biến theo trình tự tác vụ, không dùng CSS `order` tạo lệch visual/focus order; sticky bar xuất hiện đúng vị trí logic, và khi chuyển breakpoint không tự thay focus hoặc đưa focus vào content ẩn.

- **[medium] Kích thước target chỉ áp dụng cho “control quan trọng”.** Điều này để ngỏ icon action, pagination, close, version actions và toolbar PDF dưới mức WCAG 2.2 SC 2.5.8. (EXPERIENCE.md: Interaction Primitives). *Fix:* mọi target pointer đạt tối thiểu 24×24 CSS px hoặc ngoại lệ spacing hợp lệ; control chính/touch-first đạt 44×44; ghi rõ spacing giữa target và áp dụng cho icon-only controls.

- **[medium] Link có thể chỉ phân biệt bằng màu.** `{colors.brand-primary}` được dành cho “liên kết trọng yếu” nhưng spine không bắt buộc underline/shape khác khi link nằm trong đoạn văn; đỏ so với chữ body không đủ là cue độc lập. (DESIGN.md: Colors; Do's and Don'ts). *Fix:* link inline luôn underline (có thể tăng độ dày/offset khi hover/focus), không bỏ underline chỉ dựa trên màu; link trong nav/button-like context phải có vị trí, hình dạng và focus state rõ.

- **[medium] Role switcher, timeline và checklist chưa chốt widget semantics.** Đây là các control chịu tải nhưng chỉ có accessible name chung; chưa rõ switcher là menu/listbox, bước hiện tại dùng `aria-current`, checklist dùng list/status hay disabled-action relation. (EXPERIENCE.md: `role-switcher`, `step-timeline`, `checklist-gate`). *Fix:* chọn pattern chuẩn thay vì ARIA lai: switcher dạng button + menu/radio group với keyboard pattern; timeline là ordered list với `aria-current=step`; checklist là list có text status; action bị chặn tham chiếu summary lý do qua `aria-describedby` và vẫn có đường xem lý do bằng bàn phím.

### Low

- **[low] Mục tiêu chuẩn chỉ khóa WCAG 2.1 AA dù spine đã dùng một số quy tắc 2.2.** Điều này khiến acceptance test có thể bỏ qua Focus Not Obscured, Dragging Movements, Target Size và Accessible Authentication. (EXPERIENCE.md: Accessibility Floor; PRD NFR-12/OQ-8). *Fix:* đề xuất stakeholder chốt WCAG 2.2 AA cho UI mới; nếu pilot vẫn khóa 2.1 AA, ghi riêng các tiêu chí 2.2 nào vẫn bắt buộc như product baseline.

- **[low] Token disabled dễ bị dùng cho thông tin cần đọc.** `{colors.ink-disabled}` `#9A9A9A` trên trắng chỉ khoảng 2.81:1; disabled controls được miễn contrast nhưng lý do bị chặn thì không. Spine đã yêu cầu lý do gần control nhưng chưa cấm dùng token disabled cho lý do. (DESIGN.md: YAML colors; `action-bar`). *Fix:* ghi rõ `ink-disabled` chỉ áp dụng cho affordance disabled không cần đọc để hiểu; nhãn và lý do chặn dùng `ink-body`/`ink-muted` đã đạt chuẩn, đồng thời phản ánh disabled bằng nhiều cue.

## Verified strengths

- White trên `{colors.brand-primary}` đạt khoảng 7.11:1; white trên hover đỏ đậm đạt khoảng 8.77:1; focus-ring xanh trên trắng đạt khoảng 6.47:1.
- Các cặp trạng thái chính đã nêu có mức tốt khi dùng màu đậm trên nền mềm: success khoảng 4.82:1, warning khoảng 5.41:1, danger khoảng 5.75:1.
- Spine yêu cầu màu không là tín hiệu duy nhất, focus không bị sticky UI che, keyboard cho luồng cốt lõi, error summary liên kết tới trường, `prefers-reduced-motion`, không dùng drag-and-drop là đường duy nhất và không optimistic update cho mốc bất biến.
- Quy tắc phân biệt upload với `Nộp`, bản hiện hành với bản mất hiệu lực, và disabled action với lý do gần control giúp giảm lỗi nhận thức trong luồng tài liệu nhiều phiên bản.

## Acceptance checks recommended for downstream

1. Chạy axe-core + kiểm thử thủ công bàn phím/NVDA trên UJ-1, UJ-3, UJ-4 và UJ-5; đây là các luồng bao phủ form dài, lời mời, upload/PDF, progress tự động, dialog hệ quả lớn và chuyển vai trò.
2. Kiểm thử 200% và 400% zoom ở viewport desktop, cùng 320 CSS px; không cuộn ngang toàn trang và không mất action/focus.
3. Lập test matrix contrast từ token theo từng surface thực tế, bao gồm default/hover/focus/error/disabled và soft status backgrounds.
4. Kiểm thử PDF bằng PAC/veraPDF và screen reader cho ít nhất BM01, một Phiếu đánh giá và một Biên bản; kiểm chứng HTML structured-data alternative.
5. Kiểm thử timeout, re-auth, password manager, paste, one-time link và CAPTCHA/anti-abuse bằng bàn phím và screen reader.
