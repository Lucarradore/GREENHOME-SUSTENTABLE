if (typeof Swiper !== "undefined" && document.querySelector(".mySwiper")) {
  new Swiper(".mySwiper", {
    initialSlide: 0,
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 1000,
    navigation: {
      nextEl: ".hero-swiper-next",
      prevEl: ".hero-swiper-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

// NAVBAR SCROLL
const navbar = document.querySelector(".navbar");

if (navbar) {
  const updateNavbarOnScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  updateNavbarOnScroll();
  window.addEventListener("scroll", updateNavbarOnScroll, { passive: true });
}

// MENÚ MOBILE
const mobileNavbar = window.matchMedia("(max-width: 900px)");
const navbars = document.querySelectorAll(".navbar");

navbars.forEach((bar) => {
  const navLinks = bar.querySelector(".nav-links");
  if (!navLinks) return;

  let navToggle = bar.querySelector(".nav-toggle");
  if (!navToggle) {
    navToggle = document.createElement("button");
    navToggle.type = "button";
    navToggle.className = "nav-toggle";
    navToggle.setAttribute("aria-label", "Abrir menú");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.textContent = "☰";
    bar.appendChild(navToggle);
  }

  let navClose = bar.querySelector(".nav-close");
  if (!navClose) {
    navClose = document.createElement("button");
    navClose.type = "button";
    navClose.className = "nav-close";
    navClose.setAttribute("aria-label", "Cerrar menú");
    navClose.textContent = "✕";
    navLinks.prepend(navClose);
  }

  let backdrop = bar.parentElement?.querySelector(":scope > .nav-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    bar.insertAdjacentElement("afterend", backdrop);
  }

  const closeMenu = () => {
    bar.classList.remove("menu-open");
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    bar.querySelectorAll(".has-submenu.submenu-open").forEach((item) => {
      item.classList.remove("submenu-open");
    });
  };

  const openMenu = () => {
    bar.classList.add("menu-open");
    document.body.classList.add("nav-open");
    navToggle.setAttribute("aria-expanded", "true");
  };

  navToggle.addEventListener("click", () => {
    bar.classList.contains("menu-open") ? closeMenu() : openMenu();
  });

  navClose.addEventListener("click", closeMenu);
  backdrop.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && bar.classList.contains("menu-open")) {
      closeMenu();
    }
  });

  navLinks.addEventListener("click", (event) => {
    if (!mobileNavbar.matches) return;

    const target = event.target;
    if (!(target instanceof Element)) return;

    const link = target.closest("a");
    if (!link || !navLinks.contains(link)) return;

    const listItem = link.closest(".has-submenu");
    const isParentTrigger =
      !!listItem && listItem.querySelector(":scope > a") === link;

    if (isParentTrigger) {
      const isOpen = listItem.classList.contains("submenu-open");

      if (!isOpen) {
        event.preventDefault(); 
        navLinks
          .querySelectorAll(".has-submenu.submenu-open")
          .forEach((item) => item.classList.remove("submenu-open"));

        listItem.classList.add("submenu-open");
        return;
      }
    }

    closeMenu();
  });

  window.addEventListener("resize", () => {
    if (!mobileNavbar.matches) {
      closeMenu();
    }
  });
});

// BENEFICIOS (DESKTOP)
const benefitsContainer = document.querySelector(".benefits");
const benefitCards = document.querySelectorAll(".benefit");
const desktopBenefitsQuery = window.matchMedia("(min-width: 1025px)");

if (benefitsContainer && benefitCards.length > 0) {
  const benefitImages = [
    "benefit.jpg",
    "benefit1.png",
    "benefit2.jpg",
    "benefit3.jpg",
    "benefit4.png",
  ];
  const benefitCssPathPrefix = "../assets/";

  let imageIndex = 0;
  let lastHoveredCard = null;
  const listeners = [];

  const setDesktopImage = (index) => {
    benefitsContainer.style.setProperty(
      "--benefits-image",
      `url("${benefitCssPathPrefix}${benefitImages[index]}")`
    );
  };

  const clearDesktopListeners = () => {
    listeners.forEach(({ card, handler }) => {
      card.removeEventListener("mouseenter", handler);
    });
    listeners.length = 0;
  };

  const enableDesktopBenefits = () => {
    clearDesktopListeners();
    imageIndex = 0;
    lastHoveredCard = null;
    setDesktopImage(0);

    benefitCards.forEach((card) => {
      const handler = () => {
        if (card === lastHoveredCard) {
          return;
        }

        imageIndex = (imageIndex + 1) % benefitImages.length;
        setDesktopImage(imageIndex);
        lastHoveredCard = card;
      };

      card.addEventListener("mouseenter", handler);
      listeners.push({ card, handler });
    });
  };

  const disableDesktopBenefits = () => {
    clearDesktopListeners();
    benefitsContainer.style.removeProperty("--benefits-image");
  };

  const syncBenefitsByViewport = () => {
    if (desktopBenefitsQuery.matches) {
      enableDesktopBenefits();
    } else {
      disableDesktopBenefits();
    }
  };

  syncBenefitsByViewport();

  desktopBenefitsQuery.addEventListener("change", syncBenefitsByViewport);
}

// SCROLL REVEAL
const prefersReducedMotion =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealTargets = document.querySelectorAll(
  [
    "main section",
    "section",
    "article",
    ".benefit",
    ".servicio",
    ".proyecto",
    ".paso",
    ".testimonial",
    ".card-nosotros",
    ".card-valores .valor",
    ".card-contacto",
    ".contact-info",
    ".map-container",
    ".legal h2",
    ".legal p",
    ".footer-col",
    ".oferta",
  ].join(", ")
);

if (revealTargets.length > 0) {
  revealTargets.forEach((element) => {
    if (
      !element.classList.contains("scroll-reveal") &&
      !element.closest(".navbar") &&
      !element.classList.contains("swiper") &&
      !element.closest(".swiper")
    ) {
      element.classList.add("scroll-reveal");
    }
  });

  const revealElement = (element) => {
    element.classList.add("is-visible");
  };

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach((element) => revealElement(element));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    revealTargets.forEach((element) =>
      revealObserver.observe(element)
    );
  }
}
