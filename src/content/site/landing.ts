import type { IconName } from "../../lib/icons";

export type InstallMethod = {
  id: string;
  title: string;
  subtitle: string;
  steps: string[];
  icon: IconName;
};

export type Feature = {
  title: string;
  description: string;
  bullets: string[];
  icon: IconName;
  stat: string;
};

export const navLinks = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/#features", label: "Features", icon: "sparkles" },
  { href: "/#install", label: "Install", icon: "download" },
  { href: "/docs/", label: "Docs", icon: "book" },
] as const;

export const hero = {
  badge: "MVMCTL · CONTAINER SPEED, VM ISOLATION",
  title: "Manage microVMs with one focused CLI",
  description:
    "mvmctl is the modern way to run microVMs — get the startup speed of containers with the security and isolation of traditional VMs. Built for developers who need lightweight, fast-booting virtual machines without the overhead.",
  primaryCta: { href: "#install", label: "Install mvm" },
  secondaryCta: { href: "/docs/", label: "Read docs" },
  tertiaryCta: { href: "https://github.com/AlanD20/mvmctl", label: "GitHub" },
  metrics: [
    { label: "Install paths", value: "4", icon: "download" as IconName },
    { label: "Core command groups", value: "8+", icon: "layers" as IconName },
    { label: "Primary platform", value: "Linux", icon: "server" as IconName },
  ],
  commandPreview: [
    "# one-time host setup",
    "sudo mvm host init",
    "mvm kernel fetch",
    "mvm image fetch ubuntu-24.04",
    "mvm vm create --name myvm --image ubuntu-24.04",
    "mvm vm ssh --name myvm",
  ],
} as const;

export const features: Feature[] = [
  {
    title: "Lifecycle in one flow",
    description:
      "From first boot to teardown, mvm keeps the lifecycle predictable with command groups for host, kernel, image, VM, network, keys, and config.",
    bullets: [
      "Create, list, remove, and prune VMs",
      "Stream boot and process logs",
      "Snapshot and restore running VMs",
    ],
    icon: "branch",
    stat: "create → ssh → snapshot → rm",
  },
  {
    title: "Real host integration",
    description:
      "mvm is built for Linux + KVM and includes one-time host initialization to set up prerequisites, networking, and permissions correctly.",
    bullets: [
      "KVM-aware setup and checks",
      "Bridge networking and named networks",
      "Idempotent host init with cleanup options",
    ],
    icon: "network",
    stat: "KVM + bridge networking",
  },
  {
    title: "Production-minded defaults",
    description:
      "Use a standalone binary, pipx, pip, or source install while keeping assets and configuration organized under cache/config directories.",
    bullets: [
      "Binary and Python package distribution",
      "Cloud-init support including nocloud-net",
      "Managed defaults for kernels, images, and binaries",
    ],
    icon: "archive",
    stat: "repeatable machine setup",
  },
];

export const installMethods: InstallMethod[] = [
  {
    id: "binary",
    title: "Prebuilt binary",
    subtitle: "Recommended · no Python runtime needed",
    icon: "download",
    steps: [
      "curl -L -o mvm https://github.com/AlanD20/mvmctl/releases/latest/download/mvm",
      "chmod +x mvm",
      "sudo mv mvm /usr/local/bin/",
      "mvm --help",
    ],
  },
  {
    id: "pipx",
    title: "pipx",
    subtitle: "Isolated Python app install",
    icon: "rocket",
    steps: ["pipx install mvmctl", "mvm --help"],
  },
  {
    id: "pip",
    title: "pip",
    subtitle: "System or virtualenv install",
    icon: "layers",
    steps: ["pip install mvmctl", "mvm --help"],
  },
  {
    id: "source",
    title: "From source",
    subtitle: "For development and contribution",
    icon: "fileCode",
    steps: [
      "git clone https://github.com/AlanD20/mvmctl",
      "cd mvmctl",
      "uv sync",
      "uv run mvm --help",
    ],
  },
];

export const docsTeaser = {
  title: "Installation + first-boot docs",
  description:
    "Follow a concise path from Linux prerequisites to host initialization and your first running VM.",
  cta: { href: "/docs/", label: "Open documentation" },
} as const;
