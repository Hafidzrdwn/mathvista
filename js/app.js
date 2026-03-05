const App = (() => {

  function initScrollHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initMobileNav() {
    const toggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    if (!toggle || !mobileNav) return;

    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  function initDropdowns() {
    document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
      const btn = dropdown.querySelector('.nav-dropdown-btn');
      if (!btn) return;

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen);

        document.querySelectorAll('.nav-dropdown').forEach(other => {
          if (other !== dropdown) {
            other.classList.remove('open');
            const ob = other.querySelector('.nav-dropdown-btn');
            if (ob) ob.setAttribute('aria-expanded', 'false');
          }
        });
      });
    });

    document.addEventListener('click', () => {
      document.querySelectorAll('.nav-dropdown.open').forEach(d => {
        d.classList.remove('open');
        const btn = d.querySelector('.nav-dropdown-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
      const question = item.querySelector('.faq-question');
      if (!question) return;

      question.addEventListener('click', () => {
        const isOpen = item.classList.toggle('open');
        question.setAttribute('aria-expanded', isOpen);
      });
    });
  }

  function initTabs() {
    document.querySelectorAll('.tabs').forEach(tabGroup => {
      const buttons = tabGroup.querySelectorAll('.tab-btn');
      const contents = document.querySelectorAll('.tab-content');

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const targetId = btn.dataset.tab;

          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          contents.forEach(c => {
            c.classList.toggle('active', c.id === targetId);
          });
        });
      });
    });
  }

  function initActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-link, .mobile-nav-links a').forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkPage = href.split('/').pop();
      if (linkPage === currentPath) {
        link.classList.add('active');
      }
    });
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied to clipboard!', 'success');
    }).catch(() => {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      showToast('Copied!', 'success');
    });
  }

  let toastTimer;

  function showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.style.cssText = `
        position: fixed; bottom: 24px; right: 24px; z-index: 9999;
        display: flex; flex-direction: column; gap: 8px;
      `;
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const colors = {
      success: '#10b981',
      error:   '#ef4444',
      info:    '#3b82f6',
      warning: '#f59e0b',
    };

    toast.style.cssText = `
      background: #1e293b;
      border: 1px solid ${colors[type] || colors.info};
      border-left: 3px solid ${colors[type] || colors.info};
      color: #f1f5f9;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-family: 'Inter', sans-serif;
      box-shadow: 0 8px 24px rgba(0,0,0,0.4);
      animation: fadeIn 0.2s ease;
      max-width: 300px;
    `;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  function showInputError(inputEl, message) {
    clearInputError(inputEl);
    inputEl.style.borderColor = 'var(--color-error)';
    const errEl = document.createElement('span');
    errEl.className = 'input-error-msg';
    errEl.style.cssText = 'color: var(--color-error); font-size: 12px; margin-top: 4px; display: block;';
    errEl.textContent = message;
    inputEl.parentNode.insertBefore(errEl, inputEl.nextSibling);
  }

  function clearInputError(inputEl) {
    inputEl.style.borderColor = '';
    const prev = inputEl.parentNode.querySelector('.input-error-msg');
    if (prev) prev.remove();
  }

  function showResult(containerId, html) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = html;
    el.style.display = 'block';
    el.classList.add('animate-fade-in-scale');
    setTimeout(() => el.classList.remove('animate-fade-in-scale'), 400);
  }

  function hideResult(containerId) {
    const el = document.getElementById(containerId);
    if (el) el.style.display = 'none';
  }

  function initExampleCards() {
    document.querySelectorAll('.example-card[data-expr]').forEach(card => {
      card.addEventListener('click', () => {
        const expr = card.dataset.expr;
        const targetId = card.dataset.target || 'exprInput';
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.value = expr;
          targetEl.dispatchEvent(new Event('input'));
          targetEl.focus();

          if (card.dataset.lowerBound) {
            const lb = document.getElementById('lowerBound');
            if (lb) lb.value = card.dataset.lowerBound;
          }
          if (card.dataset.upperBound) {
            const ub = document.getElementById('upperBound');
            if (ub) ub.value = card.dataset.upperBound;
          }
        }
      });
    });
  }

  function initEnterKeySubmit(inputIds, submitBtnId) {
    const submitBtn = document.getElementById(submitBtnId);
    if (!submitBtn) return;

    inputIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submitBtn.click();
          }
        });
      }
    });
  }

  function initGraphResize() {
    if (window.GraphEngine) {
      GraphEngine.initResizeHandler();
    }
  }

  function init() {
    initScrollHeader();
    initMobileNav();
    initDropdowns();
    initFAQ();
    initTabs();
    initActiveNav();
    initExampleCards();
    initGraphResize();
  }

  return {
    init,
    showToast,
    showResult,
    hideResult,
    showInputError,
    clearInputError,
    copyToClipboard,
    initEnterKeySubmit,
  };

})();

document.addEventListener('DOMContentLoaded', () => App.init());

window.App = App;
