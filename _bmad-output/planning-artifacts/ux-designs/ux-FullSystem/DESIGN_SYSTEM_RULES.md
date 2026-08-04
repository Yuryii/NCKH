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
| • 👤 Hồ Sơ        |  • Action Buttons & PDF Preview                               |
|                   |                                                               |
| (Co dãn 260px     |                                                               |
|  xuống 68px)      |                                                               |
+-------------------+---------------------------------------------------------------+
| 🔄 Floating Reset | Bản quyền © 2026 Trường Đại học Công nghệ Đồng Nai — QLNCKH.  |  <- Footer & Floating Reset
+-----------------------------------------------------------------------------------+
```

---

*Tài liệu quy chuẩn thiết kế này được tạo lập và lưu trữ làm căn cứ đối chiếu kĩ thuật bất biến trong suốt quá trình xây dựng toàn bộ 5 phân hệ hệ thống QLNCKH DNTU.*
