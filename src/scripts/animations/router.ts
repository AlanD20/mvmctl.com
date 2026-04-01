import { initDocsAnimations } from "./docs";
import { initHomeAnimations } from "./home";

const normalizePath = (path: string) => {
  const trimmed = path.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
};

const getSamePageSectionId = (href: string | null, currentPathname: string) => {
  if (!href) {
    return null;
  }

  if (href.startsWith("#")) {
    const id = href.slice(1);
    return id || null;
  }

  try {
    const url = new URL(href, window.location.origin);
    if (normalizePath(url.pathname) !== normalizePath(currentPathname)) {
      return null;
    }

    return url.hash ? url.hash.slice(1) || null : null;
  } catch {
    return null;
  }
};

const getStickyOffset = () => {
  const navWrap = document.querySelector<HTMLElement>(".nav-wrap");
  if (!navWrap) {
    return 76;
  }

  return navWrap.getBoundingClientRect().height - 80;
};

const scrollToSection = (id: string) => {
  const target = document.getElementById(id);
  if (!target) {
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - getStickyOffset();
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
};

const scrollToHash = () => {
  const hash = window.location.hash;
  if (!hash) {
    return;
  }

  const id = hash.replace("#", "");
  if (!id) {
    return;
  }

  window.setTimeout(() => {
    scrollToSection(id);
  }, 120);
};

const handleAnchorClick = (event: Event) => {
  const target = event.currentTarget;
  if (!(target instanceof HTMLAnchorElement)) {
    return;
  }

  const href = target.getAttribute("href");
  const id = getSamePageSectionId(href, window.location.pathname);
  if (!id) {
    return;
  }

  event.preventDefault();
  scrollToSection(id);
  window.history.pushState(null, "", `#${id}`);
};

const bindAnchorOffsetScroll = () => {
  const links = document.querySelectorAll<HTMLAnchorElement>(
    ".site-header nav a[href*='#'], .hero-actions a[href*='#']",
  );

  links.forEach((link) => {
    if (link.dataset.anchorBound === "true") {
      return;
    }

    link.dataset.anchorBound = "true";
    link.addEventListener("click", handleAnchorClick);
  });
};

const runRouteAnimations = () => {
  const path = window.location.pathname;

  if (path.startsWith("/docs")) {
    initDocsAnimations();
  } else {
    initHomeAnimations();
  }

  if ((path === "/feature" || path === "/features") && !window.location.hash) {
    window.setTimeout(() => scrollToSection("features"), 90);
  }

  if (path === "/install" && !window.location.hash) {
    window.setTimeout(() => scrollToSection("install"), 90);
  }

  scrollToHash();
  bindAnchorOffsetScroll();

  window.requestAnimationFrame(() => {
    const restorePanels = (selector: string) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((panel) => {
        if (panel.hasAttribute("hidden")) {
          return;
        }

        panel.style.opacity = "1";
      });
    };

    restorePanels("[data-install-panel]");
    restorePanels("[data-doc-install-panel]");
    restorePanels("[data-package-panel]");
  });
};

let routeAnimationFrame = 0;
let routeInitTimer = 0;
let initialRouteBooted = false;

const scheduleAfterLayoutStable = (work: () => void) => {
  const run = () => {
    if (typeof window === "undefined" || !window.requestAnimationFrame) {
      work();
      return;
    }
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        work();
      });
    });
  };

  try {
    if (document.fonts && typeof document.fonts.ready?.then === "function") {
      document.fonts.ready
        .then(() => {
          run();
        })
        .catch(() => {
          run();
        });
      return;
    }
  } catch {
    // Fallback if fonts API throws
  }

  run();
};

const scheduleRouteAnimations = () => {
  if (routeAnimationFrame) {
    window.cancelAnimationFrame(routeAnimationFrame);
  }

  if (routeInitTimer) {
    window.clearTimeout(routeInitTimer);
  }

  routeInitTimer = window.setTimeout(() => {
    routeInitTimer = 0;

    const run = () => {
      if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
        routeAnimationFrame = window.requestAnimationFrame(() => {
          routeAnimationFrame = 0;
          runRouteAnimations();
        });
      } else {
        runRouteAnimations();
      }
    };

    if (!initialRouteBooted) {
      initialRouteBooted = true;
      scheduleAfterLayoutStable(run);
      return;
    }

    run();
  }, 40);
};

const runRouteAnimationsWhenReady = () => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleRouteAnimations, { once: true });
    return;
  }

  scheduleRouteAnimations();
};

if (document.documentElement.dataset.routeAnimationsBound !== "true") {
  document.documentElement.dataset.routeAnimationsBound = "true";
  document.addEventListener("astro:page-load", scheduleRouteAnimations);
}

runRouteAnimationsWhenReady();
