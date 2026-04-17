(function() {
  'use strict';

  // Language toggle
  var langBtns = document.querySelectorAll('.navbar__lang');
  langBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var lang = this.dataset.lang;
      document.body.className = 'lang-' + lang;
      langBtns.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  // Navbar scroll
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 0);
  }, { passive: true });

  // Hamburger
  var hamburger = document.querySelector('.navbar__hamburger');
  var navLinks = document.querySelector('.navbar__links');
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
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
