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
    label: "Managing VMs",
    icon: "terminal",
    children: [
      { id: "vm-lifecycle-ssh", label: "SSH into a VM", icon: "terminal" },
      { id: "vm-lifecycle-console", label: "Console access", icon: "terminal" },
      { id: "vm-lifecycle-exec", label: "Run commands inside a VM", icon: "terminal" },
      { id: "vm-lifecycle-logs", label: "View VM logs", icon: "terminal" },
      { id: "vm-lifecycle-snapshot", label: "Snapshots", icon: "terminal" },
      { id: "vm-lifecycle-cp", label: "Copy files to and from VMs", icon: "terminal" },
      { id: "vm-lifecycle-ps", label: "List running VMs", icon: "terminal" },
      { id: "vm-lifecycle-inspect", label: "Inspect a VM", icon: "terminal" },
      { id: "vm-lifecycle-rm", label: "Remove a VM", icon: "terminal" },
    ],
  },
  {
    id: "resource-management-image",
    label: "Images",
    icon: "archive",
  },
  {
    id: "resource-management-kernel",
    label: "Kernels",
    icon: "archive",
  },
  {
    id: "resource-management-bin",
    label: "Firecracker binaries",
    icon: "archive",
  },
  {
    id: "resource-management-key",
    label: "SSH keys",
    icon: "archive",
  },
  {
    id: "resource-management-volume",
    label: "Volumes",
    icon: "archive",
  },
  { id: "network-management", label: "Networks", icon: "network" },
  { id: "configuration", label: "Configuration", icon: "gear" },
  { id: "dependencies", label: "Dependencies", icon: "chip" },
  { id: "cloud-init", label: "Cloud-Init", icon: "layers" },
  { id: "troubleshooting", label: "Troubleshooting", icon: "spanner" },
  { href: "/docs/env-spec/", label: "Env spec reference", icon: "terminal" },
] as const;

export const docsQuickstartToc: readonly TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "prerequisites", label: "Before you begin" },
  { id: "install", label: "Install mvm" },
  { id: "host-initialize", label: "Initialize host" },
  { id: "first-vm", label: "Create your first VM" },
  { id: "vm-create", label: "mvm vm create" },
  { id: "vm-create-flags", label: "All vm create flags", level: 3 },
  { id: "vm-lifecycle", label: "Managing VMs" },
  { id: "vm-lifecycle-ssh", label: "SSH into a VM", level: 3 },
  { id: "vm-lifecycle-console", label: "Console access", level: 3 },
  { id: "vm-lifecycle-exec", label: "Run commands inside a VM", level: 3 },
  { id: "vm-lifecycle-logs", label: "View VM logs", level: 3 },
  { id: "vm-lifecycle-snapshot", label: "Snapshots", level: 3 },
  { id: "vm-lifecycle-cp", label: "Copy files to and from VMs", level: 3 },
  { id: "vm-lifecycle-ps", label: "List running VMs", level: 3 },
  { id: "vm-lifecycle-inspect", label: "Inspect a VM", level: 3 },
  { id: "vm-lifecycle-rm", label: "Remove a VM", level: 3 },
  { id: "resource-management", label: "Resource Management" },
  { id: "resource-management-image", label: "Images", level: 3 },
  { id: "resource-management-kernel", label: "Kernels", level: 3 },
  { id: "resource-management-bin", label: "Firecracker binaries", level: 3 },
  { id: "resource-management-key", label: "SSH keys", level: 3 },
  { id: "resource-management-volume", label: "Volumes", level: 3 },
  { id: "network-management", label: "Networks" },
  { id: "configuration", label: "Configuration" },
  { id: "shell-completion", label: "Shell Completion" },
  { id: "self-update", label: "Self-Update" },
  { id: "dependencies", label: "Dependencies" },
  { id: "cloud-init", label: "Cloud-Init" },
  { id: "troubleshooting", label: "Troubleshooting" },
] as const;

/* ───────────────────────────────────────────────────────────────
   PREREQUISITES
   ─────────────────────────────────────────────────────────────── */

export const prerequisites = [
  "Linux host (x86_64 or aarch64) with KVM support — check with <code>ls /dev/kvm</code>",
  "Access to <code>/dev/kvm</code> and membership in the <code>kvm</code> group",
  "Go 1.26.3+ to build from source (optional — binary install does not require Go)",
  "Root access once for host setup (<code>mvm init</code> handles this for you)",
  "<code>nftables</code> for NAT and firewall rules (default backend)",
] as const;

export const distroPackages = {
  ubuntu: {
    title: "Ubuntu / Debian packages",
    id: "ubuntu-packages",
    command: [
      "sudo apt-get install -y iproute2 iptables nftables qemu-utils e2fsprogs util-linux procps kmod openssh-client tar sudo passwd fakeroot",
    ],
  },
  arch: {
    title: "Arch packages",
    id: "arch-packages",
    command: ["sudo pacman -S --needed iproute2 iptables nftables qemu-img e2fsprogs util-linux procps-ng kmod openssh tar sudo shadow fakeroot"],
  },
} as const;

/* ───────────────────────────────────────────────────────────────
   INSTALL
   ─────────────────────────────────────────────────────────────── */

export const installMethods: readonly CommandBlock[] = [
  {
    id: "binary",
    title: "Binary",
    description: "No Go toolchain required. Best for production machines.",
    icon: "download",
    code: [
      "# Get the latest binary from the Releases page",
      "# https://github.com/AlanD20/mvmctl/releases",
      "mkdir -p ~/.local/bin",
      "curl -L -o ~/.local/bin/mvm https://github.com/AlanD20/mvmctl/releases/latest/download/mvm",
      "chmod +x ~/.local/bin/mvm",
      "mvm --help",
    ],
  },
  {
    id: "aur",
    title: "AUR (Arch Linux)",
    description: "Available as mvmctl-bin for Arch Linux users.",
    icon: "download",
    code: [
      "yay -S mvmctl-bin",
      "mvm --help",
    ],
  },
  {
    id: "source",
    title: "Source",
    description: "For local development or contributing. Requires Go 1.26.3+.",
    icon: "fileCode",
    code: [
      "git clone https://github.com/AlanD20/mvmctl",
      "cd mvmctl",
      "./scripts/build.sh release --output ~/.local/bin/mvm",
      "mvm --help",
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
      "Run <code>mvm init</code> — it walks you through host config (sudo/group/sudoers), Firecracker binary download, cache initialization, service binary extraction, and default asset setup. Escalates to root automatically when needed.",
    code: ["mvm init"],
    callout:
      "When prompted to log out/in, <strong>do it</strong>. Group membership changes only apply to new login sessions. If you skip this, subsequent commands will fail with permission errors. Alternatively run <code>newgrp mvm</code> to avoid logging out.",
  },
  {
    title: "One-time host setup",
    description:
      "Run <code>mvm init</code> to perform the one-time machine setup. It is idempotent — safe to re-run.",
    code: ["mvm init"],
    callout:
      "<code>mvm init</code> escalates to root when needed. It creates the <code>mvm</code> system group, writes sudoers drop-in files, loads KVM kernel modules, enables IP forwarding, and sets up bridge/TAP networking. Normal <code>mvm</code> commands do not need sudo after this runs.",
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
    callout:       "Combine <code>--skip-host</code> and <code>--skip-network</code> to skip both host setup and default network creation. Useful when re-running <code>mvm init</code> to only pull new assets.",
  },
  {
    title: "Other host commands",
    code: [
      "mvm host status   # Show current host configuration state vs expected — useful for verifying setup",
      "mvm host status --json   # Show current host configuration state as JSON",
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
      "mvm key create my-key --default",
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
  "--vcpu N                   Number of vCPUs (default: from user config).",
  "--mem, --memory N          Memory in MiB or GiB (e.g. 512M, 1G) (default: from user config).",
  "--disk-size, -s SIZE       Rootfs disk size (e.g. 1G, 512M or 1024M). Default: from config.",
  "--ssh-key KEY              SSH public key name (from key cache) or file path.",
  "--user USER                Default SSH user for cloud-init. Default: from config.",
  "--ip ADDRESS               Static guest IP, e.g. 172.27.0.42. Default: auto-assigned.",
  "--network, --net NAME      Named network to attach to. Default: 'net'.",
  "--mac ADDRESS              Custom MAC address. Auto-generated if omitted.",
  "--cloud-init-mode MODE     One of: off (default), inject, iso, net.",
  "--cloudinit-config PATH    Path to custom cloud-init configuration file.",
  "--nocloud-net-port PORT    Port for nocloud-net HTTP server (0=auto-assign).",
  "--no-pci                   Disable PCI transport (default: enabled). Required for hotplug support.",
  "--nested-virt              Enable nested virtualization (requires PCI, adds kvm-intel/amd.nested=1 boot arg)",
  "--cpu-template PATH        Path to CPU template JSON file (merged with nested-virt config if both set)",
  "--console                  Enable serial console relay (default: disabled).",
  "--lsm-flags FLAGS          Linux Security Module flags for kernel cmdline.",
  "--enable-logging           Enable Firecracker logging.",
  "--enable-metrics           Enable Firecracker metrics.",
  "--boot-args ARGS           Custom kernel boot arguments (e.g. 'console=ttyS0 reboot=k panic=1').",
  "--writeback                Use writeback cache mode for drives.",
  "--vsock-port PORT          Vsock port for the guest agent (default: 1024).",
  "--allow-remote-exec        Allow inter-VM remote execution (VM→Host→VM relay). Disabled by default.",
  "--skip-cleanup             Skip cleanup on failure (for debugging).",
  "--skip-deblob              Skip debloat operations on rootfs (removes OS caches, package manager caches).",
  "--count, -c N              Number of VMs to create (default: 1).",
  "--atomic                   If any VM fails, remove all successfully-created VMs (all-or-nothing).",
  "--volume, -v NAME          Attach a volume to the VM (can be specified multiple times).",
  "--force, -f                Skip confirmation prompts.",
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
      "mvm vm create myvm --image ubuntu:24.04 --cloudinit-config my-user-data.yaml",
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

export const execExplanation = {
  whatItDoes:
    "Execute a command inside a VM via the vsock guest agent. No SSH or network stack required — works over the vsock channel directly.",
  callouts: [
    "Unlike <code>mvm ssh --cmd</code>, <code>mvm exec</code> does not need SSH keys or a network connection. It uses the vsock agent inside the VM.",
    "Use <code>--user</code> to run as a specific user (default: root).",
    "Use <code>--timeout</code> to set the vsock agent connect/probe timeout in seconds.",
    "Use <code>--no-sync</code> to skip the final <code>sync()</code> (faster but risks data loss on VM stop).",
    "The VM must have the vsock agent running. This is true for any VM created with mvmctl.",
  ],
  examples: [
    {
      code: 'mvm exec myvm -- uname -a',
      note: "Run a command as root and see output.",
    },
    {
      code: 'mvm exec myvm --user ubuntu -- whoami',
      note: "Run a command as a specific user.",
    },
    {
      code: 'mvm exec myvm --timeout 30 -- long-running-command',
      note: "Override the default vsock probe timeout.",
    },
    {
      code: 'mvm exec myvm --no-sync -- echo "fast"',
      note: "Skip final sync for faster execution.",
    },
    {
      code: "mvm exec myvm --port 1025 -- my-command",
      note: "Specify a custom vsock port.",
    },
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
    "Create and restore VM snapshots — save memory and disk state to disk, then restore later. Useful for preserving a long-running VM state before rebooting the host.",
  callouts: [
    "Snapshots can be large — memory + disk. A VM with 2 GiB RAM creates a ~2 GiB memory file.",
    "The VM continues running while being snapshotted. The snapshot is crash-consistent (like pulling the power cord).",
    "Snapshots are stored in <code>~/.cache/mvmctl/snapshots/&lt;id&gt;/</code>.",
  ],
  examples: [
    {
      code: "mvm snapshot create myvm",
      note: "Snapshot a running VM. Saves memory and disk state.",
    },
    {
      code: "mvm snapshot ls",
      note: "List all snapshots.",
    },
    {
      code: "mvm snapshot inspect <snapshot-id>",
      note: "Show detailed snapshot information.",
    },
    {
      code: "mvm snapshot restore <snapshot-id> <vm-name>",
      note: "Restore the VM from a saved snapshot.",
    },
    {
      code: "mvm snapshot rm <snapshot-id>",
      note: "Remove a snapshot.",
    },
  ],
};

export const cpExplanation = {
  whatItDoes:
    "Copy files between the host and microVMs using a binary frame protocol over vsock. The vsock agent inside the VM handles file transfer operations.",
  callouts: [
    "Uses a binary frame protocol over vsock — no SSH or tar dependency needed inside the VM. Transfers are encrypted by the host-guest isolation boundary.",
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
    "Shows detailed VM information: SHA256 hash ID, IP address, network, kernel path, image path, resources, creation time, current state, and vsock agent config (guest CID, UDS path, port, agent version, upgrade state).",
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
      "<code>ubuntu</code> — Ubuntu LTS (tar-rootfs). Versions: 26.04, 24.04, 22.04, 20.04",
      "<code>ubuntu-minimal</code> — Ubuntu Minimal (tar-rootfs). Versions: 26.04, 24.04, 22.04, 20.04",
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
      "Import a rootfs from a file or create a reusable base image from a running VM:",
    code: [
      "# From a VM selector — create a reusable base image from a VM's rootfs",
      "mvm image import base-img my-vm",
      "",
      "# From a VM selector, with a version tag",
      "mvm image import base-img:v1.0 my-vm --version v2.0",
      "",
      "# From a file (qcow2, raw, tar-rootfs)",
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
      "Syntax: <code>mvm image import NAME [SOURCE | VM_SELECTOR]</code>. When the second argument is a VM selector (name or ID), mvmctl copies that VM's rootfs to create a reusable image. Supports raw images (.raw/.img), qcow2, and tar-rootfs archives (.tar/.tar.gz/.tar.xz/.tgz) from files.",
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
      "# Specify parallel build jobs",
      "mvm kernel pull --type official --jobs 8",
      "",
      "# Set as default after fetch",
      "mvm kernel pull --type official --default",
      "",
      "# Force clean rebuild (bypass cache)",
      "mvm kernel pull --type official --clean-build",
      "",
      "# Keep the build directory for debugging",
      "mvm kernel pull --type official --keep-build-dir",
    ],
    callout:
      "Official builds require build deps: <code>build-essential</code>, <code>flex</code>, <code>bison</code>, <code>libelf-dev</code>, <code>libssl-dev</code>, <code>libncurses-dev</code>, <code>bc</code>, <code>git</code>, <code>curl</code>, <code>pkg-config</code>, <code>dwarves</code> (for pahole). Expect 10-30 min build times. Use <code>--config PATH</code> to apply a custom kernel config fragment, <code>--jobs N</code> for parallel build jobs, and <code>--default</code> to set as default after fetch.",
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
  {
    title: "Kernel feature reference",
    description:
      'The <code>--features</code> flag applies pre-defined kernel config fragments on top of the base Firecracker config. Multiple features can be combined (e.g. <code>--features kvm,nftables,tuntap</code>). Use <code>--features all</code> or <code>--features *</code> to enable every feature in the spec. Enabled features are persisted and shown in <code>mvm kernel inspect</code>. Defined in <a href="https://github.com/AlanD20/mvmctl/blob/main/internal/assets/kernels.yaml">kernels.yaml</a>.',
    headers: ["Feature", "Description", "Key config enforced"],
    rows: [
      ["kvm", "Nested KVM virtualization", "CONFIG_KVM, CONFIG_KVM_INTEL / CONFIG_KVM_AMD"],
      ["nftables", "nftables NAT firewall backend", "CONFIG_NFT_NAT, CONFIG_NF_TABLES_INET, CONFIG_NFT_MASQ"],
      ["tuntap", "TUN/TAP device support (VM networking)", "CONFIG_TUN"],
      ["btrfs", "Btrfs filesystem support", "CONFIG_BTRFS_FS, CONFIG_BTRFS_FS_POSIX_ACL"],
      ["containers", "Container runtime core (containerd/runc)", "CONFIG_NAMESPACES, CONFIG_CGROUPS, CONFIG_SECCOMP, CONFIG_OVERLAY_FS, CONFIG_IKCONFIG, CONFIG_IKCONFIG_PROC"],
      ["iptables", "iptables kube-proxy backend", "CONFIG_NETFILTER, CONFIG_NETFILTER_XTABLES, CONFIG_IP_NF_NAT, CONFIG_NF_CONNTRACK, CONFIG_IP_SET, CONFIG_NETFILTER_XT_SET, CONFIG_NETFILTER_XT_MARK, CONFIG_NETFILTER_XT_TARGET_CT"],
      ["cni-bridge", "CNI bridge / overlay networking", "CONFIG_BRIDGE, CONFIG_VETH, CONFIG_MACVLAN, CONFIG_IPVLAN, CONFIG_VXLAN, CONFIG_GENEVE, CONFIG_FIB_RULES"],
      ["ebpf", "eBPF / BTF (Cilium, bpftool)", "CONFIG_BPF, CONFIG_BPF_JIT, CONFIG_DEBUG_INFO_BTF, CONFIG_BPF_EVENTS, CONFIG_PERF_EVENTS, CONFIG_NET_CLS_BPF, CONFIG_NET_CLS_ACT, CONFIG_NET_SCH_INGRESS"],
      ["storage", "Filesystems for persistent volumes", "CONFIG_EXT4_FS, CONFIG_XFS_FS, CONFIG_BTRFS_FS, CONFIG_BLK_DEV_NVME"],
      ["fqdn-proxy", "L7 / FQDN policy proxy (TPROXY, xt_socket)", "CONFIG_NETFILTER_XT_TARGET_TPROXY, CONFIG_NETFILTER_XT_TARGET_CT, CONFIG_NETFILTER_XT_MATCH_SOCKET"],
      ["bandwidth", "Bandwidth manager (FQ packet scheduler)", "CONFIG_NET_SCH_FQ"],
      ["iscsi-target", "iSCSI target mode (Longhorn block storage)", "CONFIG_TARGET_CORE, CONFIG_ISCSI_TARGET, CONFIG_ISCSI_TCP, CONFIG_BLK_DEV_SD"],
      ["ebpf-cni", "eBPF-based CNI networking (Cilium, Hubble)", "CONFIG_BPF, CONFIG_DEBUG_INFO_BTF, CONFIG_VXLAN, CONFIG_GENEVE, CONFIG_IP_SET, CONFIG_NETFILTER_XT_TARGET_TPROXY, CONFIG_NETFILTER_XT_MATCH_SOCKET"],
      ["iscsi-target", "iSCSI target mode (Longhorn block storage)", "CONFIG_TARGET_CORE, CONFIG_ISCSI_TARGET, CONFIG_ISCSI_TCP, CONFIG_BLK_DEV_SD"],
      ["ebpf-cni", "eBPF-based CNI networking (Cilium, Hubble)", "CONFIG_BPF, CONFIG_DEBUG_INFO_BTF, CONFIG_VXLAN, CONFIG_GENEVE, CONFIG_IP_SET, CONFIG_NETFILTER_XT_TARGET_TPROXY, CONFIG_NETFILTER_XT_MATCH_SOCKET"],
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
      "mvm key import mykey ~/.ssh/id_ed25519.pub",
      "mvm key import mykey ~/.ssh/id_ed25519.pub --force   # Overwrite if key exists",
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
      "# Export a key to a directory",
      "mvm key export mykey ~/.ssh/exported",
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
      "A volume can only be removed if it is not attached to a running VM, unless <code>--force / -f</code> is used. Detach first with <code>mvm volume detach</code>.",
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
      "mvm volume attach myvm data-disk",
      "",
      "# Detach from a running VM",
      "mvm volume detach myvm data-disk",
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
      "Built-in defaults from <code>constants.go</code> (compiled into the binary, lowest priority)",
      "SQLite database (<code>~/.cache/mvmctl/mvmdb.db</code>) — canonical store for user overrides",
      "<code>MVM_*</code> environment variables (e.g. <code>MVM_LOG_LEVEL</code>, <code>MVM_CACHE_DIR</code>)",
      "CLI flags (highest priority)",
    ],
  },
  {
    title: "Config and cache location",
    description:
      "All configuration is stored in the SQLite database at <code>~/.cache/mvmctl/mvmdb.db</code> (override with <code>MVM_CACHE_DIR</code>). The config directory at <code>~/.config/mvmctl/</code> holds SSH keys (override with <code>MVM_CONFIG_DIR</code>).",
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
      "# Set a value (persists to database)",
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
      "MVM_LOG_LEVEL          Log level: DEBUG, INFO, WARN, ERROR     WARN (CLI flags recommended)",
      "MVM_WARM_POOL          Warm image pool backend (disk or tmpfs)   tmpfs (default)",
      "MVM_TEMP_DIR           Override temp directory for microVMs       /tmp/mvmctl",
      "MVM_ESCALATED          Set by sudo wrapper to indicate             1",
      "                       privilege escalation",
      "MVM_ASSET_MIRROR       Local directory for asset mirroring",
      "MVM_SUDO_RESTART       Set internally when re-running                     (not set)",
      "                       <code>mvm init</code> with sudo",
    ],
    callout:
      "The <code>--verbose</code> (sets INFO) and <code>--debug</code> (sets DEBUG) CLI flags are the <strong>recommended</strong> way to control log level — they take precedence over <code>MVM_LOG_LEVEL</code>. The env var falls back to WARN if neither flag is set and the variable is unset.",
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
   SHELL COMPLETION
   ─────────────────────────────────────────────────────────────── */

export const shellCompletionSections = [
  {
    title: "Shell completion",
    description:
      'Generate tab-completion scripts for your shell. Uses Cobra\'s built-in generators — completions adapt automatically as commands change. Supports bash, zsh, fish, and PowerShell.',
    code: [
      "# bash — add to ~/.bashrc",
      "source <(mvm completion bash)",
      "",
      "# zsh — add to ~/.zshrc (inline)",
      "source <(mvm completion zsh)",
      "",
      "# zsh — or place in fpath for compinit auto-load",
      "mvm completion zsh > \"${fpath[1]}/_mvm\"",
      "",
      "# fish",
      "mvm completion fish > ~/.config/fish/completions/mvm.fish",
    ],
    callout:
      'Run <code>mvm completion --help</code> for the full installation guide per shell.',
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
        "fakeroot",
        "Preserve tarball ownership during extraction",
        "fakeroot",
        "fakeroot",
        "fakeroot",
      ],
      [
        "unsquashfs",
        "SquashFS extraction",
        "squashfs-tools",
        "squashfs-tools",
        "squashfs-tools",
      ],
      ["tar", "Tarball extraction", "tar", "tar", "tar"],
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
      "Required only if you enable the GuestFS backend via <code>mvm config set settings guestfs_enabled true</code>. The loop-mount provisioner is the default and does not require libguestfs.",
    code: [
      "# Debian/Ubuntu",
      "sudo apt-get install libguestfs0 libguestfs-tools supermin",
      "",
      "# RHEL/CentOS/Fedora",
      "sudo dnf install libguestfs libguestfs-tools supermin",
      "",
      "# Arch",
      "sudo pacman -S libguestfs supermin",
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
      "<strong>Kernel modules:</strong> <code>kvm</code>, <code>kvm_intel</code> or <code>kvm_amd</code>, <code>tun</code>, <code>bridge</code>, <code>vhost_vsock</code>, <code>nft_chain_nat</code>",
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
      "<code>inject</code> — injects cloud-init files directly into the rootfs via the active provisioner backend (loop-mount by default, or guestfs if enabled). Fastest and most reliable.",
      "<code>net</code> — starts a temporary HTTP server (nocloud-net). The VM fetches config during boot via <code>ds=nocloud;seedfrom=http://GATEWAY_IP:PORT/</code>. No libguestfs needed.",
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
      "Rules are tagged with <code># nocloudnet:&lt;vm_name&gt;:&lt;port&gt;</code>",
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
  "On Ubuntu 24.04+, install the prebuilt binary for the fastest setup. Use <code>mvm --help</code> to verify installation.";

export const installIntro =
  "Two ways to install. The <strong>prebuilt binary</strong> is the fastest — no Go toolchain needed.";

export const installCallout =
  'After installing, run <code>mvm --help</code> to verify. If "command not found", ensure <code>~/.local/bin</code> is in your <code>PATH</code>.';

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
    "The <code>--verbose</code> flag sets INFO level; <code>--debug</code> sets DEBUG level. CLI flags take precedence over <code>MVM_LOG_LEVEL</code>. Falls back to WARN if neither flag nor env var is set.",
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
      "mvm init",
    ],
    note: "Re-running <code>mvm init</code> is safe (idempotent). The default bridge is named <code>mvm-net</code>.",
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
    fix: ["mvm bin pull firecracker --version 1.15.0", "mvm bin default <id>"],
    note: "Always run <code>mvm bin default &lt;id&gt;</code> after fetching. The default version (e.g. 1.15.0) matches the installed Firecracker release — you can also pull other versions with <code>mvm bin pull firecracker --version &lt;version&gt;</code>.",
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
      'pkill -f "mvm run nocloudnet serve"',
    ],
    note: "Each VM uses one port in 8000-9000. If many VMs were not cleaned up, orphaned servers may still be running.",
  },
  {
    problem: "Mixed firewall backends (Docker conflict)",
    fix: [
      "# Symptom: VM has IP, ping works, but TCP times out",
      "# Detection:",
      "mvm config get settings firewall_backend",
      "sudo nft list ruleset | grep -c 'MVM-'",
      "",
      "# Fix 1: sync firewall rules from database",
      "mvm network sync",
      "",
      "# Fix 2: reboot host (clears all firewall state cleanly)",
      "sudo reboot",
      "",
      "# Fix 3: Configure Docker to use the same backend as mvmctl",
      "# Then re-run: mvm host init",
    ],
    note: "Docker and mvmctl may use different firewall backends (nftables vs iptables-legacy). Rules go to different places. mvm network sync reloads rules from the database.",
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
      "mvm volume detach <vm-name> my-data",
      "",
      "# Force remove (use with caution)",
      "mvm volume rm my-data -f",
    ],
    note: "A volume can only be attached to one VM at a time. Detach it first or create a new volume. Use <code>--force / -f</code> on volume rm to skip the attached check.",
  },
] as const;
