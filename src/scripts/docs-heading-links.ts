import { faCheck, faCircleInfo, faLink } from "@fortawesome/free-solid-svg-icons";

const icons = { check: faCheck, info: faCircleInfo, link: faLink };

function setIcon(slot: HTMLElement, icon: keyof typeof icons) {
  const [width, height, , , paths] = icons[icon].icon;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("width", "12");
  svg.setAttribute("height", "12");
  svg.setAttribute("fill", "currentColor");
  svg.setAttribute("aria-hidden", "true");
  for (const data of Array.isArray(paths) ? paths : [paths]) {
    const path = document.createElementNS(svg.namespaceURI, "path");
    path.setAttribute("d", data);
    svg.append(path);
  }
  slot.replaceChildren(svg);
}

export function addDocsHeadingLinks() {
  const headings = new Map<HTMLElement, string>();
  for (const section of document.querySelectorAll<HTMLElement>(".article .doc-section[id]")) {
    const heading = section.querySelector<HTMLElement>("h1, h2, h3");
    if (heading) headings.set(heading, section.id);
  }
  for (const heading of document.querySelectorAll<HTMLElement>(".article h3[id], .archived-manual h2[id]")) {
    headings.set(heading, heading.id);
  }
  if (!headings.size) return;

  const status = document.createElement("p");
  status.className = "sr-only";
  status.setAttribute("role", "status");
  document.body.append(status);

  for (const [heading, target] of headings) {
    const label = heading.textContent?.trim() || target;
    const wrap = document.createElement("span");
    wrap.className = "heading-anchor-wrap";
    const button = document.createElement("button");
    button.className = "heading-anchor-btn";
    button.type = "button";
    button.setAttribute("aria-label", `Copy link to ${label}`);
    const icon = document.createElement("span");
    icon.className = "heading-anchor-icon";
    setIcon(icon, "link");
    button.append(icon);
    wrap.append(button);
    heading.append(wrap);

    let resetTimer = 0;
    button.addEventListener("click", async () => {
      window.clearTimeout(resetTimer);
      button.classList.remove("copied", "failed");
      const url = new URL(window.location.pathname, window.location.origin);
      url.hash = target;
      try {
        await navigator.clipboard.writeText(url.href);
        setIcon(icon, "check");
        button.classList.add("copied");
        status.textContent = `Copied link to ${label}.`;
      } catch {
        setIcon(icon, "info");
        button.classList.add("failed");
        status.textContent = `Could not copy link to ${label}.`;
      }
      resetTimer = window.setTimeout(() => {
        setIcon(icon, "link");
        button.classList.remove("copied", "failed");
      }, 1100);
    });
  }
}
