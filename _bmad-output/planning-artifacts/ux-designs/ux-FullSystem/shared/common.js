/**
 * DNTU QLNCKH - COMMON UTILITIES, REACTIVE MOCK STORE & OFFICIAL FORM PDF ENGINE
 * Client-side Modal, Toast, Official DNTU Forms Renderer, LocalStorage Reactive Store Engine, Floating Reset & Notification Dropdown
 */

(function () {
  'use strict';

  // Seed Data for LocalStorage Reactive Mock Engine (Module 01)
  const SEED_DATA = {
    users: [
      { id: 'u1', name: 'TS. Trần Thị B', email: 'tranthib@dntu.edu.vn', code: 'GV0892', role: 'giang-vien', roleTitle: 'Giảng viên (Khoa CNTT)', status: 'ACTIVE', verified: true },
      { id: 'u2', name: 'Nguyễn Văn A', email: 'nguyenvana@dntu.edu.vn', code: 'KHCN01', role: 'p-khcn', roleTitle: 'Chuyên viên P.KHCN', status: 'ACTIVE', verified: true },
      { id: 'u3', name: 'Lê Văn C', email: 'levanc@dntu.edu.vn', code: 'SV22001234', role: 'sinh-vien', roleTitle: 'Sinh viên (Lớp 22DTH1)', status: 'ACTIVE', verified: true },
      { id: 'u4', name: 'PGS.TS. Phạm Văn D', email: 'phamvand@dntu.edu.vn', code: 'GV0112', role: 'truong-don-vi', roleTitle: 'Trưởng Khoa CNTT', status: 'ACTIVE', verified: true },
      { id: 'u5', name: 'GS.TS. Hoàng Văn E', email: 'hoangvane@dntu.edu.vn', code: 'GV0011', role: 'chu-tich-hoi-dong', roleTitle: 'Chủ tịch HĐ Khoa học', status: 'ACTIVE', verified: true },
      { id: 'u6', name: 'ThS. Vũ Thị G', email: 'vuthig@dntu.edu.vn', code: 'KHCN05', role: 'thu-ky-hoi-dong', roleTitle: 'Thư ký HĐ Khoa học', status: 'ACTIVE', verified: true },
      { id: 'u7', name: 'Nguyễn Văn X', email: 'nguyenvanx@dntu.edu.vn', code: 'GV0912', role: 'giang-vien', roleTitle: 'Giảng viên Khoa Điện', status: 'PENDING_ROLE', verified: false },
      { id: 'u8', name: 'Phạm Thị Y', email: 'phamthiy@dntu.edu.vn', code: 'SV22008899', role: 'sinh-vien', roleTitle: 'Sinh viên Khoa Kế toán', status: 'PENDING_ROLE', verified: false }
    ],
    periods: [
      { id: 'PER-2026-01', title: 'Đợt 1 - Đăng ký Đề tài NCKH Năm 2026', type: 'Cả Giảng viên và Sinh viên', startDate: '2026-08-01', endDate: '2026-08-30', status: 'OPEN', quota: 15, submittedCount: 12 },
      { id: 'PER-2026-02', title: 'Đợt 2 - Đề tài Trọng điểm & Cải tiến Năm 2026', type: 'Chỉ Đề tài Giảng viên', startDate: '2026-10-01', endDate: '2026-10-31', status: 'DRAFT', quota: 10, submittedCount: 0 }
    ],
    proposals: [
      { id: 'HS-2026-NCKH-001', title: 'Nghiên cứu ứng dụng Trí tuệ Nhân tạo trong phân loại nông sản tỉnh Đồng Nai', author: 'TS. Trần Thị B', type: 'Giảng viên', unit: 'Khoa CNTT', budget: 35000000, periodId: 'PER-2026-01', status: 'CHƯA_DUYỆT_KHOA', submittedDate: '2026-08-01' },
      { id: 'HS-2026-NCKH-002', title: 'Xây dựng ứng dụng di động hỗ trợ sinh viên DNTU đăng ký NCKH', author: 'Lê Văn C (SV)', advisor: 'TS. Trần Thị B', type: 'Sinh viên', unit: 'Khoa CNTT', budget: 15000000, periodId: 'PER-2026-01', status: 'CHỜ_GVHD_DUYỆT', submittedDate: '2026-08-02' }
    ],
    notifications: [
      { id: 'n1', targetRole: 'giang-vien', title: 'Đợt 1 NCKH 2026 Đang Mở', message: 'Phòng KHCN đã công bố Đợt 1 tiếp nhận hồ sơ BM01A đến hết ngày 30/08/2026.', time: '10 phút trước', read: false },
      { id: 'n2', targetRole: 'p-khcn', title: 'Hồ sơ mới cần lập Hội đồng', message: 'Hồ sơ HS-2026-NCKH-001 đã qua duyệt Khoa CNTT, sẵn sàng lập Hội đồng.', time: '1 giờ trước', read: false },
      { id: 'n3', targetRole: 'truong-don-vi', title: 'Hồ sơ BM01A chờ Trưởng Khoa duyệt', message: 'TS. Trần Thị B vừa nộp hồ sơ đăng ký mới cần duyệt tuyến đầu.', time: '2 giờ trước', read: false },
      { id: 'n4', targetRole: 'chu-tich-hoi-dong', title: 'Phân công Chủ tịch Hội đồng HD-2026-CNTT-01', message: 'P.KHCN đã phân công bạn làm Chủ tịch Hội đồng xét duyệt hồ sơ đợt 1.', time: '3 giờ trước', read: false },
      { id: 'n5', targetRole: 'quan-tri-vien', title: 'Tài khoản mới chờ duyệt vai trò', message: 'Có 2 tài khoản mới đăng ký bằng email DNTU đang chờ Admin phê duyệt.', time: '4 giờ trước', read: false }
    ],
    auditLogs: [
      { id: 'a1', timestamp: '2026-08-04 21:10', actor: 'Admin System', role: 'Quản trị viên', action: 'Phê duyệt vai trò Giảng viên', target: 'tranthib@dntu.edu.vn', detail: 'Xác minh email DNTU và mã GV0892' },
      { id: 'a2', timestamp: '2026-08-04 20:15', actor: 'Nguyễn Văn A', role: 'P.KHCN', action: 'Công bố kết quả Hội đồng', target: 'HS-2026-NCKH-001', detail: 'Hoàn tất mốc chốt 100% phiếu BM02' }
    ]
  };

  // LocalStorage Mock Engine Manager
  function getMockStore() {
    const raw = localStorage.getItem('dntu_mock_store');
    if (!raw) {
      localStorage.setItem('dntu_mock_store', JSON.stringify(SEED_DATA));
      return JSON.parse(JSON.stringify(SEED_DATA));
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      localStorage.setItem('dntu_mock_store', JSON.stringify(SEED_DATA));
      return JSON.parse(JSON.stringify(SEED_DATA));
    }
  }

  function saveMockStore(store) {
    localStorage.setItem('dntu_mock_store', JSON.stringify(store));
  }

  function resetMockStore() {
    localStorage.setItem('dntu_mock_store', JSON.stringify(SEED_DATA));
    if (localStorage.getItem('dntu_mock_store_m02')) {
      localStorage.removeItem('dntu_mock_store_m02');
    }
    showToast('Đã khôi phục dữ liệu hệ thống mẫu về ban đầu!', 'success');
    setTimeout(() => { window.location.reload(); }, 600);
  }

  // Toast Notification System
  function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = 'position: fixed; bottom: 24px; right: 24px; z-index: 9999; display: flex; flex-direction: column; gap: 8px;';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const bg = type === 'success' ? '#166534' : type === 'error' ? '#991B1B' : type === 'warning' ? '#854D0E' : '#1E40AF';
    toast.style.cssText = `background: ${bg}; color: #ffffff; padding: 12px 20px; border-radius: 8px; font-size: 13px; font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.15); opacity: 0; transition: opacity 0.3s;`;
    toast.textContent = message;

    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '1'; }, 10);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => { toast.remove(); }, 300);
    }, 3500);
  }

  // Dynamic Modal Dialog Manager
  function openModal(title, bodyHtml, actionsHtml = '') {
    let overlay = document.getElementById('global-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'global-modal-overlay';
      overlay.style.cssText = 'position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 9000; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s;';
      overlay.innerHTML = `
        <div class="card" style="width: 100%; max-width: 900px; max-height: 94vh; display: flex; flex-direction: column; background: #fff; margin: 16px; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2);">
          <div class="card-header" style="background: #F8FAFC; margin: 0; padding: 16px 24px; border-bottom: 1px solid #E2E8F0;">
            <h3 id="modal-title-text" style="font-size: 16px; font-weight: 700; color: #1E293B;">Modal Title</h3>
            <button type="button" class="btn btn-secondary btn-sm" id="modal-close-btn" style="padding: 2px 8px;">&times;</button>
          </div>
          <div id="modal-body-content" style="overflow-y: auto; flex: 1; padding: 24px; background: #F8FAFC;"></div>
          <div id="modal-actions-content" class="flex justify-end gap-2" style="background: #F8FAFC; padding: 16px 24px; border-top: 1px solid #E2E8F0;"></div>
        </div>
      `;
      document.body.appendChild(overlay);

      overlay.querySelector('#modal-close-btn').addEventListener('click', closeModal);
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal();
      });
    }

    document.getElementById('modal-title-text').textContent = title;
    document.getElementById('modal-body-content').innerHTML = bodyHtml;
    document.getElementById('modal-actions-content').innerHTML = actionsHtml || `<button type="button" class="btn btn-secondary" onclick="DNTUCommon.closeModal()">Đóng Window</button>`;

    overlay.style.display = 'flex';
    setTimeout(() => { overlay.style.opacity = '1'; }, 10);
  }

  function closeModal() {
    const overlay = document.getElementById('global-modal-overlay');
    if (overlay) {
      overlay.style.opacity = '0';
      setTimeout(() => { overlay.style.display = 'none'; }, 200);
    }
  }

  // 100% ACCURATE DNTU WORD FORM RENDERER ENGINE (MODULE 01 & MODULE 02 EXACT SPECS)
  function getOfficialFormHTML(formCode, title, data = {}) {
    const code = (formCode || 'BM01A').toUpperCase();
    const currentDate = new Date().toLocaleDateString('vi-VN');
    let bodyInner = '';

    // ==================== MODULE 01 FORMS (BM01A, BM01B, BM02, BM03, BM04A, BM08, BM14) ====================
    if (code.includes('BM01.A') || code === 'BM01A') {
      bodyInner = `
        <div style="text-align: center; margin-bottom: 16px;">
          <table style="width: 100%; border: none; font-size: 12px; font-weight: bold; margin-bottom: 10px;">
            <tr>
              <td style="text-align: center; width: 45%;">TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐỒNG NAI<br><span style="color: #AB1F24;">KHOA CÔNG NGHỆ THÔNG TIN</span></td>
              <td style="text-align: center; width: 55%;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br>Độc lập - Tự do - Hạnh phúc<br><span style="font-weight: normal; font-size: 11px; font-style: italic;">Đồng Nai, ngày ${currentDate}</span></td>
            </tr>
          </table>
          <h2 style="font-size: 15px; color: #AB1F24; margin: 12px 0 2px 0; text-transform: uppercase;">PHIẾU ĐĂNG KÝ ĐỀ TÀI NGHIÊN CỨU KHOA HỌC CẤP TRƯỜNG</h2>
          <p style="font-size: 11px; font-style: italic; color: #64748B; margin-top: 2px;">(Áp dụng đối với đề tài NCKH giảng viên — Mẫu BM01.A.QT.KHCN.02)</p>
        </div>

        <div style="font-size: 13px; line-height: 1.6;">
          <p style="margin: 3px 0;"><strong>Tên đề tài:</strong> ${data.title || 'Nghiên cứu ứng dụng Trí tuệ Nhân tạo trong phân loại nông sản tỉnh Đồng Nai'}</p>
          <p style="margin: 3px 0;"><strong>Lĩnh vực nghiên cứu:</strong> Kỹ thuật và Công nghệ</p>
          <p style="margin: 3px 0;"><strong>Chủ nhiệm đề tài:</strong> ${data.author || 'TS. Trần Thị B'} | <strong>Đơn vị:</strong> Khoa CNTT</p>
          <p style="margin: 3px 0;"><strong>Điện thoại liên hệ:</strong> 0912 345 678 | <strong>Email:</strong> tranthib@dntu.edu.vn</p>
          <p style="margin: 3px 0;"><strong>Tầm quan trọng/tác động đến sự phát triển của Nhà trường:</strong> Thúc đẩy công bố quốc tế và nâng cao năng lực ứng dụng AI DNTU.</p>
          <p style="margin: 3px 0;"><strong>Mục tiêu nghiên cứu:</strong></p>
          <p style="margin: 2px 0; padding-left: 12px;">5.1. Mục tiêu tổng quát: Xây dựng hệ thống phân loại nông sản tự động đạt độ chính xác >95%.</p>
          <p style="margin: 2px 0; padding-left: 12px;">5.2. Mục tiêu cụ thể: Thu thập 10,000 hình ảnh và huấn luyện mô hình YOLOv8.</p>
          <p style="margin: 3px 0;"><strong>Sản phẩm yêu cầu dự kiến:</strong> 01 Bài báo VSTEP/Scopus + 01 Phần mềm thử nghiệm.</p>
          <p style="margin: 3px 0;"><strong>Kiến nghị nội dung thực hiện:</strong> Trang bị 01 Máy chủ GPU hỗ trợ huấn luyện mô hình.</p>
          <p style="margin: 3px 0;"><strong>Thời gian thực hiện:</strong> 12 Tháng (Từ 01/08/2026 đến 31/07/2027)</p>
          <p style="margin: 3px 0;"><strong>9. Chi phí dự kiến:</strong> ${data.budget || '35.000.000'} VNĐ</p>
          <p style="margin: 3px 0;"><strong>10. Dự kiến đơn vị/địa chỉ ứng dụng:</strong> Sở Nông nghiệp & PTNT tỉnh Đồng Nai</p>
          <p style="margin: 3px 0;"><strong>11. Hiệu quả mang lại:</strong> Tăng năng suất phân loại nông sản và giảm 40% chi phí nhân công.</p>

          <div style="display: flex; justify-content: space-between; margin-top: 36px; text-align: center;">
            <div style="width: 45%;">
              <p style="font-weight: bold; margin-bottom: 2px;">TRƯỜNG ĐƠN VỊ</p>
              <p style="font-size: 11px; font-style: italic; margin-top: 0;">(Ký tên và ghi rõ họ tên)</p>
              <div style="margin-top: 36px; font-weight: bold; color: #166534;">✓ PGS.TS. Phạm Văn D (Đã duyệt)</div>
            </div>
            <div style="width: 45%;">
              <p style="font-weight: bold; margin-bottom: 2px;">CHỦ NHIỆM ĐỀ TÀI</p>
              <p style="font-size: 11px; font-style: italic; margin-top: 0;">(Ký tên và ghi rõ họ tên)</p>
              <div style="margin-top: 36px; font-weight: bold; color: #166534;">✓ TS. Trần Thị B (Đã ký)</div>
            </div>
          </div>
        </div>
      `;
    } else if (code.includes('BM01.B') || code === 'BM01B') {
      bodyInner = `
        <div style="text-align: center; margin-bottom: 16px;">
          <table style="width: 100%; border: none; font-size: 12px; font-weight: bold; margin-bottom: 10px;">
            <tr>
              <td style="text-align: center; width: 45%;">TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐỒNG NAI<br><span style="color: #AB1F24;">KHOA CÔNG NGHỆ THÔNG TIN</span></td>
              <td style="text-align: center; width: 55%;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br>Độc lập - Tự do - Hạnh phúc<br><span style="font-weight: normal; font-size: 11px; font-style: italic;">Đồng Nai, ngày ${currentDate}</span></td>
            </tr>
          </table>
          <h2 style="font-size: 15px; color: #AB1F24; margin: 12px 0 2px 0; text-transform: uppercase;">PHIẾU ĐĂNG KÝ ĐỀ TÀI NGHIÊN CỨU KHOA HỌC CẤP TRƯỜNG</h2>
          <p style="font-size: 11px; font-style: italic; color: #64748B; margin-top: 2px;">(Áp dụng đối với đề tài NCKH sinh viên — Mẫu BM01.B.QT.KHCN.02)</p>
        </div>

        <div style="font-size: 13px; line-height: 1.6;">
          <p style="margin: 3px 0;"><strong>Tên đề tài:</strong> ${data.title || 'Xây dựng ứng dụng di động hỗ trợ sinh viên DNTU đăng ký NCKH'}</p>
          <p style="margin: 3px 0;"><strong>Lĩnh vực nghiên cứu:</strong> Công nghệ Thông tin</p>
          <p style="margin: 3px 0;"><strong>Chủ nhiệm đề tài (Sinh viên):</strong> Lê Văn C (Lớp 22DTH1 - MSSV: 22001234)</p>
          <p style="margin: 3px 0;"><strong>Giảng viên hướng dẫn:</strong> TS. Trần Thị B (Khoa CNTT)</p>
          <p style="margin: 3px 0;"><strong>Sản phẩm dự kiến:</strong> App Flutter chạy trên Android & iOS + Báo cáo tổng kết.</p>
          <p style="margin: 3px 0;"><strong>10. Chi phí dự kiến:</strong> ${data.budget || '15.000.000'} VNĐ</p>

          <div style="display: flex; justify-content: space-between; margin-top: 36px; text-align: center;">
            <div style="width: 45%;">
              <p style="font-weight: bold; margin-bottom: 2px;">GIẢNG VIÊN HƯỚNG DẪN</p>
              <p style="font-size: 11px; font-style: italic; margin-top: 0;">(Ký tên và ghi rõ họ tên)</p>
              <div style="margin-top: 36px; font-weight: bold; color: #166534;">✓ TS. Trần Thị B (Đã duyệt)</div>
            </div>
            <div style="width: 45%;">
              <p style="font-weight: bold; margin-bottom: 2px;">CHỦ NHIỆM ĐỀ TÀI (SINH VIÊN)</p>
              <p style="font-size: 11px; font-style: italic; margin-top: 0;">(Ký tên và ghi rõ họ tên)</p>
              <div style="margin-top: 36px; font-weight: bold; color: #166534;">✓ Lê Văn C (Đã ký)</div>
            </div>
          </div>
        </div>
      `;
    } else if (code.includes('BM02.QT.KHCN.02') || code === 'BM02_M01') {
      bodyInner = `
        <div style="text-align: center; margin-bottom: 16px;">
          <table style="width: 100%; border: none; font-size: 12px; font-weight: bold; margin-bottom: 10px;">
            <tr>
              <td style="text-align: center; width: 45%;">BỘ GIÁO DỤC VÀ ĐÀO TẠO<br><span style="color: #AB1F24;">TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐỒNG NAI</span></td>
              <td style="text-align: center; width: 55%;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br>Độc lập - Tự do - Hạnh phúc<br><span style="font-weight: normal; font-size: 11px; font-style: italic;">Đồng Nai, ngày ${currentDate}</span></td>
            </tr>
          </table>
          <h2 style="font-size: 15px; color: #AB1F24; margin: 12px 0 2px 0; text-transform: uppercase;">PHIẾU XÉT DUYỆT ĐỀ XUẤT ĐỀ TÀI CẤP TRƯỜNG</h2>
          <p style="font-size: 11px; font-style: italic; color: #64748B; margin-top: 2px;">(Mẫu BM02.QT.KHCN.02 — Dành cho Thành viên Hội đồng xét duyệt)</p>
        </div>

        <div style="font-size: 13px; line-height: 1.6;">
          <p style="margin: 3px 0;"><strong>Họ và tên thành viên Hội đồng:</strong> GS.TS. Hoàng Văn E</p>
          <p style="margin: 3px 0;"><strong>Tên đề tài đề xuất:</strong> ${data.title || 'Nghiên cứu ứng dụng Trí tuệ Nhân tạo trong phân loại nông sản tỉnh Đồng Nai'}</p>
          <p style="font-weight: bold; margin-top: 8px; margin-bottom: 2px;">1. Nhận xét đề tài đề xuất:</p>
          <p style="margin: 2px 0; padding-left: 12px;">1.1. Tính cấp thiết: Rất cần thiết cho nông nghiệp tỉnh Đồng Nai.</p>
          <p style="margin: 2px 0; padding-left: 12px;">1.2. Mục tiêu: Rõ ràng, phù hợp khả năng thực hiện 12 tháng.</p>
          <p style="margin: 2px 0; padding-left: 12px;">1.5. Sản phẩm: Đạt yêu cầu sản phẩm khoa học công bố.</p>
          <p style="font-weight: bold; margin-top: 8px; margin-bottom: 2px;">2. Kiến nghị của thành viên Hội đồng:</p>
          <p style="margin: 2px 0; font-weight: bold; color: #166534; padding-left: 12px;">[ X ] ĐỀ NGHỊ THỰC HIỆN</p>

          <div style="text-align: right; margin-top: 36px;">
            <p style="font-weight: bold; margin-bottom: 2px;">THÀNH VIÊN HỘI ĐỒNG</p>
            <p style="font-size: 11px; font-style: italic; margin-top: 0;">(Ký tên và ghi rõ họ tên)</p>
            <div style="margin-top: 36px; font-weight: bold; color: #166534;">✓ GS.TS. Hoàng Văn E (Đã ký)</div>
          </div>
        </div>
      `;
    } else if (code.includes('BM03.QT.KHCN.02') || code === 'BM03_M01') {
      bodyInner = `
        <div style="text-align: center; margin-bottom: 16px;">
          <table style="width: 100%; border: none; font-size: 12px; font-weight: bold; margin-bottom: 10px;">
            <tr>
              <td style="text-align: center; width: 45%;">BỘ GIÁO DỤC VÀ ĐÀO TẠO<br><span style="color: #AB1F24;">TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐỒNG NAI</span></td>
              <td style="text-align: center; width: 55%;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br>Độc lập - Tự do - Hạnh phúc<br><span style="font-weight: normal; font-size: 11px; font-style: italic;">Đồng Nai, ngày ${currentDate}</span></td>
            </tr>
          </table>
          <h2 style="font-size: 15px; color: #AB1F24; margin: 12px 0 2px 0; text-transform: uppercase;">BIÊN BẢN HỌP HỘI ĐỒNG XÉT DUYỆT ĐỀ TÀI CẤP TRƯỜNG</h2>
          <p style="font-size: 11px; font-style: italic; color: #64748B; margin-top: 2px;">(Mẫu BM03.QT.KHCN.02)</p>
        </div>

        <div style="font-size: 13px; line-height: 1.6;">
          <p style="margin: 3px 0;"><strong>Tên Hội đồng:</strong> Hội đồng Xét duyệt Đề tài NCKH Cấp trường Đợt 1 Năm 2026</p>
          <p style="margin: 3px 0;"><strong>Quyết định thành lập số:</strong> 185/QĐ-ĐHCNĐN | <strong>Địa điểm:</strong> Phòng A102 DNTU</p>
          <p style="margin: 3px 0;"><strong>Kết luận của Hội đồng:</strong> Nhất trí đưa 05 đề tài vào danh mục phê duyệt thực hiện.</p>

          <div style="display: flex; justify-content: space-between; margin-top: 36px; text-align: center;">
            <div style="width: 45%;">
              <p style="font-weight: bold; margin-bottom: 2px;">CHỦ TỊCH HỘI ĐỒNG</p>
              <p style="font-size: 11px; font-style: italic; margin-top: 0;">(Ký tên và ghi rõ họ tên)</p>
              <div style="margin-top: 36px; font-weight: bold; color: #166534;">✓ GS.TS. Hoàng Văn E (Đã ký thứ 2)</div>
            </div>
            <div style="width: 45%;">
              <p style="font-weight: bold; margin-bottom: 2px;">THƯ KÝ HỘI ĐỒNG</p>
              <p style="font-size: 11px; font-style: italic; margin-top: 0;">(Ký tên và ghi rõ họ tên)</p>
              <div style="margin-top: 36px; font-weight: bold; color: #166534;">✓ ThS. Vũ Thị G (Đã ký thứ 1)</div>
            </div>
          </div>
        </div>
      `;
    }

    // ==================== MODULE 02 FORMS (BM01.QT.KHCN.04 to BM05.QT.KHCN.04) ====================
    else if (code.includes('BM01.QT.KHCN.04') || code.includes('BM01')) {
      bodyInner = `
        <div style="text-align: center; margin-bottom: 16px;">
          <table style="width: 100%; border: none; font-size: 12px; font-weight: bold; margin-bottom: 10px;">
            <tr>
              <td style="text-align: center; width: 45%;">BỘ GIÁO DỤC VÀ ĐÀO TẠO<br><span style="color: #AB1F24;">TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐỒNG NAI</span><br><span style="font-weight: normal; font-size: 11px;">Số:…../BC-KHOA CNTT</span></td>
              <td style="text-align: center; width: 55%;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br>Độc lập - Tự do - Hạnh phúc<br><span style="font-weight: normal; font-size: 11px; font-style: italic;">Đồng Nai, ngày ${currentDate}</span></td>
            </tr>
          </table>
          <h2 style="font-size: 15px; color: #AB1F24; margin: 12px 0 4px 0; text-transform: uppercase;">BÁO CÁO TÌNH HÌNH THỰC HIỆN</h2>
          <h3 style="font-size: 14px; color: #1E293B; margin: 0; text-transform: uppercase;">ĐỀ TÀI NGHIÊN CỨU KHOA HỌC CẤP NHÀ NƯỚC, CẤP TỈNH/ BỘ, NGÀNH, CÁC QUỸ</h3>
          <p style="font-size: 11px; font-style: italic; color: #64748B; margin-top: 4px;">(Mẫu BM01.QT.KHCN.04)</p>
        </div>

        <div style="font-size: 13px; line-height: 1.6;">
          <p style="font-weight: bold; margin-bottom: 4px;">I. Thông tin chung:</p>
          <div style="padding-left: 12px; margin-bottom: 12px;">
            <p style="margin: 2px 0;"><strong>1. Tên đề tài:</strong> ${data.title || 'Nghiên cứu xây dựng mô hình nông nghiệp thông minh thích ứng biến đổi khí hậu tỉnh Đồng Nai'}</p>
            <p style="margin: 2px 0;"><strong>2. Mã số:</strong> ${data.code || 'DA-2026-TINH-001'}</p>
            <p style="margin: 2px 0;"><strong>3. Chủ nhiệm đề tài:</strong> ${data.author || 'TS. Trần Thị B (Khoa CNTT DNTU)'}</p>
            <p style="margin: 2px 0;"><strong>5. Thời gian thực hiện:</strong> Từ 01/01/2026 đến 31/12/2027 (24 Tháng)</p>
            <p style="margin: 2px 0;"><strong>6. Chi phí:</strong> ${data.budget || '1.200.000.000'} VNĐ</p>
          </div>

          <p style="font-weight: bold; margin-bottom: 4px;">II. Tình hình thực hiện đề tài:</p>
          <div style="padding-left: 12px;">
            <p style="font-weight: bold; margin: 4px 0;">1. Nội dung nghiên cứu:</p>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #94A3B8; font-size: 12px; margin-bottom: 12px;">
              <thead>
                <tr style="background: #F1F5F9;">
                  <th style="padding: 6px; border: 1px solid #94A3B8; width: 6%; text-align: center;">STT</th>
                  <th style="padding: 6px; border: 1px solid #94A3B8; width: 34%;">Nội dung nghiên cứu theo Thuyết minh đề tài</th>
                  <th style="padding: 6px; border: 1px solid #94A3B8; width: 30%;">Tiến độ thực hiện theo Thuyết minh đề tài</th>
                  <th style="padding: 6px; border: 1px solid #94A3B8; width: 30%;">Nội dung nghiên cứu đã thực hiện</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 6px; border: 1px solid #94A3B8; text-align: center;">1</td>
                  <td style="padding: 6px; border: 1px solid #94A3B8;">Khảo sát 50 trang trại nông nghiệp công nghệ cao tại Đồng Nai</td>
                  <td style="padding: 6px; border: 1px solid #94A3B8;">Tháng 01/2026 - Tháng 06/2026</td>
                  <td style="padding: 6px; border: 1px solid #94A3B8; color: #166534; font-weight: bold;">✓ Đã hoàn thành 100% khảo sát thực địa</td>
                </tr>
                <tr>
                  <td style="padding: 6px; border: 1px solid #94A3B8; text-align: center;">2</td>
                  <td style="padding: 6px; border: 1px solid #94A3B8;">Lắp đặt trạm cảm biến IoT đo độ ẩm & vi khí hậu</td>
                  <td style="padding: 6px; border: 1px solid #94A3B8;">Tháng 07/2026 - Tháng 12/2026</td>
                  <td style="padding: 6px; border: 1px solid #94A3B8; color: #854D0E; font-weight: bold;">● Đang triển khai thử nghiệm đạt 60%</td>
                </tr>
              </tbody>
            </table>

            <p style="font-weight: bold; margin: 4px 0;">2. Sản phẩm:</p>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #94A3B8; font-size: 12px; margin-bottom: 12px;">
              <thead>
                <tr style="background: #F1F5F9;">
                  <th style="padding: 6px; border: 1px solid #94A3B8; width: 6%; text-align: center;">STT</th>
                  <th style="padding: 6px; border: 1px solid #94A3B8; width: 44%;">Sản phẩm theo Thuyết minh đề tài</th>
                  <th style="padding: 6px; border: 1px solid #94A3B8; width: 50%;">Sản phẩm đã đạt được</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 6px; border: 1px solid #94A3B8; text-align: center;">1</td>
                  <td style="padding: 6px; border: 1px solid #94A3B8; font-weight: bold;">Sản phẩm khoa học</td>
                  <td style="padding: 6px; border: 1px solid #94A3B8;">02 Bài báo Scopus Q2 công bố quốc tế</td>
                </tr>
                <tr>
                  <td style="padding: 6px; border: 1px solid #94A3B8; text-align: center;">2</td>
                  <td style="padding: 6px; border: 1px solid #94A3B8; font-weight: bold;">Sản phẩm đào tạo</td>
                  <td style="padding: 6px; border: 1px solid #94A3B8;">Hỗ trợ hướng dẫn 02 Học viên Thạc sĩ bảo vệ luận văn</td>
                </tr>
                <tr>
                  <td style="padding: 6px; border: 1px solid #94A3B8; text-align: center;">3</td>
                  <td style="padding: 6px; border: 1px solid #94A3B8; font-weight: bold;">Sản phẩm ứng dụng</td>
                  <td style="padding: 6px; border: 1px solid #94A3B8;">Hệ thống phần mềm IoT SmartAgri cho Sở Nông nghiệp</td>
                </tr>
                <tr>
                  <td style="padding: 6px; border: 1px solid #94A3B8; text-align: center;">4</td>
                  <td style="padding: 6px; border: 1px solid #94A3B8; font-weight: bold;">Tài sản trí tuệ khác được chấp nhận đơn/được cấp bằng</td>
                  <td style="padding: 6px; border: 1px solid #94A3B8;">01 Đơn đăng ký Giải pháp Hữu ích tại Cục SHTT</td>
                </tr>
              </tbody>
            </table>

            <p style="font-weight: bold; margin: 4px 0;">3. Chi phí đề tài:</p>
            <div style="padding-left: 12px; margin-bottom: 12px;">
              <p style="margin: 2px 0;"><strong>3.1. Chi phí được cấp:</strong> ${data.budgetAllocated || '1.200.000.000'} VNĐ</p>
              <p style="margin: 2px 0;"><strong>3.2. Chi phí đã chi:</strong> ${data.budgetSpent || '600.000.000'} VNĐ</p>
              <p style="margin: 2px 0;"><strong>3.3. Chi phí đã quyết toán:</strong> ${data.budgetSettled || '600.000.000'} VNĐ</p>
            </div>
          </div>

          <p style="font-weight: bold; margin-bottom: 4px;">III. Kế hoạch triển khai tiếp theo (Bỏ qua mục này nếu ở giai đoạn báo cáo nghiệm thu):</p>
          <p style="padding-left: 12px; margin-top: 0;">Hoàn thiện mô hình học máy dự báo vi khí hậu và triển khai mở rộng 20 trạm cảm biến IoT tại các vùng chuyên canh huyện Định Quán.</p>

          <p style="font-weight: bold; margin-bottom: 4px;">IV. Kiến nghị:</p>
          <p style="padding-left: 12px; margin-top: 0;">Đề nghị Phòng KHCN và Tổ chức chủ trì hỗ trợ giải ngân giai đoạn 2 đúng tiến độ theo Hợp đồng.</p>

          <div style="display: flex; justify-content: space-between; margin-top: 36px; text-align: center;">
            <div style="width: 45%;">
              <p style="font-weight: bold; margin-bottom: 2px;">CHỦ NHIỆM ĐỀ TÀI</p>
              <p style="font-size: 11px; font-style: italic; margin-top: 0;">(Ký tên và ghi rõ họ tên)</p>
              <div style="margin-top: 36px; font-weight: bold; color: #166534;">✓ TS. Trần Thị B (Đã ký)</div>
            </div>
            <div style="width: 45%;">
              <p style="font-weight: bold; margin-bottom: 2px;">TỔ CHỨC CHỦ TRÌ</p>
              <p style="font-size: 11px; font-style: italic; margin-top: 0;">(Ký tên và ghi rõ họ tên)</p>
              <div style="margin-top: 36px; font-weight: bold; color: #166534;">✓ PGS.TS. Phạm Văn D (Đã ký)</div>
            </div>
          </div>
        </div>
      `;
    } 
    // BM02.QT.KHCN.04: PHIẾU ĐỀ NGHỊ NGHIỆM THU ĐỀ TÀI CẤP CƠ SỞ
    else if (code.includes('BM02.QT.KHCN.04') || code.includes('BM02')) {
      bodyInner = `
        <div style="text-align: center; margin-bottom: 16px;">
          <table style="width: 100%; border: none; font-size: 12px; font-weight: bold; margin-bottom: 10px;">
            <tr>
              <td style="text-align: center; width: 45%;">TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐỒNG NAI<br><span style="color: #AB1F24;">KHOA HÓA - MÔI TRƯỜNG</span></td>
              <td style="text-align: center; width: 55%;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br>Độc lập - Tự do - Hạnh phúc<br><span style="font-weight: normal; font-size: 11px; font-style: italic;">Đồng Nai, ngày ${currentDate}</span></td>
            </tr>
          </table>
          <h2 style="font-size: 15px; color: #AB1F24; margin: 12px 0 2px 0; text-transform: uppercase;">PHIẾU ĐỀ NGHỊ NGHIỆM THU ĐỀ TÀI CẤP CƠ SỞ</h2>
          <h3 style="font-size: 13px; color: #1E293B; margin: 0; text-transform: uppercase;">ĐỀ TÀI NGHIÊN CỨU KHOA HỌC CẤP CẤP NHÀ NƯỚC, CẤP TỈNH/ BỘ, NGÀNH, CÁC QUỸ</h3>
          <p style="font-size: 11px; font-style: italic; color: #64748B; margin-top: 4px;">(Mẫu BM02.QT.KHCN.04)</p>
        </div>

        <div style="font-size: 13px; line-height: 1.6;">
          <p style="margin: 3px 0;"><strong>Họ và tên chủ nhiệm đề tài:</strong> ${data.author || 'PGS.TS. Phạm Văn D'}</p>
          <p style="margin: 3px 0;"><strong>Mã số đề tài:</strong> ${data.code || 'DA-2026-BO-002'}</p>
          <p style="margin: 3px 0;"><strong>Tên đề tài:</strong> ${data.title || 'Nghiên cứu chế tạo vật liệu nano ứng dụng xử lý nước thải công nghiệp'}</p>
          <p style="margin: 3px 0;"><strong>Thời gian thực hiện (theo Thuyết minh đề tài):</strong> từ 01/06/2024 đến 30/06/2026</p>
          <p style="margin: 3px 0;"><strong>Thời gian và địa điểm (dự kiến) tổ chức nghiệm thu:</strong> 08h30 ngày 25/08/2026 tại Phòng Hội nghị A102 DNTU</p>

          <p style="margin-top: 10px; font-weight: bold;">Nay xin đề nghị đánh giá, nghiệm thu cấp cơ sở đề tài nghiên cứu khoa học cấp nhà nước, cấp tỉnh/ bộ, ngành, các quỹ, danh sách giới thiệu các thành viên Hội đồng bao gồm:</p>

          <table style="width: 100%; border-collapse: collapse; border: 1px solid #94A3B8; font-size: 12px; margin: 10px 0;">
            <thead>
              <tr style="background: #F1F5F9;">
                <th style="padding: 6px; border: 1px solid #94A3B8; width: 6%; text-align: center;">STT</th>
                <th style="padding: 6px; border: 1px solid #94A3B8; width: 34%;">Họ và tên (kèm theo học hàm, học vị)</th>
                <th style="padding: 6px; border: 1px solid #94A3B8; width: 35%;">Đơn vị</th>
                <th style="padding: 6px; border: 1px solid #94A3B8; width: 25%;">Cương vị trong Hội đồng</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="padding: 6px; border: 1px solid #94A3B8; text-align: center;">1</td><td style="padding: 6px; border: 1px solid #94A3B8;">GS.TS. Hoàng Văn E</td><td style="padding: 6px; border: 1px solid #94A3B8;">Hội đồng Khoa học DNTU</td><td style="padding: 6px; border: 1px solid #94A3B8; font-weight: bold; color: #AB1F24;">Chủ tịch Hội đồng</td></tr>
              <tr><td style="padding: 6px; border: 1px solid #94A3B8; text-align: center;">2</td><td style="padding: 6px; border: 1px solid #94A3B8;">TS. Đặng Văn F</td><td style="padding: 6px; border: 1px solid #94A3B8;">Khoa Môi trường DNTU</td><td style="padding: 6px; border: 1px solid #94A3B8; font-weight: bold;">Ủy viên Phản biện 1</td></tr>
              <tr><td style="padding: 6px; border: 1px solid #94A3B8; text-align: center;">3</td><td style="padding: 6px; border: 1px solid #94A3B8;">PGS.TS. Lê Văn K</td><td style="padding: 6px; border: 1px solid #94A3B8;">Viện KHCN Đông Nam Bộ</td><td style="padding: 6px; border: 1px solid #94A3B8; font-weight: bold;">Ủy viên Phản biện 2</td></tr>
              <tr><td style="padding: 6px; border: 1px solid #94A3B8; text-align: center;">4</td><td style="padding: 6px; border: 1px solid #94A3B8;">TS. Nguyễn Thị P</td><td style="padding: 6px; border: 1px solid #94A3B8;">Khoa Hóa DNTU</td><td style="padding: 6px; border: 1px solid #94A3B8;">Ủy viên Hội đồng</td></tr>
              <tr><td style="padding: 6px; border: 1px solid #94A3B8; text-align: center;">5</td><td style="padding: 6px; border: 1px solid #94A3B8;">ThS. Vũ Thị G</td><td style="padding: 6px; border: 1px solid #94A3B8;">Phòng KHCN DNTU</td><td style="padding: 6px; border: 1px solid #94A3B8; font-weight: bold;">Thư ký Hội đồng</td></tr>
            </tbody>
          </table>

          <div style="display: flex; justify-content: space-between; margin-top: 36px; text-align: center;">
            <div style="width: 45%;">
              <p style="font-weight: bold; margin-bottom: 2px;">TRƯỜNG ĐƠN VỊ</p>
              <p style="font-size: 11px; font-style: italic; margin-top: 0;">(Ghi rõ họ tên và ký tên)</p>
              <div style="margin-top: 36px; font-weight: bold; color: #166534;">✓ PGS.TS. Phạm Văn D (Đã ký)</div>
            </div>
            <div style="width: 45%;">
              <p style="font-weight: bold; margin-bottom: 2px;">CHỦ NHIỆM ĐỀ TÀI</p>
              <p style="font-size: 11px; font-style: italic; margin-top: 0;">(Ghi rõ họ, tên và ký tên)</p>
              <div style="margin-top: 36px; font-weight: bold; color: #166534;">✓ PGS.TS. Phạm Văn D (Đã ký)</div>
            </div>
          </div>
        </div>
      `;
    }
    // BM03.QT.KHCN.04: QUYẾT ĐỊNH THÀNH LẬP HỘI ĐỒNG NGHIỆM THU CẤP CƠ SỞ
    else if (code.includes('BM03.QT.KHCN.04') || code.includes('BM03')) {
      bodyInner = `
        <div style="text-align: center; margin-bottom: 16px;">
          <table style="width: 100%; border: none; font-size: 12px; font-weight: bold; margin-bottom: 10px;">
            <tr>
              <td style="text-align: center; width: 45%;">BỘ GIÁO DỤC VÀ ĐÀO TẠO<br><span style="color: #AB1F24;">TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐỒNG NAI</span><br><span style="font-weight: normal; font-size: 11px;">Số: 215/QĐ-ĐHCNĐN</span></td>
              <td style="text-align: center; width: 55%;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br>Độc lập - Tự do - Hạnh phúc<br><span style="font-weight: normal; font-size: 11px; font-style: italic;">Đồng Nai, ngày ${currentDate}</span></td>
            </tr>
          </table>
          <h2 style="font-size: 16px; color: #AB1F24; margin: 12px 0 2px 0; text-transform: uppercase;">QUYẾT ĐỊNH</h2>
          <h3 style="font-size: 13px; color: #1E293B; margin: 0;">Về việc thành lập Hội đồng nghiệm thu đề tài khoa học cấp nhà nước, Bộ, cấp Tỉnh/ Thành phố, các quỹ năm học 2025-2026</h3>
          <p style="font-size: 11px; font-style: italic; color: #64748B; margin-top: 4px;">(Mẫu BM03.QT.KHCN.04)</p>
        </div>

        <div style="font-size: 13px; line-height: 1.6;">
          <p style="text-align: center; font-weight: bold; margin: 8px 0;">HIỆU TRƯỜNG TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐỒNG NAI</p>
          <p style="margin: 2px 0;">Căn cứ Quyết định số 929/QĐ-TTg ngày 16 tháng 6 năm 2011 của Thủ tướng Chính phủ về việc thành lập Trường Đại học Công nghệ Đồng Nai;</p>
          <p style="margin: 2px 0;">Căn cứ Quy chế Hoạt động khoa học và công nghệ của Trường Đại học Công nghệ Đồng Nai;</p>
          <p style="margin: 2px 0;">Theo đề nghị của Trưởng phòng Khoa học Công nghệ.</p>

          <p style="text-align: center; font-weight: bold; margin: 8px 0; color: #AB1F24;">QUYẾT ĐỊNH:</p>
          <p style="margin: 2px 0;"><strong>Điều 1.</strong> Thành lập Hội đồng nghiệm thu đề tài NCKH cấp cơ sở đối với dự án: <em>${data.title || 'Nghiên cứu chế tạo vật liệu nano ứng dụng xử lý nước thải công nghiệp'}</em> (Mã số: ${data.code || 'DA-2026-BO-002'}).</p>
          <p style="margin: 2px 0;"><strong>Điều 2.</strong> Nhiệm vụ, quyền hạn của Hội đồng thực hiện theo Quy chế hoạt động khoa học và công nghệ của Nhà trường.</p>
          <p style="margin: 2px 0;"><strong>Điều 3.</strong> Quyết định này có hiệu lực kể từ ngày ký.</p>

          <p style="font-weight: bold; margin-top: 10px; margin-bottom: 4px;">DANH SÁCH HỘI ĐỒNG NGHIỆM THU (KÈM THEO QUYẾT ĐỊNH):</p>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #94A3B8; font-size: 12px; margin-bottom: 12px;">
            <thead>
              <tr style="background: #F1F5F9;">
                <th style="padding: 6px; border: 1px solid #94A3B8; width: 8%; text-align: center;">STT</th>
                <th style="padding: 6px; border: 1px solid #94A3B8; width: 34%;">Họ và tên</th>
                <th style="padding: 6px; border: 1px solid #94A3B8; width: 33%;">Đơn vị công tác</th>
                <th style="padding: 6px; border: 1px solid #94A3B8; width: 25%;">Trách nhiệm trong Hội đồng</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="padding: 6px; border: 1px solid #94A3B8; text-align: center;">1</td><td style="padding: 6px; border: 1px solid #94A3B8;">GS.TS. Hoàng Văn E</td><td style="padding: 6px; border: 1px solid #94A3B8;">Hội đồng Khoa học DNTU</td><td style="padding: 6px; border: 1px solid #94A3B8; font-weight: bold; color: #AB1F24;">Chủ tịch Hội đồng</td></tr>
              <tr><td style="padding: 6px; border: 1px solid #94A3B8; text-align: center;">2</td><td style="padding: 6px; border: 1px solid #94A3B8;">TS. Đặng Văn F</td><td style="padding: 6px; border: 1px solid #94A3B8;">Khoa Môi trường DNTU</td><td style="padding: 6px; border: 1px solid #94A3B8; font-weight: bold;">Phản biện</td></tr>
              <tr><td style="padding: 6px; border: 1px solid #94A3B8; text-align: center;">3</td><td style="padding: 6px; border: 1px solid #94A3B8;">PGS.TS. Lê Văn K</td><td style="padding: 6px; border: 1px solid #94A3B8;">Viện KHCN Đông Nam Bộ</td><td style="padding: 6px; border: 1px solid #94A3B8; font-weight: bold;">Phản biện</td></tr>
              <tr><td style="padding: 6px; border: 1px solid #94A3B8; text-align: center;">4</td><td style="padding: 6px; border: 1px solid #94A3B8;">TS. Nguyễn Thị P</td><td style="padding: 6px; border: 1px solid #94A3B8;">Khoa Hóa DNTU</td><td style="padding: 6px; border: 1px solid #94A3B8;">Ủy viên</td></tr>
              <tr><td style="padding: 6px; border: 1px solid #94A3B8; text-align: center;">5</td><td style="padding: 6px; border: 1px solid #94A3B8;">ThS. Vũ Thị G</td><td style="padding: 6px; border: 1px solid #94A3B8;">Phòng KHCN DNTU</td><td style="padding: 6px; border: 1px solid #94A3B8; font-weight: bold;">Thư ký</td></tr>
            </tbody>
          </table>

          <div style="display: flex; justify-content: space-between; margin-top: 24px;">
            <div style="width: 50%; font-size: 11px;">
              <p style="margin: 0; font-weight: bold;">Nơi nhận:</p>
              <p style="margin: 0;">- HĐT, BGH (để b/c);</p>
              <p style="margin: 0;">- Như Điều 4 (để t/h);</p>
              <p style="margin: 0;">- Lưu: VT, P.KHCN.</p>
            </div>
            <div style="width: 45%; text-align: center;">
              <p style="font-weight: bold; margin-bottom: 2px;">HIỆU TRƯỜNG</p>
              <div style="margin-top: 36px; font-weight: bold; color: #166534;">✓ PGS.TS. Nguyễn Thị A (Đã ký Quyết định)</div>
            </div>
          </div>
        </div>
      `;
    }
    // BM04.QT.KHCN.04: PHIẾU ĐÁNH GIÁ KẾT QUẢ THỰC HIỆN ĐỀ TÀI (ỦY VIÊN / CHỦ TỊCH HĐ CHẤM PHIẾU)
    else if (code.includes('BM04.QT.KHCN.04') || code.includes('BM04_EVAL')) {
      bodyInner = `
        <div style="text-align: center; margin-bottom: 16px;">
          <table style="width: 100%; border: none; font-size: 12px; font-weight: bold; margin-bottom: 10px;">
            <tr>
              <td style="text-align: center; width: 45%;">BỘ GIÁO DỤC VÀ ĐÀO TẠO<br><span style="color: #AB1F24;">TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐỒNG NAI</span></td>
              <td style="text-align: center; width: 55%;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br>Độc lập - Tự do - Hạnh phúc<br><span style="font-weight: normal; font-size: 11px; font-style: italic;">Đồng Nai, ngày ${currentDate}</span></td>
            </tr>
          </table>
          <h2 style="font-size: 15px; color: #AB1F24; margin: 12px 0 2px 0; text-transform: uppercase;">PHIẾU ĐÁNH GIÁ</h2>
          <h3 style="font-size: 13px; color: #1E293B; margin: 0; text-transform: uppercase;">KẾT QUẢ THỰC HIỆN ĐỀ TÀI NGHIÊN CỨU KHOA HỌC CẤP NHÀ NƯỚC, BỘ, CẤP TỈNH/ THÀNH PHỐ, CÁC QUỸ</h3>
          <p style="font-size: 11px; font-style: italic; color: #64748B; margin-top: 4px;">(Mẫu BM04.QT.KHCN.04)</p>
        </div>

        <div style="font-size: 13px; line-height: 1.6;">
          <p style="font-weight: bold; margin-bottom: 4px;">1. Thông tin chung:</p>
          <div style="padding-left: 12px; margin-bottom: 8px;">
            <p style="margin: 2px 0;">- Tên đề tài: ${data.title || 'Nghiên cứu chế tạo vật liệu nano ứng dụng xử lý nước thải công nghiệp'}</p>
            <p style="margin: 2px 0;">- Mã số: ${data.code || 'DA-2026-BO-002'}</p>
            <p style="margin: 2px 0;">- Chủ nhiệm: PGS.TS. Phạm Văn D</p>
            <p style="margin: 2px 0;">- Tổ chức chủ trì: Trường Đại học Công nghệ Đồng Nai</p>
          </div>

          <p style="margin: 4px 0;"><strong>2. Họ và tên thành viên Hội đồng:</strong> GS.TS. Hoàng Văn E (Chủ tịch HĐ)</p>

          <p style="font-weight: bold; margin-top: 8px; margin-bottom: 4px;">3. Tiêu chí đánh giá:</p>
          <p style="font-weight: bold; margin: 4px 0; padding-left: 12px;">3.1. Đánh giá về số lượng, khối lượng sản phẩm:</p>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #94A3B8; font-size: 11px; margin-bottom: 8px;">
            <thead>
              <tr style="background: #F1F5F9;">
                <th style="padding: 4px; border: 1px solid #94A3B8;">STT</th>
                <th style="padding: 4px; border: 1px solid #94A3B8;">Tên sản phẩm</th>
                <th style="padding: 4px; border: 1px solid #94A3B8;">Theo thuyết minh</th>
                <th style="padding: 4px; border: 1px solid #94A3B8;">Thực tế đạt được</th>
                <th style="padding: 4px; border: 1px solid #94A3B8;">Đánh giá (Đạt / Không đạt)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="padding: 4px; border: 1px solid #94A3B8; text-align: center;">1</td><td style="padding: 4px; border: 1px solid #94A3B8;">Báo cáo tổng kết</td><td style="padding: 4px; border: 1px solid #94A3B8;">01 Bộ báo cáo hoàn chỉnh</td><td style="padding: 4px; border: 1px solid #94A3B8;">01 Bộ báo cáo 150 trang</td><td style="padding: 4px; border: 1px solid #94A3B8; font-weight: bold; color: #166534;">✓ Đạt</td></tr>
              <tr><td style="padding: 4px; border: 1px solid #94A3B8; text-align: center;">2</td><td style="padding: 4px; border: 1px solid #94A3B8;">Bài báo Scopus Q1</td><td style="padding: 4px; border: 1px solid #94A3B8;">01 Bài báo công bố</td><td style="padding: 4px; border: 1px solid #94A3B8;">02 Bài báo đã xuất bản</td><td style="padding: 4px; border: 1px solid #94A3B8; font-weight: bold; color: #166534;">✓ Đạt vượt mức</td></tr>
            </tbody>
          </table>

          <p style="font-weight: bold; margin: 4px 0; padding-left: 12px;">3.2. Đánh giá về chất lượng sản phẩm, mức độ đáp ứng quy định:</p>
          <p style="padding-left: 12px; margin: 2px 0;">Sản phẩm nano đạt độ hấp phụ 96.5% ô nhiễm hữu cơ trong nước thải công nghiệp. Đánh giá chất lượng xuất sắc.</p>

          <p style="font-weight: bold; margin-top: 8px; margin-bottom: 4px;">4. Xếp loại đề tài cấp trường / cơ sở:</p>
          <p style="padding-left: 12px; margin: 2px 0; font-weight: bold; color: #166534;">[ X ] ĐẠT MỨC XUẤT SẮC (95/100 ĐIỂM)</p>

          <div style="text-align: right; margin-top: 24px;">
            <p style="font-weight: bold; margin-bottom: 2px;">THÀNH VIÊN HỘI ĐỒNG</p>
            <p style="font-size: 11px; font-style: italic; margin-top: 0;">(Ký tên và ghi rõ họ tên)</p>
            <div style="margin-top: 36px; font-weight: bold; color: #166534;">✓ GS.TS. Hoàng Văn E (Đã chấm điểm & ký)</div>
          </div>
        </div>
      `;
    }
    // BM05.QT.KHCN.04: BIÊN BẢN HỌP HỘI ĐỒNG ĐÁNH GIÁ, NGHIỆM THU CẤP CƠ SỞ
    else if (code.includes('BM05.QT.KHCN.04') || code.includes('BM05')) {
      bodyInner = `
        <div style="text-align: center; margin-bottom: 16px;">
          <table style="width: 100%; border: none; font-size: 12px; font-weight: bold; margin-bottom: 10px;">
            <tr>
              <td style="text-align: center; width: 45%;">BỘ GIÁO DỤC VÀ ĐÀO TẠO<br><span style="color: #AB1F24;">TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐỒNG NAI</span></td>
              <td style="text-align: center; width: 55%;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br>Độc lập - Tự do - Hạnh phúc<br><span style="font-weight: normal; font-size: 11px; font-style: italic;">Đồng Nai, ngày ${currentDate}</span></td>
            </tr>
          </table>
          <h2 style="font-size: 15px; color: #AB1F24; margin: 12px 0 2px 0; text-transform: uppercase;">BIÊN BẢN HỌP HỘI ĐỒNG ĐÁNH GIÁ, NGHIỆM THU</h2>
          <h3 style="font-size: 13px; color: #1E293B; margin: 0; text-transform: uppercase;">ĐỀ TÀI NGHIÊN CỨU KHOA HỌC CẤP NHÀ NƯỚC, BỘ, CẤP TỈNH/ THÀNH PHỐ, CÁC QUỸ</h3>
          <p style="font-size: 11px; font-style: italic; color: #64748B; margin-top: 4px;">(Mẫu BM05.QT.KHCN.04)</p>
        </div>

        <div style="font-size: 13px; line-height: 1.6;">
          <p style="margin: 2px 0;"><strong>1. Tên đề tài, mã số:</strong> ${data.title || 'Nghiên cứu chế tạo vật liệu nano ứng dụng xử lý nước thải công nghiệp'} (Mã số: ${data.code || 'DA-2026-BO-002'})</p>
          <p style="margin: 2px 0;"><strong>2. Họ và tên, học vị, chức danh khoa học của Chủ nhiệm:</strong> PGS.TS. Phạm Văn D</p>
          <p style="margin: 2px 0;"><strong>3. Tổ chức chủ trì:</strong> Trường Đại học Công nghệ Đồng Nai</p>
          <p style="margin: 2px 0;"><strong>4. Quyết định thành lập Hội đồng:</strong> Quyết định số 215/QĐ-ĐHCNĐN ngày 10/08/2026</p>
          <p style="margin: 2px 0;"><strong>5. Ngày họp:</strong> 25/08/2026 | <strong>6. Địa điểm:</strong> Phòng Hội nghị A102 DNTU</p>
          <p style="margin: 2px 0;"><strong>7. Thành viên của Hội đồng:</strong> Tổng số: 05 thành viên | Có mặt: 05 thành viên | Vắng mặt: 0</p>

          <p style="font-weight: bold; margin-top: 8px; margin-bottom: 4px;">9. Kết luận và kiến nghị của Hội đồng:</p>
          <p style="margin: 2px 0; padding-left: 12px;"><strong>9.1. Về mức độ đáp ứng yêu cầu số lượng, khối lượng sản phẩm:</strong> Đạt 100% khối lượng sản phẩm theo Thuyết minh hợp đồng.</p>
          <p style="margin: 2px 0; padding-left: 12px;"><strong>9.2. Về chất lượng sản phẩm, giá trị khoa học, thực tiễn:</strong> Đạt chất lượng xuất sắc, có giá trị ứng dụng thực tiễn cao tại khu công nghiệp Đồng Nai.</p>
          <p style="margin: 2px 0; padding-left: 12px;"><strong>9.3. Kết quả đánh giá xếp loại của Hội đồng:</strong> <strong style="color: #166534;">[ √ ] ĐẠT MỨC XUẤT SẮC (92.5/100 Điểm)</strong></p>

          <div style="display: flex; justify-content: space-between; margin-top: 36px; text-align: center;">
            <div style="width: 45%;">
              <p style="font-weight: bold; margin-bottom: 2px;">CHỦ TỊCH HỘI ĐỒNG</p>
              <p style="font-size: 11px; font-style: italic; margin-top: 0;">(Ký tên và ghi rõ họ tên)</p>
              <div style="margin-top: 36px; font-weight: bold; color: #166534;">✓ GS.TS. Hoàng Văn E (Đã ký thứ 2)</div>
            </div>
            <div style="width: 45%;">
              <p style="font-weight: bold; margin-bottom: 2px;">THƯ KÝ HỘI ĐỒNG</p>
              <p style="font-size: 11px; font-style: italic; margin-top: 0;">(Ký tên và ghi rõ họ tên)</p>
              <div style="margin-top: 36px; font-weight: bold; color: #166534;">✓ ThS. Vũ Thị G (Đã ký thứ 1)</div>
            </div>
          </div>
        </div>
      `;
    } else {
      bodyInner = `
        <div style="text-align: center; margin-bottom: 20px;">
          <h4 style="margin: 0; font-size: 13px; font-weight: bold;">TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐỒNG NAI</h4>
          <h2 style="font-size: 16px; color: #AB1F24; margin: 0;">BIỂU MẪU ĐIỆN TỬ HÀNH CHÍNH: ${code}</h2>
          <p style="font-size: 12px; font-style: italic; color: #475569;">${title}</p>
        </div>
        <div style="background: #fff; padding: 16px; border: 1px solid #CBD5E1; border-radius: 6px; font-size: 13px;">
          <p><strong>Mã Hồ Sơ:</strong> HS-2026-NCKH-001</p>
          <p><strong>Thời gian xuất bản:</strong> ${currentDate}</p>
          <p><strong>Trạng thái chữ ký:</strong> <span class="badge badge-success">✓ Đã xuất PDF có chữ ký điện tử DNTU</span></p>
        </div>
      `;
    }

    return `
      <div style="font-family: 'Times New Roman', Times, serif; color: #1E293B; background: #FFFFFF; padding: 24px; border-radius: 8px; border: 1px solid #E2E8F0;">
        ${bodyInner}
      </div>
    `;
  }

  // PDF Preview Simulation Modal
  function previewPDF(title, formCode, dataObject) {
    const bodyHtml = getOfficialFormHTML(formCode, title, dataObject);

    const actionsHtml = `
      <button type="button" class="btn btn-secondary" onclick="DNTUCommon.closeModal()">Đóng Window</button>
      <button type="button" class="btn btn-primary" onclick="DNTUCommon.showToast('Đã tải xuống tệp PDF Biểu mẫu ${formCode} chính thức!', 'success'); DNTUCommon.closeModal();">
        📥 Tải Tệp PDF Biểu Mẫu (${formCode})
      </button>
    `;

    openModal(`Xem trước PDF Chính Thức DNTU — Biểu Mẫu ${formCode}`, bodyHtml, actionsHtml);
  }

  // Resolve Dedicated Notification Page Link per Actor Context
  function getNotificationPageUrl() {
    const activeRole = localStorage.getItem('dntu_current_role') || 'p-khcn';
    const currentPath = window.location.pathname.replace(/\\/g, '/');

    const notifPageMap = {
      'giang-vien': '06-thong-bao.html',
      'p-khcn': '06-thong-bao.html',
      'truong-don-vi': '04-thong-bao.html',
      'chu-tich-hoi-dong': '04-thong-bao.html',
      'thanh-vien-hoi-dong': '03-thong-bao.html',
      'thu-ky-hoi-dong': '03-thong-bao.html',
      'sinh-vien': '04-thong-bao.html',
      'quan-tri-vien': '04-thong-bao.html'
    };

    const targetPage = notifPageMap[activeRole] || '06-thong-bao.html';

    if (currentPath.includes('/modules/module-01-de-tai-cap-truong/')) {
      return '../' + activeRole + '/' + targetPage;
    }
    if (currentPath.includes('/modules/module-02-de-tai-cap-tinh-bo-nha-nuoc/')) {
      return '../' + activeRole + '/' + targetPage;
    }

    return 'modules/module-01-de-tai-cap-truong/' + (activeRole || 'giang-vien') + '/' + targetPage;
  }

  // Inject Header Square Notification Bell Button & Hover Popover Dropdown
  function initHeaderNotificationBell() {
    const headerProfile = document.querySelector('.header-user-profile');
    if (!headerProfile) return;

    if (!headerProfile.querySelector('.notification-bell-group')) {
      const store = getMockStore();
      const activeRole = localStorage.getItem('dntu_current_role') || 'p-khcn';
      const userNotifs = store.notifications.filter(n => n.targetRole === activeRole || n.targetRole === 'all');
      const unreadCount = userNotifs.filter(n => !n.read).length || userNotifs.length || 3;

      let dropdownItemsHtml = '';
      const recentFive = userNotifs.slice(0, 5);
      if (recentFive.length > 0) {
        recentFive.forEach(n => {
          dropdownItemsHtml += `
            <div class="notif-item">
              <div class="notif-item-title">${n.title}</div>
              <div class="notif-item-desc">${n.message}</div>
              <div class="notif-item-time">${n.time}</div>
            </div>
          `;
        });
      } else {
        dropdownItemsHtml = `
          <div class="notif-item">
            <div class="notif-item-title">🔔 Đợt NCKH Mới Đang Mở</div>
            <div class="notif-item-desc">Phòng KHCN đã công bố tiếp nhận hồ sơ mới.</div>
            <div class="notif-item-time">Vừa xong</div>
          </div>
        `;
      }

      const notifUrl = getNotificationPageUrl();

      const bellWrapper = document.createElement('div');
      bellWrapper.className = 'notification-bell-group';
      bellWrapper.innerHTML = `
        <a href="${notifUrl}" class="notification-bell-btn" id="header-bell-btn" title="Thông báo hệ thống (Bấm để mở trang Thông Báo)">
          🔔
          <span class="notification-badge-count">${unreadCount}</span>
        </a>
        <div class="notification-dropdown">
          <div class="notif-header">
            <span>🔔 Thông Báo Gần Đây</span>
            <span class="badge badge-info">${unreadCount} mới</span>
          </div>
          <div class="notif-list">
            ${dropdownItemsHtml}
          </div>
          <div class="notif-footer">
            <a href="${notifUrl}">Xem tất cả thông báo chi tiết ➔</a>
          </div>
        </div>
      `;

      headerProfile.insertBefore(bellWrapper, headerProfile.firstChild);
    }
  }

  // Inject Floating Reset Button (Bottom Left Corner)
  function initFloatingResetButton() {
    if (document.getElementById('floating-reset-btn')) return;

    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'floating-reset-btn';
    resetBtn.id = 'floating-reset-btn';
    resetBtn.title = 'Xóa cache LocalStorage và khôi phục dữ liệu mẫu ban đầu';
    resetBtn.innerHTML = '🔄';

    document.body.appendChild(resetBtn);

    resetBtn.addEventListener('click', function () {
      if (confirm('Bạn có chắc chắn muốn reset toàn bộ dữ liệu mock trong LocalStorage về ban đầu?')) {
        resetMockStore();
      }
    });
  }

  // Sidebar Collapse Engine & Persistence
  function initSidebarCollapse() {
    const sidebar = document.querySelector('.app-sidebar');
    if (!sidebar) return;

    sidebar.querySelectorAll('.nav-link').forEach(link => {
      if (!link.querySelector('.nav-text')) {
        const iconNode = link.querySelector('.nav-icon');
        let textContent = '';
        link.childNodes.forEach(node => {
          if (node !== iconNode && node.nodeType === Node.TEXT_NODE) {
            textContent += node.textContent;
            node.textContent = '';
          }
        });
        if (textContent.trim()) {
          const span = document.createElement('span');
          span.className = 'nav-text';
          span.textContent = textContent.trim();
          link.appendChild(span);
        }
      }
    });

    if (!sidebar.querySelector('.sidebar-toggle-btn')) {
      const toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = 'sidebar-toggle-btn';
      toggleBtn.id = 'sidebar-toggle-btn';
      toggleBtn.title = 'Thu hẹp / Mở rộng Sidebar';
      toggleBtn.innerHTML = '◀';
      sidebar.appendChild(toggleBtn);

      toggleBtn.addEventListener('click', function () {
        const isCollapsed = sidebar.classList.toggle('collapsed');
        localStorage.setItem('dntu_sidebar_collapsed', isCollapsed ? 'true' : 'false');
      });
    }

    if (localStorage.getItem('dntu_sidebar_collapsed') === 'true') {
      sidebar.classList.add('collapsed');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHeaderNotificationBell();
    initFloatingResetButton();
    initSidebarCollapse();
  });

  window.DNTUCommon = {
    getMockStore,
    saveMockStore,
    resetMockStore,
    showToast,
    openModal,
    closeModal,
    previewPDF,
    getOfficialFormHTML,
    getNotificationPageUrl,
    initSidebarCollapse
  };
})();
