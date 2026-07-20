# Danh mục use case chi tiết hệ thống quản lý hoạt động NCKH cấp trường

## 1. Mục đích và nguyên tắc trung tâm

Tài liệu này là baseline danh mục use case để chuyển sang bước đặc tả. Nội dung chỉ tổng hợp các quyết định đã chốt trong memlog; chỗ nguồn chưa đủ dữ liệu được ghi **Cần xác minh**.

**Nguyên tắc trung tâm:** hệ thống chỉ quản lý hồ sơ, biểu mẫu, vai trò, trạng thái và bằng chứng đã ký; không thay thế cuộc họp, ký quyết định, ký hợp đồng hoặc thanh toán diễn ra bên ngoài.

Ranh giới trách nhiệm chính:

- Hệ thống quản lý đợt đăng ký, hồ sơ, Hội đồng, phiếu đánh giá, điều kiện quá bán, biên bản, biểu mẫu, tệp hoàn chỉnh, hợp đồng đã ký, trạng thái, thông báo và dấu vết xử lý.
- Hội đồng tự bàn bạc, phối hợp và tổ chức cuộc họp bên ngoài hệ thống.
- Chữ ký trên PDF, quyết định, hợp đồng và BM14 được thực hiện bên ngoài hệ thống; hệ thống chỉ lưu bằng chứng/tệp hoàn chỉnh theo luồng đã chốt.
- Hệ thống không xử lý tạm ứng, thanh toán, quyết toán, hoàn trả hoặc phê duyệt chứng từ kế toán.

## 2. Chuẩn hóa actor, vai trò và tài khoản

### 2.1. Quy ước mô hình

- **Actor** trong tài liệu là vai trò nghiệp vụ trực tiếp tương tác với hệ thống, không đồng nhất với một cá nhân hay một tài khoản.
- **Vai trò** quyết định quyền và use case tại từng giai đoạn nghiệp vụ.
- **Tài khoản** là định danh đăng nhập. Một tài khoản có thể mang nhiều vai trò, kể cả nhiều vai trò Hội đồng ở các giai đoạn khác nhau; không vì vậy mà gộp các actor nghiệp vụ.
- Thành viên nhóm nghiên cứu ngoài Chủ nhiệm chỉ là dữ liệu hồ sơ, không phải actor vì không đăng nhập, xem, sửa, ký hoặc nộp hồ sơ.

### 2.2. Danh sách actor cuối cùng

| Mã | Actor nghiệp vụ | Làm rõ |
|---|---|---|
| ACT-01 | Chủ nhiệm đề tài | Khái niệm vai trò bao quát người đăng ký/chủ nhiệm; trường hợp cụ thể là Giảng viên hoặc Sinh viên. |
| ACT-02 | Giảng viên | Tạo hồ sơ đề tài giảng viên; đồng thời có thể xét duyệt hồ sơ sinh viên khi được gán vai trò Giảng viên hướng dẫn cho đề tài đó. |
| ACT-03 | Sinh viên | Tạo và xử lý hồ sơ đề tài sinh viên. |
| ACT-04 | Trưởng Khoa/Trưởng đơn vị | Một actor thống nhất, dùng tài khoản riêng, không dùng tài khoản Giảng viên; xét duyệt tuyến đầu hồ sơ giảng viên. |
| ACT-05 | Cán bộ/Phòng KHCN (P.KHCN) | Quản trị hành chính: đợt, Hội đồng, biên bản, tài liệu/hợp đồng. Khi giữ vai trò Chủ tịch Hội đồng, actor này cũng phải nộp phiếu đánh giá tương ứng và được tính vào điều kiện quá bán. |
| ACT-06 | Thành viên Hội đồng xét duyệt hồ sơ | Nộp BM02. Bao gồm các thành viên đánh giá ở giai đoạn này; Thư ký và Chủ tịch cũng thực hiện hành vi đánh giá theo vai trò của họ. |
| ACT-07 | Thư ký Hội đồng xét duyệt hồ sơ | Thuộc cơ cấu Hội đồng, nộp BM02 và phụ trách chốt phiếu, lập, ký, gửi BM03. |
| ACT-08 | Thành viên Hội đồng xét duyệt thuyết minh | Nộp BM06. Bao gồm các thành viên đánh giá ở giai đoạn này; Thư ký và Chủ tịch cũng thực hiện hành vi đánh giá theo vai trò của họ. |
| ACT-09 | Thư ký Hội đồng xét duyệt thuyết minh | Thuộc cơ cấu Hội đồng, nộp BM06 và phụ trách chốt phiếu, lập, ký, gửi BM07. |
| ACT-10 | Thành viên Hội đồng nghiệm thu | Nộp BM11. Bao gồm các thành viên đánh giá ở giai đoạn này; Thư ký và Chủ tịch cũng thực hiện hành vi đánh giá theo vai trò của họ. |
| ACT-11 | Thư ký Hội đồng nghiệm thu | Thuộc cơ cấu Hội đồng, nộp BM11 và phụ trách chốt phiếu, lập, ký, gửi BM12. |

Hệ thống không phải actor của chính nó. Các hành vi tự động như đóng đợt, kiểm tra điều kiện, khóa form/phiếu và gửi thông báo được mô tả như quy tắc, bước hoặc hậu điều kiện của use case do actor nghiệp vụ khởi tạo.

Các quan hệ vai trò/tài khoản đã chốt:

- Giảng viên hướng dẫn không có actor hoặc tài khoản riêng; dùng tài khoản Giảng viên và chỉ có quyền xét duyệt hồ sơ sinh viên được gán.
- Chỉ đề tài sinh viên có Giảng viên hướng dẫn; đề tài giảng viên không có vai trò này.
- Mỗi Hội đồng ở mỗi giai đoạn là một Hội đồng khác nhau.
- Nếu cùng một người tham gia nhiều loại Hội đồng, người đó dùng một tài khoản có nhiều vai trò, không tạo nhiều tài khoản.
- Thư ký thuộc Hội đồng và là thành viên đánh giá; ngoài phiếu cá nhân, Thư ký còn phụ trách biên bản đúng Hội đồng mình tham gia.
- P.KHCN với vai trò Chủ tịch thuộc Hội đồng, phải nộp phiếu cá nhân và được tính trong tổng số thành viên.

### 2.3. Đối tượng không phải actor trong phạm vi

- Giảng viên hướng dẫn như một tài khoản/actor độc lập.
- Thành viên nhóm nghiên cứu ngoài Chủ nhiệm đề tài.
- Hiệu trưởng/Đại diện Nhà trường.
- Phòng Tài chính - Kế toán.
- Tổ chức phối hợp và thư ký khoa học của đề tài, trừ khi sau này có quyết định mới cho phép họ đăng nhập và thao tác trực tiếp.
- Quản trị hệ thống, Thư viện, dịch vụ ký số và dịch vụ thông báo ngoài hệ thống: **Cần xác minh** nếu phạm vi sau này yêu cầu actor tích hợp/ vận hành riêng.

## 3. Danh mục use case chi tiết

Quy ước mã ổn định: `UC-<cụm>-<số thứ tự>`. Mã biểu mẫu trong cột BM chỉ thể hiện truy vết; một use case không liên quan biểu mẫu ghi `—`.

### Cụm A — Actor, phân quyền và truy cập

| Mã | Tên use case theo mục tiêu nghiệp vụ | Actor chính | Actor phụ | Kết quả nghiệp vụ | BM |
|---|---|---|---|---|---|
| UC-ACT-01 | Sử dụng quyền theo vai trò nghiệp vụ được cấp | Actor có tài khoản | — | Người dùng chỉ thực hiện được các hành vi của vai trò hiện hành; một tài khoản có thể mang nhiều vai trò. | — |
| UC-ACT-02 | Sử dụng vai trò Giảng viên hướng dẫn trên đề tài sinh viên được gán | Giảng viên | Sinh viên | Giảng viên dùng tài khoản hiện có để xét duyệt đúng hồ sơ sinh viên được gán. | BM01 |
| UC-ACT-03 | Sử dụng nhiều vai trò Hội đồng trên cùng tài khoản | Thành viên/Thư ký/P.KHCN | — | Một cá nhân truy cập đúng quyền theo từng Hội đồng và từng giai đoạn mà không cần tài khoản trùng lặp. | BM02, BM03, BM06, BM07, BM11, BM12 |

> Cần xác minh: memlog chưa chốt các use case quản lý tài khoản, cấp/thu hồi vai trò, đăng nhập, quên mật khẩu hoặc quản trị người dùng; không đưa các chức năng này vào baseline như quyết định đã có.

### Cụm B — Quản lý đợt đăng ký

| Mã | Tên use case theo mục tiêu nghiệp vụ | Actor chính | Actor phụ | Kết quả nghiệp vụ | BM |
|---|---|---|---|---|---|
| UC-DOT-01 | Tạo đợt đăng ký NCKH | P.KHCN | — | Một đợt đăng ký mới được hình thành để cấu hình và công bố. | — |
| UC-DOT-02 | Cấu hình loại và thời gian của đợt | P.KHCN | — | Đợt có loại và khoảng thời gian áp dụng. | — |
| UC-DOT-03 | Quản lý danh mục đề tài giao trực tiếp của đợt | P.KHCN | — | Danh mục đề tài giao trực tiếp gắn với đợt được duy trì. | — |
| UC-DOT-04 | Cập nhật đợt trước khi khóa | P.KHCN | — | Thông tin đợt được điều chỉnh trong khoảng được phép. | — |
| UC-DOT-05 | Công bố đợt đăng ký | P.KHCN | — | Đợt sẵn sàng để người dùng xem và đăng ký. | — |
| UC-DOT-06 | Xem danh sách và tình trạng các đợt | Người dùng có liên quan | P.KHCN | Người dùng biết các đợt và tình trạng hiện tại. | — |
| UC-DOT-08 | Theo dõi tình trạng đợt | P.KHCN | — | P.KHCN nắm được tình trạng vận hành của đợt. | — |

Quy tắc tự động: hệ thống đóng đợt khi hết hạn. Đây không phải use case của P.KHCN và không có thao tác đóng thủ công trước hạn.

> Cần xác minh: các trạng thái cụ thể của đợt, trường cấu hình chi tiết, quy tắc sửa sau công bố và nội dung danh mục đề tài giao trực tiếp chưa được memlog xác định.

### Cụm C — Đăng ký và xét duyệt tuyến đầu

| Mã | Tên use case theo mục tiêu nghiệp vụ | Actor chính | Actor phụ | Kết quả nghiệp vụ | BM |
|---|---|---|---|---|---|
| UC-DK-01 | Tạo hồ sơ đăng ký đề tài giảng viên ở trạng thái nháp | Giảng viên | — | Hồ sơ giảng viên được tạo để tiếp tục hoàn thiện. | BM01 |
| UC-DK-02 | Tạo hồ sơ đăng ký đề tài sinh viên ở trạng thái nháp | Sinh viên | — | Hồ sơ sinh viên được tạo để tiếp tục hoàn thiện. | BM01 |
| UC-DK-03 | Cập nhật hồ sơ đăng ký trước khi nộp | Giảng viên hoặc Sinh viên | — | Nội dung nháp được hoàn thiện. | BM01 |
| UC-DK-04 | Quản lý thông tin nhóm nghiên cứu trong hồ sơ | Giảng viên hoặc Sinh viên | — | Danh sách/thông tin nhóm được ghi nhận như dữ liệu hồ sơ; các thành viên này không trở thành actor. | BM01 |
| UC-DK-05 | Kiểm tra điều kiện nộp hồ sơ đăng ký | Giảng viên hoặc Sinh viên | — | Người đăng ký biết hồ sơ có đáp ứng điều kiện nộp hay không. | BM01 |
| UC-DK-06 | Lập BM01 từ dữ liệu đăng ký | Giảng viên hoặc Sinh viên | — | BM01 đầy đủ thông tin được chuẩn bị theo pipeline form/PDF. | BM01 |
| UC-DK-07 | Nộp hồ sơ đăng ký kèm BM01 đã ký | Giảng viên hoặc Sinh viên | — | Hồ sơ được chuyển vào tuyến xét duyệt tương ứng và form BM01 bị khóa. | BM01 |
| UC-DK-08 | Xem trạng thái xử lý hồ sơ đăng ký | Giảng viên hoặc Sinh viên | Giảng viên hướng dẫn/Trưởng Khoa/Trưởng đơn vị | Người đăng ký biết hồ sơ đang ở bước nào và kết quả xử lý. | BM01 |
| UC-DK-09 | Xét duyệt hồ sơ sinh viên được hướng dẫn | Giảng viên trong vai trò hướng dẫn | Sinh viên | Hồ sơ hợp lệ được duyệt và tự chuyển vào tập hồ sơ đủ điều kiện lập Hội đồng. | BM01 |
| UC-DK-10 | Trả hồ sơ sinh viên để sửa | Giảng viên trong vai trò hướng dẫn | Sinh viên | Hồ sơ quay lại cho Sinh viên kèm yêu cầu sửa. | BM01 |
| UC-DK-11 | Xét duyệt hồ sơ giảng viên của đơn vị | Trưởng Khoa/Trưởng đơn vị | Giảng viên | Hồ sơ hợp lệ được duyệt và tự chuyển vào tập hồ sơ đủ điều kiện lập Hội đồng. | BM01 |
| UC-DK-12 | Trả hồ sơ giảng viên để sửa | Trưởng Khoa/Trưởng đơn vị | Giảng viên | Hồ sơ quay lại cho Giảng viên kèm yêu cầu sửa. | BM01 |
| UC-DK-13 | Sửa và nộp lại hồ sơ bị trả | Giảng viên hoặc Sinh viên | Actor xét duyệt tuyến đầu tương ứng | Hồ sơ sửa đổi được đưa lại vào tuyến xét duyệt. | BM01 |
| UC-DK-14 | Gửi yêu cầu hủy hồ sơ | Giảng viên hoặc Sinh viên | P.KHCN | Yêu cầu hủy được ghi nhận để xử lý. | — |
| UC-DK-15 | Xử lý yêu cầu hủy hồ sơ | P.KHCN | Giảng viên hoặc Sinh viên | Yêu cầu hủy có kết quả xử lý và hồ sơ có trạng thái tương ứng. | — |

Quy tắc tuyến đầu: sau khi Giảng viên hướng dẫn hoặc Trưởng Khoa/Trưởng đơn vị duyệt, hồ sơ tự chuyển vào tập hồ sơ đủ điều kiện lập Hội đồng; P.KHCN không có bước tiếp nhận/xác nhận riêng.

> Cần xác minh: điều kiện nộp cụ thể, dữ liệu nhóm, trạng thái hủy, quyền hủy theo từng trạng thái, lý do trả bắt buộc hay không và chi tiết vòng sửa/nộp lại chưa được chốt.

### Cụm D — Thiết lập Hội đồng theo ba giai đoạn

| Mã | Tên use case theo mục tiêu nghiệp vụ | Actor chính | Actor phụ | Kết quả nghiệp vụ | BM |
|---|---|---|---|---|---|
| UC-HD-01 | Tạo Hội đồng xét duyệt hồ sơ | P.KHCN | ACT-06, ACT-07 | Hội đồng giai đoạn xét duyệt hồ sơ được tạo với danh sách thành viên để nhận BM02 và lập BM03. | BM02, BM03 |
| UC-HD-02 | Tạo Hội đồng xét duyệt thuyết minh | P.KHCN | ACT-08, ACT-09 | Hội đồng giai đoạn xét duyệt thuyết minh được tạo với danh sách thành viên để nhận BM06 và lập BM07. | BM06, BM07 |
| UC-HD-03 | Tạo Hội đồng nghiệm thu | P.KHCN | ACT-10, ACT-11 | Hội đồng nghiệm thu được tạo với danh sách thành viên để nhận BM11 và lập BM12. | BM11, BM12 |
| UC-HD-04 | Quản lý thông tin Hội đồng trước mốc chốt phiếu | P.KHCN | Thành viên/Thư ký tương ứng | Thông tin hành chính của Hội đồng được duy trì trong giới hạn cho phép. | BM02, BM03, BM06, BM07, BM11, BM12 |
| UC-HD-05 | Theo dõi tiến độ nộp phiếu của Hội đồng | P.KHCN | Thành viên/Thư ký tương ứng | P.KHCN theo dõi được số phiếu đã nộp và điều kiện quá bán mà không can thiệp đánh giá chuyên môn. | BM02, BM06, BM11 |

Giới hạn bắt buộc:

- Đây là use case tạo/quản lý **Hội đồng**, không phải tạo/quản lý cuộc họp.
- P.KHCN không quản lý thời điểm, lịch, việc hoãn, bắt đầu, kết thúc hoặc điều kiện diễn ra cuộc họp.
- Sau khi Hội đồng được tạo, P.KHCN không được loại hoặc thay thành viên vì không nộp phiếu đúng hạn.

> Cần xác minh: bộ trường Hội đồng, cách gán Chủ tịch/Thư ký/thành viên, phạm vi được sửa ở UC-HD-04 và mốc chặn sửa danh sách chưa được xác định.

### Cụm E — Phiếu đánh giá cá nhân của ba Hội đồng

| Mã | Tên use case theo mục tiêu nghiệp vụ | Actor chính | Actor phụ | Kết quả nghiệp vụ | BM |
|---|---|---|---|---|---|
| UC-PH-01 | Xem hồ sơ phục vụ đánh giá xét duyệt hồ sơ | Thành viên/Thư ký/P.KHCN với vai trò Chủ tịch HĐ xét duyệt hồ sơ | Chủ nhiệm đề tài | Người đánh giá có căn cứ lập phiếu. | BM01, BM02 |
| UC-PH-02 | Lập và nộp phiếu xét duyệt hồ sơ | Thành viên/Thư ký/P.KHCN với vai trò Chủ tịch HĐ xét duyệt hồ sơ | — | BM02 đã ký được nộp, khóa và tính là phiếu hợp lệ trước mốc chốt. | BM02 |
| UC-PH-03 | Xem hồ sơ phục vụ đánh giá thuyết minh | Thành viên/Thư ký/P.KHCN với vai trò Chủ tịch HĐ xét duyệt thuyết minh | Chủ nhiệm đề tài | Người đánh giá có căn cứ lập phiếu. | BM04, BM05, BM06 |
| UC-PH-04 | Lập và nộp phiếu xét duyệt thuyết minh | Thành viên/Thư ký/P.KHCN với vai trò Chủ tịch HĐ xét duyệt thuyết minh | — | BM06 đã ký được nộp, khóa và tính là phiếu hợp lệ trước mốc chốt. | BM06 |
| UC-PH-05 | Xem hồ sơ phục vụ đánh giá nghiệm thu | Thành viên/Thư ký/P.KHCN với vai trò Chủ tịch HĐ nghiệm thu | Chủ nhiệm đề tài | Người đánh giá có căn cứ lập phiếu. | BM09, BM10, BM11 |
| UC-PH-06 | Lập và nộp phiếu nghiệm thu | Thành viên/Thư ký/P.KHCN với vai trò Chủ tịch HĐ nghiệm thu | — | BM11 đã ký được nộp, khóa và tính là phiếu hợp lệ trước mốc chốt. | BM11 |

Mọi actor giữ vai trò đánh giá, bao gồm Thư ký và Chủ tịch/P.KHCN, đều thực hiện pipeline form/PDF cho phiếu tương ứng. Phiếu chỉ hợp lệ khi đã nộp trước mốc Thư ký bắt đầu lập biên bản. Việc khóa quyền nộp và vô hiệu hóa phiếu chưa nộp là hậu điều kiện của UC-CHOT-02, không phải một use case hệ thống độc lập.

### Cụm F — Chốt phiếu quá bán và mở biên bản

| Mã | Tên use case theo mục tiêu nghiệp vụ | Actor chính | Actor phụ | Kết quả nghiệp vụ | BM |
|---|---|---|---|---|---|
| UC-CHOT-01 | Kiểm tra điều kiện quá bán của Hội đồng | Thư ký Hội đồng tương ứng | — | Biết số phiếu hợp lệ có lớn hơn 50% tổng số thành viên hay không; nếu chưa đạt, hệ thống không cho chuyển sang lập biên bản. | BM02/BM06/BM11 |
| UC-CHOT-02 | Xác nhận chốt phiếu để bắt đầu lập biên bản | Thư ký Hội đồng tương ứng | — | Hệ thống cảnh báo hậu quả; sau khi Thư ký chủ động xác nhận, tập phiếu được chốt bất biến, phiếu chưa nộp mất hiệu lực, nhận phiếu bị khóa và form biên bản được mở. | BM02→BM03; BM06→BM07; BM11→BM12 |

Quy tắc tính quá bán:

- Điều kiện là `số phiếu hợp lệ > 50% tổng số thành viên trong danh sách Hội đồng`.
- Ví dụ đã chốt: Hội đồng 5 người cần ít nhất 3 phiếu hợp lệ.
- Mẫu số bao gồm toàn bộ danh sách Hội đồng, kể cả Chủ tịch, Thư ký, người vắng mặt và người chưa nộp phiếu.
- Sau khi chốt, P.KHCN không được mở lại quyền nộp phiếu.
- Nếu chưa đạt quá bán, Thư ký tự hối thúc thành viên bên ngoài hệ thống; ứng dụng không kết thúc Hội đồng và không yêu cầu tạo Hội đồng mới.

### Cụm G — Biên bản Hội đồng theo tuyến hai chữ ký

| Mã | Tên use case theo mục tiêu nghiệp vụ | Actor chính | Actor phụ | Kết quả nghiệp vụ | BM |
|---|---|---|---|---|---|
| UC-BB-01 | Lập và nộp biên bản xét duyệt hồ sơ có chữ ký Thư ký | Thư ký HĐ xét duyệt hồ sơ | — | BM03 đầy đủ dữ liệu, có chữ ký Thư ký, được nộp cho P.KHCN; form bị khóa. | BM03 |
| UC-BB-02 | Lập và nộp biên bản xét duyệt thuyết minh có chữ ký Thư ký | Thư ký HĐ xét duyệt thuyết minh | — | BM07 đầy đủ dữ liệu, có chữ ký Thư ký, được nộp cho P.KHCN; form bị khóa. | BM07 |
| UC-BB-03 | Lập và nộp biên bản nghiệm thu có chữ ký Thư ký | Thư ký HĐ nghiệm thu | — | BM12 đầy đủ dữ liệu, có chữ ký Thư ký, được nộp cho P.KHCN; form bị khóa. | BM12 |
| UC-BB-04 | Kiểm tra biên bản do Thư ký nộp | P.KHCN với vai trò Chủ tịch | Thư ký tương ứng | BM03/BM07/BM12 được xác định hợp lệ để ký tiếp hoặc cần trả sửa. | BM03, BM07, BM12 |
| UC-BB-05 | Trả biên bản để Thư ký sửa | P.KHCN với vai trò Chủ tịch | Thư ký tương ứng | Biên bản được trả kèm lý do để sửa và nộp lại; không có từ chối vĩnh viễn. | BM03, BM07, BM12 |
| UC-BB-06 | Sửa, ký lại và nộp lại biên bản bị trả | Thư ký tương ứng | P.KHCN với vai trò Chủ tịch | PDF/chữ ký cũ mất hiệu lực; bản mới có chữ ký Thư ký được nộp lại trong thời gian duyệt. | BM03, BM07, BM12 |
| UC-BB-07 | Hoàn tất biên bản bằng chữ ký thứ hai của Chủ tịch | P.KHCN với vai trò Chủ tịch | Thư ký tương ứng | P.KHCN tải bản có chữ ký Thư ký, ký thêm bên ngoài, tải bản đủ hai chữ ký lên và xác nhận hoàn tất. | BM03, BM07, BM12 |
| UC-BB-09 | Gia hạn thời gian duyệt biên bản vì lý do chính đáng | P.KHCN | Thư ký tương ứng | Quyền sửa/nộp được mở lại đến hạn mới; lý do gia hạn bắt buộc được lưu để truy vết. | BM03, BM07, BM12 |

Quy tắc/hậu điều kiện: hết thời gian duyệt thì hệ thống khóa sửa/nộp biên bản; khi P.KHCN gia hạn hợp lệ, hệ thống mở lại quyền và thông báo hạn mới cho Thư ký; khi bản đủ hai chữ ký được xác nhận, kết quả Hội đồng được ghi nhận theo quyền và trạng thái đã đặc tả.

Yêu cầu dữ liệu: BM03, BM07 và BM12 phải lưu ngày, giờ, địa điểm họp và toàn bộ thông tin khác có trong biểu mẫu gốc, dù cuộc họp diễn ra ngoài hệ thống. BM07 chỉ có một luồng form: hệ thống sinh tệp; không tải bản BM07 được soạn bên ngoài.

> Cần xác minh: cách xác định “thời gian duyệt”, ai được xem kết quả, thời điểm/cơ chế công bố và quy tắc ánh xạ kết luận sang trạng thái hồ sơ chưa được memlog mô tả chi tiết.

### Cụm H — Thuyết minh, tiến độ, báo cáo tổng kết và giải trình

| Mã | Tên use case theo mục tiêu nghiệp vụ | Actor chính | Actor phụ | Kết quả nghiệp vụ | BM |
|---|---|---|---|---|---|
| UC-TM-01 | Tải thuyết minh hoàn chỉnh lên hồ sơ đề tài | Chủ nhiệm đề tài | — | Tệp BM04 được soạn ngoài hệ thống và lưu hoàn chỉnh cùng hồ sơ để Hội đồng xem, đánh giá. | BM04 |
| UC-BC-01 | Lập và nộp báo cáo tiến độ | Chủ nhiệm đề tài | — | BM08 đầy đủ dữ liệu, có PDF đã ký được nộp và form bị khóa. | BM08 |
| UC-BC-02 | Tải báo cáo tổng kết hoàn chỉnh lên hồ sơ đề tài | Chủ nhiệm đề tài | — | Tệp BM09 hoàn chỉnh được lưu cùng đề tài. | BM09 |
| UC-BC-03 | Lập và nộp giải trình | Chủ nhiệm đề tài | — | BM13 đầy đủ dữ liệu, có PDF đã ký được nộp và form bị khóa. | BM13 |
| UC-BC-04 | Xem/tải báo cáo tiến độ, tổng kết và giải trình theo quyền | Actor có liên quan | Chủ nhiệm đề tài | Tài liệu đã nộp được khai thác trong phạm vi quyền. | BM08, BM09, BM13 |

> Cần xác minh: tác nhân nhận/duyệt BM08, BM09, BM13; deadline; vòng trả sửa; trạng thái; và quan hệ bắt buộc giữa BM13 với kết luận Hội đồng chưa được chốt.

### Cụm I — Hợp đồng và tài liệu hoàn tất bên ngoài hệ thống

| Mã | Tên use case theo mục tiêu nghiệp vụ | Actor chính | Actor phụ | Kết quả nghiệp vụ | BM |
|---|---|---|---|---|---|
| UC-TL-01 | Lưu hợp đồng đã ký của đề tài | P.KHCN | Chủ nhiệm đề tài | Tệp hợp đồng đã ký được lưu và cung cấp; hệ thống không ký hoặc xử lý thanh toán. | — |
| UC-TL-02 | Xem và tải hợp đồng đã ký của đề tài | Chủ nhiệm đề tài | P.KHCN | Chủ nhiệm truy cập được hợp đồng của đúng đề tài. | — |
| UC-TL-03 | Lưu bản BM14 hoàn chỉnh sau xử lý bên ngoài | P.KHCN | Chủ nhiệm đề tài | Tệp BM14 hoàn chỉnh được lưu trong hệ thống sau khi toàn bộ việc lập, xử lý và ký đã diễn ra bên ngoài. | BM14 |
| UC-TL-04 | Xem bản BM14 hoàn chỉnh | Chủ nhiệm đề tài | P.KHCN | Chủ nhiệm xem được BM14 đã lưu của đề tài. | BM14 |
| UC-TL-05 | Đăng và lưu quyết định Hội đồng xét duyệt thuyết minh | P.KHCN | Chủ nhiệm, Hội đồng liên quan | BM05 đã được lập/ký bên ngoài được lưu và công bố theo quyền; hệ thống không soạn hoặc phê duyệt quyết định. | BM05 |
| UC-TL-06 | Xem/tải quyết định Hội đồng xét duyệt thuyết minh | Actor có quyền | P.KHCN | Người dùng truy cập được BM05 đã công bố trong phạm vi quyền. | BM05 |
| UC-TL-07 | Đăng và lưu quyết định Hội đồng nghiệm thu | P.KHCN | Chủ nhiệm, Hội đồng liên quan | BM10 đã được lập/ký bên ngoài được lưu và công bố theo quyền; hệ thống không soạn hoặc phê duyệt quyết định. | BM10 |
| UC-TL-08 | Xem/tải quyết định Hội đồng nghiệm thu | Actor có quyền | P.KHCN | Người dùng truy cập được BM10 đã công bố trong phạm vi quyền. | BM10 |
| UC-TL-09 | Đăng và lưu quyết định công nhận kết quả | P.KHCN | Chủ nhiệm đề tài | BM15 đã được lập/ký bên ngoài được lưu và công bố theo quyền; hệ thống không soạn hoặc phê duyệt quyết định. | BM15 |
| UC-TL-10 | Xem/tải quyết định công nhận kết quả | Actor có quyền | P.KHCN | Người dùng truy cập được BM15 đã công bố trong phạm vi quyền. | BM15 |

> Cần xác minh: metadata hợp đồng tối thiểu (số, ngày, giá trị, trạng thái hiệu lực) mới là đề xuất trong memlog, chưa phải quyết định chốt. Không đưa các trường này thành yêu cầu bắt buộc.

### Cụm J — Thông báo và truy vết

| Mã | Tên use case theo mục tiêu nghiệp vụ | Actor chính | Actor phụ | Kết quả nghiệp vụ | BM |
|---|---|---|---|---|---|
| UC-TB-01 | Nhận thông báo hạn mới của biên bản | Thư ký Hội đồng tương ứng | P.KHCN | Thư ký biết hạn mới sau gia hạn. | BM03, BM07, BM12 |
| UC-TB-02 | Truy vết lý do gia hạn biên bản | P.KHCN | Thư ký Hội đồng tương ứng | Lý do và lần gia hạn được lưu để kiểm tra. | BM03, BM07, BM12 |
| UC-TB-03 | Truy vết việc chốt tập phiếu đánh giá | Thư ký Hội đồng tương ứng | — | Có bằng chứng về mốc chốt bất biến, số phiếu hợp lệ và tổng số thành viên tại thời điểm chốt. | BM02/BM03, BM06/BM07, BM11/BM12 |
| UC-TB-04 | Theo dõi trạng thái hồ sơ và biểu mẫu | Actor có liên quan | — | Actor biết trạng thái xử lý của đối tượng mình có quyền. | BM01–BM15 |

> Cần xác minh: ngoài thông báo gia hạn cho Thư ký, memlog chưa chốt kênh thông báo, mẫu nội dung, người nhận và các sự kiện thông báo khác.

## 4. Năng lực dùng chung của pipeline form/PDF

Các use case dưới đây là năng lực nền được tái sử dụng; chúng không thay thế các use case nghiệp vụ theo từng BM.

| Mã | Năng lực dùng chung | Actor chính | Kết quả |
|---|---|---|---|
| UC-FORM-01 | Nhập đầy đủ và lưu dữ liệu biểu mẫu | Người lập BM | Mọi thông tin của biểu mẫu gốc được nhập đầy đủ; không lược bỏ trường. |
| UC-FORM-02 | Xem trước biểu mẫu | Người lập BM | Người dùng kiểm tra bản trình bày trước khi xuất. |
| UC-FORM-03 | Xuất PDF để ký bên ngoài | Người lập BM | PDF được sinh từ dữ liệu form để ký ngoài hệ thống. |
| UC-FORM-04 | Tiếp tục sửa form và xuất lại PDF trước khi nộp | Người lập BM | Form vẫn sửa được; PDF cũ không tự mất hiệu lực chỉ vì form thay đổi. |
| UC-FORM-05 | Tải PDF đã ký lên bản nháp | Người lập BM | PDF đã ký được gắn tạm thời nhưng form chưa bị khóa. |
| UC-FORM-07 | Nộp biểu mẫu có PDF đã ký và khóa form | Người lập BM | Hệ thống kiểm tra PDF đã ký; khi bấm **Nộp**, form trở thành bản chính thức và không được sửa. |
| UC-FORM-08 | Vô hiệu hóa bản PDF/chữ ký cũ khi biên bản bị trả và sửa | Thư ký Hội đồng tương ứng | Với BM03/BM07/BM12, bản cũ không còn hiệu lực; phải xuất, ký và nộp bản mới. |
| UC-FORM-09 | Bổ sung chữ ký thứ hai cho biên bản | P.KHCN với vai trò Chủ tịch | Bản có chữ ký Thư ký được tải xuống, ký thêm bên ngoài, tải lại và xác nhận là bản đủ hai chữ ký. |

Pipeline chuẩn cho BM nhập form:

`Nhập/lưu form → Xem trước → Xuất PDF → Ký ngoài hệ thống → Tải PDF đã ký lên → Bấm Nộp → Khóa form`

Pipeline hai chữ ký cho BM03/BM07/BM12:

`Thư ký lập form → xuất PDF → ký → tải lên và nộp → P.KHCN kiểm tra → [trả sửa, lặp lại] hoặc tải xuống → Chủ tịch ký thêm → tải bản đủ hai chữ ký lên → xác nhận hoàn tất`

Quy tắc nguồn chính thức:

- Trước khi bấm Nộp, form còn sửa được và người dùng có thể xuất nhiều PDF.
- Việc xuất PDF hoặc tải PDF ký lên tạm thời không khóa form.
- Mốc khóa là thao tác **Nộp** sau khi đã tải PDF ký lên.
- Memlog không đưa ra quy tắc đối soát tự động giữa dữ liệu form và PDF đã ký. Khi có sai lệch trước lúc nộp, nguồn dữ liệu chính thức cần được đặc tả thêm: **Cần xác minh**.

## 5. Ma trận BM01–BM15: form và upload

| BM | Nhập form trên hệ thống | Upload PDF/tệp hoàn chỉnh | Cách xử lý đã chốt | Use case truy vết |
|---|---:|---:|---|---|
| BM01 | Có | Có, PDF đã ký trước khi nộp | Theo pipeline form/PDF dùng chung. | UC-DK-06, UC-DK-07 |
| BM02 | Có | Có, PDF đã ký trước khi nộp | Thành viên, Thư ký và Chủ tịch/P.KHCN đều đánh giá; phiếu tính vào điều kiện quá bán. | UC-PH-02, UC-CHOT-01 |
| BM03 | Có | Có, bản chữ ký Thư ký rồi bản đủ hai chữ ký | Biên bản hai chữ ký; trả sửa không giới hạn số vòng nhưng chịu thời gian duyệt. | UC-BB-01, UC-BB-04–UC-BB-07, UC-BB-09 |
| BM04 | Không | Có, tệp hoàn chỉnh | Chủ nhiệm soạn ngoài hệ thống và tải tệp hoàn chỉnh lên để Hội đồng xem/đánh giá. | UC-TM-01, UC-PH-03 |
| BM05 | Không | Có, tệp quyết định hoàn chỉnh | Quyết định được lập/ký bên ngoài; P.KHCN đăng và lưu tệp, hệ thống không soạn/phê duyệt. | UC-TL-05, UC-TL-06 |
| BM06 | Có | Có, PDF đã ký trước khi nộp | Thành viên, Thư ký và Chủ tịch/P.KHCN đều đánh giá; phiếu tính vào điều kiện quá bán. | UC-PH-04, UC-CHOT-01 |
| BM07 | Có | Có, bản chữ ký Thư ký rồi bản đủ hai chữ ký | Chỉ có luồng form; không upload BM07 soạn bên ngoài. Hệ thống sinh PDF để ký. | UC-BB-02, UC-BB-04–UC-BB-07, UC-BB-09 |
| BM08 | Có | Có, PDF đã ký trước khi nộp | Chủ nhiệm nhập báo cáo tiến độ trực tiếp. | UC-BC-01 |
| BM09 | Không | Có, tệp hoàn chỉnh | Chủ nhiệm tải báo cáo tổng kết hoàn chỉnh. | UC-BC-02 |
| BM10 | Không | Có, tệp quyết định hoàn chỉnh | Quyết định được lập/ký bên ngoài; P.KHCN đăng và lưu tệp, hệ thống không soạn/phê duyệt. | UC-TL-07, UC-TL-08 |
| BM11 | Có | Có, PDF đã ký trước khi nộp | Thành viên, Thư ký và Chủ tịch/P.KHCN đều đánh giá; phiếu tính vào điều kiện quá bán. | UC-PH-06, UC-CHOT-01 |
| BM12 | Có | Có, bản chữ ký Thư ký rồi bản đủ hai chữ ký | Biên bản hai chữ ký; ghi nhận kết quả họp ngoài hệ thống. | UC-BB-03, UC-BB-04–UC-BB-07, UC-BB-09 |
| BM13 | Có | Có, PDF đã ký trước khi nộp | Chủ nhiệm nhập giải trình trực tiếp. | UC-BC-03 |
| BM14 | Không | Có, tệp hoàn chỉnh | Toàn bộ lập/xử lý/ký bên ngoài; P.KHCN tải bản hoàn chỉnh để lưu và cho Chủ nhiệm xem. | UC-TL-03, UC-TL-04 |
| BM15 | Không | Có, tệp quyết định hoàn chỉnh | Quyết định được lập/ký bên ngoài; P.KHCN đăng và lưu tệp, hệ thống không soạn/phê duyệt. | UC-TL-09, UC-TL-10 |

Lưu ý: “Upload PDF/tệp hoàn chỉnh” ở BM nhập form là bước tải lại PDF do hệ thống xuất và đã ký bên ngoài, không phải một phương thức soạn biểu mẫu thay thế.

## 6. Quy tắc nghiệp vụ đã chốt

### 6.1. Đợt và tuyến đầu

1. Đợt chỉ đóng tự động khi hết hạn; P.KHCN không được đóng thủ công trước thời hạn.
2. Hồ sơ sinh viên do Giảng viên được gán làm hướng dẫn xét duyệt; hồ sơ giảng viên do Trưởng Khoa/Trưởng đơn vị xét duyệt.
3. Sau khi được duyệt tuyến đầu, hồ sơ tự vào tập đủ điều kiện lập Hội đồng; không có bước P.KHCN tiếp nhận/xác nhận riêng.

### 6.2. Hội đồng và phiếu đánh giá

1. Hệ thống tạo và quản lý Hội đồng ở ba giai đoạn, không quản lý cuộc họp.
2. Mỗi giai đoạn có một Hội đồng riêng và các vai trò thành viên/Thư ký riêng.
3. Chủ tịch/P.KHCN và Thư ký đều là thành viên đánh giá, phải nộp BM02/BM06/BM11 tương ứng và được tính vào tổng số.
4. Điều kiện mở biên bản là số phiếu hợp lệ **lớn hơn 50%** tổng số thành viên Hội đồng, không phải 100%.
5. Tổng số thành viên bao gồm Chủ tịch, Thư ký, người vắng mặt và người chưa nộp phiếu.
6. Khi Thư ký bắt đầu lập biên bản, hệ thống phải cảnh báo; chỉ sau khi Thư ký xác nhận mới chốt tập phiếu, khóa nhận phiếu và mở form biên bản.
7. Mốc chốt phiếu là bất biến; P.KHCN không được mở lại nhận phiếu.
8. P.KHCN không được loại/thay thành viên không nộp phiếu sau khi Hội đồng đã được tạo.
9. Nếu chưa đạt quá bán, ứng dụng không kết thúc Hội đồng hoặc buộc tạo Hội đồng mới; việc hối thúc và phối hợp diễn ra ngoài hệ thống.

### 6.3. Form, PDF và biên bản

1. Mọi BM nhập form phải chứa đầy đủ tất cả thông tin của biểu mẫu gốc.
2. Tất cả BM nhập form đều hỗ trợ xem trước, xuất PDF, ký bên ngoài, tải PDF đã ký lên và nộp.
3. Form vẫn sửa được sau khi xuất PDF hoặc tải PDF ký lên tạm thời; chỉ bị khóa khi người dùng bấm Nộp.
4. BM03/BM07/BM12 đi theo tuyến hai chữ ký: Thư ký ký trước, P.KHCN với vai trò Chủ tịch ký sau.
5. P.KHCN chỉ được trả biên bản kèm lý do để sửa, không được từ chối vĩnh viễn.
6. Nếu biên bản bị trả và sửa, PDF/chữ ký cũ mất hiệu lực; Thư ký phải xuất, ký và nộp bản mới.
7. Thư ký phải sửa/nộp lại trong thời gian duyệt; hết hạn thì hệ thống khóa.
8. P.KHCN được gia hạn biên bản vì lý do chính đáng, bắt buộc nhập lý do; hệ thống mở lại quyền và thông báo hạn mới cho Thư ký.

### 6.4. Tài liệu ngoài hệ thống

1. Mọi BM là quyết định được lập và ký bên ngoài hệ thống; hệ thống không xử lý quy trình ký quyết định.
2. BM14 được lập, xử lý và ký hoàn toàn bên ngoài; P.KHCN chỉ tải bản hoàn chỉnh lên để lưu và cho Chủ nhiệm xem.
3. Hệ thống chỉ lưu/cung cấp hợp đồng đã ký; không tham gia ký hợp đồng hay nghiệp vụ tài chính.

## 7. Quyết định cũ đã bị thay thế và không được dùng

| Quyết định/giả định cũ | Quyết định hiện hành thay thế |
|---|---|
| Tạo và quản lý cuộc họp Hội đồng trong hệ thống. | Chỉ tạo và quản lý Hội đồng; cuộc họp, lịch, hoãn, bắt đầu, kết thúc và phối hợp đều ngoài hệ thống. |
| Phải đủ 100% BM02/BM06/BM11 mới mở biên bản. | Chỉ cần số phiếu hợp lệ lớn hơn 50% tổng số thành viên. |
| Thư ký không phải thành viên đánh giá, không nộp phiếu. | Thư ký thuộc Hội đồng, phải nộp phiếu tương ứng, được tính vào tổng số, đồng thời lập biên bản. |
| Chủ tịch chỉ ký/xác nhận biên bản. | P.KHCN với vai trò Chủ tịch cũng phải nộp phiếu đánh giá và được tính vào điều kiện quá bán. |
| P.KHCN có thể mở lại quyền nộp phiếu sau chốt. | Không được mở lại; mốc chốt do Thư ký xác nhận là bất biến. |
| Phiếu phải nộp trước thời điểm cuộc họp do ứng dụng quản lý. | Ứng dụng không quản lý thời điểm họp; mốc trong hệ thống là lúc Thư ký xác nhận bắt đầu lập biên bản. |
| Thư ký đứng ngoài cơ cấu Hội đồng. | Thư ký là thành viên trong cơ cấu Hội đồng, nhưng có thêm trách nhiệm lập biên bản. |
| Chủ tịch Hội đồng là actor độc lập. | P.KHCN thực hiện vai trò Chủ tịch; không tạo actor/tài khoản Chủ tịch riêng. |
| Giảng viên hướng dẫn là actor/tài khoản riêng. | Đây là vai trò của tài khoản Giảng viên trên đề tài sinh viên được gán. |
| BM07 có thể vừa nhập form vừa tải bản soạn bên ngoài như hai phương thức. | BM07 chỉ nhập form; hệ thống sinh PDF để ký và tải lại. |
| Form tiếp tục sửa sau khi đã nộp PDF ký. | Form bị khóa ở mốc người dùng bấm Nộp; chỉ xuất/tải tạm thời thì chưa khóa. |

## 8. Danh sách loại khỏi phạm vi

- Tạo, lập lịch, bắt đầu, hoãn, kết thúc hoặc quản lý cuộc họp Hội đồng.
- Tổ chức thảo luận, hối thúc, phối hợp thành viên và đánh giá chuyên môn của Hội đồng.
- Mở lại phiếu đánh giá sau khi Thư ký đã chốt.
- Thay/loại thành viên vì không nộp phiếu sau khi Hội đồng được tạo.
- Quy trình ký quyết định và chữ ký Hiệu trưởng trên biểu mẫu trong phạm vi hệ thống.
- Toàn bộ việc lập, xử lý và ký BM14.
- Quy trình soạn, thương lượng hoặc ký hợp đồng.
- Tạm ứng, thanh toán, quyết toán, hoàn trả, phê duyệt chứng từ kế toán hoặc tích hợp tài chính.
- Quyền đăng nhập/thao tác của thành viên nhóm nghiên cứu ngoài Chủ nhiệm.
- Actor Hiệu trưởng/Đại diện Nhà trường và Phòng Tài chính - Kế toán.
- Nộp BM02/BM06/BM11 bổ sung sau khi Thư ký đã chốt phiếu.

## 9. Các điểm cần xác minh trước khi đặc tả đầy đủ

1. Actor nhận/duyệt, deadline, vòng trả sửa và trạng thái của BM08, BM09, BM13.
2. Điều kiện nộp hồ sơ, cấu trúc dữ liệu nhóm, quy tắc yêu cầu hủy và vòng trả sửa tuyến đầu.
3. Trạng thái chi tiết của đợt/Hội đồng/hồ sơ/biểu mẫu và các phép chuyển trạng thái.
4. Trường dữ liệu đầy đủ của từng BM theo biểu mẫu gốc.
5. Quy tắc đối soát hoặc xác định nguồn chính thức nếu form và PDF đã ký khác nhau trước lúc nộp.
6. Mốc và cách tính “thời gian duyệt” biên bản; quyền xem/công bố kết quả Hội đồng.
7. Phạm vi sửa thông tin/danh sách Hội đồng sau khi tạo và mốc khóa sửa.
8. Kênh, nội dung và danh sách sự kiện thông báo ngoài thông báo gia hạn biên bản.
9. Có hay không actor/tính năng Quản trị hệ thống, Thư viện, dịch vụ ký số hoặc dịch vụ thông báo tích hợp.

## 10. Kiểm tra nhất quán baseline

- [x] Không còn use case quản lý cuộc họp; mọi cuộc họp được xác định là hoạt động ngoài hệ thống.
- [x] Điều kiện mở biên bản là `> 50%`, không phải `100%`.
- [x] Chủ tịch và Thư ký đều nộp phiếu đánh giá, đều được tính vào tổng số thành viên.
- [x] Thư ký có hai nhóm hành vi: đánh giá cá nhân và chốt phiếu/lập biên bản.
- [x] P.KHCN có hai nhóm hành vi: quản trị hành chính và đánh giá/ký với vai trò Chủ tịch.
- [x] Mốc chốt phiếu là lúc Thư ký xác nhận bắt đầu lập biên bản và không thể mở lại.
- [x] BM03/BM07/BM12 dùng tuyến hai chữ ký và vòng trả sửa làm mất hiệu lực bản cũ.
- [x] Pipeline form/PDF được tách thành năng lực dùng chung nhưng từng BM vẫn có use case nghiệp vụ riêng.
- [x] Ma trận BM01–BM15 phân biệt rõ BM nhập form, BM do Chủ nhiệm tải tệp hoàn chỉnh và quyết định do P.KHCN đăng sau khi lập/ký bên ngoài.
- [x] BM14 và hợp đồng chỉ được lưu dưới dạng tệp đã hoàn tất bên ngoài; nghiệp vụ ký/thanh toán bị loại khỏi phạm vi.
- [x] Không đưa Hiệu trưởng, Phòng Tài chính, thành viên nhóm ngoài Chủ nhiệm hoặc Giảng viên hướng dẫn độc lập vào actor baseline.
