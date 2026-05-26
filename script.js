/* 
    All-1 Premium Multi-Tools Website
    Script: Animations, Interactivity & Logic
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader Animation
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            // Trigger initial reveal animations
            revealOnScroll();
        }, 1500);
    });

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Simple mobile menu animation (CSS could handle the rest)
        if (navLinks.classList.contains('active')) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(10, 10, 12, 0.95)';
            navLinks.style.padding = '2rem';
            navLinks.style.backdropFilter = 'blur(10px)';
        } else {
            navLinks.style.display = 'none';
        }
    });

    // 4. Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-text');
    
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);

    // 5. Animated Counters for Stats
    const stats = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    const startCounters = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    stat.innerText = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    stat.innerText = target;
                }
            };
            updateCounter();
        });
    };

    // Trigger counters when stats section is in view
    const statsSection = document.querySelector('.stats-section');
    window.addEventListener('scroll', () => {
        if (!countersStarted && statsSection.getBoundingClientRect().top < window.innerHeight) {
            startCounters();
            countersStarted = true;
        }
    });

    // 6. Tool Card Tilt Effect (Micro-interaction)
    const cards = document.querySelectorAll('.tool-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            
            // Update Glow Position
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--primary-glow), transparent 70%)`;
                glow.style.opacity = '0.4';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.opacity = '0';
            }
        });
    });

    // 7. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => otherItem.classList.remove('active'));
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 8. Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinks.classList.remove('active');
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // 9. Particles Background Effect (Simple Version)
    const createParticles = () => {
        const particlesContainer = document.getElementById('particles-js');
        if (!particlesContainer) return;

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 3 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = Math.random() * 10 + 10;
            
            Object.assign(particle.style, {
                position: 'absolute',
                width: `${size}px`,
                height: `${size}px`,
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                left: `${posX}%`,
                top: `${posY}%`,
                pointerEvents: 'none',
                animation: `floatParticle ${duration}s infinite linear`,
                animationDelay: `${delay}s`
            });
            
            particlesContainer.appendChild(particle);
        }
    };

    // Add particle animation to stylesheet dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes floatParticle {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            20% { opacity: 0.5; }
            80% { opacity: 0.5; }
            100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }
        #particles-js {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    createParticles();

    // 10. Active Nav Link on Scroll
    const sections = document.querySelectorAll('section');
    const navA = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navA.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });
});
