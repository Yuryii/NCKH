# Trích xuất yêu cầu UX từ PRD

**Nguồn đã chốt:** `prd-NCKH-2026-07-20/prd.md` (trạng thái `final`, cập nhật 2026-07-21)  
**Mục đích:** đường cơ sở đầu vào cho thiết kế UX. Thuật ngữ viết hoa và nhãn trạng thái giữ nguyên theo PRD.

## 1. Tóm tắt sản phẩm và phạm vi trải nghiệm

Hệ thống là một không gian nghiệp vụ web thống nhất để theo dõi hồ sơ, biểu mẫu, vai trò, trạng thái và bằng chứng đã ký trong vòng đời **Đề tài NCKH**. MVP bao phủ **Bước 01–07** cho cả đề tài Giảng viên và Sinh viên: đăng ký, xét duyệt hồ sơ, thuyết minh, thực hiện/báo cáo tiến độ, nghiệm thu, giải trình và lưu tài liệu hoàn tất.

Hệ thống quản lý luồng công việc và bằng chứng, bao gồm mở/theo dõi/kết thúc **Cuộc họp Hội đồng**, nhưng không tổ chức thảo luận chuyên môn, họp trực tuyến, ký điện tử, hợp đồng hay tài chính. Chữ ký trên PDF luôn thực hiện bên ngoài hệ thống.

## 2. Người dùng, vai trò và mục tiêu

| Vai trò theo PRD | Mục tiêu/tác vụ UX chính | Phạm vi quyền đáng chú ý |
|---|---|---|
| **Giảng viên** | Tạo/nộp/sửa BM01 đề tài giảng viên; theo dõi hồ sơ; với tư cách **Chủ nhiệm đề tài** tiếp tục BM04, BM08, BM09, BM13; có thể là **Giảng viên hướng dẫn** | Chỉ xử lý hồ sơ của mình hoặc hồ sơ sinh viên được gán |
| **Sinh viên** | Tạo/nộp/sửa BM01 đề tài sinh viên; theo dõi lý do trả, tuyến duyệt và kết quả; tiếp tục các tác vụ của Chủ nhiệm đề tài | Phải có Giảng viên hướng dẫn hợp lệ trước khi nộp |
| **Trưởng Khoa/Trưởng đơn vị** | Xét duyệt tuyến đầu hồ sơ Giảng viên; tham gia tuyến ký/xác nhận BM08 | Chỉ hồ sơ thuộc đơn vị; có thể trả kèm lý do |
| **P.KHCN** | Vận hành Đợt đăng ký; thiết lập Hội đồng/Cuộc họp; theo dõi tiến độ; đăng BM05/BM10; kiểm tra BM13; lưu hợp đồng/BM14; xác nhận hoàn tất Bước 07; công bố kết quả | Không can thiệp nội dung Phiếu đánh giá; không mặc nhiên đồng nghĩa Chủ tịch, nhưng baseline quy định Chủ tịch do P.KHCN đảm nhiệm |
| **Chủ tịch Hội đồng** | Nộp BM02/BM06/BM11 như người đánh giá; kiểm tra/trả Biên bản; ký thứ hai và xác nhận hoàn tất BM03/BM07/BM12 | Nằm trong mẫu số 100% phiếu; xem kết quả trước công bố |
| **Thành viên Hội đồng** | Xem đúng bộ hồ sơ chính thức; lập, xuất, ký ngoài hệ thống và nộp Phiếu đánh giá cá nhân | Chỉ Hội đồng được phân công; không xem/sửa phiếu nháp người khác |
| **Thư ký Hội đồng** | Theo dõi tiến độ phiếu; sau Mốc chốt phiếu lập, ký và nộp BM03/BM07/BM12; sửa/nộp lại khi bị trả | Không nộp Phiếu đánh giá và không nằm trong mẫu số 100% |
| **Quản trị viên** | Tạo tài khoản ban đầu cho P.KHCN; duyệt/từ chối vai trò Giảng viên/Sinh viên; khóa/mở khóa/đặt lại mật khẩu | Không mặc nhiên có quyền xét duyệt NCKH; khóa không xóa lịch sử |
| **Người ngoài Trường được mời** | Xác minh đúng email, đăng ký/cập nhật Hồ sơ cá nhân, nhận đúng vai trò trong đúng Hội đồng | Lời mời gắn email + Hội đồng + Vai trò; nếu đã có Tài khoản thì gắn vào tài khoản hiện có |

Một **Tài khoản** có thể mang nhiều **Vai trò nghiệp vụ**. UX phải hỗ trợ chuyển ngữ cảnh rõ ràng và luôn cho biết vai trò đang được dùng; mọi hành động quan trọng ghi lại vai trò này.

### Không phải người dùng MVP

- Thành viên nhóm nghiên cứu ngoài Chủ nhiệm đề tài.
- Hiệu trưởng/Đại diện Nhà trường, Phòng Tài chính - Kế toán.
- Giảng viên hướng dẫn như một Tài khoản/actor riêng (đây là vai trò của Tài khoản Giảng viên trên hồ sơ cụ thể).
- Thư viện, dịch vụ ký số/thông báo ngoài hệ thống.

## 3. Jobs To Be Done và hành trình cốt lõi

1. **P.KHCN mở Đợt đăng ký:** cấu hình loại đợt, thời gian, phạm vi/danh mục; công bố; theo dõi số lượng theo trạng thái; hệ thống tự đóng khi hết hạn.
2. **Giảng viên/Sinh viên đăng ký:** tạo BM01 nháp → nhập nhóm nghiên cứu → lưu qua nhiều phiên → kiểm tra điều kiện → xem trước/xuất PDF → ký ngoài hệ thống → tải PDF đã ký → bấm `Nộp` → theo dõi tuyến xử lý.
3. **Xét duyệt tuyến đầu:** hệ thống chuyển hồ sơ Sinh viên đến Giảng viên hướng dẫn, hồ sơ Giảng viên đến Trưởng Khoa/Trưởng đơn vị → `Duyệt` hoặc `Trả chỉnh sửa` kèm lý do → Chủ nhiệm sửa, tạo PDF mới và nộp lại. Hồ sơ duyệt tự vào tập đủ điều kiện lập Hội đồng, không qua bước P.KHCN tiếp nhận.
4. **Người ngoài tham gia Hội đồng:** P.KHCN nhập email + vai trò → người nhận mở lời mời → xác minh đúng email → hoàn thiện Hồ sơ cá nhân → nhận quyền đúng Hội đồng.
5. **P.KHCN chuẩn bị Cuộc họp:** tạo Hội đồng theo một trong ba giai đoạn → gắn bộ tài liệu chính thức → phân công đúng một Chủ tịch, một Thư ký và các Thành viên → xử lý lời mời → `Mở Cuộc họp` thủ công, cấu trúc bị khóa.
6. **Đánh giá:** từng người có trách nhiệm đánh giá lập phiếu riêng BM02/BM06/BM11 → xuất PDF → ký ngoài hệ thống → tải lên → `Nộp` khi Cuộc họp `Đang diễn ra`. Chủ tịch phải nộp; Thư ký không được nộp.
7. **Chốt phiếu và Biên bản:** khi số phiếu hợp lệ bằng tổng người có trách nhiệm đánh giá, hệ thống tự tạo **Mốc chốt phiếu**, khóa **Tập phiếu**, mở BM03/BM07/BM12 → Thư ký lập/xuất/ký/nộp → Chủ tịch trả sửa hoặc ký bổ sung → tải bản đủ hai chữ ký → xác nhận hoàn tất.
8. **Kết thúc và công bố:** P.KHCN chỉ được kết thúc Cuộc họp khi đủ 100% phiếu và Biên bản hoàn tất; sau đó kết quả ở `Chờ công bố`; P.KHCN kiểm tra rồi thực hiện riêng `Công bố kết quả`.
9. **Thuyết minh đến Bước 07:** BM04 tải lên → P.KHCN đăng BM05 → Hội đồng BM06/BM07 → nếu được thực hiện, BM08 theo tuyến Chủ nhiệm → Trưởng đơn vị → P.KHCN → BM09 + sản phẩm → P.KHCN đăng BM10 → Hội đồng BM11/BM12 → nếu cần, BM13 và vòng kiểm tra P.KHCN → lưu BM14 khi áp dụng → P.KHCN xác nhận `Hoàn tất Bước 07`.
10. **Yêu cầu hủy:** Chủ nhiệm có thể yêu cầu hủy trước `Chờ nghiệm thu`; P.KHCN chấp thuận/từ chối, luôn giữ lịch sử.

## 4. Thực thể, quan hệ và dữ liệu UX cần biểu diễn

- **Tài khoản** ↔ một/nhiều **Vai trò nghiệp vụ**; có trạng thái xác minh, `Chờ xác nhận vai trò`, kích hoạt/khóa.
- **Hồ sơ cá nhân** chứa dữ liệu định danh và học thuật/nghiệp vụ, dùng xác nhận Vai trò và điền Biểu mẫu điện tử.
- **Đợt đăng ký** (`Nháp`, `Đã công bố`, `Đã đóng`) chứa phạm vi, loại đợt, thời gian, danh mục đề tài giao trực tiếp và nhiều Hồ sơ đăng ký.
- **Hồ sơ đăng ký** chứa loại đề tài, Chủ nhiệm đề tài, Giảng viên hướng dẫn khi áp dụng, nhóm nghiên cứu và BM01; sau xét duyệt hình thành **Đề tài NCKH**.
- **Đề tài NCKH** là aggregate xuyên Bước 01–07, liên kết các trạng thái, Hội đồng, Cuộc họp, biểu mẫu, tệp, kết quả và lịch sử.
- **Hội đồng** theo một trong ba giai đoạn; chứa phân công Chủ tịch, Thư ký, Thành viên và bộ tài liệu đầu vào.
- **Cuộc họp Hội đồng** được mở/kết thúc thủ công, không có giờ kết thúc cấu hình trước; sau khi mở khóa cấu trúc Hội đồng. Có thể bị hủy và liên kết Cuộc họp thay thế.
- **Phiếu đánh giá** BM02/BM06/BM11: một phiếu độc lập cho mỗi người đánh giá; Chủ tịch có phiếu, Thư ký không có.
- **Tập phiếu** + **Mốc chốt phiếu**: snapshot bất biến khi đủ 100%, lưu thời điểm, số phiếu hợp lệ và tổng mẫu số.
- **Biên bản Hội đồng** BM03/BM07/BM12: do Thư ký lập, đi qua hai chữ ký Thư ký → Chủ tịch, có vòng trả sửa và phiên bản.
- **Biểu mẫu điện tử**: dữ liệu có cấu trúc; **PDF xuất**: ảnh chụp dữ liệu tại thời điểm xuất; **PDF đã ký**: bằng chứng chính thức; phải liên kết đúng phiên bản.
- Tài liệu tải lên hoàn chỉnh: BM04, BM09 và sản phẩm. Tài liệu lập/ký ngoài hệ thống rồi lưu/công bố: BM05, BM10, BM14, hợp đồng.
- **Thông báo**, **Nhật ký kiểm toán**, **Phiên bản tài liệu**, lý do trả/hủy/điều chỉnh là đối tượng xuyên suốt.

## 5. Ma trận quyền và điều kiện hiển thị hành động

| Hành động | Ai được làm | Điều kiện/cổng UX |
|---|---|---|
| Tạo/công bố Đợt đăng ký | P.KHCN | Công bố chỉ khi đủ dữ liệu; sau công bố chỉ sửa nội dung không làm mất tính hợp lệ hồ sơ đã nộp |
| Tạo/nộp BM01 | Giảng viên/Sinh viên | Đợt đang mở; đủ trường; Sinh viên có GVHD hợp lệ; có PDF hợp lệ; nhấn Nộp mới khóa |
| Duyệt/trả hồ sơ | GVHD hoặc Trưởng Khoa/Trưởng đơn vị đúng tuyến | Chỉ hồ sơ được gán/thuộc đơn vị; trả bắt buộc lý do |
| Xử lý yêu cầu hủy | Chủ nhiệm gửi; P.KHCN quyết định | Chỉ trước `Chờ nghiệm thu`; quyết định có lý do/thông báo |
| Sửa Hội đồng | P.KHCN | Chỉ khi Hội đồng `Nháp`; sau mở Cuộc họp cấu trúc bị khóa |
| Mở Cuộc họp | P.KHCN | Đủ cơ cấu, tài khoản hoạt động, lời mời người ngoài đã chấp nhận, đủ bộ tài liệu |
| Nộp Phiếu đánh giá | Chủ tịch + Thành viên có trách nhiệm đánh giá | Cuộc họp `Đang diễn ra`, trước Mốc chốt phiếu; Thư ký không có hành động này |
| Lập/nộp Biên bản | Thư ký đúng Cuộc họp | Chỉ sau Mốc chốt phiếu và khi Cuộc họp đang diễn ra |
| Trả/ký thứ hai Biên bản | Chủ tịch | Trả bắt buộc lý do; hoàn tất chỉ khi có PDF đủ hai chữ ký |
| Kết thúc Cuộc họp | P.KHCN | Đủ 100% phiếu hợp lệ + Biên bản hoàn tất |
| Xem kết quả trước công bố | P.KHCN, Chủ tịch, Thư ký | Thành viên khác chỉ xem phiếu của mình/tài liệu đã phân quyền |
| Công bố kết quả | P.KHCN | Cuộc họp kết thúc + Biên bản đủ hai chữ ký; không công bố tự động |
| BM08 | Chủ nhiệm → Trưởng đơn vị → P.KHCN | Ký ngoài hệ thống tuần tự; thay nội dung tạo phiên bản mới và vô hiệu chữ ký sau |
| BM13 | Chủ nhiệm; P.KHCN kiểm tra | Chỉ khi BM12 hiện hành yêu cầu sửa/giải trình; không họp lại Hội đồng |
| Xác nhận hoàn tất Bước 07 | P.KHCN | BM12 đạt; BM13 đã xác nhận nếu cần; BM14 đã lưu nếu có hợp đồng phải thanh lý |

Mọi quyền phải được thực thi phía máy chủ; ẩn nút chỉ là biểu hiện giao diện, không phải kiểm soát quyền.

## 6. Trạng thái và mô hình tiến trình cần hiển thị

### Trạng thái tổng quan đề tài (chuỗi nhãn chính xác)

`Nháp` → `Chờ duyệt cấp đầu` → (`Trả chỉnh sửa` → `Chờ duyệt lại`)* → `Chờ Hội đồng xét duyệt hồ sơ` → `Đang xét duyệt hồ sơ` → `Đạt xét duyệt hồ sơ` hoặc `Không đạt xét duyệt hồ sơ` → `Chờ nộp thuyết minh` → `Đang xét duyệt thuyết minh` → `Thuyết minh không đạt` hoặc `Đang thực hiện` → `Đang thực hiện — đã nộp báo cáo giữa kỳ` → `Chờ nghiệm thu` → `Đang nghiệm thu` → `Đã nghiệm thu` hoặc `Chờ giải trình sau nghiệm thu` → `Chờ xác nhận giải trình` → `Hoàn tất Bước 07`.

Trạng thái kết thúc/ngoại lệ khác: `Không đạt nghiệm thu`, `Đã hủy`, `Quá hạn`, `Không được chọn`.

Nguyên tắc UX:

- Chỉ một **Trạng thái tổng quan đề tài** trên danh sách; trong chi tiết phải mở được trạng thái chi tiết và sự kiện nguồn.
- Trạng thái tổng quan là dẫn xuất, không được nhập tay.
- `Đã tải PDF ký` và `Đã nộp` là trạng thái Biểu mẫu/sự kiện, không phải trạng thái tổng quan.
- Báo cáo giữa kỳ là chi tiết của `Đang thực hiện`, không phải giai đoạn độc lập.
- Phải phân biệt rõ `Biên bản hoàn tất`, `Cuộc họp kết thúc`, `Chờ công bố` và `Công bố kết quả`.
- Hiển thị rõ “ai/bước nào chịu trách nhiệm tiếp theo”, lý do trả và hành động khắc phục.

### Trạng thái đối tượng phụ cần UX hóa

- Đợt đăng ký: `Nháp`, `Đã công bố`, `Đã đóng`.
- Cuộc họp: tối thiểu chuẩn bị/nháp, `Đang diễn ra`, đã kết thúc, bị hủy, liên kết thay thế.
- Biên bản: soạn thảo, đã nộp Chủ tịch, `Trả chỉnh sửa`, chờ chữ ký thứ hai, hoàn tất.
- Kết quả: `Chờ công bố`, đã công bố, phiên bản điều chỉnh.
- Phiên bản tài liệu: hiện hành, mất hiệu lực, bị thay thế; bản của Cuộc họp bị hủy không hợp lệ ở Cuộc họp thay thế.

## 7. Bề mặt/màn hình được suy ra

1. Đăng nhập, đăng ký email Trường, xác minh email, chọn loại người dùng, nhập mã GV/SV, trạng thái chờ duyệt vai trò.
2. Tiếp nhận lời mời người ngoài, xác minh email, hoàn thiện Hồ sơ cá nhân.
3. Bộ chuyển Vai trò/ngữ cảnh và trang công việc theo vai trò.
4. Trang chủ/dashboard theo vai trò: việc cần làm, thông báo, trạng thái hồ sơ/đề tài, deadline Đợt đăng ký.
5. Danh sách/chi tiết Đợt đăng ký; trình tạo/cấu hình/công bố; thống kê hồ sơ theo trạng thái.
6. Workspace Hồ sơ đăng ký/BM01: form nhiều phần, nhóm nghiên cứu lặp, lưu nháp, validation, xem trước PDF, tải PDF ký, xác nhận Nộp.
7. Hàng chờ xét duyệt tuyến đầu và màn hình đọc hồ sơ/PDF song song với Duyệt/Trả.
8. Danh sách/chi tiết Đề tài NCKH: timeline Bước 01–07, trạng thái tổng quan + chi tiết, tác vụ kế tiếp, tài liệu/phiên bản.
9. Trình thiết lập Hội đồng/Cuộc họp: giai đoạn, hồ sơ đầu vào, vai trò, lời mời, checklist sẵn sàng, khóa cấu trúc.
10. Dashboard Cuộc họp: số phiếu hợp lệ/tổng số, danh sách người đánh giá, Thư ký tách riêng, Mốc chốt phiếu, trạng thái Biên bản, điều kiện kết thúc.
11. Workspace Phiếu đánh giá BM02/BM06/BM11 và Biên bản BM03/BM07/BM12 với cùng pipeline form → preview/export → upload signed PDF → submit/version.
12. Màn hình Chủ tịch kiểm tra/trả/ký thứ hai Biên bản; màn hình P.KHCN kết thúc Cuộc họp và công bố kết quả.
13. Workspace BM04/BM05, BM08 tuyến tuần tự, BM09 + sản phẩm/BM10, BM13, hợp đồng/BM14.
14. Trung tâm thông báo trong ứng dụng.
15. Trình xem tài liệu/phiên bản, trạng thái hiệu lực, quan hệ thay thế và tải xuống.
16. Nhật ký kiểm toán/timeline theo đối tượng và khoảng thời gian.
17. Quản trị Tài khoản, chờ xác nhận vai trò, khóa/mở khóa/đặt lại mật khẩu.

## 8. Validation, lỗi, trạng thái trống và phục hồi

- Mọi lỗi/trạng thái/lý do không thể tiếp tục phải bằng tiếng Việt rõ ràng, gắn hành động khắc phục (NFR-11).
- Form: trường thường bắt buộc; trường có điều kiện chỉ bắt buộc khi nhánh phát sinh; lỗi nên gắn tại trường và có tóm tắt đầu form.
- Đợt đăng ký: kết thúc phải sau bắt đầu; thiếu dữ liệu chặn công bố; hết hạn chặn tạo/nộp mới nhưng giữ nháp ở trạng thái chỉ đọc/không thể nộp.
- BM01: chặn nộp nếu thiếu GVHD hợp lệ, thiếu trường, thiếu PDF ký, sai định dạng/dung lượng; upload PDF chưa đồng nghĩa Nộp.
- Hội đồng: chặn mở nếu thiếu đúng một Chủ tịch/Thư ký, thiếu thành viên/tài liệu, tài khoản chưa hoạt động hoặc lời mời chưa chấp nhận.
- Phiếu/Biên bản: chặn nộp ngoài Cuộc họp đang diễn ra; chặn phiếu sau Mốc chốt; chặn Biên bản trước đủ 100%; chặn kết thúc nếu thiếu phiếu/Biên bản.
- Tải tệp và nộp: chống double-submit khi mạng chậm/bấm nhiều lần; nếu xử lý tài liệu tạm lỗi, không mất dữ liệu đã bấm Nộp, hiển thị trạng thái rõ và cho thử lại an toàn.
- Trả sửa/hủy/điều chỉnh: lý do bắt buộc; bản trước không bị ghi đè; hiển thị bản hiện hành và bản mất hiệu lực.
- Quyền: truy cập URL/ID ngoài phạm vi phải trả thông báo an toàn, không làm lộ sự tồn tại/nội dung đối tượng.
- Empty states cần thiết: chưa có Đợt được công bố, chưa có Hồ sơ/Đề tài, chưa có việc cần làm, chưa có thông báo, chưa có phiên bản/tài liệu, chưa đủ phiếu, chưa phát sinh BM13/BM14 vì không áp dụng.

## 9. Yêu cầu phi chức năng tác động trực tiếp đến UX

- **Responsive web:** MVP là ứng dụng web responsive trên máy tính và thiết bị di động; không có app native.
- **Hiệu năng:** 95% xem danh sách/mở chi tiết/lưu nháp trong 3 giây; 95% xuất PDF trong 10 giây (đều là baseline cần xác nhận). Cần loading/progress, trạng thái lưu và phản hồi bất đồng bộ rõ ràng.
- **Khả năng tiếp cận:** luồng cốt lõi dùng được bằng bàn phím; thành phần chính đạt WCAG 2.1 AA (đang là giả định chờ stakeholder xác nhận).
- **Múi giờ:** mọi thời điểm nghiệp vụ dùng `Asia/Ho_Chi_Minh`; định dạng ngày giờ phải nhất quán.
- **Bảo mật:** xác minh email/lời mời dùng một lần, có hạn và thu hồi được; chống dò/gửi lặp/lạm dụng; không tiết lộ dữ liệu ngoài quyền.
- **Toàn vẹn:** Nhật ký kiểm toán và Mốc chốt phiếu bất biến; PDF ký gắn đúng phiên bản và có checksum/cơ chế phát hiện thay đổi.
- **Khả năng tái hiện:** thay đổi Hồ sơ cá nhân sau này không làm đổi tài liệu lịch sử.
- **Sao lưu/phục hồi:** giữ liên kết giữa dữ liệu, PDF, trạng thái và audit; baseline RPO 24 giờ/RTO 8 giờ.

## 10. Tiêu chí chấp nhận UX rút gọn theo năng lực

- Người chưa đăng nhập không thấy dữ liệu; đăng xuất/hết phiên kết thúc truy cập.
- Người dùng nhiều vai trò chuyển được đúng ngữ cảnh và thấy rõ vai trò đang thao tác.
- Tự đăng ký: email xác minh xong vẫn ở `Chờ xác nhận vai trò`; chỉ có quyền sau khi Quản trị viên duyệt; một email không tạo hai Tài khoản.
- Đợt `Nháp` không hiện cho người đăng ký; tự đóng đúng hạn; số liệu tổng quan khớp danh sách chi tiết.
- BM01 và các Biểu mẫu điện tử giữ nháp qua phiên, preview/export nhiều lần không khóa, chỉ `Nộp` thành công mới khóa.
- Tuyến đầu không lẫn hàng chờ; trả sửa có lý do; nộp lại tạo phiên bản mới; duyệt tự chuyển vào tập lập Hội đồng.
- Sau mở Cuộc họp không sửa cơ cấu/mẫu số; sai cấu hình phải hủy có lý do và tạo Cuộc họp thay thế, giữ lịch sử.
- Tiến độ phiếu hiển thị đúng công thức; ví dụ 5 người đánh giá + 1 Thư ký cần đúng 5 phiếu, không phải 6.
- Mốc chốt được tạo tự động đúng lúc, khóa phiếu bất biến và mở đúng Biên bản cho đúng Thư ký.
- Biên bản chỉ hoàn tất khi có bản đủ hai chữ ký; giữ cả bản chữ ký Thư ký và bản đủ hai chữ ký.
- Kết quả không tự công bố; quyền xem trước/sau công bố thay đổi đúng ma trận; điều chỉnh kết quả tạo phiên bản có lý do và lịch sử.
- BM04/BM05/BM09/BM10/BM14/hợp đồng được thể hiện là tài liệu lập ngoài hệ thống; không xuất hiện UI soạn/ký sai phạm vi.
- BM08 thể hiện rõ tuyến tuần tự và phiên bản; sửa sau chữ ký tạo phiên bản mới và vô hiệu các chữ ký/duyệt sau của bản cũ.
- BM13 chỉ xuất hiện khi BM12 yêu cầu; P.KHCN xử lý không triệu tập lại Hội đồng.
- `Hoàn tất Bước 07` chỉ bật khi toàn bộ điều kiện áp dụng được thỏa mãn và hiển thị checklist bằng chứng.
- Mọi hành động quan trọng truy vết được Tài khoản, Vai trò, thời gian, đối tượng, trạng thái trước/sau, phiên bản và lý do.

## 11. Ràng buộc nội dung và biểu mẫu

- Trước khi thiết kế/phát triển BM01A/B, BM02, BM03, BM06, BM07, BM08, BM11, BM12, BM13 phải có **Từ điển dữ liệu** đối chiếu biểu mẫu gốc.
- Không tự ý lược bỏ trường; dữ liệu lặp (thành viên, tiêu chí, kết luận) phải là dòng cấu trúc.
- Mỗi trường phải có tên, ý nghĩa, kiểu, bắt buộc, điều kiện hiển thị, validation và nguồn dữ liệu.
- Mẫu PDF mới dùng Unicode và tên chuẩn `TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐỒNG NAI`.
- Biểu mẫu điện tử là nguồn dữ liệu cấu trúc; PDF đã ký là bằng chứng chính thức. Hệ thống không tự đối soát nội dung hai nguồn; UX phải cho người duyệt kiểm tra và trả sửa nếu lệch.

## 12. Khoảng trống cần giả định hoặc chốt

### Đã được PRD nêu rõ là cần chốt trước pilot

1. Miền email Trường cụ thể (OQ-4).
2. Thời hạn lời mời/xác minh; ai được thu hồi/gửi lại; cách xử lý email đã có Tài khoản (OQ-5).
3. Định dạng, dung lượng, tên tệp, quét mã độc, thời hạn lưu PDF/tệp (OQ-6).
4. Quy mô đồng thời, số Hồ sơ mỗi đợt, thời hạn lưu trữ (OQ-7).
5. Xác nhận các baseline hiệu năng, RPO/RTO, WCAG và chỉ số pilot (OQ-8).
6. Xác nhận web responsive là bề mặt duy nhất (OQ-9; PRD hiện lấy đây làm baseline).
7. Phạm vi pilot, Đợt/đơn vị tham gia, người chấp thuận nghiệm thu (OQ-10).

### Khoảng trống UX suy ra cần đặt giả định thiết kế

1. Cấu trúc điều hướng tổng thể và mặc định sau đăng nhập cho tài khoản nhiều vai trò chưa được quy định.
2. Ưu tiên desktop/mobile theo vai trò chưa có dữ liệu; hợp lý để lấy desktop-first cho P.KHCN/Hội đồng và responsive mobile cho theo dõi/tác vụ ngắn, nhưng chưa được stakeholder xác nhận.
3. Danh mục đơn vị, mã GV/SV và cơ chế Quản trị viên đối chiếu xác nhận vai trò chưa mô tả nguồn dữ liệu.
4. Ai gán Giảng viên hướng dẫn và tại bước nào chưa được nêu rõ trong FR.
5. Loại `Đợt đăng ký`, “phạm vi được công bố”, danh mục đề tài giao trực tiếp và logic `Không được chọn` chưa đủ chi tiết để thiết kế trường/lọc.
6. Quy tắc chọn “phiên bản chính thức” chuyển Hội đồng, đánh dấu “đủ thành phần” BM09/sản phẩm và trạng thái hiệu lực tài liệu chưa có thao tác/thuật ngữ UI chi tiết.
7. Hình thức/kênh hỗ trợ ký ngoài hệ thống, cách người dùng biết PDF nào cần tải xuống/tải lên và cách kiểm tra đủ chữ ký chưa quy định.
8. Quy tắc notification read/unread, gom nhóm, lưu giữ và tần suất chưa có.
9. Bộ lọc, tìm kiếm, sắp xếp, phân trang, export danh sách và dashboard KPI chưa quy định.
10. Nội dung Hồ sơ cá nhân và toàn bộ field-level validation phải chờ Từ điển dữ liệu/biểu mẫu gốc.
11. Trạng thái chi tiết đầy đủ của từng đối tượng (Tài khoản, lời mời, Cuộc họp, từng biểu mẫu/tệp) chưa có state machine chính thức.
12. Hành vi khi phiên hết hạn trong lúc đang soạn, autosave/xung đột nhiều tab, upload gián đoạn, PDF export lâu hoặc checksum lỗi chưa quy định.
13. Cơ chế xác nhận trước hành động hệ quả lớn (`Nộp`, hủy Cuộc họp, kết thúc, công bố, khóa tài khoản) và khả năng hoàn tác chưa được nêu; nên giả định có confirm rõ hậu quả, không có undo nếu hành động tạo mốc bất biến.
14. Brand system ngoài chỉ dẫn mới của người dùng “đỏ–trắng theo dntu.edu.vn” không nằm trong PRD; cần nghiên cứu riêng website tham chiếu và không coi các chi tiết trực quan của website là yêu cầu nghiệp vụ.

## 13. Nguyên tắc UX nên khóa từ PRD

- **Task-first theo vai trò và ngữ cảnh**, không chỉ menu theo danh tính.
- **Trạng thái luôn đi với chủ thể chịu trách nhiệm và hành động kế tiếp.**
- **Progressive disclosure** cho quy trình dài Bước 01–07, nhưng timeline toàn cục luôn thấy được.
- **Evidence-first:** phân biệt dữ liệu đang soạn, PDF xuất, PDF đã ký, bản đã nộp, bản hiện hành và bản mất hiệu lực.
- **Guardrails rõ hơn tốc độ:** điều kiện mở/chốt/kết thúc/công bố được biểu diễn bằng checklist và lý do bị chặn.
- **Không dựa vào màu đơn thuần** cho trạng thái; mọi badge có nhãn/text/icon phù hợp WCAG.
- **Lịch sử không bị che:** mỗi quyết định, lần trả, lần nộp và thay phiên bản phải truy cập được trong đúng phạm vi quyền.
