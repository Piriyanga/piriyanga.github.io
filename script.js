const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const yearElement = document.getElementById("year");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

// Display the current year.
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Mobile navigation.
if (navToggle && navMenu) {
  const closeMenu = () => {
    if (!navMenu.classList.contains("active")) {
      return;
    }

    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
  };

  navToggle.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpen = navMenu.classList.toggle("active");

    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  // Close when a link is tapped.
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close when the page is scrolled.
  window.addEventListener("scroll", closeMenu, { passive: true });

  // Close when tapping outside the menu.
  document.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
      closeMenu();
    }
  });

  // Close on Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // Close when switching back to desktop width.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}

// Scroll animations.

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});
// Back to top button.
const backToTopButton = document.getElementById("back-to-top");

if (backToTopButton) {
  const toggleBackToTop = () => {
    backToTopButton.classList.toggle("visible", window.scrollY > 400);
  };

  window.addEventListener("scroll", toggleBackToTop, { passive: true });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  toggleBackToTop();
}
