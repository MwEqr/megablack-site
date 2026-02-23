document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hide');
        document.body.style.overflow = 'auto';
    }, 3500);
    document.body.style.overflow = 'hidden';

    // Navbar scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile menu
    const toggle = document.querySelector('.menu-toggle');
    const links = document.querySelector('.nav-links');
    if (toggle) {
        toggle.addEventListener('click', () => links.classList.toggle('active'));
        links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('active')));
    }

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        reveals.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < window.innerHeight - 100) el.classList.add('active');
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Counter animation
    const counters = document.querySelectorAll('[data-count]');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                let current = 0;
                const step = Math.ceil(target / 60);
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) { current = target; clearInterval(timer); }
                    el.textContent = current.toLocaleString('pt-BR') + (el.dataset.suffix || '');
                }, 30);
                countObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => countObserver.observe(c));

    // Particles
    const canvas = document.getElementById('particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedY: -Math.random() * 0.5 - 0.2,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(227, 27, 35, ${p.opacity})`;
                ctx.fill();
                p.y += p.speedY;
                if (p.y < 0) { p.y = canvas.height; p.x = Math.random() * canvas.width; }
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
        window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
    }
});
