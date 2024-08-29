AOS.init();

const marquees = Array.from(document.querySelectorAll(".marquee"));

class Marquee {
    constructor({ el }) {
        this.el = el;
        this.marqueeAnimation = [
            { transform: "translateX(0)" },
            { transform: `translateX(calc(-100% - var(--gap,0)))` }
        ];

        this.marqueeTiming = {
            duration: this.el.dataset.duration * 10000,
            direction: this.el.dataset.reverse ? "reverse" : "normal",
            iterations: Infinity
        };
        this.animations = [];
        this.SLOWDOWN_RATE = 0.2;
        this.cloneMarqueeGroup();
        this.init();
    }

    init() {
        for (const m of this.marquee__groups) {
            let q = m.animate(this.marqueeAnimation, this.marqueeTiming);

            this.animations.push(q);
        }

        this.initEvents();
    }
    slowDownAnimations() {
        for (const a of this.animations) {
            a.playbackRate = this.SLOWDOWN_RATE;
        }
    }
    resumeAnimationSpeed() {
        for (const a of this.animations) {
            a.playbackRate = true;
        }
    }
    initEvents() {
        this.el.addEventListener("mouseenter", () => this.slowDownAnimations());
        this.el.addEventListener("mouseleave", () => this.resumeAnimationSpeed());
    }

    cloneMarqueeGroup() {
        let clone = this.el.querySelector(".marquee__group").cloneNode(true);
        clone.classList.add("clone");
        this.el.appendChild(clone);
        this.marquee__groups = Array.from(
            this.el.querySelectorAll(".marquee__group")
        );
    }
}

for (const m of marquees) new Marquee({ el: m });

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
    640: {
        slidesPerView: 2,
        spaceBetween: 20,
    },
    
    1024: {
        slidesPerView: 4,
        spaceBetween: 20,
    },
},
});

let lastScrollTop = 0;
const navbar = document.querySelector('.header-nav');

window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scroll ke bawah
        navbar.classList.add('hidden');
    } else {
        // Scroll ke atas
        navbar.classList.remove('hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Untuk menghindari nilai negatif
});

document.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    let currentSectionId = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop - sectionHeight / 5) {
            currentSectionId = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSectionId}`) {
            link.classList.add("active");
        }
    });
});
