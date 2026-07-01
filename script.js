document.addEventListener('DOMContentLoaded', () => {
  
  /* --- Theme Toggle Logic --- */
  const themeToggle = document.querySelector('#theme-toggle');
  const root = document.documentElement;
  
  // Retrieve saved preference or default to system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
  } else {
    root.setAttribute('data-theme', 'dark');
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Keep theme updated if system preference changes and user hasn't explicitly chosen
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });


  /* --- Scroll Reveal Animation --- */
  const revealEls = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target); // Animate once
      }
    });
  }, { 
    threshold: 0.08,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is in viewport
  });

  revealEls.forEach(el => revealObserver.observe(el));


  /* --- Smooth Scroll & Active Nav States --- */
  const navLinks = document.querySelectorAll('.nav-links a, .nav-logo');
  const sections = document.querySelectorAll('section[id], header[id]');

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#top') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Track active section for nav highlight
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -70% 0px' // Matches middle viewport focus
  });

  sections.forEach(section => navObserver.observe(section));
});
