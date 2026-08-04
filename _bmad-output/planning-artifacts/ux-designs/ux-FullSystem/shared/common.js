/**
 * DNTU QLNCKH - COMMON UTILITIES, REACTIVE MOCK STORE & OFFICIAL FORM PDF ENGINE
 * Client-side Modal, Toast, Official DNTU Forms Renderer, LocalStorage Reactive Store Engine, Floating Reset & Notification Dropdown
 */

(function () {
  'use strict';

  // Seed Data for LocalStorage Reactive Mock Engine
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

  // Official DNTU Word Form Full Document Renderer Engine (100% Word Specs Match)
  function getOfficialFormHTML(formCode, title, data = {}) {
    const code = (formCode || 'BM01A').toUpperCase();
    const currentDate = new Date().toLocaleDateString('vi-VN');
    let bodyInner = '';

    if (code.includes('BM01A')) {
      bodyInner = `
        <div style="text-align: center; margin-bottom: 24px;">
          <table style="width: 100%; border: none; font-size: 12px; font-weight: bold; margin-bottom: 12px;">
            <tr>
              <td style="text-align: center; width: 45%;">
                TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐỒNG NAI<br>
                <span style="color: #AB1F24;">PHÒNG KHOA HỌC VÀ CÔNG NGHỆ</span><br>
                -------------------
              </td>
              <td style="text-align: center; width: 55%;">
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br>
                Độc lập – Tự do – Hạnh phúc<br>
                -------------------
              </td>
            </tr>
          </table>
          <h2 style="font-size: 17px; color: #AB1F24; margin: 12px 0 4px 0; text-transform: uppercase;">THUYẾT MINH ĐỀ TÀI NGHIÊN CỨU KHOA HỌC CẤP TRƯỜNG</h2>
          <p style="font-size: 12px; font-weight: bold; font-style: italic; color: #475569; margin: 0;">Mẫu BM01.A.QT.KHCN.02 — Dành cho Giảng viên / Nghiên cứu viên</p>
        </div>

        <div style="font-size: 13px; line-height: 1.6;">
          <h4 style="color: #AB1F24; border-bottom: 1px solid #CBD5E1; padding-bottom: 4px; margin-top: 16px;">I. THÔNG TIN CHUNG VỀ ĐỀ TÀI</h4>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 13px;">
            <tr><td style="padding: 6px; font-weight: bold; width: 28%;">1. Tên đề tài NCKH:</td><td style="padding: 6px; color: #AB1F24; font-weight: bold;">${data.title || 'Nghiên cứu ứng dụng Trí tuệ Nhân tạo trong phân loại nông sản tỉnh Đồng Nai'}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold;">2. Mã số quản lý:</td><td style="padding: 6px;">HS-2026-NCKH-001</td></tr>
            <tr><td style="padding: 6px; font-weight: bold;">3. Chủ nhiệm đề tài:</td><td style="padding: 6px;">TS. Trần Thị B (Mã GV: GV0892 - Học vị: Tiến sĩ - Chuyên ngành: CNTT)</td></tr>
            <tr><td style="padding: 6px; font-weight: bold;">4. Đơn vị chủ trì:</td><td style="padding: 6px;">Bộ môn Kỹ thuật Phần mềm — Khoa Công nghệ Thông tin DNTU</td></tr>
            <tr><td style="padding: 6px; font-weight: bold;">5. Nhóm thành viên phối hợp:</td><td style="padding: 6px;">ThS. Nguyễn Văn M (Khoa CNTT), ThS. Lê Thị N (Khoa Điện)</td></tr>
            <tr><td style="padding: 6px; font-weight: bold;">6. Kinh phí đề xuất:</td><td style="padding: 6px; font-weight: bold; color: #166534;">35,000,000 VNĐ (Ba mươi lăm triệu đồng)</td></tr>
            <tr><td style="padding: 6px; font-weight: bold;">7. Thời gian thực hiện:</td><td style="padding: 6px;">12 Tháng (Từ 01/09/2026 đến 31/08/2027)</td></tr>
          </table>

          <h4 style="color: #AB1F24; border-bottom: 1px solid #CBD5E1; padding-bottom: 4px; margin-top: 16px;">II. NỘI DUNG VÀ PHƯƠNG PHÁP NGHIÊN CỨU</h4>
          <p><strong>1. Tính cấp thiết của đề tài:</strong> Nông nghiệp Đồng Nai đóng vai trò nòng cốt với các loại trái cây xuất khẩu chủ lực. Việc phân loại thủ công tốn chi phí và độ chính xác không đồng đều. Đề tài ứng dụng mô hình Deep Learning YOLOv8 & CNN để tự động hóa phân loại hình ảnh với độ chính xác đạt trên 95%.</p>
          <p><strong>2. Mục tiêu nghiên cứu:</strong> Xây dựng bộ dữ liệu 10.000 hình ảnh nông sản Đồng Nai và huấn luyện mô hình trí tuệ nhân tạo phân loại thời gian thực.</p>
          <p><strong>3. Phương pháp nghiên cứu:</strong> Phương pháp thu thập dữ liệu thực địa, phương pháp học sâu Deep Learning và kiểm thử mô hình thực tế.</p>

          <h4 style="color: #AB1F24; border-bottom: 1px solid #CBD5E1; padding-bottom: 4px; margin-top: 16px;">III. SẢN PHẨM DỰ KIẾN CỦA ĐỀ TÀI</h4>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #CBD5E1; font-size: 12px; margin-bottom: 12px;">
            <thead>
              <tr style="background: #F1F5F9;">
                <th style="padding: 6px; border: 1px solid #CBD5E1;">STT</th>
                <th style="padding: 6px; border: 1px solid #CBD5E1;">Danh Mục Sản Phẩm Đăng Ký</th>
                <th style="padding: 6px; border: 1px solid #CBD5E1;">Yêu Cầu Chất Lượng / Chỉ Số Sáng Chế</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="padding: 6px; border: 1px solid #CBD5E1; text-align: center;">1</td><td style="padding: 6px; border: 1px solid #CBD5E1;">01 Bài báo khoa học đăng trên Tạp chí chuyên ngành / Hội thảo Quốc tế Scopus/ISSN</td><td style="padding: 6px; border: 1px solid #CBD5E1;">Đã được nhận đăng bài chính thức</td></tr>
              <tr><td style="padding: 6px; border: 1px solid #CBD5E1; text-align: center;">2</td><td style="padding: 6px; border: 1px solid #CBD5E1;">01 Phần mềm mô hình AI nhận diện nông sản thời gian thực</td><td style="padding: 6px; border: 1px solid #CBD5E1;">Chạy ổn định trên hệ thống Web/App Mobile</td></tr>
              <tr><td style="padding: 6px; border: 1px solid #CBD5E1; text-align: center;">3</td><td style="padding: 6px; border: 1px solid #CBD5E1;">Báo cáo tổng kết đề tài NCKH đầy đủ theo chuẩn BM10 DNTU</td><td style="padding: 6px; border: 1px solid #CBD5E1;">Nghiệm thu đạt mức Khá trở lên</td></tr>
            </tbody>
          </table>

          <h4 style="color: #AB1F24; border-bottom: 1px solid #CBD5E1; padding-bottom: 4px; margin-top: 16px;">IV. DỰ TOÁN KINH PHÍ CHI TIẾT</h4>
          <p>Kinh phí công lao động khoa học: 20.000.000 VNĐ | Vật tư máy móc: 10.000.000 VNĐ | Hội thảo khoa học: 5.000.000 VNĐ.</p>

          <div style="display: flex; justify-content: space-between; margin-top: 36px; text-align: center;">
            <div style="width: 45%;">
              <p style="font-weight: bold; margin-bottom: 4px;">TRƯỞNG KHOA / ĐƠN VỊ</p>
              <p style="font-size: 11px; color: #64748B;">(Thẩm định & Ký duyệt)</p>
              <div style="margin-top: 40px; font-weight: bold; color: #166534;">✓ PGS.TS. Phạm Văn D (Đã ký)</div>
            </div>
            <div style="width: 45%;">
              <p style="font-weight: bold; margin-bottom: 4px;">CHỦ NHIỆM ĐỀ TÀI</p>
              <p style="font-size: 11px; color: #64748B;">(Ký, ghi rõ họ tên)</p>
              <div style="margin-top: 40px; font-weight: bold; color: #166534;">✓ TS. Trần Thị B (Đã ký)</div>
            </div>
          </div>
        </div>
      `;
    } else if (code.includes('BM01B')) {
      bodyInner = `
        <div style="text-align: center; margin-bottom: 24px;">
          <table style="width: 100%; border: none; font-size: 12px; font-weight: bold; margin-bottom: 12px;">
            <tr>
              <td style="text-align: center; width: 45%;">TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐỒNG NAI<br><span style="color: #AB1F24;">PHÒNG KHOA HỌC VÀ CÔNG NGHỆ</span></td>
              <td style="text-align: center; width: 55%;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br>Độc lập – Tự do – Hạnh phúc</td>
            </tr>
          </table>
          <h2 style="font-size: 17px; color: #AB1F24; margin: 12px 0 4px 0;">THUYẾT MINH ĐỀ TÀI NCKH SINH VIÊN (BM01B)</h2>
          <p style="font-size: 12px; font-style: italic; color: #475569;">Mẫu BM01.B.QT.KHCN.02 — Dành cho Sinh viên DNTU</p>
        </div>

        <div style="font-size: 13px; line-height: 1.6;">
          <p><strong>1. Tên đề tài NCKH Sinh viên:</strong> ${data.title || 'Xây dựng ứng dụng di động hỗ trợ sinh viên DNTU đăng ký NCKH'}</p>
          <p><strong>2. Sinh viên Chủ nhiệm (Nhóm trưởng):</strong> Lê Văn C (MSSV: 22DTH1234 - Lớp 22DTH1)</p>
          <p><strong>3. Giảng viên hướng dẫn (GVHD):</strong> TS. Trần Thị B (Bộ môn KTPM - Khoa CNTT)</p>
          <p><strong>4. Kinh phí đề xuất:</strong> 15,000,000 VNĐ (Mười lăm triệu đồng)</p>
          <p><strong>5. Mục tiêu & Nội dung:</strong> Thiết kế ứng dụng di động iOS/Android giúp sinh viên tra cứu đợt NCKH, lập BM01B và nộp hồ sơ trực tuyến tới GVHD.</p>

          <div style="display: flex; justify-content: space-between; margin-top: 36px; text-align: center;">
            <div style="width: 45%;">
              <p style="font-weight: bold; margin-bottom: 4px;">GIẢNG VIÊN HƯỚNG DẪN (GVHD)</p>
              <p style="font-size: 11px; color: #64748B;">(Duyệt chấp nhận hướng dẫn)</p>
              <div style="margin-top: 40px; font-weight: bold; color: #166534;">✓ TS. Trần Thị B (Đã ký)</div>
            </div>
            <div style="width: 45%;">
              <p style="font-weight: bold; margin-bottom: 4px;">SINH VIÊN CHỦ NHIỆM</p>
              <p style="font-size: 11px; color: #64748B;">(Ký & ghi rõ họ tên)</p>
              <div style="margin-top: 40px; font-weight: bold; color: #166534;">✓ Lê Văn C (Đã ký)</div>
            </div>
          </div>
        </div>
      `;
    } else if (code.includes('BM02')) {
      bodyInner = `
        <div style="text-align: center; margin-bottom: 20px;">
          <h4 style="margin: 0; font-size: 13px; font-weight: bold;">TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐỒNG NAI</h4>
          <p style="margin: 2px 0; font-size: 11px; font-weight: bold;">HỘI ĐỒNG KHOA HỌC XÉT DUYỆT HỒ SƠ ĐỀ TÀI</p>
          <div style="border-bottom: 2px solid #AB1F24; width: 140px; margin: 6px auto 16px auto;"></div>
          <h2 style="font-size: 16px; color: #AB1F24; margin: 0; text-transform: uppercase;">PHIẾU ĐÁNH GIÁ CÁ NHÂN XÉT DUYỆT HỒ SƠ (BM02)</h2>
          <p style="font-size: 12px; font-style: italic; color: #475569; margin-top: 4px;">Mẫu BM02.QT.KHCN.02 — Thuộc Mốc chốt 100% Phiếu hợp lệ</p>
        </div>
        <p style="font-size: 13px;"><strong>Họ tên thành viên chấm:</strong> ${data.evaluator || 'GS.TS. Hoàng Văn E (Chủ tịch HĐ)'}</p>
        <p style="font-size: 13px;"><strong>Tên đề tài đánh giá:</strong> Nghiên cứu ứng dụng AI trong phân loại nông sản tỉnh Đồng Nai</p>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin: 16px 0; border: 1px solid #CBD5E1;">
          <thead>
            <tr style="background: #F1F5F9; color: #1E293B;">
              <th style="padding: 8px; border: 1px solid #CBD5E1;">Nội dung tiêu chí đánh giá theo BM02 chuẩn DNTU</th>
              <th style="padding: 8px; border: 1px solid #CBD5E1; width: 90px;">Điểm tối đa</th>
              <th style="padding: 8px; border: 1px solid #CBD5E1; width: 90px;">Điểm chấm</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding: 6px; border: 1px solid #CBD5E1;">1. Tính cấp thiết & Mục tiêu nghiên cứu đề tài NCKH</td><td style="padding: 6px; border: 1px solid #CBD5E1; text-align: center;">20</td><td style="padding: 6px; border: 1px solid #CBD5E1; text-align: center; font-weight: bold;">18</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #CBD5E1;">2. Tổng quan tình hình nghiên cứu & Phương pháp AI</td><td style="padding: 6px; border: 1px solid #CBD5E1; text-align: center;">25</td><td style="padding: 6px; border: 1px solid #CBD5E1; text-align: center; font-weight: bold;">22</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #CBD5E1;">3. Năng lực nhóm nghiên cứu & Tính khả thi sản phẩm</td><td style="padding: 6px; border: 1px solid #CBD5E1; text-align: center;">25</td><td style="padding: 6px; border: 1px solid #CBD5E1; text-align: center; font-weight: bold;">23</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #CBD5E1;">4. Dự toán kinh phí & Đóng góp ứng dụng thực tế</td><td style="padding: 6px; border: 1px solid #CBD5E1; text-align: center;">30</td><td style="padding: 6px; border: 1px solid #CBD5E1; text-align: center; font-weight: bold;">26</td></tr>
            <tr style="background: #FEE2E2;"><td style="padding: 8px; border: 1px solid #CBD5E1; font-weight: bold;">TỔNG CỘNG ĐIỂM ĐÁNH GIÁ CÁ NHÂN</td><td style="padding: 8px; border: 1px solid #CBD5E1; text-align: center; font-weight: bold;">100</td><td style="padding: 8px; border: 1px solid #CBD5E1; text-align: center; font-weight: bold; color: #991B1B;">${data.score || 89} / 100</td></tr>
          </tbody>
        </table>
        <p style="font-size: 13px; font-weight: bold;">KẾT LUẬN CÁ NHÂN: <span style="color: #166534;">✓ ĐỒNG Ý CHO THỰC HIỆN ĐỀ TÀI (ĐẠT XÉT DUYỆT)</span></p>
      `;
    } else if (code.includes('BM03')) {
      bodyInner = `
        <div style="text-align: center; margin-bottom: 20px;">
          <h4 style="margin: 0; font-size: 13px; font-weight: bold;">TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐỒNG NAI</h4>
          <p style="margin: 2px 0; font-size: 11px; font-weight: bold;">HỘI ĐỒNG KHOA HỌC CẤP TRƯỜNG</p>
          <div style="border-bottom: 2px solid #AB1F24; width: 140px; margin: 6px auto 16px auto;"></div>
          <h2 style="font-size: 16px; color: #AB1F24; margin: 0; text-transform: uppercase;">BIÊN BẢN CUỘC HỌP HỘI ĐỒNG XÉT DUYỆT HỒ SƠ (BM03)</h2>
          <p style="font-size: 12px; font-style: italic; color: #475569; margin-top: 4px;">Số: 03/BB-HĐ-2026 | Ngày họp: ${currentDate}</p>
        </div>
        <p style="font-size: 13px;"><strong>1. Tên đề tài xét duyệt:</strong> Nghiên cứu ứng dụng Trí tuệ Nhân tạo trong phân loại nông sản tỉnh Đồng Nai</p>
        <p style="font-size: 13px;"><strong>2. Kết quả tổng hợp phiếu (Mốc chốt 100%):</strong> 5/5 Phiếu hợp lệ đồng ý (100% Đồng ý thông qua)</p>
        <p style="font-size: 13px;"><strong>3. Điểm trung bình cộng Hội đồng:</strong> <strong style="color: #AB1F24;">88.6 / 100 điểm</strong></p>
        <p style="font-size: 13px;"><strong>4. Kết luận Hội đồng:</strong> <strong style="color: #166534;">ĐỒNG Ý PHÊ DUYỆT THỰC HIỆN ĐỀ TÀI (ĐẠT)</strong></p>
        <div style="display: flex; justify-content: space-between; margin-top: 36px; text-align: center;">
          <div style="width: 45%; border: 1px dashed #475569; padding: 12px; border-radius: 6px; background: #fff;">
            <p style="font-weight: bold; margin-bottom: 4px;">THƯ KÝ HỘI ĐỒNG</p>
            <p style="font-size: 11px; color: #64748B;">(Ký thứ 1)</p>
            <div style="margin-top: 30px; font-weight: bold; color: #166534;">✓ ThS. Vũ Thị G (Đã ký)</div>
          </div>
          <div style="width: 45%; border: 1px dashed #475569; padding: 12px; border-radius: 6px; background: #fff;">
            <p style="font-weight: bold; margin-bottom: 4px;">CHỦ TỊCH HỘI ĐỒNG</p>
            <p style="font-size: 11px; color: #64748B;">(Duyệt & Ký thứ 2)</p>
            <div style="margin-top: 30px; font-weight: bold; color: #166534;">✓ GS.TS. Hoàng Văn E (Đã ký)</div>
          </div>
        </div>
      `;
    } else {
      bodyInner = `
        <div style="text-align: center; margin-bottom: 20px;">
          <h4 style="margin: 0; font-size: 13px; font-weight: bold;">TRƯỜNG ĐẠI HỌC CÔNG NGHỆ ĐỒNG NAI</h4>
          <p style="margin: 2px 0; font-size: 11px; font-weight: bold; text-transform: uppercase;">PHÒNG KHOA HỌC VÀ CÔNG NGHỆ</p>
          <div style="border-bottom: 2px solid #AB1F24; width: 140px; margin: 6px auto 16px auto;"></div>
          <h2 style="font-size: 16px; color: #AB1F24; margin: 0; text-transform: uppercase;">BIỂU MẪU ĐIỆN TỬ HÀNH CHÍNH: ${code}</h2>
          <p style="font-size: 12px; font-style: italic; color: #475569; margin-top: 4px;">${title}</p>
        </div>
        <div style="background: #fff; padding: 16px; border: 1px solid #CBD5E1; border-radius: 6px; font-size: 13px; line-height: 1.6;">
          <p><strong>Mã Hồ Sơ Quản Lý:</strong> HS-2026-NCKH-001</p>
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
      const folderMap = {
        'giang-vien': 'giang-vien',
        'p-khcn': 'p-khcn',
        'truong-don-vi': 'truong-don-vi',
        'chu-tich-hoi-dong': 'chu-tich-hoi-dong',
        'thanh-vien-hoi-dong': 'thanh-vien-hoi-dong',
        'thu-ky-hoi-dong': 'thu-ky-hoi-dong',
        'sinh-vien': 'sinh-vien',
        'quan-tri-vien': 'quan-tri-vien'
      };
      return '../' + (folderMap[activeRole] || 'giang-vien') + '/' + targetPage;
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
            <div class="notif-item-title">🔔 Đợt 1 NCKH 2026 Đang Mở</div>
            <div class="notif-item-desc">Phòng KHCN đã công bố đợt tiếp nhận hồ sơ BM01A.</div>
            <div class="notif-item-time">Vừa xong</div>
          </div>
          <div class="notif-item">
            <div class="notif-item-title">📢 Thông báo phê duyệt vai trò</div>
            <div class="notif-item-desc">Tài khoản của bạn đã được xác minh thành công.</div>
            <div class="notif-item-time">1 giờ trước</div>
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
