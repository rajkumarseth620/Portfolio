/* ==========================================================================
   VANILLA JAVASCRIPT PORTFOLIO INTERACTION ENGINE - RAJ KUMAR SETH
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     0. LIGHT / DARK THEME & ACCENT COLOR PALETTE TOGGLE LOGIC
     ========================================================================== */
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  const savedAccent = localStorage.getItem('accentTheme') || 'cyan';

  // Set initial Day/Night theme based on localStorage
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  // Set initial Accent Color Palette
  document.documentElement.setAttribute('data-accent', savedAccent);

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Accent Color Palette Switcher
  const paletteDots = document.querySelectorAll('.palette-dot');

  paletteDots.forEach(dot => {
    const accentValue = dot.getAttribute('data-accent');
    if (accentValue === savedAccent) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }

    dot.addEventListener('click', () => {
      paletteDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      const selectedAccent = dot.getAttribute('data-accent');
      document.documentElement.setAttribute('data-accent', selectedAccent);
      localStorage.setItem('accentTheme', selectedAccent);
    });
  });


  /* ==========================================================================
     1. MOBILE NAVIGATION TOGGLE
     ========================================================================== */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', toggleMobileMenu);
  }

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });


  /* ==========================================================================
     2. SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after revealing to save performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* ==========================================================================
     3. ACTIVE NAV LINK ON SCROLL
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const correspondingNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (correspondingNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          correspondingNavLink.classList.add('active');
        } else {
          correspondingNavLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);


  /* ==========================================================================
     3.1 SCROLL PROGRESS BAR UPDATE
     ========================================================================== */
  const scrollProgressBar = document.getElementById('scroll-progress');
  
  function updateScrollProgress() {
    if (!scrollProgressBar) return;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    scrollProgressBar.style.width = `${progress}%`;
  }
  
  window.addEventListener('scroll', updateScrollProgress);
  updateScrollProgress();


  /* ==========================================================================
     3.2 DYNAMIC TYPEWRITER EFFECT IN HERO SECTION
     ========================================================================== */
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const phrases = [
      'Tech By Mind, Art By Heart.',
      'Frontend Developer & UI Creator.',
      'Python, Java & Web Engineering.',
      'Crafting Responsive Web Experiences.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 90;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 85;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400;
      }

      setTimeout(typeLoop, typeSpeed);
    }

    // Start typewriter loop after initial reveal
    setTimeout(typeLoop, 500);
  }


  /* ==========================================================================
     4. SPOTLIGHT MOUSE POSITIONING EFFECT
     ========================================================================== */
  const spotlightCards = document.querySelectorAll('.spotlight-card');

  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });


  /* ==========================================================================
     5. SKILL CATEGORY FILTERING
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          card.style.display = 'none';
        }
      });
    });
  });


  /* ==========================================================================
     6. INTERACTIVE PROJECT MODAL
     ========================================================================== */
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalDesc = document.getElementById('modal-desc');
  const modalFeaturesList = document.getElementById('modal-features-list');
  const modalRepoLink = document.getElementById('modal-repo-link');
  const projectModalBtns = document.querySelectorAll('.project-modal-btn');

  function openProjectModal(data) {
    modalTitle.textContent = data.title || 'Project Details';
    modalSubtitle.textContent = data.subtitle || '';
    modalDesc.textContent = data.desc || '';

    if (modalRepoLink && data.repo) {
      modalRepoLink.href = data.repo;
    }

    // Populate Features List
    modalFeaturesList.innerHTML = '';
    if (data.features) {
      const featuresArr = data.features.split(',');
      featuresArr.forEach(feat => {
        const li = document.createElement('li');
        li.textContent = feat.trim();
        modalFeaturesList.appendChild(li);
      });
    }

    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  projectModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const data = {
        title: btn.getAttribute('data-title'),
        subtitle: btn.getAttribute('data-subtitle'),
        desc: btn.getAttribute('data-desc'),
        features: btn.getAttribute('data-features'),
        repo: btn.getAttribute('data-repo')
      };
      openProjectModal(data);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);

  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) closeProjectModal();
  });


  /* ==========================================================================
     7. RESUME MODAL HANDLER
     ========================================================================== */
  const resumeModal = document.getElementById('resume-modal');
  const resumeBtn = document.getElementById('resume-btn');
  const heroResumeBtn = document.getElementById('hero-resume-btn');
  const resumeCloseBtn = document.getElementById('resume-close-btn');
  const printResumeBtn = document.getElementById('print-resume-btn');

  function openResumeModal() {
    if (resumeModal) {
      resumeModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (resumeBtn) resumeBtn.addEventListener('click', openResumeModal);
  if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResumeModal);
  if (resumeCloseBtn) resumeCloseBtn.addEventListener('click', closeResumeModal);

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResumeModal();
    });
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Close modals on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal && projectModal.classList.contains('open')) closeProjectModal();
      if (resumeModal && resumeModal.classList.contains('open')) closeResumeModal();
    }
  });


  /* ==========================================================================
     8. CONTACT FORM VALIDATION & TOAST ACKNOWLEDGMENT
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${type === 'success' ? '#64ffda' : '#ef4444'}" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Auto remove after 4 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple Client-side validation check
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.', 'error');
        return;
      }

      // Simulate button loading state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        contactForm.reset();
        showToast('Thank you! Your message has been sent successfully.');
      }, 1200);
    });
  }


  /* ==========================================================================
     9. BACK TO TOP BUTTON & FOOTER YEAR
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top');
  const copyrightYear = document.getElementById('copyright-year');

  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
