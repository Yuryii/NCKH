# Spine Pair Review — NCKH

## Overall verdict

Cặp spine đủ mạnh để truyền đạt phần lớn hợp đồng UX: cả 7 hành trình chính đều khép kín, token tham chiếu được, 21 component nghiệp vụ có đặc tả hai phía, và 17 bề mặt có coverage trạng thái rõ. Tuy nhiên, khả năng source-extract hiện bị phá vỡ bởi đường dẫn PRD sai trong frontmatter của cả hai tệp; ngoài ra, việc chưa chốt UI system khiến các primitive nền được dùng nhưng chưa có hợp đồng kế thừa rõ cho downstream consumer.

## 1. Flow coverage — strong

Đã đối chiếu UJ-1 đến UJ-7 trong PRD (§2.4, dòng 56–64) với `EXPERIENCE.md` (§Key Flows, dòng 161–239). Cả 7 hành trình đều có nhân vật có tên, các bước đánh số, một climax rõ và failure path áp dụng; các yêu cầu chức năng liên quan được gom hợp lý vào đúng hành trình thay vì tạo một flow giả cho từng FR.

### Findings

Không có finding.

## 2. Token completeness — strong

Đã trích toàn bộ frontmatter token và 45 tham chiếu `{path.to.token}` trong hai spine. Tất cả tham chiếu đều resolve; 23 color token đều là mã hex; typography, rounded, spacing và component token đúng loại theo `references/design-md-spec.md`. Mục tiêu tương phản cho chữ, focus và ranh giới control được cam kết tại `DESIGN.md` §Colors.

### Findings

Không có finding.

## 3. Component coverage — adequate

Đã đối chiếu 21 component có tên trong `DESIGN.md` frontmatter/§Components với `EXPERIENCE.md` §Component Patterns. Tất cả 21 tên khớp chính xác và mỗi phía đều có quy tắc thực chất về visual hoặc behavior.

### Findings

- **[medium]** Hai spine dùng nhiều primitive nền — button/link, input/checkbox, table, skeleton, drawer, popover, dropdown, tooltip và upload/file picker — nhưng Foundation chỉ nói sẽ chọn “một thư viện component web” sau này, nên không có hệ thống kế thừa được gọi tên và cũng không có hàng paired-spec cho các primitive này (`DESIGN.md` dòng 240, 244, 254, 262–263; `EXPERIENCE.md` dòng 16, 73, 76–77, 99, 114–120). *Fix:* chốt UI system và tuyên bố các primitive nào kế thừa nguyên trạng; với primitive có delta NCKH, thêm tên thống nhất vào cả `DESIGN.md.Components` và `EXPERIENCE.md.Component Patterns`.

## 4. State coverage — strong

Đã đi qua cả 17 surface trong IA. Mỗi surface có danh sách trạng thái bắt buộc tại chỗ; §State Patterns bổ sung cold-load, empty, saving/error, long-running processing, validation, permission-denied, offline, stale/concurrent, session-expired, terminal/immutable, replaced/invalid và not-applicable. Focus và keyboard state được đóng ở §Interaction Primitives và §Accessibility Floor.

### Findings

Không có finding.

## 5. Visual reference coverage — strong

Workspace chưa có `mockups/` hoặc `wireframes/`. Import duy nhất là `imports/dntu-visual-reference.md`; nó được liên kết inline và giải thích đúng vai trò tại `DESIGN.md` §Brand & Style và `EXPERIENCE.md` §Inspiration & Anti-patterns. Quy tắc spine thắng khi xung đột được nêu một lần tại `DESIGN.md` dòng 204.

### Findings

Không có finding.

## 6. Bloat & overspecification — adequate

Hai spine chủ yếu giữ quyết định downstream cần dùng; bảng được dùng tốt cho component, state, IA và breakpoint. Các Key Flow dài nhưng cần thiết để giữ climax và failure path của quy trình nhiều mốc.

### Findings

- **[low]** Hợp đồng pipeline bằng chứng được nhắc lại ở Component Patterns, State Patterns, §Evidence & PDF Contract và nhiều Key Flow, tạo nhiều điểm có thể drift khi quy tắc phiên bản/nộp thay đổi (`EXPERIENCE.md` dòng 80–86, 101–109, 133–140, 163–239). *Fix:* giữ §Evidence & PDF Contract làm nguồn quy tắc duy nhất; các section khác chỉ nêu delta theo component/flow và cross-reference tới sáu điều khoản đó.

## 7. Inheritance discipline — broken

Đã kiểm tra đường dẫn `sources`, tên UJ, thuật ngữ chính, tên component và token cross-reference. Import DNTU resolve; component names và token references khớp giữa hai spine.

### Findings

- **[high]** Đường dẫn PRD `../../../prds/prd-NCKH-2026-07-20/prd.md` trong cả hai frontmatter resolve thành `_bmad-output/prds/...`, là vị trí không tồn tại; nguồn thật nằm tại `_bmad-output/planning-artifacts/prds/...` (`DESIGN.md` dòng 5–7; `EXPERIENCE.md` dòng 4–6). Downstream consumer không thể source-extract theo contract hiện tại. *Fix:* đổi cả hai thành `../../prds/prd-NCKH-2026-07-20/prd.md` và xác minh tồn tại từ thư mục workspace.
- **[low]** Tên UJ-7 không hoàn toàn verbatim: PRD dùng “đi từ thuyết minh đến **hoàn tất** Bước 07”, trong khi heading flow dùng “đến **Hoàn tất** Bước 07” (`prd.md` dòng 64; `EXPERIENCE.md` dòng 229). *Fix:* sao chép nguyên văn tên UJ-7 từ PRD; giữ capitalization của trạng thái trong nội dung flow, không đổi tên hành trình nguồn.

## 8. Shape fit — strong

`DESIGN.md` giữ đúng thứ tự canonical: Brand & Style → Colors → Typography → Layout & Spacing → Elevation & Depth → Shapes → Components → Do's and Don'ts. `EXPERIENCE.md` có đủ Foundation, Information Architecture, Voice and Tone, Component Patterns, State Patterns, Interaction Primitives, Accessibility Floor và Key Flows; Responsive & Platform và Inspiration & Anti-patterns đều được kích hoạt đúng bởi responsive web và tham chiếu DNTU. §Evidence & PDF Contract là section đặc thù có giá trị tải trọng rõ.

### Findings

Không có finding.

## Mechanical notes

- Frontmatter của cả hai spine đầy đủ về `name`, `status`, `sources` và `updated`; `DESIGN.md` có toàn bộ nhóm token cần dùng.
- 45 token references resolve; không có token prose mồ côi hoặc sai type được phát hiện.
- 21 component nghiệp vụ khớp tên giữa frontmatter, `DESIGN.md.Components` và `EXPERIENCE.md.Component Patterns`.
- Không có Mermaid trong hai spine, nên không có syntax cần kiểm tra.
- Visual inventory: 0 mockup, 0 wireframe, 1 import; không có orphan.
- Finding count: critical 0, high 1, medium 1, low 2.
