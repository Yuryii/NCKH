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
      popover.innerHTML = `<div class="popover-head"><b>Thông báo gần đây</b><span class="badge danger">${defaultUnreadCount} chưa đọc</span></div><a href="03b-bm01b-gvhd-tu-choi.html"><b>GVHD từ chối ký Hồ sơ BM01B</b><span>22/07/2026 15:36</span></a><a href="03-bm01b-ho-so.html"><b>Đợt đăng ký sắp hết hạn — chưa tạo Hồ sơ</b><span>22/07/2026 09:40</span></a><a href="06-workspace-buoc-03-07.html"><b>Bạn được phân công bổ sung BM09</b><span>22/07/2026 08:12</span></a><a class="popover-all" href="08-thong-bao.html">Xem tất cả thông báo →</a>`;
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
      const openProfile = () => { window.location.href = '09-ho-so-va-khong-quyen.html'; };
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
    const replacementSource = window.location.hash.startsWith('#thay-the-') ? window.location.hash.slice('#thay-the-'.length) : '';
    const applicationId = replacementSource ? 'HS-SV-2026-032' : 'HS-SV-2026-031';
    if (replacementSource && document.querySelector('[data-application-page]')) {
      document.querySelector('[data-application-page] h1').textContent = 'BM01B — Tạo Hồ sơ thay thế';
      document.querySelector('[data-application-lead]').textContent = `Hồ sơ mới sẽ liên kết tới ${replacementSource} · chưa được tạo cho đến khi nộp PDF thành công`;
      const rule = document.querySelector('[data-application-rule]');
      rule.innerHTML = `<b>Đây là Hồ sơ thay thế cho ${escapeHtml(replacementSource)}.</b><br>Thông tin và PDF cũ không được sửa hoặc sao chép tự động. Hãy hoàn thiện phản hồi của GVHD, chọn một PDF mới và nộp một lần.`;
    }
    const addButton = document.querySelector('[data-action="add-member"]');
    if (addButton) addButton.addEventListener('click', () => {
      const dialog = openDialog({
        title: 'Thêm thành viên nhóm nghiên cứu',
        description: 'Tìm bằng mã Sinh viên hoặc email Trường. Thành viên được thêm vào dữ liệu tạm trước khi tạo Hồ sơ.',
        content: '<div class="field"><label for="member-search">Mã Sinh viên hoặc email</label><input id="member-search" value="22112788" autocomplete="off"></div><div class="member-result"><span class="avatar">BT</span><div><b>Phạm Bảo Trâm</b><br><span class="meta">22112788 · Khoa Công nghệ</span></div><span class="badge success">Đủ điều kiện</span></div>',
        confirmLabel: 'Thêm vào nhóm',
        onConfirm: () => {
          if (document.querySelector('[data-member-id="22112788"]')) {
            showToast('Thành viên này đã có trong nhóm.', 'warning');
            return false;
          }
          const row = document.createElement('div');
          row.className = 'doc-row';
          row.dataset.memberId = '22112788';
          row.innerHTML = '<div><b>Phạm Bảo Trâm</b><br><span class="meta">22112788 · Thành viên tham gia</span></div><button class="secondary" type="button" data-action="remove-member">Xóa</button>';
          addButton.parentNode.insertBefore(row, addButton);
          bindMemberActions(row);
          showToast('Đã thêm Phạm Bảo Trâm vào nhóm nghiên cứu.');
        }
      });
      dialog.querySelector('#member-search').focus();
    });

    document.querySelectorAll('[data-member-row]').forEach(bindMemberActions);
    const viewOwner = document.querySelector('[data-action="view-member"]');
    if (viewOwner) viewOwner.addEventListener('click', () => openDialog({
      title: 'Thông tin thành viên',
      content: '<dl class="detail-list"><div><dt>Họ và tên</dt><dd>Nguyễn Minh An</dd></div><div><dt>Mã Sinh viên</dt><dd>22112345</dd></div><div><dt>Vai trò</dt><dd>Chủ nhiệm đề tài</dd></div><div><dt>Email Trường</dt><dd>22112345@sv.dntu.edu.vn</dd></div></dl>'
    }));

    const pdfInput = document.querySelector('[data-application-pdf]');
    const submitApplication = document.querySelector('[data-action="submit-create-application"]');
    const isStudentRole = document.body.dataset.currentRole === 'student';
    const advisorPicker = document.querySelector('[data-student-advisor-picker]');
    const advisorReadonly = document.querySelector('[data-advisor-readonly]');
    const advisorSelected = document.querySelector('[data-advisor-selected]');
    const refreshEligibility = () => {
      if (!submitApplication) return;
      const pdfReady = pdfInput?.dataset.ready === 'true';
      const advisorReady = !isStudentRole || Boolean(advisorSelected && !advisorSelected.hidden);
      submitApplication.disabled = !(pdfReady && advisorReady);
    };

    if (advisorPicker) advisorPicker.hidden = !isStudentRole;
    if (advisorReadonly) advisorReadonly.hidden = isStudentRole;
    const advisorCheck = document.querySelector('[data-advisor-check]');
    if (advisorCheck && !isStudentRole) advisorCheck.hidden = true;

    if (isStudentRole) {
      document.querySelectorAll('[data-action="select-advisor"]').forEach(button => button.addEventListener('click', () => {
        const dialog = openDialog({
          title: 'Chọn Giảng viên hướng dẫn',
          description: 'Danh sách chỉ gồm Tài khoản Giảng viên đang hoạt động và đủ điều kiện trong Đợt đăng ký.',
          content: '<div class="field"><label for="advisor-search">Tìm giảng viên</label><input id="advisor-search" placeholder="Nhập tên, khoa hoặc chuyên môn" autocomplete="off"></div><div class="advisor-list"><div class="advisor-row" data-advisor-option data-search="phạm minh long khoa công nghệ trí tuệ nhân tạo"><div><b>TS. Phạm Minh Long</b><br><span class="meta">Khoa Công nghệ · Trí tuệ nhân tạo</span></div><button class="icon-add" type="button" data-select-advisor data-name="TS. Phạm Minh Long" data-unit="Khoa Công nghệ" aria-label="Thêm TS. Phạm Minh Long">+</button></div><div class="advisor-row" data-advisor-option data-search="nguyễn thị lan khoa kinh tế phân tích dữ liệu"><div><b>ThS. Nguyễn Thị Lan</b><br><span class="meta">Khoa Kinh tế · Phân tích dữ liệu</span></div><button class="icon-add" type="button" data-select-advisor data-name="ThS. Nguyễn Thị Lan" data-unit="Khoa Kinh tế" aria-label="Thêm ThS. Nguyễn Thị Lan">+</button></div><div class="advisor-row" data-advisor-option data-search="lê hoàng nam khoa kỹ thuật điện hệ thống thông minh"><div><b>PGS.TS. Lê Hoàng Nam</b><br><span class="meta">Khoa Kỹ thuật điện · Hệ thống thông minh</span></div><button class="icon-add" type="button" data-select-advisor data-name="PGS.TS. Lê Hoàng Nam" data-unit="Khoa Kỹ thuật điện" aria-label="Thêm PGS.TS. Lê Hoàng Nam">+</button></div></div>'
        });
        const search = dialog.querySelector('#advisor-search');
        search.addEventListener('input', () => {
          const query = search.value.trim().toLowerCase();
          dialog.querySelectorAll('[data-advisor-option]').forEach(row => { row.hidden = Boolean(query) && !row.dataset.search.includes(query); });
        });
        dialog.querySelectorAll('[data-select-advisor]').forEach(addAdvisor => addAdvisor.addEventListener('click', () => {
          document.querySelector('[data-advisor-name]').textContent = addAdvisor.dataset.name;
          document.querySelector('[data-advisor-unit]').textContent = addAdvisor.dataset.unit;
          document.querySelector('[data-advisor-empty]').hidden = true;
          advisorSelected.hidden = false;
          advisorCheck.className = 'check ok';
          advisorCheck.textContent = `✓ Đã chọn ${addAdvisor.dataset.name}`;
          refreshEligibility();
          dialog.close();
          showToast(`Đã chọn ${addAdvisor.dataset.name} làm Giảng viên hướng dẫn.`);
        }));
        search.focus();
      }));
    }

    if (pdfInput && submitApplication) {
      pdfInput.dataset.ready = 'false';
      refreshEligibility();
      pdfInput.addEventListener('change', () => {
        const file = pdfInput.files?.[0];
        const status = document.querySelector('[data-pdf-status]');
        const check = document.querySelector('[data-pdf-check]');
        if (!file) {
          pdfInput.dataset.ready = 'false';
          refreshEligibility();
          status.className = 'notice warning';
          status.innerHTML = '<b>Chưa chọn tệp PDF.</b><br>Chỉ một tệp PDF được gắn với Hồ sơ khi nộp.';
          check.className = 'check blocked';
          check.textContent = '! Chưa chọn PDF đã ký';
          return;
        }
        if (!file.name.toLowerCase().endsWith('.pdf')) {
          pdfInput.value = '';
          pdfInput.dataset.ready = 'false';
          refreshEligibility();
          status.className = 'notice danger';
          status.innerHTML = '<b>Tệp không hợp lệ.</b><br>Chỉ chấp nhận tệp có định dạng PDF.';
          check.className = 'check blocked';
          check.textContent = '! Tệp đã chọn không phải PDF';
          pdfInput.focus();
          return;
        }
        status.className = 'notice success';
        status.innerHTML = `<b>${escapeHtml(file.name)}</b><br>${(file.size / 1024 / 1024).toFixed(2)} MB · sẵn sàng nộp một lần`;
        check.className = 'check ok';
        check.textContent = '✓ Đã chọn một PDF đã ký';
        pdfInput.dataset.ready = 'true';
        refreshEligibility();
      });

      submitApplication.addEventListener('click', () => {
        const file = pdfInput.files?.[0];
        if (!file) {
          showToast('Hãy chọn PDF đã ký trước khi tạo Hồ sơ.', 'danger');
          pdfInput.focus();
          return;
        }
        if (isStudentRole && advisorSelected.hidden) {
          showToast('Hãy chọn Giảng viên hướng dẫn trước khi tạo Hồ sơ.', 'danger');
          document.querySelector('[data-action="select-advisor"]').focus();
          return;
        }
        openDialog({
          title: 'Nộp PDF và tạo Hồ sơ?',
          description: 'BM01B · Vai trò: Chủ nhiệm đề tài',
          content: `<div class="notice warning"><b>Chỉ được nộp một lần.</b><br>Sau khi tạo, Hồ sơ và tệp ${escapeHtml(file.name)} sẽ bị khóa, không thể sửa hoặc thay thế.${replacementSource ? `<br>Hồ sơ mới sẽ liên kết tới ${escapeHtml(replacementSource)}.` : ''}</div>`,
          confirmLabel: 'Nộp & tạo Hồ sơ',
          onConfirm: () => {
            document.querySelectorAll('[data-application-form] input, [data-application-form] select, [data-application-form] textarea, [data-action="add-member"], [data-action="remove-member"], [data-action="select-advisor"]').forEach(control => { control.disabled = true; });
            submitApplication.disabled = true;
            submitApplication.textContent = 'Đã nộp · Hồ sơ đã tạo';
            document.querySelector('[data-application-lead]').textContent = `${applicationId} · Đã tạo lúc ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} · Không thể chỉnh sửa${replacementSource ? ` · Thay thế ${replacementSource}` : ''}`;
            const badge = document.querySelector('[data-application-badge]');
            badge.className = 'badge success';
            badge.textContent = 'Chờ Giảng viên hướng dẫn duyệt';
            const rule = document.querySelector('[data-application-rule]');
            rule.className = 'notice success';
            rule.innerHTML = '<b>Hồ sơ đã được tạo và khóa.</b><br>PDF đã nộp một lần thành công; không có thao tác sửa, nộp lại hoặc thay tệp.';
            showToast(`Đã nộp PDF và tạo Hồ sơ ${applicationId}.`);
          }
        });
      });
    }

    const downloadApplication = document.querySelector('[data-action="download-application-pdf"]');
    if (downloadApplication) downloadApplication.addEventListener('click', () => showToast('PDF BM01B đã được tạo để tải xuống và ký.'));

    const previewApplication = document.querySelector('[data-action="preview-application-pdf"]');
    if (previewApplication) previewApplication.addEventListener('click', () => {
      const topicName = document.querySelector('#topic-name');
      const researchField = document.querySelector('#research-field');
      const unit = document.querySelector('#unit');
      const objective = document.querySelector('#objective');
      const selectedAdvisorName = advisorSelected && !advisorSelected.hidden ? document.querySelector('[data-advisor-name]').textContent : 'Chưa chọn Giảng viên hướng dẫn';
      const members = ['Nguyễn Minh An — Chủ nhiệm đề tài', ...[...document.querySelectorAll('[data-member-row]')].map(row => `${row.querySelector('b').textContent} — Thành viên tham gia`)];
      const dialog = openDialog({
        title: 'Xem trước PDF BM01B',
        description: 'PDF bên trái cập nhật ngay khi dữ liệu form bên phải thay đổi.',
        content: `<div class="live-preview-layout"><section class="live-preview-pane" aria-label="Bản xem trước PDF"><div class="live-preview-toolbar"><b>Bản xem trước PDF</b><span class="meta">Trang 1 / 1 · tự động cập nhật</span></div><article class="pdf-sheet"><div class="pdf-sheet-header"><b>Trường Đại học Công nghệ Đồng Nai</b><span>Phòng Khoa học Công nghệ</span><h3>Phiếu đăng ký đề tài nghiên cứu khoa học</h3><span>BM01B · Dành cho Sinh viên</span></div><div class="pdf-sheet-section"><h4>1. Thông tin đề tài</h4><div class="pdf-sheet-row"><span>Tên đề tài:</span><span class="pdf-sheet-value" data-live-pdf="topic">${escapeHtml(topicName.value)}</span></div><div class="pdf-sheet-row"><span>Lĩnh vực:</span><span class="pdf-sheet-value" data-live-pdf="field">${escapeHtml(researchField.value)}</span></div><div class="pdf-sheet-row"><span>Đơn vị:</span><span class="pdf-sheet-value" data-live-pdf="unit">${escapeHtml(unit.value)}</span></div><div class="pdf-sheet-row"><span>Mục tiêu:</span><span class="pdf-sheet-value" data-live-pdf="objective">${escapeHtml(objective.value)}</span></div></div><div class="pdf-sheet-section"><h4>2. Nhóm nghiên cứu</h4><div class="pdf-sheet-value">${members.map(member => `• ${escapeHtml(member)}`).join('<br>')}</div></div><div class="pdf-sheet-section"><h4>3. Giảng viên hướng dẫn</h4><div class="pdf-sheet-value">${escapeHtml(selectedAdvisorName)}</div></div><div class="pdf-signatures"><div><b>Chủ nhiệm đề tài</b><br><span>(Ký và ghi rõ họ tên)</span></div><div><b>Giảng viên hướng dẫn</b><br><span>(Ký và ghi rõ họ tên)</span></div></div></article></section><section class="live-form-pane" aria-label="Form dữ liệu xem trước"><div class="notice"><b>Chỉnh sửa dữ liệu xem trước</b><br>Thay đổi tại đây được đồng bộ về form chính. Đây chưa phải PDF đã ký hoặc Hồ sơ đã nộp.</div><div class="field"><label for="preview-topic-name">Tên đề tài</label><input id="preview-topic-name" value="${escapeHtml(topicName.value)}"></div><div class="field"><label for="preview-research-field">Lĩnh vực nghiên cứu</label><select id="preview-research-field"><option${researchField.value === 'Công nghệ thông tin' ? ' selected' : ''}>Công nghệ thông tin</option><option${researchField.value === 'Kinh tế' ? ' selected' : ''}>Kinh tế</option><option${researchField.value === 'Kỹ thuật điện' ? ' selected' : ''}>Kỹ thuật điện</option></select></div><div class="field"><label for="preview-unit">Đơn vị</label><input id="preview-unit" value="${escapeHtml(unit.value)}" readonly></div><div class="field"><label for="preview-objective">Mục tiêu nghiên cứu</label><textarea id="preview-objective">${escapeHtml(objective.value)}</textarea></div><div class="live-form-readonly"><b>Nhóm nghiên cứu</b><p class="meta">${members.map(escapeHtml).join('<br>')}</p></div><div class="live-form-readonly"><b>Giảng viên hướng dẫn</b><p class="meta">${escapeHtml(selectedAdvisorName)}</p></div></section></div>`
      });
      dialog.classList.add('preview-dialog');
      const bindings = [
        ['#preview-topic-name', topicName, '[data-live-pdf="topic"]'],
        ['#preview-research-field', researchField, '[data-live-pdf="field"]'],
        ['#preview-objective', objective, '[data-live-pdf="objective"]']
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
        description: 'NCKH-SV-2026-014 · Vai trò: Chủ nhiệm đề tài',
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
      content: '<div class="document-preview"><b>Bản xem trước tài liệu</b><p>Biên bản nghiệm thu đề tài NCKH-SV-2025-018</p><p class="meta">Bản HTML mô phỏng. Bản triển khai cần viewer PDF, tải xuống và dữ liệu nguồn truy cập được.</p></div>'
    })));

    document.querySelectorAll('[data-action="view-submitted-bm01"]').forEach(button => button.addEventListener('click', () => openDialog({
      title: 'BM01B — PDF đã nộp',
      description: 'HS-SV-2026-031 · bản bất biến',
      content: '<div class="document-preview"><b>BM01B-HS-SV-2026-031.pdf</b><p>Mô hình gợi ý tài liệu học tập theo năng lực</p><p class="meta">Nguyễn Minh An nộp lúc 20/07/2026 14:20 · 2,18 MB. Hồ sơ bị GVHD từ chối ký; PDF này chỉ còn giá trị đối chiếu và không thể thay thế.</p></div>'
    })));

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
    setupNotifications();
    setupSimpleActions();
  });
})();
