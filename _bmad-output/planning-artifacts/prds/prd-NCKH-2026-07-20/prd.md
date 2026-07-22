---
title: "PRD Hệ thống quản lý hoạt động nghiên cứu khoa học cấp trường"
status: final
created: 2026-07-20
updated: 2026-07-21
---

# PRD: Hệ thống quản lý hoạt động nghiên cứu khoa học cấp trường

## 0. Mục đích tài liệu

PRD này xác định sản phẩm và phạm vi MVP để Phòng Khoa học Công nghệ (P.KHCN), các đơn vị chuyên môn, nhóm người dùng nghiệp vụ và các nhóm UX, kiến trúc, Epic/Story cùng sử dụng một đường cơ sở. Tài liệu được chưng cất từ danh mục use case chi tiết, phân tích BM01–BM15 và sơ đồ use case tổng quan v5 trong `_bmad-output/brainstorming/`. Các yêu cầu được nhóm theo năng lực và đánh số ổn định; nội dung chưa được stakeholder chốt được đánh dấu `[ASSUMPTION]` và tổng hợp ở cuối tài liệu.

MVP bao phủ Bước 01–07 của quy trình cho cả đề tài giảng viên và đề tài sinh viên: đăng ký, xét duyệt hồ sơ, nộp và xét duyệt thuyết minh, thực hiện/báo cáo tiến độ, nghiệm thu, giải trình và lưu tài liệu hoàn tất. Bước 08–09 và các nghiệp vụ công nhận/ứng dụng sau hoàn tất nằm ngoài MVP.

## 1. Tầm nhìn

Hệ thống quản lý hoạt động nghiên cứu khoa học cấp trường là một không gian nghiệp vụ thống nhất để theo dõi hồ sơ, biểu mẫu, vai trò, trạng thái và bằng chứng đã ký trong suốt vòng đời đề tài. Sản phẩm thay thế việc theo dõi phân tán bằng bảng tính, thư điện tử và tệp rời bằng một quy trình có trạng thái, quyền truy cập và dấu vết xử lý rõ ràng.

Trong MVP, sản phẩm giúp P.KHCN vận hành đề tài từ Đợt đăng ký đến hết Bước 07; giúp Giảng viên và Sinh viên lập, nộp, sửa và theo dõi hồ sơ/tài liệu; giúp các cấp xét duyệt và ba Hội đồng thực hiện đúng trách nhiệm; đồng thời quản lý BM01–BM14 theo đúng loại: Biểu mẫu điện tử, tệp hoàn chỉnh tải lên hoặc văn bản được lập/ký bên ngoài hệ thống.

Sản phẩm quản lý luồng công việc và bằng chứng, gồm cả việc mở, theo dõi và kết thúc Cuộc họp Hội đồng. Hoạt động thảo luận chuyên môn, ký quyết định, ký hợp đồng, ký PDF và nghiệp vụ tài chính tiếp tục diễn ra bên ngoài hệ thống.

## 2. Người dùng mục tiêu

### 2.1. Vai trò nghiệp vụ

- **Giảng viên** — tạo Hồ sơ đăng ký đề tài giảng viên; có thể đồng thời thực hiện vai trò Giảng viên hướng dẫn đối với Hồ sơ đăng ký đề tài sinh viên được gán.
- **Sinh viên** — tạo và xử lý Hồ sơ đăng ký đề tài sinh viên.
- **Trưởng Khoa/Trưởng đơn vị** — xét duyệt tuyến đầu Hồ sơ đăng ký đề tài giảng viên thuộc đơn vị.
- **P.KHCN** — vận hành Đợt đăng ký, thiết lập Hội đồng, theo dõi quy trình; khi giữ vai trò Chủ tịch Hội đồng thì nộp Phiếu đánh giá và ký thứ hai trên Biên bản Hội đồng.
- **Thành viên Hội đồng** — xem hồ sơ/tài liệu được phân công và nộp Phiếu đánh giá BM02, BM06 hoặc BM11 theo giai đoạn; Chủ tịch Hội đồng thuộc nhóm đánh giá.
- **Thư ký Hội đồng** — không nộp Phiếu đánh giá; chỉ lập, ký và gửi Biên bản Hội đồng BM03, BM07 hoặc BM12 của đúng Cuộc họp được phân công.
- **Quản trị viên** — quản lý vòng đời Tài khoản, tạo Tài khoản ban đầu cho P.KHCN, khóa/mở khóa và hỗ trợ đặt lại mật khẩu; không mặc nhiên có quyền xét duyệt NCKH.

Một Tài khoản có thể mang nhiều Vai trò nghiệp vụ. Quyền được xác định theo Vai trò nghiệp vụ, Hội đồng và Hồ sơ đăng ký cụ thể, không chỉ theo danh tính người dùng.

### 2.2. Jobs To Be Done

- Khi mở một Đợt đăng ký, P.KHCN cần công bố đúng phạm vi và thời hạn để hồ sơ đi vào một quy trình nhất quán.
- Khi đăng ký đề tài, Giảng viên hoặc Sinh viên cần biết phải cung cấp gì, hồ sơ đang ở đâu và cần sửa gì để không theo dõi thủ công qua nhiều kênh.
- Khi xét duyệt tuyến đầu, Giảng viên hướng dẫn hoặc Trưởng Khoa/Trưởng đơn vị cần xử lý đúng hồ sơ thuộc trách nhiệm và chuyển hồ sơ hợp lệ sang Hội đồng mà không cần một bước tiếp nhận trung gian.
- Khi được mời từ ngoài Trường, Thành viên Hội đồng hoặc Thư ký Hội đồng cần đăng ký đúng email được mời, hoàn thiện Hồ sơ cá nhân và nhận đúng Vai trò trong đúng Hội đồng.
- Khi đánh giá, mọi Thành viên Hội đồng có trách nhiệm đánh giá, gồm Chủ tịch nhưng không gồm Thư ký, cần truy cập đúng hồ sơ/tài liệu, lập BM02/BM06/BM11 và nộp bằng chứng đã ký khi Cuộc họp tương ứng đang diễn ra.
- Khi lập Biên bản Hội đồng, Thư ký cần biết hệ thống đã nhận đủ 100% Phiếu đánh giá của các thành viên có trách nhiệm đánh giá, rồi lập BM03/BM07/BM12 và hoàn tất tuyến hai chữ ký trước khi Cuộc họp được kết thúc.
- Khi đề tài đi qua Bước 03–07, Chủ nhiệm đề tài cần nộp BM04, BM08, BM09, BM13 khi phát sinh và xem các quyết định/tài liệu liên quan mà không phải theo dõi tệp rời.
- Khi kiểm tra lại, P.KHCN cần biết ai đã làm gì, ở vai trò nào, vào thời điểm nào và trên phiên bản tài liệu nào.

### 2.3. Đối tượng không phải người dùng MVP

- Thành viên nhóm nghiên cứu ngoài Chủ nhiệm đề tài.
- Hiệu trưởng/Đại diện Nhà trường và Phòng Tài chính - Kế toán.
- Giảng viên hướng dẫn như một Tài khoản hoặc actor độc lập.
- Thư viện và các dịch vụ ký số/thông báo bên ngoài cho đến khi phạm vi tích hợp được xác nhận.

### 2.4. Hành trình người dùng chính

- **UJ-1. Minh, Sinh viên, nộp Hồ sơ đăng ký và theo dõi đến khi qua tuyến đầu.** Minh đăng nhập trong một Đợt đăng ký đang mở, tạo bản nháp BM01, bổ sung nhóm nghiên cứu, xem trước và xuất PDF. Minh ký ngoài hệ thống, tải PDF đã ký lên rồi bấm Nộp; lúc này Hồ sơ đăng ký bị khóa và chuyển đến Giảng viên hướng dẫn đã được gán. Nếu bị trả, Minh xem lý do, sửa và nộp lại. Khi được duyệt, Hồ sơ đăng ký tự chuyển vào tập đủ điều kiện lập Hội đồng.
- **UJ-2. Lan, Giảng viên, đăng ký đề tài của đơn vị.** Lan tạo Hồ sơ đăng ký đề tài giảng viên, hoàn thiện BM01 và nộp theo cùng pipeline PDF. Hồ sơ chuyển đến Trưởng Khoa/Trưởng đơn vị. Lan nhận kết quả, sửa nếu bị trả và biết khi hồ sơ đã đủ điều kiện lập Hội đồng mà không chờ P.KHCN xác nhận lại.
- **UJ-3. Hùng, chuyên gia ngoài Trường, tham gia Hội đồng qua lời mời.** P.KHCN thêm email của Hùng vào Hội đồng với Vai trò Thành viên Hội đồng. Hùng nhận lời mời, xác minh đúng email, tạo Tài khoản, cập nhật Hồ sơ cá nhân và được hệ thống gán quyền đúng Hội đồng. Khi P.KHCN mở Cuộc họp, Hùng xem Hồ sơ đăng ký, hoàn thiện BM02, ký ngoài hệ thống và nộp khi Cuộc họp đang diễn ra.
- **UJ-4. Mai, Thư ký Hội đồng, lập BM03.** Mai không nộp BM02 và không được tính trong mẫu số phiếu. Khi toàn bộ Thành viên Hội đồng có trách nhiệm đánh giá, gồm Chủ tịch, đã nộp BM02 hợp lệ, hệ thống tự tạo Mốc chốt phiếu bất biến và mở BM03. Mai lập, ký và nộp BM03 khi Cuộc họp vẫn đang diễn ra. Nếu bị trả, bản cũ mất hiệu lực và Mai nộp phiên bản mới trước khi Cuộc họp được kết thúc.
- **UJ-5. Dũng, cán bộ P.KHCN kiêm Chủ tịch Hội đồng, điều hành và công bố kết quả.** Dũng thiết lập Hội đồng, mời thành viên, mở Cuộc họp thủ công và theo dõi tiến độ mà không can thiệp nội dung chuyên môn. Với Vai trò Chủ tịch Hội đồng, Dũng nộp BM02 như mọi Thành viên Hội đồng. Khi nhận BM03 có chữ ký Thư ký Hội đồng, Dũng trả sửa kèm lý do hoặc ký bổ sung, tải bản đủ hai chữ ký lên và xác nhận hoàn tất. Chỉ khi đủ 100% BM02 và BM03 hoàn tất, Dũng mới được kết thúc Cuộc họp. Kết quả chuyển sang `Chờ công bố`; sau khi kiểm tra đúng BM03, Dũng thực hiện `Công bố kết quả` để người liên quan nhận thông báo và xem kết quả.
- **UJ-6. An, Giảng viên trong Trường, tự đăng ký và hoàn thiện Hồ sơ cá nhân.** An đăng ký bằng email thuộc miền của Trường, xác minh email và cập nhật Hồ sơ cá nhân. Sau khi loại người dùng được xác nhận, An nhận Vai trò Giảng viên và có thể tham gia các luồng nghiệp vụ phù hợp.
- **UJ-7. Lan, Chủ nhiệm đề tài, đi từ thuyết minh đến hoàn tất Bước 07.** Sau khi hồ sơ đạt BM03, Lan tải BM04 được soạn ngoài hệ thống. P.KHCN đăng BM05 và tổ chức Hội đồng xét duyệt thuyết minh; thành viên đánh giá nộp BM06, Thư ký lập BM07. Nếu được thực hiện, Lan lập BM08 và gửi theo tuyến Chủ nhiệm → Trưởng đơn vị ký/xác nhận → P.KHCN. Đến mốc nghiệm thu, Lan nộp BM09 và sản phẩm; P.KHCN tạo Hội đồng nghiệm thu và vận hành BM10–BM12 theo cùng mẫu Hội đồng xét duyệt thuyết minh. Lan chỉ nộp BM13 nếu BM12 yêu cầu sửa/giải trình, rồi xem BM14 hoàn chỉnh do P.KHCN lưu sau xử lý bên ngoài.

## 3. Thuật ngữ

- **Đợt đăng ký** — khoảng nghiệp vụ do P.KHCN cấu hình và công bố để tiếp nhận Hồ sơ đăng ký; tự đóng khi hết hạn.
- **Hồ sơ đăng ký** — tập dữ liệu và tài liệu đăng ký một đề tài, gồm loại đề tài, Chủ nhiệm đề tài, nhóm nghiên cứu và BM01.
- **Đề tài NCKH** — đối tượng nghiệp vụ được hình thành sau khi Hồ sơ đăng ký đạt xét duyệt hồ sơ; đi qua thuyết minh, thực hiện và nghiệm thu.
- **Hồ sơ cá nhân** — dữ liệu định danh và thông tin học thuật/nghiệp vụ của một Tài khoản, dùng để xác nhận Vai trò và điền Biểu mẫu điện tử.
- **Chủ nhiệm đề tài** — vai trò bao quát người chịu trách nhiệm Hồ sơ đăng ký; trong MVP là Giảng viên hoặc Sinh viên.
- **Giảng viên hướng dẫn** — vai trò của một Tài khoản Giảng viên trên Hồ sơ đăng ký đề tài sinh viên được gán; không phải actor hay Tài khoản riêng.
- **Trưởng Khoa/Trưởng đơn vị** — vai trò xét duyệt tuyến đầu Hồ sơ đăng ký đề tài giảng viên thuộc đơn vị.
- **P.KHCN** — Phòng Khoa học Công nghệ hoặc cán bộ được cấp quyền nghiệp vụ tương ứng.
- **Quản trị viên** — actor quản lý vòng đời Tài khoản và Tài khoản ban đầu của P.KHCN, tách biệt với quyền nghiệp vụ NCKH.
- **Hội đồng** — tập Vai trò nghiệp vụ được P.KHCN thiết lập cho một giai đoạn xét duyệt.
- **Cuộc họp Hội đồng** — đối tượng do P.KHCN tạo và mở thủ công để nhận Phiếu đánh giá, lập Biên bản Hội đồng và ghi nhận kết quả. Cuộc họp không có giờ kết thúc cấu hình trước; hệ thống không tổ chức thảo luận chuyên môn.
- **Thành viên Hội đồng** — người được phân công đánh giá trong một Hội đồng, gồm Chủ tịch Hội đồng nhưng không gồm Thư ký Hội đồng nếu người đó chỉ giữ vai trò thư ký.
- **Thư ký Hội đồng** — người được phân công lập Biên bản Hội đồng; không có trách nhiệm nộp Phiếu đánh giá và không được tính vào mẫu số 100% phiếu.
- **Chủ tịch Hội đồng** — vai trò do P.KHCN đảm nhiệm trong baseline; vừa nộp Phiếu đánh giá vừa ký thứ hai trên Biên bản Hội đồng.
- **Phiếu đánh giá** — BM02, BM06 hoặc BM11 do từng Thành viên Hội đồng có trách nhiệm đánh giá lập, ký ngoài hệ thống và nộp độc lập.
- **Tập phiếu** — toàn bộ Phiếu đánh giá của một Hội đồng tại Mốc chốt phiếu.
- **Mốc chốt phiếu** — thời điểm hệ thống xác nhận đã đủ 100% Phiếu đánh giá hợp lệ của các thành viên có trách nhiệm đánh giá để mở Biên bản Hội đồng; sau mốc này Tập phiếu bất biến.
- **Biên bản Hội đồng** — BM03, BM07 hoặc BM12 do Thư ký Hội đồng lập sau Mốc chốt phiếu và đi theo tuyến chữ ký Thư ký rồi Chủ tịch Hội đồng.
- **Biểu mẫu điện tử** — dữ liệu có cấu trúc được nhập và lưu trong hệ thống để xem trước và xuất PDF.
- **PDF đã ký** — tệp PDF được ký bên ngoài hệ thống rồi tải trở lại làm bằng chứng nộp.
- **Trạng thái tổng quan đề tài** — trạng thái dẫn xuất hiển thị cho người dùng biết đề tài đang ở giai đoạn nào; được ánh xạ từ trạng thái chi tiết của Hồ sơ đăng ký, Đề tài NCKH, Hội đồng và Biểu mẫu.
- **Công bố kết quả** — thao tác riêng của P.KHCN sau khi Cuộc họp kết thúc và Biên bản Hội đồng đủ hai chữ ký, mở quyền xem kết quả cho các actor liên quan.
- **Vai trò nghiệp vụ** — tập quyền gắn với ngữ cảnh nghiệp vụ cụ thể.
- **Tài khoản** — định danh đăng nhập có thể mang một hoặc nhiều Vai trò nghiệp vụ.
- **Actor** — cá nhân hoặc vai trò bên ngoài hệ thống trực tiếp thực hiện hay nhận kết quả của một hành động nghiệp vụ.

### 3.1. Chuỗi Trạng thái tổng quan đề tài

| Trạng thái chi tiết hoặc sự kiện nguồn | Trạng thái tổng quan đề tài |
|---|---|
| Hồ sơ đăng ký đang soạn | `Nháp` |
| Hồ sơ đăng ký đã nộp cho Giảng viên hướng dẫn hoặc Trưởng Khoa/Trưởng đơn vị | `Chờ duyệt cấp đầu` |
| Hồ sơ đăng ký bị trả | `Trả chỉnh sửa` |
| Hồ sơ đăng ký đã nộp lại | `Chờ duyệt lại` |
| Hồ sơ đăng ký đã qua tuyến đầu, Cuộc họp xét duyệt hồ sơ chưa mở | `Chờ Hội đồng xét duyệt hồ sơ` |
| Cuộc họp xét duyệt hồ sơ đang diễn ra | `Đang xét duyệt hồ sơ` |
| BM03 kết luận đạt | `Đạt xét duyệt hồ sơ` |
| BM03 kết luận không đạt | `Không đạt xét duyệt hồ sơ` |
| Hồ sơ đạt nhưng chưa nộp thuyết minh | `Chờ nộp thuyết minh` |
| Hội đồng xét duyệt thuyết minh đang xử lý | `Đang xét duyệt thuyết minh` |
| BM07 kết luận không thực hiện | `Thuyết minh không đạt` |
| BM07 kết luận thực hiện | `Đang thực hiện` |
| Đề tài đã nộp báo cáo giữa kỳ | `Đang thực hiện — đã nộp báo cáo giữa kỳ` |
| Đã nộp báo cáo tổng kết và sản phẩm | `Chờ nghiệm thu` |
| Cuộc họp nghiệm thu đang diễn ra | `Đang nghiệm thu` |
| BM12 kết luận đạt và không yêu cầu xử lý tiếp | `Đã nghiệm thu` |
| BM12 yêu cầu chỉnh sửa/giải trình | `Chờ giải trình sau nghiệm thu` |
| Chủ nhiệm đã nộp BM13 | `Chờ xác nhận giải trình` |
| Các điều kiện hoàn tất Bước 07 đã được xác nhận | `Hoàn tất Bước 07` |
| BM12 kết luận không đạt | `Không đạt nghiệm thu` |
| Yêu cầu hủy được chấp thuận | `Đã hủy` |
| Hồ sơ đăng ký hết hạn | `Quá hạn` |
| Đề tài giao trực tiếp đã có người khác được chọn | `Không được chọn` |

Các mốc `Đã tải PDF ký` và `Đã nộp` thuộc trạng thái Biểu mẫu hoặc lịch sử sự kiện. Riêng `Đã nộp lại` được ánh xạ thành `Chờ duyệt lại`. Báo cáo giữa kỳ là thông tin bổ sung của giai đoạn `Đang thực hiện`, không tạo một giai đoạn vòng đời độc lập.

MVP hiện tại bao phủ toàn bộ trạng thái từ `Nháp` đến các kết quả của Bước 07. Khi BM12 yêu cầu sửa/giải trình, đề tài đi theo chuỗi `Chờ giải trình sau nghiệm thu` → `Chờ xác nhận giải trình` → `Hoàn tất Bước 07`; nếu BM12 không yêu cầu sửa, hệ thống bỏ qua hai trạng thái giải trình. Các trạng thái công nhận/ứng dụng sau Bước 07 thuộc hướng mở rộng và không làm thay đổi phạm vi tại §8.

## 4. Tính năng và yêu cầu chức năng

FR-30 đã được loại khỏi baseline khi bỏ cơ chế gia hạn BM03. Mã này không được tái sử dụng; FR-36 trở đi được bổ sung theo thứ tự quyết định để bảo toàn tham chiếu lịch sử.

### 4.1. Truy cập theo Vai trò nghiệp vụ

**Mô tả:** Hệ thống cho phép tự đăng ký có kiểm soát, đăng ký qua lời mời và một Tài khoản thực hiện nhiều Vai trò nghiệp vụ nhưng chỉ truy cập dữ liệu và hành động đúng ngữ cảnh được phân công. Thực hiện UJ-1 đến UJ-6.

#### FR-1: Xác thực Tài khoản

Người dùng có thể đăng nhập và đăng xuất để truy cập hệ thống sau khi Tài khoản được xác minh và kích hoạt.

**Điều kiện kiểm thử:**
- Người chưa đăng nhập không truy cập được dữ liệu nghiệp vụ.
- Phiên đăng nhập kết thúc sau khi đăng xuất hoặc hết thời hạn phiên.

#### FR-2: Phân quyền theo ngữ cảnh

Hệ thống chỉ cho phép Tài khoản xem và thao tác theo Vai trò nghiệp vụ, Đợt đăng ký, đơn vị, Hội đồng và Hồ sơ đăng ký được gán.

**Điều kiện kiểm thử:**
- Giảng viên hướng dẫn chỉ xét duyệt Hồ sơ đăng ký đề tài sinh viên được gán.
- Trưởng Khoa/Trưởng đơn vị chỉ xét duyệt Hồ sơ đăng ký đề tài giảng viên thuộc đơn vị.
- Thành viên Hội đồng chỉ xem Hồ sơ đăng ký và Phiếu đánh giá của Hội đồng được phân công.

#### FR-3: Một Tài khoản mang nhiều Vai trò nghiệp vụ

Một Tài khoản có thể thực hiện nhiều Vai trò nghiệp vụ mà không cần tạo Tài khoản trùng lặp.

**Điều kiện kiểm thử:**
- Tài khoản có nhiều Vai trò nghiệp vụ có thể chuyển đúng ngữ cảnh làm việc.
- Hệ thống ghi nhận Vai trò nghiệp vụ được sử dụng cho từng hành động.

#### FR-36: Tự đăng ký bằng email Trường

Giảng viên và Sinh viên có thể tự đăng ký bằng email thuộc miền dùng chung được Trường chấp nhận, xác minh email, chọn loại người dùng, nhập mã Giảng viên/mã Sinh viên và cập nhật Hồ sơ cá nhân.

**Điều kiện kiểm thử:**
- Hệ thống không kích hoạt Tài khoản khi email chưa được xác minh.
- Do Giảng viên và Sinh viên dùng chung miền email, hệ thống không tự suy ra loại người dùng từ địa chỉ email.
- Sau khi xác minh email, Tài khoản chuyển sang trạng thái `Chờ xác nhận vai trò` và chưa có quyền nghiệp vụ.
- Quản trị viên có thể duyệt hoặc từ chối yêu cầu vai trò dựa trên loại người dùng, mã định danh và Hồ sơ cá nhân đã khai.
- Chỉ sau khi được duyệt, Tài khoản mới nhận Vai trò Giảng viên hoặc Sinh viên.
- Một email không thể tạo nhiều Tài khoản.

#### FR-37: Đăng ký qua lời mời Hội đồng

P.KHCN có thể thêm email người ngoài vào Hội đồng với Vai trò Thành viên Hội đồng hoặc Thư ký Hội đồng; hệ thống gửi lời mời để người đó đăng ký, xác minh email và cập nhật Hồ sơ cá nhân.

**Điều kiện kiểm thử:**
- Lời mời gắn với đúng email, Hội đồng và Vai trò nghiệp vụ.
- Sau khi xác minh đúng email, hệ thống gán quyền trong đúng Hội đồng; không cấp quyền Hội đồng khác.
- Nếu email đã có Tài khoản, lời mời được gắn vào Tài khoản hiện có thay vì tạo Tài khoản trùng lặp.

#### FR-38: Quản lý vòng đời Tài khoản

Quản trị viên có thể tạo Tài khoản ban đầu cho P.KHCN, xác nhận Vai trò Giảng viên/Sinh viên, khóa, mở khóa và đặt lại mật khẩu mà không xóa lịch sử nghiệp vụ.

**Điều kiện kiểm thử:**
- Quản trị viên không mặc nhiên có quyền xét duyệt NCKH.
- Không sử dụng Tài khoản chung mang tên Thành viên Hội đồng hoặc Thư ký Hội đồng.
- Khóa Tài khoản không làm mất dữ liệu, Vai trò hoặc lịch sử đã phát sinh.

### 4.2. Quản lý Đợt đăng ký

**Mô tả:** P.KHCN chuẩn bị, công bố và theo dõi Đợt đăng ký; hệ thống tự đóng Đợt đăng ký khi hết hạn. Thực hiện UJ-1, UJ-2 và UJ-5.

#### FR-4: Tạo và cấu hình Đợt đăng ký

P.KHCN có thể tạo Đợt đăng ký, chọn loại đợt, đặt thời gian bắt đầu/kết thúc và quản lý danh mục đề tài giao trực tiếp. Bộ trạng thái tối thiểu là `Nháp`, `Đã công bố` và `Đã đóng`.

**Điều kiện kiểm thử:**
- Thời gian kết thúc phải sau thời gian bắt đầu.
- Đợt đăng ký ở trạng thái Nháp chưa hiển thị cho người đăng ký.

#### FR-5: Cập nhật và công bố Đợt đăng ký

P.KHCN có thể cập nhật Đợt đăng ký trước mốc khóa và công bố để người dùng liên quan xem, đăng ký.

**Điều kiện kiểm thử:**
- Hệ thống ngăn công bố khi thiếu dữ liệu bắt buộc.
- Sau khi công bố, P.KHCN chỉ được sửa nội dung không làm thay đổi tính hợp lệ của Hồ sơ đăng ký đã nộp.

#### FR-6: Tự đóng Đợt đăng ký

Hệ thống tự đóng Đợt đăng ký khi hết hạn và không cung cấp thao tác đóng thủ công trước hạn.

**Điều kiện kiểm thử:**
- Không thể tạo Hồ sơ đăng ký mới hoặc nộp Hồ sơ đăng ký sau hạn.
- Hồ sơ nháp còn tồn tại nhưng không thể nộp sau hạn.

#### FR-7: Xem và theo dõi Đợt đăng ký

Người dùng có liên quan có thể xem danh sách, thông tin và trạng thái Đợt đăng ký theo quyền; P.KHCN có thể theo dõi số lượng Hồ sơ đăng ký theo trạng thái.

**Điều kiện kiểm thử:**
- Người dùng chỉ thấy Đợt đăng ký thuộc phạm vi được công bố cho mình.
- Số lượng Hồ sơ đăng ký theo trạng thái trên màn hình P.KHCN khớp với dữ liệu chi tiết tại thời điểm truy vấn.

### 4.3. Lập và nộp Hồ sơ đăng ký BM01

**Mô tả:** Giảng viên và Sinh viên lập Hồ sơ đăng ký theo Biểu mẫu điện tử, xuất PDF để ký bên ngoài và nộp bằng chứng. Thực hiện UJ-1 và UJ-2.

#### FR-8: Tạo Hồ sơ đăng ký nháp

Giảng viên hoặc Sinh viên có thể tạo Hồ sơ đăng ký nháp phù hợp với loại đề tài và Đợt đăng ký đang mở.

**Điều kiện kiểm thử:**
- Loại BM01 và tuyến xét duyệt được xác định từ loại Chủ nhiệm đề tài.
- Hồ sơ nháp chỉ hiển thị cho người có quyền.

#### FR-9: Cập nhật dữ liệu BM01 và nhóm nghiên cứu

Chủ nhiệm đề tài có thể nhập, lưu và cập nhật đầy đủ dữ liệu BM01, gồm thông tin nhóm nghiên cứu, trước khi nộp.

**Điều kiện kiểm thử:**
- Thành viên nhóm nghiên cứu được lưu như dữ liệu Hồ sơ đăng ký, không được tạo quyền đăng nhập từ hành động này.
- Hệ thống giữ dữ liệu nháp qua nhiều phiên làm việc.

#### FR-10: Kiểm tra điều kiện nộp BM01

Hệ thống kiểm tra toàn bộ trường áp dụng và điều kiện nghiệp vụ trước khi cho phép nộp Hồ sơ đăng ký. Mọi trường hiển thị cho nhánh nghiệp vụ hiện tại đều bắt buộc; trường có điều kiện chỉ bắt buộc khi điều kiện tương ứng phát sinh. Danh mục trường được đối chiếu trực tiếp với BM01A/B bản gốc trong đặc tả.

#### FR-11: Xem trước và xuất PDF BM01

Chủ nhiệm đề tài có thể xem trước và xuất PDF BM01 từ dữ liệu Biểu mẫu điện tử nhiều lần trước khi nộp.

**Điều kiện kiểm thử:**
- Xuất PDF không khóa Biểu mẫu điện tử.
- PDF thể hiện đúng loại BM01 và dữ liệu tại thời điểm xuất.

#### FR-12: Tải PDF đã ký và nộp BM01

Chủ nhiệm đề tài có thể tải PDF đã ký lên bản nháp và bấm Nộp để chính thức gửi Hồ sơ đăng ký.

**Điều kiện kiểm thử:**
- Tải PDF đã ký nhưng chưa bấm Nộp không khóa Biểu mẫu điện tử.
- Bấm Nộp chỉ thành công khi có PDF đã ký hợp lệ về định dạng và dung lượng. PDF là định dạng bắt buộc; giới hạn dung lượng được cấu hình theo chính sách tệp.
- Sau khi nộp, Biểu mẫu điện tử bị khóa và hành động được ghi vào lịch sử.

#### FR-13: Xem trạng thái Hồ sơ đăng ký

Chủ nhiệm đề tài và actor xét duyệt liên quan có thể xem trạng thái hiện tại, bước xử lý và kết quả của Hồ sơ đăng ký theo quyền.

**Điều kiện kiểm thử:**
- Trạng thái hiển thị khớp với phép chuyển trạng thái gần nhất trong nhật ký.
- Người dùng biết actor hoặc bước đang chịu trách nhiệm xử lý tiếp theo.
- Lý do trả hoặc kết quả xử lý chỉ hiển thị cho actor có quyền.

### 4.4. Xét duyệt tuyến đầu

**Mô tả:** Hồ sơ đăng ký đề tài sinh viên đi qua Giảng viên hướng dẫn; Hồ sơ đăng ký đề tài giảng viên đi qua Trưởng Khoa/Trưởng đơn vị. Hồ sơ được duyệt tự chuyển sang tập đủ điều kiện lập Hội đồng. Thực hiện UJ-1 và UJ-2.

#### FR-14: Chuyển đúng tuyến xét duyệt

Sau khi nộp, hệ thống tự chuyển Hồ sơ đăng ký đề tài sinh viên đến Giảng viên hướng dẫn được gán và Hồ sơ đăng ký đề tài giảng viên đến Trưởng Khoa/Trưởng đơn vị.

**Điều kiện kiểm thử:**
- Hệ thống chặn nộp Hồ sơ sinh viên nếu chưa có Giảng viên hướng dẫn hợp lệ.
- Hồ sơ không xuất hiện trong hàng chờ của actor ngoài tuyến được xác định.
- Lần chuyển tuyến được ghi nhận trong nhật ký trạng thái.

#### FR-15: Duyệt Hồ sơ đăng ký

Actor xét duyệt tuyến đầu có thể duyệt Hồ sơ đăng ký thuộc trách nhiệm.

**Điều kiện kiểm thử:**
- Hồ sơ được duyệt tự vào tập đủ điều kiện lập Hội đồng.
- Không có bước P.KHCN tiếp nhận hoặc xác nhận trung gian.
- Actor không thể duyệt Hồ sơ đăng ký ngoài phạm vi trách nhiệm.

#### FR-16: Trả Hồ sơ đăng ký để sửa

Actor xét duyệt tuyến đầu có thể trả Hồ sơ đăng ký cho Chủ nhiệm đề tài kèm lý do bắt buộc.

#### FR-17: Sửa và nộp lại Hồ sơ đăng ký

Chủ nhiệm đề tài có thể sửa Hồ sơ đăng ký bị trả, tạo PDF đã ký mới và nộp lại về đúng tuyến xét duyệt.

**Điều kiện kiểm thử:**
- Hệ thống giữ lịch sử các lần nộp và lý do trả.
- Bản đã nộp trước không bị ghi đè.

#### FR-18: Yêu cầu và xử lý hủy Hồ sơ đăng ký

Chủ nhiệm đề tài có thể gửi yêu cầu hủy trước khi Đề tài NCKH bước vào trạng thái `Chờ nghiệm thu`; P.KHCN có thể chấp thuận hoặc từ chối.

**Điều kiện kiểm thử:**
- Hồ sơ hoặc Đề tài đã hủy không bị xóa và toàn bộ lịch sử được giữ lại.
- Từ trạng thái `Chờ nghiệm thu` trở đi, hệ thống không cho gửi yêu cầu hủy theo luồng thông thường.
- Kết quả xử lý và lý do được thông báo cho Chủ nhiệm đề tài.

### 4.5. Thiết lập Hội đồng và Cuộc họp theo ba giai đoạn

**Mô tả:** P.KHCN tạo Hội đồng và Cuộc họp cho xét duyệt hồ sơ, xét duyệt thuyết minh và nghiệm thu; phân công Vai trò nghiệp vụ, mở Cuộc họp thủ công và theo dõi việc nộp Phiếu đánh giá. Hệ thống quản lý vòng đời Cuộc họp nhưng không tổ chức thảo luận chuyên môn. Thực hiện UJ-3 đến UJ-5 và UJ-7.

#### FR-19: Tạo Hội đồng

P.KHCN có thể tạo Hội đồng và Cuộc họp tương ứng cho một trong ba giai đoạn, gắn đúng hồ sơ/tài liệu đầu vào, phân công Chủ tịch Hội đồng, Thư ký Hội đồng và Thành viên Hội đồng.

**Điều kiện kiểm thử:**
- Mỗi Hội đồng có đúng một Chủ tịch Hội đồng và một Thư ký Hội đồng.
- Chủ tịch Hội đồng thuộc danh sách người đánh giá; Thư ký Hội đồng là vai trò riêng và không thuộc mẫu số Phiếu đánh giá.

#### FR-20: Cập nhật Hội đồng trước mốc khóa

Khi Hội đồng còn ở trạng thái `Nháp`, P.KHCN có thể cập nhật thông tin hành chính, hồ sơ được xét duyệt, danh sách thành viên, Vai trò và lời mời. Khi P.KHCN mở Cuộc họp, toàn bộ cấu trúc này bị khóa.

**Điều kiện kiểm thử:**
- Sau khi Cuộc họp được mở, P.KHCN không thể thêm, xóa, thay Thành viên Hội đồng, đổi Vai trò hoặc thay hồ sơ được xét duyệt.
- Hệ thống không cho thay đổi mẫu số bằng cách loại người chưa nộp Phiếu đánh giá.
- Mọi thay đổi trước mốc khóa được ghi lịch sử.

#### FR-21: Theo dõi tiến độ Hội đồng

P.KHCN và Thư ký Hội đồng có thể xem tổng số người có trách nhiệm đánh giá, số Phiếu đánh giá đã nộp, số phiếu hợp lệ và tình trạng đạt đủ 100%. Thư ký được hiển thị riêng, không nằm trong mẫu số.

#### FR-39: Mở Cuộc họp Hội đồng

P.KHCN có thể mở Cuộc họp thủ công; hệ thống ghi thời điểm mở và chuyển Cuộc họp sang trạng thái `Đang diễn ra` mà không cấu hình trước giờ kết thúc.

**Điều kiện kiểm thử:**
- Tất cả Thành viên Hội đồng phải có Tài khoản hoạt động và người ngoài phải chấp nhận lời mời trước khi mở.
- Hội đồng phải có đủ Chủ tịch Hội đồng, Thư ký Hội đồng, Thành viên Hội đồng và hồ sơ/tài liệu đầu vào tương ứng trước khi mở.
- Chỉ Thành viên Hội đồng có trách nhiệm đánh giá của Cuộc họp đang diễn ra mới được nộp Phiếu đánh giá; Thư ký không có quyền nộp phiếu bằng vai trò thư ký.
- Không có hạn chót riêng cho Phiếu đánh giá hoặc Biên bản Hội đồng ngoài trạng thái mở của Cuộc họp.
- Hệ thống thông báo trạng thái Cuộc họp cho người liên quan.

#### FR-40: Kết thúc Cuộc họp Hội đồng

P.KHCN có thể kết thúc Cuộc họp thủ công chỉ sau khi đủ 100% Phiếu đánh giá hợp lệ và Biên bản tương ứng BM03/BM07/BM12 đã hoàn tất tuyến hai chữ ký.

**Điều kiện kiểm thử:**
- Hệ thống chặn kết thúc nếu thiếu bất kỳ Phiếu đánh giá nào.
- Hệ thống chặn kết thúc nếu Biên bản tương ứng chưa có trạng thái hoàn tất.
- Khi kết thúc, hệ thống ghi người thao tác và thời điểm kết thúc thực tế.

#### FR-41: Hủy và tạo Cuộc họp thay thế

Nếu phát hiện sai cấu hình hoặc có Thành viên Hội đồng không thể tiếp tục sau khi Cuộc họp đã mở, P.KHCN có thể hủy Cuộc họp kèm lý do và tạo Cuộc họp thay thế.

**Điều kiện kiểm thử:**
- Không chỉnh sửa cấu trúc của Cuộc họp đã mở để xử lý sai sót.
- Cuộc họp bị hủy, danh sách thành viên, Phiếu đánh giá và tài liệu đã phát sinh được giữ nguyên để truy vết.
- Cuộc họp thay thế liên kết với Cuộc họp bị hủy và Hồ sơ đăng ký tương ứng.
- Phiếu hoặc Biên bản của Cuộc họp bị hủy không được tái sử dụng như tài liệu hợp lệ của Cuộc họp thay thế.

#### FR-42: Công bố kết quả Hội đồng

Sau khi BM03/BM07/BM12 đủ hai chữ ký và Cuộc họp tương ứng đã kết thúc, kết quả chuyển sang `Chờ công bố`; P.KHCN có thể kiểm tra tài liệu và chủ động thực hiện `Công bố kết quả`.

**Điều kiện kiểm thử:**
- Hệ thống không tự động công bố khi Biên bản hoàn tất hoặc khi Cuộc họp kết thúc.
- Trước công bố, chỉ P.KHCN, Chủ tịch Hội đồng và Thư ký Hội đồng được xem kết quả tổng hợp; Thành viên Hội đồng chỉ xem Phiếu đánh giá của mình và tài liệu được phân quyền.
- Sau công bố, Chủ nhiệm đề tài, Giảng viên hướng dẫn nếu có, Trưởng Khoa/Trưởng đơn vị, toàn bộ Thành viên Hội đồng, Thư ký Hội đồng, Chủ tịch Hội đồng và P.KHCN được xem kết quả theo quyền.
- Hệ thống gửi thông báo trong ứng dụng cho toàn bộ actor liên quan khi kết quả được công bố.
- Kết quả đã công bố không được sửa trực tiếp; sai sót phải được xử lý bằng phiên bản điều chỉnh có lý do, người thực hiện và lịch sử liên kết với phiên bản trước.

### 4.6. Phiếu đánh giá BM02, BM06 và BM11

**Mô tả:** Mỗi Thành viên Hội đồng có trách nhiệm đánh giá lập và nộp một Phiếu đánh giá độc lập theo giai đoạn: BM02, BM06 hoặc BM11. Chủ tịch Hội đồng nộp phiếu; Thư ký Hội đồng không nộp phiếu. Thực hiện UJ-3, UJ-5 và UJ-7.

#### FR-22: Truy cập hồ sơ phục vụ đánh giá

Thành viên Hội đồng có thể xem hồ sơ/tài liệu chính thức phục vụ giai đoạn đánh giá của Hội đồng được phân công.

**Điều kiện kiểm thử:**
- Thành viên chỉ xem Hồ sơ đăng ký gắn với Hội đồng và Vai trò hiện hành.
- Phiên bản hiển thị là phiên bản chính thức được chuyển đến Hội đồng: BM01 cho xét duyệt hồ sơ; BM04 và BM05 cho xét duyệt thuyết minh; BM09 và BM10 cho nghiệm thu.
- Quyền xem bị thu hồi khi Cuộc họp bị hủy, trừ quyền xem lịch sử được cấp theo Vai trò.

#### FR-23: Lập Phiếu đánh giá cá nhân

Mỗi Thành viên Hội đồng có thể nhập, lưu và cập nhật BM02/BM06/BM11 cá nhân theo đúng giai đoạn trước khi nộp. Mọi trường áp dụng đều bắt buộc; trường có điều kiện chỉ bắt buộc khi điều kiện tương ứng phát sinh.

**Điều kiện kiểm thử:**
- Hệ thống tạo đúng loại Phiếu đánh giá riêng cho từng Thành viên Hội đồng có trách nhiệm đánh giá.
- Thành viên Hội đồng không xem hoặc sửa Phiếu đánh giá nháp của người khác.
- Hệ thống không tạo Phiếu đánh giá cho Tài khoản chỉ giữ vai trò Thư ký Hội đồng trong Cuộc họp đó.

#### FR-24: Xem trước, xuất và nộp Phiếu đánh giá

Thành viên Hội đồng có thể xem trước, xuất PDF, ký ngoài hệ thống, tải PDF đã ký và bấm Nộp BM02/BM06/BM11 khi Cuộc họp tương ứng đang diễn ra.

**Điều kiện kiểm thử:**
- Phiếu đánh giá bị khóa sau khi nộp.
- Phiếu chỉ được tính hợp lệ nếu được nộp trong Cuộc họp đang diễn ra và trước Mốc chốt phiếu.
- Chủ tịch Hội đồng tuân theo cùng yêu cầu nộp phiếu; Thư ký Hội đồng không có nghĩa vụ hoặc quyền nộp phiếu theo vai trò thư ký.

### 4.7. Chốt Tập phiếu và lập BM03, BM07, BM12

**Mô tả:** Khi đủ 100% BM02/BM06/BM11 hợp lệ của các thành viên có trách nhiệm đánh giá, hệ thống tự chốt Tập phiếu và mở BM03/BM07/BM12 để Thư ký lập Biên bản theo tuyến hai chữ ký trong khi Cuộc họp vẫn đang diễn ra. Thực hiện UJ-4, UJ-5 và UJ-7.

#### FR-25: Kiểm tra điều kiện đủ 100% phiếu

Hệ thống tính điều kiện mở Biên bản theo công thức `số Phiếu đánh giá hợp lệ = tổng số Thành viên Hội đồng có trách nhiệm đánh giá`.

**Điều kiện kiểm thử:**
- Hội đồng có 5 người đánh giá và 1 Thư ký phải có đủ 5 Phiếu đánh giá hợp lệ; Thư ký không tạo phiếu thứ sáu.
- Tổng số gồm Chủ tịch Hội đồng và toàn bộ Thành viên Hội đồng có trách nhiệm đánh giá; không gồm Thư ký Hội đồng.
- Nếu chưa đủ 100%, hệ thống không chốt Tập phiếu, không mở Biên bản và không cho kết thúc Cuộc họp.

#### FR-26: Tự động tạo Mốc chốt phiếu

Khi đã đủ 100% Phiếu đánh giá hợp lệ, hệ thống tự động tạo Mốc chốt phiếu, khóa Tập phiếu và mở Biên bản tương ứng cho Thư ký Hội đồng.

**Điều kiện kiểm thử:**
- Sau Mốc chốt phiếu, Tập phiếu bất biến và quyền nộp Phiếu đánh giá bị khóa.
- P.KHCN không thể mở lại quyền nộp Phiếu đánh giá.
- Hệ thống lưu thời điểm tự động chốt, số phiếu hợp lệ và tổng số người có trách nhiệm đánh giá tại Mốc chốt phiếu.

#### FR-27: Lập và nộp Biên bản có chữ ký Thư ký Hội đồng

Sau Mốc chốt phiếu, Thư ký Hội đồng có thể lập đầy đủ BM03/BM07/BM12 theo giai đoạn, xem trước, xuất PDF, ký ngoài hệ thống, tải PDF đã ký và bấm Nộp cho Chủ tịch Hội đồng khi Cuộc họp đang diễn ra.

**Điều kiện kiểm thử:**
- Biên bản bao gồm toàn bộ trường áp dụng của biểu mẫu gốc, kể cả ngày, giờ và địa điểm Cuộc họp.
- Sau khi nộp, Biểu mẫu điện tử BM03/BM07/BM12 bị khóa.

#### FR-28: Kiểm tra và trả Biên bản Hội đồng

Chủ tịch Hội đồng có thể kiểm tra BM03/BM07/BM12 và trả cho Thư ký Hội đồng kèm lý do để sửa; không có thao tác từ chối vĩnh viễn.

**Điều kiện kiểm thử:**
- Lý do trả là bắt buộc.
- Biên bản chuyển sang trạng thái `Trả chỉnh sửa` và chỉ Thư ký Hội đồng tương ứng được sửa.
- Cuộc họp không thể kết thúc khi Biên bản đang ở trạng thái `Trả chỉnh sửa`.

#### FR-29: Sửa và nộp lại Biên bản Hội đồng

Thư ký Hội đồng có thể sửa Biên bản bị trả và nộp bản có chữ ký mới khi Cuộc họp vẫn đang diễn ra.

**Điều kiện kiểm thử:**
- PDF và bằng chứng chữ ký của bản cũ mất hiệu lực khi nội dung được sửa.
- Mỗi vòng sửa/nộp lại được lưu thành phiên bản riêng.
- Cuộc họp không thể kết thúc khi Biên bản đang bị trả sửa hoặc chưa hoàn tất.

#### FR-31: Hoàn tất Biên bản bằng chữ ký thứ hai

Chủ tịch Hội đồng có thể tải bản BM03/BM07/BM12 có chữ ký Thư ký Hội đồng, ký bổ sung ngoài hệ thống, tải bản đủ hai chữ ký lên và xác nhận hoàn tất.

**Điều kiện kiểm thử:**
- Hệ thống giữ cả phiên bản có chữ ký Thư ký Hội đồng và phiên bản đủ hai chữ ký.
- Trạng thái hoàn tất chỉ được đặt khi có bản đủ hai chữ ký.
- Hành động hoàn tất ghi nhận Tài khoản, Vai trò Chủ tịch Hội đồng, thời điểm và phiên bản PDF.

### 4.8. Thuyết minh, thực hiện, nghiệm thu và hoàn tất Bước 07

**Mô tả:** Sau khi đạt xét duyệt hồ sơ, Đề tài NCKH tiếp tục được quản lý đến hết Bước 07. Hệ thống phân biệt tài liệu do người dùng tải lên, Biểu mẫu điện tử được lập trong hệ thống và quyết định/tài liệu được lập, ký bên ngoài rồi lưu vào hệ thống. Thực hiện UJ-7.

#### FR-43: Nộp thuyết minh BM04

Sau khi BM03 kết luận đạt, Chủ nhiệm đề tài có thể tải BM04A/B hoàn chỉnh được soạn ngoài hệ thống lên Đề tài NCKH để chuyển sang xét duyệt thuyết minh.

**Điều kiện kiểm thử:**
- Hệ thống không cung cấp form soạn hoặc sinh PDF BM04.
- Mỗi lần nộp BM04 tạo một phiên bản bất biến; phiên bản được chuyển Hội đồng phải được chỉ rõ.
- Không cho nộp BM04 nếu hồ sơ chưa đạt xét duyệt hồ sơ hoặc Đề tài đã bị hủy.

#### FR-44: Đăng quyết định Hội đồng xét duyệt thuyết minh BM05

P.KHCN có thể tải và công bố BM05 đã được lập/ký bên ngoài, rồi dùng danh sách Hội đồng tương ứng để tạo Cuộc họp xét duyệt thuyết minh.

**Điều kiện kiểm thử:**
- Hệ thống không soạn, phê duyệt hoặc ký BM05.
- BM05 được gắn đúng phiên bản, Hội đồng và Đề tài NCKH; actor có quyền có thể xem/tải sau khi công bố.

#### FR-45: Ghi nhận kết quả xét duyệt thuyết minh

Sau khi BM07 hoàn tất, Cuộc họp kết thúc và P.KHCN công bố kết quả, hệ thống chuyển Trạng thái tổng quan đề tài sang `Thuyết minh không đạt` hoặc `Đang thực hiện` theo kết luận chính thức.

**Điều kiện kiểm thử:**
- Trạng thái chỉ được dẫn xuất từ BM07 hiện hành đã công bố, không nhập tay độc lập.
- Phiên bản điều chỉnh kết quả tuân theo FR-42 và giữ lịch sử.

#### FR-46: Lập, ký tuần tự và nộp báo cáo tiến độ BM08

Trong giai đoạn `Đang thực hiện`, Chủ nhiệm đề tài có thể lập BM08 và gửi theo tuyến ký tuần tự `Chủ nhiệm đề tài → Trưởng Khoa/Trưởng đơn vị → P.KHCN` ngay trong luồng hệ thống. Mỗi người nhận đúng phiên bản do bước trước chuyển đến; chữ ký vẫn được thực hiện trên PDF bên ngoài hệ thống rồi tải lại trước khi bấm gửi/duyệt.

**Điều kiện kiểm thử:**
- Mọi trường áp dụng của BM08 là bắt buộc theo §6.3.
- Chủ nhiệm chỉ có thể gửi khi đã tải bản có chữ ký của mình; Trưởng Khoa/Trưởng đơn vị có thể trả kèm lý do hoặc ký bổ sung và chuyển P.KHCN.
- Nếu nội dung thay đổi sau một chữ ký, hệ thống tạo phiên bản mới và vô hiệu hóa chữ ký/duyệt phía sau trên phiên bản cũ.
- P.KHCN ghi nhận đã nhận báo cáo; báo cáo hoàn tất tuyến hiển thị trong lịch sử và cập nhật chi tiết `Đang thực hiện — đã nộp báo cáo giữa kỳ`.

#### FR-47: Nộp báo cáo tổng kết và sản phẩm BM09

Chủ nhiệm đề tài có thể tải BM09 hoàn chỉnh cùng các tệp sản phẩm được yêu cầu lên Đề tài NCKH trước mốc nghiệm thu để đề nghị Hội đồng đánh giá.

**Điều kiện kiểm thử:**
- Hệ thống lưu riêng phiên bản báo cáo và từng tệp sản phẩm, không ghi đè lần nộp trước.
- Nguồn tài liệu chính thức được chuyển Hội đồng nghiệm thu phải được chỉ rõ.
- P.KHCN có thể trả hồ sơ thiếu tệp kèm lý do; chỉ bộ BM09/sản phẩm được đánh dấu đủ thành phần mới được gắn vào Cuộc họp nghiệm thu.

#### FR-48: Đăng quyết định Hội đồng nghiệm thu BM10

Đến mốc nghiệm thu của đề tài, P.KHCN có thể tải và công bố BM10 đã được lập/ký bên ngoài, rồi tạo Hội đồng và Cuộc họp nghiệm thu. Luồng đánh giá áp dụng cùng cấu trúc với xét duyệt thuyết minh: Thành viên/Chủ tịch nộp BM11, hệ thống tự chốt khi đủ 100%, Thư ký lập BM12 và Chủ tịch ký thứ hai.

**Điều kiện kiểm thử:**
- Hệ thống không soạn, phê duyệt hoặc ký BM10.
- BM10 được gắn đúng Hội đồng, Đề tài NCKH và bộ BM09/sản phẩm được nghiệm thu.
- Không mở Cuộc họp nghiệm thu nếu chưa có bộ BM09/sản phẩm chính thức hoặc chưa đủ cơ cấu Hội đồng.

#### FR-49: Lập và nộp giải trình BM13

BM13 chỉ phát sinh khi BM12 hiện hành kết luận đề tài cần sửa hoặc giải trình. Khi đó, Chủ nhiệm đề tài có thể lập BM13 theo từng yêu cầu, xuất PDF, ký ngoài hệ thống, tải PDF đã ký và nộp. Nếu BM12 không yêu cầu sửa/giải trình, hệ thống bỏ qua BM13 và không chặn bước hoàn tất vì thiếu tài liệu này.

**Điều kiện kiểm thử:**
- Mỗi nội dung giải trình liên kết với yêu cầu tương ứng của BM12.
- BM13 đã nộp bị khóa và được quản lý phiên bản.
- P.KHCN kiểm tra BM13 và tài liệu đã sửa; có thể trả kèm lý do hoặc xác nhận hoàn tất giải trình.
- Việc xác nhận BM13 không yêu cầu triệu tập lại Hội đồng; toàn bộ vòng trả sửa và xác nhận được lưu lịch sử.

#### FR-50: Lưu hợp đồng và BM14 hoàn chỉnh

P.KHCN có thể tải hợp đồng đã ký và BM14 hoàn chỉnh lên Đề tài NCKH sau khi các tài liệu này đã được lập, xử lý và ký bên ngoài hệ thống; Chủ nhiệm đề tài có thể xem/tải theo quyền.

**Điều kiện kiểm thử:**
- Hệ thống không ký hợp đồng, không lập hoặc xử lý BM14 và không thực hiện nghiệp vụ tài chính.
- Mỗi tệp lưu người tải, thời điểm, phiên bản, trạng thái hiệu lực và quan hệ với Đề tài NCKH.

#### FR-51: Hoàn tất phạm vi Bước 07

P.KHCN có thể xác nhận Đề tài NCKH `Hoàn tất Bước 07` khi BM12 hiện hành kết luận nghiệm thu đạt, BM13 đã được P.KHCN xác nhận nếu Hội đồng yêu cầu sửa/giải trình, và BM14 hoàn chỉnh đã được lưu nếu đề tài có hợp đồng phải thanh lý. Hệ thống giữ toàn bộ tài liệu và lịch sử trước khi chuyển sang quy trình ngoài MVP.

**Điều kiện kiểm thử:**
- Không đánh dấu hoàn tất khi còn yêu cầu giải trình bắt buộc chưa xử lý.
- Đề tài không có hợp đồng phải thanh lý không bị chặn vì thiếu BM14.
- Chỉ P.KHCN có quyền xác nhận hoàn tất; hệ thống ghi người thao tác, thời điểm và bộ điều kiện đã thỏa mãn.

### 4.9. Trạng thái, thông báo và truy vết

**Mô tả:** Mọi actor theo dõi công việc theo quyền; các quyết định và tài liệu chính có lịch sử đủ để kiểm tra sau này.

#### FR-32: Theo dõi trạng thái nghiệp vụ

Actor có liên quan có thể xem Trạng thái tổng quan đề tài cùng trạng thái chi tiết và lịch sử của Đợt đăng ký, Hồ sơ đăng ký, Đề tài NCKH, Hội đồng, Cuộc họp Hội đồng, Phiếu đánh giá và Biên bản Hội đồng.

**Điều kiện kiểm thử:**
- Danh sách đề tài hiển thị một Trạng thái tổng quan cho mỗi đề tài.
- Trạng thái tổng quan được dẫn xuất từ trạng thái chi tiết, không được nhập tay độc lập.
- Người có quyền có thể mở chi tiết để biết đối tượng và sự kiện tạo ra trạng thái tổng quan.

#### FR-33: Thông báo theo sự kiện

Hệ thống gửi thông báo trong ứng dụng cho actor liên quan khi có lời mời Hội đồng, Cuộc họp được mở/kết thúc, có công việc mới, hồ sơ/tài liệu bị trả hoặc được duyệt, đủ 100% Phiếu đánh giá, Mốc chốt phiếu được tạo hoặc kết quả được công bố. Email được dùng cho xác minh Tài khoản và gửi lời mời đăng ký; email/SMS nghiệp vụ ngoài các trường hợp này chưa thuộc MVP.

**Điều kiện kiểm thử:**
- Mỗi thông báo liên kết đến đúng đối tượng nghiệp vụ nếu người nhận còn quyền truy cập.
- Hệ thống không gửi nội dung kết quả cho actor chưa được mở quyền trước công bố.
- Sự kiện, người nhận và thời điểm tạo thông báo được lưu để truy vết.

#### FR-34: Nhật ký kiểm toán

Hệ thống lưu lịch sử bất biến cho các hành động nghiệp vụ quan trọng, gồm actor, Tài khoản, Vai trò nghiệp vụ, thời điểm, đối tượng, trạng thái trước/sau, phiên bản và lý do khi có.

**Điều kiện kiểm thử:**
- Người dùng nghiệp vụ không thể sửa hoặc xóa bản ghi nhật ký.
- Có thể truy vấn lịch sử theo đối tượng và khoảng thời gian trong phạm vi quyền.
- Hành động thay đổi trạng thái bắt buộc có trạng thái trước và sau.

#### FR-35: Quản lý phiên bản tài liệu

Hệ thống lưu phiên bản dữ liệu, PDF xuất, PDF đã ký và trạng thái hiệu lực để có thể tái hiện tài liệu lịch sử mà không bị thay đổi bởi dữ liệu hiện tại.

**Điều kiện kiểm thử:**
- Mỗi lần nộp tạo một phiên bản bất biến thay vì ghi đè bản trước.
- Hệ thống xác định rõ phiên bản hiện hành, phiên bản mất hiệu lực và quan hệ thay thế.
- Thay đổi Hồ sơ cá nhân sau này không làm thay đổi tài liệu lịch sử đã nộp.

## 5. Yêu cầu phi chức năng xuyên suốt

### 5.1. Bảo mật và quyền riêng tư

- **NFR-1:** Mọi API và giao diện nghiệp vụ phải thực thi phân quyền phía máy chủ theo Tài khoản, Vai trò nghiệp vụ và ngữ cảnh đối tượng; ẩn nút trên giao diện không được coi là kiểm soát quyền.
- **NFR-2:** Dữ liệu truyền qua mạng phải được mã hóa; thông tin xác thực và dữ liệu nhạy cảm phải được bảo vệ khi lưu. `[ASSUMPTION: Chuẩn kỹ thuật cụ thể được chọn ở kiến trúc.]`
- **NFR-3:** Người dùng không thể suy đoán định danh để truy cập Hồ sơ đăng ký, Hội đồng hoặc tài liệu ngoài phạm vi quyền.
- **NFR-15:** Liên kết xác minh email và lời mời Hội đồng phải dùng một lần, có thời hạn hiệu lực và bị vô hiệu hóa sau khi sử dụng hoặc thu hồi. `[ASSUMPTION: Thời hạn cụ thể được chốt trước pilot.]`
- **NFR-16:** Các điểm đăng ký, đăng nhập và xác minh email phải có kiểm soát chống dò mật khẩu, gửi lặp và lạm dụng tự động. `[ASSUMPTION: Ngưỡng cụ thể do kiến trúc và vận hành xác định.]`

### 5.2. Toàn vẹn và truy vết

- **NFR-4:** Nhật ký kiểm toán và Mốc chốt phiếu không thể bị sửa hoặc xóa bởi người dùng nghiệp vụ.
- **NFR-5:** Mỗi PDF đã ký phải gắn với đúng phiên bản Biểu mẫu điện tử và có checksum hoặc cơ chế phát hiện thay đổi tệp. `[ASSUMPTION]`
- **NFR-6:** Mọi thời điểm nghiệp vụ phải dùng múi giờ Asia/Ho_Chi_Minh và lưu theo chuẩn nhất quán.

### 5.3. Hiệu năng và khả dụng

- **NFR-7:** 95% thao tác xem danh sách, mở chi tiết và lưu nháp phản hồi trong 3 giây ở tải vận hành bình thường. `[ASSUMPTION: Chỉ tiêu cần hiệu chỉnh sau khi có quy mô người dùng và dữ liệu.]`
- **NFR-8:** Xuất PDF hoàn tất trong 10 giây đối với 95% Biểu mẫu điện tử thuộc phạm vi MVP ở tải vận hành bình thường. `[ASSUMPTION]`
- **NFR-9:** Hệ thống phải ngăn nộp trùng khi người dùng gửi lại yêu cầu do mạng chậm hoặc bấm nhiều lần.
- **NFR-10:** Dữ liệu đã bấm Nộp không bị mất khi một thành phần xử lý tài liệu tạm thời lỗi; người dùng nhận được trạng thái rõ ràng và có thể thử lại an toàn.

NFR-7 và NFR-8 được đo bằng log thời gian phản hồi phía máy chủ kết hợp kiểm thử tải trên bộ dữ liệu đại diện. Kịch bản tải, quy mô dữ liệu và ngưỡng chính thức do Kiến trúc sư cùng đơn vị vận hành chốt trước kiểm thử nghiệm thu pilot.

### 5.4. Khả năng sử dụng và tiếp cận

- **NFR-11:** Mỗi trạng thái, lỗi kiểm tra và lý do không thể tiếp tục phải được diễn đạt bằng tiếng Việt rõ ràng, gắn với hành động khắc phục.
- **NFR-12:** Các luồng cốt lõi có thể thao tác bằng bàn phím và đáp ứng mức WCAG 2.1 AA cho thành phần giao diện chính. `[ASSUMPTION: Chuẩn tiếp cận cần stakeholder xác nhận.]`

### 5.5. Sao lưu và phục hồi

- **NFR-13:** Dữ liệu nghiệp vụ và tài liệu phải được sao lưu định kỳ; `[ASSUMPTION: RPO 24 giờ, RTO 8 giờ cho MVP nội bộ.]`
- **NFR-14:** Việc phục hồi phải giữ đúng liên kết giữa phiên bản dữ liệu, PDF đã ký, trạng thái và nhật ký kiểm toán.

NFR-13 và NFR-14 được xác nhận bằng nhật ký sao lưu và một lần diễn tập phục hồi trước pilot; đơn vị vận hành chịu trách nhiệm ghi nhận RPO/RTO thực tế và báo cáo sai lệch.

## 6. Ràng buộc và nguyên tắc bảo vệ

### 6.1. Ranh giới nghiệp vụ

- Hệ thống quản lý Hội đồng và vòng đời Cuộc họp ở ba giai đoạn: P.KHCN mở thủ công, hệ thống không cấu hình giờ kết thúc, và chỉ cho kết thúc sau khi đủ 100% Phiếu đánh giá của người có trách nhiệm đánh giá cùng BM03/BM07/BM12 tương ứng hoàn tất.
- Hệ thống không tổ chức họp trực tuyến, ghi âm, ghi hình hoặc thay thế hoạt động thảo luận chuyên môn của Hội đồng.
- Chữ ký trên PDF được thực hiện bên ngoài hệ thống; MVP không tích hợp ký điện tử hoặc tự ghép ảnh chữ ký.
- Thư ký Hội đồng chỉ lập Biên bản, không nộp Phiếu đánh giá và không nằm trong mẫu số 100%; P.KHCN không can thiệp nội dung chuyên môn của Phiếu đánh giá và không mở lại Tập phiếu sau Mốc chốt phiếu tự động.
- Hệ thống không xử lý tạm ứng, thanh toán, quyết toán, hoàn trả hoặc phê duyệt chứng từ kế toán.

### 6.2. Quản trị dữ liệu và tài liệu

- Biểu mẫu điện tử là nguồn dữ liệu có cấu trúc; PDF đã ký là bằng chứng chính thức của lần nộp. Hệ thống không tự động đối soát nội dung hai nguồn; người duyệt chịu trách nhiệm kiểm tra và trả sửa nếu phát hiện sai lệch.
- Bản đã nộp không bị ghi đè; sửa đổi tạo phiên bản mới và giữ lịch sử.
- Mẫu PDF mới phải dùng Unicode và tên trường chuẩn `TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐỒNG NAI`.

### 6.3. Cổng đặc tả Biểu mẫu

Trước khi phát triển BM01A, BM01B, BM02, BM03, BM06, BM07, BM08, BM11, BM12 hoặc BM13, nhóm thực hiện phải hoàn tất Từ điển dữ liệu đối chiếu với biểu mẫu gốc. BM04 và BM09 dùng quy tắc tải tệp hoàn chỉnh; BM05, BM10 và BM14 được lập/xử lý bên ngoài rồi lưu vào hệ thống.

- Biểu mẫu điện tử phải chứa đầy đủ mọi trường của biểu mẫu gốc; không tự ý lược bỏ trường.
- Trường thông thường là bắt buộc.
- Trường có điều kiện chỉ bắt buộc khi nhánh nghiệp vụ tương ứng phát sinh.
- Nhóm dữ liệu lặp như thành viên, tiêu chí đánh giá và nội dung kết luận phải được mô hình thành các dòng dữ liệu có cấu trúc.
- Mỗi trường phải xác định tên, ý nghĩa, kiểu dữ liệu, tính bắt buộc, điều kiện hiển thị, validation và nguồn dữ liệu.
- Biểu mẫu gốc là nguồn đối chiếu cuối cùng nếu tài liệu phân tích thiếu hoặc diễn giải khác trường.
- Từ điển dữ liệu phải được duyệt trước khi user story phát triển Biểu mẫu điện tử chuyển sang trạng thái sẵn sàng thực hiện.

## 7. Mục tiêu ngoài phạm vi sản phẩm

- Không cung cấp nền tảng họp trực tuyến hoặc thay thế hoạt động thảo luận chuyên môn của Hội đồng.
- Không trở thành hệ thống ký điện tử, quản lý hợp đồng hay tài chính-kế toán.
- Không cấp quyền thao tác cho thành viên nhóm nghiên cứu ngoài Chủ nhiệm đề tài trong baseline.
- Không cho phép thay đổi lịch sử, Mốc chốt phiếu hoặc tài liệu đã nộp mà không tạo phiên bản mới.

## 8. Phạm vi MVP

### 8.1. Trong phạm vi

- Tự đăng ký bằng email Trường cho Giảng viên/Sinh viên, đăng ký qua lời mời cho người ngoài và quản lý Tài khoản bởi Quản trị viên.
- Truy cập và phân quyền theo Vai trò nghiệp vụ cho các actor của Bước 01–07.
- Quản lý Đợt đăng ký cho cả đề tài giảng viên và đề tài sinh viên.
- Lập, xuất PDF, tải PDF đã ký, nộp và quản lý phiên bản BM01.
- Xét duyệt tuyến đầu theo hai tuyến và vòng trả sửa/nộp lại.
- Thiết lập Hội đồng, mời người ngoài, phân công Vai trò và quản lý Cuộc họp cho xét duyệt hồ sơ, xét duyệt thuyết minh và nghiệm thu.
- P.KHCN mở/kết thúc Cuộc họp thủ công; không cấu hình giờ kết thúc hoặc hạn chót riêng.
- Lập, xuất PDF, tải PDF đã ký và nộp BM02/BM06/BM11 trong Cuộc họp theo từng Thành viên Hội đồng có trách nhiệm đánh giá; Thư ký không nộp phiếu.
- Kiểm tra đủ 100% Phiếu đánh giá, tự động chốt Tập phiếu bất biến và mở BM03/BM07/BM12.
- Thư ký lập BM03/BM07/BM12 trong Cuộc họp, gồm vòng trả sửa và tuyến hai chữ ký.
- Chủ nhiệm tải BM04 được soạn ngoài hệ thống; P.KHCN đăng BM05; Hội đồng xét duyệt thuyết minh xử lý BM06/BM07.
- Chủ nhiệm lập/nộp BM08, tải BM09 và sản phẩm; P.KHCN đăng BM10; Hội đồng nghiệm thu xử lý BM11/BM12.
- Chủ nhiệm lập/nộp BM13 khi cần giải trình; P.KHCN lưu hợp đồng và BM14 hoàn chỉnh sau xử lý bên ngoài.
- Theo dõi Trạng thái tổng quan đề tài xuyên suốt đến hoàn tất Bước 07.
- Trạng thái tổng quan đề tài, trạng thái chi tiết, thông báo trong hệ thống, phiên bản tài liệu và nhật ký kiểm toán.

### 8.2. Ngoài phạm vi MVP

- Bước 08–09: công nhận, ứng dụng và các hoạt động sau hoàn tất Bước 07.
- BM15 và quy trình lập, phê duyệt, ký quyết định công nhận kết quả.
- Soạn, phê duyệt hoặc ký các quyết định BM05 và BM10 trong hệ thống; MVP chỉ lưu/công bố bản đã lập, ký bên ngoài.
- Lập, xử lý hoặc ký BM14 trong hệ thống.
- Quy trình hợp đồng và toàn bộ nghiệp vụ tài chính.
- Tích hợp SSO, ký số, email/SMS nghiệp vụ ngoài xác minh Tài khoản và lời mời, Thư viện hoặc hệ thống tài chính cho đến khi có quyết định riêng.
- Ứng dụng di động native. MVP là ứng dụng web responsive dùng trên máy tính và thiết bị di động.

## 9. Chỉ số thành công

Các mục tiêu dưới đây là baseline đo lường cho MVP và cần hiệu chỉnh sau khi có dữ liệu vận hành hiện tại.

P.KHCN là chủ sở hữu nghiệp vụ của bộ chỉ số; đơn vị vận hành hệ thống chịu trách nhiệm trích xuất số liệu. Baseline được chốt từ Đợt đăng ký gần nhất trước pilot. SM-1, SM-2, SM-3, SM-4 và SM-6 dùng nhật ký trạng thái, kiểm toán và lý do trả hồ sơ; SM-5 dùng số yêu cầu hỏi trạng thái do P.KHCN ghi nhận trên cùng kênh và cùng khoảng thời gian so sánh. Kết quả được tổng hợp khi kết thúc pilot và được người chấp thuận pilot xác nhận.

### 9.1. Chỉ số chính

- **SM-1 — Tỷ lệ xử lý số hóa:** ít nhất 90% Đề tài NCKH thuộc đợt pilot được theo dõi xuyên suốt Bước 01–07 trên hệ thống mà không cần bảng tính trạng thái song song. Xác nhận FR-4 đến FR-51. `[ASSUMPTION]`
- **SM-2 — Khả năng truy vết:** 100% mẫu kiểm tra ngẫu nhiên xác định được Tài khoản, Vai trò nghiệp vụ, thời điểm, trạng thái và phiên bản tài liệu của các mốc nộp, duyệt, trả, chốt và hoàn tất. Xác nhận FR-3, FR-17, FR-26, FR-29, FR-34, FR-35.
- **SM-3 — Tuân thủ điều kiện đủ phiếu:** không có BM03/BM07/BM12 nào được mở khi chưa đủ 100% phiếu của người có trách nhiệm đánh giá; Thư ký không bị yêu cầu nộp phiếu; không có Tập phiếu nào bị mở lại; không có Cuộc họp nào được kết thúc khi Biên bản tương ứng chưa hoàn tất. Xác nhận FR-24 đến FR-26, FR-39, FR-40.

### 9.2. Chỉ số phụ

- **SM-4 — Hoàn tất đúng luồng:** ít nhất 85% người dùng pilot hoàn tất tác vụ chính được giao mà không cần P.KHCN sửa dữ liệu thay. Xác nhận UJ-1 đến UJ-7. `[ASSUMPTION]`
- **SM-5 — Giảm truy vấn trạng thái:** giảm ít nhất 50% yêu cầu hỏi trạng thái thủ công qua thư điện tử/điện thoại so với đợt gần nhất. Xác nhận FR-13, FR-21, FR-32, FR-33. `[ASSUMPTION]`
- **SM-6 — Chất lượng tài liệu:** ít nhất 95% Biểu mẫu điện tử BM01, BM02, BM03, BM06, BM07, BM08, BM11, BM12 và BM13 trong phạm vi được hệ thống chấp nhận không bị trả vì thiếu trường hoặc sai mẫu. Xác nhận FR-10, FR-11, FR-23, FR-24, FR-27, FR-46 và FR-49. `[ASSUMPTION]`

### 9.3. Chỉ số đối trọng

- **SM-C1 — Không tối ưu bằng cách bỏ qua kiểm soát:** thời gian xử lý ngắn hơn không được đánh đổi bằng việc giảm tỷ lệ tài liệu có đủ PDF đã ký, phiên bản hoặc nhật ký kiểm toán. Cân bằng SM-4 và SM-5.
- **SM-C2 — Không ép xử lý ngoài hệ thống:** tỷ lệ Hồ sơ đăng ký hoàn tất không được tăng bằng cách P.KHCN nhập, sửa hoặc nộp thay cho actor chịu trách nhiệm. Cân bằng SM-1.
- **SM-C3 — Không lách điều kiện đủ phiếu:** không được đạt tỷ lệ hoàn tất bằng cách loại Thành viên Hội đồng chưa nộp phiếu hoặc kết thúc Cuộc họp khi thiếu phiếu. Cân bằng SM-3.

## 10. Rủi ro và biện pháp giảm thiểu

| Rủi ro | Tác động | Biện pháp trong phạm vi sản phẩm |
|---|---|---|
| Biểu mẫu gốc và Biểu mẫu điện tử không đồng nhất | Tài liệu bị trả, mất giá trị bằng chứng | Đối chiếu toàn bộ biểu mẫu trong phạm vi Bước 01–07; kiểm thử snapshot; quản lý phiên bản mẫu. |
| Dữ liệu Biểu mẫu điện tử khác PDF đã ký | Người duyệt có thể phê duyệt sai bằng chứng | Gắn PDF với phiên bản Biểu mẫu điện tử; PDF đã ký là bằng chứng chính thức; người duyệt kiểm tra và trả sửa khi sai lệch. |
| Phân quyền sai khi một Tài khoản có nhiều Vai trò nghiệp vụ | Lộ dữ liệu hoặc thao tác sai thẩm quyền | Kiểm soát phía máy chủ, kiểm thử ma trận quyền theo ngữ cảnh, ghi Vai trò nghiệp vụ vào nhật ký. |
| Lời mời người ngoài bị chuyển tiếp hoặc dùng sai Tài khoản | Người không được mời nhận quyền Hội đồng | Gắn lời mời với email, Hội đồng và Vai trò; xác minh email; liên kết một lần và có thể thu hồi. |
| Điều kiện đủ phiếu bị hiểu hoặc triển khai sai | Kết quả Hội đồng không đáng tin cậy | Dùng công thức duy nhất `số phiếu hợp lệ = số thành viên có trách nhiệm đánh giá`, loại Thư ký khỏi mẫu số, kiểm thử đầy đủ/thiếu một phiếu và lưu Tập phiếu bất biến. |
| Cuộc họp bị kết thúc khi quy trình chưa hoàn tất | Mất quyền nộp hoặc Biên bản chưa hợp lệ | Chặn kết thúc cho đến khi đủ 100% phiếu và BM03/BM07/BM12 tương ứng hoàn tất tuyến hai chữ ký. |
| Cấu hình Hội đồng sai sau khi Cuộc họp đã mở | Thay đổi mẫu số hoặc mất tính toàn vẹn đánh giá | Khóa cấu trúc tại mốc mở; hủy có lý do và tạo Cuộc họp thay thế, giữ toàn bộ lịch sử. |
| Kết quả được công bố nhầm hoặc sửa không truy vết | Người liên quan nhận thông tin không chính thức | Dùng trạng thái `Chờ công bố`, thao tác công bố riêng của P.KHCN và phiên bản điều chỉnh có lý do. |
| Quy trình ký ngoài hệ thống tạo nhiều phiên bản tệp | Nhầm bản có hiệu lực | Trạng thái hiệu lực rõ ràng, checksum, lịch sử phiên bản, không ghi đè. |
| Tham số triển khai chưa được chốt trước pilot | Story hoặc tiêu chí nghiệm thu mơ hồ, phát sinh sửa lớn | Gán chủ sở hữu và cổng chốt cho từng mục tại §11.2 trước khi bước phụ thuộc bắt đầu. |

## 11. Câu hỏi mở

### 11.1. Câu hỏi chặn đặc tả Bước 01–07

Không còn câu hỏi chặn. P.KHCN kiểm tra/xác nhận BM13 mà không họp lại Hội đồng; BM13 chỉ phát sinh khi BM12 yêu cầu sửa/giải trình. P.KHCN xác nhận `Hoàn tất Bước 07` khi nghiệm thu đạt, giải trình đã được xác nhận nếu có và BM14 đã được lưu đối với đề tài có hợp đồng phải thanh lý.

### 11.2. Câu hỏi không chặn PRD nhưng cần chốt trước pilot

| ID | Nội dung cần chốt | Chủ sở hữu | Cổng chốt |
|---|---|---|---|
| OQ-4 | Miền email dùng chung cụ thể được cấu hình khi triển khai là gì? | Quản trị viên và đơn vị CNTT | Trước khi triển khai môi trường staging. |
| OQ-5 | Lời mời có hiệu lực bao lâu; ai được thu hồi/gửi lại; xử lý thế nào khi email đã có Tài khoản? | PM và P.KHCN | Trước khi story lời mời Tài khoản được đưa vào phát triển. |
| OQ-6 | Định dạng, dung lượng, quy tắc đặt tên, quét mã độc và thời hạn lưu PDF/tệp đính kèm là gì? | Kiến trúc sư/An toàn thông tin và P.KHCN | Trước khi story tải tệp được đưa vào phát triển. |
| OQ-7 | Quy mô người dùng đồng thời, số Hồ sơ đăng ký mỗi Đợt đăng ký và thời hạn lưu trữ cần hỗ trợ là bao nhiêu? | Đơn vị CNTT và P.KHCN | Trước khi chốt thiết kế năng lực và lưu trữ. |
| OQ-8 | Mục tiêu hiệu năng, RPO/RTO, WCAG và các chỉ số pilot trong §9 có phù hợp với kỳ vọng của Nhà trường không? | Kiến trúc sư, đơn vị vận hành và người bảo trợ sản phẩm | Trước kiểm tra sẵn sàng triển khai và trước pilot. |
| OQ-9 | MVP triển khai web responsive như giả định hay cần thêm bề mặt khác? | PM và UX | Trước khi phê duyệt đặc tả UX. |
| OQ-10 | Phạm vi pilot gồm đơn vị nào, Đợt đăng ký nào và ai là người chấp thuận nghiệm thu sản phẩm? | Người bảo trợ sản phẩm và P.KHCN | Trước khi lập kế hoạch rollout pilot. |

## 12. Chỉ mục giả định còn lại

- NFR-2 — Chuẩn mã hóa/xác thực cụ thể do kiến trúc lựa chọn.
- NFR-5 — PDF đã ký có checksum hoặc cơ chế phát hiện thay đổi tệp.
- NFR-15 — Thời hạn hiệu lực cụ thể của liên kết xác minh/lời mời được chốt trước pilot.
- NFR-16 — Ngưỡng chống lạm dụng xác thực do kiến trúc và vận hành xác định.
- NFR-7, NFR-8 — Chỉ tiêu hiệu năng cần hiệu chỉnh theo quy mô thực tế.
- NFR-12 — Mục tiêu WCAG 2.1 AA cần stakeholder xác nhận.
- NFR-13 — RPO 24 giờ, RTO 8 giờ cho MVP nội bộ.
- §9 — Các ngưỡng SM-1, SM-4, SM-5 và SM-6 là baseline cần hiệu chỉnh theo dữ liệu vận hành.

## 13. Nguồn đầu vào và nguyên tắc ưu tiên

1. Baseline chính: `brainstorm-liet-ke-day-du-use-case-chi-tiet-nckh-2026-07-18/danh-muc-use-case-chi-tiet.md`, gồm xác nhận bổ sung ngày 2026-07-20.
2. Đối chiếu sơ đồ: `brainstorm-xac-minh-use-case-nckh-cap-truong-2026-07-15/use-case-tong-quan-v5.png` và `danh-muc-use-case-chi-tiet-doi-chieu-tong-quan.md`.
3. Chi tiết biểu mẫu: `brainstorm-xac-minh-use-case-nckh-cap-truong-2026-07-15/phan-tich-bieu-mau-bm01-bm15.md`.

Khi nguồn cũ mâu thuẫn với baseline chính, áp dụng quyết định mới nhất: Giảng viên/Sinh viên tự đăng ký bằng email Trường; người ngoài đăng ký qua lời mời gắn với Hội đồng; Quản trị viên quản lý Tài khoản; giao diện hiển thị Trạng thái tổng quan đề tài dẫn xuất; hệ thống quản lý vòng đời Cuộc họp nhưng không tổ chức thảo luận chuyên môn; Cuộc họp không có giờ kết thúc cấu hình trước; Thư ký chỉ lập Biên bản, không nộp Phiếu đánh giá và không nằm trong mẫu số 100%; hệ thống tự chốt khi đủ phiếu của các thành viên có trách nhiệm đánh giá; P.KHCN chỉ được kết thúc Cuộc họp sau khi Biên bản tương ứng hoàn tất; phạm vi MVP bao phủ Bước 01–07 cho cả hai loại đề tài.
