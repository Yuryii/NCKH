# 📐 TÀI LIỆU QUY CHUẨN THIẾT KẾ VÀ YÊU CẦU NỀN TẢNG (DESIGN SYSTEM & REQUIREMENTS SPECIFICATION)
### (Hệ Thống Quản Lý Đề Tài Nghiên Cứu Khoa Học DNTU — QLNCKH)

*Tệp tài liệu lưu trữ toàn bộ yêu cầu, quy tắc thiết kế, kiến trúc giao diện và định hướng planning từ đầu đến nay.*  
*Vị trí tệp:* `_bmad-output/planning-artifacts/ux-designs/ux-FullSystem/DESIGN_SYSTEM_RULES.md`

---

## 🎨 I. TRIẾT LÝ VÀ TIÊU CHUẨN THIẾT KẾ GIAO DIỆN (DESIGN SYSTEM TOKENS)

### 1. Bảng Màu Thương Hiệu DNTU Crimson Red (Từ `DESIGN.md`)
- **Primary Red (Chủ đạo):** `#AB1F24` (DNTU Red)
- **Primary Red Hover:** `#911C24` (Dark Crimson Red)
- **Primary Red Soft:** `#FBEAEC` (Nền mềm mại cho Badge & Active nav)
- **Primary Red Border:** `#F4C7CB` (Đường viền đỏ nhạt)
- **Text on Primary:** `#FFFFFF` (Chữ trắng trên nền đỏ)
- **Neutral Surface:** `#FFFFFF` (Surface chính), `#F8FAFC` (Nền trang), `#F1F5F9` (Surface hover)
- **Ink / Typography:** `#1E293B` (Headings), `#334155` (Body text), `#64748B` (Muted text)

### 2. Font Chữ Vàng & Typography
- **Google Font:** `Montserrat`, Arial, sans-serif.
- **Quy tắc Font:** 
  - `h1`: 24px (Trọng tâm Header)
  - `h2`: 20px (Tiêu đề Màn hình)
  - `h3`: 16px (Tiêu đề Card)
  - `Body`: 14px (Chữ nội dung, line-height 1.5)
  - `Small/Badge`: 12px

### 3. Quy Tắc Bắt Buộc Về Tương Tác Dữ Liệu & Giao Diện (Strict Dynamic UI Rules)

> [!IMPORTANT]
> **RULE 0 (BẮT BUỘC): MÔ PHỎNG DỮ LIỆU ĐỘNG & BIẾN ĐỔI GIAO DIỆN CHÍNH XÁC KHÔNG DÙNG BE (MIMIC REAL STORE VIA LOCALSTORAGE):**
> 1. Mọi tương tác thay đổi (Khóa/Mở tài khoản Admin, Duyệt/Trả hồ sơ Trưởng Khoa, Nộp phiếu Hội đồng, Mở/Đóng đợt P.KHCN...) BẮT BUỘC phải làm biến đổi thực tế trạng thái dữ liệu (Badge trạng thái, Nút bấm, Văn bản mô tả) ngay lập tức trên DOM.
> 2. Toàn bộ trạng thái được lưu trữ đồng nhất xuyên suốt các trang trong `localStorage` (`dntu_mock_store`).
> 3. **Nút Reset Lơ Lửng Độc Lập (`.floating-reset-btn`):** Thiết kế nút bấm hình tròn lơ lửng góc dưới bên trái màn hình (`bottom: 20px; left: 20px;`), mờ nhẹ (`opacity: 0.35`). Bấm vào để xóa cache `localStorage` và khôi phục trạng thái ban đầu bất cứ lúc nào.

> [!IMPORTANT]
> **RULE QUY CHUẨN XEM TRƯỚC PDF BIỂU MẪU (PDF PREVIEW BUTTON RULE):**
> Chỉ tạo nút "👁️ Xem Trước PDF Biểu Mẫu" ở các màn hình nhập liệu / điền form nếu trong thư mục tài liệu lưu đồ quy trình CÓ TỆP BIỂU MẪU WORD CHÍNH THỨC tương ứng (Ví dụ: BM01A, BM01B, BM01.QT.KHCN.04 đến BM05.QT.KHCN.04...). Các chức năng dạng nhập form thông thường không thuộc mẫu tệp Word chuẩn (chẳng hạn như form Đề xuất nhiệm vụ ban đầu không có tệp biểu mẫu Word trong folder tài liệu) hoặc biểu mẫu dạng thông báo thì KHÔNG tạo nút Preview PDF.

> [!IMPORTANT]
> **RULE NGUYÊN TẮC BÓC TÁCH VÀ ĐỐI SOÁT BIỂU MẪU WORD CHÍNH THỨC (STRICT OFFICIAL WORD FORM AUDIT RULE FOR ALL MODULES):**
> Khi triển khai xây dựng form nhập liệu và render PDF preview cho các Phân hệ còn lại (Phân hệ 3, Phân hệ 4, Phân hệ 5...):
> 1. **BẮT BUỘC ĐỌC VÀ BÓC TÁCH TRỰC TIẾP TỆP WORD MẪU (`.doc`, `.docx`):** Phải bóc tách trực tiếp (hoặc dùng engine Word COM / PowerShell) 100% nguyên văn từng mục La Mã lớn (I, II, III, IV...), từng bảng biểu, từng cột, từng chi tiết nhỏ (như phân mục 3.1, 3.2, 3.3 chi phí, các số hiệu mục 1, 2, 3, 5, 6...) từ thư mục tài liệu quy trình `docs/`.
> 2. **KHÔNG TỰ Ý SUY DIỄN THÊM HOẶC BỎ BỚT TRƯỜNG:** Giao diện nhập form HTML và engine render PDF preview (`shared/common.js`) phải tái hiện chính xác 1:1 theo bản tệp Word chính thức.
> 3. **BẢO ĐẢM ĐÚNG VỊ TRÍ BẢNG CHỮ KÝ:** Vị trí các bên ký (Ví dụ: Chủ nhiệm đề tài ký BÊN TRÁI, Tổ chức chủ trì ký BÊN PHẢI trong `BM01.QT.KHCN.04`; hoặc Trưởng đơn vị ký BÊN TRÁI, Chủ nhiệm ký BÊN PHẢI trong `BM01A`...) phải tuân thủ đúng 100% vị trí bảng chữ ký trong tệp Word mẫu tương ứng.

> [!NOTE]
> **RULE QUY CHUẨN THÔNG BÁO VÀ HOVER POPOVER BRIDGE:**
> 1. **Khung Vuông Bo Góc Nút Chuông Header:** Biểu tượng chuông `🔔` trên App Header thiết kế dạng khung vuông bo góc (`width: 38px; height: 38px; border-radius: 6px;`).
> 2. **Popover Dropdown & Invisible Hover Bridge (`::before`):** Hover/Rê chuột vào chuông sẽ hiển thị Popover chứa 5 thông báo mới nhất. Thu hẹp khoảng cách top (42px) và trang bị lớp cầu đệm ẩn `::before` giúp con trỏ rê chuột từ nút chuông vào Popover mượt mà, không bị đóng đột ngột.
> 3. **Điều Hướng Trang Thông Báo Chính Xác:** Bấm nút chuông hoặc liên kết trong popover sẽ điều hướng về trang Thông báo riêng của Cổng vai trò đó (dùng chung logic tính đường dẫn như Role Switcher Bar).
> 4. **Trang Thông Báo Riêng Từng Actor (`thong-bao.html`):** Tất cả các Cổng vai trò đều có mục menu `🔔 Thông Báo Hệ Thống` trên Sidebar.

> [!NOTE]
> **RULE 2.2 (BẮT BUỘC): CHUẨN THIẾT KẾ TRANG HỒ SƠ CÁ NHÂN / LÝ LỊCH KHOA HỌC CHO TOÀN BỘ ACTORS:**
> 1. Tất cả các vai trò (Giảng viên, Sinh viên, P.KHCN, Trưởng Khoa, Chủ tịch HĐ, Thư ký HĐ, Ủy viên, Admin) đều phải có trang Hồ sơ cá nhân / Thông tin tài khoản được thiết kế sinh động.
> 2. Có khung **Avatar nổi bật**, nhãn Học hàm/Học vị/Mã số, thẻ chỉ số công bố khoa học, và các Tab/Nhóm thông tin định danh, bảo mật rõ ràng.

---

## 🏗️ II. THIẾT KẾ BỐ CỤC KHUNG NỀN TẢNG (APP SHELL LAYOUT)

```text
+-----------------------------------------------------------------------------------+
|  [DNTU Logo] TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐỒNG NAI         🔔[3]      [User / Role]   |  <- Top Header (64px)
+-----------------------------------------------------------------------------------+
|  🎭 Đóng vai Actor: [P.KHCN] [Giảng viên] [Sinh viên] [Trưởng Khoa] [Chủ tịch HĐ]  |  <- Role Switcher Bar
+-------------------+---------------------------------------------------------------+
| ◀ [Toggle Button] |                                                               |
|   SIDEBAR MENU    |                  MAIN WORKSPACE CONTAINER                     |
|                   |                                                               |
| • Cổng Vai Trò 1  |  • Page Header (Tiêu đề & Nút bấm chính)                      |
| • Cổng Vai Trò 2  |  • Metric Cards / Bảng điều hành                              |
| • 🔔 Thông Báo    |  • Interactive Form / Data Table                              |
| • 👤 Hồ Sơ        |  • Action Buttons & PDF Preview (Dành riêng cho biểu mẫu Word)|
|                   |                                                               |
| (Co dãn 260px     |                                                               |
|  xuống 68px)      |                                                               |
+-------------------+---------------------------------------------------------------+
| 🔄 Floating Reset | Bản quyền © 2026 Trường Đại học Công nghệ Đồng Nai — QLNCKH.  |  <- Footer & Floating Reset
+-----------------------------------------------------------------------------------+
```

---

## 📐 III. QUY TRÌNH CHUẨN XÂY DỰNG CÁC PHÂN HỆ TIẾP THEO (PHÂN HỆ 3, 4, 5...)

Khi triển khai bất kỳ Phân hệ nào còn lại trong hệ thống QLNCKH DNTU, BẮT BUỘC tuân thủ 100% quy trình 5 bước mẫu đã thiết lập thành công ở Phân hệ 1 và Phân hệ 2:

1. **Bước 1: Phân Tích Sâu Tài Liệu FRS & Bóc Tách Biểu Mẫu Word (`docs/`)**:
   - **Nghiên cứu Nghiệp vụ & Yêu cầu Chức năng (FRS Document)**: Đọc sâu toàn bộ tài liệu FRS (`docs/FRS-Document/`), bóc tách danh sách các mã chức năng (FR-1, FR-2...), luồng xử lý chi tiết của từng Actor, các điều kiện rẽ nhánh, trạng thái hồ sơ và trường hợp ngoại lệ.
   - **Bóc tách 100% Biểu mẫu Word**: Sử dụng script tự động (Word COM / PowerShell) đọc trực tiếp nguyên văn các file biểu mẫu Word (`.doc`, `.docx`) trong thư mục `docs/`. Trích xuất chính xác 100% từng tiêu đề, từng mục La Mã lớn (I, II, III, IV...), bảng biểu, chi phí phân mục 3.1/3.2/3.3 và vị trí bảng chữ ký.

2. **Bước 2: Cấu Trúc Thư Mục Theo 8 Cổng Vai Trò (Actor Portals)**:
   - Mọi phân hệ mới đều được chia thành các thư mục con vai trò tương ứng: `giang-vien/`, `p-khcn/`, `truong-don-vi/`, `chu-tich-hoi-dong/`, `thanh-vien-hoi-dong/`, `thu-ky-hoi-dong/`, `sinh-vien/`, `quan-tri-vien/`.
   - Tất cả các trang HTML thuộc phân hệ phải dùng chung thanh chuyển đổi nhanh vai trò `Role Switcher Bar` (`role-switcher.js`) và thanh công cụ tiện ích `shared/common.js`.

3. **Bước 3: Tạo Trang Sơ Đồ Luồng Quy Trình Trực Quan (`quy-trinh-m0X.html`)**:
   - Mỗi phân hệ đều phải có 01 trang Sơ đồ luồng (`quy-trinh-m0X.html`) mô phỏng trực quan từng bước quy trình từ đầu đến cuối và gắn liên kết trực tiếp tới từng màn hình tương ứng ở các Cổng vai trò.

4. **Bước 4: Thiết Kế Giao Diện & Form Điền Chuẩn 100% Bản Mẫu Word & Đi Sâu Nghiệp Vụ FRS**:
   - Đi sâu vào toàn bộ chức năng, nghiệp vụ được liệt kê trong FRS cho từng Actor.
   - BẮT BUỘC **Đóng vai người dùng (User Empathy Testing)** trực tiếp tương tác với từng màn hình để xem giao diện có dễ dùng, đúng workflow và liền mạch giữa các vai trò hay không.
   - Tất cả các form nhập liệu phải tuân thủ đúng tên trường và số mục theo bản mẫu Word gốc.
   - Nút **"👁️ Xem Trước PDF Biểu Mẫu"** CHỈ xuất hiện khi có tệp biểu mẫu Word chuẩn tương ứng trong thư mục tài liệu quy trình.

5. **Bước 5: Cập Nhật Index Landing Hub (`index.html`) & Screen Atlas (`full-system-screen-atlas.html`)**:
   - Bổ sung phân hệ mới vào Ma trận phân quyền và Bảng danh mục màn hình tập trung trên `index.html` và `full-system-screen-atlas.html` để phục vụ việc kiểm thử 1-click tức thì.

---

*Tài liệu quy chuẩn thiết kế này được tạo lập và lưu trữ làm căn cứ đối chiếu kĩ thuật bất biến trong suốt quá trình xây dựng toàn bộ 5 phân hệ hệ thống QLNCKH DNTU.*
