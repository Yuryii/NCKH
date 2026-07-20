# Danh mục use case hệ thống quản lý hoạt động NCKH cấp trường

**Cập nhật:** 18/07/2026

**Nguồn đối chiếu:** [Sơ đồ use case tổng quan](../brainstorming/brainstorm-xac-minh-use-case-nckh-cap-truong-2026-07-15/use-case-tong-quan.png) · [Phân tích BM01–BM15](../brainstorming/brainstorm-xac-minh-use-case-nckh-cap-truong-2026-07-15/phan-tich-bieu-mau-bm01-bm15.md) · [Quy trình NCKH cấp trường](../../Lưu%20đồ%20thực%20hiện%20đề%20tài%20nghiên%20cứu%20khoa%20học%20cấp%20trường/P.KHCN_Quy%20trình%20thực%20hiện%20đề%20tài%20NCKH%20cấp%20trường.pptx)

## 1. Danh mục use case tổng quan

| Mã | Use case tổng quan | Actor |
|---|---|---|
| HUC-01 | Xét duyệt đăng ký đề tài sinh viên | Giảng viên |
| HUC-02 | Tra cứu số tiết NCKH | Giảng viên |
| HUC-03 | Đăng ký đề tài giao trực tiếp | Giảng viên |
| HUC-04 | Đăng ký đề tài tuyển chọn | Giảng viên, Sinh viên |
| HUC-05 | Gửi đơn báo cáo tiến độ 1/2 thời gian | Giảng viên, Sinh viên |
| HUC-06 | Nộp thuyết minh đề tài | Giảng viên, Sinh viên |
| HUC-07 | Nộp hồ sơ nghiệm thu | Giảng viên, Sinh viên |
| HUC-08 | Xét duyệt đăng ký đề tài giảng viên | Cán bộ phụ trách Khoa |
| HUC-09 | Quản lý xét duyệt hồ sơ | Cán bộ phụ trách P.KHCN |
| HUC-10 | Quản lý xét duyệt thuyết minh | Cán bộ phụ trách P.KHCN |
| HUC-11 | Quản lý nghiệm thu đề tài | Cán bộ phụ trách P.KHCN |
| HUC-12 | Công bố đợt đăng ký đề tài tuyển chọn | Cán bộ phụ trách P.KHCN |
| HUC-13 | Công bố đợt đăng ký đề tài giao trực tiếp | Cán bộ phụ trách P.KHCN |
| HUC-14 | Nhận xét hồ sơ đăng ký | Thành viên HĐ xét duyệt hồ sơ |
| HUC-15 | Nhận xét thuyết minh đề tài | Thành viên HĐ xét duyệt thuyết minh |
| HUC-16 | Đánh giá hồ sơ nghiệm thu | Thành viên HĐ nghiệm thu |

## 2. Danh mục use case chi tiết

Danh mục gồm 72 use case nghiệp vụ, được phân theo 9 bước của quy trình NCKH cấp trường. `UC-ST-01` được giữ riêng vì có trên sơ đồ tổng quan nhưng không thuộc một bước nghiệp vụ trong quy trình.

### Bước 01 – Đăng ký đề tài

| Mã | Use case chi tiết | Use case tổng quan cha | Tác nhân chính | Kết quả/đầu ra |
|---|---|---|---|---|
| UC-DOT-01 | Tạo và cấu hình đợt đăng ký tuyển chọn | HUC-12 | Cán bộ phụ trách P.KHCN | Loại đợt, thời gian mở/đóng, thông báo, năm thực hiện |
| UC-DOT-02 | Công bố đợt đăng ký tuyển chọn | HUC-12 | Cán bộ phụ trách P.KHCN | Đợt chuyển sang trạng thái cho phép đăng ký |
| UC-DOT-03 | Điều chỉnh hoặc đóng đợt tuyển chọn | HUC-12 | Cán bộ phụ trách P.KHCN | Phạm vi trường được sửa sau công bố và xử lý hồ sơ đang dở cần quy định |
| UC-DOT-04 | Tạo đợt và lập danh mục đề tài giao trực tiếp | HUC-13 | Cán bộ phụ trách P.KHCN | Danh mục đề tài/định hướng được giao trực tiếp |
| UC-DOT-05 | Công bố đợt đăng ký giao trực tiếp | HUC-13 | Cán bộ phụ trách P.KHCN | Công bố đợt kèm danh mục |
| UC-DOT-06 | Điều chỉnh hoặc đóng đợt giao trực tiếp | HUC-13 | Cán bộ phụ trách P.KHCN | Quy tắc thay đổi sau công bố cần xác minh |
| UC-DK-01 | Lập hồ sơ đăng ký đề tài giảng viên | HUC-03, HUC-04 | Giảng viên | Dữ liệu BM01A, trạng thái nháp |
| UC-DK-02 | Lập hồ sơ đăng ký đề tài sinh viên | HUC-04 | Sinh viên | Dữ liệu BM01B và giảng viên hướng dẫn, trạng thái nháp |
| UC-DK-03 | Cập nhật và lưu nháp hồ sơ đăng ký | HUC-03, HUC-04 | Giảng viên, Sinh viên | Chỉ sửa khi hồ sơ còn được phép chỉnh sửa |
| UC-DK-04 | Nộp hồ sơ đăng ký tuyển chọn | HUC-04 | Giảng viên, Sinh viên | Khóa phiên bản đã nộp; chuyển đúng tuyến xét duyệt |
| UC-DK-05 | Nộp hồ sơ đăng ký giao trực tiếp | HUC-03 | Giảng viên | Khóa phiên bản đã nộp; chuyển Khoa rồi P.KHCN |
| UC-DK-06 | Sinh và tải Phiếu đăng ký BM01A/B | HUC-03, HUC-04 | Giảng viên, Sinh viên | Sinh Word từ snapshot dữ liệu; dùng UC-DL-01 |
| UC-DK-07 | Tải bản BM01 đã ký tay và gửi cấp tiếp theo | HUC-03, HUC-04 | Giảng viên, Sinh viên | Không ghép ảnh chữ ký tự động; dùng UC-DL-02 |
| UC-DK-08 | Theo dõi trạng thái và lịch sử hồ sơ đăng ký | HUC-03, HUC-04 | Giảng viên, Sinh viên | Xem phiên bản, người xử lý, tài liệu đã sinh/đã ký |
| UC-DK-09 | Chỉnh sửa và nộp lại hồ sơ chưa đạt | HUC-03, HUC-04 | Giảng viên, Sinh viên | Tạo phiên bản mới; quy tắc số lần nộp lại còn CXM |
| UC-DK-10 | Tiếp nhận và xem hồ sơ đăng ký sinh viên | HUC-01 | Giảng viên | Chỉ hồ sơ sinh viên mà giảng viên có trách nhiệm hướng dẫn |
| UC-DK-11 | Yêu cầu sinh viên chỉnh sửa đăng ký | HUC-01 | Giảng viên | Trả hồ sơ kèm ý kiến; sinh viên tạo phiên bản mới |
| UC-DK-12 | Duyệt, ký và chuyển đăng ký sinh viên đến P.KHCN | HUC-01 | Giảng viên | Tuyến sinh viên không qua Khoa |
| UC-DK-13 | Tiếp nhận và xem hồ sơ đăng ký giảng viên | HUC-08 | Cán bộ phụ trách Khoa | Chỉ hồ sơ thuộc đơn vị phụ trách |
| UC-DK-14 | Yêu cầu giảng viên chỉnh sửa đăng ký | HUC-08 | Cán bộ phụ trách Khoa | Trả hồ sơ kèm ý kiến |
| UC-DK-15 | Duyệt, ký và chuyển đăng ký giảng viên đến P.KHCN | HUC-08 | Cán bộ phụ trách Khoa | Tuyến `Giảng viên → Khoa → P.KHCN` |

### Bước 02 – Phê duyệt sơ bộ

| Mã | Use case chi tiết | Use case tổng quan cha | Tác nhân chính | Kết quả/đầu ra |
|---|---|---|---|---|
| UC-XDSB-01 | Tiếp nhận và kiểm tra hồ sơ đăng ký | HUC-09 | Cán bộ phụ trách P.KHCN | Kiểm tra hồ sơ đã qua đúng tuyến và đủ điều kiện đưa ra Hội đồng |
| UC-XDSB-02 | Thành lập/ghi nhận Hội đồng xét duyệt đề xuất và phân công đề tài | HUC-09 | Cán bộ phụ trách P.KHCN | Hội đồng, thành viên, vai trò, đề tài được phân công |
| UC-XDSB-03 | Mở hồ sơ được phân công đánh giá | HUC-14 | Thành viên HĐ xét duyệt hồ sơ | Thành viên chỉ truy cập đề tài được phân công |
| UC-XDSB-04 | Lập Phiếu nhận xét đề xuất BM02 | HUC-14 | Thành viên HĐ xét duyệt hồ sơ | Nhận xét, kiến nghị thực hiện/không thực hiện, đề xuất thay thế |
| UC-XDSB-05 | Sinh, ký tay và nộp BM02 | HUC-14 | Thành viên HĐ xét duyệt hồ sơ | Mỗi thành viên có phiếu độc lập; xử lý song song |
| UC-XDSB-06 | Theo dõi tình trạng hoàn tất các phiếu BM02 | HUC-09 | Cán bộ phụ trách P.KHCN | Theo dõi từng thành viên; điều kiện mở tổng hợp BM03 cần chốt |
| UC-XDSB-07 | Lập Biên bản họp xét duyệt đề xuất BM03 | HUC-09 | Thành viên HĐ xét duyệt hồ sơ (được phân công Thư ký) | Tổng hợp BM02, điểm danh và kết luận từng đề tài |
| UC-XDSB-08 | Chuyển BM03 cho Khoa ký và tải bản đã ký lên hệ thống | HUC-09 | Thành viên HĐ xét duyệt hồ sơ (Thư ký), Cán bộ phụ trách Khoa | Thư ký chuyển tài liệu cho Khoa; Khoa ký ngoài hệ thống rồi tải bản đã ký lên |
| UC-XDSB-09 | Ghi nhận kết luận sơ bộ và xử lý hồ sơ chưa đạt | HUC-09 | Cán bộ phụ trách P.KHCN | Cho chỉnh sửa/nộp lại hoặc kết thúc theo kết luận |
| UC-XDSB-10 | Đóng băng hồ sơ đề xuất đã đạt | HUC-09 | Cán bộ phụ trách P.KHCN | Không sửa BM01, thông tin đề tài và nhóm sau mốc BM03 đạt |

### Bước 03 – Viết và nộp thuyết minh

| Mã | Use case chi tiết | Use case tổng quan cha | Tác nhân chính | Kết quả/đầu ra |
|---|---|---|---|---|
| UC-TM-01 | Tải lên file thuyết minh BM04A/B | HUC-06 | Giảng viên, Sinh viên | BM04 được soạn ngoài hệ thống; kiểm tra định dạng/dung lượng |
| UC-TM-02 | Lưu phiên bản và nộp thuyết minh | HUC-06 | Giảng viên, Sinh viên | Khóa phiên bản nộp, lưu lịch sử, chuyển P.KHCN |
| UC-TM-03 | Chỉnh sửa và nộp lại thuyết minh | HUC-06 | Giảng viên, Sinh viên | Tải phiên bản file mới; số lần và quy tắc đặt tên còn CXM |
| UC-TM-04 | Theo dõi trạng thái xét duyệt thuyết minh | HUC-06 | Giảng viên, Sinh viên | Xem phiên bản, kết luận, yêu cầu chỉnh sửa |

### Bước 04 – Phê duyệt thuyết minh và giao thực hiện đề tài

| Mã | Use case chi tiết | Use case tổng quan cha | Tác nhân chính | Kết quả/đầu ra |
|---|---|---|---|---|
| UC-TM-05 | Tiếp nhận và kiểm tra file thuyết minh | HUC-10 | Cán bộ phụ trách P.KHCN | Kiểm tra phiên bản/file trước khi phân công Hội đồng |
| UC-TM-06 | Đăng thông báo kèm Quyết định BM05 đã lập bên ngoài | HUC-10 | Cán bộ phụ trách P.KHCN | Chỉ đăng và đính kèm; không soạn/sinh/phê duyệt BM05 |
| UC-TM-07 | Nhập Hội đồng và phân công đánh giá thuyết minh | HUC-10 | Cán bộ phụ trách P.KHCN | Nguồn/cách nhập danh sách từ BM05 còn CXM |
| UC-TM-08 | Mở thuyết minh được phân công | HUC-15 | Thành viên HĐ xét duyệt thuyết minh | Chỉ truy cập đề tài được phân công |
| UC-TM-09 | Chấm điểm và nhận xét thuyết minh BM06 | HUC-15 | Thành viên HĐ xét duyệt thuyết minh | 11 tiêu chí; kiểm tra biên điểm; tính tổng; bắt buộc lý do khi cần |
| UC-TM-10 | Sinh, ký tay và nộp BM06 | HUC-15 | Thành viên HĐ xét duyệt thuyết minh | Mỗi thành viên có phiếu độc lập, xử lý song song |
| UC-TM-11 | Theo dõi 100% phiếu BM06 hoàn tất | HUC-10 | Cán bộ phụ trách P.KHCN | Chỉ mở BM07 khi 100% người được phân công đã ký và tải phiếu |
| UC-TM-12 | Lập Biên bản họp xét duyệt thuyết minh BM07 | HUC-10 | Thành viên HĐ xét duyệt thuyết minh (được phân công Thư ký) | Tổng hợp BM06, thành phần họp và kết luận từng đề tài |
| UC-TM-13 | Chuyển BM07 cho Khoa ký và tải bản đã ký lên hệ thống | HUC-10 | Thành viên HĐ xét duyệt thuyết minh (Thư ký), Cán bộ phụ trách Khoa | Thư ký chuyển tài liệu cho Khoa; Khoa ký ngoài hệ thống rồi tải bản đã ký lên |
| UC-TM-14 | Ghi nhận kết luận và yêu cầu điều chỉnh thuyết minh | HUC-10 | Cán bộ phụ trách P.KHCN | Thực hiện/không thực hiện/thực hiện có điều chỉnh |
| UC-TM-15 | Đính kèm quyết định giao nhiệm vụ và hợp đồng đã xử lý ngoài hệ thống | HUC-10 | Cán bộ phụ trách P.KHCN | Chỉ nên chốt nếu stakeholder yêu cầu hệ thống lưu bắt buộc |

### Bước 05 – Thực hiện và báo cáo tiến độ giữa kỳ

| Mã | Use case chi tiết | Use case tổng quan cha | Tác nhân chính | Kết quả/đầu ra |
|---|---|---|---|---|
| UC-TD-01 | Lập hoặc tải lên Báo cáo tiến độ BM08 | HUC-05 | Giảng viên, Sinh viên | Chưa chốt nhập form có cấu trúc hay chỉ nhận file hoàn chỉnh |
| UC-TD-02 | Sinh BM08 từ dữ liệu hệ thống | HUC-05 | Giảng viên, Sinh viên | Chỉ áp dụng nếu chọn phương án nhập form; không tự lấy kế hoạch từ BM04 |
| UC-TD-03 | Ký tay và nộp báo cáo tiến độ | HUC-05 | Giảng viên, Sinh viên | Snapshot/bản ký; chuyển theo tuyến phê duyệt được cấu hình |
| UC-TD-04 | Xác nhận báo cáo tiến độ của đơn vị | Chưa có HUC riêng | Cán bộ phụ trách Khoa | BM08 có xác nhận trưởng đơn vị; phạm vi áp dụng cho hồ sơ sinh viên cần CXM |
| UC-TD-05 | Tiếp nhận, kiểm tra và lưu báo cáo tiến độ | HUC-05 | Cán bộ phụ trách P.KHCN | UC-TQ chưa nối P.KHCN vào chức năng này |
| UC-TD-06 | Yêu cầu chỉnh sửa và tiếp nhận bản tiến độ nộp lại | HUC-05 | Cán bộ phụ trách Khoa, Cán bộ phụ trách P.KHCN | Cần chốt điều kiện/số lần nộp lại |

### Bước 06 – Nộp hồ sơ và nghiệm thu đề tài

| Mã | Use case chi tiết | Use case tổng quan cha | Tác nhân chính | Kết quả/đầu ra |
|---|---|---|---|---|
| UC-NT-01 | Lập hoặc tải lên báo cáo tổng kết theo BM09 | HUC-07 | Giảng viên, Sinh viên | Chưa chốt trình soạn thảo đầy đủ hay chỉ metadata + file |
| UC-NT-02 | Tải lên sản phẩm và thành phần hồ sơ nghiệm thu | HUC-07 | Giảng viên, Sinh viên | Báo cáo, sản phẩm, hồ sơ liên quan |
| UC-NT-03 | Nộp hồ sơ nghiệm thu và theo dõi trạng thái | HUC-07 | Giảng viên, Sinh viên | Khóa phiên bản nộp; lưu lịch sử hồ sơ/tệp |
| UC-NT-04 | Tiếp nhận và kiểm tra hồ sơ nghiệm thu | HUC-11 | Cán bộ phụ trách P.KHCN | Kiểm tra thành phần hồ sơ trước khi phân công Hội đồng |
| UC-NT-05 | Đăng thông báo kèm Quyết định BM10 đã lập bên ngoài | HUC-11 | Cán bộ phụ trách P.KHCN | Không soạn/sinh/phê duyệt BM10 trong hệ thống |
| UC-NT-06 | Nhập Hội đồng nghiệm thu và phân công đánh giá | HUC-11 | Cán bộ phụ trách P.KHCN | Nguồn/cách nhập danh sách từ BM10 còn CXM |
| UC-NT-07 | Mở hồ sơ nghiệm thu được phân công | HUC-16 | Thành viên HĐ nghiệm thu đề tài | Chỉ truy cập đề tài được phân công |
| UC-NT-08 | Đánh giá kết quả thực hiện trên BM11 | HUC-16 | Thành viên HĐ nghiệm thu đề tài | Đánh giá số lượng, chất lượng, xếp loại, giải thích/ý kiến |
| UC-NT-09 | Sinh, ký tay và nộp BM11 | HUC-16 | Thành viên HĐ nghiệm thu đề tài | Phiếu độc lập, xử lý song song |
| UC-NT-10 | Theo dõi tình trạng hoàn tất các phiếu BM11 | HUC-11 | Cán bộ phụ trách P.KHCN | Điều kiện mở BM12 cần xác minh |
| UC-NT-11 | Lập Biên bản họp đánh giá, nghiệm thu BM12 | HUC-11 | Thành viên HĐ nghiệm thu đề tài (được phân công Thư ký) | Tổng hợp BM11; kết luận, xếp loại, yêu cầu sửa, kiến nghị ứng dụng |
| UC-NT-12 | Chuyển BM12 cho Khoa ký và tải bản đã ký lên hệ thống | HUC-11 | Thành viên HĐ nghiệm thu đề tài (Thư ký), Cán bộ phụ trách Khoa | Thư ký chuyển tài liệu cho Khoa; Khoa ký ngoài hệ thống rồi tải bản đã ký lên |

### Bước 07 – Chỉnh sửa theo góp ý của Hội đồng nghiệm thu

| Mã | Use case chi tiết | Use case tổng quan cha | Tác nhân chính | Kết quả/đầu ra |
|---|---|---|---|---|
| UC-KQ-01 | Tạo yêu cầu chỉnh sửa sau nghiệm thu từ BM12 | HUC-11 | Cán bộ phụ trách P.KHCN | Từng yêu cầu sửa được truy vết sang BM13 |
| UC-KQ-02 | Lập giải trình chỉnh sửa BM13 và đính kèm bản sửa | HUC-07, HUC-11 | Giảng viên, Sinh viên | Tự nạp yêu cầu BM12; chủ nhiệm giải trình từng mục |
| UC-KQ-03 | Sinh, ký và nộp BM13 | HUC-07, HUC-11 | Giảng viên, Sinh viên | Phiên bản giải trình và tài liệu sửa |
| UC-KQ-04 | Kiểm tra việc hoàn tất chỉnh sửa sau nghiệm thu | HUC-11 | Cán bộ phụ trách P.KHCN, Thành viên HĐ nghiệm thu đề tài | Người xác nhận cuối và tiêu chí hoàn tất còn CXM |

### Bước 08 – Công nhận kết quả nghiên cứu đề tài

| Mã | Use case chi tiết | Use case tổng quan cha | Tác nhân chính | Kết quả/đầu ra |
|---|---|---|---|---|
| UC-KQ-05 | Đăng thông báo kèm Quyết định công nhận BM15 đã lập bên ngoài | HUC-11 | Cán bộ phụ trách P.KHCN | Không soạn/sinh/phê duyệt BM15 trong hệ thống |
| UC-KQ-06 | Ghi nhận đề tài được công nhận kết quả | HUC-11 | Cán bộ phụ trách P.KHCN | Cập nhật trạng thái theo quyết định BM15 |

### Bước 09 – Theo dõi triển khai ứng dụng

| Mã | Use case chi tiết | Use case tổng quan cha | Tác nhân chính | Kết quả/đầu ra |
|---|---|---|---|---|
| UC-KQ-07 | Ghi nhận đề xuất và tình trạng triển khai ứng dụng | Chưa có HUC riêng | Cán bộ phụ trách P.KHCN, Cán bộ phụ trách Khoa | Phạm vi quản lý chi tiết cần xác minh; không tạo thêm actor ngoài UC-TQ |

### Ngoài quy trình 9 bước – Tra cứu số tiết NCKH

| Mã | Use case chi tiết | Use case tổng quan cha | Tác nhân chính | Kết quả/đầu ra |
|---|---|---|---|---|
| UC-ST-01 | Tra cứu số tiết NCKH | HUC-02 | Giảng viên | Giữ trong baseline vì có trên UC-TQ, nhưng chưa đủ bằng chứng để xác định nguồn số liệu, công thức, kỳ tính, quyền xem hoặc xuất kết quả; bắt buộc CXM. |

### Năng lực dùng chung

Các năng lực dưới đây hỗ trợ nhiều use case nghiệp vụ và không tính vào 72 use case chi tiết.

| Mã | Năng lực dùng chung | Được sử dụng trong | Quy tắc |
|---|---|---|---|
| UC-DL-01 | Sinh và tải biểu mẫu Word từ snapshot | BM01, BM02, BM03, BM06, BM07, BM11, BM12, BM13; BM08 nếu chọn nhập form | Word là đầu ra; CSDL/snapshot là nguồn sự thật |
| UC-DL-02 | Xử lý ký tay và duyệt tuần tự trên một tài liệu | Các tài liệu có nhiều chữ ký | Cấp sau chỉ nhận đúng phiên bản sau khi cấp trước tải bản ký và gửi |
| UC-DL-03 | Xử lý song song các phiếu đánh giá độc lập | BM02, BM06, BM11 | Mỗi người có phiếu riêng; theo dõi trạng thái từng phiếu |
| UC-DL-04 | Quản lý phiên bản, snapshot và vô hiệu hóa duyệt cũ | Mọi hồ sơ/tài liệu có nộp lại | Sửa nội dung sau ký tạo phiên bản mới và vô hiệu hóa duyệt phía sau |
| UC-DL-05 | Xem lịch sử trạng thái và tài liệu | Giảng viên, Sinh viên, Cán bộ phụ trách Khoa, Cán bộ phụ trách P.KHCN và thành viên Hội đồng theo phân quyền | Người thao tác, thời điểm, phiên bản, file sinh/file ký |
## 3. Ma trận use case – actor

Dấu `✓` cho biết actor tham gia trực tiếp vào use case. Một use case có thể có nhiều actor.

| Mã | Use case chi tiết | Giảng viên | Sinh viên | Cán bộ phụ trách Khoa | Cán bộ phụ trách P.KHCN | Thành viên HĐ xét duyệt hồ sơ | Thành viên HĐ xét duyệt thuyết minh | Thành viên HĐ nghiệm thu đề tài |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| UC-DOT-01 | Tạo và cấu hình đợt đăng ký tuyển chọn |  |  |  | ✓ |  |  |  |
| UC-DOT-02 | Công bố đợt đăng ký tuyển chọn |  |  |  | ✓ |  |  |  |
| UC-DOT-03 | Điều chỉnh hoặc đóng đợt tuyển chọn |  |  |  | ✓ |  |  |  |
| UC-DOT-04 | Tạo đợt và lập danh mục đề tài giao trực tiếp |  |  |  | ✓ |  |  |  |
| UC-DOT-05 | Công bố đợt đăng ký giao trực tiếp |  |  |  | ✓ |  |  |  |
| UC-DOT-06 | Điều chỉnh hoặc đóng đợt giao trực tiếp |  |  |  | ✓ |  |  |  |
| UC-DK-01 | Lập hồ sơ đăng ký đề tài giảng viên | ✓ |  |  |  |  |  |  |
| UC-DK-02 | Lập hồ sơ đăng ký đề tài sinh viên |  | ✓ |  |  |  |  |  |
| UC-DK-03 | Cập nhật và lưu nháp hồ sơ đăng ký | ✓ | ✓ |  |  |  |  |  |
| UC-DK-04 | Nộp hồ sơ đăng ký tuyển chọn | ✓ | ✓ |  |  |  |  |  |
| UC-DK-05 | Nộp hồ sơ đăng ký giao trực tiếp | ✓ |  |  |  |  |  |  |
| UC-DK-06 | Sinh và tải Phiếu đăng ký BM01A/B | ✓ | ✓ |  |  |  |  |  |
| UC-DK-07 | Tải bản BM01 đã ký tay và gửi cấp tiếp theo | ✓ | ✓ |  |  |  |  |  |
| UC-DK-08 | Theo dõi trạng thái và lịch sử hồ sơ đăng ký | ✓ | ✓ |  |  |  |  |  |
| UC-DK-09 | Chỉnh sửa và nộp lại hồ sơ chưa đạt | ✓ | ✓ |  |  |  |  |  |
| UC-DK-10 | Tiếp nhận và xem hồ sơ đăng ký sinh viên | ✓ |  |  |  |  |  |  |
| UC-DK-11 | Yêu cầu sinh viên chỉnh sửa đăng ký | ✓ |  |  |  |  |  |  |
| UC-DK-12 | Duyệt, ký và chuyển đăng ký sinh viên đến P.KHCN | ✓ |  |  |  |  |  |  |
| UC-DK-13 | Tiếp nhận và xem hồ sơ đăng ký giảng viên |  |  | ✓ |  |  |  |  |
| UC-DK-14 | Yêu cầu giảng viên chỉnh sửa đăng ký |  |  | ✓ |  |  |  |  |
| UC-DK-15 | Duyệt, ký và chuyển đăng ký giảng viên đến P.KHCN |  |  | ✓ |  |  |  |  |
| UC-XDSB-01 | Tiếp nhận và kiểm tra hồ sơ đăng ký |  |  |  | ✓ |  |  |  |
| UC-XDSB-02 | Thành lập/ghi nhận Hội đồng xét duyệt đề xuất và phân công đề tài |  |  |  | ✓ |  |  |  |
| UC-XDSB-03 | Mở hồ sơ được phân công đánh giá |  |  |  |  | ✓ |  |  |
| UC-XDSB-04 | Lập Phiếu nhận xét đề xuất BM02 |  |  |  |  | ✓ |  |  |
| UC-XDSB-05 | Sinh, ký tay và nộp BM02 |  |  |  |  | ✓ |  |  |
| UC-XDSB-06 | Theo dõi tình trạng hoàn tất các phiếu BM02 |  |  |  | ✓ |  |  |  |
| UC-XDSB-07 | Lập Biên bản họp xét duyệt đề xuất BM03 |  |  |  |  | ✓ |  |  |
| UC-XDSB-08 | Chuyển BM03 cho Khoa ký và tải bản đã ký lên hệ thống |  |  | ✓ |  | ✓ |  |  |
| UC-XDSB-09 | Ghi nhận kết luận sơ bộ và xử lý hồ sơ chưa đạt |  |  |  | ✓ |  |  |  |
| UC-XDSB-10 | Đóng băng hồ sơ đề xuất đã đạt |  |  |  | ✓ |  |  |  |
| UC-TM-01 | Tải lên file thuyết minh BM04A/B | ✓ | ✓ |  |  |  |  |  |
| UC-TM-02 | Lưu phiên bản và nộp thuyết minh | ✓ | ✓ |  |  |  |  |  |
| UC-TM-03 | Chỉnh sửa và nộp lại thuyết minh | ✓ | ✓ |  |  |  |  |  |
| UC-TM-04 | Theo dõi trạng thái xét duyệt thuyết minh | ✓ | ✓ |  |  |  |  |  |
| UC-TM-05 | Tiếp nhận và kiểm tra file thuyết minh |  |  |  | ✓ |  |  |  |
| UC-TM-06 | Đăng thông báo kèm Quyết định BM05 đã lập bên ngoài |  |  |  | ✓ |  |  |  |
| UC-TM-07 | Nhập Hội đồng và phân công đánh giá thuyết minh |  |  |  | ✓ |  |  |  |
| UC-TM-08 | Mở thuyết minh được phân công |  |  |  |  |  | ✓ |  |
| UC-TM-09 | Chấm điểm và nhận xét thuyết minh BM06 |  |  |  |  |  | ✓ |  |
| UC-TM-10 | Sinh, ký tay và nộp BM06 |  |  |  |  |  | ✓ |  |
| UC-TM-11 | Theo dõi 100% phiếu BM06 hoàn tất |  |  |  | ✓ |  |  |  |
| UC-TM-12 | Lập Biên bản họp xét duyệt thuyết minh BM07 |  |  |  |  |  | ✓ |  |
| UC-TM-13 | Chuyển BM07 cho Khoa ký và tải bản đã ký lên hệ thống |  |  | ✓ |  |  | ✓ |  |
| UC-TM-14 | Ghi nhận kết luận và yêu cầu điều chỉnh thuyết minh |  |  |  | ✓ |  |  |  |
| UC-TM-15 | Đính kèm quyết định giao nhiệm vụ và hợp đồng đã xử lý ngoài hệ thống |  |  |  | ✓ |  |  |  |
| UC-TD-01 | Lập hoặc tải lên Báo cáo tiến độ BM08 | ✓ | ✓ |  |  |  |  |  |
| UC-TD-02 | Sinh BM08 từ dữ liệu hệ thống | ✓ | ✓ |  |  |  |  |  |
| UC-TD-03 | Ký tay và nộp báo cáo tiến độ | ✓ | ✓ |  |  |  |  |  |
| UC-TD-04 | Xác nhận báo cáo tiến độ của đơn vị |  |  | ✓ |  |  |  |  |
| UC-TD-05 | Tiếp nhận, kiểm tra và lưu báo cáo tiến độ |  |  |  | ✓ |  |  |  |
| UC-TD-06 | Yêu cầu chỉnh sửa và tiếp nhận bản tiến độ nộp lại |  |  | ✓ | ✓ |  |  |  |
| UC-NT-01 | Lập hoặc tải lên báo cáo tổng kết theo BM09 | ✓ | ✓ |  |  |  |  |  |
| UC-NT-02 | Tải lên sản phẩm và thành phần hồ sơ nghiệm thu | ✓ | ✓ |  |  |  |  |  |
| UC-NT-03 | Nộp hồ sơ nghiệm thu và theo dõi trạng thái | ✓ | ✓ |  |  |  |  |  |
| UC-NT-04 | Tiếp nhận và kiểm tra hồ sơ nghiệm thu |  |  |  | ✓ |  |  |  |
| UC-NT-05 | Đăng thông báo kèm Quyết định BM10 đã lập bên ngoài |  |  |  | ✓ |  |  |  |
| UC-NT-06 | Nhập Hội đồng nghiệm thu và phân công đánh giá |  |  |  | ✓ |  |  |  |
| UC-NT-07 | Mở hồ sơ nghiệm thu được phân công |  |  |  |  |  |  | ✓ |
| UC-NT-08 | Đánh giá kết quả thực hiện trên BM11 |  |  |  |  |  |  | ✓ |
| UC-NT-09 | Sinh, ký tay và nộp BM11 |  |  |  |  |  |  | ✓ |
| UC-NT-10 | Theo dõi tình trạng hoàn tất các phiếu BM11 |  |  |  | ✓ |  |  |  |
| UC-NT-11 | Lập Biên bản họp đánh giá, nghiệm thu BM12 |  |  |  |  |  |  | ✓ |
| UC-NT-12 | Chuyển BM12 cho Khoa ký và tải bản đã ký lên hệ thống |  |  | ✓ |  |  |  | ✓ |
| UC-KQ-01 | Tạo yêu cầu chỉnh sửa sau nghiệm thu từ BM12 |  |  |  | ✓ |  |  |  |
| UC-KQ-02 | Lập giải trình chỉnh sửa BM13 và đính kèm bản sửa | ✓ | ✓ |  |  |  |  |  |
| UC-KQ-03 | Sinh, ký và nộp BM13 | ✓ | ✓ |  |  |  |  |  |
| UC-KQ-04 | Kiểm tra việc hoàn tất chỉnh sửa sau nghiệm thu |  |  |  | ✓ |  |  | ✓ |
| UC-KQ-05 | Đăng thông báo kèm Quyết định công nhận BM15 đã lập bên ngoài |  |  |  | ✓ |  |  |  |
| UC-KQ-06 | Ghi nhận đề tài được công nhận kết quả |  |  |  | ✓ |  |  |  |
| UC-KQ-07 | Ghi nhận đề xuất và tình trạng triển khai ứng dụng |  |  | ✓ | ✓ |  |  |  |
| UC-ST-01 | Tra cứu số tiết NCKH | ✓ |  |  |  |  |  |  |

## 4. Ghi chú phạm vi

- BM04 chỉ được tải lên và quản lý phiên bản; không được soạn hoặc sinh trong hệ thống.
- BM05, BM10 và BM15 được lập bên ngoài; hệ thống chỉ đăng thông báo kèm tệp đã có.
- BM14 hoàn toàn không thuộc phạm vi của hệ thống.
- BM03, BM07 và BM12: Thư ký Hội đồng lập → chuyển Khoa ký → Cán bộ phụ trách Khoa tải bản đã ký lên hệ thống.
- Không bổ sung actor ngoài 7 actor đã có trên sơ đồ use case tổng quan.



