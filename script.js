document.addEventListener('DOMContentLoaded', () => {

  /* ---------- YEAR ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- LOADER: "ANTIVODE" reveal ---------- */
  const loader = document.getElementById('loader');
  const chars = gsap.utils.toArray('#loaderWord .char i');
  const line = document.querySelector('.loader__line');
  const rings = gsap.utils.toArray('.loader__ring');

  const introTl = gsap.timeline();
  introTl
    .set(rings, { scale: 0.6, opacity: 0 })
    .to(rings, {
      scale: 1.5, opacity: 0.55, duration: 1.4, ease: 'power2.out', stagger: 0.25
    }, 0)
    .to(rings, {
      opacity: 0, duration: 0.8, ease: 'power1.in'
    }, 1.1)
    .to(chars, {
      yPercent: 0, duration: 0.95, ease: 'power4.out',
      stagger: { each: 0.07, from: 'start' }
    }, 0.15)
    .to(chars, {
      backgroundPosition: '100% 0%', duration: 1.3, ease: 'power1.inOut',
      stagger: { each: 0.04, from: 'start' }
    }, 0.25)
    .to(line, { width: '120px', duration: 0.5, ease: 'power3.out' }, '-=0.5')
    .to({}, { duration: 0.5 }) // hold
    .to(chars, {
      yPercent: -120, duration: 0.55, ease: 'power3.in', stagger: 0.035
    })
    .to(line, { width: 0, duration: 0.35, ease: 'power2.in' }, '<')
    .to(loader, {
      opacity: 0, duration: 0.7, ease: 'power2.out',
      onComplete: () => { loader.style.display = 'none'; playHero(); }
    }, '-=0.1');

  /* ---------- NAV SCROLL STATE ---------- */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ---------- BACK TO TOP ---------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- HERO ENTRANCE ---------- */
  function playHero() {
    gsap.to('[data-reveal]', {
      opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out'
    });
  }

  /* ---------- SCROLLTRIGGER REVEALS ---------- */
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.section-eyebrow, .section-title, .profil__text').forEach((el) => {
    gsap.from(el, {
      opacity: 0, y: 24, duration: 0.8,
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  gsap.utils.toArray('.ledger__row').forEach((row, i) => {
    gsap.from(row, {
      opacity: 0, y: 20, duration: 0.6, delay: (i % 5) * 0.05,
      scrollTrigger: { trigger: row, start: 'top 90%' }
    });
  });

  gsap.utils.toArray('.house').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0, y: 30, duration: 0.7, delay: (i % 2) * 0.08,
      scrollTrigger: { trigger: card, start: 'top 90%' }
    });
  });

  gsap.utils.toArray('.social-row, .channel-row').forEach((row, i) => {
    gsap.from(row, {
      opacity: 0, y: 16, duration: 0.6, delay: (i % 4) * 0.05,
      scrollTrigger: { trigger: row, start: 'top 92%' }
    });
  });

  /* ---------- COUNTERS ---------- */
  document.querySelectorAll('.stat').forEach((stat) => {
    const target = parseInt(stat.dataset.count, 10);
    const numEl = stat.querySelector('.stat__num');
    ScrollTrigger.create({
      trigger: stat, start: 'top 90%', once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target, duration: 1.4, ease: 'power2.out',
          onUpdate: function () { numEl.textContent = Math.floor(this.targets()[0].val); }
        });
      }
    });
  });

  /* ---------- MOBILE NAV ---------- */
  const burger = document.getElementById('burger');
  const links = document.querySelector('.nav__links');
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    burger.classList.toggle('is-active', open);
    links.style.display = open ? 'flex' : 'none';
    if (open) {
      links.style.position = 'fixed';
      links.style.top = '70px';
      links.style.left = '0';
      links.style.right = '0';
      links.style.flexDirection = 'column';
      links.style.background = 'rgba(243,239,230,0.98)';
      links.style.padding = '24px 5vw';
      links.style.gap = '20px';
    }
  });
  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      links.style.display = '';
      links.classList.remove('is-open');
    });
  });

});