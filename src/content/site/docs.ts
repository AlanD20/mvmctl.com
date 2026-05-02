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
    children: [
      { id: "vm-create-flags", label: "All flags", icon: "terminal" },
    ],
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
      { id: "vm-lifecycle-rm", label: "Removing VMs", icon: "terminal" },
    ],
  },
  {
    id: "resource-management",
    label: "Resource Management",
    icon: "archive",
    children: [
      { id: "resource-management-image", label: "Image management", icon: "archive" },
      { id: "resource-management-kernel", label: "Kernel management", icon: "archive" },
      { id: "resource-management-bin", label: "Binary management", icon: "archive" },
      { id: "resource-management-key", label: "SSH key management", icon: "archive" },
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
  { id: "vm-lifecycle-rm", label: "Removing VMs", level: 3 },
  { id: "resource-management", label: "Resource Management" },
  { id: "resource-management-image", label: "Image management", level: 3 },
  { id: "resource-management-kernel", label: "Kernel management", level: 3 },
  { id: "resource-management-bin", label: "Binary management", level: 3 },
  { id: "resource-management-key", label: "SSH key management", level: 3 },
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
  { id: "api-error-handling", label: "Error Handling" },
  { id: "api-vm-operation", label: "VMOperation", level: 3 },
  { id: "api-network-operation", label: "NetworkOperation", level: 3 },
  { id: "api-image-operation", label: "ImageOperation", level: 3 },
  { id: "api-kernel-operation", label: "KernelOperation", level: 3 },
  { id: "api-key-operation", label: "KeyOperation", level: 3 },
  { id: "api-binary-operation", label: "BinaryOperation", level: 3 },
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
      { id: "api-model-vminstanceitem", label: "VMInstanceItem", icon: "archive" },
      { id: "api-model-networkitem", label: "NetworkItem", icon: "archive" },
      { id: "api-model-imageitem", label: "ImageItem", icon: "archive" },
      { id: "api-model-kernelitem", label: "KernelItem", icon: "archive" },
      { id: "api-model-binaryitem", label: "BinaryItem", icon: "archive" },
      { id: "api-model-sshkeyitem", label: "SSHKeyItem", icon: "archive" },
    ],
  },
  { id: "api-error-handling", label: "Error Handling", icon: "spanner" },
  { id: "api-vm-operation", label: "VMOperation", icon: "terminal" },
  { id: "api-network-operation", label: "NetworkOperation", icon: "terminal" },
  { id: "api-image-operation", label: "ImageOperation", icon: "terminal" },
  { id: "api-kernel-operation", label: "KernelOperation", icon: "terminal" },
  { id: "api-key-operation", label: "KeyOperation", icon: "terminal" },
  { id: "api-binary-operation", label: "BinaryOperation", icon: "terminal" },
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
] as const;

export const distroPackages = {
  ubuntu: {
    title: "Ubuntu / Debian packages",
    id: "ubuntu-packages",
    command: ["sudo apt-get install -y iproute2 iptables cloud-image-utils qemu-utils"],
  },
  arch: {
    title: "Arch packages",
    id: "arch-packages",
    command: ["sudo pacman -S --needed iproute2 iptables cloud-utils qemu-base"],
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
    description: "Isolated Python app install. Keeps mvmctl separate from system Python.",
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
      'Run <code>mvm init</code> — it walks you through everything: host config, kernel download, image download, SSH key setup. Escalates to root automatically when needed.',
    code: ["mvm init"],
    callout: 'When prompted to log out/in, <strong>do it</strong>. Group membership changes only apply to new login sessions. If you skip this, subsequent commands will fail with permission errors. Alternatively run <code>newgrp mvm</code> to avoid logging out.',
  },
  {
    title: "Manual host setup",
    description:
      'Prefer doing things step by step? <code>sudo mvm host init</code> does the one-time machine setup. It is idempotent — safe to re-run.',
    code: ["sudo mvm host init"],
    callout: '<code>mvm host init</code> requires sudo because it creates the <code>mvm</code> system group, writes sudoers drop-in files, loads KVM kernel modules, enables IP forwarding, and sets up bridge/TAP networking. Normal <code>mvm</code> commands do not need sudo after this runs.',
  },
  {
    title: "What host init actually does",
    items: [
      'Loads <code>kvm</code>, <code>kvm_intel</code>/<code>kvm_amd</code>, <code>tun</code>, and <code>bridge</code> kernel modules',
      'Enables <code>net.ipv4.ip_forward</code> for NAT networking',
      'Creates the <code>mvm</code> system group and adds your user to it',
      'Writes a sudoers drop-in to <code>/etc/sudoers.d/mvm</code> so mvmctl can run privileged commands (ip, iptables, sysctl, modprobe) without password prompts',
      'Sets up the <code>mvm-net</code> bridge and iptables chains for NAT',
    ],
  },
  {
    title: "Other host commands",
    code: [
      "mvm host ls       # Show current host configuration state — useful for verifying setup",
      "mvm host clean    # Remove networking config only (bridges, TAPs, iptables rules)",
      "mvm host reset    # Full rollback — networking, sysctl, sudoers, and the mvm group",
    ],
    callout: '<code>mvm host reset</code> is destructive. It removes the mvm group, meaning anyone in it loses mvm access. Only use if you are permanently uninstalling mvmctl.',
  },
];

/* ───────────────────────────────────────────────────────────────
   FIRST VM
   ─────────────────────────────────────────────────────────────── */

export const firstVmSections = [
  {
    title: "Step by step",
    description:
      'Create a complete microVM from scratch: generate an SSH key, download a kernel and OS image, boot the VM, connect, and clean up.',
    code: [
      "# 1. Generate an SSH key for VM access",
      "mvm key create test",
      "mvm key set-default test",
      "",
      "# 2. Download Firecracker-optimized kernel (~30s)",
      "mvm kernel fetch --type firecracker",
      "",
      "# 3. Download an Ubuntu 24.04 image",
      "mvm image fetch ubuntu-24.04",
      "",
      "# 4. Create and start the VM",
      "mvm vm create --name myvm --image ubuntu-24.04",
      "",
      "# 5. Wait for cloud-init to finish (~30-60s)",
      "mvm logs myvm --follow",
      "",
      "# 6. SSH into the VM",
      "mvm ssh --name myvm",
      "",
      "# 7. List running VMs",
      "mvm vm ls",
      "",
      "# 8. Remove the VM when done",
      "mvm vm rm --name myvm --force",
    ],
    callouts: [
      'Cloud-init takes 30-60 seconds on first boot. The VM <strong>is running</strong> during this time — it is just running startup scripts. Watch progress with <code>mvm logs myvm --follow</code>.',
      'You need at least one SSH key set up before creating a VM. Without a default key (<code>mvm key set-default</code>), pass <code>--ssh-key</code> explicitly.',
      'Images are several hundred MB. Ensure at least 2 GB free in <code>~/.cache/mvmctl/</code>.',
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
  whatItDoes: 'Creates and immediately starts a Firecracker microVM. Under the hood mvmctl: (1) copies the root filesystem image to a per-VM directory, (2) generates a Firecracker JSON boot config, (3) picks an available IP from the network lease pool, (4) starts a temporary HTTP server for cloud-init, (5) launches Firecracker (+ jailer). There is no separate "start" command — the VM boots right away.',
  callouts: [
    'Firecracker is not a hypervisor you can "pause" like VirtualBox. <code>mvm vm create</code> starts the VM <strong>immediately</strong>.',
    'Each VM gets an IP from the lease pool. The default network (<code>net</code>) uses <code>172.27.0.0/24</code>. Leases are reused when VMs are removed.',
    'The <code>--disk-size</code> flag resizes via <code>qemu-img resize</code>. It only grows the image — shrinking requires manual intervention.',
    'If you do not set <code>--ssh-key</code> and have no default key, the VM will boot but you cannot SSH in. Use <code>mvm console</code> for serial access instead.',
  ],
};

export const vmCreateFlagLines: readonly string[] = [
  "--name, -n NAME            VM name (required). Used to identify the VM in all commands.",
  "--image IMAGE              Image name or ID (e.g. ubuntu-24.04). Required unless --image-path given.",
  "--image-path PATH          Direct path to rootfs image file (overrides --image).",
  "--kernel KERNEL            Kernel short ID or path. Auto-detected from defaults if omitted.",
  "--kernel-path PATH         Direct path to vmlinux kernel file (overrides --kernel).",
  "--vcpus, --cpus N          vCPU count. Default: 1.",
  "--mem, --memory N          Memory in MiB. Default: 512.",
  "--disk-size, -s SIZE       Rootfs disk size (e.g. 1G, 512M or 1024M). Default: from config.",
  "--ssh-key KEY              SSH public key name or path, e.g. 'mykey' or ~/.ssh/id_ed25519.pub",
  "--user USER                Default SSH user for cloud-init. Default: from config.",
  "--ip ADDRESS               Static guest IP, e.g. 172.27.0.42. Default: auto-assigned.",
  "--network, --net NAME      Named network to attach to. Default: 'net'.",
  "--mac ADDRESS              Custom MAC address. Auto-generated if omitted.",
  "--cloud-init-mode MODE     One of: off (default), inject, iso, net.",
  "--user-data PATH           Path to custom cloud-init user-data file.",
  "--nocloud-net-port PORT    Port for nocloud-net HTTP server (0=auto-assign).",
  "--enable-pci/--no-enable-pci   Enable PCI device support.",
  "--no-console               Disable serial console.",
  "--lsm-flags FLAGS          Linux Security Module flags for kernel cmdline.",
  "--firecracker-bin PATH     Path to firecracker binary. Env var: MVM_FIRECRACKER_BIN.",
  "--enable-logging/--no-enable-logging  Enable Firecracker logging.",
  "--enable-metrics/--no-enable-metrics  Enable Firecracker metrics.",
  "--skip-cleanup             Skip cleanup on failure (for debugging).",
];

export const vmCreateExamples = [
  {
    title: "Minimal — get a default VM running fast",
    code: [
      "# Assuming kernel + image fetched, default key set:",
      "mvm vm create --name myvm --image ubuntu-24.04",
    ],
    note: 'Defaults: 1 vCPU, 512 MiB RAM, auto-assigned IP on network <code>net</code> (172.27.0.0/24).',
  },
  {
    title: "Custom resources",
    code: [
      "mvm vm create \\",
      "  --name build-vm \\",
      "  --image ubuntu-24.04 \\",
      "  --vcpus 4 \\",
      "  --mem 8192 \\",
      "  --disk-size 50G",
    ],
    note: 'Useful for CI runners or compiling in isolated environments.',
  },
  {
    title: "Specific network and static IP",
    code: [
      "# First create a network",
      "mvm network create isolated --subnet 10.0.0.0/24",
      "",
      "# Then attach the VM with a fixed IP",
      "mvm vm create --name myvm --image ubuntu-24.04 --network isolated --ip 10.0.0.50",
    ],
    note: 'The IP must fall within the network subnet. Default network <code>net</code> uses <code>172.27.0.0/24</code>.',
  },
  {
    title: "Non-root user and custom SSH key",
    code: [
      "mvm key create workstation-key",
      "mvm vm create \\",
      "  --name dev-vm \\",
      "  --image ubuntu-24.04 \\",
      "  --ssh-key workstation-key \\",
      "  --user ubuntu",
    ],
    note: 'The <code>--user</code> flag sets the cloud-init default user. This user gets password-less sudo inside the VM.',
  },
  {
    title: "Alpine — lightweight and fast",
    code: [
      "mvm image fetch alpine-3.21",
      "mvm vm create --name tiny-vm --image alpine-3.21 --vcpus 1 --mem 256",
    ],
    note: 'Alpine boots in seconds. Great for testing or ephemeral workloads.',
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
      "mvm vm create --name myvm --image ubuntu-24.04 --user-data my-user-data.yaml",
    ],
    note: 'Custom user-data merges with mvmctl\'s default cloud-init. You can add packages, write files, run commands, etc.',
  },
];

/* ───────────────────────────────────────────────────────────────
   VM LIFECYCLE
   ─────────────────────────────────────────────────────────────── */

export const sshExplanation = {
  whatItDoes: 'SSH into a running VM by name. Resolves the VM name to its IP address from the lease database and connects with the cached SSH key.',
  callouts: [
    'SSH only works after cloud-init finishes. On first boot, cloud-init generates SSH host keys and configures the default user. This takes 30-60 seconds.',
    'mvmctl automatically passes the correct SSH key and user. You do not need <code>ssh -i</code> commands. But you do need a key set up beforehand.',
    'Works on custom networks too — mvmctl looks up the correct IP from the lease database.',
  ],
  examples: [
    { code: "mvm ssh --name myvm", note: 'SSH as the default user (usually root unless --user was specified).' },
    { code: "mvm ssh --name myvm --user admin", note: 'SSH as a specific user.' },
  ],
};

export const consoleExplanation = {
  whatItDoes: 'Attaches a PTY-based serial console to a VM using a vsock relay. No network stack required. Works even if the VM has no IP or cloud-init failed.',
  callouts: [
    'Press <code>Ctrl+X</code> then <code>D</code> to detach from the console session. This does <strong>not</strong> shut down the VM.',
    'The console relay runs as a background process. If it crashes, use <code>mvm console --kill</code> then re-attach.',
    'Use <code>--state</code> to check if the relay is running without attaching. Handy for scripting.',
    'Requires the <code>vhost_vsock</code> kernel module. Check with <code>lsmod | grep vsock</code>.',
  ],
  examples: [
    { code: "mvm console --name myvm", note: 'Attach to the VM serial console interactively.' },
    { code: "mvm console --name myvm --state", note: 'Check if the console relay is running (does not attach).' },
    { code: "mvm console --name myvm --kill", note: 'Kill a stuck console relay.' },
  ],
};

export const logsExplanation = {
  whatItDoes: 'View or stream VM logs. Two types: boot (serial console — kernel boot messages, cloud-init, login prompts) and OS (Firecracker process stderr/stdout).',
  callouts: [
    '<code>--follow</code> / <code>-f</code> streams logs in real-time (like <code>tail -f</code>). Press <code>Ctrl+C</code> to stop.',
    'Use <code>--os</code> to show Firecracker process logs instead of serial console output.',
    'Use <code>--lines</code> / <code>-n</code> to limit output to the last N lines.',
    'Log files are in <code>~/.cache/mvmctl/vms/&lt;vm-sha&gt;/</code> as <code>firecracker.console.log</code> and <code>firecracker.log</code>.',
  ],
  examples: [
    { code: "mvm logs myvm --follow", note: 'Watch the VM boot in real-time. Best for checking if cloud-init finished.' },
    { code: "mvm logs myvm --os", note: 'Check Firecracker stderr — useful if the VM failed to start.' },
    { code: "mvm logs myvm", note: 'View the full boot log (static, not following).' },
  ],
};

export const snapshotExplanation = {
  whatItDoes: 'Saves VM memory and disk state to disk. <code>mvm vm load</code> restores it later. Useful for preserving a long-running VM state before rebooting the host.',
  callouts: [
    'Snapshots can be large — memory + disk. A VM with 2 GiB RAM creates a ~2 GiB memory file.',
    'The VM continues running while being snapshotted. The snapshot is crash-consistent (like pulling the power cord).',
    'Snapshots are stored in <code>~/.cache/mvmctl/vms/&lt;vm-sha&gt;/snapshots/</code>.',
  ],
  examples: [
    { code: "mvm vm snapshot myvm <mem_file> <state_file>", note: 'Snapshot a running VM. Requires memory and state file paths.' },
    { code: "mvm vm load myvm <mem_file> <state_file>", note: 'Restore the VM from memory and state files.' },
  ],
};

export const vmRmExplanation = {
  whatItDoes: 'Stops the Firecracker process, removes iptables rules, kills the nocloud-net server, and deletes the VM state directory.',
  callouts: [
    'Without <code>--force</code>, the command asks for confirmation. Use <code>--force</code> in scripts.',
    '<code>mvm cache prune vm</code> removes all stopped VMs at once. Asks for confirmation by default.',
    'Removing a VM frees its IP lease, making it available for new VMs.',
    'Stopped VMs (crashed or killed) still show in <code>mvm vm ls</code> until removed with <code>rm</code> or <code>prune</code>.',
  ],
  examples: [
    { code: "mvm vm rm myvm", note: 'Remove a VM with confirmation.' },
    { code: "mvm vm rm myvm --force", note: 'Remove without asking (script-friendly).' },
    { code: "mvm cache prune vm", note: 'Remove all stopped VMs at once.' },
  ],
};

export const vmInspectExplanation = {
  whatItDoes: 'Shows detailed VM information: SHA256 hash ID, IP address, network, kernel path, image path, resources, creation time, and current state.',
  examples: [
    { code: "mvm vm inspect myvm", note: 'Show all details for a VM.' },
    { code: "mvm vm ls", note: 'List all VMs with brief info (name, IP, status).' },
  ],
};

export const vmPsExplanation = {
  whatItDoes: 'List only running VMs (active Firecracker processes). Shows name, status, IP, resources, and image/kernel IDs.',
  examples: [
    { code: "mvm vm ps", note: 'Show only VMs that are currently running or starting.' },
  ],
};

/* ───────────────────────────────────────────────────────────────
   RESOURCE MANAGEMENT
   ─────────────────────────────────────────────────────────────── */

export const imageSections = [
  {
    title: "What images are",
    description:
      'Images are root filesystem images (ext4 format) that provide the OS for your microVM. mvmctl can fetch pre-built images from the registry or import local files.',
    callout: undefined,
  },
  {
    title: "Available images",
    description: 'These image IDs are built into mvmctl and can be fetched with <code>mvm image fetch &lt;id&gt;</code>:',
    items: [
      '<code>ubuntu-24.04</code> — Ubuntu 24.04 LTS (Noble Numbat)',
      '<code>ubuntu-24.04-minimal</code> — Ubuntu 24.04 LTS minimal',
      '<code>ubuntu-22.04</code> — Ubuntu 22.04 LTS (Jammy Jellyfish)',
      '<code>ubuntu-fc</code> — Firecracker-optimized Ubuntu image',
      '<code>archlinux</code> — Arch Linux cloud image (converted to btrfs)',
      '<code>debian-bookworm</code> — Debian 12 (Bookworm)',
      '<code>alpine-3.21</code> — Alpine Linux 3.21',
    ],
  },
  {
    title: "Fetching images",
    code: [
      "# Fetch an image",
      "mvm image fetch ubuntu-24.04",
      "",
      "# Force re-download (overwrites cached copy)",
      "mvm image fetch ubuntu-24.04 --force",
      "",
      "# List available images (local + registry)",
      "mvm image ls",
    ],
    callout: 'Images are typically 200-800 MB compressed. Cached in <code>~/.cache/mvmctl/images/</code>. Each VM gets its own copy.',
  },
  {
    title: "Importing custom images",
    description:
      'Have a custom rootfs (e.g., from Packer)? Import it into the cache:',
    code: [
      "mvm image import my-custom-image /path/to/my-custom-image.ext4",
      "mvm image ls                     # Verify it shows up",
      "mvm image set-default my-custom-image",
    ],
    callout: 'Syntax: <code>mvm image import NAME SOURCE_PATH</code>. Supports ext4 raw images, qcow2, and tar-rootfs archives natively — no manual conversion needed.',
  },
  {
    title: "Managing images",
    code: [
      "mvm image ls                          # List all cached images",
      "mvm image inspect <id>                # Show detailed image info",
      "mvm image set-default <id>            # Set default for new VMs",
      "mvm image rm <id>                     # Remove a cached image (full or short SHA)",
      "mvm image warm <id>                   # Pre-decompress to ready pool for fast VM creation",
    ],
  },
];

export const kernelSections = [
  {
    title: "What kernels are",
    description:
      'Firecracker requires an <strong>uncompressed ELF binary</strong> (<code>vmlinux</code>) — not the compressed <code>vmlinuz</code> used by traditional bootloaders. mvmctl supports two kernel types.',
  },
  {
    title: "Firecracker-optimized kernel (recommended)",
    description:
      'A pre-built kernel from the Firecracker CI pipeline. Minimally configured for fast boot — no PCI, no ACPI. Downloads in ~30 seconds.',
    code: ["mvm kernel fetch --type firecracker", "# Downloads the latest Firecracker-optimized kernel"],
    callout: 'This is the default. Use this unless you need custom kernel modules or a specific version. Boots in under 200ms.',
  },
  {
    title: "Official upstream kernel (custom build)",
    description:
      'Downloads the official Linux kernel source (default: 6.19.9) and compiles it with a Firecracker-compatible config. Takes 10-30 minutes.',
    code: [
      "# Build latest upstream kernel",
      "mvm kernel fetch --type official",
      "",
      "# Build a specific version",
      "mvm kernel fetch --type official --version 6.6",
      "",
      "# Apply a custom kernel config fragment",
      "mvm kernel fetch --type official --config /path/to/my-fragment.config",
      "",
      "# Specify architecture and parallel build jobs",
      "mvm kernel fetch --type official --arch arm64 --jobs 8",
      "",
      "# Set as default after fetch",
      "mvm kernel fetch --type official --set-default",
      "",
      "# Force clean rebuild (bypass cache)",
      "mvm kernel fetch --type official --clean-build",
    ],
    callout: 'Official builds require build deps: <code>build-essential</code>, <code>flex</code>, <code>bison</code>, <code>libelf-dev</code>, <code>libssl-dev</code>, <code>libncurses-dev</code>, <code>bc</code>, <code>git</code>, <code>curl</code>, <code>pkg-config</code>, <code>dwarves</code> (for pahole). Expect 10-30 min build times. Use <code>--config PATH</code> to apply a custom kernel config fragment, <code>--arch ARCH</code> for architecture (x86_64, arm64), <code>--jobs N</code> for parallel build jobs, and <code>--set-default</code> to set as default after fetch.',
  },
  {
    title: "Managing kernels",
    code: [
      "mvm kernel ls                    # List cached kernels",
      "mvm kernel set-default <id>      # Set as default for VM creation",
      "mvm kernel rm <id>               # Remove a cached kernel",
    ],
  },
];

export const binarySections = [
  {
    title: "What binaries are",
    description:
      'Firecracker and jailer binaries downloaded from the Firecracker GitHub releases page. You need at least one version downloaded to create VMs.',
  },
  {
    title: "Managing binaries",
    code: [
      "# Download Firecracker v1.15.0 (includes jailer)",
      "mvm bin fetch 1.15.0",
      "",
      "# List downloaded versions",
      "mvm bin ls",
      "",
      "# List remote versions available for download",
      "mvm bin ls --remote",
      "",
      "# Set as active version by ID prefix",
      "mvm bin default abc123",
      "",
      "# Remove by version",
      "mvm bin rm --version 1.15.0",
      "",
      "# Remove by ID",
      "mvm bin rm abc123",
    ],
    callout: '<code>mvm bin fetch</code> downloads both <code>firecracker</code> and <code>jailer</code> together. They must match versions — mixing v1.14 firecracker with v1.15 jailer causes runtime errors.',
  },
];

export const keySections = [
  {
    title: "What keys are for",
    description:
      'SSH public keys cached by mvmctl for injection into VMs via cloud-init. Without at least one key, you cannot SSH into your VMs (console access still works).',
  },
  {
    title: "Creating and managing keys",
    code: [
      "# Generate a new ED25519 keypair (recommended)",
      "mvm key create mykey",
      "",
      "# Import an existing public key",
      "mvm key add mykey ~/.ssh/id_ed25519.pub",
      "",
      "# List all cached keys",
      "mvm key ls",
      "",
      "# Show key details",
      "mvm key inspect mykey",
      "",
      "# Set default keys for VM creation",
      "mvm key set-default mykey",
      "mvm key set-default mykey backupkey",
      "",
      "# Export a key to ~/.ssh",
      "mvm key export mykey",
      "",
      "# Remove a key from cache",
      "mvm key rm mykey",
    ],
    callout: 'Keys are stored in <code>~/.cache/mvmctl/keys/</code>. These are <strong>public keys only</strong>. The private key stays wherever it was generated (usually <code>~/.ssh/mvmctl_&lt;name&gt;</code>). <code>mvm key create</code> generates both.',
  },
  {
    title: "How keys work with VMs",
    description:
      'When you create a VM with <code>--ssh-key mykey</code> (or use the default key), mvmctl injects the public key into cloud-init user-data. After cloud-init finishes (~30-60s), you can SSH in with <code>mvm ssh --name myvm</code>.',
  },
];

/* ───────────────────────────────────────────────────────────────
   NETWORK
   ─────────────────────────────────────────────────────────────── */

export const networkSections = [
  {
    title: "How networking works",
    description:
      'mvmctl uses Linux bridge/TAP networking with iptables NAT. Each named network is a Linux bridge with its own subnet. VMs get TAP interfaces and IPs from a lease pool. Traffic is NATed to the host network.',
  },
  {
    title: "The default network",
    description: `The default network is called <strong>${NET_NAME}</strong> and uses <strong>${NET_SUBNET}</strong> (gateway: ${NET_GATEWAY}). It is created automatically the first time you run <code>sudo mvm host init</code> — no manual network setup needed for basic use.`,
    callout: `The default network name is <code>${NET_NAME}</code>. The bridge device is named <code>mvm-${NET_NAME}</code> (<code>mvm-net</code>), following the convention <code>mvm-&lt;network-name&gt;</code>.`,
  },
  {
    title: "Network commands",
    code: [
      "# Create a named network with a custom subnet",
      "# You will be prompted to select interface(s) for NAT",
      "mvm network create mynet --subnet 10.0.1.0/24",
      "",
      "# Create with explicit NAT gateway interfaces",
      "mvm network create mynet --subnet 10.0.1.0/24 --nat-gateways eth0",
      "",
      "# Create without NAT (no internet access for VMs)",
      "mvm network create mynet --subnet 10.0.1.0/24 --no-nat",
      "",
      "# List all networks",
      "mvm network ls",
      "",
      "# Show network details",
      "mvm network inspect mynet",
      "",
      "# Set a network as default",
      "mvm network set-default mynet",
      "",
      "# Sync iptables rules between database and host",
      "mvm network sync",
      "",
      "# Remove a network (only if no VMs attached)",
      "mvm network rm mynet",
    ],
    callout: 'You cannot remove a network that has VMs attached. Stop and remove the VMs first.',
  },
  {
    title: "Using networks with VMs",
    code: [
      "# Create a VM on a custom network",
      "mvm network create isolated --subnet 10.0.0.0/24",
      "mvm vm create --name myvm --image ubuntu-24.04 --network isolated",
      "",
      "# Assign a specific IP",
      "mvm vm create --name myvm --image ubuntu-24.04 --network isolated --ip 10.0.0.50",
    ],
    note: 'Custom networks get the subnet you specify. The bridge device is named <code>mvm-&lt;network-name&gt;</code>. Each VM gets a unique MAC address (auto-generated with the <code>02:FC</code> prefix).',
  },
];

/* ───────────────────────────────────────────────────────────────
   CONFIGURATION
   ─────────────────────────────────────────────────────────────── */

export const configSections = [
  {
    title: "Configuration priority",
    description:
      'Settings resolve in this order (lower overrides higher):',
    items: [
      'Built-in defaults from <code>constants.py</code> (compiled into the package)',
      'Runtime config file (<code>~/.config/mvmctl/config.json</code>)',
      '<code>MVM_*</code> environment variables',
      'CLI flags (highest priority)',
    ],
  },
  {
    title: "Config file location",
    description:
      'Runtime config: <code>~/.config/mvmctl/config.json</code> (override with <code>MVM_CONFIG_DIR</code>). Asset cache: <code>~/.cache/mvmctl/</code> (override with <code>MVM_CACHE_DIR</code>).',
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
      "MVM_LOG_LEVEL          Log level: DEBUG, INFO, WARNING, ERROR  INFO",
      "MVM_FIRECRACKER_BIN    Override Firecracker binary path",
    ],
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
      "# Completely clean all cache (nuclear option)",
      "mvm cache clean",
      "mvm cache clean --dry-run",
    ],
    callout: 'Always run <code>--dry-run</code> first. Cache pruning is one-way. <code>mvm cache clean</code> removes ALL cached assets AND host networking, but does not touch running VMs unless you use <code>--all</code>.',
  },
];

/* ───────────────────────────────────────────────────────────────
   DEPENDENCIES
   ─────────────────────────────────────────────────────────────── */

export const dependencySections = [
  {
    title: "Core runtime dependencies",
    description: 'These binaries are required for basic mvmctl operations:',
    callout: undefined,
    headers: ["Binary", "Purpose", "Debian/Ubuntu", "Arch"],
    rows: [
      ["firecracker", "MicroVM VMM", "mvm bin fetch", "mvm bin fetch"],
      ["jailer", "Security isolation", "mvm bin fetch", "mvm bin fetch"],
      ["ip", "Bridge/TAP management", "iproute2", "iproute2"],
      ["iptables", "NAT and firewall rules", "iptables", "iptables"],
      ["sysctl", "IP forwarding", "procps", "procps-ng"],
      ["modprobe", "KVM module loading", "kmod", "kmod"],
      ["lsmod", "KVM module status", "kmod", "kmod"],
      ["groupadd", "mvm group creation", "passwd", "shadow"],
      ["usermod", "User group membership", "passwd", "shadow"],
      ["visudo", "Sudoers validation", "sudo", "sudo"],
      ["sudo", "Privileged commands", "sudo", "sudo"],
      ["dumpe2fs", "Filesystem inspection", "e2fsprogs", "e2fsprogs"],
    ],
  },
  {
    title: "Image & cloud-init dependencies",
    callout: undefined,
    headers: ["Binary", "Purpose", "Debian/Ubuntu", "Arch"],
    rows: [
      ["qemu-img", "Image conversion/resize", "qemu-utils", "qemu-img"],
      ["sfdisk", "Partition table manipulation", "util-linux", "util-linux"],
      ["parted", "Partition reading", "parted", "parted"],
      ["blkid", "Root partition/UUID detection", "util-linux", "util-linux"],
      ["mount/umount", "Image mounting", "util-linux", "util-linux"],
      ["truncate", "Sparse file creation", "coreutils", "coreutils"],
      ["mkfs.ext4", "Rootfs formatting", "e2fsprogs", "e2fsprogs"],
      ["unsquashfs", "SquashFS extraction", "squashfs-tools", "squashfs-tools"],
      ["tar", "Tarball extraction", "tar", "tar"],
      ["cloud-localds", "Cloud-init seed ISO", "cloud-image-utils", "cloud-utils"],
      ["ssh-keygen", "SSH key generation", "openssh-client", "openssh"],
      ["ssh", "VM connection", "openssh-client", "openssh"],
    ],
  },
  {
    title: "libguestfs (optional — for cloud-init direct injection)",
    description:
      'Required only if you use <code>--cloud-init-mode inject</code>. The <code>guestfs</code> Python module is <strong>not on PyPI</strong> — install via your package manager.',
    code: [
      "# Debian/Ubuntu",
      "sudo apt-get install libguestfs0 libguestfs-tools supermin python3-libguestfs",
      "",
      "# Arch",
      "sudo pacman -S libguestfs supermin",
      "",
      "# Verify",
      "python3 -c 'import guestfs; print(\"OK\")'",
    ],
  },
  {
    title: "Kernel build dependencies (optional)",
    description: 'Only needed if you use <code>mvm kernel fetch --type official</code> (build from source):',
    callout: undefined,
    headers: ["Category", "Debian/Ubuntu", "Arch"],
    rows: [
      ["Build tools", "build-essential", "base-devel"],
      ["flex", "flex", "flex"],
      ["bison", "bison", "bison"],
      ["libelf", "libelf-dev", "libelf"],
      ["openssl", "libssl-dev", "openssl"],
      ["ncurses", "libncurses-dev", "ncurses"],
      ["bc", "bc", "bc"],
      ["pahole", "dwarves", "pahole"],
      ["git", "git", "git"],
      ["curl", "curl", "curl"],
      ["pkg-config", "pkg-config", "pkgconf"],
    ],
  },
  {
    title: "Host system requirements",
    callout: undefined,
    items: [
      '<strong>Kernel modules:</strong> <code>kvm</code>, <code>kvm_intel</code> or <code>kvm_amd</code>, <code>tun</code>, <code>bridge</code>, <code>vhost_vsock</code>',
      '<strong>Hardware virtualization:</strong> VT-x (Intel) or AMD-V must be enabled in BIOS/UEFI',
      '<strong>Permissions:</strong> The user must be in the <code>mvm</code> group (created by <code>sudo mvm host init</code>)',
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
      'Cloud-init configures your VM on first boot: sets up users, injects SSH keys, configures networking, runs startup scripts. mvmctl handles this automatically.',
    callout: undefined,
  },
  {
    title: "How mvmctl handles cloud-init",
    description:
      'By default, mvmctl uses the <strong>off</strong> mode — cloud-init is disabled. When enabled, the default is <strong>inject</strong> mode via libguestfs. If libguestfs is not available, it falls back to <strong>net</strong> mode (temporary HTTP server, a.k.a. nocloud-net).',
    callout: undefined,
  },
  {
    title: "Cloud-init modes",
    items: [
      '<code>inject</code> (default) — injects cloud-init files directly into the rootfs using libguestfs. Fastest and most reliable.',
      '<code>net</code> — starts a temporary HTTP server (nocloud-net). The VM fetches config during boot via <code>ds=nocloud-net;s=http://GATEWAY_IP:PORT/</code>. No libguestfs needed.',
      '<code>iso</code> — attaches a CD-ROM ISO with cloud-init files. Compatible with all images. Slower (requires <code>cloud-localds</code>).',
      '<code>off</code> (default) — disables cloud-init entirely. VM boots with no user setup.',
    ],
    callout: undefined,
  },
  {
    title: "How nocloud-net (net mode) works",
    items: [
      'A temporary HTTP server starts on an available port (8000-9000 range)',
      'iptables rules allow only the specific VM to reach its server',
      'The VM boots with the nocloud-net kernel command line datasource',
      'Cloud-init fetches <code>meta-data</code>, <code>user-data</code>, and <code>network-config</code> via HTTP',
      'The HTTP server auto-cleans up when the VM is removed',
    ],
    callout: undefined,
  },
  {
    title: "Security model",
    items: [
      'Each VM gets its own HTTP server on a unique port',
      'Source-based iptables rules — only the VM\'s IP can reach its server',
      'Servers bind to the bridge gateway IP, not <code>0.0.0.0</code>',
      'Rules are tagged with <code># mvm-nocloud:&lt;vm_name&gt;:&lt;port&gt;</code>',
    ],
    callout: undefined,
  },
];

/* ───────────────────────────────────────────────────────────────
   SECTION INTROS & CALLOUTS
   ─────────────────────────────────────────────────────────────── */

export const prerequisitesIntro =
  'mvmctl runs on Linux only — Firecracker requires KVM, which is not available on macOS or Windows. Make sure your system meets these requirements before installing.';

export const prerequisitesSubIntro =
  'mvmctl depends on a few system tools for networking, image handling, and cloud-init:';

export const prerequisitesCallout =
  'On Ubuntu 24.04+, you may need <code>--break-system-packages</code> with <code>pip install</code>. Use the binary or pipx install instead.';

export const installIntro =
  'Four ways to install. The <strong>prebuilt binary</strong> is the fastest — no Python runtime needed.';

export const installCallout =
  'After installing, run <code>mvm --help</code> to verify. If "command not found", ensure <code>/usr/local/bin</code> is in your <code>PATH</code>.';

export const hostInitIntro =
  'Before creating any VMs, your host needs one-time setup: KVM module loading, IP forwarding, the <code>mvm</code> group, sudoers permissions, and bridge networking. This is what <code>mvm init</code> handles for you.';

export const firstVmIntro =
  'This walkthrough takes you from zero to a running microVM: generate an SSH key, download a kernel and OS image, boot the VM, connect, and clean up.';

export const vmLifecycleIntro =
  'Once your VM is created, these commands let you interact with, inspect, snapshot, and tear it down.';

export const resourceManagementIntro =
  'mvmctl manages four resource types: OS images (root filesystems), kernels (vmlinux binaries), Firecracker/jailer binaries, and SSH keys.';

export const networkIntro =
  'mvmctl uses Linux bridge/TAP networking with iptables NAT. Each named network is a separate bridge with its own subnet.';

export const dependenciesIntro =
  'mvmctl depends on several system binaries. Most are common Linux utilities; this reference covers what each is for and which package provides it.';

export const cloudInitIntro =
  'Cloud-init configures your VM on first boot: users, SSH keys, networking, startup scripts. mvmctl handles this automatically.';

export const troubleshootingIntro =
  'Common issues, what causes them, and how to fix them:';

export const debugMode = {
  title: 'Debug mode',
  description:
    'Enable debug logging to see what mvmctl is doing under the hood:',
  code: [
    '# Enable persistently:',
    'mvm config set debug.enabled true',
    '',
    '# Run a single command with debug output:',
    'MVM_LOG_LEVEL=DEBUG mvm vm create --name myvm --image ubuntu-24.04',
    '',
    '# Disable when done:',
    'mvm config set debug.enabled false',
  ],
  callout:
    'Use <code>MVM_LOG_LEVEL=DEBUG</code> prefix for any command. Debug output is verbose. Persistent mode: <code>mvm config set debug.enabled false</code> to disable.',
} as const;

export const helpSection = {
  title: 'Getting help',
  description:
    'Still stuck? <a href="https://github.com/AlanD20/mvmctl/issues" rel="noopener noreferrer" target="_blank">Open an issue on GitHub</a> with:',
  items: [
    'The exact command you ran',
    'Full error output (run with <code>MVM_LOG_LEVEL=DEBUG</code>)',
    'Your OS and <code>mvm --version</code>',
  ],
} as const;

/* ───────────────────────────────────────────────────────────────
   TROUBLESHOOTING
   ─────────────────────────────────────────────────────────────── */

export const troubleshooting = [
  {
    problem: "Permission denied: /dev/kvm",
    fix: [
      "sudo usermod -aG kvm $USER",
      "# Log out and back in, then verify:",
      "groups | grep kvm",
    ],
    note: "KVM group membership takes effect on next login. If on a remote server, reconnect your SSH session.",
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
    fix: [
      "mvm image fetch ubuntu-24.04",
      "mvm image ls   # Verify it appears",
    ],
    note: "Image IDs are case-sensitive. Use <code>mvm image ls</code> to see available images.",
  },
  {
    problem: "Kernel not found",
    fix: [
      "mvm kernel fetch --type firecracker",
      "mvm kernel ls  # Verify it is cached",
    ],
    note: "Default fetch downloads a Firecracker-optimized kernel (~30s). Official builds take 10-30 min.",
  },
  {
    problem: "Firecracker binary not found",
    fix: [
      "mvm bin fetch 1.15.0",
      "mvm bin default <id>",
    ],
    note: "Always run <code>mvm bin default &lt;id&gt;</code> after fetching. Without it, mvmctl does not know which version to use.",
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
      "pkill -f nocloud-net-server",
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
      "mvm console --name myvm --state",
      "",
      "# Kill and re-attach",
      "mvm console --name myvm --kill",
      "mvm console --name myvm",
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
] as const;
