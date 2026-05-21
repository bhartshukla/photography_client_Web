/* =============================================
   LUMIÈRE — Photography Portfolio
   script.js  |  Full Production JavaScript
============================================= */

'use strict';

/* =============================================
   GSAP SETUP
============================================= */
gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create('lumiere', '0.16, 1, 0.3, 1');

/* =============================================
   CUSTOM CURSOR
============================================= */
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let rafId;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.13;
    followerY += (mouseY - followerY) * 0.13;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    rafId = requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover states
  const hoverTargets = 'a, button, .filter-btn, .testi-btn, .testi-dot, .port-card, .service-card, .marquee-item, .back-top, .social-icon, .map-block';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      cursor.classList.add('hovering');
      follower.classList.add('hovering');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      cursor.classList.remove('hovering');
      follower.classList.remove('hovering');
    }
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.classList.add('hidden');
    follower.classList.add('hidden');
  });
  document.addEventListener('mouseenter', () => {
    cursor.classList.remove('hidden');
    follower.classList.remove('hidden');
  });
})();

/* =============================================
   SCROLL PROGRESS BAR
============================================= */
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const docH   = document.documentElement.scrollHeight - window.innerHeight;
    const pct    = docH > 0 ? (window.scrollY / docH) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
})();

/* =============================================
   NAVBAR — SCROLL & ACTIVE LINK
============================================= */
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  if (!navbar) return;

  // Scroll state
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });

      // Close mobile menu if open
      const mobileMenu = document.getElementById('mobileMenu');
      const hamburger  = document.getElementById('hamburger');
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger && hamburger.classList.remove('open');
      }
    });
  });
})();

/* =============================================
   HAMBURGER / MOBILE MENU
============================================= */
(function initHamburger() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
})();

/* =============================================
   HERO ENTRANCE ANIMATION
============================================= */
(function initHeroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'lumiere' } });

  tl.to('.hero-eyebrow', {
      opacity: 1, y: 0, duration: 1, delay: 0.3
    })
    .to('.title-line', {
      opacity: 1, y: 0, duration: 1, stagger: 0.15
    }, '-=0.6')
    .to('.hero-sub', {
      opacity: 1, y: 0, duration: 0.9
    }, '-=0.5')
    .to('.hero-btns', {
      opacity: 1, y: 0, duration: 0.9
    }, '-=0.6')
    .to('.hero-strip', {
      opacity: 1, y: 0, duration: 0.9
    }, '-=0.5');

  // Parallax hero image on scroll
  const heroImg = document.getElementById('heroImg');
  if (heroImg) {
    ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        gsap.set(heroImg, { y: self.progress * 80, ease: 'none' });
      }
    });
  }
})();

/* =============================================
   PARTICLES
============================================= */
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 22;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: ${Math.random() * 40}%;
      animation-duration: ${6 + Math.random() * 10}s;
      animation-delay: ${Math.random() * 8}s;
      width: ${1 + Math.random() * 2.5}px;
      height: ${1 + Math.random() * 2.5}px;
      opacity: 0;
    `;
    container.appendChild(p);
  }
})();

/* =============================================
   SCROLL REVEAL
============================================= */
(function initScrollReveal() {
  // Section tags, titles, subs
  const revealEls = document.querySelectorAll('.section-tag, .section-sub');
  revealEls.forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      onEnter: () => el.classList.add('visible'),
      once: true
    });
  });

  // Generic reveal classes
  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true
      },
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.9,
      ease: 'lumiere'
    });
  });
})();

/* =============================================
   PORTFOLIO FILTER & ANIMATION
============================================= */
(function initPortfolio() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.port-card');
  if (!filterBtns.length || !cards.length) return;

  // Initial reveal on scroll
  gsap.to('.port-card', {
    scrollTrigger: {
      trigger: '.portfolio-grid',
      start: 'top 82%',
      once: true
    },
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.85,
    stagger: 0.08,
    ease: 'lumiere'
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;

        if (match) {
          card.classList.remove('hidden');
          gsap.fromTo(card,
            { opacity: 0, y: 24, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'lumiere' }
          );
        } else {
          gsap.to(card, {
            opacity: 0, scale: 0.94, duration: 0.3, ease: 'power2.in',
            onComplete: () => card.classList.add('hidden')
          });
        }
      });
    });
  });
})();

/* =============================================
   ABOUT — SKILLS & COUNTER ANIMATION
============================================= */
(function initAbout() {
  // Skill bars
  const fills = document.querySelectorAll('.skill-fill');
  if (fills.length) {
    ScrollTrigger.create({
      trigger: '.skills-list',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        fills.forEach(fill => {
          gsap.to(fill, {
            width: fill.dataset.width + '%',
            duration: 1.5,
            ease: 'lumiere'
          });
        });
      }
    });
  }

  // About section reveal
  gsap.from('.about-img-wrap', {
    scrollTrigger: { trigger: '.about-grid', start: 'top 80%', once: true },
    opacity: 0, x: -60, duration: 1, ease: 'lumiere'
  });
  gsap.from('.about-content', {
    scrollTrigger: { trigger: '.about-grid', start: 'top 80%', once: true },
    opacity: 0, x: 60, duration: 1, ease: 'lumiere', delay: 0.15
  });

  // About stat counters (smaller ones)
  animateCounters('.stat-n', '.about-stats');
})();

/* =============================================
   COUNTER UTILITY
============================================= */
function animateCounters(selector, triggerSelector) {
  const els = document.querySelectorAll(selector);
  if (!els.length) return;

  ScrollTrigger.create({
    trigger: triggerSelector || els[0].closest('section'),
    start: 'top 80%',
    once: true,
    onEnter: () => {
      els.forEach(el => {
        const target = +el.dataset.count;
        let current = 0;
        const step  = target / 60;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current);
        }, 25);
      });
    }
  });
}

/* =============================================
   STATS SECTION COUNTERS
============================================= */
(function initStats() {
  animateCounters('.counter', '.stats');

  // Service cards stagger
  gsap.from('.service-card', {
    scrollTrigger: { trigger: '.services-grid', start: 'top 82%', once: true },
    opacity: 0, y: 45, scale: 0.96,
    stagger: 0.1, duration: 0.85, ease: 'lumiere'
  });
})();

/* =============================================
   TILT EFFECT ON SERVICE CARDS
============================================= */
(function initTilt() {
  const cards = document.querySelectorAll('[data-tilt]');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect    = card.getBoundingClientRect();
      const cx      = rect.left + rect.width  / 2;
      const cy      = rect.top  + rect.height / 2;
      const dx      = (e.clientX - cx) / (rect.width  / 2);
      const dy      = (e.clientY - cy) / (rect.height / 2);
      const rotateX = -dy * 6;
      const rotateY =  dx * 6;
      gsap.to(card, {
        rotateX, rotateY,
        transformPerspective: 800,
        duration: 0.4, ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0, rotateY: 0,
        duration: 0.6, ease: 'lumiere'
      });
    });
  });
})();

/* =============================================
   MAGNETIC BUTTONS
============================================= */
(function initMagneticButtons() {
  const btns = document.querySelectorAll('.magnetic-btn');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) * 0.28;
      const dy   = (e.clientY - cy) * 0.28;
      gsap.to(btn, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1, 0.5)' });
    });
  });
})();

/* =============================================
   TESTIMONIALS SLIDER
============================================= */
(function initTestimonials() {
  const track     = document.getElementById('testiTrack');
  const dotsWrap  = document.getElementById('testiDots');
  const prevBtn   = document.getElementById('testiPrev');
  const nextBtn   = document.getElementById('testiNext');
  if (!track) return;

  const cards      = track.querySelectorAll('.testi-card');
  const total      = cards.length;
  let   current    = 0;
  let   perView    = getPerView();
  let   maxIndex   = total - perView;
  let   autoTimer;

  function getPerView() {
    if (window.innerWidth <= 580)  return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  // Build dots
  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    const dotCount = Math.ceil(total / perView);
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('div');
      dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i * perView));
      dotsWrap.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsWrap) return;
    dotsWrap.querySelectorAll('.testi-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === Math.floor(current / perView));
    });
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, maxIndex));
    const pct = -(current * (100 / perView));
    gsap.to(track, {
      x: pct + '%',
      duration: 0.65, ease: 'lumiere'
    });
    updateDots();
  }

  function next() { goTo(current + perView); if (current >= maxIndex) goTo(0); }
  function prev() { goTo(current - perView); }

  prevBtn && prevBtn.addEventListener('click', prev);
  nextBtn && nextBtn.addEventListener('click', next);

  // Auto play
  function startAuto() {
    stopAuto();
    autoTimer = setInterval(next, 5000);
  }
  function stopAuto() { clearInterval(autoTimer); }

  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);

  // Drag/swipe
  let startX = 0, dragging = false;
  track.addEventListener('mousedown',  (e) => { startX = e.clientX; dragging = true; stopAuto(); });
  track.addEventListener('mousemove',  (e) => { if (!dragging) return; });
  track.addEventListener('mouseup',    (e) => {
    if (!dragging) return;
    dragging = false;
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    startAuto();
  });
  track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; stopAuto(); }, { passive: true });
  track.addEventListener('touchend',   (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    startAuto();
  }, { passive: true });

  // Resize
  window.addEventListener('resize', () => {
    const newPer = getPerView();
    if (newPer !== perView) {
      perView   = newPer;
      maxIndex  = total - perView;
      current   = 0;
      buildDots();
      goTo(0);
    }
  });

  buildDots();
  startAuto();

  // Reveal
  gsap.from('.testi-card', {
    scrollTrigger: { trigger: '.testimonials-wrapper', start: 'top 82%', once: true },
    opacity: 0, y: 40, stagger: 0.12, duration: 0.85, ease: 'lumiere'
  });
})();

/* =============================================
   CONTACT FORM
============================================= */
(function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn  = form.querySelector('.submit-btn');
    const span = btn.querySelector('span');
    const icon = btn.querySelector('i');

    // Loading state
    btn.disabled  = true;
    span.textContent = 'Sending…';
    icon && gsap.to(icon, { rotation: 360, duration: 0.8, ease: 'power2.inOut', repeat: -1 });

    // Simulate async send
    setTimeout(() => {
      btn.disabled = false;
      span.textContent = 'Send Message';
      icon && gsap.killTweensOf(icon);
      icon && gsap.set(icon, { rotation: 0 });

      form.reset();
      if (success) {
        success.classList.add('show');
        gsap.from(success, { opacity: 0, y: 10, duration: 0.5, ease: 'lumiere' });
        setTimeout(() => success.classList.remove('show'), 5000);
      }
    }, 1800);
  });

  // Floating label fix for select
  const selects = form.querySelectorAll('select');
  selects.forEach(sel => {
    sel.addEventListener('change', () => {
      sel.classList.toggle('has-value', sel.value !== '');
    });
  });
})();

/* =============================================
   SECTION ANIMATIONS — GSAP SCROLL
============================================= */
(function initSectionAnimations() {
  // Portfolio heading
  gsap.from('.portfolio .section-header', {
    scrollTrigger: { trigger: '.portfolio .section-header', start: 'top 85%', once: true },
    opacity: 0, y: 50, duration: 1, ease: 'lumiere'
  });

  // About heading
  gsap.from('.about .section-tag, .about .section-title', {
    scrollTrigger: { trigger: '.about-content', start: 'top 82%', once: true },
    opacity: 0, y: 35, stagger: 0.12, duration: 0.9, ease: 'lumiere'
  });

  // Stats blocks
  gsap.from('.stat-block', {
    scrollTrigger: { trigger: '.stats-grid', start: 'top 82%', once: true },
    opacity: 0, y: 50, scale: 0.95, stagger: 0.1, duration: 0.85, ease: 'lumiere'
  });

  // Contact grid
  gsap.from('.contact-info', {
    scrollTrigger: { trigger: '.contact-grid', start: 'top 82%', once: true },
    opacity: 0, x: -50, duration: 1, ease: 'lumiere'
  });
  gsap.from('.contact-form-wrap', {
    scrollTrigger: { trigger: '.contact-grid', start: 'top 82%', once: true },
    opacity: 0, x: 50, duration: 1, ease: 'lumiere', delay: 0.1
  });

  // Gallery heading
  gsap.from('.gallery-slider .section-header', {
    scrollTrigger: { trigger: '.gallery-slider .section-header', start: 'top 85%', once: true },
    opacity: 0, y: 40, duration: 0.9, ease: 'lumiere'
  });

  // Footer brand
  gsap.from('.footer-brand, .footer-col', {
    scrollTrigger: { trigger: '.footer-grid', start: 'top 90%', once: true },
    opacity: 0, y: 30, stagger: 0.1, duration: 0.8, ease: 'lumiere'
  });
})();

/* =============================================
   SOCIAL BAR VISIBILITY
============================================= */
(function initSocialBar() {
  const bar = document.getElementById('socialBar');
  if (!bar) return;

  ScrollTrigger.create({
    trigger: 'body',
    start: 'top top',
    onUpdate: (self) => {
      const progress = self.progress;
      // Hide near top and bottom
      const show = progress > 0.03 && progress < 0.92;
      gsap.to(bar, { opacity: show ? 1 : 0, duration: 0.5 });
    }
  });
})();

/* =============================================
   BACK TO TOP
============================================= */
(function initBackToTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* =============================================
   MARQUEE — PAUSE ON HOVER (ALREADY CSS, extra JS for speed control)
============================================= */
(function initMarquee() {
  const tracks = document.querySelectorAll('.marquee-track');
  tracks.forEach(track => {
    track.addEventListener('mouseenter', () => {
      gsap.to(track, { timeScale: 0, duration: 0.4, ease: 'power2.out', overwrite: true });
    });
    track.addEventListener('mouseleave', () => {
      gsap.to(track, { timeScale: 1, duration: 0.4, ease: 'power2.out', overwrite: true });
    });
  });
})();

/* =============================================
   LIGHTBOX — Port cards (click to zoom)
============================================= */
(function initLightbox() {
  const overlay = document.createElement('div');
  overlay.id = 'lightbox';
  overlay.style.cssText = `
    position:fixed; inset:0; z-index:9980; background:rgba(6,6,8,0); 
    display:none; align-items:center; justify-content:center; 
    cursor:zoom-out; backdrop-filter:blur(0px);
  `;

  const img = document.createElement('img');
  img.style.cssText = `
    max-width:88vw; max-height:88vh; border-radius:12px; 
    box-shadow:0 30px 100px rgba(0,0,0,0.7); object-fit:contain;
    transform:scale(0.88); opacity:0; transition:transform 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.4s;
    pointer-events:none;
  `;

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '<i class="ri-close-line"></i>';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.style.cssText = `
    position:fixed; top:1.8rem; right:2rem; z-index:9981;
    width:48px; height:48px; border-radius:50%; border:1px solid rgba(201,169,110,0.4);
    background:rgba(6,6,8,0.7); color:#c9a96e; font-size:1.4rem;
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; transition:transform 0.3s, background 0.3s;
    backdrop-filter:blur(10px); display:none;
  `;

  overlay.appendChild(img);
  document.body.appendChild(overlay);
  document.body.appendChild(closeBtn);

  function openLightbox(src, alt) {
    img.src = src.replace('w=800', 'w=1400');
    img.alt = alt || '';
    overlay.style.display = 'flex';
    closeBtn.style.display = 'flex';
    requestAnimationFrame(() => {
      gsap.to(overlay, { backgroundColor: 'rgba(6,6,8,0.93)', backdropFilter: 'blur(22px)', duration: 0.4 });
      gsap.to(img, { opacity: 1, scale: 1, duration: 0.5, ease: 'lumiere' });
    });
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    gsap.to(img, { opacity: 0, scale: 0.9, duration: 0.35, ease: 'power2.in' });
    gsap.to(overlay, {
      backgroundColor: 'rgba(6,6,8,0)', duration: 0.4, delay: 0.15,
      onComplete: () => {
        overlay.style.display = 'none';
        closeBtn.style.display = 'none';
        img.src = '';
        document.body.style.overflow = '';
      }
    });
  }

  document.querySelectorAll('.port-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.port-link')) return;
      const cardImg = card.querySelector('img');
      if (cardImg) openLightbox(cardImg.src, cardImg.alt);
    });
  });

  overlay.addEventListener('click', closeLightbox);
  closeBtn.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.style.display === 'flex') closeLightbox();
  });
})();

/* =============================================
   PAGE LOAD PERFORMANCE — LAZY IMAGE OBSERVER
============================================= */
(function initLazyLoad() {
  if (!('IntersectionObserver' in window)) return;

  const imgs = document.querySelectorAll('img[loading="lazy"]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          delete img.dataset.src;
        }
        gsap.fromTo(img,
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 0.7, ease: 'lumiere' }
        );
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px 0px' });

  imgs.forEach(img => observer.observe(img));
})();

/* =============================================
   NOISE TEXTURE — SUBTLE ANIMATION
============================================= */
(function initNoise() {
  const noise = document.querySelector('.noise-overlay');
  if (!noise) return;
  // Subtle shift for film grain feel
  gsap.to(noise, {
    backgroundPosition: '100% 100%',
    duration: 0.8,
    repeat: -1,
    ease: 'steps(4)',
    yoyo: true
  });
})();

/* =============================================
   WINDOW RESIZE — SCROLLTRIGGER REFRESH
============================================= */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});

/* =============================================
   INIT COMPLETE
============================================= */
console.log('%cLUMIÈRE — Ready.', 'font-family:serif;font-size:1.4rem;color:#c9a96e;font-style:italic;');