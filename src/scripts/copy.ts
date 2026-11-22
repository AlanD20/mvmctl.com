import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";

export const injectCopyButtons = (selector = ".code-wrap") => {
  const wrappers = Array.from(document.querySelectorAll<HTMLElement>(selector));

  const setCopyIcon = (slot: SVGSVGElement, iconName: "copy" | "check") => {
    const [w, h, , , pathData] = (iconName === "copy" ? faCopy : faCheck).icon;
    slot.setAttribute("viewBox", `0 0 ${w} ${h}`);
    while (slot.firstChild) {
      slot.removeChild(slot.firstChild);
    }

    const pathList = Array.isArray(pathData) ? pathData : [pathData];
    pathList.forEach((pathItem) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", pathItem);
      slot.appendChild(path);
    });
  };

  wrappers.forEach((wrapper) => {
    const existing = wrapper.querySelector<HTMLElement>(".copy-btn-wrap");
    if (existing) {
      return;
    }

    const pre = wrapper.querySelector("pre");
    const code = wrapper.querySelector("code");
    if (!pre || !code) {
      return;
    }

    const actionSlot = wrapper.querySelector<HTMLElement>(".code-top-actions");
    if (!actionSlot) {
      return;
    }

    const wrap = document.createElement("span");
    wrap.className = "copy-btn-wrap";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-btn";
    btn.setAttribute("aria-label", "Copy code");

    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("width", "12");
    icon.setAttribute("height", "12");
    icon.setAttribute("fill", "currentColor");

    setCopyIcon(icon, "copy");
    btn.append(icon);
    wrap.append(btn);
    wrapper.classList.add("with-copy");
    actionSlot.appendChild(wrap);

    let resetTimer = 0;

    btn.addEventListener("click", async () => {
      if (resetTimer) {
        window.clearTimeout(resetTimer);
      }

      btn.classList.remove("failed", "copied");
      setCopyIcon(icon, "copy");

      try {
        if (!window.isSecureContext) {
          throw new Error("Clipboard API requires secure context");
        }

        if (!navigator.clipboard || typeof navigator.clipboard.writeText !== "function") {
          throw new Error("Clipboard API not available");
        }
        await navigator.clipboard.writeText(code.textContent ?? "");
        btn.classList.add("copied");
        setCopyIcon(icon, "check");

        resetTimer = window.setTimeout(() => {
          btn.classList.remove("copied");
          setCopyIcon(icon, "copy");
        }, 1100);
      } catch {
        btn.classList.add("failed");
        setCopyIcon(icon, "copy");
      }
    });
  });
};
