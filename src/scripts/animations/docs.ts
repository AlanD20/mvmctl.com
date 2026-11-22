import {
  animateMicroInteractions,
  injectCopyButtons,
  revealCode,
  revealGroup,
  revealUtilityHooks,
  setupDocsSpy,
  setupNavWrapScroll,
  setupScrollProgress,
  setupMotion,
} from "./motion";

export const initDocsAnimations = () => {
  const state = setupMotion();

  if (!state.disabled) {
    revealGroup("[data-anim='section-head']", 14);
    revealGroup("[data-anim='docs-card']", 16);
    revealGroup("[data-anim='docs-notice']", 10);
    revealGroup("[data-anim='docs-quick']", 10);
    revealUtilityHooks();
    revealCode();
    animateMicroInteractions();
  }

  injectCopyButtons();
  setupDocsSpy();
  setupScrollProgress();
  setupNavWrapScroll();
};
