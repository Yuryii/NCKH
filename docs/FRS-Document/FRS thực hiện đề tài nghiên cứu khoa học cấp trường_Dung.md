**TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐỒNG NAI**

**ĐẶC TẢ YÊU CẦU CHỨC NĂNG**

**(FUNCTIONAL REQUIREMENTS SPECIFICATION)**

**Thực hiện đề tài nghiên cứu khoa học cấp trường**

**Phiên bản 0.1 - Bản dự thảo**

| **Thông tin** | **Nội dung** |
| --- | --- |
| Mã tài liệu | FRS-NCKH-001 |
| Phiên bản | 0.1 |
| Ngày lập | Tháng 07 năm 2026 |
| Trạng thái | Bản dự thảo |
| Chủ đầu tư |  |
| Đơn vị lập |  |
| Tài liệu liên quan | Quy trình thực hiện đề tài NCKH cấp trường; BM01-BM15; danh mục use case NCKH |
| Lưu ý | Các nội dung ghi Cần xác minh chưa thuộc baseline triển khai. |

**Tài liệu này thuộc phạm vi nội bộ - Không phát hành ra bên ngoài khi chưa có sự đồng ý của chủ đầu tư.**

# LỊCH SỬ THAY ĐỔI TÀI LIỆU

| **Phiên bản** | **Ngày** | **Nội dung thay đổi** | **Người thực hiện** | **Ghi chú** |
| --- | --- | --- | --- | --- |
| 0.1 | 07/2026 | Khởi tạo bản FRS dự thảo hệ thống NCKH |  | Chờ review và xác nhận |

# MỤC LỤC

LỊCH SỬ THAY ĐỔI TÀI LIỆU 2

MỤC LỤC 2

CHƯƠNG 1: TỔNG QUAN TÀI LIỆU 6

1.1. Mục đích tài liệu 6

1.2. Phạm vi hệ thống 6

1.3. Yêu cầu nghiệp vụ cốt lõi 7

1.4. Đối tượng sử dụng 7

1.5. Định nghĩa và từ viết tắt 8

1.6. Tài liệu tham chiếu 8

CHƯƠNG 2: USER STORY, LUỒNG XỬ LÝ VÀ TRẠNG THÁI 9

2.1. Bộ user story 9

2.2. Luồng xử lý tổng thể 12

2.3. Mô hình trạng thái 13

2.3.1. Trạng thái đợt đăng ký 13

2.3.2. Trạng thái hồ sơ đăng ký 13

2.3.3. Trạng thái đề tài NCKH 14

2.3.4. Trạng thái Hội đồng 14

2.3.5. Trạng thái biểu mẫu 15

CHƯƠNG 3: YÊU CẦU CHỨC NĂNG CHI TIẾT 16

3.1. Module M01 - Quản lý đợt đăng ký 16

3.1.1. Mô tả chức năng 16

3.1.2. Yêu cầu chức năng 16

3.1.3. Trường dữ liệu chính 17

3.1.4. Quy tắc nghiệp vụ 18

3.1.5. Kết quả đầu ra 19

3.1.6. Tiêu chí nghiệm thu 19

3.2. Module M02 - Đăng ký và xét duyệt tuyến đầu 20

3.2.1. Mô tả chức năng 20

3.2.2. Yêu cầu chức năng 20

3.2.3. Trường dữ liệu chính 23

3.2.4. Quy tắc nghiệp vụ 24

3.2.5. Kết quả đầu ra 26

3.2.6. Tiêu chí nghiệm thu 26

3.3. Module M03 - Xét duyệt đề xuất sơ bộ 28

3.3.1. Mô tả chức năng 28

3.3.2. Yêu cầu chức năng 29

3.3.3. Trường dữ liệu chính 30

3.3.4. Quy tắc nghiệp vụ 30

3.3.5. Kết quả đầu ra 31

3.3.6. Tiêu chí nghiệm thu 31

3.4. Module M04 - Nộp thuyết minh 32

3.4.1. Mô tả chức năng 32

3.4.2. Yêu cầu chức năng 32

3.4.3. Trường dữ liệu chính 32

3.4.4. Quy tắc nghiệp vụ 33

3.4.5. Kết quả đầu ra 33

3.4.6. Tiêu chí nghiệm thu 33

3.5. Module M05 - Phê duyệt thuyết minh và hợp đồng 34

3.5.1. Mô tả chức năng 34

3.5.2. Yêu cầu chức năng 34

3.5.3. Trường dữ liệu chính 36

3.5.4. Quy tắc nghiệp vụ 37

3.5.5. Kết quả đầu ra 37

3.5.6. Tiêu chí nghiệm thu 38

3.6. Module M06 - Thực hiện và báo cáo tiến độ 39

3.6.1. Mô tả chức năng 39

3.6.2. Yêu cầu chức năng 39

3.6.3. Trường dữ liệu chính 40

3.6.4. Quy tắc nghiệp vụ 40

3.6.5. Kết quả đầu ra 40

3.6.6. Tiêu chí nghiệm thu 41

3.7. Module M07 - Nộp hồ sơ và nghiệm thu 41

3.7.1. Mô tả chức năng 41

3.7.2. Yêu cầu chức năng 41

3.7.3. Trường dữ liệu chính 43

3.7.4. Quy tắc nghiệp vụ 44

3.7.5. Kết quả đầu ra 44

3.7.6. Tiêu chí nghiệm thu 44

3.8. Module M08 - Chỉnh sửa sau nghiệm thu và BM14 45

3.8.1. Mô tả chức năng 45

3.8.2. Yêu cầu chức năng 46

3.8.3. Trường dữ liệu chính 46

3.8.4. Quy tắc nghiệp vụ 47

3.8.5. Kết quả đầu ra 47

3.8.6. Tiêu chí nghiệm thu 47

3.9. Module M09 - Công nhận kết quả 48

3.9.1. Mô tả chức năng 48

3.9.2. Yêu cầu chức năng 48

3.9.3. Trường dữ liệu chính 49

3.9.4. Quy tắc nghiệp vụ 49

3.9.5. Kết quả đầu ra 49

3.9.6. Tiêu chí nghiệm thu 50

3.10. Module M10 - Actor, phân quyền và truy cập 50

3.10.1. Mô tả chức năng 50

3.10.2. Yêu cầu chức năng 50

3.10.3. Trường dữ liệu chính 51

3.10.4. Quy tắc nghiệp vụ 52

3.10.5. Kết quả đầu ra 52

3.10.6. Tiêu chí nghiệm thu 52

3.11. Module M11 - Quản lý Hội đồng dùng chung 53

3.11.1. Mô tả chức năng 53

3.11.2. Yêu cầu chức năng 53

3.11.3. Trường dữ liệu chính 54

3.11.4. Quy tắc nghiệp vụ 55

3.11.5. Kết quả đầu ra 55

3.11.6. Tiêu chí nghiệm thu 56

3.12. Module M12 - Xử lý biên bản Hội đồng 56

3.12.1. Mô tả chức năng 56

3.12.2. Yêu cầu chức năng 57

3.12.3. Trường dữ liệu chính 58

3.12.4. Quy tắc nghiệp vụ 58

3.12.5. Kết quả đầu ra 59

3.12.6. Tiêu chí nghiệm thu 59

3.13. Module M13 - Pipeline biểu mẫu/PDF dùng chung 60

3.13.1. Mô tả chức năng 60

3.13.2. Yêu cầu chức năng 60

3.13.3. Trường dữ liệu chính 62

3.13.4. Quy tắc nghiệp vụ 63

3.13.5. Kết quả đầu ra 64

3.13.6. Tiêu chí nghiệm thu 64

3.14. Module M14 - Thông báo và truy vết 65

3.14.1. Mô tả chức năng 65

3.14.2. Yêu cầu chức năng 66

3.14.3. Trường dữ liệu chính 67

3.14.4. Quy tắc nghiệp vụ 67

3.14.5. Kết quả đầu ra 68

3.14.6. Tiêu chí nghiệm thu 68

CHƯƠNG 4: YÊU CẦU PHI CHỨC NĂNG 69

4.1. Các chỉ số cần xác minh 69

CHƯƠNG 5: BẢNG TỔNG HỢP VÀ TRUY VẾT 70

5.1. Tổng hợp yêu cầu theo module 70

5.2. Ma trận UCTQ - UCCT - module - biểu mẫu 71

5.3. Ma trận use case chi tiết - actor 78

5.4. Ma trận BM01-BM15 84

CHƯƠNG 6: PHỤ LỤC VÀ XÁC NHẬN 86

6.1. Ký hiệu mức độ ưu tiên 86

6.2. Trạng thái yêu cầu 86

6.3. Điểm giao tiếp và tích hợp 86

6.4. Danh sách vấn đề mở 87

6.5. Xác nhận tài liệu 87

# CHƯƠNG 1: TỔNG QUAN TÀI LIỆU

## 1.1. Mục đích tài liệu

Tài liệu này mô tả yêu cầu chức năng, dữ liệu, quy tắc nghiệp vụ, trạng thái, yêu cầu phi chức năng và tiêu chí nghiệm thu của hệ thống quản lý hoạt động nghiên cứu khoa học cấp trường trên nền tảng website.

• Làm cơ sở cho thiết kế và phát triển phần mềm.

• Làm căn cứ kiểm thử, nghiệm thu và quản lý thay đổi yêu cầu.

• Bảo đảm truy vết từ quy trình, biểu mẫu và use case đến chức năng triển khai.

## 1.2. Phạm vi hệ thống

Hệ thống hỗ trợ quản lý quy trình từ mở đợt, đăng ký, xét duyệt hồ sơ, xét duyệt thuyết minh, theo dõi thực hiện, nghiệm thu đến lưu/công bố tài liệu hoàn tất. Hệ thống quản lý dữ liệu, tệp, trạng thái, phân quyền, thông báo và dấu vết xử lý; các hoạt động họp, ký quyết định, ký hợp đồng và tài chính diễn ra bên ngoài hệ thống.

• Quản lý đợt đăng ký

• Đăng ký và xét duyệt tuyến đầu

• Xét duyệt đề xuất sơ bộ

• Nộp thuyết minh

• Phê duyệt thuyết minh và hợp đồng

• Thực hiện và báo cáo tiến độ

• Nộp hồ sơ và nghiệm thu

• Chỉnh sửa sau nghiệm thu và BM14

• Công nhận kết quả

• Actor, phân quyền và truy cập

• Quản lý Hội đồng dùng chung

• Xử lý biên bản Hội đồng

• Pipeline biểu mẫu/PDF dùng chung

• Thông báo và truy vết

**Ngoài phạm vi:**

• Tạo lịch, bắt đầu, hoãn hoặc tổ chức cuộc họp Hội đồng trên hệ thống.

• Ký quyết định, ký hợp đồng, lập/xử lý/ký BM14 và xử lý chữ ký Hiệu trưởng.

• Tạm ứng, thanh toán, quyết toán, hoàn trả hoặc phê duyệt chứng từ kế toán.

• Tích hợp email, SMS, thư viện, tài chính-kế toán hoặc dịch vụ ký số bên ngoài trong phiên bản đầu.

• Triển khai ứng dụng kết quả và nghiệp vụ lưu hồ sơ chuyên môn sau bước công nhận.

## 1.3. Yêu cầu nghiệp vụ cốt lõi

| **Mã** | **Yêu cầu** | **Nơi đặc tả** |
| --- | --- | --- |
| BR-CORE-01 | Hồ sơ và biểu mẫu chỉ có hiệu lực theo đúng phiên bản, chữ ký/tệp và mốc Nộp đã được quy định. | Chương 2-4 |
| BR-CORE-02 | Quyền truy cập được xác định theo actor, vai trò, Hội đồng/giai đoạn, đối tượng dữ liệu và trạng thái. | Chương 2-4 |
| BR-CORE-03 | Trạng thái và các thao tác quan trọng phải được lưu vết; audit log không được sửa/xóa bởi chức năng nghiệp vụ. | Chương 2-4 |
| BR-CORE-04 | Tài liệu lập/ký ngoài hệ thống chỉ được lưu và công bố; hệ thống không tự giả lập quy trình ký ngoài phạm vi. | Chương 2-4 |

## 1.4. Đối tượng sử dụng

| **Nhóm người dùng** | **Vai trò** | **Phân quyền chính** |
| --- | --- | --- |
| Giảng viên | Giảng viên | Đăng ký đề tài giảng viên; thực hiện vai trò Giảng viên hướng dẫn đối với hồ sơ sinh viên được gán. |
| Sinh viên | Sinh viên | Tạo, nộp và theo dõi hồ sơ đề tài sinh viên; thực hiện nghĩa vụ của Chủ nhiệm đề tài. |
| Trưởng Khoa/Trưởng đơn vị | Trưởng Khoa/Trưởng đơn vị | Xét duyệt tuyến đầu hồ sơ giảng viên thuộc đơn vị. |
| Cán bộ/Phòng KHCN (P.KHCN) | Cán bộ/Phòng KHCN (P.KHCN) | Quản trị đợt, Hội đồng, tài liệu, kết quả và quyền ngoài Trường; có thể giữ vai trò Chủ tịch Hội đồng. |
| Thành viên HĐ xét duyệt hồ sơ | Thành viên HĐ xét duyệt hồ sơ | Xem hồ sơ và nộp phiếu BM02. |
| Thư ký HĐ xét duyệt hồ sơ | Thư ký HĐ xét duyệt hồ sơ | Nộp BM02, chốt phiếu và lập BM03. |
| Thành viên HĐ xét duyệt thuyết minh | Thành viên HĐ xét duyệt thuyết minh | Xem BM04/BM05 và nộp BM06. |
| Thư ký HĐ xét duyệt thuyết minh | Thư ký HĐ xét duyệt thuyết minh | Nộp BM06, chốt phiếu và lập BM07. |
| Thành viên HĐ nghiệm thu | Thành viên HĐ nghiệm thu | Xem hồ sơ nghiệm thu và nộp BM11. |
| Thư ký HĐ nghiệm thu | Thư ký HĐ nghiệm thu | Nộp BM11, chốt phiếu và lập BM12. |

Chủ nhiệm đề tài là vai trò nghiệp vụ bao quát: trong từng hồ sơ cụ thể, vai trò này do Giảng viên hoặc Sinh viên đảm nhiệm. Thành viên nhóm nghiên cứu ngoài Chủ nhiệm chỉ là dữ liệu hồ sơ, không phải actor đăng nhập.

## 1.5. Định nghĩa và từ viết tắt

| **Thuật ngữ/Viết tắt** | **Định nghĩa** |
| --- | --- |
| NCKH | Nghiên cứu khoa học |
| P.KHCN | Phòng/Cán bộ phụ trách Khoa học và Công nghệ |
| UCTQ | Use case tổng quan |
| UCCT | Use case chi tiết/yêu cầu chức năng |
| BM01-BM15 | Bộ biểu mẫu thuộc quy trình thực hiện đề tài NCKH cấp trường |
| Hội đồng | Hội đồng riêng được thành lập cho từng giai đoạn xét duyệt hoặc nghiệm thu |
| Actor | Vai trò nghiệp vụ trực tiếp tương tác với hệ thống |
| Audit log | Nhật ký chỉ thêm mới dùng để truy vết thao tác quan trọng |
| Bản chính thức | Phiên bản dữ liệu/tệp đã được người có quyền bấm Nộp hoặc xác nhận |
| Cần xác minh | Thông tin chưa đủ căn cứ để đưa vào baseline triển khai |

## 1.6. Tài liệu tham chiếu

• FRS\_Mau.docx - mẫu cấu trúc và trình bày.

• P.KHCN\_Quy trình thực hiện đề tài NCKH cấp trường và lưu đồ PPTX.

• Bộ biểu mẫu BM01-BM15 của quy trình.

• Danh mục 19 use case tổng quan, 74 use case chi tiết và ma trận actor.

• Các memlog brainstorming đã chốt nghiệp vụ đến ngày 19/07/2026.

# CHƯƠNG 2: USER STORY, LUỒNG XỬ LÝ VÀ TRẠNG THÁI

## 2.1. Bộ user story

| **Mã US** | **UCTQ** | **Tác nhân** | **User story** | **Module** |
| --- | --- | --- | --- | --- |
| US-01 | UCTQ-01 | Giảng viên trong vai trò hướng dẫn | Là Giảng viên trong vai trò hướng dẫn, tôi muốn xét duyệt đăng ký đề tài sinh viên để giảng viên hướng dẫn kiểm tra hồ sơ đăng ký của sinh viên và quyết định duyệt hoặc trả lại để sửa trước khi hồ sơ được chuyển tiếp. | M02, M10 |
| US-02 | UCTQ-02 | Giảng viên | Là Giảng viên, tôi muốn tra cứu sổ tiết nckh để giảng viên tra cứu thông tin sổ tiết nckh. nội dung dữ liệu và kết quả tra cứu cụ thể vẫn cần được xác minh. | Chờ xác minh |
| US-03 | UCTQ-03 | Giảng viên | Là Giảng viên, tôi muốn đăng ký thực hiện đề tài giao trực tiếp để giảng viên đăng ký nhận thực hiện một đề tài đã nằm trong danh mục giao trực tiếp của đợt. | M01, M02, M14 |
| US-04 | UCTQ-04 | Chủ nhiệm đề tài; cụ thể là Giảng viên hoặc Sinh viên | Là Chủ nhiệm đề tài; cụ thể là Giảng viên hoặc Sinh viên, tôi muốn đăng ký đề xuất đề tài tuyển chọn để giảng viên hoặc sinh viên đề xuất một đề tài mới để tham gia đợt tuyển chọn của nhà trường. | M01, M02 |
| US-05 | UCTQ-05 | Chủ nhiệm đề tài | Là Chủ nhiệm đề tài, tôi muốn gửi đơn báo cáo tiến độ 1/2 thời gian để chủ nhiệm gửi báo cáo về tình hình thực hiện đề tài tại mốc một nửa thời gian theo bm08. | M06 |
| US-06 | UCTQ-06 | Chủ nhiệm đề tài | Là Chủ nhiệm đề tài, tôi muốn nộp thuyết minh đề tài để chủ nhiệm tải bản thuyết minh hoàn chỉnh lên hệ thống để hội đồng có tài liệu xem xét và đánh giá. | M04 |
| US-07 | UCTQ-07 | Chủ nhiệm đề tài | Là Chủ nhiệm đề tài, tôi muốn nộp hồ sơ nghiệm thu để chủ nhiệm nộp báo cáo tổng kết và hồ sơ cần thiết để đề tài được đưa vào quy trình nghiệm thu. | M06, M07 |
| US-08 | UCTQ-08 | Chủ nhiệm đề tài | Là Chủ nhiệm đề tài, tôi muốn xem thông báo/quyết định để chủ nhiệm xem hoặc tải các thông báo, quyết định và tài liệu đã được công bố cho đề tài của mình. | M05, M07, M08, M09 |
| US-09 | UCTQ-09 | Chủ nhiệm đề tài | Là Chủ nhiệm đề tài, tôi muốn nộp giải trình chỉnh sửa báo cáo nghiệm thu đề tài để chủ nhiệm trình bày cách đã chỉnh sửa báo cáo sau nghiệm thu và nộp bm13 kèm nội dung liên quan. | M06, M08 |
| US-10 | UCTQ-10 | Trưởng Khoa/Trưởng đơn vị | Là Trưởng Khoa/Trưởng đơn vị, tôi muốn xét duyệt đăng ký đề tài giảng viên để trưởng khoa hoặc trưởng đơn vị kiểm tra hồ sơ của giảng viên và quyết định duyệt hoặc trả lại để sửa. | M02 |
| US-11 | UCTQ-11 | Cán bộ/Phòng KHCN (P.KHCN) | Là Cán bộ/Phòng KHCN (P.KHCN), tôi muốn quản lý xét duyệt hồ sơ để p.khcn tổ chức và theo dõi các công việc hành chính của giai đoạn xét duyệt hồ sơ, từ lập hội đồng đến hoàn tất biên bản bm03. | M02, M03, M10, M11, M12, M13, M14 |
| US-12 | UCTQ-12 | Cán bộ/Phòng KHCN (P.KHCN) | Là Cán bộ/Phòng KHCN (P.KHCN), tôi muốn quản lý xét duyệt thuyết minh để p.khcn quản lý giai đoạn xét duyệt thuyết minh, gồm hội đồng, phiếu bm06, biên bản bm07 và tài liệu liên quan. | M05, M10, M11, M12, M13, M14 |
| US-13 | UCTQ-13 | Cán bộ/Phòng KHCN (P.KHCN) | Là Cán bộ/Phòng KHCN (P.KHCN), tôi muốn quản lý nghiệm thu đề tài để p.khcn quản lý giai đoạn nghiệm thu, gồm hội đồng, phiếu bm11, biên bản bm12 và các tài liệu hoàn tất. | M07, M08, M10, M11, M12, M13, M14 |
| US-14 | UCTQ-14 | Cán bộ/Phòng KHCN (P.KHCN) | Là Cán bộ/Phòng KHCN (P.KHCN), tôi muốn công bố đợt giao trực tiếp và danh mục đề tài để p.khcn mở đợt giao trực tiếp và công bố danh mục đề tài có sẵn để giảng viên đăng ký thực hiện. | M01 |
| US-15 | UCTQ-15 | Cán bộ/Phòng KHCN (P.KHCN) | Là Cán bộ/Phòng KHCN (P.KHCN), tôi muốn công bố đợt tuyển chọn đề tài để p.khcn mở và công bố đợt tuyển chọn để giảng viên hoặc sinh viên có thể đề xuất đề tài mới. | M01 |
| US-16 | UCTQ-16 | Cán bộ/Phòng KHCN (P.KHCN) | Là Cán bộ/Phòng KHCN (P.KHCN), tôi muốn đăng thông báo/quyết định để p.khcn đăng các thông báo hoặc quyết định đã được lập và ký bên ngoài để người có quyền truy cập. | M05, M07, M09 |
| US-17 | UCTQ-17 | Thành viên Hội đồng xét duyệt thuyết minh, Thư ký Hội đồng xét duyệt thuyết minh và Cán bộ/Phòng KHCN (P.KHCN) khi giữ vai trò Chủ tịch Hội đồng | Là Thành viên Hội đồng xét duyệt thuyết minh, Thư ký Hội đồng xét duyệt thuyết minh và Cán bộ/Phòng KHCN (P.KHCN) khi giữ vai trò Chủ tịch Hội đồng, tôi muốn nhận xét thuyết minh đề tài để các thành viên hội đồng thuyết minh lập nhận xét cá nhân bằng bm06 làm căn cứ cho kết luận chung của hội đồng. | M05, M10 |
| US-18 | UCTQ-18 | Thành viên Hội đồng nghiệm thu, Thư ký Hội đồng nghiệm thu và Cán bộ/Phòng KHCN (P.KHCN) khi giữ vai trò Chủ tịch Hội đồng | Là Thành viên Hội đồng nghiệm thu, Thư ký Hội đồng nghiệm thu và Cán bộ/Phòng KHCN (P.KHCN) khi giữ vai trò Chủ tịch Hội đồng, tôi muốn đánh giá hồ sơ nghiệm thu để các thành viên hội đồng nghiệm thu đánh giá kết quả thực hiện đề tài bằng bm11 trước khi lập biên bản nghiệm thu. | M07, M10 |
| US-19 | UCTQ-19 | Thành viên Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt hồ sơ và Cán bộ/Phòng KHCN (P.KHCN) khi giữ vai trò Chủ tịch Hội đồng | Là Thành viên Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt hồ sơ và Cán bộ/Phòng KHCN (P.KHCN) khi giữ vai trò Chủ tịch Hội đồng, tôi muốn nhận xét hồ sơ đăng ký để các thành viên hội đồng hồ sơ nhận xét đề xuất đăng ký bằng bm02 để phục vụ việc tổng hợp kết quả sơ bộ. | M03, M10, M14 |

## 2.2. Luồng xử lý tổng thể

| **Bước** | **Giai đoạn** | **Actor** | **Hành động chính** | **BM** | **Kết quả** |
| --- | --- | --- | --- | --- | --- |
| 1 | Đăng ký đề tài | Giảng viên/Sinh viên; Giảng viên hướng dẫn/Trưởng Khoa | Tạo, ký, nộp BM01; duyệt hoặc trả sửa tuyến đầu | BM01 | Hồ sơ đủ điều kiện xét duyệt sơ bộ |
| 2 | Xét duyệt đề xuất sơ bộ | P.KHCN; Hội đồng; Thư ký | Tạo Hội đồng, nộp BM02, lập/xác nhận BM03 | BM02-BM03 | Đạt hoặc không đạt xét duyệt hồ sơ |
| 3 | Nộp thuyết minh | Chủ nhiệm đề tài | Tải tệp thuyết minh hoàn chỉnh | BM04 | Thuyết minh sẵn sàng xét duyệt |
| 4 | Phê duyệt thuyết minh | P.KHCN; Hội đồng; Thư ký | Đăng BM05, nộp BM06, lập/xác nhận BM07, lưu hợp đồng | BM05-BM07 | Đang thực hiện hoặc Không thực hiện |
| 5 | Thực hiện/báo cáo tiến độ | Chủ nhiệm đề tài | Lập và nộp báo cáo giữa kỳ | BM08 | Báo cáo tiến độ được lưu |
| 6 | Nộp hồ sơ và nghiệm thu | Chủ nhiệm; P.KHCN; Hội đồng; Thư ký | Nộp BM09, đăng BM10, nộp BM11, lập/xác nhận BM12 | BM09-BM12 | Kết quả nghiệm thu |
| 7 | Chỉnh sửa sau nghiệm thu | Chủ nhiệm; P.KHCN | Nộp BM13 và lưu BM14 hoàn chỉnh | BM13-BM14 | Hồ sơ hoàn tất sau nghiệm thu |
| 8 | Công nhận kết quả | P.KHCN | Đăng và lưu quyết định công nhận | BM15 | Kết quả được công bố theo quyền |
| 9 | Ứng dụng và lưu hồ sơ | Đơn vị liên quan | Thực hiện bên ngoài phạm vi xử lý chi tiết | \- | Ngoài phạm vi phiên bản đầu |

## 2.3. Mô hình trạng thái

### 2.3.1. Trạng thái đợt đăng ký

| **Mã trạng thái** | **Tên trạng thái** | **Ý nghĩa** | **Điều kiện chuyển** |
| --- | --- | --- | --- |
| DOT-NHAP | Nháp | P.KHCN đang cấu hình; người đăng ký chưa nhìn thấy. | P.KHCN tạo đợt. |
| DOT-CONG-BO | Đã công bố - chưa mở | Người dùng thấy thông tin nhưng chưa được nộp. | P.KHCN công bố trước ngày bắt đầu. |
| DOT-DANG-MO | Đang mở | Hệ thống đang nhận hồ sơ theo quyền và điều kiện. | Hệ thống tự chuyển khi đến thời gian mở. |
| DOT-DA-DONG | Đã đóng | Không nhận hồ sơ mới hoặc nộp lại. | Hệ thống tự chuyển khi hết hạn. |

### 2.3.2. Trạng thái hồ sơ đăng ký

| **Mã trạng thái** | **Tên trạng thái** | **Ý nghĩa** | **Điều kiện chuyển** |
| --- | --- | --- | --- |
| HS-NHAP | Nháp | Người đăng ký đang hoàn thiện hồ sơ/BM01. | Tạo hồ sơ. |
| HS-CHO-DUYET | Chờ duyệt cấp đầu | Đã nộp, chờ Giảng viên hướng dẫn hoặc Trưởng Khoa. | Nộp BM01 đã ký. |
| HS-TRA-SUA | Trả chỉnh sửa | Hồ sơ quay lại kèm lý do bắt buộc. | Actor cấp đầu trả sửa. |
| HS-CHO-HD | Chờ Hội đồng xét duyệt hồ sơ | Đã qua tuyến đầu và thuộc tập đủ điều kiện. | Actor cấp đầu duyệt. |
| HS-DAT | Đạt xét duyệt hồ sơ | Được chuyển sang giai đoạn nộp thuyết minh. | Hội đồng kết luận đạt và biên bản được xác nhận. |
| HS-KHONG-DAT | Không đạt xét duyệt hồ sơ | Hồ sơ kết thúc, không tạo đề tài tiếp tục. | Hội đồng kết luận không đạt. |
| HS-QUA-HAN | Quá hạn | Không được tiếp tục nộp/nộp lại hoặc duyệt tuyến đầu. | Đợt đóng khi hồ sơ còn chờ xử lý. |
| HS-KHONG-CHON | Không được chọn | Đề tài giao trực tiếp đã thuộc hồ sơ được duyệt sớm hơn. | Trưởng Khoa duyệt một hồ sơ cùng đề tài. |

### 2.3.3. Trạng thái đề tài NCKH

| **Mã trạng thái** | **Tên trạng thái** | **Ý nghĩa** | **Điều kiện chuyển** |
| --- | --- | --- | --- |
| DT-CHO-TM | Chờ nộp thuyết minh | Hồ sơ đã đạt và chờ BM04. | Hồ sơ đạt xét duyệt sơ bộ. |
| DT-CHO-XD-TM | Chờ xét duyệt thuyết minh | BM04 đã nộp và chờ Hội đồng. | Chủ nhiệm tải BM04. |
| DT-DANG-TH | Đang thực hiện | Được phép triển khai nghiên cứu. | P.KHCN xác nhận BM07 kết luận thực hiện. |
| DT-CHO-NT | Chờ nghiệm thu | Đã nộp hồ sơ tổng kết để đánh giá. | Chủ nhiệm nộp hồ sơ nghiệm thu. |
| DT-DA-NT | Đã nghiệm thu | Đề tài đã có kết quả nghiệm thu được xác nhận. | P.KHCN xác nhận BM12 đạt. |
| DT-KHONG-TH | Không thực hiện | Dừng sau xét duyệt thuyết minh. | BM07 kết luận không thực hiện. |
| DT-KHONG-DAT-NT | Không đạt nghiệm thu | Đề tài kết thúc với kết quả không đạt. | BM12 kết luận không đạt. |

### 2.3.4. Trạng thái Hội đồng

| **Mã trạng thái** | **Tên trạng thái** | **Ý nghĩa** | **Điều kiện chuyển** |
| --- | --- | --- | --- |
| HD-THANH-LAP | Đã thành lập | Hội đồng và danh sách thành viên đã được tạo. | P.KHCN tạo Hội đồng. |
| HD-DANH-GIA | Đang đánh giá | Thành viên xem tài liệu và nộp phiếu. | Hội đồng được giao nhiệm vụ/hạn. |
| HD-LAP-BB | Đang họp/lập biên bản | Thư ký chốt phiếu và lập biên bản. | Thư ký xác nhận bắt đầu lập biên bản. |
| HD-HOAN-TAT | Đã hoàn tất | Biên bản/kết quả đã được P.KHCN xác nhận. | P.KHCN xác nhận biên bản. |
| HD-GIAI-TAN | Đã giải tán | Chỉ còn quyền tra cứu lịch sử; không tải tài liệu. | Đợt kết thúc. |

### 2.3.5. Trạng thái biểu mẫu

| **Nhóm** | **Biểu mẫu** | **Chuỗi trạng thái** |
| --- | --- | --- |
| BM do Chủ nhiệm nộp | BM01/BM04/BM08/BM09/BM13 | Nháp → Đã nộp → Được chấp nhận / Trả chỉnh sửa / Quá hạn |
| Phiếu Hội đồng | BM02/BM06/BM11 | Nháp → Đã nộp / Quá hạn; đã nộp không được sửa hoặc nộp lại |
| Biên bản Hội đồng | BM03/BM07/BM12 | Nháp → Chờ P.KHCN xác nhận → Trả chỉnh sửa → Đã xác nhận |

# CHƯƠNG 3: YÊU CẦU CHỨC NĂNG CHI TIẾT

Chương này sử dụng trực tiếp mã UC chi tiết làm mã yêu cầu chức năng. Mọi yêu cầu trong phạm vi phiên bản đầu có ưu tiên Cao và trạng thái Đề xuất cho đến khi tài liệu được ký xác nhận.

## 3.1. Module M01 - Quản lý đợt đăng ký

### 3.1.1. Mô tả chức năng

Module M01 nhóm 7 yêu cầu liên quan đến quản lý đợt đăng ký. Actor tham gia: Chủ nhiệm đề tài; Cán bộ/Phòng KHCN (P.KHCN); Cán bộ/Phòng KHCN (P.KHCN) theo quyền; Giảng viên; Sinh viên.

### 3.1.2. Yêu cầu chức năng

| **Mã YC** | **Tên chức năng** | **Actor** | **Mô tả và kết quả** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| UC-DOT-01 | Tạo đợt đăng ký NCKH | Cán bộ/Phòng KHCN (P.KHCN) | P.KHCN khởi tạo một đợt đăng ký mới, chẳng hạn đợt NCKH của một năm, để tiếp tục cấu hình trước khi công bố. Kết quả: Một đợt đăng ký mới được hình thành để cấu hình và công bố. | Cao | Đề xuất |
| UC-DOT-02 | Cấu hình loại và thời gian của đợt | Cán bộ/Phòng KHCN (P.KHCN) | P.KHCN xác định loại đợt và khoảng thời gian người dùng được phép tham gia đăng ký. Kết quả: Đợt có loại và khoảng thời gian áp dụng. | Cao | Đề xuất |
| UC-DOT-03 | Quản lý danh mục đề tài giao trực tiếp của đợt | Cán bộ/Phòng KHCN (P.KHCN) | P.KHCN nhập và duy trì các đề tài có sẵn dành cho hình thức giao trực tiếp trong đúng đợt đăng ký. Kết quả: Danh mục đề tài giao trực tiếp gắn với đợt được duy trì. | Cao | Đề xuất |
| UC-DOT-04 | Cập nhật đợt trước khi khóa | Cán bộ/Phòng KHCN (P.KHCN) | P.KHCN chỉnh sửa thông tin của đợt trong giai đoạn hệ thống vẫn cho phép thay đổi. Kết quả: Thông tin đợt được điều chỉnh trong khoảng được phép. | Cao | Đề xuất |
| UC-DOT-05 | Công bố đợt đăng ký | Cán bộ/Phòng KHCN (P.KHCN) | P.KHCN đưa đợt từ trạng thái chuẩn bị sang trạng thái người dùng có thể nhìn thấy và đăng ký. Kết quả: Đợt sẵn sàng để người dùng xem và đăng ký. | Cao | Đề xuất |
| UC-DOT-06 | Xem danh sách và tình trạng các đợt | Chủ nhiệm đề tài, Giảng viên, Sinh viên, Cán bộ/Phòng KHCN (P.KHCN) theo quyền | Người dùng tra cứu các đợt hiện có và biết đợt nào đang mở, chưa mở hoặc đã kết thúc theo thông tin được phép xem. Kết quả: Người dùng biết các đợt và tình trạng hiện tại. | Cao | Đề xuất |
| UC-DOT-08 | Theo dõi tình trạng đợt | Cán bộ/Phòng KHCN (P.KHCN) | P.KHCN theo dõi tình trạng vận hành của đợt để biết đợt đang ở giai đoạn nào; đây là chức năng quản lý, không chỉ là xem danh sách. Kết quả: P.KHCN nắm được tình trạng vận hành của đợt. | Cao | Đề xuất |

### 3.1.3. Trường dữ liệu chính

| **STT** | **Nhóm dữ liệu** | **Mô tả** |
| --- | --- | --- |
| 1 | Mã và tên đợt | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 2 | Loại đợt | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 3 | Thời gian bắt đầu/kết thúc | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 4 | Trạng thái đợt | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 5 | Danh mục đề tài giao trực tiếp | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 6 | Thời điểm công bố | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |

### 3.1.4. Quy tắc nghiệp vụ

| **Mã BR** | **Quy tắc** | **UC liên quan** |
| --- | --- | --- |
| BR-M01-01 | Đợt có bốn trạng thái: Nháp, Đã công bố - chưa mở, Đang mở và Đã đóng; không có trạng thái Hủy hoặc Mở lại trong phiên bản đầu. | UC-DOT-01, UC-DOT-02, UC-DOT-03, UC-DOT-04, UC-DOT-05, UC-DOT-06, UC-DOT-08 |
| BR-M01-02 | Hệ thống tự chuyển Đang mở/Đã đóng theo thời gian; P.KHCN không đóng thủ công trước hạn. | UC-DOT-01, UC-DOT-02, UC-DOT-03, UC-DOT-04, UC-DOT-05, UC-DOT-06, UC-DOT-08 |
| BR-M01-03 | Sau khi đợt đã công bố và đã có người tạo hoặc nộp hồ sơ, không được sửa thời gian hoặc danh mục đề tài giao trực tiếp. | UC-DOT-01, UC-DOT-02, UC-DOT-03, UC-DOT-04, UC-DOT-05, UC-DOT-06, UC-DOT-08 |

### 3.1.5. Kết quả đầu ra

• UC-DOT-01: Một đợt đăng ký mới được hình thành để cấu hình và công bố.

• UC-DOT-02: Đợt có loại và khoảng thời gian áp dụng.

• UC-DOT-03: Danh mục đề tài giao trực tiếp gắn với đợt được duy trì.

• UC-DOT-04: Thông tin đợt được điều chỉnh trong khoảng được phép.

• UC-DOT-05: Đợt sẵn sàng để người dùng xem và đăng ký.

• UC-DOT-06: Người dùng biết các đợt và tình trạng hiện tại.

• UC-DOT-08: P.KHCN nắm được tình trạng vận hành của đợt.

### 3.1.6. Tiêu chí nghiệm thu

| **Mã AC** | **UC** | **Tiêu chí nghiệm thu** |
| --- | --- | --- |
| AC-UC-DOT-01 | UC-DOT-01 | Khi Cán bộ/Phòng KHCN (P.KHCN) có quyền và dữ liệu hợp lệ thực hiện chức năng, hệ thống một đợt đăng ký mới được hình thành để cấu hình và công bố và lưu dấu vết thay đổi. |
| AC-UC-DOT-02 | UC-DOT-02 | Khi Cán bộ/Phòng KHCN (P.KHCN) có quyền và dữ liệu hợp lệ thực hiện chức năng, hệ thống đợt có loại và khoảng thời gian áp dụng và lưu dấu vết thay đổi. |
| AC-UC-DOT-03 | UC-DOT-03 | Khi Cán bộ/Phòng KHCN (P.KHCN) có quyền và dữ liệu hợp lệ thực hiện chức năng, hệ thống danh mục đề tài giao trực tiếp gắn với đợt được duy trì và lưu dấu vết thay đổi. |
| AC-UC-DOT-04 | UC-DOT-04 | Khi Cán bộ/Phòng KHCN (P.KHCN) có quyền và dữ liệu hợp lệ thực hiện chức năng, hệ thống thông tin đợt được điều chỉnh trong khoảng được phép và lưu dấu vết thay đổi. |
| AC-UC-DOT-05 | UC-DOT-05 | Khi Cán bộ/Phòng KHCN (P.KHCN) thực hiện chức năng trong đúng quyền và trạng thái, hệ thống đợt sẵn sàng để người dùng xem và đăng ký và ghi nhận kết quả nghiệp vụ. |
| AC-UC-DOT-06 | UC-DOT-06 | Khi Chủ nhiệm đề tài, Giảng viên, Sinh viên, Cán bộ/Phòng KHCN (P.KHCN) theo quyền truy cập đúng đối tượng và có quyền, hệ thống hiển thị người dùng biết các đợt và tình trạng hiện tại; dữ liệu ngoài phạm vi quyền không được cung cấp. |
| AC-UC-DOT-08 | UC-DOT-08 | Khi Cán bộ/Phòng KHCN (P.KHCN) truy cập đúng đối tượng và có quyền, hệ thống hiển thị p.khcn nắm được tình trạng vận hành của đợt; dữ liệu ngoài phạm vi quyền không được cung cấp. |

## 3.2. Module M02 - Đăng ký và xét duyệt tuyến đầu

### 3.2.1. Mô tả chức năng

Module M02 nhóm 15 yêu cầu liên quan đến đăng ký và xét duyệt tuyến đầu. Actor tham gia: Cán bộ/Phòng KHCN (P.KHCN); Giảng viên; Giảng viên trong vai trò hướng dẫn; Sinh viên; Trưởng Khoa/Trưởng đơn vị.

### 3.2.2. Yêu cầu chức năng

| **Mã YC** | **Tên chức năng** | **Actor** | **Mô tả và kết quả** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| UC-DK-01 | Tạo hồ sơ đăng ký đề tài giảng viên ở trạng thái nháp | Giảng viên | Giảng viên mở một hồ sơ đăng ký mới và lưu ở dạng nháp để bổ sung thông tin trước khi nộp. Kết quả: Hồ sơ giảng viên được tạo để tiếp tục hoàn thiện. | Cao | Đề xuất |
| UC-DK-02 | Tạo hồ sơ đăng ký đề tài sinh viên ở trạng thái nháp | Sinh viên | Sinh viên mở một hồ sơ đăng ký mới và lưu ở dạng nháp để tiếp tục hoàn thiện trước khi nộp. Kết quả: Hồ sơ sinh viên được tạo để tiếp tục hoàn thiện. | Cao | Đề xuất |
| UC-DK-03 | Cập nhật hồ sơ đăng ký trước khi nộp | Giảng viên hoặc Sinh viên | Giảng viên hoặc sinh viên sửa và bổ sung nội dung của hồ sơ khi hồ sơ vẫn chưa được nộp chính thức. Kết quả: Nội dung nháp được hoàn thiện. | Cao | Đề xuất |
| UC-DK-04 | Quản lý thông tin nhóm nghiên cứu trong hồ sơ | Giảng viên hoặc Sinh viên | Người đăng ký khai báo và cập nhật các thành viên tham gia nghiên cứu như dữ liệu của hồ sơ. Kết quả: Danh sách/thông tin nhóm được ghi nhận; thành viên nhóm không trở thành actor. | Cao | Đề xuất |
| UC-DK-05 | Kiểm tra điều kiện nộp hồ sơ đăng ký | Giảng viên hoặc Sinh viên | Hệ thống hỗ trợ người đăng ký biết hồ sơ có đủ điều kiện nộp hay đang bị chặn bởi hạn mức hoặc lệnh cấm. Kết quả: Biết hồ sơ có đáp ứng điều kiện nộp, hạn mức và lệnh cấm hay không. | Cao | Đề xuất |
| UC-DK-06 | Lập BM01 từ dữ liệu đăng ký | Giảng viên hoặc Sinh viên | Người đăng ký dùng dữ liệu đã khai báo để hình thành BM01, xem trước và chuẩn bị PDF mang đi ký. Kết quả: BM01 đầy đủ thông tin được chuẩn bị theo pipeline form/PDF. | Cao | Đề xuất |
| UC-DK-07 | Nộp hồ sơ đăng ký kèm BM01 đã ký | Giảng viên hoặc Sinh viên | Người đăng ký tải BM01 đã ký và bấm nộp, làm hồ sơ trở thành bản chính thức chuyển sang tuyến xét duyệt. Kết quả: Hồ sơ chuyển vào tuyến xét duyệt tương ứng và form BM01 bị khóa. | Cao | Đề xuất |
| UC-DK-08 | Xem trạng thái xử lý hồ sơ đăng ký | Giảng viên hoặc Sinh viên | Người đăng ký theo dõi hồ sơ đang chờ ai xử lý, đã được duyệt hay bị trả lại để sửa. Kết quả: Người đăng ký biết hồ sơ đang ở bước nào và kết quả xử lý. | Cao | Đề xuất |
| UC-DK-09 | Xét duyệt hồ sơ sinh viên được hướng dẫn | Giảng viên trong vai trò hướng dẫn | Giảng viên hướng dẫn kiểm tra hồ sơ sinh viên được phân công và duyệt hồ sơ khi nội dung hợp lệ. Kết quả: Hồ sơ hợp lệ được duyệt và tự chuyển vào tập đủ điều kiện lập Hội đồng. | Cao | Đề xuất |
| UC-DK-10 | Trả hồ sơ sinh viên để sửa | Giảng viên trong vai trò hướng dẫn | Giảng viên hướng dẫn gửi lại hồ sơ cho sinh viên kèm yêu cầu chỉnh sửa thay vì kết thúc hồ sơ. Kết quả: Hồ sơ quay lại cho Sinh viên kèm yêu cầu sửa bắt buộc. | Cao | Đề xuất |
| UC-DK-11 | Xét duyệt hồ sơ giảng viên của đơn vị | Trưởng Khoa/Trưởng đơn vị | Trưởng Khoa hoặc Trưởng đơn vị kiểm tra hồ sơ giảng viên thuộc đơn vị và duyệt khi hồ sơ hợp lệ. Kết quả: Hồ sơ hợp lệ được duyệt và tự chuyển vào tập đủ điều kiện lập Hội đồng. | Cao | Đề xuất |
| UC-DK-12 | Trả hồ sơ giảng viên để sửa | Trưởng Khoa/Trưởng đơn vị | Trưởng Khoa hoặc Trưởng đơn vị trả hồ sơ cho giảng viên kèm nội dung cần sửa. Kết quả: Hồ sơ quay lại cho Giảng viên kèm yêu cầu sửa bắt buộc. | Cao | Đề xuất |
| UC-DK-13 | Sửa và nộp lại hồ sơ bị trả | Giảng viên hoặc Sinh viên | Người đăng ký chỉnh sửa trong cùng hồ sơ, tạo phiên bản mới, ký lại BM01 và nộp lại trước thời hạn. Kết quả: Phiên bản sửa đổi, BM01 ký lại được đưa lại vào tuyến xét duyệt trước hạn. | Cao | Đề xuất |
| UC-DK-14 | Gửi yêu cầu hủy hồ sơ | Giảng viên hoặc Sinh viên | Giảng viên hoặc sinh viên gửi đề nghị hủy hồ sơ, đồng thời nêu lý do để P.KHCN xem xét. Kết quả: Yêu cầu hủy có lý do được ghi nhận để P.KHCN xử lý. | Cao | Đề xuất |
| UC-DK-15 | Xử lý yêu cầu hủy hồ sơ | Cán bộ/Phòng KHCN (P.KHCN) | P.KHCN xem xét yêu cầu hủy, ghi nhận chấp thuận hoặc từ chối và xử lý hệ quả theo quyết định. Kết quả: Yêu cầu hủy có kết quả; nếu từ chối phải có lý do, nếu chấp thuận có thể thiết lập thời gian cấm đăng ký. | Cao | Đề xuất |

### 3.2.3. Trường dữ liệu chính

| **STT** | **Nhóm dữ liệu** | **Mô tả** |
| --- | --- | --- |
| 1 | Loại đề tài và hình thức đăng ký | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 2 | Thông tin Chủ nhiệm/người đăng ký | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 3 | Giảng viên hướng dẫn hoặc đơn vị | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 4 | Nhóm nghiên cứu | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 5 | BM01 và phiên bản | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 6 | Trạng thái hồ sơ | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 7 | Lý do trả/hủy | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 8 | Thời hạn cấm đăng ký | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |

### 3.2.4. Quy tắc nghiệp vụ

| **Mã BR** | **Quy tắc** | **UC liên quan** |
| --- | --- | --- |
| BR-M02-01 | Hồ sơ chỉ được nộp hợp lệ sau khi có BM01 đã ký; sau khi nộp người đăng ký không tự sửa hoặc rút hồ sơ. | UC-DK-01, UC-DK-02, UC-DK-03, UC-DK-04, UC-DK-05, UC-DK-06, UC-DK-07, UC-DK-08, UC-DK-09, UC-DK-10, UC-DK-11, UC-DK-12, UC-DK-13, UC-DK-14, UC-DK-15 |
| BR-M02-02 | Hồ sơ sinh viên do Giảng viên hướng dẫn duyệt; hồ sơ giảng viên do Trưởng Khoa/Trưởng đơn vị duyệt. | UC-DK-01, UC-DK-02, UC-DK-03, UC-DK-04, UC-DK-05, UC-DK-06, UC-DK-07, UC-DK-08, UC-DK-09, UC-DK-10, UC-DK-11, UC-DK-12, UC-DK-13, UC-DK-14, UC-DK-15 |
| BR-M02-03 | Khi trả sửa phải nhập lý do; nếu nội dung thay đổi, BM01 cũ mất hiệu lực và phải ký/nộp lại trước hạn. | UC-DK-01, UC-DK-02, UC-DK-03, UC-DK-04, UC-DK-05, UC-DK-06, UC-DK-07, UC-DK-08, UC-DK-09, UC-DK-10, UC-DK-11, UC-DK-12, UC-DK-13, UC-DK-14, UC-DK-15 |
| BR-M02-04 | Mỗi người được tham gia tối đa hai đề tài trong cùng đợt; Giảng viên hướng dẫn không bị tính vào hạn mức. | UC-DK-01, UC-DK-02, UC-DK-03, UC-DK-04, UC-DK-05, UC-DK-06, UC-DK-07, UC-DK-08, UC-DK-09, UC-DK-10, UC-DK-11, UC-DK-12, UC-DK-13, UC-DK-14, UC-DK-15 |
| BR-M02-05 | Đề tài giao trực tiếp thuộc về hồ sơ được Trưởng Khoa duyệt sớm nhất; hồ sơ còn lại chuyển Không được chọn. | UC-DK-01, UC-DK-02, UC-DK-03, UC-DK-04, UC-DK-05, UC-DK-06, UC-DK-07, UC-DK-08, UC-DK-09, UC-DK-10, UC-DK-11, UC-DK-12, UC-DK-13, UC-DK-14, UC-DK-15 |

### 3.2.5. Kết quả đầu ra

• UC-DK-01: Hồ sơ giảng viên được tạo để tiếp tục hoàn thiện.

• UC-DK-02: Hồ sơ sinh viên được tạo để tiếp tục hoàn thiện.

• UC-DK-03: Nội dung nháp được hoàn thiện.

• UC-DK-04: Danh sách/thông tin nhóm được ghi nhận; thành viên nhóm không trở thành actor.

• UC-DK-05: Biết hồ sơ có đáp ứng điều kiện nộp, hạn mức và lệnh cấm hay không.

• UC-DK-06: BM01 đầy đủ thông tin được chuẩn bị theo pipeline form/PDF.

• UC-DK-07: Hồ sơ chuyển vào tuyến xét duyệt tương ứng và form BM01 bị khóa.

• UC-DK-08: Người đăng ký biết hồ sơ đang ở bước nào và kết quả xử lý.

• UC-DK-09: Hồ sơ hợp lệ được duyệt và tự chuyển vào tập đủ điều kiện lập Hội đồng.

• UC-DK-10: Hồ sơ quay lại cho Sinh viên kèm yêu cầu sửa bắt buộc.

• UC-DK-11: Hồ sơ hợp lệ được duyệt và tự chuyển vào tập đủ điều kiện lập Hội đồng.

• UC-DK-12: Hồ sơ quay lại cho Giảng viên kèm yêu cầu sửa bắt buộc.

• UC-DK-13: Phiên bản sửa đổi, BM01 ký lại được đưa lại vào tuyến xét duyệt trước hạn.

• UC-DK-14: Yêu cầu hủy có lý do được ghi nhận để P.KHCN xử lý.

• UC-DK-15: Yêu cầu hủy có kết quả; nếu từ chối phải có lý do, nếu chấp thuận có thể thiết lập thời gian cấm đăng ký.

### 3.2.6. Tiêu chí nghiệm thu

| **Mã AC** | **UC** | **Tiêu chí nghiệm thu** |
| --- | --- | --- |
| AC-UC-DK-01 | UC-DK-01 | Khi Giảng viên có quyền và dữ liệu hợp lệ thực hiện chức năng, hệ thống hồ sơ giảng viên được tạo để tiếp tục hoàn thiện và lưu dấu vết thay đổi. |
| AC-UC-DK-02 | UC-DK-02 | Khi Sinh viên có quyền và dữ liệu hợp lệ thực hiện chức năng, hệ thống hồ sơ sinh viên được tạo để tiếp tục hoàn thiện và lưu dấu vết thay đổi. |
| AC-UC-DK-03 | UC-DK-03 | Khi Giảng viên hoặc Sinh viên cung cấp đủ dữ liệu/tệp bắt buộc và xác nhận thao tác trong thời hạn, hệ thống nội dung nháp được hoàn thiện; thao tác sai quyền, sai trạng thái hoặc quá hạn bị từ chối. |
| AC-UC-DK-04 | UC-DK-04 | Khi Giảng viên hoặc Sinh viên có quyền và dữ liệu hợp lệ thực hiện chức năng, hệ thống danh sách/thông tin nhóm được ghi nhận; thành viên nhóm không trở thành actor và lưu dấu vết thay đổi. |
| AC-UC-DK-05 | UC-DK-05 | Khi Giảng viên hoặc Sinh viên cung cấp đủ dữ liệu/tệp bắt buộc và xác nhận thao tác trong thời hạn, hệ thống biết hồ sơ có đáp ứng điều kiện nộp, hạn mức và lệnh cấm hay không; thao tác sai quyền, sai trạng thái hoặc quá hạn bị từ chối. |
| AC-UC-DK-06 | UC-DK-06 | Khi Giảng viên hoặc Sinh viên có quyền và dữ liệu hợp lệ thực hiện chức năng, hệ thống bm01 đầy đủ thông tin được chuẩn bị theo pipeline form/pdf và lưu dấu vết thay đổi. |
| AC-UC-DK-07 | UC-DK-07 | Khi Giảng viên hoặc Sinh viên cung cấp đủ dữ liệu/tệp bắt buộc và xác nhận thao tác trong thời hạn, hệ thống hồ sơ chuyển vào tuyến xét duyệt tương ứng và form bm01 bị khóa; thao tác sai quyền, sai trạng thái hoặc quá hạn bị từ chối. |
| AC-UC-DK-08 | UC-DK-08 | Khi Giảng viên hoặc Sinh viên truy cập đúng đối tượng và có quyền, hệ thống hiển thị người đăng ký biết hồ sơ đang ở bước nào và kết quả xử lý; dữ liệu ngoài phạm vi quyền không được cung cấp. |
| AC-UC-DK-09 | UC-DK-09 | Khi Giảng viên trong vai trò hướng dẫn thực hiện chức năng trong đúng quyền và trạng thái, hệ thống hồ sơ hợp lệ được duyệt và tự chuyển vào tập đủ điều kiện lập hội đồng và ghi nhận kết quả nghiệp vụ. |
| AC-UC-DK-10 | UC-DK-10 | Khi Giảng viên trong vai trò hướng dẫn trả đối tượng và nhập lý do bắt buộc, hệ thống hồ sơ quay lại cho sinh viên kèm yêu cầu sửa bắt buộc và thông báo cho người phải xử lý tiếp. |
| AC-UC-DK-11 | UC-DK-11 | Khi Trưởng Khoa/Trưởng đơn vị thực hiện chức năng trong đúng quyền và trạng thái, hệ thống hồ sơ hợp lệ được duyệt và tự chuyển vào tập đủ điều kiện lập hội đồng và ghi nhận kết quả nghiệp vụ. |
| AC-UC-DK-12 | UC-DK-12 | Khi Trưởng Khoa/Trưởng đơn vị trả đối tượng và nhập lý do bắt buộc, hệ thống hồ sơ quay lại cho giảng viên kèm yêu cầu sửa bắt buộc và thông báo cho người phải xử lý tiếp. |
| AC-UC-DK-13 | UC-DK-13 | Khi Giảng viên hoặc Sinh viên cung cấp đủ dữ liệu/tệp bắt buộc và xác nhận thao tác trong thời hạn, hệ thống phiên bản sửa đổi, bm01 ký lại được đưa lại vào tuyến xét duyệt trước hạn; thao tác sai quyền, sai trạng thái hoặc quá hạn bị từ chối. |
| AC-UC-DK-14 | UC-DK-14 | Khi Giảng viên hoặc Sinh viên cung cấp đủ dữ liệu/tệp bắt buộc và xác nhận thao tác trong thời hạn, hệ thống yêu cầu hủy có lý do được ghi nhận để p.khcn xử lý; thao tác sai quyền, sai trạng thái hoặc quá hạn bị từ chối. |
| AC-UC-DK-15 | UC-DK-15 | Khi Cán bộ/Phòng KHCN (P.KHCN) thực hiện chức năng trong đúng quyền và trạng thái, hệ thống yêu cầu hủy có kết quả; nếu từ chối phải có lý do, nếu chấp thuận có thể thiết lập thời gian cấm đăng ký và ghi nhận kết quả nghiệp vụ. |

## 3.3. Module M03 - Xét duyệt đề xuất sơ bộ

### 3.3.1. Mô tả chức năng

Module M03 nhóm 4 yêu cầu liên quan đến xét duyệt đề xuất sơ bộ. Actor tham gia: Cán bộ/Phòng KHCN (P.KHCN); Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch; Thành viên Hội đồng xét duyệt hồ sơ; Thư ký Hội đồng xét duyệt hồ sơ.

### 3.3.2. Yêu cầu chức năng

| **Mã YC** | **Tên chức năng** | **Actor** | **Mô tả và kết quả** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| UC-HD-01 | Tạo Hội đồng xét duyệt hồ sơ | Cán bộ/Phòng KHCN (P.KHCN) | P.KHCN lập Hội đồng dành riêng cho giai đoạn xét duyệt hồ sơ và xác định danh sách người tham gia. Kết quả: Hội đồng xét duyệt hồ sơ được tạo với danh sách thành viên để nhận BM02 và lập BM03. | Cao | Đề xuất |
| UC-PH-01 | Xem hồ sơ phục vụ đánh giá xét duyệt hồ sơ | Thành viên Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt hồ sơ, Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch | Người đánh giá mở hồ sơ và BM01 để có thông tin cần thiết trước khi viết nhận xét cá nhân. Kết quả: Người đánh giá có BM01 làm căn cứ lập phiếu. | Cao | Đề xuất |
| UC-PH-02 | Lập và nộp phiếu xét duyệt hồ sơ | Thành viên Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt hồ sơ, Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch | Mỗi người đánh giá hoàn thành BM02, ký bên ngoài và nộp phiếu cá nhân vào hệ thống trước mốc chốt. Kết quả: BM02 đã ký được nộp, khóa và tính là phiếu hợp lệ trước mốc chốt. | Cao | Đề xuất |
| UC-BB-01 | Lập và nộp biên bản xét duyệt hồ sơ có chữ ký Thư ký | Thư ký Hội đồng xét duyệt hồ sơ | Thư ký tổng hợp kết quả xét duyệt hồ sơ thành BM03, ký và gửi bản này cho P.KHCN kiểm tra tiếp. Kết quả: BM03 có chữ ký Thư ký được nộp cho P.KHCN và form bị khóa. | Cao | Đề xuất |

### 3.3.3. Trường dữ liệu chính

| **STT** | **Nhóm dữ liệu** | **Mô tả** |
| --- | --- | --- |
| 1 | Hồ sơ/BM01 được xét | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 2 | Hội đồng xét duyệt hồ sơ | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 3 | Phiếu BM02 | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 4 | Biên bản BM03 | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 5 | Số phiếu hợp lệ | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 6 | Kết luận xét duyệt | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |

### 3.3.4. Quy tắc nghiệp vụ

| **Mã BR** | **Quy tắc** | **UC liên quan** |
| --- | --- | --- |
| BR-M03-01 | Mọi thành viên đánh giá, gồm Thư ký và P.KHCN khi giữ vai trò Chủ tịch, nộp phiếu BM02 của mình. | UC-HD-01, UC-PH-01, UC-PH-02, UC-BB-01 |
| BR-M03-02 | Phiếu đã nộp bị khóa; biên bản chỉ được mở sau khi Thư ký chốt tập phiếu theo điều kiện hiện hành. | UC-HD-01, UC-PH-01, UC-PH-02, UC-BB-01 |
| BR-M03-03 | BM03 do Thư ký lập và P.KHCN/Chủ tịch rà soát, trả sửa hoặc xác nhận theo luồng biên bản dùng chung. | UC-HD-01, UC-PH-01, UC-PH-02, UC-BB-01 |

### 3.3.5. Kết quả đầu ra

• UC-HD-01: Hội đồng xét duyệt hồ sơ được tạo với danh sách thành viên để nhận BM02 và lập BM03.

• UC-PH-01: Người đánh giá có BM01 làm căn cứ lập phiếu.

• UC-PH-02: BM02 đã ký được nộp, khóa và tính là phiếu hợp lệ trước mốc chốt.

• UC-BB-01: BM03 có chữ ký Thư ký được nộp cho P.KHCN và form bị khóa.

### 3.3.6. Tiêu chí nghiệm thu

| **Mã AC** | **UC** | **Tiêu chí nghiệm thu** |
| --- | --- | --- |
| AC-UC-HD-01 | UC-HD-01 | Khi Cán bộ/Phòng KHCN (P.KHCN) có quyền và dữ liệu hợp lệ thực hiện chức năng, hệ thống hội đồng xét duyệt hồ sơ được tạo với danh sách thành viên để nhận bm02 và lập bm03 và lưu dấu vết thay đổi. |
| AC-UC-PH-01 | UC-PH-01 | Khi Thành viên Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt hồ sơ, Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch truy cập đúng đối tượng và có quyền, hệ thống hiển thị người đánh giá có bm01 làm căn cứ lập phiếu; dữ liệu ngoài phạm vi quyền không được cung cấp. |
| AC-UC-PH-02 | UC-PH-02 | Khi Thành viên Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt hồ sơ, Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch cung cấp đủ dữ liệu/tệp bắt buộc và xác nhận thao tác trong thời hạn, hệ thống bm02 đã ký được nộp, khóa và tính là phiếu hợp lệ trước mốc chốt; thao tác sai quyền, sai trạng thái hoặc quá hạn bị từ chối. |
| AC-UC-BB-01 | UC-BB-01 | Khi Thư ký Hội đồng xét duyệt hồ sơ cung cấp đủ dữ liệu/tệp bắt buộc và xác nhận thao tác trong thời hạn, hệ thống bm03 có chữ ký thư ký được nộp cho p.khcn và form bị khóa; thao tác sai quyền, sai trạng thái hoặc quá hạn bị từ chối. |

## 3.4. Module M04 - Nộp thuyết minh

### 3.4.1. Mô tả chức năng

Module M04 nhóm 1 yêu cầu liên quan đến nộp thuyết minh. Actor tham gia: Chủ nhiệm đề tài.

### 3.4.2. Yêu cầu chức năng

| **Mã YC** | **Tên chức năng** | **Actor** | **Mô tả và kết quả** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| UC-TM-01 | Tải thuyết minh hoàn chỉnh lên hồ sơ đề tài | Chủ nhiệm đề tài | Chủ nhiệm tải BM04 đã soạn hoàn chỉnh bên ngoài lên hồ sơ; hệ thống chỉ lưu tệp, không soạn thuyết minh thay người dùng. Kết quả: Tệp BM04 được soạn ngoài hệ thống và lưu cùng hồ sơ để Hội đồng xem, đánh giá. | Cao | Đề xuất |

### 3.4.3. Trường dữ liệu chính

| **STT** | **Nhóm dữ liệu** | **Mô tả** |
| --- | --- | --- |
| 1 | Mã đề tài | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 2 | Loại BM04A/B | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 3 | Tệp thuyết minh | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 4 | Phiên bản tệp | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 5 | Người tải | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 6 | Thời điểm tải | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |

### 3.4.4. Quy tắc nghiệp vụ

| **Mã BR** | **Quy tắc** | **UC liên quan** |
| --- | --- | --- |
| BR-M04-01 | BM04 được soạn bên ngoài; hệ thống chỉ lưu tệp hoàn chỉnh theo phiên bản và cung cấp đúng quyền. | UC-TM-01 |
| BR-M04-02 | Hệ thống không trích xuất hoặc cấu trúc hóa kế hoạch, sản phẩm và nội dung nghiên cứu từ BM04. | UC-TM-01 |

### 3.4.5. Kết quả đầu ra

• UC-TM-01: Tệp BM04 được soạn ngoài hệ thống và lưu cùng hồ sơ để Hội đồng xem, đánh giá.

### 3.4.6. Tiêu chí nghiệm thu

| **Mã AC** | **UC** | **Tiêu chí nghiệm thu** |
| --- | --- | --- |
| AC-UC-TM-01 | UC-TM-01 | Khi Chủ nhiệm đề tài thực hiện chức năng trong đúng quyền và trạng thái, hệ thống tệp bm04 được soạn ngoài hệ thống và lưu cùng hồ sơ để hội đồng xem, đánh giá và ghi nhận kết quả nghiệp vụ. |

## 3.5. Module M05 - Phê duyệt thuyết minh và hợp đồng

### 3.5.1. Mô tả chức năng

Module M05 nhóm 8 yêu cầu liên quan đến phê duyệt thuyết minh và hợp đồng. Actor tham gia: Actor có quyền; Chủ nhiệm đề tài; Cán bộ/Phòng KHCN (P.KHCN); Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch; Thành viên Hội đồng xét duyệt thuyết minh; Thư ký Hội đồng xét duyệt thuyết minh.

### 3.5.2. Yêu cầu chức năng

| **Mã YC** | **Tên chức năng** | **Actor** | **Mô tả và kết quả** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| UC-TL-05 | Đăng và lưu quyết định Hội đồng xét duyệt thuyết minh | Cán bộ/Phòng KHCN (P.KHCN) | P.KHCN tải BM05 đã được lập và ký bên ngoài lên hệ thống để lưu và công bố cho người có quyền. Kết quả: BM05 lập/ký bên ngoài được lưu và công bố theo quyền. | Cao | Đề xuất |
| UC-TL-06 | Xem/tải quyết định Hội đồng xét duyệt thuyết minh | Actor có quyền | Người có quyền mở hoặc tải BM05 đã được P.KHCN công bố để biết thông tin Hội đồng thuyết minh. Kết quả: Người dùng truy cập BM05 đã công bố trong phạm vi quyền. | Cao | Đề xuất |
| UC-HD-02 | Tạo Hội đồng xét duyệt thuyết minh | Cán bộ/Phòng KHCN (P.KHCN) | P.KHCN lập Hội đồng dành cho giai đoạn xét duyệt thuyết minh và xác định danh sách thành viên tương ứng. Kết quả: Hội đồng thuyết minh được tạo với danh sách thành viên để nhận BM06 và lập BM07. | Cao | Đề xuất |
| UC-PH-03 | Xem hồ sơ phục vụ đánh giá thuyết minh | Thành viên Hội đồng xét duyệt thuyết minh, Thư ký Hội đồng xét duyệt thuyết minh, Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch | Người đánh giá xem BM04 và tài liệu liên quan làm căn cứ trước khi lập nhận xét thuyết minh. Kết quả: Người đánh giá có BM04/BM05 làm căn cứ lập phiếu. | Cao | Đề xuất |
| UC-PH-04 | Lập và nộp phiếu xét duyệt thuyết minh | Thành viên Hội đồng xét duyệt thuyết minh, Thư ký Hội đồng xét duyệt thuyết minh, Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch | Mỗi người đánh giá hoàn thành BM06, ký và nộp phiếu cá nhân trước khi Thư ký chốt tập phiếu. Kết quả: BM06 đã ký được nộp, khóa và tính là phiếu hợp lệ trước mốc chốt. | Cao | Đề xuất |
| UC-BB-02 | Lập và nộp biên bản xét duyệt thuyết minh có chữ ký Thư ký | Thư ký Hội đồng xét duyệt thuyết minh | Thư ký tổng hợp kết quả xét duyệt thuyết minh thành BM07, ký và gửi cho P.KHCN xử lý tiếp. Kết quả: BM07 có chữ ký Thư ký được nộp cho P.KHCN và form bị khóa. | Cao | Đề xuất |
| UC-TL-01 | Lưu hợp đồng đã ký của đề tài | Cán bộ/Phòng KHCN (P.KHCN) | P.KHCN lưu tệp hợp đồng đã được các bên ký bên ngoài để quản lý cùng hồ sơ đề tài. Kết quả: Tệp hợp đồng đã ký được lưu; hệ thống không ký hoặc xử lý thanh toán. | Cao | Đề xuất |
| UC-TL-02 | Xem và tải hợp đồng đã ký của đề tài | Chủ nhiệm đề tài | Chủ nhiệm xem hoặc tải hợp đồng đã ký của đúng đề tài mình phụ trách. Kết quả: Chủ nhiệm truy cập được hợp đồng của đúng đề tài. | Cao | Đề xuất |

### 3.5.3. Trường dữ liệu chính

| **STT** | **Nhóm dữ liệu** | **Mô tả** |
| --- | --- | --- |
| 1 | Quyết định BM05 | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 2 | Hội đồng thuyết minh | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 3 | Hạn đánh giá | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 4 | Phiếu BM06 | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 5 | Biên bản BM07 | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 6 | Kết luận thực hiện/không thực hiện | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 7 | Hợp đồng đã ký | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |

### 3.5.4. Quy tắc nghiệp vụ

| **Mã BR** | **Quy tắc** | **UC liên quan** |
| --- | --- | --- |
| BR-M05-01 | BM05 được lập/ký bên ngoài và chỉ được P.KHCN đăng, lưu, công bố theo quyền. | UC-TL-05, UC-TL-06, UC-HD-02, UC-PH-03, UC-PH-04, UC-BB-02, UC-TL-01, UC-TL-02 |
| BR-M05-02 | BM06 đã nộp là chốt tuyệt đối, không trả lại, sửa hoặc nộp lại; gia hạn chỉ áp dụng người chưa nộp. | UC-TL-05, UC-TL-06, UC-HD-02, UC-PH-03, UC-PH-04, UC-BB-02, UC-TL-01, UC-TL-02 |
| BR-M05-03 | Sau khi P.KHCN xác nhận BM07 hợp lệ, kết luận được thông báo; đề tài đạt chuyển sang Đang thực hiện. | UC-TL-05, UC-TL-06, UC-HD-02, UC-PH-03, UC-PH-04, UC-BB-02, UC-TL-01, UC-TL-02 |
| BR-M05-04 | Hợp đồng được ký ngoài hệ thống; hệ thống chỉ lưu và cung cấp tệp hợp đồng đã ký. | UC-TL-05, UC-TL-06, UC-HD-02, UC-PH-03, UC-PH-04, UC-BB-02, UC-TL-01, UC-TL-02 |

### 3.5.5. Kết quả đầu ra

• UC-TL-05: BM05 lập/ký bên ngoài được lưu và công bố theo quyền.

• UC-TL-06: Người dùng truy cập BM05 đã công bố trong phạm vi quyền.

• UC-HD-02: Hội đồng thuyết minh được tạo với danh sách thành viên để nhận BM06 và lập BM07.

• UC-PH-03: Người đánh giá có BM04/BM05 làm căn cứ lập phiếu.

• UC-PH-04: BM06 đã ký được nộp, khóa và tính là phiếu hợp lệ trước mốc chốt.

• UC-BB-02: BM07 có chữ ký Thư ký được nộp cho P.KHCN và form bị khóa.

• UC-TL-01: Tệp hợp đồng đã ký được lưu; hệ thống không ký hoặc xử lý thanh toán.

• UC-TL-02: Chủ nhiệm truy cập được hợp đồng của đúng đề tài.

### 3.5.6. Tiêu chí nghiệm thu

| **Mã AC** | **UC** | **Tiêu chí nghiệm thu** |
| --- | --- | --- |
| AC-UC-TL-05 | UC-TL-05 | Khi Cán bộ/Phòng KHCN (P.KHCN) thực hiện chức năng trong đúng quyền và trạng thái, hệ thống bm05 lập/ký bên ngoài được lưu và công bố theo quyền và ghi nhận kết quả nghiệp vụ. |
| AC-UC-TL-06 | UC-TL-06 | Khi Actor có quyền truy cập đúng đối tượng và có quyền, hệ thống hiển thị người dùng truy cập bm05 đã công bố trong phạm vi quyền; dữ liệu ngoài phạm vi quyền không được cung cấp. |
| AC-UC-HD-02 | UC-HD-02 | Khi Cán bộ/Phòng KHCN (P.KHCN) có quyền và dữ liệu hợp lệ thực hiện chức năng, hệ thống hội đồng thuyết minh được tạo với danh sách thành viên để nhận bm06 và lập bm07 và lưu dấu vết thay đổi. |
| AC-UC-PH-03 | UC-PH-03 | Khi Thành viên Hội đồng xét duyệt thuyết minh, Thư ký Hội đồng xét duyệt thuyết minh, Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch truy cập đúng đối tượng và có quyền, hệ thống hiển thị người đánh giá có bm04/bm05 làm căn cứ lập phiếu; dữ liệu ngoài phạm vi quyền không được cung cấp. |
| AC-UC-PH-04 | UC-PH-04 | Khi Thành viên Hội đồng xét duyệt thuyết minh, Thư ký Hội đồng xét duyệt thuyết minh, Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch cung cấp đủ dữ liệu/tệp bắt buộc và xác nhận thao tác trong thời hạn, hệ thống bm06 đã ký được nộp, khóa và tính là phiếu hợp lệ trước mốc chốt; thao tác sai quyền, sai trạng thái hoặc quá hạn bị từ chối. |
| AC-UC-BB-02 | UC-BB-02 | Khi Thư ký Hội đồng xét duyệt thuyết minh cung cấp đủ dữ liệu/tệp bắt buộc và xác nhận thao tác trong thời hạn, hệ thống bm07 có chữ ký thư ký được nộp cho p.khcn và form bị khóa; thao tác sai quyền, sai trạng thái hoặc quá hạn bị từ chối. |
| AC-UC-TL-01 | UC-TL-01 | Khi Cán bộ/Phòng KHCN (P.KHCN) thực hiện chức năng trong đúng quyền và trạng thái, hệ thống tệp hợp đồng đã ký được lưu; hệ thống không ký hoặc xử lý thanh toán và ghi nhận kết quả nghiệp vụ. |
| AC-UC-TL-02 | UC-TL-02 | Khi Chủ nhiệm đề tài truy cập đúng đối tượng và có quyền, hệ thống hiển thị chủ nhiệm truy cập được hợp đồng của đúng đề tài; dữ liệu ngoài phạm vi quyền không được cung cấp. |

## 3.6. Module M06 - Thực hiện và báo cáo tiến độ

### 3.6.1. Mô tả chức năng

Module M06 nhóm 2 yêu cầu liên quan đến thực hiện và báo cáo tiến độ. Actor tham gia: Actor có liên quan; Chủ nhiệm đề tài.

### 3.6.2. Yêu cầu chức năng

| **Mã YC** | **Tên chức năng** | **Actor** | **Mô tả và kết quả** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| UC-BC-01 | Lập và nộp báo cáo tiến độ | Chủ nhiệm đề tài | Chủ nhiệm nhập báo cáo tiến độ BM08, xuất PDF để ký và nộp bản đã ký vào hệ thống. Kết quả: BM08 đầy đủ dữ liệu, có PDF đã ký được nộp và form bị khóa. | Cao | Đề xuất |
| UC-BC-04 | Xem/tải báo cáo tiến độ, tổng kết và giải trình theo quyền | Actor có liên quan | Người có quyền truy cập mở hoặc tải các báo cáo và giải trình đã nộp trong phạm vi công việc của mình. Kết quả: Tài liệu đã nộp được khai thác trong phạm vi quyền. | Cao | Đề xuất |

### 3.6.3. Trường dữ liệu chính

| **STT** | **Nhóm dữ liệu** | **Mô tả** |
| --- | --- | --- |
| 1 | Đề tài đang thực hiện | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 2 | Kỳ báo cáo | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 3 | Dữ liệu và PDF BM08 | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 4 | Tình trạng nộp | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 5 | Tài liệu được phép xem/tải | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |

### 3.6.4. Quy tắc nghiệp vụ

| **Mã BR** | **Quy tắc** | **UC liên quan** |
| --- | --- | --- |
| BR-M06-01 | Chủ nhiệm lập/nộp BM08 và theo dõi tài liệu của đúng đề tài theo quyền. | UC-BC-01, UC-BC-04 |
| BR-M06-02 | Nguồn kế hoạch/sản phẩm không tự động lấy từ BM04 vì BM04 chỉ là tệp; trường dữ liệu chi tiết cần xác minh theo biểu mẫu. | UC-BC-01, UC-BC-04 |

### 3.6.5. Kết quả đầu ra

• UC-BC-01: BM08 đầy đủ dữ liệu, có PDF đã ký được nộp và form bị khóa.

• UC-BC-04: Tài liệu đã nộp được khai thác trong phạm vi quyền.

### 3.6.6. Tiêu chí nghiệm thu

| **Mã AC** | **UC** | **Tiêu chí nghiệm thu** |
| --- | --- | --- |
| AC-UC-BC-01 | UC-BC-01 | Khi Chủ nhiệm đề tài cung cấp đủ dữ liệu/tệp bắt buộc và xác nhận thao tác trong thời hạn, hệ thống bm08 đầy đủ dữ liệu, có pdf đã ký được nộp và form bị khóa; thao tác sai quyền, sai trạng thái hoặc quá hạn bị từ chối. |
| AC-UC-BC-04 | UC-BC-04 | Khi Actor có liên quan truy cập đúng đối tượng và có quyền, hệ thống hiển thị tài liệu đã nộp được khai thác trong phạm vi quyền; dữ liệu ngoài phạm vi quyền không được cung cấp. |

## 3.7. Module M07 - Nộp hồ sơ và nghiệm thu

### 3.7.1. Mô tả chức năng

Module M07 nhóm 7 yêu cầu liên quan đến nộp hồ sơ và nghiệm thu. Actor tham gia: Actor có quyền; Chủ nhiệm đề tài; Cán bộ/Phòng KHCN (P.KHCN); Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch; Thành viên Hội đồng nghiệm thu; Thư ký Hội đồng nghiệm thu.

### 3.7.2. Yêu cầu chức năng

| **Mã YC** | **Tên chức năng** | **Actor** | **Mô tả và kết quả** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| UC-BC-02 | Tải báo cáo tổng kết hoàn chỉnh lên hồ sơ đề tài | Chủ nhiệm đề tài | Chủ nhiệm tải BM09 đã hoàn thiện bên ngoài lên hồ sơ để chuẩn bị cho việc xem xét nghiệm thu. Kết quả: Tệp BM09 hoàn chỉnh được lưu cùng đề tài. | Cao | Đề xuất |
| UC-TL-07 | Đăng và lưu quyết định Hội đồng nghiệm thu | Cán bộ/Phòng KHCN (P.KHCN) | P.KHCN tải BM10 đã được lập và ký bên ngoài lên hệ thống để lưu và công bố theo quyền. Kết quả: BM10 lập/ký bên ngoài được lưu và công bố theo quyền. | Cao | Đề xuất |
| UC-TL-08 | Xem/tải quyết định Hội đồng nghiệm thu | Actor có quyền | Người có quyền mở hoặc tải BM10 đã công bố để biết thông tin Hội đồng nghiệm thu. Kết quả: Người dùng truy cập BM10 đã công bố trong phạm vi quyền. | Cao | Đề xuất |
| UC-HD-03 | Tạo Hội đồng nghiệm thu | Cán bộ/Phòng KHCN (P.KHCN) | P.KHCN lập Hội đồng nghiệm thu và xác định danh sách thành viên tham gia giai đoạn đánh giá kết quả. Kết quả: Hội đồng nghiệm thu được tạo với danh sách thành viên để nhận BM11 và lập BM12. | Cao | Đề xuất |
| UC-PH-05 | Xem hồ sơ phục vụ đánh giá nghiệm thu | Thành viên Hội đồng nghiệm thu, Thư ký Hội đồng nghiệm thu, Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch | Người đánh giá xem báo cáo tổng kết và quyết định liên quan để có căn cứ lập phiếu nghiệm thu. Kết quả: Người đánh giá có BM09/BM10 làm căn cứ lập phiếu. | Cao | Đề xuất |
| UC-PH-06 | Lập và nộp phiếu nghiệm thu | Thành viên Hội đồng nghiệm thu, Thư ký Hội đồng nghiệm thu, Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch | Mỗi người đánh giá hoàn thành BM11, ký và nộp phiếu cá nhân trước khi Thư ký chốt tập phiếu. Kết quả: BM11 đã ký được nộp, khóa và tính là phiếu hợp lệ trước mốc chốt. | Cao | Đề xuất |
| UC-BB-03 | Lập và nộp biên bản nghiệm thu có chữ ký Thư ký | Thư ký Hội đồng nghiệm thu | Thư ký tổng hợp kết quả nghiệm thu thành BM12, ký và gửi cho P.KHCN kiểm tra tiếp. Kết quả: BM12 có chữ ký Thư ký được nộp cho P.KHCN và form bị khóa. | Cao | Đề xuất |

### 3.7.3. Trường dữ liệu chính

| **STT** | **Nhóm dữ liệu** | **Mô tả** |
| --- | --- | --- |
| 1 | Báo cáo tổng kết BM09 | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 2 | Quyết định BM10 | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 3 | Hội đồng nghiệm thu | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 4 | Phiếu BM11 | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 5 | Biên bản BM12 | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 6 | Kết quả nghiệm thu | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |

### 3.7.4. Quy tắc nghiệp vụ

| **Mã BR** | **Quy tắc** | **UC liên quan** |
| --- | --- | --- |
| BR-M07-01 | BM09 và BM10 được tải dưới dạng tài liệu hoàn chỉnh; hệ thống không soạn quyết định BM10. | UC-BC-02, UC-TL-07, UC-TL-08, UC-HD-03, UC-PH-05, UC-PH-06, UC-BB-03 |
| BR-M07-02 | BM11 đã nộp bị khóa và không được sửa/nộp lại. | UC-BC-02, UC-TL-07, UC-TL-08, UC-HD-03, UC-PH-05, UC-PH-06, UC-BB-03 |
| BR-M07-03 | BM12 tuân theo luồng biên bản; kết quả nghiệm thu chỉ có hiệu lực trên hệ thống sau khi được xác nhận. | UC-BC-02, UC-TL-07, UC-TL-08, UC-HD-03, UC-PH-05, UC-PH-06, UC-BB-03 |

### 3.7.5. Kết quả đầu ra

• UC-BC-02: Tệp BM09 hoàn chỉnh được lưu cùng đề tài.

• UC-TL-07: BM10 lập/ký bên ngoài được lưu và công bố theo quyền.

• UC-TL-08: Người dùng truy cập BM10 đã công bố trong phạm vi quyền.

• UC-HD-03: Hội đồng nghiệm thu được tạo với danh sách thành viên để nhận BM11 và lập BM12.

• UC-PH-05: Người đánh giá có BM09/BM10 làm căn cứ lập phiếu.

• UC-PH-06: BM11 đã ký được nộp, khóa và tính là phiếu hợp lệ trước mốc chốt.

• UC-BB-03: BM12 có chữ ký Thư ký được nộp cho P.KHCN và form bị khóa.

### 3.7.6. Tiêu chí nghiệm thu

| **Mã AC** | **UC** | **Tiêu chí nghiệm thu** |
| --- | --- | --- |
| AC-UC-BC-02 | UC-BC-02 | Khi Chủ nhiệm đề tài thực hiện chức năng trong đúng quyền và trạng thái, hệ thống tệp bm09 hoàn chỉnh được lưu cùng đề tài và ghi nhận kết quả nghiệp vụ. |
| AC-UC-TL-07 | UC-TL-07 | Khi Cán bộ/Phòng KHCN (P.KHCN) thực hiện chức năng trong đúng quyền và trạng thái, hệ thống bm10 lập/ký bên ngoài được lưu và công bố theo quyền và ghi nhận kết quả nghiệp vụ. |
| AC-UC-TL-08 | UC-TL-08 | Khi Actor có quyền truy cập đúng đối tượng và có quyền, hệ thống hiển thị người dùng truy cập bm10 đã công bố trong phạm vi quyền; dữ liệu ngoài phạm vi quyền không được cung cấp. |
| AC-UC-HD-03 | UC-HD-03 | Khi Cán bộ/Phòng KHCN (P.KHCN) có quyền và dữ liệu hợp lệ thực hiện chức năng, hệ thống hội đồng nghiệm thu được tạo với danh sách thành viên để nhận bm11 và lập bm12 và lưu dấu vết thay đổi. |
| AC-UC-PH-05 | UC-PH-05 | Khi Thành viên Hội đồng nghiệm thu, Thư ký Hội đồng nghiệm thu, Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch truy cập đúng đối tượng và có quyền, hệ thống hiển thị người đánh giá có bm09/bm10 làm căn cứ lập phiếu; dữ liệu ngoài phạm vi quyền không được cung cấp. |
| AC-UC-PH-06 | UC-PH-06 | Khi Thành viên Hội đồng nghiệm thu, Thư ký Hội đồng nghiệm thu, Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch cung cấp đủ dữ liệu/tệp bắt buộc và xác nhận thao tác trong thời hạn, hệ thống bm11 đã ký được nộp, khóa và tính là phiếu hợp lệ trước mốc chốt; thao tác sai quyền, sai trạng thái hoặc quá hạn bị từ chối. |
| AC-UC-BB-03 | UC-BB-03 | Khi Thư ký Hội đồng nghiệm thu cung cấp đủ dữ liệu/tệp bắt buộc và xác nhận thao tác trong thời hạn, hệ thống bm12 có chữ ký thư ký được nộp cho p.khcn và form bị khóa; thao tác sai quyền, sai trạng thái hoặc quá hạn bị từ chối. |

## 3.8. Module M08 - Chỉnh sửa sau nghiệm thu và BM14

### 3.8.1. Mô tả chức năng

Module M08 nhóm 3 yêu cầu liên quan đến chỉnh sửa sau nghiệm thu và bm14. Actor tham gia: Chủ nhiệm đề tài; Cán bộ/Phòng KHCN (P.KHCN).

### 3.8.2. Yêu cầu chức năng

| **Mã YC** | **Tên chức năng** | **Actor** | **Mô tả và kết quả** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| UC-BC-03 | Lập và nộp giải trình | Chủ nhiệm đề tài | Chủ nhiệm lập BM13 để giải thích cách xử lý các yêu cầu chỉnh sửa sau nghiệm thu và nộp bản đã ký. Kết quả: BM13 đầy đủ dữ liệu, có PDF đã ký được nộp và form bị khóa. | Cao | Đề xuất |
| UC-TL-03 | Lưu bản BM14 hoàn chỉnh sau xử lý bên ngoài | Cán bộ/Phòng KHCN (P.KHCN) | P.KHCN tải BM14 hoàn chỉnh lên để lưu sau khi toàn bộ việc lập, xử lý và ký đã diễn ra bên ngoài hệ thống. Kết quả: Tệp BM14 hoàn chỉnh được lưu sau khi toàn bộ việc lập, xử lý và ký diễn ra bên ngoài. | Cao | Đề xuất |
| UC-TL-04 | Xem bản BM14 hoàn chỉnh | Chủ nhiệm đề tài | Chủ nhiệm mở BM14 hoàn chỉnh đã được P.KHCN lưu cho đúng đề tài. Kết quả: Chủ nhiệm xem được BM14 đã lưu của đề tài. | Cao | Đề xuất |

### 3.8.3. Trường dữ liệu chính

| **STT** | **Nhóm dữ liệu** | **Mô tả** |
| --- | --- | --- |
| 1 | Yêu cầu chỉnh sửa sau nghiệm thu | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 2 | Giải trình BM13 | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 3 | Tệp chỉnh sửa | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 4 | BM14 hoàn chỉnh | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 5 | Thời điểm lưu/công bố | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |

### 3.8.4. Quy tắc nghiệp vụ

| **Mã BR** | **Quy tắc** | **UC liên quan** |
| --- | --- | --- |
| BR-M08-01 | BM13 do Chủ nhiệm lập/nộp theo yêu cầu chỉnh sửa sau nghiệm thu. | UC-BC-03, UC-TL-03, UC-TL-04 |
| BR-M08-02 | BM14 được lập, xử lý và ký hoàn toàn bên ngoài; P.KHCN chỉ lưu bản hoàn chỉnh và cấp quyền xem. | UC-BC-03, UC-TL-03, UC-TL-04 |

### 3.8.5. Kết quả đầu ra

• UC-BC-03: BM13 đầy đủ dữ liệu, có PDF đã ký được nộp và form bị khóa.

• UC-TL-03: Tệp BM14 hoàn chỉnh được lưu sau khi toàn bộ việc lập, xử lý và ký diễn ra bên ngoài.

• UC-TL-04: Chủ nhiệm xem được BM14 đã lưu của đề tài.

### 3.8.6. Tiêu chí nghiệm thu

| **Mã AC** | **UC** | **Tiêu chí nghiệm thu** |
| --- | --- | --- |
| AC-UC-BC-03 | UC-BC-03 | Khi Chủ nhiệm đề tài cung cấp đủ dữ liệu/tệp bắt buộc và xác nhận thao tác trong thời hạn, hệ thống bm13 đầy đủ dữ liệu, có pdf đã ký được nộp và form bị khóa; thao tác sai quyền, sai trạng thái hoặc quá hạn bị từ chối. |
| AC-UC-TL-03 | UC-TL-03 | Khi Cán bộ/Phòng KHCN (P.KHCN) thực hiện chức năng trong đúng quyền và trạng thái, hệ thống tệp bm14 hoàn chỉnh được lưu sau khi toàn bộ việc lập, xử lý và ký diễn ra bên ngoài và ghi nhận kết quả nghiệp vụ. |
| AC-UC-TL-04 | UC-TL-04 | Khi Chủ nhiệm đề tài truy cập đúng đối tượng và có quyền, hệ thống hiển thị chủ nhiệm xem được bm14 đã lưu của đề tài; dữ liệu ngoài phạm vi quyền không được cung cấp. |

## 3.9. Module M09 - Công nhận kết quả

### 3.9.1. Mô tả chức năng

Module M09 nhóm 2 yêu cầu liên quan đến công nhận kết quả. Actor tham gia: Actor có quyền; Cán bộ/Phòng KHCN (P.KHCN).

### 3.9.2. Yêu cầu chức năng

| **Mã YC** | **Tên chức năng** | **Actor** | **Mô tả và kết quả** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| UC-TL-09 | Đăng và lưu quyết định công nhận kết quả | Cán bộ/Phòng KHCN (P.KHCN) | P.KHCN tải BM15 đã được lập và ký bên ngoài lên hệ thống để lưu và công bố kết quả được công nhận. Kết quả: BM15 lập/ký bên ngoài được lưu và công bố theo quyền. | Cao | Đề xuất |
| UC-TL-10 | Xem/tải quyết định công nhận kết quả | Actor có quyền | Người có quyền mở hoặc tải BM15 đã công bố để biết quyết định công nhận kết quả. Kết quả: Người dùng truy cập BM15 đã công bố trong phạm vi quyền. | Cao | Đề xuất |

### 3.9.3. Trường dữ liệu chính

| **STT** | **Nhóm dữ liệu** | **Mô tả** |
| --- | --- | --- |
| 1 | Quyết định BM15 | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 2 | Danh sách đề tài được công nhận | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 3 | Tệp quyết định | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 4 | Phạm vi công bố | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 5 | Thời điểm công bố | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |

### 3.9.4. Quy tắc nghiệp vụ

| **Mã BR** | **Quy tắc** | **UC liên quan** |
| --- | --- | --- |
| BR-M09-01 | BM15 được lập/ký ngoài hệ thống; P.KHCN chỉ đăng và lưu tệp đã có. | UC-TL-09, UC-TL-10 |
| BR-M09-02 | Việc triển khai ứng dụng và lưu hồ sơ chuyên môn phía sau nằm ngoài phạm vi xử lý chi tiết của hệ thống. | UC-TL-09, UC-TL-10 |

### 3.9.5. Kết quả đầu ra

• UC-TL-09: BM15 lập/ký bên ngoài được lưu và công bố theo quyền.

• UC-TL-10: Người dùng truy cập BM15 đã công bố trong phạm vi quyền.

### 3.9.6. Tiêu chí nghiệm thu

| **Mã AC** | **UC** | **Tiêu chí nghiệm thu** |
| --- | --- | --- |
| AC-UC-TL-09 | UC-TL-09 | Khi Cán bộ/Phòng KHCN (P.KHCN) thực hiện chức năng trong đúng quyền và trạng thái, hệ thống bm15 lập/ký bên ngoài được lưu và công bố theo quyền và ghi nhận kết quả nghiệp vụ. |
| AC-UC-TL-10 | UC-TL-10 | Khi Actor có quyền truy cập đúng đối tượng và có quyền, hệ thống hiển thị người dùng truy cập bm15 đã công bố trong phạm vi quyền; dữ liệu ngoài phạm vi quyền không được cung cấp. |

## 3.10. Module M10 - Actor, phân quyền và truy cập

### 3.10.1. Mô tả chức năng

Module M10 nhóm 3 yêu cầu liên quan đến actor, phân quyền và truy cập. Actor tham gia: Actor có tài khoản; Cán bộ/Phòng KHCN (P.KHCN) và các actor Hội đồng theo phân công; Giảng viên.

### 3.10.2. Yêu cầu chức năng

| **Mã YC** | **Tên chức năng** | **Actor** | **Mô tả và kết quả** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| UC-ACT-01 | Sử dụng quyền theo vai trò nghiệp vụ được cấp | Actor có tài khoản | Người dùng thao tác theo vai trò đang được cấp; cùng một tài khoản có thể có nhiều vai trò nhưng quyền của từng vai trò vẫn tách biệt. Kết quả: Chỉ thực hiện được hành vi của vai trò hiện hành; một tài khoản có thể mang nhiều vai trò. | Cao | Đề xuất |
| UC-ACT-02 | Sử dụng vai trò Giảng viên hướng dẫn trên đề tài sinh viên được gán | Giảng viên | Giảng viên dùng tài khoản hiện có để thực hiện quyền hướng dẫn trên đúng hồ sơ sinh viên được phân công. Kết quả: Giảng viên xét duyệt đúng hồ sơ sinh viên được gán bằng tài khoản hiện có. | Cao | Đề xuất |
| UC-ACT-03 | Sử dụng nhiều vai trò Hội đồng trên cùng tài khoản | Cán bộ/Phòng KHCN (P.KHCN) và các actor Hội đồng theo phân công | Một người tham gia nhiều Hội đồng hoặc giai đoạn vẫn dùng một tài khoản và chọn đúng vai trò cần thực hiện. Kết quả: Một cá nhân truy cập đúng quyền theo từng Hội đồng/giai đoạn mà không cần tài khoản trùng lặp. | Cao | Đề xuất |

### 3.10.3. Trường dữ liệu chính

| **STT** | **Nhóm dữ liệu** | **Mô tả** |
| --- | --- | --- |
| 1 | Tài khoản | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 2 | Vai trò nghiệp vụ | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 3 | Đơn vị | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 4 | Hội đồng được phân công | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 5 | Thời gian hiệu lực quyền | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 6 | Phạm vi dữ liệu | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |

### 3.10.4. Quy tắc nghiệp vụ

| **Mã BR** | **Quy tắc** | **UC liên quan** |
| --- | --- | --- |
| BR-M10-01 | Người dùng trong Trường dùng tài khoản do Nhà trường quản lý; người ngoài Trường dùng tài khoản do P.KHCN cấp. | UC-ACT-01, UC-ACT-02, UC-ACT-03 |
| BR-M10-02 | Một tài khoản có thể mang nhiều vai trò Hội đồng; quyền được xác định theo vai trò và Hội đồng/giai đoạn. | UC-ACT-01, UC-ACT-02, UC-ACT-03 |
| BR-M10-03 | Giảng viên hướng dẫn là vai trò trên tài khoản Giảng viên, không phải actor/tài khoản riêng. | UC-ACT-01, UC-ACT-02, UC-ACT-03 |

### 3.10.5. Kết quả đầu ra

• UC-ACT-01: Chỉ thực hiện được hành vi của vai trò hiện hành; một tài khoản có thể mang nhiều vai trò.

• UC-ACT-02: Giảng viên xét duyệt đúng hồ sơ sinh viên được gán bằng tài khoản hiện có.

• UC-ACT-03: Một cá nhân truy cập đúng quyền theo từng Hội đồng/giai đoạn mà không cần tài khoản trùng lặp.

### 3.10.6. Tiêu chí nghiệm thu

| **Mã AC** | **UC** | **Tiêu chí nghiệm thu** |
| --- | --- | --- |
| AC-UC-ACT-01 | UC-ACT-01 | Khi Actor có tài khoản thực hiện chức năng trong đúng quyền và trạng thái, hệ thống chỉ thực hiện được hành vi của vai trò hiện hành; một tài khoản có thể mang nhiều vai trò và ghi nhận kết quả nghiệp vụ. |
| AC-UC-ACT-02 | UC-ACT-02 | Khi Giảng viên thực hiện chức năng trong đúng quyền và trạng thái, hệ thống giảng viên xét duyệt đúng hồ sơ sinh viên được gán bằng tài khoản hiện có và ghi nhận kết quả nghiệp vụ. |
| AC-UC-ACT-03 | UC-ACT-03 | Khi Cán bộ/Phòng KHCN (P.KHCN) và các actor Hội đồng theo phân công thực hiện chức năng trong đúng quyền và trạng thái, hệ thống một cá nhân truy cập đúng quyền theo từng hội đồng/giai đoạn mà không cần tài khoản trùng lặp và ghi nhận kết quả nghiệp vụ. |

## 3.11. Module M11 - Quản lý Hội đồng dùng chung

### 3.11.1. Mô tả chức năng

Module M11 nhóm 4 yêu cầu liên quan đến quản lý hội đồng dùng chung. Actor tham gia: Cán bộ/Phòng KHCN (P.KHCN); Thư ký Hội đồng nghiệm thu; Thư ký Hội đồng xét duyệt hồ sơ; Thư ký Hội đồng xét duyệt thuyết minh.

### 3.11.2. Yêu cầu chức năng

| **Mã YC** | **Tên chức năng** | **Actor** | **Mô tả và kết quả** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| UC-HD-04 | Quản lý thông tin Hội đồng trước mốc chốt phiếu | Cán bộ/Phòng KHCN (P.KHCN) | P.KHCN duy trì các thông tin hành chính của Hội đồng trong phạm vi và thời điểm hệ thống còn cho phép. Kết quả: Thông tin hành chính của Hội đồng được duy trì trong giới hạn cho phép. | Cao | Đề xuất |
| UC-HD-05 | Theo dõi tiến độ nộp phiếu của Hội đồng | Cán bộ/Phòng KHCN (P.KHCN) | P.KHCN quan sát số phiếu đã nộp và mức đáp ứng điều kiện quá bán mà không sửa nội dung đánh giá. Kết quả: Theo dõi số phiếu đã nộp và điều kiện quá bán mà không can thiệp đánh giá chuyên môn. | Cao | Đề xuất |
| UC-CHOT-01 | Kiểm tra điều kiện quá bán của Hội đồng | Thư ký Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt thuyết minh hoặc Thư ký Hội đồng nghiệm thu | Thư ký kiểm tra số phiếu hợp lệ đã lớn hơn một nửa tổng số thành viên Hội đồng hay chưa. Kết quả: Biết số phiếu hợp lệ có lớn hơn 50% tổng số thành viên hay không. | Cao | Đề xuất |
| UC-CHOT-02 | Xác nhận chốt phiếu để bắt đầu lập biên bản | Thư ký Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt thuyết minh hoặc Thư ký Hội đồng nghiệm thu | Thư ký xác nhận kết thúc nhận phiếu để khóa tập phiếu hiện có và bắt đầu lập biên bản. Kết quả: Tập phiếu được chốt bất biến, phiếu chưa nộp mất hiệu lực, nhận phiếu bị khóa và form biên bản được mở. | Cao | Đề xuất |

### 3.11.3. Trường dữ liệu chính

| **STT** | **Nhóm dữ liệu** | **Mô tả** |
| --- | --- | --- |
| 1 | Loại Hội đồng | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 2 | Đợt/giai đoạn | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 3 | Danh sách thành viên | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 4 | Vai trò Chủ tịch/Thư ký/thành viên | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 5 | Hạn nộp phiếu | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 6 | Trạng thái Hội đồng | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |

### 3.11.4. Quy tắc nghiệp vụ

| **Mã BR** | **Quy tắc** | **UC liên quan** |
| --- | --- | --- |
| BR-M11-01 | Mỗi giai đoạn có Hội đồng riêng; danh sách thành viên không được sửa sau khi Hội đồng đã được tạo. | UC-HD-04, UC-HD-05, UC-CHOT-01, UC-CHOT-02 |
| BR-M11-02 | Hội đồng có năm trạng thái: Đã thành lập, Đang đánh giá, Đang họp/lập biên bản, Đã hoàn tất và Đã giải tán. | UC-HD-04, UC-HD-05, UC-CHOT-01, UC-CHOT-02 |
| BR-M11-03 | Sau khi giải tán, thành viên chỉ xem lịch sử/chi tiết và không được tải BM04/BM06/BM07 hoặc tài liệu tương ứng. | UC-HD-04, UC-HD-05, UC-CHOT-01, UC-CHOT-02 |

### 3.11.5. Kết quả đầu ra

• UC-HD-04: Thông tin hành chính của Hội đồng được duy trì trong giới hạn cho phép.

• UC-HD-05: Theo dõi số phiếu đã nộp và điều kiện quá bán mà không can thiệp đánh giá chuyên môn.

• UC-CHOT-01: Biết số phiếu hợp lệ có lớn hơn 50% tổng số thành viên hay không.

• UC-CHOT-02: Tập phiếu được chốt bất biến, phiếu chưa nộp mất hiệu lực, nhận phiếu bị khóa và form biên bản được mở.

### 3.11.6. Tiêu chí nghiệm thu

| **Mã AC** | **UC** | **Tiêu chí nghiệm thu** |
| --- | --- | --- |
| AC-UC-HD-04 | UC-HD-04 | Khi Cán bộ/Phòng KHCN (P.KHCN) có quyền và dữ liệu hợp lệ thực hiện chức năng, hệ thống thông tin hành chính của hội đồng được duy trì trong giới hạn cho phép và lưu dấu vết thay đổi. |
| AC-UC-HD-05 | UC-HD-05 | Khi Cán bộ/Phòng KHCN (P.KHCN) truy cập đúng đối tượng và có quyền, hệ thống hiển thị theo dõi số phiếu đã nộp và điều kiện quá bán mà không can thiệp đánh giá chuyên môn; dữ liệu ngoài phạm vi quyền không được cung cấp. |
| AC-UC-CHOT-01 | UC-CHOT-01 | Khi Thư ký Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt thuyết minh hoặc Thư ký Hội đồng nghiệm thu thực hiện chức năng trong đúng quyền và trạng thái, hệ thống biết số phiếu hợp lệ có lớn hơn 50% tổng số thành viên hay không và ghi nhận kết quả nghiệp vụ. |
| AC-UC-CHOT-02 | UC-CHOT-02 | Khi Thư ký Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt thuyết minh hoặc Thư ký Hội đồng nghiệm thu cung cấp đủ dữ liệu/tệp bắt buộc và xác nhận thao tác trong thời hạn, hệ thống tập phiếu được chốt bất biến, phiếu chưa nộp mất hiệu lực, nhận phiếu bị khóa và form biên bản được mở; thao tác sai quyền, sai trạng thái hoặc quá hạn bị từ chối. |

## 3.12. Module M12 - Xử lý biên bản Hội đồng

### 3.12.1. Mô tả chức năng

Module M12 nhóm 5 yêu cầu liên quan đến xử lý biên bản hội đồng. Actor tham gia: Cán bộ/Phòng KHCN (P.KHCN); Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch; Thư ký Hội đồng nghiệm thu; Thư ký Hội đồng xét duyệt hồ sơ; Thư ký Hội đồng xét duyệt thuyết minh.

### 3.12.2. Yêu cầu chức năng

| **Mã YC** | **Tên chức năng** | **Actor** | **Mô tả và kết quả** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| UC-BB-04 | Kiểm tra biên bản do Thư ký nộp | Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch | P.KHCN trong vai trò Chủ tịch kiểm tra biên bản đã đủ và hợp lệ để ký tiếp hay cần trả lại. Kết quả: BM03/BM07/BM12 được xác định hợp lệ để ký tiếp hoặc cần trả sửa. | Cao | Đề xuất |
| UC-BB-05 | Trả biên bản để Thư ký sửa | Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch | Khi biên bản chưa hợp lệ, P.KHCN trả lại cho Thư ký và ghi rõ nội dung cần sửa. Kết quả: Biên bản được trả kèm lý do để sửa và nộp lại; không từ chối vĩnh viễn. | Cao | Đề xuất |
| UC-BB-06 | Sửa, ký lại và nộp lại biên bản bị trả | Thư ký Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt thuyết minh hoặc Thư ký Hội đồng nghiệm thu | Thư ký chỉnh sửa biên bản bị trả, xuất và ký bản mới rồi nộp lại trong thời gian được phép. Kết quả: PDF/chữ ký cũ mất hiệu lực; bản mới có chữ ký Thư ký được nộp lại trong thời gian duyệt. | Cao | Đề xuất |
| UC-BB-07 | Hoàn tất biên bản bằng chữ ký thứ hai của Chủ tịch | Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch | Chủ tịch ký bổ sung vào bản đã có chữ ký Thư ký và tải bản đủ hai chữ ký lên hệ thống. Kết quả: Bản đủ hai chữ ký được tải lên và xác nhận hoàn tất. | Cao | Đề xuất |
| UC-BB-09 | Gia hạn thời gian duyệt biên bản vì lý do chính đáng | Cán bộ/Phòng KHCN (P.KHCN) | P.KHCN mở thêm thời gian sửa hoặc nộp biên bản khi có lý do chính đáng và lưu lại lý do gia hạn. Kết quả: Quyền sửa/nộp được mở lại đến hạn mới; lý do gia hạn được lưu để truy vết. | Cao | Đề xuất |

### 3.12.3. Trường dữ liệu chính

| **STT** | **Nhóm dữ liệu** | **Mô tả** |
| --- | --- | --- |
| 1 | Loại biên bản | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 2 | Phiên bản biên bản | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 3 | Chữ ký Thư ký | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 4 | Chữ ký Chủ tịch | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 5 | Lý do trả sửa | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 6 | Hạn xử lý/gia hạn | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 7 | Trạng thái biên bản | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |

### 3.12.4. Quy tắc nghiệp vụ

| **Mã BR** | **Quy tắc** | **UC liên quan** |
| --- | --- | --- |
| BR-M12-01 | BM03/BM07/BM12 do Thư ký lập; P.KHCN kiểm tra tính hợp lệ và chữ ký, không đánh giá thay Hội đồng. | UC-BB-04, UC-BB-05, UC-BB-06, UC-BB-07, UC-BB-09 |
| BR-M12-02 | Khi trả biên bản phải nhập lý do; Thư ký sửa và nộp lại, bản/PDF cũ mất hiệu lực theo quy tắc phiên bản. | UC-BB-04, UC-BB-05, UC-BB-06, UC-BB-07, UC-BB-09 |
| BR-M12-03 | Chỉ sau khi P.KHCN xác nhận, hệ thống mới ghi nhận kết quả và gửi thông báo cho actor liên quan. | UC-BB-04, UC-BB-05, UC-BB-06, UC-BB-07, UC-BB-09 |

### 3.12.5. Kết quả đầu ra

• UC-BB-04: BM03/BM07/BM12 được xác định hợp lệ để ký tiếp hoặc cần trả sửa.

• UC-BB-05: Biên bản được trả kèm lý do để sửa và nộp lại; không từ chối vĩnh viễn.

• UC-BB-06: PDF/chữ ký cũ mất hiệu lực; bản mới có chữ ký Thư ký được nộp lại trong thời gian duyệt.

• UC-BB-07: Bản đủ hai chữ ký được tải lên và xác nhận hoàn tất.

• UC-BB-09: Quyền sửa/nộp được mở lại đến hạn mới; lý do gia hạn được lưu để truy vết.

### 3.12.6. Tiêu chí nghiệm thu

| **Mã AC** | **UC** | **Tiêu chí nghiệm thu** |
| --- | --- | --- |
| AC-UC-BB-04 | UC-BB-04 | Khi Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch cung cấp đủ dữ liệu/tệp bắt buộc và xác nhận thao tác trong thời hạn, hệ thống bm03/bm07/bm12 được xác định hợp lệ để ký tiếp hoặc cần trả sửa; thao tác sai quyền, sai trạng thái hoặc quá hạn bị từ chối. |
| AC-UC-BB-05 | UC-BB-05 | Khi Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch trả đối tượng và nhập lý do bắt buộc, hệ thống biên bản được trả kèm lý do để sửa và nộp lại; không từ chối vĩnh viễn và thông báo cho người phải xử lý tiếp. |
| AC-UC-BB-06 | UC-BB-06 | Khi Thư ký Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt thuyết minh hoặc Thư ký Hội đồng nghiệm thu cung cấp đủ dữ liệu/tệp bắt buộc và xác nhận thao tác trong thời hạn, hệ thống pdf/chữ ký cũ mất hiệu lực; bản mới có chữ ký thư ký được nộp lại trong thời gian duyệt; thao tác sai quyền, sai trạng thái hoặc quá hạn bị từ chối. |
| AC-UC-BB-07 | UC-BB-07 | Khi Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch cung cấp đủ dữ liệu/tệp bắt buộc và xác nhận thao tác trong thời hạn, hệ thống bản đủ hai chữ ký được tải lên và xác nhận hoàn tất; thao tác sai quyền, sai trạng thái hoặc quá hạn bị từ chối. |
| AC-UC-BB-09 | UC-BB-09 | Khi Cán bộ/Phòng KHCN (P.KHCN) thực hiện chức năng trong đúng quyền và trạng thái, hệ thống quyền sửa/nộp được mở lại đến hạn mới; lý do gia hạn được lưu để truy vết và ghi nhận kết quả nghiệp vụ. |

## 3.13. Module M13 - Pipeline biểu mẫu/PDF dùng chung

### 3.13.1. Mô tả chức năng

Module M13 nhóm 8 yêu cầu liên quan đến pipeline biểu mẫu/pdf dùng chung. Actor tham gia: Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch; Người lập BM; Thư ký Hội đồng nghiệm thu; Thư ký Hội đồng xét duyệt hồ sơ; Thư ký Hội đồng xét duyệt thuyết minh.

### 3.13.2. Yêu cầu chức năng

| **Mã YC** | **Tên chức năng** | **Actor** | **Mô tả và kết quả** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| UC-FORM-01 | Nhập đầy đủ và lưu dữ liệu biểu mẫu | Người lập BM | Người lập biểu mẫu nhập và lưu đầy đủ các trường thông tin tương ứng với biểu mẫu gốc. Kết quả: Mọi thông tin của biểu mẫu gốc được nhập đầy đủ. | Cao | Đề xuất |
| UC-FORM-02 | Xem trước biểu mẫu | Người lập BM | Người lập xem bản trình bày dự kiến để kiểm tra nội dung trước khi xuất PDF. Kết quả: Kiểm tra bản trình bày trước khi xuất. | Cao | Đề xuất |
| UC-FORM-03 | Xuất PDF để ký bên ngoài | Người lập BM | Hệ thống tạo PDF từ dữ liệu biểu mẫu để người dùng thực hiện ký bên ngoài. Kết quả: PDF được sinh từ dữ liệu form để ký ngoài hệ thống. | Cao | Đề xuất |
| UC-FORM-04 | Tiếp tục sửa form và xuất lại PDF trước khi nộp | Người lập BM | Trước khi nộp chính thức, người lập vẫn có thể sửa dữ liệu và xuất lại một bản PDF mới. Kết quả: Form vẫn sửa được và có thể xuất lại trước mốc nộp. | Cao | Đề xuất |
| UC-FORM-05 | Tải PDF đã ký lên bản nháp | Người lập BM | Người lập gắn PDF đã ký vào bản nháp để kiểm tra, nhưng thao tác này chưa làm khóa biểu mẫu. Kết quả: PDF đã ký được gắn tạm thời nhưng form chưa bị khóa. | Cao | Đề xuất |
| UC-FORM-07 | Nộp biểu mẫu có PDF đã ký và khóa form | Người lập BM | Người lập bấm nộp sau khi đã tải PDF ký lên; từ thời điểm này biểu mẫu trở thành bản chính thức và bị khóa. Kết quả: Bản chính thức được nộp và form không còn được sửa. | Cao | Đề xuất |
| UC-FORM-08 | Vô hiệu hóa PDF/chữ ký cũ khi biên bản bị trả và sửa | Thư ký Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt thuyết minh hoặc Thư ký Hội đồng nghiệm thu | Khi biên bản bị trả và có sửa nội dung, bản PDF cùng chữ ký cũ không còn được sử dụng. Kết quả: Bản cũ mất hiệu lực; phải xuất, ký và nộp bản mới. | Cao | Đề xuất |
| UC-FORM-09 | Bổ sung chữ ký thứ hai cho biên bản | Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch | Chủ tịch ký thêm vào biên bản đã có chữ ký Thư ký để hoàn thành yêu cầu hai chữ ký. Kết quả: Bản có chữ ký Thư ký được ký thêm và xác nhận là bản đủ hai chữ ký. | Cao | Đề xuất |

### 3.13.3. Trường dữ liệu chính

| **STT** | **Nhóm dữ liệu** | **Mô tả** |
| --- | --- | --- |
| 1 | Mã biểu mẫu | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 2 | Dữ liệu form | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 3 | Bản xem trước | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 4 | PDF xuất | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 5 | PDF/ảnh chữ ký | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 6 | Phiên bản | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 7 | Người nộp | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 8 | Trạng thái khóa | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |

### 3.13.4. Quy tắc nghiệp vụ

| **Mã BR** | **Quy tắc** | **UC liên quan** |
| --- | --- | --- |
| BR-M13-01 | Trước khi bấm Nộp, form còn sửa được; thao tác Nộp làm khóa bản chính thức. | UC-FORM-01, UC-FORM-02, UC-FORM-03, UC-FORM-04, UC-FORM-05, UC-FORM-07, UC-FORM-08, UC-FORM-09 |
| BR-M13-02 | BM02/BM06/BM11 không được sửa hoặc nộp lại sau khi nộp. | UC-FORM-01, UC-FORM-02, UC-FORM-03, UC-FORM-04, UC-FORM-05, UC-FORM-07, UC-FORM-08, UC-FORM-09 |
| BR-M13-03 | BM03/BM07/BM12 có vòng trả chỉnh sửa và trạng thái Chờ P.KHCN xác nhận/Đã xác nhận. | UC-FORM-01, UC-FORM-02, UC-FORM-03, UC-FORM-04, UC-FORM-05, UC-FORM-07, UC-FORM-08, UC-FORM-09 |
| BR-M13-04 | Nếu dữ liệu form và PDF đã ký khác nhau, nguồn chính thức và cách đối soát phải được xác minh trước triển khai. | UC-FORM-01, UC-FORM-02, UC-FORM-03, UC-FORM-04, UC-FORM-05, UC-FORM-07, UC-FORM-08, UC-FORM-09 |

### 3.13.5. Kết quả đầu ra

• UC-FORM-01: Mọi thông tin của biểu mẫu gốc được nhập đầy đủ.

• UC-FORM-02: Kiểm tra bản trình bày trước khi xuất.

• UC-FORM-03: PDF được sinh từ dữ liệu form để ký ngoài hệ thống.

• UC-FORM-04: Form vẫn sửa được và có thể xuất lại trước mốc nộp.

• UC-FORM-05: PDF đã ký được gắn tạm thời nhưng form chưa bị khóa.

• UC-FORM-07: Bản chính thức được nộp và form không còn được sửa.

• UC-FORM-08: Bản cũ mất hiệu lực; phải xuất, ký và nộp bản mới.

• UC-FORM-09: Bản có chữ ký Thư ký được ký thêm và xác nhận là bản đủ hai chữ ký.

### 3.13.6. Tiêu chí nghiệm thu

| **Mã AC** | **UC** | **Tiêu chí nghiệm thu** |
| --- | --- | --- |
| AC-UC-FORM-01 | UC-FORM-01 | Khi Người lập BM thực hiện chức năng trong đúng quyền và trạng thái, hệ thống mọi thông tin của biểu mẫu gốc được nhập đầy đủ và ghi nhận kết quả nghiệp vụ. |
| AC-UC-FORM-02 | UC-FORM-02 | Khi Người lập BM truy cập đúng đối tượng và có quyền, hệ thống hiển thị kiểm tra bản trình bày trước khi xuất; dữ liệu ngoài phạm vi quyền không được cung cấp. |
| AC-UC-FORM-03 | UC-FORM-03 | Khi Người lập BM thực hiện chức năng trong đúng quyền và trạng thái, hệ thống pdf được sinh từ dữ liệu form để ký ngoài hệ thống và ghi nhận kết quả nghiệp vụ. |
| AC-UC-FORM-04 | UC-FORM-04 | Khi Người lập BM cung cấp đủ dữ liệu/tệp bắt buộc và xác nhận thao tác trong thời hạn, hệ thống form vẫn sửa được và có thể xuất lại trước mốc nộp; thao tác sai quyền, sai trạng thái hoặc quá hạn bị từ chối. |
| AC-UC-FORM-05 | UC-FORM-05 | Khi Người lập BM thực hiện chức năng trong đúng quyền và trạng thái, hệ thống pdf đã ký được gắn tạm thời nhưng form chưa bị khóa và ghi nhận kết quả nghiệp vụ. |
| AC-UC-FORM-07 | UC-FORM-07 | Khi Người lập BM cung cấp đủ dữ liệu/tệp bắt buộc và xác nhận thao tác trong thời hạn, hệ thống bản chính thức được nộp và form không còn được sửa; thao tác sai quyền, sai trạng thái hoặc quá hạn bị từ chối. |
| AC-UC-FORM-08 | UC-FORM-08 | Khi Thư ký Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt thuyết minh hoặc Thư ký Hội đồng nghiệm thu trả đối tượng và nhập lý do bắt buộc, hệ thống bản cũ mất hiệu lực; phải xuất, ký và nộp bản mới và thông báo cho người phải xử lý tiếp. |
| AC-UC-FORM-09 | UC-FORM-09 | Khi Cán bộ/Phòng KHCN (P.KHCN) trong vai trò Chủ tịch thực hiện chức năng trong đúng quyền và trạng thái, hệ thống bản có chữ ký thư ký được ký thêm và xác nhận là bản đủ hai chữ ký và ghi nhận kết quả nghiệp vụ. |

## 3.14. Module M14 - Thông báo và truy vết

### 3.14.1. Mô tả chức năng

Module M14 nhóm 4 yêu cầu liên quan đến thông báo và truy vết. Actor tham gia: Actor có liên quan; Cán bộ/Phòng KHCN (P.KHCN); Thư ký Hội đồng nghiệm thu; Thư ký Hội đồng xét duyệt hồ sơ; Thư ký Hội đồng xét duyệt thuyết minh.

### 3.14.2. Yêu cầu chức năng

| **Mã YC** | **Tên chức năng** | **Actor** | **Mô tả và kết quả** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| UC-TB-01 | Nhận thông báo hạn mới của biên bản | Thư ký Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt thuyết minh hoặc Thư ký Hội đồng nghiệm thu | Thư ký nhận thông báo cho biết thời hạn mới sau khi P.KHCN gia hạn biên bản. Kết quả: Thư ký biết hạn mới sau gia hạn. | Cao | Đề xuất |
| UC-TB-02 | Truy vết lý do gia hạn biên bản | Cán bộ/Phòng KHCN (P.KHCN) | P.KHCN xem lại lý do, thời điểm và lần gia hạn để có dấu vết kiểm tra. Kết quả: Lý do và lần gia hạn được lưu để kiểm tra. | Cao | Đề xuất |
| UC-TB-03 | Truy vết việc chốt tập phiếu đánh giá | Thư ký Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt thuyết minh hoặc Thư ký Hội đồng nghiệm thu | Hệ thống lưu dấu vết về thời điểm chốt, số phiếu hợp lệ và tổng số thành viên tại mốc chốt. Kết quả: Có bằng chứng về mốc chốt, số phiếu hợp lệ và tổng số thành viên tại thời điểm chốt. | Cao | Đề xuất |
| UC-TB-04 | Theo dõi trạng thái hồ sơ và biểu mẫu | Actor có liên quan | Người có liên quan theo dõi đối tượng mình được phép xem đang ở trạng thái xử lý nào. Kết quả: Actor biết trạng thái xử lý của đối tượng mình có quyền. | Cao | Đề xuất |

### 3.14.3. Trường dữ liệu chính

| **STT** | **Nhóm dữ liệu** | **Mô tả** |
| --- | --- | --- |
| 1 | Loại sự kiện | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 2 | Người nhận | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 3 | Nội dung thông báo | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 4 | Thời điểm gửi/xem | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 5 | Đối tượng nghiệp vụ | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 6 | Audit log trạng thái trước/sau | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |
| 7 | Lý do thao tác | Dữ liệu được quản lý theo đúng quyền, trạng thái và biểu mẫu liên quan; chi tiết chưa có trong nguồn được đánh dấu Cần xác minh. |

### 3.14.4. Quy tắc nghiệp vụ

| **Mã BR** | **Quy tắc** | **UC liên quan** |
| --- | --- | --- |
| BR-M14-01 | Thông báo được gửi trong ứng dụng theo sự kiện và chỉ đến actor liên quan; chưa dùng email hoặc SMS. | UC-TB-01, UC-TB-02, UC-TB-03, UC-TB-04 |
| BR-M14-02 | Audit log được lưu theo cơ chế chỉ thêm mới, không cho chức năng nghiệp vụ sửa hoặc xóa bản ghi cũ. | UC-TB-01, UC-TB-02, UC-TB-03, UC-TB-04 |
| BR-M14-03 | Audit log tối thiểu có actor, thời điểm, hành động, đối tượng, trạng thái trước/sau và lý do nếu có. | UC-TB-01, UC-TB-02, UC-TB-03, UC-TB-04 |

### 3.14.5. Kết quả đầu ra

• UC-TB-01: Thư ký biết hạn mới sau gia hạn.

• UC-TB-02: Lý do và lần gia hạn được lưu để kiểm tra.

• UC-TB-03: Có bằng chứng về mốc chốt, số phiếu hợp lệ và tổng số thành viên tại thời điểm chốt.

• UC-TB-04: Actor biết trạng thái xử lý của đối tượng mình có quyền.

### 3.14.6. Tiêu chí nghiệm thu

| **Mã AC** | **UC** | **Tiêu chí nghiệm thu** |
| --- | --- | --- |
| AC-UC-TB-01 | UC-TB-01 | Khi Thư ký Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt thuyết minh hoặc Thư ký Hội đồng nghiệm thu thực hiện chức năng trong đúng quyền và trạng thái, hệ thống thư ký biết hạn mới sau gia hạn và ghi nhận kết quả nghiệp vụ. |
| AC-UC-TB-02 | UC-TB-02 | Khi Cán bộ/Phòng KHCN (P.KHCN) thực hiện chức năng trong đúng quyền và trạng thái, hệ thống lý do và lần gia hạn được lưu để kiểm tra và ghi nhận kết quả nghiệp vụ. |
| AC-UC-TB-03 | UC-TB-03 | Khi Thư ký Hội đồng xét duyệt hồ sơ, Thư ký Hội đồng xét duyệt thuyết minh hoặc Thư ký Hội đồng nghiệm thu thực hiện chức năng trong đúng quyền và trạng thái, hệ thống có bằng chứng về mốc chốt, số phiếu hợp lệ và tổng số thành viên tại thời điểm chốt và ghi nhận kết quả nghiệp vụ. |
| AC-UC-TB-04 | UC-TB-04 | Khi Actor có liên quan truy cập đúng đối tượng và có quyền, hệ thống hiển thị actor biết trạng thái xử lý của đối tượng mình có quyền; dữ liệu ngoài phạm vi quyền không được cung cấp. |

# CHƯƠNG 4: YÊU CẦU PHI CHỨC NĂNG

| **Mã NFR** | **Nhóm** | **Yêu cầu** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- |
| NFR-SEC-01 | Bảo mật và phân quyền | Người dùng chỉ được xem, tải và thao tác dữ liệu thuộc vai trò, Hội đồng/giai đoạn và đối tượng được phân công. | Cao | Đề xuất |
| NFR-AUD-01 | Lưu vết | Audit log được lưu trong cơ sở dữ liệu theo cơ chế chỉ thêm mới; tối thiểu gồm actor, thời điểm, hành động, đối tượng, trạng thái trước/sau và lý do. | Cao | Đề xuất |
| NFR-DOC-01 | Tài liệu | Hệ thống kiểm soát định dạng, phiên bản và quyền xem/tải PDF hoặc tài liệu hoàn chỉnh theo vai trò và trạng thái. | Cao | Đề xuất |
| NFR-REL-01 | Sao lưu/khôi phục | Dữ liệu và tệp phải được sao lưu và có khả năng khôi phục khi xảy ra sự cố; RPO/RTO cần xác minh. | Cao | Đề xuất |
| NFR-UX-01 | Khả dụng giao diện | Giao diện sử dụng được trên máy tính và điện thoại, hỗ trợ các trình duyệt hiện hành; danh sách phiên bản trình duyệt cần xác minh. | Cao | Đề xuất |
| NFR-DAT-01 | Toàn vẹn dữ liệu | Khi nhiều người đồng thời tạo/nộp hồ sơ, hệ thống không làm mất, ghi trùng hoặc gán sai dữ liệu; tải đồng thời cụ thể cần xác minh. | Cao | Đề xuất |

## 4.1. Các chỉ số cần xác minh

• Số người dùng đồng thời và thời gian phản hồi mục tiêu.

• Dung lượng tệp tối đa và định dạng cho từng BM tải hoàn chỉnh.

• Chu kỳ sao lưu, thời gian lưu bản sao, RPO và RTO.

• Danh sách trình duyệt/phiên bản tối thiểu được hỗ trợ.

# CHƯƠNG 5: BẢNG TỔNG HỢP VÀ TRUY VẾT

## 5.1. Tổng hợp yêu cầu theo module

| **Module** | **Tên module** | **Số YC** | **Mã YC** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| M01 | Quản lý đợt đăng ký | 7 | UC-DOT-01, UC-DOT-02, UC-DOT-03, UC-DOT-04, UC-DOT-05, UC-DOT-06, UC-DOT-08 | Cao | Đề xuất |
| M02 | Đăng ký và xét duyệt tuyến đầu | 15 | UC-DK-01, UC-DK-02, UC-DK-03, UC-DK-04, UC-DK-05, UC-DK-06, UC-DK-07, UC-DK-08, UC-DK-09, UC-DK-10, UC-DK-11, UC-DK-12, UC-DK-13, UC-DK-14, UC-DK-15 | Cao | Đề xuất |
| M03 | Xét duyệt đề xuất sơ bộ | 4 | UC-HD-01, UC-PH-01, UC-PH-02, UC-BB-01 | Cao | Đề xuất |
| M04 | Nộp thuyết minh | 1 | UC-TM-01 | Cao | Đề xuất |
| M05 | Phê duyệt thuyết minh và hợp đồng | 8 | UC-TL-05, UC-TL-06, UC-HD-02, UC-PH-03, UC-PH-04, UC-BB-02, UC-TL-01, UC-TL-02 | Cao | Đề xuất |
| M06 | Thực hiện và báo cáo tiến độ | 2 | UC-BC-01, UC-BC-04 | Cao | Đề xuất |
| M07 | Nộp hồ sơ và nghiệm thu | 7 | UC-BC-02, UC-TL-07, UC-TL-08, UC-HD-03, UC-PH-05, UC-PH-06, UC-BB-03 | Cao | Đề xuất |
| M08 | Chỉnh sửa sau nghiệm thu và BM14 | 3 | UC-BC-03, UC-TL-03, UC-TL-04 | Cao | Đề xuất |
| M09 | Công nhận kết quả | 2 | UC-TL-09, UC-TL-10 | Cao | Đề xuất |
| M10 | Actor, phân quyền và truy cập | 3 | UC-ACT-01, UC-ACT-02, UC-ACT-03 | Cao | Đề xuất |
| M11 | Quản lý Hội đồng dùng chung | 4 | UC-HD-04, UC-HD-05, UC-CHOT-01, UC-CHOT-02 | Cao | Đề xuất |
| M12 | Xử lý biên bản Hội đồng | 5 | UC-BB-04, UC-BB-05, UC-BB-06, UC-BB-07, UC-BB-09 | Cao | Đề xuất |
| M13 | Pipeline biểu mẫu/PDF dùng chung | 8 | UC-FORM-01, UC-FORM-02, UC-FORM-03, UC-FORM-04, UC-FORM-05, UC-FORM-07, UC-FORM-08, UC-FORM-09 | Cao | Đề xuất |
| M14 | Thông báo và truy vết | 4 | UC-TB-01, UC-TB-02, UC-TB-03, UC-TB-04 | Cao | Đề xuất |

**Tổng cộng:** 14 module, 73 yêu cầu chức năng trong phạm vi và 6 yêu cầu phi chức năng.

## 5.2. Ma trận UCTQ - UCCT - module - biểu mẫu

| **UCTQ** | **UCCT** | **Tên yêu cầu** | **Module** | **BM** |
| --- | --- | --- | --- | --- |
| UCTQ-14, UCTQ-15 | UC-DOT-01 | Tạo đợt đăng ký NCKH | M01 | — |
| UCTQ-14, UCTQ-15 | UC-DOT-02 | Cấu hình loại và thời gian của đợt | M01 | — |
| UCTQ-14 | UC-DOT-03 | Quản lý danh mục đề tài giao trực tiếp của đợt | M01 | — |
| UCTQ-14, UCTQ-15 | UC-DOT-04 | Cập nhật đợt trước khi khóa | M01 | — |
| UCTQ-14, UCTQ-15 | UC-DOT-05 | Công bố đợt đăng ký | M01 | — |
| UCTQ-03, UCTQ-04, UCTQ-14, UCTQ-15 | UC-DOT-06 | Xem danh sách và tình trạng các đợt | M01 | — |
| UCTQ-14, UCTQ-15 | UC-DOT-08 | Theo dõi tình trạng đợt | M01 | — |
| UCTQ-03, UCTQ-04 | UC-DK-01 | Tạo hồ sơ đăng ký đề tài giảng viên ở trạng thái nháp | M02 | BM01 |
| UCTQ-04 | UC-DK-02 | Tạo hồ sơ đăng ký đề tài sinh viên ở trạng thái nháp | M02 | BM01 |
| UCTQ-03, UCTQ-04 | UC-DK-03 | Cập nhật hồ sơ đăng ký trước khi nộp | M02 | BM01 |
| UCTQ-03, UCTQ-04 | UC-DK-04 | Quản lý thông tin nhóm nghiên cứu trong hồ sơ | M02 | BM01 |
| UCTQ-03, UCTQ-04 | UC-DK-05 | Kiểm tra điều kiện nộp hồ sơ đăng ký | M02 | BM01 |
| UCTQ-03, UCTQ-04 | UC-DK-06 | Lập BM01 từ dữ liệu đăng ký | M02 | BM01 |
| UCTQ-03, UCTQ-04 | UC-DK-07 | Nộp hồ sơ đăng ký kèm BM01 đã ký | M02 | BM01 |
| UCTQ-03, UCTQ-04 | UC-DK-08 | Xem trạng thái xử lý hồ sơ đăng ký | M02 | BM01 |
| UCTQ-01 | UC-DK-09 | Xét duyệt hồ sơ sinh viên được hướng dẫn | M02 | BM01 |
| UCTQ-01 | UC-DK-10 | Trả hồ sơ sinh viên để sửa | M02 | BM01 |
| UCTQ-10 | UC-DK-11 | Xét duyệt hồ sơ giảng viên của đơn vị | M02 | BM01 |
| UCTQ-10 | UC-DK-12 | Trả hồ sơ giảng viên để sửa | M02 | BM01 |
| UCTQ-01, UCTQ-10 | UC-DK-13 | Sửa và nộp lại hồ sơ bị trả | M02 | BM01 |
| UCTQ-03, UCTQ-04 | UC-DK-14 | Gửi yêu cầu hủy hồ sơ | M02 | — |
| UCTQ-11 | UC-DK-15 | Xử lý yêu cầu hủy hồ sơ | M02 | — |
| UCTQ-11 | UC-HD-01 | Tạo Hội đồng xét duyệt hồ sơ | M03 | BM02, BM03 |
| UCTQ-19 | UC-PH-01 | Xem hồ sơ phục vụ đánh giá xét duyệt hồ sơ | M03 | BM01, BM02 |
| UCTQ-19 | UC-PH-02 | Lập và nộp phiếu xét duyệt hồ sơ | M03 | BM02 |
| UCTQ-11 | UC-BB-01 | Lập và nộp biên bản xét duyệt hồ sơ có chữ ký Thư ký | M03 | BM03 |
| UCTQ-06 | UC-TM-01 | Tải thuyết minh hoàn chỉnh lên hồ sơ đề tài | M04 | BM04 |
| UCTQ-16 | UC-TL-05 | Đăng và lưu quyết định Hội đồng xét duyệt thuyết minh | M05 | BM05 |
| UCTQ-08 | UC-TL-06 | Xem/tải quyết định Hội đồng xét duyệt thuyết minh | M05 | BM05 |
| UCTQ-12 | UC-HD-02 | Tạo Hội đồng xét duyệt thuyết minh | M05 | BM06, BM07 |
| UCTQ-17 | UC-PH-03 | Xem hồ sơ phục vụ đánh giá thuyết minh | M05 | BM04, BM05, BM06 |
| UCTQ-17 | UC-PH-04 | Lập và nộp phiếu xét duyệt thuyết minh | M05 | BM06 |
| UCTQ-12 | UC-BB-02 | Lập và nộp biên bản xét duyệt thuyết minh có chữ ký Thư ký | M05 | BM07 |
| UCTQ-12 | UC-TL-01 | Lưu hợp đồng đã ký của đề tài | M05 | — |
| UCTQ-08 | UC-TL-02 | Xem và tải hợp đồng đã ký của đề tài | M05 | — |
| UCTQ-05 | UC-BC-01 | Lập và nộp báo cáo tiến độ | M06 | BM08 |
| UCTQ-05, UCTQ-07, UCTQ-09 | UC-BC-04 | Xem/tải báo cáo tiến độ, tổng kết và giải trình theo quyền | M06 | BM08, BM09, BM13 |
| UCTQ-07 | UC-BC-02 | Tải báo cáo tổng kết hoàn chỉnh lên hồ sơ đề tài | M07 | BM09 |
| UCTQ-16 | UC-TL-07 | Đăng và lưu quyết định Hội đồng nghiệm thu | M07 | BM10 |
| UCTQ-08 | UC-TL-08 | Xem/tải quyết định Hội đồng nghiệm thu | M07 | BM10 |
| UCTQ-13 | UC-HD-03 | Tạo Hội đồng nghiệm thu | M07 | BM11, BM12 |
| UCTQ-18 | UC-PH-05 | Xem hồ sơ phục vụ đánh giá nghiệm thu | M07 | BM09, BM10, BM11 |
| UCTQ-18 | UC-PH-06 | Lập và nộp phiếu nghiệm thu | M07 | BM11 |
| UCTQ-13 | UC-BB-03 | Lập và nộp biên bản nghiệm thu có chữ ký Thư ký | M07 | BM12 |
| UCTQ-09 | UC-BC-03 | Lập và nộp giải trình | M08 | BM13 |
| UCTQ-13 | UC-TL-03 | Lưu bản BM14 hoàn chỉnh sau xử lý bên ngoài | M08 | BM14 |
| UCTQ-08 | UC-TL-04 | Xem bản BM14 hoàn chỉnh | M08 | BM14 |
| UCTQ-16 | UC-TL-09 | Đăng và lưu quyết định công nhận kết quả | M09 | BM15 |
| UCTQ-08 | UC-TL-10 | Xem/tải quyết định công nhận kết quả | M09 | BM15 |
| Dùng chung | UC-ACT-01 | Sử dụng quyền theo vai trò nghiệp vụ được cấp | M10 | — |
| UCTQ-01 | UC-ACT-02 | Sử dụng vai trò Giảng viên hướng dẫn trên đề tài sinh viên được gán | M10 | BM01 |
| UCTQ-11, UCTQ-12, UCTQ-13, UCTQ-17, UCTQ-18, UCTQ-19 | UC-ACT-03 | Sử dụng nhiều vai trò Hội đồng trên cùng tài khoản | M10 | BM02, BM03, BM06, BM07, BM11, BM12 |
| UCTQ-11, UCTQ-12, UCTQ-13 | UC-HD-04 | Quản lý thông tin Hội đồng trước mốc chốt phiếu | M11 | BM02, BM03, BM06, BM07, BM11, BM12 |
| UCTQ-11, UCTQ-12, UCTQ-13 | UC-HD-05 | Theo dõi tiến độ nộp phiếu của Hội đồng | M11 | BM02, BM06, BM11 |
| UCTQ-11, UCTQ-12, UCTQ-13 | UC-CHOT-01 | Kiểm tra điều kiện quá bán của Hội đồng | M11 | BM02/BM06/BM11 |
| UCTQ-11, UCTQ-12, UCTQ-13 | UC-CHOT-02 | Xác nhận chốt phiếu để bắt đầu lập biên bản | M11 | BM02→BM03; BM06→BM07; BM11→BM12 |
| UCTQ-11, UCTQ-12, UCTQ-13 | UC-BB-04 | Kiểm tra biên bản do Thư ký nộp | M12 | BM03, BM07, BM12 |
| UCTQ-11, UCTQ-12, UCTQ-13 | UC-BB-05 | Trả biên bản để Thư ký sửa | M12 | BM03, BM07, BM12 |
| UCTQ-11, UCTQ-12, UCTQ-13 | UC-BB-06 | Sửa, ký lại và nộp lại biên bản bị trả | M12 | BM03, BM07, BM12 |
| UCTQ-11, UCTQ-12, UCTQ-13 | UC-BB-07 | Hoàn tất biên bản bằng chữ ký thứ hai của Chủ tịch | M12 | BM03, BM07, BM12 |
| UCTQ-11, UCTQ-12, UCTQ-13 | UC-BB-09 | Gia hạn thời gian duyệt biên bản vì lý do chính đáng | M12 | BM03, BM07, BM12 |
| Dùng chung | UC-FORM-01 | Nhập đầy đủ và lưu dữ liệu biểu mẫu | M13 | BM01, BM02, BM03, BM06, BM07, BM08, BM11, BM12, BM13 |
| Dùng chung | UC-FORM-02 | Xem trước biểu mẫu | M13 | BM01, BM02, BM03, BM06, BM07, BM08, BM11, BM12, BM13 |
| Dùng chung | UC-FORM-03 | Xuất PDF để ký bên ngoài | M13 | BM01, BM02, BM03, BM06, BM07, BM08, BM11, BM12, BM13 |
| Dùng chung | UC-FORM-04 | Tiếp tục sửa form và xuất lại PDF trước khi nộp | M13 | BM01, BM02, BM03, BM06, BM07, BM08, BM11, BM12, BM13 |
| Dùng chung | UC-FORM-05 | Tải PDF đã ký lên bản nháp | M13 | BM01, BM02, BM03, BM06, BM07, BM08, BM11, BM12, BM13 |
| Dùng chung | UC-FORM-07 | Nộp biểu mẫu có PDF đã ký và khóa form | M13 | BM01, BM02, BM03, BM06, BM07, BM08, BM11, BM12, BM13 |
| UCTQ-11, UCTQ-12, UCTQ-13 | UC-FORM-08 | Vô hiệu hóa PDF/chữ ký cũ khi biên bản bị trả và sửa | M13 | BM03, BM07, BM12 |
| UCTQ-11, UCTQ-12, UCTQ-13 | UC-FORM-09 | Bổ sung chữ ký thứ hai cho biên bản | M13 | BM03, BM07, BM12 |
| UCTQ-11, UCTQ-12, UCTQ-13 | UC-TB-01 | Nhận thông báo hạn mới của biên bản | M14 | BM03, BM07, BM12 |
| UCTQ-11, UCTQ-12, UCTQ-13 | UC-TB-02 | Truy vết lý do gia hạn biên bản | M14 | BM03, BM07, BM12 |
| UCTQ-11, UCTQ-12, UCTQ-13 | UC-TB-03 | Truy vết việc chốt tập phiếu đánh giá | M14 | BM02/BM03, BM06/BM07, BM11/BM12 |
| UCTQ-03 đến UCTQ-19 theo phạm vi | UC-TB-04 | Theo dõi trạng thái hồ sơ và biểu mẫu | M14 | BM01–BM15 |

## 5.3. Ma trận use case chi tiết - actor

| **Mã UCCT** | **Use case chi tiết** | **GV** | **SV** | **TK** | **P.KHCN** | **TV-HS** | **TK-HS** | **TV-TM** | **TK-TM** | **TV-NT** | **TK-NT** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-DOT-01 | Tạo đợt đăng ký NCKH |  |  |  | ✓ |  |  |  |  |  |  |
| UC-DOT-02 | Cấu hình loại và thời gian của đợt |  |  |  | ✓ |  |  |  |  |  |  |
| UC-DOT-03 | Quản lý danh mục đề tài giao trực tiếp của đợt |  |  |  | ✓ |  |  |  |  |  |  |
| UC-DOT-04 | Cập nhật đợt trước khi khóa |  |  |  | ✓ |  |  |  |  |  |  |
| UC-DOT-05 | Công bố đợt đăng ký |  |  |  | ✓ |  |  |  |  |  |  |
| UC-DOT-06 | Xem danh sách và tình trạng các đợt | ✓ | ✓ |  | ✓ |  |  |  |  |  |  |
| UC-DOT-08 | Theo dõi tình trạng đợt |  |  |  | ✓ |  |  |  |  |  |  |
| UC-DK-01 | Tạo hồ sơ đăng ký đề tài giảng viên ở trạng thái nháp | ✓ |  |  |  |  |  |  |  |  |  |
| UC-DK-02 | Tạo hồ sơ đăng ký đề tài sinh viên ở trạng thái nháp |  | ✓ |  |  |  |  |  |  |  |  |
| UC-DK-03 | Cập nhật hồ sơ đăng ký trước khi nộp | ✓ | ✓ |  |  |  |  |  |  |  |  |
| UC-DK-04 | Quản lý thông tin nhóm nghiên cứu trong hồ sơ | ✓ | ✓ |  |  |  |  |  |  |  |  |
| UC-DK-05 | Kiểm tra điều kiện nộp hồ sơ đăng ký | ✓ | ✓ |  |  |  |  |  |  |  |  |
| UC-DK-06 | Lập BM01 từ dữ liệu đăng ký | ✓ | ✓ |  |  |  |  |  |  |  |  |
| UC-DK-07 | Nộp hồ sơ đăng ký kèm BM01 đã ký | ✓ | ✓ |  |  |  |  |  |  |  |  |
| UC-DK-08 | Xem trạng thái xử lý hồ sơ đăng ký | ✓ | ✓ |  |  |  |  |  |  |  |  |
| UC-DK-09 | Xét duyệt hồ sơ sinh viên được hướng dẫn | ✓ | ✓ |  |  |  |  |  |  |  |  |
| UC-DK-10 | Trả hồ sơ sinh viên để sửa | ✓ | ✓ |  |  |  |  |  |  |  |  |
| UC-DK-11 | Xét duyệt hồ sơ giảng viên của đơn vị | ✓ |  | ✓ |  |  |  |  |  |  |  |
| UC-DK-12 | Trả hồ sơ giảng viên để sửa | ✓ |  | ✓ |  |  |  |  |  |  |  |
| UC-DK-13 | Sửa và nộp lại hồ sơ bị trả | ✓ | ✓ | ✓ |  |  |  |  |  |  |  |
| UC-DK-14 | Gửi yêu cầu hủy hồ sơ | ✓ | ✓ |  | ✓ |  |  |  |  |  |  |
| UC-DK-15 | Xử lý yêu cầu hủy hồ sơ | ✓ | ✓ |  | ✓ |  |  |  |  |  |  |
| UC-HD-01 | Tạo Hội đồng xét duyệt hồ sơ |  |  |  | ✓ | ✓ | ✓ |  |  |  |  |
| UC-PH-01 | Xem hồ sơ phục vụ đánh giá xét duyệt hồ sơ |  |  |  | ✓ | ✓ | ✓ |  |  |  |  |
| UC-PH-02 | Lập và nộp phiếu xét duyệt hồ sơ |  |  |  | ✓ | ✓ | ✓ |  |  |  |  |
| UC-BB-01 | Lập và nộp biên bản xét duyệt hồ sơ có chữ ký Thư ký |  |  |  | ✓ |  | ✓ |  |  |  |  |
| UC-TM-01 | Tải thuyết minh hoàn chỉnh lên hồ sơ đề tài | ✓ | ✓ |  |  |  |  |  |  |  |  |
| UC-TL-05 | Đăng và lưu quyết định Hội đồng xét duyệt thuyết minh | ✓ | ✓ |  | ✓ |  |  | ✓ | ✓ |  |  |
| UC-TL-06 | Xem/tải quyết định Hội đồng xét duyệt thuyết minh | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| UC-HD-02 | Tạo Hội đồng xét duyệt thuyết minh |  |  |  | ✓ |  |  | ✓ | ✓ |  |  |
| UC-PH-03 | Xem hồ sơ phục vụ đánh giá thuyết minh |  |  |  | ✓ |  |  | ✓ | ✓ |  |  |
| UC-PH-04 | Lập và nộp phiếu xét duyệt thuyết minh |  |  |  | ✓ |  |  | ✓ | ✓ |  |  |
| UC-BB-02 | Lập và nộp biên bản xét duyệt thuyết minh có chữ ký Thư ký |  |  |  | ✓ |  |  |  | ✓ |  |  |
| UC-TL-01 | Lưu hợp đồng đã ký của đề tài | ✓ | ✓ |  | ✓ |  |  |  |  |  |  |
| UC-TL-02 | Xem và tải hợp đồng đã ký của đề tài | ✓ | ✓ |  | ✓ |  |  |  |  |  |  |
| UC-BC-01 | Lập và nộp báo cáo tiến độ | ✓ | ✓ |  |  |  |  |  |  |  |  |
| UC-BC-04 | Xem/tải báo cáo tiến độ, tổng kết và giải trình theo quyền | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| UC-BC-02 | Tải báo cáo tổng kết hoàn chỉnh lên hồ sơ đề tài | ✓ | ✓ |  |  |  |  |  |  |  |  |
| UC-TL-07 | Đăng và lưu quyết định Hội đồng nghiệm thu | ✓ | ✓ |  | ✓ |  |  |  |  | ✓ | ✓ |
| UC-TL-08 | Xem/tải quyết định Hội đồng nghiệm thu | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| UC-HD-03 | Tạo Hội đồng nghiệm thu |  |  |  | ✓ |  |  |  |  | ✓ | ✓ |
| UC-PH-05 | Xem hồ sơ phục vụ đánh giá nghiệm thu |  |  |  | ✓ |  |  |  |  | ✓ | ✓ |
| UC-PH-06 | Lập và nộp phiếu nghiệm thu |  |  |  | ✓ |  |  |  |  | ✓ | ✓ |
| UC-BB-03 | Lập và nộp biên bản nghiệm thu có chữ ký Thư ký |  |  |  | ✓ |  |  |  |  |  | ✓ |
| UC-BC-03 | Lập và nộp giải trình | ✓ | ✓ |  |  |  |  |  |  |  |  |
| UC-TL-03 | Lưu bản BM14 hoàn chỉnh sau xử lý bên ngoài | ✓ | ✓ |  | ✓ |  |  |  |  |  |  |
| UC-TL-04 | Xem bản BM14 hoàn chỉnh | ✓ | ✓ |  | ✓ |  |  |  |  |  |  |
| UC-TL-09 | Đăng và lưu quyết định công nhận kết quả | ✓ | ✓ |  | ✓ |  |  |  |  |  |  |
| UC-TL-10 | Xem/tải quyết định công nhận kết quả | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| UC-ACT-01 | Sử dụng quyền theo vai trò nghiệp vụ được cấp | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| UC-ACT-02 | Sử dụng vai trò Giảng viên hướng dẫn trên đề tài sinh viên được gán | ✓ | ✓ |  |  |  |  |  |  |  |  |
| UC-ACT-03 | Sử dụng nhiều vai trò Hội đồng trên cùng tài khoản |  |  |  | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| UC-HD-04 | Quản lý thông tin Hội đồng trước mốc chốt phiếu |  |  |  | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| UC-HD-05 | Theo dõi tiến độ nộp phiếu của Hội đồng |  |  |  | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| UC-CHOT-01 | Kiểm tra điều kiện quá bán của Hội đồng |  |  |  |  |  | ✓ |  | ✓ |  | ✓ |
| UC-CHOT-02 | Xác nhận chốt phiếu để bắt đầu lập biên bản |  |  |  |  |  | ✓ |  | ✓ |  | ✓ |
| UC-BB-04 | Kiểm tra biên bản do Thư ký nộp |  |  |  | ✓ |  | ✓ |  | ✓ |  | ✓ |
| UC-BB-05 | Trả biên bản để Thư ký sửa |  |  |  | ✓ |  | ✓ |  | ✓ |  | ✓ |
| UC-BB-06 | Sửa, ký lại và nộp lại biên bản bị trả |  |  |  | ✓ |  | ✓ |  | ✓ |  | ✓ |
| UC-BB-07 | Hoàn tất biên bản bằng chữ ký thứ hai của Chủ tịch |  |  |  | ✓ |  | ✓ |  | ✓ |  | ✓ |
| UC-BB-09 | Gia hạn thời gian duyệt biên bản vì lý do chính đáng |  |  |  | ✓ |  | ✓ |  | ✓ |  | ✓ |
| UC-FORM-01 | Nhập đầy đủ và lưu dữ liệu biểu mẫu | ✓ | ✓ |  | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| UC-FORM-02 | Xem trước biểu mẫu | ✓ | ✓ |  | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| UC-FORM-03 | Xuất PDF để ký bên ngoài | ✓ | ✓ |  | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| UC-FORM-04 | Tiếp tục sửa form và xuất lại PDF trước khi nộp | ✓ | ✓ |  | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| UC-FORM-05 | Tải PDF đã ký lên bản nháp | ✓ | ✓ |  | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| UC-FORM-07 | Nộp biểu mẫu có PDF đã ký và khóa form | ✓ | ✓ |  | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| UC-FORM-08 | Vô hiệu hóa PDF/chữ ký cũ khi biên bản bị trả và sửa |  |  |  |  |  | ✓ |  | ✓ |  | ✓ |
| UC-FORM-09 | Bổ sung chữ ký thứ hai cho biên bản |  |  |  | ✓ |  |  |  |  |  |  |
| UC-TB-01 | Nhận thông báo hạn mới của biên bản |  |  |  | ✓ |  | ✓ |  | ✓ |  | ✓ |
| UC-TB-02 | Truy vết lý do gia hạn biên bản |  |  |  | ✓ |  | ✓ |  | ✓ |  | ✓ |
| UC-TB-03 | Truy vết việc chốt tập phiếu đánh giá |  |  |  |  |  | ✓ |  | ✓ |  | ✓ |
| UC-TB-04 | Theo dõi trạng thái hồ sơ và biểu mẫu | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

Chú giải: GV - Giảng viên; SV - Sinh viên; TK - Trưởng Khoa/Trưởng đơn vị; TV/TK-HS - Thành viên/Thư ký Hội đồng xét duyệt hồ sơ; TV/TK-TM - Hội đồng xét duyệt thuyết minh; TV/TK-NT - Hội đồng nghiệm thu.

## 5.4. Ma trận BM01-BM15

| **BM** | **Phương thức** | **Actor lập/nộp** | **Actor/hệ thống xử lý** | **Trạng thái kết thúc** |
| --- | --- | --- | --- | --- |
| BM01 | Nhập form + tải PDF đã ký | Giảng viên/Sinh viên | Giảng viên hướng dẫn hoặc Trưởng Khoa | Hồ sơ đã nộp/được xử lý |
| BM02 | Nhập form + tải PDF đã ký | Thành viên/Thư ký/Chủ tịch HĐ hồ sơ | Hệ thống khóa sau nộp | Đã nộp hoặc Quá hạn |
| BM03 | Nhập form, ký ngoài và tải lại | Thư ký HĐ hồ sơ | P.KHCN/Chủ tịch | Đã xác nhận hoặc Trả chỉnh sửa |
| BM04 | Tải tệp hoàn chỉnh | Chủ nhiệm đề tài | Hội đồng thuyết minh được xem/tải | Đã nộp |
| BM05 | Tải quyết định hoàn chỉnh | P.KHCN | Công bố theo quyền | Đã công bố |
| BM06 | Nhập form + tải PDF đã ký | Thành viên/Thư ký/Chủ tịch HĐ thuyết minh | Hệ thống khóa sau nộp | Đã nộp hoặc Quá hạn |
| BM07 | Nhập form, ảnh chữ ký hoặc PDF đã ký | Thư ký/Chủ tịch HĐ thuyết minh | P.KHCN rà soát/xác nhận | Đã xác nhận hoặc Trả chỉnh sửa |
| BM08 | Nhập form + tải PDF đã ký | Chủ nhiệm đề tài | Actor có quyền | Đã nộp/Được chấp nhận/Trả sửa/Quá hạn |
| BM09 | Tải báo cáo hoàn chỉnh | Chủ nhiệm đề tài | Actor có quyền | Đã nộp |
| BM10 | Tải quyết định hoàn chỉnh | P.KHCN | Công bố theo quyền | Đã công bố |
| BM11 | Nhập form + tải PDF đã ký | Thành viên/Thư ký/Chủ tịch HĐ nghiệm thu | Hệ thống khóa sau nộp | Đã nộp hoặc Quá hạn |
| BM12 | Nhập form, ký ngoài và tải lại | Thư ký HĐ nghiệm thu | P.KHCN/Chủ tịch | Đã xác nhận hoặc Trả chỉnh sửa |
| BM13 | Nhập form + tải PDF đã ký | Chủ nhiệm đề tài | Actor có quyền | Đã nộp/Được chấp nhận/Trả sửa/Quá hạn |
| BM14 | Tải bản hoàn chỉnh | P.KHCN | Lưu và cấp quyền xem | Đã lưu |
| BM15 | Tải quyết định hoàn chỉnh | P.KHCN | Công bố theo quyền | Đã công bố |

# CHƯƠNG 6: PHỤ LỤC VÀ XÁC NHẬN

## 6.1. Ký hiệu mức độ ưu tiên

| **Ký hiệu** | **Định nghĩa** |
| --- | --- |
| Cao | Yêu cầu bắt buộc trong phạm vi phiên bản đầu. |
| Trung bình | Yêu cầu quan trọng có thể triển khai sau. |
| Thấp | Yêu cầu mong muốn, có thể hoãn khi hạn chế nguồn lực. |

## 6.2. Trạng thái yêu cầu

| **Trạng thái** | **Mô tả** |
| --- | --- |
| Đề xuất | Đã có trong dự thảo nhưng chưa được chủ đầu tư ký xác nhận. |
| Đã xác nhận | Đã được chủ đầu tư xác nhận chính thức. |
| Đang phát triển | Đội phát triển đang triển khai. |
| Hoàn thành | Đã triển khai và kiểm thử thành công. |
| Cần xác minh | Chưa đủ dữ liệu để trở thành baseline triển khai. |

## 6.3. Điểm giao tiếp và tích hợp

| **Điểm giao tiếp** | **Mô tả** |
| --- | --- |
| Tài khoản trong Trường | Dùng tài khoản do Nhà trường quản lý; cơ chế SSO cụ thể cần xác minh. |
| Tài khoản ngoài Trường | P.KHCN cấp và phân quyền cho thành viên/Thư ký Hội đồng ngoài Trường. |
| Email/SMS | Ngoài phạm vi phiên bản đầu; chỉ dùng thông báo trong ứng dụng. |
| Thư viện | Ngoài phạm vi phiên bản đầu. |
| Tài chính-kế toán | Ngoài phạm vi phiên bản đầu. |
| Ký số bên ngoài | Chưa tích hợp bắt buộc; BM07 vẫn có phương thức ảnh chữ ký hoặc PDF đã ký. |

## 6.4. Danh sách vấn đề mở

| **Mã** | **Liên quan** | **Nội dung** | **Mô tả** |
| --- | --- | --- | --- |
| OPEN-01 | UC-TR-01 | Tra cứu sổ tiết NCKH | Chưa xác định đối tượng tra cứu, nguồn dữ liệu, điều kiện và kết quả; không tính vào 73 yêu cầu triển khai. |
| OPEN-02 | NFR | Chỉ số vận hành | Cần xác minh tải đồng thời, thời gian phản hồi, dung lượng tệp, RPO và RTO. |
| OPEN-03 | FORM/PDF | Nguồn dữ liệu chính thức | Cần xác minh cách xử lý khi dữ liệu form và PDF đã ký khác nhau. |
| OPEN-04 | Tài liệu | Định dạng và dung lượng | Cần xác minh định dạng/dung lượng tối đa theo từng BM tải hoàn chỉnh. |
| OPEN-05 | Phê duyệt | Thông tin ký xác nhận FRS | Chưa có họ tên đại diện Chủ đầu tư, Trưởng nhóm BA và người phê duyệt kỹ thuật. |

## 6.5. Xác nhận tài liệu

Việc ký xác nhận chuyển trạng thái các yêu cầu từ Đề xuất sang Đã xác nhận. Các vấn đề mở không mặc nhiên trở thành yêu cầu triển khai cho đến khi có quyết định bổ sung.

| **Vai trò** | **Họ tên** | **Ngày ký** |
| --- | --- | --- |
| Đại diện Chủ đầu tư |  |  |
| Trưởng nhóm BA |  |  |
| Phê duyệt kỹ thuật |  |  |