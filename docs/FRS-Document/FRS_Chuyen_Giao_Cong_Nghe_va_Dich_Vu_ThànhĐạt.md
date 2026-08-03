**TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐỒNG NAI**

**ĐẶC TẢ YÊU CẦU CHỨC NĂNG**

***(FUNCTIONAL REQUIREMENTS SPECIFICATION)***

**QUY TRÌNH THỰC HIỆN CHUYỂN GIAO CÔNG NGHỆ VÀ DỊCH VỤ  
TRÊN NỀN TẢNG WEBSITE**

*Phiên bản 0.2 - Bản dự thảo*

| **Thông tin** | **Nội dung** |
| --- | --- |
| Mã tài liệu | FRS-NCKH-004 |
| Phiên bản | 0.2 |
| Ngày lập | Tháng 07 năm 2026 |
| Trạng thái | Bản dự thảo |
| Chủ đầu tư |  |
| Đơn vị lập |  |
| Tài liệu liên quan | QT.KHCN.05 - Quy trình thực hiện chuyển giao công nghệ và dịch vụ; BM01-BM16/QT.KHCN.05 |
| Lưu ý | Các nội dung ghi Cần xác minh chưa thuộc baseline triển khai. |

*Tài liệu này thuộc phạm vi nội bộ - Không phát hành ra bên ngoài khi chưa có sự đồng ý của chủ đầu tư.*

# LỊCH SỬ THAY ĐỔI TÀI LIỆU

| **Phiên bản** | **Ngày** | **Nội dung thay đổi** | **Người thực hiện** | **Ghi chú** |
| --- | --- | --- | --- | --- |
| 0.1 | 07/2026 | Khởi tạo bản FRS dự thảo hệ thống chuyển giao công nghệ và dịch vụ |  | Chờ review và xác nhận |
| 0.2 | 28/07/2026 | Sửa đổi format tài liệu | Trịnh Thành Đạt | Chờ review và xác nhận |

MỤC LỤC

**LỊCH SỬ THAY ĐỔI TÀI LIỆU 1**

**MỤC LỤC 1**

**CHƯƠNG 1: TỔNG QUAN TÀI LIỆU 4**

**1.1. Mục đích tài liệu 4**

**1.2. Phạm vi hệ thống 4**

**1.3. Yêu cầu nghiệp vụ cốt lõi 5**

**1.4. Đối tượng sử dụng 5**

**1.5. Định nghĩa và từ viết tắt 6**

**1.6. Tài liệu tham chiếu 6**

**CHƯƠNG 2: USER STORY, LUỒNG XỬ LÝ VÀ TRẠNG THÁI 6**

**2.1. Bộ user story 6**

**2.2. Luồng xử lý tổng thể 7**

**2.3. Mô hình trạng thái 8**

**2.3.1. Trạng thái đề tài chuyển giao 8**

**2.3.2. Trạng thái biểu mẫu 9**

**CHƯƠNG 3: YÊU CẦU CHỨC NĂNG CHI TIẾT 10**

**3.1. Module M01 - Đề xuất chuyển giao công nghệ 10**

**3.1.1. Mô tả chức năng 10**

**3.1.2. Yêu cầu chức năng 10**

**3.1.3. Trường dữ liệu chính 10**

**3.1.4. Quy tắc nghiệp vụ 11**

**3.1.5. Kết quả đầu ra 11**

**3.1.6. Tiêu chí nghiệm thu 11**

**3.2. Module M02 - Thẩm định và phê duyệt đăng ký 11**

**3.2.1. Mô tả chức năng 11**

**3.2.2. Yêu cầu chức năng 11**

**3.2.3. Trường dữ liệu chính 12**

**3.2.4. Quy tắc nghiệp vụ 13**

**3.2.5. Kết quả đầu ra 13**

**3.2.6. Tiêu chí nghiệm thu 13**

**3.3. Module M03 - Đàm phán và ký kết hợp đồng 14**

**3.3.1. Mô tả chức năng 14**

**3.3.2. Yêu cầu chức năng 14**

**3.3.3. Trường dữ liệu chính 14**

**3.3.4. Quy tắc nghiệp vụ 14**

**3.3.5. Kết quả đầu ra 15**

**3.3.6. Tiêu chí nghiệm thu 15**

**3.4. Module M04 - Thực hiện đề tài và báo cáo tiến độ 15**

**3.4.1. Mô tả chức năng 15**

**3.4.2. Yêu cầu chức năng 15**

**3.4.3. Trường dữ liệu chính 15**

**3.4.4. Quy tắc nghiệp vụ 16**

**3.4.5. Kết quả đầu ra 16**

**3.4.6. Tiêu chí nghiệm thu 16**

**3.5. Module M05 - Nghiệm thu cấp cơ sở 16**

**3.5.1. Mô tả chức năng 16**

**3.5.2. Yêu cầu chức năng 16**

**3.5.3. Trường dữ liệu chính 17**

**3.5.4. Quy tắc nghiệp vụ 17**

**3.5.5. Kết quả đầu ra 18**

**3.5.6. Tiêu chí nghiệm thu 18**

**3.6. Module M06 - Nghiệm thu, bàn giao và thanh lý hợp đồng với đối tác 18**

**3.6.1. Mô tả chức năng 18**

**3.6.2. Yêu cầu chức năng 18**

**3.6.3. Trường dữ liệu chính 19**

**3.6.4. Quy tắc nghiệp vụ 19**

**3.6.5. Kết quả đầu ra 19**

**3.6.6. Tiêu chí nghiệm thu 19**

**3.7. Module M07 - Quyết toán và lưu trữ hồ sơ chuyển giao 20**

**3.7.1. Mô tả chức năng 20**

**3.7.2. Yêu cầu chức năng 20**

**3.7.3. Trường dữ liệu chính 20**

**3.7.4. Quy tắc nghiệp vụ 21**

**3.7.5. Kết quả đầu ra 21**

**3.7.6. Tiêu chí nghiệm thu 21**

**3.8. Module M08 - Actor, phân quyền và truy cập 21**

**3.8.1. Mô tả chức năng 21**

**3.8.2. Yêu cầu chức năng 21**

**3.8.3. Trường dữ liệu chính 22**

**3.8.4. Quy tắc nghiệp vụ 22**

**3.8.5. Kết quả đầu ra 22**

**3.8.6. Tiêu chí nghiệm thu 22**

**3.9. Module M09 - Thông báo và truy vết 22**

**3.9.1. Mô tả chức năng 22**

**3.9.2. Yêu cầu chức năng 22**

**3.9.3. Trường dữ liệu chính 23**

**3.9.4. Quy tắc nghiệp vụ 23**

**3.9.5. Kết quả đầu ra 23**

**3.9.6. Tiêu chí nghiệm thu 23**

**CHƯƠNG 4: YÊU CẦU PHI CHỨC NĂNG 23**

**4.1. Các chỉ số cần xác minh 24**

**CHƯƠNG 5: BẢNG TỔNG HỢP VÀ TRUY VẾT 24**

**5.1. Tổng hợp yêu cầu theo module 24**

**5.2. Ma trận UCTQ - UCCT - module - biểu mẫu 25**

**5.3. Ma trận use case chi tiết - actor 26**

**5.4. Ma trận BM01-BM16 28**

**CHƯƠNG 6: PHỤ LỤC VÀ XÁC NHẬN 29**

**6.1. Ký hiệu mức độ ưu tiên 29**

**6.2. Trạng thái yêu cầu 29**

**6.3. Điểm giao tiếp và tích hợp 30**

**6.4. Danh sách vấn đề mở 30**

**6.5. Xác nhận tài liệu 30**

# CHƯƠNG 1: TỔNG QUAN TÀI LIỆU

## 1.1. Mục đích tài liệu

Tài liệu này mô tả yêu cầu chức năng, dữ liệu, quy tắc nghiệp vụ, trạng thái, yêu cầu phi chức năng và tiêu chí nghiệm thu của phân hệ quản lý chuyển giao công nghệ và dịch vụ trên nền tảng website, dựa trên Quy trình QT.KHCN.05 và bộ biểu mẫu BM01-BM16.

-   Làm cơ sở cho thiết kế và phát triển phần mềm.
-   Làm căn cứ kiểm thử, nghiệm thu và quản lý thay đổi yêu cầu.
-   Bảo đảm truy vết từ quy trình, biểu mẫu và use case đến chức năng triển khai.

## 1.2. Phạm vi hệ thống

Hệ thống hỗ trợ quản lý quy trình từ đề xuất chuyển giao công nghệ/dịch vụ, thẩm định và phê duyệt chủ trương, đàm phán và ký kết hợp đồng với bên nhận công nghệ, thực hiện và báo cáo tiến độ, nghiệm thu cơ sở, đến nghiệm thu - bàn giao - thanh lý hợp đồng với đối tác và quyết toán. Hệ thống quản lý dữ liệu, tệp, trạng thái, phân quyền, thông báo và dấu vết xử lý; việc đàm phán trực tiếp với đối tác, ký kết hợp đồng, ký quyết định và xử lý chứng từ kế toán chi tiết diễn ra bên ngoài hệ thống.

-   Đề xuất chuyển giao công nghệ
-   Thẩm định và phê duyệt đăng ký (Hội đồng xét duyệt - HĐXD)
-   Đàm phán và ký kết hợp đồng
-   Thực hiện đề tài và báo cáo tiến độ
-   Nghiệm thu cơ sở (Hội đồng nghiệm thu - HĐNT)
-   Nghiệm thu, bàn giao và thanh lý hợp đồng với đối tác
-   Quyết toán và phân chia lợi nhuận
-   Lưu trữ hồ sơ chuyển giao
-   Actor, phân quyền và truy cập
-   Thông báo và truy vết

Ngoài phạm vi:

-   Đàm phán trực tiếp về điều khoản hợp đồng với Bên nhận công nghệ; hệ thống chỉ lưu kết quả đàm phán và hợp đồng đã ký.
-   Tổ chức họp Hội đồng xét duyệt (HĐXD) hoặc Hội đồng nghiệm thu (HĐNT) trên hệ thống.
-   Ký kết hợp đồng, ký biên bản nghiệm thu/thanh lý với đối tác; hệ thống chỉ lưu bản đã ký.
-   Quyết toán hợp đồng, phân chia lợi nhuận chi tiết và xử lý chứng từ kế toán (QT.TCKT.04).
-   Tích hợp email, SMS hoặc dịch vụ ký số bên ngoài trong phiên bản đầu.

## 1.3. Yêu cầu nghiệp vụ cốt lõi

| **Mã** | **Yêu cầu** | **Nơi đặc tả** |
| --- | --- | --- |
| BR-CORE-01 | Hồ sơ và biểu mẫu chỉ có hiệu lực theo đúng phiên bản, chữ ký/tệp và mốc Nộp đã được quy định. | Chương 2-4 |
| BR-CORE-02 | Quyền truy cập được xác định theo actor, vai trò (CNĐT, P.KHCN, HĐXD, HĐNT, BGH, P.KT-TC, Bên nhận công nghệ) và trạng thái. | Chương 2-4 |
| BR-CORE-03 | Trạng thái và các thao tác quan trọng phải được lưu vết; audit log không được sửa/xóa bởi chức năng nghiệp vụ. | Chương 2-4 |
| BR-CORE-04 | Hợp đồng, biên bản nghiệm thu và biên bản thanh lý ký kết bên ngoài chỉ được lưu và công bố trong hệ thống theo đúng vai trò; hệ thống không tự giả lập quy trình ký ngoài phạm vi. | Chương 2-4 |

## 1.4. Đối tượng sử dụng

| **Nhóm người dùng** | **Vai trò** | **Phân quyền chính** |
| --- | --- | --- |
| Chủ nhiệm đề tài chuyển giao (CNĐT) | CNĐT | Lập đề xuất chuyển giao (BM01), viết thuyết minh, báo cáo tiến độ, báo cáo tổng kết và phối hợp nghiệm thu/thanh lý với đối tác. |
| Cán bộ/Phòng Khoa học Công nghệ (P.KHCN) | P.KHCN | Tiếp nhận, thẩm định tính hợp lệ hồ sơ, tổ chức Hội đồng xét duyệt/nghiệm thu, chủ trì đàm phán, theo dõi tiến độ, thực hiện thủ tục nghiệm thu và thanh lý, lưu trữ hồ sơ. |
| Ban Giám hiệu (BGH) | BGH | Phê duyệt chủ trương thực hiện, ký kết hợp đồng chuyển giao. |
| Thành viên Hội đồng xét duyệt (HĐXD) | HĐXD | Thẩm định tính khả thi, hiệu quả của đề xuất chuyển giao; nộp Phiếu nhận xét (BM04) và Biên bản họp Hội đồng (BM05). |
| Thành viên Hội đồng nghiệm thu (HĐNT) | HĐNT | Đánh giá mức độ hoàn thành của đề tài chuyển giao; nộp Phiếu đánh giá (BM11) và Biên bản họp Hội đồng đánh giá, nghiệm thu (BM13). |
| Phòng Tài chính - Kế toán (P.KT-TC) | P.KT-TC | Xác nhận và xử lý quyết toán hợp đồng chuyển giao. |
| Bên nhận công nghệ (đối tác) | Bên nhận CN | Tham gia đàm phán, ký hợp đồng, thực hiện nghĩa vụ thanh toán, ký biên bản nghiệm thu và thanh lý; không có tài khoản đăng nhập trong phiên bản đầu, tương tác qua hồ sơ do P.KHCN/CNĐT quản lý. |

## 1.5. Định nghĩa và từ viết tắt

| **Thuật ngữ/Viết tắt** | **Định nghĩa** |
| --- | --- |
| CNĐT | Chủ nhiệm đề tài (chuyển giao công nghệ/dịch vụ) |
| P.KHCN | Phòng Khoa học Công nghệ |
| HĐXD | Hội đồng xét duyệt (thẩm định tính khả thi, hiệu quả đề xuất chuyển giao) |
| HĐNT | Hội đồng nghiệm thu (đánh giá mức độ hoàn thành đề tài chuyển giao) |
| BGH | Ban giám hiệu |
| P.KT-TC | Phòng Kế hoạch - Tài chính/Tài chính - Kế toán |
| Bên nhận CN | Bên nhận công nghệ/đối tác nhận chuyển giao |
| Actor | Vai trò nghiệp vụ trực tiếp tương tác với hệ thống |
| Audit log | Nhật ký chỉ thêm mới dùng để truy vết thao tác quan trọng |
| Cần xác minh | Thông tin chưa đủ căn cứ để đưa vào baseline triển khai |

## 1.6. Tài liệu tham chiếu

-   FRS\_Mau.docx - mẫu cấu trúc và trình bày.
-   QT.KHCN.05 - Quy trình thực hiện chuyển giao công nghệ và dịch vụ và lưu đồ PPTX của P.KHCN.
-   Bộ biểu mẫu BM01-BM16/QT.KHCN.05 (BM12 không sử dụng trong lưu đồ gốc; đánh dấu Cần xác minh).
-   Quy trình QT.TCKT.04 của Phòng Tài chính - Kế toán (tham chiếu, ngoài phạm vi triển khai chi tiết).

# CHƯƠNG 2: USER STORY, LUỒNG XỬ LÝ VÀ TRẠNG THÁI

## 2.1. Bộ user story

| **Mã US** | **UCTQ** | **Tác nhân** | **User story** | **Module** |
| --- | --- | --- | --- | --- |
| US-01 | UCTQ-01 | CNĐT | Là Chủ nhiệm đề tài, tôi muốn lập Phiếu đăng ký đề tài chuyển giao công nghệ (BM01) khi sẵn sàng chuyển giao hoặc nhận được yêu cầu từ đối tác. | M01 |
| US-02 | UCTQ-02 | P.KHCN | Là cán bộ P.KHCN, tôi muốn tiếp nhận, xem xét tính hợp lệ hồ sơ, trình BGH phê duyệt chủ trương và tổ chức Hội đồng xét duyệt để thẩm định tính khả thi, hiệu quả của đề xuất. | M02 |
| US-03 | UCTQ-03 | HĐXD | Là thành viên Hội đồng xét duyệt, tôi muốn nộp Phiếu nhận xét hồ sơ đề tài (BM04) để góp phần vào kết luận thẩm định. | M02 |
| US-04 | UCTQ-04 | CNĐT | Là Chủ nhiệm đề tài, tôi muốn viết Thuyết minh đề tài (BM02) làm căn cứ cho Hội đồng xét duyệt và đàm phán hợp đồng. | M02 |
| US-05 | UCTQ-05 | P.KHCN | Là cán bộ P.KHCN, tôi muốn chủ trì phối hợp CNĐT đàm phán với Bên nhận công nghệ về các điều khoản hợp đồng. | M03 |
| US-06 | UCTQ-06 | BGH | Là thành viên BGH, tôi muốn ký kết Hợp đồng (BM06) với Bên nhận công nghệ sau khi đàm phán hoàn tất. | M03 |
| US-07 | UCTQ-07 | CNĐT | Là Chủ nhiệm đề tài, tôi muốn báo cáo tiến độ nửa thời gian thực hiện đề tài (BM07) theo tiến độ Hợp đồng. | M04 |
| US-08 | UCTQ-08 | CNĐT | Là Chủ nhiệm đề tài, tôi muốn nộp Báo cáo tổng kết đề tài (BM08) và Phiếu đề nghị nghiệm thu (BM09) để P.KHCN tổ chức Hội đồng nghiệm thu. | M05 |
| US-09 | UCTQ-09 | HĐNT | Là thành viên Hội đồng nghiệm thu, tôi muốn nộp Phiếu đánh giá kết quả thực hiện đề tài (BM11) và ký Biên bản họp Hội đồng đánh giá, nghiệm thu (BM13) để kết luận mức độ hoàn thành. | M05 |
| US-10 | UCTQ-10 | CNĐT | Là Chủ nhiệm đề tài, tôi muốn hoàn thiện/điều chỉnh báo cáo theo góp ý của HĐNT (BM14) và nộp lại cho P.KHCN lưu hồ sơ. | M05 |
| US-11 | UCTQ-11 | P.KHCN/Bên nhận CN | Là cán bộ P.KHCN, tôi muốn tổ chức nghiệm thu, bàn giao kết quả chuyển giao (BM15) và thanh lý hợp đồng (BM16) với Bên nhận công nghệ. | M06 |
| US-12 | UCTQ-12 | P.KHCN/P.KT-TC | Là cán bộ P.KHCN, tôi muốn phối hợp Phòng Tài chính - Kế toán thực hiện quyết toán hợp đồng và phân chia lợi nhuận sau khi thanh lý hợp đồng. | M07 |

## 2.2. Luồng xử lý tổng thể

| **Bước** | **Giai đoạn** | **Actor** | **Hành động chính** | **BM** | **Kết quả** |
| --- | --- | --- | --- | --- | --- |
| 1 | Đề xuất chuyển giao | CNĐT | Lập đề xuất chuyển giao công nghệ (05 ngày) | BM01 | Đề xuất sẵn sàng để P.KHCN tiếp nhận |
| 2 | Thẩm định &amp; phê duyệt đăng ký | P.KHCN; HĐXD; CNĐT; BGH | Kiểm tra hợp lệ, trình BGH phê duyệt chủ trương, tổ chức HĐXD thẩm định, CNĐT viết thuyết minh (15 ngày) | BM02-BM06 | Chủ trương được phê duyệt hoặc từ chối; thuyết minh sẵn sàng cho đàm phán |
| 3 | Đàm phán &amp; soạn hợp đồng | P.KHCN; CNĐT; Bên nhận CN | Đàm phán điều khoản với Bên nhận công nghệ (04 ngày) | — | Điều khoản hợp đồng được thống nhất |
| 4 | Ký kết Hợp đồng | BGH; CNĐT; Bên nhận CN | Ký kết hợp đồng (02 ngày) | BM06 | Hợp đồng chính thức có hiệu lực |
| 5 | Thực hiện đề tài | P.KHCN; CNĐT | P.KHCN cung cấp biểu mẫu; CNĐT báo cáo tiến độ nửa thời gian (theo tiến độ Hợp đồng) | BM07 | Báo cáo tiến độ giữa kỳ được lưu |
| 6 | Nghiệm thu cơ sở | CNĐT; P.KHCN; HĐNT; BGH | CNĐT nộp báo cáo tổng kết và sản phẩm; HĐNT đánh giá, kiến nghị điều chỉnh; CNĐT hoàn thiện báo cáo (07 ngày) | BM08-BM14 | Kết quả nghiệm thu cơ sở đạt hoặc chưa đạt yêu cầu |
| 7 | Nghiệm thu, bàn giao &amp; thanh lý với đối tác | P.KHCN; Bên nhận CN; CNĐT | Các bên nghiệm thu kết quả chuyển giao, ký biên bản nghiệm thu, Bên nhận CN thanh toán đầy đủ, thanh lý hợp đồng (07 ngày) | Biên bản nghiệm thu và bàn giao + Biên bản thanh lý | Kết quả chuyển giao được bàn giao; hợp đồng được thanh lý |
| 8 | Quyết toán &amp; phân chia lợi nhuận | P.KHCN; CNĐT; P.KT-TC | P.KHCN thực hiện thủ tục nghiệm thu và thanh lý; P.KT-TC quyết toán hợp đồng (07 ngày) | BM15-BM16 | Hợp đồng được quyết toán |
| 9 | Lưu hồ sơ | P.KHCN; CNĐT; P.KT-TC | Toàn bộ hồ sơ, tài liệu, hợp đồng, chứng từ được lưu trữ theo quy định (03 ngày) | — | Hồ sơ chuyển giao được lưu trữ đầy đủ |

## 2.3. Mô hình trạng thái

### 2.3.1. Trạng thái đề tài chuyển giao

| **Mã trạng thái** | **Tên trạng thái** | **Ý nghĩa** | **Điều kiện chuyển** |
| --- | --- | --- | --- |
| CG-NHAP | Nháp | CNĐT đang lập BM01, chưa nộp. | CNĐT tạo đề xuất. |
| CG-CHO-TD | Chờ thẩm định | P.KHCN đang kiểm tra tính hợp lệ hồ sơ đăng ký. | CNĐT nộp BM01. |
| CG-TU-CHOI | Từ chối | Hồ sơ không hợp lệ hoặc chủ trương không được phê duyệt; đề tài kết thúc. | P.KHCN/BGH kết luận từ chối. |
| CG-CHO-HDXD | Chờ Hội đồng xét duyệt | Chủ trương đã được BGH phê duyệt, chờ HĐXD thẩm định. | BGH phê duyệt chủ trương. |
| CG-CHINH-SUA | Chỉnh sửa | HĐXD kết luận cần chỉnh sửa thuyết minh/đề xuất. | HĐXD kết luận cần điều chỉnh. |
| CG-CHO-DAM-PHA | Chờ đàm phán | HĐXD thẩm định đạt, chờ đàm phán với Bên nhận CN. | HĐXD kết luận khả thi, hiệu quả. |
| CG-DA-KY-HD | Đã ký hợp đồng | Hợp đồng chuyển giao đã ký kết chính thức. | P.KHCN xác nhận ký kết hợp đồng. |
| CG-DANG-TH | Đang thực hiện | CNĐT triển khai theo Hợp đồng. | Hợp đồng có hiệu lực. |
| CG-CHO-NT-CS | Chờ nghiệm thu cơ sở | Đã nộp BM09, chờ HĐNT đánh giá. | CNĐT nộp BM08/BM09. |
| CG-CHUA-DAT | Chưa đạt yêu cầu | HĐNT kiến nghị điều chỉnh báo cáo/sản phẩm. | HĐNT kết luận cần chỉnh sửa. |
| CG-DA-NT-CS | Đã nghiệm thu cơ sở | HĐNT xác nhận mức độ hoàn thành đạt yêu cầu. | HĐNT xác nhận BM13 đạt. |
| CG-CHO-BAN-GIA | Chờ nghiệm thu &amp; bàn giao đối tác | Đang chờ nghiệm thu, bàn giao chính thức với Bên nhận CN. | HĐNT xác nhận đạt. |
| CG-DA-THANH-LY | Đã thanh lý | Đã ký biên bản nghiệm thu và thanh lý hợp đồng với đối tác. | Bên nhận CN thanh toán đủ, các bên ký biên bản thanh lý. |
| CG-HOAN-TAT | Hoàn tất | Đã quyết toán và lưu trữ hồ sơ. | P.KT-TC xác nhận quyết toán. |

### 2.3.2. Trạng thái biểu mẫu

| **Nhóm** | **Biểu mẫu** | **Chuỗi trạng thái** |
| --- | --- | --- |
| BM do CNĐT nộp | BM01/BM02/BM07/BM08/BM09/BM14 | Nháp → Đã nộp → Được chấp nhận / Trả sửa / Quá hạn |
| Phiếu Hội đồng | BM04/BM11 | Nháp → Đã nộp; đã nộp không được sửa hoặc nộp lại |
| Biên bản Hội đồng | BM05/BM13 | Nháp → Chờ P.KHCN xác nhận → Trả chỉnh sửa → Đã xác nhận |
| Hợp đồng/biên bản với đối tác | BM06/BM15/BM16 | Dự thảo → Đã ký (ngoài hệ thống) → Đã lưu trong hệ thống |

# CHƯƠNG 3: YÊU CẦU CHỨC NĂNG CHI TIẾT

Chương này sử dụng trực tiếp mã UC chi tiết làm mã yêu cầu chức năng. Mọi yêu cầu trong phạm vi phiên bản đầu có ưu tiên Cao và trạng thái Đề xuất cho đến khi tài liệu được ký xác nhận.

## 3.1. Module M01 - Đề xuất chuyển giao công nghệ

### 3.1.1. Mô tả chức năng

Module M01 nhóm 4 yêu cầu liên quan đến việc CNĐT lập và nộp Phiếu đăng ký đề tài chuyển giao công nghệ. Actor tham gia: CNĐT.

### 3.1.2. Yêu cầu chức năng

| **Mã YC** | **Tên chức năng** | **Actor** | **Mô tả và kết quả** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| UC-DX-01 | Tạo đề xuất chuyển giao công nghệ (BM01) | CNĐT | CNĐT khởi tạo Phiếu đăng ký đề tài chuyển giao công nghệ (BM01) khi sẵn sàng chuyển giao hoặc nhận được yêu cầu từ đối tác. Kết quả: Đề xuất được lưu ở trạng thái nháp. | Cao | Đề xuất |
| UC-DX-02 | Nhập thông tin đối tác và nội dung chuyển giao | CNĐT | CNĐT nhập tên công nghệ/dịch vụ, đối tác nhận chuyển giao (nếu có), nội dung và phạm vi dự kiến chuyển giao. Kết quả: Thông tin đề xuất được lưu đầy đủ. | Cao | Đề xuất |
| UC-DX-03 | Đính kèm tài liệu minh chứng (nếu có) | CNĐT | CNĐT đính kèm tài liệu liên quan (nếu có yêu cầu từ đối tác, MOU/MOA). Kết quả: Hồ sơ đầy đủ tài liệu hỗ trợ. | Trung bình | Đề xuất |
| UC-DX-04 | Nộp đề xuất cho P.KHCN | CNĐT | CNĐT nộp đề xuất trong hạn 05 ngày kể từ khi phát sinh nhu cầu. Kết quả: Đề xuất chuyển trạng thái Chờ thẩm định. | Cao | Đề xuất |

### 3.1.3. Trường dữ liệu chính

| **STT** | **Nhóm dữ liệu** | **Mô tả** |
| --- | --- | --- |
| 1 | Thông tin CNĐT | Họ tên, đơn vị, thông tin liên hệ. |
| 2 | Thông tin công nghệ/dịch vụ | Tên công nghệ/dịch vụ, lĩnh vực, mô tả, đối tác dự kiến (nếu có). |
| 3 | Tài liệu đính kèm | MOU/MOA (nếu có), tài liệu minh chứng khác. |

### 3.1.4. Quy tắc nghiệp vụ

| **Mã BR** | **Quy tắc** | **UC liên quan** |
| --- | --- | --- |
| BR-M01-01 | Thời hạn lập đề xuất là 05 ngày kể từ khi CNĐT sẵn sàng chuyển giao hoặc nhận yêu cầu từ đối tác. | UC-DX-01, UC-DX-04 |
| BR-M01-02 | Đề xuất phải được nộp kèm thông tin đối tác (nếu đã xác định) trước khi chuyển sang bước thẩm định. | UC-DX-02, UC-DX-04 |

### 3.1.5. Kết quả đầu ra

-   UC-DX-01: Đề xuất được lưu ở trạng thái nháp.
-   UC-DX-02: Thông tin đề xuất được lưu đầy đủ.
-   UC-DX-03: Hồ sơ đầy đủ tài liệu hỗ trợ.
-   UC-DX-04: Đề xuất chuyển trạng thái Chờ thẩm định.

### 3.1.6. Tiêu chí nghiệm thu

| **Mã AC** | **UC** | **Tiêu chí nghiệm thu** |
| --- | --- | --- |
| AC-UC-DX-01 | UC-DX-01 | Khi CNĐT khởi tạo BM01, hệ thống lưu đề xuất ở trạng thái nháp và cho phép chỉnh sửa trước khi nộp. |
| AC-UC-DX-02 | UC-DX-02 | Khi CNĐT nhập đầy đủ trường bắt buộc, hệ thống lưu thông tin đề xuất kèm đối tác (nếu có). |
| AC-UC-DX-03 | UC-DX-03 | Khi CNĐT tải tài liệu đính kèm hợp lệ, hệ thống lưu và hiển thị lại trước khi nộp. |
| AC-UC-DX-04 | UC-DX-04 | Khi CNĐT nộp đề xuất trong hạn 05 ngày, hệ thống chuyển trạng thái sang Chờ thẩm định và lưu dấu vết thời điểm nộp. |

## 3.2. Module M02 - Thẩm định và phê duyệt đăng ký

### 3.2.1. Mô tả chức năng

Module M02 nhóm 7 yêu cầu liên quan đến việc P.KHCN thẩm định tính hợp lệ, trình BGH phê duyệt chủ trương, tổ chức Hội đồng xét duyệt (HĐXD) thẩm định tính khả thi và CNĐT viết thuyết minh. Actor tham gia: P.KHCN; BGH; HĐXD; CNĐT.

### 3.2.2. Yêu cầu chức năng

| **Mã YC** | **Tên chức năng** | **Actor** | **Mô tả và kết quả** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| UC-TD-01 | Kiểm tra tính hợp lệ hồ sơ đăng ký | P.KHCN | P.KHCN tiếp nhận và kiểm tra tính hợp lệ của hồ sơ đề xuất. Kết quả: Hồ sơ được xác định hợp lệ hoặc không hợp lệ. | Cao | Đề xuất |
| UC-TD-02 | Trình BGH phê duyệt chủ trương | P.KHCN | P.KHCN trình BGH xem xét, phê duyệt chủ trương thực hiện chuyển giao. Kết quả: Chủ trương được phê duyệt hoặc từ chối. | Cao | Đề xuất |
| UC-TD-03 | Tổ chức Hội đồng xét duyệt (HĐXD) | P.KHCN | P.KHCN tổ chức Hội đồng xét duyệt (HĐXD) để thẩm định tính khả thi, hiệu quả của đề xuất. Kết quả: Hồ sơ sẵn sàng để HĐXD đánh giá. | Cao | Đề xuất |
| UC-TD-04 | Xem hồ sơ phục vụ thẩm định | Thành viên HĐXD | Thành viên HĐXD xem hồ sơ đề xuất và thuyết minh để phục vụ thẩm định. Kết quả: Thành viên có đủ thông tin để đánh giá. | Cao | Đề xuất |
| UC-TD-05 | Lập và nộp Phiếu nhận xét (BM04) | Thành viên HĐXD | Thành viên HĐXD lập và nộp Phiếu nhận xét hồ sơ đề tài (BM04). Kết quả: Phiếu nhận xét được lưu. | Cao | Đề xuất |
| UC-TD-06 | Lập Biên bản họp Hội đồng (BM05) | P.KHCN/Chủ tịch HĐXD | P.KHCN/Chủ tịch HĐXD lập Biên bản họp Hội đồng (BM05) kết luận khả thi/ không khả thi. Kết quả: Kết luận HĐXD được lưu. | Cao | Đề xuất |
| UC-TD-07 | Viết và nộp Thuyết minh đề tài (BM02) | CNĐT | CNĐT viết Thuyết minh đề tài (BM02) trong 15 ngày làm căn cứ cho HĐXD và đàm phán hợp đồng. Kết quả: Thuyết minh sẵn sàng phục vụ đàm phán. | Cao | Đề xuất |

### 3.2.3. Trường dữ liệu chính

| **STT** | **Nhóm dữ liệu** | **Mô tả** |
| --- | --- | --- |
| 1 | Kết luận kiểm tra hợp lệ | Hợp lệ/Không hợp lệ, người kiểm tra, thời điểm, lý do (nếu không hợp lệ). |
| 2 | Chủ trương BGH | Phê duyệt/Không phê duyệt, người ký, thời điểm. |
| 3 | BM02 - Thuyết minh | Mục tiêu, nội dung, phạm vi, phương án chuyển giao, dự toán kinh phí, tiến độ dự kiến. |
| 4 | BM03 - Quyết định thành lập HĐXD | Danh sách thành viên HĐXD, số quyết định, ngày ký. |
| 5 | BM04 - Phiếu nhận xét | Nội dung nhận xét, kết luận khả thi/không khả thi, ghi chú của từng thành viên. |
| 6 | BM05 - Biên bản họp HĐXD | Kết luận chung của HĐXD, kiến nghị điều chỉnh (nếu có). |

### 3.2.4. Quy tắc nghiệp vụ

| **Mã BR** | **Quy tắc** | **UC liên quan** |
| --- | --- | --- |
| BR-M02-01 | Chủ trương phải được BGH phê duyệt trước khi tổ chức HĐXD. | UC-TD-02, UC-TD-03 |
| BR-M02-02 | BM04 đã nộp không được sửa hoặc nộp lại; mọi điều chỉnh phải qua phiếu mới có ghi chú thay thế. | UC-TD-05 |
| BR-M02-03 | Thời hạn viết thuyết minh (BM02) là 15 ngày kể từ khi chủ trương được phê duyệt. | UC-TD-07 |
| BR-M02-04 | Kết luận HĐXD không khả thi/không hiệu quả đưa đề tài về trạng thái Từ chối, không chuyển sang bước đàm phán. | UC-TD-06 |

### 3.2.5. Kết quả đầu ra

-   UC-TD-01: Hồ sơ được xác định hợp lệ hoặc không hợp lệ.
-   UC-TD-02: Chủ trương được phê duyệt hoặc từ chối.
-   UC-TD-03: Hồ sơ sẵn sàng để HĐXD đánh giá.
-   UC-TD-04: Thành viên có đủ thông tin để đánh giá.
-   UC-TD-05: Phiếu nhận xét được lưu.
-   UC-TD-06: Kết luận HĐXD được lưu.
-   UC-TD-07: Thuyết minh sẵn sàng phục vụ đàm phán.

### 3.2.6. Tiêu chí nghiệm thu

| **Mã AC** | **UC** | **Tiêu chí nghiệm thu** |
| --- | --- | --- |
| AC-UC-TD-01 | UC-TD-01 | Khi P.KHCN kết luận hợp lệ, hệ thống chuyển hồ sơ sang bước trình BGH; nếu không hợp lệ, hệ thống yêu cầu nhập lý do. |
| AC-UC-TD-02 | UC-TD-02 | Khi BGH phê duyệt chủ trương, hệ thống mở khóa bước tổ chức HĐXD và lưu dấu vết người phê duyệt. |
| AC-UC-TD-03 | UC-TD-03 | Khi P.KHCN xác nhận danh sách HĐXD hợp lệ, hệ thống lưu BM03 và cấp quyền xem hồ sơ cho thành viên. |
| AC-UC-TD-04 | UC-TD-04 | Khi thành viên HĐXD truy cập đúng quyền, hệ thống hiển thị đầy đủ hồ sơ đề xuất/thuyết minh. |
| AC-UC-TD-05 | UC-TD-05 | Khi thành viên HĐXD nộp BM04 hợp lệ, hệ thống khóa phiếu và lưu dấu vết không cho sửa/nộp lại. |
| AC-UC-TD-06 | UC-TD-06 | Khi biên bản BM05 được lập và xác nhận, hệ thống cập nhật kết luận thẩm định của đề tài chuyển giao. |
| AC-UC-TD-07 | UC-TD-07 | Khi CNĐT nộp BM02 trong hạn 15 ngày, hệ thống lưu thuyết minh và mở khóa bước đàm phán hợp đồng. |

## 3.3. Module M03 - Đàm phán và ký kết hợp đồng

### 3.3.1. Mô tả chức năng

Module M03 nhóm 3 yêu cầu liên quan đến đàm phán điều khoản và ký kết hợp đồng chuyển giao với Bên nhận công nghệ. Actor tham gia: P.KHCN; CNĐT; BGH; Bên nhận CN.

### 3.3.2. Yêu cầu chức năng

| **Mã YC** | **Tên chức năng** | **Actor** | **Mô tả và kết quả** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| UC-HD-01 | Ghi nhận kết quả đàm phán với Bên nhận CN | P.KHCN | P.KHCN chủ trì phối hợp CNĐT ghi nhận kết quả đàm phán với Bên nhận công nghệ về các điều khoản trong 04 ngày. Kết quả: Điều khoản hợp đồng được thống nhất. | Cao | Đề xuất |
| UC-HD-02 | Tải Hợp đồng đã ký (BM06) | BGH/P.KHCN | BGH ký kết Hợp đồng (BM06) với Bên nhận công nghệ trong 02 ngày; P.KHCN tải bản hợp đồng đã ký lên hệ thống. Kết quả: Hợp đồng chính thức có hiệu lực. | Cao | Đề xuất |
| UC-HD-03 | Xem/tải Hợp đồng đã ký | CNĐT/P.KHCN | Người có quyền xem/tải Hợp đồng đã ký của đề tài. Kết quả: Các bên liên quan có căn cứ triển khai thực hiện. | Cao | Đề xuất |

### 3.3.3. Trường dữ liệu chính

| **STT** | **Nhóm dữ liệu** | **Mô tả** |
| --- | --- | --- |
| 1 | Kết quả đàm phán | Điều khoản đã thống nhất, ghi chú, thời điểm. |
| 2 | BM06 - Hợp đồng | Tệp hợp đồng đã ký giữa Trường với CNĐT/Bên nhận công nghệ, số hợp đồng, ngày ký, thời hạn thực hiện, giá trị hợp đồng. |

### 3.3.4. Quy tắc nghiệp vụ

| **Mã BR** | **Quy tắc** | **UC liên quan** |
| --- | --- | --- |
| BR-M03-01 | Đàm phán chỉ được tiến hành sau khi HĐXD kết luận khả thi, hiệu quả. | UC-HD-01 |
| BR-M03-02 | Hợp đồng chỉ có hiệu lực trong hệ thống sau khi được tải lên dưới dạng bản đã ký; hệ thống không tự soạn thảo nội dung hợp đồng. | UC-HD-02 |
| BR-M03-03 | Thời hạn đàm phán là 04 ngày, thời hạn ký kết là 02 ngày kể từ khi thống nhất điều khoản. | UC-HD-01, UC-HD-02 |

### 3.3.5. Kết quả đầu ra

-   UC-HD-01: Điều khoản hợp đồng được thống nhất.
-   UC-HD-02: Hợp đồng chính thức có hiệu lực.
-   UC-HD-03: Các bên liên quan có căn cứ triển khai thực hiện.

### 3.3.6. Tiêu chí nghiệm thu

| **Mã AC** | **UC** | **Tiêu chí nghiệm thu** |
| --- | --- | --- |
| AC-UC-HD-01 | UC-HD-01 | Khi P.KHCN ghi nhận kết quả đàm phán hợp lệ, hệ thống lưu điều khoản và mở khóa bước ký kết. |
| AC-UC-HD-02 | UC-HD-02 | Khi P.KHCN tải hợp đồng đã ký hợp lệ, hệ thống chuyển đề tài sang trạng thái Đã ký hợp đồng. |
| AC-UC-HD-03 | UC-HD-03 | Khi actor có quyền truy cập, hệ thống hiển thị và cho phép tải hợp đồng đã ký. |

## 3.4. Module M04 - Thực hiện đề tài và báo cáo tiến độ

### 3.4.1. Mô tả chức năng

Module M04 nhóm 2 yêu cầu liên quan đến việc CNĐT báo cáo tiến độ thực hiện đề tài chuyển giao. Actor tham gia: P.KHCN; CNĐT.

### 3.4.2. Yêu cầu chức năng

| **Mã YC** | **Tên chức năng** | **Actor** | **Mô tả và kết quả** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| UC-BC-01 | Lập và nộp Báo cáo tiến độ (BM07) | CNĐT | CNĐT lập và nộp Báo cáo tình hình thực hiện đề tài (BM07) theo tiến độ nửa thời gian của Hợp đồng. Kết quả: Báo cáo tiến độ được lưu. | Cao | Đề xuất |
| UC-BC-02 | Xem/tải báo cáo tiến độ | P.KHCN/CNĐT | Người có quyền xem/tải báo cáo tiến độ đề tài. Kết quả: Có căn cứ theo dõi tiến độ thực hiện. | Cao | Đề xuất |

### 3.4.3. Trường dữ liệu chính

| **STT** | **Nhóm dữ liệu** | **Mô tả** |
| --- | --- | --- |
| 1 | BM07 | Nội dung công việc đã thực hiện theo Hợp đồng, khối lượng hoàn thành, khó khăn vướng mắc, kế hoạch tiếp theo. |

### 3.4.4. Quy tắc nghiệp vụ

| **Mã BR** | **Quy tắc** | **UC liên quan** |
| --- | --- | --- |
| BR-M04-01 | Báo cáo tiến độ nộp theo tiến độ quy định trong Hợp đồng (thông thường tại mốc nửa thời gian thực hiện); mốc cụ thể theo từng hợp đồng cần xác minh. | UC-BC-01 |

### 3.4.5. Kết quả đầu ra

-   UC-BC-01: Báo cáo tiến độ được lưu.
-   UC-BC-02: Có căn cứ theo dõi tiến độ thực hiện.

### 3.4.6. Tiêu chí nghiệm thu

| **Mã AC** | **UC** | **Tiêu chí nghiệm thu** |
| --- | --- | --- |
| AC-UC-BC-01 | UC-BC-01 | Khi CNĐT nộp BM07 đầy đủ trường bắt buộc, hệ thống lưu báo cáo và gắn với đúng đề tài. |
| AC-UC-BC-02 | UC-BC-02 | Khi actor có quyền truy cập, hệ thống hiển thị và cho phép tải báo cáo tiến độ. |

## 3.5. Module M05 - Nghiệm thu cấp cơ sở

### 3.5.1. Mô tả chức năng

Module M05 nhóm 7 yêu cầu liên quan đến việc CNĐT nộp báo cáo tổng kết, P.KHCN tổ chức Hội đồng nghiệm thu (HĐNT) đánh giá và CNĐT hoàn thiện báo cáo theo kiến nghị. Actor tham gia: CNĐT; P.KHCN; HĐNT; BGH.

### 3.5.2. Yêu cầu chức năng

| **Mã YC** | **Tên chức năng** | **Actor** | **Mô tả và kết quả** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| UC-NT-01 | Nộp Báo cáo tổng kết đề tài (BM08) | CNĐT | CNĐT nộp Báo cáo tổng kết đề tài (BM08) kèm sản phẩm. Kết quả: Báo cáo tổng kết được lưu. | Cao | Đề xuất |
| UC-NT-02 | Nộp Phiếu đề nghị nghiệm thu (BM09) | CNĐT | CNĐT nộp Phiếu đề nghị nghiệm thu (BM09). Kết quả: Hồ sơ chuyển trạng thái Chờ nghiệm thu cơ sở. | Cao | Đề xuất |
| UC-NT-03 | Tham mưu ra Quyết định thành lập HĐNT (BM10) | P.KHCN | P.KHCN tham mưu BGH ra Quyết định thành lập HĐNT (BM10). Kết quả: Hội đồng nghiệm thu được thành lập. | Cao | Đề xuất |
| UC-NT-04 | Xem hồ sơ phục vụ đánh giá | Thành viên HĐNT | Thành viên HĐNT xem hồ sơ nghiệm thu để phục vụ đánh giá. Kết quả: Thành viên có đủ thông tin để đánh giá. | Cao | Đề xuất |
| UC-NT-05 | Lập và nộp Phiếu đánh giá (BM11) | Thành viên HĐNT | Thành viên HĐNT lập và nộp Phiếu đánh giá kết quả thực hiện đề tài (BM11). Kết quả: Phiếu đánh giá được lưu. | Cao | Đề xuất |
| UC-NT-06 | Lập và ký Biên bản đánh giá, nghiệm thu (BM13) | P.KHCN/Chủ tịch HĐNT | P.KHCN/Chủ tịch HĐNT lập Biên bản họp Hội đồng đánh giá, nghiệm thu (BM13) kèm kết luận đạt/chưa đạt yêu cầu. Kết quả: Biên bản nghiệm thu cơ sở được lưu. | Cao | Đề xuất |
| UC-NT-07 | Hoàn thiện báo cáo theo kiến nghị (BM14) và nộp lại | CNĐT | Trường hợp chưa đạt yêu cầu, CNĐT hoàn thiện/điều chỉnh báo cáo theo góp ý của HĐNT (BM14) và nộp lại cho P.KHCN lưu hồ sơ trong 07 ngày. Kết quả: Báo cáo hoàn chỉnh được lưu. | Cao | Đề xuất |

### 3.5.3. Trường dữ liệu chính

| **STT** | **Nhóm dữ liệu** | **Mô tả** |
| --- | --- | --- |
| 1 | BM08 | Nội dung báo cáo tổng kết, kết quả thực hiện theo Hợp đồng, sản phẩm đính kèm. |
| 2 | BM09 | Thông tin đề tài, thời gian/địa điểm nghiệm thu dự kiến, danh sách giới thiệu thành viên Hội đồng. |
| 3 | BM10 | Danh sách thành viên HĐNT kèm vai trò, số quyết định, ngày ký. |
| 4 | BM11 | Đánh giá mức độ hoàn thành theo từng nội dung Hợp đồng, kết luận đạt/chưa đạt, ghi chú. |
| 5 | BM13 | Kết luận chung của HĐNT, kiến nghị điều chỉnh (nếu có), chữ ký Chủ tịch/Thư ký. |
| 6 | BM14 | Nội dung điều chỉnh theo từng góp ý của HĐNT, tệp báo cáo đã hoàn thiện. |

### 3.5.4. Quy tắc nghiệp vụ

| **Mã BR** | **Quy tắc** | **UC liên quan** |
| --- | --- | --- |
| BR-M05-01 | BM11 đã nộp không được sửa hoặc nộp lại; mọi điều chỉnh phải qua phiếu mới có ghi chú thay thế. | UC-NT-05 |
| BR-M05-02 | Trường hợp HĐNT kết luận chưa đạt yêu cầu, CNĐT phải hoàn thiện và nộp lại báo cáo (BM14) trong 07 ngày. | UC-NT-06, UC-NT-07 |
| BR-M05-03 | Việc thành lập HĐNT (BM10) tuân theo quy định nội bộ về Hội đồng khoa học công nghệ của Trường. | UC-NT-03 |

### 3.5.5. Kết quả đầu ra

-   UC-NT-01: Báo cáo tổng kết được lưu.
-   UC-NT-02: Hồ sơ chuyển trạng thái Chờ nghiệm thu cơ sở.
-   UC-NT-03: Hội đồng nghiệm thu được thành lập.
-   UC-NT-04: Thành viên có đủ thông tin để đánh giá.
-   UC-NT-05: Phiếu đánh giá được lưu.
-   UC-NT-06: Biên bản nghiệm thu cơ sở được lưu.
-   UC-NT-07: Báo cáo hoàn chỉnh được lưu.

### 3.5.6. Tiêu chí nghiệm thu

| **Mã AC** | **UC** | **Tiêu chí nghiệm thu** |
| --- | --- | --- |
| AC-UC-NT-01 | UC-NT-01 | Khi CNĐT nộp BM08 kèm sản phẩm hợp lệ, hệ thống lưu báo cáo tổng kết và gắn với đúng đề tài. |
| AC-UC-NT-02 | UC-NT-02 | Khi CNĐT nộp BM09 hợp lệ, hệ thống chuyển trạng thái đề tài sang Chờ nghiệm thu cơ sở. |
| AC-UC-NT-03 | UC-NT-03 | Khi P.KHCN xác nhận danh sách HĐNT hợp lệ, hệ thống lưu BM10 và cấp quyền xem hồ sơ cho thành viên. |
| AC-UC-NT-04 | UC-NT-04 | Khi thành viên HĐNT truy cập đúng quyền, hệ thống hiển thị đầy đủ hồ sơ nghiệm thu cần đánh giá. |
| AC-UC-NT-05 | UC-NT-05 | Khi thành viên HĐNT nộp BM11 hợp lệ, hệ thống khóa phiếu và lưu dấu vết không cho sửa/nộp lại. |
| AC-UC-NT-06 | UC-NT-06 | Khi biên bản BM13 được lập và xác nhận, hệ thống cập nhật kết luận nghiệm thu cơ sở của đề tài. |
| AC-UC-NT-07 | UC-NT-07 | Khi CNĐT nộp lại BM14 trong hạn 07 ngày, hệ thống lưu báo cáo hoàn chỉnh và mở khóa bước nghiệm thu, bàn giao với đối tác. |

## 3.6. Module M06 - Nghiệm thu, bàn giao và thanh lý hợp đồng với đối tác

### 3.6.1. Mô tả chức năng

Module M06 nhóm 3 yêu cầu liên quan đến việc nghiệm thu kết quả chuyển giao, bàn giao và thanh lý hợp đồng với Bên nhận công nghệ. Actor tham gia: P.KHCN; CNĐT; Bên nhận CN.

### 3.6.2. Yêu cầu chức năng

| **Mã YC** | **Tên chức năng** | **Actor** | **Mô tả và kết quả** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| UC-BG-01 | Lập và tải Biên bản nghiệm thu và bàn giao (BM15) | P.KHCN/CNĐT | Các bên tiến hành nghiệm thu kết quả chuyển giao; P.KHCN tải Biên bản nghiệm thu và bàn giao kết quả (BM15) đã ký lên hệ thống trong 07 ngày. Kết quả: Kết quả chuyển giao được bàn giao chính thức. | Cao | Đề xuất |
| UC-BG-02 | Ghi nhận nghĩa vụ thanh toán của Bên nhận CN | P.KHCN | P.KHCN ghi nhận việc Bên nhận công nghệ đã thực hiện đầy đủ nghĩa vụ thanh toán theo hợp đồng. Kết quả: Có căn cứ để thanh lý hợp đồng. | Cao | Đề xuất |
| UC-BG-03 | Lập và tải Biên bản thanh lý hợp đồng (BM16) | P.KHCN | P.KHCN tải Biên bản thanh lý hợp đồng (BM16) đã ký giữa các bên lên hệ thống. Kết quả: Hợp đồng chuyển giao được thanh lý chính thức. | Cao | Đề xuất |

### 3.6.3. Trường dữ liệu chính

| **STT** | **Nhóm dữ liệu** | **Mô tả** |
| --- | --- | --- |
| 1 | BM15 | Nội dung nghiệm thu, kết quả bàn giao, chữ ký các bên (Trường, CNĐT, Bên nhận CN). |
| 2 | Xác nhận nghĩa vụ thanh toán | Số tiền/hình thức thanh toán, thời điểm hoàn tất nghĩa vụ. |
| 3 | BM16 | Nội dung thanh lý, giá trị quyết toán, chữ ký các bên. |

### 3.6.4. Quy tắc nghiệp vụ

| **Mã BR** | **Quy tắc** | **UC liên quan** |
| --- | --- | --- |
| BR-M06-01 | Biên bản thanh lý (BM16) chỉ được lập sau khi Bên nhận công nghệ đã thực hiện đầy đủ nghĩa vụ thanh toán theo hợp đồng. | UC-BG-02, UC-BG-03 |
| BR-M06-02 | Thời hạn nghiệm thu, bàn giao và thanh lý là 07 ngày kể từ khi báo cáo tổng kết được hoàn thiện (BM14). | UC-BG-01, UC-BG-03 |

### 3.6.5. Kết quả đầu ra

-   UC-BG-01: Kết quả chuyển giao được bàn giao chính thức.
-   UC-BG-02: Có căn cứ để thanh lý hợp đồng.
-   UC-BG-03: Hợp đồng chuyển giao được thanh lý chính thức.

### 3.6.6. Tiêu chí nghiệm thu

| **Mã AC** | **UC** | **Tiêu chí nghiệm thu** |
| --- | --- | --- |
| AC-UC-BG-01 | UC-BG-01 | Khi P.KHCN tải BM15 đã ký hợp lệ trong hạn 07 ngày, hệ thống cập nhật trạng thái đề tài và lưu dấu vết. |
| AC-UC-BG-02 | UC-BG-02 | Khi P.KHCN ghi nhận nghĩa vụ thanh toán đã hoàn tất, hệ thống mở khóa bước lập biên bản thanh lý. |
| AC-UC-BG-03 | UC-BG-03 | Khi P.KHCN tải BM16 đã ký hợp lệ, hệ thống chuyển đề tài sang trạng thái Đã thanh lý. |

## 3.7. Module M07 - Quyết toán và lưu trữ hồ sơ chuyển giao

### 3.7.1. Mô tả chức năng

Module M07 nhóm 3 yêu cầu liên quan đến việc P.KHCN phối hợp P.KT-TC quyết toán hợp đồng và lưu trữ toàn bộ hồ sơ chuyển giao. Actor tham gia: P.KHCN; CNĐT; P.KT-TC.

### 3.7.2. Yêu cầu chức năng

| **Mã YC** | **Tên chức năng** | **Actor** | **Mô tả và kết quả** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| UC-QT-01 | Thực hiện thủ tục nghiệm thu và thanh lý nội bộ với CNĐT | P.KHCN | P.KHCN thực hiện thủ tục nghiệm thu và thanh lý hợp đồng đối với CNĐT trong 07 ngày. Kết quả: Thủ tục nội bộ với CNĐT hoàn tất. | Cao | Đề xuất |
| UC-QT-02 | Ghi nhận kết quả quyết toán | P.KHCN/ P.KT-TC | P.KT-TC thực hiện quyết toán hợp đồng; P.KHCN ghi nhận kết quả quyết toán vào hệ thống. Kết quả: Đề tài chuyển trạng thái Hoàn tất. | Cao | Đề xuất |
| UC-QT-03 | Lưu trữ hồ sơ tổng hợp | P.KHCN/ CNĐT/P.KT-TC | Toàn bộ hồ sơ, tài liệu, hợp đồng, chứng từ liên quan được lưu trữ theo quy định của Trường và pháp luật trong 03 ngày. Kết quả: Hồ sơ chuyển giao được lưu trữ đầy đủ. | Cao | Đề xuất |

### 3.7.3. Trường dữ liệu chính

| **STT** | **Nhóm dữ liệu** | **Mô tả** |
| --- | --- | --- |
| 1 | Kết quả quyết toán | Giá trị quyết toán, tỷ lệ phân chia lợi nhuận (nếu có), tệp chứng từ tham chiếu; chi tiết xử lý theo QT.TCKT.04, ngoài phạm vi triển khai. |
| 2 | Hồ sơ lưu trữ tổng hợp | Toàn bộ tệp và dữ liệu từ Module M01-M06 gắn với từng đề tài chuyển giao. |

### 3.7.4. Quy tắc nghiệp vụ

| **Mã BR** | **Quy tắc** | **UC liên quan** |
| --- | --- | --- |
| BR-M07-01 | Đề tài chuyển trạng thái Hoàn tất chỉ sau khi có xác nhận quyết toán từ P.KT-TC. | UC-QT-02 |
| BR-M07-02 | Phân chia lợi nhuận (nếu có) xử lý theo quy định tài chính riêng của Trường; hệ thống chỉ lưu kết quả cuối cùng, không tính toán chi tiết. | UC-QT-02 |
| BR-M07-03 | Dữ liệu lưu trữ không được xóa bởi chức năng nghiệp vụ thông thường; chỉ vô hiệu hóa theo quy trình quản trị dữ liệu. | UC-QT-03 |

### 3.7.5. Kết quả đầu ra

-   UC-QT-01: Thủ tục nội bộ với CNĐT hoàn tất.
-   UC-QT-02: Đề tài chuyển trạng thái Hoàn tất.
-   UC-QT-03: Hồ sơ chuyển giao được lưu trữ đầy đủ.

### 3.7.6. Tiêu chí nghiệm thu

| **Mã AC** | **UC** | **Tiêu chí nghiệm thu** |
| --- | --- | --- |
| AC-UC-QT-01 | UC-QT-01 | Khi P.KHCN xác nhận hoàn tất thủ tục trong hạn 07 ngày, hệ thống lưu dấu vết và mở khóa bước quyết toán. |
| AC-UC-QT-02 | UC-QT-02 | Khi P.KHCN ghi nhận kết quả quyết toán từ P.KT-TC, hệ thống chuyển đề tài sang trạng thái Hoàn tất. |
| AC-UC-QT-03 | UC-QT-03 | Khi actor có quyền tra cứu, hệ thống hiển thị đầy đủ hồ sơ tổng hợp của đề tài chuyển giao. |

## 3.8. Module M08 - Actor, phân quyền và truy cập

### 3.8.1. Mô tả chức năng

Module M08 nhóm 2 yêu cầu liên quan đến quản lý actor và phân quyền dùng chung cho toàn phân hệ. Actor tham gia: Tất cả actor của phân hệ.

### 3.8.2. Yêu cầu chức năng

| **Mã YC** | **Tên chức năng** | **Actor** | **Mô tả và kết quả** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| UC-ACT-01 | Sử dụng quyền theo vai trò nghiệp vụ được cấp | Tất cả actor | Người dùng chỉ thao tác được các chức năng thuộc vai trò nghiệp vụ được cấp. Kết quả: Truy cập đúng phạm vi vai trò. | Cao | Đề xuất |
| UC-ACT-02 | Sử dụng vai trò kép P.KHCN/thư ký Hội đồng | P.KHCN | P.KHCN có thể đồng thời giữ vai trò cán bộ xử lý hồ sơ và vai trò thư ký HĐXD/HĐNT trên cùng tài khoản. Kết quả: Một tài khoản có thể thực hiện cả hai vai trò theo đúng ngữ cảnh. | Trung bình | Đề xuất |

### 3.8.3. Trường dữ liệu chính

| **STT** | **Nhóm dữ liệu** | **Mô tả** |
| --- | --- | --- |
| 1 | Vai trò người dùng | Danh sách vai trò được gán cho từng tài khoản. |
| 2 | Phạm vi truy cập | Đề tài, hồ sơ mà tài khoản được phép xem/thao tác. |

### 3.8.4. Quy tắc nghiệp vụ

| **Mã BR** | **Quy tắc** | **UC liên quan** |
| --- | --- | --- |
| BR-M08-01 | Một tài khoản có thể được gán nhiều vai trò; hệ thống áp dụng quyền theo vai trò đang sử dụng trong từng thao tác cụ thể. | UC-ACT-01, UC-ACT-02 |

### 3.8.5. Kết quả đầu ra

-   UC-ACT-01: Truy cập đúng phạm vi vai trò.
-   UC-ACT-02: Một tài khoản có thể thực hiện cả hai vai trò theo đúng ngữ cảnh.

### 3.8.6. Tiêu chí nghiệm thu

| **Mã AC** | **UC** | **Tiêu chí nghiệm thu** |
| --- | --- | --- |
| AC-UC-ACT-01 | UC-ACT-01 | Khi người dùng thực hiện chức năng ngoài vai trò được cấp, hệ thống từ chối và ghi nhận nỗ lực truy cập. |
| AC-UC-ACT-02 | UC-ACT-02 | Khi P.KHCN dùng vai trò thư ký Hội đồng, hệ thống phân biệt rõ thao tác theo vai trò trong audit log. |

## 3.9. Module M09 - Thông báo và truy vết

### 3.9.1. Mô tả chức năng

Module M09 nhóm 2 yêu cầu liên quan đến thông báo trạng thái và truy vết thao tác. Actor tham gia: Tất cả actor của phân hệ.

### 3.9.2. Yêu cầu chức năng

| **Mã YC** | **Tên chức năng** | **Actor** | **Mô tả và kết quả** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| UC-TB-01 | Nhận thông báo chuyển trạng thái đề tài | Actor liên quan | Actor liên quan nhận thông báo trong ứng dụng khi đề tài chuyển trạng thái (phê duyệt, ký hợp đồng, đạt/chưa đạt nghiệm thu, thanh lý, hoàn tất). Kết quả: Actor biết kịp thời để xử lý bước tiếp theo. | Cao | Đề xuất |
| UC-TB-02 | Theo dõi trạng thái đề tài và biểu mẫu | Tất cả actor theo quyền | Người dùng theo dõi trạng thái xử lý đề tài và biểu mẫu của mình theo đúng phân quyền. Kết quả: Người dùng nắm được tiến độ xử lý hồ sơ. | Cao | Đề xuất |

### 3.9.3. Trường dữ liệu chính

| **STT** | **Nhóm dữ liệu** | **Mô tả** |
| --- | --- | --- |
| 1 | Thông báo trong ứng dụng | Nội dung, thời điểm, actor nhận, trạng thái đã đọc/chưa đọc. |
| 2 | Audit log | Actor, thời điểm, hành động, đối tượng, trạng thái trước/sau. |

### 3.9.4. Quy tắc nghiệp vụ

| **Mã BR** | **Quy tắc** | **UC liên quan** |
| --- | --- | --- |
| BR-M09-01 | Thông báo chỉ hiển thị trong ứng dụng ở phiên bản đầu; không tích hợp email/SMS. | UC-TB-01 |
| BR-M09-02 | Audit log là nhật ký chỉ thêm mới, không được sửa/xóa bởi chức năng nghiệp vụ. | UC-TB-01, UC-TB-02 |

### 3.9.5. Kết quả đầu ra

-   UC-TB-01: Actor biết kịp thời để xử lý bước tiếp theo.
-   UC-TB-02: Người dùng nắm được tiến độ xử lý hồ sơ.

### 3.9.6. Tiêu chí nghiệm thu

| **Mã AC** | **UC** | **Tiêu chí nghiệm thu** |
| --- | --- | --- |
| AC-UC-TB-01 | UC-TB-01 | Khi đề tài chuyển trạng thái, hệ thống gửi thông báo trong ứng dụng đến đúng actor liên quan. |
| AC-UC-TB-02 | UC-TB-02 | Khi actor truy cập đúng quyền, hệ thống hiển thị trạng thái đề tài/biểu mẫu hiện tại chính xác. |

# CHƯƠNG 4: YÊU CẦU PHI CHỨC NĂNG

| **Mã NFR** | **Nhóm** | **Yêu cầu** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- |
| NFR-SEC-01 | Bảo mật và phân quyền | Người dùng chỉ được xem, tải và thao tác dữ liệu thuộc vai trò và phạm vi được phân công. | Cao | Đề xuất |
| NFR-AUD-01 | Lưu vết | Audit log được lưu theo cơ chế chỉ thêm mới; tối thiểu gồm actor, thời điểm, hành động, đối tượng, trạng thái trước/sau và lý do. | Cao | Đề xuất |
| NFR-DOC-01 | Tài liệu | Hệ thống kiểm soát định dạng, phiên bản và quyền xem/tải hợp đồng, biên bản theo vai trò và trạng thái. | Cao | Đề xuất |
| NFR-REL-01 | Sao lưu/khôi phục | Dữ liệu và tệp phải được sao lưu và có khả năng khôi phục khi xảy ra sự cố; RPO/RTO cần xác minh. | Cao | Đề xuất |
| NFR-UX-01 | Khả dụng giao diện | Giao diện sử dụng được trên máy tính và điện thoại, hỗ trợ các trình duyệt hiện hành; danh sách phiên bản trình duyệt cần xác minh. | Cao | Đề xuất |
| NFR-DAT-01 | Toàn vẹn dữ liệu | Khi nhiều actor cùng thao tác trên cùng một đề tài (ví dụ nhiều thành viên HĐXD/HĐNT nộp phiếu đánh giá), hệ thống không làm mất, ghi trùng hoặc gán sai dữ liệu. | Cao | Đề xuất |

## 4.1. Các chỉ số cần xác minh

-   Số người dùng đồng thời và thời gian phản hồi mục tiêu.
-   Dung lượng tệp tối đa và định dạng cho từng BM tải hoàn chỉnh.
-   Chu kỳ sao lưu, thời gian lưu bản sao, RPO và RTO.
-   Danh sách trình duyệt/phiên bản tối thiểu được hỗ trợ.
-   Cơ chế xác định BM12 (nêu trong danh mục biểu mẫu nhưng không xuất hiện trong lưu đồ các bước) có thuộc phạm vi triển khai hay không.

# CHƯƠNG 5: BẢNG TỔNG HỢP VÀ TRUY VẾT

## 5.1. Tổng hợp yêu cầu theo module

| **Module** | **Tên module** | **Số YC** | **Mã YC** | **Ưu tiên** | **Trạng thái** |
| --- | --- | --- | --- | --- | --- |
| M01 | Đề xuất chuyển giao công nghệ | 4 | UC-DX-01…UC-DX-04 | Cao | Đề xuất |
| M02 | Thẩm định và phê duyệt đăng ký | 7 | UC-TD-01…UC-TD-07 | Cao | Đề xuất |
| M03 | Đàm phán và ký kết hợp đồng | 3 | UC-HD-01…UC-HD-03 | Cao | Đề xuất |
| M04 | Thực hiện đề tài và báo cáo tiến độ | 2 | UC-BC-01…UC-BC-02 | Cao | Đề xuất |
| M05 | Nghiệm thu cấp cơ sở | 7 | UC-NT-01…UC-NT-07 | Cao | Đề xuất |
| M06 | Nghiệm thu, bàn giao và thanh lý hợp đồng với đối tác | 3 | UC-BG-01…UC-BG-03 | Cao | Đề xuất |
| M07 | Quyết toán và lưu trữ hồ sơ chuyển giao | 3 | UC-QT-01…UC-QT-03 | Cao | Đề xuất |
| M08 | Actor, phân quyền và truy cập | 2 | UC-ACT-01…UC-ACT-02 | Cao | Đề xuất |
| M09 | Thông báo và truy vết | 2 | UC-TB-01…UC-TB-02 | Cao | Đề xuất |

Tổng cộng: 9 module, 33 yêu cầu chức năng trong phạm vi và 6 yêu cầu phi chức năng.

## 5.2. Ma trận UCTQ - UCCT - module - biểu mẫu

| **UCTQ** | **UCCT** | **Tên yêu cầu** | **Module** | **BM** |
| --- | --- | --- | --- | --- |
| UCTQ-01 | UC-DX-01 | Tạo đề xuất chuyển giao công nghệ (BM01) | M01 | BM01 |
| UCTQ-01 | UC-DX-02 | Nhập thông tin đối tác và nội dung chuyển giao | M01 | BM01 |
| UCTQ-01 | UC-DX-03 | Đính kèm tài liệu minh chứng (nếu có) | M01 | — |
| UCTQ-01 | UC-DX-04 | Nộp đề xuất cho P.KHCN | M01 | BM01 |
| UCTQ-02 | UC-TD-01 | Kiểm tra tính hợp lệ hồ sơ đăng ký | M02 | BM01 |
| UCTQ-02 | UC-TD-02 | Trình BGH phê duyệt chủ trương | M02 | — |
| UCTQ-02 | UC-TD-03 | Tổ chức Hội đồng xét duyệt (HĐXD) | M02 | BM03 |
| UCTQ-03 | UC-TD-04 | Xem hồ sơ phục vụ thẩm định | M02 | BM01, BM02 |
| UCTQ-03 | UC-TD-05 | Lập và nộp Phiếu nhận xét (BM04) | M02 | BM04 |
| UCTQ-02 | UC-TD-06 | Lập Biên bản họp Hội đồng (BM05) | M02 | BM05 |
| UCTQ-04 | UC-TD-07 | Viết và nộp Thuyết minh đề tài (BM02) | M02 | BM02 |
| UCTQ-05 | UC-HD-01 | Ghi nhận kết quả đàm phán với Bên nhận CN | M03 | — |
| UCTQ-06 | UC-HD-02 | Tải Hợp đồng đã ký (BM06) | M03 | BM06 |
| UCTQ-06 | UC-HD-03 | Xem/tải Hợp đồng đã ký | M03 | BM06 |
| UCTQ-07 | UC-BC-01 | Lập và nộp Báo cáo tiến độ (BM07) | M04 | BM07 |
| UCTQ-07 | UC-BC-02 | Xem/tải báo cáo tiến độ | M04 | BM07 |
| UCTQ-08 | UC-NT-01 | Nộp Báo cáo tổng kết đề tài (BM08) | M05 | BM08 |
| UCTQ-08 | UC-NT-02 | Nộp Phiếu đề nghị nghiệm thu (BM09) | M05 | BM09 |
| UCTQ-08 | UC-NT-03 | Tham mưu ra Quyết định thành lập HĐNT (BM10) | M05 | BM10 |
| UCTQ-09 | UC-NT-04 | Xem hồ sơ phục vụ đánh giá | M05 | BM08, BM09 |
| UCTQ-09 | UC-NT-05 | Lập và nộp Phiếu đánh giá (BM11) | M05 | BM11 |
| UCTQ-09 | UC-NT-06 | Lập và ký Biên bản đánh giá, nghiệm thu (BM13) | M05 | BM13 |
| UCTQ-10 | UC-NT-07 | Hoàn thiện báo cáo theo kiến nghị (BM14) và nộp lại | M05 | BM14 |
| UCTQ-11 | UC-BG-01 | Lập và tải Biên bản nghiệm thu và bàn giao (BM15) | M06 | BM15 |
| UCTQ-11 | UC-BG-02 | Ghi nhận nghĩa vụ thanh toán của Bên nhận CN | M06 | — |
| UCTQ-11 | UC-BG-03 | Lập và tải Biên bản thanh lý hợp đồng (BM16) | M06 | BM16 |
| UCTQ-12 | UC-QT-01 | Thực hiện thủ tục nghiệm thu và thanh lý nội bộ với CNĐT | M07 | — |
| UCTQ-12 | UC-QT-02 | Ghi nhận kết quả quyết toán | M07 | — |
| UCTQ-12 | UC-QT-03 | Lưu trữ hồ sơ tổng hợp | M07 | BM01–BM16 |
| Dùng chung | UC-ACT-01 | Sử dụng quyền theo vai trò nghiệp vụ được cấp | M08 | — |
| UCTQ-02 | UC-ACT-02 | Sử dụng vai trò kép P.KHCN/thư ký Hội đồng | M08 | BM04, BM05, BM11, BM13 |
| Dùng chung | UC-TB-01 | Nhận thông báo chuyển trạng thái đề tài | M09 | BM01–BM16 |
| Dùng chung | UC-TB-02 | Theo dõi trạng thái đề tài và biểu mẫu | M09 | BM01–BM16 |

## 5.3. Ma trận use case chi tiết - actor

| **Mã UCCT** | **Use case chi tiết** | **CNĐT** | **P.KHCN** | **BGH** | **HĐXD** | **HĐNT** | **P.KT-TC** | **Bên nhận CN** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UC-DX-01 | Tạo đề xuất (BM01) | ✓ |  |  |  |  |  |  |
| UC-DX-02 | Nhập thông tin đối tác | ✓ |  |  |  |  |  |  |
| UC-DX-03 | Đính kèm tài liệu | ✓ |  |  |  |  |  |  |
| UC-DX-04 | Nộp đề xuất | ✓ |  |  |  |  |  |  |
| UC-TD-01 | Kiểm tra hợp lệ hồ sơ |  | ✓ |  |  |  |  |  |
| UC-TD-02 | Trình BGH phê duyệt |  | ✓ | ✓ |  |  |  |  |
| UC-TD-03 | Tổ chức HĐXD |  | ✓ |  |  |  |  |  |
| UC-TD-04 | Xem hồ sơ phục vụ thẩm định |  |  |  | ✓ |  |  |  |
| UC-TD-05 | Lập và nộp BM04 |  |  |  | ✓ |  |  |  |
| UC-TD-06 | Lập BM05 |  | ✓ |  | ✓ |  |  |  |
| UC-TD-07 | Viết và nộp BM02 | ✓ |  |  |  |  |  |  |
| UC-HD-01 | Ghi nhận kết quả đàm phán | ✓ | ✓ |  |  |  |  | ✓ |
| UC-HD-02 | Tải Hợp đồng đã ký |  | ✓ | ✓ |  |  |  | ✓ |
| UC-HD-03 | Xem/tải Hợp đồng đã ký | ✓ | ✓ |  |  |  |  |  |
| UC-BC-01 | Lập và nộp BM07 | ✓ |  |  |  |  |  |  |
| UC-BC-02 | Xem/tải báo cáo tiến độ | ✓ | ✓ |  |  |  |  |  |
| UC-NT-01 | Nộp BM08 | ✓ |  |  |  |  |  |  |
| UC-NT-02 | Nộp BM09 | ✓ |  |  |  |  |  |  |
| UC-NT-03 | Tham mưu Quyết định thành lập HĐNT |  | ✓ | ✓ |  |  |  |  |
| UC-NT-04 | Xem hồ sơ phục vụ đánh giá |  |  |  |  | ✓ |  |  |
| UC-NT-05 | Lập và nộp BM11 |  |  |  |  | ✓ |  |  |
| UC-NT-06 | Lập và ký BM13 |  | ✓ |  |  | ✓ |  |  |
| UC-NT-07 | Hoàn thiện BM14, nộp lại | ✓ |  |  |  |  |  |  |
| UC-BG-01 | Lập và tải BM15 | ✓ | ✓ |  |  |  |  | ✓ |
| UC-BG-02 | Ghi nhận nghĩa vụ thanh toán |  | ✓ |  |  |  |  | ✓ |
| UC-BG-03 | Lập và tải BM16 |  | ✓ |  |  |  |  | ✓ |
| UC-QT-01 | Thủ tục nghiệm thu/thanh lý nội bộ | ✓ | ✓ |  |  |  |  |  |
| UC-QT-02 | Ghi nhận kết quả quyết toán |  | ✓ |  |  |  | ✓ |  |
| UC-QT-03 | Lưu trữ hồ sơ tổng hợp | ✓ | ✓ |  |  |  | ✓ |  |
| UC-ACT-01 | Sử dụng quyền theo vai trò | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |  |
| UC-ACT-02 | Sử dụng vai trò kép |  | ✓ |  |  |  |  |  |
| UC-TB-01 | Nhận thông báo chuyển | ✓ | ✓ | ✓ | ✓ | ✓ |  |  |
| UC-TB-02 | Theo dõi trạng thái đề tài/biểu mẫu | ✓ | ✓ | ✓ | ✓ | ✓ |  |  |

Chú giải: CNĐT - Chủ nhiệm đề tài; P.KHCN - Phòng Khoa học Công nghệ; BGH - Ban giám hiệu; HĐXD - Hội đồng xét duyệt; HĐNT - Hội đồng nghiệm thu; P.KT-TC - Phòng Kế hoạch/Tài chính - Kế toán; Bên nhận CN - Bên nhận công nghệ/đối tác.

## 5.4. Ma trận BM01-BM16

| **BM** | **Phương thức** | **Actor lập/nộp** | **Actor/hệ thống xử lý** | **Trạng thái kết thúc** |
| --- | --- | --- | --- | --- |
| BM01 | Nhập form + tải PDF đã ký | CNĐT | P.KHCN kiểm tra | Đã nộp |
| BM02 | Nhập form + tải PDF đã ký | CNĐT | HĐXD/P.KHCN xem xét | Đã nộp |
| BM03 | Lập trên hệ thống | P.KHCN/BGH | Công bố cho HĐXD | Đã ký |
| BM04 | Nhập form + tải PDF/ảnh ký | Thành viên HĐXD | P.KHCN tổng hợp kết luận | Đã nộp, không sửa lại |
| BM05 | Nhập form, ký ngoài và tải lại | Chủ tịch/Thư ký HĐXD | P.KHCN lưu, mở khóa đàm phán | Đã ký |
| BM06 | Tải PDF hoàn chỉnh | BGH/P.KHCN | Công bố cho CNĐT và lưu tham chiếu | Đã ký |
| BM07 | Nhập form + tải PDF đã ký | CNĐT | P.KHCN theo dõi | Đã nộp |
| BM08 | Tải báo cáo hoàn chỉnh | CNĐT | P.KHCN/HĐNT xem xét | Đã nộp |
| BM09 | Nhập form + tải PDF đã ký | CNĐT | P.KHCN xem xét, tham mưu BGH | Đã nộp |
| BM10 | Lập trên hệ thống | P.KHCN/BGH | Công bố cho HĐNT | Đã ký |
| BM11 | Nhập form + tải PDF/ảnh ký | Thành viên HĐNT | P.KHCN tổng hợp kết luận | Đã nộp, không sửa lại |
| BM13 | Nhập form, ký ngoài và tải lại | Chủ tịch/Thư ký HĐNT | P.KHCN xác nhận | Đã ký |
| BM14 | Nhập form + tải PDF đã ký | CNĐT | P.KHCN lưu, mở khóa bàn giao đối tác | Đã nộp |
| BM15 | Tải PDF đã ký | P.KHCN | Lưu, thông báo các bên | Đã lưu |
| BM16 | Tải PDF đã ký | P.KHCN | Lưu, chuyển quyết toán | Đã lưu |

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
| Bên nhận công nghệ | Không có tài khoản đăng nhập trong phiên bản đầu; tương tác qua hồ sơ do P.KHCN/CNĐT quản lý và tài liệu ký ngoài hệ thống. |
| Tài chính-kế toán | Quyết toán và phân chia lợi nhuận xử lý theo QT.TCKT.04, nằm ngoài phạm vi phiên bản đầu. |
| Email/SMS | Ngoài phạm vi phiên bản đầu; chỉ dùng thông báo trong ứng dụng. |
| Ký số bên ngoài | Chưa tích hợp bắt buộc; hồ sơ vẫn có phương thức ảnh chữ ký hoặc PDF đã ký. |

## 6.4. Danh sách vấn đề mở

| **Mã** | **Liên quan** | **Nội dung** | **Mô tả** |
| --- | --- | --- | --- |
| OPEN-01 | Danh mục biểu mẫu | BM12 chưa xác định | BM12/QT.KHCN.05 xuất hiện trong danh mục biểu mẫu nhưng không có trong lưu đồ các bước; cần xác minh mục đích và vị trí sử dụng. |
| OPEN-02 | M06 | Cơ chế xác nhận thanh toán của đối tác | Chưa xác định hình thức hệ thống ghi nhận việc Bên nhận CN hoàn thành nghĩa vụ thanh toán (thủ công/liên kết với P.KT-TC). |
| OPEN-03 | M07 | Công thức phân chia lợi nhuận | Chưa có công thức/tỷ lệ phân chia lợi nhuận chuẩn hóa để cấu hình trên hệ thống. |
| OPEN-04 | NFR | Chỉ số vận hành | Cần xác minh tải đồng thời, thời gian phản hồi, dung lượng tệp, RPO và RTO. |
| OPEN-05 | Phê duyệt | Thông tin ký xác nhận FRS | Chưa có họ tên đại diện Chủ đầu tư, Trưởng nhóm BA và người phê duyệt kỹ thuật. |

## 6.5. Xác nhận tài liệu

Việc ký xác nhận chuyển trạng thái các yêu cầu từ Đề xuất sang Đã xác nhận. Các vấn đề mở không mặc nhiên trở thành yêu cầu triển khai cho đến khi có quyết định bổ sung.

| **Vai trò** | **Họ tên** | **Ngày ký** |
| --- | --- | --- |
| Đại diện Chủ đầu tư |  |  |
| Trưởng nhóm BA |  |  |
| Phê duyệt kỹ thuật |  |  |