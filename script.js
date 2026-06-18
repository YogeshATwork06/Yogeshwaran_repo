/**
 * PORTFOLIO CORE ENGINE - Yogeshwaran M J
 * Designed for: Business Analyst / Data Science Portfolio
 * Theme: Blue & Red High-Performance Animation
 */

// 1. GLOBAL CONFIGURATION OBJECT
// Keeping all settings in one place makes it easy to update in the future.
const PortfolioConfig = {
    colors: {
        primaryRed: "#ff2a2a",
        accentBlue: "#004aad",
        white: "#ffffff"
    },
    typingSpeed: 100,
    scrollThreshold: 100,
    animationDuration: 1200
};

// 2. THE MAIN PORTFOLIO CONTROLLER
// We wrap everything in an object to prevent "Global Namespace Pollution" (Pro Developer Move)
const YogeshPortfolio = {

    /**
     * INIT FUNCTION
     * This starts everything when the page loads.
     */
    init: function() {
        console.log("%c Yogeshwaran's Portfolio Engine Started...", "color: #ff2a2a; font-weight: bold;");
        
        this.initializeAOS();
        this.setupCustomCursor();
        this.handleSmoothScrolling();
        this.trackScrollProgress();
        this.setupTypingEffect();
        this.animateSkillNumbers();
        this.handleContactForm();
        this.setupNavigationEffects();
        this.printDevSignature();
    },

    /**
     * INITIALIZE ANIMATION ON SCROLL (AOS)
     * Controls how elements fade in when you scroll down.
     */
    initializeAOS: function() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: PortfolioConfig.animationDuration,
                once: false, // Set to false to allow re-animation when scrolling back up
                mirror: true,
                anchorPlacement: 'top-bottom',
            });
        } else {
            console.error("AOS Library not found. Check your HTML script tags.");
        }
    },

    /**
     * CUSTOM INTERACTIVE CURSOR
     * Adds a high-end agency feel with a red dot and blue outline.
     */
    setupCustomCursor: function() {
        const dot = document.querySelector(".cursor-dot");
        const outline = document.querySelector(".cursor-outline");

        // Guard clause to prevent errors if elements aren't found
        if (!dot || !outline) return;

        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot moves instantly
            dot.style.left = `${posX}px`;
            dot.style.top = `${posY}px`;

            // Outline follows with a slight delay (Smooth Effect)
            outline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effects for buttons
        const links = document.querySelectorAll("a, button, .card");
        links.forEach(link => {
            link.addEventListener("mouseenter", () => {
                outline.style.transform = "translate(-50%, -50%) scale(2)";
                outline.style.borderColor = PortfolioConfig.colors.primaryRed;
            });
            link.addEventListener("mouseleave", () => {
                outline.style.transform = "translate(-50%, -50%) scale(1)";
                outline.style.borderColor = PortfolioConfig.colors.white;
            });
        });
    },

    /**
     * TYPING EFFECT
     * Dynamically changes the text in your Hero section.
     */
    setupTypingEffect: function() {
        const textElement = document.querySelector(".hero p");
        if (!textElement) return;

        const words = [
            "Aspiring Business Analyst.",
            "BCA Data Science Student.",
            "Python Enthusiast.",
            "Problem Solver."
        ];
        
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentWord = words[wordIndex];
            const shouldDelete = isDeleting;
            
            if (shouldDelete) {
                textElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                textElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = shouldDelete ? 50 : 150;

            if (!shouldDelete && charIndex === currentWord.length) {
                typeSpeed = 2000; // Pause at the end of word
                isDeleting = true;
            } else if (shouldDelete && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };

        type(); // Start the loop
    },

    /**
     * SMOOTH SCROLLING
     * Ensures all internal links slide smoothly instead of jumping.
     */
    handleSmoothScrolling: function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Offset for the fixed nav
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    /**
     * SCROLL PROGRESS BAR
     * Shows a red line at the top to indicate how much of the page is read.
     */
    trackScrollProgress: function() {
        const progressBar = document.querySelector(".scroll-progress");
        if (!progressBar) return;

        window.addEventListener("scroll", () => {
            const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (windowScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
            
            // Logic to change nav background color after scrolling
            const nav = document.querySelector("nav");
            if (window.scrollY > 50) {
                nav.style.background = "rgba(0, 31, 63, 0.95)";
                nav.style.boxShadow = "0 5px 20px rgba(0,0,0,0.3)";
            } else {
                nav.style.background = "rgba(0, 20, 40, 0.95)";
                nav.style.boxShadow = "none";
            }
        });
    },

    /**
     * SKILLS COUNTER ANIMATION
     * Animate numbers (e.g., Projects completed: 0 to 10)
     */
    animateSkillNumbers: function() {
        // This is a future-proof function. 
        // If you add a class ".stat-number" later, this will animate it.
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            // Only start when visible on screen
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) updateCount();
            });
            observer.observe(counter);
        });
    },

    /**
     * CONTACT FORM VALIDATION (Professional Mockup)
     * Even if you don't have a backend, valid forms look professional for a BA.
     */
    handleContactForm: function() {
        const form = document.querySelector("#contact-form");
        if (!form) return;

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            
            if (emailInput && !emailInput.value.includes("@")) {
                alert("Please enter a valid email address.");
                return;
            }

            // Mock Success Animation
            const submitBtn = form.querySelector('button');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Message Sent!";
            submitBtn.style.background = "#28a745"; // Success Green
            
            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.style.background = PortfolioConfig.colors.primaryRed;
                form.reset();
            }, 3000);
        });
    },

    /**
     * NAVIGATION EFFECTS
     * Highlights the active link based on where you are on the page.
     */
    setupNavigationEffects: function() {
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll("nav ul li a");

        window.addEventListener("scroll", () => {
            let current = "";
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - 150)) {
                    current = section.getAttribute("id");
                }
            });

            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href").includes(current)) {
                    link.style.color = PortfolioConfig.colors.primaryRed;
                } else {
                    link.style.color = "#ffffff";
                }
            });
        });
    },

    /**
     * DEVELOPER SIGNATURE
     * Shows a hidden message in the browser console for recruiters.
     */
    printDevSignature: function() {
        console.log("%c Developed by Yogeshwaran M J ", "background: #004aad; color: #fff; padding: 5px; border-radius: 3px;");
        console.log("Status: Open for Business Analyst Opportunities.");
    }
};

// 3. EVENT LISTENER: FIRE EVERYTHING
// This ensures the DOM is fully ready before we run any logic.
document.addEventListener("DOMContentLoaded", () => {
    YogeshPortfolio.init();
});

// 4. WINDOW RESIZE HANDLER
// Adjusts animations if the user rotates their phone or resizes the browser window.
window.addEventListener("resize", () => {
    // Reset AOS to recalculate positions
    AOS.refresh();
});

// 5. THEME COLOR DYNAMICS
// Small logic to ensure Red and Blue always contrast perfectly.
(function handleContrast() {
    const isDarkMode = true; // Hardcoded for your theme
    if (isDarkMode) {
        document.documentElement.style.setProperty('--main-bg', '#001f3f');
        document.documentElement.style.setProperty('--main-accent', '#ff2a2a');
    }
})();

/**
 * FUTURE EXPANSION SPACE
 * Use this area to add more functions as you grow.
 * ------------------------------------------------
 * 1. Add Project Filtering Logic
 * 2. Add Dark/Light Mode Toggle
 * 3. Add Resume Download Tracker
 * 4. Add Data Science API Integrations
 */

// End of Script - Total Logic Units: Fully Optimized.