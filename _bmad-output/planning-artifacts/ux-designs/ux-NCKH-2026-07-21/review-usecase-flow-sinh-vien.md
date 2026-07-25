# Review Use Case & Flow — Sinh viên

**Phạm vi:** mock-up `mockups/sinh-vien/SV-00` đến `SV-09`, PRD và Experience Spine.  
**Ngày review:** 23/07/2026  
**Kết luận:** Luồng BM01B và quyền xem kết quả có nền tốt. Trước khi triển khai cần chốt lại quyền thao tác của **Thành viên tham gia** và bổ sung các trạng thái ngoại lệ còn thiếu.

## Quy ước quyền

| Khái niệm | Ý nghĩa |
|---|---|
| Vai trò nghiệp vụ | `Sinh viên`; được kiểm tra ở server cùng với đối tượng và Đợt đăng ký. |
| Quan hệ trong đề tài | `Chủ nhiệm đề tài` hoặc `Thành viên tham gia`; là quyền theo từng đề tài, không thay thế vai trò Sinh viên trong header. |
| Quy tắc an toàn | Ẩn CTA không đủ quyền chỉ là hỗ trợ UX; server phải kiểm tra lại mọi hành động. |

## Danh mục use case

| ID | Use case | Actor chính | Màn hình hiện có | Đánh giá |
|---|---|---|---|---|
| SV-UC-01 | Đăng ký, xác minh và nhận vai trò | Sinh viên, Quản trị viên | SV-00, SV-09 | Đủ happy path; thiếu trạng thái từ chối/khóa. |
| SV-UC-02 | Xem Đợt đăng ký và bắt đầu BM01B | Sinh viên | SV-01, SV-02 | Đủ; cần trạng thái đợt đóng khi đang thao tác. |
| SV-UC-03 | Tạo và nộp BM01B | Chủ nhiệm Sinh viên, GVHD | SV-03 | Mạnh; cần mô phỏng validating/submitting/error/idempotent retry. |
| SV-UC-04 | Xử lý GVHD từ chối và tạo Hồ sơ thay thế | Chủ nhiệm Sinh viên, GVHD | SV-03b | Đủ flow chính; thiếu nhánh đợt đã đóng bằng state có thể kích hoạt. |
| SV-UC-05 | Theo dõi đề tài và công việc | Chủ nhiệm/Thành viên | SV-01, SV-04, SV-08 | Đủ cấu trúc; cần thống nhất quyền Thành viên. |
| SV-UC-06 | Cập nhật BM09 và sản phẩm | Chủ nhiệm hoặc Thành viên | SV-06 | **Blocked**: mock-up mâu thuẫn baseline PRD về quyền Thành viên. |
| SV-UC-07 | Gửi và theo dõi yêu cầu hủy | Chủ nhiệm, P.KHCN | SV-05, SV-08 | Chỉ có bước gửi; thiếu trạng thái P.KHCN từ chối/chấp thuận. |
| SV-UC-08 | Xem kết quả đã công bố/điều chỉnh | Chủ nhiệm/Thành viên, P.KHCN | SV-07, SV-08 | Đúng nguyên tắc sau công bố; thiếu ví dụ phiên bản điều chỉnh. |

## Use case và acceptance criteria

### SV-UC-01 — Đăng ký, xác minh và nhận vai trò

**Tiền điều kiện:** chưa có Tài khoản hoạt động; email Trường và mã Sinh viên hợp lệ.  
**Happy path:** nhập email/mã → gửi liên kết một lần → xác minh đúng email → hoàn thiện hồ sơ → chờ Quản trị viên duyệt → nhận vai trò `Sinh viên` → vào Danh sách đề tài.

**Ngoại lệ bắt buộc:** email đã tồn tại; liên kết hết hạn/đã dùng; mã Sinh viên không khớp; vai trò bị từ chối; Tài khoản bị khóa.

**Acceptance criteria:**

- Sau xác minh email nhưng trước duyệt, không được mở Đề tài/Đợt đăng ký bằng URL trực tiếp.
- Mỗi trạng thái nêu hành động kế tiếp hoặc cách liên hệ, không tiết lộ dữ liệu nghiệp vụ.
- Khi role được duyệt, sidebar, số đếm, thông báo và tìm kiếm tải lại trong phạm vi `Sinh viên`.

### SV-UC-02 — Xem Đợt đăng ký và bắt đầu BM01B

**Tiền điều kiện:** tài khoản Sinh viên hoạt động.  
**Happy path:** mở Đợt đã công bố trong phạm vi → thấy hạn, loại đợt và trạng thái Hồ sơ → chọn `Tạo Hồ sơ` → vào form BM01B khi Đợt vẫn mở.

**Ngoại lệ bắt buộc:** Đợt nháp/ngoài phạm vi không render; Đợt sắp mở chỉ hiển thị thời điểm; Đợt tự đóng khi quá hạn; Đợt chuyển sang đóng trong lúc form đang mở.

**Acceptance criteria:**

- Chỉ Đợt `Đã công bố` và đúng phạm vi xuất hiện trong danh sách.
- Trước transaction nộp, server kiểm tra lại Đợt còn mở; nếu quá hạn, không tạo Hồ sơ và giữ dữ liệu cục bộ để người dùng sao chép khi cần.
- Card luôn nêu mã/tên Đợt, thời hạn và CTA phù hợp; không dùng màu là tín hiệu duy nhất.

### SV-UC-03 — Tạo và nộp BM01B

**Actor:** chỉ `Chủ nhiệm đề tài` trong bối cảnh role `Sinh viên`.

**Happy path:** nhập dữ liệu → thêm thành viên → chọn đúng một GVHD hợp lệ → xem trước/tải PDF để ký ngoài hệ thống → chọn đúng một PDF đã ký → xác nhận `Nộp PDF & tạo Hồ sơ` → server atomically tạo mã Hồ sơ, gắn PDF và khóa snapshot → chuyển đến GVHD.

**Ngoại lệ bắt buộc:** thiếu trường; thiếu/đổi GVHD; PDF sai định dạng/dung lượng/virus; upload lỗi; Đợt đóng; quyền/quan hệ chủ nhiệm bị thu hồi; retry/double-click; response timeout.

**Acceptance criteria:**

- Không tạo bản nháp/Hồ sơ server trước submit thành công; không có `Lưu nháp`.
- CTA chỉ enabled sau khi dữ liệu hợp lệ, GVHD hợp lệ và một PDF hợp lệ đã chọn.
- Retry cùng idempotency key trả đúng một Hồ sơ canonical; không tạo mã/tệp trùng.
- Thành công hiển thị mã Hồ sơ, thời điểm, PDF bất biến và actor tiếp theo; lỗi giữ form, nêu nguyên nhân và focus tới vùng cần xử lý.

### SV-UC-04 — GVHD từ chối và Hồ sơ thay thế

**Tiền điều kiện:** HS-SV đã bị GVHD từ chối ký.  
**Happy path:** Sinh viên nhận thông báo → đọc lý do + PDF V1 read-only → nếu Đợt còn mở, chọn `Tạo Hồ sơ thay thế` → nhập lại dữ liệu/chọn PDF mới → tạo mã Hồ sơ mới có liên kết đến HS cũ.

**Ngoại lệ bắt buộc:** Đợt đã đóng; link thông báo stale; không đủ quyền; PDF cũ bị cố gắng tái sử dụng; lần nộp thay thế lỗi.

**Acceptance criteria:**

- HS bị từ chối không sửa, thay PDF, nộp lại hoặc trở thành V2 của mã cũ.
- CTA thay thế chỉ có khi server xác nhận Đợt còn mở; nếu không, giải thích hạn đã qua và chỉ cho xem evidence/feedback.
- Hồ sơ thay thế có mã khác, giữ liên kết audit với HS bị từ chối, không sao chép PDF cũ tự động.

### SV-UC-05 — Theo dõi đề tài và công việc

**Happy path:** vào Danh sách đề tài, mặc định tab `Cần bạn xử lý` nếu có task → lọc theo quan hệ/trạng thái/Đợt → mở chi tiết → xem bước 01–07, tài liệu hiện hành, actor tiếp theo và hạn → đi đến đúng workspace.

**Ngoại lệ bắt buộc:** không có đề tài; không có tác vụ; filter rỗng; task đã được xử lý; deep link ngoài phạm vi; quyền thay đổi trong phiên.

**Acceptance criteria:**

- Card hiển thị quan hệ Chủ nhiệm/Thành viên, trạng thái, bước, hạn và đúng một CTA chính.
- Deep link và thông báo kiểm tra quyền lại; lỗi `không quyền` trung tính, không lộ tên/mã/trạng thái/tệp.
- Khi task stale hoặc đã hoàn tất, reload dữ liệu và đưa người dùng tới trạng thái hiện hành thay vì cho thao tác cũ.

### SV-UC-06 — BM09 và sản phẩm

**Trạng thái quyết định cần chốt:** Mock-up cho `Thành viên tham gia` tải/thay thế sản phẩm được phân công; PRD baseline lại nêu không cấp quyền thao tác cho thành viên nhóm nghiên cứu ngoài Chủ nhiệm.

**Nếu chốt baseline PRD (khuyến nghị):** chỉ Chủ nhiệm tải/thay thế/nộp BM09 và sản phẩm; Thành viên chỉ đọc trạng thái/tài liệu được cấp, không thấy CTA upload.

**Nếu mở rộng quyền Thành viên:** phải cập nhật PRD, ma trận quyền, audit và UX spine; xác định chủ nhiệm phân công/thu hồi thế nào, Thành viên được thay thế tệp nào, xử lý tệp nháp khi bị gỡ nhóm, và ai được phép nộp bộ BM09.

**Acceptance criteria chung:** upload không đồng nghĩa Nộp; chỉ bộ tài liệu đủ thành phần mới được P.KHCN nhận/xét; mọi upload có trạng thái `uploading/processing/error/ready`, tên, dung lượng, phiên bản, người tải và thời điểm.

### SV-UC-07 — Yêu cầu hủy Đề tài

**Actor:** chỉ Chủ nhiệm đề tài.  
**Happy path:** khi trước `Chờ nghiệm thu`, mở yêu cầu hủy → nhập lý do + xác nhận → gửi → trạng thái yêu cầu `Đang chờ xử lý` → P.KHCN chấp thuận hoặc từ chối, đều có lý do và thông báo.

**Ngoại lệ bắt buộc:** Thành viên mở URL; trạng thái đã đến `Chờ nghiệm thu`; đã có yêu cầu pending; state stale khi submit; P.KHCN từ chối.

**Acceptance criteria:**

- Đây là request, không thay đổi trạng thái Đề tài cho tới khi P.KHCN quyết định.
- Chấp thuận chuyển `Đã hủy` nhưng không xóa dữ liệu/evidence/audit; từ chối hiển thị lý do và đưa về Đề tài đang tiếp tục.
- Chỉ Chủ nhiệm có CTA; Thành viên nhận thông điệp giải thích, không thấy control gửi.

### SV-UC-08 — Kết quả và phiên bản điều chỉnh

**Happy path:** P.KHCN công bố → nhận notification → mở Kết quả → xem kết luận, phiên bản published-current, tài liệu được phép và lịch sử công bố.

**Ngoại lệ bắt buộc:** trước công bố/deep link; quyền bị thu hồi; phiên bản điều chỉnh; tệp preview không khả dụng.

**Acceptance criteria:**

- Trước công bố, Sinh viên không nhận preview, badge, thông báo hay metadata cho phép suy đoán kết quả.
- Bản điều chỉnh không ghi đè V1: V1 vẫn xem được với nhãn mất hiệu lực, bản mới là current và có lý do/lịch sử liên kết.
- Notification dẫn đến đúng phiên bản mà người dùng còn quyền xem.

## Các flow cần bổ sung vào mock-up

| Ưu tiên | Flow/state chưa có bằng chứng rõ | Màn hình nên thêm hoặc trạng thái cần bật |
|---|---|---|
| P0 | Quyết định quyền Thành viên với BM09/sản phẩm | Cập nhật SV-06 và các spine sau khi chốt. |
| P1 | BM01B `submitting`, lỗi transaction, retry idempotent, hết hạn khi submit | Biến thể SV-03. |
| P1 | GVHD duyệt Hồ sơ và trạng thái chuyển tiếp `Chờ Hội đồng xét duyệt hồ sơ` | Biến thể SV-03b hoặc chi tiết Hồ sơ read-only. |
| P1 | P.KHCN từ chối/chấp thuận yêu cầu hủy | Hai biến thể SV-05 + thông báo liên kết. |
| P1 | Đợt đóng trước khi tạo HS thay thế | Biến thể SV-03b với CTA thay thế ẩn. |
| P2 | Kết quả V2 điều chỉnh, V1 mất hiệu lực | Biến thể SV-07. |
| P2 | Tài khoản/vai trò bị từ chối hoặc bị khóa | Biến thể SV-00/SV-09. |
| P2 | Target-unavailable từ notification/deep link | Biến thể SV-08/SV-09. |

## Finding cần quyết định

### F-SV-01 — Mâu thuẫn quyền thao tác của Thành viên tham gia (P0)

- **Bằng chứng:** `SV-06` cho Thành viên tham gia “tải và thay thế sản phẩm được Chủ nhiệm phân công”; `EXPERIENCE.md` cũng mô tả workspace Bước 03–07 “được giao”. Nhưng PRD nêu baseline: “Không cấp quyền thao tác cho thành viên nhóm nghiên cứu ngoài Chủ nhiệm đề tài”.
- **Rủi ro:** triển khai sai quyền hoặc audit thiếu actor/phiên bản; dùng mock-up làm nguồn triển khai sẽ vượt phạm vi MVP.
- **Khuyến nghị:** giữ baseline PRD, bỏ upload/thay thế khỏi Thành viên và chuyển SV-06 thành read-only/task hướng dẫn liên hệ Chủ nhiệm. Chỉ giữ thiết kế hiện tại nếu product owner phê duyệt mở rộng phạm vi và cập nhật đồng bộ PRD + Experience + ma trận quyền.

## Traceability

- PRD: FR-2, FR-6–FR-11, FR-17, FR-42, FR-47, FR-52–FR-54 và baseline scope.
- Experience Spine: mô hình vai trò/phạm vi, SV-00–SV-09, UJ-1, Evidence & PDF Contract và ma trận xem kết quả.
- Mock-up: `mockups/sinh-vien/00-dang-ky-xac-minh.html` đến `09-ho-so-va-khong-quyen.html`.
