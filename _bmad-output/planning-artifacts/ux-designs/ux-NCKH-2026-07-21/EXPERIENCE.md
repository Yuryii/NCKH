---
name: NCKH
status: draft
sources:
  - ../../prds/prd-NCKH-2026-07-20/prd.md
  - imports/dntu-visual-reference.md
updated: 2026-07-23
---

# NCKH — Experience Spine

## Foundation

NCKH là ứng dụng web responsive duy nhất của MVP. [ASSUMPTION] Bề mặt chính là desktop/laptop cho tác vụ nhiều dữ liệu của P.KHCN, Hội đồng và người duyệt; mobile hỗ trợ theo dõi, đọc và tác vụ ngắn. Không có ứng dụng native và không có dark mode trong MVP.

[ASSUMPTION] Baseline UI là **shadcn/ui + Radix Primitives**. Button, Input, Checkbox, RadioGroup, Select, Dialog, Sheet, Popover, DropdownMenu, Tabs, Tooltip, Table và Skeleton kế thừa semantics/keyboard/focus pattern của hệ này; spine chỉ định delta nghiệp vụ NCKH. Kiến trúc có thể thay thư viện nếu giữ hợp đồng tương đương. `DESIGN.md` là tham chiếu nhận diện trực quan; tài liệu này sở hữu IA, hành vi, trạng thái và tương tác.

Một Tài khoản có thể mang nhiều Vai trò nghiệp vụ. Vai trò đang hoạt động luôn hiện trong app shell; hành động quan trọng xác nhận cả đối tượng và Vai trò nghiệp vụ trước khi gửi. Giao diện không trao quyền: mọi điều kiện và phạm vi vẫn phải kiểm tra phía máy chủ.

### Mô hình vai trò và phạm vi

- **Vai trò đang hoạt động:** `Giảng viên`, `Sinh viên`, `Trưởng Khoa/Trưởng đơn vị`, `P.KHCN`, `Chủ tịch Hội đồng`, `Thành viên Hội đồng`, `Thư ký Hội đồng`, `Quản trị viên`. App shell, số đếm, hàng đợi, tìm kiếm, thông báo và hành động đều chiếu theo đúng một vai trò đang hoạt động.
- **Quan hệ theo đối tượng:** `Chủ nhiệm đề tài` và `Giảng viên hướng dẫn` chỉ hiển thị bằng badge “Bạn là…” trong Hồ sơ/Đề tài; chúng không xuất hiện trong role-switcher và không tự cấp quyền Hội đồng.
- **Chọn Giảng viên hướng dẫn:** control chọn GVHD trong form BM01B chỉ render khi Vai trò nghiệp vụ hiện hành là `Sinh viên`. Máy chủ phải kiểm tra lại role, Đợt đăng ký và tính hợp lệ của Tài khoản Giảng viên khi nộp; ẩn control ở UI không thay thế authorization.
- **Phân công theo Hội đồng/Cuộc họp:** Chủ tịch, Thành viên và Thư ký chỉ có hiệu lực trên các Hội đồng/Cuộc họp được phân công. Cùng một Tài khoản có thể có mục chuyển vai trò tương ứng, nhưng không được mang quyền đó vào ngữ cảnh `Giảng viên` hoặc `P.KHCN`.
- Nếu Tài khoản chỉ có một vai trò, header hiển thị nhãn tĩnh `Vai trò: …` và không có mũi tên giả. Nếu có nhiều vai trò, menu chỉ liệt kê grant/phân công thực tế còn hiệu lực.
- Đổi vai trò đưa người dùng về `Việc cần làm`, tải lại toàn bộ sidebar, badge, số đếm, queue, thông báo, tìm kiếm và preview; xóa bộ lọc, lựa chọn và object ID của vai trò cũ. Form có thay đổi chưa lưu phải cảnh báo trước khi đổi.

Tiếng Việt là ngôn ngữ duy nhất của MVP [ASSUMPTION]. Mọi thời điểm hiển thị theo `Asia/Ho_Chi_Minh`, định dạng mặc định `dd/MM/yyyy HH:mm`; nơi có giá trị pháp lý phải kèm nhãn múi giờ.

## Information Architecture

[ASSUMPTION] Sau đăng nhập, người dùng vào bề mặt mặc định của Vai trò nghiệp vụ hiện hành. **Sinh viên và Giảng viên** vào thẳng **Danh sách đề tài** với tab `Cần bạn xử lý`; các vai trò còn lại vào **Việc cần làm**. Hai vai trò Chủ nhiệm này dùng cùng shell, component và interaction, khác fixture/trường/quyền. Desktop có sidebar; dưới 1024px sidebar thành drawer. Nhóm và thứ tự của các mục được phép là ổn định trong cùng một vai trò; tập mục giữa các vai trò được chiếu theo ma trận dưới đây.

| Mục sidebar | GV | SV | Trưởng đơn vị | P.KHCN | Chủ tịch | Thành viên | Thư ký | Quản trị viên |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Việc cần làm | — | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Thông báo / Hồ sơ cá nhân | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Đợt đăng ký | ✓ | ✓ | — | ✓ | — | — | — | — |
| Xét duyệt | — | — | ✓ | — | — | — | — | — |
| Xét hồ sơ | ✓ | — | — | — | — | — | — | — |
| Danh sách đề tài | Của mình | Của mình | Theo đơn vị/nhiệm vụ | ✓ | — | — | — | — |
| Hội đồng | — | — | — | ✓ | `Hội đồng của tôi` | `Hội đồng của tôi` | `Hội đồng của tôi` | — |
| Quản trị / Tài khoản | — | — | — | — | — | — | — | ✓ |

`Cuộc họp` là màn hình con của `Hội đồng`/`Hội đồng của tôi`; `Tài liệu` và Biểu mẫu là màn hình con của `Đề tài NCKH`. Trong ngữ cảnh Sinh viên và Giảng viên, left nav hiển thị `Danh sách đề tài`; chính trang này chứa tab `Cần bạn xử lý`/`Tất cả đề tài`, tìm kiếm và bộ lọc `Vai trò trong đề tài`, `Trạng thái`, `Đợt đăng ký`. Hai vai trò này không có mục `Việc cần làm` riêng. Với Giảng viên, `Xét hồ sơ` là mục riêng: tải BM01B V1, ký ngoài hệ thống, tải lại PDF đã ký rồi Duyệt; `Trả hồ sơ` bắt buộc lý do và không cần PDF ký. Mục ngoài vai trò **không được render**, không hiển thị disabled và không để lại badge/count/tooltip. Giảng viên chỉ thấy `Hội đồng` sau khi chủ động chuyển sang một vai trò Hội đồng được phân công; Quản trị viên không thấy dữ liệu NCKH nếu chưa chuyển sang vai trò nghiệp vụ khác.

| Surface | Reached from | Purpose | Trạng thái bắt buộc |
|---|---|---|---|
| Đăng nhập & khôi phục truy cập | URL công khai | Xác thực, hết phiên, đặt lại mật khẩu | loading, sai thông tin, khóa, hết phiên, thành công |
| Đăng ký & xác minh | Đăng nhập / liên kết email | Email Trường, loại người dùng, mã GV/SV, xác minh | chưa xác minh, link hết hạn/đã dùng, `Chờ xác nhận vai trò`, bị từ chối |
| Tiếp nhận lời mời | Liên kết lời mời | Xác minh email, hoàn thiện Hồ sơ cá nhân, nhận Vai trò đúng Hội đồng | hợp lệ, đã có Tài khoản, sai email, hết hạn/thu hồi/đã dùng |
| Bộ vai trò | Điểm vào bộ mockup UX | Hiển thị đủ 8 actor dưới dạng card; chọn actor mở bộ màn hình hoặc Atlas đã kích hoạt đúng role, không thay đổi quyền nghiệp vụ thật | default, keyboard-focus, invalid-role-fallback |
| Việc cần làm | App open / sidebar | Hàng đợi tác vụ, hạn, thông báo quan trọng theo vai trò | cold-load, empty, partial error, offline, permission change |
| Danh sách đề tài — Sinh viên | App open / sidebar `Đề tài` | Một danh sách cho đề tài Sinh viên làm Chủ nhiệm hoặc Thành viên; tab `Cần bạn xử lý` thay queue riêng; card luôn nêu quan hệ, trạng thái, bước và hành động kế tiếp | cold-load, no-topic, no-action-needed, filter-empty, permission change |
| Đợt đăng ký | Sidebar / Việc cần làm | Danh sách, chi tiết, tạo/cấu hình/công bố và thống kê | chưa có đợt, `Nháp`, `Đã công bố`, `Đã đóng`, validation, permission-denied |
| Hồ sơ đăng ký / BM01 | Đợt đăng ký / Đề tài | Nhập thông tin tạm trên một trang; với BM01B, Sinh viên chọn một GVHD hợp lệ qua modal danh sách; tải PDF để ký, chọn đúng một PDF đã ký và `Nộp & tạo Hồ sơ`; không lưu nháp hoặc tạo Hồ sơ trước khi nộp thành công. Nếu GVHD từ chối ký, Hồ sơ cũ giữ bất biến và có thể mở luồng tạo Hồ sơ thay thế khi Đợt còn mở | editing-local, advisor-missing/searching/selected/invalidated, validation, pdf-missing/invalid/ready, submitting, submitted/locked, advisor-rejected, replacement-available/blocked, submit-error, quá hạn |
| Hàng chờ xét duyệt tuyến đầu | Việc cần làm | Đọc Hồ sơ/PDF bất biến, `Duyệt` hoặc `Từ chối ký`; từ chối bắt buộc có lý do. BM01 đã nộp không có đường sửa/thay PDF trên cùng mã Hồ sơ | loading, empty, assigned, stale, decision-processing/error, approved/rejected, permission-denied |
| Đề tài NCKH | Sidebar / liên kết đối tượng | Trạng thái tổng quan, timeline Bước 01–07, tác vụ kế tiếp, tài liệu | loading, no topic, active, terminal, blocked, permission-denied |
| Yêu cầu hủy Hồ sơ/Đề tài | Đề tài NCKH / Việc cần làm P.KHCN | Chủ nhiệm gửi yêu cầu; P.KHCN chấp thuận/từ chối, giữ lý do và audit | eligible, requested, approved/`Đã hủy`, rejected, no-longer-eligible, stale, permission-denied |
| Hội đồng & Cuộc họp setup | Đề tài / sidebar P.KHCN | Chọn giai đoạn, tài liệu, vai trò, lời mời, checklist, mở/hủy/thay thế | draft, incomplete, ready, invite pending, open/locked, canceled, replacement-linked |
| Dashboard Cuộc họp | Hội đồng / Việc cần làm | Tiến độ phiếu, mẫu số, Mốc chốt phiếu, Biên bản, kết thúc/công bố | preparing, `Đang diễn ra`, not-enough-votes, checkpoint-created, minutes-in-progress/returned/complete, ended, `Chờ công bố`, published, adjusted-published |
| Phiếu đánh giá | Dashboard Cuộc họp | BM02/BM06/BM11 cá nhân theo pipeline bằng chứng | saving/saved/error, export-processing/error, uploaded-not-submitted, submitted/locked, checkpoint-locked, meeting-not-open/canceled |
| Biên bản Hội đồng | Dashboard Cuộc họp | BM03/BM07/BM12 sau Mốc chốt phiếu và tuyến hai chữ ký | unavailable-before-checkpoint, drafting, secretary-signed/submitted, `Trả chỉnh sửa`, awaiting-second-signature, complete, meeting-ended/canceled |
| Tài liệu Bước 03–07 | Đề tài / Việc cần làm | BM04/BM05, BM08, BM09+sản phẩm/BM10, BM13, hợp đồng/BM14 | not-applicable, missing, draft/uploading/processing, returned, routed, current/superseded, complete, blocked |
| Trung tâm thông báo | Header / sidebar | Xem sự kiện và đi đúng đối tượng còn quyền | loading, empty, unread/read, target-unavailable, error |
| Trình xem tài liệu & phiên bản | Mọi bề mặt có tệp | Xem/tải phiên bản, hiệu lực, checksum và quan hệ thay thế | loading, processing, ready, preview-unavailable, invalid/superseded, access-denied |
| Nhật ký kiểm toán | Chi tiết đối tượng | Truy vết actor, Vai trò, trạng thái, phiên bản và lý do trong đúng phạm vi quyền | loading, empty, filtered-empty, redacted, access-denied, error |
| Quản trị Tài khoản | Sidebar Quản trị viên | Duyệt vai trò, khóa/mở khóa, đặt lại mật khẩu | loading, empty queue, pending, approved/rejected, active/locked, action-error |

Chi tiết **Đề tài NCKH** là hub xuyên Bước 01–07; mỗi mốc dẫn tới workspace liên quan. Trạng thái tổng quan chỉ có một nhãn ở danh sách; trong chi tiết, người dùng mở được trạng thái nguồn, actor chịu trách nhiệm và lịch sử.

Composition của bốn bề mặt neo được khóa như sau:

- **Việc cần làm** mở bằng các số đếm trong đúng phạm vi Vai trò hiện hành, tiếp theo là tìm kiếm/lọc, danh sách việc đang chờ người dùng và vùng riêng “Đang chờ người khác”. Số đếm, bản xem trước và liên kết đều dùng cùng bộ lọc quyền; đổi Vai trò phải tải lại toàn bộ bốn vùng. Tìm kiếm theo mã hoặc tên đối tượng; lọc tối thiểu theo trạng thái và hạn xử lý.
- **Danh sách đề tài của Sinh viên** thay thế `Việc cần làm`: tab `Cần bạn xử lý` là mặc định khi còn task, còn `Tất cả đề tài` hiển thị toàn bộ đối tượng trong phạm vi. Bộ lọc gồm vai trò `Chủ nhiệm đề tài`/`Thành viên tham gia`, trạng thái và Đợt đăng ký; card hiển thị mã, tên, quan hệ, trạng thái, Bước 01–07, hạn và một CTA chính. Quan hệ là dữ liệu theo đề tài, không thay đổi Vai trò Sinh viên trong header.
- **Chi tiết Đề tài** đặt hành động tiếp theo trước timeline Bước 01–07, rồi đến trạng thái nguồn và tài liệu hiện hành. Callout phải nêu đối tượng/biểu mẫu, phiên bản, actor tiếp theo, hạn khi có và thời điểm lưu gần nhất; không suy trạng thái tổng quan từ text phía client.
- **Dashboard Cuộc họp** có bốn phép chiếu: P.KHCN thấy cấu hình, readiness, hủy/thay thế, kết thúc và công bố; Chủ tịch thấy phiếu của mình, review/trả Biên bản và chữ ký thứ hai; Thành viên chỉ thấy tài liệu được cấp và phiếu của chính mình; Thư ký thấy tiến độ, Mốc chốt và Biên bản nhưng tuyệt đối không có phiếu đánh giá. `{valid}/{denominator}` đặt trước danh sách người đánh giá; Thư ký ở ngoài mẫu số. Chuỗi cổng theo thứ tự 100% phiếu → Mốc chốt → Biên bản → Kết thúc/Công bố, không cho nhảy bước.
- **Bảy workspace P.KHCN** giữ nguyên PK-01–PK-23 và số trang hiện hành nhưng mỗi trang phải có bốn lớp bằng chứng nhất quán: summary trong đúng scope; lifecycle/gate với trạng thái hiện tại; danh sách đối tượng nêu loại, phiên bản, actor chịu trách nhiệm và liên kết tới hành động; cuối cùng là official snapshot/phiên bản và audit. `Việc cần làm` có đúng tám fixture và tám liên kết tới workspace đích. `Quản lý Đợt` thể hiện Nháp → Đã công bố → tự đóng, đồng thời nêu rõ Hồ sơ qua tuyến đầu không có bước P.KHCN tiếp nhận. `Hội đồng` tách đúng 5 người đánh giá khỏi 1 Thư ký; `Cuộc họp` đặt 5/5, checkpoint ID và BM12 đủ hai chữ ký trước Kết thúc/Công bố. `Bước 03–07` phân biệt lưu/công bố tài liệu ngoài hệ thống, ghi nhận BM08 không ký, kiểm tra/trả BM09/BM13 và gate BM14/N/A. `Audit` không có sửa/xóa/xuất và không lộ nội dung/tệp nháp phiếu cá nhân.
- **Tạo Hồ sơ BM01** là ngoại lệ một trang, không dùng tab: Thông tin đề tài → Nhóm nghiên cứu → Giảng viên hướng dẫn → PDF Hồ sơ. Ở BM01B, chỉ role `Sinh viên` thấy `Chọn Giảng viên hướng dẫn`; nút mở modal danh sách và dấu `+` trên từng dòng gán đúng một GVHD. Khu PDF có nút `Xem trước PDF` mở dialog hai cột—PDF ở trái, form dữ liệu ở phải—và cập nhật PDF ngay theo từng thay đổi bên phải; dữ liệu đồng bộ về form chính nhưng chưa tạo Hồ sơ hoặc PDF đã ký. Cùng khu có `Tải PDF BM01`, input chọn một PDF đã ký và CTA duy nhất `Nộp PDF & tạo Hồ sơ`; CTA chỉ mở khi cả GVHD và PDF hợp lệ. Trước submit chưa tồn tại Hồ sơ/bản nháp phía máy chủ; submit thành công tạo Hồ sơ cùng PDF theo một transaction rồi khóa toàn bộ nội dung. Các workspace bằng chứng khác vẫn có thể dùng composition nhiều vùng/phiên bản khi nghiệp vụ của chúng cho phép.

Tham chiếu bố cục: [Bộ vai trò](mockups/index.html) là điểm vào; [Atlas màn hình theo 8 vai trò](mockups/role-screen-atlas.html) mô tả phạm vi và danh mục màn hình theo actor; [Luồng chính Sinh viên](mockups/sinh-vien/01-danh-sach-de-tai.html) minh họa IA đề tài-first đã được người dùng chốt. Mockup minh họa composition; hai spine là hợp đồng khi có xung đột.

Modal chỉ xếp một tầng. Xem tài liệu song song với quyết định trên desktop; ở mobile, tài liệu và quyết định là hai tab cùng ngữ cảnh, không mở dialog trên viewer.

## Danh mục màn hình theo vai trò

Các mã dưới đây là phạm vi màn hình tối thiểu phải hiện diện trong thiết kế và kiểm thử. Mọi vai trò dùng chung SH-01–SH-13: đăng nhập, khôi phục mật khẩu, đăng ký email Trường, xác minh email, hoàn thiện Hồ sơ cá nhân, chờ/từ chối vai trò, tiếp nhận lời mời, Việc cần làm, Thông báo, Hồ sơ cá nhân, trình xem tài liệu/phiên bản, audit trong phạm vi quyền và trạng thái truy cập trung tính.

| Vai trò | Màn hình bắt buộc |
|---|---|
| **Giảng viên (GV-01–GV-14)** | Queue không có tác vụ Hội đồng; Đợt đăng ký; tạo/soạn/nộp BM01A; đề tài mình làm Chủ nhiệm/GVHD; xét hồ sơ Sinh viên khi được giao; yêu cầu hủy; BM04; BM08; BM09 + sản phẩm; BM13; kết quả chỉ sau công bố. |
| **Sinh viên (SV-00–SV-09)** | Đăng ký/xác minh; Danh sách đề tài làm trang mặc định với tab Cần xử lý/Tất cả và bộ lọc; Đợt đăng ký; BM01B có cổng GVHD; chi tiết đề tài; yêu cầu hủy chỉ cho Chủ nhiệm; workspace Bước 03–07 được giao; kết quả chỉ sau công bố; thông báo, Hồ sơ cá nhân và trạng thái không quyền. Không có queue `Việc cần làm` riêng. |
| **Trưởng Khoa/Trưởng đơn vị (TD-01–TD-06)** | Queue; hàng chờ xét duyệt; duyệt/trả BM01 Giảng viên; xem/ký/trả BM08; danh sách đề tài đúng đơn vị/nhiệm vụ; trạng thái/kết quả được công bố. |
| **P.KHCN (PK-01–PK-23)** | Queue nghiệp vụ; quản lý/công bố/thống kê Đợt; danh sách đề tài theo phạm vi; xử lý hủy; danh sách/setup/readiness Hội đồng; Dashboard vận hành; hủy/thay thế; kết thúc/công bố/điều chỉnh; BM05; tiếp nhận BM08; kiểm tra BM09; BM10; BM13; BM14; hoàn tất Bước 07; audit. Không có tác vụ nộp phiếu của vai trò Hội đồng. |
| **Chủ tịch Hội đồng (CT-01–CT-08)** | Queue; `Hội đồng của tôi`; chi tiết Cuộc họp; tài liệu chính thức; phiếu của chính mình; review/trả Biên bản; chữ ký thứ hai; kết quả trước/sau công bố theo nhiệm vụ. Không có setup/kết thúc/công bố của P.KHCN. |
| **Thành viên Hội đồng (TV-01–TV-06)** | Queue; `Hội đồng của tôi`; chi tiết Cuộc họp; tài liệu chính thức; phiếu của chính mình; kết quả sau công bố. Không xem phiếu người khác hoặc Biên bản/kết quả tổng hợp trước công bố. |
| **Thư ký Hội đồng (TK-01–TK-06)** | Queue; `Hội đồng của tôi`; Dashboard theo vai trò; tài liệu chính thức; soạn/nộp/sửa Biên bản sau Mốc chốt; kết quả trước/sau công bố theo nhiệm vụ. Không có phiếu đánh giá ở bất kỳ bề mặt nào. |
| **Quản trị viên (QT-01–QT-06)** | Queue duyệt vai trò; danh sách Tài khoản; chi tiết Tài khoản/yêu cầu vai trò; tạo Tài khoản P.KHCN ban đầu; khóa/mở khóa/đặt lại mật khẩu; audit Tài khoản. Không có điều hướng NCKH. |

Danh mục, sidebar và phạm vi tối thiểu nằm tại [Bộ màn hình theo vai trò](mockups/role-screen-atlas.html). Bằng chứng trực quan chi tiết gồm [luồng chính Sinh viên](mockups/sinh-vien/01-danh-sach-de-tai.html) và bảy bộ actor đã hoàn thiện: [Giảng viên](mockups/giang-vien/01-danh-sach-de-tai.html), [Trưởng đơn vị](mockups/truong-don-vi/01-viec-can-lam.html), [P.KHCN](mockups/p-khcn/01-viec-can-lam.html), [Chủ tịch Hội đồng](mockups/chu-tich-hoi-dong/01-viec-can-lam.html), [Thành viên Hội đồng](mockups/thanh-vien-hoi-dong/01-viec-can-lam.html), [Thư ký Hội đồng](mockups/thu-ky-hoi-dong/01-viec-can-lam.html) và [Quản trị viên](mockups/quan-tri-vien/01-viec-can-lam.html). Suite Giảng viên clone visual system Sinh viên; sáu bộ actor vận hành dùng schema shell chung. Validator kiểm tra 53 trang phủ 69 mã. Tài liệu này vẫn là hợp đồng khi có xung đột.

## Voice and Tone

Đây là quy tắc microcopy; giọng thương hiệu nằm trong `DESIGN.md`.

| Do | Don't |
|---|---|
| “Còn 2 điều kiện để mở Cuộc họp.” | “Không thể tiếp tục.” |
| “BM01 đã tải lên nhưng chưa được nộp.” | “Hoàn tất!” sau upload |
| “Hồ sơ đang chờ Trưởng đơn vị xử lý.” | “Hồ sơ đang xử lý.” |
| “PDF này thuộc phiên bản V3 và đã mất hiệu lực.” | “Tệp cũ.” |
| “Phiên đã hết hạn. Dữ liệu đang nhập còn trên màn hình; đăng nhập lại để thử lưu.” [ASSUMPTION] | “Lỗi 401.” |
| Nêu đối tượng, trạng thái và hành động khắc phục | Dùng câu chung chung, viết tắt không giải thích hoặc giọng chúc mừng |

Nút dùng động từ chính xác: `Lưu nháp`, `Xuất PDF`, `Tải PDF đã ký`, `Nộp`, `Trả chỉnh sửa`, `Mở Cuộc họp`, `Kết thúc Cuộc họp`, `Công bố kết quả`. Không rút gọn các mốc khác nhau thành `Hoàn tất`.

Lỗi quyền không tiết lộ sự tồn tại của đối tượng ngoài phạm vi: “Bạn không thể truy cập nội dung này. Hãy quay lại Việc cần làm hoặc liên hệ đơn vị phụ trách.”

## Component Patterns

Visual specs nằm trong `DESIGN.md.Components`.

| Component | Use | Behavioral rules |
|---|---|---|
| **app-shell** | Toàn ứng dụng | Header và kích thước shell nhất quán; sidebar là phép chiếu của ma trận vai trò, không phải một menu Nghiệp vụ dùng chung. Trong cùng vai trò chỉ active item thay đổi. `Cuộc họp` active ở `Hội đồng`/`Hội đồng của tôi`; Biểu mẫu/Tài liệu active ở `Đề tài NCKH`/`Đề tài`. Chuông header luôn là control có tên truy cập và số chưa đọc; kích hoạt mở bản xem trước tối đa ba mục, `Esc` đóng và trả focus, còn `Xem tất cả thông báo` điều hướng tới Trung tâm thông báo. Khi quyền đổi giữa phiên, dừng mutation, xóa cache phạm vi cũ và đưa về bề mặt mặc định của vai trò: Sinh viên → Danh sách đề tài; vai trò khác → Việc cần làm. |
| **role-switcher** | Header | Chỉ chứa vai trò thực tế còn hiệu lực như `Giảng viên`, `P.KHCN`, `Chủ tịch Hội đồng`; vai trò Hội đồng có thể kèm nhãn phạm vi nhưng không tiết lộ Hội đồng ngoài assignment. Button + menu/radio group theo pattern chuẩn. Chọn vai trò tải lại toàn bộ phạm vi quyền và xóa lựa chọn cũ. Quan hệ `Chủ nhiệm đề tài`/`GVHD` dùng badge “Bạn là…” trong trang đối tượng. Hành động đang soạn phải cảnh báo lưu/thoát trước khi đổi. |
| **task-card** | Việc cần làm, empty recovery | Toàn card dẫn tới đối tượng; action chính cũng truy cập được bằng bàn phím. Hiển thị việc, đối tượng, hạn và “ai/bước nào tiếp theo”; không gộp tác vụ khác loại nếu mất ngữ cảnh. |
| **status-badge** | Bảng, card, header | Có accessible name đầy đủ; tooltip chỉ bổ sung, không chứa thông tin duy nhất. Badge không phải control trừ khi có affordance lọc rõ. |
| **data-table** | Danh sách nghiệp vụ | Sort/filter/pagination ở server [ASSUMPTION]; URL giữ filter. Dùng caption/tên bảng, `scope`/header association và `aria-sort`; link tiêu đề mở chi tiết, không lồng control trong một row clickable. Mobile chuyển card có lặp nhãn cột. Kết quả lọc/phân trang được thông báo ngắn. |
| **step-timeline** | Đề tài NCKH | Ordered list; bước hiện tại dùng `aria-current=step`. Hiển thị Bước 01–07, mốc bỏ qua hợp lệ và trạng thái kết thúc. Chọn mốc mở chi tiết nguồn; không cho nhập tay trạng thái tổng quan. |
| **checklist-gate** | Công bố Đợt, mở/kết thúc Cuộc họp, công bố kết quả, hoàn tất Bước 07 | List có text status. Tính điều kiện từ server; mục thất bại có link khắc phục. Action bị chặn tham chiếu summary lý do bằng `aria-describedby`; refresh trước commit để tránh stale state. |
| **form-section** | Biểu mẫu điện tử | Submit focus lỗi đầu và có error summary liên kết tới từng trường. Các form có nghiệp vụ nháp dùng trạng thái `Đang lưu`/`Đã lưu`/`Lỗi lưu`; riêng BM01 không lưu nháp/autosave phía máy chủ, dữ liệu trước submit chỉ là dữ liệu tạm của trang và chưa có mã Hồ sơ. |
| **advisor-picker** | BM01B của Sinh viên | Chỉ render cho role `Sinh viên`. Trạng thái đầu là `Chưa chọn`; nút mở một dialog có tìm kiếm và danh sách Giảng viên đang hoạt động/đủ điều kiện. Mỗi dòng nêu họ tên, đơn vị, chuyên môn và có button dấu `+` với accessible name “Thêm {tên}”. Chọn một người đóng dialog, cập nhật card và checklist; `Thay đổi` mở lại danh sách trước submit. Role khác chỉ thấy dữ liệu GVHD read-only nếu có, tuyệt đối không thấy control chọn. |
| **repeatable-fieldset** | Nhóm nghiên cứu, tiêu chí, yêu cầu giải trình | Dùng `fieldset/legend`; mỗi item có accessible name duy nhất. `Thêm thành viên` mở một dialog tìm theo mã/email Trường, chỉ hiển thị kết quả trong phạm vi hợp lệ, chặn trùng và xác nhận người được thêm trước khi ghi vào dữ liệu tạm. Xóa phải nêu tên thành viên và chỉ khả dụng trước khi tạo Hồ sơ; sau submit, toàn bộ nhóm chuyển chỉ đọc. Thêm/xóa được thông báo, focus chuyển có chủ đích, thứ tự nhãn cập nhật và lỗi của nhánh đã ẩn/xóa được loại khỏi summary. |
| **file-evidence-panel** | Mọi pipeline PDF/tệp | Input file chuẩn là đường chính; dropzone chỉ bổ trợ. Ràng buộc nối bằng `aria-describedby`; mỗi tệp có tên, dung lượng, trạng thái và lỗi. BM01 chỉ nhận một PDF và tạo Hồ sơ atomically. Với BM01B Sinh viên, nhánh GVHD từ chối dùng Hồ sơ thay thế theo quy tắc hiện hành. Với BM01A Giảng viên, Trưởng đơn vị trả sửa mở lại form trên cùng Hồ sơ; bản đã nộp được giữ bất biến và lần nộp tiếp theo tạo phiên bản mới, không ghi đè. Các pipeline khác vẫn phân biệt upload với `Nộp`, gắn tệp với phiên bản dữ liệu và retry idempotent. |
| **version-list** | Tài liệu, biểu mẫu, kết quả | Mặc định mở bản hiện hành; cho xem bản mất hiệu lực theo quyền. Mỗi bản nêu quan hệ thay thế và lý do; không cho ghi đè hoặc “khôi phục” bản cũ thành hiện hành không qua nghiệp vụ mới. |
| **document-viewer** | Đọc PDF chính thức | Mở đúng phiên bản, hỗ trợ tải xuống/zoom/bàn phím và luôn có HTML dữ liệu nguồn có cấu trúc khi hệ thống sở hữu dữ liệu. Canvas không phải đường truy cập duy nhất. Nếu PDF tải lên không truy cập được, cung cấp quy trình yêu cầu bản thay thế/hỗ trợ. Không tự coi preview thành xác minh chữ ký/nội dung. |
| **live-pdf-preview** | BM01 trước khi tạo Hồ sơ | Nút `Xem trước PDF` mở dialog lớn hai cột. Trái là bản PDF mô phỏng có vùng cuộn riêng; phải là các trường dữ liệu có cấu trúc và vùng chỉ đọc cho nhóm/GVHD. Sự kiện `input` cập nhật preview ngay và đồng bộ form chính; đóng dialog không mất thay đổi. Preview luôn ghi rõ chưa phải PDF đã ký hoặc bằng chứng đã nộp; không tạo bản nháp phía máy chủ. Mobile xếp PDF trước, form sau. |
| **action-bar** | Form, review, meeting | Một primary action theo trạng thái. Chặn double-submit, hiển thị processing và kết quả idempotent. Disabled action đi cùng lý do/checklist, không chỉ tooltip. |
| **decision-dialog** | Nộp, trả, duyệt, hủy, mở/kết thúc, công bố, khóa | Nêu đối tượng, Vai trò, phiên bản và hệ quả. Lý do bắt buộc ở các luồng PRD yêu cầu. [ASSUMPTION] Hành động tạo mốc bất biến không có undo sau thành công. |
| **notification-item** | Chuông header, Trung tâm thông báo | Nội dung, bản xem trước, badge chưa đọc, tab lọc và liên kết trực tiếp đều lọc theo ma trận quyền hiện tại; không lộ kết quả trước công bố. Tab tối thiểu gồm `Tất cả`, `Chưa đọc`, `Đề tài`, `Tài khoản`; trạng thái rỗng thuộc từng bộ lọc. `Đánh dấu tất cả đã đọc` cập nhật đồng thời dòng, tab-count, sidebar-count và badge chuông. Đánh dấu đã đọc khi mở hoặc khi người dùng chủ động chọn. Liên kết kiểm tra lại quyền khi mở; nếu mất quyền, thay đích đến bằng giải thích an toàn. Quy tắc gom/lưu giữ chưa chốt. |
| **progress-meter** | Dashboard Cuộc họp | Mẫu số gồm Chủ tịch và Thành viên được gán trách nhiệm đánh giá; phân công Thư ký là độc quyền và không thể đồng thời là người đánh giá trong cùng Cuộc họp. Máy chủ chỉ tạo một Mốc chốt theo Meeting ID; mọi lần thử lại trả về cùng Mốc chốt. Sau chốt hiển thị snapshot `{valid}/{denominator}`, thời điểm và checkpoint ID, không tái tính từ dữ liệu có thể thay đổi. |
| **invitation-panel** | Hội đồng setup, lời mời | Gắn email + Hội đồng + Vai trò. Cho gửi lại/thu hồi khi chính sách cho phép; link đã dùng/hết hạn/thu hồi hiển thị hướng xử lý. Không cho mở Cuộc họp khi người ngoài bắt buộc chưa chấp nhận. |
| **audit-timeline** | Chi tiết đối tượng | Quyền đọc theo đối tượng, Vai trò hiện hành và vòng đời; trường nhạy cảm được che theo quyền, liên kết trực tiếp kiểm tra lại quyền khi mở. Sắp xếp/lọc không sửa dữ liệu. Không xuất dữ liệu trong MVP nếu chưa có năng lực riêng được phê duyệt. Mốc chốt phiếu có cách thể hiện bất biến. |
| **account-state-panel** | Đăng ký, quản trị | Tách xác minh email, yêu cầu Vai trò và trạng thái Tài khoản. Duyệt/từ chối/khóa không xóa lịch sử; khóa đang đăng nhập phải kết thúc quyền truy cập theo chính sách phiên. |
| **empty-state** | Mọi surface danh sách | Phân biệt “chưa có dữ liệu”, “không có kết quả lọc” và “không có quyền”. Chỉ đưa CTA người dùng thực sự có quyền thực hiện. |
| **feedback-message** | Form và phản hồi hệ thống | Thông báo lỗi nêu nguyên nhân khả dụng + khắc phục; success không biến mất trước khi được nhận biết. `Xem toàn bộ phản hồi` mở lịch sử mới nhất trước, mỗi mục gắn phiên bản, actor, vai trò, thời điểm, nội dung yêu cầu và trạng thái đã xử lý; không làm mất dữ liệu đang soạn. `aria-live` phù hợp; lỗi nền không cướp focus trừ khi chặn tiếp tục. |

## State Patterns

| Pattern | Applies to | Contract |
|---|---|---|
| Cold load | Mọi surface dữ liệu | Skeleton `aria-hidden`, vùng dữ liệu `aria-busy=true`; sau ngưỡng chuyển thành feedback-message có `Thử lại`. Khi hoàn tất bỏ busy, giữ focus; không hiển thị empty trước khi load xong. |
| Empty | Danh sách/queue/timeline | Dùng empty-state phân biệt chưa phát sinh, filter rỗng và không áp dụng; đưa về action/surface tạo dữ liệu khi có quyền. |
| Saving | Form | Với form hỗ trợ nháp: `Đang lưu` → `Đã lưu lúc HH:mm`; lỗi giữ dữ liệu và cho phép thử lại. BM01 không có saving state phía máy chủ; điều hướng/đổi vai trò trước submit cảnh báo dữ liệu tạm sẽ mất nhưng không gọi đó là Hồ sơ hoặc bản nháp. |
| Long-running export/upload | PDF/tệp | Hiển thị tiến độ khi xác định được; nếu xử lý nền, cấp trạng thái theo dõi. Không cho gửi lại tạo bản trùng; khi lỗi giữ dữ liệu đã bấm Nộp và cho thử lại an toàn. |
| Validation blocked | Form/checklist | Error summary đầu vùng + lỗi tại trường/mục; focus lỗi đầu khi submit. Action khắc phục cụ thể, tiếng Việt. |
| Permission denied | Mọi surface | Deep link kiểm tra Tài khoản + vai trò đang hoạt động + phạm vi đối tượng. Nếu Tài khoản có grant ở vai trò khác, chỉ đề nghị chuyển vai trò an toàn mà không nêu tên/mã đối tượng; nếu không, dùng SH-13 trung tính. Không tiết lộ dữ liệu/định danh, search hit, tên tệp, badge, count hay notification preview. |
| Permission revoked | Mọi surface | Khi quyền bị thu hồi giữa phiên, dừng mutation, hủy dữ liệu cache theo scope, loại mục sidebar/task/notification và đưa về Việc cần làm. Không giữ màn hình stale ở chế độ chỉ đọc trừ khi có grant lịch sử riêng. |
| Offline/network loss | Global | [ASSUMPTION] Không chỉnh sửa offline. Hiển thị banner trạng thái; form giữ dữ liệu cục bộ trong phiên và thử lại khi có mạng. Hành động tạo mốc không hiển thị thành công trước phản hồi xác nhận của máy chủ. |
| Stale/concurrent data | Review, meeting, form | Trước quyết định, server kiểm tra phiên bản/trạng thái. Nếu stale, không ghi đè; hiển thị thay đổi và buộc tải lại, giữ nội dung lý do chưa gửi [ASSUMPTION]. |
| Session expiring/expired | Form/upload | Hiển thị bộ đếm ngược truy cập được trước khi hết phiên và cho gia hạn bằng thao tác đơn giản tối thiểu 10 lần thời lượng mặc định, trừ ngoại lệ bảo mật được ghi rõ. Với BM01 chưa nộp, cảnh báo dữ liệu tạm có thể mất vì không có lưu nháp; sau xác thực lại phải kiểm tra quyền và trạng thái Đợt trước khi cho nộp. |
| Terminal/immutable | Submitted forms, Mốc chốt phiếu, ended/canceled meeting | Chuyển read-only và giải thích mốc khóa. BM01 chỉ hiển thị PDF đã nộp, người/thời điểm nộp và trạng thái duyệt; không có action sửa, thay PDF, nộp lại hoặc version-list. Nếu bị từ chối ký, phản hồi bắt buộc hiển thị cùng actor/thời điểm; khi Đợt còn mở chỉ cho tạo Hồ sơ thay thế mới có liên kết hai chiều, khi Đợt đã đóng thì giải thích vì sao CTA không khả dụng. Các đối tượng có nghiệp vụ phiên bản vẫn dẫn tới lịch sử/phiên bản. |
| Replaced/invalid | Tài liệu, Cuộc họp, kết quả | Nêu bản hiện hành/thay thế và lý do; liên kết hai chiều trong phạm vi quyền. Không dùng bản của Cuộc họp bị hủy cho Cuộc họp thay thế. |
| Not applicable | BM13/BM14, bước điều kiện | Hiện “Không áp dụng” cùng điều kiện nghiệp vụ; không coi là thiếu dữ liệu hoặc lỗi. |

## Interaction Primitives

- Click/tap để mở và hành động; hover chỉ bổ trợ. Mọi target pointer đạt tối thiểu 24×24 CSS px hoặc ngoại lệ khoảng cách hợp lệ; control chính/touch-first đạt 44×44.
- `Tab` đi theo thứ tự DOM/đọc bất biến qua breakpoint; không dùng CSS `order` làm lệch focus. `Enter` kích hoạt button/link; `Space` kích hoạt checkbox; `Esc` đóng popover/dialog trên cùng và trả focus về trigger hoặc fallback hợp lý.
- `/` focus tìm kiếm trên danh sách khi không ở input [ASSUMPTION]; không định nghĩa shortcut chữ đơn khác cho các hành động pháp lý/nghiệp vụ.
- Filter, sort và page được ghi vào URL để back/forward không mất ngữ cảnh [ASSUMPTION]. Không infinite scroll cho bảng tác nghiệp.
- Không drag-and-drop là cách duy nhất để sắp xếp hoặc tải tệp. Upload phải có file picker bàn phím.
- Dialog tối đa một tầng và theo WAI-ARIA: có name/description, initial focus theo rủi ro, focus trap, nền inert, nút đóng và return-focus. Tabs dùng `tablist/tab/tabpanel`, phím mũi tên và `aria-selected`. `Esc` luôn hủy, không xác nhận.
- Motion 120–200ms cho drawer/popover [ASSUMPTION]; tôn trọng `prefers-reduced-motion`, bỏ chuyển động không thiết yếu.

## Accessibility Floor

- Mục tiêu triển khai là WCAG 2.2 AA cho toàn bộ UI mới; PRD mới khóa 2.1 AA nên nâng chuẩn này vẫn cần stakeholder xác nhận, nhưng Focus Not Obscured, Target Size và Accessible Authentication là baseline sản phẩm.
- Phần tử focus đầu tiên là “Bỏ qua đến nội dung chính”. App shell dùng `header`, `nav` có tên, `main`, `aside`; điều hướng SPA chuyển focus tới `h1`/`main` mới.
- Mọi chức năng cốt lõi dùng được bằng bàn phím, focus nhìn thấy bằng token `{colors.focus-ring}` và không bị sticky header/action bar che.
- Heading, landmark, table header, form label/error association và dialog name/description đúng ngữ nghĩa. Không dùng `div` click thay button/link.
- Save/progress hoàn tất dùng `role=status`/polite; lỗi chặn dùng `role=alert`; vùng cập nhật dùng `aria-busy`; progress có `aria-valuenow/min/max/text`. Không announce từng phần trăm và chỉ chuyển focus khi workflow sang bước/surface mới.
- Màu không là tín hiệu duy nhất; status-badge, checklist và version state luôn có text/icon. Yêu cầu tương phản nằm trong `DESIGN.md`.
- Mọi luồng cốt lõi reflow ở 320 CSS px và zoom 400%. Chỉ PDF canvas/bảng thật sự hai chiều được miễn; chúng dùng vùng cuộn gắn nhãn, không gây cuộn ngang toàn trang và giữ action/focus truy cập được.
- PDF do hệ thống sinh phải dùng Unicode, ngôn ngữ `vi`, tagged structure/reading order/heading/table và hướng tới PDF/UA. HTML dữ liệu nguồn có cấu trúc luôn song song; tài liệu tải lên không accessible có đường yêu cầu bản thay thế/hỗ trợ.
- Đăng nhập/đặt lại mật khẩu tuân WCAG 2.2 SC 3.3.8: cho paste, password manager và autofill (`username`, `current-password`, `new-password`, `one-time-code`); không dùng bài kiểm tra ghi nhớ/puzzle nếu thiếu phương án truy cập tương đương.
- Error summary liên kết tới trường; focus tới lỗi đầu chỉ sau submit. Lỗi không tự biến mất. Link inline luôn gạch chân; icon-only control có accessible name.

## Evidence & PDF Contract

1. **Biểu mẫu điện tử** là dữ liệu có cấu trúc; **PDF tải xuống để ký** là snapshot tại thời điểm tạo; **PDF đã ký** là bằng chứng chính thức. UI luôn đặt ba khái niệm này thành nhãn riêng.
2. **Override BM01 ngày 23/07/2026:** trước submit chỉ có dữ liệu tạm trên trang, chưa có Hồ sơ/bản nháp phía máy chủ. Người dùng chọn đúng một PDF; `Nộp PDF & tạo Hồ sơ` atomically tạo Hồ sơ, gắn PDF và khóa nội dung. Thành công chỉ được ghi một lần; retry cùng idempotency key phải trả cùng Hồ sơ, không tạo bản trùng.
3. BM01 đã tạo không cho sửa dữ liệu, thay/xóa PDF, nộp lại hoặc tạo phiên bản mới. Người duyệt chỉ `Duyệt` hoặc `Từ chối ký`; từ chối bắt buộc có lý do và là trạng thái kết thúc của Hồ sơ đó. Nếu Đợt còn mở, chủ Hồ sơ có thể `Tạo Hồ sơ thay thế`: hệ thống cấp mã mới, liên kết tới bản bị từ chối và yêu cầu một PDF mới; nếu Đợt đã đóng, không có CTA thay thế.
4. Với các pipeline khác, upload chỉ tạo/đính kèm bằng chứng; chỉ `Nộp` thành công mới khóa và chuyển tuyến. Mỗi tệp hiển thị phiên bản dữ liệu nguồn, trạng thái xử lý, checksum khi có, người tải, thời điểm và hiệu lực.
5. Viewer không tuyên bố chữ ký hợp lệ hoặc nội dung khớp dữ liệu; người duyệt chịu trách nhiệm kiểm tra trước quyết định.
6. Giới hạn định dạng/dung lượng/tên tệp đọc từ cấu hình và hiển thị cạnh vùng upload; không hard-code trong spine [ASSUMPTION].
7. BM01 lưu snapshot Hồ sơ cá nhân/identity, template version và dữ liệu nguồn đúng tại transaction tạo Hồ sơ; không render lại từ Hồ sơ cá nhân hiện tại.
8. BM05/BM10 có state `uploaded draft → published/current → superseded`; `Công bố BM05/BM10` là action riêng của P.KHCN. Chỉ bản published-current được snapshot vào checklist mở Cuộc họp.

## Responsive & Platform

| Breakpoint | Contract |
|---|---|
| `≥ 1280px` | Sidebar cố định; danh sách + detail hoặc PDF + quyết định có thể song song; action bar bám đáy vùng nội dung. |
| `1024–1279px` | Sidebar cố định hẹp; hai cột chỉ khi mỗi cột còn đủ khả năng đọc; metadata có thể vào panel phụ. |
| `768–1023px` | Sidebar thành drawer; nội dung một cột; bảng ưu tiên cột chính và menu chi tiết. |
| `< 768px` | Card list thay bảng; form một cột; PDF và quyết định thành hai tab; primary action full-width khi hợp lý. |

[ASSUMPTION] Tạo Hội đồng phức tạp, so sánh PDF song song, quản trị hàng loạt và audit sâu có thể hiển thị khuyến nghị “Tiếp tục trên màn hình lớn”, nhưng không chặn nếu luồng vẫn khả dụng. Mobile không dựa vào hover và không yêu cầu gesture riêng.

## Inspiration & Anti-patterns

- **Kế thừa từ DNTU:** đỏ `{colors.brand-primary}`, nền trắng, Montserrat và góc tương đối sắc để nhận diện cùng hệ sinh thái. Xem [tham chiếu đã nhập](imports/dntu-visual-reference.md).
- **Chuyển hóa cho sản phẩm tác nghiệp:** đỏ là chỉ dấu hành động/nhận diện, không là mảng trang trí; content hierarchy đến từ trạng thái, checklist, bảng và bằng chứng.
- **Loại bỏ:** hero marketing, carousel tin tức, ảnh nền, menu mega nhiều tầng và footer nội dung dài. Chúng không giúp hoàn tất công việc NCKH.
- **Loại bỏ:** kanban mặc định, gamification, confetti, badge chỉ bằng màu, hành động ẩn khi hover, infinite scroll và optimistic update cho mốc bất biến.
- **Loại bỏ:** “một nút Hoàn tất cho mọi thứ”. `Nộp`, hoàn tất Biên bản, kết thúc Cuộc họp, `Công bố kết quả` và `Hoàn tất Bước 07` là các sự kiện khác nhau.

## Workflow Integrity & Authorization

### Quyền xem kết quả

| Giai đoạn | Quyền xem |
|---|---|
| Trước công bố | Chỉ P.KHCN, Chủ tịch Hội đồng và Thư ký Hội đồng xem kết quả tổng hợp/Biên bản theo nhiệm vụ. Thành viên khác chỉ xem Phiếu đánh giá của chính mình và tài liệu được phân quyền. Chủ nhiệm, GVHD và Trưởng đơn vị không nhận preview, badge, task count hoặc metadata kết quả. |
| Sau công bố | Mở cho đúng vai trò được PRD cho phép trên bản published-current; máy chủ áp dụng cùng quy tắc cho Dashboard, tìm kiếm, nội dung/bản xem trước thông báo, liên kết trực tiếp, tải xuống và liên kết audit. |
| Phiên bản điều chỉnh | Chỉ P.KHCN tạo với lý do bắt buộc. Bản điều chỉnh là immutable version liên kết bản trước, qua review rồi `Công bố phiên bản điều chỉnh`; bản cũ giữ lại với nhãn mất hiệu lực và actor đủ quyền được thông báo lại. Không sửa/ghi đè trực tiếp. |

### Cổng trạng thái và bằng chứng

| Năng lực | Contract |
|---|---|
| Yêu cầu hủy Hồ sơ/Đề tài | Chủ nhiệm chỉ gửi trước `Chờ nghiệm thu`; P.KHCN chấp thuận/từ chối với lý do, notification và audit. Chấp thuận dẫn tới `Đã hủy` nhưng không xóa dữ liệu. Sau ngưỡng, UI giải thích không còn đủ điều kiện. CTA này luôn tách khỏi `Hủy Cuộc họp`. |
| Hủy Cuộc họp | Chỉ Cuộc họp `Đang diễn ra` có action hủy với lý do. `Bị hủy`, `Đã kết thúc`, `Chờ công bố`, `Đã công bố` là terminal đối với action này. Ngoại lệ sau kết thúc dùng phiên bản điều chỉnh, không tái dùng hủy. |
| Cuộc họp thay thế | Là thực thể mới với ID, assignment, invitation, official-input snapshot, denominator, ballots, checkpoint và minutes riêng. Hủy thu hồi quyền live/mutation của Cuộc họp cũ; quyền lịch sử là grant riêng. Có thể prefill cấu hình nhưng phải tái xác nhận, gửi lời mời mới và không sao chép evidence như bản hợp lệ. |
| Phân công Hội đồng | Đúng một Chủ tịch và một Thư ký. Trong baseline MVP, phân công Thư ký là độc quyền, không đồng thời là Chủ tịch/Thành viên đánh giá trong cùng Cuộc họp. Checklist chặn phân công xung đột trước `Mở Cuộc họp`. |
| Mốc chốt phiếu | Server transaction tạo một-and-only-one checkpoint theo Meeting ID. Retry/double-submit trả cùng canonical checkpoint; client không tự tạo success. Snapshot lưu valid count, denominator, thời điểm và checkpoint ID. |
| BM08 | Chủ nhiệm soạn/tải bản ký/gửi → Trưởng đơn vị xem đúng version, trả hoặc tải bản ký bổ sung/chuyển → P.KHCN ghi nhận đã nhận, không ký. Bản sửa tạo version mới và vô hiệu đúng downstream approvals của bản cũ. |
| Audit | Quyền đọc theo đối tượng, Vai trò hiện hành và vòng đời; hàng/trường nhạy cảm được che theo quyền, liên kết trực tiếp kiểm tra lại quyền khi mở. Xuất dữ liệu không thuộc MVP nếu chưa có năng lực được phê duyệt. Nháp không phải bằng chứng. Nháp biểu mẫu nghiệp vụ chỉ tác giả và actor review được PRD cấp quyền xem; **nháp Phiếu đánh giá chỉ người lập phiếu được xem nội dung**, P.KHCN chỉ thấy trạng thái hợp lệ/tiến độ tổng hợp, không thấy nội dung hoặc tệp nháp. |

## Key Flows

### UJ-1 — Minh, Sinh viên, nộp Hồ sơ đăng ký và theo dõi đến khi qua tuyến đầu

1. Minh mở Đợt đăng ký đang công bố; hệ thống hiển thị form tạo BM01 nhưng chưa cấp mã Hồ sơ.
2. Minh nhập thông tin đề tài và nhóm nghiên cứu; vì đang ở role `Sinh viên`, Minh bấm `Chọn Giảng viên hướng dẫn`, tìm trong modal và nhấn dấu `+` ở đúng Giảng viên. Role khác không có control này.
3. Sau khi checklist xác nhận đã có GVHD, Minh tải PDF BM01B để ký ngoài hệ thống rồi chọn đúng một PDF đã ký ngay bên dưới; không có `Lưu nháp` hoặc tab phụ.
4. Minh bấm `Nộp PDF & tạo Hồ sơ`; decision-dialog nêu rõ thao tác chỉ thực hiện một lần và sau thành công không thể sửa/thay tệp.
5. **Climax:** một transaction tạo `HS-SV-2026-031`, gắn PDF, khóa toàn bộ dữ liệu và chuyển `Chờ Giảng viên hướng dẫn duyệt`.
6. Minh chỉ xem Hồ sơ/PDF read-only. Giảng viên hướng dẫn `Duyệt` hoặc `Từ chối ký`; từ chối phải ghi lý do và kết thúc Hồ sơ hiện tại. Nếu Đợt còn mở, thông báo dẫn Minh vào phản hồi và CTA `Tạo Hồ sơ thay thế` cấp mã mới, liên kết bản cũ, yêu cầu chọn một PDF mới; không sửa hoặc nộp lại trên HS-SV-2026-031.
7. Khi được duyệt, Hồ sơ tự vào `Chờ Hội đồng xét duyệt hồ sơ`, không có bước P.KHCN tiếp nhận.

Failure: hết hạn trước khi Minh nộp → không có Hồ sơ nào được tạo và CTA bị chặn. Upload/nộp lỗi → transaction rollback, người dùng vẫn ở form và có thể thử lại; retry không tạo Hồ sơ trùng.

### UJ-2 — Lan, Giảng viên, đăng ký đề tài của đơn vị

1. Lan chuyển role-switcher sang Giảng viên và mở Đợt đăng ký phù hợp.
2. Lan nhập BM01 trên một trang; hệ thống xác định tuyến Trưởng Khoa/Trưởng đơn vị nhưng chưa tạo Hồ sơ.
3. Lan tải PDF để ký, chọn một PDF đã ký và xác nhận `Nộp PDF & tạo Hồ sơ` một lần.
4. **Climax:** Hồ sơ được tạo, khóa và task-card/timeline cùng hiển thị “Đang chờ Trưởng Khoa/Trưởng đơn vị” đúng đơn vị của Lan.
5. Nếu được duyệt, Hồ sơ tự sang tập đủ điều kiện lập Hội đồng; nếu Trưởng đơn vị trả sửa, BM01A V1 và PDF giữ bất biến, Lan sửa form rồi nộp PDF mới thành V2 trên cùng mã Hồ sơ.

Failure: actor tuyến đầu hoặc đơn vị không xác định → checklist chặn `Nộp`, nêu dữ liệu cần P.KHCN/Quản trị viên hiệu chỉnh; không tự chuyển sang P.KHCN.

### Flow nghiệp vụ — Lan yêu cầu hủy Đề tài trước Chờ nghiệm thu

1. Lan mở Đề tài NCKH và thấy `Yêu cầu hủy` vì trạng thái còn trước `Chờ nghiệm thu`.
2. Decision-dialog nêu đây là yêu cầu chờ P.KHCN quyết định; Lan nhập lý do bắt buộc và gửi.
3. Đề tài giữ trạng thái nghiệp vụ hiện tại nhưng thêm trạng thái yêu cầu `Đang chờ xử lý`; P.KHCN nhận task riêng.
4. P.KHCN xem lý do, bằng chứng và chọn `Chấp thuận` hoặc `Từ chối`, đều phải ghi lý do.
5. **Climax:** nếu chấp thuận, Đề tài chuyển `Đã hủy` mà toàn bộ hồ sơ, phiên bản và audit vẫn đọc được trong phạm vi quyền; nếu từ chối, Lan nhận lý do và luồng tiếp tục.

Failure: trạng thái đã tới `Chờ nghiệm thu` hoặc dữ liệu stale → server từ chối, UI giải thích ngưỡng nghiệp vụ và reload trạng thái; không biến yêu cầu thành thao tác hủy trực tiếp.

### UJ-3 — Hùng, chuyên gia ngoài Trường, tham gia Hội đồng qua lời mời

1. Hùng mở liên kết lời mời gắn với email, Hội đồng và Vai trò Thành viên Hội đồng.
2. Hệ thống yêu cầu xác minh đúng email; nếu email đã có Tài khoản, Hùng đăng nhập thay vì tạo trùng.
3. Hùng hoàn thiện Hồ sơ cá nhân và thấy invitation-panel xác nhận đúng Hội đồng/Vai trò.
4. Khi Cuộc họp `Đang diễn ra`, Hùng mở đúng bộ tài liệu chính thức và BM02 cá nhân.
5. Hùng lập phiếu, xuất PDF, ký ngoài hệ thống, tải lên và bấm `Nộp`.
6. **Climax:** BM02 khóa ở phiên bản đã nộp, tiến độ Hội đồng tăng đúng một phiếu và Hùng có bằng chứng thời điểm nộp.

Failure: link sai email/hết hạn/thu hồi → không cấp quyền hoặc tiết lộ tài liệu; hiển thị trạng thái link và đường liên hệ P.KHCN. Cuộc họp chưa mở hoặc đã bị hủy → phiếu read-only/không thể nộp.

### UJ-4 — Mai, Thư ký Hội đồng, lập BM03

1. Mai mở Dashboard Cuộc họp và thấy mình tách khỏi mẫu số đánh giá; không có action nộp BM02.
2. Khi chưa đủ phiếu, progress-meter hiển thị số hợp lệ/tổng và BM03 chưa khả dụng.
3. Khi phiếu cuối cùng hợp lệ được nộp, server tự tạo Mốc chốt phiếu, khóa Tập phiếu và mở BM03.
4. Mai lập BM03, xuất PDF, ký ngoài hệ thống, tải bản chữ ký Thư ký và `Nộp` cho Chủ tịch.
5. **Climax:** Biên bản chuyển “Chờ chữ ký thứ hai”; dashboard giữ cả Mốc chốt phiếu bất biến và phiên bản BM03 của Mai.
6. Nếu Chủ tịch `Trả chỉnh sửa`, Mai đọc lý do, sửa và nộp phiên bản mới trước khi Cuộc họp kết thúc.

Failure: một phiếu bị thiếu/không hợp lệ → BM03 không mở và không có đường bypass. Cuộc họp kết thúc/hủy giữa lúc soạn → submit bị từ chối, bản nháp giữ để tham chiếu nhưng không trở thành bằng chứng hợp lệ.

### UJ-5 — Dũng, cán bộ P.KHCN kiêm Chủ tịch Hội đồng, điều hành và công bố kết quả

1. Dũng ở Vai trò P.KHCN tạo Hội đồng, gắn bộ tài liệu, phân đúng một Chủ tịch, một Thư ký và các Thành viên; invitation-panel theo dõi người ngoài.
2. Checklist đủ điều kiện mới cho `Mở Cuộc họp`; sau xác nhận, cấu trúc khóa.
3. Dũng chuyển sang Vai trò Chủ tịch Hội đồng và nộp BM02 như một người đánh giá; hệ thống ghi đúng Vai trò vào audit.
4. Sau Mốc chốt, Dũng kiểm tra BM03: `Trả chỉnh sửa` kèm lý do hoặc tải về, ký thứ hai, tải bản đủ hai chữ ký và xác nhận hoàn tất.
5. Dũng trở lại Vai trò P.KHCN; checklist chỉ cho `Kết thúc Cuộc họp` khi đủ 100% phiếu và BM03 hoàn tất.
6. Kết quả sang `Chờ công bố`; Dũng kiểm tra đúng bản BM03 và chọn `Công bố kết quả` riêng.
7. **Climax:** quyền xem kết quả mở đúng actor, notification được tạo và audit phân biệt rõ hoàn tất Biên bản, kết thúc Cuộc họp và công bố.

Failure: cấu hình sai sau khi mở → không sửa cơ cấu; Dũng hủy có lý do và tạo Cuộc họp thay thế như một namespace mới, tái xác nhận assignment/lời mời/bộ tài liệu. Thiếu phiếu/Biên bản hoặc stale version → checklist chặn kết thúc/công bố.

### Flow nghiệp vụ — Dũng công bố phiên bản điều chỉnh kết quả

1. Dũng ở Vai trò P.KHCN mở kết quả đã công bố và chọn `Tạo phiên bản điều chỉnh`.
2. Hệ thống yêu cầu lý do, chỉ rõ bản đang hiện hành và tạo draft adjustment liên kết bất biến với bản trước.
3. Dũng kiểm tra đúng Biên bản/tài liệu nguồn, preview phạm vi actor sẽ nhận thông báo và xác nhận công bố.
4. **Climax:** bản điều chỉnh trở thành published-current; bản cũ mang nhãn mất hiệu lực nhưng vẫn xem được, mọi deep link resolve đúng version và notification mới chỉ đến actor đủ quyền.

Failure: nguồn stale, thiếu lý do hoặc quyền P.KHCN bị thu hồi → không công bố; draft giữ an toàn và không thay đổi bản hiện hành.

### UJ-6 — An, Giảng viên trong Trường, tự đăng ký và hoàn thiện Hồ sơ cá nhân

1. An đăng ký bằng email thuộc miền Trường, chọn loại người dùng Giảng viên và nhập mã Giảng viên.
2. An mở liên kết xác minh dùng một lần và hoàn thiện Hồ sơ cá nhân.
3. Account-state-panel tách “Email đã xác minh” khỏi `Chờ xác nhận vai trò`; An chưa thấy dữ liệu nghiệp vụ.
4. Quản trị viên mở hàng chờ, đối chiếu thông tin và duyệt Vai trò Giảng viên.
5. **Climax:** An đăng nhập và thấy Việc cần làm trong ngữ cảnh Giảng viên; audit giữ lần xác minh và duyệt vai trò.

Failure: email đã tồn tại hoặc link hết hạn/đã dùng → không tạo Tài khoản thứ hai; hướng An đăng nhập hoặc yêu cầu gửi lại theo chính sách. Nếu bị từ chối vai trò, hiển thị lý do/hướng liên hệ mà không cấp quyền.

### UJ-7 — Lan, Chủ nhiệm đề tài, đi từ thuyết minh đến hoàn tất Bước 07

1. Sau BM03 đạt, Lan mở Đề tài NCKH và tải BM04 hoàn chỉnh; P.KHCN đăng BM05 và tạo Cuộc họp xét duyệt thuyết minh.
2. Hội đồng hoàn tất BM06/BM07 theo cùng pattern phiếu–Mốc chốt–Biên bản; khi công bố kết luận thực hiện, timeline chuyển `Đang thực hiện`.
3. Lan lập BM08 và gửi tuần tự Chủ nhiệm đề tài → Trưởng Khoa/Trưởng đơn vị → P.KHCN; mỗi bước nhận đúng phiên bản và tải chữ ký bên ngoài.
4. Lan nộp BM09 cùng sản phẩm; P.KHCN chỉ gắn bộ đủ thành phần với BM10 vào Cuộc họp nghiệm thu.
5. Hội đồng hoàn tất BM11/BM12. Nếu BM12 yêu cầu, Lan lập BM13 theo từng yêu cầu và P.KHCN kiểm tra mà không họp lại.
6. P.KHCN lưu hợp đồng/BM14 khi áp dụng; checklist Hoàn tất Bước 07 đánh dấu điều kiện “Không áp dụng” khi đề tài không phải thanh lý hợp đồng.
7. **Climax:** P.KHCN xác nhận `Hoàn tất Bước 07`; Lan thấy timeline đầy đủ, bộ bằng chứng hiện hành và mọi phiên bản/lý do truy vết được.

Failure: BM08 bị sửa sau chữ ký → tạo phiên bản mới, vô hiệu chữ ký/duyệt phía sau của bản cũ. BM09 thiếu sản phẩm, BM13 chưa xác nhận hoặc BM14 bắt buộc chưa lưu → checklist chặn đúng mốc và dẫn tới hành động khắc phục.
