import {
  animateMicroInteractions,
  docsEntrance,
  injectCopyButtons,
  revealCode,
  revealGroup,
  revealUtilityHooks,
  setupDocsAnchorOffsets,
  setupDocsSpy,
  setupNavWrapScroll,
  setupScrollProgress,
  setupMotion,
} from "./motion";

export const initDocsAnimations = () => {
  const state = setupMotion();

  if (!state.disabled) {
    docsEntrance();
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
  setupDocsAnchorOffsets();
  setupScrollProgress();
  setupNavWrapScroll();
};
