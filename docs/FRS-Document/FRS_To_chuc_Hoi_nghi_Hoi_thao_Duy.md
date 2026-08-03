**TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐỒNG NAI**

**ĐẶC TẢ YÊU CẦU CHỨC NĂNG**

**(FUNCTIONAL REQUIREMENTS SPECIFICATION)**

**Tổ chức Hội nghị, Hội thảo**

**Phiên bản 0.1 - Bản dự thảo**

| Thông tin | Nội dung |
| --- | --- |
| Mã tài liệu | FRS-NCKH-005 |
| --- | --- |
| Phiên bản | 0.1 |
| --- | --- |
| Ngày lập | Tháng 07 năm 2026 |
| --- | --- |
| Trạng thái | Bản dự thảo |
| --- | --- |
| Chủ đầu tư |  |
| --- | --- |
| Đơn vị lập |  |
| --- | --- |
| Tài liệu liên quan | QT.KHCN.03 - Quy trình tổ chức Hội nghị, Hội thảo Quốc tế/Quốc gia/chuyên đề; BM01A/B-BM06A/B/C/QT.KHCN.03 |
| --- | --- |
| Lưu ý | Các nội dung ghi Cần xác minh chưa thuộc baseline triển khai. |
| --- | --- |

**Tài liệu này thuộc phạm vi nội bộ - Không phát hành ra bên ngoài khi chưa có sự đồng ý của chủ đầu tư.**

# LỊCH SỬ THAY ĐỔI TÀI LIỆU

| Phiên bản | Ngày | Nội dung thay đổi | Người thực hiện | Ghi chú |
| --- | --- | --- | --- | --- |
| 0.1 | 07/2026 | Khởi tạo bản FRS dự thảo hệ thống tổ chức Hội nghị, Hội thảo |  | Chờ review và xác nhận |
| --- | --- | --- | --- | --- |

# 

MỤC LỤC

LỊCH SỬ THAY ĐỔI TÀI LIỆU 1

CHƯƠNG 1: TỔNG QUAN TÀI LIỆU 6

1.1. Mục đích tài liệu 6

1.2. Phạm vi hệ thống 6

1.3. Yêu cầu nghiệp vụ cốt lõi 6

1.4. Đối tượng sử dụng 7

1.5. Định nghĩa và từ viết tắt 7

1.6. Tài liệu tham chiếu 8

CHƯƠNG 2: USER STORY, LUỒNG XỬ LÝ VÀ TRẠNG THÁI 8

2.1. Bộ user story 8

2.2. Luồng xử lý tổng thể 9

2.3. Mô hình trạng thái 10

2.3.1. Trạng thái hồ sơ đăng ký Hội nghị, Hội thảo 10

2.3.2. Trạng thái biểu mẫu 11

CHƯƠNG 3: YÊU CẦU CHỨC NĂNG CHI TIẾT 11

3.1. Module M01 - Đăng ký tổ chức Hội nghị, Hội thảo 11

3.1.1. Mô tả chức năng 11

3.1.2. Yêu cầu chức năng 11

3.1.3. Trường dữ liệu chính 12

3.1.4. Quy tắc nghiệp vụ 12

3.1.5. Kết quả đầu ra 13

3.1.6. Tiêu chí nghiệm thu 13

3.2. Module M02 - Thẩm định hồ sơ đăng ký và phê duyệt của BGH 13

3.2.1. Mô tả chức năng 13

3.2.2. Yêu cầu chức năng 13

3.2.3. Trường dữ liệu chính 14

3.2.4. Quy tắc nghiệp vụ 14

3.2.5. Kết quả đầu ra 14

3.2.6. Tiêu chí nghiệm thu 14

3.3. Module M03 - Xin phép cơ quan nhà nước (Hội nghị, Hội thảo Quốc tế) 14

3.3.1. Mô tả chức năng 14

3.3.2. Yêu cầu chức năng 14

3.3.3. Trường dữ liệu chính 15

3.3.4. Quy tắc nghiệp vụ 15

3.3.5. Kết quả đầu ra 15

3.3.6. Tiêu chí nghiệm thu 15

3.4. Module M04 - Lập kế hoạch tổ chức chi tiết 15

3.4.1. Mô tả chức năng 15

3.4.2. Yêu cầu chức năng 15

3.4.3. Trường dữ liệu chính 16

3.4.4. Quy tắc nghiệp vụ 16

3.4.5. Kết quả đầu ra 16

3.4.6. Tiêu chí nghiệm thu 16

3.5. Module M05 - Thiết kế website và email (Quốc gia, Quốc tế) 16

3.5.1. Mô tả chức năng 16

3.5.2. Yêu cầu chức năng 16

3.5.3. Trường dữ liệu chính 17

3.5.4. Quy tắc nghiệp vụ 17

3.5.5. Kết quả đầu ra 17

3.5.6. Tiêu chí nghiệm thu 17

3.6. Module M06 - Gọi bài, phản biện và xuất bản kỷ yếu (Quốc gia, Quốc tế) 17

3.6.1. Mô tả chức năng 17

3.6.2. Yêu cầu chức năng 17

3.6.3. Trường dữ liệu chính 18

3.6.4. Quy tắc nghiệp vụ 18

3.6.5. Kết quả đầu ra 18

3.6.6. Tiêu chí nghiệm thu 18

3.7. Module M07 - Thu phí tham dự (Quốc gia, Quốc tế) 18

3.7.1. Mô tả chức năng 18

3.7.2. Yêu cầu chức năng 18

3.7.3. Trường dữ liệu chính 19

3.7.4. Quy tắc nghiệp vụ 19

3.7.5. Kết quả đầu ra 19

3.7.6. Tiêu chí nghiệm thu 19

3.8. Module M08 - Tổ chức sự kiện 19

3.8.1. Mô tả chức năng 19

3.8.2. Yêu cầu chức năng 19

3.8.3. Trường dữ liệu chính 19

3.8.4. Quy tắc nghiệp vụ 20

3.8.5. Kết quả đầu ra 20

3.8.6. Tiêu chí nghiệm thu 20

3.9. Module M09 - Thanh toán chi phí và báo cáo kết quả tổ chức 20

3.9.1. Mô tả chức năng 20

3.9.2. Yêu cầu chức năng 20

3.9.3. Trường dữ liệu chính 20

3.9.4. Quy tắc nghiệp vụ 20

3.9.5. Kết quả đầu ra 21

3.9.6. Tiêu chí nghiệm thu 21

3.10. Module M10 - Lưu trữ hồ sơ 21

3.10.1. Mô tả chức năng 21

3.10.2. Yêu cầu chức năng 21

3.10.3. Trường dữ liệu chính 21

3.10.4. Quy tắc nghiệp vụ 21

3.10.5. Kết quả đầu ra 22

3.10.6. Tiêu chí nghiệm thu 22

3.11. Module M11 - Actor, phân quyền và truy cập 22

3.11.1. Mô tả chức năng 22

3.11.2. Yêu cầu chức năng 22

3.11.3. Trường dữ liệu chính 22

3.11.4. Quy tắc nghiệp vụ 22

3.11.5. Kết quả đầu ra 23

3.11.6. Tiêu chí nghiệm thu 23

3.12. Module M12 - Thông báo và truy vết 23

3.12.1. Mô tả chức năng 23

3.12.2. Yêu cầu chức năng 23

3.12.3. Trường dữ liệu chính 23

3.12.4. Quy tắc nghiệp vụ 23

3.12.5. Kết quả đầu ra 23

3.12.6. Tiêu chí nghiệm thu 24

CHƯƠNG 4: YÊU CẦU PHI CHỨC NĂNG 24

4.1. Các chỉ số cần xác minh 24

CHƯƠNG 5: BẢNG TỔNG HỢP VÀ TRUY VẾT 24

5.1. Tổng hợp yêu cầu theo module 24

5.2. Ma trận UCTQ - UCCT - module - biểu mẫu 25

5.3. Ma trận use case chi tiết - actor 26

5.4. Ma trận BM01A-BM06C 29

CHƯƠNG 6: PHỤ LỤC VÀ XÁC NHẬN 30

6.1. Ký hiệu mức độ ưu tiên 30

6.2. Trạng thái yêu cầu 30

6.3. Điểm giao tiếp và tích hợp 30

6.4. Danh sách vấn đề mở 30

6.5. Xác nhận tài liệu 31

# CHƯƠNG 1: TỔNG QUAN TÀI LIỆU

## 1.1. Mục đích tài liệu

Tài liệu này mô tả yêu cầu chức năng, dữ liệu, quy tắc nghiệp vụ, trạng thái, yêu cầu phi chức năng và tiêu chí nghiệm thu của phân hệ quản lý tổ chức Hội nghị, Hội thảo trên nền tảng website, dựa trên Quy trình QT.KHCN.03 (áp dụng thống nhất cho ba hình thức: Hội thảo chuyên đề, Hội nghị/Hội thảo Quốc gia và Hội nghị/Hội thảo Quốc tế) và bộ biểu mẫu BM01A/B-BM06A/B/C.

• Làm cơ sở cho thiết kế và phát triển phần mềm.

• Làm căn cứ kiểm thử, nghiệm thu và quản lý thay đổi yêu cầu.

• Bảo đảm truy vết từ quy trình, biểu mẫu và use case đến chức năng triển khai.

## 1.2. Phạm vi hệ thống

Hệ thống hỗ trợ quản lý quy trình từ đăng ký tổ chức Hội nghị/Hội thảo theo một trong ba hình thức (chuyên đề, Quốc gia, Quốc tế), thẩm định và phê duyệt của BGH, xin phép cơ quan nhà nước (riêng hình thức Quốc tế), lập kế hoạch chi tiết, gọi bài và phản biện, thu phí, tổ chức sự kiện, đến thanh toán chi phí, báo cáo kết quả và lưu trữ hồ sơ. Hệ thống quản lý dữ liệu, tệp, trạng thái, phân quyền, thông báo và dấu vết xử lý; việc thiết kế website/hệ thống email riêng của từng hội thảo, tổ chức sự kiện thực tế và xử lý chứng từ kế toán chi tiết diễn ra bên ngoài hệ thống hoặc trên nền tảng riêng do đơn vị tổ chức thiết lập.

• Đăng ký tổ chức Hội nghị, Hội thảo (phân loại theo hình thức)

• Thẩm định hồ sơ đăng ký và phê duyệt của BGH

• Xin phép cơ quan nhà nước (chỉ áp dụng hình thức Quốc tế)

• Lập kế hoạch chi tiết tổ chức

• Gọi bài, phản biện và xuất bản kỷ yếu (Quốc gia, Quốc tế)

• Thu phí tham dự (Quốc gia, Quốc tế)

• Tổ chức sự kiện

• Thanh toán chi phí và báo cáo kết quả tổ chức

• Lưu trữ hồ sơ

• Actor, phân quyền và truy cập

• Thông báo và truy vết

Ngoài phạm vi:

• Thiết kế và vận hành website/hệ thống email riêng của từng Hội nghị, Hội thảo; hệ thống chỉ lưu đường dẫn/tham chiếu.

• Tổ chức thực tế sự kiện (khai mạc, báo cáo, thảo luận, hỗ trợ kỹ thuật tại chỗ).

• Thu phí tham dự trực tuyến qua cổng thanh toán; hệ thống chỉ ghi nhận kết quả thu phí đã có.

• Biên tập, dàn trang và xuất bản kỷ yếu; hệ thống chỉ lưu phiếu phản biện và trạng thái duyệt bài.

• Xử lý chứng từ, quyết toán chi tiết theo QT.TCKT.04.

• Tích hợp email, SMS hoặc dịch vụ ký số bên ngoài trong phiên bản đầu.

## 1.3. Yêu cầu nghiệp vụ cốt lõi

| Mã | Yêu cầu | Nơi đặc tả |
| --- | --- | --- |
| BR-CORE-01 | Biểu mẫu và bước xử lý áp dụng phải khớp với hình thức Hội nghị/Hội thảo đã chọn (chuyên đề/Quốc gia/Quốc tế); không trộn lẫn giữa ba hình thức trong cùng một hồ sơ. | Chương 2-4 |
| --- | --- | --- |
| BR-CORE-02 | Quyền truy cập được xác định theo actor, vai trò (ĐVTC, P.KHCN, BGH, HĐKH, BTT, TCNTT, TCKT) và trạng thái hồ sơ. | Chương 2-4 |
| --- | --- | --- |
| BR-CORE-03 | Trạng thái và các thao tác quan trọng phải được lưu vết; audit log không được sửa/xóa bởi chức năng nghiệp vụ. | Chương 2-4 |
| --- | --- | --- |
| BR-CORE-04 | Văn bản phê duyệt của BGH và công văn của cơ quan nhà nước (đối với hình thức Quốc tế) chỉ được lưu và công bố trong hệ thống theo đúng vai trò. | Chương 2-4 |
| --- | --- | --- |

## 1.4. Đối tượng sử dụng

| Nhóm người dùng | Vai trò | Phân quyền chính |
| --- | --- | --- |
| Đơn vị tổ chức (Khoa Viện, Trung tâm) | ĐVTC | Lập hồ sơ đăng ký, kế hoạch tổ chức, báo cáo kết quả; đầu mối thực hiện toàn bộ quy trình tổ chức Hội nghị, Hội thảo. |
| --- | --- | --- |
| Cán bộ/Phòng Khoa học Công nghệ (P.KHCN) | P.KHCN | Tiếp nhận, thẩm định hồ sơ đăng ký, trình BGH phê duyệt, tổng hợp báo cáo kết quả và lưu trữ hồ sơ. |
| --- | --- | --- |
| Ban Giám hiệu (BGH) | BGH | Phê duyệt hồ sơ đăng ký tổ chức; ký công văn xin phép cơ quan nhà nước (hình thức Quốc tế). |
| --- | --- | --- |
| Hội đồng Khoa học (HĐKH) | HĐKH | Phản biện bài viết khoa học gửi đến Hội nghị/Hội thảo (Quốc gia, Quốc tế). |
| --- | --- | --- |
| Ban tổ chức/Ban thư ký (BTT) | BTT | Điều phối nội dung chương trình, phối hợp thiết kế website/email, tiếp nhận bài viết. |
| --- | --- | --- |
| Phòng Công nghệ thông tin (TCNTT) | TCNTT | Hỗ trợ thiết kế giao diện website và hệ thống email phục vụ Hội nghị, Hội thảo. |
| --- | --- | --- |
| Phòng Tài chính - Kế toán (TCKT) | TCKT | Triển khai thu phí, tổng hợp hồ sơ thanh toán chi phí tổ chức. |
| --- | --- | --- |
| Cơ quan nhà nước (CQNN) | CQNN | Xem xét và phê duyệt việc tổ chức Hội nghị/Hội thảo Quốc tế; không có tài khoản đăng nhập trong phiên bản đầu. |
| --- | --- | --- |
| Phòng Hợp tác quốc tế (HTQT) | HTQT | Phối hợp ĐVTC báo cáo xin ý kiến cơ quan nhà nước đối với Hội nghị/Hội thảo Quốc tế. |
| --- | --- | --- |

## 1.5. Định nghĩa và từ viết tắt

| Thuật ngữ/Viết tắt | Định nghĩa |
| --- | --- |
| ĐVTC | Đơn vị tổ chức |
| --- | --- |
| P.KHCN | Phòng Khoa học Công nghệ |
| --- | --- |
| BGH | Ban giám hiệu |
| --- | --- |
| HĐKH | Hội đồng Khoa học |
| --- | --- |
| BTT | Ban tổ chức/Ban thư ký Hội nghị, Hội thảo |
| --- | --- |
| TCNTT | Trung tâm/Phòng Công nghệ thông tin |
| --- | --- |
| TCKT | Phòng Tài chính - Kế toán |
| --- | --- |
| CQNN | Cơ quan nhà nước có thẩm quyền |
| --- | --- |
| HTQT | Phòng Hợp tác quốc tế |
| --- | --- |
| Hội thảo chuyên đề | Hình thức đơn giản hóa: hội thảo nội bộ, chuyên sâu theo chuyên môn, CLB học thuật, tọa đàm |
| --- | --- |
| Hội nghị/Hội thảo Quốc gia | Hình thức có gọi bài, phản biện, xuất bản kỷ yếu trong phạm vi trong nước |
| --- | --- |
| Hội nghị/Hội thảo Quốc tế | Hình thức có gọi bài, phản biện, xuất bản kỷ yếu và yêu cầu xin phép cơ quan nhà nước |
| --- | --- |
| Actor | Vai trò nghiệp vụ trực tiếp tương tác với hệ thống |
| --- | --- |
| Audit log | Nhật ký chỉ thêm mới dùng để truy vết thao tác quan trọng |
| --- | --- |
| Cần xác minh | Thông tin chưa đủ căn cứ để đưa vào baseline triển khai |
| --- | --- |

## 1.6. Tài liệu tham chiếu

• FRS\_Mau.docx - mẫu cấu trúc và trình bày.

• QT.KHCN.03 - Lưu đồ quy trình tổ chức Hội nghị, Hội thảo Quốc tế/ Quốc gia/chuyên đề (PPTX/PDF) của P.KHCN.

• Bộ biểu mẫu BM01A, BM01B, BM02A, BM02B, BM03, BM04A, BM04B, BM05, BM06A, BM06B, BM06C/QT.KHCN.03.

• Quy trình QT.TCKT.04 của Phòng Tài chính - Kế toán (tham chiếu, ngoài phạm vi triển khai chi tiết).

# CHƯƠNG 2: USER STORY, LUỒNG XỬ LÝ VÀ TRẠNG THÁI

## 2.1. Bộ user story

| Mã US | UCTQ | Tác nhân | User story | Module |
| --- | --- | --- | --- | --- |
| US-01 | UCTQ-01 | ĐVTC | Là Đơn vị tổ chức, tôi muốn chọn hình thức Hội nghị/Hội thảo (chuyên đề/Quốc gia/Quốc tế) và nộp hồ sơ đăng ký (BM01 A/B) kèm kế hoạch (BM04A/B) để P.KHCN thẩm định. | M01 |
| --- | --- | --- | --- | --- |
| US-02 | UCTQ-02 | P.KHCN | Là cán bộ P.KHCN, tôi muốn kiểm tra hồ sơ đăng ký: nếu chưa đạt, phản hồi ĐVTC bổ sung; nếu đạt, trình BGH xem xét phê duyệt. | M02 |
| --- | --- | --- | --- | --- |
| US-03 | UCTQ-03 | ĐVTC/HTQT | Là Đơn vị tổ chức, tôi muốn phối hợp Phòng Hợp tác quốc tế báo cáo xin ý kiến cơ quan nhà nước khi tổ chức Hội nghị/Hội thảo Quốc tế. | M03 |
| --- | --- | --- | --- | --- |
| US-04 | UCTQ-04 | ĐVTC | Là Đơn vị tổ chức, tôi muốn xây dựng kế hoạch chi tiết và gửi về P.KHCN sau khi được BGH phê duyệt hồ sơ đăng ký. | M04 |
| --- | --- | --- | --- | --- |
| US-05 | UCTQ-05 | BTT/TCNTT | Là Ban tổ chức, tôi muốn phối hợp TCNTT thiết kế giao diện website và email phục vụ tiếp nhận đăng ký, gửi bài. | M05 |
| --- | --- | --- | --- | --- |
| US-06 | UCTQ-06 | HĐKH | Là thành viên Hội đồng Khoa học, tôi muốn nộp Phiếu phản biện bài báo khoa học (BM05) để làm căn cứ biên tập, xuất bản kỷ yếu. | M06 |
| --- | --- | --- | --- | --- |
| US-07 | UCTQ-07 | ĐVTC/TCKT | Là Đơn vị tổ chức, tôi muốn triển khai thu phí tham dự theo hình thức đã được phê duyệt trước ngày tổ chức. | M07 |
| --- | --- | --- | --- | --- |
| US-08 | UCTQ-08 | ĐVTC | Là Đơn vị tổ chức, tôi muốn ghi nhận việc thực hiện các phiên khai mạc, báo cáo, thảo luận để có căn cứ báo cáo kết quả. | M08 |
| --- | --- | --- | --- | --- |
| US-09 | UCTQ-09 | TCKT/P.KHCN | Là cán bộ P.KHCN, tôi muốn tổng hợp hồ sơ thanh toán và lập báo cáo kết quả tổ chức (BM06A/B/C) gửi các bên liên quan. | M09 |
| --- | --- | --- | --- | --- |
| US-10 | UCTQ-10 | P.KHCN/ĐVTC | Là cán bộ P.KHCN, tôi muốn lưu hồ sơ đầy đủ tại đơn vị tổ chức và các bên liên quan sau khi kết thúc Hội nghị, Hội thảo. | M10 |
| --- | --- | --- | --- | --- |

## 2.2. Luồng xử lý tổng thể

Luồng xử lý dưới đây áp dụng cho cả ba hình thức; các bước chỉ áp dụng cho một hình thức cụ thể được ghi chú rõ trong cột Ghi chú.

| Bước | Giai đoạn | Actor | Hành động chính | BM | Ghi chú |
| --- | --- | --- | --- | --- | --- |
| 1 | Đăng ký tổ chức | ĐVTC | Nộp hồ sơ đăng ký theo hình thức đã chọn kèm đề án/kế hoạch sơ bộ; hình thức Quốc tế cần thêm đề án xin phép | BM01A/BM01B, BM02A/BM02B | Chuyên đề: trước 30 ngày; Quốc gia/Quốc tế: trước 120 ngày |
| --- | --- | --- | --- | --- | --- |
| 2 | Thẩm định và phê duyệt (07 ngày) | BGH; P.KHCN; ĐVTC | P.KHCN kiểm tra hồ sơ; nếu chưa đạt, phản hồi bổ sung; nếu đạt, trình BGH phê duyệt |  | Tất cả hình thức |
| --- | --- | --- | --- | --- | --- |
| 3 | Xin phép cơ quan nhà nước (30-45 ngày) | BGH; CQNN; HTQT; ĐVTC | ĐVTC phối hợp HTQT báo cáo xin ý kiến CQNN (30-45 ngày) | BM03 | Chỉ áp dụng hình thức Quốc tế |
| --- | --- | --- | --- | --- | --- |
| 4 | Lập kế hoạch tổ chức chi tiết | ĐVTC | Xây dựng kế hoạch chi tiết gửi về P.KHCN | BM04A/BM04B | Tất cả hình thức (trước 90 ngày, riêng chuyên đề không bắt buộc mốc 90 ngày) |
| --- | --- | --- | --- | --- | --- |
| 5 | Thiết kế website và email (15 ngày) | BTT; TCNTT; ĐVTC | Thiết kế giao diện Website và email (15 ngày) |  | Chỉ áp dụng Quốc gia, Quốc tế |
| --- | --- | --- | --- | --- | --- |
| 6 | Gọi bài và bình duyệt (30-90 ngày) | BTT; HĐKH; ĐVTC | Gửi thư mời, tiếp nhận bài viết và phản biện (30-90 ngày) |  | Chỉ áp dụng Quốc gia, Quốc tế |
| --- | --- | --- | --- | --- | --- |
| 7 | Phản biện và biên tập | HĐKH; ĐVTC | Phản biện, biên tập, xuất bản kỷ yếu; nếu chưa đạt, phản hồi tác giả | BM05 | Chỉ áp dụng Quốc gia, Quốc tế |
| --- | --- | --- | --- | --- | --- |
| 8 | Thu phí tham dự (trước 30 ngày) | TCKT; ĐVTC | Triển khai thu phí theo hình thức đã phê duyệt |  | Chỉ áp dụng Quốc gia, Quốc tế |
| --- | --- | --- | --- | --- | --- |
| 9 | Tổ chức | ĐVTC | Thực hiện các phiên khai mạc, báo cáo, thảo luận, hỗ trợ kỹ thuật, chụp ảnh, lập biên bản |  | Tất cả hình thức |
| --- | --- | --- | --- | --- | --- |
| 10 | Thanh toán chi phí và báo cáo kết quả (02 ngày) | TCKT; P.KHCN; ĐVTC | Tổng hợp hồ sơ thanh toán, lập báo cáo kết B quả gửi các bên liên quan | BM06A/BM06B/ M06C | Tất cả hình thức |
| --- | --- | --- | --- | --- | --- |
| 11 | Lưu hồ sơ | P.KHCN; ĐVTC | Lưu hồ sơ đầy đủ tại đơn vị tổ chức và các bên liên quan |  | Tất cả hình thức |
| --- | --- | --- | --- | --- | --- |

## 2.3. Mô hình trạng thái

### 2.3.1. Trạng thái hồ sơ đăng ký Hội nghị, Hội thảo

| Mã trạng thái | Tên trạng thái | Ý nghĩa | Điều kiện chuyển |
| --- | --- | --- | --- |
| HT-NHAP | Nháp | ĐVTC đang lập hồ sơ đăng ký, chưa chọn hình thức hoặc chưa nộp. | ĐVTC tạo hồ sơ. |
| --- | --- | --- | --- |
| HT-CHO-TD | Chờ thẩm định | P.KHCN đang kiểm tra tính hợp lệ hồ sơ đăng ký. | ĐVTC nộp hồ sơ đăng ký. |
| --- | --- | --- | --- |
| HT-BO-SUNG | Cần bổ sung | Hồ sơ chưa đạt, ĐVTC cần bổ sung theo phản hồi của P.KHCN. | P.KHCN phản hồi chưa đạt. |
| --- | --- | --- | --- |
| HT-CHO-BGH | Chờ BGH phê duyệt | Hồ sơ đạt yêu cầu, chờ BGH phê duyệt. | P.KHCN xác nhận đạt và trình BGH. |
| --- | --- | --- | --- |
| HT-TU-CHOI | Từ chối | BGH không phê duyệt tổ chức; hồ sơ kết thúc. | BGH từ chối. |
| --- | --- | --- | --- |
| HT-CHO-CQNN | Chờ ý kiến cơ quan nhà nước | Chỉ áp dụng Quốc tế: đang chờ ý kiến của cơ quan nhà nước. | BGH phê duyệt và ĐVTC/HTQT gửi báo cáo. |
| --- | --- | --- | --- |
| HT-DUOC-DUYET | Được phê duyệt | Hồ sơ đăng ký được phê duyệt (và CQNN đồng ý nếu là Quốc tế); chuyển sang lập kế hoạch chi tiết. | BGH phê duyệt (và CQNN đồng ý nếu là Quốc tế). |
| --- | --- | --- | --- |
| HT-DANG-CHUAN -BI | Đang chuẩn bị | Đang lập kế hoạch, gọi bài thu phí, chuẩn bị tổ chức. | Kế hoạch chi tiết được gửi về P.KHCN. |
| --- | --- | --- | --- |
| HT-DA-TO-CHUC | Đã tổ chức | Sự kiện đã diễn ra, đang chờ báo cáo kết quả. | ĐVTC xác nhận đã tổ chức. |
| --- | --- | --- | --- |
| HT-HOAN-TAT | Hoàn tất | Đã có báo cáo kết quả và hồ sơ được lưu trữ. | TCKT/P.KHCN xác nhận báo cáo kết quả. |
| --- | --- | --- | --- |

### 2.3.2. Trạng thái biểu mẫu

| Nhóm | Biểu mẫu | Chuỗi trạng thái |
| --- | --- | --- |
| BM đăng ký/kế hoạch do ĐVTC | BM01A/BM01B/BM02A/BM02B/ BM04A/BM04B | Nháp → Đã nộp → Được chấp nhận / Cần bổ sung |
| --- | --- | --- |
| BM03 (công văn xin phép) | BM03 | Chờ CQNN → Đã có ý kiến (đồng ý/không đồng ý, chỉ hình thức Quốc tế) |
| --- | --- | --- |
| BM05 (phiếu phản biện) | BM05 | Nháp → Đã nộp; đã nộp không được sửa hoặc nộp lại |
| --- | --- | --- |
| BM06A/B/C (báo cáo kết quả) | BM06A/BM06B/BM06C | Nháp → Đã nộp → Đã lưu |
| --- | --- | --- |

# CHƯƠNG 3: YÊU CẦU CHỨC NĂNG CHI TIẾT

Chương này sử dụng trực tiếp mã UC chi tiết làm mã yêu cầu chức năng. Mọi yêu cầu trong phạm vi phiên bản đầu có ưu tiên Cao và trạng thái Đề xuất cho đến khi tài liệu được ký xác nhận.

## 3.1. Module M01 - Đăng ký tổ chức Hội nghị, Hội thảo

### 3.1.1. Mô tả chức năng

Module M01 nhóm 5 yêu cầu liên quan đến việc ĐVTC chọn hình thức và nộp hồ sơ đăng ký tổ chức Hội nghị, Hội thảo. Actor tham gia: ĐVTC.

### 3.1.2. Yêu cầu chức năng

| Mã YC | Tên chức năng | Actor | Mô tả và kết quả | Ưu tiên | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| UC-DK-01 | Chọn hình thức tổ chức | ĐVTC | ĐVTC chọn hình thức tổ chức (chuyên đề/Quốc gia/Quốc tế) để hệ thống hiển thị đúng biểu mẫu và luồng xử lý tương ứng. Kết quả: Biểu mẫu và luồng xử lý phù hợp được xác định. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| UC-DK-02 | Nhập thông tin đăng ký (BM01A/B) | ĐVTC | ĐVTC nhập tên, quy mô, mục đích, thành phần tham dự, hội đồng khoa học, báo cáo viên chính, chủ đề báo cáo, thời gian - địa điểm, chi phí, đơn vị phối hợp (nếu có), kế hoạch công bố bài viết. Kết quả: Dữ liệu đăng ký được lưu ở trạng thái nháp. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| UC-DK-03 | Nhập đề án xin phép tổ chức (BM02A/B) | ĐVTC | Đối với hình thức Quốc gia (BM02B) hoặc Quốc tế (BM02A), ĐVTC nhập nội dung đề án xin phép tổ chức. Kết quả: Đề án được lưu kèm hồ sơ đăng ký. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| UC-DK-04 | Đính kèm MOU/MOA (nếu có) | ĐVTC | ĐVTC đính kèm MOU/MOA (nếu có) với đơn vị phối hợp. Kết quả: Tài liệu hợp tác được lưu kèm hồ sơ. | Trung bình | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| UC-DK-05 | Nộp hồ sơ đăng ký | ĐVTC | ĐVTC nộp hồ sơ đăng ký đúng thời hạn theo hình thức đã chọn (trước 30 ngày đối với chuyên đề; trước 120 ngày đối với Quốc gia/Quốc tế). Kết quả: Hồ sơ chuyển trạng thái Chờ thẩm định. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |

### 3.1.3. Trường dữ liệu chính

| STT | Nhóm dữ liệu | Mô tả |
| --- | --- | --- |
| 1 | Hình thức tổ chức | Chuyên đề/Quốc gia/Quốc tế, quyết định biểu mẫu và luồng xử lý áp dụng. |
| --- | --- | --- |
| 2 | BM01A/B | Tên Hội nghị/Hội thảo, quy mô, mục đích, thành phần tham dự, hội đồng khoa học, báo cáo viên chính, chủ đề báo cáo, thời gian - địa điểm, chi phí, đơn vị phối hợp, kế hoạch công bố bài viết. |
| --- | --- | --- |
| 3 | BM02A/B | Đề án xin phép tổ chức Hội nghị/Hội thảo Quốc tế (BM02A) hoặc Quốc gia (BM02B): mục tiêu, nội dung, ngân sách, đối tác. |
| --- | --- | --- |
| 4 | Tài liệu hợp tác | MOU/MOA (nếu có). |
| --- | --- | --- |

### 3.1.4. Quy tắc nghiệp vụ

| Mã BR | Quy tắc | UC liên quan |
| --- | --- | --- |
| BR-M01-01 | Hồ sơ hình thức chuyên đề phải nộp trước 30 ngày tổ chức; hồ sơ hình thức Quốc gia/Quốc tế phải nộp trước 120 ngày tổ chức. | UC-DK-05 |
| --- | --- | --- |
| BR-M01-02 | Biểu mẫu hiển thị (BM01A/B, BM02A/B) phải khớp với hình thức tổ chức đã chọn; không cho phép trộn lẫn giữa ba hình thức trong cùng một hồ sơ. | UC-DK-01 |
| --- | --- | --- |
| BR-M01-03 | Đề án xin phép (BM02A/B) chỉ bắt buộc đối với hình thức Quốc gia và Quốc tế; hình thức chuyên đề không yêu cầu. | UC-DK-03 |
| --- | --- | --- |

### 3.1.5. Kết quả đầu ra

• UC-DK-01: Biểu mẫu và luồng xử lý phù hợp với hình thức được xác định.

• UC-DK-02: Dữ liệu đăng ký được lưu ở trạng thái nháp.

• UC-DK-03: Đề án được lưu kèm hồ sơ đăng ký.

• UC-DK-04: Tài liệu hợp tác được lưu kèm hồ sơ.

• UC-DK-05: Hồ sơ chuyển trạng thái Chờ thẩm định.

### 3.1.6. Tiêu chí nghiệm thu

| Mã AC | UC | Tiêu chí nghiệm thu |
| --- | --- | --- |
| AC-UC-DK-01 | UC-DK-01 | Khi ĐVTC chọn hình thức hợp lệ, hệ thống hiển thị đúng biểu mẫu và luồng xử lý tương ứng. |
| --- | --- | --- |
| AC-UC-DK-02 | UC-DK-02 | Khi ĐVTC nhập đầy đủ trường bắt buộc, hệ thống lưu dữ liệu đăng ký ở trạng thái nháp. |
| --- | --- | --- |
| AC-UC-DK-03 | UC-DK-03 | Khi hình thức là Quốc gia/Quốc tế và ĐVTC nhập đề án hợp lệ, hệ thống lưu đề án kèm hồ sơ. |
| --- | --- | --- |
| AC-UC-DK-04 | UC-DK-04 | Khi ĐVTC tải MOU/MOA hợp lệ, hệ thống lưu và hiển thị lại trước khi nộp. |
| --- | --- | --- |
| AC-UC-DK-05 | UC-DK-05 | Khi ĐVTC nộp hồ sơ trong hạn theo hình thức đã chọn, hệ thống chuyển trạng thái Chờ thẩm định. |
| --- | --- | --- |

## 3.2. Module M02 - Thẩm định hồ sơ đăng ký và phê duyệt của BGH

### 3.2.1. Mô tả chức năng

Module M02 nhóm 4 yêu cầu liên quan đến việc P.KHCN thẩm định hồ sơ đăng ký và BGH phê duyệt. Actor tham gia: P.KHCN; BGH; ĐVTC.

### 3.2.2. Yêu cầu chức năng

| Mã YC | Tên chức năng | Actor | Mô tả và kết quả | Ưu tiên | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| UC-TD-01 | Kiểm tra nhanh hồ sơ đăng ký | P.KHCN | P.KHCN kiểm tra nội dung, quy mô, mục tiêu của hồ sơ đăng ký trong 07 ngày. Kết quả: Hồ sơ được xác định đạt hoặc chưa đạt. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| UC-TD-02 | Phản hồi yêu cầu bổ sung | P.KHCN | Trường hợp hồ sơ chưa đạt, P.KHCN phản hồi ĐVTC bổ sung kèm nội dung cần chỉnh sửa. Kết quả: Hồ sơ chuyển trạng thái Cần bổ sung. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| UC-TD-03 | Trình BGH phê duyệt hồ sơ đăng ký | P.KHCN | P.KHCN trình BGH xem xét, phê duyệt hồ sơ đăng ký đạt yêu cầu. Kết quả: Hồ sơ được BGH phê duyệt hoặc từ chối. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| UC-TD-04 | Xem/tải kết quả phê duyệt | ĐVTC | ĐVTC xem/tải kết quả phê duyệt của BGH. Kết quả: ĐVTC có căn cứ triển khai bước tiếp theo. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |

### 3.2.3. Trường dữ liệu chính

| STT | Nhóm dữ liệu | Mô tả |
| --- | --- | --- |
| 1 | Kết luận thẩm định | Đạt/Chưa đạt, người thẩm định, thời điểm, nội dung cần bổ sung. |
| --- | --- | --- |
| 2 | Kết quả phê duyệt BGH | Phê duyệt/Từ chối, người ký, thời điểm. |
| --- | --- | --- |

### 3.2.4. Quy tắc nghiệp vụ

| Mã BR | Quy tắc | UC liên quan |
| --- | --- | --- |
| BR-M02-01 | Thời hạn kiểm tra hồ sơ đăng ký của P.KHCN là 07 ngày kể từ khi nhận đủ hồ sơ. | UC-TD-01, UC-TD-03 |
| --- | --- | --- |
| BR-M02-02 | Hồ sơ chưa đạt phải kèm nội dung cần bổ sung rõ ràng trước khi phản hồi ĐVTC. | UC-TD-02 |
| --- | --- | --- |
| BR-M02-03 | Hình thức Quốc tế chỉ chuyển sang bước xin phép cơ quan nhà nước sau khi BGH phê duyệt chủ trương tổ chức. | UC-TD-03 |
| --- | --- | --- |

### 3.2.5. Kết quả đầu ra

• UC-TD-01: Hồ sơ được xác định đạt hoặc chưa đạt.

• UC-TD-02: Hồ sơ chuyển trạng thái Cần bổ sung.

• UC-TD-03: Hồ sơ được BGH phê duyệt hoặc từ chối.

• UC-TD-04: ĐVTC có căn cứ triển khai bước tiếp theo.

### 3.2.6. Tiêu chí nghiệm thu

| Mã AC | UC | Tiêu chí nghiệm thu |
| --- | --- | --- |
| AC-UC-TD-01 | UC-TD-01 | Khi P.KHCN hoàn tất kiểm tra trong hạn 07 ngày, hệ thống lưu kết luận và dấu vết thời điểm xử lý. |
| --- | --- | --- |
| AC-UC-TD-02 | UC-TD-02 | Khi P.KHCN phản hồi chưa đạt, hệ thống bắt buộc nhập nội dung cần bổ sung và thông báo ĐVTC. |
| --- | --- | --- |
| AC-UC-TD-03 | UC-TD-03 | Khi BGH phê duyệt hoặc từ chối, hệ thống cập nhật trạng thái hồ sơ và lưu dấu vết người ký. |
| --- | --- | --- |
| AC-UC-TD-04 | UC-TD-04 | Khi ĐVTC truy cập đúng quyền, hệ thống hiển thị và cho phép tải kết quả phê duyệt của BGH. |
| --- | --- | --- |

## 3.3. Module M03 - Xin phép cơ quan nhà nước (Hội nghị, Hội thảo Quốc tế)

### 3.3.1. Mô tả chức năng

Module M03 nhóm 3 yêu cầu chỉ áp dụng cho hình thức Quốc tế, liên quan đến việc báo cáo xin ý kiến cơ quan nhà nước trước khi tổ chức. Actor tham gia: BGH; HTQT; ĐVTC; CQNN.

### 3.3.2. Yêu cầu chức năng

| Mã YC | Tên chức năng | Actor | Mô tả và kết quả | Ưu tiên | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| UC-CQ-01 | Lập công văn xin phép (BM03) | ĐVTC/HTQT | ĐVTC phối hợp HTQT lập công văn xin phép tổ chức (BM03) để báo cáo cơ quan nhà nước. Kết quả: Công văn xin phép được chuẩn bị. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| UC-CQ-02 | Gửi báo cáo xin ý kiến CQNN | BGH/HTQT | BGH/HTQT gửi báo cáo xin ý kiến cơ quan nhà nước trong thời hạn 30-45 ngày. Kết quả: Hồ sơ chuyển trạng thái Chờ ý kiến cơ quan nhà nước. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| UC-CQ-03 | Ghi nhận kết quả ý kiến CQNN | ĐVTC/HTQT | ĐVTC/HTQT ghi nhận kết quả (đồng ý/không đồng ý) từ cơ quan nhà nước. Kết quả: Hồ sơ chuyển trạng thái Được phê duyệt hoặc điều chỉnh/ không tổ chức. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |

### 3.3.3. Trường dữ liệu chính

| STT | Nhóm dữ liệu | Mô tả |
| --- | --- | --- |
| 1 | BM03 | Nội dung công văn xin phép, cơ quan gửi đến, thời điểm gửi. |
| --- | --- | --- |
| 2 | Kết quả ý kiến CQNN | Đồng ý/Không đồng ý/Yêu cầu điều chỉnh, tệp công văn phê duyệt từ CQNN. |
| --- | --- | --- |

### 3.3.4. Quy tắc nghiệp vụ

| Mã BR | Quy tắc | UC liên quan |
| --- | --- | --- |
| BR-M03-01 | Bước này chỉ áp dụng cho hình thức Quốc tế; hệ thống tự động bỏ qua module này với hình thức chuyên đề và Quốc gia. | UC-CQ-01, UC-CQ-02, UC-CQ-03 |
| --- | --- | --- |
| BR-M03-02 | Thời hạn xin ý kiến cơ quan nhà nước là 30-45 ngày kể từ khi gửi báo cáo. | UC-CQ-02 |
| --- | --- | --- |
| BR-M03-03 | Trường hợp cơ quan nhà nước không đồng ý, ĐVTC phải điều chỉnh theo yêu cầu hoặc không tổ chức; hồ sơ không tự động chuyển sang bước lập kế hoạch. | UC-CQ-03 |
| --- | --- | --- |

### 3.3.5. Kết quả đầu ra

• UC-CQ-01: Công văn xin phép được chuẩn bị.

• UC-CQ-02: Hồ sơ chuyển trạng thái Chờ ý kiến cơ quan nhà nước.

• UC-CQ-03: Hồ sơ chuyển trạng thái Được phê duyệt hoặc điều chỉnh/không tổ chức.

### 3.3.6. Tiêu chí nghiệm thu

| Mã AC | UC | Tiêu chí nghiệm thu |
| --- | --- | --- |
| AC-UC-CQ-01 | UC-CQ-01 | Khi hình thức là Quốc tế và ĐVTC/HTQT lập BM03 hợp lệ, hệ thống lưu công văn kèm hồ sơ. |
| --- | --- | --- |
| AC-UC-CQ-02 | UC-CQ-02 | Khi BGH/HTQT xác nhận đã gửi báo cáo, hệ thống chuyển trạng thái và tính thời hạn 30-45 ngày. |
| --- | --- | --- |
| AC-UC-CQ-03 | UC-CQ-03 | Khi ĐVTC/HTQT cập nhật kết quả ý kiến CQNN, hệ thống chuyển đúng trạng thái tiếp theo của hồ sơ. |
| --- | --- | --- |

## 3.4. Module M04 - Lập kế hoạch tổ chức chi tiết

### 3.4.1. Mô tả chức năng

Module M04 nhóm 2 yêu cầu liên quan đến việc ĐVTC xây dựng và gửi kế hoạch tổ chức chi tiết. Actor tham gia: ĐVTC; P.KHCN.

### 3.4.2. Yêu cầu chức năng

| Mã YC | Tên chức năng | Actor | Mô tả và kết quả | Ưu tiên | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| UC-KH-01 | Lập kế hoạch chi tiết (BM04A/B) | ĐVTC | ĐVTC xây dựng kế hoạch tổ chức chi tiết (BM04A cho Quốc tế/Quốc gia, BM04B cho chuyên đề) và gửi về P.KHCN. Kết quả: Kế hoạch chi tiết được lưu. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| UC-KH-02 | Xem/tải kế hoạch tổ chức | P.KHCN/ĐVTC | Người có quyền xem/tải kế hoạch tổ chức chi tiết. Kết quả: Có căn cứ theo dõi và chuẩn bị các bước tiếp theo. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |

### 3.4.3. Trường dữ liệu chính

| STT | Nhóm dữ liệu | Mô tả |
| --- | --- | --- |
| 1 | BM04A/B | Chương trình chi tiết, phân công nhân sự, dự toán chi phí, kế hoạch truyền thông, kế hoạch gọi bài (nếu có). |
| --- | --- | --- |

### 3.4.4. Quy tắc nghiệp vụ

| Mã BR | Quy tắc | UC liên quan |
| --- | --- | --- |
| BR-M04-01 | Hình thức Quốc gia/Quốc tế phải gửi kế hoạch chi tiết trước 90 ngày tổ chức; hình thức chuyên đề không bắt buộc mốc thời gian cụ thể cho bước này. | UC-KH-01 |
| --- | --- | --- |
| BR-M04-02 | Kế hoạch chi tiết chỉ được lập sau khi hồ sơ đăng ký đã được BGH phê duyệt (và CQNN đồng ý nếu là hình thức Quốc tế). | UC-KH-01 |
| --- | --- | --- |

### 3.4.5. Kết quả đầu ra

• UC-KH-01: Kế hoạch chi tiết được lưu.

• UC-KH-02: Có căn cứ theo dõi và chuẩn bị các bước tiếp theo.

### 3.4.6. Tiêu chí nghiệm thu

| Mã AC | UC | Tiêu chí nghiệm thu |
| --- | --- | --- |
| AC-UC-KH-01 | UC-KH-01 | Khi ĐVTC nộp BM04A/B đầy đủ trường bắt buộc, hệ thống lưu kế hoạch và gắn với đúng hồ sơ. |
| --- | --- | --- |
| AC-UC-KH-02 | UC-KH-02 | Khi actor có quyền truy cập, hệ thống hiển thị và cho phép tải kế hoạch tổ chức chi tiết. |
| --- | --- | --- |

## 3.5. Module M05 - Thiết kế website và email (Quốc gia, Quốc tế)

### 3.5.1. Mô tả chức năng

Module M05 nhóm 2 yêu cầu chỉ áp dụng hình thức Quốc gia và Quốc tế, liên quan đến việc thiết kế giao diện website và hệ thống email phục vụ Hội nghị, Hội thảo. Actor tham gia: BTT; TCNTT; ĐVTC.

### 3.5.2. Yêu cầu chức năng

| Mã YC | Tên chức năng | Actor | Mô tả và kết quả | Ưu tiên | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| UC-WEB-01 | Ghi nhận yêu cầu và đường dẫn website/emai | BTT/TCNTT | BTT phối hợp TCNTT ghi nhận yêu cầu thiết kế website và email, lưu đường dẫn truy cập chính thức trong 15 ngày. Kết quả: Đường dẫn website/email của Hội nghị/Hội thảo được lưu. | Trung bình | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| UC-WEB-02 | Xem/tải đường dẫn website/emai | ĐVTC/P.KHCN | Người có quyền xem đường dẫn website/email đã thiết lập cho Hội nghị/Hội thảo. Kết quả: Có kênh chính thức để tiếp nhận đăng ký, gửi bài. | Trung bình | Đề xuất |
| --- | --- | --- | --- | --- | --- |

### 3.5.3. Trường dữ liệu chính

| STT | Nhóm dữ liệu | Mô tả |
| --- | --- | --- |
| 1 | Đường dẫn website/email | URL website, địa chỉ email chính thức của Hội nghị/Hội thảo; hệ thống chỉ lưu tham chiếu, không xây dựng nội dung website/email. |
| --- | --- | --- |

### 3.5.4. Quy tắc nghiệp vụ

| Mã BR | Quy tắc | UC liên quan |
| --- | --- | --- |
| BR-M05-01 | Module này chỉ áp dụng cho hình thức Quốc gia và Quốc tế; hình thức chuyên đề bỏ qua bước này. | UC-WEB-01, UC-WEB-02 |
| --- | --- | --- |
| BR-M05-02 | Thời hạn thiết kế website/email là 15 ngày. | UC-WEB-01 |
| --- | --- | --- |

### 3.5.5. Kết quả đầu ra

• UC-WEB-01: Đường dẫn website/email của Hội nghị/Hội thảo được lưu.

• UC-WEB-02: Có kênh chính thức để tiếp nhận đăng ký, gửi bài.

### 3.5.6. Tiêu chí nghiệm thu

| Mã AC | UC | Tiêu chí nghiệm thu |
| --- | --- | --- |
| AC-UC-WEB-01 | UC-WEB-01 | Khi BTT/TCNTT nhập đường dẫn hợp lệ trong hạn 15 ngày, hệ thống lưu và gắn với đúng Hội nghị/Hội thảo. |
| --- | --- | --- |
| AC-UC-WEB-02 | UC-WEB-02 | Khi actor có quyền truy cập, hệ thống hiển thị đúng đường dẫn website/email đã thiết lập. |
| --- | --- | --- |

## 3.6. Module M06 - Gọi bài, phản biện và xuất bản kỷ yếu (Quốc gia, Quốc tế)

### 3.6.1. Mô tả chức năng

Module M06 nhóm 3 yêu cầu chỉ áp dụng hình thức Quốc gia và Quốc tế, liên quan đến gọi bài, phản biện và xuất bản kỷ yếu. Actor tham gia: BTT; HĐKH; ĐVTC.

### 3.6.2. Yêu cầu chức năng

| Mã YC | Tên chức năng | Actor | Mô tả và kết quả | Ưu tiên | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| UC-BB-01 | Ghi nhận tiếp nhận bài viết | BTT | BTT ghi nhận việc gửi thư mời và tiếp nhận bài viết trong thời hạn 30-90 ngày. Kết quả: Danh sách bài viết được lưu. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| UC-BB-02 | Lập và nộp Phiếu phản biện (BM05) | Thành viên HĐKH | Thành viên HĐKH lập và nộp Phiếu phản biện bài báo khoa học (BM05) theo hình thức ĐVTC quy định. Kết quả: Phiếu phản biện được lưu. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| UC-BB-03 | Ghi nhận kết quả phản biện và xuất bản kỷ yếu | BTT/ĐVTC | Trường hợp bài chưa đạt, BTT phản hồi tác giả; nếu đạt, ghi nhận đưa vào xuất bản kỷ yếu. Kết quả: Trạng thái bài viết được cập nhật. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |

### 3.6.3. Trường dữ liệu chính

| STT | Nhóm dữ liệu | Mô tả |
| --- | --- | --- |
| 1 | Danh sách bài viết | Tên bài, tác giả, ngày nhận, trạng thái phản biện. |
| --- | --- | --- |
| 2 | BM05 | Nội dung nhận xét, kết luận đạt/chưa đạt/cần chỉnh sửa, ghi chú của thành viên phản biện. |
| --- | --- | --- |
| 3 | Trạng thái xuất bản | Đạt (đưa vào kỷ yếu)/Chưa đạt (phản hồi tác giả)/Đang chỉnh sửa. |
| --- | --- | --- |

### 3.6.4. Quy tắc nghiệp vụ

| Mã BR | Quy tắc | UC liên quan |
| --- | --- | --- |
| BR-M06-01 | Module này chỉ áp dụng cho hình thức Quốc gia và Quốc tế; hình thức chuyên đề bỏ qua bước này. | UC-BB-01, UC-BB-02, UC-BB-03 |
| --- | --- | --- |
| BR-M06-02 | BM05 đã nộp không được sửa hoặc nộp lại; mọi điều chỉnh phải qua phiếu mới có ghi chú thay thế. | UC-BB-02 |
| --- | --- | --- |
| BR-M06-03 | Thời hạn gọi bài và phản biện là 30-90 ngày theo hình thức trình bày do ĐVTC quy định. | UC-BB-01 |
| --- | --- | --- |

### 3.6.5. Kết quả đầu ra

• UC-BB-01: Danh sách bài viết được lưu.

• UC-BB-02: Phiếu phản biện được lưu.

• UC-BB-03: Trạng thái bài viết được cập nhật.

### 3.6.6. Tiêu chí nghiệm thu

| Mã AC | UC | Tiêu chí nghiệm thu |
| --- | --- | --- |
| AC-UC-BB-01 | UC-BB-01 | Khi BTT nhập danh sách bài viết hợp lệ, hệ thống lưu và gắn với đúng Hội nghị/Hội thảo. |
| --- | --- | --- |
| AC-UC-BB-02 | UC-BB-02 | Khi thành viên HĐKH nộp BM05 hợp lệ, hệ thống khóa phiếu và lưu dấu vết không cho sửa/nộp lại. |
| --- | --- | --- |
| AC-UC-BB-03 | UC-BB-03 | Khi BTT/ĐVTC cập nhật kết quả phản biện, hệ thống chuyển đúng trạng thái bài viết (đạt/chưa đạt). |
| --- | --- | --- |

## 3.7. Module M07 - Thu phí tham dự (Quốc gia, Quốc tế)

### 3.7.1. Mô tả chức năng

Module M07 nhóm 2 yêu cầu chỉ áp dụng hình thức Quốc gia và Quốc tế, liên quan đến việc ghi nhận thu phí tham dự. Actor tham gia: TCKT; ĐVTC.

### 3.7.2. Yêu cầu chức năng

| Mã YC | Tên chức năng | Actor | Mô tả và kết quả | Ưu tiên | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| UC-PHI-01 | Ghi nhận hình thức và kết quả thu phí | TCKT/ĐVTC | TCKT/ĐVTC ghi nhận triển khai thu phí theo hình thức b đã được phê duyệt trước 30 ngày tổ chức. Kết quả: Thông tin thu phí được lưu. | Trung bình | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| UC-PHI-02 | Xem/tải tổng hợp thu phí | ĐVTC/P.KHCN | Người có quyền xem/tải tổng hợp kết quả thu phí. Kết quả: Có căn cứ đối chiếu khi báo cáo kết quả tổ chức. | Trung bình | Đề xuất |
| --- | --- | --- | --- | --- | --- |

### 3.7.3. Trường dữ liệu chính

| STT | Nhóm dữ liệu | Mô tả |
| --- | --- | --- |
| 1 | Thông tin thu phí | Hình thức thu (chuyển khoản/tiền mặt/cổng thanh toán), tổng số người đã nộp phí, tổng số tiền; hệ thống chỉ ghi nhận kết quả, không xử lý giao dịch. |
| --- | --- | --- |

### 3.7.4. Quy tắc nghiệp vụ

| Mã BR | Quy tắc | UC liên quan |
| --- | --- | --- |
| BR-M07-01 | Module này chỉ áp dụng cho hình thức Quốc gia và Quốc tế; hình thức chuyên đề bỏ qua bước này. | UC-PHI-01, UC-PHI-02 |
| --- | --- | --- |
| BR-M07-02 | Thu phí chỉ được triển khai theo hình thức đã được BGH phê duyệt; thời hạn triển khai là trước 30 ngày tổ chức. | UC-PHI-01 |
| --- | --- | --- |

### 3.7.5. Kết quả đầu ra

• UC-PHI-01: Thông tin thu phí được lưu.

• UC-PHI-02: Có căn cứ đối chiếu khi báo cáo kết quả tổ chức.

### 3.7.6. Tiêu chí nghiệm thu

| Mã AC | UC | Tiêu chí nghiệm thu |
| --- | --- | --- |
| AC-UC-PHI-01 | UC-PHI-01 | Khi TCKT/ĐVTC nhập thông tin thu phí hợp lệ, hệ thống lưu và gắn với đúng Hội nghị/Hội thảo. |
| --- | --- | --- |
| AC-UC-PHI-02 | UC-PHI-02 | Khi actor có quyền truy cập, hệ thống hiển thị đúng tổng hợp kết quả thu phí. |
| --- | --- | --- |

## 3.8. Module M08 - Tổ chức sự kiện

### 3.8.1. Mô tả chức năng

Module M08 nhóm 2 yêu cầu liên quan đến việc ghi nhận diễn biến tổ chức sự kiện thực tế. Actor tham gia: ĐVTC.

### 3.8.2. Yêu cầu chức năng

| Mã YC | Tên chức năng | Actor | Mô tả và kết quả | Ưu tiên | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| UC-TC-01 | Ghi nhận đã tổ chức sự kiện | ĐVTC | ĐVTC ghi nhận việc đã thực hiện các phiên khai mạc, báo cáo, thảo luận và đánh dấu hồ sơ chuyển sang giai đoạn báo cáo kết quả. Kết quả: Hồ sơ chuyển trạng thái Đã tổ chức. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| UC-TC-02 | Đính kèm minh chứng tổ chức | ĐVTC | ĐVTC đính kèm hình ảnh, biên bản, tài liệu minh chứng đã tổ chức sự kiện. Kết quả: Minh chứng tổ chức được lưu kèm hồ sơ. | Trung bình | Đề xuất |
| --- | --- | --- | --- | --- | --- |

### 3.8.3. Trường dữ liệu chính

| STT | Nhóm dữ liệu | Mô tả |
| --- | --- | --- |
| 1 | Xác nhận đã tổ chức | Ngày tổ chức thực tế, người xác nhận. |
| --- | --- | --- |
| 2 | Minh chứng tổ chức | Hình ảnh, biên bản, tài liệu chương trình thực tế. |
| --- | --- | --- |

### 3.8.4. Quy tắc nghiệp vụ

| Mã BR | Quy tắc | UC liên quan |
| --- | --- | --- |
| BR-M08-01 | Hồ sơ chỉ chuyển trạng thái Đã tổ chức sau khi ĐVTC xác nhận sự kiện đã diễn ra; hệ thống không tự động xác định dựa trên ngày dự kiến trong kế hoạch. | UC-TC-01 |
| --- | --- | --- |

### 3.8.5. Kết quả đầu ra

• UC-TC-01: Hồ sơ chuyển trạng thái Đã tổ chức.

• UC-TC-02: Minh chứng tổ chức được lưu kèm hồ sơ.

### 3.8.6. Tiêu chí nghiệm thu

| Mã AC | UC | Tiêu chí nghiệm thu |
| --- | --- | --- |
| AC-UC-TC-01 | UC-TC-01 | Khi ĐVTC xác nhận đã tổ chức, hệ thống chuyển trạng thái hồ sơ và lưu dấu vết thời điểm xác nhận. |
| --- | --- | --- |
| AC-UC-TC-02 | UC-TC-02 | Khi ĐVTC tải minh chứng hợp lệ, hệ thống lưu và gắn với đúng Hội nghị/Hội thảo. |
| --- | --- | --- |

## 3.9. Module M09 - Thanh toán chi phí và báo cáo kết quả tổ chức

### 3.9.1. Mô tả chức năng

Module M09 nhóm 3 yêu cầu liên quan đến việc tổng hợp hồ sơ thanh toán chi phí và lập báo cáo kết quả tổ chức. Actor tham gia: TCKT; P.KHCN; ĐVTC.

### 3.9.2. Yêu cầu chức năng

| Mã YC | Tên chức năng | Actor | Mô tả và kết quả | Ưu tiên | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| UC-BC-01 | Tổng hợp hồ sơ thanh toán | TCKT/ĐVTC | TCKT/ĐVTC tổng hợp hồ sơ thanh toán chi phí tổ chức theo quy trình QT.TCKT.04 trong 02 ngày. Kết quả: Hồ sơ thanh toán được chuẩn bị. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| UC-BC-02 | Lập và nộp Báo cáo kết quả tổ chức (BM06A/B/C) | ĐVTC | ĐVTC lập và nộp Báo cáo kết quả tổ chức đúng biểu mẫu theo hình thức (BM06A - Quốc tế, BM06B - Quốc gia, BM06C - chuyên đề). Kết quả: Báo cáo kết quả được lưu. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| UC-BC-03 | Gửi báo cáo kết quả đến các bên liên quan | P.KHCN | P.KHCN gửi báo cáo kết quả tổ chức đến các bên liên quan. Kết quả: Các bên liên quan nắm được kết quả tổ chức. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |

### 3.9.3. Trường dữ liệu chính

| STT | Nhóm dữ liệu | Mô tả |
| --- | --- | --- |
| 1 | Hồ sơ thanh toán | Nội dung chi phí, đơn vị tính, số lượng, đơn giá, thành tiền; chi tiết xử lý theo QT.TCKT.04, ngoài phạm vi triển khai. |
| --- | --- | --- |
| 2 | BM06A/B/C | Số lượng người tham dự thực tế, số bài viết, đánh giá kết quả tổ chức, kiến nghị, hình ảnh minh chứng. |
| --- | --- | --- |

### 3.9.4. Quy tắc nghiệp vụ

| Mã BR | Quy tắc | UC liên quan |
| --- | --- | --- |
| BR-M09-01 | Biểu mẫu báo cáo kết quả áp dụng đúng theo hình thức tổ chức: BM06A (Quốc tế), BM06B (Quốc gia), BM06C (chuyên đề). | UC-BC-02 |
| --- | --- | --- |
| BR-M09-02 | Thời hạn tổng hợp hồ sơ thanh toán và lập báo cáo kết quả là 02 ngày kể từ khi tổ chức xong. | UC-BC-01, UC-BC-02 |
| --- | --- | --- |

### 3.9.5. Kết quả đầu ra

• UC-BC-01: Hồ sơ thanh toán được chuẩn bị.

• UC-BC-02: Báo cáo kết quả được lưu.

• UC-BC-03: Các bên liên quan nắm được kết quả tổ chức.

### 3.9.6. Tiêu chí nghiệm thu

| Mã AC | UC | Tiêu chí nghiệm thu |
| --- | --- | --- |
| AC-UC-BC-01 | UC-BC-01 | Khi TCKT/ĐVTC hoàn tất tổng hợp trong hạn 02 ngày, hệ thống lưu hồ sơ thanh toán và dấu vết thời điểm. |
| --- | --- | --- |
| AC-UC-BC-02 | UC-BC-02 | Khi ĐVTC nộp đúng biểu mẫu báo cáo theo hình thức, hệ thống lưu báo cáo và gắn với đúng Hội nghị/Hội thảo. |
| --- | --- | --- |
| AC-UC-BC-03 | UC-BC-03 | Khi P.KHCN xác nhận gửi báo cáo, hệ thống thông báo cho các bên liên quan theo đúng phân quyền. |
| --- | --- | --- |

## 3.10. Module M10 - Lưu trữ hồ sơ

### 3.10.1. Mô tả chức năng

Module M10 nhóm 2 yêu cầu liên quan đến việc lưu trữ toàn bộ hồ sơ tổ chức Hội nghị, Hội thảo. Actor tham gia: P.KHCN; ĐVTC.

### 3.10.2. Yêu cầu chức năng

| Mã YC | Tên chức năng | Actor | Mô tả và kết quả | Ưu tiên | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| UC-LT-01 | Lưu trữ hồ sơ tổng hợp | P.KHCN/ĐVTC | Toàn bộ hồ sơ đăng ký, kế hoạch, phản biện, thu phí, báo cáo kết quả được lưu tại đơn vị tổ chức và các bên liên quan. Kết quả: Hồ sơ hoàn tất được lưu trữ đầy đủ. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| UC-LT-02 | Tra cứu và thống kê Hội nghị, Hội thảo | P.KHCN | P.KHCN tra cứu và thống kê Hội nghị/Hội thảo đã tổ chức theo hình thức, đơn vị, thời gian. Kết quả: Có báo cáo tổng hợp phục vụ quản lý. | Trung bình | Đề xuất |
| --- | --- | --- | --- | --- | --- |

### 3.10.3. Trường dữ liệu chính

| STT | Nhóm dữ liệu | Mô tả |
| --- | --- | --- |
| 1 | Hồ sơ lưu trữ | Toàn bộ tệp và dữ liệu từ Module M01-M09 gắn với từng Hội nghị/Hội thảo. |
| --- | --- | --- |
| 2 | Chỉ tiêu thống kê | Số lượng Hội nghị/Hội thảo theo hình thức, đơn vị, kỳ; chi tiết chỉ tiêu báo cáo cần xác minh. |
| --- | --- | --- |

### 3.10.4. Quy tắc nghiệp vụ

| Mã BR | Quy tắc | UC liên quan |
| --- | --- | --- |
| BR-M10-01 | Dữ liệu lưu trữ không được xóa bởi chức năng nghiệp vụ thông thường; chỉ vô hiệu hóa theo quy trình quản trị dữ liệu. | UC-LT-01 |
| --- | --- | --- |
| BR-M10-02 | Quyền tra cứu/thống kê giới hạn theo vai trò và phạm vi quản lý của từng đơn vị. | UC-LT-02 |
| --- | --- | --- |

### 3.10.5. Kết quả đầu ra

• UC-LT-01: Hồ sơ hoàn tất được lưu trữ đầy đủ.

• UC-LT-02: Có báo cáo tổng hợp phục vụ quản lý.

### 3.10.6. Tiêu chí nghiệm thu

| Mã AC | UC | Tiêu chí nghiệm thu |
| --- | --- | --- |
| AC-UC-LT-01 | UC-LT-01 | Khi hồ sơ hoàn tất bước M01-M09, hệ thống tự động chuyển hồ sơ sang trạng thái lưu trữ và khóa sửa. |
| --- | --- | --- |
| AC-UC-LT-02 | UC-LT-02 | Khi actor có quyền tra cứu, hệ thống trả về kết quả thống kê đúng phạm vi quyền được cấp. |
| --- | --- | --- |

## 3.11. Module M11 - Actor, phân quyền và truy cập

### 3.11.1. Mô tả chức năng

Module M11 nhóm 2 yêu cầu liên quan đến quản lý actor và phân quyền dùng chung cho toàn phân hệ. Actor tham gia: Tất cả actor của phân hệ.

### 3.11.2. Yêu cầu chức năng

| Mã YC | Tên chức năng | Actor | Mô tả và kết quả | Ưu tiên | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| UC-ACT-01 | Sử dụng quyền theo a vai trò nghiệp vụ được cấp | Tất cả actor | Người dùng chỉ thao tác được các chức năng thuộc vai trò nghiệp vụ được cấp. Kết quả: Truy cập đúng phạm vi vai trò. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| UC-ACT-02 | Áp dụng đúng luồng xử lý theo hình thức | Tất cả actor | Hệ thống chỉ hiển thị các module áp dụng cho hình thức (chuyên đề/Quốc gia/Quốc tế) đã chọn của từng Hội nghị/Hội thảo. Kết quả: Người dùng không thấy các bước không áp dụng. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |

### 3.11.3. Trường dữ liệu chính

| STT | Nhóm dữ liệu | Mô tả |
| --- | --- | --- |
| 1 | Vai trò người dùng | Danh sách vai trò được gán cho từng tài khoản. |
| --- | --- | --- |
| 2 | Cấu hình luồng xử lý theo hình thức | Danh sách module áp dụng theo từng hình thức tổ chức. |
| --- | --- | --- |

### 3.11.4. Quy tắc nghiệp vụ

| Mã BR | Quy tắc | UC liên quan |
| --- | --- | --- |
| BR-M11-01 | Một tài khoản có thể được gán nhiều vai trò; hệ thống áp dụng quyền theo vai trò đang sử dụng trong từng thao tác cụ thể. | UC-ACT-01 |
| --- | --- | --- |
| BR-M11-02 | Hệ thống ẩn các module không áp dụng cho hình thức đã chọn (M03, M05, M06, M07 chỉ áp dụng Quốc gia/Quốc tế theo quy tắc riêng từng module). | UC-ACT-02 |
| --- | --- | --- |

### 3.11.5. Kết quả đầu ra

• UC-ACT-01: Truy cập đúng phạm vi vai trò.

• UC-ACT-02: Người dùng không thấy các bước không áp dụng.

### 3.11.6. Tiêu chí nghiệm thu

| Mã AC | UC | Tiêu chí nghiệm thu |
| --- | --- | --- |
| AC-UC-ACT-01 | UC-ACT-01 | Khi người dùng thực hiện chức năng ngoài vai trò được cấp, hệ thống từ chối và ghi nhận nỗ lực truy cập. |
| --- | --- | --- |
| AC-UC-ACT-02 | UC-ACT-02 | Khi hồ sơ thuộc hình thức chuyên đề, hệ thống không hiển thị các module M03, M05, M06, M07. |
| --- | --- | --- |

## 3.12. Module M12 - Thông báo và truy vết

### 3.12.1. Mô tả chức năng

Module M12 nhóm 2 yêu cầu liên quan đến thông báo trạng thái và truy vết thao tác. Actor tham gia: Tất cả actor của phân hệ.

### 3.12.2. Yêu cầu chức năng

| Mã YC | Tên chức năng | Actor | Mô tả và kết quả | Ưu tiên | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| UC-TB-01 | Nhận thông báo chuyển trạng thái hồ sơ | Actor liên quan | Actor liên quan nhận thông báo trong ứng dụng khi hồ sơ chuyển trạng thái (được phê duyệt, cần bổ sung, từ chối, hoàn tất). Kết quả: Actor biết kịp thời để xử lý bước tiếp theo. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| UC-TB-02 | Theo dõi trạng thái hồ sơ và biểu mẫu | Tất cả actor theo quyền | Người dùng theo dõi trạng thái xử lý hồ sơ và biểu mẫu của mình theo đúng phân quyền. Kết quả: Người dùng nắm được tiến độ xử lý hồ sơ. | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |

### 3.12.3. Trường dữ liệu chính

| STT | Nhóm dữ liệu | Mô tả |
| --- | --- | --- |
| 1 | Thông báo trong ứng dụng | Nội dung, thời điểm, actor nhận, trạng thái đã đọc/chưa đọc. |
| --- | --- | --- |
| 2 | Audit log | Actor, thời điểm, hành động, đối tượng, trạng thái trước/sau. |
| --- | --- | --- |

### 3.12.4. Quy tắc nghiệp vụ

| Mã BR | Quy tắc | UC liên quan |
| --- | --- | --- |
| BR-M12-01 | Thông báo chỉ hiển thị trong ứng dụng ở phiên bản đầu; không tích hợp email/SMS. | UC-TB-01 |
| --- | --- | --- |
| BR-M12-02 | Audit log là nhật ký chỉ thêm mới, không được sửa/xóa bởi chức năng nghiệp vụ. | UC-TB-01, UC-TB-02 |
| --- | --- | --- |

### 3.12.5. Kết quả đầu ra

• UC-TB-01: Actor biết kịp thời để xử lý bước tiếp theo.

• UC-TB-02: Người dùng nắm được tiến độ xử lý hồ sơ.

### 3.12.6. Tiêu chí nghiệm thu

| Mã AC | UC | Tiêu chí nghiệm thu |
| --- | --- | --- |
| AC-UC-TB-01 | UC-TB-01 | Khi hồ sơ chuyển trạng thái, hệ thống gửi thông báo trong ứng dụng đến đúng actor liên quan. |
| --- | --- | --- |
| AC-UC-TB-02 | UC-TB-02 | Khi actor truy cập đúng quyền, hệ thống hiển thị trạng thái hồ sơ/biểu mẫu hiện tại chính xác. |
| --- | --- | --- |

# CHƯƠNG 4: YÊU CẦU PHI CHỨC NĂNG

| Mã NFR | Nhóm | Yêu cầu | Ưu tiên | Trạng thái |
| --- | --- | --- | --- | --- |
| NFR-SEC-01 | Bảo mật và phân quyền | Người dùng chỉ được xem, tải và thao tác dữ liệu thuộc vai trò và phạm vi được phân công. | Cao | Đề xuất |
| --- | --- | --- | --- | --- |
| NFR-AUD-01 | Lưu vết | Audit log được lưu theo cơ chế chỉ thêm mới; tối thiểu gồm actor, thời điểm, hành động, đối tượng, trạng thái trước/sau và lý do. | Cao | Đề xuất |
| --- | --- | --- | --- | --- |
| NFR-DOC-01 | Tài liệu | Hệ thống kiểm soát định dạng, phiên bản và quyền xem/tải hồ sơ theo vai trò và trạng thái. | Cao | Đề xuất |
| --- | --- | --- | --- | --- |
| NFR-REL-01 | Sao lưu/khôi phục | Dữ liệu và tệp phải được sao lưu và có khả năng khôi phục khi xảy ra sự cố; RPO/RTO cần xác minh. | Cao | Đề xuất |
| --- | --- | --- | --- | --- |
| NFR-UX-01 | Khả dụng giao diện | Giao diện sử dụng được trên máy tính và điện thoại, hỗ trợ các trình duyệt hiện hành; danh sách phiên bản trình duyệt cần xác minh. | Cao | Đề xuất |
| --- | --- | --- | --- | --- |
| NFR-DAT-01 | Toàn vẹn dữ liệu | Khi nhiều actor cùng thao tác trên cùng một Hội nghị/Hội thảo (ví dụ nhiều thành viên HĐKH nộp BM05), hệ thống không làm mất, ghi trùng hoặc gán sai dữ liệu. | Cao | Đề xuất |
| --- | --- | --- | --- | --- |

## 4.1. Các chỉ số cần xác minh

• Số người dùng đồng thời và thời gian phản hồi mục tiêu.

• Dung lượng tệp tối đa và định dạng cho từng BM tải hoàn chỉnh.

• Chu kỳ sao lưu, thời gian lưu bản sao, RPO và RTO.

• Danh sách trình duyệt/phiên bản tối thiểu được hỗ trợ.

• Cơ chế tích hợp (nếu có) giữa hệ thống nội bộ và website/hệ thống email riêng do TCNTT thiết lập cho từng Hội nghị/Hội thảo.

# CHƯƠNG 5: BẢNG TỔNG HỢP VÀ TRUY VẾT

## 5.1. Tổng hợp yêu cầu theo module

| Module | Tên module | Số YC | Mã YC | Ưu tiên | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| M01 | Đăng ký tổ chức Hội nghị, Hội thảo | 5 | UC-DK-01…UC-DK-05 | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| M02 | Thẩm định hồ sơ đăng ký và phê duyệt của BGH | 4 | UC-TD-01…UC-TD-04 | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| M03 | Xin phép cơ quan nhà nước (Quốc tế) | 3 | UC-CQ-01…UC-CQ-03 | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| M04 | Lập kế hoạch tổ chức chi tiết | 2 | UC-KH-01…UC-KH-02 | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| M05 | Thiết kế website và email (Quốc gia, Quốc tế) | 2 | UC-WEB-01…UC-WEB-02 | Trung bình | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| M06 | Gọi bài, phản biện và xuất bản kỷ yếu (Quốc gia, Quốc tế) | 3 | UC-BB-01…UC-BB-03 | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| M07 | Thu phí tham dự (Quốc gia, Quốc tế) | 2 | UC-PHI-01…UC-PHI-02 | Trung bình | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| M08 | Tổ chức sự kiện | 2 | UC-TC-01…UC-TC-02 | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| M09 | Thanh toán chi phí và báo cáo kết quả tổ chức | 3 | UC-BC-01…UC-BC-03 | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| M10 | Lưu trữ hồ sơ | 2 | UC-LT-01…UC-LT-02 | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| M11 | Actor, phân quyền và truy cập | 2 | UC-ACT-01…UC-ACT-02 | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |
| M12 | Thông báo và truy vết | 2 | UC-TB-01…UC-TB-02 | Cao | Đề xuất |
| --- | --- | --- | --- | --- | --- |

**Tổng cộng:** 12 module, 32 yêu cầu chức năng trong phạm vi (trong đó M03, M05, M06, M07 chỉ áp dụng một phần theo hình thức tổ chức) và 6 yêu cầu phi chức năng.

## 5.2. Ma trận UCTQ - UCCT - module - biểu mẫu

| UCTQ | UCCT | Tên yêu cầu | Module | BM |
| --- | --- | --- | --- | --- |
| UCTQ-01 | UC-DK-01 | Chọn hình thức tổ chức | M01 | — |
| --- | --- | --- | --- | --- |
| UCTQ-01 | UC-DK-02 | Nhập thông tin đăng ký (BM01A/B) | M01 | BM01A/BM01B |
| --- | --- | --- | --- | --- |
| UCTQ-01 | UC-DK-03 | Nhập đề án xin phép tổ chức (BM02A/B) | M01 | BM02A/BM02B |
| --- | --- | --- | --- | --- |
| UCTQ-01 | UC-DK-04 | Đính kèm MOU/MOA (nếu có) | M01 | — |
| --- | --- | --- | --- | --- |
| UCTQ-01 | UC-DK-05 | Nộp hồ sơ đăng ký | M01 | BM01A/BM01B |
| --- | --- | --- | --- | --- |
| UCTQ-02 | UC-TD-01 | Kiểm tra nhanh hồ sơ đăng ký | M02 | BM01A/BM01B |
| --- | --- | --- | --- | --- |
| UCTQ-02 | UC-TD-02 | Phản hồi yêu cầu bổ sung | M02 | BM01A/BM01B |
| --- | --- | --- | --- | --- |
| UCTQ-02 | UC-TD-03 | Trình BGH phê duyệt hồ sơ đăng ký | M02 | — |
| --- | --- | --- | --- | --- |
| UCTQ-02 | UC-TD-04 | Xem/tải kết quả phê duyệt | M02 | — |
| --- | --- | --- | --- | --- |
| UCTQ-03 | UC-CQ-01 | Lập công văn xin phép (BM03) | M03 | BM03 |
| --- | --- | --- | --- | --- |
| UCTQ-03 | UC-CQ-02 | Gửi báo cáo xin ý kiến CQNN | M03 | BM03 |
| --- | --- | --- | --- | --- |
| UCTQ-03 | UC-CQ-03 | Ghi nhận kết quả ý kiến CQNN | M03 | BM03 |
| --- | --- | --- | --- | --- |
| UCTQ-04 | UC-KH-01 | Lập kế hoạch chi tiết (BM04A/B) | M04 | BM04A/BM04B |
| --- | --- | --- | --- | --- |
| UCTQ-04 | UC-KH-02 | Xem/tải kế hoạch tổ chức | M04 | BM04A/BM04B |
| --- | --- | --- | --- | --- |
| UCTQ-05 | UC-WEB-01 | Ghi nhận yêu cầu và đường dẫn website/email | M05 | — |
| --- | --- | --- | --- | --- |
| UCTQ-05 | UC-WEB-02 | Xem/tải đường dẫn website/email | M05 | — |
| --- | --- | --- | --- | --- |
| UCTQ-05 | UC-BB-01 | Ghi nhận tiếp nhận bài viết | M06 | — |
| --- | --- | --- | --- | --- |
| UCTQ-06 | UC-BB-02 | Lập và nộp Phiếu phản biện (BM05) | M06 | BM05 |
| --- | --- | --- | --- | --- |
| UCTQ-05 | UC-BB-03 | Ghi nhận kết quả phản biện và xuất bản kỷ yếu | M06 | BM05 |
| --- | --- | --- | --- | --- |
| UCTQ-07 | UC-PHI-01 | Ghi nhận hình thức và kết quả thu phí | M07 | — |
| --- | --- | --- | --- | --- |
| UCTQ-07 | UC-PHI-02 | Xem/tải tổng hợp thu phí | M07 | — |
| --- | --- | --- | --- | --- |
| UCTQ-08 | UC-TC-01 | Ghi nhận đã tổ chức sự kiện | M08 | — |
| --- | --- | --- | --- | --- |
| UCTQ-08 | UC-TC-02 | Đính kèm minh chứng tổ chức | M08 | — |
| --- | --- | --- | --- | --- |
| UCTQ-09 | UC-BC-01 | Tổng hợp hồ sơ thanh toán | M09 | — |
| --- | --- | --- | --- | --- |
| UCTQ-09 | UC-BC-02 | Lập và nộp Báo cáo kết quả tổ chức (BM06A/B/C) | M09 | BM06A/B/C |
| --- | --- | --- | --- | --- |
| UCTQ-09 | UC-BC-03 | Gửi báo cáo kết quả đến các bên liên quan | M09 | BM06A/B/C |
| --- | --- | --- | --- | --- |
| UCTQ-10 | UC-LT-01 | Lưu trữ hồ sơ tổng hợp | M10 | BM01–BM06 |
| --- | --- | --- | --- | --- |
| UCTQ-10 | UC-LT-02 | Tra cứu và thống kê Hội nghị, Hội thảo | M10 | BM01–BM06 |
| --- | --- | --- | --- | --- |
| Dùng chung | UC-ACT-01 | Sử dụng quyền theo vai trò nghiệp vụ được cấp | M11 | — |
| --- | --- | --- | --- | --- |
| Dùng chung | UC-ACT-02 | Áp dụng đúng luồng xử lý theo hình thức | M11 | — |
| --- | --- | --- | --- | --- |
| Dùng chung | UC-TB-01 | Nhận thông báo chuyển trạng thái hồ sơ | M12 | BM01–BM06 |
| --- | --- | --- | --- | --- |
| Dùng chung | UC-TB-02 | Theo dõi trạng thái hồ sơ và biểu mẫu | M12 | BM01–BM06 |
| --- | --- | --- | --- | --- |

## 5.3. Ma trận use case chi tiết - actor

| Mã UCCT | Use case chi tiết | ĐVTC | P.KHCN | BGH | HĐKH | BTT | TCNTT | TCKT | CQNN/HTQT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-DK-01 | Chọn hình thức tổ chức | ✓ |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-DK-02 | Nhập thông tin đăng ký | ✓ |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-DK-03 | Nhập đề án xin phép | ✓ |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-DK-04 | Đính kèm MOU/MOA | ✓ |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-DK-05 | Nộp hồ sơ đăng ký | ✓ |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-TD-01 | Kiểm tra nhanh hồ sơ |  | ✓ |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-TD-02 | Phản hồi yêu cầu bổ sung |  | ✓ |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-TD-03 | Trình BGH phê duyệt |  | ✓ ✓ |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-TD-04 | Xem/tải kết quả phê duyệt | ✓ |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-CQ-01 | Lập công văn xin phép | ✓ |  |  |  |  |  |  | ✓ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-CQ-02 | Gửi báo cáo xin ý kiến |  | ✓ ✓ |  |  |  |  |  | ✓ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-CQ-03 | Ghi nhận kết quả ý kiến | ✓ |  |  |  |  |  |  | ✓ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-KH-01 | Lập kế hoạch chi tiết | ✓ |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-KH-02 | Xem/tải kế hoạch tổ chức | ✓ | ✓ |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-WEB-01 | Ghi nhận đường dẫn |  |  |  |  |  | ✓ ✓ |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-WEB-02 | Xem/tải đường dẫn | ✓ | ✓ |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-BB-01 | Ghi nhận tiếp nhận bài viết |  |  |  |  | ✓ |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-BB-02 | Lập và nộp BM05 |  |  |  | ✓ |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-BB-03 | Ghi nhận kết quả phản biện | ✓ |  |  |  | ✓ |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-PHI-01 | Ghi nhận thu phí | ✓ |  |  |  |  |  | ✓ |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-PHI-02 | Xem/tải tổng hợp thu phí | ✓ | ✓ |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-TC-01 | Ghi nhận đã tổ chức | ✓ |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-TC-02 | Đính kèm minh chứng tổ chức | ✓ |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-BC-01 | Tổng hợp hồ sơ thanh toán | ✓ |  |  |  |  |  | ✓ |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-BC-02 | Lập và nộp BM06A/B/C | ✓ |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-BC-03 | Gửi báo cáo đến các bên |  | ✓ |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-LT-01 | Lưu trữ hồ sơ tổng hợp | ✓ | ✓ |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-LT-02 | Tra cứu và thống kê |  | ✓ |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-ACT-01 | Sử dụng quyền theo vai trò | ✓ | ✓ ✓ |  | ✓ ✓ | ✓ | ✓ | ✓ |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-ACT-02 | Áp dụng đúng luồng theo hình thức | ✓ | ✓ ✓ |  | ✓ ✓ | ✓ | ✓ |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-TB-01 | Nhận thông báo chuyển trạng thái | ✓ | ✓ ✓ |  | ✓ ✓ | ✓ | ✓ |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-TB-02 | Theo dõi trạng thái hồ sơ/biểu mẫu | ✓ | ✓ ✓ |  | ✓ ✓ | ✓ | ✓ |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Chú giải: ĐVTC - Đơn vị tổ chức; P.KHCN - Phòng Khoa học Công nghệ; BGH - Ban giám hiệu; HĐKH - Hội đồng Khoa học; BTT - Ban tổ chức/Ban thư ký; TCNTT - Phòng Công nghệ thông tin; TCKT - Phòng Tài chính - Kế toán; CQNN/HTQT - Cơ quan nhà nước/Phòng Hợp tác quốc tế.

## 5.4. Ma trận BM01A-BM06C

| BM | Áp dụng hình thức | Phương thức | Actor lập/nộp | Trạng thái kết thúc |
| --- | --- | --- | --- | --- |
| BM01A | Quốc tế/Quốc gia | Nhập form + tải PDF | ĐVTC | Đã nộp/Được duyệt |
| --- | --- | --- | --- | --- |
| BM01B | Chuyên đề | Nhập form + tải PDF | ĐVTC | Đã nộp/Được duyệt |
| --- | --- | --- | --- | --- |
| BM02A | Quốc tế | Nhập form + tải PDF | ĐVTC | Đã nộp |
| --- | --- | --- | --- | --- |
| BM02B | Quốc gia | Nhập form + tải PDF | ĐVTC | Đã nộp |
| --- | --- | --- | --- | --- |
| BM03 | Quốc tế | Tải PDF công văn | ĐVTC/HTQT/BGH | Đã có ý kiến CQNN |
| --- | --- | --- | --- | --- |
| BM04A | Quốc tế/Quốc gia | Nhập form + tải PDF | ĐVTC | Đã nộp |
| --- | --- | --- | --- | --- |
| BM04B | Chuyên đề | Nhập form + tải PDF | ĐVTC | Đã nộp |
| --- | --- | --- | --- | --- |
| BM05 | Quốc gia/Quốc tế | Nhập form + tải PDF/ảnh ký | Thành viên HĐKH l | Đã nộp, không sửa ại |
| --- | --- | --- | --- | --- |
| BM06A | Quốc tế | Nhập form + tải PDF | ĐVTC/TCKT/P.KHCN | Đã lưu |
| --- | --- | --- | --- | --- |
| BM06B | Quốc gia | Nhập form + tải PDF | ĐVTC/TCKT/P.KHCN | Đã lưu |
| --- | --- | --- | --- | --- |
| BM06C | Chuyên đề | Nhập form + tải PDF | ĐVTC/TCKT/P.KHCN | Đã lưu |
| --- | --- | --- | --- | --- |

# CHƯƠNG 6: PHỤ LỤC VÀ XÁC NHẬN

## 6.1. Ký hiệu mức độ ưu tiên

| Ký hiệu | Định nghĩa |
| --- | --- |
| Cao | Yêu cầu bắt buộc trong phạm vi phiên bản đầu. |
| --- | --- |
| Trung bình | Yêu cầu quan trọng có thể triển khai sau. |
| --- | --- |
| Thấp | Yêu cầu mong muốn, có thể hoãn khi hạn chế nguồn lực. |
| --- | --- |

## 6.2. Trạng thái yêu cầu

| Trạng thái | Mô tả |
| --- | --- |
| Đề xuất | Đã có trong dự thảo nhưng chưa được chủ đầu tư ký xác nhận. |
| --- | --- |
| Đã xác nhận | Đã được chủ đầu tư xác nhận chính thức. |
| --- | --- |
| Đang phát triển | Đội phát triển đang triển khai. |
| --- | --- |
| Hoàn thành | Đã triển khai và kiểm thử thành công. |
| --- | --- |
| Cần xác minh | Chưa đủ dữ liệu để trở thành baseline triển khai. |
| --- | --- |

## 6.3. Điểm giao tiếp và tích hợp

| Điểm giao tiếp | Mô tả |
| --- | --- |
| Tài khoản trong Trường | Dùng tài khoản do Nhà trường quản lý; cơ chế SSO cụ thể cần xác minh. |
| --- | --- |
| Website/email riêng của Hội nghị/Hội thảo | Hệ thống chỉ lưu đường dẫn tham chiếu; không tích hợp trực tiếp với hệ thống đăng ký/gửi bài do TCNTT thiết lập riêng. |
| --- | --- |
| Cơ quan nhà nước | Trao đổi công văn xin phép/ý kiến theo hình thức thủ công (BM03); không có tài khoản đăng nhập trong phiên bản đầu. |
| --- | --- |
| Tài chính-kế toán | Chứng từ và quyết toán xử lý theo QT.TCKT.04, nằm ngoài phạm vi phiên bản đầu. |
| --- | --- |
| Email/SMS | Ngoài phạm vi phiên bản đầu; chỉ dùng thông báo trong ứng dụng. |
| --- | --- |
| Ký số bên ngoài | Chưa tích hợp bắt buộc; hồ sơ vẫn có phương thức ảnh chữ ký hoặc PDF đã ký. |
| --- | --- |

## 6.4. Danh sách vấn đề mở

| Mã | Liên quan | Nội dung | Mô tả |
| --- | --- | --- | --- |
| OPEN-01 | M03 | Thời hạn xử lý ý kiến CQNN | Chưa xác định cơ chế cảnh báo/theo dõi khi cơ quan nhà nước phản hồi chậm hơn 45 ngày. |
| --- | --- | --- | --- |
| OPEN-02 | M05 | Cơ chế tích hợp website/email riêng | Chưa xác định mức độ tích hợp giữa hệ thống nội bộ và website/email riêng do TCNTT thiết lập cho từng sự kiện. |
| --- | --- | --- | --- |
| OPEN-03 | M07 | Hình thức thu phí cụ thể | Chưa xác định cổng thanh toán hoặc hình thức thu phí trực tuyến được hỗ trợ. |
| --- | --- | --- | --- |
| OPEN-04 | NFR | Chỉ số vận hành | Cần xác minh tải đồng thời, thời gian phản hồi, dung lượng tệp, RPO và RTO. |
| --- | --- | --- | --- |
| OPEN-05 | Phê duyệt | Thông tin ký xác nhận FRS | Chưa có họ tên đại diện Chủ đầu tư, Trưởng nhóm BA và người phê duyệt kỹ thuật. |
| --- | --- | --- | --- |

## 6.5. Xác nhận tài liệu

Việc ký xác nhận chuyển trạng thái các yêu cầu từ Đề xuất sang Đã xác nhận. Các vấn đề mở không mặc nhiên trở thành yêu cầu triển khai cho đến khi có quyết định bổ sung.

| Vai trò | Họ tên | Ngày ký |
| --- | --- | --- |
| Đại diện Chủ đầu tư |  |  |
| --- | --- | --- |
| Trưởng nhóm BA |  |  |
| --- | --- | --- |
| Phê duyệt kỹ thuật |  |  |
| --- | --- | --- |