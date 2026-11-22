import type { CommandBlock, DocsNavItem, TocItem } from "./docs";

const release = "https://github.com/AlanD20/mvmctl/releases/download/v0.2.0";

export const quickstart02Nav: readonly DocsNavItem[] = [
  { id: "overview", label: "Overview", icon: "book" },
  { id: "before-you-begin", label: "Before you begin", icon: "chip" },
  { id: "install-mvm", label: "Install mvm", icon: "download" },
  { id: "initialize-the-host", label: "Initialize host", icon: "gear" },
  { id: "create-your-first-vm", label: "Create your first VM", icon: "play" },
  { id: "references", label: "References", icon: "terminal" },
];

export const quickstart02Toc: readonly TocItem[] = quickstart02Nav.flatMap(({ id, label }) =>
  id ? [{ id, label }] : [],
);

export const quickstart02 = {
  meta: {
    title: "mvmctl 0.2.0 documentation",
    intro: "Install mvmctl 0.2.0, set up your host, and create your first microVM.",
  },
  prerequisites: [
    "Linux on x86_64 or aarch64 with hardware virtualization. Check that <code>/dev/kvm</code> exists.",
    "Access to <code>/dev/kvm</code> and membership in the <code>kvm</code> group.",
    "Administrator access for the one-time host setup.",
    "The <code>nft</code> or <code>iptables</code> command for the chosen firewall backend. The default is nftables.",
  ],
  distroPackages: {
    ubuntu: {
      command: [
        "sudo apt-get install -y iproute2 iptables nftables qemu-utils e2fsprogs util-linux procps kmod openssh-client tar sudo passwd fakeroot",
      ],
    },
    arch: {
      command: [
        "sudo pacman -S --needed iproute2 iptables nftables qemu-img e2fsprogs util-linux procps-ng kmod openssh tar sudo shadow fakeroot",
      ],
    },
  },
  packageIntro:
    'Install the host tools for your distribution. See the <a href="https://github.com/AlanD20/mvmctl/blob/v0.2.0/docs/DEPENDENCIES.md">0.2 dependency guide</a> for optional provisioning tools.',
  installIntro: "Install the binary for your host architecture. These commands pin the download to v0.2.0.",
  installMethods: [
    {
      id: "x86-64",
      title: "Linux x86_64",
      description: "Use this download when uname -m reports x86_64.",
      icon: "download",
      code: [
        'mkdir -p "$HOME/.local/bin"',
        `curl -fL '${release}/mvm' -o "$HOME/.local/bin/mvm"`,
        'chmod +x "$HOME/.local/bin/mvm"',
        '"$HOME/.local/bin/mvm" --version',
      ],
    },
    {
      id: "arm64",
      title: "Linux aarch64",
      description: "Use this download when uname -m reports aarch64.",
      icon: "download",
      code: [
        'mkdir -p "$HOME/.local/bin"',
        `curl -fL '${release}/mvm-arm64' -o "$HOME/.local/bin/mvm"`,
        'chmod +x "$HOME/.local/bin/mvm"',
        '"$HOME/.local/bin/mvm" --version',
      ],
    },
  ] satisfies readonly CommandBlock[],
  installCallout:
    'Keep <code>~/.local/bin</code> on your PATH. Distribution packages and checksums are on the <a href="https://github.com/AlanD20/mvmctl/releases/tag/v0.2.0">v0.2.0 release page</a>.',
  hostInitIntro: "Run the first-time wizard from the account that will manage the VMs.",
  hostInitSections: [
    {
      title: "Set up your host and workspace",
      description:
        "The wizard can request sudo for host setup and guide you through selecting Firecracker, a kernel, an image, and an SSH key.",
      code: ["mvm init"],
      callout: "Log out and back in if the wizard adds your account to a group.",
    },
  ],
  firstVmIntro: "Pull a kernel and image if you skipped them during setup, then start a VM and connect.",
  firstVmSections: [
    {
      title: "Step by step",
      description: "Run a command through the guest agent, then remove the VM when you finish.",
      code: [
        "mvm kernel pull --type firecracker --default",
        "mvm image pull ubuntu:24.04 --default",
        "mvm vm create myvm --image ubuntu:24.04 --vcpu 2 --mem 2G --disk-size 20G",
        "mvm exec myvm -- uname -a",
        "mvm vm rm myvm",
      ],
      callouts: ["Vsock exec works without an SSH connection."],
    },
  ],
};
