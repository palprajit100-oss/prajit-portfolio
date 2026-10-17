/* Portfolio interactions: navigation, filtering, lightbox, and contact-form validation. */
(() => {
  "use strict";

  // Mobile navigation: announce its expanded state to assistive technology.
  const menuToggle = document.querySelector("#menu-toggle");
  const navLinks = document.querySelector("#nav-links");
  const navAnchors = navLinks ? navLinks.querySelectorAll("a") : [];

  function closeMenu() {
    if (!menuToggle || !navLinks) return;
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });
    navAnchors.forEach((anchor) => anchor.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
    document.addEventListener("click", (event) => {
      if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });
  }

  // Smooth-scroll all in-page links, including the skip link and back-to-top link.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      closeMenu();
      try {
        if (window.location.hash !== hash) window.history.pushState(null, "", hash);
      } catch {
        // Scrolling still works in environments that restrict history updates.
      }
      target.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
    });
  });

  // Project category filters.
  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll(".project-card");
  const filterStatus = document.querySelector("#filter-status");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";
      let visibleCount = 0;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      projectCards.forEach((card) => {
        const show = filter === "all" || card.dataset.category === filter;
        card.hidden = !show;
        if (show) visibleCount += 1;
      });
      if (filterStatus) {
        const categoryName = filter === "all" ? "all" : filter === "web" ? "web and app" : "programming";
        filterStatus.textContent = `Showing ${categoryName} projects (${visibleCount}).`;
      }
    });
  });

  // Accessible native dialog lightbox. Escape closes the dialog automatically.
  const lightbox = document.querySelector("#project-lightbox");
  const lightboxImage = document.querySelector("#lightbox-image");
  const lightboxTitle = document.querySelector("#lightbox-title");
  const lightboxCaption = document.querySelector("#lightbox-caption");
  const lightboxClose = document.querySelector(".lightbox-close");

  function closeLightbox() {
    if (!lightbox) return;
    if (typeof lightbox.close === "function" && lightbox.open) {
      lightbox.close();
    } else {
      lightbox.removeAttribute("open");
      lightbox.classList.remove("is-fallback-open");
      document.body.classList.remove("lightbox-fallback-open");
      if (lightboxImage) lightboxImage.removeAttribute("src");
    }
  }

  document.querySelectorAll(".project-image-button").forEach((button) => {
    button.addEventListener("click", () => {
      if (!lightbox || !lightboxImage) return;
      const title = button.dataset.lightboxTitle || "Project preview";
      lightboxImage.src = button.dataset.lightboxSrc || "";
      lightboxImage.alt = button.dataset.lightboxAlt || title;
      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxCaption) lightboxCaption.textContent = title;
      if (typeof lightbox.showModal === "function") {
        lightbox.showModal();
      } else {
        lightbox.setAttribute("open", "");
        lightbox.classList.add("is-fallback-open");
        document.body.classList.add("lightbox-fallback-open");
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    lightbox.addEventListener("close", () => {
      if (lightboxImage) lightboxImage.removeAttribute("src");
    });
  }

  // Real-time contact form validation. This front-end demo does not transmit messages.
  const contactForm = document.querySelector("#contact-form");
  const formStatus = document.querySelector("#form-status");
  const fields = {
    name: document.querySelector("#contact-name"),
    email: document.querySelector("#contact-email"),
    message: document.querySelector("#contact-message")
  };
  const touched = new Set();
  let attemptedSubmit = false;

  function errorFor(fieldName, field) {
    const value = field.value.trim();
    if (!value) {
      if (fieldName === "name") return "Please enter your name.";
      if (fieldName === "email") return "Please enter your email address.";
      return "Please enter a message.";
    }
    if (fieldName === "name" && value.length < 2) return "Name must contain at least 2 characters.";
    if (fieldName === "email" && !field.validity.valid) return "Enter a valid email address, such as name@example.com.";
    if (fieldName === "message" && value.length < 10) return "Message must contain at least 10 characters.";
    return "";
  }

  function validateField(fieldName) {
    const field = fields[fieldName];
    if (!field) return true;
    const message = errorFor(fieldName, field);
    const errorNode = document.querySelector(`[data-error-for="${fieldName}"]`);
    field.setAttribute("aria-invalid", String(Boolean(message)));
    if (errorNode) errorNode.textContent = message;
    return !message;
  }

  Object.entries(fields).forEach(([fieldName, field]) => {
    if (!field) return;
    field.addEventListener("blur", () => {
      touched.add(fieldName);
      validateField(fieldName);
    });
    field.addEventListener("input", () => {
      if (touched.has(fieldName) || attemptedSubmit) validateField(fieldName);
      if (formStatus && formStatus.classList.contains("is-error")) {
        formStatus.textContent = "Please correct the highlighted fields.";
      }
    });
  });

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      attemptedSubmit = true;
      const valid = Object.keys(fields).map(validateField).every(Boolean);
      if (!valid) {
        if (formStatus) {
          formStatus.className = "contact-hint is-error";
          formStatus.textContent = "Please correct the highlighted fields and try again.";
        }
        const firstInvalid = Object.values(fields).find((field) => field && field.getAttribute("aria-invalid") === "true");
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      if (formStatus) {
        formStatus.className = "contact-hint is-success";
        formStatus.textContent = "Form validated successfully. This demo does not send messages; connect a form service or backend to receive them.";
      }
      contactForm.reset();
      Object.entries(fields).forEach(([fieldName, field]) => {
        if (field) field.removeAttribute("aria-invalid");
        const errorNode = document.querySelector(`[data-error-for="${fieldName}"]`);
        if (errorNode) errorNode.textContent = "";
      });
      touched.clear();
      attemptedSubmit = false;
    });
  }

  // Reveal-on-scroll effect; skip it when motion is reduced or observer isn't supported.
  const revealTargets = document.querySelectorAll(".skill-card, .project-card, .learning-item, .fact");
  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    revealTargets.forEach((element) => element.classList.add("reveal"));
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach((element) => observer.observe(element));
  }

  // Keep the copyright year current without requiring a manual edit each year.
  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
