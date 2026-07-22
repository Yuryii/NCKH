# Trích xuất Vai trò × Quyền × Bề mặt từ PRD

Nguồn duy nhất của bản trích xuất này là `prd-NCKH-2026-07-20/prd.md` (`status: final`, cập nhật 2026-07-21). Đây là đầu vào rà soát UX; tên Vai trò nghiệp vụ, đối tượng, trạng thái và Biểu mẫu được giữ đúng thuật ngữ PRD. Tên bề mặt trong cột **Bề mặt UX cần có** là phép chiếu từ yêu cầu PRD sang màn hình, không phải tên màn hình đã được PRD chuẩn hóa.

## 1. Quy tắc quyền nền tảng

1. Quyền được xác định đồng thời theo **Tài khoản + Vai trò nghiệp vụ + Đợt đăng ký + đơn vị + Hội đồng + Hồ sơ đăng ký/Đề tài NCKH được gán** (FR-2, NFR-1). Không có quyền chỉ vì người dùng mang nhãn “Giảng viên”.
2. Một Tài khoản có thể mang nhiều Vai trò nghiệp vụ; người dùng phải chuyển đúng ngữ cảnh làm việc và mỗi hành động phải ghi Vai trò nghiệp vụ được sử dụng (FR-3, FR-34).
3. Ẩn nút hoặc menu không phải là kiểm soát quyền. API và giao diện đều phải kiểm tra quyền phía máy chủ (NFR-1, NFR-3).
4. **Giảng viên** không mặc nhiên có quyền xem `Hội đồng`. Mục/bề mặt `Hội đồng` chỉ xuất hiện khi Tài khoản là P.KHCN hoặc có ít nhất một phân công **Thành viên Hội đồng**, **Thư ký Hội đồng** hay **Chủ tịch Hội đồng** trong Hội đồng thuộc phạm vi truy cập.
5. **Quản trị viên** không mặc nhiên có quyền xét duyệt NCKH; chức năng quản trị Tài khoản phải tách khỏi nghiệp vụ NCKH (FR-38).
6. **Thành viên nhóm nghiên cứu ngoài Chủ nhiệm đề tài** chỉ là dữ liệu Hồ sơ đăng ký, không được tạo quyền đăng nhập (FR-9; §2.3; §7).
7. Mọi danh sách và dashboard phải lọc dữ liệu trước khi hiển thị; không chỉ vô hiệu hóa hành động trên dữ liệu ngoài phạm vi.

## 2. Danh mục Vai trò và ngữ cảnh

| Vai trò/trạng thái truy cập | Phạm vi được cấp | Không được suy rộng thành |
|---|---|---|
| Người chưa đăng nhập | Đăng nhập, tự đăng ký, xác minh email, dùng lời mời hợp lệ | Bất kỳ dữ liệu nghiệp vụ nào |
| Tài khoản `Chờ xác nhận vai trò` | Xem/cập nhật Hồ sơ cá nhân và trạng thái yêu cầu Vai trò | Quyền Giảng viên/Sinh viên trước khi Quản trị viên duyệt |
| Giảng viên | Đợt đăng ký được công bố cho mình; Hồ sơ đăng ký/Đề tài NCKH do mình làm Chủ nhiệm; công việc theo phân công khác nếu có | Hội đồng, xét duyệt tuyến đầu hoặc dữ liệu toàn đơn vị nếu chưa được gán Vai trò tương ứng |
| Sinh viên | Đợt đăng ký được công bố cho mình; Hồ sơ đăng ký/Đề tài NCKH do mình làm Chủ nhiệm | Hội đồng hoặc xét duyệt Hồ sơ đăng ký khác |
| Chủ nhiệm đề tài | Đúng Hồ sơ đăng ký/Đề tài NCKH mà Tài khoản chịu trách nhiệm; trong MVP là Giảng viên hoặc Sinh viên | Quyền trên Hồ sơ đăng ký/Đề tài NCKH khác |
| Giảng viên hướng dẫn | Chỉ Hồ sơ đăng ký đề tài sinh viên được gán | Actor/Tài khoản độc lập; quyền duyệt hồ sơ sinh viên khác; quyền Hội đồng |
| Trưởng Khoa/Trưởng đơn vị | Hồ sơ đăng ký đề tài giảng viên thuộc đơn vị; BM08 thuộc tuyến đơn vị; kết quả liên quan sau công bố | Hồ sơ ngoài đơn vị; Hội đồng nếu chưa được phân công |
| P.KHCN | Vận hành Đợt đăng ký, Hội đồng, Cuộc họp, công bố, tài liệu/quy trình Bước 01–07 theo quyền nghiệp vụ | Nội dung chuyên môn của Phiếu đánh giá; quyền Quản trị viên nếu không được cấp riêng |
| Thành viên Hội đồng | Chỉ Hội đồng/Cuộc họp và hồ sơ/tài liệu được phân công; Phiếu đánh giá cá nhân | Hội đồng khác; Phiếu đánh giá nháp của người khác; quyền Thư ký |
| Thư ký Hội đồng | Chỉ Cuộc họp được phân công; tiến độ phiếu; Biên bản Hội đồng tương ứng | Nghĩa vụ/quyền nộp Phiếu đánh giá bằng vai trò thư ký; nằm trong mẫu số 100% |
| Chủ tịch Hội đồng | Đúng Hội đồng được phân công; vừa là người đánh giá vừa là người ký thứ hai Biên bản | Hội đồng khác; miễn nộp Phiếu đánh giá |
| Quản trị viên | Vòng đời Tài khoản và yêu cầu xác nhận Vai trò; tạo Tài khoản P.KHCN ban đầu | Quyền xét duyệt/vận hành NCKH |
| Người ngoài được mời | Lời mời gắn đúng email + Hội đồng + Vai trò; sau xác minh được cấp quyền đúng Hội đồng | Quyền Hội đồng khác hoặc quyền toàn hệ thống |

## 3. Ma trận exhaustive Role × Capability × Surface × Gate × Visibility

### 3.1. Truy cập, Hồ sơ cá nhân và đa vai trò

| Vai trò | Capability/hành động | Bề mặt UX cần có | Gate/điều kiện route và hành động | Visibility/dữ liệu được xem | Nguồn |
|---|---|---|---|---|---|
| Người chưa đăng nhập | Đăng nhập/đăng xuất | Đăng nhập; trạng thái phiên hết hạn | Tài khoản đã xác minh và kích hoạt; không vào route nghiệp vụ nếu chưa đăng nhập | Không dữ liệu nghiệp vụ | FR-1 |
| Giảng viên/Sinh viên tiềm năng | Tự đăng ký | Đăng ký bằng email Trường; xác minh email; khai loại người dùng, mã định danh, Hồ sơ cá nhân | Email thuộc miền được chấp nhận; email chưa tồn tại; liên kết một lần/có hạn; email đã xác minh | Chỉ dữ liệu đăng ký của chính mình | FR-36, NFR-15, NFR-16 |
| Tài khoản `Chờ xác nhận vai trò` | Theo dõi yêu cầu, hoàn thiện Hồ sơ cá nhân | Chờ xác nhận Vai trò; Hồ sơ cá nhân | Sau xác minh email và trước khi Quản trị viên duyệt | Không có quyền nghiệp vụ Giảng viên/Sinh viên | FR-36 |
| Người ngoài được mời | Chấp nhận lời mời, đăng ký/xác minh, hoàn thiện Hồ sơ cá nhân | Chi tiết lời mời; đăng ký/đăng nhập theo lời mời; Hồ sơ cá nhân | Đúng email, Hội đồng, Vai trò; liên kết còn hiệu lực/chưa dùng/chưa thu hồi; nếu email đã có Tài khoản thì gắn Tài khoản hiện có | Chỉ metadata cần thiết của lời mời trước khi cấp quyền; sau xác minh chỉ đúng Hội đồng được mời | FR-37, NFR-15 |
| Mọi Tài khoản đã đăng nhập | Xem/cập nhật Hồ sơ cá nhân | Hồ sơ cá nhân | Tài khoản hoạt động; thay đổi sau này không đổi tài liệu lịch sử | Dữ liệu cá nhân của chính mình | FR-35, FR-36, FR-37 |
| Tài khoản nhiều Vai trò nghiệp vụ | Chuyển ngữ cảnh | Bộ chuyển Vai trò/ngữ cảnh; hàng chờ theo ngữ cảnh | Chỉ liệt kê Vai trò thực có; Hội đồng/Hồ sơ/đơn vị phải được gán; hành động ghi nhận Vai trò được dùng | Menu, hàng chờ và dữ liệu đổi theo ngữ cảnh; không hợp nhất quyền mơ hồ | FR-2, FR-3, FR-34 |
| Tài khoản bị khóa | Không thực hiện nghiệp vụ | Trạng thái Tài khoản bị khóa | Quản trị viên khóa; dữ liệu và lịch sử giữ nguyên | Không được truy cập nghiệp vụ khi khóa | FR-38 |
| Mọi actor liên quan | Nhận/xem thông báo trong ứng dụng | Trung tâm thông báo; deep link | Người nhận còn quyền với đối tượng; không lộ kết quả trước công bố | Chỉ thông báo và đối tượng theo quyền hiện hành | FR-33 |

### 3.2. Quản trị viên

| Vai trò | Capability/hành động | Bề mặt UX cần có | Gate/điều kiện | Visibility | Nguồn |
|---|---|---|---|---|---|
| Quản trị viên | Xem danh sách/yêu cầu Tài khoản | Quản lý Tài khoản; hàng chờ `Chờ xác nhận vai trò` | Có Vai trò Quản trị viên | Tài khoản, loại người dùng, mã định danh, Hồ sơ cá nhân cần cho xác nhận | FR-36, FR-38 |
| Quản trị viên | Duyệt/từ chối Vai trò Giảng viên/Sinh viên | Chi tiết yêu cầu Vai trò | Email đã xác minh; dựa trên loại người dùng, mã định danh, Hồ sơ cá nhân | Chỉ dữ liệu cần thẩm định; kết quả cập nhật Tài khoản | FR-36 |
| Quản trị viên | Tạo Tài khoản ban đầu cho P.KHCN | Tạo Tài khoản P.KHCN | Có Vai trò Quản trị viên | Dữ liệu Tài khoản được tạo | FR-38 |
| Quản trị viên | Khóa/mở khóa/đặt lại mật khẩu | Chi tiết Tài khoản; xác nhận thao tác | Có Vai trò Quản trị viên; không xóa lịch sử | Trạng thái Tài khoản, Vai trò và lịch sử liên quan | FR-38 |
| Quản trị viên | Không xét duyệt NCKH nếu không có Vai trò khác | Route denied/empty navigation nghiệp vụ | Không được suy ra quyền từ Quản trị viên | Không thấy hàng chờ xét duyệt, Đợt đăng ký quản trị, Hội đồng hay Đề tài ngoài quyền Vai trò khác | §2.1, FR-38 |

### 3.3. Đợt đăng ký và BM01

| Vai trò | Capability/hành động | Bề mặt UX cần có | Gate/điều kiện | Visibility | Nguồn |
|---|---|---|---|---|---|
| P.KHCN | Tạo/cấu hình Đợt đăng ký | Danh sách Đợt đăng ký; tạo/sửa chi tiết; danh mục đề tài giao trực tiếp | Loại đợt hợp lệ; kết thúc sau bắt đầu | Tất cả Đợt đăng ký thuộc phạm vi vận hành, kể cả `Nháp` | FR-4 |
| P.KHCN | Cập nhật/công bố Đợt đăng ký | Chi tiết Đợt đăng ký; checklist công bố | Đủ dữ liệu bắt buộc; sau công bố chỉ sửa nội dung không làm thay đổi tính hợp lệ hồ sơ đã nộp | Cấu hình và lịch sử Đợt đăng ký | FR-5 |
| Hệ thống | Tự đóng Đợt đăng ký | Trạng thái/notice trên danh sách và chi tiết | Hết hạn; không có thao tác đóng thủ công trước hạn | Hiển thị `Đã đóng`; nháp còn nhưng không thể nộp | FR-6 |
| P.KHCN | Theo dõi số lượng hồ sơ theo trạng thái | Dashboard Đợt đăng ký; drill-down Hồ sơ đăng ký | Có Vai trò P.KHCN | Số liệu phải khớp chi tiết tại thời điểm truy vấn | FR-7 |
| Giảng viên/Sinh viên | Xem Đợt đăng ký | Danh sách/chi tiết Đợt đăng ký | Đợt đã công bố và thuộc phạm vi người dùng | Không thấy Đợt `Nháp` hoặc ngoài phạm vi | FR-4, FR-7 |
| Giảng viên/Sinh viên | Tạo Hồ sơ đăng ký nháp | Trình tạo Hồ sơ đăng ký; chọn loại/Đợt | Đợt đang mở; loại phù hợp; không sau hạn | Chỉ nháp của mình/người có quyền | FR-6, FR-8 |
| Chủ nhiệm đề tài | Nhập/lưu/sửa BM01 và nhóm nghiên cứu | BM01A/B dạng Biểu mẫu điện tử | Trước khi nộp hoặc sau khi bị trả; điều kiện trường theo nhánh | Dữ liệu BM01 của đúng Hồ sơ; nhóm nghiên cứu không nhận quyền | FR-9, FR-10 |
| Chủ nhiệm đề tài | Xem trước/xuất PDF BM01 | Preview PDF; lịch sử bản xuất | Dữ liệu hợp lệ cho preview/export; xuất không khóa form | Phiên bản tại thời điểm xuất | FR-11 |
| Chủ nhiệm đề tài | Tải PDF đã ký và bấm Nộp | Workspace phiên bản/tệp; xác nhận Nộp | PDF đúng định dạng/dung lượng; Đợt còn mở; với Hồ sơ sinh viên phải có Giảng viên hướng dẫn hợp lệ | Sau Nộp form khóa; lịch sử lần nộp | FR-12, FR-14 |
| Chủ nhiệm đề tài | Xem trạng thái, bước tiếp theo, lý do/kết quả theo quyền | Chi tiết Hồ sơ đăng ký; timeline/lịch sử | Đúng Hồ sơ mình phụ trách | Actor/bước chịu trách nhiệm tiếp theo; lý do/kết quả chỉ theo quyền | FR-13 |
| Chủ nhiệm đề tài | Yêu cầu hủy | Form yêu cầu hủy trong chi tiết Hồ sơ/Đề tài | Trước trạng thái `Chờ nghiệm thu`; chưa `Đã hủy` | Trạng thái và kết quả xử lý yêu cầu của mình | FR-18 |
| P.KHCN | Chấp thuận/từ chối yêu cầu hủy | Hàng chờ/chi tiết yêu cầu hủy | Có yêu cầu hợp lệ; lý do/kết quả được lưu | Hồ sơ/Đề tài và lịch sử liên quan | FR-18 |

### 3.4. Xét duyệt tuyến đầu và BM08 theo tuyến đơn vị

| Vai trò | Capability/hành động | Bề mặt UX cần có | Gate/điều kiện | Visibility | Nguồn |
|---|---|---|---|---|---|
| Giảng viên hướng dẫn | Xem hàng chờ Hồ sơ đăng ký đề tài sinh viên | Việc cần làm; chi tiết Hồ sơ/BM01/PDF chính thức | Chỉ Hồ sơ sinh viên được gán | Không thấy Hồ sơ ngoài phân công | FR-2, FR-13, FR-14 |
| Giảng viên hướng dẫn | Duyệt hoặc trả sửa kèm lý do | Chi tiết xét duyệt tuyến đầu | Hồ sơ đang chờ chính actor; trả phải có lý do | Đúng Hồ sơ được gán; duyệt tự vào tập đủ điều kiện lập Hội đồng | FR-15, FR-16 |
| Trưởng Khoa/Trưởng đơn vị | Xem hàng chờ Hồ sơ đăng ký đề tài giảng viên | Việc cần làm; chi tiết Hồ sơ/BM01/PDF chính thức | Hồ sơ thuộc đơn vị | Không thấy Hồ sơ ngoài đơn vị | FR-2, FR-13, FR-14 |
| Trưởng Khoa/Trưởng đơn vị | Duyệt hoặc trả sửa kèm lý do | Chi tiết xét duyệt tuyến đầu | Hồ sơ đang chờ actor thuộc đúng đơn vị; trả phải có lý do | Đúng Hồ sơ thuộc đơn vị; không qua bước P.KHCN trung gian | FR-15, FR-16 |
| Chủ nhiệm đề tài | Sửa/nộp lại BM01 bị trả | BM01 ở trạng thái `Trả chỉnh sửa`; workspace PDF | Chỉ khi bị trả; tạo PDF đã ký mới; nộp về đúng tuyến | Thấy lý do trả và mọi phiên bản của Hồ sơ mình; bản cũ không ghi đè | FR-16, FR-17 |
| Chủ nhiệm đề tài | Lập/ký bước một/gửi BM08 | BM08 Biểu mẫu điện tử; preview/export/upload; timeline chữ ký | Đề tài `Đang thực hiện`; có bản chữ ký Chủ nhiệm | Đúng BM08 của Đề tài mình | FR-46 |
| Trưởng Khoa/Trưởng đơn vị | Trả BM08 hoặc ký bổ sung/chuyển P.KHCN | Hàng chờ BM08; chi tiết phiên bản | Đúng đơn vị/đúng tuyến; nhận đúng phiên bản bước trước | BM08 thuộc Đề tài trong tuyến đơn vị; lý do và lịch sử | FR-46 |
| P.KHCN | Ghi nhận đã nhận BM08 | Hàng chờ BM08; chi tiết tuyến ký | BM08 đã qua Trưởng Khoa/Trưởng đơn vị trên đúng phiên bản | BM08 và lịch sử tuyến; cập nhật chi tiết `Đang thực hiện — đã nộp báo cáo giữa kỳ` | FR-46 |

### 3.5. Thiết lập Hội đồng và Cuộc họp

| Vai trò | Capability/hành động | Bề mặt UX cần có | Gate/điều kiện | Visibility | Nguồn |
|---|---|---|---|---|---|
| P.KHCN | Tạo Hội đồng/Cuộc họp cho 3 giai đoạn | Danh sách Hội đồng; wizard tạo; gắn hồ sơ/tài liệu | Xét duyệt hồ sơ, xét duyệt thuyết minh hoặc nghiệm thu; đúng một Chủ tịch, một Thư ký; Chủ tịch thuộc người đánh giá; Thư ký ngoài mẫu số | Hội đồng thuộc phạm vi vận hành | FR-19 |
| P.KHCN | Phân công Vai trò, thêm lời mời, sửa cấu trúc | Thiết lập thành viên/lời mời/hồ sơ | Chỉ khi Hội đồng/Cuộc họp còn `Nháp` | Toàn cấu trúc, trạng thái lời mời, lịch sử thay đổi | FR-20, FR-37 |
| P.KHCN | Mở Cuộc họp thủ công | Checklist sẵn sàng; xác nhận Mở | Tất cả thành viên có Tài khoản hoạt động; người ngoài đã chấp nhận lời mời; đủ cơ cấu và đầu vào | Trạng thái `Đang diễn ra`, thời điểm mở, người liên quan | FR-39 |
| P.KHCN | Theo dõi tiến độ Hội đồng | Dashboard Cuộc họp | Có Vai trò P.KHCN, đúng Hội đồng | Tổng người đánh giá, số đã nộp/hợp lệ, 100%; Thư ký riêng ngoài mẫu số | FR-21 |
| Thư ký Hội đồng | Theo dõi tiến độ Hội đồng | Dashboard Cuộc họp được phân công | Đúng Hội đồng/Cuộc họp | Tổng số/số phiếu/hợp lệ/100%; không phát sinh phiếu cho mình | FR-21, FR-25 |
| P.KHCN | Kết thúc Cuộc họp thủ công | Dashboard; checklist Kết thúc | Đủ 100% Phiếu đánh giá hợp lệ **và** BM03/BM07/BM12 hoàn tất hai chữ ký | Trạng thái, người thao tác, thời điểm kết thúc thực tế | FR-40 |
| P.KHCN | Hủy Cuộc họp, tạo thay thế | Form lý do hủy; liên kết tạo Cuộc họp thay thế | Sau mở nếu sai cấu hình/thành viên không thể tiếp tục; không sửa cấu trúc Cuộc họp đã mở | Giữ nguyên cấu trúc, phiếu, tài liệu của cuộc họp bị hủy; bản thay thế liên kết nhưng không tái dùng tài liệu | FR-41 |
| Giảng viên/Sinh viên không có phân công Hội đồng | Không truy cập `Hội đồng` | Không hiển thị mục nav/route Hội đồng | Không có assignment Thành viên/Thư ký/Chủ tịch và không phải P.KHCN | Không thấy danh sách, dashboard, thành viên, hồ sơ Hội đồng | FR-2, FR-19, NFR-1 |
| Tài khoản có assignment Hội đồng | Mở danh sách Hội đồng của mình | `Hội đồng của tôi`; chi tiết Cuộc họp | Có phân công hiện hành/lịch sử được cấp | Chỉ các Hội đồng được phân công, không phải mọi Hội đồng | FR-2, FR-22 |

### 3.6. Phiếu đánh giá BM02/BM06/BM11

| Vai trò | Capability/hành động | Bề mặt UX cần có | Gate/điều kiện | Visibility | Nguồn |
|---|---|---|---|---|---|
| Thành viên Hội đồng | Xem hồ sơ/tài liệu chính thức phục vụ đánh giá | Chi tiết Cuộc họp; bộ tài liệu đánh giá | Đúng Hội đồng/Vai trò hiện hành; BM01 hoặc BM04+BM05 hoặc BM09+BM10 đúng phiên bản | Chỉ tài liệu gắn Hội đồng; quyền bị thu hồi khi Cuộc họp hủy trừ lịch sử được cấp | FR-22 |
| Thành viên Hội đồng | Lập/lưu/sửa Phiếu đánh giá cá nhân | BM02/BM06/BM11 Biểu mẫu điện tử | Có trách nhiệm đánh giá; đúng giai đoạn; trước Nộp/Mốc chốt | Chỉ phiếu cá nhân; không xem/sửa phiếu nháp người khác | FR-23 |
| Thành viên Hội đồng | Preview/export/tải PDF ký/Nộp Phiếu | Workspace Phiếu đánh giá | Cuộc họp `Đang diễn ra`; trước Mốc chốt; tệp hợp lệ | Sau nộp phiếu khóa; chỉ phiếu cá nhân trước công bố | FR-24, FR-26, FR-42 |
| Chủ tịch Hội đồng | Thực hiện đầy đủ nghĩa vụ Thành viên đánh giá | Cùng bề mặt BM02/BM06/BM11 | Cùng gate như Thành viên; được tính vào mẫu số | Phiếu của chính Chủ tịch và tài liệu Hội đồng | FR-19, FR-24, FR-25 |
| Tài khoản chỉ giữ Vai trò Thư ký trong Cuộc họp | Không có Phiếu đánh giá | Không render CTA/form Nộp phiếu; hiển thị “Thư ký không thuộc mẫu số” | Assignment chỉ là Thư ký | Không tạo phiếu; không nghĩa vụ/quyền nộp bằng Vai trò thư ký | FR-19, FR-23, FR-24 |
| Hệ thống | Kiểm tra 100%, tạo Mốc chốt, khóa Tập phiếu | Dashboard tiến độ; trạng thái Mốc chốt | Số phiếu hợp lệ = tổng người có trách nhiệm đánh giá, gồm Chủ tịch, không gồm Thư ký | Lưu thời điểm, số phiếu, mẫu số; Tập phiếu bất biến; không mở lại | FR-25, FR-26 |

### 3.7. Biên bản Hội đồng BM03/BM07/BM12 và công bố kết quả

| Vai trò | Capability/hành động | Bề mặt UX cần có | Gate/điều kiện | Visibility trước công bố | Visibility sau công bố | Nguồn |
|---|---|---|---|---|---|---|
| Thư ký Hội đồng | Lập/preview/export/ký ngoài/tải/nộp Biên bản | BM03/BM07/BM12 Biểu mẫu điện tử; workspace phiên bản | Sau Mốc chốt 100%; đúng Cuộc họp; Cuộc họp `Đang diễn ra` | Tiến độ và kết quả tổng hợp; Biên bản đúng Hội đồng | Kết quả theo quyền và toàn lịch sử Biên bản mình xử lý | FR-21, FR-27, FR-42 |
| Chủ tịch Hội đồng | Kiểm tra/trả Biên bản | Hàng chờ Biên bản; chi tiết; dialog lý do trả | Biên bản đã được Thư ký nộp; lý do bắt buộc; Cuộc họp đang diễn ra | Kết quả tổng hợp và Biên bản đúng Hội đồng | Kết quả đã công bố theo quyền | FR-28, FR-42 |
| Thư ký Hội đồng | Sửa/nộp lại Biên bản bị trả | Biên bản `Trả chỉnh sửa`; workspace bản mới | Đúng Thư ký; Cuộc họp đang diễn ra; bản cũ mất hiệu lực | Lý do trả; các phiên bản Biên bản đúng Hội đồng | Như trên | FR-29 |
| Chủ tịch Hội đồng | Ký thứ hai/tải bản đủ hai chữ ký/xác nhận hoàn tất | Workspace ký thứ hai; xác nhận Hoàn tất | Có bản ký Thư ký; đúng Chủ tịch; Cuộc họp đang diễn ra | Bản ký Thư ký và bản đủ hai chữ ký | Như trên | FR-31 |
| P.KHCN | Kiểm tra kết quả ở `Chờ công bố`, Công bố kết quả | Review kết quả; CTA `Công bố kết quả` | BM03/BM07/BM12 đủ hai chữ ký **và** Cuộc họp đã kết thúc | Được xem kết quả tổng hợp | Kết quả hiện hành và lịch sử phiên bản điều chỉnh | FR-42 |
| P.KHCN | Tạo phiên bản điều chỉnh kết quả | Flow điều chỉnh kết quả | Kết quả đã công bố; bắt buộc lý do, người thực hiện, liên kết bản trước | Có quyền xem bản hiện hành | Bản điều chỉnh và lịch sử; không sửa trực tiếp bản đã công bố | FR-42 |
| Chủ tịch Hội đồng | Xem kết quả tổng hợp | Chi tiết kết quả Hội đồng | Đúng Hội đồng | Được xem trước công bố | Được xem sau công bố | FR-42 |
| Thư ký Hội đồng | Xem kết quả tổng hợp | Chi tiết kết quả Hội đồng | Đúng Hội đồng | Được xem trước công bố | Được xem sau công bố | FR-42 |
| Thành viên Hội đồng không phải Chủ tịch | Xem Phiếu của mình/tài liệu được phân quyền | Chi tiết Cuộc họp | Đúng Hội đồng | **Không** xem kết quả tổng hợp; chỉ phiếu của mình và tài liệu được phân quyền | Xem kết quả Hội đồng theo quyền | FR-42 |
| Chủ nhiệm đề tài | Xem kết quả | Chi tiết Hồ sơ/Đề tài; kết quả Hội đồng | Đúng Hồ sơ/Đề tài | Không xem kết quả tổng hợp trước công bố | Được xem kết quả sau công bố | FR-42 |
| Giảng viên hướng dẫn nếu có | Xem kết quả | Chi tiết Hồ sơ được gán/kết quả | Đúng Hồ sơ sinh viên được gán | Không xem kết quả trước công bố | Được xem sau công bố | FR-42 |
| Trưởng Khoa/Trưởng đơn vị | Xem kết quả | Chi tiết Hồ sơ/Đề tài thuộc đơn vị | Đúng đơn vị | Không xem kết quả trước công bố | Được xem sau công bố | FR-42 |

### 3.8. Thuyết minh, thực hiện, nghiệm thu, giải trình và hoàn tất Bước 07

| Vai trò | Capability/hành động | Bề mặt UX cần có | Gate/điều kiện | Visibility | Nguồn |
|---|---|---|---|---|---|
| Chủ nhiệm đề tài | Tải/nộp BM04A/B hoàn chỉnh | Chi tiết Đề tài; workspace BM04 | BM03 kết luận đạt; Đề tài chưa hủy; BM04 được soạn ngoài hệ thống | Đúng Đề tài; mỗi lần nộp là phiên bản bất biến | FR-43 |
| P.KHCN | Tải/công bố BM05, tạo Cuộc họp xét duyệt thuyết minh | Chi tiết Đề tài/Hội đồng; quản lý BM05 | BM05 lập/ký ngoài; gắn đúng phiên bản/Hội đồng/Đề tài | Actor có quyền chỉ xem/tải sau khi công bố | FR-44 |
| Hệ thống/P.KHCN | Ghi nhận kết quả thuyết minh | Chi tiết Đề tài; trạng thái tổng quan | BM07 hiện hành hoàn tất, Cuộc họp kết thúc, P.KHCN công bố | `Thuyết minh không đạt` hoặc `Đang thực hiện`; không nhập tay độc lập | FR-45 |
| Chủ nhiệm đề tài | Nộp BM09 và tệp sản phẩm | Workspace BM09/sản phẩm | Trước mốc nghiệm thu; đúng Đề tài | Lưu riêng từng phiên bản/tệp; không ghi đè | FR-47 |
| P.KHCN | Kiểm tra thành phần BM09, trả thiếu tệp/đánh dấu đủ | Hàng chờ kiểm tra BM09; chi tiết bộ tài liệu | Đúng Đề tài; lý do khi trả | Bộ BM09/sản phẩm; chỉ bộ đủ thành phần mới gắn Cuộc họp | FR-47 |
| P.KHCN | Tải/công bố BM10, tạo Hội đồng/Cuộc họp nghiệm thu | Chi tiết Đề tài/Hội đồng; quản lý BM10 | Có bộ BM09/sản phẩm chính thức và đủ cơ cấu Hội đồng | BM10 đúng Hội đồng/Đề tài/bộ tài liệu | FR-48 |
| Thành viên/Chủ tịch/Thư ký | Vận hành BM11/BM12 | Cùng bề mặt Phiếu/Biên bản theo giai đoạn nghiệm thu | Cùng gate 100%, Mốc chốt, hai chữ ký | Chỉ Hội đồng nghiệm thu được phân công | FR-48, FR-22–FR-31 |
| Chủ nhiệm đề tài | Lập/nộp BM13 theo từng yêu cầu | BM13 Biểu mẫu điện tử; workspace PDF ký | Chỉ khi BM12 hiện hành yêu cầu sửa/giải trình | Đúng yêu cầu BM12 và Đề tài; BM13 đã nộp khóa, có phiên bản | FR-49 |
| P.KHCN | Kiểm tra/trả/xác nhận BM13 và tài liệu sửa | Hàng chờ giải trình; chi tiết BM13 | BM12 yêu cầu giải trình; trả có lý do; không cần họp lại Hội đồng | Vòng trả sửa/xác nhận và lịch sử | FR-49 |
| P.KHCN | Tải hợp đồng đã ký và BM14 hoàn chỉnh | Kho tài liệu Đề tài; metadata hiệu lực | Tài liệu đã xử lý/ký ngoài hệ thống | Người tải, thời điểm, phiên bản, hiệu lực, quan hệ Đề tài | FR-50 |
| Chủ nhiệm đề tài | Xem/tải hợp đồng và BM14 | Kho tài liệu Đề tài | Đúng Đề tài và theo quyền | Chỉ tài liệu được P.KHCN lưu cho Đề tài mình | FR-50 |
| P.KHCN | Xác nhận `Hoàn tất Bước 07` | Checklist hoàn tất Đề tài; xác nhận | BM12 nghiệm thu đạt; BM13 đã xác nhận nếu có; BM14 có nếu đề tài có hợp đồng phải thanh lý | Bộ điều kiện, người thao tác, thời điểm, lịch sử | FR-51 |

### 3.9. Trạng thái, lịch sử, phiên bản và audit

| Vai trò | Capability/hành động | Bề mặt UX cần có | Gate/điều kiện | Visibility | Nguồn |
|---|---|---|---|---|---|
| Actor có liên quan | Xem Trạng thái tổng quan và chi tiết | Danh sách Đề tài; chi tiết/timeline | Có quyền trên đối tượng | Trạng thái dẫn xuất và sự kiện nguồn trong phạm vi quyền | FR-13, FR-32 |
| Actor có quyền | Xem lịch sử/phiên bản tài liệu | Timeline; lịch sử phiên bản; preview/download | Có quyền đối tượng và tài liệu | Bản hiện hành, mất hiệu lực, quan hệ thay thế; không thay đổi theo Hồ sơ cá nhân hiện tại | FR-35 |
| Actor có quyền | Truy vấn lịch sử theo đối tượng/khoảng thời gian | Nhật ký hoạt động theo đối tượng; bộ lọc thời gian | Chỉ trong phạm vi quyền | Actor, Tài khoản, Vai trò, thời điểm, trước/sau, phiên bản, lý do | FR-34 |
| Người dùng nghiệp vụ | Không sửa/xóa audit hoặc Mốc chốt | Read-only audit/Mốc chốt | Bất biến | Chỉ đọc phần được phép | FR-26, FR-34, NFR-4 |

## 4. Ma trận điều hướng theo Vai trò

Đây là quy tắc tối thiểu để tránh lỗi “mọi Giảng viên đều thấy Hội đồng”. Một mục chỉ xuất hiện nếu trong mục đó có ít nhất một đối tượng người dùng được quyền xem hoặc một hành động hợp lệ có thể thực hiện.

| Mục/bề mặt cấp cao | Giảng viên | Sinh viên | Giảng viên hướng dẫn | Trưởng Khoa/Trưởng đơn vị | P.KHCN | Thành viên Hội đồng | Thư ký Hội đồng | Chủ tịch Hội đồng | Quản trị viên |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Việc cần làm | Có, theo Hồ sơ/Đề tài của mình | Có, theo Hồ sơ/Đề tài của mình | Có, chỉ Hồ sơ được gán | Có, chỉ đơn vị/tuyến BM08 | Có | Có, chỉ Hội đồng được gán | Có, chỉ Hội đồng được gán | Có, chỉ Hội đồng được gán | Có, cho yêu cầu/Tài khoản |
| Thông báo | Có | Có | Có | Có | Có | Có | Có | Có | Có |
| Đợt đăng ký | Có, các đợt công bố phù hợp | Có, các đợt công bố phù hợp | Không do Vai trò hướng dẫn; có nếu cùng Tài khoản cũng là Giảng viên | Không do Vai trò trưởng đơn vị, trừ quyền liên quan được đặc tả thêm | Có, toàn bộ phạm vi vận hành | Không do Vai trò Hội đồng | Không do Vai trò Thư ký | Không do Vai trò Chủ tịch | Không |
| Hồ sơ đăng ký/Đề tài NCKH | Có, của mình | Có, của mình | Có, chỉ Hồ sơ sinh viên được gán | Có, chỉ Hồ sơ/Đề tài thuộc đơn vị/tuyến | Có, theo phạm vi vận hành | Có qua Hội đồng, chỉ đối tượng được gán | Có qua Hội đồng, phạm vi cần cho Biên bản | Có qua Hội đồng, chỉ đối tượng được gán | Không |
| Hội đồng/Cuộc họp | **Không**, trừ khi có assignment Hội đồng hoặc Vai trò P.KHCN khác | **Không**, trừ khi có assignment Hội đồng | **Không** do Vai trò hướng dẫn | **Không** do Vai trò trưởng đơn vị | Có | Có, chỉ được gán | Có, chỉ được gán | Có, chỉ được gán | Không |
| Quản lý Tài khoản | Không | Không | Không | Không | Không mặc nhiên | Không | Không | Không | Có |
| Hồ sơ cá nhân | Có | Có | Có | Có | Có | Có | Có | Có | Có |

### Quy tắc khi một Tài khoản có nhiều Vai trò

- Menu tổng phải là **hợp của các bề mặt có quyền**, nhưng dữ liệu bên trong luôn được gắn nhãn ngữ cảnh và lọc theo assignment.
- Bộ chuyển ngữ cảnh dùng tên Vai trò nghiệp vụ thực, ví dụ `Giảng viên`, `Giảng viên hướng dẫn`, `Thành viên Hội đồng — HĐ ...`, `Thư ký Hội đồng — HĐ ...`, `P.KHCN`; không dùng `Chủ nhiệm đề tài` như tên profile toàn cục.
- Nếu Tài khoản Giảng viên đồng thời là Thành viên Hội đồng, mục `Hội đồng` có thể xuất hiện; đây là quyền từ assignment Hội đồng, không từ Vai trò Giảng viên.
- Nếu một người vừa là Thư ký vừa có assignment đánh giá riêng trong **cùng Cuộc họp**, PRD chưa cho phép hay cấm rõ; UI không được tự hợp nhất hai nghĩa vụ cho đến khi làm rõ.
- Mọi CTA nhạy cảm phải thể hiện hoặc có thể truy ra ngữ cảnh hành động, nhất là `Duyệt`, `Nộp Phiếu đánh giá`, `Trả Biên bản`, `Công bố kết quả`, `Hoàn tất Bước 07`.

## 5. Kiểm soát trước và sau `Công bố kết quả`

| Actor | Trước công bố (`Chờ công bố`) | Sau công bố |
|---|---|---|
| P.KHCN | Xem kết quả tổng hợp; kiểm tra; được thao tác `Công bố kết quả` | Xem kết quả; tạo phiên bản điều chỉnh có truy vết nếu sai |
| Chủ tịch Hội đồng | Xem kết quả tổng hợp của đúng Hội đồng | Xem kết quả theo quyền |
| Thư ký Hội đồng | Xem kết quả tổng hợp của đúng Hội đồng | Xem kết quả theo quyền |
| Thành viên Hội đồng khác | Chỉ Phiếu đánh giá của mình và tài liệu được phân quyền; không xem kết quả tổng hợp | Xem kết quả theo quyền |
| Chủ nhiệm đề tài | Không xem kết quả tổng hợp | Xem kết quả của Đề tài mình |
| Giảng viên hướng dẫn nếu có | Không xem kết quả tổng hợp | Xem kết quả Hồ sơ sinh viên được gán |
| Trưởng Khoa/Trưởng đơn vị | Không xem kết quả tổng hợp | Xem kết quả Hồ sơ/Đề tài thuộc phạm vi đơn vị |
| Actor không liên quan | Không | Không |

## 6. Conflict/ambiguity cần giữ mở, không tự quyết trong UX

1. **Quyền xem Phiếu đánh giá đã nộp của người khác:** FR-2 ghi “Thành viên Hội đồng chỉ xem Hồ sơ đăng ký và Phiếu đánh giá của Hội đồng được phân công”, nhưng FR-23 chỉ cấm xem/sửa *Phiếu đánh giá nháp* của người khác và FR-42 trước công bố nói Thành viên chỉ xem Phiếu của mình. PRD không nói rõ sau công bố Thành viên/Thư ký/Chủ tịch có được xem từng Phiếu đã nộp của người khác hay chỉ kết quả tổng hợp. UX nên mặc định bảo thủ: không mở phiếu cá nhân người khác nếu chưa chốt nghiệp vụ.
2. **Thư ký cần dữ liệu nào để lập Biên bản:** PRD cho Thư ký xem tiến độ, kết quả tổng hợp trước công bố và lập BM03/BM07/BM12, nhưng không nêu rõ có được đọc nội dung từng Phiếu đánh giá đã nộp hay chỉ Tập phiếu/tổng hợp do hệ thống cung cấp.
3. **Một người đồng thời Thư ký và người đánh giá trong cùng Cuộc họp:** PRD quy định Thư ký là vai trò riêng, không thuộc mẫu số nếu “chỉ giữ vai trò Thư ký”, nhưng chưa quy định một Tài khoản có thể đồng thời có assignment Thành viên Hội đồng trong cùng Cuộc họp hay không. FR-19 có xu hướng tách vai trò; cần chốt constraint dữ liệu.
4. **Phạm vi “người dùng có liên quan” của Đợt đăng ký:** FR-7 yêu cầu xem theo quyền nhưng chưa định nghĩa chi tiết loại Đợt nào hiển thị cho Giảng viên, Sinh viên, Trưởng đơn vị hoặc actor Hội đồng. Chỉ có điều chắc chắn: Đợt `Nháp` không hiển thị cho người đăng ký.
5. **Quyền xem lịch sử khi Cuộc họp bị hủy:** FR-22 nói thu hồi quyền xem tài liệu trừ quyền lịch sử “được cấp theo Vai trò”, nhưng chưa định nghĩa actor nào được giữ quyền lịch sử và giữ đến mức dữ liệu nào.
6. **P.KHCN và Chủ tịch Hội đồng:** baseline nói Chủ tịch do P.KHCN đảm nhiệm, nhưng phải vẫn là hai ngữ cảnh quyền khác nhau. Chưa rõ hệ thống có cấm người ngoài nhóm P.KHCN được phân công Chủ tịch hay chỉ mô tả baseline vận hành.
7. **Trưởng Khoa/Trưởng đơn vị xem Đề tài sau tuyến đầu:** FR-42 cấp quyền xem kết quả sau công bố và FR-46 cấp bước BM08, nhưng PRD chưa liệt kê đầy đủ tài liệu/trạng thái nào của Đề tài mà vai trò này được xem giữa các mốc.
8. **P.KHCN có được xem nội dung Phiếu cá nhân trước Mốc chốt/công bố:** PRD cho P.KHCN theo dõi số lượng và cấm can thiệp nội dung chuyên môn, nhưng không nói rõ quyền đọc nội dung từng Phiếu. Nên mặc định chỉ tiến độ/validity cho đến khi stakeholder xác nhận.
9. **Quyền xem BM05/BM10 “actor có quyền”:** FR-44/FR-48 không liệt kê actor cụ thể và mốc công bố BM10 chi tiết như FR-44. Cần chốt ai được xem/tải ở từng thời điểm.
10. **Lịch sử/audit cho actor nghiệp vụ:** FR-34 cho truy vấn “trong phạm vi quyền” nhưng chưa chỉ rõ actor nào có màn hình audit tổng hợp và actor nào chỉ thấy timeline trên đối tượng. UX nên cho timeline đối tượng; audit toàn cục chỉ cấp khi đặc tả quyền bổ sung.
11. **Quy trình mật khẩu:** FR-38 cấp Quản trị viên “đặt lại mật khẩu” nhưng không đặc tả màn hình quên mật khẩu tự phục vụ, thông báo mật khẩu tạm hay reset link; không nên tự thêm cơ chế bảo mật cụ thể.
12. **Trạng thái Vai trò bị từ chối:** FR-36 cho Quản trị viên từ chối yêu cầu Vai trò nhưng không định nghĩa người dùng có được sửa/nộp lại, lý do bắt buộc hay trạng thái sau từ chối.

## 7. Danh sách bề mặt tối thiểu để bao phủ đầy đủ Vai trò

### Dùng chung/xác thực

1. Đăng nhập và trạng thái phiên.
2. Tự đăng ký email Trường, xác minh email, khai loại người dùng/mã định danh.
3. Trạng thái `Chờ xác nhận vai trò` và kết quả duyệt/từ chối.
4. Chấp nhận lời mời Hội đồng cho Tài khoản mới hoặc Tài khoản hiện có.
5. Hồ sơ cá nhân.
6. Bộ chuyển Vai trò/ngữ cảnh.
7. Việc cần làm theo quyền.
8. Trung tâm thông báo.

### Giảng viên/Sinh viên/Chủ nhiệm đề tài

9. Danh sách và chi tiết Đợt đăng ký được công bố.
10. Danh sách Hồ sơ đăng ký/Đề tài của tôi.
11. Tạo Hồ sơ đăng ký; BM01A/B; preview/export PDF; tải PDF ký; Nộp.
12. Chi tiết Hồ sơ/Đề tài với trạng thái, bước tiếp theo, timeline, lý do trả, phiên bản.
13. Sửa/nộp lại BM01 và yêu cầu hủy.
14. Workspace BM04.
15. Tuyến BM08.
16. Workspace BM09 và sản phẩm.
17. Workspace BM13 theo yêu cầu BM12.
18. Kho hợp đồng/BM14 được chia sẻ và checklist kết quả Bước 07 ở chế độ phù hợp.

### Giảng viên hướng dẫn/Trưởng Khoa/Trưởng đơn vị

19. Hàng chờ xét duyệt tuyến đầu.
20. Chi tiết kiểm tra BM01/PDF chính thức; Duyệt/Trả sửa.
21. Hàng chờ và workspace ký/trả/chuyển BM08 cho Trưởng Khoa/Trưởng đơn vị.
22. Kết quả đã công bố theo Hồ sơ/Đề tài được gán/thuộc đơn vị.

### P.KHCN

23. Danh sách/tạo/sửa/công bố/dashboard Đợt đăng ký.
24. Danh sách Hồ sơ/Đề tài theo trạng thái và yêu cầu hủy.
25. Danh sách/tạo/sửa Hội đồng; cơ cấu Vai trò; lời mời; checklist mở.
26. Dashboard Cuộc họp; mở/kết thúc/hủy/tạo thay thế.
27. Review `Chờ công bố`; Công bố kết quả; phiên bản điều chỉnh.
28. Hàng chờ BM08 và ghi nhận nhận báo cáo.
29. Quản lý/công bố BM05 và BM10.
30. Kiểm tra bộ BM09/sản phẩm; trả thiếu/đánh dấu đủ.
31. Kiểm tra/trả/xác nhận BM13.
32. Lưu hợp đồng/BM14 và xác nhận `Hoàn tất Bước 07`.

### Thành viên/Chủ tịch/Thư ký Hội đồng

33. `Hội đồng của tôi` và chi tiết Cuộc họp được phân công.
34. Bộ hồ sơ/tài liệu chính thức theo giai đoạn.
35. BM02/BM06/BM11 cá nhân cho Thành viên/Chủ tịch.
36. Dashboard tiến độ 100% cho Thư ký/P.KHCN.
37. BM03/BM07/BM12 cho Thư ký sau Mốc chốt.
38. Hàng chờ kiểm tra/trả/ký thứ hai Biên bản cho Chủ tịch.
39. Kết quả Hội đồng với biến thể trước/sau công bố theo Vai trò.

### Quản trị viên

40. Danh sách/chi tiết Tài khoản.
41. Hàng chờ duyệt/từ chối Vai trò Giảng viên/Sinh viên.
42. Tạo Tài khoản P.KHCN ban đầu.
43. Khóa/mở khóa/đặt lại mật khẩu.

Các bề mặt 33–39 **không được xuất hiện cho Tài khoản chỉ có Vai trò Giảng viên hoặc Sinh viên mà không có assignment Hội đồng**.
