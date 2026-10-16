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
  { href: "https://github.com/AlanD20/mvmctl/releases", label: "Releases", icon: "download" },
] as const;

export const hero = {
  badge: "MVMCTL · CONTAINER SPEED, VM ISOLATION",
  title: "Manage microVMs with one focused CLI",
  description:
    "mvmctl is the modern way to run microVMs — get the startup speed of containers with the security and isolation of traditional VMs. Built for developers who need lightweight, fast-booting virtual machines without the overhead.",
  primaryCta: { href: "#install", label: "Install mvm" },
  secondaryCta: { href: "/docs/", label: "Read docs" },
  tertiaryCta: { href: "https://github.com/AlanD20/mvmctl/releases", label: "GitHub Releases" },
  quaternaryCta: { href: "https://github.com/AlanD20/mvmctl", label: "Repository" },
  metrics: [
    { label: "Interface", value: "One CLI", icon: "download" as IconName },
    { label: "Environments", value: "YAML", icon: "layers" as IconName },
    { label: "Primary platform", value: "Linux", icon: "server" as IconName },
  ],
  commandPreview: [
    "# after system installation and host setup",
    "mvm init --skip-host --non-interactive --binary-version 1.17.0",
    "mvm kernel pull --type firecracker --default",
    "mvm image pull ubuntu:24.04 --default",
    "mvm vm create myvm --image ubuntu:24.04",
    "mvm exec myvm",
  ],
} as const;

export const features: Feature[] = [
  {
    title: "Lightweight VMs, separate kernels",
    description:
      "Run each workload in a Firecracker microVM with its own kernel. Create, connect, and stop from one CLI, with KVM isolation between guests.",
    bullets: [
      "Dedicated kernel per VM",
      "Isolated VM processes and protected disks",
      "mvm vm create && mvm ssh — works like docker run, but with KVM",
    ],
    icon: "branch",
    stat: "Firecracker · KVM · isolated guests",
  },
  {
    title: "Everything you need, nothing you don't",
    description:
      "One installed mvm binary manages your VMs, kernels and images. Host setup prepares the permissions you need; everyday commands run as your own user.",
    bullets: [
      "Single system-wide binary, with standard Linux host packages",
      "mvm kernel pull — tuned kernels on demand",
      "mvm image pull — ready-to-boot images, or import from a running VM",
      "mvm init — prepare your operator cache and default assets",
    ],
    icon: "archive",
    stat: "kernel pull · image pull · host init",
  },
  {
    title: "No SSH required",
    description:
      "Run commands and transfer files over vsock, a host-to-guest connection that needs no guest network. Use the serial console for interactive boot access.",
    bullets: [
      "mvm exec — run commands via embedded vsock agent",
      "mvm cp — file transfer over vsock, no tar-over-SSH",
      "mvm console — serial console relay via PTY + Unix socket",
    ],
    icon: "terminal",
    stat: "vsock agent · console · file transfer",
  },
  {
    title: "Environment as code",
    description:
      "Define complete VM environments in a single YAML spec. One command to apply, one to destroy. Batch creation with atomic rollback.",
    bullets: [
      "Declarative YAML with dependency ordering",
      "Optional atomic batch — attempts rollback on failure",
      "mvm env apply / mvm env destroy",
    ],
    icon: "layers",
    stat: "YAML · batch · env lifecycle",
  },
  {
    title: "Real host integration",
    description:
      "After administrator setup, manage VMs as your own user. Each VM gets an isolated network namespace; explicit policies control traffic between guests.",
    bullets: [
      "One-time system installation and operator enrollment",
      "Managed networks with NAT and nftables enforcement",
      "Persistent raw volumes; stop attached VMs before growing them",
    ],
    icon: "network",
    stat: "bridge networking · volumes · NAT",
  },
  {
    title: "Custom kernels & snapshots",
    description:
      "Pre-built Firecracker kernels or custom official builds with extra features. Snapshot a running VM and restore it later, state intact.",
    bullets: [
      "Firecracker CI kernels or custom builds with --features",
      "Kernel config overlays for advanced use cases",
      "Snapshot running VMs and restore later",
    ],
    icon: "gear",
    stat: "kernel builds · snapshots · restore",
  },
  {
    title: "SSH that just works",
    description:
      "Import or generate keys with mvm key, set defaults — every VM picks them up automatically. No cloud-init edits, no post-bake injection.",
    bullets: [
      "mvm key import — add existing host keys to the cache",
      "mvm key create — generate keypairs, set as default",
      "Defaults auto-inject on mvm vm create, no --ssh-key flag needed",
      "mvm ssh <vm> — full shell, private key auto-detected",
    ],
    icon: "rocket",
    stat: "mvm key import · defaults · auto-inject",
  },
];

export const installMethods: InstallMethod[] = [
  {
    id: "binary",
    title: "Prebuilt binary",
    subtitle: "For v0.3.0 once published · no Go toolchain needed",
    icon: "download",
    steps: [
      "curl -fL -o ./mvm https://github.com/AlanD20/mvmctl/releases/download/v0.3.0/mvm",
      "chmod +x ./mvm",
      "sudo ./mvm host install-system",
      "sudo /usr/local/bin/mvm host init",
    ],
  },
  {
    id: "aur",
    title: "AUR (Arch Linux)",
    subtitle: "Check that mvmctl-bin provides 0.3.0 before following this guide",
    icon: "download",
    steps: [
      "yay -S mvmctl-bin",
      "mvm --help",
    ],
  },
  {
    id: "source",
    title: "From source",
    subtitle: "For development and contribution",
    icon: "fileCode",
    steps: [
      "git clone --branch 0.3.0-release https://github.com/AlanD20/mvmctl",
      "cd mvmctl",
      "./scripts/build.sh release --version 0.3.0-rc.1",
      "sudo ./dist/mvm host install-system",
      "sudo /usr/local/bin/mvm host init",
    ],
  },
];

export const docsTeaser = {
  title: "Installation + first-boot docs",
  description:
    "Follow a concise path from Linux prerequisites to host initialization and your first running VM.",
  cta: { href: "/docs/", label: "Open documentation" },
} as const;
