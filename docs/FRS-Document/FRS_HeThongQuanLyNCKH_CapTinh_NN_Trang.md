# **TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐỒNG NAI**

# **ĐẶC TẢ YÊU CẦU CHỨC NĂNG**

# **(FUNCTIONAL REQUIREMENTS SPECIFICATION)**

# **Quản lý thực hiện đề tài cấp Nhà nước, cấp Tỉnh/Bộ, ngành**

# **Phiên bản 0.1 - Bản dự thảo**

| 
## Thông tin

 | 

## Nội dung

 |
| --- | --- |
| 

## Mã tài liệu

 | 

## FRS-NCKH-003

 |
| --- | --- |
| 

## Phiên bản

 | 

## 0.1

 |
| --- | --- |
| 

## Ngày lập

 | 

## Tháng 07 năm 2026

 |
| --- | --- |
| 

## Trạng thái

 | 

## Bản dự thảo

 |
| --- | --- |
| 

## Chủ đầu tư

 |  |
| --- | --- |
| 

## Đơn vị lập

 |  |
| --- | --- |
| 

## Tài liệu liên quan

 | 

## QT.KHCN.04 - Quy trình quản lý thực hiện đề tài cấp Nhà nước, cấp Tỉnh/Bộ, ngành, các Quỹ; BM01-BM05/QT.KHCN.04

 |
| --- | --- |
| 

## Lưu ý

 | 

## Các nội dung ghi Cần xác minh chưa thuộc baseline triển khai.

 |
| --- | --- |

## Tài liệu này thuộc phạm vi nội bộ - Không phát hành ra bên ngoài khi chưa có sự đồng ý của chủ đầu tư.

## LỊCH SỬ THAY ĐỔI TÀI LIỆU

| 
## Phiên bản

 | 

## Ngày

 | 

## Nội dung thay đổi

 | 

## Người thực hiện

 | 

## Ghi chú

 |
| --- | --- | --- | --- | --- |
| 

## 0.1

 | 

## 07/2026

 | 

## Khởi tạo bản FRS dự thảo hệ thống quản lý đề tài cấp Nhà nước/Tỉnh/Bộ, ngành

 |  | 

## Chờ review và xác nhận

 |
| --- | --- | --- | --- | --- |

## MỤC LỤC

## LỊCH SỬ THAY ĐỔI TÀI LIỆU......................................................................................1

## CHƯƠNG 1: TỔNG QUAN TÀI LIỆU............................................................................1

## 1.1. Mục đích tài liệu......................................................................................................1

## 1.2. Phạm vi hệ thống.....................................................................................................1

## 1.3. Yêu cầu nghiệp vụ cốt lõi........................................................................................2

## 1.4. Đối tượng sử dụng...................................................................................................3

## 1.5. Định nghĩa và từ viết tắt..........................................................................................3

## 1.6. Tài liệu tham chiếu..................................................................................................4

## CHƯƠNG 2: USER STORY, LUỒNG XỬ LÝ VÀ TRẠNG THÁI.................................4

## 2.1. Bộ User Story...........................................................................................................4

## 2.2. Luồng xử lý tổng thể................................................................................................6

## 2.3. Mô hình trạng thái....................................................................................................7

### 2.3.1. Trạng thái đề tài.....................................................................................................7

### 2.3.2. Trạng thái biểu mẫu...............................................................................................8

## CHƯƠNG 3: YÊU CẦU CHỨC NĂNG CHI TIẾT...........................................................8

## 3.1. Module M01 – Tiếp nhận thông báo và tổng hợp hồ sơ đăng ký..............................9

### 3.1.1. Mô tả chức năng.....................................................................................................9

### 3.1.2. Yêu cầu chức năng......................................................................................................9

### 3.1.3. Trường dữ liệu chính................................................................................................10

### 3.1.4. Quy tắc nghiệp vụ.....................................................................................................10

### 3.1.5. Kết quả đầu ra...........................................................................................................10

### 3.1.6. Tiêu chí nghiệm thu..................................................................................................10

## 3.2. Module M02 – Theo dõi phê duyệt và ra quyết định giao nhiệm vụ...........................11

### 3.2.1. Mô tả chức năng.......................................................................................................11

### 3.2.2. Yêu cầu chức năng....................................................................................................11

### 3.2.3. Trường dữ liệu chính................................................................................................12

### 3.2.4. Quy tắc nghiệp vụ.....................................................................................................12

### 3.2.5. Kết quả đầu ra...........................................................................................................12

### 3.2.6. Tiêu chí nghiệm thu..................................................................................................12

## 3.3. Module M03 – Theo dõi tiến độ thực hiện đề tài........................................................13

### 3.3.1. Mô tả chức năng.......................................................................................................13

### 3.3.2. Yêu cầu chức năng...................................................................................................13

### 3.3.3. Trường dữ liệu chính................................................................................................13

### 3.3.4. Quy tắc nghiệp vụ.....................................................................................................14

### 3.3.5. Kết quả đầu ra...........................................................................................................14

### 3.3.6. Tiêu chí nghiệm thu.................................................................................................14

## 3.4. Module M04 – Nghiệm thu cấp cơ sở.........................................................................14

### 3.4.1. Mô tả chức năng.......................................................................................................14

### 3.4.2. Yêu cầu chức năng....................................................................................................14

### 3.4.3. Trường dữ liệu chính................................................................................................16

### 3.4.4. Quy tắc nghiệp vụ.....................................................................................................16

### 3.4.5. Kết quả đầu ra...........................................................................................................16

### 3.4.6. Tiêu chí nghiệm thu..................................................................................................17

## 3.5. Module M05 – Hỗ trợ hồ sơ nghiệm thu cấp Tỉnh, Bộ/Nhà nước............................17

### 3.5.1. Mô tả chức năng......................................................................................................17

### 3.5.2. Yêu cầu chức năng..................................................................................................17

### 3.5.3. Trường dữ liệu chính...............................................................................................18

### 3.5.4. Quy tắc nghiệp vụ....................................................................................................18

### 3.5.5. Kết quả đầu ra..........................................................................................................18

### 3.5.6. Tiêu chí nghiệm thu.................................................................................................18

## 3.6. Module M06 – Hoàn thiện báo cáo sau nghiệm thu và lưu hồ sơ..............................19

### 3.6.1. Mô tả chức năng......................................................................................................19

### 3.6.2. Yêu cầu chức năng...................................................................................................19

### 3.6.3. Trường dữ liệu chính................................................................................................20

### 3.6.4. Quy tắc nghiệp vụ....................................................................................................20

### 3.6.5. Kết quả đầu ra...........................................................................................................20

### 3.6.6. Tiêu chí nghiệm thu..................................................................................................20

## 3.7. Module M07 – Actor, phân quyền và truy cập............................................................21

### 3.7.1. Mô tả chức năng.......................................................................................................21

### 3.7.2. Yêu cầu chức năng...................................................................................................21

### 3.7.3. Trường dữ liệu chính................................................................................................22

### 3.7.4. Quy tắc nghiệp vụ....................................................................................................22

### 3.7.5. Kết quả đầu ra..........................................................................................................22

### 3.7.6. Tiêu chí nghiệm thu.................................................................................................22

## 3.8. Module M08 – Thông báo và truy vết........................................................................23

### 3.8.1. Mô tả chức năng......................................................................................................23

### 3.8.2. Yêu cầu chức năng..................................................................................................23

### 3.8.3. Trường dữ liệu chính...............................................................................................24

### 3.8.4. Quy tắc nghiệp vụ...................................................................................................24

### 3.8.5. Kết quả đầu ra.......................................................................................................24

### 3.8.6. Tiêu chí nghiệm thu..............................................................................................24

## CHƯƠNG 4: YÊU CẦU PHI CHỨC NĂNG..................................................................25

## 4.1. Các chỉ số cần xác minh...........................................................................................25

## CHƯƠNG 5: BẢNG TỔNG HỢP VÀ TRUY VẾT.........................................................26

## 5.1. Tổng hợp yêu cầu theo module................................................................................26

## 5.2. Ma trận UCTQ – UCCT – Module – Biểu mẫu.......................................................27

## 5.3. Ma trận Use Case chi tiết – Actor.............................................................................28

## 5.4. Ma trận BM01 – BM05............................................................................................29

## CHƯƠNG 6: PHỤ LỤC VÀ XÁC NHẬN......................................................................30

## 6.1. Ký hiệu mức độ ưu tiên............................................................................................30

## 6.2. Trạng thái yêu cầu....................................................................................................30

## 6.3. Điểm giao tiếp và tích hợp.......................................................................................30

## 6.4. Danh sách vấn đề mở...............................................................................................30

## 6.5. Xác nhận tài liệu......................................................................................................30

## **CHƯƠNG 1: TỔNG QUAN TÀI LIỆU**

## **1.1. Mục đích tài liệu**

## Tài liệu này mô tả yêu cầu chức năng, dữ liệu, quy tắc nghiệp vụ, trạng thái, yêu cầu phi chức năng và tiêu chí nghiệm thu của phân hệ quản lý thực hiện đề tài nghiên cứu khoa học cấp Nhà nước, cấp Tỉnh/Thành phố, Bộ/ngành và các Quỹ trên nền tảng website, dựa trên Quy trình QT.KHCN.04 và bộ biểu mẫu BM01-BM05.

## • Làm cơ sở cho thiết kế và phát triển phần mềm.

## • Làm căn cứ kiểm thử, nghiệm thu và quản lý thay đổi yêu cầu.

## • Bảo đảm truy vết từ quy trình, biểu mẫu và use case đến chức năng triển khai.

## **1.2. Phạm vi hệ thống**

## Đây là nhóm đề tài do cơ quan quản lý cấp trên (Bộ, Quỹ, Tỉnh/Thành phố) chủ trì xét duyệt kinh phí và thủ tục hành chính; Trường đóng vai trò tổ chức chủ trì thực hiện. Hệ thống hỗ trợ P.KHCN và Chủ nhiệm đề tài (CNĐT) theo dõi, tổng hợp và lưu trữ hồ sơ nội bộ trong suốt quá trình đăng ký, thực hiện, nghiệm thu cơ sở và nghiệm thu cấp Tỉnh/Bộ/Nhà nước. Hệ thống quản lý dữ liệu, tệp, trạng thái, phân quyền, thông báo và dấu vết xử lý; việc xét duyệt, phê duyệt kinh phí và ra quyết định của cơ quan quản lý cấp trên diễn ra bên ngoài hệ thống.

## • Tiếp nhận thông báo và tổng hợp hồ sơ đăng ký gửi cơ quan quản lý

## • Theo dõi kết quả phê duyệt của cơ quan quản lý và ra quyết định giao nhiệm vụ

## • Theo dõi tiến độ thực hiện đề tài

## • Nghiệm thu cấp cơ sở

## • Hỗ trợ hồ sơ nghiệm thu cấp Tỉnh, Bộ/Nhà nước

## • Hoàn thiện báo cáo sau nghiệm thu và lưu hồ sơ

## • Actor, phân quyền và truy cập

## • Thông báo và truy vết

## **Ngoài phạm vi:**

## • Xét duyệt, thẩm định và phê duyệt kinh phí của Bộ, Quỹ hoặc cơ quan quản lý cấp Tỉnh/Thành phố.

## • Tổ chức họp Hội đồng nghiệm thu cấp cơ sở hoặc cấp Tỉnh/Bộ/Nhà nước trên hệ thống; hệ thống chỉ lưu hồ sơ và kết quả đã có.

## • Đăng ký trực tuyến trên cổng thông tin riêng của từng Bộ/ngành/Quỹ.

## • Ký quyết định, ký hợp đồng và xử lý chứng từ, quyết toán kinh phí chi tiết (QT.TCKT).

## • Tích hợp email, SMS hoặc dịch vụ ký số bên ngoài trong phiên bản đầu.

## **1.3. Yêu cầu nghiệp vụ cốt lõi**

| 
## Mã

 | 

## Yêu cầu

 | 

## Nơi đặc tả

 |
| --- | --- | --- |
| 

## BR-CORE-01

 | 

## Hồ sơ đăng ký/nghiệm thu tuân theo mẫu và thời hạn của từng cơ quan quản lý; hệ thống chỉ chuẩn hóa phần hồ sơ nội bộ Trường.

 | 

## Chương 2-4

 |
| --- | --- | --- |
| 

## BR-CORE-02

 | 

## Quyền truy cập được xác định theo actor, vai trò (CNĐT, P.KHCN, BGH, HĐNT cơ sở, P.KT-TC) và trạng thái đề tài.

 | 

## Chương 2-4

 |
| --- | --- | --- |
| 

## BR-CORE-03

 | 

## Trạng thái và các thao tác quan trọng phải được lưu vết; audit log không được sửa/xóa bởi chức năng nghiệp vụ.

 | 

## Chương 2-4

 |
| --- | --- | --- |
| 

## BR-CORE-04

 | 

## Kết quả phê duyệt của cơ quan quản lý cấp trên và kết luận Hội đồng nghiệm thu cơ sở chỉ được lưu và công bố trong hệ thống theo đúng vai trò, không tự giả lập quy trình xét duyệt bên ngoài.

 | 

## Chương 2-4

 |
| --- | --- | --- |

## **1.4. Đối tượng sử dụng**

| 
## Nhóm người dùng

 | 

## Vai trò

 | 

## Phân quyền chính

 |
| --- | --- | --- |
| 

## Chủ nhiệm đề tài (CNĐT)

 | 

## CNĐT

 | 

## Lập hồ sơ đăng ký, báo cáo tiến độ (BM01), đề nghị nghiệm thu cơ sở (BM02) và hoàn thiện báo cáo sau nghiệm thu.

 |
| --- | --- | --- |
| 

## Cán bộ/Phòng Khoa học Công nghệ (P.KHCN)

 | 

## P.KHCN

 | 

## Tiếp nhận thông báo từ cơ quan quản lý, tổng hợp hồ sơ, trình BGH, theo dõi tiến độ, tổ chức Hội đồng nghiệm thu cơ sở, hỗ trợ hồ sơ nghiệm thu cấp trên, lưu trữ hồ sơ.

 |
| --- | --- | --- |
| 

## Ban Giám hiệu (BGH)

 | 

## BGH

 | 

## Ký duyệt hồ sơ đăng ký, ký duyệt thành lập Hội đồng nghiệm thu cơ sở, ký duyệt hồ sơ trình cơ quan quản lý cấp trên.

 |
| --- | --- | --- |
| 

## Thành viên Hội đồng nghiệm thu cơ sở (HĐNT)

 | 

## HĐNT cơ sở

 | 

## Xem hồ sơ và nộp Phiếu đánh giá kết quả thực hiện đề tài (BM04), ký Biên bản họp Hội đồng (BM05).

 |
| --- | --- | --- |
| 

## Phòng Tài chính - Kế toán (P.KT-TC)

 | 

## P.KT-TC

 | 

## Xác nhận và xử lý các nội dung tài chính liên quan đến kinh phí đề tài, phối hợp hồ sơ nghiệm thu cấp trên.

 |
| --- | --- | --- |
| 

## Cơ quan quản lý cấp trên (Bộ, Quỹ, Tỉnh/Thành phố)

 | 

## Cơ quan quản lý

 | 

## Xét duyệt, phê duyệt đề tài, phê duyệt kết quả nghiệm thu cấp Tỉnh/Bộ/Nhà nước; tương tác với hệ thống qua hồ sơ do P.KHCN gửi, không có tài khoản đăng nhập trong phiên bản đầu.

 |
| --- | --- | --- |

## **1.5. Định nghĩa và từ viết tắt**

| 
## Thuật ngữ/Viết tắt

 | 

## Định nghĩa

 |
| --- | --- |
| 

## CNĐT

 | 

## Chủ nhiệm đề tài

 |
| --- | --- |
| 

## P.KHCN

 | 

## Phòng Khoa học Công nghệ

 |
| --- | --- |
| 

## BGH

 | 

## Ban giám hiệu

 |
| --- | --- |
| 

## HĐNT

 | 

## Hội đồng nghiệm thu (cấp cơ sở)

 |
| --- | --- |
| 

## P.KT-TC

 | 

## Phòng Kế hoạch - Tài chính/Tài chính - Kế toán

 |
| --- | --- |
| 

## Cơ quan quản lý

 | 

## Bộ, ngành, Quỹ khoa học công nghệ hoặc Sở/UBND Tỉnh/Thành phố chủ trì xét duyệt đề tài

 |
| --- | --- |
| 

## Nghiệm thu cơ sở

 | 

## Bước đánh giá nội bộ tại Trường trước khi đề tài được trình nghiệm thu chính thức ở cấp Tỉnh, Bộ hoặc Nhà nước

 |
| --- | --- |
| 

## Actor

 | 

## Vai trò nghiệp vụ trực tiếp tương tác với hệ thống

 |
| --- | --- |
| 

## Audit log

 | 

## Nhật ký chỉ thêm mới dùng để truy vết thao tác quan trọng

 |
| --- | --- |
| 

## Cần xác minh

 | 

## Thông tin chưa đủ căn cứ để đưa vào baseline triển khai

 |
| --- | --- |

## **1.6. Tài liệu tham chiếu**

## • FRS\_Mau.docx - mẫu cấu trúc và trình bày.

## • QT.KHCN.04 - Quy trình quản lý thực hiện đề tài cấp Nhà nước, cấp Tỉnh/Bộ, ngành, các Quỹ và lưu đồ PPTX/PDF của P.KHCN.

## • Bộ biểu mẫu BM01, BM02, BM03, BM04, BM05/QT.KHCN.04.

## • Quyết định số 929/QĐ-TTg (16/6/2011) về thành lập Trường; Quyết định số 402/QĐ-ĐHCNĐN (16/9/2024) ban hành Quy chế hoạt động khoa học và công nghệ.

## CHƯƠNG 2: USER STORY, LUỒNG XỬ LÝ VÀ TRẠNG THÁI

## **2.1. Bộ user story**

| 
## Mã US

 | 

## UCTQ

 | 

## Tác nhân

 | 

## User story

 | 

## Module

 |
| --- | --- | --- | --- | --- |
| 

## US-01

 | 

## UCTQ-01

 | 

## P.KHCN

 | 

## Là cán bộ P.KHCN, tôi muốn ghi nhận thông báo mời đăng ký từ cơ quan quản lý và triển khai đến các khoa, viện, trung tâm để giảng viên biết thời hạn và biểu mẫu đăng ký.

 | 

## M01

 |
| --- | --- | --- | --- | --- |
| 

## US-02

 | 

## UCTQ-02

 | 

## CNĐT

 | 

## Là Chủ nhiệm đề tài, tôi muốn nộp hồ sơ đăng ký đề tài cho P.KHCN trình BGH ký duyệt để gửi đến cơ quan quản lý trước thời hạn.

 | 

## M01

 |
| --- | --- | --- | --- | --- |
| 

## US-03

 | 

## UCTQ-03

 | 

## P.KHCN

 | 

## Là cán bộ P.KHCN, tôi muốn theo dõi tình trạng xét duyệt hồ sơ tại cơ quan quản lý để biết đề tài được phê duyệt hay không.

 | 

## M02

 |
| --- | --- | --- | --- | --- |
| 

## US-04

 | 

## UCTQ-04

 | 

## P.KHCN

 | 

## Là cán bộ P.KHCN, tôi muốn lưu bản sao hồ sơ đã được cơ quan quản lý phê duyệt và tham mưu ra quyết định giao nhi ní ệm vụ cho CNĐT để có căn cứ theo dõi thực hiện.

 | 

## M02

 |
| --- | --- | --- | --- | --- |
| 

## US-05

 | 

## UCTQ-05

 | 

## CNĐT

 | 

## Là Chủ nhiệm đề tài, tôi muốn lập và nộp Báo cáo tình hình thực hiện đề tài (BM01) theo tiến độ để P.KHCN theo dõi.

 | 

## M03

 |
| --- | --- | --- | --- | --- |
| 

## US-06

 | 

## UCTQ-06

 | 

## CNĐT

 | 

## Là Chủ nhiệm đề tài, tôi muốn nộp Phiếu đề nghị nghiệm thu cấp cơ sở (BM02) kèm báo cáo tổng kết và sản phẩm để P.KHCN tổ chức Hội đồng nghiệm thu cơ sở.

 | 

## M04

 |
| --- | --- | --- | --- | --- |
| 

## US-07

 | 

## UCTQ-07

 | 

## P.KHCN

 | 

## Là cán bộ P.KHCN, tôi muốn tham mưu BGH ra Quyết định thành lập Hội đồng nghiệm thu cơ sở (BM03) để tổ chức đánh giá nội bộ đề tài.

 | 

## M04

 |
| --- | --- | --- | --- | --- |
| 

## US-08

 | 

## UCTQ-08

 | 

## Thành viên HĐNT

 | 

## Là thành viên Hội đồng nghiệm thu cơ sở, tôi muốn nộp Phiếu đánh giá kết quả thực hiện đề tài (BM04) và ký Biên bản họp Hội đồng (BM05) làm căn cứ kết luận nghiệm thu cơ sở.

 | 

## M04

 |
| --- | --- | --- | --- | --- |
| 

## US-09

 | 

## UCTQ-09

 | 

## P.KHCN

 | 

## Là cán bộ P.KHCN, tôi muốn hỗ trợ CNĐT lập hồ sơ đề nghị nghiệm thu cấp Tỉnh, Bộ/Nhà nước theo hướng dẫn của Bộ ngành và trình BGH phê duyệt.

 | 

## M05

 |
| --- | --- | --- | --- | --- |
| 

## US-10

 | 

## UCTQ-10

 | 

## CNĐT

 | 

## Là Chủ nhiệm đề tài, tôi muốn chỉnh sửa báo cáo tổng kết và hoàn chỉnh sản phẩm sau nghiệm thu cấp trên, đồng thời gửi bản sao quyết định công nhận kết quả cho P.KHCN lưu trữ.

 | 

## M06

 |
| --- | --- | --- | --- | --- |

## **2.2. Luồng xử lý tổng thể**

| 
## Bước

 | 

## Giai đoạn

 | 

## Actor

 | 

## Hành động chính

 | 

## BM

 | 

## Kết quả

 |
| --- | --- | --- | --- | --- | --- |
| 

## 1

 | 

## Tiếp nhận thông báo và tổng hợp hồ sơ đăng ký

 | 

## P.KHCN; CNĐT; BGH; Cơ quan quản lý k q

 | 

## P.KHCN triển khai thông báo; CNĐT lập, ký và nộp hồ sơ; BGH ý duyệt; gửi cơ quan uản lý trước hạn

 | 

## —

 | 

## Hồ sơ đăng ký được trình cơ quan quản lý đúng hạn

 |
| --- | --- | --- | --- | --- | --- |
| 

## 2

 | 

## Theo dõi phê duyệt

 | 

## P.KHCN; Cơ quan quản lý

 | 

## P.KHCN theo dõi kết quả xét duyệt của cơ quan quản lý

 | 

## —

 | 

## Đề tài được phê duyệt hoặc không được phê duyệt

 |
| --- | --- | --- | --- | --- | --- |
| 

## 3

 | 

## Lưu hồ sơ và ra quyết định giao nhiệm vụ

 | 

## P.KHCN; CNĐT

 | 

## CNĐT gửi bản sao hồ sơ đã duyệt; P.KHCN lưu và tham mưu ra quyết định giao

 | 

## —

 | 

## Đề tài được giao nhiệm vụ thực hiện

 |
| --- | --- | --- | --- | --- | --- |
| 

## 4

 | 

## Theo dõi tiến độ thực hiện

 | 

## CNĐT; P.KHCN c h

 | 

## CNĐT lập và nộp báo áo tình hình thực iện theo tiến độ Hợp đồng/Thuyết minh

 | 

## BM01

 | 

## Tiến độ thực hiện được ghi nhận

 |
| --- | --- | --- | --- | --- | --- |
| 

## 5

 | 

## Nghiệm thu cấp cơ sở

 | 

## CNĐT; P.KHCN; HĐNT; BGH

 | 

## CNĐT nộp BM02 kèm báo cáo tổng kết; P.KHCN tham mưu BGH ra Quyết định thành lập HĐNT (BM03); HĐNT đánh giá (BM04) và lập biên bả (BM05)

 | 

## BM02-BM05

 | 

## Kết quả nghiệm thu cơ sở đạt hoặc không đạt

 |
| --- | --- | --- | --- | --- | --- |
| 

## 6

 | 

## Nghiệm thu cấp Tỉnh, Bộ/Nhà nước

 | 

## P.KHCN; CNĐT; Cơ quan quản lý; P.KT-TC

 | 

## P.KHCN hỗ trợ CNĐT lập hồ sơ theo hướng dẫn của Bộ ngành, trình BGH phê duyệt

 | 

## —

 | 

## Hồ sơ nghiệm thu cấp trên được trình cơ quan quản lý

 |
| --- | --- | --- | --- | --- | --- |
| 

## 7

 | 

## Hoàn thiện sau nghiệm thu và lưu hồ sơ

 | 

## CNĐT; P.KHCN; P.KT-TC c

 | 

## CNĐT chỉnh sửa báo cáo tổng kết, hoàn hỉnh sản phẩm; gửi bản sao quyết định công nhận, biên bản nghiệm thu cho P.KHCN lưu

 | 

## —

 | 

## Hồ sơ hoàn tất được lưu trữ

 |
| --- | --- | --- | --- | --- | --- |

## **2.3. Mô hình trạng thái**

## **2.3.1. Trạng thái đề tài**

| 
## Mã trạng thái

 | 

## Tên trạng thái

 | 

## Ý nghĩa

 | 

## Điều kiện chuyển

 |
| --- | --- | --- | --- |
| 

## DT-CHO-DK

 | 

## Chờ đăng ký

 | 

## P.KHCN đã nhận thông báo, chưa nộp hồ sơ đăng ký.

 | 

## CNĐT chuẩn bị hồ sơ trước hạn.

 |
| --- | --- | --- | --- |
| 

## DT-DA-NOP

 | 

## Đã nộp đăng ký

 | 

## Hồ sơ đăng ký đã được BGH ký và gửi cơ quan quản c lý.

 | 

## BGH ký duyệt và gửi ơ quan quản lý.

 |
| --- | --- | --- | --- |
| 

## DT-CHO-PD

 | 

## Chờ phê duyệt

 | 

## Đang chờ kết quả xét duyệt của cơ quan quản lý.

 | 

## Hồ sơ đã gửi, chưa có kết quả.

 |
| --- | --- | --- | --- |
| 

## DT-DUOC-PD

 | 

## Được phê duyệt

 | 

## Cơ quan quản lý phê duyệt đề tài và kinh phí.

 | 

## Cơ quan quản lý ra quyết định phê duyệt.

 |
| --- | --- | --- | --- |
| 

## DT-KHONG-PD

 | 

## Không được phê duyệt

 | 

## Cơ quan quản lý không phê duyệt; đề tài kết thúc.

 | 

## Cơ quan quản lý từ chối.

 |
| --- | --- | --- | --- |
| 

## DT-DANG-TH

 | 

## Đang thực hiện

 | 

## CNĐT triển khai nghiên cứu theo Thuyết minh.

 | 

## P.KHCN ra quyết định giao nhiệm vụ.

 |
| --- | --- | --- | --- |
| 

## DT-CHO-NT-CS

 | 

## Chờ nghiệm thu cơ sở

 | 

## Đã nộp BM02, chờ Hội đồng nghiệm thu cơ sở.

 | 

## CNĐT nộp BM02.

 |
| --- | --- | --- | --- |
| 

## DT-DA-NT-CS

 | 

## Đã nghiệm thu cơ sở đạt

 | 

## Hội đồng cơ sở kết luận đạt; chuyển hồ sơ lên cấp trên.

 | 

## HĐNT xác nhận BM05 đạt.

 |
| --- | --- | --- | --- |
| 

## DT-KHONG-NT-CS

 | 

## Không đạt nghiệm thu cơ sở

 | 

## Hội đồng cơ sở kết luận không đạt; CNĐT chỉnh sửa theo yêu cầu.

 | 

## HĐNT xác nhận BM05 không đạt.

 |
| --- | --- | --- | --- |
| 

## DT-CHO-NT-CAP-

 | 

## TREN Chờ nghiệ thu cấp trên

 | 

## m Hồ sơ nghiệm thu cấp Tỉnh/Bộ/Nhà nước đang chờ cơ quan quản lý xét duyệt.

 | 

## P.KHCN gửi hồ sơ đến cơ quan quản lý.

 |
| --- | --- | --- | --- |
| 

## DT-HOAN-TAT

 | 

## Hoàn tất

 | 

## Đã có quyết định công nhận kết quả từ cơ quan quản lý; hồ sơ được lưu trữ.

 | 

## Cơ quan quản lý công nhận kết quả.

 |
| --- | --- | --- | --- |

## **2.3.2. Trạng thái biểu mẫu**

| 
## Nhóm

 | 

## Biểu mẫu

 | 

## Chuỗi trạng thái

 |
| --- | --- | --- |
| 

## BM do CNĐT nộp

 | 

## BM01/BM02

 | 

## Nháp → Đã nộp → Được chấp nhận / Trả sửa / Quá hạn

 |
| --- | --- | --- |
| 

## Phiếu Hội đồng nghiệm thu cơ sở

 | 

## BM04

 | 

## Nháp → Đã nộp; đã nộp không được sửa hoặc nộp lại

 |
| --- | --- | --- |
| 

## Quyết định/biên bản

 | 

## BM03/BM05

 | 

## Dự thảo → Đã ký (ngoài hệ thống) → Đã lưu trong hệ thống

 |
| --- | --- | --- |

## **CHƯƠNG 3: YÊU CẦU CHỨC NĂNG CHI TIẾT**

## Chương này sử dụng trực tiếp mã UC chi tiết làm mã yêu cầu chức năng. Mọi yêu cầu trong phạm vi phiên bản đầu có ưu tiên Cao và trạng thái Đề xuất cho đến khi tài liệu được ký xác nhận.

## **3.1. Module M01 - Tiếp nhận thông báo và tổng hợp hồ sơ đăng ký**

## **3.1.1. Mô tả chức năng**

## Module M01 nhóm 5 yêu cầu liên quan đến việc tiếp nhận thông báo mời đăng ký từ cơ quan quản lý, triển khai đến các đơn vị và tổng hợp hồ sơ đăng ký của CNĐT trình BGH ký duyệt. Actor tham gia: P.KHCN; CNĐT; BGH.

## **3.1.2. Yêu cầu chức năng**

| 
## Mã YC

 | 

## Tên chức năng

 | 

## Actor

 | 

## Mô tả và kết quả

 | 

## Ưu tiên

 | 

## Trạng thái

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-DK4-01

 | 

## Ghi nhận thông báo mời đăng ký

 | 

## P.KHCN

 | 

## P.KHCN nhập thông tin đợt tuyển chọn từ Bộ/Quỹ/Tỉnh: tên chương trình, thời hạn nộp, biểu mẫu áp dụng. Kết quả: Thông báo được ghi nhận và hiển thị cho các đơn vị.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-DK4-02

 | 

## Công bố thông báo đến các đơn vị

 | 

## P.KHCN

 | 

## P.KHCN công bố thông báo và biểu mẫu đến các khoa, viện và trung tâm. Kết quả: Các đơn vị và CNĐT tiềm năng nắm được cơ hội đăng ký.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-DK4-03

 | 

## Lập hồ sơ đăng ký đề tài

 | 

## CNĐT

 | 

## CNĐT lập hồ sơ đăng ký theo mẫu của cơ quan quản lý và nộp cho P.KHCN. Kết quả: Hồ sơ đăng ký ở trạng thái chờ trình BGH.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-DK4-04

 | 

## Trình BGH ký duyệt hồ sơ đăng ký

 | 

## P.KHCN

 | 

## P.KHCN tổng hợp hồ sơ và trình BGH ký duyệt trước khi gửi cơ quan quản lý. Kết quả: Hồ sơ đăng ký được BGH ký duyệt.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-DK4-05

 | 

## Gửi hồ sơ đến cơ quan quản lý trướ hạn

 | 

## P.KHCN/ CNĐT c

 | 

## P.KHCN hoặc CNĐT (trường hợp yêu cầu đăng ký trực tuyến) gửi hồ sơ đến cơ quan quản lý trước thời hạn. Kết quả: Hồ sơ đăng ký chuyển trạng thái Đã nộp đăng ký.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |

## **3.1.3. Trường dữ liệu chính**

| 
## STT

 | 

## Nhóm dữ liệu

 | 

## Mô tả

 |
| --- | --- | --- |
| 

## 1

 | 

## Thông báo mời đăng ký

 | 

## Tên chương trình/cơ quan quản lý, thời hạn nộp, biểu mẫu áp dụng, tệp thông báo gốc.

 |
| --- | --- | --- |
| 

## 2

 | 

## Hồ sơ đăng ký đề tài

 | 

## Tên đề tài, chủ nhiệm, đơn vị chủ trì, thời gian thực hiện dự kiến, kinh phí đề xuất, tệp hồ sơ theo mẫu cơ quan quản lý.

 |
| --- | --- | --- |
| 

## 3

 | 

## Xác nhận ký duyệt BGH

 | 

## Người ký (BGH), thời điểm, số văn bản gửi đi.

 |
| --- | --- | --- |

## **3.1.4. Quy tắc nghiệp vụ**

| 
## Mã BR

 | 

## Quy tắc

 | 

## UC liên quan

 |
| --- | --- | --- |
| 

## BR-M01-01

 | 

## Hồ sơ đăng ký phải được BGH ký duyệt trước khi gửi cơ quan quản lý, trừ trường hợp đăng ký trực tuyến theo yêu cầu của Bộ/Quỹ cho phép CNĐT chủ động đăng ký.

 | 

## UC-DK4-03, UC-DK4-04, UC-DK4-05

 |
| --- | --- | --- |
| 

## BR-M01-02

 | 

## Hồ sơ và biểu mẫu áp dụng tuân theo mẫu của từng cơ quan quản lý; hệ thống không chuẩn hóa cấu trúc chi tiết của từng loại chương trình, chỉ lưu trữ tệp và thông tin tổng hợp.

 | 

## UC-DK4-01, UC-DK4-03

 |
| --- | --- | --- |
| 

## BR-M01-03

 | 

## Hệ thống cảnh báo khi gần đến thời hạn nộp hồ sơ theo thông báo đã ghi nhận.

 | 

## UC-DK4-05

 |
| --- | --- | --- |

## **3.1.5. Kết quả đầu ra**

## • UC-DK4-01: Thông báo được ghi nhận và hiển thị cho các đơn vị.

## • UC-DK4-02: Các đơn vị và CNĐT tiềm năng nắm được cơ hội đăng ký.

## • UC-DK4-03: Hồ sơ đăng ký ở trạng thái chờ trình BGH.

## • UC-DK4-04: Hồ sơ đăng ký được BGH ký duyệt.

## • UC-DK4-05: Hồ sơ đăng ký chuyển trạng thái Đã nộp đăng ký.

## **3.1.6. Tiêu chí nghiệm thu**

| 
## Mã AC

 | 

## UC

 | 

## Tiêu chí nghiệm thu

 |
| --- | --- | --- |
| 

## AC-UC-DK4-01

 | 

## UC-DK4-01 v

 | 

## Khi P.KHCN nhập thông tin đợt hợp lệ, hệ thống lưu à hiển thị thông báo đúng phạm vi công bố.

 |
| --- | --- | --- |
| 

## AC-UC-DK4-02

 | 

## UC-DK4-02 t

 | 

## Khi P.KHCN công bố, các đơn vị có quyền xem đúng hông báo và biểu mẫu áp dụng.

 |
| --- | --- | --- |
| 

## AC-UC-DK4-03

 | 

## UC-DK4-03 c

 | 

## Khi CNĐT nộp hồ sơ đầy đủ trường bắt buộc, hệ thống huyển hồ sơ sang trạng thái chờ trình BGH.

 |
| --- | --- | --- |
| 

## AC-UC-DK4-04

 | 

## UC-DK4-04 t

 | 

## Khi BGH ký duyệt, hệ thống lưu dấu vết người ký và hời điểm, mở khóa bước gửi cơ quan quản lý.

 |
| --- | --- | --- |
| 

## AC-UC-DK4-05

 | 

## UC-DK4-05 t

 | 

## Khi hồ sơ được gửi trong hạn, hệ thống chuyển trạng hái Đã nộp đăng ký và ghi nhận thời điểm gửi.

 |
| --- | --- | --- |

## **3.2. Module M02 - Theo dõi phê duyệt và ra quyết định giao nhiệm vụ**

## **3.2.1. Mô tả chức năng**

## Module M02 nhóm 4 yêu cầu liên quan đến việc theo dõi kết quả xét duyệt của cơ quan quản lý và ra quyết định giao nhiệm vụ cho CNĐT. Actor tham gia: P.KHCN; CNĐT; BGH.

## **3.2.2. Yêu cầu chức năng**

| 
## Mã YC

 | 

## Tên chức năng

 | 

## Actor

 | 

## Mô tả và kết quả

 | 

## Ưu tiên

 | 

## Trạng thái

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-PD4-01

 | 

## Cập nhật tình trạng xét duyệt

 | 

## P.KHCN

 | 

## P.KHCN cập nhật tình trạng xét duyệt của cơ quan quản lý (đang xét, được phê duyệt, không được phê duyệt). Kết quả: Trạng thái đề tài phản ánh đúng tiến trình xét duyệt.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-PD4-02

 | 

## Lưu bản sao hồ sơ được phê duyệt

 | 

## CNĐT/P.KHCN

 | 

## CNĐT gửi bản sao toàn bộ hồ sơ đã được cơ quan quản lý phê duyệt cho P.KHCN lưu quản lý. Kết quả: Hồ sơ đã duyệt được lưu trữ nội bộ.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-PD4-03

 | 

## Tham mưu ra quyết định giao nhiệm vụ

 | 

## P.KHCN

 | 

## P.KHCN tham mưu BGH ra quyết định giao nhiệm vụ thực hiện đề tài cho CNĐT. Kết quả: Quyết định giao nhiệm vụ được lưu và đề tài chuyển trạng thái Đang thực hiện.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-PD4-04

 | 

## Xem/tải kết quả phê duyệt và giao nhiệm vụ

 | 

## CNĐT/P.KHCN

 | 

## Người có quyền xem/tải quyết định phê duyệt và giao nhiệm vụ của đề tài. Kết quả: Có căn cứ để triển khai bước tiếp theo.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |

## **3.2.3. Trường dữ liệu chính**

| 
## STT

 | 

## Nhóm dữ liệu

 | 

## Mô tả

 |
| --- | --- | --- |
| 

## 1

 | 

## Tình trạng xét duyệt

 | 

## Đang xét/Được phê duyệt/Không được phê duyệt, ngày cập nhật.

 |
| --- | --- | --- |
| 

## 2

 | 

## Hồ sơ đã phê duyệt

 | 

## Tệp hồ sơ, số quyết định phê duyệt của cơ quan quản lý, kinh phí được duyệt.

 |
| --- | --- | --- |
| 

## 3

 | 

## Quyết định giao nhiệm vụ

 | 

## Số quyết định, ngày ký, người ký, mã số đề tài chính thức.

 |
| --- | --- | --- |

## **3.2.4. Quy tắc nghiệp vụ**

| 
## Mã BR

 | 

## Quy tắc

 | 

## UC liên quan

 |
| --- | --- | --- |
| 

## BR-M02-01

 | 

## Đề tài chỉ chuyển trạng thái Đang thực hiện sau khi có cả kết quả phê duyệt của cơ quan quản lý và quyết định giao nhiệm vụ của Trường.

 | 

## UC-PD4-03

 |
| --- | --- | --- |
| 

## BR-M02-02

 | 

## Trường hợp không được phê duyệt, đề tài kết thúc và không phát sinh các bước tiếp theo trong hệ thống.

 | 

## UC-PD4-01

 |
| --- | --- | --- |

## **3.2.5. Kết quả đầu ra**

## • UC-PD4-01: Trạng thái đề tài phản ánh đúng tiến trình xét duyệt.

## • UC-PD4-02: Hồ sơ đã duyệt được lưu trữ nội bộ.

## • UC-PD4-03: Quyết định giao nhiệm vụ được lưu và đề tài chuyển trạng thái Đang thực hiện.

## • UC-PD4-04: Có căn cứ để triển khai bước tiếp theo.

## **3.2.6. Tiêu chí nghiệm thu**

| 
## Mã AC

 | 

## UC

 | 

## Tiêu chí nghiệm thu

 |
| --- | --- | --- |
| 

## AC-UC-PD4-01

 | 

## UC-PD4-01 d

 | 

## Khi P.KHCN cập nhật tình trạng hợp lệ, hệ thống lưu ấu vết thay đổi trạng thái đề tài.

 |
| --- | --- | --- |
| 

## AC-UC-PD4-02

 | 

## UC-PD4-02 l

 | 

## Khi CNĐT/P.KHCN tải hồ sơ đã duyệt hợp lệ, hệ thống ưu tệp và liên kết với đề tài tương ứng.

 |
| --- | --- | --- |
| 

## AC-UC-PD4-03

 | 

## UC-PD4-03 t

 | 

## Khi P.KHCN xác nhận quyết định giao nhiệm vụ, hệ hống chuyển đề tài sang trạng thái Đang thực hiện.

 |
| --- | --- | --- |
| 

## AC-UC-PD4-04

 | 

## UC-PD4-04 c

 | 

## Khi actor có quyền truy cập, hệ thống hiển thị và ho phép tải kết quả phê duyệt/giao nhiệm vụ.

 |
| --- | --- | --- |

## **3.3. Module M03 - Theo dõi tiến độ thực hiện đề tài**

## **3.3.1. Mô tả chức năng**

## Module M03 nhóm 3 yêu cầu liên quan đến việc CNĐT báo cáo và P.KHCN theo dõi tiến độ thực hiện đề tài. Actor tham gia: CNĐT; P.KHCN.

## **3.3.2. Yêu cầu chức năng**

| 
## Mã YC

 | 

## Tên chức năng

 | 

## Actor

 | 

## Mô tả và kết quả

 | 

## Ưu tiên

 | 

## Trạng thái

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-TD4-01

 | 

## Lập và nộp Báo cáo tình hình thực hiện (BM01)

 | 

## CNĐT

 | 

## CNĐT lập và nộp Báo cáo tình hình thực hiện (BM01) theo tiến độ Thuyết minh/Hợp đồng, gồm nội dung nghiên cứu, sản phẩm, chi phí. Kết quả: Báo cáo tiến độ được lưu.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-TD4-02

 | 

## Xem/tải báo cáo tiến độ

 | 

## P.KHCN/ CNĐT

 | 

## Người có quyền xem/tải báo cáo tình hình thực hiện của đề tài. Kết quả: Có căn cứ theo dõi tiến độ.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-TD4-03

 | 

## Theo dõi và cảnh báo trễ hạn báo cáo

 | 

## P.KHCN

 | 

## P.KHCN theo dõi tổng hợp tiến độ báo cáo của các đề b tài, cảnh báo khi CNĐT chưa nộp báo cáo đúng hạn. Kết quả: P.KHCN nắm được đề tài chậm tiến độ.

 | 

## Trung ình

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |

## **3.3.3. Trường dữ liệu chính**

| 
## STT

 | 

## Nhóm dữ liệu

 | 

## Mô tả

 |
| --- | --- | --- |
| 

## 1

 | 

## BM01

 | 

## Nội dung nghiên cứu theo thuyết minh, tiến độ thực hiện, nội dung đã thực hiện, sản phẩm khoa học/đào tạo/ứng dụng/tài sản trí tuệ, chi phí được cấp/đã chi/đã quyết toán, kế hoạch tiếp theo, kiến nghị.

 |
| --- | --- | --- |
| 

## 2

 | 

## Lịch báo cáo

 | 

## Mốc báo cáo theo Thuyết minh/Hợp đồng; cụ thể từng chương trình cần xác minh.

 |
| --- | --- | --- |

## **3.3.4. Quy tắc nghiệp vụ**

| 
## Mã BR

 | 

## Quy tắc

 | 

## UC liên quan

 |
| --- | --- | --- |
| 

## BR-M03-01

 | 

## Báo cáo tiến độ (BM01) nộp theo mốc quy định trong Thuyết minh/Hợp đồng của từng chương trình; hệ thống không tự động hóa mốc cụ thể của từng cơ quan quản lý mà chỉ theo cấu hình do P.KHCN nhập.

 | 

## UC-TD4-01, UC-TD4-03

 |
| --- | --- | --- |
| 

## BR-M03-02

 | 

## Mục Kế hoạch triển khai tiếp theo trong BM01 không bắt buộc khi báo cáo ở giai đoạn nghiệm thu.

 | 

## UC-TD4-01

 |
| --- | --- | --- |

## **3.3.5. Kết quả đầu ra**

## • UC-TD4-01: Báo cáo tiến độ được lưu.

## • UC-TD4-02: Có căn cứ theo dõi tiến độ.

## • UC-TD4-03: P.KHCN nắm được đề tài chậm tiến độ.

## **3.3.6. Tiêu chí nghiệm thu**

| 
## Mã AC

 | 

## UC

 | 

## Tiêu chí nghiệm thu

 |
| --- | --- | --- |
| 

## AC-UC-TD4-01

 | 

## UC-TD4-01 l

 | 

## Khi CNĐT nộp BM01 đầy đủ trường bắt buộc, hệ thống ưu báo cáo và gắn với đúng đề tài.

 |
| --- | --- | --- |
| 

## AC-UC-TD4-02

 | 

## UC-TD4-02 c

 | 

## Khi actor có quyền truy cập, hệ thống hiển thị và ho phép tải báo cáo tiến độ.

 |
| --- | --- | --- |
| 

## AC-UC-TD4-03

 | 

## UC-TD4-03 t

 | 

## Khi quá mốc báo cáo đã cấu hình mà chưa nộp, hệ hống hiển thị cảnh báo cho P.KHCN.

 |
| --- | --- | --- |

## **3.4. Module M04 - Nghiệm thu cấp cơ sở**

## **3.4.1. Mô tả chức năng**

## Module M04 nhóm 6 yêu cầu liên quan đến việc tổ chức và thực hiện nghiệm thu cấp cơ sở tại Trường trước khi trình nghiệm thu cấp trên. Actor tham gia: CNĐT; P.KHCN; BGH; Thành viên Hội đồng nghiệm thu cơ sở (HĐNT).

## **3.4.2. Yêu cầu chức năng**

| 
## Mã YC

 | 

## Tên chức năng

 | 

## Actor

 | 

## Mô tả và kết quả

 | 

## Ưu tiên

 | 

## Trạng thái

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-NT4-01

 | 

## Nộp Phiếu đề nghị nghiệm thu cấp cơ sở (BM02)

 | 

## CNĐT

 | 

## CNĐT nộp Phiếu đề nghị nghiệm thu cấp cơ sở (BM02) kèm báo cáo tổng kết, báo cáo tóm tắt và sản phẩm đề tài. Kết quả: Hồ sơ chuyển trạng thái Chờ nghiệm thu cơ sở.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-NT4-02

 | 

## Tham mưu ra Quyết định thành lập HĐNT (BM03)

 | 

## P.KHCN

 | 

## P.KHCN xem xét hồ sơ và tham mưu BGH ra Quyết định thành lập Hội đồng nghiệm thu cơ sở (BM03). Kết quả: Hội đồng nghiệm thu cơ sở được thành lập.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-NT4-03

 | 

## Xem hồ sơ phục vụ đánh giá nghiệm thu cơ sở

 | 

## Thành viên HĐNT

 | 

## Thành viên HĐNT xem hồ sơ nghiệm thu để phục vụ đánh giá. Kết quả: Thành viên có đủ thông tin để đánh giá.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-NT4-04

 | 

## Lập và nộp Phiếu đánh giá (BM04)

 | 

## Thành viên HĐNT

 | 

## Thành viên HĐNT lập và nộp Phiếu đánh giá kết quả thực hiện đề tài (BM04) theo từng sản phẩm. Kết quả: Phiếu đánh giá được lưu.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-NT4-05

 | 

## Lập và ký Biên bản họp Hội đồng (BM05)

 | 

## P.KHCN/ Chủ tịch HĐNT

 | 

## P.KHCN/Chủ tịch Hội đồng lập Biên bản họp Hội đồng đánh giá, nghiệm thu (BM05) kèm kết luận đạt/không đạt. Kết quả: Biên bản nghiệm thu cơ sở được lưu.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-NT4-06

 | 

## Xử lý kết luận không đạt nghiệm thu cơ sở

 | 

## CNĐT/P.KHCN

 | 

## Trường hợp không đạt, CNĐT chỉnh sửa theo kiến nghị của Hội đồng và nộp lại hồ sơ. Kết quả: Hồ sơ được xử lý theo đúng kết luận Hội đồng.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |

## **3.4.3. Trường dữ liệu chính**

| 
## STT

 | 

## Nhóm dữ liệu

 | 

## Mô tả

 |
| --- | --- | --- |
| 

## 1

 | 

## BM02

 | 

## Họ tên CNĐT, mã số đề tài, tên đề tài, thời gian thực hiện, thời gian/địa điểm nghiệm thu dự kiến, danh sách giới thiệu thành viên Hội đồng.

 |
| --- | --- | --- |
| 

## 2

 | 

## BM03

 | 

## Danh sách thành viên Hội đồng nghiệm thu cơ sở kèm vai trò (Chủ tịch, Phản biện, Ủy viên, Thư ký), số quyết định, ngày ký.

 |
| --- | --- | --- |
| 

## 3

 | 

## BM04

 | 

## Đánh giá số lượng/khối lượng sản phẩm và chất lượng sản phẩm theo Thuyết minh, xếp loại đề tài (Đạt/Đạt cần chỉnh sửa/Không đạt), ý kiến khác.

 |
| --- | --- | --- |
| 

## 4

 | 

## BM05

 | 

## Thông tin buổi họp, số thành viên có mặt/vắng mặt, kết luận đánh giá xếp loại, kiến nghị chỉnh sửa, chuyển giao/công bố kết quả.

 |
| --- | --- | --- |

## **3.4.4. Quy tắc nghiệp vụ**

| 
## Mã BR

 | 

## Quy tắc

 | 

## UC liên quan

 |
| --- | --- | --- |
| 

## BR-M04-01

 | 

## Việc thành lập Hội đồng nghiệm thu cơ sở tuân theo hướng dẫn tại văn bản pháp quy của Bộ ngành tương ứng; hệ thống chỉ lưu danh sách và số quyết định, không tự động hóa tiêu chí lựa chọn thành viên.

 | 

## UC-NT4-02

 |
| --- | --- | --- |
| 

## BR-M04-02

 | 

## BM04 đã nộp không được sửa hoặc nộp lại; mọi điều chỉnh phải qua phiếu mới có ghi chú thay thế.

 | 

## UC-NT4-04

 |
| --- | --- | --- |
| 

## BR-M04-03

 | 

## Kết luận Hội đồng cơ sở tại BM05 quyết định đề tài có được chuyển tiếp hồ sơ nghiệm thu cấp Tỉnh/Bộ/Nhà nước hay phải chỉnh sửa, nộp lại.

 | 

## UC-NT4-05, UC-NT4-06

 |
| --- | --- | --- |

## **3.4.5. Kết quả đầu ra**

## • UC-NT4-01: Hồ sơ chuyển trạng thái Chờ nghiệm thu cơ sở.

## • UC-NT4-02: Hội đồng nghiệm thu cơ sở được thành lập.

## • UC-NT4-03: Thành viên có đủ thông tin để đánh giá.

## • UC-NT4-04: Phiếu đánh giá được lưu.

## • UC-NT4-05: Biên bản nghiệm thu cơ sở được lưu.

## • UC-NT4-06: Hồ sơ được xử lý theo đúng kết luận Hội đồng.

## **3.4.6. Tiêu chí nghiệm thu**

| 
## Mã AC

 | 

## UC

 | 

## Tiêu chí nghiệm thu

 |
| --- | --- | --- |
| 

## AC-UC-NT4-01

 | 

## UC-NT4-01 t

 | 

## Khi CNĐT nộp BM02 kèm đầy đủ hồ sơ, hệ thống chuyển rạng thái đề tài và lưu dấu vết thời điểm nộp.

 |
| --- | --- | --- |
| 

## AC-UC-NT4-02

 | 

## UC-NT4-02 t v

 | 

## Khi P.KHCN xác nhận danh sách Hội đồng hợp lệ, hệ hống lưu BM03 và cấp quyền xem hồ sơ cho thành iên.

 |
| --- | --- | --- |
| 

## AC-UC-NT4-03

 | 

## UC-NT4-03 h

 | 

## Khi thành viên HĐNT truy cập đúng quyền, hệ thống iển thị đầy đủ hồ sơ nghiệm thu cần đánh giá.

 |
| --- | --- | --- |
| 

## AC-UC-NT4-04

 | 

## UC-NT4-04 p

 | 

## Khi thành viên HĐNT nộp BM04 hợp lệ, hệ thống khóa hiếu và lưu dấu vết không cho sửa/nộp lại.

 |
| --- | --- | --- |
| 

## AC-UC-NT4-05

 | 

## UC-NT4-05 c

 | 

## Khi biên bản BM05 được lập và xác nhận, hệ thống ập nhật kết luận nghiệm thu cơ sở của đề tài.

 |
| --- | --- | --- |
| 

## AC-UC-NT4-06

 | 

## UC-NT4-06 s

 | 

## Khi kết luận không đạt, hệ thống yêu cầu CNĐT chỉnh ửa và nộp lại theo đúng kiến nghị đã ghi nhận.

 |
| --- | --- | --- |

## **3.5. Module M05 - Hỗ trợ hồ sơ nghiệm thu cấp Tỉnh, Bộ/Nhà nước**

## **3.5.1. Mô tả chức năng**

## Module M05 nhóm 3 yêu cầu liên quan đến việc P.KHCN hỗ trợ CNĐT lập hồ sơ đề nghị nghiệm thu chính thức tại cơ quan quản lý cấp trên. Actor tham gia: P.KHCN; CNĐT; Cơ quan quản lý; P.KT-TC.

## **3.5.2. Yêu cầu chức năng**

| 
## Mã YC

 | 

## Tên chức năng

 | 

## Actor

 | 

## Mô tả và kết quả

 | 

## Ưu tiên

 | 

## Trạng thái

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-CT4-01

 | 

## Lập hồ sơ nghiệm thu cấp trên theo hướng dẫn Bộ ngành

 | 

## P.KHCN/ CNĐT

 | 

## P.KHCN hỗ trợ CNĐT lập hồ sơ đề nghị nghiệm thu cấp Tỉnh, Bộ/Nhà nước theo hướng dẫn văn bản pháp quy của Bộ ngành. Kết quả: Hồ sơ nghiệm thu cấp trên được chuẩn bị.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-CT4-02

 | 

## Trình BGH phê duyệt hồ sơ nghiệm thu cấp trên

 | 

## P.KHCN

 | 

## P.KHCN trình BGH xem xét và phê duyệt hồ sơ trước khi gửi cơ quan quản lý. Kết quả: Hồ sơ được BGH phê duyệt để gửi đi.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-CT4-03

 | 

## Theo dõi kết quả nghiệm thu cấp trên

 | 

## P.KHCN/ P.KT-TC

 | 

## P.KHCN/P.KT-TC theo dõi kết quả nghiệm thu chính thức tại cơ quan quản lý. Kết quả: Đề tài chuyển trạng thái theo kết quả nghiệm thu cấp trên.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |

## **3.5.3. Trường dữ liệu chính**

| 
## STT

 | 

## Nhóm dữ liệu

 | 

## Mô tả

 |
| --- | --- | --- |
| 

## 1

 | 

## Hồ sơ nghiệm thu cấp trên

 | 

## Cấu trúc và nội dung theo hướng dẫn của từng Bộ ngành; hệ thống lưu tệp tổng hợp, không chuẩn hóa mẫu chi tiết.

 |
| --- | --- | --- |
| 

## 2

 | 

## Kết quả nghiệm thu cấp trên

 | 

## Đạt/Không đạt, số quyết định công nhận kết quả, ngày ban hành.

 |
| --- | --- | --- |

## **3.5.4. Quy tắc nghiệp vụ**

| 
## Mã BR

 | 

## Quy tắc

 | 

## UC liên quan

 |
| --- | --- | --- |
| 

## BR-M05-01

 | 

## Hồ sơ nghiệm thu cấp trên chỉ được lập sau khi đề tài đã đạt nghiệm thu cấp cơ sở.

 | 

## UC-CT4-01

 |
| --- | --- | --- |
| 

## BR-M05-02

 | 

## Hồ sơ nghiệm thu cấp trên phải được BGH phê duyệt trước khi gửi cơ quan quản lý.

 | 

## UC-CT4-02

 |
| --- | --- | --- |

## **3.5.5. Kết quả đầu ra**

## • UC-CT4-01: Hồ sơ nghiệm thu cấp trên được chuẩn bị.

## • UC-CT4-02: Hồ sơ được BGH phê duyệt để gửi đi.

## • UC-CT4-03: Đề tài chuyển trạng thái theo kết quả nghiệm thu cấp trên.

## **3.5.6. Tiêu chí nghiệm thu**

| 
## Mã AC

 | 

## UC

 | 

## Tiêu chí nghiệm thu

 |
| --- | --- | --- |
| 

## AC-UC-CT4-01

 | 

## UC-CT4-01 p

 | 

## Khi đề tài đã đạt nghiệm thu cơ sở, hệ thống cho hép lập hồ sơ nghiệm thu cấp trên.

 |
| --- | --- | --- |
| 

## AC-UC-CT4-02

 | 

## UC-CT4-02 b

 | 

## Khi BGH phê duyệt, hệ thống lưu dấu vết và mở khóa ước gửi hồ sơ đến cơ quan quản lý.

 |
| --- | --- | --- |
| 

## AC-UC-CT4-03

 | 

## UC-CT4-03 c t

 | 

## Khi P.KHCN/P.KT-TC cập nhật kết quả, hệ thống huyển trạng thái đề tài đúng theo kết quả nghiệm hu cấp trên.

 |
| --- | --- | --- |

## **3.6. Module M06 - Hoàn thiện báo cáo sau nghiệm thu và lưu hồ sơ**

## **3.6.1. Mô tả chức năng**

## Module M06 nhóm 3 yêu cầu liên quan đến việc hoàn thiện báo cáo tổng kết sau nghiệm thu cấp trên và lưu trữ hồ sơ. Actor tham gia: CNĐT; P.KHCN; P.KT-TC.

## **3.6.2. Yêu cầu chức năng**

| 
## Mã YC

 | 

## Tên chức năng

 | 

## Actor

 | 

## Mô tả và kết quả

 | 

## Ưu tiên

 | 

## Trạng thái

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-HT4-01

 | 

## Chỉnh sửa báo cáo tổng kết và hoàn chỉnh sản phẩm

 | 

## CNĐT

 | 

## CNĐT chỉnh sửa báo cáo tổng kết và hoàn chỉnh sản phẩm đề tài theo yêu cầu của cơ quan quản lý cấp trên (nếu có). Kết quả: Báo cáo tổng kết hoàn chỉnh được lưu.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-HT4-02

 | 

## Gửi bản sao quyết định công nhận và biên bản nghiệm thu

 | 

## CNĐT/P.KHCN

 | 

## CNĐT gửi bản sao quyết định công nhận kết quả và biên bản nghiệm thu chính thức cho P.KHCN. Kết quả: Hồ sơ hoàn tất được lưu quản lý.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-HT4-03

 | 

## Lưu trữ hồ sơ tổng hợp

 | 

## P.KHCN

 | 

## P.KHCN lưu trữ toàn bộ hồ sơ đề tài (đăng ký, phê duyệt, tiến độ, nghiệm thu cơ sở, nghiệm thu cấp trên, công nhận kết quả). Kết quả: Hồ sơ được lưu trữ đầy đủ.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |

## **3.6.3. Trường dữ liệu chính**

| 
## STT

 | 

## Nhóm dữ liệu

 | 

## Mô tả

 |
| --- | --- | --- |
| 

## 1

 | 

## Báo cáo tổng kết hoàn chỉnh

 | 

## Nội dung điều chỉnh theo góp ý cơ quan quản lý, tệp báo cáo cuối cùng.

 |
| --- | --- | --- |
| 

## 2

 | 

## Quyết định công nhận kết quả

 | 

## Số quyết định, ngày ban hành, cơ quan ban hành, tệp đính kèm.

 |
| --- | --- | --- |
| 

## 3

 | 

## Hồ sơ lưu trữ tổng hợp

 | 

## Toàn bộ tệp và dữ liệu từ Module M01-M05 gắn với từng đề tài.

 |
| --- | --- | --- |

## **3.6.4. Quy tắc nghiệp vụ**

| 
## Mã BR

 | 

## Quy tắc

 | 

## UC liên quan

 |
| --- | --- | --- |
| 

## BR-M06-01

 | 

## Đề tài chuyển trạng thái Hoàn tất chỉ sau khi có quyết định công nhận kết quả chính thức của cơ quan quản lý cấp trên.

 | 

## UC-HT4-02

 |
| --- | --- | --- |
| 

## BR-M06-02

 | 

## Dữ liệu lưu trữ không được xóa bởi chức năng nghiệp vụ thông thường; chỉ vô hiệu hóa theo quy trình quản trị dữ liệu.

 | 

## UC-HT4-03

 |
| --- | --- | --- |

## **3.6.5. Kết quả đầu ra**

## • UC-HT4-01: Báo cáo tổng kết hoàn chỉnh được lưu.

## • UC-HT4-02: Hồ sơ hoàn tất được lưu quản lý.

## • UC-HT4-03: Hồ sơ được lưu trữ đầy đủ.

## **3.6.6. Tiêu chí nghiệm thu**

| 
## Mã AC

 | 

## UC

 | 

## Tiêu chí nghiệm thu

 |
| --- | --- | --- |
| 

## AC-UC-HT4-01

 | 

## UC-HT4-01 l

 | 

## Khi CNĐT nộp báo cáo tổng kết hoàn chỉnh, hệ thống ưu và đánh dấu là bản chính thức.

 |
| --- | --- | --- |
| 

## AC-UC-HT4-02

 | 

## UC-HT4-02 n H

 | 

## Khi P.KHCN nhận đủ quyết định công nhận và biên bản ghiệm thu, hệ thống chuyển đề tài sang trạng thái oàn tất.

 |
| --- | --- | --- |
| 

## AC-UC-HT4-03

 | 

## UC-HT4-03 đ

 | 

## Khi actor có quyền tra cứu, hệ thống hiển thị đầy ủ hồ sơ tổng hợp của đề tài theo đúng phân quyền.

 |
| --- | --- | --- |

## **3.7. Module M07 - Actor, phân quyền và truy cập**

## **3.7.1. Mô tả chức năng**

## Module M07 nhóm 2 yêu cầu liên quan đến quản lý actor và phân quyền dùng chung cho toàn phân hệ. Actor tham gia: Tất cả actor của phân hệ.

## **3.7.2. Yêu cầu chức năng**

| 
## Mã YC

 | 

## Tên chức năng

 | 

## Actor

 | 

## Mô tả và kết quả

 | 

## Ưu tiên

 | 

## Trạng thái

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-ACT4-01

 | 

## Sử dụng quyền theo a vai trò nghiệp vụ được cấp

 | 

## Tất cả ctor

 | 

## Người dùng chỉ thao tác C được các chức năng thuộc vai trò nghiệp vụ được cấp. Kết quả: Truy cập đúng phạm vi vai trò.

 | 

## ao Đ

 | 

## ề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-ACT4-02

 | 

## Sử dụng vai trò kép P.KHCN/Thư ký Hội đồng nghiệm thu c sở

 | 

## P.KHCN

 | 

## P.KHCN có thể đồng thời giữ vai trò cán bộ xử lý hồ sơ và vai trò hỗ trợ Hội đồng nghiệm thu cơ sở trên cùng tài khoản. Kết quả: Một tài khoản có thể thực hiện cả hai vai trò theo đúng ngữ cảnh.

 | 

## Trung bình

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |

## **3.7.3. Trường dữ liệu chính**

| 
## STT

 | 

## Nhóm dữ liệu

 | 

## Mô tả

 |
| --- | --- | --- |
| 

## 1

 | 

## Vai trò người dùng

 | 

## Danh sách vai trò được gán cho từng tài khoản.

 |
| --- | --- | --- |
| 

## 2

 | 

## Phạm vi truy cập

 | 

## Đề tài, hồ sơ mà tài khoản được phép xem/thao tác.

 |
| --- | --- | --- |

## **3.7.4. Quy tắc nghiệp vụ**

| 
## Mã BR

 | 

## Quy tắc

 | 

## UC liên quan

 |
| --- | --- | --- |
| 

## BR-M07-01

 | 

## Một tài khoản có thể được gán nhiều vai trò; hệ thống áp dụng quyền theo vai trò đang sử dụng trong từng thao tác cụ thể.

 | 

## UC-ACT4-01, UC-ACT4-02

 |
| --- | --- | --- |

## **3.7.5. Kết quả đầu ra**

## • UC-ACT4-01: Truy cập đúng phạm vi vai trò.

## • UC-ACT4-02: Một tài khoản có thể thực hiện cả hai vai trò theo đúng ngữ cảnh.

## **3.7.6. Tiêu chí nghiệm thu**

| 
## Mã AC

 | 

## UC

 | 

## Tiêu chí nghiệm thu

 |
| --- | --- | --- |
| 

## AC-UC-ACT4-0

 | 

# 1 UC-ACT4-01 đ c

 | 

## Khi người dùng thực hiện chức năng ngoài vai trò ược cấp, hệ thống từ chối và ghi nhận nỗ lực truy ập.

 |
| --- | --- | --- |
| 

## AC-UC-ACT4-0

 | 

# 2 UC-ACT4-02 p

 | 

## Khi P.KHCN dùng vai trò hỗ trợ Hội đồng, hệ thống hân biệt rõ thao tác theo vai trò trong audit log.

 |
| --- | --- | --- |

## **3.8. Module M08 - Thông báo và truy vết**

## **3.8.1. Mô tả chức năng**

## Module M08 nhóm 2 yêu cầu liên quan đến thông báo trạng thái và truy vết thao tác. Actor tham gia: Tất cả actor của phân hệ.

## **3.8.2. Yêu cầu chức năng**

| 
## Mã YC

 | 

## Tên chức năng

 | 

## Actor

 | 

## Mô tả và kết quả

 | 

## Ưu tiên

 | 

## Trạng thái

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-TB4-01

 | 

## Nhận thông báo chuyển trạng thái đề tài

 | 

## Actor liên quan

 | 

## Actor liên quan nhận thông báo trong ứng dụng khi đề tài chuyển trạng thái (được phê duyệt, giao nhiệm vụ, đạt/không đạt nghiệm thu cơ sở, hoàn tất). Kết quả: Actor biết kịp thời để xử lý bước tiếp theo.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## UC-TB4-02

 | 

## Theo dõi trạng thái đề tài và biểu mẫu

 | 

## Tất cả actor theo quyền

 | 

## Người dùng theo dõi trạng thái xử lý đề tài và biểu mẫu của mình theo đúng phân quyền. Kết quả: Người dùng nắm được tiến độ xử lý hồ sơ.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |

## **3.8.3. Trường dữ liệu chính**

| 
## STT

 | 

## Nhóm dữ liệu

 | 

## Mô tả

 |
| --- | --- | --- |
| 

## 1

 | 

## Thông báo trong ứng dụng

 | 

## Nội dung, thời điểm, actor nhận, trạng thái đã đọc/chưa đọc.

 |
| --- | --- | --- |
| 

## 2

 | 

## Audit log

 | 

## Actor, thời điểm, hành động, đối tượng, trạng thái trước/sau.

 |
| --- | --- | --- |

## **3.8.4. Quy tắc nghiệp vụ**

| 
## Mã BR

 | 

## Quy tắc

 | 

## UC liên quan

 |
| --- | --- | --- |
| 

## BR-M08-01

 | 

## Thông báo chỉ hiển thị trong ứng dụng ở phiên bản đầu; không tích hợp email/SMS.

 | 

## UC-TB4-01

 |
| --- | --- | --- |
| 

## BR-M08-02

 | 

## Audit log là nhật ký chỉ thêm mới, không được sửa/xóa bởi chức năng nghiệp vụ.

 | 

## UC-TB4-01, UC-TB4-02

 |
| --- | --- | --- |

## **3.8.5. Kết quả đầu ra**

## • UC-TB4-01: Actor biết kịp thời để xử lý bước tiếp theo.

## • UC-TB4-02: Người dùng nắm được tiến độ xử lý hồ sơ.

## **3.8.6. Tiêu chí nghiệm thu**

| 
## Mã AC

 | 

## UC

 | 

## Tiêu chí nghiệm thu

 |
| --- | --- | --- |
| 

## AC-UC-TB4-01

 | 

## UC-TB4-01 t

 | 

## Khi đề tài chuyển trạng thái, hệ thống gửi thông báo rong ứng dụng đến đúng actor liên quan.

 |
| --- | --- | --- |
| 

## AC-UC-TB4-02

 | 

## UC-TB4-02 t

 | 

## Khi actor truy cập đúng quyền, hệ thống hiển thị rạng thái đề tài/biểu mẫu hiện tại chính xác.

 |
| --- | --- | --- |

## **CHƯƠNG 4: YÊU CẦU PHI CHỨC NĂNG**

| 
## Mã NFR

 | 

## Nhóm

 | 

## Yêu cầu

 | 

## Ưu tiên

 | 

## Trạng thái

 |
| --- | --- | --- | --- | --- |
| 

## NFR-SEC-01

 | 

## Bảo mật và phân quyền

 | 

## Người dùng chỉ được xem, tải và thao tác dữ liệu thuộc vai trò và phạm vi được phân công.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- |
| 

## NFR-AUD-01

 | 

## Lưu vết

 | 

## Audit log được lưu theo cơ chế chỉ thêm mới; tối thiểu gồm actor, thời điểm, hành động, đối tượng, trạng thái trước/sau và lý do.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- |
| 

## NFR-DOC-01

 | 

## Tài liệu

 | 

## Hệ thống kiểm soát định dạng, phiên bản và quyền xem/tải hồ sơ theo vai trò và trạng thái.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- |
| 

## NFR-REL-01

 | 

## Sao lưu/khôi phục

 | 

## Dữ liệu và tệp phải được sao lưu và có khả năng khôi phục khi xảy ra sự cố; RPO/RTO cần xác minh.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- |
| 

## NFR-UX-01

 | 

## Khả dụng giao diện

 | 

## Giao diện sử dụng được trên máy tính và điện thoại, hỗ trợ các trình duyệt hiện hành; danh sách phiên bản trình duyệt cần xác minh.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- |
| 

## NFR-DAT-01

 | 

## Toàn vẹn dữ liệu

 | 

## Khi nhiều actor cùng thao tác trên cùng một đề tài (ví dụ nhiều thành viên HĐNT nộp BM04), hệ thống không làm mất, ghi trùng hoặc gán sai dữ liệu.

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- |

## **4.1. Các chỉ số cần xác minh**

## • Số người dùng đồng thời và thời gian phản hồi mục tiêu.

## • Dung lượng tệp tối đa và định dạng cho từng BM tải hoàn chỉnh.

## • Chu kỳ sao lưu, thời gian lưu bản sao, RPO và RTO.

## • Danh sách trình duyệt/phiên bản tối thiểu được hỗ trợ.

## • Danh mục các chương trình/cơ quan quản lý (Bộ, Quỹ, Tỉnh/Thành phố) được hỗ trợ cấu hình mẫu hồ sơ.

## **CHƯƠNG 5: BẢNG TỔNG HỢP VÀ TRUY VẾT**

## **5.1. Tổng hợp yêu cầu theo module**

| 
## Module

 | 

## Tên module

 | 

## Số YC

 | 

## Mã YC

 | 

## Ưu tiên

 | 

## Trạng thái

 |
| --- | --- | --- | --- | --- | --- |
| 

## M01

 | 

## Tiếp nhận thông báo và tổng hợp hồ sơ đăng ký

 | 

## 5

 | 

## UC-DK4-01…UC-DK4-05

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## M02

 | 

## Theo dõi phê duyệt và ra quyết định giao nhiệm vụ

 | 

## 4

 | 

## UC-PD4-01…UC-PD4-04

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## M03

 | 

## Theo dõi tiến độ thực hiện đề tài

 | 

## 3

 | 

## UC-TD4-01…UC-TD4-03

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## M04

 | 

## Nghiệm thu cấp cơ sở

 | 

## 6

 | 

## UC-NT4-01…UC-NT4-06

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## M05

 | 

## Hỗ trợ hồ sơ nghiệm thu cấp Tỉnh, Bộ/Nhà nước

 | 

## 3

 | 

## UC-CT4-01…UC-CT4-03

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## M06

 | 

## Hoàn thiện báo cáo sau nghiệm thu và lưu hồ sơ

 | 

## 3

 | 

## UC-HT4-01…UC-HT4-03

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## M07

 | 

## Actor, phân quyền và truy cập

 | 

## 2

 | 

## UC-ACT4-01…UC-ACT4-02

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |
| 

## M08

 | 

## Thông báo và truy vết

 | 

## 2

 | 

## UC-TB4-01…UC-TB4-02

 | 

## Cao

 | 

## Đề xuất

 |
| --- | --- | --- | --- | --- | --- |

## Tổng cộng: 8 module, 28 yêu cầu chức năng trong phạm vi và 6 yêu cầu phi chức năng.

## **5.2. Ma trận UCTQ - UCCT - module - biểu mẫu**

| 
## UCTQ

 | 

## UCCT

 | 

## Tên yêu cầu

 | 

## Module

 | 

## BM

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-01

 | 

## UC-DK4-01

 | 

## Ghi nhận thông báo mời đăng ký

 | 

## M01

 | 

## —

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-01

 | 

## UC-DK4-02

 | 

## Công bố thông báo đến các đơn vị

 | 

## M01

 | 

## —

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-02

 | 

## UC-DK4-03

 | 

## Lập hồ sơ đăng ký đề tài

 | 

## M01

 | 

## —

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-02

 | 

## UC-DK4-04

 | 

## Trình BGH ký duyệt hồ sơ đăng ký

 | 

## M01

 | 

## —

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-02

 | 

## UC-DK4-05

 | 

## Gửi hồ sơ đến cơ quan quản lý trước hạn

 | 

## M01

 | 

## —

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-03

 | 

## UC-PD4-01

 | 

## Cập nhật tình trạng xét duyệt

 | 

## M02

 | 

## —

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-04

 | 

## UC-PD4-02

 | 

## Lưu bản sao hồ sơ được phê duyệt

 | 

## M02

 | 

## —

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-04

 | 

## UC-PD4-03

 | 

## Tham mưu ra quyết định giao nhiệm vụ

 | 

## M02

 | 

## —

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-04

 | 

## UC-PD4-04

 | 

## Xem/tải kết quả phê duyệt và giao nhiệm vụ

 | 

## M02

 | 

## —

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-05

 | 

## UC-TD4-01

 | 

## Lập và nộp Báo cáo tình hình thực hiện (BM01)

 | 

## M03

 | 

## BM01

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-05

 | 

## UC-TD4-02

 | 

## Xem/tải báo cáo tiến độ

 | 

## M03

 | 

## BM01

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-05

 | 

## UC-TD4-03

 | 

## Theo dõi và cảnh báo trễ hạn báo cáo

 | 

## M03

 | 

## BM01

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-06

 | 

## UC-NT4-01

 | 

## Nộp Phiếu đề nghị nghiệm thu cấp cơ sở (BM02)

 | 

## M04

 | 

## BM02

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-07

 | 

## UC-NT4-02

 | 

## Tham mưu ra Quyết định thành lập HĐNT (BM03)

 | 

## M04

 | 

## BM03

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-08

 | 

## UC-NT4-03

 | 

## Xem hồ sơ phục vụ đánh giá nghiệm thu cơ sở

 | 

## M04

 | 

## BM02

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-08

 | 

## UC-NT4-04

 | 

## Lập và nộp Phiếu đánh giá (BM04)

 | 

## M04

 | 

## BM04

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-08

 | 

## UC-NT4-05

 | 

## Lập và ký Biên bản họp Hội đồng (BM05)

 | 

## M04

 | 

## BM05

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-10

 | 

## UC-NT4-06

 | 

## Xử lý kết luận không đạt nghiệm thu cơ sở

 | 

## M04

 | 

## BM04, BM05

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-09

 | 

## UC-CT4-01

 | 

## Lập hồ sơ nghiệm thu cấp trên theo hướng dẫn Bộ ngành

 | 

## M05

 | 

## —

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-09

 | 

## UC-CT4-02

 | 

## Trình BGH phê duyệt hồ sơ nghiệm thu cấp trên

 | 

## M05

 | 

## —

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-09

 | 

## UC-CT4-03

 | 

## Theo dõi kết quả nghiệm thu cấp trên

 | 

## M05

 | 

## —

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-10

 | 

## UC-HT4-01

 | 

## Chỉnh sửa báo cáo tổng kết và hoàn chỉnh sản phẩm

 | 

## M06

 | 

## —

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-10

 | 

## UC-HT4-02

 | 

## Gửi bản sao quyết định công nhận và biên bản nghiệm thu

 | 

## M06

 | 

## —

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-10

 | 

## UC-HT4-03

 | 

## Lưu trữ hồ sơ tổng hợp

 | 

## M06

 | 

## BM01–BM05

 |
| --- | --- | --- | --- | --- |
| 

## Dùng chung

 | 

## UC-ACT4-01

 | 

## Sử dụng quyền theo vai trò nghiệp vụ được cấp

 | 

## M07

 | 

## —

 |
| --- | --- | --- | --- | --- |
| 

## UCTQ-08

 | 

## UC-ACT4-02

 | 

## Sử dụng vai trò kép P.KHCN/Thư ký Hội đồng nghiệm thu cơ sở

 | 

## M07

 | 

## BM04, BM05

 |
| --- | --- | --- | --- | --- |
| 

## Dùng chung

 | 

## UC-TB4-01

 | 

## Nhận thông báo chuyển trạng thái đề tài

 | 

## M08

 | 

## BM01–BM05

 |
| --- | --- | --- | --- | --- |
| 

## Dùng chung

 | 

## UC-TB4-02

 | 

## Theo dõi trạng thái đề tài và biểu mẫu

 | 

## M08

 | 

## BM01–BM05

 |
| --- | --- | --- | --- | --- |

## **5.3. Ma trận use case chi tiết - actor**

| 
## Mã UCCT

 | 

## Use case chi tiết

 | 

## CNĐT

 | 

## P.KHCN

 | 

## BGH

 | 

## HĐNT

 | 

## P.KT-TC

 | 

## Cơ quan quản lý

 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-DK4-01

 | 

## Ghi nhận thông báo đăng ký

 |  | 

## ✓

 |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-DK4-02

 | 

## Công bố thông báo

 |  | 

## ✓

 |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-DK4-03

 | 

## Lập hồ sơ đăng ký

 | 

## ✓

 |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-DK4-04

 | 

## Trình BGH ký duyệt

 |  | 

## ✓ ✓

 |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-DK4-05

 | 

## Gửi hồ sơ trước hạn

 | 

## ✓

 | 

## ✓

 |  |  |  | 

## (nhận hồ sơ)

 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-PD4-01

 | 

## Cập nhật tình trạng xét duyệt

 |  | 

## ✓

 |  |  |  | 

## (nguồn dữ liệu)

 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-PD4-02

 | 

## Lưu bản sao hồ sơ được phê duyệt

 | 

## ✓

 | 

## ✓

 |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-PD4-03

 | 

## Tham mưu quyết định giao nhiệm vụ

 |  | 

## ✓ ✓

 |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-PD4-04

 | 

## Xem/tải kết quả phê duyệt/giao nhiệm vụ

 | 

## ✓

 | 

## ✓

 |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-TD4-01

 | 

## Lập và nộp BM01

 | 

## ✓

 |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-TD4-02

 | 

## Xem/tải báo cáo tiến độ

 | 

## ✓

 | 

## ✓

 |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-TD4-03

 | 

## Cảnh báo trễ hạn báo cáo

 |  | 

## ✓

 |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-NT4-01

 | 

## Nộp BM02

 | 

## ✓

 |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-NT4-02

 | 

## Tham mưu Quyết định thành lập HĐNT

 |  | 

## ✓ ✓

 |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-NT4-03

 | 

## Xem hồ sơ phục vụ đánh giá

 |  |  |  | 

## ✓

 |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-NT4-04

 | 

## Lập và nộp BM04

 |  |  |  | 

## ✓

 |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-NT4-05

 | 

## Lập và ký BM05

 |  | 

## ✓

 |  | 

## ✓

 |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-NT4-06

 | 

## Xử lý kết luận không đạt

 | 

## ✓

 | 

## ✓

 |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-CT4-01

 | 

## Lập hồ sơ nghiệm thu cấp trên

 | 

## ✓

 | 

## ✓

 |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-CT4-02

 | 

## Trình BGH phê duyệt hồ sơ nghiệm thu cấp trên

 |  | 

## ✓ ✓

 |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-CT4-03

 | 

## Theo dõi kết quả nghiệm thu cấp trên

 |  | 

## ✓

 |  |  | 

## ✓

 | 

## ✓

 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-HT4-01

 | 

## Chỉnh sửa báo cáo tổng kết

 | 

## ✓

 |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-HT4-02

 | 

## Gửi bản sao quyết định công nhận

 | 

## ✓

 | 

## ✓

 |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-HT4-03

 | 

## Lưu trữ hồ sơ tổng hợp

 |  | 

## ✓

 |  |  | 

## ✓

 |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-ACT4-01

 | 

## Sử dụng quyền theo vai trò

 | 

## ✓

 | 

## ✓ ✓

 |  | 

## ✓ ✓

 |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-ACT4-02

 | 

## Sử dụng vai trò kép

 |  | 

## ✓

 |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-TB4-01

 | 

## Nhận thông báo chuyển trạng thái

 | 

## ✓

 | 

## ✓ ✓

 |  | 

## ✓ ✓

 |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 

## UC-TB4-02

 | 

## Theo dõi trạng thái đề tài/biểu mẫu

 | 

## ✓

 | 

## ✓ ✓

 |  | 

## ✓ ✓

 |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |

## Chú giải: CNĐT - Chủ nhiệm đề tài; P.KHCN - Phòng Khoa học Công nghệ; BGH - Ban giám hiệu; HĐNT - Hội đồng nghiệm thu cấp cơ sở; P.KT-TC - Phòng Kế hoạch/Tài chính - Kế toán.

## **5.4. Ma trận BM01-BM05**

| 
## BM

 | 

## Phương thức

 | 

## Actor lập/nộp

 | 

## Actor/hệ thống xử lý

 | 

## Trạng thái kết thúc

 |
| --- | --- | --- | --- | --- |
| 

## BM01

 | 

## Nhập form + tải PDF đã ký

 | 

## CNĐT

 | 

## P.KHCN theo dõi

 | 

## Đã nộp

 |
| --- | --- | --- | --- | --- |
| 

## BM02

 | 

## Nhập form + tải PDF đã ký

 | 

## CNĐT t

 | 

## P.KHCN xem xét, ham mưu BGH

 | 

## Đã nộp

 |
| --- | --- | --- | --- | --- |
| 

## BM03

 | 

## Lập trên hệ thống

 | 

## P.KHCN/BGH

 | 

## Công bố cho HĐNT

 | 

## Đã ký

 |
| --- | --- | --- | --- | --- |
| 

## BM04

 | 

## Nhập form + tải PDF/ảnh ký

 | 

## Thành viên HĐNT k

 | 

## P.KHCN tổng hợp ết luận s

 | 

## Đã nộp, không ửa lại

 |
| --- | --- | --- | --- | --- |
| 

## BM05

 | 

## Nhập form, ký ngoài và tải lại

 | 

## Chủ tịch/Thư ký HĐNT

 | 

## P.KHCN lưu, chuyển hồ sơ cấp trên

 | 

## Đã ký/Đã lưu

 |
| --- | --- | --- | --- | --- |

## **CHƯƠNG 6: PHỤ LỤC VÀ XÁC NHẬN**

## **6.1. Ký hiệu mức độ ưu tiên**

| 
## Ký hiệu

 | 

## Định nghĩa

 |
| --- | --- |
| 

## Cao

 | 

## Yêu cầu bắt buộc trong phạm vi phiên bản đầu.

 |
| --- | --- |
| 

## Trung bình

 | 

## Yêu cầu quan trọng có thể triển khai sau.

 |
| --- | --- |
| 

## Thấp

 | 

## Yêu cầu mong muốn, có thể hoãn khi hạn chế nguồn lực.

 |
| --- | --- |

## **6.2. Trạng thái yêu cầu**

| 
## Trạng thái

 | 

## Mô tả

 |
| --- | --- |
| 

## Đề xuất

 | 

## Đã có trong dự thảo nhưng chưa được chủ đầu tư ký xác nhận.

 |
| --- | --- |
| 

## Đã xác nhận

 | 

## Đã được chủ đầu tư xác nhận chính thức.

 |
| --- | --- |
| 

## Đang phát triển

 | 

## Đội phát triển đang triển khai.

 |
| --- | --- |
| 

## Hoàn thành

 | 

## Đã triển khai và kiểm thử thành công.

 |
| --- | --- |
| 

## Cần xác minh

 | 

## Chưa đủ dữ liệu để trở thành baseline triển khai.

 |
| --- | --- |

## **6.3. Điểm giao tiếp và tích hợp**

| 
## Điểm giao tiếp

 | 

## Mô tả

 |
| --- | --- |
| 

## Tài khoản trong Trường

 | 

## Dùng tài khoản do Nhà trường quản lý; cơ chế SSO cụ thể cần xác minh.

 |
| --- | --- |
| 

## Cổng đăng ký của cơ quan quản lý

 | 

## Hệ thống không tích hợp trực tiếp với cổng đăng ký trực tuyến của từng Bộ/Quỹ/Tỉnh; CNĐT/P.KHCN thao tác thủ công và tải kết quả lên hệ thống nội bộ.

 |
| --- | --- |
| 

## Tài chính-kế toán

 | 

## Chứng từ và quyết toán xử lý theo quy trình riêng của P.KT-TC, nằm ngoài phạm vi phiên bản đầu.

 |
| --- | --- |
| 

## Email/SMS

 | 

## Ngoài phạm vi phiên bản đầu; chỉ dùng thông báo trong ứng dụng.

 |
| --- | --- |
| 

## Ký số bên ngoài

 | 

## Chưa tích hợp bắt buộc; hồ sơ vẫn có phương thức ảnh chữ ký hoặc PDF đã ký.

 |
| --- | --- |

## **6.4. Danh sách vấn đề mở**

| 
## Mã

 | 

## Liên quan

 | 

## Nội dung

 | 

## Mô tả

 |
| --- | --- | --- | --- |
| 

## OPEN-01

 | 

## M01

 | 

## Danh mục cơ quan quản lý

 | 

## Chưa có danh mục chuẩn hóa các chương trình/Bộ/Quỹ/Tỉnh và biểu mẫu tương ứng để cấu hình trên hệ thống.

 |
| --- | --- | --- | --- |
| 

## OPEN-02

 | 

## M03

 | 

## Mốc báo cáo tiến độ theo từng chương trình t

 | 

## Chưa xác định cơ chế cấu hình mốc báo cáo khác nhau giữa các chương rình/Bộ ngành.

 |
| --- | --- | --- | --- |
| 

## OPEN-03

 | 

## M05

 | 

## Cấu trúc hồ sơ nghiệm thu cấp trên

 | 

## Chưa có mẫu chuẩn hóa hồ sơ nghiệm thu cấp Tỉnh/Bộ/Nhà nước áp dụng chung; hệ thống lưu dưới dạng tệp tổng hợp.

 |
| --- | --- | --- | --- |
| 

## OPEN-04

 | 

## NFR

 | 

## Chỉ số vận hành

 | 

## Cần xác minh tải đồng thời, thời gian phản hồi, dung lượng tệp, RPO và RTO.

 |
| --- | --- | --- | --- |
| 

## OPEN-05

 | 

## Phê duyệt

 | 

## Thông tin ký xác nhận FRS

 | 

## Chưa có họ tên đại diện Chủ đầu tư, Trưởng nhóm BA và người phê duyệt kỹ thuật.

 |
| --- | --- | --- | --- |

## **6.5. Xác nhận tài liệu**

## Việc ký xác nhận chuyển trạng thái các yêu cầu từ Đề xuất sang Đã xác nhận. Các vấn đề mở không mặc nhiên trở thành yêu cầu triển khai cho đến khi có quyết định bổ sung.

| 
## Vai trò

 | 

## Họ tên

 | 

## Ngày ký

 |
| --- | --- | --- |
| 

## Đại diện Chủ đầu tư

 |  |  |
| --- | --- | --- |
| 

## Trưởng nhóm BA

 |  |  |
| --- | --- | --- |
| 

## Phê duyệt kỹ thuật

 |  |  |
| --- | --- | --- |