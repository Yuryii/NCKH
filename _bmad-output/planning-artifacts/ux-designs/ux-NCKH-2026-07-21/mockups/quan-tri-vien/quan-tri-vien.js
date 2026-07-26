(() => {
  'use strict';

  const STORAGE_KEY = 'NCKH_ADMIN_PERSISTENT_STATE_V1';

  /* -------------------------------------------------------------
     PERSISTENT STATE ENGINE (localStorage)
     ------------------------------------------------------------- */
  function getDefaultState() {
    return {
      unreadNotifications: 2,
      pendingTasksCount: 4,
      totalUsersCount: 1540,
      lockedAccountsCount: 2,
      specialAccountsCount: 12,
      batchApproved: false,
      createdUsers: [],
      createdAdminUsers: [],
      roleRequests: {
        'req-001': { status: 'pending', name: 'TS. An Nguyễn', code: 'GV-2026-0088', role: 'Giảng viên NCKH' },
        'req-002': { status: 'pending', name: 'TS. Phạm Minh Tuấn', code: 'GV-2026-0142', role: 'Thư ký Hội đồng' },
        'req-003': { status: 'pending', name: 'ThS. Nguyễn Thị Hoa', code: 'GV-2026-0210', role: 'Giảng viên Hướng dẫn NCKH' }
      },
      lockedUsers: {
        'GV-2026-0099': { isLocked: true, name: 'Nguyễn Văn Hải', reason: 'Nhập sai OTP 5 lần' }
      },
      auditLogs: [
        {
          id: 'log-admin-2',
          timeStr: '25/07/2026 14:20',
          title: '[Admin - Quỳnh Anh] Cấp quyền P-KHCN cho Chuyên viên Dũng Nguyễn',
          desc: 'Gán vai trò Quản lý Vận hành P-KHCN và cấp Mã xác thực Chữ ký số.',
          detail: 'Hệ thống tự động kích hoạt tài khoản dung.nguyen@dntu.edu.vn',
          badge: 'Cấp quyền Admin',
          hash: 'SHA256-b921e48f02a7c8109d44'
        },
        {
          id: 'log-admin-1',
          timeStr: '24/07/2026 09:15',
          title: '[Admin - Quỳnh Anh] Khóa bảo mật tạm thời tài khoản GV-2026-0099',
          desc: 'Phát hiện đăng nhập thất bại 5 lần liên tiếp từ IP bất thường.',
          detail: 'Trạng thái: Đã tạm khóa và gửi cảnh báo 2FA về Email.',
          badge: 'Khóa bảo mật',
          hash: 'SHA256-f8319a28c0018d99ab02'
        }
      ]
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return getDefaultState();
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function recordAuditLog(title, desc, detail, badge = 'Audit Pass') {
    const state = loadState();
    const now = new Date();
    const timeStr = `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    const hash = `SHA256-${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;

    const logItem = {
      id: `log-live-${Date.now()}-${Math.floor(Math.random()*1000)}`,
      timeStr,
      title,
      desc,
      detail,
      badge,
      hash
    };

    state.auditLogs = state.auditLogs || [];
    state.auditLogs.unshift(logItem);
    saveState(state);
    return logItem;
  }

  function resetDemoState() {
    localStorage.removeItem(STORAGE_KEY);
    showToast('Đã khôi phục dữ liệu Quản trị viên về trạng thái ban đầu.', 'info');
    window.setTimeout(() => window.location.reload(), 400);
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>'"]/g, character => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    })[character]);
  }

  function showToast(message, tone = 'success') {
    let region = document.querySelector('.toast-region');
    if (!region) {
      region = document.createElement('div');
      region.className = 'toast-region';
      region.setAttribute('aria-live', 'polite');
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
    }, 3600);
  }

  function openDialog({ title, description = '', content = '', confirmLabel = '', confirmTone = 'primary', onConfirm }) {
    const dialog = document.createElement('dialog');
    dialog.className = 'demo-dialog';
    dialog.innerHTML = `
      <div class="dialog-head">
        <div>
          <h2>${escapeHtml(title)}</h2>
          ${description ? `<p class="meta" style="margin:2px 0 0; color:var(--muted); font-size:12px;">${escapeHtml(description)}</p>` : ''}
        </div>
        <button class="dialog-close" type="button" aria-label="Đóng">×</button>
      </div>
      <div class="dialog-body">${content}</div>
      <div class="dialog-actions">
        <button class="secondary dialog-cancel" type="button">${confirmLabel ? 'Hủy' : 'Đóng'}</button>
        ${confirmLabel ? `<button class="${confirmTone} dialog-confirm" type="button">${escapeHtml(confirmLabel)}</button>` : ''}
      </div>
    `;
    document.body.appendChild(dialog);
    const close = () => dialog.close();
    dialog.querySelector('.dialog-close').addEventListener('click', close);
    dialog.querySelector('.dialog-cancel').addEventListener('click', close);
    dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
    dialog.addEventListener('close', () => dialog.remove());
    const confirm = dialog.querySelector('.dialog-confirm');
    if (confirm) {
      confirm.addEventListener('click', () => {
        if (!onConfirm || onConfirm(dialog) !== false) close();
      });
    }
    dialog.showModal();
    return dialog;
  }

  function openAccountDrawer({ name, email, code, role, dept, status }) {
    const overlay = document.createElement('div');
    overlay.className = 'drawer-overlay';

    overlay.innerHTML = `
      <div class="drawer-panel">
        <div class="drawer-head">
          <h2>Hồ sơ Phân quyền Tài khoản Admin</h2>
          <button class="dialog-close drawer-close" type="button" aria-label="Đóng">×</button>
        </div>
        <div class="drawer-body">
          <div style="background:var(--surface); padding:16px; border:1px solid var(--border); border-radius:6px; margin-bottom:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <h3 style="margin:0; font-size:16px;">${escapeHtml(name)}</h3>
                <span class="meta">${escapeHtml(email)} · Mã định danh: <b>${escapeHtml(code)}</b></span>
              </div>
              <span class="badge success">${escapeHtml(status || '✓ Đang hoạt động')}</span>
            </div>
          </div>

          <div class="card" style="margin-bottom:14px;">
            <h3>Ma trận Vai trò & Quyền hạn Hệ thống</h3>
            <div class="doc-row"><span>Khoa / Đơn vị quản lý:</span><b>${escapeHtml(dept || 'Khoa Công nghệ Thông tin')}</b></div>
            <div class="doc-row"><span>Vai trò chính:</span><span class="badge owner">${escapeHtml(role || 'Giảng viên')}</span></div>
            <div class="doc-row"><span>Phương thức xác thực:</span><span class="badge info">Email DNTU + OTP 2FA</span></div>
            <div class="doc-row"><span>Chữ ký số NCKH:</span><span class="badge success">✓ Đã liên kết PKI</span></div>
          </div>

          <div class="card">
            <h3>Lịch sử Thao tác Phân quyền</h3>
            <p class="meta">• 25/07/2026: Admin Quỳnh Anh duyệt nâng quyền Chủ nhiệm NCKH.<br>• 10/01/2026: Đăng ký tài khoản ban đầu thành công.</p>
          </div>
        </div>
        <div class="drawer-foot">
          <button class="secondary drawer-close" type="button">Đóng lại</button>
          <button class="primary" type="button" onclick="window.NCKHUI.showToast('Đã trích xuất Hồ sơ Phân quyền và Chứng thư số PKI.', 'success')">Xuất Hồ sơ PDF</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    window.setTimeout(() => overlay.classList.add('show'), 10);

    const closeDrawer = () => {
      overlay.classList.remove('show');
      window.setTimeout(() => overlay.remove(), 250);
    };

    overlay.querySelectorAll('.drawer-close').forEach(btn => btn.addEventListener('click', closeDrawer));
    overlay.addEventListener('click', event => {
      if (event.target === overlay) closeDrawer();
    });
  }

  /* -------------------------------------------------------------
     DOM HYDRATION FROM LOCALSTORAGE (STRICT BUTTON SELECTOR FIX)
     ------------------------------------------------------------- */
  function syncStateToDOM() {
    const state = loadState();

    /* 1. Counter Badges & Header Indicators */
    document.querySelectorAll('.bell-count, [data-unread-count]').forEach(node => {
      node.textContent = String(state.unreadNotifications);
      node.hidden = state.unreadNotifications === 0;
    });

    document.querySelectorAll('.nav-count, .task-count').forEach(el => {
      el.textContent = String(state.pendingTasksCount);
    });

    const statFirst = document.querySelector('.stats .stat:first-child strong');
    if (statFirst) statFirst.textContent = String(state.pendingTasksCount);

    const statUsers = document.querySelector('[data-metric-users]');
    if (statUsers) statUsers.textContent = String(state.totalUsersCount);

    const statLocked = document.querySelector('[data-metric-locked]');
    if (statLocked) statLocked.textContent = String(state.lockedAccountsCount);

    /* 2. Hydrate Role Requests (Trang QT-01 & QT-03) */
    Object.keys(state.roleRequests || {}).forEach(reqId => {
      const req = state.roleRequests[reqId];
      const cards = [
        document.getElementById(reqId),
        document.querySelector(`[data-req-id="${reqId}"]`)
      ];

      cards.forEach(card => {
        if (card && req.status === 'approved') {
          card.setAttribute('data-state', 'completed');
          card.style.borderLeftColor = 'var(--success)';
          card.style.background = '#F6FBF7';

          // Update header status badge
          card.querySelectorAll('.badge, .status').forEach(badge => {
            badge.className = 'badge success';
            badge.textContent = `✓ Đã phê duyệt (${req.role})`;
          });

          const nextAction = card.querySelector('.next-action, .next-step');
          if (nextAction) {
            nextAction.innerHTML = `<b>Trạng thái:</b> Đã phê duyệt cấp quyền <b>${escapeHtml(req.role)}</b> thành công. Quyền truy cập NCKH đã kích hoạt.`;
          }

          const actionBtn = card.querySelector('button');
          if (actionBtn && !actionBtn.classList.contains('secondary')) {
            actionBtn.className = 'secondary';
            actionBtn.innerHTML = '✓ Hoàn tất';
            actionBtn.disabled = true;
          }
        }
      });
    });

    /* 3. Hydrate Created Users on Trang QT-02 */
    const userTable = document.querySelector('#admin-user-table tbody');
    if (userTable && state.createdUsers && state.createdUsers.length > 0) {
      state.createdUsers.forEach(u => {
        if (!document.getElementById(u.id)) {
          const tr = document.createElement('tr');
          tr.id = u.id;
          tr.style.background = '#F6FBF7';
          tr.innerHTML = `
            <td><b>${escapeHtml(u.name)}</b><br><span class="meta">${escapeHtml(u.email)}</span></td>
            <td><code>${escapeHtml(u.code)}</code></td>
            <td>${escapeHtml(u.dept)}</td>
            <td><span class="badge owner">${escapeHtml(u.role)}</span></td>
            <td><span class="badge success">✓ Đã cấp tài khoản</span></td>
            <td><button class="secondary" type="button" onclick="window.NCKHUI.openAccountDrawer({name:'${escapeHtml(u.name)}', email:'${escapeHtml(u.email)}', code:'${escapeHtml(u.code)}', role:'${escapeHtml(u.role)}', dept:'${escapeHtml(u.dept)}'})">Xem Hồ sơ</button></td>
          `;
          userTable.insertBefore(tr, userTable.firstChild);
        }
      });
    }

    /* 4. Hydrate Created Special Admin Accounts on Trang QT-04 */
    const adminTable = document.querySelector('#admin-special-table tbody');
    if (adminTable && state.createdAdminUsers && state.createdAdminUsers.length > 0) {
      state.createdAdminUsers.forEach(a => {
        if (!document.getElementById(a.id)) {
          const tr = document.createElement('tr');
          tr.id = a.id;
          tr.style.background = '#EAF0FF';
          tr.innerHTML = `
            <td><b>${escapeHtml(a.name)}</b><br><span class="meta">${escapeHtml(a.title)}</span></td>
            <td><code>${escapeHtml(a.email)}</code></td>
            <td><span class="badge owner">${escapeHtml(a.roleType)}</span></td>
            <td><span class="badge success">✓ PKI OTP Active</span></td>
            <td><button class="secondary" type="button" onclick="window.NCKHUI.showToast('Tài khoản đặc thù đã hoạt động bình thường.', 'info')">Cấu hình Quyền</button></td>
          `;
          adminTable.insertBefore(tr, adminTable.firstChild);
        }
      });
    }

    /* 5. Hydrate Lock States (Trang QT-05) - TARGET BUTTON ONLY */
    Object.keys(state.lockedUsers || {}).forEach(userCode => {
      const lockObj = state.lockedUsers[userCode];
      const el = document.querySelector(`[data-user-code="${userCode}"]`);
      if (el) {
        // STRICT: Select button explicitly, NOT badge spans!
        const btn = el.querySelector('button.lock-toggle-btn, button');
        const badge = el.querySelector('.badge, .status');
        const nextAction = el.querySelector('.next-action, .next-step');

        if (lockObj.isLocked) {
          el.setAttribute('data-state', 'blocked');
          el.style.borderLeftColor = 'var(--danger)';
          el.style.background = '#FDECEA';

          if (badge) {
            badge.className = 'badge danger';
            badge.textContent = '🔒 Đã khóa bảo mật';
          }

          if (nextAction) {
            nextAction.innerHTML = `<b>Trạng thái:</b> Tài khoản đang bị khóa bảo mật khẩn cấp do nghi ngờ vi phạm an ninh.`;
          }

          if (btn) {
            btn.className = 'primary lock-toggle-btn';
            btn.textContent = '🔓 Mở khóa Tài khoản';
            btn.disabled = false;
          }
        } else {
          el.setAttribute('data-state', 'completed');
          el.style.borderLeftColor = 'var(--success)';
          el.style.background = '#F6FBF7';

          if (badge) {
            badge.className = 'badge success';
            badge.textContent = '✓ Đang hoạt động';
          }

          if (nextAction) {
            nextAction.innerHTML = `<b>Trạng thái:</b> Tài khoản đã được mở khóa bảo mật và ở trạng thái hoạt động bình thường.`;
          }

          if (btn) {
            btn.className = 'danger lock-toggle-btn';
            btn.textContent = '🔒 Khóa khẩn cấp';
            btn.disabled = false;
          }
        }
      }
    });

    /* 6. Hydrate Complete Audit Log Timeline on Trang QT-06 */
    const logList = document.querySelector('main[data-page-codes="QT-06"] .topic-list, #admin-audit-list');
    if (logList && state.auditLogs && state.auditLogs.length > 0) {
      logList.innerHTML = '';
      state.auditLogs.forEach(l => {
        const logCard = document.createElement('div');
        logCard.id = l.id;
        logCard.className = 'topic-card';
        logCard.style.borderLeftColor = l.badge.includes('Khóa') ? 'var(--danger)' : 'var(--info)';
        logCard.style.marginBottom = '12px';
        logCard.innerHTML = `
          <div>
            <div><span class="badge info">${escapeHtml(l.badge)}</span> <span class="badge">${escapeHtml(l.timeStr)}</span></div>
            <h2 class="topic-title">${escapeHtml(l.title)}</h2>
            <p class="meta" style="margin:4px 0;">${escapeHtml(l.desc)}</p>
            <div class="next-action">
              <b>${escapeHtml(l.detail)}</b><br>
              <span class="meta" style="font-family:monospace;">Mã băm Hash SHA-256: ${escapeHtml(l.hash)}</span>
            </div>
          </div>
          <div class="topic-actions">
            <span class="badge success">✓ Audit Pass</span>
          </div>
        `;
        logList.appendChild(logCard);
      });
    }

    /* Apply Filter to Hide Completed items if toolbar filter is active */
    setupFilters();
  }

  function setupHeader() {
    const bell = document.querySelector('.bell');
    if (bell) {
      bell.setAttribute('aria-haspopup', 'true');
      bell.setAttribute('aria-expanded', 'false');

      const popover = document.querySelector('.notification-popover');
      if (popover) {
        bell.addEventListener('click', event => {
          event.preventDefault();
          const willOpen = popover.hidden;
          popover.hidden = !willOpen;
          bell.setAttribute('aria-expanded', String(willOpen));
        });

        document.addEventListener('click', event => {
          if (!bell.contains(event.target) && !popover.contains(event.target)) {
            popover.hidden = true;
            bell.setAttribute('aria-expanded', 'false');
          }
        });
      }
    }

    const account = document.querySelector('.account');
    if (account) {
      account.addEventListener('click', () => {
        window.location.href = '../shared/profile.html#qt';
      });
    }

    /* Mobile Menu Toggle */
    const menuBtn = document.querySelector('.menu-button, .mobile-menu');
    const sidebar = document.querySelector('.sidebar');
    if (menuBtn && sidebar) {
      menuBtn.setAttribute('aria-expanded', 'false');
      let overlay = document.querySelector('.sidebar-overlay');
      if (!overlay) {
        overlay = document.createElement('button');
        overlay.className = 'sidebar-overlay';
        overlay.type = 'button';
        document.body.appendChild(overlay);
      }

      const toggleSidebar = open => {
        sidebar.classList.toggle('open', open);
        overlay.classList.toggle('show', open);
        menuBtn.setAttribute('aria-expanded', String(open));
      };

      menuBtn.addEventListener('click', () => toggleSidebar(!sidebar.classList.contains('open')));
      overlay.addEventListener('click', () => toggleSidebar(false));
    }
  }

  function setupFilters() {
    const searchInput = document.querySelector('[data-search], #page-search, #search');
    const filterSelect = document.querySelector('[data-filter], #page-filter, #status, #role, #dept');
    const rows = document.querySelectorAll('[data-record], .topic-card, .work-row, .data-table tbody tr');

    function applyFilter() {
      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const filterVal = filterSelect ? filterSelect.value : 'all';
      let visibleCount = 0;

      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const state = row.getAttribute('data-state') || row.getAttribute('data-status') || '';
        const matchSearch = !query || text.includes(query);
        
        let matchFilter = true;
        if (filterVal === 'open') {
          matchFilter = state === 'open' || state === 'blocked';
        } else if (filterVal === 'completed') {
          matchFilter = state === 'completed';
        } else if (filterVal !== 'all') {
          matchFilter = state === filterVal || text.includes(filterVal);
        }

        if (matchSearch && matchFilter) {
          row.style.display = '';
          visibleCount++;
        } else {
          row.style.display = 'none';
        }
      });

      const countBadge = document.querySelector('[data-visible-count]');
      if (countBadge) countBadge.textContent = `${visibleCount} mục hiển thị`;
    }

    if (searchInput) searchInput.addEventListener('input', applyFilter);
    if (filterSelect) filterSelect.addEventListener('change', applyFilter);
    applyFilter();
  }

  /* Subtle Semi-transparent Reset Icon Button Injection */
  function injectResetButton() {
    if (!document.querySelector('.reset-demo-btn')) {
      const resetBtn = document.createElement('button');
      resetBtn.className = 'reset-demo-btn';
      resetBtn.type = 'button';
      resetBtn.innerHTML = '🔄';
      resetBtn.title = 'Reset Dữ liệu Demo Quản trị viên về ban đầu';
      resetBtn.addEventListener('click', () => resetDemoState());
      document.body.appendChild(resetBtn);
    }
  }

  /* -------------------------------------------------------------
     PERSISTENT INTERACTION HANDLERS FOR ADMIN ROLE
     ------------------------------------------------------------- */
  function setupLiveDemoActions() {

    /* 1. Batch Approve Role Requests (Trang QT-01 & QT-03) */
    window.handleBatchApproveRoles = () => {
      openDialog({
        title: 'Phê duyệt hàng loạt Yêu cầu Nâng quyền Vai trò',
        description: 'Xác nhận cấp vai trò Giảng viên NCKH & Thư ký HĐ cho 3 giảng viên đã xác thực email',
        content: `
          <div class="notice success"><b>3 Yêu cầu đủ điều kiện cấp vai trò:</b></div>
          <ul style="margin:8px 0; padding-left:18px; font-size:12px;">
            <li>TS. An Nguyễn (GV-2026-0088) -> Cấp vai trò Giảng viên NCKH</li>
            <li>TS. Phạm Minh Tuấn (GV-2026-0142) -> Cấp vai trò Thư ký Hội đồng</li>
            <li>ThS. Nguyễn Thị Hoa (GV-2026-0210) -> Cấp vai trò Giảng viên Hướng dẫn NCKH</li>
          </ul>
        `,
        confirmLabel: 'Xác nhận Duyệt hàng loạt',
        confirmTone: 'primary',
        onConfirm: () => {
          const state = loadState();
          state.batchApproved = true;
          state.pendingTasksCount = Math.max(0, state.pendingTasksCount - 3);

          state.roleRequests['req-001'].status = 'approved';
          state.roleRequests['req-002'].status = 'approved';
          state.roleRequests['req-003'].status = 'approved';

          saveState(state);

          recordAuditLog(
            '[Admin - Quỳnh Anh] Phê duyệt hàng loạt Yêu cầu Nâng quyền',
            'Cấp vai trò Giảng viên NCKH & Thư ký Hội đồng cho 3 tài khoản GV-2026-0088, GV-2026-0142, GV-2026-0210',
            'Trạng thái: 3 tài khoản đã được kích hoạt quyền hạn trên hệ thống',
            'Duyệt Vai trò'
          );

          syncStateToDOM();
          showToast('Đã phê duyệt và cấp quyền thành công cho 03 tài khoản giảng viên.', 'success');
        }
      });
    };

    /* 2. Approve Single Role Request */
    window.handleApproveRoleReq = (reqId = 'req-001') => {
      openDialog({
        title: 'Phê duyệt Yêu cầu Vai trò NCKH',
        description: 'Cấp quyền Chủ nhiệm & Đăng ký Thuyết minh NCKH',
        content: `
          <div class="notice success"><b>Đã kiểm tra điều kiện tài khoản:</b> Email DNTU chính chủ, chưa có vi phạm quy chế.</div>
          <div class="field" style="margin-top:10px;"><label>Ghi chú phân quyền Admin</label><input id="dlg-role-note" value="Duyệt cấp quyền NCKH theo Công văn 102/ĐNTU-KHCN"></div>
        `,
        confirmLabel: 'Phê duyệt Cấp quyền',
        confirmTone: 'primary',
        onConfirm: (dialog) => {
          const note = dialog.querySelector('#dlg-role-note')?.value || 'Duyệt cấp quyền NCKH';

          const state = loadState();
          if (state.roleRequests[reqId]) {
            state.roleRequests[reqId].status = 'approved';
          }
          state.pendingTasksCount = Math.max(0, state.pendingTasksCount - 1);
          saveState(state);

          recordAuditLog(
            '[Admin - Quỳnh Anh] Phê duyệt Yêu cầu Vai trò NCKH',
            `Phê duyệt cấp quyền cho tài khoản ${reqId}. Ghi chú: ${note}`,
            'Trạng thái: Đã cập nhật ma trận quyền truy cập của tài khoản',
            'Cấp quyền NCKH'
          );

          syncStateToDOM();
          showToast('Đã phê duyệt cấp quyền Chủ nhiệm & Thuyết minh NCKH thành công.', 'success');
        }
      });
    };

    /* 3. Create New User Account (Trang QT-02) */
    window.handleCreateAccount = () => {
      openDialog({
        title: 'Thêm Tài khoản Người dùng mới',
        description: 'Tạo tài khoản Giảng viên / Sinh viên và gán đơn vị',
        content: `
          <div style="display:grid; gap:10px;">
            <div class="field"><label>Họ và tên người dùng</label><input id="dlg-usr-name" value="TS. Vũ Văn Nam"></div>
            <div class="field"><label>Email DNTU chính thức</label><input id="dlg-usr-email" value="nam.vu@dntu.edu.vn"></div>
            <div class="field"><label>Mã định danh (Mã GV/SV)</label><input id="dlg-usr-code" value="GV-2026-0315"></div>
            <div class="field"><label>Khoa / Đơn vị</label><select id="dlg-usr-dept"><option>Khoa Công nghệ Thông tin</option><option>Khoa Kinh tế & Quản trị</option><option>Khoa Điện - Điện tử</option></select></div>
            <div class="field"><label>Vai trò mặc định</label><select id="dlg-usr-role"><option>Giảng viên NCKH</option><option>Sinh viên NCKH</option></select></div>
          </div>
        `,
        confirmLabel: 'Tạo Tài khoản & Hiển thị trên Danh sách',
        confirmTone: 'primary',
        onConfirm: (dialog) => {
          const name = dialog.querySelector('#dlg-usr-name')?.value || 'TS. Vũ Văn Nam';
          const email = dialog.querySelector('#dlg-usr-email')?.value || 'nam.vu@dntu.edu.vn';
          const code = dialog.querySelector('#dlg-usr-code')?.value || 'GV-2026-0315';
          const dept = dialog.querySelector('#dlg-usr-dept')?.value || 'Khoa Công nghệ Thông tin';
          const role = dialog.querySelector('#dlg-usr-role')?.value || 'Giảng viên NCKH';

          const userObj = {
            id: `usr-new-${Date.now()}`,
            name,
            email,
            code,
            dept,
            role
          };

          const state = loadState();
          state.createdUsers = state.createdUsers || [];
          state.createdUsers.unshift(userObj);
          state.totalUsersCount = (state.totalUsersCount || 1540) + 1;
          saveState(state);

          recordAuditLog(
            '[Admin - Quỳnh Anh] Tạo Tài khoản Người dùng mới',
            `Khởi tạo tài khoản cho ${name} (${code}) - ${dept}`,
            `Gán vai trò ban đầu: ${role}. Email xác thực: ${email}`,
            'Tạo Tài khoản'
          );

          syncStateToDOM();
          showToast(`Đã khởi tạo tài khoản DNTU cho ${name} (${code}) thành công.`, 'success');
        }
      });
    };

    /* 4. Create Special Admin/PKHCN Account (Trang QT-04) */
    window.handleCreateAdminAccount = () => {
      openDialog({
        title: 'Cấp phát Tài khoản Đặc thù (P-KHCN / Trưởng Khoa)',
        description: 'Tạo tài khoản quản lý có liên kết Chữ ký số PKI & 2FA',
        content: `
          <div style="display:grid; gap:10px;">
            <div class="field"><label>Họ và tên cán bộ</label><input id="dlg-adm-name" value="TS. Hoàng Trọng Nghĩa"></div>
            <div class="field"><label>Chức vụ / Vị trí công tác</label><input id="dlg-adm-title" value="Phó Trưởng phòng KH&CN"></div>
            <div class="field"><label>Email công vụ DNTU</label><input id="dlg-adm-email" value="nghia.hoang@dntu.edu.vn"></div>
            <div class="field"><label>Loại Vai trò Quản trị</label><select id="dlg-adm-type"><option>Chuyên viên P.KHCN (Duyệt hồ sơ & HĐ)</option><option>Trưởng Khoa / Đơn vị (Duyệt BM01A)</option><option>Chủ tịch Hội đồng NCKH</option></select></div>
            <div class="field"><label>Mã Seri Chữ ký số PKI</label><input id="dlg-adm-pki" value="PKI-DNTU-8849-2026"></div>
          </div>
        `,
        confirmLabel: 'Cấp phát Tài khoản & Kích hoạt PKI',
        confirmTone: 'primary',
        onConfirm: (dialog) => {
          const name = dialog.querySelector('#dlg-adm-name')?.value || 'TS. Hoàng Trọng Nghĩa';
          const title = dialog.querySelector('#dlg-adm-title')?.value || 'Phó Trưởng phòng KH&CN';
          const email = dialog.querySelector('#dlg-adm-email')?.value || 'nghia.hoang@dntu.edu.vn';
          const roleType = dialog.querySelector('#dlg-adm-type')?.value || 'Chuyên viên P.KHCN';

          const adminObj = {
            id: `adm-new-${Date.now()}`,
            name,
            title,
            email,
            roleType
          };

          const state = loadState();
          state.createdAdminUsers = state.createdAdminUsers || [];
          state.createdAdminUsers.unshift(adminObj);
          state.specialAccountsCount = (state.specialAccountsCount || 12) + 1;
          saveState(state);

          recordAuditLog(
            '[Admin - Quỳnh Anh] Cấp phát Tài khoản Quản trị Đặc thù',
            `Khởi tạo tài khoản ${name} (${title}) - Vai trò: ${roleType}`,
            `Đã gán chứng thư số PKI & cấu hình 2FA cho email ${email}`,
            'Cấp tài khoản Admin'
          );

          syncStateToDOM();
          showToast(`Đã cấp phát tài khoản quản trị (${roleType}) và liên kết PKI cho ${name}.`, 'success');
        }
      });
    };

    /* 5. Toggle Lock/Unlock Account (Trang QT-01 & QT-05) */
    window.handleToggleLockAccount = (userCode = 'GV-2026-0099') => {
      const state = loadState();
      const lockObj = state.lockedUsers[userCode] || { isLocked: true, name: 'Nguyễn Văn Hải' };

      const willLock = !lockObj.isLocked;

      openDialog({
        title: willLock ? `Khóa Bảo mật Khẩn cấp: ${userCode}` : `Mở khóa Tài khoản: ${userCode}`,
        description: willLock ? 'Tạm dừng toàn bộ quyền truy cập của tài khoản' : 'Khôi phục quyền đăng nhập hệ thống',
        content: `
          <div class="notice ${willLock ? 'danger' : 'success'}">
            <b>Xác nhận ${willLock ? 'khóa khẩn cấp' : 'mở khóa'} cho ${escapeHtml(lockObj.name)}</b>
          </div>
          <div class="field" style="margin-top:10px;"><label>Lý do thao tác</label><input id="dlg-lock-reason" value="${willLock ? 'Cảnh báo đăng nhập thất bại 5 lần liên tiếp' : 'Đã xác minh chủ tài khoản chính chủ qua OTP'}"></div>
        `,
        confirmLabel: willLock ? 'Khóa Tài khoản Ngay' : 'Xác nhận Mở khóa',
        confirmTone: willLock ? 'danger' : 'primary',
        onConfirm: (dialog) => {
          const reason = dialog.querySelector('#dlg-lock-reason')?.value || 'Cập nhật trạng thái bảo mật';

          state.lockedUsers[userCode] = {
            isLocked: willLock,
            name: lockObj.name,
            reason
          };

          if (willLock) {
            state.lockedAccountsCount = (state.lockedAccountsCount || 0) + 1;
          } else {
            state.lockedAccountsCount = Math.max(0, (state.lockedAccountsCount || 1) - 1);
          }
          saveState(state);

          recordAuditLog(
            `[Admin - Quỳnh Anh] ${willLock ? 'Khóa bảo mật' : 'Mở khóa'} tài khoản ${userCode}`,
            `${willLock ? 'Tạm dừng' : 'Khôi phục'} quyền truy cập cho ${lockObj.name}. Lý do: ${reason}`,
            `Trạng thái bảo mật đã được ghi nhận trên hệ thống`,
            willLock ? 'Khóa tài khoản' : 'Mở khóa tài khoản'
          );

          syncStateToDOM();
          if (willLock) {
            showToast(`Đã tạm khóa bảo mật tài khoản ${userCode} và gửi email thông báo.`, 'warning');
          } else {
            showToast(`Đã khôi phục quyền đăng nhập hệ thống cho tài khoản ${userCode}.`, 'success');
          }
        }
      });
    };

    /* 6. Export Admin Audit Report (Trang QT-06) */
    window.handleExportAdminAudit = () => {
      openDialog({
        title: 'Kết xuất Báo cáo Audit Phân quyền & Tài khoản',
        description: 'Xuất toàn bộ nhật ký phân quyền Admin có chữ ký số xác thực Hash SHA-256',
        content: `
          <div class="notice success"><b>Báo cáo Kiểm toán Phân quyền 2026</b></div>
          <div class="field"><label>Định dạng xuất báo cáo</label><select id="dlg-adm-aud-fmt"><option>PDF Báo cáo Audit Phân quyền (Mã băm SHA-256)</option><option>Excel Chi tiết Event Log Admin</option></select></div>
        `,
        confirmLabel: 'Tải Báo cáo Audit & Lưu Nhật ký',
        confirmTone: 'primary',
        onConfirm: (dialog) => {
          const fmt = dialog.querySelector('#dlg-adm-aud-fmt')?.value || 'PDF Báo cáo Audit';

          recordAuditLog(
            '[Admin - Quỳnh Anh] Kết xuất Báo cáo Audit Phân quyền',
            `Xuất toàn bộ nhật ký thao tác Admin. Định dạng: ${fmt}`,
            'Trạng thái: Báo cáo có xác thực mã băm SHA-256 hợp lệ 100%',
            'Xuất Audit Admin'
          );

          syncStateToDOM();
          showToast(`Đã xuất bản ghi Báo cáo Audit Phân quyền (Mã băm SHA-256 xác thực).`, 'success');
        }
      });
    };

    window.handleMarkAllRead = () => {
      document.querySelectorAll('#admin-notif-list [data-state="unread"]').forEach(row => {
        row.setAttribute('data-state', 'read');
        row.style.background = '#fff';
        row.style.borderLeftColor = 'var(--green)';
        const badge = row.querySelector('.badge.info, .badge.danger');
        if (badge) {
          badge.className = 'badge success';
          badge.textContent = '✓ Đã đọc';
        }
      });
      const state = loadState();
      state.unreadNotifications = 0;
      saveState(state);
      syncStateToDOM();
      showToast('Đã đánh dấu tất cả thông báo là đã đọc.', 'success');
    };
  }

  /* Global UI Export */
  const adminApiObj = {
    openDialog,
    showToast,
    escapeHtml,
    openAccountDrawer,
    resetDemo: () => resetDemoState(),
    handleMarkAllRead: () => window.handleMarkAllRead(),
    handleBatchApproveRoles: () => window.handleBatchApproveRoles(),
    handleApproveRoleReq: (id) => window.handleApproveRoleReq(id),
    handleCreateAccount: () => window.handleCreateAccount(),
    handleCreateAdminAccount: () => window.handleCreateAdminAccount(),
    handleToggleLockAccount: (code) => window.handleToggleLockAccount(code),
    handleExportAdminAudit: () => window.handleExportAdminAudit()
  };

  window.NCKHUI = adminApiObj;
  window.NCKH_ADMIN = adminApiObj;

  document.addEventListener('DOMContentLoaded', () => {
    setupHeader();
    setupFilters();
    injectResetButton();
    setupLiveDemoActions();
    syncStateToDOM();
  });
})();
