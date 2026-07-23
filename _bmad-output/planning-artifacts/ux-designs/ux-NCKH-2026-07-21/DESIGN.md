---
name: NCKH
description: Hệ thống trực quan đỏ–trắng, task-first cho nền tảng quản lý hoạt động nghiên cứu khoa học cấp trường.
status: draft
sources:
  - ../../prds/prd-NCKH-2026-07-20/prd.md
  - imports/dntu-visual-reference.md
updated: 2026-07-23
colors:
  brand-primary: '#AB1F24'
  brand-primary-hover: '#911C24'
  brand-primary-soft: '#FBEAEC'
  on-brand: '#FFFFFF'
  surface-base: '#FFFFFF'
  surface-subtle: '#F6F6F6'
  surface-raised: '#FFFFFF'
  ink-heading: '#262626'
  ink-body: '#4E5054'
  ink-muted: '#66686B'
  ink-disabled: '#9A9A9A'
  border-default: '#D9D9D9'
  border-strong: '#8A8C90'
  control-border: '#76787C'
  focus-ring: '#2457C5'
  info: '#2457C5'
  info-soft: '#EAF0FF'
  success: '#247A3C'
  success-soft: '#EAF6ED'
  warning: '#8A5A00'
  warning-soft: '#FFF4D6'
  danger: '#B42318'
  danger-soft: '#FDECEA'
  overlay: '#000000'
typography:
  display:
    fontFamily: 'Montserrat, Arial, sans-serif'
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.25'
    letterSpacing: -0.01em
  heading-lg:
    fontFamily: 'Montserrat, Arial, sans-serif'
    fontSize: 22px
    fontWeight: '700'
    lineHeight: '1.35'
  heading-md:
    fontFamily: 'Montserrat, Arial, sans-serif'
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.4'
  body:
    fontFamily: 'Montserrat, Arial, sans-serif'
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.55'
  body-strong:
    fontFamily: 'Montserrat, Arial, sans-serif'
    fontSize: 15px
    fontWeight: '600'
    lineHeight: '1.5'
  label:
    fontFamily: 'Montserrat, Arial, sans-serif'
    fontSize: 13px
    fontWeight: '600'
    lineHeight: '1.4'
  meta:
    fontFamily: 'Montserrat, Arial, sans-serif'
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.45'
rounded:
  sm: 3px
  md: 6px
  lg: 8px
  full: 9999px
spacing:
  '1': 4px
  '2': 8px
  '3': 12px
  '4': 16px
  '5': 20px
  '6': 24px
  '8': 32px
  '10': 40px
  '12': 48px
  page-mobile: 16px
  page-tablet: 24px
  page-desktop: 32px
components:
  app-shell:
    background: '{colors.surface-subtle}'
    header-background: '{colors.brand-primary}'
    header-foreground: '{colors.on-brand}'
    content-max-width: 1440px
  role-switcher:
    background: '{colors.surface-base}'
    foreground: '{colors.ink-heading}'
    border: '{colors.control-border}'
    active-marker: '{colors.brand-primary}'
    radius: '{rounded.sm}'
  task-card:
    background: '{colors.surface-raised}'
    foreground: '{colors.ink-heading}'
    border: '{colors.control-border}'
    priority-marker: '{colors.brand-primary}'
    radius: '{rounded.md}'
  status-badge:
    radius: '{rounded.full}'
    foreground: '{colors.ink-heading}'
    neutral-background: '{colors.surface-subtle}'
    border: '{colors.border-strong}'
  data-table:
    background: '{colors.surface-base}'
    header-background: '{colors.surface-subtle}'
    border: '{colors.control-border}'
    radius: '{rounded.md}'
  step-timeline:
    line: '{colors.border-strong}'
    active: '{colors.brand-primary}'
    complete: '{colors.success}'
    future: '{colors.ink-muted}'
  checklist-gate:
    background: '{colors.surface-subtle}'
    ready: '{colors.success}'
    blocked: '{colors.danger}'
    border: '{colors.border-default}'
    radius: '{rounded.md}'
  form-section:
    background: '{colors.surface-base}'
    border: '{colors.border-default}'
    radius: '{rounded.md}'
    error: '{colors.danger}'
    focus: '{colors.focus-ring}'
  repeatable-fieldset:
    background: '{colors.surface-subtle}'
    border: '{colors.border-default}'
    radius: '{rounded.sm}'
  file-evidence-panel:
    background: '{colors.surface-base}'
    border: '{colors.control-border}'
    current-marker: '{colors.success}'
    invalid-marker: '{colors.danger}'
    radius: '{rounded.md}'
  version-list:
    background: '{colors.surface-base}'
    divider: '{colors.border-default}'
    current-marker: '{colors.success}'
    superseded-marker: '{colors.ink-muted}'
  document-viewer:
    canvas: '{colors.surface-subtle}'
    toolbar: '{colors.surface-base}'
    border: '{colors.control-border}'
    radius: '{rounded.md}'
  action-bar:
    background: '{colors.surface-base}'
    border: '{colors.control-border}'
    primary: '{colors.brand-primary}'
    primary-hover: '{colors.brand-primary-hover}'
    on-primary: '{colors.on-brand}'
  decision-dialog:
    background: '{colors.surface-base}'
    foreground: '{colors.ink-heading}'
    danger: '{colors.danger}'
    radius: '{rounded.lg}'
  notification-item:
    background: '{colors.surface-base}'
    unread-background: '{colors.brand-primary-soft}'
    divider: '{colors.border-default}'
  progress-meter:
    track: '{colors.border-default}'
    fill: '{colors.brand-primary}'
    complete: '{colors.success}'
  invitation-panel:
    background: '{colors.surface-base}'
    border: '{colors.control-border}'
    pending: '{colors.warning}'
    accepted: '{colors.success}'
    radius: '{rounded.md}'
  audit-timeline:
    line: '{colors.border-default}'
    marker: '{colors.brand-primary}'
    meta: '{colors.ink-muted}'
  account-state-panel:
    background: '{colors.surface-base}'
    pending-background: '{colors.warning-soft}'
    locked-background: '{colors.danger-soft}'
    radius: '{rounded.md}'
  empty-state:
    foreground: '{colors.ink-muted}'
    action: '{colors.brand-primary}'
  feedback-message:
    info-background: '{colors.info-soft}'
    success-background: '{colors.success-soft}'
    warning-background: '{colors.warning-soft}'
    danger-background: '{colors.danger-soft}'
    radius: '{rounded.sm}'
---

# NCKH — Design Spine

## Brand & Style

NCKH là một công cụ nghiệp vụ đáng tin cậy: rõ trạng thái, rõ trách nhiệm và rõ bằng chứng. Nhận diện đỏ–trắng kế thừa tinh thần DNTU nhưng không sao chép bố cục marketing. Đỏ dùng để định hướng hành động và nhận diện; phần lớn không gian làm việc giữ trắng, xám sáng và chữ đậm để người dùng quét bảng, biểu mẫu, timeline và tài liệu dài.

Ngôn ngữ thị giác là **task-first, institutional, evidence-first**. Góc tương đối sắc, đường viền rõ, phân cấp gọn. Không trang trí bằng banner lớn, ảnh nền hay dải đỏ dày trong vùng tác nghiệp. [Tham chiếu thị giác DNTU](imports/dntu-visual-reference.md) minh họa nguồn màu và kiểu chữ; hai spine này thắng khi có xung đột với mọi import hoặc mockup.

[ASSUMPTION] MVP chỉ có giao diện sáng. Không tạo dark mode hoặc biến thể thương hiệu theo vai trò.

## Colors

- `{colors.brand-primary}` là đỏ nhận diện và dành cho hành động chính, mục điều hướng đang chọn, mốc tiến trình hiện tại và liên kết trọng yếu. Không dùng làm nền cho vùng dữ liệu lớn.
- `{colors.brand-primary-hover}` là trạng thái hover/pressed; `{colors.brand-primary-soft}` chỉ làm nền nhấn nhẹ cho thông báo chưa đọc hoặc vùng liên quan thương hiệu.
- `{colors.surface-base}`, `{colors.surface-subtle}`, `{colors.surface-raised}` tạo ba lớp phẳng. Thứ bậc đến từ khoảng cách, viền và kiểu chữ; không dựa vào bóng đổ dày.
- `{colors.ink-heading}` dùng cho tiêu đề; `{colors.ink-body}` cho nội dung; `{colors.ink-muted}` chỉ cho metadata. Không dùng `{colors.ink-muted}` cho thông tin quyết định hoặc hướng dẫn khắc phục.
- `{colors.info}`, `{colors.success}`, `{colors.warning}`, `{colors.danger}` mang ý nghĩa hệ thống. Mọi lần dùng phải kèm nhãn hoặc biểu tượng có tên truy cập; màu không bao giờ là tín hiệu duy nhất.
- `{colors.focus-ring}` cố ý khác đỏ thương hiệu để focus bàn phím dễ nhận ra.

Tổ hợp chịu tải phải đạt WCAG 2.2 AA: chữ thường tối thiểu 4.5:1, chữ lớn 3:1, focus và ranh giới control tối thiểu 3:1 với nền kề. `{colors.control-border}` dành cho input, button outline, uploader, tab và toolbar cần nhận biết; `{colors.border-default}` chỉ là divider/trang trí không cần tự mang nghĩa. Chữ trắng chỉ đặt trên `{colors.brand-primary}`, `{colors.brand-primary-hover}` hoặc màu trạng thái đã được kiểm tra tương phản. Không đặt chữ trắng trên nền đỏ nhạt.

| Cặp token chịu tải | Mục tiêu |
|---|---|
| `{colors.ink-body}` / `{colors.surface-base}` | ≥ 4.5:1 |
| `{colors.ink-muted}` / `{colors.surface-base}` hoặc `{colors.surface-subtle}` | ≥ 4.5:1 |
| `{colors.on-brand}` / `{colors.brand-primary}` hoặc `{colors.brand-primary-hover}` | ≥ 4.5:1 |
| `{colors.control-border}` / `{colors.surface-base}` | ≥ 3:1 |
| `{colors.focus-ring}` / mọi nền kề | ≥ 3:1 |

## Typography

Montserrat là kiểu chữ duy nhất của giao diện, với Arial/sans-serif dự phòng. Điều này giữ liên hệ DNTU nhưng tránh đưa Canela Trial vào bề mặt nhiều dữ liệu.

- `{typography.display}` chỉ cho tiêu đề trang cấp cao; mỗi bề mặt tối đa một display.
- `{typography.heading-lg}` và `{typography.heading-md}` chia vùng, panel và bước nghiệp vụ.
- `{typography.body}` là mặc định cho bảng, form và hướng dẫn; `{typography.body-strong}` dành cho giá trị cần quét nhanh.
- `{typography.label}` dùng cho nhãn trường, cột và hành động; `{typography.meta}` cho thời điểm, mã phiên bản và actor.

Không dùng chữ in hoa toàn bộ cho câu dài. Mã biểu mẫu như BM01/BM03 được giữ nguyên; nhãn nghiệp vụ dùng đúng chính tả và viết hoa của PRD.

## Layout & Spacing

Thang 4px trong `spacing` là chuẩn. Khoảng cách trong control dùng `{spacing.2}`–`{spacing.3}`; giữa nhóm trường dùng `{spacing.4}`–`{spacing.6}`; giữa vùng lớn dùng `{spacing.8}`–`{spacing.12}`.

Desktop dùng app shell với header và sidebar, vùng nội dung tối đa 1440px. Trang danh sách ưu tiên bảng toàn chiều rộng; trang đọc–duyệt dùng master-detail hoặc hai cột với tài liệu ở trái, quyết định ở phải. Form dài là một cột chính với mục lục bước; không chia các trường liên quan sang nhiều cột chỉ để tiết kiệm chiều cao.

Các composition đã chốt qua mockup dùng primitive hiện có, không tạo thêm hệ card riêng:

- **Việc cần làm:** dải chỉ số tóm tắt là các card trắng viền `{colors.border-default}`, số dùng cấp heading và nhãn dùng `{typography.label}`/`{typography.meta}`; toolbar tìm kiếm–lọc nằm ngay trước danh sách. Desktop đặt task stack rộng hơn panel “Đang chờ người khác”; mobile xếp một cột.
- **Chi tiết Đề tài:** callout “Hành động tiếp theo” dùng nền `{colors.brand-primary-soft}` và marker trái `{colors.brand-primary}`, sau đó là timeline và danh sách tài liệu hiện hành; checklist/audit nằm ở cột phụ trên desktop và xuống dưới trên màn hình hẹp.
- **Dashboard Cuộc họp:** progress và cổng kết thúc tạo hàng tổng quan đầu tiên; bảng mẫu số dùng toàn chiều rộng; chuỗi cổng bất biến là các ô viền phẳng, bước hiện tại dùng viền đỏ/nền đỏ nhạt và bước đã đạt dùng success-soft.
- **Tạo Hồ sơ BM01:** Sinh viên và Giảng viên dùng cùng composition một trang, preview PDF, checklist và action bar. BM01B Sinh viên đặt khu chọn Giảng viên hướng dẫn trước khu PDF. BM01A Giảng viên bỏ toàn bộ picker/gate GVHD, nêu rõ tuyến Trưởng đơn vị; khi bị trả sửa, giữ V1 bất biến và CTA mở form để nộp V2 trên cùng Hồ sơ. Nút `Xem trước PDF` mở dialog gần toàn viewport: canvas xám và trang A4 trắng bên trái, form trắng có vùng cuộn riêng bên phải; mobile xếp thành một cột. Các workspace bằng chứng khác vẫn dùng cột nội dung + điều kiện/phiên bản khi nghiệp vụ cho phép.
- **Xét hồ sơ Giảng viên:** là mục sidebar riêng, không nằm trong danh sách Đề tài. Bề mặt đọc snapshot BM01B V1, đặt hướng dẫn `tải → ký ngoài hệ thống → tải PDF đã ký` trước action bar; nút Duyệt disabled đến khi PDF hợp lệ được tải lại. `Trả hồ sơ` là action destructive riêng, mở dialog lý do bắt buộc và không yêu cầu PDF ký; sau một quyết định, action bar và badge hàng chờ đồng thời cập nhật/khóa.

[ASSUMPTION] Lề lần lượt là `{spacing.page-desktop}` ở ≥1024px, `{spacing.page-tablet}` ở 768–1023px và `{spacing.page-mobile}` dưới 768px. Action bar quan trọng bám đáy viewport nhưng không che nội dung hoặc focus.

## Elevation & Depth

Độ sâu chủ yếu bằng tonal layering và viền. `surface-raised` trên `surface-subtle` là card/panel chuẩn. Bóng nhẹ chỉ cho dropdown, popover, drawer và dialog nổi; bảng, task card và form section không dùng bóng để phân cấp. Overlay dialog dùng `{colors.overlay}` ở độ mờ vừa đủ nhưng vẫn để người dùng nhận biết ngữ cảnh phía sau.

## Shapes

`{rounded.sm}` (3px) giữ tinh thần sắc của tham chiếu; dùng cho input, badge có viền và thông báo. `{rounded.md}` (6px) cho card, bảng, panel tài liệu và button. `{rounded.lg}` (8px) chỉ cho dialog/drawer lớn. `{rounded.full}` chỉ dùng cho status badge nhỏ; không dùng pill cho button chính hoặc vùng chứa.

## Components

[ASSUMPTION] NCKH kế thừa primitive của **shadcn/ui + Radix Primitives** cho Button, Input, Checkbox, RadioGroup, Select, Dialog, Drawer/Sheet, Popover, DropdownMenu, Tabs, Tooltip, Table và Skeleton. Các primitive này giữ semantics, keyboard pattern và focus management mặc định; bảng dưới chỉ định lớp nhận diện và delta nghiệp vụ NCKH. Nếu kiến trúc thay thư viện, hệ thống thay thế phải giữ nguyên hợp đồng này.

Composition thực tế hiện được tập trung trong [Bộ vai trò](mockups/index.html), [Atlas màn hình theo 8 vai trò](mockups/role-screen-atlas.html), hai suite song sinh [Sinh viên](mockups/sinh-vien/01-danh-sach-de-tai.html) và [Giảng viên](mockups/giang-vien/01-danh-sach-de-tai.html) dùng cùng visual system nhưng asset tách riêng, cùng sáu bộ actor vận hành dùng `shared/actor.css` + `shared/actor.js`: [Trưởng đơn vị](mockups/truong-don-vi/01-viec-can-lam.html), [P.KHCN](mockups/p-khcn/01-viec-can-lam.html), [Chủ tịch](mockups/chu-tich-hoi-dong/01-viec-can-lam.html), [Thành viên](mockups/thanh-vien-hoi-dong/01-viec-can-lam.html), [Thư ký](mockups/thu-ky-hoi-dong/01-viec-can-lam.html) và [Quản trị viên](mockups/quan-tri-vien/01-viec-can-lam.html). Token và quy tắc trong spine này thắng khi có xung đột; generator clone suite Giảng viên từ Sinh viên và validator kiểm tra drift/quyền/nhánh/gate.

| Component | Visual spec |
|---|---|
| **app-shell** | Header `{components.app-shell.header-background}` cao gọn. Bên phải tách bộ chuyển vai trò, thông báo và menu tài khoản. Sidebar trắng/xám nhạt dùng các group label `Công việc`, `Nghiệp vụ`, `Tài khoản`/`Quản trị` khi group có ít nhất một mục được phép; active item có vạch đỏ và chữ đậm. Tập mục là phép chiếu theo vai trò trong `EXPERIENCE.md`, không phải menu dùng chung. Trong cùng vai trò, vị trí/padding/nhãn không đổi giữa trang; mục ngoài quyền không render. |
| **role-switcher** | Control viền `{components.role-switcher.border}` với tiền tố “Vai trò:”, tên vai trò đang hoạt động và ngữ cảnh phạm vi trên hai dòng khi cần. Một vai trò thì là nhãn tĩnh không có mũi tên; nhiều vai trò mới là menu. Không hiển thị quan hệ theo đối tượng như “Chủ nhiệm đề tài”, không chứa avatar hoặc tên tài khoản. Quan hệ theo đối tượng dùng contextual badge trong nội dung bề mặt. |
| **task-card** | Nền trắng, viền mảnh, marker đỏ 3px ở cạnh trái cho việc cần làm; tiêu đề, hạn, đối tượng và hành động kế tiếp tạo bốn tầng quét. |
| **status-badge** | Badge pill nhỏ có nhãn và icon tùy chọn. Neutral dùng nền xám; info/success/warning/danger dùng cặp màu mềm tương ứng, không dùng fill bão hòa cho cả badge. |
| **data-table** | Header xám sáng, border-row mảnh, cell tối thiểu một dòng rõ. Cột trạng thái dùng status-badge; cột hành động cố định ở cuối. Hover chỉ bổ trợ, không là affordance duy nhất. |
| **step-timeline** | Trục mảnh; bước hiện tại đỏ, hoàn tất xanh, tương lai xám. Mỗi mốc luôn có số/tên/trạng thái và actor kế tiếp, không chỉ có chấm màu. |
| **checklist-gate** | Panel xám sáng với từng điều kiện có icon + nhãn + giải thích. Header nêu “Sẵn sàng” hoặc “Còn N điều kiện”; mục chặn dùng chữ danger trên nền trắng, không phủ đỏ toàn panel. |
| **form-section** | Card trắng, heading-md, mô tả ngắn và nhóm trường theo chiều dọc. Focus ring `{components.form-section.focus}` 2px; lỗi có viền/label danger và thông báo cạnh trường. |
| **advisor-picker** | Trạng thái rỗng dùng nền `{colors.surface-subtle}` và viền dashed; selected dùng notice info với tên đậm, đơn vị ở dòng hai và nút `Thay đổi` outline. Dialog rộng tối đa khoảng 640px; từng dòng Giảng viên nền nhạt, viền mảnh, nút `+` vuông 38px dùng `{colors.brand-primary}` và accessible name đầy đủ. |
| **repeatable-fieldset** | Khối con nền xám nhạt, tiêu đề hàng “Thành viên N” hoặc tên nhóm; nút xóa ở góc cuối, reorder handle chỉ xuất hiện khi thật sự hỗ trợ sắp xếp. |
| **file-evidence-panel** | Với BM01, panel gọn đặt ngay dưới Giảng viên hướng dẫn: hai nút outline `Xem trước PDF` và `Tải PDF BM01B`, input chọn một PDF đã ký, tên/dung lượng tệp và notice “nộp một lần”. Sau tạo, panel chuyển read-only và không hiện xóa/thay thế/version-list. Nếu bị từ chối ký, giữ tên/dung lượng/người nộp/thời điểm và nhãn `Bản bất biến`; Hồ sơ thay thế không dùng version-list và không sao chép tệp này. Các pipeline khác giữ anatomy đầy đủ: loại tài liệu, tên tệp, phiên bản, checksum/trạng thái xử lý, người tải, thời điểm và trạng thái hiệu lực. |
| **rejection-feedback-card** | Nền danger-soft, viền danger, actor và thời điểm ở đầu, badge `Không ký duyệt`, lý do bắt buộc và vùng warning nêu nội dung cần hoàn thiện. Card luôn đứng trước PDF; không biến phản hồi thành trường editable trên Hồ sơ đã khóa. |
| **version-list** | Danh sách dọc với divider, mã phiên bản và quan hệ “thay thế Vx”. Bản hiện hành ở đầu; bản cũ không bị làm mờ đến mức khó đọc. |
| **document-viewer** | Canvas xám nhạt bao PDF trắng; toolbar trắng có zoom, trang, tải xuống và mở toàn màn hình. Metadata phiên bản luôn hiện sát viewer. |
| **action-bar** | Thanh trắng có top border. Hành động chính fill đỏ; hành động phụ outline/ghost; destructive tách khỏi nhóm chính và dùng danger. Action bar BM01 trước khi tạo chỉ có `Quay lại` + `Nộp PDF & tạo Hồ sơ`; `Xem trước PDF` nằm trong file-evidence-panel, không phải action bar hoặc tab. Tuyệt đối không hiện `Lưu nháp`, `Tiếp tục` hoặc tab phiên bản. Trạng thái disabled luôn kèm lý do gần control. |
| **decision-dialog** | Tiêu đề mô tả hệ quả, tóm tắt đối tượng/phiên bản, vùng lý do khi bắt buộc, nút xác nhận dùng đỏ thương hiệu hoặc danger đúng nghĩa. Không dùng dialog chỉ có “Có/Không”. |
| **notification-item** | Dòng thông báo có icon loại sự kiện, nội dung, đối tượng và thời điểm. Chưa đọc có nền đỏ nhạt + marker chữ; đã đọc nền trắng. Chuông header dùng icon nét có tên truy cập, badge số chưa đọc ở góc trên; popover nền trắng hiển thị tối đa ba mục gần nhất và liên kết đỏ `Xem tất cả thông báo`. |
| **progress-meter** | Thanh tiến độ kèm tỷ lệ dạng “4/5 Phiếu đánh giá hợp lệ”; khi đủ chuyển xanh và vẫn giữ số. Không dùng vòng tròn trang trí. |
| **invitation-panel** | Card email + Hội đồng + Vai trò + hạn/ trạng thái. Pending dùng warning có nhãn; accepted dùng success. Hành động gửi lại/thu hồi nằm cuối và không cạnh nút chính mở Cuộc họp. |
| **audit-timeline** | Trục dọc mảnh, mỗi sự kiện có động từ, actor, Vai trò nghiệp vụ, thời điểm, trạng thái trước/sau và phiên bản. Lý do nằm trong khối quote nhẹ. |
| **account-state-panel** | Trạng thái xác minh/vai trò/tài khoản theo từng hàng; pending và locked có nền mềm, nhãn rõ, không dùng banner đỏ toàn trang trừ lỗi chặn truy cập. |
| **empty-state** | Icon line đơn giản, heading-md, một câu giải thích và tối đa một hành động chính. Không dùng minh họa lớn hoặc câu chúc mừng. |
| **feedback-message** | Bốn biến thể info/success/warning/danger dùng nền mềm, icon + tiêu đề + nội dung khắc phục. Lỗi tổng hợp form có liên kết focus tới trường tương ứng. Lịch sử phản hồi dùng danh sách dọc mới nhất trước, phân tách từng phiên bản, actor, vai trò và thời điểm; không dồn nhiều vòng phản hồi vào một banner. |

## Do's and Don'ts

| Do | Don't |
|---|---|
| Dùng đỏ cho nhận diện, active state và hành động chính | Phủ đỏ lên dashboard, bảng hoặc vùng tài liệu lớn |
| Hiển thị trạng thái cùng actor kế tiếp và hành động khắc phục | Chỉ đặt một badge trạng thái không có ngữ cảnh |
| Phân biệt dữ liệu form, PDF xuất, PDF đã ký, bản đã nộp và bản hiện hành | Dùng một icon “tệp” cho mọi loại bằng chứng |
| Giữ layout dày vừa đủ, đường viền rõ và typography nhất quán | Sao chép banner, carousel hoặc bố cục tin tức của website DNTU |
| Dùng checklist trước hành động tạo mốc hoặc hệ quả lớn | Để người dùng bấm rồi mới báo thiếu điều kiện |
| Kèm chữ/icon cho mọi màu trạng thái | Truyền đạt đạt/chưa đạt chỉ bằng đỏ và xanh |
| Gạch chân liên kết nằm trong đoạn văn; dùng focus ring rõ cho mọi link | Phân biệt link với chữ thường chỉ bằng màu đỏ |
| Chỉ dùng `{colors.ink-disabled}` cho affordance disabled; lý do bị chặn vẫn dùng màu chữ đạt chuẩn | Làm mờ lý do bị chặn hoặc thông tin cần đọc bằng màu disabled |
| Giữ mọi phiên bản đọc được, đánh dấu hiệu lực rõ | Làm mờ hoặc ẩn bản cũ đến mức mất khả năng truy vết |
| Một primary action rõ trên mỗi vùng quyết định | Đặt nhiều nút đỏ cạnh nhau với trọng lượng như nhau |
