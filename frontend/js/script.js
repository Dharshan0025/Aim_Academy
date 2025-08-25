// Mobile Menu Toggle
        document.querySelector('.mobile-menu').addEventListener('click', function() {
            document.querySelector('.navbar').classList.toggle('active');
        });

        // Header Scroll Effect
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Animate elements when they come into view
        function animateOnScroll() {
            const elements = document.querySelectorAll('.feature-card, .course-card, .testimonial-card, .video-container');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (elementPosition < screenPosition) {
                    element.classList.add('animate');
                }
            });
        }

        // Initialize animations on load
        window.addEventListener('load', function() {
            animateOnScroll();
            
            // Animate features with staggered delay
            const featureCards = document.querySelectorAll('.feature-card');
            featureCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.2}s`;
            });
            
            // Animate courses with staggered delay
            const courseCards = document.querySelectorAll('.course-card');
            courseCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.2}s`;
            });
            
            // Animate testimonials with staggered delay
            const testimonialCards = document.querySelectorAll('.testimonial-card');
            testimonialCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.3}s`;
            });
        });

        // Check for animations on scroll
        window.addEventListener('scroll', animateOnScroll);

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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
                    document.querySelector('.navbar').classList.remove('active');
                }
            });
        });