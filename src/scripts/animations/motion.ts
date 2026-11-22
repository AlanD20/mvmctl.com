import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type HoverCleanup = {
  element: HTMLElement;
  onEnter: () => void;
  onLeave: () => void;
};

type MotionState =
  | { disabled: true }
  | {
      disabled: false;
      ScrollTrigger: {
        refresh: () => void;
      };
    };

const hoverCleanups: HoverCleanup[] = [];
let motionDisabled = false;

const shouldReduceMotion = () => {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  try {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    return mql.matches;
  } catch {
    return false;
  }
};

const hasHover = () => {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  try {
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    return mql.matches;
  } catch {
    return false;
  }
};

const getAnchorOffset = () => {
  const navWrap = document.querySelector<HTMLElement>(".nav-wrap");
  if (!navWrap) {
    return 76;
  }

  return navWrap.getBoundingClientRect().height;
};

const normalizePath = (path: string) => {
  const trimmed = path.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
};

const getLinkPath = (link: HTMLAnchorElement) => {
  const href = link.getAttribute("href") ?? "";
  if (!href || href.startsWith("#")) {
    return href;
  }

  try {
    return normalizePath(new URL(href, window.location.origin).pathname);
  } catch {
    return normalizePath(href);
  }
};

const setVisible = (node: HTMLElement) => {
  gsap.set(node, { clearProps: "all" });
};

const playReveal = (
  selector: string,
  options: {
    y?: number;
    x?: number;
    scale?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    start?: string;
    skipHiddenPanels?: boolean;
  } = {},
) => {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (!nodes.length) {
    return;
  }

  if (motionDisabled) {
    nodes.forEach(setVisible);
    return;
  }

  const y = options.y ?? 12;
  const x = options.x ?? 0;
  const scale = options.scale ?? 1;
  const duration = (options.duration ?? 460) / 1000;
  const delay = (options.delay ?? 0) / 1000;
  const stagger = (options.stagger ?? 0) / 1000;
  const start = options.start ?? "top 92%";

  nodes.forEach((node, index) => {
    if (node.dataset.revealBound === "true") {
      return;
    }

    if (options.skipHiddenPanels) {
      const hiddenTabPanel = node.closest<HTMLElement>(
        "[data-install-panel][hidden], [data-doc-install-panel][hidden], [data-package-panel][hidden]",
      );
      if (hiddenTabPanel) {
        node.dataset.revealBound = "true";
        setVisible(node);
        return;
      }
    }

    node.dataset.revealBound = "true";
    gsap.set(node, { opacity: 0, x, y, scale });

    gsap.to(node, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration,
      delay: delay + index * stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: node,
        start,
        toggleActions: "play none none reverse",
      },
    });
  });
};

const clearRevealBindings = () => {
  document.querySelectorAll<HTMLElement>("[data-reveal-bound='true']").forEach((node) => {
    delete node.dataset.revealBound;
    if (!node.hasAttribute("hidden")) {
      setVisible(node);
    }
  });
};

export const setupMotion = (): MotionState => {
  clearMotionListeners();
  motionDisabled = shouldReduceMotion();

  document.querySelectorAll<HTMLElement>("[data-anim='code-block']").forEach((block) => {
    setVisible(block);
  });

  const progressBar = document.querySelector<HTMLElement>(".scroll-progress [data-anim='scroll-progress-bar']");
  if (progressBar) {
    gsap.set(progressBar, { scaleX: 0 });
  }

  if (motionDisabled) {
    return { disabled: true };
  }

  return {
    disabled: false,
    ScrollTrigger: {
      refresh: () => ScrollTrigger.refresh(),
    },
  };
};

export const revealGroup = (selector: string, y = 12) => {
  playReveal(selector, { y, duration: 500, start: "top 112%" });
};

export const revealCode = (selector = "[data-anim='code-block']") => {
  playReveal(selector, {
    y: 6,
    duration: 450,
    start: "top 104%",
    skipHiddenPanels: true,
  });
};

export const animateInstallTabs = () => {
  if (!hasHover() || motionDisabled) {
    return;
  }

  const tabs = Array.from(document.querySelectorAll<HTMLElement>(".tab, .terminal-tab"));
  tabs.forEach((tab) => {
    if (tab.dataset.motionBound === "true") {
      return;
    }

    tab.dataset.motionBound = "true";

    const onEnter = () => {
      gsap.to(tab, { scale: 1.01, duration: 0.18, ease: "power1.out" });
    };

    const onLeave = () => {
      gsap.to(tab, { scale: 1, duration: 0.18, ease: "power1.out" });
    };

    tab.addEventListener("mouseenter", onEnter);
    tab.addEventListener("mouseleave", onLeave);
    hoverCleanups.push({ element: tab, onEnter, onLeave });
  });
};

export const setupScrollProgress = () => {
  const bar = document.querySelector<HTMLElement>("[data-anim='scroll-progress-bar']");
  if (!bar) {
    return;
  }

  gsap.fromTo(
    bar,
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    }
  );
};

export const setupNavWrapScroll = () => {
  const navWrap = document.querySelector<HTMLElement>(".nav-wrap");
  if (!navWrap) {
    return;
  }

  ScrollTrigger.create({
    trigger: document.body,
    start: "72px top",
    onEnter: () => navWrap.classList.add("scrolled"),
    onLeaveBack: () => navWrap.classList.remove("scrolled"),
  });
};

export const setupLandingNavSpy = () => {
  if (window.location.pathname.startsWith("/docs")) {
    return;
  }

  const desktopLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".site-header nav a"));
  const mobileLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".mobile-nav-dropdown a"));
  if (!desktopLinks.length && !mobileLinks.length) {
    return;
  }

  const currentPath = normalizePath(window.location.pathname);

  const homeLinks = [...desktopLinks, ...mobileLinks].filter((link) => {
    const path = getLinkPath(link);
    return path === "/" || path === "" || path.startsWith("/#");
  });

  const featureLinks = [...desktopLinks, ...mobileLinks].filter((link) => {
    const href = link.getAttribute("href") ?? "";
    const path = getLinkPath(link);
    if (path === "/feature" || path === "/features") {
      return true;
    }

    if ((currentPath === "/" || currentPath === "/feature" || currentPath === "/features") && href.includes("#features")) {
      return true;
    }

    return false;
  });

  const installLinks = [...desktopLinks, ...mobileLinks].filter((link) => {
    const href = link.getAttribute("href") ?? "";
    const path = getLinkPath(link);
    if (path === "/install") {
      return true;
    }

    if ((currentPath === "/" || currentPath === "/install") && href.includes("#install")) {
      return true;
    }

    return false;
  });

  const featuresSection = document.getElementById("features");
  const installSection = document.getElementById("install");

  if (!homeLinks.length || !featureLinks.length || !installLinks.length || !featuresSection || !installSection) {
    return;
  }

  const setActive = (link: HTMLAnchorElement, active: boolean) => {
    link.classList.toggle("active", active);
    if (active) {
      link.setAttribute("aria-current", "page");
      return;
    }

    link.removeAttribute("aria-current");
  };

  const updateActive = (activeSection: "home" | "features" | "install") => {
    homeLinks.forEach((link) => setActive(link, activeSection === "home"));
    featureLinks.forEach((link) => setActive(link, activeSection === "features"));
    installLinks.forEach((link) => setActive(link, activeSection === "install"));
  };

  const offset = getAnchorOffset() + 14;

  const updateSpy = () => {
    const scrollY = window.scrollY;
    const featuresTop = featuresSection.getBoundingClientRect().top + scrollY - offset;
    const installTop = installSection.getBoundingClientRect().top + scrollY - offset;

    let activeSection: "home" | "features" | "install" = "home";

    if (scrollY >= installTop - 5) {
      activeSection = "install";
    } else if (scrollY >= featuresTop - 5) {
      activeSection = "features";
    }

    updateActive(activeSection);
  };

  ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    onUpdate: updateSpy,
  });

  updateSpy();
};

export const clearMotionListeners = () => {
  hoverCleanups.forEach(({ element, onEnter, onLeave }) => {
    element.removeEventListener("mouseenter", onEnter);
    element.removeEventListener("mouseleave", onLeave);
    delete element.dataset.motionBound;
    gsap.set(element, { clearProps: "transform" });
  });

  document.querySelectorAll<HTMLAnchorElement>("[data-anchor-bound='true']").forEach((link) => {
    delete link.dataset.anchorBound;
  });

  hoverCleanups.length = 0;
  clearRevealBindings();

  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.killTweensOf("*");
};

export const heroEntrance = () => {
  playReveal("[data-anim='hero-grid']", { y: 0, scale: 1.05, duration: 800, delay: 0 });
  playReveal("[data-anim='hero-title']", { y: 22, duration: 620, delay: 220 });
  playReveal("[data-anim='hero-desc']", { y: 14, duration: 520, delay: 280 });
  playReveal("[data-anim='hero-actions']", { y: 10, duration: 450, delay: 320 });
  playReveal("[data-anim='hero-panel']", { x: 20, y: 0, duration: 580, delay: 280 });
  playReveal("[data-anim='hero-metrics'] article", { y: 10, duration: 350, delay: 360, stagger: 80 });
};

export const revealUtilityHooks = () => {
  playReveal("[data-anim='badge']", { y: 6, duration: 420 });
  playReveal("[data-anim='btn']", { y: 8, duration: 420 });
  playReveal("[data-anim='section']", { y: 24, duration: 600 });
  playReveal("[data-anim='install-grid']", { y: 16, duration: 520 });
  playReveal("[data-anim='install-tabs']", { y: 12, duration: 480, delay: 100 });
  playReveal("[data-anim='docs-card-grid']", { y: 16, duration: 520 });
  playReveal("[data-anim='docs-package-tabs']", { y: 12, duration: 480, delay: 100 });
  playReveal("[data-anim='docs-install-tabs']", { y: 12, duration: 480, delay: 100 });
};

export const animateMicroInteractions = () => {
  if (!hasHover() || motionDisabled) {
    return;
  }

  const bindHover = (selector: string, scaleUp: number, duration: number) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      if (el.dataset.motionBound === "true") return;
      el.dataset.motionBound = "true";
      
      const onEnter = () => gsap.to(el, { scale: scaleUp, duration, ease: "power2.out" });
      const onLeave = () => gsap.to(el, { scale: 1, duration, ease: "power2.out" });
      
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      hoverCleanups.push({ element: el, onEnter, onLeave });
    });
  };

  bindHover("[data-anim='brand-dot']", 1.15, 0.2);
  bindHover("[data-anim='nav-link']", 1.02, 0.15);
};
