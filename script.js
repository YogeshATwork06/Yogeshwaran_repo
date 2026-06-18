// 1. Initialize the Scroll Animations (AOS)
AOS.init({
    duration: 1000, // How long the animation lasts (1 second)
    once: false,    // Whether animation should happen only once - set to false so it repeats when you scroll up/down
    mirror: true    // Elements animate out while scrolling past them
});

// 2. Add a smooth scrolling effect for the Navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 3. Optional: Console message to let you know it's working
console.log("Portfolio scripts loaded successfully! Keep building, Yogeshwaran!");