import type { IconName } from "../../lib/icons";

/* ───────────────────────────────────────────────────────────────
   TYPES
   ─────────────────────────────────────────────────────────────── */

export type CommandBlock = {
  id?: string;
  title: string;
  description?: string;
  icon?: IconName;
  code: readonly string[];
};

export type DocsNavItem = {
  id?: string;
  label: string;
  icon: IconName;
  href?: string;
  children?: readonly DocsNavItem[];
};

export type TocItem = {
  id: string;
  label: string;
  level?: 2 | 3;
};

/* ───────────────────────────────────────────────────────────────
   METADATA
   ─────────────────────────────────────────────────────────────── */

export const docsMeta = {
  title: "mvmctl documentation",
  intro:
    "Everything you need to install, configure, and manage microVMs with mvmctl. Covers every command with explanations, callouts, and real-world examples.",
} as const;

export const docsNav: readonly DocsNavItem[] = [
  { id: "overview", label: "Overview", icon: "book" },
  { id: "prerequisites", label: "Before you begin", icon: "chip" },
  { id: "install", label: "Install mvm", icon: "download" },
  { id: "host-initialize", label: "Initialize host", icon: "gear" },
  { id: "first-vm", label: "Create your first VM", icon: "play" },
  {
    id: "vm-create",
    label: "mvm vm create",
    icon: "terminal",
    children: [{ id: "vm-create-flags", label: "All flags", icon: "terminal" }],
  },
  {
    id: "vm-lifecycle",
    label: "VM Lifecycle",
    icon: "terminal",
    children: [
      { id: "vm-lifecycle-ssh", label: "SSH access", icon: "terminal" },
      { id: "vm-lifecycle-console", label: "Console access", icon: "terminal" },
      { id: "vm-lifecycle-logs", label: "Logs", icon: "terminal" },
      { id: "vm-lifecycle-snapshot", label: "Snapshots", icon: "terminal" },
      { id: "vm-lifecycle-cp", label: "Copy files (mvm cp)", icon: "terminal" },
      { id: "vm-lifecycle-rm", label: "Removing VMs", icon: "terminal" },
    ],
  },
  {
    id: "resource-management",
    label: "Resource Management",
    icon: "archive",
    children: [
      {
        id: "resource-management-image",
        label: "Image management",
        icon: "archive",
      },
      {
        id: "resource-management-kernel",
        label: "Kernel management",
        icon: "archive",
      },
      {
        id: "resource-management-bin",
        label: "Binary management",
        icon: "archive",
      },
      {
        id: "resource-management-key",
        label: "SSH key management",
        icon: "archive",
      },
      {
        id: "resource-management-volume",
        label: "Volume management",
        icon: "archive",
      },
    ],
  },
  { id: "network-management", label: "Network Management", icon: "network" },
  { id: "configuration", label: "Configuration", icon: "gear" },
  { id: "dependencies", label: "Dependencies", icon: "chip" },
  { id: "cloud-init", label: "Cloud-Init", icon: "layers" },
  { id: "troubleshooting", label: "Troubleshooting", icon: "spanner" },
  { href: "/docs/api/", label: "API Reference", icon: "terminal" },
] as const;

export const docsQuickstartToc: readonly TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "prerequisites", label: "Before you begin" },
  { id: "install", label: "Install mvm" },
  { id: "host-initialize", label: "Initialize host" },
  { id: "first-vm", label: "Create your first VM" },
  { id: "vm-create", label: "mvm vm create" },
  { id: "vm-create-flags", label: "All vm create flags", level: 3 },
  { id: "vm-lifecycle", label: "VM Lifecycle" },
  { id: "vm-lifecycle-ssh", label: "SSH access", level: 3 },
  { id: "vm-lifecycle-console", label: "Console access", level: 3 },
  { id: "vm-lifecycle-logs", label: "Logs", level: 3 },
  { id: "vm-lifecycle-snapshot", label: "Snapshots", level: 3 },
  { id: "vm-lifecycle-cp", label: "Copy files (mvm cp)", level: 3 },
  { id: "vm-lifecycle-rm", label: "Removing VMs", level: 3 },
  { id: "resource-management", label: "Resource Management" },
  { id: "resource-management-image", label: "Image management", level: 3 },
  { id: "resource-management-kernel", label: "Kernel management", level: 3 },
  { id: "resource-management-bin", label: "Binary management", level: 3 },
  { id: "resource-management-key", label: "SSH key management", level: 3 },
  { id: "resource-management-volume", label: "Volume management", level: 3 },
  { id: "network-management", label: "Network Management" },
  { id: "configuration", label: "Configuration" },
  { id: "dependencies", label: "Dependencies" },
  { id: "cloud-init", label: "Cloud-Init" },
  { id: "troubleshooting", label: "Troubleshooting" },
] as const;

export const docsApiToc: readonly TocItem[] = [
  { id: "api-overview", label: "Overview" },
  { id: "api-import-pattern", label: "Import Pattern" },
  { id: "api-module-overview", label: "Module Overview" },
  { id: "api-data-models", label: "Data Models" },
  { id: "api-model-vmstatus", label: "VMStatus", level: 3 },
  { id: "api-model-vminstanceitem", label: "VMInstanceItem", level: 3 },
  { id: "api-model-networkitem", label: "NetworkItem", level: 3 },
  { id: "api-model-imageitem", label: "ImageItem", level: 3 },
  { id: "api-model-kernelitem", label: "KernelItem", level: 3 },
  { id: "api-model-binaryitem", label: "BinaryItem", level: 3 },
  { id: "api-model-sshkeyitem", label: "SSHKeyItem", level: 3 },
  { id: "api-model-volumeitem", label: "VolumeItem", level: 3 },
  { id: "api-error-handling", label: "Error Handling" },
  { id: "api-vm-operation", label: "VMOperation", level: 3 },
  { id: "api-network-operation", label: "NetworkOperation", level: 3 },
  { id: "api-image-operation", label: "ImageOperation", level: 3 },
  { id: "api-kernel-operation", label: "KernelOperation", level: 3 },
  { id: "api-key-operation", label: "KeyOperation", level: 3 },
  { id: "api-binary-operation", label: "BinaryOperation", level: 3 },
  { id: "api-volume-operation", label: "VolumeOperation", level: 3 },
  { id: "api-console-operation", label: "ConsoleOperation", level: 3 },
  { id: "api-log-operation", label: "LogOperation", level: 3 },
  { id: "api-config-operation", label: "ConfigOperation", level: 3 },
  { id: "api-host-operation", label: "HostOperation", level: 3 },
  { id: "api-cache-operation", label: "CacheOperation", level: 3 },
  { id: "api-ssh-operation", label: "SSHOperation", level: 3 },
  { id: "api-init-operation", label: "InitOperation", level: 3 },
  { id: "api-end-to-end", label: "End-to-End Example" },
] as const;

export const apiDocsNav: readonly DocsNavItem[] = [
  { href: "/docs/", label: "Documentation", icon: "book" },
  { id: "api-overview", label: "Overview", icon: "terminal" },
  { id: "api-import-pattern", label: "Import Pattern", icon: "terminal" },
  { id: "api-module-overview", label: "Module Overview", icon: "terminal" },
  {
    id: "api-data-models",
    label: "Data Models",
    icon: "archive",
    children: [
      { id: "api-model-vmstatus", label: "VMStatus", icon: "archive" },
      {
        id: "api-model-vminstanceitem",
        label: "VMInstanceItem",
        icon: "archive",
      },
      { id: "api-model-networkitem", label: "NetworkItem", icon: "archive" },
      { id: "api-model-imageitem", label: "ImageItem", icon: "archive" },
      { id: "api-model-kernelitem", label: "KernelItem", icon: "archive" },
      { id: "api-model-binaryitem", label: "BinaryItem", icon: "archive" },
      { id: "api-model-sshkeyitem", label: "SSHKeyItem", icon: "archive" },
      { id: "api-model-volumeitem", label: "VolumeItem", icon: "archive" },
    ],
  },
  { id: "api-error-handling", label: "Error Handling", icon: "spanner" },
  { id: "api-vm-operation", label: "VMOperation", icon: "terminal" },
  { id: "api-network-operation", label: "NetworkOperation", icon: "terminal" },
  { id: "api-image-operation", label: "ImageOperation", icon: "terminal" },
  { id: "api-kernel-operation", label: "KernelOperation", icon: "terminal" },
  { id: "api-key-operation", label: "KeyOperation", icon: "terminal" },
  { id: "api-binary-operation", label: "BinaryOperation", icon: "terminal" },
  { id: "api-volume-operation", label: "VolumeOperation", icon: "terminal" },
  { id: "api-console-operation", label: "ConsoleOperation", icon: "terminal" },
  { id: "api-log-operation", label: "LogOperation", icon: "terminal" },
  { id: "api-config-operation", label: "ConfigOperation", icon: "terminal" },
  { id: "api-host-operation", label: "HostOperation", icon: "terminal" },
  { id: "api-cache-operation", label: "CacheOperation", icon: "terminal" },
  { id: "api-ssh-operation", label: "SSHOperation", icon: "terminal" },
  { id: "api-init-operation", label: "InitOperation", icon: "terminal" },
  { id: "api-end-to-end", label: "End-to-End Example", icon: "play" },
] as const;

/* ───────────────────────────────────────────────────────────────
   PREREQUISITES
   ─────────────────────────────────────────────────────────────── */

export const prerequisites = [
  "Linux host (x86_64 or aarch64) with KVM support — check with <code>ls /dev/kvm</code>",
  "Access to <code>/dev/kvm</code> and membership in the <code>kvm</code> group",
  "Python 3.13+ for pip/pipx/source installs",
  "Root access once for host setup (<code>mvm init</code> or <code>sudo mvm host init</code>)",
  "<code>nftables</code> for NAT and firewall rules (default backend)",
] as const;

export const distroPackages = {
  ubuntu: {
    title: "Ubuntu / Debian packages",
    id: "ubuntu-packages",
    command: [
      "sudo apt-get install -y iproute2 iptables nftables cloud-image-utils qemu-img e2fsprogs kmod",
    ],
  },
  arch: {
    title: "Arch packages",
    id: "arch-packages",
    command: ["sudo pacman -S --needed iproute2 iptables nftables cloud-utils qemu-img e2fsprogs kmod"],
  },
} as const;

/* ───────────────────────────────────────────────────────────────
   INSTALL
   ─────────────────────────────────────────────────────────────── */

export const installMethods: readonly CommandBlock[] = [
  {
    id: "binary",
    title: "Binary",
    description: "No Python runtime required. Best for production machines.",
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
    description:
      "Isolated Python app install. Keeps mvmctl separate from system Python.",
    icon: "rocket",
    code: ["pipx install mvmctl", "mvm --help"],
  },
  {
    id: "pip",
    title: "pip",
    description: "System or virtualenv install.",
    icon: "layers",
    code: ["pip install mvmctl", "mvm --help"],
  },
  {
    id: "source",
    title: "Source",
    description: "For local development or contributing.",
    icon: "fileCode",
    code: [
      "git clone https://github.com/AlanD20/mvmctl",
      "cd mvmctl",
      "uv sync",
      "uv run mvm --help",
    ],
  },
] as const;

/* ───────────────────────────────────────────────────────────────
   HOST INIT
   ─────────────────────────────────────────────────────────────── */

export const hostInitSections = [
  {
    title: "Interactive setup (recommended)",
    description:
      "Run <code>mvm init</code> — it walks you through host config (sudo/group/sudoers), Firecracker binary download, cache initialization, service binary extraction, and optional libguestfs setup. Escalates to root automatically when needed.",
    code: ["mvm init"],
    callout:
      "When prompted to log out/in, <strong>do it</strong>. Group membership changes only apply to new login sessions. If you skip this, subsequent commands will fail with permission errors. Alternatively run <code>newgrp mvm</code> to avoid logging out.",
  },
  {
    title: "Manual host setup",
    description:
      "Prefer doing things step by step? <code>sudo mvm host init</code> does the one-time machine setup. It is idempotent — safe to re-run.",
    code: ["sudo mvm host init"],
    callout:
      "<code>mvm host init</code> requires sudo because it creates the <code>mvm</code> system group, writes sudoers drop-in files, loads KVM kernel modules, enables IP forwarding, and sets up bridge/TAP networking. Normal <code>mvm</code> commands do not need sudo after this runs.",
  },
  {
    title: "What host init actually does",
    items: [
      "Loads <code>kvm</code>, <code>kvm_intel</code>/<code>kvm_amd</code> kernel modules (networking modules <code>tun</code> and <code>bridge</code> are loaded as needed)",
      "Enables <code>net.ipv4.ip_forward</code> for NAT networking",
      "Creates the <code>mvm</code> system group and adds your user to it",
      "Writes a sudoers drop-in to <code>/etc/sudoers.d/mvm</code> so mvmctl can run privileged commands (ip, iptables, sysctl, modprobe) without password prompts",
      "Sets up the <code>mvm-net</code> bridge and firewall chains for NAT",
    ],
  },
  {
    title: "mvm init flags",
    description: "Control the interactive wizard behavior with these flags:",
    code: [
      "# Non-interactive mode — use defaults, skip all prompts",
      "mvm init --non-interactive",
      "",
      "# Skip host init step (useful if host is already configured)",
      "mvm init --skip-host",
      "",
      "# Skip default network creation",
      "mvm init --skip-network",
      "",
      "# Combine flags for fully automated setup",
      "mvm init --non-interactive --skip-host",
    ],
    callout: "Combine <code>--skip-host</code> and <code>--skip-network</code> to skip both host setup and default network creation. Useful when re-running <code>mvm init</code> to only pull a new binary or enable libguestfs.",
  },
  {
    title: "Other host commands",
    code: [
      "mvm host status   # Show current host configuration state — useful for verifying setup",
      "mvm host info     # Show host hardware, limits, and VM capacity projection",
      "mvm host info --refresh  # Re-detect hardware and limits before displaying",
      "mvm host info --json     # Output as JSON",
      "mvm host clean    # Remove networking config only (bridges, TAPs, iptables rules)",
      "mvm host reset    # Full rollback — networking, sysctl, sudoers, and the mvm group",
    ],
    callout:
      "<code>mvm host reset</code> is destructive. It removes the mvm group, meaning anyone in it loses mvm access. Only use if you are permanently uninstalling mvmctl.",
  },
];

/* ───────────────────────────────────────────────────────────────
   FIRST VM
   ─────────────────────────────────────────────────────────────── */

export const firstVmSections = [
  {
    title: "Step by step",
    description:
      "Create a complete microVM from scratch: generate an SSH key, download a kernel and OS image, boot the VM, connect, and clean up.",
    code: [
      "# 1. Generate an SSH key for VM access",
      "mvm key create test --default",
      "",
      "# 2. Download Firecracker-optimized kernel (~30s)",
      "mvm kernel pull --type firecracker",
      "",
      "# 3. Download an Ubuntu 24.04 image",
      "mvm image pull ubuntu --version 24.04",
      "",
      "# 4. Create and start the VM",
      "mvm vm create myvm --image ubuntu:24.04",
      "",
      "# 5. Wait for cloud-init to finish (~30-60s)",
      "mvm logs myvm --follow",
      "",
      "# 6. SSH into the VM",
      "mvm ssh myvm",
      "",
      "# 7. List running VMs",
      "mvm vm ls",
      "",
      "# 8. Remove the VM when done",
      "mvm vm rm myvm -f",
    ],
    callouts: [
      "Cloud-init takes 30-60 seconds on first boot. The VM <strong>is running</strong> during this time — it is just running startup scripts. Watch progress with <code>mvm logs myvm --follow</code>.",
      "You need at least one SSH key set up before creating a VM. Use <code>mvm key create NAME --default</code> or pass <code>--ssh-key</code> explicitly when creating a VM.",
      "Images are several hundred MB. Ensure at least 2 GB free in <code>~/.cache/mvmctl/</code>.",
    ],
  },
];

/* ───────────────────────────────────────────────────────────────
   VM CREATE
   ─────────────────────────────────────────────────────────────── */

const NET_NAME = "net";
const NET_SUBNET = "172.27.0.0/24";
const NET_GATEWAY = "172.27.0.1";

export const vmCreateExplanation = {
  whatItDoes:
    'Creates and immediately starts a Firecracker microVM. Under the hood mvmctl: (1) copies the root filesystem image to a per-VM directory, (2) generates a Firecracker JSON boot config, (3) picks an available IP from the network lease pool, (4) starts a temporary HTTP server for cloud-init, (5) launches Firecracker (+ jailer). There is no separate "start" command — the VM boots right away.',
  callouts: [
    'Firecracker is not a hypervisor you can "pause" like VirtualBox. <code>mvm vm create</code> starts the VM <strong>immediately</strong>.',
    "Each VM gets an IP from the lease pool. The default network (<code>net</code>) uses <code>172.27.0.0/24</code>. Leases are reused when VMs are removed.",
    "The <code>--disk-size</code> flag resizes via <code>qemu-img resize</code>. It only grows the image — shrinking requires manual intervention.",
    "If you do not set <code>--ssh-key</code> and have no default key, the VM will boot but you cannot SSH in. Use <code>mvm console</code> for serial access instead.",
  ],
};

export const vmCreateFlagLines: readonly string[] = [
  "VM_NAME (positional)          VM name (required). Used to identify the VM in all commands.",
  "--image IMAGE              Image name, type:version (e.g. ubuntu:24.04), short ID, or path to .ext4 file. Auto-detected from defaults if omitted.",
  "--kernel KERNEL            Kernel short ID or path to vmlinux. Auto-detected from defaults if omitted.",
  "--vcpus, --cpus N          vCPU count (default: from user config).",
  "--mem, --memory N          Memory in MiB or GiB (e.g. 512M, 1G) (default: from user config).",
  "--disk-size, -s SIZE       Rootfs disk size (e.g. 1G, 512M or 1024M). Default: from config.",
  "--ssh-key KEY              SSH public key name or path, e.g. 'mykey' or ~/.ssh/id_ed25519.pub",
  "--user USER                Default SSH user for cloud-init. Default: from config.",
  "--ip ADDRESS               Static guest IP, e.g. 172.27.0.42. Default: auto-assigned.",
  "--network, --net NAME      Named network to attach to. Default: 'net'.",
  "--mac ADDRESS              Custom MAC address. Auto-generated if omitted.",
  "--cloud-init-mode MODE     One of: off (default), inject, iso, net.",
  "--user-data PATH           Path to custom cloud-init user-data file.",
  "--nocloud-net-port PORT    Port for nocloud-net HTTP server (0=auto-assign).",
  "--no-pci                Disable PCI transport (default: enabled). Required for hotplug support.",
  "--nested-virt/--no-nested-virt   Enable nested virtualization (requires PCI, adds kvm-intel/amd.nested=1 boot arg)",
  "--cpu-template PATH              Path to CPU template JSON file (merged with nested-virt config if both set)",
  "--no-console               Disable serial console.",
  "--lsm-flags FLAGS          Linux Security Module flags for kernel cmdline.",
  "--firecracker-bin PATH     Path to firecracker binary. Env var: MVM_FIRECRACKER_BIN.",
  "--enable-logging/--no-enable-logging  Enable Firecracker logging.",
  "--enable-metrics/--no-enable-metrics  Enable Firecracker metrics.",
  "--boot-args ARGS           Custom kernel boot arguments (e.g. 'console=ttyS0 reboot=k panic=1').",
  "--skip-cleanup             Skip cleanup on failure (for debugging).",
  "--skip-deblob              Skip debloat operations on rootfs (removes OS caches, package manager caches).",
  "--count, -c N              Number of VMs to create (default: 1).",
  "--atomic                   If any VM fails, remove all successfully-created VMs (all-or-nothing).",
  "--volume, -v NAME          Attach a volume to the VM (can be specified multiple times).",
];

export const vmCreateExamples = [
  {
    title: "Minimal — get a default VM running fast",
    code: [
      "# Assuming kernel + image fetched, default key set:",
      "mvm vm create myvm --image ubuntu:24.04",
    ],
    note: "Defaults: 1 vCPU, 512 MiB RAM, auto-assigned IP on network <code>net</code> (172.27.0.0/24).",
  },
  {
    title: "Custom resources",
    code: [
      "mvm vm create \\",
      "  build-vm \\",
      "  --image ubuntu:24.04 \\",
      "  --vcpus 4 \\",
      "  --mem 8192 \\",
      "  --disk-size 50G",
    ],
    note: "Useful for CI runners or compiling in isolated environments.",
  },
  {
    title: "Specific network and static IP",
    code: [
      "# First create a network",
      "mvm network create isolated --subnet 10.0.0.0/24",
      "",
      "# Then attach the VM with a fixed IP",
      "mvm vm create myvm --image ubuntu:24.04 --network isolated --ip 10.0.0.50",
    ],
    note: "The IP must fall within the network subnet. Default network <code>net</code> uses <code>172.27.0.0/24</code>.",
  },
  {
    title: "Non-root user and custom SSH key",
    code: [
      "mvm key create workstation-key --default",
      "mvm vm create \\",
      "  dev-vm \\",
      "  --image ubuntu:24.04 \\",
      "  --ssh-key workstation-key \\",
      "  --user ubuntu",
    ],
    note: "The <code>--user</code> flag sets the cloud-init default user. This user gets password-less sudo inside the VM.",
  },
  {
    title: "Alpine — lightweight and fast",
    code: [
      "mvm image pull alpine --version 3.21",
      "mvm vm create tiny-vm --image alpine:3.21 --vcpus 1 --mem 256",
    ],
    note: "Alpine boots in seconds. Great for testing or ephemeral workloads.",
  },
  {
    title: "Custom cloud-init user-data",
    code: [
      "# Write a custom user-data file",
      "cat > my-user-data.yaml << 'EOF'",
      "#cloud-config",
      "package_update: true",
      "packages:",
      "  - htop",
      "  - build-essential",
      "EOF",
      "",
      "# Pass it to the VM",
      "mvm vm create myvm --image ubuntu:24.04 --user-data my-user-data.yaml",
    ],
    note: "Custom user-data merges with mvmctl's default cloud-init. You can add packages, write files, run commands, etc.",
  },
  {
    title: "Batch creation with atomic rollback",
    code: [
      "# Create 5 VMs atomically — if any fails, all are removed",
      "mvm vm create cluster --image ubuntu:24.04 --count 5 --atomic",
      "",
      "# With a volume attached to a single VM",
      "mvm volume create shared-data 10G",
      "mvm vm create worker --image ubuntu:24.04 --volume shared-data",
    ],
    note: "The <code>--count</code> flag auto-generates names by appending <code>-1</code>, <code>-2</code>, etc. The <code>--atomic</code> flag ensures no partial creation — all created VMs are rolled back if any single VM fails. <code>--count</code> and <code>--volume</code> are mutually exclusive (a volume can only be attached to one VM). Implicit IP and MAC assignment is used (no <code>--ip</code> or <code>--mac</code> with <code>--count &gt; 1</code>).",
  },
];

/* ───────────────────────────────────────────────────────────────
   VM LIFECYCLE
   ─────────────────────────────────────────────────────────────── */

export const sshExplanation = {
  whatItDoes:
    "SSH into a running VM by name. Resolves the VM name to its IP address from the lease database and connects with the cached SSH key.",
  callouts: [
    "SSH only works after cloud-init finishes. On first boot, cloud-init generates SSH host keys and configures the default user. This takes 30-60 seconds.",
    "mvmctl automatically passes the correct SSH key and user. You do not need <code>ssh -i</code> commands. But you do need a key set up beforehand.",
    "Works on custom networks too — mvmctl looks up the correct IP from the lease database.",
  ],
  examples: [
    {
      code: "mvm ssh myvm",
      note: "SSH as the default user (root by default unless --user was specified).",
    },
    {
      code: "mvm ssh myvm --user admin",
      note: "SSH as a specific user.",
    },
    {
      code: 'mvm ssh myvm --cmd "uname -a"',
      note: "Execute a command non-interactively.",
    },
    {
      code: "mvm ssh myvm --key mykey",
      note: "Use a specific SSH key.",
    },
    {
      code: "mvm ssh myvm --timeout 10",
      note: "Set connection timeout in seconds.",
    },
  ],
};

export const consoleExplanation = {
  whatItDoes:
    "Attaches a PTY-based serial console to a VM using a vsock relay. No network stack required. Works even if the VM has no IP or cloud-init failed.",
  callouts: [
    "Press <code>Ctrl+X</code> then <code>D</code> to detach from the console session. This does <strong>not</strong> shut down the VM.",
    "The console relay runs as a background process. If it crashes, use <code>mvm console --kill</code> then re-attach.",
    "Use <code>--state</code> to check if the relay is running without attaching. Handy for scripting.",
    "Requires the <code>vhost_vsock</code> kernel module. Check with <code>lsmod | grep vsock</code>.",
  ],
  examples: [
    {
      code: "mvm console myvm",
      note: "Attach to the VM serial console interactively.",
    },
    {
      code: "mvm console myvm --state",
      note: "Check if the console relay is running (does not attach).",
    },
    { code: "mvm console myvm --kill", note: "Kill a stuck console relay." },
  ],
};

export const logsExplanation = {
  whatItDoes:
    "View or stream VM logs. Two types: boot (serial console — kernel boot messages, cloud-init, login prompts) and OS (Firecracker process stderr/stdout).",
  callouts: [
    "<code>--follow</code> / <code>-f</code> streams logs in real-time (like <code>tail -f</code>). Press <code>Ctrl+C</code> to stop.",
    "Use <code>--os</code> to show Firecracker process logs instead of serial console output.",
    "Use <code>--lines</code> / <code>-n</code> to limit output to the last N lines.",
    "Log files are in <code>~/.cache/mvmctl/vms/&lt;vm-sha&gt;/</code> as <code>firecracker.console.log</code> and <code>firecracker.log</code>.",
  ],
  examples: [
    {
      code: "mvm logs myvm --follow",
      note: "Watch the VM boot in real-time. Best for checking if cloud-init finished.",
    },
    {
      code: "mvm logs myvm --os",
      note: "Check Firecracker stderr — useful if the VM failed to start.",
    },
    {
      code: "mvm logs myvm",
      note: "View the full boot log (static, not following).",
    },
  ],
};

export const snapshotExplanation = {
  whatItDoes:
    "Saves VM memory and disk state to disk. <code>mvm vm load</code> restores it later. Useful for preserving a long-running VM state before rebooting the host.",
  callouts: [
    "Snapshots can be large — memory + disk. A VM with 2 GiB RAM creates a ~2 GiB memory file.",
    "The VM continues running while being snapshotted. The snapshot is crash-consistent (like pulling the power cord).",
    "Snapshots are stored in <code>~/.cache/mvmctl/vms/&lt;vm-sha&gt;/snapshots/</code>.",
  ],
  examples: [
    {
      code: "mvm vm snapshot myvm <mem_file> <state_file>",
      note: "Snapshot a running VM. Requires memory and state file paths.",
    },
    {
      code: "mvm vm load myvm <mem_file> <state_file>",
      note: "Restore the VM from memory and state files.",
    },
  ],
};

export const cpExplanation = {
  whatItDoes:
    "Copy files between the host and microVMs using tar-over-SSH. No guest dependencies beyond POSIX-mandated tar.",
  callouts: [
    "Uses <code>tar</code> on both sides — no extra packages needed inside the VM.",
    "Path format: use <code>vm_name:/remote/path</code> for VM paths, plain <code>/local/path</code> for local paths.",
    "Multiple sources are allowed for host → VM copies.",
  ],
  examples: [
    {
      code: "mvm cp local-file.txt myvm:/home/",
      note: "Copy a file from host to VM.",
    },
    {
      code: "mvm cp myvm:/var/log/syslog ./",
      note: "Copy a file from VM to host.",
    },
    {
      code: "mvm cp myvm1:/data/file.txt myvm2:/data/",
      note: "Copy a file between two VMs.",
    },
    {
      code: "mvm cp file.txt myvm:/dst/ --user admin --key mykey",
      note: "Specify SSH user and key for the VM connection.",
    },
    {
      code: "mvm cp *.txt myvm:/dst/",
      note: "Shell glob expands to multiple files (host → VM only).",
    },
  ],
};

export const vmRmExplanation = {
  whatItDoes:
    "Stops the Firecracker process, removes firewall rules, kills the nocloud-net server, and deletes the VM state directory.",
  callouts: [
    "Without <code>--force / -f</code>, the command asks for confirmation. Use <code>--force / -f</code> in scripts.",
    "<code>mvm cache prune vm</code> removes all stopped VMs at once. Asks for confirmation by default.",
    "Removing a VM frees its IP lease, making it available for new VMs.",
    "Stopped VMs (crashed or killed) still show in <code>mvm vm ls</code> until removed with <code>rm</code> or <code>prune</code>.",
  ],
  examples: [
    { code: "mvm vm rm myvm", note: "Remove a VM with confirmation." },
    {
      code: "mvm vm rm myvm -f",
      note: "Remove without asking (script-friendly).",
    },
    { code: "mvm cache prune vm", note: "Remove all stopped VMs at once." },
  ],
};

export const vmInspectExplanation = {
  whatItDoes:
    "Shows detailed VM information: SHA256 hash ID, IP address, network, kernel path, image path, resources, creation time, and current state.",
  examples: [
    { code: "mvm vm inspect myvm", note: "Show all details for a VM." },
    {
      code: "mvm vm ls",
      note: "List all VMs with brief info (name, IP, status).",
    },
    {
      code: "mvm vm ls --json",
      note: "List all VMs with JSON output.",
    },
  ],
};

export const vmPsExplanation = {
  whatItDoes:
    "List only running VMs (active Firecracker processes). Shows name, status, IP, resources, and image/kernel IDs.",
  examples: [
    {
      code: "mvm vm ps",
      note: "Show only VMs that are currently running or starting.",
    },
  ],
};

export const vmExportExplanation = {
  whatItDoes:
    "Export a VM's configuration to a portable JSON file, including kernel, image, network, and resource settings. Useful for replicating VMs across hosts or for backup.",
  examples: [
    {
      code: "mvm vm export myvm > myvm-config.json",
      note: "Exports the VM configuration as JSON to stdout. Redirect to a file to save it.",
    },
  ],
};

export const vmImportExplanation = {
  whatItDoes:
    "Import a VM configuration from a JSON file previously exported with <code>mvm vm export</code>. Creates a new VM with the same resource, network, and image settings.",
  examples: [
    {
      code: "mvm vm import myvm-config.json",
      note: "Import VM configuration from a JSON file. The kernel and image must be available locally.",
    },
    {
      code: "mvm vm import myvm-config.json --name cloned-vm",
      note: "Override the VM name when importing.",
    },
  ],
};

/* ───────────────────────────────────────────────────────────────
   RESOURCE MANAGEMENT
   ─────────────────────────────────────────────────────────────── */

export const imageSections = [
  {
    title: "What images are",
    description:
      "Images are root filesystem images (ext4 format) that provide the OS for your microVM. mvmctl can fetch pre-built images from the registry or import local files.",
    callout: undefined,
  },
  {
    title: "Available images",
    description:
      "These image types are defined in mvmctl and can be fetched with <code>mvm image pull &lt;type&gt;:&lt;version&gt;</code> (e.g. <code>mvm image pull ubuntu:24.04</code>) or the longer <code>mvm image pull &lt;type&gt; --version &lt;version&gt;</code> — or use <code>mvm image ls --remote</code> to see all available versions:",
    items: [
      "<code>ubuntu</code> — Ubuntu LTS (tar-rootfs). Versions: 26.04, 24.04, 22.04",
      "<code>ubuntu-minimal</code> — Ubuntu Minimal (tar-rootfs). Versions: 26.04, 24.04, 22.04",
      "<code>debian</code> — Debian (qcow2). Versions: 13, 12, 11",
      "<code>alpine</code> — Alpine Linux (VHD). Versions: 3.x releases",
      "<code>archlinux</code> — Arch Linux (qcow2, rolling release — no version needed)",
      "<code>firecracker</code> — Firecracker CI Ubuntu (squashfs, from Firecracker S3 bucket)",
    ],
  },
  {
    title: "Fetching images",
    code: [
      "# Fetch an image by type and version",
      "mvm image pull ubuntu --version 24.04",
      "",
      "# Shorthand: type:version syntax",
      "mvm image pull ubuntu:24.04",
      "",
      "# Alpine Linux",
      "mvm image pull alpine --version 3.21",
      "",
      "# Or use shorthand:",
      "mvm image pull alpine:3.21",
      "",
      "# Arch Linux (rolling release — no version needed)",
      "mvm image pull archlinux",
      "",
      "# Force re-download (overwrites cached copy)",
      "mvm image pull ubuntu:24.04 -f",
      "",
      "# Specify architecture",
      "mvm image pull ubuntu:24.04 --arch arm64",
      "",
      "# Skip cached version listing and fetch live",
      "mvm image pull ubuntu:24.04 --no-cache",
      "",
      "# Disable specific detectors (type,label,size,filesystem,all)",
      "mvm image pull ubuntu:24.04 --disable-detector type,label",
      "",
      "# Set as default after download",
      "mvm image pull ubuntu:24.04 --default",
      "",
      "# List available images (local + remote versions)",
      "mvm image ls",
      "mvm image ls --remote            # Show upstream versions",
      "mvm image ls --remote --no-cache # Bypass cache, fetch live from upstream",
    ],
    callout:
      "Shorthand alias: <code>mvm img &lt;command&gt;</code> can be used instead of <code>mvm image &lt;command&gt;</code>. Images are typically 200-800 MB compressed. Cached in <code>~/.cache/mvmctl/images/</code>. Each VM gets its own copy.",
  },
  {
    title: "Importing custom images",
    description:
      "Have a custom rootfs (e.g., from Packer)? Import it into the cache:",
    code: [
      "mvm image import my-custom-image /path/to/my-custom-image.raw --format raw",
      "",
      "# Overwrite existing image",
      "mvm image import myimg /path/to/image.raw --force",
      "",
      "# Set as default after import",
      "mvm image import myimg /path/to/image.raw --default",
      "",
      "# Skip filesystem optimization (shrink/compression)",
      "mvm image import myimg /path/to/image.raw --skip-optimization",
      "",
      "# Disable specific detectors",
      "mvm image import myimg /path/to/image.raw --disable-detector type",
      "",
      "mvm image ls                     # Verify it shows up",
      "mvm image default my-custom-image",
    ],
    callout:
      "Syntax: <code>mvm image import NAME SOURCE_PATH</code>. Supports raw images (.raw/.img), qcow2, and tar-rootfs archives (.tar/.tar.gz/.tar.xz/.tgz) natively — no manual conversion needed.",
  },
  {
    title: "Managing images",
    code: [
      "mvm image ls                          # List all cached images",
      "mvm image inspect <id>                # Show detailed image info",
      "mvm image default <id>             # Set default for new VMs",
      "mvm image rm <id>                     # Remove a cached image (full or short SHA)",
      "mvm image warm <id>                   # Pre-decompress to ready pool for fast VM creation",
    ],
  },
];

export const kernelSections = [
  {
    title: "What kernels are",
    description:
      "Firecracker requires an <strong>uncompressed ELF binary</strong> (<code>vmlinux</code>) — not the compressed <code>vmlinuz</code> used by traditional bootloaders. mvmctl supports two kernel types.",
  },
  {
    title: "Firecracker-optimized kernel (recommended)",
    description:
      "A pre-built kernel from the Firecracker CI pipeline. Minimally configured for fast boot — no PCI, no ACPI. Downloads in ~30 seconds.",
    code: [
      "mvm kernel pull --type firecracker",
      "# Downloads the latest Firecracker-optimized kernel",
    ],
    callout:
      "This is the default. Use this unless you need custom kernel modules or a specific version. Boots in under 200ms.",
  },
  {
    title: "Official upstream kernel (custom build)",
    description:
      "Downloads the official Linux kernel source (default: 6.19.9) and compiles it with a Firecracker-compatible config. Takes 10-30 minutes.",
    code: [
      "# Build latest upstream kernel",
      "mvm kernel pull --type official",
      "",
      "# Using type:version shorthand",
      "mvm kernel pull official:6.19.9",
      "",
      "# Build a specific version",
      "mvm kernel pull --type official --version 6.6",
      "",
      "# Apply a custom kernel config fragment",
      "mvm kernel pull --type official --config /path/to/my-fragment.config",
      "",
      "# Enable kernel features (kvm, nftables)",
      "mvm kernel pull official:6.19.9 --features kvm,nftables",
      "",
      "# Specify architecture and parallel build jobs",
      "mvm kernel pull --type official --arch arm64 --jobs 8",
      "",
      "# Set as default after fetch",
      "mvm kernel pull --type official --default",
      "",
      "# Force clean rebuild (bypass cache)",
      "mvm kernel pull --type official --clean-build",
    ],
    callout:
      "Official builds require build deps: <code>build-essential</code>, <code>flex</code>, <code>bison</code>, <code>libelf-dev</code>, <code>libssl-dev</code>, <code>libncurses-dev</code>, <code>bc</code>, <code>git</code>, <code>curl</code>, <code>pkg-config</code>, <code>dwarves</code> (for pahole). Expect 10-30 min build times. Use <code>--config PATH</code> to apply a custom kernel config fragment, <code>--arch ARCH</code> for architecture (x86_64, arm64), <code>--jobs N</code> for parallel build jobs, and <code>--default</code> to set as default after fetch.",
  },
  {
    title: "Managing kernels",
    code: [
      "mvm kernel ls                    # List cached kernels",
      "mvm kernel ls --remote           # List remote versions available for download",
      "mvm kernel inspect <id>         # Show detailed kernel info",
      "mvm kernel default <id>        # Set as default for VM creation",
      "mvm kernel import <name> <path>  # Import a custom vmlinux kernel file",
      "mvm kernel rm <id>               # Remove a cached kernel",
    ],
  },
];

export const binarySections = [
  {
    title: "What binaries are",
    description:
      "Firecracker and jailer binaries downloaded from the Firecracker GitHub releases page. You need at least one version downloaded to create VMs.",
  },
  {
    title: "Managing binaries",
    code: [
      "# Download Firecracker v1.15.0 (includes jailer)",
      "mvm bin pull firecracker --version 1.15.0",
      "",
      "# Build Firecracker from source at a git ref",
      "mvm bin pull firecracker --git-ref v1.15.0",
      "",
      "# Force re-download even if version already exists",
      "mvm bin pull firecracker --version 1.15.0 --force",
      "",
      "# List downloaded versions",
      "mvm bin ls",
      "",
      "# JSON output for scripting",
      "mvm bin ls --json",
      "",
      "# List remote versions available for download",
      "mvm bin ls --remote",
      "",
      "# Set as active version by ID prefix",
      "mvm bin default abc123",
      "",
      "# Remove by version",
      "mvm bin rm --version 1.15.0",
      "mvm bin rm --version 1.15.0 -f   # Force remove even if referenced by VMs",
      "",
      "# Remove by ID",
      "mvm bin rm abc123",
    ],
    callout:
      "<code>mvm bin pull</code> downloads both <code>firecracker</code> and <code>jailer</code> together. They must match versions — mixing v1.14 firecracker with v1.15 jailer causes runtime errors.",
  },
];

export const keySections = [
  {
    title: "What keys are for",
    description:
      "SSH public keys cached by mvmctl for injection into VMs via cloud-init. Without at least one key, you cannot SSH into your VMs (console access still works).",
  },
  {
    title: "Creating and managing keys",
    code: [
      "# Generate a new ED25519 keypair and set as default (recommended)",
      "mvm key create mykey --default",
      "",
      "# Import an existing public key",
      "mvm key add mykey ~/.ssh/id_ed25519.pub",
      "mvm key add mykey ~/.ssh/id_ed25519.pub --force   # Overwrite if key exists",
      "",
      "# List all cached keys",
      "mvm key ls",
      "",
      "# Show key details",
      "mvm key inspect mykey",
      "",
      "# Set default keys for VM creation",
      "mvm key default mykey",
      "",
      "# Clear all default keys",
      "mvm key default --clear",
      "",
      "# Export a key to a directory (--out is required)",
      "mvm key export mykey --out ~/.ssh/exported",
      "",
      "# Remove a key from cache",
      "mvm key rm mykey",
    ],
    callout:
      "<code>mvm key create</code> generates both a public and private key. The private key stays on your machine — mvmctl only stores the public key for cloud-init injection.",
  },
  {
    title: "How keys work with VMs",
    description:
      "When you create a VM with <code>--ssh-key mykey</code> (or use the default key), mvmctl injects the public key into cloud-init user-data. After cloud-init finishes (~30-60s), you can SSH in with <code>mvm ssh myvm</code>.",
  },
];

export const volumeSections = [
  {
    title: "What volumes are",
    description:
      "Volumes are persistent data disks that can be attached to VMs and survive VM removal. They are stored as raw or qcow2 disk images in the cache directory and managed through the mvmctl database.",
    callout: undefined,
  },
  {
    title: "Creating volumes",
    description: "Create a new persistent volume with a name and size:",
    code: [
      "# Create a 10 GB raw volume",
      "mvm volume create data-disk 10G",
      "",
      "# Create a qcow2 volume (supports grow and shrink)",
      "mvm volume create data-disk 10G --format qcow2",
      "",
      "# Create a read-only volume (writable by default)",
      "mvm volume create data-disk 10G --read-only",
      "",
      "# Create a 512 MB volume for testing",
      "mvm volume create test-disk 512M",
    ],
    callout:
      "Shorthand alias: <code>mvm vol &lt;command&gt;</code> can be used instead of <code>mvm volume &lt;command&gt;</code>. Raw format (default) uses fallocate for fast allocation. Qcow2 format supports both grow and shrink via qemu-img. The volume name must be unique.",
  },
  {
    title: "Listing volumes",
    code: [
      "# List all volumes with ID, name, format, size, status, and VM",
      "mvm volume ls",
      "",
      "# JSON output for scripting",
      "mvm volume ls --json",
    ],
  },
  {
    title: "Inspecting volumes",
    description:
      "Show detailed information about a volume including disk metadata:",
    code: [
      "mvm volume inspect data-disk",
      "mvm volume inspect abc123    # ID prefix also works",
    ],
  },
  {
    title: "Removing volumes",
    code: [
      "# Remove by name",
      "mvm volume rm data-disk",
      "",
      "# Remove multiple volumes",
      "mvm volume rm data-disk test-disk",
      "",
      "# Force remove even if attached to a VM",
      "mvm volume rm data-disk -f",
    ],
    callout:
      "A volume can only be removed if it is not attached to a running VM, unless <code>--force / -f</code> is used. Detach first with <code>mvm vm detach-volume</code>.",
  },
  {
    title: "Resizing volumes",
    description: "Grow (or shrink qcow2) an existing volume to a new size:",
    code: [
      "# Resize to 20 GB (grow only for raw format)",
      "mvm volume resize data-disk 20G",
      "",
      "# Raw volumes: grow only (fallocate)",
      "# Qcow2 volumes: grow and shrink (qemu-img)",
    ],
    callout:
      "Raw format supports grow only (via fallocate). Qcow2 format supports both grow and shrink (via qemu-img). Shrinking below the actual data size causes data loss.",
  },
  {
    title: "Attaching volumes to VMs",
    description:
      "Volumes can be attached and detached from running VMs using the VM command group:",
    code: [
      "# Attach a volume when creating a VM",
      "mvm vm create myvm --image ubuntu:24.04 --volume data-disk",
      "",
      "# Attach to a running VM (via Firecracker API)",
      "mvm vm attach-volume myvm data-disk",
      "",
      "# Detach from a running VM",
      "mvm vm detach-volume myvm data-disk",
    ],
    callout:
      "A volume can only be attached to one VM at a time. Attaching to a second VM automatically detaches from the first if supported by the Firecracker API.",
  },
];

/* ───────────────────────────────────────────────────────────────
   NETWORK
   ─────────────────────────────────────────────────────────────── */

export const networkSections = [
  {
    title: "How networking works",
    description:
      "mvmctl uses Linux bridge/TAP networking with NAT (via nftables or iptables). Each named network is a Linux bridge with its own subnet. VMs get TAP interfaces and IPs from a lease pool. Traffic is NATed to the host network.",
  },
  {
    title: "The default network",
    description: `The default network is called <strong>${NET_NAME}</strong> and uses <strong>${NET_SUBNET}</strong> (gateway: ${NET_GATEWAY}). It is created automatically the first time you run <code>mvm host init</code> — no manual network setup needed for basic use.`,
    callout: `The default network name is <code>${NET_NAME}</code>. The bridge device is named <code>mvm-${NET_NAME}</code> (<code>mvm-net</code>), following the convention <code>mvm-&lt;network-name&gt;</code>.`,
  },
  {
    title: "Network commands",
    code: [
      "# Create a named network with a custom subnet",
      "# You will be prompted to select interface(s) for NAT",
      "mvm network create mynet --subnet 10.0.1.0/24",
      "",
      "# Create non-interactively (skips NAT gateway prompts)",
      "mvm network create mynet --subnet 10.0.1.0/24 --non-interactive",
      "",
      "# Create with explicit NAT gateway interfaces",
      "mvm network create mynet --subnet 10.0.1.0/24 --nat-gateways eth0",
      "",
      "# Create without NAT (no internet access for VMs)",
      "mvm network create mynet --subnet 10.0.1.0/24 --no-nat",
      "",
      "# Create with explicit gateway IP",
      "mvm network create mynet --subnet 10.0.1.0/24 --ipv4-gateway 10.0.1.1",
      "",
      "# Create and set as default network",
      "mvm network create mynet --subnet 10.0.1.0/24 --default",
      "",
      "# List all networks",
      "mvm network ls",
      "",
      "# Show network details",
      "mvm network inspect mynet",
      "",
      "# Set a network as default",
      "mvm network default mynet",
      "",
      "# Sync firewall rules between database and host",
      "mvm network sync",
      "",
      "# Remove a network (only if no VMs attached)",
      "mvm network rm mynet",
    ],
    callout:
      "Shorthand alias: <code>mvm net &lt;command&gt;</code> can be used instead of <code>mvm network &lt;command&gt;</code>. You cannot remove a network that has VMs attached. Stop and remove the VMs first.",
  },
  {
    title: "Using networks with VMs",
    code: [
      "# Create a VM on a custom network",
      "mvm network create isolated --subnet 10.0.0.0/24",
      "mvm vm create myvm --image ubuntu:24.04 --network isolated",
      "",
      "# Assign a specific IP",
      "mvm vm create myvm --image ubuntu:24.04 --network isolated --ip 10.0.0.50",
    ],
    note: "Custom networks get the subnet you specify. The bridge device is named <code>mvm-&lt;network-name&gt;</code>. Each VM gets a unique MAC address (auto-generated with the <code>02:FC</code> prefix).",
  },
];

/* ───────────────────────────────────────────────────────────────
   CONFIGURATION
   ─────────────────────────────────────────────────────────────── */

export const configSections = [
  {
    title: "Configuration priority",
    description: "Settings resolve in this order (lower overrides higher):",
    items: [
      "Built-in defaults from <code>constants.py</code> (compiled into the package, lowest priority)",
      "SQLite database (<code>~/.cache/mvmctl/mvmdb.db</code>) — canonical store for asset defaults",
      "Runtime config file (<code>~/.config/mvmctl/config.json</code>)",
      "<code>MVM_*</code> environment variables",
      "CLI flags (highest priority)",
    ],
  },
  {
    title: "Config file location",
    description:
      "Runtime config: <code>~/.config/mvmctl/config.json</code> (override with <code>MVM_CONFIG_DIR</code>). Asset cache: <code>~/.cache/mvmctl/</code> (override with <code>MVM_CACHE_DIR</code>).",
  },
  {
    title: "Config commands",
    code: [
      "# List all overridable settings and their current values",
      "mvm config list",
      "",
      "# Get a specific value",
      "mvm config get defaults.vm vcpu_count",
      "",
      "# Set a value (persists to config.json)",
      "mvm config set defaults.vm vcpu_count 4",
      "",
      "# Reset a single value to default",
      "mvm config reset defaults.vm vcpu_count",
      "",
      "# Reset all overrides globally",
      "mvm config reset --all",
    ],
  },
  {
    title: "Environment variables",
    code: [
      "MVM_CACHE_DIR          Override cache directory               ~/.cache/mvmctl",
      "MVM_CONFIG_DIR         Override config directory               ~/.config/mvmctl",
      "MVM_LOG_LEVEL          Log level: DEBUG, INFO, WARNING, ERROR  WARNING (CLI flags recommended)",
      "MVM_FIRECRACKER_BIN    Override Firecracker binary path",
      "MVM_COMPLETE           Set by shell completion system             —",
      "MVM_ESCALATED          Set by sudo wrapper to indicate             1",
      "                       privilege escalation",
      "MVM_ASSET_MIRROR       Local directory for asset mirroring",
    ],
    callout:
      "The <code>--verbose</code> (sets INFO) and <code>--debug</code> (sets DEBUG) CLI flags are the <strong>recommended</strong> way to control log level — they take precedence over <code>MVM_LOG_LEVEL</code>. The env var falls back to WARNING if neither flag is set and the variable is unset.",
  },
  {
    title: "Cache management",
    code: [
      "# Initialize cache directories",
      "mvm cache init",
      "",
      "# Prune specific resource type",
      "mvm cache prune vm",
      "mvm cache prune network",
      "mvm cache prune image",
      "mvm cache prune kernel",
      "mvm cache prune binary",
      "mvm cache prune misc",
      "",
      "# Dry-run prune all (see what would be removed)",
      "mvm cache prune --all --dry-run",
      "",
      "# Prune all resources including protected items",
      "mvm cache prune --all",
      "",
      "# Prune all without confirmation",
      "mvm cache prune --all --force",
      "",
      "# Completely clean all cache (nuclear option)",
      "mvm cache clean",
      "mvm cache clean --dry-run",
    ],
    callout:
      "Always run <code>--dry-run</code> first. Cache pruning is one-way. <code>mvm cache clean</code> removes ALL cached assets AND host networking, but does not touch running VMs unless you use <code>--all</code>.",
  },
];

/* ───────────────────────────────────────────────────────────────
   DEPENDENCIES
   ─────────────────────────────────────────────────────────────── */

export const dependencySections = [
  {
    title: "Core runtime dependencies",
    description: "These binaries are required for basic mvmctl operations:",
    callout: undefined,
    headers: ["Binary", "Purpose", "Debian/Ubuntu", "RHEL/Fedora", "Arch"],
    rows: [
      [
        "firecracker + jailer",
        "MicroVM VMM + security isolation",
        "mvm bin pull",
        "mvm bin pull",
        "mvm bin pull",
      ],
      ["ip", "Bridge/TAP management", "iproute2", "iproute2", "iproute2"],
      [
        "iptables",
        "NAT and firewall rules",
        "iptables",
        "iptables",
        "iptables",
      ],
      [
        "iptables-save",
        "Persisting iptables rules",
        "iptables",
        "iptables",
        "iptables",
      ],
      [
        "nft / nftables",
        "NAT and firewall rules (default backend)",
        "nftables",
        "nftables",
        "nftables",
      ],
      ["sysctl", "IP forwarding", "procps", "procps-ng", "procps-ng"],
      ["modprobe", "KVM module loading", "kmod", "kmod", "kmod"],
      ["lsmod", "KVM module status", "kmod", "kmod", "kmod"],
      ["groupadd", "mvm group creation", "passwd", "shadow", "shadow"],
      ["usermod", "User group membership", "passwd", "shadow", "shadow"],
      ["visudo", "Sudoers validation", "sudo", "sudo", "sudo"],
      ["sudo", "Privileged commands", "sudo", "sudo", "sudo"],
      [
        "groupdel",
        "Removing the mvm group on reset",
        "passwd",
        "shadow",
        "shadow",
      ],
      [
        "dumpe2fs",
        "Filesystem inspection",
        "e2fsprogs",
        "e2fsprogs",
        "e2fsprogs",
      ],
    ],
  },
  {
    title: "Image & cloud-init dependencies",
    callout: undefined,
    headers: ["Binary", "Purpose", "Debian/Ubuntu", "RHEL/Fedora", "Arch"],
    rows: [
      [
        "qemu-img",
        "Image conversion/resize",
        "qemu-utils",
        "qemu-img",
        "qemu-img",
      ],
      [
        "sfdisk",
        "Partition table manipulation",
        "util-linux",
        "util-linux",
        "util-linux",
      ],
      ["parted", "Partition reading", "parted", "parted", "parted"],
      [
        "blkid",
        "Root partition/UUID detection",
        "util-linux",
        "util-linux",
        "util-linux",
      ],
      [
        "mount/umount",
        "Image mounting",
        "util-linux",
        "util-linux",
        "util-linux",
      ],
      [
        "truncate",
        "Sparse file creation",
        "coreutils",
        "coreutils",
        "coreutils",
      ],
      ["mkfs.ext4", "Rootfs formatting", "e2fsprogs", "e2fsprogs", "e2fsprogs"],
      [
        "unsquashfs",
        "SquashFS extraction",
        "squashfs-tools",
        "squashfs-tools",
        "squashfs-tools",
      ],
      ["tar", "Tarball extraction", "tar", "tar", "tar"],
      [
        "zstd",
        "Image compression/decompression",
        "zstd",
        "zstd",
        "zstd",
      ],
      [
        "cloud-localds",
        "Cloud-init seed ISO",
        "cloud-image-utils",
        "cloud-utils",
        "cloud-utils",
      ],
      [
        "ssh-keygen",
        "SSH key generation",
        "openssh-client",
        "openssh",
        "openssh",
      ],
      ["ssh", "VM connection", "openssh-client", "openssh", "openssh"],
    ],
  },
  {
    title: "libguestfs (optional — for cloud-init direct injection)",
    description:
      "Required only if you use <code>--cloud-init-mode inject</code> and the primary loop-mount provisioner is unavailable. The <code>guestfs</code> Python module is <strong>not on PyPI</strong> — install via your package manager.",
    code: [
      "# Debian/Ubuntu",
      "sudo apt-get install libguestfs0 libguestfs-tools supermin python3-libguestfs",
      "",
      "# RHEL/CentOS/Fedora",
      "sudo dnf install libguestfs libguestfs-tools supermin",
      "",
      "# Arch",
      "sudo pacman -S libguestfs supermin",
      "",
      "# Verify",
      "python3 -c 'import guestfs; print(\"OK\")'",
    ],
  },
  {
    title: "Building kernels from source",
    description:
      "Building official kernels from source requires additional build dependencies (<code>make</code>, <code>gcc</code>, <code>flex</code>, <code>bison</code>, <code>libelf</code>, <code>openssl</code>, <code>ncurses</code>, <code>bc</code>, <code>pahole</code>, <code>git</code>, <code>curl</code>, <code>pkg-config</code>). See the <a href=\"https://github.com/AlanD20/mvmctl/blob/main/docs/KERNEL.md\">full custom-kernel guide</a> for details.",
    callout: undefined,
    headers: [],
    rows: [],
  },
  {
    title: "Provisioning backend",
    description:
      "mvmctl handles provisioning internally through a configurable backend. See the <a href=\"https://github.com/AlanD20/mvmctl\">project documentation</a> for backend details.",
    callout: undefined,
    headers: [],
    rows: [],
  },
  {
    title: "Command dependencies",
    description:
      "Each mvmctl command may depend on system tools that are verified during <code>mvm init</code>. See <a href=\"https://github.com/AlanD20/mvmctl/blob/main/docs/DEPENDENCIES.md\">DEPENDENCIES.md</a> for details.",
    callout: undefined,
    headers: [],
    rows: [],
  },
  {
    title: "Host system requirements",
    callout: undefined,
    items: [
      "<strong>Kernel modules:</strong> <code>kvm</code>, <code>kvm_intel</code> or <code>kvm_amd</code>, <code>tun</code>, <code>bridge</code>, <code>vhost_vsock</code>",
      "<strong>Hardware virtualization:</strong> VT-x (Intel) or AMD-V must be enabled in BIOS/UEFI",
      "<strong>Permissions:</strong> The user must be in the <code>mvm</code> group (created by <code>mvm host init</code>)",
    ],
  },
];

/* ───────────────────────────────────────────────────────────────
   CLOUD-INIT
   ─────────────────────────────────────────────────────────────── */

export const cloudInitSections = [
  {
    title: "What is cloud-init?",
    description:
      "Cloud-init configures your VM on first boot: sets up users, injects SSH keys, configures networking, runs startup scripts. mvmctl handles this automatically.",
    callout: undefined,
  },
  {
    title: "How mvmctl handles cloud-init",
    description:
      "Defaults to <strong>off</strong> if not specified. Set via <code>--cloud-init-mode</code> on <code>mvm vm create</code>. The available modes are:",
    callout: undefined,
  },
  {
    title: "Cloud-init modes",
    items: [
      "<code>inject</code> — injects cloud-init files directly into the rootfs via loop-mount provisioner (with libguestfs as fallback). Fastest and most reliable.",
      "<code>net</code> — starts a temporary HTTP server (nocloud-net). The VM fetches config during boot via <code>ds=nocloud-net;s=http://GATEWAY_IP:PORT/</code>. No libguestfs needed.",
      "<code>iso</code> — attaches a CD-ROM ISO with cloud-init files. Compatible with all images. Slower (requires <code>cloud-localds</code>).",
      "<code>off</code> (default) — disables cloud-init entirely. VM boots with no user setup.",
    ],
    callout: undefined,
  },
  {
    title: "How nocloud-net (net mode) works",
    items: [
      "A temporary HTTP server starts on an available port (8000-9000 range)",
      "Firewall rules allow only the specific VM to reach its server",
      "The VM boots with the nocloud-net kernel command line datasource",
      "Cloud-init fetches <code>meta-data</code>, <code>user-data</code>, and <code>network-config</code> via HTTP",
      "The HTTP server auto-cleans up when the VM is removed",
    ],
    callout: undefined,
  },
  {
    title: "Security model",
    items: [
      "Each VM gets its own HTTP server on a unique port",
      "Source-based firewall rules — only the VM's IP can reach its server",
      "Servers bind to the bridge gateway IP, not <code>0.0.0.0</code>",
      "Rules are tagged with <code># mvm-nocloud:&lt;vm_name&gt;:&lt;port&gt;</code>",
    ],
    callout: undefined,
  },
];

/* ───────────────────────────────────────────────────────────────
   SECTION INTROS & CALLOUTS
   ─────────────────────────────────────────────────────────────── */

export const prerequisitesIntro =
  "mvmctl runs on Linux only — Firecracker requires KVM, which is not available on macOS or Windows. Make sure your system meets these requirements before installing.";

export const prerequisitesSubIntro =
  "mvmctl depends on a few system tools for networking, image handling, and cloud-init:";

export const prerequisitesCallout =
  "On Ubuntu 24.04+, you may need <code>--break-system-packages</code> with <code>pip install</code>. Use the binary or pipx install instead.";

export const installIntro =
  "Four ways to install. The <strong>prebuilt binary</strong> is the fastest — no Python runtime needed.";

export const installCallout =
  'After installing, run <code>mvm --help</code> to verify. If "command not found", ensure <code>/usr/local/bin</code> is in your <code>PATH</code>.';

export const hostInitIntro =
  "Before creating any VMs, your host needs one-time setup: KVM module loading, IP forwarding, the <code>mvm</code> group, sudoers permissions, and bridge networking. This is what <code>mvm init</code> handles for you.";

export const firstVmIntro =
  "This walkthrough takes you from zero to a running microVM: generate an SSH key, download a kernel and OS image, boot the VM, connect, and clean up.";

export const vmLifecycleIntro =
  "Once your VM is created, these commands let you interact with, inspect, snapshot, and tear it down.";

export const resourceManagementIntro =
  "mvmctl manages five resource types: OS images (root filesystems), kernels (vmlinux binaries), Firecracker/jailer binaries, SSH keys, and persistent data disks (volumes).";

export const networkIntro =
  "mvmctl uses Linux bridge/TAP networking with NAT (via nftables or iptables). Each named network is a separate bridge with its own subnet.";

export const dependenciesIntro =
  "mvmctl depends on several system binaries. Most are common Linux utilities; this reference covers what each is for and which package provides it.";

export const cloudInitIntro =
  "Cloud-init configures your VM on first boot: users, SSH keys, networking, startup scripts. mvmctl handles this automatically.";

export const troubleshootingIntro =
  "Common issues, what causes them, and how to fix them:";

export const debugMode = {
  title: "Debug mode",
  description:
    "Enable verbose logging to see what mvmctl is doing under the hood:",
  code: [
    "# Run a single command with verbose (INFO) output:",
    "mvm --verbose vm create myvm --image ubuntu:24.04",
    "",
    "# Run a single command with debug (DEBUG) output:",
    "mvm --debug vm create myvm --image ubuntu:24.04",
    "",
    "# Or use the MVM_LOG_LEVEL env var (takes precedence over defaults,",
    "# but CLI flags --verbose/--debug take precedence over the env var):",
    "MVM_LOG_LEVEL=DEBUG mvm vm create myvm --image ubuntu:24.04",
  ],
  callout:
    "The <code>--verbose</code> flag sets INFO level; <code>--debug</code> sets DEBUG level. CLI flags take precedence over <code>MVM_LOG_LEVEL</code>. Falls back to WARNING if neither flag nor env var is set.",
} as const;

export const helpSection = {
  title: "Getting help",
  description:
    'Still stuck? <a href="https://github.com/AlanD20/mvmctl/issues" rel="noopener noreferrer" target="_blank">Open an issue on GitHub</a> with:',
  items: [
    "The exact command you ran",
    "Full error output (run with <code>MVM_LOG_LEVEL=DEBUG</code>)",
    "Your OS and <code>mvm --version</code>",
  ],
} as const;

/* ───────────────────────────────────────────────────────────────
   TROUBLESHOOTING
   ─────────────────────────────────────────────────────────────── */

export const troubleshooting = [
  {
    problem: "Permission denied: /dev/kvm",
    fix: [
      "# First check if /dev/kvm exists:",
      "ls -l /dev/kvm",
      "",
      "# Case 1 — does not exist (KVM modules not loaded):",
      "sudo modprobe kvm",
      "sudo modprobe kvm_intel    # or kvm_amd on AMD",
      "",
      "# Case 2 — exists but not writable (group membership):",
      "sudo usermod -aG kvm $USER",
      "# Then log out and back in",
    ],
    note: "If <code>/dev/kvm</code> does not exist after <code>modprobe</code>, install KVM modules (e.g. <code>linux-modules-extra-*</code> on Ubuntu). Group membership takes effect on next login.",
  },
  {
    problem: "Bridge mvm-net not found",
    fix: [
      "# The bridge is created automatically. Ensure host init ran:",
      "sudo mvm host init",
    ],
    note: "Re-running <code>sudo mvm host init</code> is safe (idempotent). The default bridge is named <code>mvm-net</code>.",
  },
  {
    problem: "Image not found",
    fix: ["mvm image pull ubuntu --version 24.04", "mvm image ls   # Verify it appears"],
    note: "Image IDs are case-sensitive. Use <code>mvm image ls</code> to see available images.",
  },
  {
    problem: "Kernel not found",
    fix: [
      "mvm kernel pull --type firecracker",
      "mvm kernel ls           # Verify it is cached",
      "mvm kernel ls --remote  # List available remote versions",
    ],
    note: "Default fetch downloads a Firecracker-optimized kernel (~30s). Official builds take 10-30 min.",
  },
  {
    problem: "Firecracker binary not found",
    fix: ["mvm bin pull firecracker --version v1.15", "mvm bin default <id>"],
    note: "Always run <code>mvm bin default &lt;id&gt;</code> after fetching. The default version (e.g. v1.15) matches the installed Firecracker release — you can also pull other versions with <code>mvm bin pull firecracker --version &lt;version&gt;</code>.",
  },
  {
    problem: "VM won't boot / SSH times out",
    fix: [
      "# Watch boot progress:",
      "mvm logs myvm --follow",
      "",
      "# If nothing at all, check Firecracker process log:",
      "mvm logs myvm --os",
    ],
    note: "Wait at least 60 seconds before assuming the VM is stuck. If the boot log shows nothing, the kernel may be incompatible or the image corrupt.",
  },
  {
    problem: "NoCloud-net server failed to start",
    fix: [
      "# Port range (8000-9000) may be exhausted",
      "sudo ss -tlnp | grep -E ':(8[0-9]{3}|9[0-9]{3})'",
      "# Kill orphaned servers",
      "pkill -f mvm-nocloud-server",
    ],
    note: "Each VM uses one port in 8000-9000. If many VMs were not cleaned up, orphaned servers may still be running.",
  },
  {
    problem: "Mixed iptables backends (Docker conflict)",
    fix: [
      "# Symptom: VM has IP, ping works, but TCP times out",
      "# Detection:",
      "iptables --version",
      "sudo iptables-legacy -L -n -v",
      "",
      "# Fix: clear orphaned legacy rules",
      "sudo iptables-legacy -F",
      "",
      "# Then re-run: sudo mvm host init",
    ],
    note: "Docker may switch to iptables-legacy while mvmctl uses iptables-nft. Rules end up in different places. Reboot clears both backends.",
  },
  {
    problem: "Network creation fails with permission denied",
    fix: [
      "# Check mvm group membership",
      "groups | grep mvm",
      "",
      "# If not in group:",
      "sudo usermod -aG mvm $USER",
      "# Then log out and back in",
    ],
    note: "The mvm group also requires a new login session. Use <code>newgrp mvm</code> to avoid logging out.",
  },
  {
    problem: "Console relay not working",
    fix: [
      "# Check relay status",
      "mvm console myvm --state",
      "",
      "# Kill and re-attach",
      "mvm console myvm --kill",
      "mvm console myvm",
    ],
    note: "The console relay uses vsock. Ensure <code>vhost_vsock</code> kernel module is loaded: <code>lsmod | grep vsock</code>.",
  },
  {
    problem: "Cache corruption or stale state",
    fix: [
      "# Preview what would be removed",
      "mvm cache prune --all --dry-run",
      "",
      "# Remove stale entries from a specific type",
      "mvm cache prune vm",
      "",
      "# Full reset (removes ALL VMs — careful!)",
      "mvm cache prune --all",
    ],
    note: "Cache corruption usually shows as metadata pointing to deleted files, or phantom VMs. <code>mvm cache prune</code> reconciles metadata with actual files.",
  },
  {
    problem: "Volume attach fails — volume is already attached",
    fix: [
      "# Check volume status",
      "mvm volume inspect my-data",
      "",
      "# Detach from current VM first",
      "mvm vm detach-volume <vm-name> my-data",
      "",
      "# Force remove (use with caution)",
      "mvm volume rm my-data -f",
    ],
    note: "A volume can only be attached to one VM at a time. Detach it first or create a new volume. Use <code>--force / -f</code> on volume rm to skip the attached check.",
  },
] as const;
