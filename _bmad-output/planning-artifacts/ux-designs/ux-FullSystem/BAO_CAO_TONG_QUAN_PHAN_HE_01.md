# 📊 BÁO CÁO TỔNG QUAN XÂY DỰNG GIAO DIỆN PHÂN HỆ 1
### (Phân Hệ Quản Lý Đề Tài Nghiên Cứu Khoa Học Cấp Trường - DNTU QLNCKH)

*Ngày lập báo cáo: 04/08/2026*  
*Đơn vị thực hiện: Đội ngũ BMad Agents (Mary - BA, Sally - UX, Winston - Architect, Amelia - Dev)*

---

## 📁 I. KIẾN TRÚC CẤU TRÚC THƯ MỤC THEO VAI TRÒ (ACTOR FOLDER TREE)

Toàn bộ giao diện của Phân hệ 1 đã được rà soát và tích hợp **Engine Biến Đổi Dữ Liệu Động Xuyên Suốt 8 Cổng Vai Trò (Rule 0)** đặt tại `ux-FullSystem/modules/module-01-de-tai-cap-truong/`:

```text
ux-FullSystem/
├── index.html                                        (Landing Hub trung tâm)
├── full-system-screen-atlas.html                     (Atlas Màn hình & Ma trận RBAC 8 Actors)
├── BAO_CAO_TONG_QUAN_PHAN_HE_01.md                   (Báo cáo tổng quan nghiệm thu Phân hệ 1)
├── DESIGN_SYSTEM_RULES.md                            (Tài liệu Yêu cầu & Quy chuẩn thiết kế hệ thống)
├── shared/                                           (Bộ CSS/JS Nền tảng dùng chung - KHÔNG Inline CSS)
│   ├── theme.css                                     (Tokens màu đỏ DNTU #AB1F24, Avatar Card, Badges)
│   ├── layout.css                                    (App Shell, Bell Dropdown & Floating Reset Btn)
│   ├── role-switcher.js                              (Engine đổi vai trò & Điều hướng Cổng phân vùng)
│   └── common.js                                     (Toast, Modal, 100% Word Forms & LocalStorage Store)
└── modules/
    └── module-01-de-tai-cap-truong/
        ├── m01.css & m01.js                          (Reactive Store Engine cho 8 Cổng vai trò Phân hệ 1)
        ├── giang-vien/                               (CỔNG GIẢNG VIÊN - 6 Màn hình)
        │   ├── 01-danh-sach-de-tai.html               (Bảng render động từ LocalStorage)
        │   ├── 02-lap-bm01a.html                     (Form 100% tệp Word & Submit biến đổi dữ liệu)
        │   ├── 03-xet-duyet-sinh-vien.html           (GVHD chấp nhận hướng dẫn BM01B)
        │   ├── 04-ho-so-ca-nhan.html                  (Trang Profile Avatar & Lý lịch khoa học - Rule 2.2)
        │   ├── 05-dot-dang-ky.html                   (Trang theo dõi chi tiết Đợt NCKH mở)
        │   └── 06-thong-bao.html                     (Trang Thông Báo Hệ Thống Giảng viên)
        ├── p-khcn/                                   (CỔNG PHÒNG KHCN - 6 Màn hình)
        │   ├── 01-p-khcn-dashboard.html              (Metrics số liệu tính toán động)
        │   ├── 02-quan-ly-dot-dang-ky.html           (Công bố đợt mới lưu LocalStorage)
        │   ├── 03-thiet-lap-hoi-dong.html
        │   ├── 04-ket-thuc-cong-bo-ket-qua.html       (Ban hành Quyết định BM04 biến đổi DOM)
        │   ├── 05-audit-nghiep-vu.html               (Nhật ký Audit Admin toàn hệ thống)
        │   └── 06-thong-bao.html                     (Trang Thông Báo Vận Hành P.KHCN)
        ├── truong-don-vi/                            (CỔNG TRƯỜNG KHOA / ĐƠN VỊ - 4 Màn hình)
        │   ├── 01-viec-can-lam.html                  (Bảng việc cần làm render động)
        │   ├── 02-duyet-bm01.html                    (Trưởng Khoa duyệt/trả BM01A biến đổi trạng thái)
        │   ├── 03-xac-nhan-bm08.html                 (Ký xác nhận Báo cáo tiến độ BM08)
        │   └── 04-thong-bao.html                     (Trang Thông Báo Nghiệp Vụ Khoa)
        ├── chu-tich-hoi-dong/                         (CỔNG CHỦ TỊCH HỘI ĐỒNG - 4 Màn hình)
        │   ├── 01-cuoc-hop-danh-sach.html            (Tiến độ nộp phiếu 5/5)
        │   ├── 02-cham-phieu-bm02.html                (Chấm điểm BM02 nộp mốc chốt 100%)
        │   ├── 03-ky-duyet-bm03.html                 (Duyệt ký thứ 2 hoàn tất BM03)
        │   └── 04-thong-bao.html                     (Trang Thông Báo Chủ Tịch HĐ)
        ├── thanh-vien-hoi-dong/                       (CỔNG THÀNH VIÊN / ỦY VIÊN HĐ - 3 Màn hình)
        │   ├── 01-cuoc-hop-danh-sach.html
        │   ├── 02-cham-phieu-bm02.html                (Chấm điểm BM02 100% trường form Word)
        │   └── 03-thong-bao.html                     (Trang Thông Báo Ủy Viên HĐ)
        ├── thu-ky-hoi-dong/                           (CỔNG THƯ KÝ HỘI ĐỒNG - 3 Màn hình)
        │   ├── 01-lap-bien-ban.html                  (Thư ký ký thứ nhất BM03)
        │   ├── 02-theo-doi-chu-tich-ky.html
        │   └── 03-thong-bao.html                     (Trang Thông Báo Thư Ký HĐ)
        ├── sinh-vien/                                (CỔNG SINH VIÊN NCKH - 4 Màn hình)
        │   ├── 01-danh-sach-de-tai.html               (Danh sách đề tài SV render động)
        │   ├── 02-lap-bm01b.html                     (Submit BM01B gán GVHD lưu LocalStorage)
        │   ├── 03-ho-so-ca-nhan.html                  (Trang Profile Avatar Sinh viên - Rule 2.2)
        │   └── 04-thong-bao.html                     (Trang Thông Báo Tiến Độ Sinh Viên)
        └── quan-tri-vien/                            (CỔNG QUẢN TRỊ VIÊN ADMIN - 4 Màn hình)
            ├── 01-quan-ly-tai-khoan.html             (Phê duyệt vai trò tài khoản mới động)
            ├── 02-khoa-mo-tai-khoan.html             (Mô phỏng Khóa/Mở TK biến đổi DOM tức thì - Rule 0)
            ├── 03-audit-nghiep-vu.html               (Nhật ký Audit Admin toàn hệ thống)
            └── 04-thong-bao.html                     (Trang Thông Báo Bảo Mật Admin)
```

---

## 🖥️ II. TỔNG KẾT RÀ SOÁT LOGIC DỮ LIỆU ĐỘNG (RULE 0 MUTATION SUMMARY)

| Vai Trò | Thao Tác Tương Tác Trên UI | Biến Đổi Trạng Thái Dữ Liệu Trong LocalStorage (`dntu_mock_store`) | Cập Nhật Giao Diện & Thông Báo |
| :--- | :--- | :--- | :--- |
| **Giảng viên** | Nộp Thuyết minh BM01A | Thêm hồ sơ mới `HS-2026-NCKH-...` vào `store.proposals`, status `CHƯA_DUYỆT_KHOA`. | Tự động re-render bảng đề tài, gửi thông báo cho Trưởng Khoa và lưu Audit log. |
| **Sinh viên** | Nộp Thuyết minh BM01B | Thêm hồ sơ `HS-2026-NCKH-SV-...`, status `CHỜ_GVHD_DUYỆT`. | Gửi thông báo cho GVHD được gán và hiển thị trên Cổng Sinh viên. |
| **GVHD** | Chấp nhận hướng dẫn SV | Chuyển status từ `CHỜ_GVHD_DUYỆT` ➔ `CHƯA_DUYỆT_KHOA`. | Cập nhật badge trạng thái và gửi thông báo cho Sinh viên. |
| **Trưởng Khoa** | Thẩm định & Duyệt BM01A | Chuyển status ➔ `KHOA_ĐÃ_DUYỆT` (hoặc `KHOA_YÊU_CẦU_SỬA`). | Chuyển hồ sơ vào danh sách tiếp nhận của P.KHCN và gửi thông báo cho GV. |
| **Hội đồng** | Nộp phiếu chấm BM02 | Ghi nhận vote cá nhân, kiểm tra mốc 100% phiếu (5/5 phiếu). | Tự động kích hoạt thông báo cho Thư ký HĐ lập Biên bản BM03. |
| **Thư ký HĐ** | Ký thứ 1 trên BM03 | Cập nhật `bm03Status = 'THƯ_KÝ_ĐÃ_KÝ'`. | Gửi thông báo trình ký thứ 2 cho Chủ tịch HĐ. |
| **Chủ tịch HĐ** | Duyệt ký thứ 2 trên BM03 | Cập nhật `bm03Status = 'ĐỦ_2_CHỮ_KÝ'`. | Gửi thông báo cho P.KHCN ra Quyết định ban hành BM04. |
| **P.KHCN** | Ra Quyết định BM04 | Chuyển status ➔ `ĐÃ_RA_QUYẾT_ĐỊNH_BM04`. | Đóng chu trình xét duyệt đợt và phát hành thông báo chính thức. |
| **Admin** | Duyệt vai trò / Khóa tài khoản | Mutate `user.status` ('ACTIVE' / 'LOCKED') & `verified = true`. | Re-render bảng tài khoản ngay lập tức mà không làm trôi dữ liệu audit. |

---

*Báo cáo tổng quan nghiệm thu rà soát logic dữ liệu động Phân hệ 1 được lưu trữ tại `_bmad-output/planning-artifacts/ux-designs/ux-FullSystem/BAO_CAO_TONG_QUAN_PHAN_HE_01.md`.*
