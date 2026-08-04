/**
 * DNTU QLNCKH - ROLE SWITCHER ENGINE
 * Interactive Role Switcher for 8 Actors & Contextual Navigation to Dedicated Portals
 */

(function () {
  'use strict';

  const ACTORS = [
    { 
      id: 'p-khcn', 
      name: 'Nguyễn Văn A', 
      title: 'Chuyên viên P.KHCN', 
      badge: 'P.KHCN',
      portalPath: 'modules/module-01-de-tai-cap-truong/p-khcn/01-p-khcn-dashboard.html'
    },
    { 
      id: 'giang-vien', 
      name: 'TS. Trần Thị B', 
      title: 'Giảng viên Khoa CNTT', 
      badge: 'Giảng viên',
      portalPath: 'modules/module-01-de-tai-cap-truong/giang-vien/01-danh-sach-de-tai.html'
    },
    { 
      id: 'sinh-vien', 
      name: 'Lê Văn C', 
      title: 'Sinh viên Khoa CNTT', 
      badge: 'Sinh viên',
      portalPath: 'modules/module-01-de-tai-cap-truong/sinh-vien/01-danh-sach-de-tai.html'
    },
    { 
      id: 'truong-don-vi', 
      name: 'PGS.TS. Phạm Văn D', 
      title: 'Trưởng Khoa CNTT', 
      badge: 'Trưởng Đơn vị',
      portalPath: 'modules/module-01-de-tai-cap-truong/truong-don-vi/01-viec-can-lam.html'
    },
    { 
      id: 'chu-tich-hoi-dong', 
      name: 'GS.TS. Hoàng Văn E', 
      title: 'Chủ tịch Hội đồng Khoa học', 
      badge: 'Chủ tịch HĐ',
      portalPath: 'modules/module-01-de-tai-cap-truong/chu-tich-hoi-dong/01-cuoc-hop-danh-sach.html'
    },
    { 
      id: 'thanh-vien-hoi-dong', 
      name: 'TS. Đặng Văn F', 
      title: 'Ủy viên Phản biện HĐ', 
      badge: 'Ủy viên HĐ',
      portalPath: 'modules/module-01-de-tai-cap-truong/thanh-vien-hoi-dong/01-cuoc-hop-danh-sach.html'
    },
    { 
      id: 'thu-ky-hoi-dong', 
      name: 'ThS. Vũ Thị G', 
      title: 'Thư ký Hội đồng Khoa học', 
      badge: 'Thư ký HĐ',
      portalPath: 'modules/module-01-de-tai-cap-truong/thu-ky-hoi-dong/01-lap-bien-ban.html'
    },
    { 
      id: 'quan-tri-vien', 
      name: 'Admin System', 
      title: 'Quản trị viên Hệ thống', 
      badge: 'Quản trị viên',
      portalPath: 'modules/module-01-de-tai-cap-truong/quan-tri-vien/01-quan-ly-tai-khoan.html'
    }
  ];

  function getActiveRole() {
    return localStorage.getItem('dntu_current_role') || 'p-khcn';
  }

  function resolveTargetUrl(actor) {
    const currentPath = window.location.pathname.replace(/\\/g, '/');
    
    // Rule: If inside a module subfolder, redirect to target actor portal inside THAT SAME module
    if (currentPath.includes('/modules/module-01-de-tai-cap-truong/')) {
      const relativePath = actor.portalPath.replace('modules/module-01-de-tai-cap-truong/', '');
      return '../' + relativePath;
    }
    
    // Rule: Root pages (index.html, full-system-screen-atlas.html) DO NOT redirect
    return null;
  }

  function setActiveRole(roleId, shouldNavigate = false) {
    localStorage.setItem('dntu_current_role', roleId);
    const actor = ACTORS.find(a => a.id === roleId) || ACTORS[0];
    applyRoleUI(roleId);

    if (shouldNavigate) {
      const targetUrl = resolveTargetUrl(actor);
      if (targetUrl) {
        window.location.href = targetUrl;
      }
    }
  }

  function applyRoleUI(roleId) {
    const actor = ACTORS.find(a => a.id === roleId) || ACTORS[0];

    // Update header user text
    const userNameEl = document.getElementById('user-display-name');
    const userRoleEl = document.getElementById('user-display-role');
    if (userNameEl) userNameEl.textContent = actor.name;
    if (userRoleEl) userRoleEl.textContent = `${actor.badge} (${actor.title})`;

    // Highlight active role chip in toolbar
    document.querySelectorAll('.role-chip').forEach(chip => {
      if (chip.getAttribute('data-role-id') === roleId) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });

    // Filter visibility of RBAC-gated elements
    document.querySelectorAll('[data-allow-roles]').forEach(el => {
      const allowed = el.getAttribute('data-allow-roles').split(',').map(r => r.trim());
      if (allowed.includes(roleId) || allowed.includes('all')) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });

    window.dispatchEvent(new CustomEvent('dntu:roleChanged', { detail: { actor } }));
  }

  function renderRoleSwitcherBar() {
    const activeRole = getActiveRole();
    const container = document.getElementById('role-switcher-mount');
    if (!container) return;

    let html = `
      <div class="role-switcher-bar">
        <div class="role-switcher-title">
          <span>🎭 Đóng vai Actor (Chuyển nhanh sang Cổng Của Vai Trò):</span>
        </div>
        <div class="role-chips-group">
    `;

    ACTORS.forEach(actor => {
      const isActive = actor.id === activeRole ? 'active' : '';
      html += `
        <button type="button" class="role-chip ${isActive}" data-role-id="${actor.id}" title="Mở Cổng ${actor.badge} (${actor.name})">
          ${actor.badge}
        </button>
      `;
    });

    html += `
        </div>
      </div>
    `;

    container.innerHTML = html;

    container.querySelectorAll('.role-chip').forEach(chip => {
      chip.addEventListener('click', function () {
        const roleId = this.getAttribute('data-role-id');
        setActiveRole(roleId, true);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderRoleSwitcherBar();
    applyRoleUI(getActiveRole());
  });

  window.DNTURoleSwitcher = {
    getActiveRole,
    setActiveRole,
    ACTORS,
    resolveTargetUrl
  };
})();
