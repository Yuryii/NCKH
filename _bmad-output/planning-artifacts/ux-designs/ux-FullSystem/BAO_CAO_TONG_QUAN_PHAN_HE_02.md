# 📊 BÁO CÁO TỔNG QUAN XÂY DỰNG GIAO DIỆN PHÂN HỆ 2
### (Phân Hệ Quản Lý Đề Tài / Dự Án NCKH Cấp Tỉnh, Bộ, Nhà Nước & Hợp Tác Doanh Nghiệp / Quốc Tế - DNTU QLNCKH)

*Ngày lập báo cáo: 06/08/2026*  
*Đơn vị thực hiện: Đội ngũ BMad Agents (Mary - BA, Sally - UX, Winston - Architect, Amelia - Dev)*

---

## 📁 I. KIẾN TRÚC CẤU TRÚC THƯ MỤC THEO VAI TRÒ PHÂN HỆ 2

Toàn bộ giao diện của Phân hệ 2 đã được triển khai hoàn chỉnh tại thư mục `ux-FullSystem/modules/module-02-de-tai-cap-tinh-bo-nha-nuoc/`:

```text
ux-FullSystem/
├── index.html                                        (Landing Hub trung tâm)
├── full-system-screen-atlas.html                     (Atlas Màn hình & Ma trận RBAC Phân hệ 1 & Phân hệ 2)
├── BAO_CAO_TONG_QUAN_PHAN_HE_02.md                   (Báo cáo tổng quan nghiệm thu Phân hệ 2)
├── shared/                                           (Bộ CSS/JS Nền tảng dùng chung - KHÔNG Inline CSS)
│   ├── theme.css                                     (Tokens màu đỏ DNTU #AB1F24, Badges, Avatar)
│   ├── layout.css                                    (App Shell, Bell Dropdown & Floating Reset Btn)
│   ├── role-switcher.js                              (Engine đổi vai trò & Điều hướng Cổng Phân hệ 1 & 2)
│   └── common.js                                     (Toast, Modal, 100% Word Forms PDF Renderer)
└── modules/
    └── module-02-de-tai-cap-tinh-bo-nha-nuoc/
        ├── m02.css & m02.js                          (Reactive Store Engine cho 8 Cổng vai trò Phân hệ 2)
        ├── giang-vien/                               (CỔNG GIẢNG VIÊN - 6 Màn hình)
        │   ├── 01-danh-sach-de-tai.html               (Bảng render động dự án Cấp Tỉnh/Bộ/NN)
        │   ├── 02-lap-ho-so-de-xuat.html              (Đề xuất nhiệm vụ ngoài trường mới)
        │   ├── 03-bao-cao-tien-do-bm01.html           (Báo cáo tiến độ chuẩn Word BM01.QT.KHCN.04)
        │   ├── 04-de-nghi-nghiem-thu-bm02.html        (Phiếu đề nghị nghiệm thu chuẩn Word BM02.QT.KHCN.04)
        │   ├── 05-ho-so-ca-nhan.html                  (Trang Profile Avatar Năng lực chủ nhiệm - Rule 2.2)
        │   └── 06-thong-bao.html                     (Trang Thông Báo Dự Án Phân hệ 2)
        ├── p-khcn/                                   (CỔNG PHÒNG KHCN - 7 Màn hình)
        │   ├── 01-p-khcn-dashboard.html              (Metrics thống kê kinh phí ngoài trường tính động)
        │   ├── 02-quan-ly-danh-muc-de-tai.html       (Danh mục dự án & Hợp đồng giao khoán)
        │   ├── 03-thanh-lap-hoi-dong-bm03.html       (Quyết định thành lập HĐ chuẩn Word BM03.QT.KHCN.04)
        │   ├── 04-bien-ban-nghiem-thu-bm04.html       (Theo dõi 2 chữ ký pháp lý Biên bản BM04)
        │   ├── 05-thanh-ly-chung-nhan-bm05.html       (Cấp Chứng nhận & Thanh lý Hợp đồng BM05.QT.KHCN.04)
        │   ├── 06-thong-bao.html                     (Thông Báo Vận Hành P.KHCN Phân hệ 2)
        │   └── 07-audit-nghiep-vu.html               (Nhật ký Audit Trail Phân hệ 2)
        ├── truong-don-vi/                            (CỔNG TRƯỜNG KHOA / ĐƠN VỊ - 4 Màn hình)
        │   ├── 01-viec-can-lam.html                  (Bảng việc cần làm thẩm định cấp Khoa)
        │   ├── 02-duyet-de-xuat.html                  (Duyệt đề xuất nhiệm vụ ngoài trường mới)
        │   ├── 03-xac-nhan-bao-cao-bm01.html         (Ký xác nhận Báo cáo tiến độ BM01 cấp đơn vị)
        │   └── 04-thong-bao.html                     (Thông Báo Đơn Vị Phân hệ 2)
        ├── chu-tich-hoi-dong/                         (CỔNG CHỦ TỊCH HỘI ĐỒNG NGHIỆM THU - 4 Màn hình)
        │   ├── 01-cuoc-hop-danh-sach.html            (Danh sách Cuộc họp nghiệm thu cấp cơ sở)
        │   ├── 02-cham-phieu-nghiem-thu.html         (Chấm phiếu nghiệm thu cá nhân)
        │   ├── 03-ky-duyet-bien-ban-bm04.html         (Duyệt ký thứ 2 hoàn tất Biên bản BM04)
        │   └── 04-thong-bao.html                     (Thông Báo Chủ Tịch HĐ Phân hệ 2)
        ├── thanh-vien-hoi-dong/                       (CỔNG THÀNH VIÊN / ỦY VIÊN PHẢN BIỆN HĐ - 3 Màn hình)
        │   ├── 01-cuoc-hop-danh-sach.html            (Danh sách cuộc họp phân công phản biện 1)
        │   ├── 02-cham-phieu-nghiem-thu.html         (Chấm phiếu phản biện độc lập)
        │   └── 03-thong-bao.html                     (Thông Báo Ủy Viên HĐ Phân hệ 2)
        ├── thu-ky-hoi-dong/                           (CỔNG THƯ KÝ HỘI ĐỒNG NGHIỆM THU - 3 Màn hình)
        │   ├── 01-lap-bien-ban-bm04.html              (Lập & Ký thứ 1 Biên bản BM04.QT.KHCN.04)
        │   ├── 02-theo-doi-chu-tich-ky.html           (Theo dõi Chủ tịch HĐ ký thứ 2)
        │   └── 03-thong-bao.html                     (Thông Báo Thư Ký HĐ Phân hệ 2)
        ├── sinh-vien/                                (CỔNG SINH VIÊN PHỐI HỢP - 3 Màn hình)
        │   ├── 01-danh-sach-de-tai.html               (Danh sách dự án ngoài trường sinh viên tham gia)
        │   ├── 02-ho-so-ca-nhan.html                  (Profile Avatar Sinh viên NCKH - Rule 2.2)
        │   └── 03-thong-bao.html                     (Thông Báo Sinh Viên Phân hệ 2)
        └── quan-tri-vien/                            (CỔNG QUẢN TRỊ VIÊN ADMIN - 4 Màn hình)
            ├── 01-quan-ly-tai-khoan.html             (Cấp quyền tài khoản chuyên gia ngoài trường)
            ├── 02-khoa-mo-tai-khoan.html             (Mô phỏng Khóa/Mở TK biến đổi DOM - Rule 0)
            ├── 03-audit-nghiep-vu.html               (Nhật ký Audit Admin Phân hệ 2)
            └── 04-thong-bao.html                     (Thông Báo Admin Phân hệ 2)
```

---

## 📑 II. DANH MỤC BIỂU MẪU CHUẨN WORD DNTU ĐÃ ĐƯỢC TÍCH HỢP 100%

1. **BM01.QT.KHCN.04**: Báo cáo tình hình thực hiện đề tài NCKH Cấp Tỉnh, Bộ, Nhà nước (Báo cáo tiến độ khối lượng công việc, tình hình giải ngân kinh phí cấp/đã chi và đề xuất đợt tiếp theo).
2. **BM02.QT.KHCN.04**: Phiếu đề nghị nghiệm thu cấp cơ sở (Kèm danh sách đề xuất 5 thành viên Hội đồng nghiệm thu cấp cơ sở tại DNTU).
3. **BM03.QT.KHCN.04**: Quyết định thành lập Hội đồng nghiệm thu cấp cơ sở đề tài NCKH Cấp Tỉnh, Bộ, Nhà nước.
4. **BM04.QT.KHCN.04**: Biên bản cuộc họp Hội đồng nghiệm thu cấp cơ sở (Tổng hợp điểm chấm 5/5 phiếu thành viên, xếp loại ĐẠT XUẤT SẮC & 2 chữ ký số pháp lý Thư ký HĐ + Chủ tịch HĐ).
5. **BM05.QT.KHCN.04**: Giấy chứng nhận nghiệm thu cấp cơ sở & Thanh lý Hợp đồng KHCN ngoài trường.

---

*Báo cáo tổng quan nghiệm thu Phân hệ 2 được lưu trữ tại `_bmad-output/planning-artifacts/ux-designs/ux-FullSystem/BAO_CAO_TONG_QUAN_PHAN_HE_02.md`.*
