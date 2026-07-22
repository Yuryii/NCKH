# Audit UX — Vai trò, phân quyền, điều hướng và độ phủ màn hình

Ngày rà soát: 22/07/2026  
Phạm vi: `DESIGN.md`, `EXPERIENCE.md`, toàn bộ `mockups/*.html`, đối chiếu `.working/prd-extract.md` và PRD nguồn.  
Giới hạn: báo cáo này chỉ nêu findings và bản sửa đề xuất; chưa sửa spine/mockup.

## Kết luận

Phản ánh của người dùng là đúng. Mockup hiện tại đã chuẩn hóa **hình dạng** sidebar nhưng chưa thiết kế **ma trận sidebar theo Vai trò đang hoạt động**. Vì vậy ba mockup của Lan đang ở `Vai trò: Giảng viên` vẫn hiển thị `Hội đồng`; nghiêm trọng hơn, `work-queue.html` còn trộn một task của `Thành viên Hội đồng` vào hàng đợi Giảng viên.

Đây không chỉ là lỗi một menu. Hợp đồng UX hiện còn thiếu bốn lớp cần thiết để triển khai phân quyền an toàn:

1. Taxonomy rõ giữa Vai trò có thể chọn và quan hệ/phân công theo đối tượng.
2. Ma trận nav + surface + action cho từng Vai trò đang hoạt động.
3. Biến thể màn hình theo Vai trò, nhất là Dashboard Cuộc họp.
4. Hợp đồng deep-link/permission-change không làm lộ sự tồn tại hoặc metadata của đối tượng.

Hiện chỉ có 4 mockup, bao phủ trực quan 2 ngữ cảnh (`Giảng viên`, `P.KHCN`) và chưa có màn hình riêng cho `Sinh viên`, `Trưởng Khoa/Trưởng đơn vị`, `Chủ tịch`, `Thành viên`, `Thư ký`, `Quản trị viên`, người dùng chờ duyệt và người ngoài qua lời mời. Chưa đủ để tuyên bố “đầy đủ tất cả màn hình của các vai trò”.

## Findings chặn hoàn tất

### PERM-01 — BLOCKER — Giảng viên nhìn thấy `Hội đồng` dù Vai trò hiện hành không có năng lực này

**Bằng chứng**

- `mockups/work-queue.html:23,25`: header ghi `Vai trò: Giảng viên`, sidebar vẫn có `Hội đồng`.
- `mockups/topic-detail.html:14`: cùng account/role, sidebar vẫn có `Hội đồng`.
- `mockups/evidence-workspace.html:13`: cùng account/role, sidebar vẫn có `Hội đồng`.
- PRD extract dòng 16 giới hạn Giảng viên ở hồ sơ của mình hoặc hồ sơ sinh viên được gán; năng lực Hội đồng chỉ đến từ phân công `Chủ tịch`, `Thành viên`, `Thư ký` riêng (dòng 20–22).

**Hệ quả**

UI phát tín hiệu sai rằng Vai trò Giảng viên có quyền duyệt Hội đồng. Nếu dev dùng sidebar hiện tại làm nguồn triển khai, việc chỉ “ẩn nút trong trang” vẫn để lộ route, object class, count hoặc metadata Hội đồng.

**Bản sửa chính xác**

- Khi active role là `Giảng viên`: sidebar chỉ có `Việc cần làm`, `Thông báo`, `Đợt đăng ký`, `Đề tài NCKH`, `Hồ sơ cá nhân`. Không có `Hội đồng`.
- Nếu cùng Tài khoản còn được phân công Hội đồng, role-switcher hiển thị Vai trò `Chủ tịch Hội đồng`, `Thành viên Hội đồng` hoặc `Thư ký Hội đồng`. Chỉ sau khi chuyển sang Vai trò đó mới hiện `Hội đồng`.
- Không cộng quyền của mọi role trên Tài khoản vào một sidebar. Authorization context luôn là `account + active role + object assignment + lifecycle`.

### PERM-02 — BLOCKER — Hàng đợi Giảng viên chứa task của Thành viên Hội đồng

**Bằng chứng**

- `mockups/work-queue.html:27` xác nhận toàn trang là “Công việc theo Vai trò Giảng viên”.
- `mockups/work-queue.html:34` lại có `Nộp BM11 — Phiếu đánh giá nghiệm thu · Vai trò Thành viên Hội đồng`.
- `EXPERIENCE.md:53` đã quy định count, preview, link và cả vùng chờ phải cùng bộ lọc của Vai trò hiện hành.

**Hệ quả**

Vi phạm isolation giữa role; task count `4` cũng sai phạm vi. Người dùng có thể thao tác dưới role/audit context sai hoặc nhận preview của Hội đồng khi chưa chuyển role.

**Bản sửa chính xác**

- Xóa BM11 khỏi hàng đợi `Giảng viên`; số đếm phải tính lại.
- Nếu muốn báo có việc ở role khác, chỉ đặt badge trong **menu role-switcher**, ví dụ `Thành viên Hội đồng — 1 việc`, không đưa title, mã Hội đồng, trạng thái phiếu hoặc CTA vào queue Giảng viên.
- Khi chọn role đó, reload toàn bộ count/list/preview/link theo scope mới rồi mới hiện task BM11.

### PERM-03 — HIGH — Mockup Giảng viên làm lộ metadata “kết quả chưa công bố”

**Bằng chứng**

- `mockups/work-queue.html:37` tạo notification `Kết quả chưa được công bố`.
- `EXPERIENCE.md:183` lại cấm Chủ nhiệm, GVHD và Trưởng đơn vị nhận preview, badge, task count **hoặc metadata kết quả** trước công bố.

**Bản sửa chính xác**

- Bỏ hoàn toàn notification phát sinh từ result chưa công bố khỏi queue/notification/search/count của Giảng viên/Sinh viên/GVHD/Trưởng đơn vị.
- Chỉ tạo notification cho các actor này sau sự kiện `Công bố kết quả` thành công.
- Không thay bằng chuỗi “bị ẩn do không có quyền”, vì chính sự hiện diện của item vẫn là side channel.

### PERM-04 — HIGH — IA nói “lọc theo quyền” nhưng không có ma trận nav xác định

**Bằng chứng**

- `EXPERIENCE.md:24–26` đưa ba mục nghiệp vụ vào “sidebar chuẩn” rồi chỉ nói chung “mục không có quyền có thể bị ẩn”.
- `DESIGN.md:270` khóa group/nhãn/vị trí nhưng không chỉ rõ role nào thấy mục nào.
- Kết quả trực tiếp là cả bốn mockup copy nguyên ba mục nghiệp vụ.

**Bản sửa chính xác**

Thay đoạn “sidebar chuẩn” bằng ma trận bắt buộc dưới đây. Ô `—` nghĩa là route không được render, không được có count/preload/search result.

| Vai trò đang hoạt động | Công việc | Nghiệp vụ | Tài khoản |
|---|---|---|---|
| Giảng viên | Việc cần làm; Thông báo | Đợt đăng ký; Đề tài NCKH | Hồ sơ cá nhân |
| Sinh viên | Việc cần làm; Thông báo | Đợt đăng ký; Đề tài NCKH | Hồ sơ cá nhân |
| Trưởng Khoa/Trưởng đơn vị | Việc cần làm; Thông báo | Đề tài NCKH (chỉ đúng đơn vị/phần việc) | Hồ sơ cá nhân |
| P.KHCN | Việc cần làm; Thông báo | Đợt đăng ký; Đề tài NCKH; Hội đồng | Hồ sơ cá nhân |
| Chủ tịch Hội đồng | Việc cần làm; Thông báo | Hội đồng | Hồ sơ cá nhân |
| Thành viên Hội đồng | Việc cần làm; Thông báo | Hội đồng | Hồ sơ cá nhân |
| Thư ký Hội đồng | Việc cần làm; Thông báo | Hội đồng | Hồ sơ cá nhân |
| Quản trị viên | Việc cần làm; Thông báo | — | Quản lý tài khoản; Hồ sơ cá nhân |
| Chờ xác nhận vai trò / bị từ chối | — | — | Trạng thái tài khoản; Hồ sơ cá nhân; Đăng xuất |
| Người ngoài chưa chấp nhận lời mời | Không vào app shell | Surface lời mời/xác minh/hoàn thiện hồ sơ duy nhất | — |

Ghi chú bắt buộc:

- `Giảng viên hướng dẫn` không phải active role riêng; đó là assignment trên hồ sơ sinh viên. Task duyệt xuất hiện trong queue Giảng viên và chỉ mở hồ sơ được gán.
- `Chủ nhiệm đề tài` là relation trên Hồ sơ/Đề tài; dùng badge `Bạn là Chủ nhiệm đề tài`, không phải một profile label hay mục nav.
- `Cuộc họp` là child route của `Hội đồng`; Biểu mẫu/Tài liệu là child route của object nguồn. Child route không làm phát sinh top-level item.
- `Quản trị viên` không mặc nhiên thấy Đợt/Đề tài/Hội đồng. Nếu một account kiêm P.KHCN, phải chuyển role.

### PERM-05 — HIGH — Taxonomy role đang tự mâu thuẫn và chưa mô tả role có scope

**Bằng chứng**

- `DESIGN.md:271` và `EXPERIENCE.md:86` gọi role-switcher là “Vai trò nghiệp vụ toàn hệ thống”, nhưng ví dụ lại có `Chủ tịch Hội đồng`, vốn chỉ có quyền trong Hội đồng/Cuộc họp được phân công.
- `EXPERIENCE.md:86` đúng khi loại `Chủ nhiệm đề tài` khỏi switcher, nhưng chưa nói vì sao Hội đồng role được chọn còn quyền vẫn bị giới hạn theo assignment.
- Audit trên `topic-detail.html:20` ghi `Chủ nhiệm đề tài` như role duy nhất, trong khi active role là `Giảng viên`; điều này làm mơ hồ role nào được ghi vào audit.

**Bản sửa chính xác**

Đổi thuật ngữ `Vai trò nghiệp vụ toàn hệ thống` thành `Vai trò nghiệp vụ đang hoạt động`. Chốt hai lớp:

1. **Active role có thể chọn:** `Giảng viên`, `Sinh viên`, `Trưởng Khoa/Trưởng đơn vị`, `P.KHCN`, `Chủ tịch Hội đồng`, `Thành viên Hội đồng`, `Thư ký Hội đồng`, `Quản trị viên` — chỉ hiện nếu Tài khoản có grant tương ứng.
2. **Object relation/assignment:** `Chủ nhiệm đề tài`, `Giảng viên hướng dẫn`, Hội đồng/Cuộc họp cụ thể, đơn vị cụ thể — hiển thị badge trong nội dung và tiếp tục thu hẹp data/action của active role.

Role Hội đồng trong switcher **không** mang nghĩa truy cập mọi Hội đồng. Ví dụ active role `Thành viên Hội đồng` chỉ trả danh sách assignment của account đó. Audit nên ghi dạng: `Lan Nguyễn · Vai trò Giảng viên · tư cách Chủ nhiệm đề tài · BM08 V3`; với Phiếu thì `Dũng Trần · Vai trò Chủ tịch Hội đồng · Cuộc họp HDHS-...`.

### PERM-06 — HIGH — 18 surface chỉ có mô tả tổng quát, chưa có data/action projection theo role

`EXPERIENCE.md:28–47` liệt kê surface và state khá đầy đủ nhưng gộp reader/admin/operator vào cùng một dòng. Ví dụ cùng là `Dashboard Cuộc họp`, P.KHCN được kết thúc/công bố, Chủ tịch được nộp phiếu/ký thứ hai, Thư ký được lập Biên bản, Thành viên chỉ nộp phiếu của mình. Nếu dùng một composition chung mà chỉ disable nút, dữ liệu nền vẫn có thể lộ.

**Ma trận năng lực phải thêm vào spine**

| Năng lực/surface | GV | SV | Trưởng đơn vị | P.KHCN | Chủ tịch | Thành viên | Thư ký | Admin |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Xem Đợt đã công bố phù hợp | ✓ | ✓ | — | ✓ | — | — | — | — |
| Tạo/sửa/công bố Đợt, xem thống kê | — | — | — | ✓ | — | — | — | — |
| Tạo/sửa/nộp BM01 của mình | ✓ | ✓ | — | — | — | — | — | — |
| Duyệt BM01 sinh viên được gán | ✓ khi là GVHD | — | — | — | — | — | — | — |
| Duyệt BM01 giảng viên đúng đơn vị | — | — | ✓ | — | — | — | — | — |
| Xem/điều hành toàn bộ Đề tài | — | — | — | ✓ | — | — | — | — |
| Xem Đề tài của mình / đúng đơn vị | ✓ own/assigned | ✓ own | ✓ unit/task | ✓ all | snapshot chính thức theo assignment | snapshot chính thức theo assignment | snapshot chính thức theo assignment | — |
| Tạo/sửa Hội đồng, lời mời, mở/hủy/thay thế | — | — | — | ✓ | — | — | — | — |
| Nộp Phiếu cá nhân | — | — | — | — | ✓ own | ✓ own | — | — |
| Xem Phiếu nháp người khác | — | — | — | — | — | — | — | — |
| Theo dõi tiến độ phiếu | — | — | — | ✓ status only | ✓ | chỉ tối thiểu cần cho phiếu mình | ✓ | — |
| Lập/nộp Biên bản | — | — | — | — | — | — | ✓ đúng meeting | — |
| Trả/ký thứ hai/hoàn tất Biên bản | — | — | — | — | ✓ đúng meeting | — | — | — |
| Kết thúc Cuộc họp/công bố/điều chỉnh kết quả | — | — | — | ✓ | — | — | — | — |
| Xem kết quả trước công bố | — | — | — | ✓ | ✓ đúng meeting | — | ✓ đúng meeting | — |
| Xem kết quả sau công bố | theo quan hệ | theo quan hệ | theo quan hệ | ✓ | ✓ | ✓ | ✓ | — |
| Xử lý BM08 ở bước của mình | Chủ nhiệm | Chủ nhiệm | ký/trả đúng unit | ghi nhận nhận | — | — | — | — |
| Xử lý BM13/BM14/Hoàn tất Bước 07 | Chủ nhiệm nộp BM13/xem BM14 | tương tự nếu là Chủ nhiệm | — | kiểm tra/lưu/xác nhận | — | — | — | — |
| Duyệt role/khóa/mở/reset account | — | — | — | — | — | — | — | ✓ |

Mỗi action không có quyền phải **không render**. Disabled chỉ dùng khi actor có quyền về vai trò nhưng chưa đạt state gate; ví dụ P.KHCN thấy `Kết thúc Cuộc họp` disabled vì thiếu phiếu, còn Thành viên không được thấy action đó.

### PERM-07 — HIGH — Dashboard Cuộc họp chưa có composition riêng cho 4 role

`meeting-dashboard.html:13–17` chỉ minh họa P.KHCN. Không được tái dùng nguyên màn này cho các Hội đồng role.

**Projection bắt buộc**

- **P.KHCN:** tiến độ/count/checkpoint, trạng thái từng người (không nội dung phiếu), checklist kết thúc, hủy/thay thế, công bố/điều chỉnh. Không có CTA sửa Phiếu/Biên bản hoặc ký thay.
- **Chủ tịch:** tài liệu chính thức, Phiếu của chính mình, tiến độ, BM03/07/12 sau khi Thư ký nộp, `Trả chỉnh sửa` hoặc pipeline chữ ký thứ hai, kết quả prepublish. Không có kết thúc/công bố/hủy.
- **Thành viên:** tài liệu chính thức được phân quyền, Phiếu của chính mình, trạng thái meeting/checkpoint cần thiết. Không có danh sách nội dung/nháp người khác, Biên bản prepublish, kết quả tổng hợp prepublish, kết thúc/công bố/hủy.
- **Thư ký:** tiến độ denominator với nhãn mình không thuộc mẫu số, BM03/07/12 chỉ sau checkpoint, lịch sử trả sửa, kết quả prepublish theo nhiệm vụ. Không có Phiếu hoặc CTA nộp Phiếu, không có kết thúc/công bố/hủy.

### PERM-08 — HIGH — Thiếu hợp đồng deep-link và thay đổi quyền giữa phiên

Spine có nhắc `permission-denied`, `target-unavailable` và redirect về Việc cần làm (`EXPERIENCE.md:30–47,85`) nhưng chưa mô tả response đủ để chống lộ dữ liệu.

**Hợp đồng exact cần thêm**

1. Mọi route, search, count, preview, notification và download đều gửi active-role context và được server kiểm tra lại.
2. `401/session expired`: xóa dữ liệu nhạy cảm khỏi view/cache, hiện “Phiên đăng nhập đã hết hạn”, cho đăng nhập lại; không giữ DOM preview.
3. Account có grant nhưng active role sai: surface trung tính “Nội dung này cần Vai trò {role}”, cho `Chuyển vai trò và mở`; chưa hiển thị title, mã, trạng thái, tài liệu của object.
4. Account không có grant, assignment bị thu hồi hoặc object không tồn tại: dùng cùng một state “Không thể mở nội dung này”, không xác nhận object có tồn tại; CTA `Về Việc cần làm` và `Quay lại`.
5. Role/assignment bị thu hồi giữa phiên: đóng dialog/action, xóa count/cache của role, reload nav và đưa về queue; announce “Quyền truy cập đã thay đổi”. Không tự chuyển sang role khác để tiếp tục mutation.
6. Notification/deep link stale: recheck khi click; nếu target đã mất quyền thì dùng state chung, không giữ preview cũ.
7. Cuộc họp hủy/thay thế: chỉ actor có historical grant mới xem banner hủy và link meeting thay thế; actor khác nhận state chung.
8. File URL/download/checksum/audit link dùng cùng rule object + role + assignment + lifecycle, không suy quyền chỉ từ việc biết URL.
9. Sau đổi role: xóa filter/selection/object không còn hợp lệ; dirty form phải hỏi lưu/thoát trước đổi; audit của mutation giữ đúng role đã xác nhận tại thời điểm submit.

### PERM-09 — MEDIUM — App shell chưa thật sự ổn định trong cùng account/role

Ba trang của Lan có cùng item order, nhưng:

- `work-queue.html` dùng sidebar 230px, role-switcher hai dòng có `Khoa Công nghệ`, logo seal và chuông.
- `topic-detail.html`/`evidence-workspace.html` dùng sidebar 220px, role-switcher một dòng, không chuông, brand đổi thành tên surface.
- Trên mobile, `.side` chỉ bị `display:none`; không có drawer khả dụng như `EXPERIENCE.md:24,85` yêu cầu. Chỉ work queue có ký hiệu `☰`, hai trang còn lại không có entry point tương đương.

**Bản sửa chính xác**

Dùng một shared app-shell markup/CSS cho cùng persona: cùng brand, chiều rộng, header actions, thứ tự control, mobile menu/drawer. Trang chỉ đổi breadcrumb, `aria-current`, page content và count. Unit context nếu cần phải xuất hiện nhất quán trong role-switcher trên mọi page của role đó.

## Độ phủ màn hình còn thiếu theo vai trò

### Đang có

| Mockup | Role/context thật sự được minh họa | Vấn đề |
|---|---|---|
| `work-queue.html` | Giảng viên | Trộn task Thành viên; lộ Hội đồng; lộ metadata result |
| `topic-detail.html` | Giảng viên + relation Chủ nhiệm | Lộ nav Hội đồng; chưa có projection read-only cho role khác |
| `evidence-workspace.html` | Giảng viên + relation Chủ nhiệm, BM08 | Lộ nav Hội đồng; chỉ có bước Chủ nhiệm |
| `meeting-dashboard.html` | P.KHCN | Chưa có biến thể Chủ tịch/Thành viên/Thư ký |

### Bộ mockup tối thiểu để gọi là đủ role/surface coverage

Không nhất thiết mỗi state là một file; có thể dùng một prototype có switch state/role. Tuy nhiên mọi biến thể dưới đây phải nhìn thấy và kiểm được quyền/action.

1. `mockups/index.html` — mục lục theo role, surface và state; ghi active role rõ ràng.
2. **Public/account:** đăng nhập/khôi phục; đăng ký+xác minh; `Chờ xác nhận vai trò`/bị từ chối; tiếp nhận lời mời với sai email/hết hạn/thu hồi/đã dùng; Hồ sơ cá nhân.
3. **Giảng viên:** queue sạch theo role; Đợt list/detail; BM01; Hồ sơ/Đề tài own; BM04/BM08/BM09/BM13; yêu cầu hủy; biến thể GVHD có hàng chờ và màn Duyệt/Trả đúng hồ sơ được gán.
4. **Sinh viên:** queue; Đợt; BM01 với gate GVHD; Hồ sơ/Đề tài own; tuyến trả/nộp lại; Bước 03–07 khi là Chủ nhiệm.
5. **Trưởng Khoa/Trưởng đơn vị:** queue xét duyệt; read/PDF + Duyệt/Trả BM01 đúng đơn vị; BM08 đúng bước/version; kết quả published read-only.
6. **P.KHCN:** quản lý Đợt+thống kê; danh sách/chi tiết Đề tài toàn trường; xử lý yêu cầu hủy; BM05/BM10; kiểm tra BM09/sản phẩm và BM13; hợp đồng/BM14; checklist Hoàn tất Bước 07; setup Hội đồng/lời mời/open/cancel/replacement; dashboard/kết thúc/công bố/điều chỉnh.
7. **Chủ tịch Hội đồng:** Hội đồng được phân công; tài liệu chính thức; Phiếu cá nhân; dashboard role projection; review/return Biên bản; ký thứ hai/hoàn tất; kết quả pre/post publish.
8. **Thành viên Hội đồng:** Hội đồng được phân công; tài liệu chính thức; Phiếu cá nhân; submitted/checkpoint locked; kết quả chỉ sau publish.
9. **Thư ký Hội đồng:** Hội đồng được phân công; dashboard tách khỏi denominator; BM03/BM07/BM12 trước checkpoint/soạn/nộp/trả sửa/chờ chữ ký/complete; kết quả pre/post publish; tuyệt đối không có Phiếu.
10. **Quản trị viên:** hàng chờ role; detail đối chiếu; duyệt/từ chối; danh sách account; tạo account P.KHCN; lock/unlock/reset; trạng thái action error; không có nav nghiệp vụ NCKH.
11. **Authorization states:** wrong active role có thể switch; out-of-scope/nonexistent state chung; permission revoked giữa phiên; session expired; stale notification; historical canceled/replacement.

## File-level change map đề xuất

### `DESIGN.md`

- Sửa component `app-shell`: sidebar là projection của active role theo ma trận, không phải bộ ba mục nghiệp vụ mặc định.
- Sửa `role-switcher`: bỏ từ “toàn hệ thống”; nêu active-role grant có thể scoped; thêm badge task count theo role nhưng cấm object metadata của role khác.
- Thêm component/state cho `permission-boundary`, `role-required`, `access-revoked`.
- Khóa shared shell dimensions/brand/header actions để mockup cùng role không drift.

### `EXPERIENCE.md`

- Thay đoạn IA dòng 24–26 bằng role-nav matrix.
- Thêm `Role taxonomy & authorization context` ngay sau Foundation.
- Thêm surface/action matrix và quy tắc “hide vs disabled”.
- Tách `Dashboard Cuộc họp` thành 4 projections.
- Thêm deep-link/401/wrong-role/out-of-scope/revoked/stale contract.
- Trong UJ-5 nhấn mạnh chuyển P.KHCN ↔ Chủ tịch làm reload nav/data, không aggregate task.
- Thêm Key Flow cho Trưởng đơn vị, Quản trị viên và role-revoked/deep-link vì hiện UJ-1–7 chưa đủ để kiểm toàn bộ role shell.

### Mockup hiện có

- `work-queue.html`: bỏ `Hội đồng`; bỏ BM11; bỏ result-not-published notification; tính lại count; giữ shell Giảng viên.
- `topic-detail.html`: bỏ `Hội đồng`; giữ badge `Bạn là Chủ nhiệm đề tài`; audit ghi active role + contextual relation.
- `evidence-workspace.html`: bỏ `Hội đồng`; dùng cùng shared shell của Giảng viên.
- `meeting-dashboard.html`: giữ active role P.KHCN; đổi thành bản P.KHCN rõ ràng và không coi đây là bản dùng chung cho Hội đồng roles.
- Tạo các mockup còn thiếu theo danh mục bên trên, ưu tiên nav/queue role variants, Council 4 projections, tuyến đầu, Admin và permission boundary.

## Acceptance checklist sau khi sửa

- [ ] Active `Giảng viên` không có `Hội đồng` trong desktop sidebar, mobile drawer, search, task count hoặc notification preview.
- [ ] Account kiêm Giảng viên + Thành viên chỉ thấy BM11 sau khi chuyển sang `Thành viên Hội đồng`.
- [ ] Đổi role reload cả nav, counts, list, preview, link và filter; không giữ object trái scope.
- [ ] `Chủ nhiệm đề tài` và `GVHD` xuất hiện như contextual relation, không thay tên profile.
- [ ] Chủ tịch/Thành viên/Thư ký chỉ thấy Hội đồng được phân công; không có danh sách toàn trường.
- [ ] Thư ký không có Phiếu/CTA nộp Phiếu; Thành viên không thấy Biên bản/result trước công bố; Chủ tịch không có CTA kết thúc/công bố.
- [ ] P.KHCN có cổng vận hành nhưng không xem/sửa nội dung Phiếu nháp cá nhân.
- [ ] Admin không có Đợt/Đề tài/Hội đồng nếu không chuyển sang một role nghiệp vụ khác.
- [ ] Chủ nhiệm/GVHD/Trưởng không nhận bất kỳ result metadata nào trước công bố.
- [ ] Unauthorized và nonexistent object có cùng thông báo an toàn; download và audit link recheck quyền.
- [ ] Role/assignment revoke giữa phiên xóa cache/view và ngăn mutation.
- [ ] Cùng account/active role dùng cùng app shell; chỉ active item/page content thay đổi.
- [ ] Có mockup/variant trực quan cho mọi role và mọi action độc quyền nêu trong PRD.
