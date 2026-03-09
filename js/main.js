/* ============================================
   DEEPAK BRUSH INDUSTRIES - Storytelling JS
   Interactive, scroll-driven narrative engine
   ============================================ */

let lenis;

document.addEventListener('DOMContentLoaded', () => {
  try {
    initLenis();
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
    initBackToTop();
    initProductDetails();
    
    // Log successful initialization
    console.log('%c DBI Web Engine v2.0 Initialized ', 'background: #0B3D91; color: #fff; font-weight: bold;');
  } catch (error) {
    console.error('DBI Initialization Error:', error);
  }
});

/* ===== Lenis Smooth Scroll ===== */
function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Global mouse position for CSS depth effects
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.body.style.setProperty('--mouse-x', x + '%');
    document.body.style.setProperty('--mouse-y', y + '%');
  });

  initMagnetic();
}

function initMagnetic() {
  const magnets = document.querySelectorAll('.nav-logo, .nav-links a, .nav-cta, .btn');
  if (window.matchMedia('(pointer: coarse)').matches) return;

  magnets.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

const productData = {
  circular: {
    title: "Circular Wire Brush",
    label: "Heavy-Duty Series",
    description: "High-performance circular wire brushes engineered for aggressive cleaning. Perfect for removing heavy rust, weld scale, and surface contaminants in high-speed industrial environments.",
    icon: "fa-circle-notch",
    color: "#0d0d20",
    specs: [
      { l: "Diameter", v: "2\" to 12\" (Customizable)" },
      { l: "Wire Type", v: "High-Tensile Carbon Steel / SS" },
      { l: "Mounting", v: "Bore Hole or Threaded Nut" },
      { l: "Max RPM", v: "Update to 15,000 depending on size" },
      { l: "Material", v: "Heat-tempered steel wire" }
    ],
    apps: [
      { i: "fa-tools", h: "Weld Cleaning", p: "Removing spatter and slag from heavy weld seams." },
      { i: "fa-shield-virus", h: "Rust Removal", p: "Aggressive clearing of oxidized layers on metal plates." },
      { i: "fa-layer-group", h: "Deburring", p: "Removing sharp edges from machined components." }
    ],
    image: "assets/images/products/circular-brush.png"
  },
  giwire: {
    title: "Galvanised Iron Wire Brush",
    label: "Corrosion Resistant Series",
    description: "Durable and cost-effective brushes designed for general-purpose industrial cleaning. The galvanised coating provides enhanced protection against rust, making them ideal for outdoor and high-moisture environments.",
    icon: "fa-cog",
    color: "linear-gradient(135deg, #1a1a2e, #16213e)",
    specs: [
      { l: "Coating", v: "Zinc-galvanised Iron Wire" },
      { l: "Bristle Softness", v: "Medium to Stiff" },
      { l: "Handle Type", v: "Ergonomic Wood or Plastic" },
      { l: "Corrosion Res.", v: "High (Salt-Spray Tested)" }
    ],
    apps: [
      { i: "fa-faucet", h: "Pipe Cleaning", p: "Clearing internal and external oxidation from plumbing." },
      { i: "fa-paint-roller", h: "Paint Stripping", p: "Preparing surfaces for new industrial coatings." },
      { i: "fa-hard-hat", h: "Maintenance", p: "General tool and machinery upkeep in workshops." }
    ]
  },
  sswire: {
    title: "SS Wire Brush",
    label: "Food & Pharma Series",
    description: "Non-contaminating stainless steel brushes designed for specialized sectors where purity is paramount. Ideal for use on stainless steel workpieces to prevent cross-contamination and 'after-rust'.",
    icon: "fa-circle-notch",
    color: "linear-gradient(135deg, #4A4A4A, #6B7280)",
    specs: [
      { l: "Material", v: "SS 304 / 316 Grade" },
      { l: "Application", v: "Non-contaminating Finish" },
      { l: "Resistance", v: "Acid & Corrosion Proof" },
      { l: "Temp Limit", v: "Up to 400°C" }
    ],
    apps: [
      { i: "fa-utensils", h: "Food Industry", p: "Safe for cleaning food processing equipment." },
      { i: "fa-capsules", h: "Pharma", p: "Hygienic maintenance of medicine manufacturing lines." },
      { i: "fa-vial", h: "Chemical Lab", p: "Cleaning glassware and reactors without scratching." }
    ]
  },
  brass: {
    title: "Brass Wire Brush",
    label: "Precision Polishing Series",
    description: "Soft brass wire brushes engineered for delicate surface finishing. Known for being non-sparking, these are perfect for hazardous environments and for polishing metals without scratching the base material.",
    icon: "fa-brush",
    color: "linear-gradient(135deg, #B8860B, #DAA520)",
    specs: [
      { l: "Wire Type", v: "Premium Yellow Brass" },
      { l: "Hardness", v: "Soft & Non-Abrasive" },
      { l: "Safety", v: "Non-Sparking (ATEX Safe)" },
      { l: "Finish", v: "High-Glow Polishing" }
    ],
    apps: [
      { i: "fa-bolt", h: "Electrical", p: "Cleaning contacts and terminals safely." },
      { i: "fa-gem", h: "Jewellery", p: "Soft buffing of precious metal components." },
      { i: "fa-fire-extinguisher", h: "Gas Industry", p: "Maintenance in explosive gas environments." }
    ]
  },
  brasscup: {
    title: "Brass Wire Brush Cup",
    label: "Power Tool Range",
    description: "Optimized for angle grinders, our brass cup brushes provide maximum surface contact. Perfect for cleaning large flat surfaces and complex contours rapidly while ensuring a non-scratch finish.",
    icon: "fa-mug-hot",
    color: "linear-gradient(135deg, #CC5500, #FF6A00)",
    specs: [
      { l: "Mounting", v: "M10 / M14 Threaded Nut" },
      { l: "Shape", v: "Professional Cup Configuration" },
      { l: "Compatibility", v: "All Standard Angle Grinders" },
      { l: "Wire Form", v: "Crimped for Flexibility" }
    ],
    apps: [
      { i: "fa-car", h: "Automotive", p: "Cleaning engine heads and aluminum parts." },
      { i: "fa-square", h: "Sheet Metal", p: "Cleaning flat plates before welding." },
      { i: "fa-chair", h: "Antique Restore", p: "Bringing back the glow to metal furniture." }
    ]
  },
  bottle: {
    title: "Bottle Cleaning Brush",
    label: "Hygienic Specialty",
    description: "Bespoke internal cleaning brushes for the F&B and Lab sectors. Featuring food-safe bristles and twisted SS shafts, these are designed to reach the deepest corners of narrow-neck vessels.",
    icon: "fa-wine-bottle",
    color: "linear-gradient(135deg, #1B5E20, #388E3C)",
    specs: [
      { l: "Bristle", v: "Food-Grade Nylon / Animal Hair" },
      { l: "Shaft", v: "SS 316 Twisted Wire" },
      { l: "Length", v: "Up to 1200mm (Custom)" },
      { l: "Tip", v: "Rounded Safety Tip" }
    ],
    apps: [
      { i: "fa-vial", h: "Lab Glass", p: "Precision cleaning of test tubes and flasks." },
      { i: "fa-wine-glass", h: "Beverage", p: "Bottle sanitation in brewing and dairy." },
      { i: "fa-microscope", h: "Healthcare", p: "Cleaning surgical tubes and catheters." }
    ]
  }
};

function initProductDetails() {
  const overlay = document.getElementById('productOverlay');
  const content = document.getElementById('overlayContent');
  const close = document.getElementById('closeOverlay');
  const btns = document.querySelectorAll('.view-details-btn');

  if (!overlay || !content || !btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.product;
      const data = productData[id];
      if (data) {
        // Robust image fallback from DOM if JS data is missing it
        if (!data.image) {
          const card = btn.closest('.product-detail-card, .product-card');
          const img = card ? card.querySelector('img') : null;
          if (img) data.image = img.getAttribute('src');
        }
        renderProduct(data, overlay, content);
      } else {
        console.warn(`Product data missing for: ${id}`);
        // Fallback: Just show contact CTA or generic info if needed
      }
    });
  });

  close.addEventListener('click', () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  });

  // Close on backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }
  });

  // Close on ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }
  });
}

function renderProduct(data, overlay, container) {
  // Ensure we clear content first
  container.innerHTML = `
    <div class="detail-hero-grid">
      <div class="content-side">
        <span class="section-label">${data.label}</span>
        <h1 style="color: #fff; font-size: 3.5rem; margin-bottom: 1.5rem;">${data.title}</h1>
        <p style="color: rgba(255,255,255,0.5); font-size: 1.1rem; line-height: 1.8; margin-bottom: 2rem;">${data.description}</p>
        <div style="display: flex; gap: 1rem;">
          <a href="contact.html" class="btn btn-primary"><i class="fas fa-file-invoice"></i> Get Technical Quote</a>
          <a href="tel:+919810193074" class="btn btn-outline-white"><i class="fas fa-phone"></i> Expert Advice</a>
        </div>
      </div>
      <div class="detail-visual" style="background: ${data.color}">
        ${data.image ? 
          `<img src="${data.image}" alt="${data.title}" style="max-width: 90%; max-height: 90%; object-fit: contain; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); animation: fadeScale 0.8s ease-out;">` : 
          `<i class="fas ${data.icon}"></i>`
        }
      </div>
    </div>

    <div class="grid grid-2" style="gap: 4rem;">
      <div class="specs-section">
        <h2 style="color: #fff; margin-bottom: 2rem;">Technical Specifications</h2>
        <div class="specs-table">
          ${data.specs.map(s => `
            <div class="specs-row">
              <div class="specs-label">${s.l}</div>
              <div class="specs-value">${s.v}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="apps-section">
        <h2 style="color: #fff; margin-bottom: 2rem;">Performance Highlights</h2>
        <div class="grid grid-2" style="gap: 1.2rem;">
          ${data.apps.map(app => `
            <div class="detail-app-card">
              <i class="fas ${app.i}"></i>
              <h4>${app.h}</h4>
              <p>${app.p}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (lenis) lenis.stop();
}

/* ===== Back to Top Button ===== */
function initBackToTop() {
  const btn = document.createElement('div');
  btn.className = 'back-to-top';
  btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    if (typeof lenis !== 'undefined') {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

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

/* ===== Dedicated Button Scroll for Product Track ===== */
function initDragScroll() {
  const track = document.querySelector('.product-scroll-track');
  const prevBtn = document.getElementById('productPrev');
  const nextBtn = document.getElementById('productNext');
  if (!track || !prevBtn || !nextBtn) return;

  // Manual scroll using buttons only
  const cardWidth = 360 + 32; // card + gap
  
  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  });
  
  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: cardWidth, behavior: 'smooth' });
  });

  // Hide horizontal scroll interaction but keep programmatic scroll functional
  track.style.overflowX = 'hidden';
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
    const honeypot = data.get('website_hp');

    // Security: Honeypot check for bots
    if (honeypot) {
      console.warn('Spam detected via honeypot');
      return; 
    }

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
/* ===== Smooth Scroll (Synced with Lenis) ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#' || !href) return;
      e.preventDefault();
      
      const target = document.querySelector(href);
      if (target) {
        if (lenis) {
          lenis.scrollTo(target, {
            offset: -80,
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        } else {
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/* ===== Category Nav Scroll Spy ===== */
function initCategorySpy() {
  const catNav = document.querySelector('.category-nav');
  const catLinks = document.querySelectorAll('.cat-link');
  if (!catNav || !catLinks.length) return;

  const sections = document.querySelectorAll('.inner-section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop;
      if (window.scrollY >= top - 200) {
        current = section.getAttribute('id');
      }
    });

    catLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    // Make it sticky with offset handled by CSS (top: 80px)
  }, { passive: true });
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
  initCategorySpy();
})();
