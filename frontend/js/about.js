// main.js - Animation and Interaction Logic

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    initCounters();
    initTabs();
    initScrollAnimations();
    initParallax();
});

function initAnimations() {
    // Add intersection observer for scroll animations
    const animateElements = document.querySelectorAll('.animate__animated');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationClass = element.classList[1]; // Get the animation class
                const delay = element.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add(animationClass);
                    
                    // Remove animation class after it completes to allow re-triggering
                    if (animationClass.includes('animate__fadeIn')) {
                        element.addEventListener('animationend', () => {
                            element.classList.remove(animationClass);
                        }, { once: true });
                    }
                }, delay * 1000);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

function initCounters() {
    // Animated counters
    const counters = document.querySelectorAll('.count');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            const updateCount = () => {
                const newCount = Math.ceil(count + increment);
                if (newCount < target) {
                    counter.innerText = newCount;
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            
            // Start counter when in view
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCount();
                    observer.unobserve(counter);
                }
            });
            
            observer.observe(counter);
        } else {
            counter.innerText = target;
        }
    });
}

function initTabs() {
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

function initScrollAnimations() {
    // GSAP scroll animations for timeline
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray('.timeline-item').forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out"
        });
    });
}

function initParallax() {
    // Simple parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
}