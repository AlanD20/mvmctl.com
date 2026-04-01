import type { IconName } from "../../lib/icons";

export type CommandBlock = {
  id?: string;
  title: string;
  description?: string;
  icon?: IconName;
  code: readonly string[];
};

export type DocsNavItem = {
  id: string;
  label: string;
  icon: IconName;
};

export type TocItem = {
  id: string;
  label: string;
  level?: 2 | 3;
};

export const docsMeta = {
  title: "mvmctl documentation",
  intro:
    "Use this guide to install mvmctl, initialize your Linux host once, create your first microVM, and troubleshoot common issues using the current command set.",
} as const;

export const docsNav: readonly DocsNavItem[] = [
  { id: "overview", label: "Overview", icon: "book" },
  { id: "prerequisites", label: "Before you begin", icon: "chip" },
  { id: "install", label: "Install mvm", icon: "download" },
  { id: "host-init", label: "Initialize host", icon: "gear" },
  { id: "first-vm", label: "Create your first VM", icon: "play" },
  { id: "troubleshooting", label: "Troubleshooting", icon: "spanner" },
] as const;

export const docsToc: readonly TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "prerequisites", label: "Before you begin" },
  { id: "install", label: "Install mvm" },
  { id: "host-init", label: "Initialize host" },
  { id: "first-vm", label: "Create your first VM" },
  { id: "troubleshooting", label: "Troubleshooting" },
] as const;

export const prerequisites = [
  "Linux host (x86_64 or aarch64) with KVM support",
  "Access to /dev/kvm and membership in the kvm group",
  "Python 3.13+ for pip/pipx/source workflows",
  "Root access once for host setup (mvm init or mvm host init)",
] as const;

export const distroPackages = {
  ubuntu: {
    title: "Ubuntu / Debian packages",
    id: "ubuntu-packages",
    command: ["sudo apt-get install -y iproute2 iptables genisoimage qemu-utils"],
  },
  arch: {
    title: "Arch packages",
    id: "arch-packages",
    command: ["sudo pacman -S --needed iproute2 iptables libisoburn qemu-base"],
  },
} as const;

export const installMethods: readonly CommandBlock[] = [
  {
    id: "binary",
    title: "Binary",
    description: "No Python runtime required.",
    icon: "download",
    code: [
      "curl -L -o mvm https://github.com/AlanD20/mvmctl/releases/latest/download/mvm",
      "chmod +x mvm",
      "sudo mv mvm /usr/local/bin/",
      "mvm --help",
    ],
  },
  {
    id: "pipx",
    title: "pipx",
    description: "Isolated Python app install.",
    icon: "rocket",
    code: ["pipx install mvmctl", "mvm --help"],
  },
  {
    id: "pip",
    title: "pip",
    description: "Virtualenv or system install.",
    icon: "layers",
    code: ["pip install mvmctl", "mvm --help"],
  },
  {
    id: "source",
    title: "Source",
    description: "For local development or contribution.",
    icon: "fileCode",
    code: [
      "git clone https://github.com/AlanD20/mvmctl",
      "cd mvmctl",
      "uv sync",
      "uv run mvm --help",
    ],
  },
] as const;

export const hostInit: CommandBlock = {
  title: "Initialize host (required once)",
  description:
    "Run the interactive setup once to configure KVM permissions, networking, and defaults. After that, normal mvm commands should not require sudo.",
  code: ["mvm init", "# then log out/in or run: newgrp mvm"],
};

export const firstVm: readonly string[] = [
  "mvm key create test",
  "mvm key set-default test",
  "mvm kernel fetch",
  "mvm image fetch ubuntu-24.04",
  "mvm vm create --name myvm --image ubuntu-24.04",
  "mvm logs --name myvm --type boot --follow",
  "mvm ssh --name myvm",
  "mvm vm ls",
  "mvm vm rm --name myvm --force",
];

export const troubleshooting = [
  {
    problem: "Permission denied: /dev/kvm",
    fix: [
      "sudo usermod -aG kvm $USER",
      "# log out/in and verify: groups | grep kvm",
    ],
  },
  {
    problem: "Image not found: ubuntu-24.04",
    fix: ["mvm image fetch ubuntu-24.04", "mvm image ls"],
  },
  {
    problem: "SSH takes too long on first boot",
    fix: [
      "mvm logs --name myvm --type boot --follow",
      "# cloud-init can take around 30–60 seconds",
    ],
  },
] as const;
