(function() {
  'use strict';

  // ── Helpers ──────────────────────────────────────────────────────────
  // Safe localStorage wrapper — Safari private mode / iframe sandboxes
  // can throw SecurityError or QuotaExceededError.
  var storage = {
    get: function(key) {
      try { return localStorage.getItem(key); }
      catch (e) { return null; }
    },
    set: function(key, value) {
      try { localStorage.setItem(key, value); }
      catch (e) { /* silently ignore */ }
    }
  };

  // ── Language toggle with persistence ─────────────────────────────────
  var LANG_KEY = 'hzy-lang';
  var LANG_MAP = { 'zh': 'zh-CN', 'en': 'en' };

  function applyLang(lang) {
    // Use classList so we never wipe unrelated body classes (M2)
    document.body.classList.remove('lang-zh', 'lang-en');
    document.body.classList.add('lang-' + lang);
    // Update <html lang> for screen readers (M6+M10)
    document.documentElement.lang = LANG_MAP[lang] || lang;
  }

  var langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    var saved = storage.get(LANG_KEY);
    if (saved === 'zh' || saved === 'en') {
      applyLang(saved);
    }

    langToggle.addEventListener('click', function() {
      var current = document.body.classList.contains('lang-zh') ? 'zh' : 'en';
      var next = current === 'zh' ? 'en' : 'zh';
      applyLang(next);
      storage.set(LANG_KEY, next);
    });
  }

  // ── Navbar scroll shadow ─────────────────────────────────────────────
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 0);
  }, { passive: true });

  // ── Hamburger menu ───────────────────────────────────────────────────
  var hamburger = document.querySelector('.navbar__hamburger');
  var navLinks = document.querySelector('.navbar__links');

  function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger) {
    hamburger.setAttribute('aria-expanded', 'false');

    hamburger.addEventListener('click', function() {
      var isOpen = this.classList.toggle('open');
      navLinks.classList.toggle('open');
      this.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });

    // Close menu on click outside (L4)
    document.addEventListener('click', function(e) {
      if (!navLinks.classList.contains('open')) return;
      var target = e.target;
      if (!navLinks.contains(target) && !hamburger.contains(target)) {
        closeMenu();
      }
    });
  }

  // ── Scroll spy ───────────────────────────────────────────────────────
  var sections = document.querySelectorAll('section[id]');
  var navItems = document.querySelectorAll('.navbar__link');
  window.addEventListener('scroll', function() {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function(section) {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        var id = section.getAttribute('id');
        navItems.forEach(function(item) {
          item.classList.toggle('active', item.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { passive: true });

  // ── Back to top button ────────────────────────────────────────────────
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      backToTop.classList.toggle('visible', window.scrollY > window.innerHeight * 0.6);
    }, { passive: true });
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Scroll reveal ────────────────────────────────────────────────────
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var siblings = entry.target.parentElement.querySelectorAll('.reveal');
          var index = Array.prototype.indexOf.call(siblings, entry.target);
          var delay = index * 100;
          setTimeout(function() {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '-20px' });
    reveals.forEach(function(el) { observer.observe(el); });
  } else {
    reveals.forEach(function(el) { el.classList.add('visible'); });
  }
})();
