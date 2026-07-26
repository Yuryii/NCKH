(() => {
  'use strict';

  const bellIcon = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg>';
  const defaultUnreadCount = 4;
  const initialFormValues = new Map();

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
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
    window.setTimeout(() => toast.remove(), 3600);
  }

  function openDialog({ title, description = '', content = '', confirmLabel = '', confirmTone = 'primary', onConfirm }) {
    const dialog = document.createElement('dialog');
    dialog.className = 'demo-dialog';
    dialog.innerHTML = `<div class="dialog-head"><div><h2>${title}</h2>${description ? `<p class="meta">${description}</p>` : ''}</div><button class="dialog-close ghost" type="button" aria-label="Đóng">×</button></div><div class="dialog-body">${content}</div><div class="dialog-actions"><button class="secondary dialog-cancel" type="button">${confirmLabel ? 'Hủy' : 'Đóng'}</button>${confirmLabel ? `<button class="${confirmTone} dialog-confirm" type="button">${confirmLabel}</button>` : ''}</div>`;
    document.body.appendChild(dialog);
    const close = () => dialog.close();
    dialog.querySelector('.dialog-close').addEventListener('click', close);
    dialog.querySelector('.dialog-cancel').addEventListener('click', close);
    dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
    dialog.addEventListener('close', () => dialog.remove());
    const confirm = dialog.querySelector('.dialog-confirm');
    if (confirm) confirm.addEventListener('click', () => { if (!onConfirm || onConfirm(dialog) !== false) close(); });
    dialog.showModal();
    return dialog;
  }

  window.NCKHUI = { openDialog, showToast, escapeHtml };

  function setUnreadCount(count) {
    document.querySelectorAll('.bell-count, .nav-item[href="08-thong-bao.html"] .nav-count, [data-unread-count]').forEach(node => {
      node.textContent = String(count);
      node.hidden = count === 0;
    });
    const trigger = document.querySelector('.bell');
    if (trigger) trigger.setAttribute('aria-label', count ? `${count} thông báo chưa đọc` : 'Không có thông báo chưa đọc');
    const previewCount = document.querySelector('.popover-head .badge');
    if (previewCount) {
      previewCount.textContent = `${count} chưa đọc`;
      previewCount.hidden = count === 0;
    }
  }

  function setupHeader() {
    const bell = document.querySelector('.bell');
    if (bell) {
      bell.setAttribute('href', '08-thong-bao.html');
      bell.setAttribute('aria-haspopup', 'true');
      bell.setAttribute('aria-expanded', 'false');
      bell.innerHTML = `${bellIcon}<span class="bell-count">${defaultUnreadCount}</span>`;
      const center = document.createElement('div');
      center.className = 'notification-center';
      bell.parentNode.insertBefore(center, bell);
      center.appendChild(bell);
      const popover = document.createElement('section');
      popover.className = 'notification-popover';
      popover.hidden = true;
      popover.setAttribute('aria-label', 'Thông báo gần đây');
      popover.innerHTML = `<div class="popover-head"><b>Thông báo gần đây</b><span class="badge danger">${defaultUnreadCount} chưa đọc</span></div><a href="03b-bm01a-truong-don-vi-tra.html"><b>Trưởng đơn vị trả sửa Hồ sơ BM01A</b><span>22/07/2026 15:36</span></a><a href="03-bm01a-ho-so.html"><b>Đợt đăng ký sắp hết hạn — chưa tạo Hồ sơ</b><span>22/07/2026 09:40</span></a><a href="06-workspace-buoc-03-07.html"><b>Bạn được phân công bổ sung BM09</b><span>22/07/2026 08:12</span></a><a class="popover-all" href="08-thong-bao.html">Xem tất cả thông báo →</a>`;
      center.appendChild(popover);
      setUnreadCount(defaultUnreadCount);
      bell.addEventListener('click', event => {
        event.preventDefault();
        const willOpen = popover.hidden;
        popover.hidden = !willOpen;
        bell.setAttribute('aria-expanded', String(willOpen));
      });
      document.addEventListener('click', event => {
        if (!center.contains(event.target)) {
          popover.hidden = true;
          bell.setAttribute('aria-expanded', 'false');
        }
      });
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !popover.hidden) {
          popover.hidden = true;
          bell.setAttribute('aria-expanded', 'false');
          bell.focus();
        }
      });
    }

    const account = document.querySelector('.account');
    if (account && !account.closest('a')) {
      account.setAttribute('role', 'link');
      account.setAttribute('tabindex', '0');
      account.setAttribute('aria-label', 'Mở Hồ sơ cá nhân');
      const openProfile = () => { window.location.href = '09-ho-so-ca-nhan.html'; };
      account.addEventListener('click', openProfile);
      account.addEventListener('keydown', event => { if (event.key === 'Enter') openProfile(); });
    }

    const menu = document.querySelector('.mobile-menu');
    const sidebar = document.querySelector('.sidebar');
    if (menu && sidebar) {
      menu.setAttribute('aria-label', 'Mở menu');
      menu.setAttribute('aria-expanded', 'false');
      const overlay = document.createElement('button');
      overlay.className = 'sidebar-overlay';
      overlay.type = 'button';
      overlay.setAttribute('aria-label', 'Đóng menu');
      document.body.appendChild(overlay);
      const toggle = open => {
        sidebar.classList.toggle('open', open);
        overlay.classList.toggle('show', open);
        menu.setAttribute('aria-expanded', String(open));
      };
      menu.addEventListener('click', () => toggle(!sidebar.classList.contains('open')));
      overlay.addEventListener('click', () => toggle(false));
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && sidebar.classList.contains('open')) {
          toggle(false);
          menu.focus();
        }
      });
      sidebar.querySelectorAll('a').forEach(link => link.addEventListener('click', () => toggle(false)));
    }
  }

  function bindMemberActions(scope) {
    const button = scope.matches?.('[data-action="remove-member"]') ? scope : scope.querySelector('[data-action="remove-member"]');
    if (!button || button.dataset.bound) return;
    button.dataset.bound = 'true';
    button.addEventListener('click', () => {
      const row = button.closest('.doc-row');
      const name = row.querySelector('b').textContent;
      openDialog({
        title: `Xóa ${name} khỏi nhóm?`,
        description: 'Thay đổi chỉ áp dụng cho dữ liệu tạm trước khi Hồ sơ được tạo.',
        content: '<div class="notice warning">Sau khi nộp PDF và tạo Hồ sơ, danh sách thành viên sẽ bị khóa.</div>',
        confirmLabel: 'Xóa thành viên',
        confirmTone: 'danger',
        onConfirm: () => { row.remove(); showToast(`Đã xóa ${name} khỏi nhóm.`, 'warning'); }
      });
    });
  }

  function setupBm01() {
    const replacementSource = window.location.hash === '#nop-lai-HS-GV-2026-031' ? 'HS-GV-2026-031' : '';
    const createdApplicationId = 'HS-GV-2026-045';
    const applicationId = replacementSource || createdApplicationId;
    const applicationVersion = replacementSource ? 'V2' : 'V1';
    const roundClosed = new URLSearchParams(window.location.search).get('round') === 'closed';
    const regTypeSelect = document.getElementById('registration-type');
    const directContainer = document.getElementById('direct-topic-container');
    const directTopicSelect = document.getElementById('direct-topic-select');
    const topicNameInput = document.getElementById('topic-name');

    if (regTypeSelect) {
      regTypeSelect.addEventListener('change', () => {
        if (directContainer) {
          directContainer.style.display = regTypeSelect.value === 'giao-truc-tiep' ? 'block' : 'none';
        }
      });
    }
    if (directTopicSelect && topicNameInput) {
      directTopicSelect.addEventListener('change', () => {
        if (directTopicSelect.value) {
          topicNameInput.value = directTopicSelect.value;
          showToast(`Đã chọn đề tài giao trực tiếp: "${directTopicSelect.value}"`, 'info');
        }
      });
    }

    if (replacementSource && document.querySelector('[data-application-page]')) {
      document.querySelector('[data-application-page] h1').textContent = 'BM01A — Sửa và nộp lại V2';
      document.querySelector('[data-application-lead]').textContent = `${applicationId} · đang soạn BM01A V2 trên cùng Hồ sơ`;
      const rule = document.querySelector('[data-application-rule]');
      rule.innerHTML = `<b>Đang sửa BM01A V2 trên cùng Hồ sơ ${escapeHtml(applicationId)}.</b><br>V1 và PDF cũ được giữ bất biến; hãy cập nhật nội dung theo phản hồi của Trưởng đơn vị và chọn PDF mới.`;
      document.title = 'NCKH — BM01A V2 · HS-GV-2026-031';
      const v2Values = { 'topic-name': 'Mô hình gợi ý tài liệu học tập theo năng lực', objective: 'Đề xuất mô hình gợi ý tài liệu phù hợp với nhu cầu tra cứu và quản lý tri thức của đơn vị.', importance: 'Làm rõ nhu cầu tự động hóa quản lý và gợi ý tài liệu trong đơn vị.', 'expected-products': 'Bộ dữ liệu, mô hình gợi ý thử nghiệm và báo cáo khoa học.', 'research-content': 'Khảo sát nhu cầu, xây dựng mô hình gợi ý, đánh giá và chuyển giao kết quả.', duration: '12 tháng', budget: '25.000.000 đồng', 'application-effect': 'Ứng dụng tại thư viện số và hỗ trợ tra cứu tài liệu theo nhu cầu.' };
      Object.entries(v2Values).forEach(([id, value]) => { const field = document.getElementById(id); if (field) field.value = value; });
      document.querySelector('[data-action="submit-create-application"]').textContent = 'Nộp/cập nhật BM01A V2 trên cùng Hồ sơ';
    }
    const addButton = document.querySelector('[data-action="add-member"]');
    if (addButton) addButton.addEventListener('click', () => {
      const dialog = openDialog({
        title: 'Thêm thành viên nhóm nghiên cứu',
        description: 'Tìm bằng mã Giảng viên hoặc email Trường. Chỉ Tài khoản đủ điều kiện mới được thêm.',
        content: '<div class="field"><label for="member-search">Mã Giảng viên hoặc email</label><input id="member-search" value="GV-2025-0112" autocomplete="off"></div><div class="member-result"><span class="avatar">BT</span><div><b>ThS. Phạm Bảo Trâm</b><br><span class="meta">GV-2025-0112 · tram.pham@dntu.edu.vn · Khoa Công nghệ</span></div><span class="badge success">Đủ điều kiện</span></div><p id="member-search-error" class="meta" aria-live="polite"></p>',
        confirmLabel: 'Thêm vào nhóm',
        onConfirm: dialogNode => {
          const query = dialogNode.querySelector('#member-search').value.trim().toLowerCase();
          const error = dialogNode.querySelector('#member-search-error');
          if (!['gv-2025-0112', 'tram.pham@dntu.edu.vn'].includes(query)) { error.textContent = 'Không tìm thấy Giảng viên đủ điều kiện theo mã/email đã nhập.'; showToast('Không thể thêm: mã hoặc email không hợp lệ/không đủ điều kiện.', 'danger'); dialogNode.querySelector('#member-search').focus(); return false; }
          if (document.querySelector('[data-member-id="GV-2025-0112"]')) {
            showToast('Thành viên này đã có trong nhóm.', 'warning');
            return false;
          }
          const row = document.createElement('div');
          row.className = 'doc-row';
          row.dataset.memberId = 'GV-2025-0112';
          row.dataset.memberRow = '';
          row.innerHTML = '<div><b>ThS. Phạm Bảo Trâm</b><br><span class="meta">GV-2025-0112 · tram.pham@dntu.edu.vn · Thành viên tham gia</span></div><button class="secondary" type="button" data-action="remove-member">Xóa</button>';
          addButton.parentNode.insertBefore(row, addButton);
          bindMemberActions(row);
          showToast('Đã thêm ThS. Phạm Bảo Trâm vào nhóm nghiên cứu.');
        }
      });
      dialog.querySelector('#member-search').focus();
    });

    document.querySelectorAll('[data-member-row]').forEach(bindMemberActions);
    const viewOwner = document.querySelector('[data-action="view-member"]');
    if (viewOwner) viewOwner.addEventListener('click', () => openDialog({
      title: 'Thông tin thành viên',
      content: '<dl class="detail-list"><div><dt>Họ và tên</dt><dd>TS. Nguyễn Thị Lan</dd></div><div><dt>Mã Giảng viên</dt><dd>GV-2026-0088</dd></div><div><dt>Vai trò</dt><dd>Chủ nhiệm đề tài</dd></div><div><dt>Email Trường</dt><dd>lan.nguyen@dntu.edu.vn</dd></div></dl>'
    }));

    const pdfInput = document.querySelector('[data-application-pdf]');
    const submitApplication = document.querySelector('[data-action="submit-create-application"]');
    const refreshEligibility = () => {
      if (!submitApplication) return;
      const pdfReady = pdfInput?.dataset.ready === 'true';
      const requiredFields = [...document.querySelectorAll('[data-bm01-required]')];
      const fieldsReady = requiredFields.every(field => field.value.trim());
      const requiredCheck = document.querySelector('[data-required-check]');
      if (requiredCheck) { requiredCheck.className = `check ${fieldsReady ? 'ok' : 'blocked'}`; requiredCheck.textContent = fieldsReady ? '✓ Thông tin BM01A đầy đủ' : '! Còn trường BM01A bắt buộc chưa nhập'; }
      submitApplication.disabled = roundClosed || !(pdfReady && fieldsReady);
    };

    document.querySelectorAll('[data-bm01-required]').forEach(field => field.addEventListener('input', refreshEligibility));

    if (roundClosed && document.querySelector('[data-application-page]')) {
      const rule = document.querySelector('[data-application-rule]');
      rule.className = 'notice warning';
      rule.innerHTML = `<b>Đợt đăng ký đã đóng.</b><br>${replacementSource ? 'BM01A V2' : 'Hồ sơ mới'} chỉ được xem; tải PDF và nộp Hồ sơ đã hết hạn.`;
      document.querySelector('[data-application-lead]').textContent = 'Đợt đăng ký đã đóng · biểu mẫu chỉ đọc, không thể tải hoặc nộp PDF';
      document.querySelectorAll('[data-application-form] input, [data-application-form] select, [data-application-form] textarea, [data-action="add-member"], [data-action="remove-member"], [data-action="download-application-pdf"]').forEach(control => { control.disabled = true; });
    }

    if (pdfInput && submitApplication) {
      pdfInput.dataset.ready = 'false';
      pdfInput.disabled = roundClosed;
      refreshEligibility();
      pdfInput.addEventListener('change', async () => {
        const file = pdfInput.files?.[0];
        const status = document.querySelector('[data-pdf-status]');
        const check = document.querySelector('[data-pdf-check]');
        const rejectFile = (message, checkMessage) => {
          pdfInput.value = '';
          pdfInput.dataset.ready = 'false';
          refreshEligibility();
          status.className = 'notice danger';
          status.innerHTML = `<b>Tệp không hợp lệ.</b><br>${message}`;
          check.className = 'check blocked';
          check.textContent = checkMessage;
          pdfInput.focus();
        };
        pdfInput.dataset.ready = 'false';
        refreshEligibility();
        if (!file) {
          status.className = 'notice warning';
          status.innerHTML = '<b>Chưa chọn tệp PDF.</b><br>Chỉ một tệp PDF được gắn với Hồ sơ khi nộp.';
          check.className = 'check blocked';
          check.textContent = '! Chưa chọn PDF đã ký';
          return;
        }
        if (roundClosed) { rejectFile('Đợt đăng ký đã đóng; không thể tải tệp.', '! Đợt đăng ký đã đóng'); return; }
        if (file.size === 0) { rejectFile('Tệp rỗng (0 byte) không thể nộp.', '! Tệp PDF rỗng'); return; }
        if (!file.name.toLowerCase().endsWith('.pdf') || (file.type && file.type !== 'application/pdf')) {
          rejectFile('Chỉ chấp nhận tệp có định dạng PDF.', '! Tệp đã chọn không phải PDF');
          return;
        }
        let signature = '';
        let contentHash = '';
        try {
          const buffer = await file.arrayBuffer();
          signature = String.fromCharCode(...new Uint8Array(buffer.slice(0, 5)));
          const digest = await crypto.subtle.digest('SHA-256', buffer);
          contentHash = [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
        } catch (_error) {
          rejectFile('Không thể đọc hoặc băm nội dung tệp. Hãy chọn lại PDF.', '! Không đọc được tệp PDF');
          return;
        }
        if (pdfInput.files?.[0] !== file) return;
        if (signature !== '%PDF-') { rejectFile('Nội dung tệp không có chữ ký %PDF-.', '! Nội dung không phải PDF'); return; }
        const v1PdfHash = document.querySelector('[data-application-page]')?.dataset.v1PdfHash || '';
        if (replacementSource && v1PdfHash && contentHash === v1PdfHash) {
          rejectFile('BM01A V2 phải dùng nội dung PDF mới; bản V1 không được nộp lại dù đã đổi tên.', '! Nội dung PDF trùng V1');
          return;
        }
        status.className = 'notice success';
        status.innerHTML = `<b>${escapeHtml(file.name)}</b><br>${(file.size / 1024 / 1024).toFixed(2)} MB · chữ ký %PDF- hợp lệ · sẵn sàng nộp`;
        check.className = 'check ok';
        check.textContent = '✓ Đã chọn một PDF mới hợp lệ';
        pdfInput.dataset.ready = 'true';
        refreshEligibility();
      });

      submitApplication.addEventListener('click', () => {
        const file = pdfInput.files?.[0];
        if (roundClosed) {
          showToast('Đợt đăng ký đã đóng; không thể nộp Hồ sơ.', 'danger');
          refreshEligibility();
          return;
        }
        if (!file || pdfInput.dataset.ready !== 'true') {
          showToast('Hãy chọn PDF đã ký trước khi tạo Hồ sơ.', 'danger');
          pdfInput.focus();
          return;
        }
        openDialog({
          title: replacementSource ? 'Nộp/cập nhật BM01A V2 trên cùng Hồ sơ?' : 'Nộp PDF và tạo Hồ sơ?',
          description: 'BM01A · Vai trò: Chủ nhiệm đề tài',
          content: `<div class="notice warning"><b>Chỉ được nộp một lần.</b><br>Sau khi tạo, Hồ sơ và tệp ${escapeHtml(file.name)} sẽ bị khóa, không thể sửa hoặc thay thế.${replacementSource ? `<br>BM01A V2 sẽ cập nhật trên cùng Hồ sơ ${escapeHtml(applicationId)}; V1 không bị ghi đè.` : ''}</div>`,
          confirmLabel: replacementSource ? 'Nộp/cập nhật BM01A V2' : 'Nộp & tạo Hồ sơ',
          onConfirm: () => {
            if (roundClosed) { showToast('Đợt đăng ký đã đóng; thao tác nộp đã hết hạn.', 'danger'); return false; }
            document.querySelectorAll('[data-application-form] input, [data-application-form] select, [data-application-form] textarea, [data-action="add-member"], [data-action="remove-member"]').forEach(control => { control.disabled = true; });
            submitApplication.disabled = true;
            submitApplication.textContent = replacementSource ? 'Đã cập nhật BM01A V2' : 'Đã nộp · Hồ sơ đã tạo';
            document.querySelector('[data-application-lead]').textContent = `${applicationId} · ${applicationVersion} đã nộp lúc ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} · Chờ Trưởng đơn vị`;
            const badge = document.querySelector('[data-application-badge]');
            badge.className = 'badge success';
            badge.textContent = 'Chờ Trưởng đơn vị duyệt';
            const rule = document.querySelector('[data-application-rule]');
            rule.className = 'notice success';
            rule.innerHTML = `<b>${applicationVersion} đã được nộp và khóa.</b><br>Hồ sơ chuyển tới Trưởng đơn vị; phiên bản trước được giữ lịch sử.`;
            showToast(replacementSource ? `Đã nộp/cập nhật BM01A V2 trên cùng Hồ sơ ${applicationId}.` : `Đã nộp PDF và tạo Hồ sơ ${applicationId}.`);
          }
        });
      });
    }

    const downloadApplication = document.querySelector('[data-action="download-application-pdf"]');
    if (downloadApplication) downloadApplication.addEventListener('click', () => {
      if (roundClosed) { showToast('Đợt đăng ký đã đóng; không thể tạo hoặc tải PDF.', 'danger'); return; }
      showToast('PDF BM01A đã được tạo để tải xuống và ký.');
    });

    const previewApplication = document.querySelector('[data-action="preview-application-pdf"]');
    if (previewApplication) previewApplication.addEventListener('click', () => {
      const topicName = document.querySelector('#topic-name');
      const researchField = document.querySelector('#research-field');
      const unit = document.querySelector('#unit');
      const objective = document.querySelector('#objective');
      const importance = document.querySelector('#importance');
      const expectedProducts = document.querySelector('#expected-products');
      const researchContent = document.querySelector('#research-content');
      const duration = document.querySelector('#duration');
      const budget = document.querySelector('#budget');
      const applicationEffect = document.querySelector('#application-effect');
      const selectedAdvisorName = 'Trưởng đơn vị Khoa Công nghệ';
      const members = ['TS. Nguyễn Thị Lan — Chủ nhiệm đề tài', ...[...document.querySelectorAll('[data-member-row]')].map(row => `${row.querySelector('b').textContent} — Thành viên tham gia`)];
      const dialog = openDialog({
        title: 'Xem trước PDF BM01A',
        description: 'PDF bên trái cập nhật ngay khi dữ liệu form bên phải thay đổi.',
        content: `<div class="live-preview-layout"><section class="live-preview-pane" aria-label="Bản xem trước PDF"><div class="live-preview-toolbar"><b>Bản xem trước PDF</b><span class="meta">Trang 1 / 1 · tự động cập nhật</span></div><article class="pdf-sheet"><div class="pdf-sheet-header"><b>Trường Đại học Công nghệ Đồng Nai</b><span>Phòng Khoa học Công nghệ</span><h3>Phiếu đăng ký đề tài nghiên cứu khoa học</h3><span>BM01A · Dành cho Giảng viên</span></div><div class="pdf-sheet-section"><h4>1. Thông tin đề tài</h4><div class="pdf-sheet-row"><span>Tên đề tài:</span><span class="pdf-sheet-value" data-live-pdf="topic">${escapeHtml(topicName.value)}</span></div><div class="pdf-sheet-row"><span>Lĩnh vực:</span><span class="pdf-sheet-value" data-live-pdf="field">${escapeHtml(researchField.value)}</span></div><div class="pdf-sheet-row"><span>Mục tiêu:</span><span class="pdf-sheet-value" data-live-pdf="objective">${escapeHtml(objective.value)}</span></div><div class="pdf-sheet-row"><span>Tính cấp thiết:</span><span class="pdf-sheet-value" data-live-pdf="importance">${escapeHtml(importance.value)}</span></div><div class="pdf-sheet-row"><span>Sản phẩm:</span><span class="pdf-sheet-value" data-live-pdf="products">${escapeHtml(expectedProducts.value)}</span></div><div class="pdf-sheet-row"><span>Nội dung:</span><span class="pdf-sheet-value" data-live-pdf="content">${escapeHtml(researchContent.value)}</span></div><div class="pdf-sheet-row"><span>Thời gian:</span><span class="pdf-sheet-value" data-live-pdf="duration">${escapeHtml(duration.value)}</span></div><div class="pdf-sheet-row"><span>Kinh phí:</span><span class="pdf-sheet-value" data-live-pdf="budget">${escapeHtml(budget.value)}</span></div><div class="pdf-sheet-row"><span>Ứng dụng/hiệu quả:</span><span class="pdf-sheet-value" data-live-pdf="application-effect">${escapeHtml(applicationEffect.value)}</span></div></div><div class="pdf-sheet-section"><h4>2. Nhóm nghiên cứu</h4><div class="pdf-sheet-value">${members.map(member => `• ${escapeHtml(member)}`).join('<br>')}</div></div><div class="pdf-sheet-section"><h4>3. Trưởng đơn vị</h4><div class="pdf-sheet-value">${escapeHtml(selectedAdvisorName)}</div></div><div class="pdf-signatures"><div><b>Chủ nhiệm đề tài</b><br><span>(Ký và ghi rõ họ tên)</span></div><div><b>Trưởng đơn vị</b><br><span>(Ký và ghi rõ họ tên)</span></div></div></article></section><section class="live-form-pane" aria-label="Form dữ liệu xem trước"><div class="notice"><b>Chỉnh sửa dữ liệu xem trước</b><br>Thay đổi tại đây được đồng bộ về form chính. Đây chưa phải PDF đã ký hoặc Hồ sơ đã nộp.</div><div class="field"><label for="preview-topic-name">Tên đề tài</label><input id="preview-topic-name" value="${escapeHtml(topicName.value)}"></div><div class="field"><label for="preview-research-field">Lĩnh vực nghiên cứu</label><select id="preview-research-field"><option${researchField.value === 'Công nghệ thông tin' ? ' selected' : ''}>Công nghệ thông tin</option><option${researchField.value === 'Kinh tế' ? ' selected' : ''}>Kinh tế</option><option${researchField.value === 'Kỹ thuật điện' ? ' selected' : ''}>Kỹ thuật điện</option></select></div><div class="field"><label for="preview-objective">Mục tiêu nghiên cứu</label><textarea id="preview-objective">${escapeHtml(objective.value)}</textarea></div><div class="field"><label for="preview-importance">Tính cấp thiết</label><textarea id="preview-importance">${escapeHtml(importance.value)}</textarea></div><div class="field"><label for="preview-products">Sản phẩm dự kiến</label><textarea id="preview-products">${escapeHtml(expectedProducts.value)}</textarea></div><div class="field"><label for="preview-content">Nội dung nghiên cứu</label><textarea id="preview-content">${escapeHtml(researchContent.value)}</textarea></div><div class="field"><label for="preview-duration">Thời gian</label><input id="preview-duration" value="${escapeHtml(duration.value)}"></div><div class="field"><label for="preview-budget">Kinh phí</label><input id="preview-budget" value="${escapeHtml(budget.value)}"></div><div class="field"><label for="preview-application-effect">Khả năng ứng dụng và hiệu quả</label><textarea id="preview-application-effect">${escapeHtml(applicationEffect.value)}</textarea></div><div class="live-form-readonly"><b>Nhóm nghiên cứu</b><p class="meta">${members.map(escapeHtml).join('<br>')}</p></div><div class="live-form-readonly"><b>Trưởng đơn vị</b><p class="meta">${escapeHtml(selectedAdvisorName)}</p></div></section></div>`
      });
      dialog.classList.add('preview-dialog');
      if (roundClosed) {
        dialog.querySelectorAll('.live-form-pane input, .live-form-pane select, .live-form-pane textarea').forEach(control => { control.disabled = true; });
        const previewNotice = dialog.querySelector('.live-form-pane .notice');
        previewNotice.innerHTML = '<b>Bản xem trước chỉ đọc.</b><br>Đợt đăng ký đã đóng; không thể chỉnh sửa dữ liệu từ cửa sổ này.';
      }
      const bindings = [
        ['#preview-topic-name', topicName, '[data-live-pdf="topic"]'],
        ['#preview-research-field', researchField, '[data-live-pdf="field"]'],
        ['#preview-objective', objective, '[data-live-pdf="objective"]'],
        ['#preview-importance', importance, '[data-live-pdf="importance"]'],
        ['#preview-products', expectedProducts, '[data-live-pdf="products"]'],
        ['#preview-content', researchContent, '[data-live-pdf="content"]'],
        ['#preview-duration', duration, '[data-live-pdf="duration"]'],
        ['#preview-budget', budget, '[data-live-pdf="budget"]'],
        ['#preview-application-effect', applicationEffect, '[data-live-pdf="application-effect"]']
      ];
      bindings.forEach(([inputSelector, source, previewSelector]) => {
        const input = dialog.querySelector(inputSelector);
        input.addEventListener('input', () => {
          source.value = input.value;
          dialog.querySelector(previewSelector).textContent = input.value || '—';
          source.dispatchEvent(new Event('input', { bubbles: true }));
        });
      });
      dialog.querySelector('#preview-topic-name').focus();
    });
  }

  function setupReturnedRoundClosure() {
    const page = document.querySelector('[data-returned-application]');
    if (!page) return;
    const actions = [...page.querySelectorAll('[data-action="resubmit-returned-bm01"]')];
    const isClosed = () => new URLSearchParams(window.location.search).get('round') === 'closed';
    actions.forEach(action => action.addEventListener('click', event => {
      if (!isClosed()) return;
      event.preventDefault();
      showToast('Đợt đăng ký đã đóng; không thể nộp lại BM01A.', 'danger');
    }));
    if (!isClosed()) return;
    actions.forEach(action => { action.hidden = true; action.removeAttribute('href'); action.setAttribute('aria-disabled', 'true'); });
    const notice = document.createElement('div');
    notice.className = 'notice warning';
    notice.dataset.roundClosedNotice = '';
    notice.innerHTML = '<b>Đợt đăng ký đã đóng.</b><br>BM01A V1 và phản hồi chỉ còn ở chế độ xem; không có đường sửa hoặc nộp lại.';
    page.querySelector('.page-head').insertAdjacentElement('afterend', notice);
  }

  function syncReviewQueue() {
    const saved = localStorage.getItem('nckh-gv-review-decision');
    if (!saved) return;
    document.querySelectorAll('[data-review-nav-count]').forEach(node => { node.textContent = '0'; node.hidden = true; });
  }

  function setupNotifications() {
    const page = document.querySelector('[data-notification-page]');
    if (!page) return;
    const rows = [...page.querySelectorAll('[data-notification-category]')];
    const tabs = [...page.querySelectorAll('[data-notification-filter]')];
    const filter = value => {
      tabs.forEach(tab => {
        const active = tab.dataset.notificationFilter === value;
        tab.classList.toggle('active', active);
        tab.setAttribute('aria-selected', String(active));
      });
      rows.forEach(row => { row.hidden = value === 'unread' ? !row.classList.contains('unread') : value === 'all' ? false : row.dataset.notificationCategory !== value; });
      page.querySelector('.notification-empty').hidden = rows.some(row => !row.hidden);
    };
    tabs.forEach(tab => tab.addEventListener('click', () => filter(tab.dataset.notificationFilter)));
    const markAll = page.querySelector('[data-action="mark-all-read"]');
    markAll.addEventListener('click', () => {
      rows.forEach(row => row.classList.remove('unread'));
      page.querySelectorAll('.tab-count').forEach(node => { node.textContent = '0'; node.hidden = true; });
      setUnreadCount(0);
      filter(tabs.find(tab => tab.classList.contains('active')).dataset.notificationFilter);
      markAll.disabled = true;
      markAll.textContent = 'Đã đọc tất cả';
      showToast('Đã đánh dấu tất cả thông báo là đã đọc.');
    });
  }

  function setupSimpleActions() {
    document.querySelectorAll('[data-action="send-verification"], [data-action="resend-verification"]').forEach(button => button.addEventListener('click', () => {
      button.textContent = 'Đã gửi liên kết';
      button.disabled = true;
      showToast('Đã gửi liên kết xác minh đến email Trường.');
    }));

    const cancelRequest = document.querySelector('[data-action="submit-cancel-request"]');
    if (cancelRequest) cancelRequest.addEventListener('click', () => {
      const acknowledged = document.querySelector('[data-cancel-ack]');
      const reason = document.querySelector('[data-cancel-reason]');
      if (!reason.value.trim() || !acknowledged.checked) {
        showToast('Hãy nhập lý do và xác nhận bạn hiểu quy trình.', 'danger');
        (!reason.value.trim() ? reason : acknowledged).focus();
        return;
      }
      openDialog({
        title: 'Gửi yêu cầu hủy đề tài?',
        description: 'NCKH-GV-2026-014 · Vai trò: Chủ nhiệm đề tài',
        content: `<div class="notice warning">Đề tài chưa bị hủy. P.KHCN sẽ nhận yêu cầu và phản hồi sau khi xem xét.</div><p><b>Lý do:</b> ${escapeHtml(reason.value)}</p>`,
        confirmLabel: 'Gửi yêu cầu',
        confirmTone: 'danger',
        onConfirm: () => {
          cancelRequest.disabled = true;
          cancelRequest.textContent = 'Đã gửi yêu cầu';
          showToast('Yêu cầu hủy đã được gửi đến P.KHCN.');
        }
      });
    });

    document.querySelectorAll('[data-action="upload-demo"]').forEach(button => button.addEventListener('click', () => {
      if (button.dataset.activeDocument && button.dataset.activeDocument !== 'bm09') { showToast('Chỉ tải sản phẩm khi đang mở tab BM09.', 'warning'); return; }
      openDialog({
        title: 'Tải tệp sản phẩm',
        description: 'Mockup mô phỏng bước chọn tệp; upload chưa đồng nghĩa với Nộp BM09.',
        content: '<div class="upload"><b>dataset-tuyen-sinh-clean-v1.zip</b><br><span class="meta">18,4 MB · ZIP · sẵn sàng tải lên</span></div>',
        confirmLabel: 'Tải lên',
        onConfirm: () => {
          const row = document.querySelector('#bm09 .doc-row');
          if (row) {
            const badge = row.querySelector('.badge');
            badge.className = 'badge success';
            badge.textContent = 'Đã tải lên · V1';
          }
          showToast('Đã tải sản phẩm lên bản nháp BM09.');
        }
      });
    }));

    document.querySelectorAll('[data-action="view-document"]').forEach(button => button.addEventListener('click', () => openDialog({
      title: 'BM12 — Biên bản nghiệm thu',
      description: 'V2 · đủ hai chữ ký · hiện hành',
      content: '<div class="document-preview"><b>Bản xem trước tài liệu</b><p>Biên bản nghiệm thu đề tài NCKH-GV-2025-018</p><p class="meta">Bản HTML mô phỏng. Bản triển khai cần viewer PDF, tải xuống và dữ liệu nguồn truy cập được.</p></div>'
    })));

    document.querySelectorAll('[data-action="view-submitted-bm01"]').forEach(button => button.addEventListener('click', () => {
      const studentReview = button.dataset.pdfId === 'HS-SV-2026-044';
      openDialog({
        title: studentReview ? 'BM01B — PDF đã nộp' : 'BM01A — PDF đã nộp',
        description: studentReview ? 'HS-SV-2026-044 · V1 bất biến' : 'HS-GV-2026-031 · V1 bất biến',
        content: studentReview ? '<div class="document-preview"><b>BM01B-HS-SV-2026-044-V1.pdf</b><p>Phân loại tài liệu nghiên cứu bằng học máy</p><p class="meta">Lê Hoàng Minh nộp 22/07/2026 10:14 · 2,04 MB · đúng assignment hiện hành.</p></div>' : '<div class="document-preview"><b>BM01A-HS-GV-2026-031-V1.pdf</b><p>Mô hình gợi ý tài liệu học tập theo năng lực</p><p class="meta">TS. Nguyễn Thị Lan nộp 20/07/2026 14:20 · bản bị Trưởng đơn vị trả sửa và được giữ bất biến.</p></div>'
      });
    }));

    const profile = document.querySelector('[data-profile-form]');
    if (profile) {
      profile.querySelectorAll('input:not([readonly])').forEach(input => initialFormValues.set(input, input.value));
      document.querySelector('[data-action="reset-profile"]').addEventListener('click', () => {
        initialFormValues.forEach((value, input) => { input.value = value; });
        showToast('Đã hủy các thay đổi chưa lưu.', 'warning');
      });
      document.querySelector('[data-action="save-profile"]').addEventListener('click', () => {
        profile.querySelectorAll('input:not([readonly])').forEach(input => initialFormValues.set(input, input.value));
        showToast('Đã lưu Hồ sơ cá nhân.');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupHeader();
    setupBm01();
    setupReturnedRoundClosure();
    syncReviewQueue();
    setupNotifications();
    setupSimpleActions();
  });
})();
