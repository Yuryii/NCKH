/**
 * NCKH Council Chairman Interactive State Engine (Chủ tịch Hội đồng)
 * Handles BM07 grading, BM08 review, 2nd PKI digital signature, and shared state synchronization.
 */
(function() {
  'use strict';

  const STORAGE_KEY = 'NCKH_COUNCIL_SHARED_STATE_V1';

  const DEFAULT_STATE = {
    records: [
      {
        id: 'HDNT-2026-006',
        topicId: 'NCKH-GV-2026-015',
        title: 'Nghiên cứu ứng dụng Trí tuệ Nhân tạo trong Tự động hóa sản xuất Dược phẩm DNTU',
        author: 'TS. Phạm Văn Bình (Chủ nhiệm)',
        dept: 'Khoa Công nghệ Thông tin',
        scoreBallotsSubmitted: 3,
        totalBallotsNeeded: 5,
        avgScore: 88.5,
        status: 'open',
        ballotStatus: 'completed', // Chủ tịch đã nộp BM07
        secretarySigned: true,
        secretarySignedAt: '2026-07-25 15:30',
        chairmanSigned: false,
        chairmanSignedAt: null,
        pkiHash: 'a7c9f8e4b3a1d2e5f6a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0'
      },
      {
        id: 'HDNT-2026-007',
        topicId: 'NCKH-GV-2026-022',
        title: 'Thử nghiệm hệ thống cảm biến loT trong giám sát chất lượng không khí khuôn viên Đại học DNTU',
        author: 'ThS. Nguyễn Thị Mai',
        dept: 'Khoa Điện - Điện tử',
        scoreBallotsSubmitted: 5,
        totalBallotsNeeded: 5,
        avgScore: 92.0,
        status: 'open',
        ballotStatus: 'open', // Chưa nộp BM07
        secretarySigned: true,
        secretarySignedAt: '2026-07-26 09:15',
        chairmanSigned: false,
        chairmanSignedAt: null,
        pkiHash: 'e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2'
      }
    ],
    auditLogs: [
      { time: '2026-07-26 09:15', actor: 'Thư ký HĐ (ThS. Lê Văn Cường)', action: 'Đã lập & Ký số 1st Biên bản BM08 HĐNT-2026-007', hash: 'e1f2a3b4c5d6e7f8a9b0...' },
      { time: '2026-07-25 15:30', actor: 'Thư ký HĐ (ThS. Lê Văn Cường)', action: 'Đã lập & Ký số 1st Biên bản BM08 HĐNT-2026-006', hash: 'a7c9f8e4b3a1d2e5f6a8...' }
    ]
  };

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_STATE;
    } catch(e) {
      return DEFAULT_STATE;
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch(e) {
      console.error('Failed to save state:', e);
    }
  }

  window.NCKH_CHAIRMAN = {
    getState: loadState,
    saveState: saveState,

    showToast: function(message, type = 'success') {
      let region = document.querySelector('.toast-region');
      if (!region) {
        region = document.createElement('div');
        region.className = 'toast-region';
        document.body.appendChild(region);
      }
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      toast.textContent = message;
      region.appendChild(toast);
      setTimeout(() => toast.remove(), 4000);
    },

    signChairmanPKI: function(recordId) {
      const state = loadState();
      const rec = state.records.find(r => r.id === recordId);
      if (rec) {
        rec.chairmanSigned = true;
        rec.chairmanSignedAt = new Date().toLocaleString('vi-VN');
        rec.status = 'completed';
        state.auditLogs.unshift({
          time: rec.chairmanSignedAt,
          actor: 'Chủ tịch HĐ (PGS.TS. Nguyễn Văn A)',
          action: `Đã Ký số PKI 2nd Biên bản nghiệm thu ${recordId}`,
          hash: rec.pkiHash
        });
        saveState(state);
        this.showToast(`✓ Đã Ký số PKI thành công Biên bản ${recordId}! Kết quả nghiệm thu đã ban hành.`, 'success');
        setTimeout(() => location.reload(), 1200);
      }
    },

    submitBallot: function(recordId, scoreData) {
      const state = loadState();
      const rec = state.records.find(r => r.id === recordId);
      if (rec) {
        rec.ballotStatus = 'completed';
        rec.scoreBallotsSubmitted += 1;
        saveState(state);
        this.showToast(`✓ Đã nộp Phiếu chấm điểm BM07 cho ${recordId}!`, 'success');
        setTimeout(() => location.href = '01-viec-can-lam.html', 1200);
      }
    },

    resetDemoState: function() {
      saveState(DEFAULT_STATE);
      this.showToast('↺ Đã khôi phục dữ liệu demo Chủ tịch Hội đồng thành công!', 'warning');
      setTimeout(() => location.reload(), 800);
    }
  };

  // Inject Floating Reset Button
  document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.reset-demo-btn')) {
      const btn = document.createElement('button');
      btn.className = 'reset-demo-btn';
      btn.type = 'button';
      btn.title = 'Khôi phục Dữ liệu Demo Chủ tịch HĐ';
      btn.innerHTML = '↺';
      btn.onclick = () => window.NCKH_CHAIRMAN.resetDemoState();
      document.body.appendChild(btn);
    }

    // Bell Popover Toggle
    const bell = document.querySelector('.bell');
    const popover = document.getElementById('notification-popover');
    if (bell && popover) {
      bell.addEventListener('click', (e) => {
        e.stopPropagation();
        const expanded = bell.getAttribute('aria-expanded') === 'true';
        bell.setAttribute('aria-expanded', !expanded);
        popover.hidden = expanded;
      });
      document.addEventListener('click', () => {
        bell.setAttribute('aria-expanded', 'false');
        popover.hidden = true;
      });
    }

    // Filter toolbar listener
    const searchInput = document.querySelector('[data-search]');
    const filterSelect = document.querySelector('[data-filter]');
    if (searchInput || filterSelect) {
      const handleFilter = () => {
        const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
        const filterVal = filterSelect ? filterSelect.value : 'all';
        const rows = document.querySelectorAll('[data-record]');
        let visible = 0;
        rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          const state = row.getAttribute('data-state') || 'open';
          const matchQuery = !query || text.includes(query);
          const matchFilter = filterVal === 'all' || state === filterVal;
          if (matchQuery && matchFilter) {
            row.style.display = '';
            visible++;
          } else {
            row.style.display = 'none';
          }
        });
        const visibleBadge = document.querySelector('[data-visible-count]');
        if (visibleBadge) visibleBadge.textContent = `${visible} kết quả hiển thị`;
      };

      if (searchInput) searchInput.addEventListener('input', handleFilter);
      if (filterSelect) filterSelect.addEventListener('change', handleFilter);
    }
  });
})();
