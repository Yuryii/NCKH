/**
 * NCKH Council Secretary Interactive State Engine (Thư ký Hội đồng)
 * Handles ballot monitoring, drafting BM08 meeting minutes, and 1st PKI Digital Signature.
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
        scoreBallotsSubmitted: 5,
        totalBallotsNeeded: 5,
        avgScore: 88.5,
        conclusion: 'Đạt - Xuất sắc',
        status: 'open',
        secretarySigned: true,
        secretarySignedAt: '2026-07-25 15:30',
        chairmanSigned: false
      },
      {
        id: 'HDNT-2026-007',
        topicId: 'NCKH-GV-2026-022',
        title: 'Thử nghiệm hệ thống cảm biến IoT trong giám sát chất lượng không khí khuôn viên Đại học DNTU',
        author: 'ThS. Nguyễn Thị Mai',
        dept: 'Khoa Điện - Điện tử',
        scoreBallotsSubmitted: 4,
        totalBallotsNeeded: 5,
        avgScore: 91.2,
        conclusion: 'Chưa đủ 5/5 phiếu',
        status: 'open',
        secretarySigned: false,
        secretarySignedAt: null,
        chairmanSigned: false
      }
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

  window.NCKH_SECRETARY = {
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

    signSecretaryPKI: function(recordId, minutesData) {
      const state = loadState();
      const rec = state.records.find(r => r.id === recordId);
      if (rec) {
        rec.secretarySigned = true;
        rec.secretarySignedAt = new Date().toLocaleString('vi-VN');
        rec.conclusion = minutesData.conclusion || 'Đạt - Khá';
        saveState(state);
        this.showToast(`✓ Đã lập & Ký số 1st Biên bản BM08 cho ${recordId}! Đã chuyển đến Chủ tịch Hội đồng ký duyệt thứ hai.`, 'success');
        setTimeout(() => location.href = '01-viec-can-lam.html', 1200);
      }
    },

    resetDemoState: function() {
      saveState(DEFAULT_STATE);
      this.showToast('↺ Đã khôi phục dữ liệu demo Thư ký Hội đồng thành công!', 'warning');
      setTimeout(() => location.reload(), 800);
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.reset-demo-btn')) {
      const btn = document.createElement('button');
      btn.className = 'reset-demo-btn';
      btn.type = 'button';
      btn.title = 'Khôi phục Dữ liệu Demo Thư ký HĐ';
      btn.innerHTML = '↺';
      btn.onclick = () => window.NCKH_SECRETARY.resetDemoState();
      document.body.appendChild(btn);
    }

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
  });
})();
