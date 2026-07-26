/**
 * NCKH Council Member Interactive State Engine (Thành viên Hội đồng)
 * Handles individual BM07 grading, document evaluation, and state sync.
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
        author: 'TS. Phạm Văn Bình',
        dept: 'Khoa Công nghệ Thông tin',
        ballotStatus: 'completed', // Đã nộp phiếu
        myScore: 89,
        submittedAt: '2026-07-25 14:20'
      },
      {
        id: 'HDNT-2026-007',
        topicId: 'NCKH-GV-2026-022',
        title: 'Thử nghiệm hệ thống cảm biến IoT trong giám sát chất lượng không khí khuôn viên Đại học DNTU',
        author: 'ThS. Nguyễn Thị Mai',
        dept: 'Khoa Điện - Điện tử',
        ballotStatus: 'open', // Chưa nộp phiếu
        myScore: null,
        submittedAt: null
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

  window.NCKH_MEMBER = {
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

    submitBallot: function(recordId, scores) {
      const state = loadState();
      const rec = state.records.find(r => r.id === recordId);
      if (rec) {
        rec.ballotStatus = 'completed';
        rec.myScore = (scores.c1 || 25) + (scores.c2 || 25) + (scores.c3 || 18) + (scores.c4 || 18);
        rec.submittedAt = new Date().toLocaleString('vi-VN');
        saveState(state);
        this.showToast(`✓ Đã nộp thành công Phiếu đánh giá BM07 cho Hội đồng ${recordId}! Tổng điểm: ${rec.myScore}/100.`, 'success');
        setTimeout(() => location.href = '01-viec-can-lam.html', 1200);
      }
    },

    resetDemoState: function() {
      saveState(DEFAULT_STATE);
      this.showToast('↺ Đã khôi phục dữ liệu demo Thành viên Hội đồng!', 'warning');
      setTimeout(() => location.reload(), 800);
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.reset-demo-btn')) {
      const btn = document.createElement('button');
      btn.className = 'reset-demo-btn';
      btn.type = 'button';
      btn.title = 'Khôi phục Dữ liệu Demo Thành viên HĐ';
      btn.innerHTML = '↺';
      btn.onclick = () => window.NCKH_MEMBER.resetDemoState();
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
