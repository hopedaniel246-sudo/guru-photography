const carousel = document.querySelector(".testimonial-carousel");
const track = document.querySelector(".testimonial-track");
const cards = [...document.querySelectorAll(".testimonial-card")];
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const dotsContainer = document.querySelector(".carousel-dots");

let currentIndex = 0;
let autoSlide;
const slideInterval = 5000;

// Check whether the user prefers reduced motion
const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

// Stop execution if required elements are missing
if (
    carousel &&
    track &&
    cards.length > 0 &&
    prevBtn &&
    nextBtn &&
    dotsContainer
) {
    // Generate dot indicators
    cards.forEach((_, index) => {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.classList.add("carousel-dot");
        dot.setAttribute(
            "aria-label",
            `Go to testimonial ${index + 1}`
        );

        dot.addEventListener("click", () => {
            showSlide(index);
            restartAutoSlide();
        });

        dotsContainer.appendChild(dot);
    });

    const dots = [...dotsContainer.querySelectorAll(".carousel-dot")];

    // Display a specific testimonial
    function showSlide(index) {
        currentIndex = (index + cards.length) % cards.length;

        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update active indicators
        dots.forEach((dot, i) => {
            const isActive = i === currentIndex;

            dot.classList.toggle("active", isActive);

            if (isActive) {
                dot.setAttribute("aria-current", "true");
            } else {
                dot.removeAttribute("aria-current");
            }
        });

        // Update accessible slide information
        cards.forEach((card, i) => {
            card.setAttribute("aria-hidden", String(i !== currentIndex));
            card.inert = i !== currentIndex;
        });
    }

    // Next testimonial
    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    // Previous testimonial
    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    // Start automatic sliding
    function startAutoSlide() {
        stopAutoSlide();

        if (
            prefersReducedMotion.matches ||
            document.hidden ||
            cards.length < 2
        ) {
            return;
        }

        autoSlide = setInterval(() => {
            nextSlide();
        }, slideInterval);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    // Restart the timer after manual interaction
    function restartAutoSlide() {
        startAutoSlide();
    }

    // Next button event listener
    nextBtn.addEventListener("click", () => {
        nextSlide();
        restartAutoSlide();
    });

    // Previous button event listener
    prevBtn.addEventListener("click", () => {
        prevSlide();
        restartAutoSlide();
    });

    // Pause on mouse hover
    carousel.addEventListener("mouseenter", stopAutoSlide);
    carousel.addEventListener("mouseleave", startAutoSlide);

    // Pause while a control has keyboard focus
    carousel.addEventListener("focusin", stopAutoSlide);
    carousel.addEventListener("focusout", (event) => {
        if (!carousel.contains(event.relatedTarget)) {
            startAutoSlide();
        }
    });

    // Pause when browser tab is hidden
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });

    // Respect changes to motion preferences
    prefersReducedMotion.addEventListener(
        "change",
        restartAutoSlide
    );

    // Initialize carousel
    showSlide(0);
    startAutoSlide();
}