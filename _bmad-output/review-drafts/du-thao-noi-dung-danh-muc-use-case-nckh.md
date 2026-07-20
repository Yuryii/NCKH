# DANH MỤC USE CASE CHI TIẾT

*Hệ thống quản lý hoạt động nghiên cứu khoa học cấp trường*

## 1. Use case tổng quan

| Mã UCTQ | Tên use case tổng quan | Actor |
|---|---|---|
| UCTQ-01 | Xét duyệt đăng ký đề tài sinh viên | Giảng viên trong vai trò hướng dẫn |
| UCTQ-02 | Tra cứu sổ tiết NCKH | Giảng viên |
| UCTQ-03 | Đăng ký thực hiện đề tài giao trực tiếp | Giảng viên |
| UCTQ-04 | Đăng ký đề xuất đề tài tuyển chọn | Chủ nhiệm đề tài; cụ thể là Giảng viên hoặc Sinh viên |
| UCTQ-05 | Gửi đơn báo cáo tiến độ 1/2 thời gian | Chủ nhiệm đề tài |
| UCTQ-06 | Nộp thuyết minh đề tài | Chủ nhiệm đề tài |
| UCTQ-07 | Nộp hồ sơ nghiệm thu | Chủ nhiệm đề tài |
| UCTQ-08 | Xem thông báo/quyết định | Chủ nhiệm đề tài |
| UCTQ-09 | Nộp giải trình chỉnh sửa báo cáo nghiệm thu đề tài | Chủ nhiệm đề tài |
| UCTQ-10 | Xét duyệt đăng ký đề tài giảng viên | Trưởng Khoa/Trưởng đơn vị |
| UCTQ-11 | Quản lý xét duyệt hồ sơ | Cán bộ/Phòng KHCN (P.KHCN) |
| UCTQ-12 | Quản lý xét duyệt thuyết minh | Cán bộ/Phòng KHCN (P.KHCN) |
| UCTQ-13 | Quản lý nghiệm thu đề tài | Cán bộ/Phòng KHCN (P.KHCN) |
| UCTQ-14 | Công bố đợt giao trực tiếp và danh mục đề tài | Cán bộ/Phòng KHCN (P.KHCN) |
| UCTQ-15 | Công bố đợt tuyển chọn đề tài | Cán bộ/Phòng KHCN (P.KHCN) |
| UCTQ-16 | Đăng thông báo/quyết định | Cán bộ/Phòng KHCN (P.KHCN) |
| UCTQ-17 | Nhận xét thuyết minh đề tài | Thành viên Hội đồng xét duyệt thuyết minh, Thư ký Hội đồng xét duyệt thuyết minh và Cán bộ/Phòng KHCN (P.KHCN) khi giữ vai trò Chủ tịch Hội đồng |
| UCTQ-18 | Đánh giá hồ sơ nghiệm thu | Thành viên Hội đồng nghiệm thu, Thư ký Hội đồng nghiệm thu và Cán bộ/Phòng KHCN (P.KHCN) khi giữ vai trò Chủ tịch Hội đồng |
| UCTQ-19 | Nhận xét hồ sơ đăng ký | Thành viên Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt hồ sơ và Cán bộ/Phòng KHCN (P.KHCN) khi giữ vai trò Chủ tịch Hội đồng |

## 2. Use case chi tiết

### 2.0. Tiền bước - Quản lý đợt đăng ký

| Mã UCCT | Tên use case chi tiết | Actor | Kết quả | Mã UCTQ |
|---|---|---|---|---|
| UC-DOT-01 | Tạo đợt đăng ký NCKH | Cán bộ/Phòng KHCN (P.KHCN) | Một đợt đăng ký mới được hình thành để cấu hình và công bố. | UCTQ-14, UCTQ-15 |
| UC-DOT-02 | Cấu hình loại và thời gian của đợt | Cán bộ/Phòng KHCN (P.KHCN) | Đợt có loại và khoảng thời gian áp dụng. | UCTQ-14, UCTQ-15 |
| UC-DOT-03 | Quản lý danh mục đề tài giao trực tiếp của đợt | Cán bộ/Phòng KHCN (P.KHCN) | Danh mục đề tài giao trực tiếp gắn với đợt được duy trì. | UCTQ-14 |
| UC-DOT-04 | Cập nhật đợt trước khi khóa | Cán bộ/Phòng KHCN (P.KHCN) | Thông tin đợt được điều chỉnh trong khoảng được phép. | UCTQ-14, UCTQ-15 |
| UC-DOT-05 | Công bố đợt đăng ký | Cán bộ/Phòng KHCN (P.KHCN) | Đợt sẵn sàng để người dùng xem và đăng ký. | UCTQ-14, UCTQ-15 |
| UC-DOT-06 | Xem danh sách và tình trạng các đợt | Chủ nhiệm đề tài, Giảng viên, Sinh viên, Cán bộ/Phòng KHCN (P.KHCN) theo quyền | Người dùng biết các đợt và tình trạng hiện tại. | UCTQ-03, UCTQ-04, UCTQ-14, UCTQ-15 |
| UC-DOT-08 | Theo dõi tình trạng đợt | Cán bộ/Phòng KHCN (P.KHCN) | P.KHCN nắm được tình trạng vận hành của đợt. | UCTQ-14, UCTQ-15 |


### 2.1. Bước 01 - Đăng ký đề tài

| Mã UCCT | Tên use case chi tiết | Actor | Kết quả | Mã UCTQ |
|---|---|---|---|---|
| UC-DK-01 | Tạo hồ sơ đăng ký đề tài giảng viên ở trạng thái nháp | Giảng viên | Hồ sơ giảng viên được tạo để tiếp tục hoàn thiện. | UCTQ-03, UCTQ-04 |
| UC-DK-02 | Tạo hồ sơ đăng ký đề tài sinh viên ở trạng thái nháp | Sinh viên | Hồ sơ sinh viên được tạo để tiếp tục hoàn thiện. | UCTQ-04 |
| UC-DK-03 | Cập nhật hồ sơ đăng ký trước khi nộp | Giảng viên hoặc Sinh viên | Nội dung nháp được hoàn thiện. | UCTQ-03, UCTQ-04 |
| UC-DK-04 | Quản lý thông tin nhóm nghiên cứu trong hồ sơ | Giảng viên hoặc Sinh viên | Danh sách/thông tin nhóm được ghi nhận; thành viên nhóm không trở thành actor. | UCTQ-03, UCTQ-04 |
| UC-DK-05 | Kiểm tra điều kiện nộp hồ sơ đăng ký | Giảng viên hoặc Sinh viên | Biết hồ sơ có đáp ứng điều kiện nộp, hạn mức và lệnh cấm hay không. | UCTQ-03, UCTQ-04 |
| UC-DK-06 | Lập BM01 từ dữ liệu đăng ký | Giảng viên hoặc Sinh viên | BM01 đầy đủ thông tin được chuẩn bị theo pipeline form/PDF. | UCTQ-03, UCTQ-04 |
| UC-DK-07 | Nộp hồ sơ đăng ký kèm BM01 đã ký | Giảng viên hoặc Sinh viên | Hồ sơ chuyển vào tuyến xét duyệt tương ứng và form BM01 bị khóa. | UCTQ-03, UCTQ-04 |
| UC-DK-08 | Xem trạng thái xử lý hồ sơ đăng ký | Giảng viên hoặc Sinh viên | Người đăng ký biết hồ sơ đang ở bước nào và kết quả xử lý. | UCTQ-03, UCTQ-04 |
| UC-DK-09 | Xét duyệt hồ sơ sinh viên được hướng dẫn | Giảng viên trong vai trò hướng dẫn | Hồ sơ hợp lệ được duyệt và tự chuyển vào tập đủ điều kiện lập Hội đồng. | UCTQ-01 |
| UC-DK-10 | Trả hồ sơ sinh viên để sửa | Giảng viên trong vai trò hướng dẫn | Hồ sơ quay lại cho Sinh viên kèm yêu cầu sửa bắt buộc. | UCTQ-01 |
| UC-DK-11 | Xét duyệt hồ sơ giảng viên của đơn vị | Trưởng Khoa/Trưởng đơn vị | Hồ sơ hợp lệ được duyệt và tự chuyển vào tập đủ điều kiện lập Hội đồng. | UCTQ-10 |
| UC-DK-12 | Trả hồ sơ giảng viên để sửa | Trưởng Khoa/Trưởng đơn vị | Hồ sơ quay lại cho Giảng viên kèm yêu cầu sửa bắt buộc. | UCTQ-10 |
| UC-DK-13 | Sửa và nộp lại hồ sơ bị trả | Giảng viên hoặc Sinh viên | Phiên bản sửa đổi, BM01 ký lại được đưa lại vào tuyến xét duyệt trước hạn. | UCTQ-01, UCTQ-10 |
| UC-DK-14 | Gửi yêu cầu hủy hồ sơ | Giảng viên hoặc Sinh viên | Yêu cầu hủy có lý do được ghi nhận để P.KHCN xử lý. | UCTQ-03, UCTQ-04 |
| UC-DK-15 | Xử lý yêu cầu hủy hồ sơ | Cán bộ/Phòng KHCN (P.KHCN) | Yêu cầu hủy có kết quả; nếu từ chối phải có lý do, nếu chấp thuận có thể thiết lập thời gian cấm đăng ký. | UCTQ-11 |


### 2.2. Bước 02 - Xét duyệt đề xuất sơ bộ

| Mã UCCT | Tên use case chi tiết | Actor | Kết quả | Mã UCTQ |
|---|---|---|---|---|
| UC-HD-01 | Tạo Hội đồng xét duyệt hồ sơ | Cán bộ/Phòng KHCN (P.KHCN) | Hội đồng xét duyệt hồ sơ được tạo với danh sách thành viên để nhận BM02 và lập BM03. | UCTQ-11 |
| UC-PH-01 | Xem hồ sơ phục vụ đánh giá xét duyệt hồ sơ | Thành viên Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt hồ sơ, Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch | Người đánh giá có BM01 làm căn cứ lập phiếu. | UCTQ-19 |
| UC-PH-02 | Lập và nộp phiếu xét duyệt hồ sơ | Thành viên Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt hồ sơ, Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch | BM02 đã ký được nộp, khóa và tính là phiếu hợp lệ trước mốc chốt. | UCTQ-19 |
| UC-BB-01 | Lập và nộp biên bản xét duyệt hồ sơ có chữ ký Thư ký | Thư ký Hội đồng xét duyệt hồ sơ | BM03 có chữ ký Thư ký được nộp cho P.KHCN và form bị khóa. | UCTQ-11 |


### 2.3. Bước 03 - Viết và nộp thuyết minh

| Mã UCCT | Tên use case chi tiết | Actor | Kết quả | Mã UCTQ |
|---|---|---|---|---|
| UC-TM-01 | Tải thuyết minh hoàn chỉnh lên hồ sơ đề tài | Chủ nhiệm đề tài | Tệp BM04 được soạn ngoài hệ thống và lưu cùng hồ sơ để Hội đồng xem, đánh giá. | UCTQ-06 |


### 2.4. Bước 04 - Phê duyệt thuyết minh và lưu hợp đồng đã ký

| Mã UCCT | Tên use case chi tiết | Actor | Kết quả | Mã UCTQ |
|---|---|---|---|---|
| UC-TL-05 | Đăng và lưu quyết định Hội đồng xét duyệt thuyết minh | Cán bộ/Phòng KHCN (P.KHCN) | BM05 lập/ký bên ngoài được lưu và công bố theo quyền. | UCTQ-16 |
| UC-TL-06 | Xem/tải quyết định Hội đồng xét duyệt thuyết minh | Actor có quyền | Người dùng truy cập BM05 đã công bố trong phạm vi quyền. | UCTQ-08 |
| UC-HD-02 | Tạo Hội đồng xét duyệt thuyết minh | Cán bộ/Phòng KHCN (P.KHCN) | Hội đồng thuyết minh được tạo với danh sách thành viên để nhận BM06 và lập BM07. | UCTQ-12 |
| UC-PH-03 | Xem hồ sơ phục vụ đánh giá thuyết minh | Thành viên Hội đồng xét duyệt thuyết minh, Thư ký Hội đồng xét duyệt thuyết minh, Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch | Người đánh giá có BM04/BM05 làm căn cứ lập phiếu. | UCTQ-17 |
| UC-PH-04 | Lập và nộp phiếu xét duyệt thuyết minh | Thành viên Hội đồng xét duyệt thuyết minh, Thư ký Hội đồng xét duyệt thuyết minh, Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch | BM06 đã ký được nộp, khóa và tính là phiếu hợp lệ trước mốc chốt. | UCTQ-17 |
| UC-BB-02 | Lập và nộp biên bản xét duyệt thuyết minh có chữ ký Thư ký | Thư ký Hội đồng xét duyệt thuyết minh | BM07 có chữ ký Thư ký được nộp cho P.KHCN và form bị khóa. | UCTQ-12 |
| UC-TL-01 | Lưu hợp đồng đã ký của đề tài | Cán bộ/Phòng KHCN (P.KHCN) | Tệp hợp đồng đã ký được lưu; hệ thống không ký hoặc xử lý thanh toán. | UCTQ-12 |
| UC-TL-02 | Xem và tải hợp đồng đã ký của đề tài | Chủ nhiệm đề tài | Chủ nhiệm truy cập được hợp đồng của đúng đề tài. | UCTQ-08 |


### 2.5. Bước 05 - Thực hiện và báo cáo tiến độ 1/2 thời gian

| Mã UCCT | Tên use case chi tiết | Actor | Kết quả | Mã UCTQ |
|---|---|---|---|---|
| UC-BC-01 | Lập và nộp báo cáo tiến độ | Chủ nhiệm đề tài | BM08 đầy đủ dữ liệu, có PDF đã ký được nộp và form bị khóa. | UCTQ-05 |
| UC-BC-04 | Xem/tải báo cáo tiến độ, tổng kết và giải trình theo quyền | Actor có liên quan | Tài liệu đã nộp được khai thác trong phạm vi quyền. | UCTQ-05, UCTQ-07, UCTQ-09 |


### 2.6. Bước 06 - Nộp hồ sơ và nghiệm thu đề tài

| Mã UCCT | Tên use case chi tiết | Actor | Kết quả | Mã UCTQ |
|---|---|---|---|---|
| UC-BC-02 | Tải báo cáo tổng kết hoàn chỉnh lên hồ sơ đề tài | Chủ nhiệm đề tài | Tệp BM09 hoàn chỉnh được lưu cùng đề tài. | UCTQ-07 |
| UC-TL-07 | Đăng và lưu quyết định Hội đồng nghiệm thu | Cán bộ/Phòng KHCN (P.KHCN) | BM10 lập/ký bên ngoài được lưu và công bố theo quyền. | UCTQ-16 |
| UC-TL-08 | Xem/tải quyết định Hội đồng nghiệm thu | Actor có quyền | Người dùng truy cập BM10 đã công bố trong phạm vi quyền. | UCTQ-08 |
| UC-HD-03 | Tạo Hội đồng nghiệm thu | Cán bộ/Phòng KHCN (P.KHCN) | Hội đồng nghiệm thu được tạo với danh sách thành viên để nhận BM11 và lập BM12. | UCTQ-13 |
| UC-PH-05 | Xem hồ sơ phục vụ đánh giá nghiệm thu | Thành viên Hội đồng nghiệm thu, Thư ký Hội đồng nghiệm thu, Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch | Người đánh giá có BM09/BM10 làm căn cứ lập phiếu. | UCTQ-18 |
| UC-PH-06 | Lập và nộp phiếu nghiệm thu | Thành viên Hội đồng nghiệm thu, Thư ký Hội đồng nghiệm thu, Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch | BM11 đã ký được nộp, khóa và tính là phiếu hợp lệ trước mốc chốt. | UCTQ-18 |
| UC-BB-03 | Lập và nộp biên bản nghiệm thu có chữ ký Thư ký | Thư ký Hội đồng nghiệm thu | BM12 có chữ ký Thư ký được nộp cho P.KHCN và form bị khóa. | UCTQ-13 |


### 2.7. Bước 07 - Chỉnh sửa sau nghiệm thu và lưu BM14 hoàn chỉnh

| Mã UCCT | Tên use case chi tiết | Actor | Kết quả | Mã UCTQ |
|---|---|---|---|---|
| UC-BC-03 | Lập và nộp giải trình | Chủ nhiệm đề tài | BM13 đầy đủ dữ liệu, có PDF đã ký được nộp và form bị khóa. | UCTQ-09 |
| UC-TL-03 | Lưu bản BM14 hoàn chỉnh sau xử lý bên ngoài | Cán bộ/Phòng KHCN (P.KHCN) | Tệp BM14 hoàn chỉnh được lưu sau khi toàn bộ việc lập, xử lý và ký diễn ra bên ngoài. | UCTQ-13 |
| UC-TL-04 | Xem bản BM14 hoàn chỉnh | Chủ nhiệm đề tài | Chủ nhiệm xem được BM14 đã lưu của đề tài. | UCTQ-08 |


### 2.8. Bước 08 - Công nhận kết quả

| Mã UCCT | Tên use case chi tiết | Actor | Kết quả | Mã UCTQ |
|---|---|---|---|---|
| UC-TL-09 | Đăng và lưu quyết định công nhận kết quả | Cán bộ/Phòng KHCN (P.KHCN) | BM15 lập/ký bên ngoài được lưu và công bố theo quyền. | UCTQ-16 |
| UC-TL-10 | Xem/tải quyết định công nhận kết quả | Actor có quyền | Người dùng truy cập BM15 đã công bố trong phạm vi quyền. | UCTQ-08 |

### 2.9. Bước 09 - Triển khai ứng dụng và lưu hồ sơ


### 2.10. Use case dùng chung và xuyên suốt

#### 2.10.1. Actor, phân quyền và truy cập

| Mã UCCT | Tên use case chi tiết | Actor | Kết quả | Mã UCTQ |
|---|---|---|---|---|
| UC-ACT-01 | Sử dụng quyền theo vai trò nghiệp vụ được cấp | Actor có tài khoản | Chỉ thực hiện được hành vi của vai trò hiện hành; một tài khoản có thể mang nhiều vai trò. | Dùng chung |
| UC-ACT-02 | Sử dụng vai trò Giảng viên hướng dẫn trên đề tài sinh viên được gán | Giảng viên | Giảng viên xét duyệt đúng hồ sơ sinh viên được gán bằng tài khoản hiện có. | UCTQ-01 |
| UC-ACT-03 | Sử dụng nhiều vai trò Hội đồng trên cùng tài khoản | Cán bộ/Phòng KHCN (P.KHCN) và các actor Hội đồng theo phân công | Một cá nhân truy cập đúng quyền theo từng Hội đồng/giai đoạn mà không cần tài khoản trùng lặp. | UCTQ-11, UCTQ-12, UCTQ-13, UCTQ-17, UCTQ-18, UCTQ-19 |

#### 2.10.2. Quản lý Hội đồng dùng chung

| Mã UCCT | Tên use case chi tiết | Actor | Kết quả | Mã UCTQ |
|---|---|---|---|---|
| UC-HD-04 | Quản lý thông tin Hội đồng trước mốc chốt phiếu | Cán bộ/Phòng KHCN (P.KHCN) | Thông tin hành chính của Hội đồng được duy trì trong giới hạn cho phép. | UCTQ-11, UCTQ-12, UCTQ-13 |
| UC-HD-05 | Theo dõi tiến độ nộp phiếu của Hội đồng | Cán bộ/Phòng KHCN (P.KHCN) | Theo dõi số phiếu đã nộp và điều kiện quá bán mà không can thiệp đánh giá chuyên môn. | UCTQ-11, UCTQ-12, UCTQ-13 |
| UC-CHOT-01 | Kiểm tra điều kiện quá bán của Hội đồng | Thư ký Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt thuyết minh hoặc Thư ký Hội đồng nghiệm thu | Biết số phiếu hợp lệ có lớn hơn 50% tổng số thành viên hay không. | UCTQ-11, UCTQ-12, UCTQ-13 |
| UC-CHOT-02 | Xác nhận chốt phiếu để bắt đầu lập biên bản | Thư ký Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt thuyết minh hoặc Thư ký Hội đồng nghiệm thu | Tập phiếu được chốt bất biến, phiếu chưa nộp mất hiệu lực, nhận phiếu bị khóa và form biên bản được mở. | UCTQ-11, UCTQ-12, UCTQ-13 |

#### 2.10.3. Xử lý biên bản Hội đồng dùng chung

| Mã UCCT | Tên use case chi tiết | Actor | Kết quả | Mã UCTQ |
|---|---|---|---|---|
| UC-BB-04 | Kiểm tra biên bản do Thư ký nộp | Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch | BM03/BM07/BM12 được xác định hợp lệ để ký tiếp hoặc cần trả sửa. | UCTQ-11, UCTQ-12, UCTQ-13 |
| UC-BB-05 | Trả biên bản để Thư ký sửa | Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch | Biên bản được trả kèm lý do để sửa và nộp lại; không từ chối vĩnh viễn. | UCTQ-11, UCTQ-12, UCTQ-13 |
| UC-BB-06 | Sửa, ký lại và nộp lại biên bản bị trả | Thư ký Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt thuyết minh hoặc Thư ký Hội đồng nghiệm thu | PDF/chữ ký cũ mất hiệu lực; bản mới có chữ ký Thư ký được nộp lại trong thời gian duyệt. | UCTQ-11, UCTQ-12, UCTQ-13 |
| UC-BB-07 | Hoàn tất biên bản bằng chữ ký thứ hai của Chủ tịch | Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch | Bản đủ hai chữ ký được tải lên và xác nhận hoàn tất. | UCTQ-11, UCTQ-12, UCTQ-13 |
| UC-BB-09 | Gia hạn thời gian duyệt biên bản vì lý do chính đáng | Cán bộ/Phòng KHCN (P.KHCN) | Quyền sửa/nộp được mở lại đến hạn mới; lý do gia hạn được lưu để truy vết. | UCTQ-11, UCTQ-12, UCTQ-13 |

#### 2.10.4. Pipeline biểu mẫu/PDF dùng chung

| Mã UCCT | Tên use case chi tiết | Actor | Kết quả | Mã UCTQ |
|---|---|---|---|---|
| UC-FORM-01 | Nhập đầy đủ và lưu dữ liệu biểu mẫu | Người lập BM | Mọi thông tin của biểu mẫu gốc được nhập đầy đủ. | Dùng chung |
| UC-FORM-02 | Xem trước biểu mẫu | Người lập BM | Kiểm tra bản trình bày trước khi xuất. | Dùng chung |
| UC-FORM-03 | Xuất PDF để ký bên ngoài | Người lập BM | PDF được sinh từ dữ liệu form để ký ngoài hệ thống. | Dùng chung |
| UC-FORM-04 | Tiếp tục sửa form và xuất lại PDF trước khi nộp | Người lập BM | Form vẫn sửa được và có thể xuất lại trước mốc nộp. | Dùng chung |
| UC-FORM-05 | Tải PDF đã ký lên bản nháp | Người lập BM | PDF đã ký được gắn tạm thời nhưng form chưa bị khóa. | Dùng chung |
| UC-FORM-07 | Nộp biểu mẫu có PDF đã ký và khóa form | Người lập BM | Bản chính thức được nộp và form không còn được sửa. | Dùng chung |
| UC-FORM-08 | Vô hiệu hóa PDF/chữ ký cũ khi biên bản bị trả và sửa | Thư ký Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt thuyết minh hoặc Thư ký Hội đồng nghiệm thu | Bản cũ mất hiệu lực; phải xuất, ký và nộp bản mới. | UCTQ-11, UCTQ-12, UCTQ-13 |
| UC-FORM-09 | Bổ sung chữ ký thứ hai cho biên bản | Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch | Bản có chữ ký Thư ký được ký thêm và xác nhận là bản đủ hai chữ ký. | UCTQ-11, UCTQ-12, UCTQ-13 |


#### 2.10.5. Thông báo và truy vết

| Mã UCCT | Tên use case chi tiết | Actor | Kết quả | Mã UCTQ |
|---|---|---|---|---|
| UC-TB-01 | Nhận thông báo hạn mới của biên bản | Thư ký Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt thuyết minh hoặc Thư ký Hội đồng nghiệm thu | Thư ký biết hạn mới sau gia hạn. | UCTQ-11, UCTQ-12, UCTQ-13 |
| UC-TB-02 | Truy vết lý do gia hạn biên bản | Cán bộ/Phòng KHCN (P.KHCN) | Lý do và lần gia hạn được lưu để kiểm tra. | UCTQ-11, UCTQ-12, UCTQ-13 |
| UC-TB-03 | Truy vết việc chốt tập phiếu đánh giá | Thư ký Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt thuyết minh hoặc Thư ký Hội đồng nghiệm thu | Có bằng chứng về mốc chốt, số phiếu hợp lệ và tổng số thành viên tại thời điểm chốt. | UCTQ-11, UCTQ-12, UCTQ-13 |
| UC-TB-04 | Theo dõi trạng thái hồ sơ và biểu mẫu | Actor có liên quan | Actor biết trạng thái xử lý của đối tượng mình có quyền. | UCTQ-03 đến UCTQ-19 theo phạm vi |

#### 2.10.6. Use case chưa đủ căn cứ phân rã

| Mã UCCT tạm | Tên use case | Actor | Kết quả | Mã UCTQ |
|---|---|---|---|---|
| UC-TR-01 | Tra cứu sổ tiết NCKH | Giảng viên | **Cần xác minh:** chưa xác định đối tượng tra cứu, dữ liệu đầu vào, điều kiện và kết quả trả về. | UCTQ-02 |

## 3. Ma trận use case chi tiết - actor


| Mã UCCT | Tên use case chi tiết | Các actor |
|---|---|---|
| UC-DOT-01 | Tạo đợt đăng ký NCKH | Cán bộ/Phòng KHCN (P.KHCN) |
| UC-DOT-02 | Cấu hình loại và thời gian của đợt | Cán bộ/Phòng KHCN (P.KHCN) |
| UC-DOT-03 | Quản lý danh mục đề tài giao trực tiếp của đợt | Cán bộ/Phòng KHCN (P.KHCN) |
| UC-DOT-04 | Cập nhật đợt trước khi khóa | Cán bộ/Phòng KHCN (P.KHCN) |
| UC-DOT-05 | Công bố đợt đăng ký | Cán bộ/Phòng KHCN (P.KHCN) |
| UC-DOT-06 | Xem danh sách và tình trạng các đợt | Chủ nhiệm đề tài, Giảng viên, Sinh viên, Cán bộ/Phòng KHCN (P.KHCN) |
| UC-DOT-08 | Theo dõi tình trạng đợt | Cán bộ/Phòng KHCN (P.KHCN) |
| UC-DK-01 | Tạo hồ sơ đăng ký đề tài giảng viên ở trạng thái nháp | Giảng viên |
| UC-DK-02 | Tạo hồ sơ đăng ký đề tài sinh viên ở trạng thái nháp | Sinh viên |
| UC-DK-03 | Cập nhật hồ sơ đăng ký trước khi nộp | Giảng viên, Sinh viên |
| UC-DK-04 | Quản lý thông tin nhóm nghiên cứu trong hồ sơ | Giảng viên, Sinh viên |
| UC-DK-05 | Kiểm tra điều kiện nộp hồ sơ đăng ký | Giảng viên, Sinh viên |
| UC-DK-06 | Lập BM01 từ dữ liệu đăng ký | Giảng viên, Sinh viên |
| UC-DK-07 | Nộp hồ sơ đăng ký kèm BM01 đã ký | Giảng viên, Sinh viên |
| UC-DK-08 | Xem trạng thái xử lý hồ sơ đăng ký | Giảng viên, Sinh viên |
| UC-DK-09 | Xét duyệt hồ sơ sinh viên được hướng dẫn | Giảng viên, Sinh viên |
| UC-DK-10 | Trả hồ sơ sinh viên để sửa | Giảng viên, Sinh viên |
| UC-DK-11 | Xét duyệt hồ sơ giảng viên của đơn vị | Trưởng Khoa/Trưởng đơn vị, Giảng viên |
| UC-DK-12 | Trả hồ sơ giảng viên để sửa | Trưởng Khoa/Trưởng đơn vị, Giảng viên |
| UC-DK-13 | Sửa và nộp lại hồ sơ bị trả | Giảng viên, Sinh viên, Trưởng Khoa/Trưởng đơn vị theo tuyến |
| UC-DK-14 | Gửi yêu cầu hủy hồ sơ | Giảng viên, Sinh viên, Cán bộ/Phòng KHCN (P.KHCN) |
| UC-DK-15 | Xử lý yêu cầu hủy hồ sơ | Cán bộ/Phòng KHCN (P.KHCN), Giảng viên, Sinh viên |
| UC-HD-01 | Tạo Hội đồng xét duyệt hồ sơ | Cán bộ/Phòng KHCN (P.KHCN), Thành viên Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt hồ sơ |
| UC-HD-02 | Tạo Hội đồng xét duyệt thuyết minh | Cán bộ/Phòng KHCN (P.KHCN), Thành viên Hội đồng xét duyệt thuyết minh, Thư ký Hội đồng xét duyệt thuyết minh |
| UC-HD-03 | Tạo Hội đồng nghiệm thu | Cán bộ/Phòng KHCN (P.KHCN), Thành viên Hội đồng nghiệm thu, Thư ký Hội đồng nghiệm thu |
| UC-HD-04 | Quản lý thông tin Hội đồng trước mốc chốt phiếu | Cán bộ/Phòng KHCN (P.KHCN); Thành viên và Thư ký Hội đồng tương ứng |
| UC-HD-05 | Theo dõi tiến độ nộp phiếu của Hội đồng | Cán bộ/Phòng KHCN (P.KHCN); Thành viên và Thư ký Hội đồng tương ứng |
| UC-PH-01 | Xem hồ sơ phục vụ đánh giá xét duyệt hồ sơ | Cán bộ/Phòng KHCN (P.KHCN), Thành viên Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt hồ sơ |
| UC-PH-02 | Lập và nộp phiếu xét duyệt hồ sơ | Cán bộ/Phòng KHCN (P.KHCN), Thành viên Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt hồ sơ |
| UC-PH-03 | Xem hồ sơ phục vụ đánh giá thuyết minh | Cán bộ/Phòng KHCN (P.KHCN), Thành viên Hội đồng xét duyệt thuyết minh, Thư ký Hội đồng xét duyệt thuyết minh |
| UC-PH-04 | Lập và nộp phiếu xét duyệt thuyết minh | Cán bộ/Phòng KHCN (P.KHCN), Thành viên Hội đồng xét duyệt thuyết minh, Thư ký Hội đồng xét duyệt thuyết minh |
| UC-PH-05 | Xem hồ sơ phục vụ đánh giá nghiệm thu | Cán bộ/Phòng KHCN (P.KHCN), Thành viên Hội đồng nghiệm thu, Thư ký Hội đồng nghiệm thu |
| UC-PH-06 | Lập và nộp phiếu nghiệm thu | Cán bộ/Phòng KHCN (P.KHCN), Thành viên Hội đồng nghiệm thu, Thư ký Hội đồng nghiệm thu |
| UC-CHOT-01 | Kiểm tra điều kiện quá bán của Hội đồng | Thư ký Hội đồng tương ứng |
| UC-CHOT-02 | Xác nhận chốt phiếu để bắt đầu lập biên bản | Thư ký Hội đồng tương ứng |
| UC-BB-01 | Lập và nộp biên bản xét duyệt hồ sơ có chữ ký Thư ký | Thư ký Hội đồng xét duyệt hồ sơ, Cán bộ/Phòng KHCN (P.KHCN) |
| UC-BB-02 | Lập và nộp biên bản xét duyệt thuyết minh có chữ ký Thư ký | Thư ký Hội đồng xét duyệt thuyết minh, Cán bộ/Phòng KHCN (P.KHCN) |
| UC-BB-03 | Lập và nộp biên bản nghiệm thu có chữ ký Thư ký | Thư ký Hội đồng nghiệm thu, Cán bộ/Phòng KHCN (P.KHCN) |
| UC-BB-04 | Kiểm tra biên bản do Thư ký nộp | Cán bộ/Phòng KHCN (P.KHCN); Thư ký Hội đồng tương ứng |
| UC-BB-05 | Trả biên bản để Thư ký sửa | Cán bộ/Phòng KHCN (P.KHCN); Thư ký Hội đồng tương ứng |
| UC-BB-06 | Sửa, ký lại và nộp lại biên bản bị trả | Thư ký Hội đồng tương ứng; Cán bộ/Phòng KHCN (P.KHCN) |
| UC-BB-07 | Hoàn tất biên bản bằng chữ ký thứ hai của Chủ tịch | Cán bộ/Phòng KHCN (P.KHCN); Thư ký Hội đồng tương ứng |
| UC-BB-09 | Gia hạn thời gian duyệt biên bản vì lý do chính đáng | Cán bộ/Phòng KHCN (P.KHCN); Thư ký Hội đồng tương ứng |
| UC-TM-01 | Tải thuyết minh hoàn chỉnh lên hồ sơ đề tài | Chủ nhiệm đề tài |
| UC-BC-01 | Lập và nộp báo cáo tiến độ | Chủ nhiệm đề tài |
| UC-BC-02 | Tải báo cáo tổng kết hoàn chỉnh lên hồ sơ đề tài | Chủ nhiệm đề tài |
| UC-BC-03 | Lập và nộp giải trình | Chủ nhiệm đề tài |
| UC-BC-04 | Xem/tải báo cáo tiến độ, tổng kết và giải trình theo quyền | Chủ nhiệm đề tài và actor có quyền |
| UC-TL-01 | Lưu hợp đồng đã ký của đề tài | Cán bộ/Phòng KHCN (P.KHCN), Chủ nhiệm đề tài |
| UC-TL-02 | Xem và tải hợp đồng đã ký của đề tài | Chủ nhiệm đề tài, Cán bộ/Phòng KHCN (P.KHCN) |
| UC-TL-03 | Lưu bản BM14 hoàn chỉnh sau xử lý bên ngoài | Cán bộ/Phòng KHCN (P.KHCN), Chủ nhiệm đề tài |
| UC-TL-04 | Xem bản BM14 hoàn chỉnh | Chủ nhiệm đề tài, Cán bộ/Phòng KHCN (P.KHCN) |
| UC-TL-05 | Đăng và lưu quyết định Hội đồng xét duyệt thuyết minh | Cán bộ/Phòng KHCN (P.KHCN); Chủ nhiệm đề tài, Thành viên Hội đồng xét duyệt thuyết minh, Thư ký Hội đồng xét duyệt thuyết minh theo quyền |
| UC-TL-06 | Xem/tải quyết định Hội đồng xét duyệt thuyết minh | Actor có quyền, Cán bộ/Phòng KHCN (P.KHCN) |
| UC-TL-07 | Đăng và lưu quyết định Hội đồng nghiệm thu | Cán bộ/Phòng KHCN (P.KHCN); Chủ nhiệm đề tài, Thành viên Hội đồng nghiệm thu, Thư ký Hội đồng nghiệm thu theo quyền |
| UC-TL-08 | Xem/tải quyết định Hội đồng nghiệm thu | Actor có quyền, Cán bộ/Phòng KHCN (P.KHCN) |
| UC-TL-09 | Đăng và lưu quyết định công nhận kết quả | Cán bộ/Phòng KHCN (P.KHCN), Chủ nhiệm đề tài |
| UC-TL-10 | Xem/tải quyết định công nhận kết quả | Actor có quyền, Cán bộ/Phòng KHCN (P.KHCN) |
| UC-ACT-01 | Sử dụng quyền theo vai trò nghiệp vụ được cấp | Tất cả actor có tài khoản |
| UC-ACT-02 | Sử dụng vai trò Giảng viên hướng dẫn trên đề tài sinh viên được gán | Giảng viên, Sinh viên |
| UC-ACT-03 | Sử dụng nhiều vai trò Hội đồng trên cùng tài khoản | Cán bộ/Phòng KHCN (P.KHCN) và các actor Hội đồng theo phân công |
| UC-FORM-01 | Nhập đầy đủ và lưu dữ liệu biểu mẫu | Actor lập BM tương ứng |
| UC-FORM-02 | Xem trước biểu mẫu | Actor lập BM tương ứng |
| UC-FORM-03 | Xuất PDF để ký bên ngoài | Actor lập BM tương ứng |
| UC-FORM-04 | Tiếp tục sửa form và xuất lại PDF trước khi nộp | Actor lập BM tương ứng |
| UC-FORM-05 | Tải PDF đã ký lên bản nháp | Actor lập BM tương ứng |
| UC-FORM-07 | Nộp biểu mẫu có PDF đã ký và khóa form | Actor lập BM tương ứng |
| UC-FORM-08 | Vô hiệu hóa PDF/chữ ký cũ khi biên bản bị trả và sửa | Thư ký Hội đồng tương ứng |
| UC-FORM-09 | Bổ sung chữ ký thứ hai cho biên bản | Cán bộ/Phòng KHCN (P.KHCN) |
| UC-TB-01 | Nhận thông báo hạn mới của biên bản | Thư ký Hội đồng tương ứng; Cán bộ/Phòng KHCN (P.KHCN) |
| UC-TB-02 | Truy vết lý do gia hạn biên bản | Cán bộ/Phòng KHCN (P.KHCN); Thư ký Hội đồng tương ứng |
| UC-TB-03 | Truy vết việc chốt tập phiếu đánh giá | Thư ký Hội đồng tương ứng |
| UC-TB-04 | Theo dõi trạng thái hồ sơ và biểu mẫu | Tất cả actor theo quyền |
| UC-TR-01 | Tra cứu sổ tiết NCKH | Giảng viên - Cần xác minh |

