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
    // KEEP IN SYNC: when adding/removing CLI command groups, update this count
    { label: "Install paths", value: "3", icon: "download" as IconName },
    { label: "Command groups", value: "18", icon: "layers" as IconName },
    { label: "Primary platform", value: "Linux", icon: "server" as IconName },
  ],
  commandPreview: [
    "# interactive host setup",
    "mvm init",
    "mvm kernel pull --type firecracker",
    "mvm image pull ubuntu --version 24.04",
    "mvm vm create myvm --image ubuntu:24.04",
    "mvm exec myvm",
  ],
} as const;

export const features: Feature[] = [
  {
    title: "Fast as containers, isolated as VMs",
    description:
      "2-4 second boot with a dedicated kernel per VM. Rootfs is loop-mounted in-place — no extraction, no kernel sharing. Firecracker at the core, KVM isolation at the edges. Container-like ergonomics, real VM isolation.",
    bullets: [
      "2-4s boot with dedicated kernel per VM",
      "Loop-mount provisioner — mount, don't extract",
      "mvm vm create && mvm ssh — works like docker run, but with KVM",
    ],
    icon: "branch",
    stat: "2-4s boot · AWS Firecracker · KVM",
  },
  {
    title: "Everything you need, nothing you don't",
    description:
      "One statically-linked Go binary, no runtime dependencies. One command for the kernel, one for the image. mvmctl pulls every piece of the Firecracker stack so you don't have to hunt for matching versions.",
    bullets: [
      "Single binary — zero runtime deps, just drop it in your PATH",
      "mvm kernel pull — tuned kernels on demand",
      "mvm image pull — ready-to-boot images, or import from a running VM",
      "mvm init — idempotent host setup: KVM, bridges, firewall, sudoers",
    ],
    icon: "archive",
    stat: "kernel pull · image pull · host init",
  },
  {
    title: "No SSH required",
    description:
      "Commands, file transfer, and console access all work over vsock — no SSH daemon, no exposed ports, no guest networking needed.",
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
      "Atomic batch — all succeed or all roll back",
      "mvm env apply / mvm env destroy",
    ],
    icon: "layers",
    stat: "YAML · batch · env lifecycle",
  },
  {
    title: "Real host integration",
    description:
      "Run mvm init once and the host is ready — KVM, bridge networking, firewall, sudoers. Day-to-day commands never need sudo.",
    bullets: [
      "Idempotent mvm init — KVM, bridges, firewall, sudoers",
      "Named bridge networks with NAT via nftables or iptables",
      "Persistent volumes — attach, resize, detach, survive VM teardown",
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
    subtitle: "Recommended · no Go toolchain needed",
    icon: "download",
    steps: [
      "# See https://github.com/AlanD20/mvmctl/releases for all versions",
      "mkdir -p ~/.local/bin",
      "curl -L -o ~/.local/bin/mvm https://github.com/AlanD20/mvmctl/releases/latest/download/mvm",
      "chmod +x ~/.local/bin/mvm",
      "mvm --help",
    ],
  },
  {
    id: "aur",
    title: "AUR (Arch Linux)",
    subtitle: "Available as mvmctl-bin",
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
      "git clone https://github.com/AlanD20/mvmctl",
      "cd mvmctl",
      "./scripts/build.sh release --output ~/.local/bin/mvm",
      "mvm --help",
    ],
  },
];

export const docsTeaser = {
  title: "Installation + first-boot docs",
  description:
    "Follow a concise path from Linux prerequisites to host initialization and your first running VM.",
  cta: { href: "/docs/", label: "Open documentation" },
} as const;
