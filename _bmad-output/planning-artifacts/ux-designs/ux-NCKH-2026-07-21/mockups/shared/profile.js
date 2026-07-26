(() => {
  'use strict';

  const STORAGE_KEY_PREFIX = 'NCKH_PROFILE_STATE_';

  const MOCK_PROFILES = {
    qt: {
      roleTitle: 'Quản trị viên Hệ thống',
      name: 'Quỳnh Anh',
      code: 'ADMIN-2026-001',
      email: 'quynhanh.admin@dntu.edu.vn',
      dept: 'Phòng Quản trị Hệ thống & Công nghệ Thông tin',
      title: 'Quản trị viên Cao cấp',
      expertise: 'An toàn thông tin, Quản trị Phân quyền SSO & PKI',
      pkiKey: 'PKI-DNTU-8849-2026-ADMIN',
      sidebarNav: [
        { label: 'Việc cần làm', href: '../quan-tri-vien/01-viec-can-lam.html' },
        { label: 'Danh sách Tài khoản', href: '../quan-tri-vien/02-danh-sach-tai-khoan.html' },
        { label: 'Duyệt Yêu cầu Vai trò', href: '../quan-tri-vien/03-duyet-vai-tro.html' },
        { label: 'Cấp tài khoản P-KHCN/Khoa', href: '../quan-tri-vien/04-tao-tai-khoan-pkhcn.html' },
        { label: 'Bảo mật & Khóa tài khoản', href: '../quan-tri-vien/05-bao-mat-tai-khoan.html' },
        { label: 'Audit Log Admin', href: '../quan-tri-vien/06-audit-tai-khoan.html' },
        { label: 'Hồ sơ cá nhân', href: 'profile.html#qt', active: true }
      ]
    },
    pk: {
      roleTitle: 'Chuyên viên P.KHCN',
      name: 'Dũng Nguyễn',
      code: 'CB-2026-0088',
      email: 'dung.nguyen@dntu.edu.vn',
      dept: 'Phòng Quản lý Khoa học & Công nghệ',
      title: 'Chuyên viên Quản lý Vận hành Đề tài',
      expertise: 'Quản lý Tiến độ NCKH, Thẩm định Thuyết minh & Thanh lý Hợp đồng',
      pkiKey: 'PKI-DNTU-9901-2026-PKHCN',
      sidebarNav: [
        { label: 'Việc cần làm', href: '../p-khcn/01-viec-can-lam.html' },
        { label: 'Quản lý Đợt NCKH', href: '../p-khcn/02-quan-ly-dot.html' },
        { label: 'Duyệt Thuyết minh & QĐ Hủy', href: '../p-khcn/03-de-tai-va-huy.html' },
        { label: 'Hội đồng Readiness', href: '../p-khcn/04-hoi-dong-readiness.html' },
        { label: 'Ký số Biên bản & Kết quả', href: '../p-khcn/05-cuoc-hop-ket-qua.html' },
        { label: 'Gate 03-07 & BM14', href: '../p-khcn/06-tai-lieu-buoc-03-07.html' },
        { label: 'Audit Log Nghiệp vụ', href: '../p-khcn/07-audit-nghiep-vu.html' },
        { label: 'Hồ sơ cá nhân', href: 'profile.html#pk', active: true }
      ]
    },
    td: {
      roleTitle: 'Trưởng Khoa / Trưởng Đơn vị',
      name: 'TS. Nguyễn Văn Nam',
      code: 'CB-2026-0012',
      email: 'nam.nguyen@dntu.edu.vn',
      dept: 'Khoa Công nghệ Thông tin',
      title: 'Trưởng Khoa CNTT',
      expertise: 'Xử lý Dữ liệu lớn, Trí tuệ Nhân tạo, Quản lý Nghiên cứu Khoa',
      pkiKey: 'PKI-DNTU-1122-2026-KHOA',
      sidebarNav: [
        { label: 'Việc cần làm', href: '../truong-don-vi/01-viec-can-lam.html' },
        { label: 'Hàng chờ Xét duyệt', href: '../truong-don-vi/02-hang-cho-xet-duyet.html' },
        { label: 'Đề tài Khoa / Đơn vị', href: '../truong-don-vi/05-de-tai-don-vi.html' },
        { label: 'Hồ sơ cá nhân', href: 'profile.html#td', active: true }
      ]
    },
    tk: {
      roleTitle: 'Thư ký Hội đồng Nghiệm thu',
      name: 'TS. Phạm Minh Tuấn',
      code: 'GV-2026-0142',
      email: 'tuan.pham@dntu.edu.vn',
      dept: 'Khoa Điện - Điện tử',
      title: 'Giảng viên · Thư ký Hội đồng HĐNT-2026-006',
      expertise: 'Hệ thống Điện thông minh, Tổng hợp Biên bản Nghiệm thu BM12',
      pkiKey: 'PKI-DNTU-3344-2026-THUKY',
      sidebarNav: [
        { label: 'Việc cần làm', href: '../thu-ky-hoi-dong/01-viec-can-lam.html' },
        { label: 'Hội đồng của tôi', href: '../thu-ky-hoi-dong/02-hoi-dong-cua-toi.html' },
        { label: 'Lập Biên bản BM12', href: '../thu-ky-hoi-dong/05-bien-ban.html' },
        { label: 'Hồ sơ cá nhân', href: 'profile.html#tk', active: true }
      ]
    },
    gv: {
      roleTitle: 'Giảng viên NCKH',
      name: 'TS. Nguyễn Thị Lan',
      code: 'GV-2026-0088',
      email: 'lan.nguyen@dntu.edu.vn',
      dept: 'Khoa Công nghệ Thông tin',
      title: 'Tiến sĩ · Giảng viên Cơ hữu',
      expertise: 'Học máy, Xử lý Ngôn ngữ Tự nhiên, Thị giác Máy tính',
      pkiKey: 'PKI-DNTU-5566-2026-GIANGVIEN',
      sidebarNav: [
        { label: 'Đề tài NCKH', href: '../giang-vien/01-danh-sach-de-tai.html' },
        { label: 'Đợt đăng ký', href: '../giang-vien/02-dot-dang-ky.html' },
        { label: 'Hồ sơ cá nhân', href: 'profile.html#gv', active: true }
      ]
    },
    sv: {
      roleTitle: 'Sinh viên NCKH',
      name: 'Nguyễn Minh An',
      code: 'SV-22100156',
      email: 'an.22100156@dntu.edu.vn',
      dept: 'Khoa Công nghệ Thông tin (Lớp 22DTH1)',
      title: 'Sinh viên Khóa 2022–2026',
      expertise: 'Lập trình Web, Xử lý dữ liệu Python, AI cơ bản',
      pkiKey: 'Chưa liên kết Chứng thư số PKI',
      sidebarNav: [
        { label: 'Đề tài của tôi', href: '../sinh-vien/01-de-tai-cua-toi.html' },
        { label: 'Hồ sơ cá nhân', href: 'profile.html#sv', active: true }
      ]
    }
  };

  function getActorKey() {
    const hash = (window.location.hash || '#qt').replace('#', '').toLowerCase();
    return MOCK_PROFILES[hash] ? hash : 'qt';
  }

  function getProfileState(actorKey) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PREFIX + actorKey);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return MOCK_PROFILES[actorKey];
  }

  function saveProfileState(actorKey, data) {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + actorKey, JSON.stringify(data));
    } catch (e) {}
  }

  function showToast(message, tone = 'success') {
    let region = document.querySelector('.toast-region');
    if (!region) {
      region = document.createElement('div');
      region.className = 'toast-region';
      document.body.appendChild(region);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${tone}`;
    toast.textContent = message;
    region.appendChild(toast);
    window.setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      window.setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  function renderProfile() {
    const actorKey = getActorKey();
    const profile = getProfileState(actorKey);

    /* 1. Header & Role Titles */
    const roleLabel = document.querySelector('.role-label');
    if (roleLabel) roleLabel.textContent = `Vai trò: ${profile.roleTitle}`;

    const accountName = document.querySelector('.account-name');
    if (accountName) accountName.textContent = profile.name;

    const avatar = document.querySelector('.avatar');
    if (avatar) {
      const parts = profile.name.split(' ');
      avatar.textContent = parts.length >= 2 ? (parts[parts.length-2][0] + parts[parts.length-1][0]).toUpperCase() : profile.name.substring(0,2).toUpperCase();
    }

    const titleEl = document.querySelector('[data-profile-title]');
    if (titleEl) titleEl.textContent = `Hồ sơ cá nhân — ${profile.roleTitle}`;

    const subTitleEl = document.querySelector('[data-profile-subtitle]');
    if (subTitleEl) subTitleEl.textContent = `Thông tin định danh người dùng DNTU, chức danh và ma trận quyền truy cập của vai trò ${profile.roleTitle}.`;

    /* 2. Hydrate Sidebar */
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && profile.sidebarNav) {
      let navHtml = '<a class="back-link" href="../index.html">← Bộ vai trò</a><div class="nav-title">Nghiệp vụ</div>';
      profile.sidebarNav.forEach(item => {
        navHtml += `<a class="nav-item ${item.active ? 'active' : ''}" href="${item.href}"><span>${item.label}</span></a>`;
      });
      sidebar.innerHTML = navHtml;
    }

    /* 3. Hydrate Form Inputs */
    const nameInput = document.getElementById('prf-name');
    if (nameInput) nameInput.value = profile.name;

    const codeInput = document.getElementById('prf-code');
    if (codeInput) codeInput.value = profile.code;

    const emailInput = document.getElementById('prf-email');
    if (emailInput) emailInput.value = profile.email;

    const deptInput = document.getElementById('prf-dept');
    if (deptInput) deptInput.value = profile.dept;

    const titleInput = document.getElementById('prf-title');
    if (titleInput) titleInput.value = profile.title;

    const expInput = document.getElementById('prf-exp');
    if (expInput) expInput.value = profile.expertise;

    const pkiInput = document.getElementById('prf-pki');
    if (pkiInput) pkiInput.value = profile.pkiKey;

    /* 4. Action Handlers */
    const saveBtn = document.getElementById('btn-save-profile');
    if (saveBtn) {
      saveBtn.onclick = () => {
        const updated = {
          ...profile,
          name: nameInput ? nameInput.value : profile.name,
          title: titleInput ? titleInput.value : profile.title,
          expertise: expInput ? expInput.value : profile.expertise
        };
        saveProfileState(actorKey, updated);
        showToast('Đã cập nhật thành công Hồ sơ cá nhân người dùng DNTU.', 'success');
      };
    }

    const resetBtn = document.getElementById('btn-reset-profile');
    if (resetBtn) {
      resetBtn.onclick = () => {
        renderProfile();
        showToast('Đã hủy các thay đổi trên biểu mẫu hồ sơ.', 'info');
      };
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderProfile();
    window.addEventListener('hashchange', renderProfile);
  });
})();
