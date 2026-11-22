import { injectCopyButtons } from "./copy";

injectCopyButtons();

const nav = document.querySelector<HTMLElement>(".right-toc");
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(
  "[data-docs-left-link][href^='#'], [data-docs-toc-link]",
));
const sections = Array.from(document.querySelectorAll<HTMLElement>(".article section[id]")).reverse();
const headings = new Map(sections.map((section) => [
  section,
  Array.from(section.querySelectorAll<HTMLElement>("h3[id]")).reverse(),
]));
const firstSection = sections[sections.length - 1];
const archiveHeadings = Array.from(document.querySelectorAll<HTMLElement>(
  ".archived-manual :is(h2, h3)[id]",
)).reverse();

const updateNavigation = () => {
  const threshold = (document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 80) + 60;
  const isAboveThreshold = (element: HTMLElement) => element.getBoundingClientRect().top <= threshold;
  const section = sections.find(isAboveThreshold) ?? firstSection;
  const heading = section
    ? headings.get(section)?.find(isAboveThreshold)
    : archiveHeadings.find(isAboveThreshold);

  let activeTocLink: HTMLAnchorElement | undefined;
  for (const link of links) {
    const id = link.hash.slice(1);
    const active = id === section?.id || id === heading?.id;
    if (active && link.closest(".right-toc")) activeTocLink = link;
    link.classList.toggle("active", active);
  }

  if (!nav || !activeTocLink) return;
  const linkBounds = activeTocLink.getBoundingClientRect();
  const navBounds = nav.getBoundingClientRect();
  if (linkBounds.top < navBounds.top || linkBounds.bottom > navBounds.bottom) {
    nav.scrollTop += linkBounds.top - navBounds.top - 8;
  }
};

let frame = 0;
const scheduleNavigation = () => {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    updateNavigation();
  });
};

window.addEventListener("scroll", scheduleNavigation, { passive: true });
window.addEventListener("resize", scheduleNavigation, { passive: true });
window.addEventListener("hashchange", scheduleNavigation);
scheduleNavigation();
