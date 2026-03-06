/* ============================================
   DEEPAK BRUSH INDUSTRIES - Storytelling JS
   Interactive, scroll-driven narrative engine
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initScrollProgress();
  initNavbar();
  initMobileMenu();
  initChapterNav();
  initScrollReveals();
  initWordReveal();
  initCounters();
  initParticles();
  initDragScroll();
  initParallaxLayers();
  initContactForm();
  initSmoothScroll();
  initTextReveal();
  initTiltCards();
});

/* ===== Custom Cursor ===== */
function initCustomCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animate() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    dot.style.left = mx - 4 + 'px';
    dot.style.top = my - 4 + 'px';
    ring.style.left = rx - 20 + 'px';
    ring.style.top = ry - 20 + 'px';
    requestAnimationFrame(animate);
  }
  animate();

  // Hover effect on interactive elements
  const interactives = 'a, button, .product-card, .why-card, .industry-card, .testimonial-card, input, textarea, select';
  document.querySelectorAll(interactives).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
}

/* ===== Scroll Progress Bar ===== */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / docHeight) * 100;
    bar.style.width = progress + '%';
  }, { passive: true });
}

/* ===== Navbar ===== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });
}

/* ===== Mobile Menu ===== */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ===== Chapter Navigation (Side Dots) ===== */
function initChapterNav() {
  const chapters = document.querySelectorAll('[data-chapter]');
  const navContainer = document.querySelector('.chapter-nav');
  if (!chapters.length || !navContainer) return;

  chapters.forEach((chapter, i) => {
    const dot = document.createElement('div');
    dot.className = 'chapter-dot' + (i === 0 ? ' active' : '');
    dot.innerHTML = `<div class="dot"></div><span class="label">${chapter.dataset.chapter}</span>`;
    dot.addEventListener('click', () => {
      chapter.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    navContainer.appendChild(dot);
  });

  const dots = navContainer.querySelectorAll('.chapter-dot');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(chapters).indexOf(entry.target);
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
      }
    });
  }, { threshold: 0.3 });

  chapters.forEach(ch => observer.observe(ch));
}

/* ===== Scroll Reveal Animations ===== */
function initScrollReveals() {
  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!elements.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ===== Word-by-Word Reveal for Hero Title ===== */
function initWordReveal() {
  const heroH1 = document.querySelector('.hero h1');
  if (!heroH1) return;

  const html = heroH1.innerHTML;
  // Process text nodes but preserve HTML tags
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  let wordIndex = 0;
  function processNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const words = node.textContent.split(/(\s+)/);
      const fragment = document.createDocumentFragment();
      words.forEach(word => {
        if (word.trim()) {
          const span = document.createElement('span');
          span.className = 'word';
          span.style.animationDelay = (0.5 + wordIndex * 0.08) + 's';
          span.textContent = word;
          fragment.appendChild(span);
          fragment.appendChild(document.createTextNode(' '));
          wordIndex++;
        }
      });
      node.parentNode.replaceChild(fragment, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Process child nodes in reverse to handle DOM mutations
      const children = Array.from(node.childNodes);
      children.forEach(child => processNode(child));
    }
  }

  const children = Array.from(heroH1.childNodes);
  children.forEach(child => processNode(child));
}

/* ===== Text Reveal (clip) ===== */
function initTextReveal() {
  const reveals = document.querySelectorAll('.text-reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  reveals.forEach(el => observer.observe(el));
}

/* ===== Animated Counters ===== */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animate = el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 2200;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(ease * target);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString() + suffix;
    }
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ===== Floating Particles ===== */
function initParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 2;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 12 + 8}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;
    container.appendChild(p);
  }
}

/* ===== Drag-to-Scroll for Product Track ===== */
function initDragScroll() {
  const track = document.querySelector('.product-scroll-track');
  if (!track) return;

  let isDown = false, startX, scrollLeft;

  track.addEventListener('mousedown', e => {
    isDown = true;
    track.style.cursor = 'grabbing';
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  track.addEventListener('mouseleave', () => { isDown = false; track.style.cursor = 'grab'; });
  track.addEventListener('mouseup', () => { isDown = false; track.style.cursor = 'grab'; });
  track.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    track.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });
}

/* ===== Parallax Layers ===== */
function initParallaxLayers() {
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (!parallaxEls.length) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        parallaxEls.forEach(el => {
          const speed = parseFloat(el.dataset.parallax) || 0.3;
          const rect = el.getBoundingClientRect();
          if (rect.bottom > 0 && rect.top < window.innerHeight) {
            el.style.transform = `translateY(${scrollY * speed}px)`;
          }
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ===== 3D Tilt Effect on Cards ===== */
function initTiltCards() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  document.querySelectorAll('.why-card, .testimonial-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `translateY(-8px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ===== Contact Form ===== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const required = ['name', 'email', 'message'];
    let valid = true;

    required.forEach(field => {
      const input = form.querySelector(`[name="${field}"]`);
      if (!data.get(field)?.trim()) {
        input.style.borderColor = '#EF4444';
        valid = false;
      } else {
        input.style.borderColor = '';
      }
    });

    const email = data.get('email');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      form.querySelector('[name="email"]').style.borderColor = '#EF4444';
      valid = false;
    }

    if (valid) {
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = '#10B981';
      btn.disabled = true;
      form.reset();
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
        btn.disabled = false;
      }, 3500);
    }
  });
}

/* ===== Smooth Scroll ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ===== Active nav link ===== */
(function() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();
