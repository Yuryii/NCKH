# Phân tích biểu mẫu BM01–BM15 cho hệ thống quản lý hoạt động NCKH cấp trường

## 1. Mục tiêu phân tích

Phân tích này dùng bộ biểu mẫu QT.KHCN.02 để xác định:

- Người dùng nào nhập hoặc xác nhận dữ liệu trên hệ thống.
- Hệ thống cần lưu những nhóm dữ liệu nào.
- Dữ liệu nào được dùng lại giữa nhiều bước và nhiều biểu mẫu.
- Biểu mẫu Word nào có thể được sinh từ dữ liệu hệ thống.
- Khoảng trống cần xác minh trước khi chốt use case chi tiết và đặc tả use case.

Nguồn gồm 17 tệp: BM01A, BM01B, BM02, BM03, BM04A, BM04B và BM05–BM15.

## 2. Ánh xạ bước nghiệp vụ và biểu mẫu

| Bước | Biểu mẫu | Mục đích | Người tạo/nhập chính | Đầu ra Word |
|---|---|---|---|---|
| 01. Đăng ký đề tài | BM01A (giảng viên), BM01B (sinh viên) | Phiếu đề xuất ban đầu | Giảng viên hoặc sinh viên; giảng viên hướng dẫn/Khoa xác nhận theo tuyến | Phiếu đăng ký đề tài |
| 02. Xét duyệt đề xuất sơ bộ | BM02, BM03 | Phiếu đánh giá cá nhân và biên bản tổng hợp Hội đồng | Thành viên Hội đồng nhập BM02; Trưởng P.KHCN lập BM03 bằng role P.KHCN | Phiếu xét duyệt; biên bản họp |
| 03. Viết thuyết minh | BM04A (giảng viên), BM04B (sinh viên) | Hồ sơ thuyết minh được CNĐT soạn ngoài rồi tải lên hệ thống để xét duyệt | Chủ nhiệm đề tài/nhóm nghiên cứu | Hệ thống lưu file/phiên bản và chuyển xét duyệt; không nhập form và không sinh Word BM04 |
| 04. Xét duyệt thuyết minh | BM05, BM06, BM07 | BM05 được lập ngoài hệ thống và chỉ đăng thông báo; BM06 đánh giá cá nhân; BM07 biên bản tổng hợp | P.KHCN đăng thông báo/phân công; thành viên Hội đồng; Trưởng P.KHCN tổng hợp | File BM05 đính kèm thông báo; hệ thống xử lý BM06 và BM07 |
| 05. Thực hiện và báo cáo tiến độ | BM08 | Báo cáo tình hình thực hiện | Chủ nhiệm đề tài; trưởng đơn vị xác nhận | Báo cáo tiến độ |
| 06. Nộp hồ sơ và nghiệm thu | BM09, BM10, BM11, BM12 | BM10 được lập ngoài hệ thống và chỉ đăng thông báo; BM11 đánh giá cá nhân; BM12 biên bản nghiệm thu | Chủ nhiệm; P.KHCN đăng thông báo/phân công; thành viên Hội đồng; người tổng hợp | File BM10 đính kèm thông báo; hệ thống xử lý BM11 và BM12 |
| 07. Chỉnh sửa và thanh lý | BM13, BM14 | Giải trình chỉnh sửa; nghiệm thu và thanh lý hợp đồng | Chủ nhiệm; P.KHCN/đại diện Nhà trường | Phiếu giải trình; biên bản thanh lý |
| 08. Công nhận kết quả | BM15 | Quyết định được lập/ký ngoài hệ thống; P.KHCN chỉ đăng thông báo và đính kèm file | P.KHCN | Thông báo kèm file BM15 đã có |
| 09. Ứng dụng và lưu hồ sơ | Không có biểu mẫu riêng | Triển khai/lưu trữ | Ngoài phạm vi nghiệp vụ chi tiết đã chốt | Hệ thống chỉ cần đăng/xem thông báo nếu có |

## 3. Phân tích chi tiết từng biểu mẫu

### BM01A — Phiếu đăng ký đề tài của giảng viên

**Dữ liệu cần lưu**

- Đơn vị; ngày lập phiếu.
- Tên đề tài; lĩnh vực nghiên cứu.
- Chủ nhiệm đề tài; đơn vị; điện thoại; email.
- Tầm quan trọng/tác động đối với Nhà trường.
- Mục tiêu tổng quát; mục tiêu cụ thể.
- Sản phẩm/kết quả chính và chỉ tiêu cần đạt.
- Nội dung dự kiến thực hiện.
- Thời gian thực hiện; chi phí dự kiến.
- Địa chỉ dự kiến ứng dụng; hiệu quả mang lại.
- Trạng thái xác nhận của trưởng đơn vị và chủ nhiệm.

**Hành động hệ thống**: giảng viên tạo nháp, cập nhật, nộp; Khoa xem và xét duyệt; hệ thống khóa phiên bản đã nộp và sinh BM01A.

### BM01B — Phiếu đăng ký đề tài của sinh viên

Kế thừa phần lớn dữ liệu BM01A và bổ sung:

- Khoa của sinh viên.
- Giảng viên hướng dẫn; đơn vị, điện thoại, email của giảng viên.
- Xác nhận của sinh viên/chủ nhiệm và giảng viên. Nhãn `Trưởng đơn vị` trong BM01B được stakeholder xác nhận là ghi nhầm; không tạo bước ký của Khoa cho hồ sơ sinh viên.

**Hành động hệ thống**: sinh viên tạo nháp và nộp; giảng viên hướng dẫn xét duyệt; sau khi duyệt hồ sơ chuyển P.KHCN; sinh BM01B.

### BM02 — Phiếu xét duyệt đề xuất đề tài

**Dữ liệu cần lưu theo từng thành viên Hội đồng**

- Thành viên đánh giá; đề tài được đánh giá.
- Nhận xét về: tính cấp thiết, mục tiêu, nội dung chính, khả năng không trùng lặp, sản phẩm, địa chỉ ứng dụng/hiệu quả, chi phí.
- Kiến nghị: đề nghị thực hiện hoặc không thực hiện.
- Đề xuất thay thế nếu đề tài chưa phù hợp: tên đề tài, định hướng mục tiêu, sản phẩm/yêu cầu sản phẩm.
- Thời điểm hoàn tất và trạng thái ký/xác nhận.

**Hành động hệ thống**: thành viên mở hồ sơ được phân công, nhập nhận xét, chọn kết luận, nộp phiếu và xuất BM02.

### BM03 — Biên bản họp xét duyệt đề xuất

**Dữ liệu cần lưu**

- Hội đồng; số/ngày quyết định thành lập.
- Ngày, địa điểm họp; tổng số/có mặt/vắng mặt; khách mời.
- Danh sách đề tài: STT, mã số, tên, nhận xét Hội đồng, kết luận thực hiện/không thực hiện, ghi chú.
- Kết luận tổng hợp; số lượng đề tài được đưa vào danh mục tuyển chọn; năm thực hiện.
- Chủ tịch và thư ký xác nhận.

**Hành động hệ thống**: Trưởng P.KHCN dùng tài khoản có role `P.KHCN` lấy dữ liệu BM02, tổng hợp/kết luận cuộc họp, lập và sinh BM03.

### BM04A — Thuyết minh đề tài giảng viên

Đây là biểu mẫu dữ liệu lớn nhưng stakeholder xác nhận CNĐT tự lập ngoài hệ thống. Hệ thống không xây form nhập và không sinh Word BM04A. Phần phân tích dưới đây chỉ dùng để hiểu nội dung tài liệu, không chuyển thành trường dữ liệu hệ thống.

**Thông tin chung**

- Tên/mã đề tài; thời gian; loại đề tài cấp Trường/trọng điểm.
- Tổng chi phí và nguồn chi; phương thức khoán chi.
- Lĩnh vực khoa học.
- Hồ sơ chủ nhiệm; thư ký khoa học; đơn vị chủ trì.
- Danh sách cán bộ thực hiện; tổ chức phối hợp.

**Nội dung nghiên cứu**

- Mục tiêu; tình trạng nghiên cứu mới/kế tiếp.
- Tổng quan ngoài nước, trong nước; luận giải mục tiêu và nội dung.
- Danh mục tài liệu tham khảo.
- Nội dung/công việc nghiên cứu; cách tiếp cận và phương pháp.
- Tiến độ theo mốc: công việc, kết quả, thời gian, người/tổ chức chủ trì, kinh phí.

**Sản phẩm**

- Dạng I: sản phẩm vật chất, chỉ tiêu chất lượng, đơn vị đo, số lượng/quy mô, so sánh trong nước/thế giới.
- Dạng II: phương pháp, quy trình, phần mềm, cơ sở dữ liệu, báo cáo... và yêu cầu khoa học.
- Dạng III: bài báo, sách... và nơi công bố.
- Kết quả tham gia đào tạo.

**Ứng dụng, tài sản và tài chính**

- Khả năng thị trường/ứng dụng/chuyển giao/liên kết.
- Phạm vi, địa chỉ ứng dụng; tác động khoa học, đơn vị, kinh tế-xã hội, môi trường.
- Phương án sử dụng/điều chuyển/thuê/mua thiết bị; xử lý tài sản.
- Chi phí theo nguồn và khoản chi; phụ lục chi tiết khối lượng, đơn giá, thành tiền.
- Xác nhận của trưởng đơn vị, chủ nhiệm và Hiệu trưởng.

**Hành động hệ thống**: không soạn và không sinh BM04A. CNĐT tải file BM04A hoàn chỉnh lên; hệ thống lưu phiên bản, kiểm tra định dạng/dung lượng, chuyển P.KHCN và Hội đồng xét duyệt, đồng thời giữ lịch sử các lần nộp.

### BM04B — Thuyết minh đề tài sinh viên

**Dữ liệu cần lưu**

- Tên/mã đề tài; thời gian; tổng chi phí từ Nhà trường; lĩnh vực.
- Hồ sơ chủ nhiệm sinh viên; giảng viên hướng dẫn; thư ký khoa học; nhóm thực hiện.
- Mục tiêu; tình trạng đề tài.
- Tổng quan ngoài nước/trong nước; luận giải; tài liệu tham khảo.
- Nội dung nghiên cứu; cách tiếp cận/phương pháp; phương án phối hợp.
- Xác nhận của giảng viên hướng dẫn, chủ nhiệm và Hiệu trưởng.

**Lưu ý**: BM04B ngắn hơn đáng kể BM04A. Tuy nhiên cả hai đều do CNĐT tự soạn ngoài hệ thống; hệ thống không xây form nhập và không sinh Word BM04B. CNĐT tải file hoàn chỉnh lên hệ thống để P.KHCN/Hội đồng xét duyệt.

### BM05 — Quyết định thành lập Hội đồng xét duyệt thuyết minh

**Ngoài phạm vi xử lý tài liệu của hệ thống**: BM05 được lập và ký ngoài phần mềm. Hệ thống không nhập form, không sinh Word và không phê duyệt BM05; P.KHCN chỉ đăng thông báo kèm file quyết định đã có.

**Dữ liệu cần lưu**

- Số/ngày quyết định; năm học; đối tượng giảng viên/sinh viên.
- Căn cứ pháp lý; người đề nghị.
- Danh sách thành viên: họ tên, chức danh khoa học, đơn vị, vai trò Chủ tịch/Phản biện/Ủy viên/Thư ký.
- Hiệu lực, đơn vị chịu trách nhiệm, nơi nhận.
- Người phê duyệt/ký.

**Hành động hệ thống**: đăng thông báo và đính kèm BM05 đã được lập bên ngoài. Cách nhập danh sách Hội đồng vào hệ thống để phân công BM06 cần xác minh riêng.

### BM06 — Phiếu nhận xét thuyết minh

**Dữ liệu cần lưu**

- Thành viên Hội đồng; đề tài; tổ chức/cá nhân đăng ký.
- 11 tiêu chí, điểm tối thiểu, điểm tối đa và điểm thành viên chấm.
- Tổng điểm.
- Chi phí tổng, ngân sách Nhà trường và nguồn khác bằng số/chữ.
- Kiến nghị: thực hiện; không thực hiện; thực hiện có điều chỉnh.
- Nội dung điều chỉnh và ý kiến khác.

**Hành động hệ thống**: hiển thị rubric cố định; kiểm tra giới hạn điểm; tính tổng; bắt buộc nhập lý do khi không đạt/cần điều chỉnh; sinh BM06.

### BM07 — Biên bản họp xét duyệt thuyết minh

**Dữ liệu cần lưu**

- Hội đồng; quyết định thành lập; ngày/địa điểm; thành viên có mặt/vắng; khách mời.
- Theo từng đề tài: tên, chủ nhiệm, tổ chức chủ trì, kết luận thực hiện/không thực hiện, nhận xét Hội đồng.
- Chủ tịch và thư ký xác nhận.

**Hành động hệ thống**: tổng hợp BM06, ghi kết luận cuộc họp, trình xác nhận, sinh BM07.

### BM08 — Báo cáo tình hình thực hiện

**Dữ liệu cần lưu**

- Số báo cáo; đơn vị; ngày lập.
- Đề tài, mã số, chủ nhiệm, thời gian, chi phí.
- Bảng nội dung: nội dung theo thuyết minh, tiến độ kế hoạch, thực tế đã thực hiện.
- Bảng sản phẩm: sản phẩm theo thuyết minh và thực tế, chia khoa học/đào tạo/ứng dụng/khác.
- Chi phí được cấp, đã chi, đã quyết toán.
- Kế hoạch tiếp theo; kiến nghị.
- Xác nhận trưởng đơn vị và chủ nhiệm.

**Hành động hệ thống**: do BM04 không được lưu thành dữ liệu cấu trúc, hệ thống không thể tự động lấy kế hoạch/sản phẩm từ BM04. Cần xác minh CNĐT sẽ nhập lại phần kế hoạch khi lập BM08 hay hệ thống chỉ nhận file BM08 hoàn chỉnh.

### BM09 — Hướng dẫn và mẫu báo cáo tổng kết

BM09 không phải một phiếu giao dịch đơn lẻ mà là hướng dẫn cấu trúc báo cáo và hồ sơ.

**Dữ liệu hệ thống có thể tự sinh**

- Trang bìa/bìa phụ: tên đề tài, mã số, chủ nhiệm, chức danh/học vị, đơn vị, tháng/năm.
- Trang thông tin kết quả: chủ nhiệm, điện thoại/email, đơn vị chuyên môn, thời gian, mục tiêu, nội dung chính, kết quả chính.
- Bìa hồ sơ và danh mục thành phần hồ sơ.

**Dữ liệu/nội dung người dùng phải cung cấp**

- Tổng quan, mở đầu, chương kết quả, kết luận/kiến nghị, tài liệu tham khảo, phụ lục.

**Quyết định thiết kế cần xác minh**: hệ thống cung cấp trình soạn thảo báo cáo đầy đủ hay chỉ sinh phần bìa/thông tin và cho người dùng tải báo cáo Word/PDF hoàn chỉnh lên.

### BM10 — Quyết định thành lập Hội đồng nghiệm thu

Cấu trúc tương tự BM05 nhưng BM10 được lập/ký ngoài phần mềm. Hệ thống chỉ đăng thông báo và đính kèm file BM10; không nhập form, sinh Word hoặc phê duyệt quyết định. Cách nhập danh sách Hội đồng để phân công BM11 cần xác minh riêng.

### BM11 — Phiếu đánh giá kết quả thực hiện

**Dữ liệu cần lưu theo thành viên**

- Đề tài, mã số, chủ nhiệm, tổ chức chủ trì, thành viên đánh giá.
- Với từng sản phẩm: số lượng/khối lượng theo thuyết minh, thực tế; đánh giá đạt/đạt có điều kiện chỉnh sửa/không đạt; giải thích.
- Tương tự cho chất lượng/mức độ đáp ứng.
- Xếp loại chung: đạt; đạt cần chỉnh sửa; không đạt.
- Ý kiến khác.

**Hành động hệ thống**: thành viên đánh giá từng dòng và sinh BM11. Việc nạp sản phẩm kế hoạch không thể lấy tự động từ BM04 nếu BM04 chỉ tồn tại ngoài hệ thống; nguồn dữ liệu thay thế cần được xác minh.

### BM12 — Biên bản họp đánh giá, nghiệm thu

**Dữ liệu cần lưu**

- Đề tài, mã số, chủ nhiệm, tổ chức chủ trì.
- Quyết định Hội đồng; ngày, địa điểm; có mặt/vắng; khách mời.
- Kết luận về số lượng/khối lượng, chất lượng, giá trị khoa học và thực tiễn.
- Xếp loại đạt/không đạt; nội dung phải chỉnh sửa.
- Danh sách sản phẩm kế hoạch/thực tế, mức độ hoàn thành, quyết định nghiệm thu.
- Kiến nghị chuyển giao/sử dụng; công bố/không công bố.
- Trách nhiệm quản lý tài sản/kết quả.
- Chủ tịch và thư ký xác nhận.

**Hành động hệ thống**: tổng hợp BM11, ghi kết luận và yêu cầu chỉnh sửa, sinh BM12.

### BM13 — Phiếu giải trình chỉnh sửa sau nghiệm thu

**Dữ liệu cần lưu**

- Đề tài, mã số, thời gian, chủ nhiệm, đơn vị chủ trì.
- Danh sách từng yêu cầu sửa/bổ sung theo kết luận Hội đồng.
- Giải trình tương ứng của chủ nhiệm.
- Ngày nộp và xác nhận chủ nhiệm.

**Hành động hệ thống**: hệ thống tự nạp yêu cầu từ BM12; chủ nhiệm nhập giải trình theo từng mục, đính kèm bản sửa, nộp và sinh BM13.

### BM14 — Biên bản nghiệm thu và thanh lý hợp đồng

**Dữ liệu cần lưu**

- Mã thanh lý; hợp đồng gốc; căn cứ; ngày/địa điểm.
- Bên A: đại diện Nhà trường, chức vụ, địa chỉ, liên hệ, tài khoản.
- Bên B: chủ nhiệm, chức vụ, địa chỉ, liên hệ, tài khoản.
- Đề tài, thời gian thực hiện, ngày nghiệm thu.
- Hồ sơ/sản phẩm/tài sản đã bàn giao.
- Nhánh hoàn thành hoặc dừng/thanh lý; văn bản điều chỉnh/đình chỉ liên quan.
- Tài chính: đã cấp, quyết toán, đã sử dụng, phải hoàn trả, đã hoàn trả.
- Xử lý tài sản; hiệu lực/số bản; chữ ký hai bên.

**Hành động hệ thống**: lấy dữ liệu hợp đồng, BM12/BM13, hồ sơ bàn giao và tài chính; P.KHCN hoàn thiện; sinh BM14.

### BM15 — Quyết định công nhận kết quả

**Dữ liệu cần lưu**

- Số/ngày quyết định; căn cứ; biên bản nghiệm thu liên quan.
- Các điều khoản; nơi nhận; người ký.
- Danh sách đề tài: STT, mã số, tên, chủ nhiệm, tổ chức chủ trì.

**Phạm vi hiện tại**: BM15 được lập và ký ngoài hệ thống. P.KHCN tải file quyết định đã có lên và đăng thông báo; hệ thống không nhập form, không sinh Word và không phê duyệt BM15.

## 4. Mô hình dữ liệu cần có để sinh Word

### 4.1. Dữ liệu gốc dùng chung

- Người dùng và hồ sơ học thuật: họ tên, ngày sinh, giới tính, học hàm/học vị, chức danh, chức vụ, chuyên ngành, điện thoại, email.
- Đơn vị/Khoa và thông tin trưởng đơn vị.
- Đề tài: mã, tên, loại giảng viên/sinh viên, hình thức tuyển chọn/giao trực tiếp, lĩnh vực, thời gian, trạng thái.
- Vai trò đề tài: chủ nhiệm, giảng viên hướng dẫn, thư ký khoa học, thành viên nhóm, tổ chức phối hợp.
- Đợt đăng ký: loại đợt, thời gian mở/đóng, danh mục đề tài giao trực tiếp, thông báo.

### 4.2. Dữ liệu nghiên cứu có cấu trúc

- Chỉ lưu các nội dung nghiên cứu mà các biểu mẫu thuộc phạm vi hệ thống thực sự yêu cầu. Không mô hình hóa toàn bộ tổng quan, nội dung, phương pháp và tài liệu tham khảo của BM04 vì BM04 được soạn ngoài hệ thống.
- Tiến độ/mốc công việc dưới dạng bảng con.
- Sản phẩm dự kiến và sản phẩm thực tế dưới dạng bảng con.
- Nguồn kinh phí, khoản chi, dự toán chi tiết và quyết toán.
- Ứng dụng, chuyển giao, tác động, tài sản và thiết bị.

### 4.3. Dữ liệu xét duyệt và Hội đồng

- Hội đồng, thành viên, vai trò và đề tài được phân công để vận hành BM06/BM11. File quyết định thành lập chỉ được lưu như tệp đính kèm thông báo, không được sinh trong hệ thống.
- Phiếu đánh giá cá nhân có phiên bản và trạng thái nộp.
- Điểm theo tiêu chí; nhận xét; kiến nghị; yêu cầu chỉnh sửa.
- Cuộc họp, điểm danh, khách mời, kết luận và chữ ký/xác nhận.

### 4.4. Dữ liệu tài liệu và phiên bản

- Mã biểu mẫu và phiên bản mẫu Word.
- Phiên bản dữ liệu tại thời điểm nộp/duyệt.
- File Word/PDF đã sinh; file đã ký; tệp đính kèm.
- Lịch sử trạng thái, người thao tác, thời điểm.

## 5. Nguyên tắc sinh Word

1. Cơ sở dữ liệu là nguồn sự thật; Word là đầu ra được sinh, không phải nơi lưu dữ liệu duy nhất.
2. Mỗi lần nộp hoặc duyệt phải tạo snapshot để tái sinh đúng tài liệu lịch sử dù dữ liệu hồ sơ cá nhân thay đổi sau đó.
3. Trường lặp như thành viên, tiến độ, sản phẩm, dự toán và nhận xét phải là bảng con, không lưu thành một chuỗi văn bản.
4. Lựa chọn dạng checkbox trong Word phải lưu bằng enum/boolean/radio trên hệ thống.
5. Điểm và tổng tiền phải có quy tắc kiểm tra và tính toán tự động.
6. Nội dung dài nên dùng rich-text có kiểm soát; tệp đính kèm không thay thế dữ liệu cốt lõi cần truy vấn/tái sử dụng.
7. Chữ ký cần tách ba trạng thái: chưa xác nhận, đã xác nhận trên hệ thống, và file/văn bản đã ký chính thức.
8. Bộ mẫu nguồn có một số tiêu đề dùng mã font tiếng Việt cũ như `TRÖÔØNG...`; mẫu sinh mới phải chuẩn hóa Unicode thành `TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐỒNG NAI`.
9. Mốc đóng băng là ngay sau bước 02, khi đề xuất được Hội đồng kết luận thực hiện trong BM03. Hệ thống không cho sửa dữ liệu BM01 đã duyệt, thông tin đề tài và danh sách nhóm thực hiện. BM04 do CNĐT tự soạn ngoài hệ thống; hệ thống chỉ lưu file BM04 theo phiên bản và chuyển xét duyệt, không tạo form dữ liệu hoặc sinh Word BM04.

### 5.1. Luồng ký tay và duyệt nhiều cấp

Quy tắc được stakeholder chốt theo **đơn vị tài liệu**:

- Một tài liệu có nhiều chữ ký thì đi tuần tự theo cấp. Bước sau chỉ nhận hồ sơ khi người ở bước hiện tại đã ký tay, tải bản ký và nhấn duyệt/gửi.
- Nhiều phiếu độc lập, mỗi phiếu chỉ có một chữ ký, được gửi song song cho những người phụ trách; từng người ký phiếu riêng và nộp lên.

Luồng tuần tự cho một tài liệu nhiều chữ ký:

1. Người lập hoàn thiện dữ liệu và sinh Word.
2. Người lập ký tay, tải bản ký lên và nộp.
3. Hệ thống chuyển đúng phiên bản đó đến người ký/duyệt kế tiếp.
4. Người ở cấp hiện tại tải tài liệu, ký bổ sung, tải bản mới lên và nhấn duyệt/gửi.
5. Quy trình lặp lại đến P.KHCN hoặc cấp cuối.

Luồng song song cho các phiếu một chữ ký:

1. Hệ thống tạo một phiếu riêng cho từng người được phân công.
2. Tất cả người được phân công nhận phiếu cùng lúc, nhập nhận xét/điểm, ký tay và tải phiếu của mình lên.
3. Hệ thống theo dõi trạng thái từng phiếu và chỉ mở bước tổng hợp khi đạt điều kiện hoàn tất.

BM02, BM06 và BM11 thuộc nhóm phiếu một chữ ký và được xử lý song song. BM03, BM07 và BM12 là tài liệu tổng hợp lập sau các phiếu cá nhân. Riêng BM06, điều kiện mở BM07 là 100% thành viên được phân công trong BM05 đã hoàn tất, ký và tải phiếu BM06; không dùng ngưỡng đa số.

Mỗi workflow cần lưu:

- Danh sách bước; kiểu tuần tự theo cấp hoặc nhóm phiếu độc lập song song; người/role phụ trách.
- Trạng thái chờ ký, đã tải bản ký, đã duyệt/gửi, từ chối/yêu cầu chỉnh sửa.
- Phiên bản dữ liệu và bản Word/PDF ứng với từng bước ký.
- Người tải bản ký, thời điểm tải, người duyệt/gửi và ý kiến xử lý.

Nếu dữ liệu nội dung thay đổi sau khi đã có chữ ký, hệ thống phải tạo phiên bản mới và vô hiệu hóa các chữ ký/duyệt phía sau trên phiên bản cũ. Không tự động ghép ảnh chữ ký tay vào tài liệu.

Tuyến hồ sơ đã xác nhận:

- Đề tài sinh viên: Sinh viên → Giảng viên → P.KHCN; không qua Khoa.
- Đề tài giảng viên: Giảng viên → Khoa → P.KHCN.

## 6. Khoảng trống cần phỏng vấn/xác minh

1. Các quyết định và hợp đồng được xử lý ngoài phần mềm; cần xác định hệ thống chỉ đăng thông báo hay còn bắt buộc đính kèm file đối với từng loại văn bản.
2. Cần xác định định dạng file, giới hạn dung lượng, quy tắc đặt tên và số lần được nộp lại BM04 khi Hội đồng yêu cầu chỉnh sửa.
3. BM09: người dùng soạn toàn bộ báo cáo trên hệ thống hay chỉ nhập metadata rồi tải báo cáo hoàn chỉnh lên.
4. Hình thức xác nhận/chữ ký ở từng bước: nút phê duyệt, chữ ký số, ảnh chữ ký hay ký trên file sau khi tải xuống.
5. Ai là thư ký chịu trách nhiệm lập BM03, BM07 và BM12; P.KHCN hay thành viên Hội đồng được phân vai.
6. Khi Hội đồng yêu cầu chỉnh sửa ở bước 02, người đăng ký sửa trên dữ liệu hiện có hay tạo một phiên bản nộp lại mới; chỉnh sửa BM04 nằm ngoài hệ thống.
7. Quy tắc sinh mã đề tài, số quyết định, số báo cáo, mã hợp đồng và mã thanh lý.
8. Dữ liệu tài chính nào đến từ hệ thống này và dữ liệu nào do Phòng Tài chính–Kế toán cung cấp.

## 7. Tác động đến use case

Từ bộ biểu mẫu, các use case tổng quan hiện có là hợp lý nhưng khi phân rã bước 01–04 cần tối thiểu các mục tiêu sau:

- Quản lý đợt tuyển chọn/giao trực tiếp và danh mục đề tài.
- Lập, lưu nháp, nộp và xuất phiếu đăng ký BM01A/B.
- Xét duyệt cấp đầu và yêu cầu chỉnh sửa/nộp lại.
- Phân công Hội đồng; đánh giá đề xuất BM02; lập biên bản BM03.
- Nộp, lưu phiên bản và chuyển xét duyệt file thuyết minh BM04A/B; không có use case soạn form hoặc sinh Word BM04.
- Đăng thông báo kèm BM05 đã lập bên ngoài; nhập/phân công thành viên Hội đồng; chấm/nhận xét BM06; lập biên bản BM07.
- Xem lịch sử phiên bản, trạng thái và tài liệu Word đã sinh.

`Xuất biểu mẫu Word` nên được coi là năng lực dùng lại của nhiều use case chi tiết. Không nên nối `<<include>>` vào mọi use case trên sơ đồ tổng quan; quan hệ này chỉ cần thể hiện trong sơ đồ phân rã khi việc sinh Word luôn là một bước bắt buộc của luồng.
