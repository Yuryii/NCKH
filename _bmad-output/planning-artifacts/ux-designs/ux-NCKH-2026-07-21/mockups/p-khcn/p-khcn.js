(() => {
  'use strict';

  const STORAGE_KEY = 'NCKH_PK_PERSISTENT_STATE_V3';
  const bellIcon = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg>';

  /* -------------------------------------------------------------
     PERSISTENT STATE ENGINE (localStorage) WITH AUDIT LOGGING
     ------------------------------------------------------------- */
  function getDefaultState() {
    return {
      unreadNotifications: 5,
      pendingTasksCount: 8,
      urgentCount: 3,
      blockedCount: 2,
      trackingCount: 12,
      batchApproved: false,
      cancellationRequests: {},
      createdRounds: [],
      editedRounds: {},
      councilReadiness: {},
      createdCouncils: [],
      bm14Signed: {},
      bm13Confirmed: {},
      resultsPublished: false,
      auditLogs: [
        {
          id: 'log-init-3',
          timeStr: '22/07/2026 15:30',
          title: '[Thư ký HĐ - TS. Lê Thị B] Nộp Biên bản họp BM12',
          desc: 'Hội đồng HĐNT-2026-006 đã nộp Biên bản BM12 đủ 2 chữ ký số của Chủ tịch PGS.TS Nguyễn Văn A và Thư ký TS. Lê Thị B.',
          detail: 'Trạng thái: Biên bản BM12 đạt mức Khá Xuất sắc (88.5/100 điểm).',
          badge: 'Biên bản BM12',
          hash: 'SHA256-a8f9e12b74c09d31ff86b45028c'
        },
        {
          id: 'log-init-2',
          timeStr: '22/07/2026 09:12',
          title: '[Chủ nhiệm - TS. Trần Văn Hùng] Nộp Yêu cầu Hủy đề tài REQ-CAN-011',
          desc: 'Đề tài NCKH-GV-2026-011 do Chủ nhiệm chuyển công tác sang đơn vị mới.',
          detail: 'Trạng thái: Đã qua phê duyệt của Trưởng khoa CNTT. Chờ P.KHCN xử lý.',
          badge: 'Yêu cầu Hủy',
          hash: 'SHA256-c73e01a88b52f9411e0392019ab'
        },
        {
          id: 'log-init-1',
          timeStr: '15/07/2026 08:00',
          title: '[P.KHCN - Dũng Nguyễn] Ban hành Đợt đăng ký NCKH 2026',
          desc: 'Mở cổng nộp Thuyết minh BM01A/BM01B toàn Trường. Cấu hình chỉ tiêu 1.5 Tỷ VNĐ.',
          detail: 'Hệ thống tự động phát thông báo tới 12 Khoa/Đơn vị đào tạo.',
          badge: 'Ban hành Đợt',
          hash: 'SHA256-d4190e381b870a481c009215ef8'
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
    showToast('Đã Reset toàn bộ dữ liệu demo & Audit Log về trạng thái ban đầu!', 'info');
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

  /* Slide-over Drawer for Form Document Previews */
  function openFormDrawer({ title, formType, data = {} }) {
    const overlay = document.createElement('div');
    overlay.className = 'drawer-overlay';
    
    let htmlContent = '';

    if (formType === 'bm01a') {
      htmlContent = `
        <div class="pdf-sheet">
          <div class="pdf-sheet-header">
            <b>BỘ GIÁO DỤC VÀ ĐÀO TẠO — TRƯỜNG ĐẠI HỌC ĐỒNG NAI</b>
            <p><b>Mẫu BM01A: THUYẾT MINH ĐỀ TÀI KH&CN CẤP TRƯỜNG (DÀNH CHO GIẢNG VIÊN)</b></p>
            <h3>THUYẾT MINH ĐỀ TÀI NCKH</h3>
          </div>
          <div class="pdf-sheet-section">
            <h4>I. THÔNG TIN CHUNG</h4>
            <div class="pdf-sheet-row"><span>Tên đề tài:</span><div class="pdf-sheet-value"><b>${escapeHtml(data.title || 'Nghiên cứu ứng dụng Trí tuệ nhân tạo trong tự động hóa phân loại tài liệu NCKH tại Trường Đại học Đồng Nai')}</b></div></div>
            <div class="pdf-sheet-row"><span>Mã số đề tài:</span><div class="pdf-sheet-value">${escapeHtml(data.code || 'NCKH-GV-2026-011')}</div></div>
            <div class="pdf-sheet-row"><span>Chủ nhiệm đề tài:</span><div class="pdf-sheet-value">TS. Trần Văn Hùng (Khoa Công nghệ Thông tin)</div></div>
            <div class="pdf-sheet-row"><span>Đơn vị chủ trì:</span><div class="pdf-sheet-value">Khoa Công nghệ Thông tin — ĐNTU</div></div>
            <div class="pdf-sheet-row"><span>Thời gian thực hiện:</span><div class="pdf-sheet-value">12 tháng (từ 08/2026 đến 08/2027)</div></div>
            <div class="pdf-sheet-row"><span>Tổng kinh phí:</span><div class="pdf-sheet-value">35.000.000 VNĐ (Ba mươi lăm triệu đồng)</div></div>
          </div>
          <div class="pdf-sheet-section">
            <h4>II. MỤC TIÊU & NỘI DUNG NGHIÊN CỨU</h4>
            <div class="pdf-sheet-row"><span>Mục tiêu tổng quát:</span><div class="pdf-sheet-value">Xây dựng mô hình phân loại tự động hồ sơ NCKH bằng kỹ thuật NLP, tự động hóa quy trình rà soát biểu mẫu và giảm 70% thời gian xử lý thủ tục hành chính tại P-KHCN.</div></div>
            <div class="pdf-sheet-row"><span>Sản phẩm đăng ký:</span><div class="pdf-sheet-value">1) 01 Bài báo đăng trên Tạp chí Khoa học Chuyên ngành.
2) 01 Phần mềm demo phân loại văn bản tự động tích hợp hệ thống QLNCKH.
3) Báo cáo tổng kết đạt chuẩn NCKH cấp Trường.</div></div>
          </div>
          <div class="pdf-sheet-section">
            <h4>III. XÁC NHẬN VÀ CHỮ KÝ</h4>
            <div class="pdf-signatures">
              <div class="pdf-signature-box">
                <b>TRƯỜNG KHOA / ĐƠN VỊ</b>
                <div class="pdf-signature-stamp">✓ ĐÃ DUYỆT<br>TS. Nguyễn Văn Nam</div>
              </div>
              <div class="pdf-signature-box">
                <b>CHỦ NHIỆM ĐỀ TÀI</b>
                <div class="pdf-signature-stamp">✓ ĐÃ KÝ SỐ<br>TS. Trần Văn Hùng</div>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (formType === 'bm01b') {
      htmlContent = `
        <div class="pdf-sheet">
          <div class="pdf-sheet-header">
            <b>BỘ GIÁO DỤC VÀ ĐÀO TẠO — TRƯỜNG ĐẠI HỌC ĐỒNG NAI</b>
            <p><b>Mẫu BM01B: THUYẾT MINH ĐỀ TÀI NCKH SINH VIÊN</b></p>
            <h3>THUYẾT MINH ĐỀ TÀI NCKH SINH VIÊN</h3>
          </div>
          <div class="pdf-sheet-section">
            <h4>I. THÔNG TIN CHUNG</h4>
            <div class="pdf-sheet-row"><span>Tên đề tài:</span><div class="pdf-sheet-value"><b>${escapeHtml(data.title || 'Xây dựng ứng dụng Mobile hỗ trợ Sinh viên quản lý tiến độ học tập và NCKH')}</b></div></div>
            <div class="pdf-sheet-row"><span>Mã số đề tài:</span><div class="pdf-sheet-value">${escapeHtml(data.code || 'NCKH-SV-2026-004')}</div></div>
            <div class="pdf-sheet-row"><span>Sinh viên chủ nhiệm:</span><div class="pdf-sheet-value">Nguyễn Minh An (MSSV: 22100156 - Lớp 22DTH1)</div></div>
            <div class="pdf-sheet-row"><span>Giảng viên hướng dẫn:</span><div class="pdf-sheet-value">ThS. Lê Thị Mai (Khoa CNTT)</div></div>
            <div class="pdf-sheet-row"><span>Kinh phí đề xuất:</span><div class="pdf-sheet-value">12.000.000 VNĐ (Mười hai triệu đồng)</div></div>
          </div>
          <div class="pdf-sheet-section">
            <h4>II. ĐÁNH GIÁ CỦA GIẢNG VIÊN HƯỚNG DẪN</h4>
            <div class="pdf-sheet-row"><span>Nhận xét chuyên môn:</span><div class="pdf-sheet-value">Đề tài có tính thực tiễn cao, đáp ứng tốt nhu cầu quản lý tiến độ NCKH của sinh viên. Đủ điều kiện phê duyệt đưa vào danh mục xét duyệt cấp Trường.</div></div>
          </div>
          <div class="pdf-sheet-section">
            <div class="pdf-signatures">
              <div class="pdf-signature-box">
                <b>GIẢNG VIÊN HƯỚNG DẪN</b>
                <div class="pdf-signature-stamp">✓ XÁC NHẬN HƯỚNG DẪN<br>ThS. Lê Thị Mai</div>
              </div>
              <div class="pdf-signature-box">
                <b>SINH VIÊN CHỦ NHIỆM</b>
                <div class="pdf-signature-stamp">✓ ĐÃ NỘP HỒ SƠ<br>Nguyễn Minh An</div>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (formType === 'bm12') {
      htmlContent = `
        <div class="pdf-sheet">
          <div class="pdf-sheet-header">
            <b>BỘ GIÁO DỤC VÀ ĐÀO TẠO — TRƯỜNG ĐẠI HỌC ĐỒNG NAI</b>
            <p><b>Mẫu BM12: BIÊN BẢN HỌP HỘI ĐỒNG ĐÁNH GIÁ/NGHIỆM THU NCKH</b></p>
            <h3>BIÊN BẢN ĐÁNH GIÁ NGHIỆM THU</h3>
          </div>
          <div class="pdf-sheet-section">
            <h4>I. THÔNG TIN CUỘC HỌP HỘI ĐỒNG</h4>
            <div class="pdf-sheet-row"><span>Hội đồng nghiệm thu:</span><div class="pdf-sheet-value"><b>HĐNT-2026-006 (Ngành Công nghệ Thông tin)</b></div></div>
            <div class="pdf-sheet-row"><span>Đề tài nghiệm thu:</span><div class="pdf-sheet-value">NCKH-GV-2026-011 - TS. Trần Văn Hùng</div></div>
            <div class="pdf-sheet-row"><span>Thời gian họp:</span><div class="pdf-sheet-value">08:30 Ngày 22 tháng 07 năm 2026 tại Phòng A2.04</div></div>
            <div class="pdf-sheet-row"><span>Thành viên có mặt:</span><div class="pdf-sheet-value">5/5 thành viên theo Quyết định số 412/QĐ-ĐNTU.</div></div>
          </div>
          <div class="pdf-sheet-section">
            <h4>II. KẾT QUẢ ĐÁNH GIÁ</h4>
            <div class="pdf-sheet-row"><span>Điểm trung bình:</span><div class="pdf-sheet-value"><b>88.5 / 100 điểm</b></div></div>
            <div class="pdf-sheet-row"><span>Xếp loại:</span><div class="pdf-sheet-value"><b style="color:var(--success)">ĐẠT MỨC KHÁ XUẤT SẮC</b></div></div>
            <div class="pdf-sheet-row"><span>Kết luận Hội đồng:</span><div class="pdf-sheet-value">Thông qua kết quả nghiệm thu. Đề nghị Chủ nhiệm bổ sung, chỉnh sửa nội dung Báo cáo tổng kết theo Bản giải trình BM13 trước khi nghiệm thu tài chính.</div></div>
          </div>
          <div class="pdf-sheet-section">
            <h4>III. XÁC NHẬN CHỮ KÝ ĐIỆN TỬ</h4>
            <div class="pdf-signatures">
              <div class="pdf-signature-box">
                <b>THƯ KÝ HỘI ĐỒNG</b>
                <div class="pdf-signature-stamp">✓ ĐÃ KÝ SỐ BM12<br>TS. Lê Thị B</div>
              </div>
              <div class="pdf-signature-box">
                <b>CHỦ TỊCH HỘI ĐỒNG</b>
                <div class="pdf-signature-stamp">✓ ĐÃ KÝ SỐ BM12<br>PGS.TS. Nguyễn Văn A</div>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (formType === 'bm14') {
      const state = loadState();
      const isSigned = state.bm14Signed['NCKH-GV-2026-011'];

      htmlContent = `
        <div class="pdf-sheet">
          <div class="pdf-sheet-header">
            <b>TRƯỜNG ĐẠI HỌC ĐỒNG NAI — PHÒNG KH&CN</b>
            <p><b>Mẫu BM14: BIÊN BẢN THANH LÝ HỢP ĐỒNG KH&CN</b></p>
            <h3>BIÊN BẢN THANH LÝ HỢP ĐỒNG NCKH</h3>
          </div>
          <div class="pdf-sheet-section">
            <h4>I. CÁC BÊN THAM GIA</h4>
            <div class="pdf-sheet-row"><span>Bên A (Bên giao):</span><div class="pdf-sheet-value">Trường Đại học Đồng Nai (Đại diện: Phòng KH&CN)</div></div>
            <div class="pdf-sheet-row"><span>Bên B (Bên nhận):</span><div class="pdf-sheet-value">TS. Trần Văn Hùng — Chủ nhiệm đề tài NCKH-GV-2026-011</div></div>
          </div>
          <div class="pdf-sheet-section">
            <h4>II. NỘI DUNG THANH LÝ</h4>
            <div class="pdf-sheet-row"><span>Hợp đồng số:</span><div class="pdf-sheet-value">HĐ-NCKH/2026-011 ngày 15/08/2025</div></div>
            <div class="pdf-sheet-row"><span>Xác nhận sản phẩm:</span><div class="pdf-sheet-value">Đã giao nộp 100% sản phẩm theo đúng hợp đồng (Báo cáo tổng kết, bài báo công bố, phần mềm demo).</div></div>
            <div class="pdf-sheet-row"><span>Quyết toán tài chính:</span><div class="pdf-sheet-value">Tổng kinh phí: 35.000.000 VNĐ.<br>Tạm ứng Đợt 1: 17.500.000 VNĐ.<br>Thanh toán Đợt 2 (Còn lại): 17.500.000 VNĐ.</div></div>
          </div>
          <div class="pdf-sheet-section">
            <div class="pdf-signatures">
              <div class="pdf-signature-box">
                <b>ĐẠI DIỆN PHÒNG KH&CN</b>
                <div class="pdf-signature-stamp" id="stamp-pk-sign">${isSigned ? '✓ ĐÃ KÝ SỐ THANH LÝ<br>Trưởng phòng KH&CN' : '⏳ CHỜ PHÒNG KHCN KÝ'}</div>
              </div>
              <div class="pdf-signature-box">
                <b>CHỦ NHIỆM ĐỀ TÀI</b>
                <div class="pdf-signature-stamp">✓ ĐÃ XÁC NHẬN<br>TS. Trần Văn Hùng</div>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      htmlContent = `
        <div class="pdf-sheet">
          <div class="pdf-sheet-header">
            <b>BỘ GIÁO DỤC VÀ ĐÀO TẠO — TRƯỜNG ĐẠI HỌC ĐỒNG NAI</b>
            <h3>XEM TRƯỚC VĂN BẢN HÀNH CHÍNH NCKH</h3>
          </div>
          <div class="pdf-sheet-section">
            <p>Tài liệu hành chính đã được P-KHCN tiếp nhận và lưu vết kiểm toán hệ thống.</p>
            <div class="pdf-sheet-row"><span>Mã tài liệu:</span><div class="pdf-sheet-value">${escapeHtml(data.code || 'DOC-2026-EX')}</div></div>
            <div class="pdf-sheet-row"><span>Trạng thái pháp lý:</span><div class="pdf-sheet-value">Đã kiểm tra hợp lệ 100%</div></div>
          </div>
        </div>
      `;
    }

    const drawerActionButton = formType === 'bm14'
      ? `<button class="primary drawer-action-sign" type="button" style="background:var(--success); border-color:var(--success);">✍️ Ký số BM14 & Mở Gate 07</button>`
      : `<button class="primary" type="button" onclick="window.NCKHUI.showToast('Đã tải xuống bản sao PDF có xác thực số.', 'success')">Tải PDF chính thức</button>`;

    overlay.innerHTML = `
      <div class="drawer-panel">
        <div class="drawer-head">
          <h2>${escapeHtml(title)}</h2>
          <button class="dialog-close drawer-close" type="button" aria-label="Đóng">×</button>
        </div>
        <div class="drawer-body">${htmlContent}</div>
        <div class="drawer-foot">
          <button class="secondary drawer-close" type="button">Đóng lại</button>
          ${drawerActionButton}
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

    const signBtn = overlay.querySelector('.drawer-action-sign');
    if (signBtn) {
      signBtn.addEventListener('click', () => {
        const state = loadState();
        state.bm14Signed['NCKH-GV-2026-011'] = true;
        saveState(state);

        recordAuditLog(
          '[P.KHCN - Dũng Nguyễn] Ký số BM14 Thanh lý & Mở Gate 07',
          'Hoàn tất Ký số Biên bản Thanh lý Hợp đồng NCKH-GV-2026-011 (TS. Trần Văn Hùng)',
          'Trạng thái: Gate 07 Open (Đã hoàn tất 100% quy trình NCKH)',
          'Ký số BM14'
        );

        const stamp = overlay.querySelector('#stamp-pk-sign');
        if (stamp) {
          stamp.className = 'pdf-signature-stamp';
          stamp.innerHTML = '✓ ĐÃ KÝ SỐ THANH LÝ<br>Trưởng phòng KH&CN';
        }
        showToast('Đã hoàn tất Ký số BM14 Thanh lý & Ghi nhật ký Audit Log mới!', 'success');
        
        syncStateToDOM();
        window.setTimeout(() => closeDrawer(), 1000);
      });
    }
  }

  /* -------------------------------------------------------------
     DOM HYDRATION FROM PERSISTENT LOCALSTORAGE
     ------------------------------------------------------------- */
  function syncStateToDOM() {
    const state = loadState();

    /* 1. Update Indicator Counter Badges */
    document.querySelectorAll('.bell-count, [data-unread-count]').forEach(node => {
      node.textContent = String(state.unreadNotifications);
      node.hidden = state.unreadNotifications === 0;
    });

    document.querySelectorAll('.nav-count, .task-count').forEach(el => {
      el.textContent = String(state.pendingTasksCount);
    });

    const statFirst = document.querySelector('.stats .stat:first-child strong, [data-metric-label="Tổng việc cần làm"] strong');
    if (statFirst) statFirst.textContent = String(state.pendingTasksCount);

    /* 2. Hydrate Batch Approval state */
    if (state.batchApproved) {
      document.querySelectorAll('.topic-card[data-state="open"], .work-row[data-state="open"]').forEach((card, idx) => {
        if (idx < 4) {
          card.setAttribute('data-state', 'completed');
          card.style.borderLeftColor = 'var(--success)';
          const badge = card.querySelector('.badge.warning, .badge.info, .status[data-status="open"]');
          if (badge) {
            badge.className = 'badge success';
            badge.textContent = '✓ Đã phê duyệt';
          }
          const nextAction = card.querySelector('.next-action, .next-step');
          if (nextAction) {
            nextAction.innerHTML = '<b>Trạng thái:</b> Đã được P.KHCN phê duyệt hàng loạt. Hồ sơ chuyển sang bước tiếp theo.';
          }
          const btn = card.querySelector('.primary, .danger, .button');
          if (btn && !btn.classList.contains('secondary')) {
            btn.className = 'secondary';
            btn.textContent = '✓ Hoàn tất';
          }
        }
      });
    }

    /* 3. Hydrate Cancellation Requests */
    const cnclState = state.cancellationRequests['NCKH-GV-2026-011'];
    if (cnclState && cnclState.status === 'approved') {
      const cards = [
        document.getElementById('pk-cancel'),
        document.getElementById('action-target-cancel-request-011')
      ];
      cards.forEach(card => {
        if (card) {
          card.setAttribute('data-state', 'completed');
          card.style.borderLeftColor = 'var(--danger)';

          const badge = card.querySelector('.badge.warning, .status');
          if (badge) {
            badge.className = 'badge danger';
            badge.textContent = `✓ Đã ban hành QĐ ${cnclState.num}`;
          }

          const nextAction = card.querySelector('.next-action, .next-step');
          if (nextAction) {
            nextAction.innerHTML = `<b>Trạng thái:</b> Đã ban hành QĐ <b>${escapeHtml(cnclState.num)}</b>. Đã yêu cầu thu hồi <b>${escapeHtml(cnclState.amt)} VNĐ</b> kinh phí đợt 1.`;
          }

          const actionContainer = card.querySelector('.topic-actions, div:last-child');
          if (actionContainer && !actionContainer.querySelector('button.secondary')) {
            actionContainer.innerHTML = `<span class="badge danger">Đã ban hành QĐ</span><button class="secondary" type="button" onclick="window.NCKHUI.showToast('Đã ban hành Quyết định Hủy số ${escapeHtml(cnclState.num)}', 'info')">Xem Quyết định</button>`;
          }
        }
      });
    }

    /* 4. Hydrate Created & Edited Rounds on Page 02 */
    const roundList = document.querySelector('.topic-list') || document.querySelector('.workspace > div > section');
    if (roundList && state.createdRounds && state.createdRounds.length > 0) {
      state.createdRounds.forEach(r => {
        if (!document.getElementById(r.id)) {
          const newCard = document.createElement('article');
          newCard.id = r.id;
          newCard.className = 'topic-card';
          newCard.setAttribute('data-state', 'open');
          newCard.style.borderLeftColor = 'var(--success)';
          newCard.style.background = '#F6FBF7';
          newCard.innerHTML = `
            <div>
              <div><span class="badge owner">Đợt vừa tạo</span> <span class="badge success">ROUND-2026-NEW</span></div>
              <h2 class="topic-title">${escapeHtml(r.title)}</h2>
              <span class="meta">Thời gian: ${escapeHtml(r.start)} - ${escapeHtml(r.end)} · Kinh phí: ${escapeHtml(r.budget)} VNĐ · Đối tượng: ${escapeHtml(r.audience)}</span>
              <div class="next-action"><b>Trạng thái:</b> Đợt đăng ký đang mở cổng nhận hồ sơ trực tuyến.</div>
            </div>
            <div class="topic-actions">
              <span class="badge success">Đang mở cổng</span>
              <button class="secondary" type="button" onclick="window.NCKHUI.handleEditRound(this)">Chỉnh sửa</button>
            </div>
          `;
          roundList.insertBefore(newCard, roundList.firstChild);
        }
      });
    }

    /* 5. Hydrate Council Readiness on Page 04 */
    const councilState = state.councilReadiness['HĐNT-2026-006'];
    if (councilState && councilState.unconfirmedMember) {
      const unconfirmedMember = document.querySelector('.doc-row .badge.warning, .doc-row .status[data-status-type="neutral"]');
      if (unconfirmedMember) {
        unconfirmedMember.className = 'badge success';
        unconfirmedMember.textContent = '✓ Đã xác nhận (Sau nhắc nhở)';
      }
      const readinessBadge = document.querySelector('.card .badge.danger, .panel .status[data-status="blocked"]');
      if (readinessBadge) {
        readinessBadge.className = 'badge success';
        readinessBadge.textContent = 'Readiness: 5/5 Sẵn sàng 100%';
      }
      const noticeDanger = document.querySelector('.notice.danger');
      if (noticeDanger) {
        noticeDanger.className = 'notice success';
        noticeDanger.innerHTML = '✓ Lời mời tham gia: 5/5 thành viên đã xác nhận đầy đủ.';
      }
    }

    /* Hydrate Created Councils on Page 04 */
    const councilContainer = document.querySelector('main.content');
    if (councilContainer && state.createdCouncils && state.createdCouncils.length > 0) {
      state.createdCouncils.forEach(c => {
        if (!document.getElementById(c.id)) {
          const newCouncil = document.createElement('section');
          newCouncil.id = c.id;
          newCouncil.className = 'card';
          newCouncil.style.marginTop = '16px';
          newCouncil.style.borderLeft = '4px solid var(--success)';
          newCouncil.style.background = '#F6FBF7';
          newCouncil.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <div>
                <h2>${escapeHtml(c.name)}</h2>
                <span class="meta">Chủ tịch: ${escapeHtml(c.chair)} · Thư ký: ${escapeHtml(c.sec)}</span>
              </div>
              <span class="badge success">✓ Readiness: 5/5 Đã xác nhận</span>
            </div>
            <div class="notice success">✓ Hội đồng đã khởi tạo thành công và gửi lời mời đến 5/5 thành viên.</div>
          `;
          councilContainer.appendChild(newCouncil);
        }
      });
    }

    /* 6. Hydrate BM14 Gate 07 on Page 06 */
    if (state.bm14Signed['NCKH-GV-2026-011']) {
      const row14 = document.getElementById('action-target-pk-bm14');
      if (row14) {
        row14.className = 'status';
        row14.setAttribute('data-status-type', 'success');
        row14.textContent = '✓ BM14 Đã ký';
      }
      const gateBtn = document.querySelector('[onclick*="bm14"]');
      if (gateBtn) {
        gateBtn.className = 'success-btn';
        gateBtn.innerHTML = '✓ Gate 07 Open (Đã hoàn tất)';
      }
    }

    /* 7. Hydrate Results Published on Page 05 */
    if (state.resultsPublished) {
      const btn = document.querySelector('.success-btn, [onclick*="handlePublishResults"]');
      if (btn) {
        btn.className = 'secondary';
        btn.innerHTML = '✓ Đã công bố QĐ 528/QĐ-ĐNTU-CNKQ';
      }
    }

    /* 8. Hydrate Complete Dynamic Audit Log Timeline on Page 07 */
    const logList = document.querySelector('main[data-page-codes="PK-07"] .topic-list, .card .topic-list');
    if (logList && state.auditLogs && state.auditLogs.length > 0) {
      logList.innerHTML = ''; // Clear default and render fresh persistent timeline
      state.auditLogs.forEach(l => {
        const logCard = document.createElement('div');
        logCard.id = l.id;
        logCard.className = 'topic-card';
        logCard.style.borderLeftColor = l.badge.includes('Hủy') ? 'var(--danger)' : 'var(--info)';
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
            <span class="badge success">✓ Audit Recorded</span>
          </div>
        `;
        logList.appendChild(logCard);
      });
    }
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
    const filterSelect = document.querySelector('[data-filter], #page-filter, #status, #faculty, #step');
    const rows = document.querySelectorAll('[data-record], .topic-card, .work-row, .data-table tbody tr');

    function applyFilter() {
      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const filterVal = filterSelect ? filterSelect.value : 'all';
      let visibleCount = 0;

      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const state = row.getAttribute('data-state') || row.getAttribute('data-status') || '';
        const matchSearch = !query || text.includes(query);
        const matchFilter = filterVal === 'all' || state === filterVal || (filterVal === 'open' && state !== 'completed' && state !== 'blocked');

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
  }

  /* Subtle Semi-transparent Reset Icon Button Injection */
  function injectResetButton() {
    if (!document.querySelector('.reset-demo-btn')) {
      const resetBtn = document.createElement('button');
      resetBtn.className = 'reset-demo-btn';
      resetBtn.type = 'button';
      resetBtn.innerHTML = '🔄';
      resetBtn.title = 'Reset Dữ liệu Demo về ban đầu';
      resetBtn.addEventListener('click', () => resetDemoState());
      document.body.appendChild(resetBtn);
    }
  }

  /* -------------------------------------------------------------
     PERSISTENT INTERACTION ACTION HANDLERS WITH AUDIT LOGGING
     ------------------------------------------------------------- */
  function setupLiveDemoActions() {

    /* 1. Create Round Handler */
    window.handleCreateRound = () => {
      openDialog({
        title: 'Tạo Đợt đăng ký NCKH mới (Form Nhập trực tiếp)',
        description: 'Điền thông tin chỉ tiêu và thời gian mở cổng cho Đợt đăng ký NCKH',
        content: `
          <div style="display:grid; gap:12px;">
            <div class="field"><label>Tên Đợt đăng ký</label><input id="dlg-round-title" value="Đợt 2: NCKH Giảng viên Năm học 2026–2027"></div>
            <div class="field"><label>Đối tượng tham gia</label><select id="dlg-round-audience"><option>Giảng viên & Nghiên cứu viên</option><option>Sinh viên toàn Trường</option></select></div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
              <div class="field"><label>Ngày mở cổng</label><input type="date" id="dlg-round-start" value="2026-09-01"></div>
              <div class="field"><label>Ngày đóng cổng</label><input type="date" id="dlg-round-end" value="2026-09-30"></div>
            </div>
            <div class="field"><label>Tổng kinh phí phân bổ (VNĐ)</label><input id="dlg-round-budget" value="1.800.000.000"></div>
          </div>
        `,
        confirmLabel: 'Khởi tạo Đợt & Xuất hiện trên Danh sách',
        confirmTone: 'primary',
        onConfirm: (dialog) => {
          const title = dialog.querySelector('#dlg-round-title')?.value || 'Đợt đăng ký NCKH mới';
          const audience = dialog.querySelector('#dlg-round-audience')?.value || 'Giảng viên & Nghiên cứu viên';
          const startRaw = dialog.querySelector('#dlg-round-start')?.value || '2026-09-01';
          const endRaw = dialog.querySelector('#dlg-round-end')?.value || '2026-09-30';
          const budget = dialog.querySelector('#dlg-round-budget')?.value || '1.800.000.000';

          const formatDate = (str) => {
            if (!str) return '';
            const parts = str.split('-');
            return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : str;
          };

          const roundObj = {
            id: `round-new-${Date.now()}`,
            title,
            audience,
            start: formatDate(startRaw),
            end: formatDate(endRaw),
            budget
          };

          const state = loadState();
          state.createdRounds = state.createdRounds || [];
          state.createdRounds.unshift(roundObj);
          saveState(state);

          recordAuditLog(
            '[P.KHCN - Dũng Nguyễn] Khởi tạo Đợt đăng ký NCKH mới',
            `Tạo đợt "${title}" cho ${audience}. Thời gian: ${formatDate(startRaw)} đến ${formatDate(endRaw)}`,
            `Tổng kinh phí phân bổ: ${budget} VNĐ`,
            'Tạo Đợt NCKH'
          );

          syncStateToDOM();
          showToast(`Đã khởi tạo đợt mới "${title}" & tự động ghi nhận Audit Log!`, 'success');
        }
      });
    };

    /* 2. Edit Round Handler */
    window.handleEditRound = (btnTarget) => {
      const card = btnTarget ? btnTarget.closest('.topic-card, .work-row, article') : document.querySelector('.topic-card');
      const titleEl = card ? card.querySelector('.topic-title, h2, h3') : null;
      const currentTitle = titleEl ? titleEl.textContent : 'Đợt đăng ký NCKH Giảng viên Năm học 2026–2027';

      openDialog({
        title: 'Chỉnh sửa & Gia hạn Đợt đăng ký',
        description: `Thay đổi thông tin trực tiếp cho "${currentTitle}"`,
        content: `
          <div style="display:grid; gap:12px;">
            <div class="field"><label>Tên Đợt đăng ký</label><input id="dlg-edit-title" value="${escapeHtml(currentTitle)}"></div>
            <div class="field"><label>Gia hạn ngày đóng cổng</label><input type="date" id="dlg-edit-end" value="2026-09-15"></div>
            <div class="field"><label>Kinh phí điều chỉnh (VNĐ)</label><input id="dlg-edit-budget" value="2.000.000.000"></div>
          </div>
        `,
        confirmLabel: 'Cập nhật trực tiếp',
        confirmTone: 'primary',
        onConfirm: (dialog) => {
          const newTitle = dialog.querySelector('#dlg-edit-title')?.value || currentTitle;
          const newEnd = dialog.querySelector('#dlg-edit-end')?.value || '2026-09-15';
          const newBudget = dialog.querySelector('#dlg-edit-budget')?.value || '2.000.000.000';

          const formatDate = (str) => {
            if (!str) return '';
            const parts = str.split('-');
            return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : str;
          };

          recordAuditLog(
            '[P.KHCN - Dũng Nguyễn] Chỉnh sửa & Gia hạn Đợt đăng ký',
            `Gia hạn đợt "${newTitle}" đến ngày ${formatDate(newEnd)}`,
            `Kinh phí điều chỉnh: ${newBudget} VNĐ`,
            'Gia hạn Đợt'
          );

          if (titleEl) titleEl.textContent = newTitle;
          const metaEl = card ? card.querySelector('.meta, p') : null;
          if (metaEl) {
            metaEl.innerHTML = `Thời gian: 01/08/2026 - <b style="color:var(--red);">${formatDate(newEnd)} (Đã gia hạn)</b> · Kinh phí: <b>${escapeHtml(newBudget)} VNĐ</b>`;
          }

          showToast(`Đã gia hạn đợt đăng ký đến ${formatDate(newEnd)} & lưu Audit Log!`, 'success');
        }
      });
    };

    /* 3. Create Council Handler */
    window.handleCreateCouncil = () => {
      openDialog({
        title: 'Thành lập & Phân công Hội đồng NCKH mới',
        description: 'Phân công nhân sự Hội đồng nghiệm thu cấp Ngành',
        content: `
          <div style="display:grid; gap:10px;">
            <div class="field"><label>Tên Hội đồng mới</label><input id="dlg-ccl-name" value="Hội đồng Đánh giá Nghiệm thu Ngành Điện - Điện tử 2026"></div>
            <div class="field"><label>Chủ tịch Hội đồng</label><input id="dlg-ccl-chair" value="PGS.TS. Hoàng Văn Hùng (Khoa Điện)"></div>
            <div class="field"><label>Thư ký Hội đồng</label><input id="dlg-ccl-sec" value="TS. Đỗ Thị Lan (Khoa Điện)"></div>
          </div>
        `,
        confirmLabel: 'Tạo Hội đồng & Hiển thị trên Màn hình',
        confirmTone: 'primary',
        onConfirm: (dialog) => {
          const name = dialog.querySelector('#dlg-ccl-name')?.value || 'Hội đồng NCKH Mới';
          const chair = dialog.querySelector('#dlg-ccl-chair')?.value || 'PGS.TS. Hoàng Văn Hùng';
          const sec = dialog.querySelector('#dlg-ccl-sec')?.value || 'TS. Đỗ Thị Lan';

          const councilObj = {
            id: `council-new-${Date.now()}`,
            name,
            chair,
            sec
          };

          const state = loadState();
          state.createdCouncils = state.createdCouncils || [];
          state.createdCouncils.push(councilObj);
          saveState(state);

          recordAuditLog(
            '[P.KHCN - Dũng Nguyễn] Thành lập Hội đồng NCKH mới',
            `Phân công Chủ tịch ${chair}, Thư ký ${sec} cho ${name}`,
            'Trạng thái: 5/5 thành viên đã nhận được thư mời trực tuyến',
            'Tạo Hội đồng'
          );

          syncStateToDOM();
          showToast(`Đã thành lập "${name}" & ghi nhận Audit Log!`, 'success');
        }
      });
    };

    /* 4. Export Audit Log Handler */
    window.handleExportAudit = () => {
      openDialog({
        title: 'Kết xuất Báo cáo Kiểm toán Hệ thống NCKH',
        description: 'Xuất nhật ký thao tác và chứng thư số phục vụ công tác kiểm toán',
        content: `
          <div class="notice success"><b>Báo cáo Kiểm toán Vận hành 2026</b></div>
          <div class="field"><label>Phạm vi đợt kiểm toán</label><select id="dlg-aud-scope"><option>Toàn bộ Đợt NCKH Năm 2026</option><option>Đợt 1 Năm 2026</option></select></div>
          <div class="field" style="margin-top:8px;"><label>Định dạng xuất báo cáo</label><select id="dlg-aud-fmt"><option>PDF Báo cáo Kiểm toán có xác thực mã Hash SHA-256</option><option>Excel Chi tiết Event Log</option></select></div>
        `,
        confirmLabel: 'Tải Báo cáo & Thêm Nhật ký Audit',
        confirmTone: 'primary',
        onConfirm: (dialog) => {
          const scope = dialog.querySelector('#dlg-aud-scope')?.value || 'Toàn bộ Đợt NCKH Năm 2026';
          const fmt = dialog.querySelector('#dlg-aud-fmt')?.value || 'PDF Báo cáo Kiểm toán';

          recordAuditLog(
            '[P.KHCN - Dũng Nguyễn] Xuất Báo cáo Audit Kiểm toán',
            `Phạm vi kiểm toán: ${scope} · Định dạng xuất: ${fmt}`,
            'Trạng thái: Báo cáo có xác thực mã băm SHA-256 hợp lệ 100%',
            'Xuất Audit'
          );

          syncStateToDOM();
          showToast(`Đã xuất Báo cáo Audit (${fmt}) và thêm sự kiện mới vào Audit Log!`, 'success');
        }
      });
    };

    /* 5. Batch Approval Handler */
    window.handleBatchApproval = () => {
      openDialog({
        title: 'Phê duyệt hàng loạt tác vụ P.KHCN',
        description: 'Xác nhận phê duyệt và chuyển trạng thái 4 tác vụ hợp lệ trong hàng chờ',
        content: `
          <div class="notice success"><b>4 tác vụ đủ điều kiện phê duyệt:</b></div>
          <ul style="margin:8px 0; padding-left:18px; font-size:12px;">
            <li>Duyệt Thuyết minh BM01A NCKH-GV-2026-011</li>
            <li>Tiếp nhận Báo cáo BM09 NCKH-SV-2025-018</li>
            <li>Xác nhận Bản giải trình BM13 Đợt 1</li>
            <li>Công bố Đợt đăng ký NCKH 2026</li>
          </ul>
        `,
        confirmLabel: 'Xác nhận Duyệt hàng loạt',
        confirmTone: 'primary',
        onConfirm: () => {
          const state = loadState();
          state.batchApproved = true;
          state.pendingTasksCount = Math.max(0, state.pendingTasksCount - 4);
          saveState(state);

          recordAuditLog(
            '[P.KHCN - Dũng Nguyễn] Phê duyệt hàng loạt 4 tác vụ',
            'Phê duyệt Thuyết minh BM01A, Báo cáo BM09, Giải trình BM13 và Đợt nộp hồ sơ',
            'Trạng thái: 4 tác vụ đã hoàn tất và chuyển bước tiếp theo',
            'Duyệt hàng loạt'
          );

          syncStateToDOM();
          showToast('Đã phê duyệt thành công 4 tác vụ & ghi nhận Audit Log!', 'success');
        }
      });
    };

    /* 6. Cancellation Approval Handler */
    window.handleCancelApproval = () => {
      openDialog({
        title: 'Ban hành Quyết định Hủy NCKH-GV-2026-011',
        description: 'Lập quyết định hủy đề tài & tính toán số tiền kinh phí thu hồi',
        content: `
          <div class="notice danger"><b>Xác nhận hủy hợp đồng NCKH-GV-2026-011</b></div>
          <div class="field"><label>Số quyết định hủy</label><input id="dlg-cncl-num" value="185/QĐ-ĐNTU-KHCN"></div>
          <div class="field" style="margin-top:8px;"><label>Số tiền thu hồi đợt 1 (VNĐ)</label><input id="dlg-cncl-amt" value="17.500.000"></div>
          <div class="field" style="margin-top:8px;"><label>Trích yếu Quyết định</label><textarea id="dlg-cncl-txt">Cho phép hủy đề tài NCKH-GV-2026-011 do Chủ nhiệm chuyển công tác. Thu hồi 100% kinh phí tạm ứng đợt 1 (17.500.000 VNĐ) về tài khoản Trường trong thời hạn 15 ngày.</textarea></div>
        `,
        confirmLabel: 'Ký & Ban hành Quyết định Hủy',
        confirmTone: 'danger',
        onConfirm: (dialog) => {
          const num = dialog.querySelector('#dlg-cncl-num')?.value || '185/QĐ-ĐNTU-KHCN';
          const amt = dialog.querySelector('#dlg-cncl-amt')?.value || '17.500.000';

          const state = loadState();
          state.cancellationRequests['NCKH-GV-2026-011'] = {
            status: 'approved',
            num,
            amt
          };
          state.pendingTasksCount = Math.max(0, state.pendingTasksCount - 1);
          saveState(state);

          recordAuditLog(
            '[P.KHCN - Dũng Nguyễn] Ban hành Quyết định Hủy & Thu hồi kinh phí',
            `Cho phép hủy đề tài NCKH-GV-2026-011 (TS. Trần Văn Hùng). Ban hành QĐ ${num}`,
            `Yêu cầu thu hồi 100% kinh phí tạm ứng đợt 1: ${amt} VNĐ về tài khoản Trường`,
            'QĐ Hủy Đề tài'
          );

          syncStateToDOM();
          showToast(`Đã ban hành QĐ Hủy ${num} & ghi nhận Audit Log!`, 'warning');
        }
      });
    };

    /* 7. Readiness Reminder Handler */
    window.handleReadinessRemind = () => {
      const state = loadState();
      state.councilReadiness['HĐNT-2026-006'] = {
        unconfirmedMember: true,
        readiness100: true
      };
      saveState(state);

      recordAuditLog(
        '[P.KHCN - Dũng Nguyễn] Gửi Nhắc nhở Readiness Hội đồng',
        'Gửi thông báo nhắc nhở TS. Nguyễn Thị D xác nhận tham gia HĐNT-2026-006',
        'Trạng thái: 5/5 thành viên đã xác nhận. Hội đồng đạt Readiness 100%',
        'Readiness 100%'
      );

      syncStateToDOM();
      showToast('Đã gửi nhắc nhở! Hội đồng đạt Readiness 100% & ghi Audit Log!', 'success');
    };

    /* 8. Publish Results Handler */
    window.handlePublishResults = () => {
      openDialog({
        title: 'Công bố Kết quả NCKH Chính thức',
        description: 'Ban hành Quyết định công nhận kết quả và phát hành Giấy chứng nhận',
        content: `
          <div class="notice success"><b>Chuẩn bị công bố kết quả Đợt NCKH 2026</b></div>
          <p style="font-size:12px;">Đã nghiệm thu thành công <b>12 đề tài</b> có Biên bản BM12 và BM13 hợp lệ 100%.</p>
          <div class="field"><label>Số Quyết định Công nhận Kết quả</label><input id="dlg-pub-num" value="528/QĐ-ĐNTU-CNKQ"></div>
        `,
        confirmLabel: 'Công bố Kết quả & Phát thông báo',
        confirmTone: 'primary',
        onConfirm: (dialog) => {
          const num = dialog.querySelector('#dlg-pub-num')?.value || '528/QĐ-ĐNTU-CNKQ';
          
          const state = loadState();
          state.resultsPublished = true;
          saveState(state);

          recordAuditLog(
            '[P.KHCN - Dũng Nguyễn] Công bố Kết quả NCKH Chính thức',
            `Ban hành Quyết định ${num} công nhận kết quả nghiệm thu 12 đề tài NCKH`,
            'Đã cấp Giấy chứng nhận và phát thông báo trên Portal',
            'Công bố Kết quả'
          );

          syncStateToDOM();
          showToast(`Đã ban hành QĐ ${num} công bố kết quả & ghi Audit Log!`, 'success');
        }
      });
    };
  }

  /* Global UI Export */
  window.NCKHUI = {
    openDialog,
    showToast,
    escapeHtml,
    openFormDrawer,
    resetDemo: () => resetDemoState(),
    handleBatchApproval: () => window.handleBatchApproval(),
    handleCancelApproval: (id) => window.handleCancelApproval(id),
    handleReadinessRemind: () => window.handleReadinessRemind(),
    handlePublishResults: () => window.handlePublishResults(),
    handleCreateRound: () => window.handleCreateRound(),
    handleEditRound: (target) => window.handleEditRound(target),
    handleCreateCouncil: () => window.handleCreateCouncil(),
    handleExportAudit: () => window.handleExportAudit()
  };

  document.addEventListener('DOMContentLoaded', () => {
    setupHeader();
    setupFilters();
    injectResetButton();
    setupLiveDemoActions();
    syncStateToDOM();
  });
})();
