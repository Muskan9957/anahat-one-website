document.addEventListener('DOMContentLoaded', () => {

    // --- Utility: Get CSRF Token ---
    function getCsrfToken() {
        const meta = document.querySelector('meta[name="csrf-token"]');
        return meta ? meta.getAttribute('content') : '';
    }

    // --- 1. Theme Toggle ---
    function initTheme() {
        const themeToggleBtn = document.getElementById('themeToggle');
        const moonIcon = document.getElementById('moonIcon');
        const sunIcon = document.getElementById('sunIcon');
        if (!themeToggleBtn || !moonIcon || !sunIcon) return;

        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.replace('light-theme', 'dark-theme');
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
            themeToggleBtn.setAttribute('aria-pressed', 'true');
        }

        themeToggleBtn.addEventListener('click', () => {
            const isLight = document.body.classList.contains('light-theme');
            if (isLight) {
                document.body.classList.replace('light-theme', 'dark-theme');
                localStorage.setItem('theme', 'dark');
                moonIcon.classList.add('hidden');
                sunIcon.classList.remove('hidden');
                themeToggleBtn.setAttribute('aria-pressed', 'true');
            } else {
                document.body.classList.replace('dark-theme', 'light-theme');
                localStorage.setItem('theme', 'light');
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
                themeToggleBtn.setAttribute('aria-pressed', 'false');
            }
        });
    }

    // --- 2. Side Panel ---
    function initNavigation() {
        const menuToggle = document.getElementById('menuToggle');
        const closeToggle = document.getElementById('closeToggle');
        const sidePanel = document.getElementById('sidePanel');
        const overlay = document.getElementById('overlay');
        
        if (!menuToggle || !closeToggle || !sidePanel || !overlay) return;

        document.querySelectorAll('.panel-links a').forEach(link => link.addEventListener('click', closePanel));

        function openPanel() {
            sidePanel.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            menuToggle.setAttribute('aria-expanded', 'true');
            sidePanel.setAttribute('aria-hidden', 'false');
            overlay.setAttribute('aria-hidden', 'false');
        }
        function closePanel() {
            sidePanel.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            menuToggle.setAttribute('aria-expanded', 'false');
            sidePanel.setAttribute('aria-hidden', 'true');
            overlay.setAttribute('aria-hidden', 'true');
        }
        menuToggle.addEventListener('click', openPanel);
        closeToggle.addEventListener('click', closePanel);
        overlay.addEventListener('click', closePanel);

        // Hide Header on Scroll
        let lastScrollY = window.scrollY;
        const header = document.querySelector('.site-header');
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > lastScrollY && window.scrollY > 80) {
                    header.classList.add('nav-hidden');
                } else {
                    header.classList.remove('nav-hidden');
                }
                lastScrollY = window.scrollY;
            });
        }
    }

    // --- 3. Scroll Animations ---
    function initScrollEffects() {
        // Legacy Fade Sections (if they exist)
        const legacyFadeSections = document.querySelectorAll('.split-section, .services-section, .cta-block');
        legacyFadeSections.forEach(el => el.classList.add('fade-in-section'));

        const sectionObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
        
        document.querySelectorAll('.fade-in-section').forEach(el => sectionObserver.observe(el));

        // Reveal Animations
        const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-parallax');
        if (revealElements.length > 0) {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-revealed');
                        
                        // Parallax effect
                        if (entry.target.classList.contains('reveal-parallax')) {
                            const img = entry.target.querySelector('img');
                            if (img) {
                                window.addEventListener('scroll', () => {
                                    const rect = entry.target.getBoundingClientRect();
                                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                                        const scrolled = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                                        const yPos = (scrolled - 0.5) * -40;
                                        img.style.transform = `scale(1.05) translateY(${yPos}px)`;
                                    }
                                });
                            }
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

            revealElements.forEach(el => revealObserver.observe(el));
        }
    }

    // --- 4. Carousel ---
    function initCarousel() {
        const cards = Array.from(document.querySelectorAll('.carousel-card'));
        const bgs   = Array.from(document.querySelectorAll('.hero-bg-layer'));
        
        if (cards.length > 0) {
            let current = 0;
            let autoTimer = null;

            function render() {
                bgs.forEach((bg, i) => bg.classList.toggle('active', i === current));
                cards.forEach((card, i) => {
                    const offset = i - current;
                    card.classList.toggle('active', offset === 0);
                    card.style.zIndex   = offset === 0 ? '5' : '1';
                    card.style.opacity  = offset === 0 ? '1' : Math.abs(offset) === 1 ? '0.38' : '0';
                    card.style.transform = offset === 0
                        ? 'translateX(0) scale(1)'
                        : `translateX(${offset * 95}%) scale(0.9)`;
                });
            }

            function goTo(index) {
                if (index >= cards.length) index = 0;
                if (index < 0) index = cards.length - 1;
                current = index;
                render();
            }

            function startAuto() {
                clearInterval(autoTimer);
                autoTimer = setInterval(() => goTo(current + 1), 4000);
            }

            cards.forEach((card, i) => {
                card.addEventListener('click', (e) => {
                    if (e.target.closest('a.btn')) return;
                    if (i !== current) {
                        goTo(i);
                        startAuto();
                    } else {
                        const link = card.querySelector('a.btn');
                        if (link) {
                            window.location.href = link.getAttribute('href');
                        }
                    }
                });
            });

            // Swipe
            let swipeX = 0;
            const track = document.getElementById('carouselTrack');
            if (track) {
                track.addEventListener('mousedown',  e => { swipeX = e.clientX; });
                window.addEventListener('mouseup',   e => {
                    const d = e.clientX - swipeX;
                    if (Math.abs(d) > 50) { goTo(current + (d < 0 ? 1 : -1)); startAuto(); }
                });
                track.addEventListener('touchstart', e => { swipeX = e.touches[0].clientX; }, { passive: true });
                window.addEventListener('touchend',  e => {
                    const d = e.changedTouches[0].clientX - swipeX;
                    if (Math.abs(d) > 50) { goTo(current + (d < 0 ? 1 : -1)); startAuto(); }
                });
            }

            // Keyboard
            document.addEventListener('keydown', e => {
                if (e.key === 'ArrowLeft')  { goTo(current - 1); startAuto(); }
                if (e.key === 'ArrowRight') { goTo(current + 1); startAuto(); }
            });

            render();
            startAuto();
        }
    }

    // --- 5. Page Transitions & Routing ---
    function initRouting() {
        document.body.classList.add('page-loaded');

        document.querySelectorAll('.interactive-block').forEach(block => {
            block.addEventListener('click', () => {
                const targetUrl = block.getAttribute('data-url');
                if (targetUrl) {
                    document.body.classList.remove('page-loaded');
                    setTimeout(() => { window.location.href = targetUrl; }, 400);
                }
            });
        });

        document.querySelectorAll('a').forEach(link => {
            if (link.hostname === window.location.hostname && !link.hash && link.getAttribute('target') !== '_blank') {
                link.addEventListener('click', (e) => {
                    // Prevent transition on download or email links just in case
                    if (link.href.includes('mailto:') || link.hasAttribute('download')) return;
                    e.preventDefault();
                    const target = link.href;
                    document.body.classList.remove('page-loaded');
                    setTimeout(() => { window.location.href = target; }, 400);
                });
            }
        });
    }

    // --- 6. Reusable Accordion Logic ---
    function initAccordion() {
        document.querySelectorAll('.faq-question').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.parentElement;
                const answer = item.querySelector('.faq-answer');
                if (!answer) return;
                
                // Close others
                document.querySelectorAll('.faq-item').forEach(other => {
                    if (other !== item && other.classList.contains('open')) {
                        other.classList.remove('open');
                        const otherAnswer = other.querySelector('.faq-answer');
                        const otherBtn = other.querySelector('.faq-question');
                        if (otherAnswer) otherAnswer.style.maxHeight = null;
                        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle current
                if (item.classList.contains('open')) {
                    item.classList.remove('open');
                    answer.style.maxHeight = null;
                    btn.setAttribute('aria-expanded', 'false');
                } else {
                    item.classList.add('open');
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    btn.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    // --- 7. Careers Page Logic ---
    function initCareersPage() {
        const careerForm = document.getElementById('careerForm');
        if (!careerForm) return;

        let venturesData = {};
        const dataScript = document.getElementById('ventures-data');
        if (dataScript) {
            try {
                venturesData = JSON.parse(dataScript.textContent);
            } catch(e) { console.error('Failed to parse ventures data'); }
        }

        const ventureSelect = document.getElementById('venture_interest');
        const deptRow = document.getElementById('department-row');
        const deptSelect = document.getElementById('department');

        function updateDepartments(ventureId) {
            if (venturesData[ventureId] && venturesData[ventureId].departments) {
                const depts = venturesData[ventureId].departments;
                if (deptSelect) {
                    deptSelect.innerHTML = '<option value="" disabled selected></option>';
                    depts.forEach(d => {
                        const opt = document.createElement('option');
                        opt.value = d;
                        opt.textContent = d;
                        deptSelect.appendChild(opt);
                    });
                }
                if (deptRow) deptRow.style.display = 'flex';
            } else {
                if (deptRow) deptRow.style.display = 'none';
            }
        }

        if (ventureSelect) {
            ventureSelect.addEventListener('change', (e) => {
                updateDepartments(e.target.value);
            });
        }

        function scrollToFormAndSelect(vId, vDept, vType) {
            const formSection = document.getElementById('application-form');
            if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth' });
                
                careerForm.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
                careerForm.style.transform = 'translateY(-10px)';
                careerForm.style.boxShadow = '0 20px 40px rgba(0,0,0,0.05)';
                setTimeout(() => {
                    careerForm.style.transform = 'none';
                    careerForm.style.boxShadow = 'none';
                }, 600);

                if (vType) {
                    const typeSelect = document.getElementById('app_type');
                    if (typeSelect) typeSelect.value = vType;
                }
                
                if (vId && ventureSelect) {
                    ventureSelect.value = vId;
                    updateDepartments(vId);
                    
                    if (vDept && deptSelect) {
                        setTimeout(() => { deptSelect.value = vDept; }, 50);
                    }
                }
            }
        }

        document.querySelectorAll('.job-apply-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                scrollToFormAndSelect(
                    btn.getAttribute('data-venture'),
                    btn.getAttribute('data-department'),
                    btn.getAttribute('data-type')
                );
            });
        });

        const vCards = document.querySelectorAll('.career-venture-card');
        vCards.forEach(card => {
            card.addEventListener('click', () => {
                vCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                scrollToFormAndSelect(card.getAttribute('data-venture'), null, null);
            });
        });

        // File Upload UI & Client-Side Validation
        const fileInput = document.getElementById('resume');
        const dropZone = document.getElementById('drop-zone');
        const fileNameDisplay = document.getElementById('file-name-display');

        if (fileInput && dropZone && fileNameDisplay) {
            function preventDefaults (e) { e.preventDefault(); e.stopPropagation(); }
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropZone.addEventListener(eventName, preventDefaults, false);
            });
            ['dragenter', 'dragover'].forEach(eventName => {
                dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
            });
            ['dragleave', 'drop'].forEach(eventName => {
                dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
            });

            dropZone.addEventListener('drop', (e) => {
                fileInput.files = e.dataTransfer.files;
                updateFileName();
            });

            fileInput.addEventListener('change', updateFileName);

            function updateFileName() {
                if (fileInput.files && fileInput.files[0]) {
                    const file = fileInput.files[0];
                    if (file.size > 10 * 1024 * 1024) {
                        alert("File size exceeds 10MB limit.");
                        fileInput.value = ''; // clear
                        fileNameDisplay.textContent = '';
                        return;
                    }
                    if (!file.name.toLowerCase().endsWith('.pdf')) {
                        alert("Only PDF files are allowed.");
                        fileInput.value = ''; // clear
                        fileNameDisplay.textContent = '';
                        return;
                    }
                    fileNameDisplay.textContent = file.name;
                } else {
                    fileNameDisplay.textContent = '';
                }
            }
        }

        // Submit Form
        careerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = careerForm.querySelector('.form-submit-btn');
            if (!submitBtn) return;
            
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;

            const formData = new FormData(careerForm);
            
            fetch(careerForm.action, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCsrfToken()
                },
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    const overlay = document.getElementById('form-success-overlay');
                    if (overlay) overlay.classList.add('active');
                } else {
                    alert(data.message || 'Error submitting application.');
                    submitBtn.textContent = 'Submit Application';
                    submitBtn.disabled = false;
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error submitting application. Please try again.');
                submitBtn.textContent = 'Submit Application';
                submitBtn.disabled = false;
            });
        });
    }

    // --- 8. Contact Page Logic ---
    function initContactPage() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        const typeSelect = document.getElementById('enquiry_type');
        const helperText = document.getElementById('enquiry-helper-text');
        
        const helperMessages = {
            "General Enquiry": "For general questions about Anahat One.",
            "Business Partnership": "Our partnerships team will review your enquiry and respond as soon as possible.",
            "Careers": "Applications and recruitment-related questions are handled by our talent team.",
            "Media": "For press and media related inquiries.",
            "Support": "For technical or customer support.",
            "Other": "Please provide details in the subject and message."
        };

        if(typeSelect && helperText) {
            typeSelect.addEventListener('change', (e) => {
                const val = e.target.value;
                helperText.style.opacity = 0;
                setTimeout(() => {
                    helperText.textContent = helperMessages[val] || "";
                    helperText.style.opacity = 1;
                }, 300);
            });
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            if (!submitBtn) return;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            
            fetch(contactForm.action, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCsrfToken()
                },
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    const overlay = document.getElementById('contact-success-overlay');
                    if (overlay) overlay.classList.add('active');
                } else {
                    alert(data.message || 'Error submitting message.');
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error submitting message. Please try again.');
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            });
        });
    }

    // --- Initialization ---
    initTheme();
    initNavigation();
    initScrollEffects();
    initCarousel();
    initRouting();
    initAccordion();
    initCareersPage();
    initContactPage();

});
