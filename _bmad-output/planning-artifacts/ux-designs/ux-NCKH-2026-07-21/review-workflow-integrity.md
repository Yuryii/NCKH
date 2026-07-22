# Review — Toàn vẹn workflow và phân quyền

Ngày: 2026-07-21  
Lens: adversarial workflow / authorization / evidence integrity  
Nguồn đã đọc: PRD, `.memlog.md`, `imports/dntu-visual-reference.md`, `.working/prd-extract.md`, `.working/distill-gaps.md`, `DESIGN.md`, `EXPERIENCE.md`.

## Kết quả

- Critical: **0**
- High: **5**
- Medium: **6**
- Low: **1**
- Tổng: **12 findings**

Hai spine giữ đúng trục chính `100% phiếu → Mốc chốt bất biến → Biên bản hai chữ ký → Kết thúc → Chờ công bố → Công bố`, phân biệt upload với nộp, có kiểm tra stale phía máy chủ và không dùng UI như lớp phân quyền. Tuy nhiên, ba workflow PRD đã trích xuất rõ — yêu cầu hủy Hồ sơ/Đề tài, ma trận xem kết quả trước/sau công bố, và phiên bản điều chỉnh kết quả — chưa có contract đủ để triển khai an toàn. Ngoài ra còn các khoảng trống có thể làm sai mẫu số, tái cấp quyền/tái sử dụng bằng chứng khi thay Cuộc họp, hoặc làm suy yếu khả năng tái hiện bằng chứng lịch sử.

## Findings

### WF-01 — HIGH — Luồng yêu cầu hủy Hồ sơ/Đề tài biến mất khỏi spine

- **Location:** `EXPERIENCE.md:26-44` (IA không có surface/state), `EXPERIENCE.md:161-239` (không Key Flow nào chứa yêu cầu hủy); đối chiếu PRD FR-18 (`prd.md:309-316`) và `.working/prd-extract.md:46,71`.
- **Consequence:** Chủ nhiệm không có đường gửi yêu cầu hủy trước `Chờ nghiệm thu`; P.KHCN không có hàng chờ chấp thuận/từ chối, lý do và thông báo. Dev dễ đồng nhất nhầm với “hủy Cuộc họp”, hoặc thêm thao tác hủy trực tiếp làm mất cổng phê duyệt và audit.
- **Fix:** Thêm capability vào hub Đề tài/Việc cần làm: trạng thái `eligible → requested → approved/rejected`; chỉ Chủ nhiệm gửi trước `Chờ nghiệm thu`, chỉ P.KHCN quyết định, lý do + thông báo + audit bắt buộc, không xóa dữ liệu; sau ngưỡng phải hiển thị lý do không còn đủ điều kiện. Phân biệt thuật ngữ và CTA với `Hủy Cuộc họp`.

### WF-02 — HIGH — Không khóa ma trận quyền xem kết quả trước/sau công bố

- **Location:** `EXPERIENCE.md:37` gộp tiến độ, Biên bản và kết quả trên Dashboard; `EXPERIENCE.md:65,73-92,104,109` chỉ nói chung “theo quyền”; `EXPERIENCE.md:207-217` nói quyền mở đúng actor nhưng không định nghĩa actor. Đối chiếu PRD FR-42 (`prd.md:373-382`) và `.working/prd-extract.md:78,167`.
- **Consequence:** Thành viên thường, Chủ nhiệm, Giảng viên hướng dẫn hoặc Trưởng đơn vị có thể nhìn thấy kết luận, metadata nhạy cảm, badge/trích đoạn thông báo hoặc link tài liệu trước công bố. Ngược lại, Chủ tịch/Thư ký có thể bị chặn khỏi kiểm tra hợp lệ trước công bố.
- **Fix:** Thêm bảng quyền theo trạng thái: trước công bố chỉ P.KHCN + Chủ tịch + Thư ký xem kết quả tổng hợp; Thành viên khác chỉ phiếu của chính mình và tài liệu được cấp; sau công bố mở đúng toàn bộ danh sách PRD. Áp dụng cùng rule cho Dashboard, notification payload/preview, search, task count, document metadata, deep link, download và audit link; server kiểm tra lại khi mở.

### WF-03 — HIGH — Thiếu workflow “phiên bản điều chỉnh” sau khi kết quả đã công bố

- **Location:** `EXPERIENCE.md:83,109` chỉ có version-list/replaced state; `EXPERIENCE.md:207-217` kết thúc ở công bố; không có actor, action, gate hoặc confirmation cho điều chỉnh. Đối chiếu PRD FR-42 (`prd.md:382`) và `.working/prd-extract.md:108,140,167`.
- **Consequence:** Dev có thể cho sửa trực tiếp kết quả đã công bố, hoặc tạo bản thay thế mà không có lý do/actor/liên kết; notification và quyền xem có thể trỏ nhầm bản cũ. Điều này phá audit và tính chính thức của kết quả.
- **Fix:** Định nghĩa flow riêng chỉ cho P.KHCN: bắt đầu từ bản đã công bố → nêu lý do bắt buộc → tạo immutable adjustment version liên kết bản trước → review đúng tài liệu nguồn → công bố phiên bản điều chỉnh → cập nhật “hiện hành” và thông báo lại actor đủ quyền. Bản cũ luôn xem được, mang nhãn mất hiệu lực; không có thao tác ghi đè/khôi phục trực tiếp.

### WF-04 — HIGH — Mô hình vai trò kép Thư ký/người đánh giá chưa được khóa, có thể làm sai mẫu số 100%

- **Location:** `EXPERIENCE.md:88,198` loại “Thư ký” khỏi mẫu số theo nhãn vai trò; `EXPERIENCE.md:209` chỉ nói phân đúng một Chủ tịch, một Thư ký và các Thành viên nhưng không chặn cùng một Tài khoản nhận hai trách nhiệm trong cùng Cuộc họp. Đối chiếu PRD FR-19/FR-25 (`prd.md:322-329,419-426`).
- **Consequence:** Nếu setup cho cùng một người vừa là Thư ký vừa là Thành viên, UI/logic có thể loại toàn bộ người đó khỏi mẫu số hoặc vừa tạo vừa không tạo phiếu. Nếu sản phẩm ngầm cấm nhưng UI không gate, Cuộc họp vẫn có thể được mở với cấu hình mơ hồ và Mốc chốt sai.
- **Fix:** Chốt một invariant ở setup và checklist mở: hoặc (khuyến nghị theo baseline hiện tại) Thư ký là assignment độc quyền, không thể đồng thời là Chủ tịch/Thành viên đánh giá trong cùng Cuộc họp; hoặc nếu nghiệp vụ cho phép vai trò kép thì mẫu số dựa trên `evaluation responsibility`, không dựa trên nhãn Thư ký, và role-switcher/action/audit phải tách hai năng lực. Thêm test UX 5 evaluator + 1 secretary và collision case.

### WF-05 — HIGH — Cuộc họp thay thế chưa reset/rebind đầy đủ quyền, lời mời và snapshot bằng chứng

- **Location:** `EXPERIENCE.md:36,89,109,217` có canceled/replacement link và cấm dùng lại tài liệu của Cuộc họp hủy, nhưng không định nghĩa cách tạo assignment/lời mời mới, thu hồi quyền live của Cuộc họp cũ, hay chọn lại bộ tài liệu chính thức. Đối chiếu PRD FR-41 (`prd.md:363-371`) và FR-22 (`prd.md:388-395`).
- **Consequence:** Thành viên cũ có thể tiếp tục xem tài liệu; lời mời/assignment cũ có thể bị “carry over”; phiếu/Biên bản hoặc tài liệu nguồn của Cuộc họp hủy có thể vô tình trở thành hiệu lực trong Cuộc họp thay thế. Lịch sử hai cuộc họp bị trộn.
- **Fix:** Định nghĩa replacement là thực thể mới với ID, assignment, invitation, official-input snapshot, denominator, ballots, checkpoint và minutes riêng. Hủy lập tức chặn mutation và thu hồi quyền live theo FR-22; quyền lịch sử phải là grant riêng. UI có thể prefill cấu hình để tiết kiệm nhập liệu nhưng bắt buộc tái xác nhận/tạo lời mời mới và không sao chép evidence như bản hợp lệ. Audit/deep links liên kết hai chiều nhưng giữ namespace riêng.

### WF-06 — MEDIUM — Điều kiện hủy Cuộc họp theo trạng thái chưa rõ

- **Location:** `EXPERIENCE.md:36,86,108-109,217` mô tả action hủy nhưng không nêu trạng thái nào cho phép; `ended`, `Chờ công bố`, `published` cùng tồn tại trên Dashboard. PRD FR-41 chỉ đặt tình huống sau khi đã mở (`prd.md:363-371`).
- **Consequence:** UI có thể hiện `Hủy Cuộc họp` cho Cuộc họp đã kết thúc/đã công bố, tạo nhánh xung đột với kết quả chính thức; hoặc chặn hủy sau Mốc chốt dù cấu hình sai vẫn cần replacement.
- **Fix:** Thêm transition table được server bảo chứng. Tối thiểu: `Đang diễn ra` có thể hủy với lý do; `Bị hủy`, `Đã kết thúc`, `Chờ công bố`, `Đã công bố` là terminal đối với action hủy. Nếu stakeholder muốn ngoại lệ sau kết thúc, chuyển sang phiên bản điều chỉnh/quy trình quản trị riêng chứ không tái dùng hủy.

### WF-07 — MEDIUM — BM05/BM10 chưa tách “đã tải” khỏi “đã công bố” và chưa gate Cuộc họp bằng bản hiện hành

- **Location:** `EXPERIENCE.md:40,231,234` dùng từ “đăng”/gắn tài liệu chung; Evidence Contract `EXPERIENCE.md:135-140` chỉ chuẩn hóa upload-vs-`Nộp`, không chuẩn hóa upload-vs-`Công bố` cho tài liệu lập ngoài hệ thống. Đối chiếu PRD FR-44 (`prd.md:485-491`) và FR-48 (`prd.md:520-527`).
- **Consequence:** Bản BM05/BM10 mới upload nhưng chưa công bố có thể hiển thị cho actor hoặc được dùng để mở Cuộc họp; thay phiên bản có thể làm Hội đồng xem sai quyết định chính thức.
- **Fix:** Thêm states `uploaded draft → published/current → superseded`, action `Công bố BM05/BM10` riêng của P.KHCN, confirmation chỉ rõ version/Hội đồng/Đề tài. Checklist mở phải yêu cầu đúng published-current version và snapshot nó khi mở; deep link/viewer phải hiển thị hiệu lực.

### WF-08 — MEDIUM — Tuyến BM08 bị mô tả quá chung và có thể gán sai trách nhiệm chữ ký cho P.KHCN

- **Location:** `EXPERIENCE.md:40,233,239`; câu “mỗi bước nhận đúng phiên bản và tải chữ ký bên ngoài” không phân biệt Chủ nhiệm ký, Trưởng đơn vị trả/ký/chuyển, còn P.KHCN chỉ ghi nhận đã nhận. Đối chiếu PRD FR-46 (`prd.md:501-509`).
- **Consequence:** UI có thể yêu cầu P.KHCN ký BM08 hoặc thiếu state người đang giữ phiên bản; một bản sửa sau chữ ký có thể vô hiệu hóa không đúng các phê duyệt phía sau.
- **Fix:** Định nghĩa state/actor table cho BM08: Chủ nhiệm soạn + tải bản chữ ký + gửi; Trưởng đơn vị xem đúng version, trả hoặc tải bản ký bổ sung + chuyển; P.KHCN ghi nhận nhận báo cáo. Mỗi transition khóa input version, lý do trả bắt buộc, bản mới invalidates đúng downstream approvals và tạo task đúng actor.

### WF-09 — MEDIUM — Mốc chốt cuối phiếu chưa có contract chống race/idempotency đủ cụ thể

- **Location:** `EXPERIENCE.md:85,88,102,106,200`; có double-submit/stale chung nhưng không nêu một-and-only-one checkpoint khi hai request cuối/retry cạnh tranh, cũng không nêu snapshot denominator/valid count trong UI. PRD FR-26 (`prd.md:428-435`) yêu cầu lưu thời điểm, số hợp lệ và tổng số tại mốc.
- **Consequence:** Progress có thể thoáng hiện 100% trước checkpoint, tạo hai event/mở hai bản Biên bản, hoặc hiển thị mẫu số hiện tại thay vì snapshot bất biến sau chốt.
- **Fix:** Quy định server transaction tạo duy nhất một checkpoint theo Meeting ID; duplicate/retry trả cùng kết quả. Sau chốt, progress chuyển sang snapshot `{valid}/{denominator}` + thời điểm + checkpoint ID và không tái tính từ dữ liệu mutable. Client nhận stale/duplicate phải reload canonical checkpoint, không tạo thêm success state cục bộ.

### WF-10 — MEDIUM — Bằng chứng lịch sử chưa khóa snapshot Hồ sơ cá nhân

- **Location:** Evidence Contract `EXPERIENCE.md:133-140` liệt kê data/PDF/checksum/uploader/time nhưng bỏ điều kiện PRD “thay đổi Hồ sơ cá nhân sau này không làm thay đổi tài liệu lịch sử” (`prd.md:587-594`).
- **Consequence:** Tên, chức danh, đơn vị hoặc metadata actor trong bản lịch sử có thể bị render lại từ profile hiện tại, làm không tái hiện được chính xác tài liệu/lần nộp cũ.
- **Fix:** Bổ sung contract rằng bản nộp/PDF/audit tham chiếu snapshot identity/profile và template version tại thời điểm tạo/nộp; UI phân biệt “thông tin tại thời điểm nộp” với hồ sơ hiện tại, không regenerate bản lịch sử từ dữ liệu mới.

### WF-11 — MEDIUM — Quyền xem audit chưa có ma trận theo đối tượng; export được thêm bằng giả định

- **Location:** `EXPERIENCE.md:43` thêm `export/error nếu được hỗ trợ [ASSUMPTION]`; `EXPERIENCE.md:90,104` chỉ nói “nếu còn quyền” mà không nêu actor nào được thấy event/lý do/version nào. Đối chiếu PRD FR-34 (`prd.md:578-585`) chỉ cho truy vấn trong phạm vi quyền.
- **Consequence:** Audit timeline có thể trở thành side channel lộ tên actor, lý do trả, phiên bản hoặc sự tồn tại của đối tượng đã bị thu hồi; export làm tăng phạm vi rò rỉ hàng loạt dù PRD chưa yêu cầu.
- **Fix:** Lập ma trận read permission cho audit theo object + active role + lifecycle, áp dụng row/field-level redaction và recheck trên deep link. Bỏ export khỏi MVP hoặc khóa sau capability riêng được phê duyệt; không suy ra quyền audit từ quyền nhìn một badge tổng quan.

### WF-12 — LOW — “Bản nháp giữ để tham chiếu” sau hủy/kết thúc Cuộc họp chưa xác định chủ sở hữu và thời hạn

- **Location:** `EXPERIENCE.md:205` nói nháp Biên bản được giữ để tham chiếu nhưng không nói ai còn xem được; `EXPERIENCE.md:109` chỉ nói liên kết lịch sử trong phạm vi quyền.
- **Consequence:** Có thể tạo hành vi không nhất quán: Thư ký mất toàn bộ nội dung vừa soạn, hoặc nháp chưa từng nộp bị lộ như bằng chứng lịch sử chính thức.
- **Fix:** Gắn nhãn rõ `nháp không phải bằng chứng`, chỉ author/P.KHCN theo policy xem, không xuất hiện trong kết quả/tập evidence chính thức; xác định retention bằng policy tệp và xóa/ẩn an toàn khi hết hạn.

## Các invariant đã được spine giữ đúng

- Upload không đồng nghĩa `Nộp`; nộp thành công mới khóa/chuyển tuyến.
- Mẫu số progress nêu Chủ tịch + Thành viên có trách nhiệm đánh giá, loại Thư ký; Biên bản không mở trước checkpoint.
- Mốc chốt do server tạo; Tập phiếu không có đường mở lại; hành động immutable không optimistic.
- Biên bản có vòng trả sửa, hai bản bằng chứng chữ ký và chỉ hoàn tất khi có bản đủ hai chữ ký.
- Kết thúc Cuộc họp và công bố kết quả là hai action khác nhau; trạng thái `Chờ công bố` được giữ.
- Stale/permission change/session expiry đều yêu cầu kiểm tra lại server; mutation không ghi đè dữ liệu mới.
- Phiên bản cũ không bị ghi đè và viewer không tuyên bố tự xác minh chữ ký/nội dung.

## Kết luận reviewer

Không có finding Critical vì spine không tạo đường bypass trực tiếp qua Mốc chốt hoặc kết thúc Cuộc họp. Tuy vậy, **WF-01 đến WF-05 phải được xử lý trước khi đặt `status: final`**: chúng là thiếu contract hoặc ambiguity có thể gây sai thẩm quyền, lộ kết quả trước công bố, hoặc làm mất tính độc lập của Cuộc họp thay thế. Các finding Medium nên được đưa vào spine hoặc acceptance criteria bắt buộc trước story tương ứng; WF-12 có thể chờ policy lưu giữ.
