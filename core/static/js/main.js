// INTERACTIVE JAVASCRIPT FOR PORTFOLIO WEBSITE

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Toggle hamburger icon to X
            const icon = navToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.className = 'fa-solid fa-xmark';
                } else {
                    icon.className = 'fa-solid fa-bars';
                }
            }
        });
        
        // Close menu when clicking a nav-link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fa-solid fa-bars';
                }
            });
        });
    }

    // 2. Typewriter Effect
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
        const roles = [
            'Full-Stack Developer',
            'Django Architect',
            'MySQL Expert',
            'Problem Solver'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let delay = 150; // Typing speed

        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                delay = 75; // Deleting speed
            } else {
                typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                delay = 150; // Typing speed
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                delay = 2000; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                delay = 500; // Pause before next word
            }

            setTimeout(type, delay);
        }

        // Initialize typewriter
        setTimeout(type, 1000);
    }

    // 3. Highlight Nav Item on Scroll (ScrollSpy)
    const sections = document.querySelectorAll('section[id]');
    
    function scrollActive() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);

    // 4. AJAX Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Set loading state
            submitBtn.disabled = true;
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending Message <i class="fa-solid fa-circle-notch fa-spin"></i>';
            submitBtn.classList.add('loading');
            
            // Clear status
            formStatus.className = 'form-status';
            formStatus.style.display = 'none';
            
            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
                
                const result = await response.json();
                
                if (response.ok && result.success) {
                    // Success
                    formStatus.textContent = result.message || 'Success! Your message has been sent.';
                    formStatus.classList.add('success');
                    formStatus.style.display = 'block';
                    contactForm.reset();
                } else {
                    // Server Error
                    formStatus.textContent = result.error || 'An error occurred. Please try again.';
                    formStatus.classList.add('error');
                    formStatus.style.display = 'block';
                }
            } catch (error) {
                // Network Error
                console.error('Submission error:', error);
                formStatus.textContent = 'Unable to send message. Please check your internet connection.';
                formStatus.classList.add('error');
                formStatus.style.display = 'block';
            } finally {
                // Restore button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                submitBtn.classList.remove('loading');
            }
        });
    }
});
