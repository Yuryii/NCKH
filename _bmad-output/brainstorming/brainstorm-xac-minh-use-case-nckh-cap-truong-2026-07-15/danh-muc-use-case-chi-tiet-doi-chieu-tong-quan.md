# Danh mục use case chi tiết và đối chiếu use case tổng quan

## 1. Phạm vi và quy ước

Tài liệu này chỉ sử dụng các nguồn trong thư mục brainstorming hiện tại:

- `use-case-tong-quan-v2.png` đến `use-case-tong-quan-v5.png`;
- `use-case-tong-quan.png`;
- `phan-tich-bieu-mau-bm01-bm15.md`.

Không sử dụng tài liệu nghiệp vụ, mã nguồn hay giả định ngoài các nguồn trên.

### 1.1. Đường cơ sở đối chiếu

`use-case-tong-quan-v5.png` được chọn làm đường cơ sở chính vì đây là phiên bản có số thứ tự cao nhất và có phạm vi đầy đủ nhất: 19 use case tổng quan. Bản `use-case-tong-quan.png` không đánh số chỉ có 14 use case; các sai lệch giữa hai bản được nêu tại Mục 5.

### 1.2. Trạng thái xác định

- **Đã xác định**: có đủ căn cứ để đưa vào danh mục use case chi tiết.
- **Có điều kiện**: mục tiêu nghiệp vụ có căn cứ nhưng cách hệ thống thực hiện còn phải xác minh.
- **Chưa đủ căn cứ phân rã**: chỉ thấy tên ở sơ đồ tổng quan, báo cáo BM01–BM15 không mô tả luồng hoặc dữ liệu tương ứng.
- **Dùng chung**: năng lực được nhiều use case nghiệp vụ gọi lại; không nhất thiết thể hiện thành oval ở sơ đồ tổng quan.

## 2. Tác nhân hợp nhất

| Mã | Tác nhân | Căn cứ/phạm vi |
|---|---|---|
| ACT-01 | Người đăng ký đề tài | Tác nhân tổng quát của Giảng viên và Sinh viên |
| ACT-02 | Giảng viên | Đăng ký đề tài của giảng viên; xét duyệt hồ sơ sinh viên với vai trò giảng viên hướng dẫn |
| ACT-03 | Sinh viên | Đăng ký đề tài sinh viên |
| ACT-04 | Cán bộ phụ trách Khoa/Trưởng đơn vị | Xét duyệt hồ sơ giảng viên; xác nhận BM08 theo tuyến |
| ACT-05 | Cán bộ/Trưởng P.KHCN | Công bố đợt, điều phối xét duyệt, đăng thông báo/quyết định, tổng hợp và xử lý hồ sơ |
| ACT-06 | Thành viên Hội đồng xét duyệt hồ sơ | Lập, ký và nộp BM02 |
| ACT-07 | Thành viên Hội đồng xét duyệt thuyết minh | Lập, ký và nộp BM06 |
| ACT-08 | Thành viên Hội đồng nghiệm thu | Lập, ký và nộp BM11 |
| ACT-09 | Chủ tịch/Thư ký Hội đồng | Xác nhận tài liệu tổng hợp BM03, BM07, BM12; người lập cụ thể còn phải xác minh |
| ACT-10 | Đại diện Nhà trường | Ký/xử lý BM14 theo vai Bên A |

## 3. Danh mục toàn bộ use case chi tiết

### 3.1. Quản lý đợt và đăng ký đề tài

| ID | Use case chi tiết | Tác nhân chính | Kết quả nghiệp vụ | Ánh xạ use case tổng quan v5 | BM | Trạng thái |
|---|---|---|---|---|---|---|
| UC-DT-01 | Thiết lập đợt tuyển chọn đề tài | ACT-05 | Lưu loại đợt, thời gian mở/đóng và thông báo | Công bố đợt tuyển chọn đề tài | BM01A/B | Đã xác định |
| UC-DT-02 | Công bố đợt tuyển chọn đề tài | ACT-05 | Đợt tuyển chọn khả dụng cho người đăng ký | Công bố đợt tuyển chọn đề tài | BM01A/B | Đã xác định |
| UC-DT-03 | Thiết lập đợt giao trực tiếp và danh mục đề tài | ACT-05 | Lưu đợt và danh mục đề tài giao trực tiếp | Công bố đợt giao trực tiếp và danh mục đề tài | BM01A/B | Đã xác định |
| UC-DT-04 | Công bố đợt giao trực tiếp và danh mục đề tài | ACT-05 | Giảng viên có thể chọn đề tài được giao | Công bố đợt giao trực tiếp và danh mục đề tài | BM01A | Đã xác định |
| UC-DK-01 | Lập và cập nhật nháp phiếu đăng ký giảng viên | ACT-02 | Hồ sơ BM01A được lưu nháp | Đăng ký đề xuất đề tài tuyển chọn / Đăng ký thực hiện đề tài giao trực tiếp | BM01A | Đã xác định |
| UC-DK-02 | Lập và cập nhật nháp phiếu đăng ký sinh viên | ACT-03 | Hồ sơ BM01B được lưu nháp, có giảng viên hướng dẫn | Đăng ký đề xuất đề tài tuyển chọn | BM01B | Đã xác định |
| UC-DK-03 | Nộp đăng ký đề tài giảng viên | ACT-02 | Khóa phiên bản đã nộp và chuyển đến Khoa | Đăng ký đề xuất đề tài tuyển chọn / Đăng ký thực hiện đề tài giao trực tiếp | BM01A | Đã xác định |
| UC-DK-04 | Nộp đăng ký đề tài sinh viên | ACT-03 | Khóa phiên bản đã nộp và chuyển đến giảng viên hướng dẫn | Đăng ký đề xuất đề tài tuyển chọn | BM01B | Đã xác định |
| UC-DK-05 | Xét duyệt đăng ký đề tài sinh viên | ACT-02 | Giảng viên hướng dẫn duyệt và chuyển thẳng P.KHCN; không qua Khoa | Xét duyệt đăng ký đề tài sinh viên | BM01B | Đã xác định |
| UC-DK-06 | Xét duyệt đăng ký đề tài giảng viên | ACT-04 | Khoa duyệt và chuyển P.KHCN | Xét duyệt đăng ký đề tài giảng viên | BM01A | Đã xác định |
| UC-DK-07 | Yêu cầu chỉnh sửa và nộp lại đăng ký | ACT-02/ACT-04/ACT-05, ACT-01 | Tạo vòng chỉnh sửa/nộp lại trước mốc đóng băng | Quản lý xét duyệt hồ sơ | BM01A/B | Có điều kiện: chưa chốt sửa trên bản hiện có hay tạo phiên bản nộp lại |
| UC-DK-08 | Đóng băng hồ sơ đăng ký đã được chấp thuận | ACT-05 | Sau kết luận BM03, BM01, thông tin đề tài và nhóm thực hiện không còn được sửa | Quản lý xét duyệt hồ sơ | BM01A/B, BM03 | Đã xác định |

### 3.2. Xét duyệt hồ sơ đăng ký

| ID | Use case chi tiết | Tác nhân chính | Kết quả nghiệp vụ | Ánh xạ use case tổng quan v5 | BM | Trạng thái |
|---|---|---|---|---|---|---|
| UC-HS-01 | Tiếp nhận và quản lý hồ sơ đăng ký | ACT-05 | Hồ sơ hợp lệ được đưa vào quy trình xét duyệt sơ bộ | Quản lý xét duyệt hồ sơ | BM01A/B | Đã xác định |
| UC-HS-02 | Thành lập/nhập Hội đồng và phân công đánh giá hồ sơ | ACT-05 | Thành viên được gán đề tài để lập BM02 | Quản lý xét duyệt hồ sơ | BM02, BM03 | Đã xác định ở mức mục tiêu; cách nhập Hội đồng chưa được mô tả chi tiết |
| UC-HS-03 | Nhập nhận xét và kết luận đề xuất | ACT-06 | Lưu nhận xét, kiến nghị thực hiện/không thực hiện và đề xuất thay thế | Nhận xét hồ sơ đăng ký | BM02 | Đã xác định |
| UC-HS-04 | Ký tay, tải và nộp phiếu nhận xét hồ sơ | ACT-06 | Phiếu BM02 riêng của từng thành viên được hoàn tất | Nhận xét hồ sơ đăng ký | BM02 | Đã xác định |
| UC-HS-05 | Theo dõi hoàn tất các phiếu BM02 song song | ACT-05 | Trạng thái từng phiếu được kiểm soát trước bước tổng hợp | Quản lý xét duyệt hồ sơ | BM02 | Đã xác định; ngưỡng mở BM03 chưa được nêu riêng |
| UC-HS-06 | Tổng hợp kết quả xét duyệt và lập biên bản | ACT-05/ACT-09 | Dữ liệu BM02 được tổng hợp thành BM03 và kết luận danh mục thực hiện | Quản lý xét duyệt hồ sơ | BM03 | Đã xác định; người lập cụ thể còn phải xác minh |
| UC-HS-07 | Xác nhận tuần tự biên bản xét duyệt hồ sơ | ACT-09 | BM03 được Chủ tịch và Thư ký xác nhận đúng phiên bản | Quản lý xét duyệt hồ sơ | BM03 | Đã xác định ở mức quy tắc ký nhiều cấp |

### 3.3. Nộp và xét duyệt thuyết minh

| ID | Use case chi tiết | Tác nhân chính | Kết quả nghiệp vụ | Ánh xạ use case tổng quan v5 | BM | Trạng thái |
|---|---|---|---|---|---|---|
| UC-TM-01 | Tải lên phiên bản thuyết minh | ACT-01 | Lưu file BM04A/B được soạn ngoài hệ thống, kiểm tra định dạng/dung lượng | Nộp thuyết minh đề tài | BM04A/B | Đã xác định; quy tắc file và số lần nộp lại chưa chốt |
| UC-TM-02 | Nộp thuyết minh để xét duyệt | ACT-01 | Khóa phiên bản và chuyển P.KHCN/Hội đồng | Nộp thuyết minh đề tài | BM04A/B | Đã xác định |
| UC-TM-03 | Đăng thông báo kèm quyết định Hội đồng thuyết minh | ACT-05 | File BM05 lập bên ngoài được công bố; hệ thống không soạn/phê duyệt BM05 | Đăng thông báo/quyết định | BM05 | Đã xác định |
| UC-TM-04 | Nhập Hội đồng và phân công nhận xét thuyết minh | ACT-05 | Thành viên được gán đề tài để lập BM06 | Quản lý xét duyệt thuyết minh | BM05, BM06 | Có điều kiện: cách nhập danh sách Hội đồng chưa chốt |
| UC-TM-05 | Chấm điểm và nhận xét thuyết minh | ACT-07 | Điểm 11 tiêu chí được kiểm tra, tính tổng; lý do bắt buộc khi cần | Nhận xét thuyết minh đề tài | BM06 | Đã xác định |
| UC-TM-06 | Ký tay, tải và nộp phiếu nhận xét thuyết minh | ACT-07 | Phiếu BM06 riêng của thành viên được hoàn tất | Nhận xét thuyết minh đề tài | BM06 | Đã xác định |
| UC-TM-07 | Theo dõi điều kiện hoàn tất BM06 | ACT-05 | Chỉ mở BM07 khi 100% người được phân công trong BM05 hoàn tất, ký và tải BM06 | Quản lý xét duyệt thuyết minh | BM05, BM06 | Đã xác định |
| UC-TM-08 | Tổng hợp kết quả và lập biên bản xét duyệt thuyết minh | ACT-05/ACT-09 | BM06 được tổng hợp, kết luận được ghi vào BM07 | Quản lý xét duyệt thuyết minh | BM07 | Đã xác định; người lập cụ thể còn phải xác minh |
| UC-TM-09 | Xác nhận tuần tự biên bản xét duyệt thuyết minh | ACT-09 | BM07 được Chủ tịch và Thư ký xác nhận đúng phiên bản | Quản lý xét duyệt thuyết minh | BM07 | Đã xác định ở mức quy tắc ký nhiều cấp |

### 3.4. Báo cáo tiến độ

| ID | Use case chi tiết | Tác nhân chính | Kết quả nghiệp vụ | Ánh xạ use case tổng quan v5 | BM | Trạng thái |
|---|---|---|---|---|---|---|
| UC-TD-01 | Lập báo cáo tiến độ giữa kỳ | ACT-01 | Hình thành BM08 với tiến độ, sản phẩm, tài chính, kế hoạch và kiến nghị | Gửi đơn báo cáo tiến độ 1/2 thời gian | BM08 | Có điều kiện: chưa chốt nhập dữ liệu trên hệ thống hay chỉ tải file hoàn chỉnh |
| UC-TD-02 | Nộp và xác nhận báo cáo tiến độ | ACT-01, ACT-04 | Báo cáo được chủ nhiệm và trưởng đơn vị xác nhận theo tuyến | Gửi đơn báo cáo tiến độ 1/2 thời gian | BM08 | Đã xác định ở mức mục tiêu; tuyến riêng cho hồ sơ sinh viên chưa nêu |

### 3.5. Nộp hồ sơ và nghiệm thu

| ID | Use case chi tiết | Tác nhân chính | Kết quả nghiệp vụ | Ánh xạ use case tổng quan v5 | BM | Trạng thái |
|---|---|---|---|---|---|---|
| UC-NT-01 | Chuẩn bị báo cáo tổng kết | ACT-01 | Báo cáo theo BM09 và metadata/bìa/thông tin kết quả được hình thành | Nộp hồ sơ nghiệm thu | BM09 | Có điều kiện: chưa chốt trình soạn thảo đầy đủ hay tải Word/PDF hoàn chỉnh |
| UC-NT-02 | Nộp hồ sơ nghiệm thu | ACT-01 | Báo cáo tổng kết và các thành phần hồ sơ được chuyển P.KHCN | Nộp hồ sơ nghiệm thu | BM09 | Đã xác định ở mức mục tiêu |
| UC-NT-03 | Đăng thông báo kèm quyết định Hội đồng nghiệm thu | ACT-05 | File BM10 lập bên ngoài được công bố; hệ thống không soạn/phê duyệt BM10 | Đăng thông báo/quyết định | BM10 | Đã xác định |
| UC-NT-04 | Nhập Hội đồng và phân công đánh giá nghiệm thu | ACT-05 | Thành viên được gán đề tài để lập BM11 | Quản lý nghiệm thu đề tài | BM10, BM11 | Có điều kiện: cách nhập Hội đồng và nguồn sản phẩm kế hoạch chưa chốt |
| UC-NT-05 | Đánh giá kết quả thực hiện đề tài | ACT-08 | Từng sản phẩm được đánh giá về số lượng, chất lượng và xếp loại chung | Đánh giá hồ sơ nghiệm thu | BM11 | Đã xác định; nguồn dữ liệu kế hoạch thay BM04 chưa chốt |
| UC-NT-06 | Ký tay, tải và nộp phiếu đánh giá nghiệm thu | ACT-08 | Phiếu BM11 riêng của thành viên được hoàn tất | Đánh giá hồ sơ nghiệm thu | BM11 | Đã xác định |
| UC-NT-07 | Theo dõi hoàn tất các phiếu BM11 song song | ACT-05 | Trạng thái từng phiếu được kiểm soát trước bước tổng hợp | Quản lý nghiệm thu đề tài | BM11 | Đã xác định; ngưỡng mở BM12 chưa được nêu |
| UC-NT-08 | Tổng hợp kết quả và lập biên bản nghiệm thu | ACT-05/ACT-09 | BM11 được tổng hợp; xếp loại, yêu cầu sửa, sản phẩm và kiến nghị được ghi vào BM12 | Quản lý nghiệm thu đề tài | BM12 | Đã xác định; người lập cụ thể còn phải xác minh |
| UC-NT-09 | Xác nhận tuần tự biên bản nghiệm thu | ACT-09 | BM12 được Chủ tịch và Thư ký xác nhận đúng phiên bản | Quản lý nghiệm thu đề tài | BM12 | Đã xác định ở mức quy tắc ký nhiều cấp |

### 3.6. Chỉnh sửa sau nghiệm thu, thanh lý và công nhận

| ID | Use case chi tiết | Tác nhân chính | Kết quả nghiệp vụ | Ánh xạ use case tổng quan v5 | BM | Trạng thái |
|---|---|---|---|---|---|---|
| UC-CS-01 | Lập giải trình theo từng yêu cầu chỉnh sửa | ACT-01 | Yêu cầu từ BM12 được nạp; chủ nhiệm nhập giải trình tương ứng | Nộp giải trình chỉnh sửa báo cáo nghiệm thu đề tài | BM12, BM13 | Đã xác định |
| UC-CS-02 | Đính kèm bản sửa và nộp giải trình | ACT-01 | BM13 và bản báo cáo sửa được lưu, nộp theo phiên bản | Nộp giải trình chỉnh sửa báo cáo nghiệm thu đề tài | BM13 | Đã xác định |
| UC-CS-03 | Tiếp nhận và xử lý hồ sơ chỉnh sửa | ACT-05 | Hồ sơ sửa sau nghiệm thu được kiểm soát trước thanh lý | Quản lý nghiệm thu đề tài | BM13 | Đã xác định ở mức mục tiêu; tiêu chí chấp nhận chưa được mô tả |
| UC-TL-01 | Lập biên bản nghiệm thu và thanh lý | ACT-05/ACT-10 | Dữ liệu hợp đồng, BM12/BM13, bàn giao và tài chính được tổng hợp thành BM14 | Quản lý nghiệm thu đề tài | BM14 | Đã xác định; nguồn dữ liệu tài chính còn phải xác minh |
| UC-TL-02 | Ký và hoàn tất thanh lý | ACT-05/ACT-10 | Hai bên ký đúng nhánh hoàn thành hoặc dừng/thanh lý | Quản lý nghiệm thu đề tài | BM14 | Đã xác định ở mức mục tiêu |
| UC-CN-01 | Đăng thông báo kèm quyết định công nhận kết quả | ACT-05 | File BM15 lập/ký ngoài hệ thống được công bố | Đăng thông báo/quyết định | BM15 | Đã xác định |

### 3.7. Thông báo, tra cứu và năng lực dùng chung

| ID | Use case chi tiết | Tác nhân chính | Kết quả nghiệp vụ | Ánh xạ use case tổng quan v5 | BM | Trạng thái |
|---|---|---|---|---|---|---|
| UC-TB-01 | Xem và tải thông báo/quyết định | ACT-01 | Người đăng ký tiếp cận các file BM05, BM10, BM15 và thông báo liên quan | Xem thông báo/quyết định | BM05, BM10, BM15 | Đã xác định |
| UC-TR-01 | Tra cứu “sổ tiết NCKH” | ACT-02 | Chưa xác định ngoài tên use case trên sơ đồ | Tra cứu sổ tiết NCKH | Không có | Chưa đủ căn cứ phân rã; cần xác minh cả tên gọi và mục tiêu |
| UC-DC-01 | Sinh biểu mẫu Word | Hệ thống, tác nhân khởi tạo tài liệu | Sinh BM01, BM02, BM03, BM06, BM07, BM08 (nếu nhập cấu trúc), BM11, BM12, BM13, BM14 từ snapshot | Năng lực dùng chung, không có oval tổng quan | BM01–BM03, BM06–BM08, BM11–BM14 | Dùng chung |
| UC-DC-02 | Quản lý snapshot, file và lịch sử phiên bản | Mọi tác nhân nghiệp vụ | Giữ đúng dữ liệu, file sinh, file ký và lịch sử tại từng lần nộp/duyệt | Cắt ngang các use case nộp/xét duyệt/nghiệm thu | BM01–BM15 | Dùng chung |
| UC-DC-03 | Thực hiện tuyến ký tay tuần tự | Người lập và các cấp ký | Bản ký ở bước trước được chuyển đến bước sau; thay đổi nội dung tạo phiên bản mới và vô hiệu hóa duyệt sau | Cắt ngang các tài liệu nhiều chữ ký | BM01, BM03, BM07, BM08, BM12, BM14 | Dùng chung |
| UC-DC-04 | Xử lý các phiếu một chữ ký song song | ACT-05, ACT-06/07/08 | Mỗi người nhận phiếu riêng; hệ thống theo dõi độc lập và kiểm soát điều kiện tổng hợp | Quản lý xét duyệt hồ sơ / thuyết minh / nghiệm thu | BM02, BM06, BM11 | Dùng chung |
| UC-DC-05 | Xem trạng thái, lịch sử và tài liệu đã sinh | Mọi tác nhân được phân quyền | Truy vết hồ sơ, phiên bản và tài liệu qua các bước | Cắt ngang các use case nghiệp vụ | BM01–BM15 | Dùng chung |

**Tổng danh mục:** 52 use case chi tiết/năng lực, gồm 41 mục đã xác định, 5 mục có điều kiện, 1 mục chưa đủ căn cứ phân rã và 5 năng lực dùng chung.

## 4. Ma trận bao phủ use case tổng quan v5

| # | Use case tổng quan v5 | Use case chi tiết bao phủ | Kết luận |
|---|---|---|---|
| 1 | Xét duyệt đăng ký đề tài sinh viên | UC-DK-05 | Đủ ở mức hiện tại; tuyến Sinh viên → Giảng viên → P.KHCN đã chốt |
| 2 | Tra cứu sổ tiết NCKH | UC-TR-01 | **Chưa đủ căn cứ** để xác định dữ liệu, điều kiện và kết quả tra cứu |
| 3 | Đăng ký thực hiện đề tài giao trực tiếp | UC-DK-01, UC-DK-03, UC-DT-03, UC-DT-04 | Bao phủ; dùng BM01A |
| 4 | Đăng ký đề xuất đề tài tuyển chọn | UC-DK-01 đến UC-DK-04, UC-DT-01, UC-DT-02 | Bao phủ cho cả giảng viên và sinh viên |
| 5 | Gửi đơn báo cáo tiến độ 1/2 thời gian | UC-TD-01, UC-TD-02 | Bao phủ có điều kiện vì cách xử lý BM08 chưa chốt |
| 6 | Nộp thuyết minh đề tài | UC-TM-01, UC-TM-02 | Bao phủ; phải là tải file/phiên bản, không phải form soạn BM04 |
| 7 | Nộp hồ sơ nghiệm thu | UC-NT-01, UC-NT-02 | Bao phủ có điều kiện vì cách xử lý BM09 chưa chốt |
| 8 | Xem thông báo/quyết định | UC-TB-01 | Bao phủ |
| 9 | Nộp giải trình chỉnh sửa báo cáo nghiệm thu đề tài | UC-CS-01, UC-CS-02 | Bao phủ |
| 10 | Xét duyệt đăng ký đề tài giảng viên | UC-DK-06 | Đủ ở mức hiện tại; tuyến Giảng viên → Khoa → P.KHCN đã chốt |
| 11 | Quản lý xét duyệt hồ sơ | UC-DK-07, UC-DK-08, UC-HS-01, UC-HS-02, UC-HS-05 đến UC-HS-07 | Bao phủ; còn điểm mở về nhập Hội đồng, ngưỡng mở BM03 và người lập BM03 |
| 12 | Quản lý xét duyệt thuyết minh | UC-TM-04, UC-TM-07 đến UC-TM-09 | Bao phủ; điều kiện 100% BM06 đã chốt |
| 13 | Quản lý nghiệm thu đề tài | UC-NT-04, UC-NT-07 đến UC-NT-09, UC-CS-03, UC-TL-01, UC-TL-02 | Bao phủ theo chuỗi BM10–BM14; còn điểm mở về dữ liệu kế hoạch/tài chính |
| 14 | Công bố đợt giao trực tiếp và danh mục đề tài | UC-DT-03, UC-DT-04 | Bao phủ |
| 15 | Công bố đợt tuyển chọn đề tài | UC-DT-01, UC-DT-02 | Bao phủ |
| 16 | Đăng thông báo/quyết định | UC-TM-03, UC-NT-03, UC-CN-01 | Bao phủ BM05, BM10, BM15; chỉ đăng file lập ngoài hệ thống |
| 17 | Nhận xét thuyết minh đề tài | UC-TM-05, UC-TM-06 | Bao phủ bằng BM06 |
| 18 | Đánh giá hồ sơ nghiệm thu | UC-NT-05, UC-NT-06 | Bao phủ bằng BM11; nguồn sản phẩm kế hoạch chưa chốt |
| 19 | Nhận xét hồ sơ đăng ký | UC-HS-03, UC-HS-04 | Bao phủ bằng BM02 |

Kết quả: **18/19 use case tổng quan có thể phân rã**, trong đó 13 mục được bao phủ rõ và 5 mục còn ít nhất một quyết định nghiệp vụ/thiết kế phải xác minh. Use case “Tra cứu sổ tiết NCKH” chưa có căn cứ ngoài tên trên sơ đồ.

## 5. Sai lệch giữa v5 và bản `use-case-tong-quan.png`

### 5.1. Có trong v5 nhưng thiếu ở bản không đánh số

- `Đăng thông báo/quyết định`;
- `Xem thông báo/quyết định`;
- `Nộp giải trình chỉnh sửa báo cáo nghiệm thu đề tài`.

Ba use case này đều có căn cứ trực tiếp trong phân tích BM05/BM10/BM15 và BM13, vì vậy việc bỏ chúng khỏi bản không đánh số làm mất phạm vi nghiệp vụ.

### 5.2. Khác cách đặt tên

| v5 | Bản không đánh số | Nhận định |
|---|---|---|
| Đăng ký thực hiện đề tài giao trực tiếp | Đăng ký đề tài giao trực tiếp | v5 rõ mục tiêu hơn; không thay đổi phạm vi cốt lõi |
| Đăng ký đề xuất đề tài tuyển chọn | Đăng ký đề tài tuyển chọn | v5 phân biệt “đề xuất” với quyết định chấp thuận |
| Công bố đợt giao trực tiếp và danh mục đề tài | Công bố đợt đăng ký đề tài giao trực tiếp | Bản không đánh số làm mờ thành phần “danh mục đề tài” đã có trong dữ liệu đợt |
| Công bố đợt tuyển chọn đề tài | Công bố đợt đăng ký đề tài tuyển chọn | Khác diễn đạt, phạm vi gần tương đương |

### 5.3. Khuyến nghị đường cơ sở

Giữ v5 làm đường cơ sở cho đến khi có xác nhận chính thức. Không nên dùng bản `use-case-tong-quan.png` hiện tại để lập đặc tả vì bản đó không truy vết được đầy đủ BM13, BM05, BM10 và BM15.

## 6. Use case chi tiết chưa có oval riêng trên sơ đồ tổng quan

Các mục sau có căn cứ nghiệp vụ nhưng đang bị gộp dưới các oval quản lý lớn:

- yêu cầu chỉnh sửa/nộp lại và đóng băng hồ sơ đăng ký;
- nhập Hội đồng và phân công đánh giá ở ba giai đoạn;
- theo dõi hoàn tất phiếu song song;
- tổng hợp và xác nhận BM03, BM07, BM12;
- tiếp nhận chỉnh sửa sau nghiệm thu;
- lập/ký BM14;
- sinh Word, quản lý snapshot/phiên bản và tuyến ký tay.

Đây là cách gộp chấp nhận được ở sơ đồ tổng quan, nhưng các mục phải xuất hiện ở sơ đồ phân rã hoặc đặc tả use case để tránh mất yêu cầu.

## 7. Khoảng trống phải xác minh trước khi đặc tả đầy đủ

1. Ý nghĩa chính xác của “Tra cứu sổ tiết NCKH”, đối tượng được tra cứu và dữ liệu trả về.
2. BM08 được nhập có cấu trúc trên hệ thống hay chỉ tải file; tuyến xác nhận đối với đề tài sinh viên.
3. BM09 được soạn đầy đủ trên hệ thống hay chỉ nhập metadata/tải Word/PDF.
4. Cách nhập danh sách Hội đồng từ BM05/BM10 và cách phân công BM02/BM06/BM11.
5. Ngưỡng hoàn tất để mở BM03 và BM12; hiện chỉ BM07 có quy tắc 100% được chốt.
6. Người chịu trách nhiệm lập BM03, BM07, BM12.
7. Quy tắc chỉnh sửa/nộp lại BM01 và quy tắc file/phiên bản BM04.
8. Nguồn dữ liệu sản phẩm kế hoạch cho BM11/BM12 khi BM04 không được cấu trúc hóa.
9. Nguồn dữ liệu hợp đồng và tài chính cho BM14.
10. Hình thức xác nhận ở từng bước ngoài quy tắc ký tay tổng quát đã chốt.

## 8. Kết luận phân tích

- Danh mục hiện tại bao phủ toàn bộ chuỗi nghiệp vụ có bằng chứng từ BM01–BM15: mở đợt → đăng ký → xét duyệt hồ sơ → thuyết minh → tiến độ → nghiệm thu → chỉnh sửa → thanh lý → công nhận.
- Không tạo use case “Soạn thuyết minh BM04” hoặc “Sinh Word BM04”, vì nguồn đã chốt BM04 được soạn ngoài hệ thống.
- Không tạo use case “Lập/phê duyệt quyết định BM05/BM10/BM15”, vì hệ thống chỉ đăng thông báo và đính kèm file đã có.
- “Sinh biểu mẫu Word” là năng lực dùng chung, chỉ nên thể hiện bằng quan hệ dùng lại ở các sơ đồ phân rã nơi việc sinh Word là bắt buộc.
- Bước tiếp theo hợp lý là xác minh 10 khoảng trống ở Mục 7, sau đó lập sơ đồ phân rã và đặc tả theo từng nhóm use case.
