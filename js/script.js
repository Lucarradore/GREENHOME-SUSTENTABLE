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

// LOGO COMO BOTÓN A INICIO
const logoNodes = document.querySelectorAll(".navbar .logo");

logoNodes.forEach((logo) => {
  if (!(logo instanceof HTMLElement)) return;

  const navigateHome = (event) => {
    if (event) event.preventDefault();

    const currentPath =
      window.location.pathname.split("/").filter(Boolean).pop()?.toLowerCase() ||
      "index.html";

    if (currentPath === "index.html") {
      const homeSection = document.getElementById("inicio");
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      if (window.location.hash !== "#inicio") {
        history.replaceState(null, "", "#inicio");
      }
      return;
    }

    window.location.href = "index.html#inicio";
  };

  if (logo.tagName.toLowerCase() !== "a") {
    logo.setAttribute("role", "button");
    logo.setAttribute("tabindex", "0");
  }

  logo.setAttribute("aria-label", "Ir al inicio");
  logo.addEventListener("click", navigateHome);
  logo.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      navigateHome(event);
    }
  });
});

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

  let backdrop = bar.nextElementSibling;
  if (!(backdrop instanceof HTMLElement) || !backdrop.classList.contains("nav-backdrop")) {
    backdrop = null;
  }

  if (!backdrop) {
    backdrop = bar.parentElement?.querySelector(".nav-backdrop") || null;
  }

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
    const directAnchor =
      listItem?.firstElementChild instanceof HTMLAnchorElement
        ? listItem.firstElementChild
        : null;
    const isParentTrigger = !!listItem && directAnchor === link;

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

// NAVBAR ACTIVE + INDICADOR DE SECCIÓN
const navRoot = document.querySelector(".navbar .nav-links");

if (navRoot) {
  const navAnchors = Array.from(navRoot.querySelectorAll("a[href]"));
  const normalizePath = (value) => {
    try {
      const url = new URL(value || window.location.href, window.location.href);
      const segments = url.pathname.split("/").filter(Boolean);
      const lastSegment = (segments[segments.length - 1] || "index.html").toLowerCase();
      return lastSegment || "index.html";
    } catch {
      const clean = String(value || "").split("#")[0].trim();
      if (!clean || clean === "/") return "index.html";
      const segments = clean.split("/").filter(Boolean);
      return (segments[segments.length - 1] || "index.html").toLowerCase();
    }
  };

  const currentPage = normalizePath(window.location.href);
  const isHomePage = currentPage === "index.html";

  const setActiveNav = (targetAnchor) => {
    navRoot.querySelectorAll(".is-active").forEach((element) => {
      element.classList.remove("is-active");
    });

    if (!targetAnchor) return;

    targetAnchor.classList.add("is-active");
    const listItem = targetAnchor.closest("li");
    if (listItem) {
      listItem.classList.add("is-active");
      const parentSubmenuItem = listItem.closest(".submenu")?.closest(".has-submenu");
      if (parentSubmenuItem) {
        parentSubmenuItem.classList.add("is-active");
      }
    }
  };

  const indicator = document.createElement("div");
  indicator.className = "section-indicator";
  indicator.setAttribute("aria-live", "polite");
  indicator.textContent = "Sección: Inicio";
  document.body.appendChild(indicator);

  let hideTimer;

  const normalizeLabel = (label) => {
    const safe = label && label.trim() ? label.trim() : "inicio";
    return safe.toLowerCase();
  };

  const setIndicator = (label) => {
    indicator.textContent = `SECCIÓN: ${normalizeLabel(label).toUpperCase()}`;
  };

  const showIndicator = (label) => {
    setIndicator(label);
    indicator.classList.remove("is-hidden");

    if (hideTimer) {
      window.clearTimeout(hideTimer);
    }

    hideTimer = window.setTimeout(() => {
      indicator.classList.add("is-hidden");
    }, 2600);
  };

  if (!isHomePage) {
    const pageAnchor =
      navAnchors.find((anchor) => normalizePath(anchor.getAttribute("href") || "") === currentPage) ||
      navAnchors.find((anchor) => normalizePath(anchor.href) === currentPage);

    if (pageAnchor) {
      setActiveNav(pageAnchor);
      showIndicator(pageAnchor.textContent || document.title);
    } else {
      showIndicator(document.title);
    }
  } else {
    const sectionConfig = [
      { id: "inicio", label: "inicio" },
      { id: "beneficios", label: "beneficios" },
      { id: "sobreNosotros", label: "nosotros" },
      { id: "testimonio", label: "testimonios" },
    ];

    const sectionTargets = sectionConfig
      .map(({ id, label }) => {
        const target = document.getElementById(id);
        if (!target) return null;

        const anchor = navAnchors.find((a) => (a.getAttribute("href") || "").includes(`#${id}`)) || null;
        return { target, anchor, label };
      })
      .filter(Boolean);

    const updateActiveSection = () => {
      if (sectionTargets.length === 0) return;

      const viewportPivot = window.innerHeight * 0.38;
      let current = null;

      sectionTargets.forEach((entry) => {
        const rect = entry.target.getBoundingClientRect();
        const isInViewBand = rect.top <= viewportPivot && rect.bottom >= viewportPivot * 0.35;

        if (isInViewBand) {
          current = entry;
        }
      });

      if (!current) {
        current = sectionTargets.reduce((closest, entry) => {
          const rect = entry.target.getBoundingClientRect();
          const distance = Math.abs(rect.top - viewportPivot);

          if (!closest || distance < closest.distance) {
            return { entry, distance };
          }

          return closest;
        }, null)?.entry || sectionTargets[0];
      }

      setActiveNav(current.anchor);
      showIndicator(current.label);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
  }
}

// BENEFICIOS (DESKTOP)
const benefitsContainer = document.querySelector(".benefits");
const benefitCards = document.querySelectorAll(".benefit");
const desktopBenefitsQuery = window.matchMedia(
  "(min-width: 1025px) and (hover: hover) and (pointer: fine)"
);

if (benefitsContainer && benefitCards.length > 0) {
  const benefitImages = [
    "benefit.webp",
    "benefit1.webp",
    "benefit2.webp",
    "benefit3.webp",
    "benefit4.webp",
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
    ".card-nosotros",
    ".card-valores",
    ".benefit",
    ".benefit-content",
    ".servicio",
    ".servicio-media",
    ".proyecto",
    ".proyecto img",
    ".proyecto-info",
    ".paso",
    ".testimonial",
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
        threshold: 0.08,
        rootMargin: "0px 0px -6% 0px",
      }
    );

    revealTargets.forEach((element) =>
      revealObserver.observe(element)
    );
  }
}
