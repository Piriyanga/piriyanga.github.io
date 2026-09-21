const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const yearElement = document.getElementById("year");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
const backToTopButton = document.getElementById("back-to-top");

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

  // Close the menu after selecting a navigation link.
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close the menu when scrolling.
  window.addEventListener("scroll", closeMenu, { passive: true });

  // Close the menu when clicking outside it.
  document.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
      closeMenu();
    }
  });

  // Close the menu with the Escape key.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // Close the menu when returning to desktop size.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}

// Reveal cards and content as they enter the viewport.
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
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

// Highlight the navigation link for the currently visible section.
if ("IntersectionObserver" in window && sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries.find((entry) => entry.isIntersecting);

      if (!visibleEntry) {
        return;
      }

      navLinks.forEach((link) => {
        const isCurrentSection =
          link.getAttribute("href") === `#${visibleEntry.target.id}`;

        link.classList.toggle("active", isCurrentSection);
      });
    },
    {
      rootMargin: "-25% 0px -65% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

// Back-to-top button.
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
