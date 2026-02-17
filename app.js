const revealItems = document.querySelectorAll("[data-reveal]");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const nav = document.querySelector(".nav");
const progressBar = document.getElementById("scroll-progress");
const scrollTopButton = document.querySelector(".scroll-top");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("nav-menu");

const updateScrollUI = () => {
  const scrollY = window.scrollY || window.pageYOffset;
  const docHeight =
    document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = docHeight ? Math.min((scrollY / docHeight) * 100, 100) : 0;

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  if (nav) {
    nav.classList.toggle("is-sticky", scrollY > 12);
  }

  if (scrollTopButton) {
    scrollTopButton.classList.toggle("is-visible", scrollY > 500);
  }
};

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

if (scrollTopButton) {
  scrollTopButton.addEventListener("click", () => {
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (navToggle && navMenu && nav) {
  const closeNav = () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeNav());
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target)) {
      closeNav();
    }
  });
}

const counters = document.querySelectorAll("[data-count]");

const animateCounter = (element) => {
  if (element.dataset.animated === "true") {
    return;
  }

  const endValue = Number(element.dataset.count || 0);
  const prefix = element.dataset.prefix || "";
  const suffix = element.dataset.suffix || "";
  const duration = 1200;
  const startTime = performance.now();

  element.dataset.animated = "true";

  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.round(endValue * progress);
    element.textContent = `${prefix}${value}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

if (counters.length) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");
  if (!button) return;

  button.addEventListener("click", () => {
    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", isOpen);

    faqItems.forEach((other) => {
      if (other !== item) {
        other.classList.remove("is-open");
        const otherButton = other.querySelector(".faq-question");
        if (otherButton) {
          otherButton.setAttribute("aria-expanded", "false");
        }
      }
    });
  });
});

const videoModal = document.getElementById("video-modal");
const videoPreview = document.getElementById("video-modal-preview");
const videoLink = document.getElementById("video-modal-link");
const videoTriggers = document.querySelectorAll(".video-thumb");
const videoCloseButtons = document.querySelectorAll("[data-video-close]");

const openVideoModal = (trigger) => {
  if (!videoModal || !videoPreview || !videoLink) return;

  const videoId = trigger.dataset.videoId;
  const videoTitle = trigger.dataset.videoTitle || "Video";
  const href = trigger.getAttribute("href");

  if (videoId) {
    videoPreview.style.backgroundImage = `url('https://img.youtube.com/vi/${videoId}/hqdefault.jpg')`;
  }

  videoPreview.setAttribute("aria-label", videoTitle);
  videoLink.href = href || "#";

  videoModal.classList.add("is-open");
  videoModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeVideoModal = () => {
  if (!videoModal) return;
  videoModal.classList.remove("is-open");
  videoModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

videoTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openVideoModal(trigger);
  });
});

videoCloseButtons.forEach((button) => {
  button.addEventListener("click", closeVideoModal);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeVideoModal();
  }
});

const galleryTrack = document.querySelector(".gallery-track");
if (galleryTrack && galleryTrack.dataset.cloned !== "true") {
  const items = Array.from(galleryTrack.children);
  items.forEach((item) => {
    galleryTrack.appendChild(item.cloneNode(true));
  });
  galleryTrack.dataset.cloned = "true";
}

const getNavOffset = () => {
  if (!nav) return 0;
  return nav.getBoundingClientRect().height + 16;
};

const scrollToTarget = (hash, shouldUpdateUrl = true) => {
  if (!hash || hash === "#") return;
  const target = document.querySelector(hash);
  if (!target) return;

  const offset = getNavOffset();
  const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
  const top = Math.max(0, targetTop - offset);

  window.scrollTo({ top, behavior: "smooth" });

  if (shouldUpdateUrl) {
    history.pushState(null, "", hash);
  }
};

const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const hash = link.getAttribute("href");
    if (!hash || hash.length < 2) return;
    event.preventDefault();
    scrollToTarget(hash);
  });
});

window.addEventListener("hashchange", () => {
  if (window.location.hash) {
    scrollToTarget(window.location.hash, false);
  }
});

window.addEventListener("load", () => {
  if (window.location.hash) {
    scrollToTarget(window.location.hash, false);
  }
});

const supportsHover = window.matchMedia("(hover: hover)").matches;
if (supportsHover) {
  const tiltTargets = document.querySelectorAll(
    ".card, .chip, .step, .quote, .demo-panel, .screen"
  );
  const maxTilt = 6;

  tiltTargets.forEach((target) => {
    let rect = null;

    const handleMove = (event) => {
      if (!rect) rect = target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const xPercent = (x / rect.width - 0.5) * 2;
      const yPercent = (y / rect.height - 0.5) * 2;
      const rotateX = (yPercent * maxTilt * -1).toFixed(2);
      const rotateY = (xPercent * maxTilt).toFixed(2);
      target.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleLeave = () => {
      rect = null;
      target.style.transform = "";
    };

    target.addEventListener("mousemove", handleMove);
    target.addEventListener("mouseleave", handleLeave);
  });
}

const demoSteps = document.querySelectorAll(".demo-step");
const demoContents = document.querySelectorAll("[data-demo-content]");

const setDemoStep = (stepId) => {
  demoSteps.forEach((step) => {
    step.classList.toggle("is-active", step.dataset.demoStep === stepId);
  });

  demoContents.forEach((content) => {
    const isActive = content.dataset.demoContent === stepId;
    content.classList.toggle("is-active", isActive);

    if (isActive) {
      const countersInView = content.querySelectorAll("[data-count]");
      countersInView.forEach((counter) => animateCounter(counter));
    }
  });
};

if (demoSteps.length) {
  let demoIndex = 0;
  const demoOrder = Array.from(demoSteps).map((step) => step.dataset.demoStep);
  let demoTimer = null;
  const demoSection = document.querySelector(".demo");

  demoSteps.forEach((step) => {
    step.addEventListener("click", () => {
      demoIndex = demoOrder.indexOf(step.dataset.demoStep);
      setDemoStep(step.dataset.demoStep);
    });
  });

  const startDemoCycle = () => {
    demoTimer = window.setInterval(() => {
      demoIndex = (demoIndex + 1) % demoOrder.length;
      setDemoStep(demoOrder[demoIndex]);
    }, 5000);
  };

  const stopDemoCycle = () => {
    if (demoTimer) {
      window.clearInterval(demoTimer);
      demoTimer = null;
    }
  };

  if (demoSection) {
    demoSection.addEventListener("mouseenter", stopDemoCycle);
    demoSection.addEventListener("mouseleave", () => {
      if (!demoTimer) startDemoCycle();
    });
  }

  startDemoCycle();
}

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

const setFormStatus = (message, type = "") => {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.classList.remove("is-success", "is-error");
  if (type) {
    formStatus.classList.add(type);
  }
};

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const requiredFields = Array.from(
      contactForm.querySelectorAll("input[required]")
    );
    let hasError = false;

    requiredFields.forEach((field) => {
      const isValid = field.value.trim().length > 0;
      field.classList.toggle("is-invalid", !isValid);
      if (!isValid) hasError = true;
    });

    const emailField = contactForm.querySelector("input[type=\"email\"]");
    if (emailField) {
      const emailValue = emailField.value.trim();
      const emailValid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(emailValue);
      emailField.classList.toggle("is-invalid", !emailValid);
      if (!emailValid) hasError = true;
    }

    if (hasError) {
      setFormStatus("Revisa los campos marcados e intenta de nuevo.", "is-error");
      return;
    }

    const endpoint = contactForm.dataset.endpoint || "";
    if (endpoint.includes("YOUR_FORM_ID")) {
      setFormStatus(
        "Configura el endpoint del formulario para enviar la solicitud.",
        "is-error"
      );
      return;
    }

    setFormStatus("Enviando solicitud...");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        contactForm.reset();
        setFormStatus("Listo! Te contactaremos muy pronto.", "is-success");
      } else {
        setFormStatus(
          "No pudimos enviar la solicitud. Intenta nuevamente.",
          "is-error"
        );
      }
    } catch (error) {
      setFormStatus("Hubo un error al enviar. Intenta nuevamente.", "is-error");
    }
  });
}
