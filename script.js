const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const yearElement = document.getElementById("year");
const revealElements = document.querySelectorAll(".reveal");

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
  };

  navToggle.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpen = navMenu.classList.toggle("active");

    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
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
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}
