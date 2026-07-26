(() => {
  'use strict';

  const STORAGE_KEY = 'NCKH_TD_PERSISTENT_STATE_V2';

  /* -------------------------------------------------------------
     PERSISTENT STATE ENGINE (localStorage)
     ------------------------------------------------------------- */
  function getDefaultState() {
    return {
      unreadNotifications: 2,
      pendingTasksCount: 2,
      decisions: {
        'td-hs': { status: 'pending', code: 'HS-GV-2026-042', version: 'BM01 V1' },
        'td-bm08': { status: 'pending', code: 'NCKH-GV-2026-014', version: 'BM08 V2' }
      },
      auditLogs: []
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
    showToast('Đã khôi phục dữ liệu Trưởng Khoa về trạng thái ban đầu.', 'info');
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

  /* Slide-over Drawer for BM01A / BM08 Document Previews */
  function openDocumentDrawer({ title, docType, data = {} }) {
    const overlay = document.createElement('div');
    overlay.className = 'drawer-overlay';

    let bodyHtml = '';
    if (docType === 'bm01a') {
      bodyHtml = `
        <div style="background:var(--surface); padding:16px; border:1px solid var(--border); border-radius:6px; margin-bottom:16px;">
          <h3 style="margin:0 0 6px;">${escapeHtml(data.title || 'Thuyết minh Đề tài NCKH cấp Trường BM01A')}</h3>
          <p class="meta" style="margin:0;">Chủ nhiệm đề tài: <b>${escapeHtml(data.author || 'TS. Nguyễn Thị Lan')}</b> · Khoa Công nghệ Thông tin</p>
        </div>
        <div class="card" style="margin-bottom:14px;">
          <h3>1. Mục tiêu & Tính cấp thiết đề tài</h3>
          <p style="font-size:13px; color:var(--body);">Xây dựng hệ thống cảm biến IoT giám sát nhiệt độ, độ ẩm đất và ứng dụng thuật toán Học máy dự báo thời điểm tưới tiêu tự động cho nông sản.</p>
        </div>
        <div class="card">
          <h3>2. Xác nhận của Trưởng Khoa / Đơn vị</h3>
          <div class="check-item" style="margin-bottom:8px;">✓ Đã xác minh năng lực nghiên cứu của Chủ nhiệm đề tài</div>
          <div class="check-item">✓ Đã bố trí phòng thí nghiệm IoT và thiết bị phục vụ đề tài</div>
          <div id="stamp-bm01-sign" class="${data.isApproved ? 'pdf-signature-stamp' : ''}" style="margin-top:12px;">
            ${data.isApproved ? '✓ ĐÃ PHÊ DUYỆT CẤP KHOA<br>Trưởng Khoa CNTT: TS. Nguyễn Văn Nam' : '<span class="meta">Chưa ký phê duyệt</span>'}
          </div>
        </div>
      `;
    } else {
      bodyHtml = `
        <div style="background:var(--surface); padding:16px; border:1px solid var(--border); border-radius:6px; margin-bottom:16px;">
          <h3 style="margin:0 0 6px;">Báo cáo tiến độ BM08 V2</h3>
          <p class="meta" style="margin:0;">NCKH-GV-2026-014 · Đơn vị: Khoa Công nghệ Thông tin</p>
        </div>
        <div class="card" style="margin-bottom:14px;">
          <h3>Thông tin phiên bản</h3>
          <ul style="padding-left:18px; margin:6px 0; font-size:13px;">
            <li>Đề tài: <b>Hệ thống học tập trực tuyến thông minh dựa trên AI</b></li>
            <li>Chủ nhiệm: <b>ThS. Trần Văn Hùng</b></li>
            <li>PDF hiện tại: <b>BM08 V2 đã ký bởi Chủ nhiệm</b></li>
          </ul>
        </div>
        <div class="card">
          <h3>Tuyến xử lý</h3>
          <div id="stamp-bm08-sign" class="${data.isRouted ? 'pdf-signature-stamp' : ''}">
            ${data.isRouted ? '✓ ĐÃ CHUYỂN P.KHCN<br>BM08 V2 đã có chữ ký bổ sung của đơn vị' : '<span class="meta">Chờ kiểm tra hoặc trả chỉnh sửa</span>'}
          </div>
        </div>
      `;
    }

    overlay.innerHTML = `
      <div class="drawer-panel">
        <div class="drawer-head">
          <h2>${escapeHtml(title)}</h2>
          <button class="dialog-close drawer-close" type="button" aria-label="Đóng">×</button>
        </div>
        <div class="drawer-body">${bodyHtml}</div>
        <div class="drawer-foot">
          <button class="secondary drawer-close" type="button">Đóng lại</button>
          <button class="primary" type="button" onclick="window.NCKH_TD.showToast('Đã trích xuất văn bản có mã băm SHA-256 xác thực.', 'success')">Tải Văn bản PDF</button>
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
     DOM HYDRATION FROM LOCALSTORAGE
     ------------------------------------------------------------- */
  function syncStateToDOM() {
    const state = loadState();

    /* 1. Task Counters */
    document.querySelectorAll('.bell-count, [data-unread-count]').forEach(node => {
      node.textContent = String(state.unreadNotifications);
      node.hidden = state.unreadNotifications === 0;
    });

    document.querySelectorAll('.nav-count, .task-count').forEach(el => {
      el.textContent = String(state.pendingTasksCount);
    });

    Object.entries(state.decisions || {}).forEach(([recordId, decision]) => updateDecisionUI(recordId, decision));

    setupFilters();
  }

  function updateDecisionUI(recordId, decision) {
    const record = document.getElementById(recordId) || document.querySelector(`[data-record-id="${recordId}"]`);
    if (!record || decision.status === 'pending') return;

    const label = decision.status === 'approved' ? 'Đã duyệt · đã chuyển P.KHCN'
      : decision.status === 'routed' ? 'Đã chuyển P.KHCN'
      : 'Đã trả chỉnh sửa';
    const tone = decision.status === 'returned' ? 'warning' : 'success';
    record.dataset.state = 'completed';
    record.querySelectorAll('[data-decision-status]').forEach(node => {
      node.className = `badge ${tone}`;
      node.textContent = label;
    });
    record.querySelectorAll('[data-decision-action]').forEach(control => {
      control.className = 'secondary';
      control.textContent = label;
      control.disabled = true;
      control.setAttribute('aria-disabled', 'true');
      control.removeAttribute('href');
    });
  }

  function saveDecision(recordId, status, extra = {}) {
    const state = loadState();
    state.decisions = state.decisions || {};
    state.decisions[recordId] = { ...(state.decisions[recordId] || {}), status, ...extra };
    state.pendingTasksCount = Object.values(state.decisions).filter(item => item.status === 'pending').length;
    saveState(state);
    return state.decisions[recordId];
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
        window.location.href = '../shared/profile.html#td';
      });
    }
  }

  function setupFilters() {
    const searchInput = document.querySelector('[data-search], #page-search, #search');
    const filterSelect = document.querySelector('[data-filter], #page-filter, #status');
    const rows = document.querySelectorAll('[data-record], .work-row, .data-table tbody tr');

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
          matchFilter = state === 'open';
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

  function injectResetButton() {
    if (!document.querySelector('.reset-demo-btn')) {
      const resetBtn = document.createElement('button');
      resetBtn.className = 'reset-demo-btn';
      resetBtn.type = 'button';
      resetBtn.innerHTML = '🔄';
      resetBtn.title = 'Reset Dữ liệu Demo Trưởng Khoa về ban đầu';
      resetBtn.addEventListener('click', () => resetDemoState());
      document.body.appendChild(resetBtn);
    }
  }

  /* -------------------------------------------------------------
     PERSISTENT INTERACTION HANDLERS FOR DEPARTMENT HEAD
     ------------------------------------------------------------- */
  function setupLiveDemoActions() {

    /* BM01: each decision is explicit and the return path preserves the version. */
    window.handleApproveBM01 = (projId = 'td-hs') => {
      openDialog({
        title: 'Duyệt hồ sơ BM01',
        description: 'Xác nhận hồ sơ BM01 V1 thuộc đúng đơn vị trước khi chuyển P.KHCN.',
        content: `
          <div class="notice success"><b>Đề tài: HS-GV-2026-042 (TS. Nguyễn Thị Lan)</b></div>
          <div class="field" style="margin-top:10px;"><label for="dlg-bm01-note">Ý kiến xử lý</label><textarea id="dlg-bm01-note">Đủ điều kiện chuyển P.KHCN theo tuyến xét duyệt của đơn vị.</textarea></div>
        `,
        confirmLabel: 'Duyệt & chuyển P.KHCN',
        confirmTone: 'primary',
        onConfirm: (dialog) => {
          const note = dialog.querySelector('#dlg-bm01-note')?.value.trim() || 'Đã duyệt hồ sơ BM01 V1.';
          saveDecision(projId, 'approved', { note });

          recordAuditLog(
            'Duyệt hồ sơ BM01 V1',
            `HS-GV-2026-042 đã được duyệt. Ý kiến: ${note}`,
            'Đã chuyển P.KHCN theo tuyến xét duyệt.',
            'Duyệt BM01'
          );

          syncStateToDOM();
          showToast('Đã duyệt BM01 V1 và chuyển P.KHCN.', 'success');
        }
      });
    };

    window.handleReturnBM01 = (projId = 'td-hs') => {
      openDialog({
        title: 'Trả BM01 để chỉnh sửa',
        description: 'Lý do là bắt buộc; BM01 V1 được giữ trong lịch sử.',
        content: `
          <div class="field"><label for="dlg-bm01-return">Lý do trả chỉnh sửa</label><textarea id="dlg-bm01-return" required placeholder="Nêu nội dung cần bổ sung hoặc điều chỉnh"></textarea></div>
        `,
        confirmLabel: 'Trả hồ sơ',
        confirmTone: 'danger',
        onConfirm: (dialog) => {
          const reason = dialog.querySelector('#dlg-bm01-return')?.value.trim();
          if (!reason) {
            showToast('Cần nhập lý do trước khi trả BM01.', 'danger');
            return false;
          }
          saveDecision(projId, 'returned', { reason });

          recordAuditLog(
            'Trả BM01 V1 để chỉnh sửa',
            `HS-GV-2026-042 được trả. Lý do: ${reason}`,
            'Chủ nhiệm tạo BM01 V2 để nộp lại; BM01 V1 được giữ lịch sử.',
            'Trả BM01'
          );

          syncStateToDOM();
          showToast('Đã trả BM01 để chỉnh sửa kèm lý do.', 'warning');
        }
      });
    };

    window.handleRouteBM08 = (repId = 'td-bm08') => {
      openDialog({
        title: 'Chuyển BM08 cho P.KHCN',
        description: 'Tải PDF BM08 đã ký bổ sung của đơn vị; P.KHCN là bên ghi nhận tiếp theo.',
        content: `
          <div class="notice">BM08 V2 hiện có chữ ký Chủ nhiệm. Tải bản đã ký bổ sung của đơn vị để tiếp tục.</div>
          <div class="field" style="margin-top:10px;"><label for="dlg-bm08-file">PDF BM08 đã ký bổ sung</label><input id="dlg-bm08-file" type="file" accept="application/pdf" required></div>
        `,
        confirmLabel: 'Chuyển P.KHCN',
        confirmTone: 'primary',
        onConfirm: (dialog) => {
          if (!dialog.querySelector('#dlg-bm08-file')?.files.length) {
            showToast('Cần chọn PDF BM08 đã ký bổ sung.', 'danger');
            return false;
          }
          saveDecision(repId, 'routed', { version: 'BM08 V2' });

          recordAuditLog(
            'Chuyển BM08 V2 cho P.KHCN',
            'Đã tải PDF BM08 có chữ ký bổ sung của đơn vị.',
            'P.KHCN chờ ghi nhận phiên bản được chuyển.',
            'Chuyển BM08'
          );

          syncStateToDOM();
          showToast('Đã chuyển BM08 V2 cho P.KHCN.', 'success');
        }
      });
    };

    window.handleReturnBM08 = (repId = 'td-bm08') => {
      openDialog({
        title: 'Trả BM08 để chỉnh sửa',
        description: 'Lý do là bắt buộc; phiên bản BM08 V2 không bị ghi đè.',
        content: `<div class="field"><label for="dlg-bm08-return">Lý do trả chỉnh sửa</label><textarea id="dlg-bm08-return" required placeholder="Nêu nội dung cần điều chỉnh"></textarea></div>`,
        confirmLabel: 'Trả BM08',
        confirmTone: 'danger',
        onConfirm: (dialog) => {
          const reason = dialog.querySelector('#dlg-bm08-return')?.value.trim();
          if (!reason) {
            showToast('Cần nhập lý do trước khi trả BM08.', 'danger');
            return false;
          }
          saveDecision(repId, 'returned', { reason });
          recordAuditLog('Trả BM08 V2 để chỉnh sửa', `NCKH-GV-2026-014 được trả. Lý do: ${reason}`, 'Chủ nhiệm tạo phiên bản mới; BM08 V2 được giữ lịch sử.', 'Trả BM08');
          syncStateToDOM();
          showToast('Đã trả BM08 để chỉnh sửa kèm lý do.', 'warning');
        }
      });
    };

    window.handleMarkAllRead = () => {
      document.querySelectorAll('#td-notif-list [data-state="unread"]').forEach(row => {
        row.setAttribute('data-state', 'read');
        row.style.background = '#fff';
        row.style.borderLeftColor = 'var(--green)';
        const badge = row.querySelector('.badge.info, .badge.warning');
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
  window.NCKH_TD = {
    openDialog,
    showToast,
    escapeHtml,
    openDocumentDrawer,
    resetDemo: () => resetDemoState(),
    handleMarkAllRead: () => window.handleMarkAllRead(),
    handleApproveBM01: (id) => window.handleApproveBM01(id),
    handleReturnBM01: (id) => window.handleReturnBM01(id),
    handleRouteBM08: (id) => window.handleRouteBM08(id),
    handleReturnBM08: (id) => window.handleReturnBM08(id)
  };

  document.addEventListener('DOMContentLoaded', () => {
    setupHeader();
    setupFilters();
    injectResetButton();
    setupLiveDemoActions();
    syncStateToDOM();
  });
})();
