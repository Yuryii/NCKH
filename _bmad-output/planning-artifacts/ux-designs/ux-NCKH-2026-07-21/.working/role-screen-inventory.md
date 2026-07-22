# Role & Screen Inventory — NCKH MVP

**Mục đích:** đóng đầy đủ bề mặt theo Vai trò nghiệp vụ và phân công, làm đầu vào sửa `EXPERIENCE.md` và mockup.  
**Nguồn ưu tiên:** PRD `prd-NCKH-2026-07-20/prd.md`, `.working/prd-extract.md`, `EXPERIENCE.md` hiện hành và bốn mockup hiện hành.  
**Nguyên tắc:** không mở rộng năng lực ngoài PRD; chỗ PRD chưa quy định trường/lọc/chính sách cụ thể được ghi là khoảng trống, không tự điền.

## 1. Kết luận rà soát hiện trạng

Hai lỗi phân quyền đang xuất hiện trực tiếp trong mockup:

1. Cả bốn mockup dùng chung sidebar đầy đủ gồm `Đợt đăng ký`, `Đề tài NCKH`, `Hội đồng`, kể cả khi Vai trò hiện hành là **Giảng viên**. Quy tắc “giữ thứ tự mục dùng chung” trong `EXPERIENCE.md` đã bị diễn giải thành “mọi vai trò đều thấy mọi mục”. Đúng ra sidebar giữ thứ tự **sau khi lọc theo quyền**; mục không thuộc vai trò phải không được render.
2. `work-queue.html` đang ở ngữ cảnh `Vai trò: Giảng viên` nhưng lại chứa task `Nộp BM11 — Phiếu đánh giá nghiệm thu` với metadata `Vai trò Thành viên Hội đồng`. Đây là rò rỉ task giữa hai ngữ cảnh. Nếu Lan đồng thời là Giảng viên và Thành viên Hội đồng, BM11 chỉ xuất hiện sau khi Lan chuyển sang ngữ cảnh **Thành viên Hội đồng**.

Các mockup hợp lệ về mặt ngữ cảnh:

- `topic-detail.html` và `evidence-workspace.html`: có thể giữ ở Vai trò Giảng viên vì Lan đang thao tác với tư cách Chủ nhiệm đề tài; `Chủ nhiệm đề tài` là badge quan hệ trên đối tượng, không phải mục trong role-switcher.
- `meeting-dashboard.html`: có thể giữ ở Vai trò P.KHCN vì P.KHCN được xem tiến độ, kết thúc, hủy và công bố. Nếu cùng người cần nộp Phiếu hoặc ký thứ hai Biên bản, họ phải chuyển sang Vai trò Chủ tịch Hội đồng.

## 2. Mô hình quyền phải khóa

### 2.1. Vai trò tài khoản và phân công theo đối tượng

| Loại ngữ cảnh | Giá trị | Cách thể hiện |
|---|---|---|
| Vai trò nghiệp vụ có thể chọn | `Giảng viên`, `Sinh viên`, `Trưởng Khoa/Trưởng đơn vị`, `P.KHCN`, `Chủ tịch Hội đồng`, `Thành viên Hội đồng`, `Thư ký Hội đồng`, `Quản trị viên` | Là lựa chọn trong role-switcher khi Tài khoản thực sự có vai trò/phân công đó. Mọi queue, nav, count, search, notification preview và hành động reload theo lựa chọn này. |
| Quan hệ theo Hồ sơ/Đề tài | `Chủ nhiệm đề tài`, `Giảng viên hướng dẫn` | Không là role-switcher riêng. Hiển thị badge `Bạn là…` trong đúng Hồ sơ/Đề tài. Quyền chỉ áp dụng trên đối tượng được sở hữu/gán. |
| Phân công Hội đồng | Chủ tịch, Thành viên, Thư ký của Hội đồng/Cuộc họp cụ thể | Role-switcher chọn loại vai trò Hội đồng; danh sách và quyền tiếp tục bị lọc theo assignment cụ thể. Không có quyền với Hội đồng khác. |
| Trạng thái chưa có vai trò | Email chưa xác minh, `Chờ xác nhận vai trò`, bị từ chối, Tài khoản bị khóa | Không vào app shell nghiệp vụ. Chỉ thấy onboarding/account-state và đường khôi phục/liên hệ phù hợp. |

Quy tắc phân công bắt buộc:

- `Giảng viên hướng dẫn` chỉ xét Hồ sơ sinh viên được gán (FR-2, FR-14); không thấy hàng chờ của Giảng viên khác.
- `Trưởng Khoa/Trưởng đơn vị` chỉ xét Hồ sơ giảng viên thuộc đơn vị và bước BM08 thuộc trách nhiệm (FR-2, FR-14, FR-46).
- `P.KHCN` không thay Chủ nhiệm nhập/nộp biểu mẫu và không can thiệp nội dung Phiếu; không có bước “tiếp nhận” sau duyệt tuyến đầu (FR-15).
- Chủ tịch là người đánh giá, có Phiếu cá nhân và ký thứ hai Biên bản; Thư ký không có Phiếu và không nằm trong mẫu số (FR-19, FR-24–31).
- Trong baseline, Chủ tịch do P.KHCN đảm nhiệm, nhưng hai Vai trò vẫn là hai ngữ cảnh riêng để hành động/audit ghi đúng Vai trò (UJ-5, FR-3).
- Người ngoài Trường không phải một vai trò quyền riêng. Sau khi nhận lời mời, họ có đúng `Thành viên Hội đồng` hoặc `Thư ký Hội đồng` trong đúng Hội đồng được mời (FR-37).
- Quản trị viên không mặc nhiên có quyền nghiệp vụ NCKH (FR-38). Không được thấy `Đợt đăng ký`, `Đề tài NCKH`, `Hội đồng` chỉ vì là admin.

### 2.2. Role-switcher

1. Nếu Tài khoản chỉ có một Vai trò nghiệp vụ, hiển thị nhãn tĩnh `Vai trò: …`; không cần mũi tên giả như một menu.
2. Nếu có nhiều Vai trò, menu chỉ liệt kê vai trò đã được duyệt hoặc có assignment còn quyền truy cập. Có thể kèm số assignment, ví dụ `Thành viên Hội đồng · 3`, nhưng không đặt tên Hội đồng thành một “vai trò”.
3. Đổi vai trò phải:
   - cảnh báo nếu có dữ liệu chưa lưu;
   - đưa về `Việc cần làm` của vai trò mới;
   - tải lại nav, badge count, queue, notifications, search index và mọi preview;
   - xóa filter/selection của vai trò cũ;
   - không carry task hoặc object ID chưa được cấp quyền sang vai trò mới.
4. Nếu quyền hiện hành bị thu hồi giữa phiên, mutation đang chờ phải dừng; chuyển về `Việc cần làm` hoặc account-state, hiển thị thông báo an toàn.
5. Deep link luôn kiểm tra cả Tài khoản + Vai trò hiện hành + phạm vi đối tượng. Có vai trò ở tài khoản nhưng chưa chọn đúng ngữ cảnh không tự động thực hiện hành động dưới vai trò khác; UI có thể đề nghị `Chuyển sang Vai trò …` nếu việc tiết lộ sự tồn tại của đích đã được phép.
6. Hành động quan trọng hiển thị Vai trò trong dialog xác nhận và server ghi Vai trò đó vào audit.

## 3. Global navigation visibility

Ký hiệu: **V** = có mục sidebar; **C** = chỉ hiện khi có assignment/tác vụ hợp lệ; **—** = không render. Tất cả danh sách bên dưới tiếp tục lọc theo phạm vi đối tượng phía server.

| Mục sidebar | GV | SV | Trưởng đơn vị | P.KHCN | Chủ tịch | Thành viên HĐ | Thư ký HĐ | Quản trị viên |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| **Công việc / Việc cần làm** | V | V | V | V | V | V | V | V |
| **Công việc / Thông báo** | V | V | V | V | V | V | V | V |
| **Nghiệp vụ / Đợt đăng ký** | V | V | — | V | — | — | — | — |
| **Nghiệp vụ / Xét duyệt** | C — khi có Hồ sơ SV được gán | — | V | — | — | — | — | — |
| **Nghiệp vụ / Đề tài NCKH** | V — chỉ Hồ sơ/Đề tài do mình làm Chủ nhiệm hoặc làm GVHD | V — chỉ Hồ sơ/Đề tài của mình | V — chỉ đối tượng thuộc tuyến/đơn vị và kết quả được mở quyền | V | — | — | — | — |
| **Nghiệp vụ / Hội đồng** | — | — | — | V | V — `Hội đồng của tôi` | V — `Hội đồng của tôi` | V — `Hội đồng của tôi` | — |
| **Quản trị / Tài khoản** | — | — | — | — | — | — | — | V |
| **Tài khoản / Hồ sơ cá nhân** | V | V | V | V | V | V | V | V |

Giải thích các điểm dễ nhầm:

- Giảng viên không thấy tab `Hội đồng` trong ngữ cảnh Giảng viên. Nếu cùng tài khoản được phân công Hội đồng, người dùng chuyển sang `Chủ tịch Hội đồng` hoặc `Thành viên Hội đồng` rồi mới thấy `Hội đồng của tôi`.
- Các vai trò Hội đồng không có danh sách `Đề tài NCKH` toàn cục. Họ mở **Hồ sơ phục vụ đánh giá** từ Hội đồng/Cuộc họp được phân công, chỉ đúng phiên bản chính thức.
- P.KHCN thấy `Hội đồng` để tạo/cấu hình/vận hành. Chủ tịch/Thành viên/Thư ký chỉ thấy các Hội đồng được phân công và không thấy CTA setup của P.KHCN.
- `Xét duyệt` là entry point vai trò cho tuyến đầu; nếu không muốn thêm một sidebar item mới, có thể chỉ giữ nó như danh sách con từ `Việc cần làm`. Dù chọn presentation nào, bề mặt hàng chờ và review detail vẫn bắt buộc. PRD không khóa tên nav này.
- `Thông báo` là bề mặt chung, nhưng nội dung và preview luôn theo Vai trò hiện hành. PRD chưa quy định sự kiện thông báo riêng cho Quản trị viên; admin có thể gặp empty state hợp lệ, không được tự phát minh loại thông báo mới.

## 4. Shared/public screens

| ID | Màn hình | Entry point | Ai được vào | Nội dung/hành động bắt buộc | Empty/error/denied |
|---|---|---|---|---|---|
| SH-01 | Đăng nhập | URL công khai | Chưa đăng nhập | Email, mật khẩu, đăng nhập, đi tới đăng ký/khôi phục | Sai thông tin; khóa; phiên hết hạn; không lộ email tồn tại hay không |
| SH-02 | Khôi phục/đặt lại mật khẩu | Từ SH-01 hoặc link một lần | Chưa đăng nhập | Yêu cầu link, đặt mật khẩu mới | Link hết hạn/đã dùng; phản hồi trung tính chống dò tài khoản |
| SH-03 | Tự đăng ký email Trường | SH-01 | GV/SV tương lai | Email, loại người dùng, mã GV/SV; tạo một tài khoản | Miền không hợp lệ; email đã có tài khoản; không suy vai trò từ email |
| SH-04 | Xác minh email | Link email một lần | Người đăng ký | Xác minh rồi chuyển onboarding/account-state | Chưa xác minh; link hết hạn/đã dùng; gửi lại theo chính sách chưa chốt |
| SH-05 | Hoàn thiện Hồ sơ cá nhân onboarding | Sau SH-04 hoặc lời mời | Người đăng ký/người được mời | Dữ liệu định danh/học thuật cần cho xác nhận vai trò và biểu mẫu | Field-level content chờ Từ điển dữ liệu; lỗi lưu/validation |
| SH-06 | Trạng thái Tài khoản/vai trò | Sau SH-04/05, đăng nhập khi chưa active | Người chưa có quyền nghiệp vụ | Tách `Email đã xác minh` khỏi `Chờ xác nhận vai trò`; hiển thị duyệt/từ chối/khóa | Không render app shell nghiệp vụ; bị từ chối có lý do/hướng liên hệ theo chính sách |
| SH-07 | Tiếp nhận lời mời Hội đồng | Link lời mời | Email được mời | Xác minh đúng email + Hội đồng + Vai trò; đăng nhập nếu đã có Tài khoản; hoàn thiện hồ sơ | Sai email, hết hạn, thu hồi, đã dùng; không lộ tài liệu Hội đồng |
| SH-08 | Việc cần làm | App open/role switch | Mọi vai trò active | Count, queue `Cần tôi xử lý`, vùng `Đang chờ người khác` nếu áp dụng; tất cả role-scoped | Chưa có việc; filter rỗng; partial error; quyền vừa đổi |
| SH-09 | Trung tâm thông báo | Sidebar/header | Mọi vai trò active | Sự kiện PRD; deep link kiểm tra lại quyền; preview theo vai trò | Chưa có thông báo; target đã mất quyền/hủy; không lộ kết quả trước công bố |
| SH-10 | Hồ sơ cá nhân | Sidebar/account menu | Chủ tài khoản | Xem/cập nhật thông tin hiện tại | Chờ từ điển dữ liệu; thay đổi không làm đổi snapshot tài liệu lịch sử |
| SH-11 | Trình xem tài liệu/phiên bản | Link tệp trong mọi object | Actor có quyền với đúng object/version | Xem/tải, bản hiện hành/mất hiệu lực, quan hệ thay thế, dữ liệu nguồn khi có | Processing, preview unavailable, invalid/superseded, access denied |
| SH-12 | Nhật ký/timeline đối tượng | Tab/lịch sử trong detail | Actor có quyền theo đối tượng | Actor, Tài khoản, Vai trò, thời gian, trước/sau, version, lý do; che trường nhạy cảm | Empty/filtered-empty; redacted; access denied; không có export MVP |
| SH-13 | Không có quyền/đích không còn khả dụng | Deep link hoặc quyền đổi | Mọi người | Thông báo trung tính + quay về Việc cần làm | Không xác nhận đối tượng có tồn tại; không hiển thị metadata bị cấm |

## 5. Screen inventory theo vai trò

### 5.1. Giảng viên

Trong ngữ cảnh này, `Chủ nhiệm đề tài` và `Giảng viên hướng dẫn` là quan hệ đối tượng. Không có task Hội đồng.

| ID | Màn hình | Entry point | Phạm vi & hành động | Empty/denied chính |
|---|---|---|---|---|
| GV-01 | Việc cần làm — Giảng viên | Đăng nhập/role switch | BM01/BM04/BM08/BM09/BM13 của đề tài mình; yêu cầu bị trả; task tuyến đầu chỉ cho Hồ sơ SV mình được gán | `Bạn chưa có việc cần xử lý`; không trộn BM02/BM06/BM11 hoặc Biên bản |
| GV-02 | Danh sách Đợt đăng ký | Sidebar | Chỉ Đợt đã công bố thuộc phạm vi; trạng thái, hạn, khả năng tạo Hồ sơ | Chưa có Đợt phù hợp; Nháp không được thấy |
| GV-03 | Chi tiết Đợt đăng ký | GV-02/notification | Xem loại, phạm vi, thời gian; tạo/tiếp tục Hồ sơ đề tài giảng viên khi đang mở | Đã đóng: nháp chỉ đọc/không nộp; ngoài phạm vi: SH-13 |
| GV-04 | Hồ sơ đăng ký/BM01A workspace | GV-03, Việc cần làm, Đề tài | Tạo/sửa nháp, nhóm nghiên cứu, validate, preview/export, upload PDF ký, `Nộp`; sau nộp khóa | Uploaded-not-submitted; quá hạn; bị trả và nộp lại tạo version |
| GV-05 | Hồ sơ/Đề tài của tôi | Sidebar `Đề tài NCKH` | Danh sách đối tượng mình làm Chủ nhiệm; có thể bổ sung vùng “Tôi hướng dẫn” nhưng chỉ các Hồ sơ được gán | Chưa có Hồ sơ/Đề tài; filter rỗng; không thấy đối tượng khoa nói chung |
| GV-06 | Chi tiết Hồ sơ/Đề tài | GV-05, task, notification | Trạng thái tổng quan, nguồn, actor tiếp theo, timeline Bước 01–07, tài liệu, version, audit trong phạm vi | Không xem kết quả Hội đồng trước công bố; object ngoài sở hữu/gán: SH-13 |
| GV-07 | Hàng chờ GVHD | GV-01 hoặc mục `Xét duyệt` có điều kiện | Chỉ Hồ sơ sinh viên được gán; trạng thái/phiên bản/hạn nếu có | Không có Hồ sơ được gán; không có CTA tạo/gán GVHD ngoài PRD |
| GV-08 | Review tuyến đầu Hồ sơ SV | GV-07/task | Đọc dữ liệu + PDF đúng version; `Duyệt` hoặc `Trả chỉnh sửa` với lý do | Stale version; đã được xử lý; ngoài assignment: SH-13 |
| GV-09 | Yêu cầu hủy | GV-06 | Chủ nhiệm nhập lý do và gửi trước `Chờ nghiệm thu`; xem trạng thái yêu cầu/quyết định | Sau ngưỡng: disabled/absent kèm giải thích; không phải hủy trực tiếp |
| GV-10 | Nộp BM04 | Mốc Bước 03 trên GV-06/task | Upload tài liệu hoàn chỉnh ngoài hệ thống; version bất biến; chọn bản hiện hành theo quyền được định nghĩa sau | Chưa đạt BM03/Đề tài hủy; không có UI soạn/xuất BM04 |
| GV-11 | BM08 — Chủ nhiệm | Mốc Bước 05/task | Form, PDF, chữ ký ngoài, gửi Trưởng đơn vị; version/signature state | Chưa `Đang thực hiện`; returned; sửa làm vô hiệu downstream bản cũ |
| GV-12 | BM09 & sản phẩm | Mốc Bước 06/task | Upload BM09 và từng sản phẩm, version riêng, gửi kiểm tra | Thiếu tệp; bộ bị P.KHCN trả; không tự đánh dấu “đủ thành phần” |
| GV-13 | BM13 giải trình | Chỉ từ yêu cầu BM12/task | Form theo từng yêu cầu, PDF, chữ ký ngoài, nộp/version | BM12 không yêu cầu: `Không áp dụng`, không render CTA và không chặn Bước 07 |
| GV-14 | Kết quả/tài liệu hoàn tất | GV-06/notification sau công bố | Xem kết quả đã công bố; xem/tải hợp đồng/BM14 theo quyền | Trước công bố không có preview/count/metadata; BM14 không áp dụng thì nêu rõ |

### 5.2. Sinh viên

| ID | Màn hình | Entry point | Phạm vi & hành động | Empty/denied chính |
|---|---|---|---|---|
| SV-00 | Đăng ký/xác minh Tài khoản | URL công khai | Đăng ký email Trường, xác minh, hoàn thiện Hồ sơ và chờ duyệt vai trò | Chưa vào app shell hoặc thấy dữ liệu nghiệp vụ trước khi được duyệt |
| SV-01 | Danh sách đề tài — Sinh viên | Đăng nhập/role switch/sidebar `Đề tài` | Trang mặc định; tab `Cần bạn xử lý`/`Tất cả đề tài`; tìm kiếm và lọc Chủ nhiệm/Thành viên, trạng thái, Đợt; card có Bước và CTA kế tiếp | Empty/filter rỗng; không có queue `Việc cần làm`, Xét duyệt hoặc Hội đồng |
| SV-02 | Danh sách/chi tiết Đợt đăng ký | Sidebar | Chỉ Đợt công bố đúng phạm vi; tạo/tiếp tục Hồ sơ sinh viên | Chưa có Đợt; hết hạn; Nháp không được thấy |
| SV-03 | BM01B workspace | SV-02/SV-01 | Bắt buộc có GVHD hợp lệ trước `Nộp`; form, PDF, bản ký và version | Thiếu GVHD chặn nộp; PRD chưa nêu ai/cách gán nên mockup chỉ hiển thị GVHD đã phân công |
| SV-04 | Chi tiết Hồ sơ/Đề tài | SV-01/notification | Timeline, next actor, công việc được phân công, phiên bản/tài liệu/lịch sử trong phạm vi | Thành viên không thấy action của Chủ nhiệm; không xem kết quả trước công bố |
| SV-05 | Yêu cầu hủy | SV-04 khi là Chủ nhiệm | Chủ nhiệm nhập lý do và gửi P.KHCN trước ngưỡng | Thành viên không có CTA; sau `Chờ nghiệm thu` không đủ điều kiện |
| SV-06 | BM04/BM08/BM09/BM13 | SV-01/SV-04 | Workspace theo quan hệ: Chủ nhiệm quản lý/nộp bộ; Thành viên chỉ thao tác phần được giao | Giữ đúng gate, version và quyền từng biểu mẫu |
| SV-07 | Kết quả & tài liệu hoàn tất | SV-04/notification | Xem sau công bố; xem tài liệu được cấp quyền | Không lộ badge/count/metadata trước công bố |
| SV-08 | Thông báo | Header/sidebar | Sự kiện theo đề tài và assignment của Sinh viên | Không có preview kết quả trước công bố hoặc target ngoài phạm vi |
| SV-09 | Hồ sơ cá nhân & trạng thái không quyền | Sidebar/deep link | Hồ sơ, trạng thái Tài khoản, quan hệ đề tài; SH-13 trung tính | Không xác nhận đối tượng ngoài phạm vi tồn tại |

### 5.3. Trưởng Khoa/Trưởng đơn vị

| ID | Màn hình | Entry point | Phạm vi & hành động | Empty/denied chính |
|---|---|---|---|---|
| TD-01 | Việc cần làm — Trưởng đơn vị | Đăng nhập/role switch | Hồ sơ GV chờ tuyến đầu; BM08 chờ ký/xác nhận; bản bị stale/đã xử lý ra vùng chờ/lịch sử | Không có việc; không chứa Hồ sơ đơn vị khác |
| TD-02 | Hàng chờ xét duyệt | Sidebar `Xét duyệt`/TD-01 | Hai loại task tách rõ: BM01 tuyến đầu và BM08 tuyến tuần tự | Empty theo từng loại; filter rỗng |
| TD-03 | Review Hồ sơ đăng ký GV | TD-02/task | Đọc dữ liệu + PDF đúng version; `Duyệt` hoặc `Trả chỉnh sửa` lý do bắt buộc | Ngoài đơn vị/không đúng tuyến: SH-13; stale decision |
| TD-04 | Review/ký BM08 | TD-02/task | Xem đúng version từ Chủ nhiệm; trả lý do hoặc tải xuống, ký ngoài, upload bản ký bổ sung và chuyển P.KHCN | Version bị thay thế; thiếu bản chữ ký Chủ nhiệm; không được sửa nội dung thay Chủ nhiệm |
| TD-05 | Danh sách Đề tài trong phạm vi liên quan | Sidebar `Đề tài NCKH` | Chỉ Đề tài/Hồ sơ thuộc tuyến, đơn vị hoặc được FR-42 mở quyền kết quả; không phải dashboard mọi Đề tài | Empty; không suy ra quyền xem tài liệu nhạy cảm từ việc cùng đơn vị |
| TD-06 | Chi tiết trạng thái/kết quả | TD-03/05/notification | Xem trạng thái và lịch sử trong phạm vi; sau công bố xem kết quả | Trước công bố không preview/count/metadata kết quả |

### 5.4. P.KHCN

| ID | Màn hình | Entry point | Phạm vi & hành động | Empty/denied chính |
|---|---|---|---|---|
| PK-01 | Việc cần làm — P.KHCN | Đăng nhập/role switch | Yêu cầu hủy; setup Hội đồng/lời mời; mở/kết thúc/hủy/thay thế; công bố; BM05/BM10; nhận BM08; kiểm tra BM09/BM13; BM14/hợp đồng; hoàn tất Bước 07 | Không có việc; không chứa task nộp Phiếu/ký Chủ tịch |
| PK-02 | Danh sách Đợt đăng ký | Sidebar | Nháp/đã công bố/đã đóng; số Hồ sơ theo trạng thái | Chưa có Đợt + CTA tạo |
| PK-03 | Tạo/sửa/công bố Đợt | PK-02 | Loại đợt, thời gian, phạm vi/danh mục; checklist công bố | Validation; sau công bố chỉ trường thay đổi không phá tính hợp lệ; không có đóng thủ công |
| PK-04 | Chi tiết/thống kê Đợt | PK-02 | Count phải drill-down khớp danh sách; theo dõi Hồ sơ | Empty theo trạng thái; quyền/dữ liệu stale |
| PK-05 | Danh sách Hồ sơ/Đề tài | Sidebar | Tìm/xem toàn phạm vi vận hành được cấp; trạng thái tổng quan duy nhất | Chưa có dữ liệu/filter rỗng |
| PK-06 | Chi tiết Đề tài tác nghiệp | PK-05/task | Timeline, nguồn trạng thái, tài liệu, meeting links, next actor, audit; không nhập tay trạng thái | Tài liệu thiếu/not applicable; không nộp thay actor |
| PK-07 | Xử lý yêu cầu hủy | PK-01/06 | Xem lý do/bằng chứng; chấp thuận/từ chối kèm lý do; giữ audit | Stale/no-longer-eligible; không xóa dữ liệu |
| PK-08 | Danh sách Hội đồng/Cuộc họp | Sidebar `Hội đồng` | Ba giai đoạn; draft/open/ended/canceled/replacement | Chưa có Hội đồng + entry create từ Đề tài đủ điều kiện |
| PK-09 | Tạo Hội đồng/Cuộc họp | PK-08/Đề tài đủ điều kiện | Chọn giai đoạn, official inputs, đúng 1 Chủ tịch/1 Thư ký, Thành viên, lời mời | Không tự invent minimum count; xung đột vai trò; input chưa chính thức |
| PK-10 | Setup/readiness Hội đồng | PK-09 | Sửa khi Nháp; invitation status; checklist; `Mở Cuộc họp` | Thiếu account active/invite/input/cơ cấu; sau mở read-only/locked |
| PK-11 | Dashboard vận hành Cuộc họp | PK-08/10/task | `{valid}/{denominator}`, Thư ký tách riêng, checkpoint, minutes state, cổng kết thúc/công bố | Chưa đủ phiếu; không mở lại phiếu sau checkpoint; không xem/sửa draft phiếu người khác |
| PK-12 | Hủy & tạo Cuộc họp thay thế | PK-11 | Lý do bắt buộc; meeting mới có ID/assignment/invite/input snapshot/evidence riêng | Chỉ Cuộc họp đang diễn ra; terminal states không có CTA hủy |
| PK-13 | Kết thúc Cuộc họp | PK-11 | Checklist 100% + Biên bản đủ hai chữ ký; confirm; ghi thời điểm | Chặn nếu thiếu một điều kiện; không gộp với công bố |
| PK-14 | Review & công bố kết quả | PK-11/task | Sau ended: `Chờ công bố`, xem đúng Biên bản, action công bố riêng | Không tự công bố; stale/missing two-signature minutes |
| PK-15 | Phiên bản điều chỉnh kết quả | Kết quả đã công bố | Lý do, draft adjustment liên kết bản cũ, review, công bố bản mới | Không ghi đè bản cũ; phạm vi field chi tiết chưa được PRD khóa |
| PK-16 | Đăng/công bố BM05 | Đề tài Bước 03/task | Upload tài liệu ngoài hệ thống, gắn Đề tài/Hội đồng/version, công bố current | Không có UI soạn/ký; uploaded draft khác published-current |
| PK-17 | Nhận BM08 | PK-01/Đề tài | Xem đúng version đã qua Trưởng đơn vị; ghi nhận đã nhận | Không ký thay; version cũ/superseded |
| PK-18 | Kiểm tra BM09 & sản phẩm | PK-01/Đề tài | Kiểm đủ thành phần; trả lý do hoặc đánh dấu bộ chính thức để gắn nghiệm thu | Thiếu tệp/version; không sửa hoặc upload thay Chủ nhiệm |
| PK-19 | Đăng/công bố BM10 | Đề tài Bước 06/task | Upload tài liệu ngoài hệ thống, gắn đúng bộ BM09/sản phẩm và Hội đồng | Không mở meeting nếu official input chưa đủ |
| PK-20 | Kiểm tra BM13 | Task/Đề tài | Đọc theo yêu cầu BM12; trả lý do hoặc xác nhận giải trình | BM13 không áp dụng; version stale; không triệu tập lại Hội đồng |
| PK-21 | Hợp đồng & BM14 | Đề tài Bước 07 | Upload bản hoàn chỉnh ngoài hệ thống, version/effectiveness | Không có UI lập/ký/xử lý tài chính; `Không áp dụng` khi không có hợp đồng cần thanh lý |
| PK-22 | Checklist Hoàn tất Bước 07 | Đề tài/task | BM12 đạt + BM13 xác nhận nếu cần + BM14 nếu áp dụng; confirm | Từng điều kiện thiếu link đến surface khắc phục; chỉ PKHCN có action |
| PK-23 | Audit theo đối tượng/thời gian | Tabs detail | Truy vấn lịch sử trong phạm vi | Không có sửa/xóa/export ngoài MVP |

### 5.5. Chủ tịch Hội đồng

Chủ tịch vừa là người đánh giá vừa là người ký thứ hai; ngữ cảnh này không có quyền setup/kết thúc/công bố của P.KHCN dù cùng Tài khoản có thể giữ cả hai vai trò.

| ID | Màn hình | Entry point | Phạm vi & hành động | Empty/denied chính |
|---|---|---|---|---|
| CT-01 | Việc cần làm — Chủ tịch | Role switch | Nộp BM02/BM06/BM11 của mình; kiểm tra/trả/ký thứ hai BM03/BM07/BM12 | Không lẫn task P.KHCN; không xem Phiếu nháp người khác |
| CT-02 | Hội đồng của tôi | Sidebar | Chỉ Hội đồng được phân công Chủ tịch; stage/status/own tasks | Chưa có assignment; meeting bị hủy đọc lịch sử theo grant |
| CT-03 | Chi tiết Cuộc họp cho Chủ tịch | CT-02/task | Official inputs, Phiếu của tôi, trạng thái Biên bản/kết quả trong phạm vi | Không có setup/member edit/end/publish; FR-21 không mặc nhiên cấp roster progress trong vai trò Chủ tịch |
| CT-04 | Hồ sơ phục vụ đánh giá | CT-03 | Đúng official version: BM01 hoặc BM04+BM05 hoặc BM09+BM10 | Meeting chưa mở/hủy; ngoài assignment: SH-13 |
| CT-05 | Phiếu cá nhân BM02/BM06/BM11 | CT-01/03 | Form, save, preview/export, signed upload, `Nộp` | Chỉ khi meeting đang diễn ra, trước checkpoint; sau nộp locked |
| CT-06 | Review Biên bản | CT-01/03 sau Thư ký nộp | Xem form/PDF đúng version; `Trả chỉnh sửa` lý do hoặc đi ký thứ hai | Trước checkpoint/chưa nộp: unavailable; không từ chối vĩnh viễn |
| CT-07 | Hoàn tất chữ ký thứ hai | CT-06 | Tải bản chữ ký Thư ký, ký ngoài, upload bản đủ hai chữ ký, confirm complete | Giữ cả hai bản; stale/replaced version bị chặn |
| CT-08 | Kết quả Hội đồng | CT-03 | Xem trước công bố theo đúng assignment; sau công bố xem bản current/adjusted | Không có action công bố/chỉnh sửa |

### 5.6. Thành viên Hội đồng

| ID | Màn hình | Entry point | Phạm vi & hành động | Empty/denied chính |
|---|---|---|---|---|
| TV-01 | Việc cần làm — Thành viên | Role switch | Phiếu cá nhân của các Cuộc họp được phân công | Chưa có assignment/task; không có Biên bản task |
| TV-02 | Hội đồng của tôi | Sidebar | Chỉ assignment Thành viên | Empty; canceled/lost-right state |
| TV-03 | Chi tiết Cuộc họp cho Thành viên | TV-02/task | Official inputs, own ballot state, meeting status cần để biết có nộp được hay không | Không có roster progress theo FR-21; không có setup/end/publish/minutes workflow |
| TV-04 | Hồ sơ phục vụ đánh giá | TV-03 | Chỉ official input của đúng meeting | Meeting chưa mở/hủy; không mở Đề tài toàn cục |
| TV-05 | Phiếu cá nhân BM02/BM06/BM11 | TV-01/03 | Form, preview/export, signed upload, submit/version | Không xem/sửa draft người khác; after checkpoint locked |
| TV-06 | Kết quả của assignment | TV-03/notification | Trước công bố chỉ Phiếu của mình + tài liệu được phân quyền; sau công bố xem kết quả | Không có preview/count/badge kết quả trước công bố |

### 5.7. Thư ký Hội đồng

| ID | Màn hình | Entry point | Phạm vi & hành động | Empty/denied chính |
|---|---|---|---|---|
| TK-01 | Việc cần làm — Thư ký | Role switch | Theo dõi chờ đủ phiếu; sau checkpoint lập Biên bản; sửa khi bị trả | Không có CTA hoặc task nộp Phiếu |
| TK-02 | Hội đồng của tôi | Sidebar | Chỉ assignment Thư ký | Chưa có assignment; canceled/lost-right state |
| TK-03 | Dashboard Cuộc họp cho Thư ký | TK-02/task | Tổng đánh giá, hợp lệ, 100%, Thư ký tách khỏi mẫu số, checkpoint, Biên bản | Trước checkpoint BM03/07/12 unavailable; không có setup/end/publish |
| TK-04 | Hồ sơ/tài liệu chính thức | TK-03 | Đúng official input trong phạm vi nhiệm vụ | Ngoài assignment/hủy: denied hoặc lịch sử theo grant |
| TK-05 | Biên bản BM03/BM07/BM12 | TK-01/03 | Sau checkpoint: form, preview/export, ký ngoài, upload, `Nộp Chủ tịch`; sửa/nộp version mới khi bị trả | Không bypass 100%; meeting không mở/kết thúc/hủy thì không submit |
| TK-06 | Kết quả Hội đồng | TK-03 | Được xem trước công bố theo đúng assignment; sau công bố xem current | Không có action công bố/chỉnh sửa |

### 5.8. Quản trị viên

| ID | Màn hình | Entry point | Phạm vi & hành động | Empty/denied chính |
|---|---|---|---|---|
| QT-01 | Việc cần làm — Quản trị | Đăng nhập/role switch | Yêu cầu Vai trò GV/SV đang chờ; task tài khoản theo năng lực FR-38 | Không có task xét duyệt NCKH/Hội đồng |
| QT-02 | Danh sách Tài khoản | Sidebar `Tài khoản` | Pending/active/locked; tìm Tài khoản theo quyền quản trị | Empty/filter rỗng; không hiển thị dữ liệu nghiệp vụ không cần thiết |
| QT-03 | Chi tiết Tài khoản/yêu cầu Vai trò | QT-01/02 | Xem email verification, loại người dùng, mã, Hồ sơ cá nhân cần đối chiếu; duyệt/từ chối | Lý do từ chối chưa được PRD bắt buộc nhưng cần hiển thị nếu hệ thống thu thập; không tự cấp quyền NCKH khác |
| QT-04 | Tạo Tài khoản ban đầu P.KHCN | QT-02 | Tạo đúng Tài khoản ban đầu theo FR-38 | Không tạo tài khoản chung Thành viên/Thư ký |
| QT-05 | Vòng đời Tài khoản | QT-02/03 | Khóa, mở khóa, đặt lại mật khẩu; giữ Vai trò và lịch sử | Confirm; action error; khóa không xóa dữ liệu |
| QT-06 | Audit Tài khoản | QT-03 | Lịch sử xác minh, duyệt/từ chối vai trò, khóa/mở theo phạm vi | Không cấp quyền xem audit nghiệp vụ Đề tài/Hội đồng |

## 6. Entry-point map và surface closure

| Nhu cầu PRD | Entry point phải có | Surface đích |
|---|---|---|
| Tạo/nộp BM01 | Đợt đăng ký đã công bố → `Tạo Hồ sơ`; task `Tiếp tục Hồ sơ` | GV-04 / SV-03 |
| Xét duyệt tuyến đầu | Task role-scoped; hàng chờ `Xét duyệt` | GV-08 / TD-03 |
| Theo dõi Hồ sơ/Đề tài | `Đề tài NCKH` trong đúng vai trò; notification | GV-06 / SV-05 / TD-06 / PK-06 |
| Yêu cầu/xử lý hủy | Chi tiết Đề tài; task P.KHCN | GV-09/SV-06 → PK-07 |
| Tạo/vận hành Hội đồng | Đề tài đủ điều kiện hoặc `Hội đồng` P.KHCN | PK-08–15 |
| Đánh giá | Task trong vai trò Chủ tịch/Thành viên; `Hội đồng của tôi` | CT-04/05, TV-04/05 |
| Lập Biên bản | Task Thư ký chỉ sinh sau checkpoint | TK-05 |
| Kiểm tra/ký thứ hai Biên bản | Task Chủ tịch sau Thư ký nộp | CT-06/07 |
| Kết thúc/công bố | Task P.KHCN sau từng gate | PK-13/14 |
| Bước 03–07 | Timeline Đề tài + task đúng actor | GV/SV-10–14, TD-04, PK-16–22 |
| Quản trị Tài khoản | Task admin + nav `Tài khoản` | QT-02–06 |

Không có nhu cầu nào của PRD phải phụ thuộc vào việc người dùng tự đoán URL. Notification/task luôn đưa đến đúng object + đúng version; nếu role context chưa đúng, chuyển vai trò phải được xác nhận trước.

## 7. Empty, denied và result-secrecy states bắt buộc

### Empty-state taxonomy

- **Chưa phát sinh:** “Chưa có Đợt đăng ký/Hồ sơ/Đề tài/Hội đồng…” và chỉ có CTA nếu vai trò được phép tạo.
- **Không có việc:** xác nhận queue đã tải xong và vai trò hiện hành không có task; không lấy task vai trò khác để lấp trang.
- **Không có kết quả lọc:** giữ filter và có action xóa filter.
- **Không áp dụng:** BM13/BM14 hoặc mốc khác được server đánh dấu không áp dụng; không dùng cùng copy với “thiếu tài liệu”.
- **Đang chờ người khác:** tách khỏi việc cần người dùng xử lý; nêu actor/bước tiếp theo nhưng chỉ trong phạm vi được xem.

### Denied-state taxonomy

- Sidebar item ngoài vai trò: **không render**, không render disabled.
- Action ngoài vai trò trên một object vẫn được đọc: không render action; không giả disabled như thể người dùng sắp được cấp quyền.
- Deep link ngoài phạm vi: SH-13, không nêu tên/mã/trạng thái đối tượng.
- Quyền bị thu hồi giữa phiên: dừng mutation, xóa dữ liệu đã cache ngoài scope, điều hướng an toàn.
- Meeting hủy: quyền live/mutation bị thu hồi; lịch sử chỉ còn nếu vai trò được grant đọc lịch sử.
- Phiên bản mất hiệu lực: vẫn xem theo quyền với nhãn rõ, không cho dùng như current evidence.

### Bảo vệ kết quả trước công bố

Trước công bố, chỉ P.KHCN, Chủ tịch và Thư ký đúng assignment xem kết quả tổng hợp/Biên bản theo nhiệm vụ. Các vai trò khác không được nhận:

- nội dung kết quả;
- badge/kết luận suy diễn;
- task count hoặc notification preview chứa kết quả;
- search result/snippet;
- tên tệp/metadata của Biên bản nếu metadata làm lộ kết quả;
- deep-link response xác nhận tài liệu tồn tại.

Sau công bố, mở đúng các actor FR-42 cho đúng bản published-current. Phiên bản điều chỉnh giữ bản cũ với nhãn mất hiệu lực; không ghi đè.

## 8. Mockup set cần có để bao phủ vai trò

Không nhất thiết mỗi dòng inventory là một HTML riêng; một template có thể có nhiều state/variant. Tuy nhiên để người phát triển không suy quyền từ bốn mockup hiện tại, tối thiểu nên có các variant sau:

1. **App shell + Việc cần làm theo vai trò:** GV, SV, Trưởng đơn vị, P.KHCN, Chủ tịch, Thành viên, Thư ký, Quản trị. Cùng component shell nhưng nav/task khác theo matrix.
2. **Onboarding/account:** tự đăng ký + chờ duyệt; invitation existing/new account; admin role-approval detail.
3. **Đợt/BM01:** người đăng ký xem Đợt + BM01; P.KHCN create/publish/stats.
4. **Tuyến đầu:** GVHD review Hồ sơ SV; Trưởng đơn vị review Hồ sơ GV; variant BM08 tuyến Trưởng đơn vị.
5. **Đề tài:** Chủ nhiệm detail/timeline; P.KHCN operations/detail; pre-publication result hidden variant.
6. **Hội đồng:** P.KHCN setup/readiness; P.KHCN meeting ops; Chủ tịch own ballot + minutes review; Thành viên own ballot; Thư ký progress + minutes. Sidebar và action bar khác nhau theo role.
7. **Bước 03–07:** upload-only BM04/BM09, structured BM08/BM13, P.KHCN BM05/BM10/BM14/Bước 07 gate.
8. **Account admin:** list, detail, approve/reject, lock/unlock/reset.
9. **Cross-cutting states:** empty, filter-empty, access denied, stale version, uploaded-not-submitted, checkpoint locked, waiting for publication, published/adjusted.

## 9. Quyết định/điểm chưa được PRD khóa — không tự invent

1. Ai gán GVHD và UI gán nằm ở đâu.
2. Trường cụ thể của Hồ sơ cá nhân và BM01/BM02/BM03/BM06/BM07/BM08/BM11/BM12/BM13 trước khi có Từ điển dữ liệu.
3. Bộ lọc/tìm kiếm/export/bulk actions ngoài mức cần để truy cập queue/object.
4. Số lượng Thành viên tối thiểu ngoài yêu cầu đúng một Chủ tịch và một Thư ký.
5. Chính sách lời mời gửi lại/thu hồi/hết hạn.
6. Chính sách notification gom nhóm/lưu giữ/read-unread chi tiết.
7. Cơ chế chọn official version và đánh dấu đủ thành phần ở mức field/action chi tiết.
8. Phạm vi chính xác của dữ liệu Hồ sơ cá nhân Quản trị viên được xem khi duyệt vai trò; chỉ nên đủ để thực hiện FR-36/38.
9. Tên nav `Xét duyệt` và việc nó là sidebar hay subroute của `Việc cần làm`; screen phải tồn tại nhưng presentation chưa được PRD khóa.

## 10. Acceptance checks cho triển khai phân quyền UI

1. Ở `Vai trò: Giảng viên`, sidebar không có `Hội đồng`; queue không có BM02/BM06/BM11/Biên bản.
2. Cùng tài khoản chuyển sang `Thành viên Hội đồng` thì `Đợt đăng ký` và danh sách `Đề tài NCKH` biến mất; `Hội đồng của tôi` và Phiếu cá nhân xuất hiện.
3. Thư ký không thấy CTA nộp Phiếu ở nav, queue, meeting, search, deep link hoặc API; mẫu số không bao gồm Thư ký.
4. Chủ tịch thấy Phiếu cá nhân và tuyến ký thứ hai nhưng không thấy CTA setup/kết thúc/công bố nếu chưa chuyển sang P.KHCN.
5. P.KHCN thấy tiến độ/kết thúc/công bố nhưng không sửa/xem Phiếu nháp cá nhân của người đánh giá và không nộp Phiếu dưới vai trò P.KHCN.
6. Admin không thấy bất kỳ nav/dữ liệu NCKH nào nếu không có vai trò nghiệp vụ khác.
7. GVHD chỉ thấy Hồ sơ sinh viên được gán; Trưởng đơn vị chỉ thấy Hồ sơ giảng viên thuộc đơn vị.
8. Trước công bố, Chủ nhiệm/GVHD/Trưởng/Thành viên thường không thấy bất kỳ preview/count/metadata kết quả nào.
9. Mọi deep link được kiểm tra lại theo role + assignment; không dựa vào việc nút đã được ẩn.
10. Đổi role tải lại toàn bộ shell và content; không giữ badge count, task card, notification preview hoặc object selection của role cũ.
