(function () {

    var navbar = document.getElementById('navbar');
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');
    var navItems = document.querySelectorAll('.nav-item');
    var sections = document.querySelectorAll('.section');
    var skillBars = document.querySelectorAll('.skill-bar');
    var form = document.getElementById('contactForm');
    var formMsg = document.getElementById('formSuccess');

    /* 1 — Navbar scroll colour change */
    function onScroll() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();

    /* 2 — Active nav link on scroll */
    var secObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (!e.isIntersecting) return;
            navItems.forEach(function (a) {
                if (a.getAttribute('href') === '#' + e.target.id) {
                    a.classList.add('active');
                } else {
                    a.classList.remove('active');
                }
            });
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (s) { secObs.observe(s); });

    /* 3 — Hamburger menu */
    hamburger.addEventListener('click', function () {
        var isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
    });

    navItems.forEach(function (a) {
        a.addEventListener('click', function () {
            navLinks.classList.remove('open');
            hamburger.classList.remove('open');
        });
    });

    document.addEventListener('click', function (e) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('open');
        }
    });

    /* 4 — Skill bars animate on scroll */
    var barObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (!e.isIntersecting) return;
            var fill = e.target.querySelector('.bar-fill');
            var lvl = e.target.getAttribute('data-level') || '0';
            var idx = Array.from(skillBars).indexOf(e.target);
            setTimeout(function () {
                fill.style.width = lvl + '%';
            }, idx * 130);
            barObs.unobserve(e.target);
        });
    }, { threshold: 0.3 });

    skillBars.forEach(function (b) { barObs.observe(b); });

    /* 5 — Contact form */
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var btn = form.querySelector('button[type="submit"]');
            btn.disabled = true;
            btn.textContent = 'Sending...';
            setTimeout(function () {
                form.reset();
                btn.disabled = false;
                btn.textContent = 'Send Message';
                formMsg.classList.add('show');
                setTimeout(function () {
                    formMsg.classList.remove('show');
                }, 4000);
            }, 1200);
        });
    }

    /* 6 — Smooth scroll */
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var target = document.querySelector(a.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

})();