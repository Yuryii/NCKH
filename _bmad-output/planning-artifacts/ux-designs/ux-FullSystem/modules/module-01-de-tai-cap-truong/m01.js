/**
 * MODULE 01: ĐỀ TÀI NCKH CẤP TRƯỜNG - REACTIVE MOCK STORE CONTROLLER (RULE 0)
 * Central logic state engine for Module 01 handling 100% interactive UI state mutations in LocalStorage
 */

(function () {
  'use strict';

  // Helper to retrieve store
  function store() {
    return DNTUCommon.getMockStore();
  }

  // 1. Submit BM01A Proposal (Giảng viên)
  function submitBM01A(title, budget, duration) {
    const s = store();
    const newId = 'HS-2026-NCKH-' + String(s.proposals.length + 1).padStart(3, '0');
    const newProp = {
      id: newId,
      title: title || 'Nghiên cứu ứng dụng Trí tuệ Nhân tạo trong phân loại nông sản tỉnh Đồng Nai',
      author: 'TS. Trần Thị B',
      type: 'Giảng viên',
      unit: 'Khoa CNTT',
      budget: parseInt(budget || 35000000),
      periodId: 'PER-2026-01',
      status: 'CHƯA_DUYỆT_KHOA',
      submittedDate: new Date().toISOString().split('T')[0]
    };

    s.proposals.unshift(newProp);

    s.notifications.unshift({
      id: 'n' + Date.now(),
      targetRole: 'truong-don-vi',
      title: 'Hồ sơ BM01A mới chờ duyệt Khoa',
      message: `TS. Trần Thị B vừa nộp hồ sơ mới ${newId} (${newProp.title}).`,
      time: 'Vừa xong',
      read: false
    });

    s.auditLogs.unshift({
      id: 'a' + Date.now(),
      timestamp: new Date().toLocaleString('vi-VN'),
      actor: 'TS. Trần Thị B',
      role: 'Giảng viên',
      action: 'Nộp Thuyết minh BM01A',
      target: newId,
      detail: 'Nộp hồ sơ trực tuyến cho Trưởng Khoa CNTT thẩm định'
    });

    DNTUCommon.saveMockStore(s);
    DNTUCommon.showToast(`Đã nộp thành công Thuyết minh BM01A (Mã: ${newId}) cho Trưởng Khoa!`, 'success');
  }

  // 2. Submit BM01B Proposal (Sinh viên)
  function submitBM01B(title, advisorName, budget) {
    const s = store();
    const newId = 'HS-2026-NCKH-SV-' + String(s.proposals.length + 1).padStart(3, '0');
    const newProp = {
      id: newId,
      title: title || 'Xây dựng ứng dụng di động hỗ trợ sinh viên DNTU đăng ký NCKH',
      author: 'Lê Văn C (SV)',
      advisor: advisorName || 'TS. Trần Thị B',
      type: 'Sinh viên',
      unit: 'Khoa CNTT',
      budget: parseInt(budget || 15000000),
      periodId: 'PER-2026-01',
      status: 'CHỜ_GVHD_DUYỆT',
      submittedDate: new Date().toISOString().split('T')[0]
    };

    s.proposals.unshift(newProp);

    s.notifications.unshift({
      id: 'n' + Date.now(),
      targetRole: 'giang-vien',
      title: 'Hồ sơ BM01B Sinh viên nhờ GVHD duyệt',
      message: `Sinh viên Lê Văn C vừa gán bạn làm GVHD cho đề tài ${newId}.`,
      time: 'Vừa xong',
      read: false
    });

    s.auditLogs.unshift({
      id: 'a' + Date.now(),
      timestamp: new Date().toLocaleString('vi-VN'),
      actor: 'Lê Văn C (SV)',
      role: 'Sinh viên',
      action: 'Nộp Thuyết minh BM01B',
      target: newId,
      detail: 'Nộp hồ sơ BM01B cho GVHD TS. Trần Thị B'
    });

    DNTUCommon.saveMockStore(s);
    DNTUCommon.showToast(`Đã nộp Thuyết minh BM01B (${newId}) cho GVHD thành công!`, 'success');
  }

  // 3. GVHD Approves Student BM01B (Giảng viên)
  function advisorApproveBM01B(proposalId) {
    const s = store();
    const prop = s.proposals.find(p => p.id === proposalId);
    if (prop) {
      prop.status = 'CHƯA_DUYỆT_KHOA';
      s.notifications.unshift({
        id: 'n' + Date.now(),
        targetRole: 'sinh-vien',
        title: 'GVHD Đã Chấp Nhận Hướng Dẫn',
        message: `GVHD TS. Trần Thị B đã duyệt chấp nhận hướng dẫn cho đề tài ${proposalId}.`,
        time: 'Vừa xong',
        read: false
      });
      s.auditLogs.unshift({
        id: 'a' + Date.now(),
        timestamp: new Date().toLocaleString('vi-VN'),
        actor: 'TS. Trần Thị B',
        role: 'Giảng viên (GVHD)',
        action: 'Duyệt chấp nhận BM01B Sinh viên',
        target: proposalId,
        detail: 'Chấp nhận hướng dẫn chuyên môn và chuyển Khoa duyệt'
      });
      DNTUCommon.saveMockStore(s);
      DNTUCommon.showToast(`Đã chấp nhận Hướng dẫn đề tài Sinh viên ${proposalId}!`, 'success');
    }
  }

  // 4. Trưởng Khoa Approves BM01A/BM01B (Trưởng Đơn vị)
  function khoaApproveProposal(proposalId) {
    const s = store();
    const prop = s.proposals.find(p => p.id === proposalId);
    if (prop) {
      prop.status = 'KHOA_ĐÃ_DUYỆT';
      s.notifications.unshift({
        id: 'n' + Date.now(),
        targetRole: 'p-khcn',
        title: 'Hồ sơ đã được Trưởng Khoa duyệt',
        message: `Hồ sơ ${proposalId} đã qua thẩm định tuyến đầu Trưởng Khoa CNTT. Sẵn sàng lập Hội đồng.`,
        time: 'Vừa xong',
        read: false
      });
      s.auditLogs.unshift({
        id: 'a' + Date.now(),
        timestamp: new Date().toLocaleString('vi-VN'),
        actor: 'PGS.TS. Phạm Văn D',
        role: 'Trưởng Khoa CNTT',
        action: 'Duyệt chấp thuận BM01A tuyến đầu',
        target: proposalId,
        detail: 'Xác nhận tính khả thi & cơ sở vật chất đơn vị'
      });
      DNTUCommon.saveMockStore(s);
      DNTUCommon.showToast(`Trưởng Khoa đã DUYỆT CHẤP THUẬN hồ sơ ${proposalId}! Đã chuyển P.KHCN.`, 'success');
    }
  }

  // 5. Trưởng Khoa Requests Edit
  function khoaRejectProposal(proposalId, reason) {
    const s = store();
    const prop = s.proposals.find(p => p.id === proposalId);
    if (prop) {
      prop.status = 'KHOA_YÊU_CẦU_SỬA';
      s.notifications.unshift({
        id: 'n' + Date.now(),
        targetRole: 'giang-vien',
        title: 'Trưởng Khoa Yêu Cầu Chỉnh Sửa Hồ Sơ',
        message: `Trưởng Khoa yêu cầu sửa hồ sơ ${proposalId}: ${reason}`,
        time: 'Vừa xong',
        read: false
      });
      s.auditLogs.unshift({
        id: 'a' + Date.now(),
        timestamp: new Date().toLocaleString('vi-VN'),
        actor: 'PGS.TS. Phạm Văn D',
        role: 'Trưởng Khoa CNTT',
        action: 'Yêu cầu sửa hồ sơ BM01A',
        target: proposalId,
        detail: reason
      });
      DNTUCommon.saveMockStore(s);
      DNTUCommon.showToast(`Đã trả hồ sơ ${proposalId} về cho Chủ nhiệm đề tài kèm lý do!`, 'warning');
    }
  }

  // 6. Council Vote Submission (BM02)
  function submitBM02Score(voterName, voterRole, score) {
    const s = store();
    s.auditLogs.unshift({
      id: 'a' + Date.now(),
      timestamp: new Date().toLocaleString('vi-VN'),
      actor: voterName,
      role: voterRole,
      action: 'Nộp Phiếu cá nhân BM02',
      target: 'HD-2026-CNTT-01',
      detail: `Chấm ${score}/100 điểm, Đồng ý thông qua`
    });

    s.notifications.unshift({
      id: 'n' + Date.now(),
      targetRole: 'thu-ky-hoi-dong',
      title: 'Phiếu chấm BM02 mới',
      message: `${voterName} vừa nộp Phiếu chấm điểm cá nhân BM02 (${score}/100).`,
      time: 'Vừa xong',
      read: false
    });

    DNTUCommon.saveMockStore(s);
    DNTUCommon.showToast(`Thành viên ${voterName} đã NỘP PHIẾU BM02 (${score} điểm) vào mốc chốt thành công!`, 'success');
  }

  // 7. Secretary Signs BM03
  function secretarySignBM03() {
    const s = store();
    s.auditLogs.unshift({
      id: 'a' + Date.now(),
      timestamp: new Date().toLocaleString('vi-VN'),
      actor: 'ThS. Vũ Thị G',
      role: 'Thư ký HĐ',
      action: 'Lập & Ký Biên bản BM03 (Ký số 1)',
      target: 'HS-2026-NCKH-001',
      detail: 'Mốc 100% phiếu hợp lệ (5/5 phiếu), ĐTB: 88.6/100'
    });

    s.notifications.unshift({
      id: 'n' + Date.now(),
      targetRole: 'chu-tich-hoi-dong',
      title: 'Thư ký đã nộp Biên bản BM03 chờ ký thứ 2',
      message: 'ThS. Vũ Thị G vừa nộp Biên bản BM03 đã ký số 1. Mời Chủ tịch HĐ vào duyệt ký thứ 2.',
      time: 'Vừa xong',
      read: false
    });

    DNTUCommon.saveMockStore(s);
    DNTUCommon.showToast('Thư ký HĐ ThS. Vũ Thị G đã LẬP & KÝ THỨ 1 trên Biên bản BM03!', 'success');
  }

  // 8. Chair Signs BM03 (Second Signature)
  function chairSignBM03() {
    const s = store();
    s.auditLogs.unshift({
      id: 'a' + Date.now(),
      timestamp: new Date().toLocaleString('vi-VN'),
      actor: 'GS.TS. Hoàng Văn E',
      role: 'Chủ tịch HĐ',
      action: 'Duyệt ký thứ 2 trên Biên bản BM03',
      target: 'HS-2026-NCKH-001',
      detail: 'Hoàn tất đủ 2 chữ ký pháp lý trên BM03'
    });

    s.notifications.unshift({
      id: 'n' + Date.now(),
      targetRole: 'p-khcn',
      title: 'Biên bản BM03 đã đủ 2 chữ ký',
      message: 'GS.TS. Hoàng Văn E vừa ký thứ 2 hoàn tất Biên bản BM03. P.KHCN sẵn sàng ra Quyết định BM04.',
      time: 'Vừa xong',
      read: false
    });

    DNTUCommon.saveMockStore(s);
    DNTUCommon.showToast('Chủ tịch HĐ GS.TS. Hoàng Văn E đã DUYỆT KÝ CHỮ KÝ THỨ 2 lên BM03!', 'success');
  }

  // 9. P.KHCN Issues Official Decision (BM04)
  function pkhcnIssueDecision(proposalId) {
    const s = store();
    const prop = s.proposals.find(p => p.id === proposalId);
    if (prop) {
      prop.status = 'ĐÃ_RA_QUYẾT_ĐỊNH_BM04';
      s.auditLogs.unshift({
        id: 'a' + Date.now(),
        timestamp: new Date().toLocaleString('vi-VN'),
        actor: 'Nguyễn Văn A',
        role: 'P.KHCN',
        action: 'Ban hành Quyết định phê duyệt (BM04)',
        target: proposalId,
        detail: 'Cấp kinh phí 35,000,000 VNĐ và mở Hợp đồng giao khoán BM05'
      });
      s.notifications.unshift({
        id: 'n' + Date.now(),
        targetRole: 'giang-vien',
        title: 'Đề Tài Được Phê Duyệt Thực Hiện (BM04)',
        message: `Phòng KHCN đã ban hành Quyết định BM04 phê duyệt thực hiện đề tài ${proposalId}.`,
        time: 'Vừa xong',
        read: false
      });
      DNTUCommon.saveMockStore(s);
      DNTUCommon.showToast(`P.KHCN đã BAN HÀNH Quyết định BM04 phê duyệt thực hiện ${proposalId}!`, 'success');
    }
  }

  // Expose methods globally
  window.DNTUModule01 = {
    submitBM01A,
    submitBM01B,
    advisorApproveBM01B,
    khoaApproveProposal,
    khoaRejectProposal,
    submitBM02Score,
    secretarySignBM03,
    chairSignBM03,
    pkhcnIssueDecision
  };
})();
