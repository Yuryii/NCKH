(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let applyFilters = () => updateCounts();
  let acceptedCouncilRoster = '';

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

  function setLifecycle(id, state, detail) {
    const step = document.getElementById(id);
    if (!step) return;
    step.classList.remove('complete', 'current', 'blocked', 'upcoming');
    step.classList.add(state);
    if (state === 'current') step.setAttribute('aria-current', 'step');
    else step.removeAttribute('aria-current');
    if (detail) $('p', step).textContent = detail;
  }

  function updateMetric(label, value, detail) {
    const card = document.querySelector(`[data-metric-label="${CSS.escape(label)}"]`);
    if (!card) return;
    if (value !== undefined) $('strong', card).textContent = value;
    if (detail) $('p', card).textContent = detail;
  }

  function councilRosterFingerprint() {
    return [$('#council-chair')?.value.trim(), $('#council-members')?.value.split(';').map(value => value.trim()).filter(Boolean).join('|'), $('#council-secretary')?.value.trim()].join('::');
  }

  function appendAudit(action, reason, context) {
    const panel = $('.audit-panel');
    if (!panel) return;
    const list = $('ol', panel);
    const item = document.createElement('li');
    item.dataset.auditEvent = '';
    const role = $('.role-static b')?.textContent || 'Vai trò hiện hành';
    const target = document.getElementById(action.dataset.target);
    const objectId = context.createdObject || target?.id || action.dataset.target || 'workspace';
    const version = context.createdVersion || target?.querySelector('.record-kicker span:nth-child(2)')?.textContent || context.version || 'Snapshot hiện hành';
    const before = context.createdObject ? 'Chưa có' : context.before;
    const after = context.createdStatus || (context.preserveTarget ? (action.dataset.resultStatus || 'Đã xử lý') : (target?.querySelector('[data-record-status]')?.textContent || action.dataset.resultStatus || 'Đã xử lý'));
    const timestamp = `${new Date().toLocaleString('vi-VN', {timeZone:'Asia/Ho_Chi_Minh', hour12:false})} ICT`;
    item.innerHTML = `<span class="audit-marker" aria-hidden="true"></span><div><b>${escapeHtml(action.textContent.trim())} · ${escapeHtml(objectId)}</b><p>Dũng Nguyễn · Vai trò ${escapeHtml(role)} · ${escapeHtml(timestamp)}</p><p><span class="status">${escapeHtml(before)} → ${escapeHtml(after)}</span> · Phiên bản ${escapeHtml(version)}</p>${reason ? `<blockquote>Lý do: ${escapeHtml(reason)}</blockquote>` : ''}</div>`;
    list.prepend(item);
  }

  function applyPkTransition(action, reason, context) {
    if (document.body.dataset.actor !== 'pk') return;
    const branch = action.dataset.actionBranch;
    const state = getPkState();

    if (action.dataset.actionId === 'publish-round') {
      state.roundDraftState = 'published';
    }
    if (branch === 'accept-invite') {
      state.inviteAccepted = true;
    }
    if (branch === 'open') {
      state.meetingState = 'open';
    }
    if (branch === 'cancel-meeting') {
      state.meetingState = 'cancelled';
    }
    if (branch === 'replace-meeting') {
      state.meetingState = 'replaced';
    }
    if (branch === 'receive-minutes') {
      state.meetingMinutesStatus = 'received';
    }
    if (branch === 'end') {
      state.meetingMinutesStatus = 'ended';
    }
    if (branch === 'publish' && action.dataset.actionId === 'publish-result') {
      state.meetingResultStatus = 'published';
    }
    if (branch === 'adjust') {
      state.meetingResultStatus = 'adjusted';
    }
    if (branch === 'store-bm14' || branch === 'mark-bm14-na') {
      state.bm14Status = branch === 'store-bm14' ? 'stored' : 'na';
    }
    if (branch === 'return-bm09') {
      state.bm09Status = 'returned';
    }
    if (branch === 'refresh-bm09') {
      state.bm09Status = 'submitted_v3';
    }
    if (branch === 'accept-bm09') {
      state.bm09Status = 'accepted';
    }
    if (branch === 'approve-cancel') {
      state.cancelRequestStatus = 'approved';
    }
    if (branch === 'reject-cancel') {
      state.cancelRequestStatus = 'rejected';
    }
    if (branch === 'complete-step07') {
      state.step07Status = 'completed';
    }

    savePkState(state);
    syncPkUI();
    appendAudit(action, reason, context);
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
    const prefixes = {'route-bm08':'bm08-', 'submit-bm13':'bm13-', 'replace-meeting':'replacement-', 'publish-bm05':'pk-bm05-', 'publish-bm10':'pk-bm10-', 'store-bm14':'pk-bm14-'};
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
    dialog.innerHTML = `<div class="dialog-head"><div><h2 id="dialog-title">${escapeHtml(action.textContent.trim())}</h2><p>${escapeHtml(targetName)} · Vai trò: ${escapeHtml($('.role-static b').textContent)}</p></div><button class="dialog-close" type="button" aria-label="Đóng">×</button></div><div class="dialog-body">${missing.length ? `<div class="dialog-error" role="alert"><b>Chưa thể tiếp tục.</b><br>${escapeHtml(missing.join(' · '))}</div>` : ''}${needsReason ? '<div class="field"><label for="decision-reason">Lý do bắt buộc</label><textarea id="decision-reason" required></textarea><p class="dialog-error" data-reason-error hidden>Hãy nhập lý do cụ thể.</p></div>' : ''}<div class="decision-impact"><b>Hệ quả khi xác nhận</b><p>${escapeHtml(action.dataset.consequence || 'Trạng thái và nhật ký kiểm toán sẽ được cập nhật theo quyết định này.')}</p></div></div><div class="dialog-actions"><button type="button" data-cancel>Hủy</button><button type="button" class="confirm ${action.classList.contains('danger') ? 'danger' : ''}" data-confirm ${missing.length ? 'disabled' : ''}>Xác nhận</button></div>`;
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
      const currentMissing = missingRequirements(action);
      if (currentMissing.length) {
        let error = $('.dialog-error', dialog);
        if (!error) {
          error = document.createElement('div');
          error.className = 'dialog-error';
          error.setAttribute('role', 'alert');
          $('.dialog-body', dialog).prepend(error);
        }
        error.innerHTML = `<b>Trạng thái đã thay đổi, chưa thể tiếp tục.</b><br>${escapeHtml(currentMissing.join(' · '))}`;
        return;
      }
      if (needsReason && !$('#decision-reason', dialog).value.trim()) {
        $('[data-reason-error]', dialog).hidden = false;
        $('#decision-reason', dialog).focus();
        return;
      }
      const reason = needsReason ? $('#decision-reason', dialog).value.trim() : '';
      const nonMutating = ['preview','export','download'].includes(action.dataset.actionBranch);
      const preserveTarget = ['replace-meeting','adjust','save-round','update-round','save-council'].includes(action.dataset.actionBranch);
      const context = {before: target?.querySelector('[data-record-status]')?.textContent || 'Chưa xử lý', version: target?.querySelector('.record-kicker span:nth-child(2)')?.textContent || 'Snapshot hiện hành', preserveTarget};
      if (target && !nonMutating && !preserveTarget) {
        target.classList.add('updated');
        target.dataset.state = action.dataset.resultState || 'done';
        const status = $('[data-record-status]', target);
        if (status) status.textContent = action.dataset.resultStatus || 'Đã xử lý';
      }
      const impliedGate = {'store-bm14':'step07-bm14'}[action.dataset.actionBranch];
      if (action.dataset.actionBranch === 'accept-invite') acceptedCouncilRoster = councilRosterFingerprint();
      [...(action.dataset.unlocks || '').split(',').filter(Boolean), ...(impliedGate ? [impliedGate] : [])].forEach(id => setGate(id));
      if (!nonMutating) action.disabled = true;
      const exclusive = new Set(['approve','reject','return','sign-route','approve-cancel','reject-cancel','lock','unlock','accept-bm09','confirm-bm13','return-bm13','store-bm14','mark-bm14-na','submit-minutes','resubmit-minutes','second-signature']);
      if (exclusive.has(action.dataset.actionBranch)) {
        $$(`[data-target="${CSS.escape(action.dataset.target)}"]`).forEach(button => { button.disabled = true; });
      }
      if (action.dataset.actionBranch === 'return-bm09') {
        action.disabled = true;
        $('[data-action-branch="accept-bm09"]')?.setAttribute('disabled', '');
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
        Object.assign(context, {createdObject:'meeting-replacement', createdVersion:'HĐNT-2026-006-R1', createdStatus:'Nháp thay thế'});
      }
      if (action.dataset.actionBranch === 'adjust') {
        const panel = $('#records-panel');
        panel?.insertAdjacentHTML('beforeend', '<article class="work-row updated" id="result-v2" data-record data-state="published" data-row-scope="pk"><div><h3>Kết quả V2 · phiên bản điều chỉnh</h3><p>Thay thế V1; V1 giữ lịch sử và được đánh dấu mất hiệu lực</p></div><span class="status" data-record-status>Đã công bố</span></article>');
        Object.assign(context, {createdObject:'result-v2', createdVersion:'Kết quả V2', createdStatus:'Đã công bố'});
      }
      if (action.dataset.actionId === 'publish-round') {
        $$('[data-business-field]').forEach(field => { field.disabled = !['round-name', 'round-description'].includes(field.id); });
        $('[data-action-id="save-round"]')?.setAttribute('disabled', '');
      }
      if (['publish-bm05','publish-bm10','store-bm14'].includes(action.dataset.actionId)) disableControlsForAction(action);
      applyPkTransition(action, reason, context);
      applyCouncilTransition(action, reason, context);
      toast(action.dataset.result);
      applyFilters();
      colorizeStatuses();
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
    if (action.dataset.actionBranch === 'mark-bm14-na' && $('#bm14-contract-applicability')?.value !== 'Không có hợp đồng') missing.push('Chỉ được đánh dấu BM14 không áp dụng khi đề tài không có hợp đồng');
    if (action.dataset.actionBranch === 'store-bm14' && $('#bm14-contract-applicability')?.value !== 'Có hợp đồng') missing.push('Đề tài không có hợp đồng; hãy dùng nhánh BM14 không áp dụng');
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
        const councilStage = $('#council-stage'), councilInput = $('#council-input'), councilDecision = $('#council-decision');
        if (councilStage && councilInput) {
          const expectedInput = {'Nghiệm thu':'BM09', 'Xét duyệt hồ sơ':'BM01', 'Xét duyệt thuyết minh':'BM04'}[councilStage.value];
          if (!councilInput.value.startsWith(expectedInput)) missing.push(`${councilStage.value} phải dùng official input ${expectedInput}`);
          const expectedDecision = {'Nghiệm thu':'BM10', 'Xét duyệt hồ sơ':'Không áp dụng', 'Xét duyệt thuyết minh':'BM05'}[councilStage.value];
          if (!councilDecision?.value.startsWith(expectedDecision)) missing.push(`${councilStage.value} phải gắn ${expectedDecision} làm quyết định giai đoạn`);
          const chair = $('#council-chair')?.value.trim(), secretary = $('#council-secretary')?.value.trim();
          const members = ($('#council-members')?.value || '').split(';').map(value => value.trim()).filter(Boolean);
          const uniqueMembers = new Set(members);
          if (!chair || !secretary || chair === secretary || members.includes(chair) || members.includes(secretary) || members.length !== 4 || uniqueMembers.size !== 4) missing.push('Cần đúng 1 Chủ tịch, 4 Thành viên độc quyền và 1 Thư ký ngoài mẫu số');
        }
        const cancelVersion = $('#cancel-snapshot-version')?.value.trim(), cancelStage = $('#cancel-current-stage')?.value;
        if (cancelVersion && cancelVersion !== 'REQ-CAN-011 V1') missing.push('Yêu cầu hủy đã có phiên bản mới; hãy tải lại snapshot');
        if (cancelStage === 'Chờ nghiệm thu') missing.push('Đề tài đã tới Chờ nghiệm thu; yêu cầu hủy hiện tại đã stale');
        fieldsForAction(action).filter(field => field.id.endsWith('-attestation')).forEach(field => {
          if (!field.value.startsWith('Đúng bản')) missing.push(`${field.labels?.[0]?.textContent}: phải đối chiếu đúng bản đã ký`);
        });
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
      const auditPage = document.body.dataset.pageCodes?.split(' ').includes('PK-23');
      if (auditPage) {
        const rows = $$('[data-record]');
        const events = $$('[data-audit-event]');
        rows.forEach((row, index) => {
          const event = events[index];
          const haystack = `${row.textContent} ${event?.textContent || ''}`.toLocaleLowerCase('vi');
          const hidden = Boolean(query && !haystack.includes(query)) || (state !== 'all' && row.dataset.state !== state);
          row.hidden = hidden;
          if (event) event.hidden = hidden;
        });
        const visibleAudit = $$('[data-audit-event]').filter(event => !event.hidden).length;
        const metric = $('[data-metric-label="Sự kiện trong bộ lọc"]');
        if (metric) $('strong', metric).textContent = String(visibleAudit);
      } else {
        $$('[data-record]').forEach(row => {
          row.hidden = Boolean(query && !row.textContent.toLocaleLowerCase('vi').includes(query)) || (state !== 'all' && row.dataset.state !== state);
        });
      }
      updateCounts();
      colorizeStatuses();
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
      const councilStage = $('#council-stage'), councilInput = $('#council-input'), councilDecision = $('#council-decision');
      if (councilStage && councilInput) {
        const expected = {'Nghiệm thu':'BM09', 'Xét duyệt hồ sơ':'BM01', 'Xét duyệt thuyết minh':'BM04'}[councilStage.value];
        setGate('official-input', councilInput.value.startsWith(expected));
        const expectedDecision = {'Nghiệm thu':'BM10', 'Xét duyệt hồ sơ':'Không áp dụng', 'Xét duyệt thuyết minh':'BM05'}[councilStage.value];
        setGate('stage-decision', Boolean(councilDecision?.value.startsWith(expectedDecision)));
        const chair = $('#council-chair')?.value.trim(), secretary = $('#council-secretary')?.value.trim();
        const members = ($('#council-members')?.value || '').split(';').map(value => value.trim()).filter(Boolean);
        const exclusive = Boolean(chair && secretary && chair !== secretary && !members.includes(chair) && !members.includes(secretary) && members.length === 4 && new Set(members).size === 4);
        setGate('chair', exclusive); setGate('secretary', exclusive);
        setGate('members', exclusive && acceptedCouncilRoster === councilRosterFingerprint());
        const acceptInvite = $('[data-action-branch="accept-invite"]'), openMeeting = $('[data-action-branch="open"]');
        if (acceptInvite && !openMeeting?.disabled) acceptInvite.disabled = !exclusive || acceptedCouncilRoster === councilRosterFingerprint();
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

  function runRuntimeSelfTest() {
    const scenario = new URLSearchParams(location.search).get('runtime-self-test');
    if (!scenario) return;
    const errors = [];
    const expect = (condition, message) => { if (!condition) errors.push(message); };
    const confirmAction = (id, reason = '') => {
      const action = document.querySelector(`[data-action-id="${CSS.escape(id)}"]`);
      if (!action || action.disabled) { errors.push(`${id}: action unavailable`); return false; }
      action.click();
      const dialog = $('dialog.demo-dialog');
      if (!dialog) { errors.push(`${id}: dialog missing`); return false; }
      const reasonField = $('#decision-reason', dialog);
      if (reasonField) reasonField.value = reason || 'Căn cứ kiểm thử chuỗi trạng thái';
      const confirm = $('[data-confirm]', dialog);
      if (confirm.disabled) { errors.push(`${id}: unexpectedly blocked`); dialog.close(); return false; }
      confirm.click();
      if (dialog.isConnected && !dialog.open) dialog.remove();
      return true;
    };
    if (scenario === 'council') {
      confirmAction('accept-last-invite');
      expect($('[data-gate-id="members"]')?.dataset.gateReady === 'true', 'invite did not open members gate');
      $('#council-members').value = 'TS. Hùng Hoàng; TS. Linh Phạm; TS. Sơn Trần; TS. Bình Võ';
      $('#council-members').dispatchEvent(new Event('input', {bubbles:true}));
      expect($('[data-gate-id="members"]')?.dataset.gateReady === 'false', 'roster mutation kept stale invitation');
      expect(!$('[data-action-id="accept-last-invite"]')?.disabled, 'new roster cannot accept invitations');
    } else if (scenario === 'documents') {
      $('#bm14-contract-applicability').value = 'Không có hợp đồng';
      expect(missingRequirements($('[data-action-id="store-bm14"]')).length > 0, 'no-contract still permits storing BM14');
      expect(missingRequirements($('[data-action-id="mark-bm14-na"]')).length === 0, 'no-contract cannot use N/A');
      confirmAction('return-bm09', 'Thiếu phụ lục dữ liệu');
      expect(!$('[data-action-id="refresh-bm09"]')?.disabled && $('[data-action-id="accept-bm09"]')?.disabled, 'return BM09 locked wrong branches');
      confirmAction('refresh-bm09');
      expect(!$('[data-action-id="return-bm09"]')?.disabled && !$('[data-action-id="accept-bm09"]')?.disabled, 'BM09 V3 did not reopen current-version decisions');
      expect($('#pk-bm09 .record-kicker span:nth-child(2)')?.textContent.includes('V3'), 'BM09 version did not advance');
    } else if (scenario === 'meeting-result') {
      confirmAction('receive-minutes'); confirmAction('end-meeting'); confirmAction('publish-result'); confirmAction('adjust-result');
      expect($('#result-v2')?.dataset.state === 'published' && $('[data-record-status]', $('#result-v2'))?.textContent === 'Đã công bố', 'adjusted result not published');
      expect($('.audit-panel li')?.textContent.includes('result-v2') && $('.audit-panel li')?.textContent.includes('Kết quả V2'), 'adjust audit targets old object/version');
    } else if (scenario === 'meeting-replace') {
      confirmAction('cancel-meeting'); confirmAction('replace-meeting');
      expect(Boolean($('#meeting-replacement')), 'replacement meeting missing');
      expect($('.audit-panel li')?.textContent.includes('meeting-replacement') && $('.audit-panel li')?.textContent.includes('HĐNT-2026-006-R1'), 'replacement audit targets old meeting');
      expect($('#meeting-votes')?.classList.contains('current'), 'replacement lifecycle not reset');
    } else if (scenario === 'cancel') {
      confirmAction('approve-cancel', 'Thiết bị không thể thay thế');
      expect($('[data-metric-label="Yêu cầu hủy chờ xử lý"] strong')?.textContent === '0', 'cancel metric stale');
      expect($('#cancel-terminal')?.classList.contains('complete') && $('#cancel-notify')?.classList.contains('complete'), 'cancel lifecycle stale');
    } else if (scenario === 'round') {
      confirmAction('publish-round', 'Cấu hình đã được đối chiếu');
      expect($('[data-metric-label="Đợt Nháp"] strong')?.textContent === '0', 'draft metric stale');
      expect($('#round-type')?.disabled && !$('#round-name')?.disabled && !$('#round-description')?.disabled, 'round selective lock wrong');
    } else if (scenario === 'audit') {
      $('[data-search]').value = 'Dịch vụ Cuộc họp';
      $('[data-search]').dispatchEvent(new Event('input', {bubbles:true}));
      expect(!$('#audit-2')?.hidden && $('#audit-1')?.hidden, 'timeline-only audit query failed');
      expect($('[data-metric-label="Sự kiện trong bộ lọc"] strong')?.textContent === '1', 'audit metric not recomputed');
    }
    const result = document.createElement('meta');
    result.name = 'runtime-selftest';
    result.content = errors.length ? `fail:${errors.join('|')}` : 'pass';
    document.head.append(result);
  }

  function colorizeStatuses() {
    $$('.status').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      let type = 'neutral';
      
      if (['đã nộp', 'đã duyệt', 'đủ điều kiện', 'hoàn tất', 'đã hoàn tất', 'đã xử lý', 'đã công bố', 'đã ký', 'đang diễn ra', 'hoạt động'].includes(text)) {
         type = 'success';
      } else if (['chờ review', 'đang chờ', 'chờ xử lý', 'đang thực hiện', 'chờ chữ ký 2', 'chờ ký thứ hai', 'đang nhận', 'chờ kết thúc'].includes(text)) {
         type = 'info';
      } else if (['chưa có', 'chưa đủ', 'chưa mở', 'chưa mở biên bản', 'nháp', 'chưa đủ 100%', 'bị chặn', 'nháp thay thế'].includes(text)) {
         type = 'neutral';
      } else if (['bị trả lại', 'đã trả', 'đã khóa', 'đã hủy', 'hết hạn', 'không đủ điều kiện', 'từ chối', 'mất hiệu lực'].includes(text)) {
         type = 'danger';
      }
      
      el.dataset.statusType = type;
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupFilters(); setupTabs(); setupDrawer(); setupNotifications(); setupFormGates(); updateCounts(); refreshGateSummary();
    $$('[data-action-id]').forEach(action => action.addEventListener('click', () => openDialog(action, missingRequirements(action))));
    $$('[data-file-for]').forEach(input => input.addEventListener('change', async () => {
      const file = input.files[0];
      const extensions = (input.accept || '').split(',').map(value => value.trim().toLowerCase()).filter(value => value.startsWith('.'));
      let selected = false;
      if (file) {
        const isPdf = extensions.includes('.pdf') || file.name.toLowerCase().endsWith('.pdf');
        const matchesExtension = !extensions.length || extensions.some(ext => file.name.toLowerCase().endsWith(ext));
        const matchesSize = file.size > 0 && file.size <= 20 * 1024 * 1024;
        let signatureValid = true;
        if (isPdf && matchesExtension && matchesSize) {
          try {
            const buffer = await file.slice(0, 5).arrayBuffer();
            const signature = String.fromCharCode(...new Uint8Array(buffer));
            if (signature !== '%PDF-') {
              signatureValid = false;
            }
          } catch (e) {
            signatureValid = false;
          }
        }
        selected = matchesExtension && matchesSize && signatureValid;
      }
      const gate = document.querySelector(`[data-gate-id="${CSS.escape(input.dataset.fileFor)}"]`);
      if (gate) {
        setGate(input.dataset.fileFor, selected);
        const detail = gate.querySelector('p');
        if (detail) detail.textContent = selected ? `Đã chọn ${input.files[0].name}; sẽ kiểm tra lại khi xác nhận.` : 'Chọn tệp hợp lệ để mở cổng.';
      }
      toast(selected ? `Đã chọn ${file.name}; chưa thực hiện hành động đích.` : (file ? 'Tệp sai chữ ký PDF hoặc vượt 20 MB; cổng vẫn bị chặn.' : 'Đã bỏ chọn tệp.'), Boolean(file) && !selected);
      syncCouncilUI();
      colorizeStatuses();
    }));
    syncCouncilUI();
    syncQtvUI();
    syncTdUI();
    syncPkUI();
    colorizeStatuses();
    injectResetButton();
    runRuntimeSelfTest();
  });

  const STATE_KEY = 'nckh_council_meeting_state';
  const defaultState = {
    stage: "Nghiệm thu",
    votesSubmitted: ["TV-Hùng", "TV-Linh", "TV-Sơn", "TV-Bình"],
    checkpointCreated: false,
    minutesStatus: "none",
    minutesVersion: "V1",
    minutesPdf: "",
    minutesFeedback: "",
    minutesHistory: []
  };

  function getCouncilState() {
    try {
      const data = localStorage.getItem(STATE_KEY);
      return data ? JSON.parse(data) : {...defaultState};
    } catch(e) {
      return {...defaultState};
    }
  }

  function saveCouncilState(state) {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(state));
    } catch(e) {}
  }

  function applyCouncilTransition(action, reason, context) {
    const actor = document.body.dataset.actor;
    if (!['ct', 'tv', 'tk', 'qt', 'td'].includes(actor)) return;
    const branch = action.dataset.actionBranch;
    const target = document.getElementById(action.dataset.target);

    // QTV (Quản trị viên)
    if (actor === 'qt') {
      const qtvState = getQtvState();
      const nowStr = new Date().toLocaleString('vi-VN');

      if (branch === 'create-account') {
        const name = $('#pk-name')?.value || 'Nguyễn Văn A';
        const email = $('#pk-email')?.value || 'a.nguyen@dntu.edu.vn';
        const code = $('#pk-code')?.value || 'CB-0088';

        qtvState.pkhcnAccountCreated = true;
        qtvState.pkhcnAccountName = name;
        qtvState.pkhcnAccountEmail = email;
        qtvState.pkhcnAccountCode = code;

        qtvState.auditEvents.unshift({
          title: `Tạo tài khoản P.KHCN cho ${name}`,
          meta: `Quỳnh Anh · Quản trị viên · ${nowStr}`,
          status: `Mã cán bộ ${code}`
        });

        saveQtvState(qtvState);
        syncQtvUI();
      }
      else if (branch === 'approve') {
        qtvState.anRoleStatus = 'approved';
        qtvState.auditEvents.unshift({
          title: "Duyệt vai trò Giảng viên cho An Nguyễn",
          meta: `Quỳnh Anh · Quản trị viên · ${nowStr}`,
          status: "Thành công"
        });
        saveQtvState(qtvState);
        syncQtvUI();
      }
      else if (branch === 'reject') {
        qtvState.anRoleStatus = 'rejected';
        qtvState.anRoleFeedback = reason || 'Không đủ hồ sơ minh chứng.';
        qtvState.auditEvents.unshift({
          title: "Từ chối vai trò Giảng viên cho An Nguyễn",
          meta: `Quỳnh Anh · Quản trị viên · ${nowStr}`,
          status: `Lý do: ${reason || 'Không đủ hồ sơ minh chứng'}`
        });
        saveQtvState(qtvState);
        syncQtvUI();
      }
      else if (branch === 'lock') {
        qtvState.anAccountState = 'locked';
        qtvState.auditEvents.unshift({
          title: "Khóa Tài khoản An Nguyễn",
          meta: `Quỳnh Anh · Quản trị viên · ${nowStr}`,
          status: `Lý do: ${reason || 'Vi phạm chính sách'}`
        });
        saveQtvState(qtvState);
        syncQtvUI();
      }
      else if (branch === 'unlock') {
        qtvState.binhAccountState = 'active';
        qtvState.auditEvents.unshift({
          title: "Mở khóa Tài khoản Bình Trần",
          meta: `Quỳnh Anh · Quản trị viên · ${nowStr}`,
          status: "Hoạt động"
        });
        saveQtvState(qtvState);
        syncQtvUI();
      }
      else if (branch === 'password-reset') {
        qtvState.auditEvents.unshift({
          title: "Đặt lại mật khẩu cho An Nguyễn",
          meta: `Quỳnh Anh · Quản trị viên · ${nowStr}`,
          status: "Đã tạo liên kết"
        });
        saveQtvState(qtvState);
        syncQtvUI();
      }
      return;
    }

    // TD (Trưởng đơn vị)
    if (actor === 'td') {
      const tdState = getTdState();

      if (branch === 'approve') {
        if (action.dataset.actionId === 'td-approve') {
          tdState.bm01Status = 'approved';
        }
        saveTdState(tdState);
        syncTdUI();
      }
      else if (branch === 'return') {
        if (action.dataset.actionId === 'td-return') {
          tdState.bm01Status = 'returned';
          tdState.bm01Feedback = reason || 'Hồ sơ thiếu minh chứng khoa học.';
        }
        else if (action.dataset.actionId === 'td-return-bm08') {
          tdState.bm08Status = 'returned';
          tdState.bm08Feedback = reason || 'Báo cáo thiếu minh chứng sản phẩm.';
        }
        saveTdState(tdState);
        syncTdUI();
      }
      else if (branch === 'sign-route') {
        if (action.dataset.actionId === 'td-route-bm08') {
          tdState.bm08Status = 'signed';
        }
        saveTdState(tdState);
        syncTdUI();
      }
      return;
    }

    // Council Flow (ct, tv, tk)
    const state = getCouncilState();

    if (branch === 'submit-ballot') {
      const name = actor === 'ct' ? 'Chủ tịch' : 'Thành viên';
      if (!state.votesSubmitted.includes(name)) {
        state.votesSubmitted.push(name);
      }
      if (state.votesSubmitted.length >= 5) {
        state.checkpointCreated = true;
        state.minutesStatus = 'draft';
      }
      saveCouncilState(state);
      syncCouncilUI();
    }
    else if (branch === 'submit-minutes') {
      state.minutesStatus = 'waiting_signature';
      state.minutesVersion = 'V2';
      saveCouncilState(state);
      syncCouncilUI();
    }
    else if (branch === 'resubmit-minutes') {
      state.minutesStatus = 'waiting_signature';
      state.minutesVersion = 'V3';
      state.minutesFeedback = '';
      saveCouncilState(state);
      syncCouncilUI();
    }
    else if (branch === 'return') {
      if (action.dataset.actionId === 'return-minutes') {
        state.minutesStatus = 'returned';
        state.minutesFeedback = reason || 'Trả chỉnh sửa biên bản.';
        saveCouncilState(state);
        syncCouncilUI();
      }
    }
    else if (branch === 'approve') {
      if (action.dataset.actionId === 'accept-minutes') {
        state.minutesStatus = 'waiting_second_signature';
        saveCouncilState(state);
        syncCouncilUI();
      }
    }
    else if (branch === 'second-signature') {
      state.minutesStatus = 'complete';
      saveCouncilState(state);
      syncCouncilUI();
    }
  }

  function syncCouncilUI() {
    const actor = document.body.dataset.actor;
    if (!['ct', 'tv', 'tk'].includes(actor)) return;

    const state = getCouncilState();
    const pageName = location.pathname.split('/').pop();

    const taskCountEl = $('.sidebar .task-count');
    if (taskCountEl) {
      if (actor === 'tv') {
        const hasVoted = state.votesSubmitted.includes('Thành viên');
        const pending = (hasVoted || state.checkpointCreated) ? 0 : 1;
        taskCountEl.textContent = pending;
        taskCountEl.setAttribute('aria-label', `${pending} việc cần làm`);
      }
      else if (actor === 'tk') {
        const isLocked = state.votesSubmitted.length >= 5;
        const needsMinutes = isLocked && ['none', 'draft', 'returned'].includes(state.minutesStatus);
        const pending = needsMinutes || !isLocked ? 1 : 0;
        taskCountEl.textContent = pending;
        taskCountEl.setAttribute('aria-label', `${pending} việc cần làm`);
      }
      else if (actor === 'ct') {
        const hasVoted = state.votesSubmitted.includes('Chủ tịch');
        const votePending = hasVoted ? 0 : 1;
        const minutesPending = (state.minutesStatus === 'waiting_signature') ? 1 : 0;
        const signPending = (state.minutesStatus === 'waiting_second_signature') ? 1 : 0;
        const pending = votePending + minutesPending + signPending;
        taskCountEl.textContent = pending;
        taskCountEl.setAttribute('aria-label', `${pending} việc cần làm`);
      }
    }

    if (actor === 'tv') {
      const hasVoted = state.votesSubmitted.includes('Thành viên');
      if (pageName === '01-viec-can-lam.html') {
        const row = $('#tv-ballot-task');
        if (row && (hasVoted || state.checkpointCreated)) {
          row.dataset.state = 'done';
          const statusEl = $('.status', row);
          if (statusEl) statusEl.textContent = 'Đã nộp';
          const link = $('a', row);
          if (link) {
            link.style.pointerEvents = 'none';
            link.textContent = 'Đã hoàn tất';
          }
        }
      }
      if (pageName === '03-chi-tiet-cuoc-hop.html') {
        const row = $('#tv-personal');
        if (row && (hasVoted || state.checkpointCreated)) {
          row.dataset.state = 'done';
          const statusEl = $('.status', row);
          if (statusEl) statusEl.textContent = 'Đã nộp';
        }
      }
      if (pageName === '05-phieu-cua-toi.html') {
        if (hasVoted || state.checkpointCreated) {
          $$('[data-business-field]').forEach(el => el.disabled = true);
          const submitBtn = $('[data-action-id="submit-tv-ballot"]');
          if (submitBtn) submitBtn.disabled = true;
          setGate('tv-file', true);
          setGate('tv-open', false);
        }
      }
    }

    if (actor === 'tk') {
      const isLocked = state.votesSubmitted.length >= 5;
      if (pageName === '01-viec-can-lam.html') {
        const row = $('#tk-wait');
        if (row) {
          if (['waiting_signature', 'waiting_second_signature', 'complete'].includes(state.minutesStatus)) {
            row.dataset.state = 'done';
            const statusEl = $('.status', row);
            if (statusEl) statusEl.textContent = 'Đã nộp';
            const desc = $('p', row);
            if (desc) desc.textContent = 'Biên bản đã được nộp cho Chủ tịch duyệt.';
            const link = $('a', row);
            if (link) {
              link.textContent = 'Xem chi tiết biên bản';
              link.href = '05-bien-ban.html';
            }
          }
          else if (isLocked) {
            row.dataset.state = 'done';
            const statusEl = $('.status', row);
            if (statusEl) statusEl.textContent = 'Đã chốt';
            const desc = $('p', row);
            if (desc) desc.textContent = 'Đủ 5/5 phiếu; sẵn sàng lập biên bản.';
            const link = $('a', row);
            if (link) {
              link.textContent = 'Đi đến lập biên bản';
              link.href = '05-bien-ban.html';
            }
          } else {
            row.dataset.state = 'blocked';
            const statusEl = $('.status', row);
            if (statusEl) statusEl.textContent = 'Chưa mở';
            const desc = $('p', row);
            if (desc) desc.textContent = `${state.votesSubmitted.length}/5 phiếu hợp lệ; bạn không thuộc mẫu số.`;
          }
        }
      }
      if (pageName === '03-dashboard-thu-ky.html') {
        updateMetric('Phiếu hợp lệ', `${state.votesSubmitted.length}/5`, isLocked ? 'Đã đủ 100% phiếu đánh giá.' : 'Đang chờ các thành viên.');
        setGate('tk-votes', isLocked);
        setGate('tk-checkpoint', state.checkpointCreated);
        
        const statusLabels = {
          'none': 'Chưa lập',
          'draft': 'Nháp',
          'waiting_signature': 'Đang chờ duyệt',
          'waiting_second_signature': 'Chờ ký thứ hai',
          'returned': 'Bị trả lại',
          'complete': 'Đã hoàn tất'
        };
        const statusTone = {
          'none': 'neutral',
          'draft': 'neutral',
          'waiting_signature': 'info',
          'waiting_second_signature': 'warning',
          'returned': 'danger',
          'complete': 'success'
        };
        const label = statusLabels[state.minutesStatus] || 'Chưa lập';
        updateMetric('Biên bản BM12', label, `Phiên bản: ${state.minutesVersion}`);
        const card = document.querySelector('[data-metric-label="Biên bản BM12"]');
        if (card) {
          card.className = `metric-card ${statusTone[state.minutesStatus] || 'neutral'}`;
        }

        const progress = $('#tk-progress');
        if (progress) {
          if (state.minutesStatus === 'complete') {
            progress.dataset.state = 'done';
            const statusEl = $('.status', progress);
            if (statusEl) statusEl.textContent = 'Đã hoàn tất';
            const desc = $('p', progress);
            if (desc) desc.textContent = `Biên bản V3 đã được Chủ tịch ký hoàn tất.`;
            const link = $('a', progress);
            if (link) {
              link.textContent = 'Xem kết quả';
              link.href = '06-ket-qua.html';
            }
          }
          else if (state.minutesStatus === 'waiting_signature' || state.minutesStatus === 'waiting_second_signature') {
            progress.dataset.state = 'waiting';
            const statusEl = $('.status', progress);
            if (statusEl) statusEl.textContent = state.minutesStatus === 'waiting_signature' ? 'Chờ review' : 'Chờ chữ ký 2';
            const desc = $('p', progress);
            if (desc) desc.textContent = `Đang chờ Chủ tịch duyệt và ký Biên bản ${state.minutesVersion}.`;
            const link = $('a', progress);
            if (link) {
              link.textContent = 'Xem chi tiết biên bản';
              link.href = '05-bien-ban.html';
            }
          }
          else if (state.minutesStatus === 'returned') {
            progress.dataset.state = 'open';
            const statusEl = $('.status', progress);
            if (statusEl) statusEl.textContent = 'Bị trả lại';
            const desc = $('p', progress);
            if (desc) desc.textContent = `Chủ tịch trả Biên bản V2: "${state.minutesFeedback}". Cần sửa gấp.`;
            const link = $('a', progress);
            if (link) {
              link.textContent = 'Sửa & nộp lại Biên bản';
              link.href = '05-bien-ban.html';
            }
          }
          else if (isLocked) {
            progress.dataset.state = 'done';
            const statusEl = $('.status', progress);
            if (statusEl) statusEl.textContent = 'Đã chốt';
            const desc = $('p', progress);
            if (desc) desc.textContent = `5/5 người đánh giá đã nộp · Thư ký ở ngoài mẫu số`;
            const link = $('a', progress);
            if (link) {
              link.textContent = 'Lập biên bản họp';
              link.href = '05-bien-ban.html';
            }
          } else {
            progress.dataset.state = 'blocked';
            const statusEl = $('.status', progress);
            if (statusEl) statusEl.textContent = 'Chưa đủ';
            const desc = $('p', progress);
            if (desc) desc.textContent = `${state.votesSubmitted.length}/5 người đánh giá đã nộp · Thư ký ở ngoài mẫu số`;
          }
        }
      }
      if (pageName === '05-bien-ban.html') {
        setGate('tk-five-votes', state.checkpointCreated);
        setGate('tk-meeting-open', state.minutesStatus !== 'complete');
        setGate('tk-returned', state.minutesStatus === 'returned');

        if (state.minutesStatus === 'returned') {
          const returnedGate = $('[data-gate-id="tk-returned"]');
          if (returnedGate) {
            const desc = $('p', returnedGate);
            if (desc) desc.textContent = `Lý do trả từ Chủ tịch: "${state.minutesFeedback}"`;
          }
        }

        const submitBtn = $('[data-action-id="submit-minutes"]');
        const resubmitBtn = $('[data-action-id="resubmit-minutes"]');

        if (state.minutesStatus === 'none' || state.minutesStatus === 'draft') {
          if (submitBtn) submitBtn.disabled = !state.checkpointCreated;
          if (resubmitBtn) resubmitBtn.disabled = true;
        } else if (state.minutesStatus === 'waiting_signature' || state.minutesStatus === 'waiting_second_signature') {
          $$('[data-business-field]').forEach(el => el.disabled = true);
          if (submitBtn) submitBtn.disabled = true;
          if (resubmitBtn) resubmitBtn.disabled = true;
          const fileInput = $('#tk-minutes-file');
          if (fileInput) fileInput.disabled = true;
        } else if (state.minutesStatus === 'returned') {
          if (submitBtn) submitBtn.disabled = true;
          if (resubmitBtn) resubmitBtn.disabled = false;
        } else if (state.minutesStatus === 'complete') {
          $$('[data-business-field]').forEach(el => el.disabled = true);
          if (submitBtn) submitBtn.disabled = true;
          if (resubmitBtn) resubmitBtn.disabled = true;
          const fileInput = $('#tk-minutes-file');
          if (fileInput) fileInput.disabled = true;
        }
      }
    }

    if (actor === 'ct') {
      const hasVoted = state.votesSubmitted.includes('Chủ tịch');
      if (pageName === '01-viec-can-lam.html') {
        const ballotRow = $('#ct-ballot');
        if (ballotRow) {
          if (hasVoted) {
            ballotRow.dataset.state = 'done';
            const statusEl = $('.status', ballotRow);
            if (statusEl) statusEl.textContent = 'Đã nộp';
            const link = $('a', ballotRow);
            if (link) {
              link.style.pointerEvents = 'none';
              link.textContent = 'Đã hoàn tất';
            }
          }
        }
        const minutesRow = $('#ct-minutes');
        if (minutesRow) {
          if (state.minutesStatus === 'waiting_signature') {
            minutesRow.dataset.state = 'open';
            const statusEl = $('.status', minutesRow);
            if (statusEl) statusEl.textContent = 'Chờ review';
          } else if (state.minutesStatus === 'returned') {
            minutesRow.dataset.state = 'done';
            const statusEl = $('.status', minutesRow);
            if (statusEl) statusEl.textContent = 'Đã trả';
          } else if (state.minutesStatus === 'waiting_second_signature' || state.minutesStatus === 'complete') {
            minutesRow.dataset.state = 'done';
            const statusEl = $('.status', minutesRow);
            if (statusEl) statusEl.textContent = state.minutesStatus === 'complete' ? 'Hoàn tất' : 'Đã duyệt';
          } else {
            minutesRow.dataset.state = 'blocked';
            const statusEl = $('.status', minutesRow);
            if (statusEl) statusEl.textContent = 'Chưa có';
          }
        }
      }
      if (pageName === '03-chi-tiet-cuoc-hop.html') {
        const ballotRow = $('#ct-task');
        if (ballotRow && hasVoted) {
          ballotRow.dataset.state = 'done';
          const statusEl = $('.status', ballotRow);
          if (statusEl) statusEl.textContent = 'Đã nộp';
        }
        const minutesRow = $('#ct-minute-state');
        if (minutesRow) {
          if (state.minutesStatus === 'waiting_signature') {
            minutesRow.dataset.state = 'open';
            const statusEl = $('.status', minutesRow);
            if (statusEl) statusEl.textContent = 'Chờ review';
          } else if (state.minutesStatus === 'complete') {
            minutesRow.dataset.state = 'done';
            const statusEl = $('.status', minutesRow);
            if (statusEl) statusEl.textContent = 'Hoàn tất';
          } else if (state.minutesStatus === 'returned') {
            minutesRow.dataset.state = 'done';
            const statusEl = $('.status', minutesRow);
            if (statusEl) statusEl.textContent = 'Đã trả';
          }
        }
      }
      if (pageName === '05-phieu-cua-toi.html') {
        if (hasVoted) {
          $$('[data-business-field]').forEach(el => el.disabled = true);
          const submitBtn = $('[data-action-id="submit-ct-ballot"]');
          if (submitBtn) submitBtn.disabled = true;
          setGate('ct-ballot-file', true);
          setGate('ct-meeting-open', false);
        }
      }
      if (pageName === '06-review-bien-ban.html') {
        const acceptBtn = $('[data-action-id="accept-minutes"]');
        const returnBtn = $('[data-action-id="return-minutes"]');
        if (state.minutesStatus === 'waiting_signature') {
          if (acceptBtn) acceptBtn.disabled = false;
          if (returnBtn) returnBtn.disabled = false;
        } else {
          if (acceptBtn) acceptBtn.disabled = true;
          if (returnBtn) returnBtn.disabled = true;
        }
      }
      if (pageName === '07-chu-ky-thu-hai.html') {
        const submitBtn = $('[data-action-id="complete-minutes"]');
        if (state.minutesStatus === 'waiting_second_signature') {
          const fileInput = $('#ct-minutes-file');
          if (fileInput) fileInput.disabled = false;
          const fileUploaded = fileInput && fileInput.files && fileInput.files.length > 0;
          if (submitBtn) submitBtn.disabled = !fileUploaded;
        } else {
          if (submitBtn) submitBtn.disabled = true;
          const fileInput = $('#ct-minutes-file');
          if (fileInput) fileInput.disabled = true;
        }
      }
      if (pageName === '08-ket-qua.html') {
        const row = $('#ct-result');
        if (row) {
          if (state.minutesStatus === 'complete') {
            row.dataset.state = 'done';
            const statusEl = $('.status', row);
            if (statusEl) statusEl.textContent = 'Đã hoàn tất';
            const desc = $('p', row);
            if (desc) desc.textContent = 'Kết luận chính thức HĐNT-2026-006';
          } else {
            row.dataset.state = 'waiting';
            const statusEl = $('.status', row);
            if (statusEl) statusEl.textContent = 'Chờ công bố';
          }
        }
      }
    }
  }

  function injectResetButton() {
    const actor = document.body.dataset.actor;
    if (!['ct', 'tv', 'tk', 'qt', 'td', 'pk'].includes(actor)) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'reset-demo-btn';
    btn.style.position = 'fixed';
    btn.style.bottom = '8px';
    btn.style.right = '8px';
    btn.style.zIndex = '9999';
    btn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.15)';
    btn.style.borderRadius = '3px';
    btn.style.padding = '3px 6px';
    btn.style.fontSize = '10px';
    btn.style.minHeight = 'auto';
    btn.style.height = '22px';
    btn.style.lineHeight = '1';
    btn.style.opacity = '0.4';
    btn.style.background = '#fff';
    btn.style.color = '#555';
    btn.style.border = '1px solid #ccc';
    btn.style.cursor = 'pointer';
    btn.style.fontFamily = 'sans-serif';
    btn.style.transition = 'opacity 0.16s ease, background 0.16s ease';
    btn.textContent = '🔄 Reset';
    btn.addEventListener('mouseenter', () => { btn.style.opacity = '1'; btn.style.background = '#f5f5f5'; });
    btn.addEventListener('mouseleave', () => { btn.style.opacity = '0.4'; btn.style.background = '#fff'; });
    btn.addEventListener('click', () => {
      localStorage.removeItem(STATE_KEY);
      localStorage.removeItem(QTV_STATE_KEY);
      localStorage.removeItem(TD_STATE_KEY);
      localStorage.removeItem(PK_STATE_KEY);
      toast('Đã reset dữ liệu demo. Đang tải lại...');
      setTimeout(() => location.reload(), 1000);
    });
    document.body.appendChild(btn);
  }

  const QTV_STATE_KEY = 'nckh_qtv_state';
  const defaultQtvState = {
    anRoleStatus: "open",
    anRoleFeedback: "",
    anAccountState: "active",
    binhAccountState: "locked",
    pkhcnAccountCreated: false,
    pkhcnAccountName: "",
    pkhcnAccountEmail: "",
    pkhcnAccountCode: "",
    auditEvents: [
      {"title": "Khóa Tài khoản Bình Trần", "meta": "Quỳnh Anh · Quản trị viên · 20/07/2026 10:18", "status": "Có lý do"},
      {"title": "Duyệt vai trò Giảng viên cho An Nguyễn", "meta": "Quỳnh Anh · 18/07/2026 08:20", "status": "Bất biến"}
    ]
  };

  function getQtvState() {
    try {
      const data = localStorage.getItem(QTV_STATE_KEY);
      return data ? JSON.parse(data) : {...defaultQtvState};
    } catch(e) {
      return {...defaultQtvState};
    }
  }

  function saveQtvState(state) {
    try {
      localStorage.setItem(QTV_STATE_KEY, JSON.stringify(state));
    } catch(e) {}
  }

  function syncQtvUI() {
    const actor = document.body.dataset.actor;
    if (actor !== 'qt') return;

    const state = getQtvState();
    const pageName = location.pathname.split('/').pop();

    const taskCountEl = $('.sidebar .task-count');
    if (taskCountEl) {
      const pendingTasks = (state.anRoleStatus === 'open' ? 1 : 0) + (state.pkhcnAccountCreated ? 0 : 1) + (state.anAccountState === 'active' ? 1 : 0) + (state.binhAccountState === 'locked' ? 1 : 0);
      taskCountEl.textContent = pendingTasks;
      taskCountEl.setAttribute('aria-label', `${pendingTasks} việc cần làm`);
    }

    if (pageName === '01-viec-can-lam.html') {
      const row = $('#role-request');
      if (row) {
        if (state.anRoleStatus !== 'open') {
          row.dataset.state = state.anRoleStatus === 'approved' ? 'done' : 'blocked';
          const statusEl = $('.status', row);
          if (statusEl) statusEl.textContent = state.anRoleStatus === 'approved' ? 'Đã duyệt' : 'Đã từ chối';
        }
      }
    }

    if (pageName === '02-danh-sach-tai-khoan.html') {
      const rowAn = $('#acct-an');
      if (rowAn) {
        rowAn.dataset.state = state.anAccountState;
        const statusEl = $('.status', rowAn);
        if (statusEl) statusEl.textContent = state.anAccountState === 'active' ? 'Hoạt động' : 'Đã khóa';
      }
      const rowBinh = $('#acct-binh');
      if (rowBinh) {
        rowBinh.dataset.state = state.binhAccountState;
        const statusEl = $('.status', rowBinh);
        if (statusEl) statusEl.textContent = state.binhAccountState === 'active' ? 'Hoạt động' : 'Đã khóa';
      }
      if (state.pkhcnAccountCreated) {
        const rowPk = $('#acct-pkhcn');
        if (rowPk) {
          const titleEl = $('h3', rowPk);
          if (titleEl) titleEl.textContent = `${state.pkhcnAccountName} · ${state.pkhcnAccountEmail}`;
          const descEl = $('p', rowPk);
          if (descEl) descEl.textContent = `P.KHCN · Mã cán bộ: ${state.pkhcnAccountCode}`;
        }
      }
    }

    if (pageName === '03-duyet-vai-tro.html') {
      const row = $('#approve-an');
      if (row) {
        if (state.anRoleStatus !== 'open') {
          row.dataset.state = state.anRoleStatus === 'approved' ? 'done' : 'blocked';
          const statusEl = $('.status', row);
          if (statusEl) statusEl.textContent = state.anRoleStatus === 'approved' ? 'Đã duyệt' : 'Đã từ chối';
          $$('[data-action-id]').forEach(btn => btn.disabled = true);
        }
      }
    }

    if (pageName === '04-tao-tai-khoan-pkhcn.html') {
      if (state.pkhcnAccountCreated) {
        $$('[data-business-field]').forEach(el => el.disabled = true);
        const submitBtn = $('[data-action-id="create-account"]');
        if (submitBtn) submitBtn.disabled = true;
      }
    }

    if (pageName === '05-bao-mat-tai-khoan.html') {
      const rowAn = $('#security-an');
      if (rowAn) {
        rowAn.dataset.state = state.anAccountState;
        const statusEl = $('.status', rowAn);
        if (statusEl) statusEl.textContent = state.anAccountState === 'active' ? 'Hoạt động' : 'Đã khóa';
        
        const lockBtn = $('[data-action-id="lock-account"][data-target="security-an"]');
        const resetBtn = $('[data-action-id="reset-password"][data-target="security-an"]');
        if (lockBtn) lockBtn.disabled = state.anAccountState === 'locked';
        if (resetBtn) resetBtn.disabled = state.anAccountState === 'locked';
      }
      const rowBinh = $('#security-binh');
      if (rowBinh) {
        rowBinh.dataset.state = state.binhAccountState;
        const statusEl = $('.status', rowBinh);
        if (statusEl) statusEl.textContent = state.binhAccountState === 'active' ? 'Hoạt động' : 'Đã khóa';
        
        const unlockBtn = $('[data-action-id="unlock-account"][data-target="security-binh"]');
        if (unlockBtn) unlockBtn.disabled = state.binhAccountState === 'active';
      }
    }

    if (pageName === '06-audit-tai-khoan.html') {
      const panel = $('.audit-panel');
      if (panel) {
        const ol = $('ol', panel);
        if (ol) {
          ol.innerHTML = state.auditEvents.map(event => `
            <li data-audit-event>
              <span class="audit-marker" aria-hidden="true"></span>
              <div>
                <b>${escapeHtml(event.title)}</b>
                <p>${escapeHtml(event.meta)}</p>
                <p><span class="status">${escapeHtml(event.status)}</span></p>
              </div>
            </li>
          `).join('');
        }
      }
    }
  }

  const TD_STATE_KEY = 'nckh_td_state';
  const defaultTdState = {
    bm01Status: "open",
    bm01Feedback: "",
    bm08Status: "open",
    bm08Feedback: ""
  };

  function getTdState() {
    try {
      const data = localStorage.getItem(TD_STATE_KEY);
      return data ? JSON.parse(data) : {...defaultTdState};
    } catch(e) {
      return {...defaultTdState};
    }
  }

  function saveTdState(state) {
    try {
      localStorage.setItem(TD_STATE_KEY, JSON.stringify(state));
    } catch(e) {}
  }

  function syncTdUI() {
    const actor = document.body.dataset.actor;
    if (actor !== 'td') return;

    const state = getTdState();
    const pageName = location.pathname.split('/').pop();

    const taskCountEl = $('.sidebar .task-count');
    if (taskCountEl) {
      const pendingTasks = (state.bm01Status === 'open' ? 1 : 0) + (state.bm08Status === 'open' ? 1 : 0);
      taskCountEl.textContent = pendingTasks;
      taskCountEl.setAttribute('aria-label', `${pendingTasks} việc cần làm`);
    }

    if (pageName === '01-viec-can-lam.html') {
      const rowHs = $('#td-hs');
      if (rowHs) {
        if (state.bm01Status !== 'open') {
          rowHs.dataset.state = state.bm01Status === 'approved' ? 'done' : 'blocked';
          const statusEl = $('.status', rowHs);
          if (statusEl) statusEl.textContent = state.bm01Status === 'approved' ? 'Đã duyệt' : 'Đã trả về';
        }
      }
      const rowBm08 = $('#td-bm08');
      if (rowBm08) {
        if (state.bm08Status !== 'open') {
          rowBm08.dataset.state = state.bm08Status === 'signed' ? 'done' : 'blocked';
          const statusEl = $('.status', rowBm08);
          if (statusEl) statusEl.textContent = state.bm08Status === 'signed' ? 'Đã gửi P.KHCN' : 'Đã trả về';
        }
      }
    }

    if (pageName === '02-hang-cho-xet-duyet.html') {
      const row = $('#td-q1');
      if (row) {
        if (state.bm01Status !== 'open') {
          row.dataset.state = state.bm01Status === 'approved' ? 'done' : 'blocked';
          const statusEl = $('.status', row);
          if (statusEl) statusEl.textContent = state.bm01Status === 'approved' ? 'Đã duyệt' : 'Đã trả về';
        }
      }
    }

    if (pageName === '03-duyet-bm01.html') {
      const row = $('#hs-gv-042');
      if (row) {
        if (state.bm01Status !== 'open') {
          row.dataset.state = state.bm01Status === 'approved' ? 'done' : 'blocked';
          const statusEl = $('.status', row);
          if (statusEl) statusEl.textContent = state.bm01Status === 'approved' ? 'Đã chuyển tiếp' : 'Đã trả về';
          $$('[data-action-id]').forEach(btn => btn.disabled = true);
        }
      }
    }

    if (pageName === '04-ky-bm08.html') {
      const row = $('#td-bm08-v2');
      if (row) {
        if (state.bm08Status !== 'open') {
          row.dataset.state = state.bm08Status === 'signed' ? 'done' : 'blocked';
          const statusEl = $('.status', row);
          if (statusEl) statusEl.textContent = state.bm08Status === 'signed' ? 'Đã gửi P.KHCN' : 'Đã trả về';
          
          $$('[data-action-id]').forEach(btn => btn.disabled = true);
          const fileInput = $('#td-bm08-file');
          if (fileInput) fileInput.disabled = true;
        }
      }
    }

    if (pageName === '05-de-tai-don-vi.html') {
      const row = $('#unit-topic-2');
      if (row) {
        if (state.bm08Status !== 'open') {
          row.dataset.state = state.bm08Status === 'signed' ? 'done' : 'blocked';
          const statusEl = $('.status', row);
          if (statusEl) statusEl.textContent = state.bm08Status === 'signed' ? 'Đã gửi P.KHCN' : 'Đã trả về';
        }
      }
    }
  }

  const PK_STATE_KEY = 'nckh_pkhcn_state';
  const defaultPkState = {
    roundDraftState: "draft",
    inviteAccepted: false,
    meetingState: "invites",
    meetingMinutesStatus: "none",
    meetingResultStatus: "none",
    bm09Submitted: false,
    bm09Status: "none",
    cancelRequestStatus: "open",
    bm14Status: "none",
    step07Status: "open"
  };

  function getPkState() {
    try {
      const data = localStorage.getItem(PK_STATE_KEY);
      return data ? JSON.parse(data) : {...defaultPkState};
    } catch(e) {
      return {...defaultPkState};
    }
  }

  function savePkState(state) {
    try {
      localStorage.setItem(PK_STATE_KEY, JSON.stringify(state));
    } catch(e) {}
  }

  function syncPkUI() {
    const actor = document.body.dataset.actor;
    if (actor !== 'pk') return;

    const state = getPkState();
    const pageName = location.pathname.split('/').pop();

    updateMetric('Lời mời chờ', state.meetingState === 'invites' && !state.inviteAccepted ? "1" : "0");
    updateMetric('Gate Bước 07 còn thiếu', state.bm14Status === 'none' ? "1" : "0");
    updateMetric('Yêu cầu hủy chờ xử lý', state.cancelRequestStatus === 'open' ? "1" : "0");
    updateMetric('Đợt Nháp', state.roundDraftState === 'draft' ? "1" : "0");
    updateMetric('Đợt đã công bố', state.roundDraftState === 'published' ? "3" : "2");

    if (pageName === '02-quan-ly-dot.html') {
      const row = $('#round-draft');
      if (row) {
        row.dataset.state = state.roundDraftState;
        const statusEl = $('.status', row);
        if (statusEl) statusEl.textContent = state.roundDraftState === 'published' ? 'Đang nhận' : 'Nháp';
        
        const btn = $('[data-action-id="publish-round"]');
        if (btn) btn.disabled = state.roundDraftState === 'published';
      }
      if (state.roundDraftState === 'published') {
        setLifecycle('round-draft-stage', 'complete', 'Cấu hình V3 đã khóa các trường ảnh hưởng tính hợp lệ.');
        setLifecycle('round-published-stage', 'current', 'Tên và mô tả vẫn có thể cập nhật; loại và thời gian bị khóa.');
      } else {
        setLifecycle('round-draft-stage', 'current', 'Cấu hình V3 nháp.');
        setLifecycle('round-published-stage', 'upcoming', 'Chờ công bố.');
      }
    }

    if (pageName === '03-de-tai-va-huy.html') {
      const rowCancel = $('#cancel-request-011');
      const approveCancelBtn = $('[data-action-branch="approve-cancel"]');
      const rejectCancelBtn = $('[data-action-branch="reject-cancel"]');

      if (state.cancelRequestStatus !== 'open') {
        if (rowCancel) {
          rowCancel.dataset.state = state.cancelRequestStatus === 'approved' ? 'done' : 'blocked';
          const statusEl = $('.status', rowCancel);
          if (statusEl) statusEl.textContent = state.cancelRequestStatus === 'approved' ? 'Chấp thuận' : 'Từ chối';
        }
        if (approveCancelBtn) approveCancelBtn.disabled = true;
        if (rejectCancelBtn) rejectCancelBtn.disabled = true;

        setLifecycle('cancel-review', 'complete', 'P.KHCN đã ghi quyết định có lý do.');
        setLifecycle('cancel-terminal', 'complete', state.cancelRequestStatus === 'approved' ? 'Đề tài đã hủy; dữ liệu được giữ.' : 'Yêu cầu bị từ chối; đề tài tiếp tục.');
        setLifecycle('cancel-notify', 'complete', 'Chủ nhiệm đã nhận thông báo; audit đã ghi trước/sau.');
      }
    }

    if (pageName === '04-hoi-dong-readiness.html') {
      if (state.inviteAccepted) {
        acceptedCouncilRoster = councilRosterFingerprint();
      }
      setupFormGates();

      const rowInvite = $('#invites-waiting');
      if (rowInvite && state.inviteAccepted) {
        const statusEl = $('.status', rowInvite);
        if (statusEl) statusEl.textContent = 'Đã nhận';
      }
      setGate('invites-accepted', state.inviteAccepted);
      
      const rowMeeting = $('#meeting-draft');
      const openBtn = $('[data-action-id="open-meeting"]');
      const acceptBtn = $('[data-action-branch="accept-invite"]');

      if (state.meetingState === 'open' || state.meetingState === 'cancelled' || state.meetingState === 'replaced') {
        if (rowMeeting) {
          rowMeeting.dataset.state = 'done';
          const statusEl = $('.status', rowMeeting);
          if (statusEl) statusEl.textContent = 'Đang diễn ra';
        }
        if (openBtn) openBtn.disabled = true;
        if (acceptBtn) acceptBtn.disabled = true;
        setLifecycle('council-invites', 'complete', 'Tất cả lời mời đã được chấp nhận.');
        setLifecycle('council-open', 'complete', 'Cuộc họp đã mở.');
        setLifecycle('council-lock', 'current', 'Cấu trúc, mẫu số và official input đã khóa.');
      } else {
        if (openBtn) openBtn.disabled = !state.inviteAccepted;
        setLifecycle('council-invites', state.inviteAccepted ? 'complete' : 'current');
        setLifecycle('council-open', state.inviteAccepted ? 'current' : 'upcoming');
      }
    }

    if (pageName === '05-cuoc-hop-ket-qua.html') {
      const rowMeeting = $('#meeting-live');
      const receiveBtn = $('[data-action-branch="receive-minutes"]');
      const cancelBtn = $('[data-action-branch="cancel-meeting"]');
      const replaceBtn = $('[data-action-branch="replace-meeting"]');
      const endBtn = $('[data-action-branch="end"]');
      const publishBtn = $('[data-action-branch="publish"]');
      const adjustBtn = $('[data-action-branch="adjust"]');

      if (state.meetingState === 'cancelled') {
        if (rowMeeting) {
          rowMeeting.dataset.state = 'blocked';
          const statusEl = $('.status', rowMeeting);
          if (statusEl) statusEl.textContent = 'Đã hủy';
        }
        $$('[data-action-id]').forEach(btn => btn.disabled = btn.dataset.actionBranch !== 'replace-meeting');
        ['meeting-minutes','meeting-end','meeting-publish','meeting-adjust'].forEach(id => setLifecycle(id, 'blocked', 'Cuộc họp cũ đã hủy; chỉ giữ lịch sử.'));
      }
      else if (state.meetingState === 'replaced') {
        if (rowMeeting) {
          rowMeeting.dataset.state = 'blocked';
          const statusEl = $('.status', rowMeeting);
          if (statusEl) statusEl.textContent = 'Đã hủy';
        }
        $$('[data-action-id]').forEach(btn => btn.disabled = true);
        const panel = $('#records-panel');
        if (panel && !$('#meeting-replacement')) {
          panel.insertAdjacentHTML('beforeend', '<article class="work-row updated" id="meeting-replacement" data-record data-state="draft" data-row-scope="pk"><div><h3>HĐNT-2026-006-R1 · Cuộc họp thay thế</h3><p>Liên kết hai chiều với HĐNT-2026-006 · readiness, lời mời và namespace bằng chứng mới</p></div><span class="status" data-record-status>Nháp thay thế</span></article>');
        }
        setLifecycle('meeting-votes', 'current', 'Cuộc họp thay thế dùng mẫu số và namespace mới.');
        setLifecycle('meeting-checkpoint', 'upcoming', 'Chỉ tạo mốc mới khi đủ 100% phiếu mới.');
        ['meeting-minutes','meeting-end','meeting-publish','meeting-adjust'].forEach(id => setLifecycle(id, 'upcoming', 'Chờ Cuộc họp thay thế đi qua đúng thứ tự.'));
      }
      else {
        if (state.meetingMinutesStatus === 'received') {
          if (rowMeeting) {
            rowMeeting.dataset.state = 'done';
            const statusEl = $('.status', rowMeeting);
            if (statusEl) statusEl.textContent = 'Chờ kết thúc';
          }
          if (receiveBtn) receiveBtn.disabled = true;
          if (endBtn) endBtn.disabled = false;
          updateMetric('Chữ ký Biên bản', '2/2', 'BM12 V3 đã đủ hai chữ ký.');
          setLifecycle('meeting-minutes', 'complete', 'BM12 V3 đủ hai chữ ký đã được ghi nhận.');
          setLifecycle('meeting-end', 'current', 'Đủ điều kiện để P.KHCN kết thúc Cuộc họp.');
        }
        else if (state.meetingMinutesStatus === 'ended') {
          if (rowMeeting) {
            rowMeeting.dataset.state = 'done';
            const statusEl = $('.status', rowMeeting);
            if (statusEl) statusEl.textContent = 'Chờ công bố';
          }
          if (receiveBtn) receiveBtn.disabled = true;
          if (endBtn) endBtn.disabled = true;
          if (publishBtn) publishBtn.disabled = false;
          setLifecycle('meeting-minutes', 'complete');
          setLifecycle('meeting-end', 'complete', 'Cuộc họp đã kết thúc và khóa nhận tài liệu.');
          setLifecycle('meeting-publish', 'current', 'Chờ P.KHCN công bố kết quả V1.');
        }

        if (state.meetingResultStatus === 'published') {
          if (rowMeeting) {
            rowMeeting.dataset.state = 'done';
            const statusEl = $('.status', rowMeeting);
            if (statusEl) statusEl.textContent = 'Đã công bố';
          }
          if (publishBtn) publishBtn.disabled = true;
          if (adjustBtn) adjustBtn.disabled = false;
          setLifecycle('meeting-minutes', 'complete');
          setLifecycle('meeting-end', 'complete');
          setLifecycle('meeting-publish', 'complete', 'Kết quả V1 đã công bố đúng actor.');
          setLifecycle('meeting-adjust', 'current', 'Chỉ tạo phiên bản mới nếu có căn cứ điều chỉnh.');
        }
        else if (state.meetingResultStatus === 'adjusted') {
          if (rowMeeting) {
            rowMeeting.dataset.state = 'blocked';
            const statusEl = $('.status', rowMeeting);
            if (statusEl) statusEl.textContent = 'Mất hiệu lực';
          }
          if (publishBtn) publishBtn.disabled = true;
          if (adjustBtn) adjustBtn.disabled = true;
          const panel = $('#records-panel');
          if (panel && !$('#result-v2')) {
            panel.insertAdjacentHTML('beforeend', '<article class="work-row updated" id="result-v2" data-record data-state="published" data-row-scope="pk"><div><h3>Kết quả V2 · phiên bản điều chỉnh</h3><p>Thay thế V1; V1 giữ lịch sử và được đánh dấu mất hiệu lực</p></div><span class="status" data-record-status>Đã công bố</span></article>');
          }
          setLifecycle('meeting-minutes', 'complete');
          setLifecycle('meeting-end', 'complete');
          setLifecycle('meeting-publish', 'complete');
          setLifecycle('meeting-adjust', 'complete', 'Kết quả V2 đã công bố; V1 giữ lịch sử và mất hiệu lực.');
        }
      }
    }

    if (pageName === '06-tai-lieu-buoc-03-07.html') {
      const rowBm09 = $('#pk-bm09');
      const returnBm09Btn = $('[data-action-branch="return-bm09"]');
      const acceptBm09Btn = $('[data-action-branch="accept-bm09"]');

      if (state.bm09Status === 'submitted_v3') {
        if (rowBm09) {
          const versionEl = $('.record-kicker span:nth-child(2)', rowBm09);
          if (versionEl) versionEl.textContent = 'BM09 V3 + 3 sản phẩm';
        }
        if (returnBm09Btn) returnBm09Btn.disabled = false;
        if (acceptBm09Btn) acceptBm09Btn.disabled = false;
      }
      else if (state.bm09Status === 'returned') {
        if (rowBm09) {
          const versionEl = $('.record-kicker span:nth-child(2)', rowBm09);
          if (versionEl) versionEl.textContent = 'BM09 V2 + 3 sản phẩm';
        }
        if (returnBm09Btn) returnBm09Btn.disabled = false;
        if (acceptBm09Btn) acceptBm09Btn.disabled = true;
      }
      else if (state.bm09Status === 'accepted') {
        if (rowBm09) {
          rowBm09.dataset.state = 'done';
          const statusEl = $('.status', rowBm09);
          if (statusEl) statusEl.textContent = 'Đủ điều kiện';
        }
        if (returnBm09Btn) returnBm09Btn.disabled = true;
        if (acceptBm09Btn) acceptBm09Btn.disabled = true;
      }
      else {
        // default state 'none' (V2 waiting review)
        if (returnBm09Btn) returnBm09Btn.disabled = false;
        if (acceptBm09Btn) acceptBm09Btn.disabled = false;
      }

      const rowStep07 = $('#pk-step07');
      const storeBm14Btn = $('[data-action-branch="store-bm14"]');
      const naBm14Btn = $('[data-action-branch="mark-bm14-na"]');
      const completeBtn = $('[data-action-branch="complete-step07"]');

      if (state.bm14Status !== 'none') {
        if (storeBm14Btn) storeBm14Btn.disabled = true;
        if (naBm14Btn) naBm14Btn.disabled = true;
        $('#bm14-contract-applicability')?.setAttribute('disabled', '');
        
        setLifecycle('step07-close', 'complete', state.bm14Status === 'stored' ? 'BM14 hoàn chỉnh đã lưu.' : 'BM14 được đánh dấu N/A có căn cứ.');
        setLifecycle('step07-done', 'current', 'Mọi gate bắt buộc đã đạt; có thể hoàn tất Bước 07.');
      }

      if (state.step07Status === 'completed') {
        if (rowStep07) {
          rowStep07.dataset.state = 'done';
          const statusEl = $('.status', rowStep07);
          if (statusEl) statusEl.textContent = 'Đã hoàn tất';
        }
        if (completeBtn) completeBtn.disabled = true;
        if (storeBm14Btn) storeBm14Btn.disabled = true;
        if (naBm14Btn) naBm14Btn.disabled = true;
        setLifecycle('step07-done', 'complete', 'Bước 07 đã hoàn tất và khóa cổng MVP.');
      }
    }
  }
})();
