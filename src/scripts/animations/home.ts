import {
  animateInstallTabs,
  animateMicroInteractions,
  heroEntrance,
  injectCopyButtons,
  revealCode,
  revealGroup,
  revealUtilityHooks,
  setupScrollProgress,
  setupLandingNavSpy,
  setupNavWrapScroll,
  setupMotion,
} from "./motion";

export const initHomeAnimations = () => {
  const state = setupMotion();

  if (!state.disabled) {
    heroEntrance();
    revealGroup("[data-anim='feature-card']");
    revealGroup("[data-anim='install-card']");
    revealGroup("[data-anim='docs-teaser']");
    revealUtilityHooks();
    revealCode();
    animateInstallTabs();
    animateMicroInteractions();
  }

  injectCopyButtons();
  setupScrollProgress();
  setupNavWrapScroll();
  setupLandingNavSpy();
};
