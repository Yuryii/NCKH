(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let applyFilters = () => updateCounts();

  function refreshGateSummary() {
    const panel = $('.gate-panel');
    if (!panel) return;
    const missing = $$('[data-gate-ready="false"]', panel).length;
    const heading = $('h2', panel);
    if (heading) heading.textContent = missing ? `Còn ${missing} điều kiện` : 'Sẵn sàng';
  }

  function setGate(id, ready = true) {
    const gate = document.querySelector(`[data-gate-id="${CSS.escape(id)}"]`);
    if (!gate) return;
    gate.dataset.gateReady = String(ready);
    gate.classList.toggle('ready', ready);
    gate.classList.toggle('blocked', !ready);
    gate.querySelector(':scope > span').textContent = ready ? '✓' : '!';
    const detail = gate.querySelector('p');
    if (detail && ready) detail.textContent = 'Điều kiện đã được cập nhật từ hành động vừa hoàn tất.';
    refreshGateSummary();
  }

  function toast(message, error = false) {
    const node = document.createElement('div');
    node.className = `toast${error ? ' error' : ''}`;
    node.textContent = message;
    $('.toast-region').append(node);
    window.setTimeout(() => node.remove(), 4200);
  }

  function fieldsForAction(action) {
    if (!action.dataset.require.split(',').includes('form')) return [];
    const prefixes = {'route-bm08':'bm08-', 'submit-bm13':'bm13-', 'replace-meeting':'replacement-'};
    const prefix = prefixes[action.dataset.actionId];
    return $$('[data-business-field]').filter(field => !prefix || field.id.startsWith(prefix));
  }

  function disableControlsForAction(action) {
    fieldsForAction(action).forEach(field => { field.disabled = true; });
    action.dataset.require.split(',').filter(value => value.startsWith('file:')).forEach(value => {
      const input = document.getElementById(value.slice(5));
      if (input) input.disabled = true;
    });
  }

  function openDialog(action, missing) {
    const trigger = action;
    const needsReason = action.dataset.require.split(',').includes('reason');
    const target = document.getElementById(action.dataset.target);
    const dialog = document.createElement('dialog');
    dialog.className = 'demo-dialog';
    const targetName = target?.querySelector('h3')?.textContent || document.querySelector('h1').textContent;
    dialog.setAttribute('aria-labelledby', 'dialog-title');
    dialog.innerHTML = `<div class="dialog-head"><div><h2 id="dialog-title">${escapeHtml(action.textContent.trim())}</h2><p>${escapeHtml(targetName)} · Vai trò: ${escapeHtml($('.role-static b').textContent)}</p></div><button class="dialog-close" type="button" aria-label="Đóng">×</button></div><div class="dialog-body">${missing.length ? `<div class="dialog-error" role="alert"><b>Chưa thể tiếp tục.</b><br>${escapeHtml(missing.join(' · '))}</div>` : ''}${needsReason ? '<div class="field"><label for="decision-reason">Lý do bắt buộc</label><textarea id="decision-reason" required></textarea><p class="dialog-error" data-reason-error hidden>Hãy nhập lý do cụ thể.</p></div>' : ''}<p>Hành động gắn đúng đối tượng và sẽ cập nhật trạng thái mô phỏng sau khi kiểm tra điều kiện.</p></div><div class="dialog-actions"><button type="button" data-cancel>Hủy</button><button type="button" class="confirm ${action.classList.contains('danger') ? 'danger' : ''}" data-confirm ${missing.length ? 'disabled' : ''}>Xác nhận</button></div>`;
    document.body.append(dialog);
    const close = () => dialog.close();
    $('.dialog-close', dialog).addEventListener('click', close);
    $('[data-cancel]', dialog).addEventListener('click', close);
    dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
    dialog.addEventListener('close', () => {
      dialog.remove();
      const focusTarget = trigger.disabled ? (target && !target.hidden ? target : $('h1')) : trigger;
      if (focusTarget && !focusTarget.matches('button, a, input, select, textarea, [tabindex]')) focusTarget.tabIndex = -1;
      focusTarget?.focus();
    });
    $('[data-confirm]', dialog).addEventListener('click', () => {
      if (needsReason && !$('#decision-reason', dialog).value.trim()) {
        $('[data-reason-error]', dialog).hidden = false;
        $('#decision-reason', dialog).focus();
        return;
      }
      const nonMutating = ['preview','export','download'].includes(action.dataset.actionBranch);
      const preserveTarget = ['replace-meeting','adjust'].includes(action.dataset.actionBranch);
      if (target && !nonMutating && !preserveTarget) {
        target.classList.add('updated');
        target.dataset.state = 'done';
        const status = $('[data-record-status]', target);
        if (status) status.textContent = action.textContent.trim().replace(/^Tải bản .* & /, '');
      }
      const impliedGate = {'store-bm14':'step07-bm14'}[action.dataset.actionBranch];
      [...(action.dataset.unlocks || '').split(',').filter(Boolean), ...(impliedGate ? [impliedGate] : [])].forEach(id => setGate(id));
      if (!nonMutating) action.disabled = true;
      const exclusive = new Set(['approve','reject','return','sign-route','approve-cancel','reject-cancel','lock','unlock','return-bm09','accept-bm09','confirm-bm13','return-bm13','submit-minutes','resubmit-minutes','second-signature']);
      if (exclusive.has(action.dataset.actionBranch)) {
        $$(`[data-target="${CSS.escape(action.dataset.target)}"]`).forEach(button => { button.disabled = true; });
      }
      if (action.dataset.actionBranch === 'cancel-meeting') {
        $$('[data-action-branch="receive-minutes"], [data-action-branch="end"], [data-action-branch="publish"], [data-action-branch="adjust"]').forEach(button => { button.disabled = true; });
      }
      if (action.dataset.actionBranch === 'end') {
        $$('[data-action-branch="receive-minutes"], [data-action-branch="cancel-meeting"], [data-action-branch="replace-meeting"], [data-action-branch="end"]').forEach(button => { button.disabled = true; });
      }
      if (action.dataset.actionBranch === 'publish') {
        $$('[data-action-branch="receive-minutes"], [data-action-branch="cancel-meeting"], [data-action-branch="replace-meeting"], [data-action-branch="end"], [data-action-branch="publish"]').forEach(button => { button.disabled = true; });
      }
      if (action.dataset.actionBranch === 'open') {
        $$('[data-action-branch="save-council"], [data-action-branch="accept-invite"]').forEach(button => { button.disabled = true; });
      }
      if (['submit','submit-bm04','submit-bm09','submit-ballot','submit-minutes','resubmit-minutes','create-account','sign-route','route-bm08','submit-bm13','second-signature','store-bm14','open'].includes(action.dataset.actionBranch)) {
        disableControlsForAction(action);
      }
      if (['submit','submit-ballot','submit-minutes','resubmit-minutes'].includes(action.dataset.actionBranch)) {
        $$(`[data-target="${CSS.escape(action.dataset.target)}"]`).forEach(button => { button.disabled = true; });
      }
      if (action.dataset.actionBranch === 'replace-meeting') {
        const panel = $('#records-panel');
        panel?.insertAdjacentHTML('beforeend', '<article class="work-row updated" id="meeting-replacement" data-record data-state="draft" data-row-scope="pk"><div><h3>HĐNT-2026-006-R1 · Cuộc họp thay thế</h3><p>Liên kết hai chiều với HĐNT-2026-006 · readiness, lời mời và namespace bằng chứng mới</p></div><span class="status" data-record-status>Nháp thay thế</span></article>');
      }
      if (action.dataset.actionBranch === 'adjust') {
        const panel = $('#records-panel');
        panel?.insertAdjacentHTML('beforeend', '<article class="work-row updated" id="result-v2" data-record data-state="published" data-row-scope="pk"><div><h3>Kết quả V2 · phiên bản điều chỉnh</h3><p>Thay thế V1; V1 giữ lịch sử và được đánh dấu mất hiệu lực</p></div><span class="status" data-record-status>Đang công bố</span></article>');
      }
      if (action.dataset.actionId === 'publish-round') {
        $$('[data-business-field]').forEach(field => { field.disabled = true; });
        $$('[data-action-id="save-round"], [data-action-id="update-round"]').forEach(button => { button.disabled = true; });
      }
      toast(action.dataset.result);
      applyFilters();
      close();
    });
    dialog.showModal();
    (needsReason && !missing.length ? $('#decision-reason', dialog) : $('.dialog-close', dialog)).focus();
  }

  function missingRequirements(action) {
    const missing = [];
    if (action.dataset.actionBranch === 'replace-meeting' && !$('[data-action-branch="cancel-meeting"]')?.disabled) missing.push('Phải hủy Cuộc họp hiện tại trước khi tạo bản thay thế');
    if (action.dataset.actionBranch === 'adjust' && !$('[data-action-branch="publish"]')?.disabled) missing.push('Phải công bố kết quả ban đầu trước khi công bố phiên bản điều chỉnh');
    const requirements = action.dataset.require.split(',').map(value => value.trim()).filter(Boolean);
    requirements.forEach(requirement => {
      if (requirement === 'none' || requirement === 'reason') return;
      if (requirement === 'form') {
        const fields = fieldsForAction(action);
        fields.forEach(field => {
          field.classList.remove('field-error');
          if (!field.checkValidity()) {
            field.classList.add('field-error');
            missing.push(`${field.labels?.[0]?.textContent || field.name}: ${field.validationMessage}`);
          }
        });
        const stagePairs = [
          ['ct-ballot-stage','ct-ballot-kind'], ['tv-ballot-stage','tv-ballot-kind'], ['minutes-stage','minutes-kind']
        ];
        const stageForms = {'Nghiệm thu':'BM11', 'Xét duyệt hồ sơ':'BM02', 'Xét duyệt thuyết minh':'BM06'};
        stagePairs.forEach(([stageId, formId]) => {
          const stage = document.getElementById(stageId), form = document.getElementById(formId);
          if (!stage || !form) return;
          const expected = formId === 'minutes-kind' ? {'Nghiệm thu':'BM12','Xét duyệt hồ sơ':'BM03','Xét duyệt thuyết minh':'BM07'}[stage.value] : stageForms[stage.value];
          if (!form.value.startsWith(expected)) missing.push(`${stage.value} chỉ chấp nhận ${expected}; hãy đổi biểu mẫu hoặc fixture Cuộc họp cho khớp`);
        });
        const start = $('#round-start'), end = $('#round-end');
        if (start && end && new Date(end.value) <= new Date(start.value)) missing.push('Thời gian kết thúc phải sau thời gian bắt đầu');
        const roundType = $('#round-type'), directTopics = $('#round-direct-topics');
        if (roundType?.value.startsWith('Đề tài giao trực tiếp') && (!directTopics?.value.trim() || directTopics.value.startsWith('Không áp dụng'))) missing.push('Đợt giao trực tiếp phải có danh mục đề tài thật');
        const councilStage = $('#council-stage'), councilInput = $('#council-input');
        if (councilStage && councilInput) {
          const expectedInput = {'Nghiệm thu':'BM09', 'Xét duyệt hồ sơ':'BM01', 'Xét duyệt thuyết minh':'BM04'}[councilStage.value];
          if (!councilInput.value.startsWith(expectedInput)) missing.push(`${councilStage.value} phải dùng official input ${expectedInput}`);
          const chair = $('#council-chair')?.value.trim(), secretary = $('#council-secretary')?.value.trim(), members = $('#council-members')?.value;
          if (!chair || !secretary || chair === secretary || members?.includes(chair) || members?.includes(secretary)) missing.push('Chủ tịch, Thư ký và Thành viên phải độc quyền, không trùng phân công');
        }
      } else if (requirement.startsWith('file:')) {
        const id = requirement.slice(5);
        const input = document.getElementById(id);
        if (!input?.files?.length) missing.push(`Chưa chọn tệp cho ${id}`);
        else {
          const file = input.files[0];
          const extensions = (input.accept || '').split(',').map(value => value.trim().toLowerCase()).filter(value => value.startsWith('.'));
          if (extensions.length && !extensions.some(extension => file.name.toLowerCase().endsWith(extension))) missing.push(`${file.name} sai định dạng; chấp nhận ${extensions.join(', ')}`);
          if (!file.size) missing.push(`${file.name} là tệp rỗng`);
          if (extensions.length === 1 && extensions[0] === '.pdf' && file.type && file.type !== 'application/pdf') missing.push(`${file.name} không có MIME PDF hợp lệ`);
          if (file.size > 20 * 1024 * 1024) missing.push(`${file.name} vượt giới hạn minh họa 20 MB`);
        }
      } else if (requirement.startsWith('gate:')) {
        const id = requirement.slice(5);
        const gate = document.querySelector(`[data-gate-id="${CSS.escape(id)}"]`);
        if (!gate || gate.dataset.gateReady !== 'true') missing.push(gate?.querySelector('b')?.textContent || `Cổng ${id} chưa đạt`);
      } else missing.push(`Điều kiện không được hỗ trợ: ${requirement}`);
    });
    return [...new Set(missing)];
  }

  function updateCounts() {
    const visible = $$('[data-record]').filter(row => !row.hidden).length;
    const output = $('[data-visible-count]');
    if (output) output.textContent = `${visible} mục`;
    const empty = $('[data-filter-empty]');
    if (empty) empty.hidden = visible !== 0;
  }

  function setupFilters() {
    const search = $('[data-search]');
    const filter = $('[data-filter]');
    if (!search && !filter) return;
    applyFilters = () => {
      const query = (search?.value || '').trim().toLocaleLowerCase('vi');
      const state = filter?.value || 'all';
      $$('[data-record]').forEach(row => {
        row.hidden = Boolean(query && !row.textContent.toLocaleLowerCase('vi').includes(query)) || (state !== 'all' && row.dataset.state !== state);
      });
      updateCounts();
    };
    search?.addEventListener('input', applyFilters);
    filter?.addEventListener('change', () => {
      applyFilters();
      const matchingTab = $$('[role=tab]').find(tab => tab.dataset.tabFilter === filter.value);
      $$('[role=tab]').forEach(tab => { tab.setAttribute('aria-selected', String(Boolean(matchingTab) && tab === matchingTab)); tab.tabIndex = !matchingTab || tab === matchingTab ? 0 : -1; });
      if (!matchingTab) $('#records-panel')?.setAttribute('aria-labelledby', 'records-title');
    });
    applyFilters();
  }

  function setupTabs() {
    const tabs = $$('[role=tab]');
    tabs.forEach((tab, index) => {
      tab.tabIndex = index === 0 ? 0 : -1;
      tab.addEventListener('click', () => {
        tabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
        const panel = document.getElementById(tab.getAttribute('aria-controls'));
        if (panel) panel.setAttribute('aria-labelledby', tab.id);
        const filter = $('[data-filter]');
        if (filter && [...filter.options].some(option => option.value === tab.dataset.tabFilter)) {
          filter.value = tab.dataset.tabFilter;
          filter.dispatchEvent(new Event('change'));
        }
      });
      tab.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        let next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        tabs[next].click(); tabs[next].focus();
      });
    });
    tabs.find(tab => tab.getAttribute('aria-selected') === 'true')?.click();
  }

  function setupDrawer() {
    const menu = $('.menu-button');
    const sidebar = $('#sidebar');
    const overlay = $('.sidebar-overlay');
    if (!menu || !sidebar || !overlay) return;
    const toggle = open => {
      sidebar.classList.toggle('open', open);
      overlay.hidden = !open;
      menu.setAttribute('aria-expanded', String(open));
      if (!open) menu.focus();
    };
    menu.addEventListener('click', () => toggle(!sidebar.classList.contains('open')));
    overlay.addEventListener('click', () => toggle(false));
    document.addEventListener('keydown', event => {
      if (!sidebar.classList.contains('open')) return;
      if (event.key === 'Escape') { toggle(false); return; }
      if (event.key !== 'Tab') return;
      const focusable = $$('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', sidebar);
      if (!focusable.length) return;
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    menu.addEventListener('click', () => { if (sidebar.classList.contains('open')) $('a, button', sidebar)?.focus(); });
    window.matchMedia('(min-width:901px)').addEventListener('change', event => { if (event.matches && sidebar.classList.contains('open')) toggle(false); });
  }

  function setupFormGates() {
    const fields = $$('[data-business-field]');
    if (!fields.length) return;
    const recompute = () => {
      const valid = fields.every(field => field.checkValidity());
      if ($('[data-gate-id="bm01-fields"]')) setGate('bm01-fields', valid);
      const start = $('#round-start'), end = $('#round-end');
      if ($('[data-gate-id="round-fields"]')) {
        const datesValid = start && end && new Date(end.value) > new Date(start.value);
        const directValue = $('#round-direct-topics')?.value.trim() || '';
        const directValid = !$('#round-type')?.value.startsWith('Đề tài giao trực tiếp') || Boolean(directValue && !directValue.startsWith('Không áp dụng'));
        setGate('round-fields', valid && datesValid && directValid);
      }
      const councilStage = $('#council-stage'), councilInput = $('#council-input');
      if (councilStage && councilInput) {
        const expected = {'Nghiệm thu':'BM09', 'Xét duyệt hồ sơ':'BM01', 'Xét duyệt thuyết minh':'BM04'}[councilStage.value];
        setGate('official-input', councilInput.value.startsWith(expected));
        const chair = $('#council-chair')?.value.trim(), secretary = $('#council-secretary')?.value.trim(), members = $('#council-members')?.value || '';
        const exclusive = Boolean(chair && secretary && chair !== secretary && !members.includes(chair) && !members.includes(secretary));
        setGate('chair', exclusive); setGate('secretary', exclusive);
      }
      const scenario = $('#minutes-scenario');
      if (scenario) {
        const returned = scenario.value.startsWith('Bản bị');
        $('[data-action-id="submit-minutes"]').disabled = returned;
        $('[data-action-id="resubmit-minutes"]').disabled = !returned;
        setGate('tk-returned', returned);
      }
    };
    $('#round-type')?.addEventListener('change', () => {
      if ($('#round-type').value.startsWith('Đề tài giao trực tiếp') && $('#round-direct-topics')?.value.startsWith('Không áp dụng')) $('#round-direct-topics').value = '';
    });
    fields.forEach(field => { field.addEventListener('input', recompute); field.addEventListener('change', recompute); });
    recompute();
  }

  function setupNotifications() {
    const bell = $('.bell');
    const popover = $('#notification-popover');
    if (!bell || !popover) return;
    const toggle = open => {
      popover.hidden = !open;
      bell.setAttribute('aria-expanded', String(open));
      if (open) $('a', popover)?.focus();
    };
    bell.addEventListener('click', () => toggle(popover.hidden));
    document.addEventListener('click', event => {
      if (!popover.hidden && !event.target.closest('.notification-wrap')) toggle(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !popover.hidden) { toggle(false); bell.focus(); }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupFilters(); setupTabs(); setupDrawer(); setupNotifications(); setupFormGates(); updateCounts(); refreshGateSummary();
    $$('[data-action-id]').forEach(action => action.addEventListener('click', () => openDialog(action, missingRequirements(action))));
    $$('[data-file-for]').forEach(input => input.addEventListener('change', () => {
      const file = input.files[0];
      const extensions = (input.accept || '').split(',').map(value => value.trim().toLowerCase()).filter(value => value.startsWith('.'));
      const selected = Boolean(file) && file.size > 0 && (!extensions.length || extensions.some(extension => file.name.toLowerCase().endsWith(extension))) && (!(extensions.length === 1 && extensions[0] === '.pdf') || !file.type || file.type === 'application/pdf') && file.size <= 20 * 1024 * 1024;
      const gate = document.querySelector(`[data-gate-id="${CSS.escape(input.dataset.fileFor)}"]`);
      if (gate) {
        setGate(input.dataset.fileFor, selected);
        const detail = gate.querySelector('p');
        if (detail) detail.textContent = selected ? `Đã chọn ${input.files[0].name}; sẽ kiểm tra lại khi xác nhận.` : 'Chọn tệp hợp lệ để mở cổng.';
      }
      toast(selected ? `Đã chọn ${file.name}; chưa thực hiện hành động đích.` : (file ? 'Tệp sai định dạng hoặc vượt 20 MB; cổng vẫn bị chặn.' : 'Đã bỏ chọn tệp.'), Boolean(file) && !selected);
    }));
  });
})();
