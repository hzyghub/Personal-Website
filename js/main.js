(function() {
  'use strict';

  // Language toggle with persistence
  var langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    var saved = localStorage.getItem('hzy-lang');
    if (saved) document.body.className = 'lang-' + saved;

    langToggle.addEventListener('click', function() {
      var current = document.body.classList.contains('lang-zh') ? 'zh' : 'en';
      var next = current === 'zh' ? 'en' : 'zh';
      document.body.className = 'lang-' + next;
      localStorage.setItem('hzy-lang', next);
    });
  }

  // Navbar scroll
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 0);
  }, { passive: true });

  // Hamburger with aria-expanded
  var hamburger = document.querySelector('.navbar__hamburger');
  var navLinks = document.querySelector('.navbar__links');
  if (hamburger) {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.addEventListener('click', function() {
      var isOpen = this.classList.toggle('open');
      navLinks.classList.toggle('open');
      this.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll spy
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

  // Scroll reveal
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
