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
    if (action.dataset.actionId === 'publish-round') {
      setLifecycle('round-draft-stage', 'complete', 'Cấu hình V3 đã khóa các trường ảnh hưởng tính hợp lệ.');
      setLifecycle('round-published-stage', 'current', 'Tên và mô tả vẫn có thể cập nhật; loại và thời gian bị khóa.');
      updateMetric('Đợt Nháp', '0', 'Không còn cấu hình Nháp trong snapshot hiện tại.');
      updateMetric('Đợt đã công bố', '3', 'Bao gồm Đợt vừa công bố.');
    }
    if (branch === 'accept-invite') updateMetric('Lời mời chờ', '0', 'Tất cả lời mời đã được chấp nhận; sẵn sàng mở.');
    if (branch === 'open') {
      setLifecycle('council-invites', 'complete', 'Tất cả lời mời đã được chấp nhận.');
      setLifecycle('council-open', 'complete', 'Cuộc họp đã mở.');
      setLifecycle('council-lock', 'current', 'Cấu trúc, mẫu số và official input đã khóa.');
      updateMetric('Lời mời chờ', '0', 'Readiness đã đạt; Cuộc họp đang diễn ra.');
    }
    if (branch === 'receive-minutes') {
      setLifecycle('meeting-minutes', 'complete', 'BM12 V3 đủ hai chữ ký đã được ghi nhận.');
      setLifecycle('meeting-end', 'current', 'Đủ điều kiện để P.KHCN kết thúc Cuộc họp.');
      updateMetric('Chữ ký Biên bản', '2/2', 'BM12 V3 đã đủ hai chữ ký.');
    }
    if (branch === 'end') {
      setLifecycle('meeting-end', 'complete', 'Cuộc họp đã kết thúc và khóa nhận tài liệu.');
      setLifecycle('meeting-publish', 'current', 'Chờ P.KHCN công bố kết quả V1.');
    }
    if (branch === 'publish' && action.dataset.actionId === 'publish-result') {
      setLifecycle('meeting-publish', 'complete', 'Kết quả V1 đã công bố đúng actor.');
      setLifecycle('meeting-adjust', 'current', 'Chỉ tạo phiên bản mới nếu có căn cứ điều chỉnh.');
    }
    if (branch === 'store-bm14' || branch === 'mark-bm14-na') {
      setLifecycle('step07-close', 'complete', branch === 'store-bm14' ? 'BM14 hoàn chỉnh đã lưu.' : 'BM14 được đánh dấu N/A có căn cứ.');
      setLifecycle('step07-done', 'current', 'Mọi gate bắt buộc đã đạt; có thể hoàn tất Bước 07.');
      updateMetric('Gate Bước 07 còn thiếu', '0', 'BM14 đã lưu hoặc N/A hợp lệ.');
      $('#bm14-contract-applicability')?.setAttribute('disabled', '');
    }
    if (branch === 'refresh-bm09') {
      const version = $('#pk-bm09 .record-kicker span:nth-child(2)');
      if (version) version.textContent = 'BM09 V3 + 3 sản phẩm';
      const returnAction = $('[data-action-branch="return-bm09"]');
      const acceptAction = $('[data-action-branch="accept-bm09"]');
      if (returnAction) {
        returnAction.disabled = false;
        returnAction.dataset.consequence = 'BM09 V3 giữ lịch sử và quay về Chủ nhiệm cùng danh sách thiếu; chưa thể dùng làm official input.';
      }
      if (acceptAction) acceptAction.disabled = false;
    }
    if (branch === 'approve-cancel' || branch === 'reject-cancel') {
      setLifecycle('cancel-review', 'complete', 'P.KHCN đã ghi quyết định có lý do.');
      setLifecycle('cancel-terminal', 'complete', branch === 'approve-cancel' ? 'Đề tài đã hủy; dữ liệu được giữ.' : 'Yêu cầu bị từ chối; đề tài tiếp tục.');
      setLifecycle('cancel-notify', 'complete', 'Chủ nhiệm đã nhận thông báo; audit đã ghi trước/sau.');
      updateMetric('Yêu cầu hủy chờ xử lý', '0', 'REQ-CAN-011 đã có quyết định.');
    }
    if (branch === 'cancel-meeting') {
      ['meeting-minutes','meeting-end','meeting-publish','meeting-adjust'].forEach(id => setLifecycle(id, 'blocked', 'Cuộc họp cũ đã hủy; chỉ giữ lịch sử.'));
    }
    if (branch === 'replace-meeting') {
      setLifecycle('meeting-votes', 'current', 'Cuộc họp thay thế dùng mẫu số và namespace mới.');
      setLifecycle('meeting-checkpoint', 'upcoming', 'Chỉ tạo mốc mới khi đủ 100% phiếu mới.');
      ['meeting-minutes','meeting-end','meeting-publish','meeting-adjust'].forEach(id => setLifecycle(id, 'upcoming', 'Chờ Cuộc họp thay thế đi qua đúng thứ tự.'));
    }
    if (branch === 'adjust') setLifecycle('meeting-adjust', 'complete', 'Kết quả V2 đã công bố; V1 giữ lịch sử và mất hiệu lực.');
    if (branch === 'complete-step07') setLifecycle('step07-done', 'complete', 'Bước 07 đã hoàn tất và khóa cổng MVP.');
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
    runRuntimeSelfTest();
  });
})();
