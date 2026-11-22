import { faTerminal } from "@fortawesome/free-solid-svg-icons";

const element = (tagName, className, children) => ({
  type: "element",
  tagName,
  properties: { className: className.split(" ") },
  children,
});

const text = (value) => ({ type: "text", value });

function terminalIcon() {
  const [width, height, , , path] = faTerminal.icon;
  const svg = element("svg", "code-terminal-icon", []);
  Object.assign(svg.properties, {
    viewBox: `0 0 ${width} ${height}`,
    width: "0.75rem",
    height: "0.75rem",
    fill: "currentColor",
    ariaHidden: "true",
  });
  svg.children.push({ type: "element", tagName: "path", properties: { d: path }, children: [] });
  return svg;
}

function formatBlock(block) {
  if (block.tagName === "table") return element("div", "table-wrap", [block]);
  if (block.tagName !== "pre") return block;

  return element("div", "code-wrap compact", [
    element("div", "code-top", [
      element("div", "code-top-label", [
        terminalIcon(),
        element("p", "code-caption", [text("Terminal")]),
      ]),
      element("div", "code-top-actions", []),
    ]),
    element("div", "code-body", [block]),
  ]);
}

export default function formatDocsArchive() {
  return (root, file) => {
    if (!file.path?.includes("/content/reference/0.2/")) return;

    const sections = [];
    let children = [];
    for (const block of root.children) {
      if (block.type !== "element" && !block.value?.trim()) continue;
      if (block.tagName === "h2" && children.length) {
        if (children.at(-1)?.tagName === "hr") children.pop();
        sections.push(element("section", "doc-section", children));
        children = [];
      }

      if (block.tagName === "h1") {
        children.push(element("p", "kicker", [text("mvmctl 0.2")]));
      } else if (block.tagName === "p" && children.at(-1)?.tagName === "h1") {
        block.properties.className = ["lead"];
      }

      children.push(formatBlock(block));
    }
    if (children.length) sections.push(element("section", "doc-section", children));
    root.children = sections;
  };
}
