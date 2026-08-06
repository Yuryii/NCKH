/**
 * MODULE 02: ĐỀ TÀI NCKH CẤP TỈNH, BỘ, NHÀ NƯỚC & HỢP TÁC DOANH NGHIỆP
 * LocalStorage Reactive Engine Manager (Rule 0) for Module 02
 */

(function () {
  'use strict';

  // Seed Dataset for Module 02
  const SEED_DATA_M02 = {
    projects: [
      {
        id: 'DA-2026-TINH-001',
        title: 'Nghiên cứu xây dựng mô hình nông nghiệp thông minh thích ứng biến đổi khí hậu tỉnh Đồng Nai',
        level: 'Cấp Tỉnh',
        grantAgency: 'Sở KH&CN tỉnh Đồng Nai',
        leader: 'TS. Trần Thị B',
        unit: 'Khoa CNTT DNTU',
        totalBudget: 1200000000,
        disbursedBudget: 600000000,
        status: 'ĐANG_THỰC_HIỆN',
        bm01Status: 'ĐÃ_NỘP_BM01',
        bm02Status: 'CHƯA_ĐỀ_NGHỊ',
        bm03Status: 'CHƯA_THÀNH_LẬP',
        bm04Status: 'CHƯA_NGHIỆM_THU',
        bm05Status: 'CHƯA_THANH_LÝ',
        startDate: '2025-01-15',
        endDate: '2026-12-31'
      },
      {
        id: 'DA-2026-BO-002',
        title: 'Nghiên cứu chế tạo vật liệu nano ứng dụng xử lý nước thải công nghiệp vùng Đông Nam Bộ',
        level: 'Cấp Bộ',
        grantAgency: 'Bộ Giáo dục và Đào tạo',
        leader: 'PGS.TS. Phạm Văn D',
        unit: 'Khoa Công nghệ Hóa - Môi trường',
        totalBudget: 2500000000,
        disbursedBudget: 1500000000,
        status: 'CHỜ_NGHIỆM_THU_CƠ_SỞ',
        bm01Status: 'ĐÃ_DUYỆT_BM01',
        bm02Status: 'ĐÃ_ĐỀ_NGHỊ_BM02',
        bm03Status: 'ĐÃ_THÀNH_LẬP_BM03',
        bm04Status: 'CHỜ_CHỦ_TỊCH_KÝ',
        bm05Status: 'CHƯA_THANH_LÝ',
        startDate: '2024-06-01',
        endDate: '2026-06-30'
      }
    ],
    councilsM02: [
      {
        id: 'HD-M02-BO-002',
        projectId: 'DA-2026-BO-002',
        name: 'Hội đồng Nghiệm thu Cấp cơ sở Đề tài Cấp Bộ DA-2026-BO-002',
        chair: 'GS.TS. Hoàng Văn E',
        secretary: 'ThS. Vũ Thị G',
        reviewers: ['TS. Đặng Văn F', 'PGS.TS. Lê Văn K', 'TS. Nguyễn Thị P'],
        votes: [
          { voter: 'TS. Đặng Văn F', score: 92, vote: 'ĐẠT_XUẤT_SẮC' },
          { voter: 'PGS.TS. Lê Văn K', score: 88, vote: 'ĐẠT' }
        ],
        meetingStatus: 'OPEN',
        bm04Status: 'THƯ_KÝ_ĐÃ_KÝ'
      }
    ],
    notificationsM02: [
      { id: 'nm1', targetRole: 'giang-vien', title: 'Nhắc nhở nộp Báo cáo tiến độ BM01 Cấp Tỉnh', message: 'Sở KHCN Đồng Nai yêu cầu nộp Báo cáo tiến độ BM01.QT.KHCN.04 trước ngày 30/08/2026.', time: '15 phút trước', read: false },
      { id: 'nm2', targetRole: 'p-khcn', title: 'Hồ sơ đề nghị nghiệm thu BM02 Cấp Bộ mới', message: 'PGS.TS. Phạm Văn D vừa nộp Phiếu đề nghị nghiệm thu cấp cơ sở cho DA-2026-BO-002.', time: '2 giờ trước', read: false }
    ]
  };

  function getStoreM02() {
    const raw = localStorage.getItem('dntu_mock_store_m02');
    if (!raw) {
      localStorage.setItem('dntu_mock_store_m02', JSON.stringify(SEED_DATA_M02));
      return JSON.parse(JSON.stringify(SEED_DATA_M02));
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      localStorage.setItem('dntu_mock_store_m02', JSON.stringify(SEED_DATA_M02));
      return JSON.parse(JSON.stringify(SEED_DATA_M02));
    }
  }

  function saveStoreM02(data) {
    localStorage.setItem('dntu_mock_store_m02', JSON.stringify(data));
  }

  // 1. Submit Progress Report BM01
  function submitProgressReportBM01(projectId, reportData) {
    const s = getStoreM02();
    const proj = s.projects.find(p => p.id === projectId);
    if (proj) {
      proj.bm01Status = 'ĐÃ_NỘP_BM01';
      s.notificationsM02.unshift({
        id: 'nm' + Date.now(),
        targetRole: 'truong-don-vi',
        title: 'Báo cáo tiến độ BM01 dự án ngoài trường mới',
        message: `${proj.leader} vừa nộp Báo cáo tiến độ BM01 cho dự án ${projectId}.`,
        time: 'Vừa xong',
        read: false
      });
      saveStoreM02(s);
      DNTUCommon.showToast(`Đã NỘP Báo cáo tiến độ BM01.QT.KHCN.04 cho dự án ${projectId}!`, 'success');
    }
  }

  // 2. Submit Acceptance Request BM02
  function submitAcceptanceRequestBM02(projectId) {
    const s = getStoreM02();
    const proj = s.projects.find(p => p.id === projectId);
    if (proj) {
      proj.bm02Status = 'ĐÃ_ĐỀ_NGHỊ_BM02';
      proj.status = 'CHỜ_NGHIỆM_THU_CƠ_SỞ';
      s.notificationsM02.unshift({
        id: 'nm' + Date.now(),
        targetRole: 'p-khcn',
        title: 'Đề nghị nghiệm thu cấp cơ sở mới (BM02)',
        message: `${proj.leader} đề nghị nghiệm thu cấp cơ sở dự án ${projectId}.`,
        time: 'Vừa xong',
        read: false
      });
      saveStoreM02(s);
      DNTUCommon.showToast(`Đã nộp Phiếu đề nghị nghiệm thu cấp cơ sở BM02.QT.KHCN.04 cho dự án ${projectId}!`, 'success');
    }
  }

  // 3. P.KHCN Creates Acceptance Council BM03
  function createCouncilBM03(projectId, chairName, secretaryName) {
    const s = getStoreM02();
    const proj = s.projects.find(p => p.id === projectId);
    if (proj) {
      proj.bm03Status = 'ĐÃ_THÀNH_LẬP_BM03';
      s.notificationsM02.unshift({
        id: 'nm' + Date.now(),
        targetRole: 'chu-tich-hoi-dong',
        title: 'Phân công Chủ tịch HĐ Nghiệm thu ngoài trường',
        message: `P.KHCN đã ban hành Quyết định BM03 phân công bạn làm Chủ tịch HĐ nghiệm thu ${projectId}.`,
        time: 'Vừa xong',
        read: false
      });
      saveStoreM02(s);
      DNTUCommon.showToast(`Đã ban hành Quyết định BM03.QT.KHCN.04 thành lập HĐ nghiệm thu ${projectId}!`, 'success');
    }
  }

  // 4. Secretary & Chair Sign BM04 Minutes
  function signMinutesBM04(projectId, isChair) {
    const s = getStoreM02();
    const proj = s.projects.find(p => p.id === projectId);
    if (proj) {
      if (isChair) {
        proj.bm04Status = 'ĐỦ_2_CHỮ_KÝ_BM04';
        s.notificationsM02.unshift({
          id: 'nm' + Date.now(),
          targetRole: 'p-khcn',
          title: 'Biên bản BM04 đã đủ 2 chữ ký',
          message: `Chủ tịch HĐ đã ký thứ 2 hoàn tất Biên bản nghiệm thu BM04 cho ${projectId}.`,
          time: 'Vừa xong',
          read: false
        });
        DNTUCommon.showToast(`Chủ tịch HĐ đã KÝ THỨ 2 hoàn tất Biên bản BM04.QT.KHCN.04!`, 'success');
      } else {
        proj.bm04Status = 'THƯ_KÝ_ĐÃ_KÝ';
        s.notificationsM02.unshift({
          id: 'nm' + Date.now(),
          targetRole: 'chu-tich-hoi-dong',
          title: 'Thư ký nộp Biên bản BM04 trình ký',
          message: `Thư ký HĐ đã ký thứ 1 trên Biên bản BM04 cho ${projectId}.`,
          time: 'Vừa xong',
          read: false
        });
        DNTUCommon.showToast(`Thư ký HĐ đã LẬP & KÝ THỨ 1 trên Biên bản BM04.QT.KHCN.04!`, 'success');
      }
      saveStoreM02(s);
    }
  }

  // 5. P.KHCN Issues Acceptance Certificate & Liquidation BM05
  function issueCertificateBM05(projectId) {
    const s = getStoreM02();
    const proj = s.projects.find(p => p.id === projectId);
    if (proj) {
      proj.bm05Status = 'ĐÃ_THANH_LÝ_BM05';
      proj.status = 'ĐÃ_NGHIỆM_THU_HOÀN_TẤT';
      s.notificationsM02.unshift({
        id: 'nm' + Date.now(),
        targetRole: 'giang-vien',
        title: 'Cấp Giấy chứng nhận nghiệm thu & Thanh lý Hợp đồng (BM05)',
        message: `Trường ĐH Công nghệ Đồng Nai đã cấp Giấy chứng nhận BM05 cho dự án ${projectId}.`,
        time: 'Vừa xong',
        read: false
      });
      saveStoreM02(s);
      DNTUCommon.showToast(`P.KHCN đã CẤP GIẤY CHỨNG NHẬN BM05.QT.KHCN.04 & Thanh lý Hợp đồng ${projectId}!`, 'success');
    }
  }

  window.DNTUModule02 = {
    getStoreM02,
    saveStoreM02,
    submitProgressReportBM01,
    submitAcceptanceRequestBM02,
    createCouncilBM03,
    signMinutesBM04,
    issueCertificateBM05
  };
})();
