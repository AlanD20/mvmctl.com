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
  title: "mvmctl 0.3.0 documentation",
  intro:
    "If you are coming from 0.2.x, follow the clean-install instructions and start with fresh managed state.",
} as const;

export const docsVersionPath = "/docs/0.3";

export const docsVersions = [
  { label: "0.3", path: docsVersionPath, prerelease: true },
  { label: "0.2", path: "/docs/0.2", prerelease: false },
] as const;

export const policyGuideLinks: readonly DocsNavItem[] = [
  { href: `${docsVersionPath}/networking/`, label: "Networking", icon: "network" },
  { href: `${docsVersionPath}/policies/`, label: "Policies and labels", icon: "terminal" },
  { href: `${docsVersionPath}/guest-control/`, label: "Guest Control and floating IPs", icon: "network" },
];

export const docsGuideNav: readonly DocsNavItem[] = [
  { href: `${docsVersionPath}/`, label: "Install and first VM", icon: "book" },
  ...policyGuideLinks,
  { href: `${docsVersionPath}/reference/`, label: "Command reference", icon: "terminal" },
  { href: `${docsVersionPath}/env-spec/`, label: "Environment spec", icon: "terminal" },
];

const docsAllNav: readonly DocsNavItem[] = [
  { id: "overview", label: "Overview", icon: "book" },
  { id: "prerequisites", label: "Before you begin", icon: "chip" },
  { id: "install", label: "Install mvm", icon: "download" },
  { id: "host-initialize", label: "Initialize host", icon: "gear" },
  { id: "uninstall", label: "Uninstall / reinstall", icon: "download" },
  { id: "first-vm", label: "Create your first VM", icon: "play" },
  {
    id: "vm-create",
    label: "mvm vm create",
    icon: "terminal",
    children: [{ id: "vm-create-flags", label: "Creation options", icon: "terminal" }],
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
  ...policyGuideLinks,
  { id: "configuration", label: "Configuration", icon: "gear" },
  { id: "dependencies", label: "Dependencies", icon: "chip" },
  { id: "cloud-init", label: "Cloud-Init", icon: "layers" },
  { id: "troubleshooting", label: "Troubleshooting", icon: "spanner" },
  { href: `${docsVersionPath}/env-spec/`, label: "Env spec reference", icon: "terminal" },
] as const;

const docsAllToc: readonly TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "prerequisites", label: "Before you begin" },
  { id: "install", label: "Install mvm" },
  { id: "host-initialize", label: "Initialize host" },
  { id: "uninstall", label: "Uninstall / reinstall" },
  { id: "first-vm", label: "Create your first VM" },
  { id: "vm-create", label: "mvm vm create" },
  { id: "vm-create-flags", label: "VM creation options", level: 3 },
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
  { id: "guest-control", label: "Guest Control & floating IPs" },
  { id: "configuration", label: "Configuration" },
  { id: "shell-completion", label: "Shell Completion" },
  { id: "self-update", label: "Self-Update" },
  { id: "dependencies", label: "Dependencies" },
  { id: "cloud-init", label: "Cloud-Init" },
  { id: "troubleshooting", label: "Troubleshooting" },
] as const;

const quickstartSections = new Set(["overview", "prerequisites", "install", "host-initialize", "uninstall", "first-vm"]);
const guideSections = new Set(["network-management", "guest-control"]);

export const docsQuickstartToc = docsAllToc.filter(({ id }) => quickstartSections.has(id));
export const docsReferenceToc = docsAllToc.filter(({ id }) => !quickstartSections.has(id) && !guideSections.has(id));
export const docsReferenceNav = docsAllNav.filter(({ id }) => id && !quickstartSections.has(id));
export const docsNav: readonly DocsNavItem[] = [
  ...docsAllNav.filter(({ id }) => id && quickstartSections.has(id)),
  ...docsGuideNav.slice(1),
];

/* ───────────────────────────────────────────────────────────────
   PREREQUISITES
   ─────────────────────────────────────────────────────────────── */

export const prerequisites = [
  "Linux host with KVM support — check with <code>ls /dev/kvm</code>. Runtime testing for 0.3.0 covers x86_64; aarch64 is not yet qualified.",
  "Access to <code>/dev/kvm</code> and membership in the <code>kvm</code> group",
  "Administrator access for system installation, host setup and binary upgrades",
  "Kernel nftables support for both inet and bridge families; the nft command is not required",
  "The matching Firecracker/Jailer 1.17.0 pair",
  "Unified cgroup v2 with CPU, memory and process-count controllers",
] as const;

export const distroPackages = {
  ubuntu: {
    title: "Ubuntu / Debian packages",
    id: "ubuntu-packages",
    command: [
      "sudo apt-get install -y iproute2 qemu-utils e2fsprogs util-linux procps kmod openssh-client tar sudo passwd fakeroot",
    ],
  },
  arch: {
    title: "Arch packages",
    id: "arch-packages",
    command: ["sudo pacman -S --needed iproute2 qemu-img e2fsprogs util-linux procps-ng kmod openssh tar sudo shadow fakeroot"],
  },
} as const;

/* ───────────────────────────────────────────────────────────────
   INSTALL
   ─────────────────────────────────────────────────────────────── */

export const installMethods: readonly CommandBlock[] = [
  {
    id: "binary",
    title: "Install script",
    description: "The installer requires Bash, curl and sha256sum. It verifies the release checksum and installs the system binary without erasing managed data.",
    icon: "download",
    code: [
      "curl -fsSL https://mvmctl.aland20.com/install.sh | bash -s -- --version 0.3.0",
      "/usr/local/bin/mvm --version",
    ],
  },
  {
    id: "aur",
    title: "AUR (Arch Linux)",
    description: "Before using the package, confirm it provides 0.3.0. Older packages do not follow this guide's installation contract.",
    icon: "download",
    code: [
      "yay -S mvmctl-bin",
      "sudo /usr/bin/mvm host install-system",
      "/usr/local/bin/mvm --version",
    ],
  },
] as const;

/* ───────────────────────────────────────────────────────────────
   HOST INIT
   ─────────────────────────────────────────────────────────────── */

export const hostInitSections = [
  {
    title: "Enroll your operator",
    description:
      "After installing the system binary, run host setup from your normal user account. Log out and back in if setup changes group membership.",
    code: ["sudo /usr/local/bin/mvm host init"],
    callout:
      "When running directly as root, add <code>--operator</code> with the non-root account that will manage VMs. Do not run daily VM commands as root.",
  },
  {
    title: "Initialize your workspace",
    description:
      "Prepare your operator cache, default network and the matching Firecracker/Jailer release.",
    code: ["mvm init --skip-host --non-interactive --binary-version 1.17.0"],
    callout:
      "Use fresh managed state for 0.3.0. Existing VM databases, runtime records and snapshots are not migrated.",
  },
  {
    title: "Check host readiness",
    description: "Inspect host setup and available capacity before creating VMs.",
    code: ["mvm host status", "mvm host info"],
    callout:
      "Host reset is an administrator operation. Cleanup and reset refuse uncertain managed state; they are not a shortcut for deleting an older installation.",
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
      "# 2. Download a Firecracker-optimized kernel",
      "mvm kernel pull --type firecracker",
      "",
      "# 3. Download an Ubuntu 24.04 image",
      "mvm image pull ubuntu --version 24.04",
      "",
      "# 4. Create and start the VM",
      "mvm vm create myvm --image ubuntu:24.04",
      "",
      "# 5. Run a command through the guest agent",
      "mvm exec myvm -- uname -a",
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
      "Complete host setup and workspace initialization first. Cloud-init is off by default; enable a mode explicitly when your workload needs it.",
      "SSH requires an authorized key and a guest SSH server. Vsock exec and file transfer work without SSH keys or guest networking.",
      "Allow disk space for the downloaded image, the VM root disk, and temporary provisioning files.",
    ],
  },
];

/* ───────────────────────────────────────────────────────────────
   VM CREATE
   ─────────────────────────────────────────────────────────────── */

export const vmCreateExplanation = {
  whatItDoes:
    'Creates and starts a Firecracker microVM with protected disk backing and an isolated process. Use mvm vm stop and mvm vm start to manage it afterward.',
  callouts: [
    '<code>mvm vm create</code> starts the VM immediately. Pause and resume commands are also available.',
    "Each managed-network VM gets an IP from the lease pool; <code>--no-network</code> skips NIC and address allocation. The default network (<code>net</code>) uses <code>172.27.0.0/24</code>. Leases are reused when VMs are removed.",
    "The <code>--disk-size</code> flag sets the initial root disk size. It must meet the image minimum; shrinking is not supported.",
    "If you do not set <code>--ssh-key</code> and have no default key, the VM will boot but you cannot SSH in. Use <code>mvm exec</code>, or enable <code>--console</code> for serial access.",
  ],
};

export const vmCreateFlagLines: readonly string[] = [
  "VM_NAME (positional)          VM name (required). Used to identify the VM in all commands.",
  "--image IMAGE              Image name, type:version (e.g. ubuntu:24.04), short ID, or path to .ext4 file. Auto-detected from defaults if omitted.",
  "--kernel KERNEL            Kernel short ID or path to vmlinux. Auto-detected from defaults if omitted.",
  "--vcpu N                   Number of vCPUs (default: from user config).",
  "--mem, --memory N          Memory in MiB or GiB (e.g. 512M, 1G) (default: from user config).",
  "--disk-size, -s SIZE       Root disk size (e.g. 10G). Default: image minimum.",
  "--ssh-key KEY              SSH public key name (from key cache) or file path.",
  "--user USER                Default SSH user for cloud-init. Default: from config.",
  "--ip ADDRESS               Static guest IP, e.g. 172.27.0.42. Default: auto-assigned.",
  "--network, --net NAME      Named network to attach to. Default: 'net'.",
  "--mac ADDRESS              Custom MAC address. Auto-generated if omitted.",
  "--cloud-init-mode MODE     One of: off (default), inject, iso, net.",
  "--cloudinit-config PATH    Path to custom cloud-init configuration file.",
  "--no-network               Create without guest networking; host exec and copy remain available.",
  "--no-pci                   Disable PCI transport; hotplug requires PCI to remain enabled.",
  "--nested-virt              Enable nested virtualization (requires PCI, adds kvm-intel/amd.nested=1 boot arg)",
  "--cpu-template PATH        Path to CPU template JSON file (merged with nested-virt config if both set)",
  "--console                  Enable serial console relay (default: disabled).",
  "--lsm-flags FLAGS          Linux Security Module flags for kernel cmdline.",
  "--enable-logging           Enable Firecracker logging.",
  "--enable-metrics           Enable Firecracker metrics.",
  "--boot-args ARGS           Custom kernel boot arguments (e.g. 'console=ttyS0 reboot=k panic=1').",
  "--writeback                Use writeback cache mode for drives.",
  "--vsock-port PORT          Vsock port for the guest agent (default: 1024).",
  "--skip-cleanup             Skip cleanup on failure (for debugging).",
  "--skip-deblob              Skip debloat operations on rootfs (removes OS caches, package manager caches).",
  "--count, -c N              Number of VMs to create (default: 1).",
  "--atomic                   Attempt removal of created VMs if a batch fails; cleanup errors are reported.",
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
      "  --vcpu 4 \\",
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
    note: "Select the guest account used for SSH and supported direct setup. Cloud-init remains off unless you enable a mode explicitly.",
  },
  {
    title: "Alpine — lightweight and fast",
    code: [
      "mvm image pull alpine --version 3.23",
      "mvm vm create tiny-vm --image alpine:3.23 --vcpu 1 --mem 256",
    ],
    note: "A small guest image for disposable workloads.",
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
      "mvm vm create myvm --image ubuntu:24.04 --cloud-init-mode inject --cloudinit-config my-user-data.yaml",
    ],
    note: "Use a guest image with cloud-init installed. The selected mode delivers user-data; cloud-init applies it during boot.",
  },
  {
    title: "Batch creation with atomic rollback",
    code: [
      "# Attempt rollback of created VMs if a creation fails",
      "mvm vm create cluster --image ubuntu:24.04 --count 5 --atomic",
      "",
      "# With a volume attached to a single VM",
      "mvm volume create shared-data 10G",
      "mvm vm create worker --image ubuntu:24.04 --volume shared-data",
    ],
    note: "<code>--count</code> generates numbered VM names. Add <code>--atomic</code> to attempt cleanup if creation fails; cleanup errors are reported and may require follow-up. Batch creation does not accept <code>--volume</code>, <code>--ip</code>, or <code>--mac</code>.",
  },
];

/* ───────────────────────────────────────────────────────────────
   VM LIFECYCLE
   ─────────────────────────────────────────────────────────────── */

export const sshExplanation = {
  whatItDoes:
    "SSH into a running VM by name. Resolves the VM name to its IP address from the lease database and connects with the cached SSH key.",
  callouts: [
    "SSH needs guest networking, a running SSH server, and an authorized key. If you enabled cloud-init, wait for its guest setup to finish.",
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
    "Attaches to the VM's serial console through a host PTY relay. It does not require guest networking or the vsock agent.",
  callouts: [
    "Press <code>Ctrl+X</code> then <code>D</code> to detach from the console session. This does <strong>not</strong> shut down the VM.",
    "<code>mvm console myvm --kill</code> stops only the relay, not the VM. Create the VM with <code>--console</code> to enable serial access.",
    "Use <code>--state</code> to check if the relay is running without attaching. Handy for scripting.",
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
    "The guest agent must be running and reachable; a booting or unhealthy guest may not be ready yet.",
    "VM-to-VM requests require <code>--allow-vm-exec</code> on the source host command and a separate directional exec policy. This opt-in is not a VM creation flag.",
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
    "Capture pauses the VM while saving memory, its root disk, and attached data volumes, then restores its prior running or paused state. Shared writable volumes prevent capture.",
    "Snapshot artifacts are root-controlled. Use <code>mvm snapshot rm</code> to remove them. Quiesce applications first for application-level consistency.",
    "Restore retains the captured Firecracker/Jailer pair, network, IP and MAC. Stop or remove the source before restoring its endpoint; conflicting addresses and a different requested network are refused.",
    "Keep the full request ID printed before capture. Use it with snapshot inspect or rm if capture is interrupted.",
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
    "Uses a binary frame protocol over vsock, not SSH. The host-guest isolation boundary is not transport encryption.",
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
    "Stops the verified VM process, removes its runtime and network resources, releases its lease, and deletes its managed root disk. Data volumes and snapshots remain until removed separately.",
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
    "Inspect VM identity, addressing, selected resources, runtime status, requested and observed cgroup limits, and vsock configuration.",
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
    "List running or starting VMs using verified runtime observation. Stored database status alone does not establish that a VM is alive; observation failures are reported.",
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
      "Images provide the base root filesystem for a VM. Pull a supported distribution or import a local filesystem, QCOW2 disk or rootfs archive; each VM gets its own protected writable disk.",
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
      "mvm image pull alpine --version 3.23",
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
      "# Skip OS cache cleanup; offline shrink and compression still apply",
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
    title: "Resuming an interrupted local import",
    description:
      "If local-image optimization was interrupted, retry its retained transaction without extracting the source again:",
    code: [
      "mvm image import myimg /path/to/image.raw --resume FULL_IMAGE_ID",
    ],
    callout:
      "Use the full <code>image_id</code> from the failed command's JSON error details and the original optimization options. Resume requires LoopMount, an unregistered image ID and intact retained files. It refuses changed resources, VM sources and <code>--force</code>. Failures after retained optimization state has been removed need a fresh import. Keep the original source and do not delete root-owned records manually.",
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
      "On x86_64, Firecracker boots an uncompressed ELF kernel (<code>vmlinux</code>), not a compressed <code>vmlinuz</code>. Pull a prebuilt kernel or build one from official Linux sources.",
  },
  {
    title: "Firecracker-optimized kernel (recommended)",
    description:
      "A pre-built guest kernel from the Firecracker CI pipeline. Use an official custom build when you need additional guest features.",
    code: [
      "mvm kernel pull --type firecracker",
      "# Downloads the configured Firecracker CI kernel",
    ],
    callout:
      "This is the default kernel type. Feature fragments apply to official source builds, not pre-built kernels.",
  },
  {
    title: "Official upstream kernel (custom build)",
    description:
      "Downloads the official Linux kernel source (default: 6.19.9) and compiles it with a Firecracker-compatible config. Takes 10-30 minutes.",
    code: [
      "# Build the configured default upstream version",
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
      "Official builds require build deps: <code>build-essential</code>, <code>flex</code>, <code>bison</code>, <code>libelf-dev</code>, <code>libssl-dev</code>, <code>libncurses-dev</code>, <code>bc</code>, <code>git</code>, <code>curl</code>, <code>pkg-config</code>, <code>dwarves</code> (for pahole). Build time and disk use depend on your machine and selected features. Use <code>--config PATH</code> to apply a custom kernel config fragment, <code>--jobs N</code> for parallel build jobs, and <code>--default</code> to set as default after fetch.",
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
      'The <code>--features</code> flag adds kernel config fragments to official source builds. Combine features with commas, or use <code>--features all</code>. Inspect enabled features with <code>mvm kernel inspect</code>. See <a href="https://github.com/AlanD20/mvmctl/blob/0.3.0-release/internal/assets/kernels.yaml">kernels.yaml</a> for the complete configuration.',
    headers: ["Feature", "Description", "Key config enforced"],
    rows: [
      ["kvm", "Nested KVM virtualization", "CONFIG_KVM, CONFIG_KVM_INTEL / CONFIG_KVM_AMD"],
      ["nftables", "Managed bridge/inet filtering and NAT", "CONFIG_NF_TABLES_INET, CONFIG_NF_TABLES_BRIDGE, CONFIG_BRIDGE_NETFILTER, CONFIG_NF_CONNTRACK_BRIDGE, CONFIG_NFT_NAT"],
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
    ],
  },
];

export const binarySections = [
  {
    title: "Firecracker and Jailer",
    description: "VM launch in 0.3.0 requires the matching Firecracker/Jailer 1.17.0 pair. Pull them together and select the release as your default.",
    code: ["mvm bin pull 1.17.0 --default", "mvm bin ls", "mvm bin ls --remote"],
    callout: "Other cached releases are not automatically eligible for launch. Use fresh snapshots with the required pair.",
  },
  {
    title: "Remove an unused release",
    description: "Remove by release version after no VM retains it.",
    code: ["mvm bin rm 1.17.0"],
    callout: "Force cannot override a live VM's release lease. Download the required pair again before launching another VM.",
  },
];

export const keySections = [
  {
    title: "What keys are for",
    description:
      "Cache SSH keys for guest access. Selected public keys are installed through supported direct setup when cloud-init is off, or delivered through the enabled cloud-init mode.",
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
      "Managed keypairs live in <code>~/.config/mvmctl/keys</code>. Only the public key is installed in the guest. Uninstall deletes these managed copies; preserve any private keys you need first.",
  },
  {
    title: "How keys work with VMs",
    description:
      "Create with <code>--ssh-key mykey</code> or select a default key, then connect with <code>mvm ssh myvm</code> once the guest SSH server is ready. Enabling cloud-init may add guest setup time.",
  },
];

export const volumeSections = [
  {
    title: "Persistent data disks",
    description: "Create a raw data volume once and attach it to your VMs. Removing a VM does not delete its data volumes. QCOW2 is supported for image import, not attached data volumes.",
    code: ["mvm volume create data-disk 10G", "mvm volume ls", "mvm volume inspect data-disk"],
    callout: "A data volume is separate from the VM root disk. Prepare its partition and filesystem inside the guest before storing files on it.",
  },
  {
    title: "Attach and detach",
    description: "Select an existing VM and volume. Hot attachment needs a compatible PCI-enabled VM.",
    code: ["mvm volume attach myvm data-disk", "mvm volume detach myvm data-disk"],
    callout: "Unmount the filesystem in the guest before detaching. Attachment does not automatically format or mount the disk.",
  },
  {
    title: "Grow a volume",
    description: "Stop every attached VM before growing a volume. It can remain attached while stopped; shrinking is not supported.",
    code: ["mvm vm stop myvm", "mvm volume resize data-disk 20G", "mvm vm start myvm"],
    callout: "Growing the backing disk does not resize guest partitions or filesystems. Extend them inside the guest afterward.",
  },
  {
    title: "Remove a volume",
    description: "Remove an unattached volume, or use force after stopping every attached VM.",
    code: ["mvm volume rm data-disk", "# For a volume still attached to stopped VMs:", "mvm volume rm data-disk --force"],
    callout: "Removal deletes the managed volume data. Force does not bypass the stopped-VM requirement.",
  },
];

/* ───────────────────────────────────────────────────────────────
   NETWORK
   ─────────────────────────────────────────────────────────────── */

export const networkSections = [
  {
    title: "Managed networks",
    description: "Each VM runs in a separate network namespace. Networks provide private IPv4 addresses and optional NAT. mvmctl selects the uplink and manages nftables directly; there is no iptables backend or caller-selected host interface.",
    code: ["mvm network create mynet --subnet 10.25.0.0/24", "mvm network ls", "mvm network inspect mynet"],
    callout: "Use a private subnet that does not overlap your host routes. Kernel interface names are internal; use network names or IDs with the CLI.",
  },
  {
    title: "Connect a VM",
    description: "Choose a network when creating a VM, or use --no-network for a guest that only needs host-side exec and file transfer.",
    code: ["mvm vm create myvm --image ubuntu:24.04 --network mynet", "# Alternative: a VM without guest networking", "mvm vm create offline-vm --image ubuntu:24.04 --no-network"],
    callout: "The host can reach a guest service at its VM address when the service listens on the guest interface and the host firewall permits it. Guest 127.0.0.1 is private to that VM; host-to-VM access does not need an mvm traffic policy.",
  },
  {
    title: "Reconcile or remove a network",
    description: "Use sync to reconcile managed network state. Remove attached VMs before removing their network.",
    code: ["mvm network sync", "mvm network rm mynet"],
    callout: "Conflicting or changed firewall state is refused rather than overwritten. Do not flush unrelated firewall rules to make setup pass.",
  },
];

export const exactPolicySections = [
  {
    title: "Allow traffic between VMs",
    description: "Traffic between managed VMs is denied by default, even on the same network. For existing VMs named client and server, allow only the destination port you need:",
    code: ["mvm policy traffic create --from-vm client --to-vm server --protocol tcp --port 8080", "mvm policy traffic ls"],
    callout: "Traffic policies govern IP connections. They do not authorize command execution. Use --from-network instead of --from-vm to select a source network.",
  },
  {
    title: "Reach a host service from a VM",
    description: "Use --to-host to allow explicit TCP or UDP ports on the source network's host gateway. If the gateway is 10.25.0.1, the guest connects to 10.25.0.1:5432, not the host's LAN address or localhost.",
    code: ["mvm policy traffic create --from-vm client --to-host --protocol tcp --port 5432", "mvm policy traffic inspect POLICY_ID --from-vm --to-host", "mvm policy traffic rm POLICY_ID --from-vm --to-host --force"],
    callout: "Operators may select any port, but each policy must name its protocol and port/range. The host service must listen on the gateway or a suitable wildcard address. Host-to-VM access is unchanged. Use --from-network to grant that network's VMs access to its own gateway.",
  },
  {
    title: "Allow VM-to-VM commands",
    description: "Exec policies are directional and name a non-root account that already exists in the destination guest. For client, server and the destination account app:",
    code: ["mvm policy exec create client server app", "mvm exec client --allow-vm-exec -- mvm-agent remote --user app server -- whoami", "mvm policy exec ls"],
    callout: "Exec works across same-network, cross-network and networkless VMs. The source kernel must support SO_PEERPIDFD; the stock Firecracker CI kernel lacks it. Use a capable custom kernel. Reverse requests need their own policy.",
  },
];

/* ───────────────────────────────────────────────────────────────
   CONFIGURATION
   ─────────────────────────────────────────────────────────────── */

export const guestControlIntro =
  "A floating IP reserves one private IPv4 address in a managed network, separate from a VM's primary address. Guest Control lets an explicitly delegated guest claim that address for itself, renew a finite lease and release it. Clients keep the same destination when ownership moves.";

export const guestControlCallout =
  "Host assignments persist until release, transfer or VM stop. Guest assignments use finite leases. A stored delegation does not mean the guest is connected. The full Kubernetes HA workflow has not been tested end to end; no failover time is promised.";

export const guestControlSections = [
  {
    id: "floating-ip-reserve",
    title: "Reserve an address",
    description: "For an existing managed network named cluster, allocate an available address. Add --ip 10.25.0.100 to request that exact address when it belongs to the network's subnet. Allocation excludes the gateway, network and broadcast addresses, VM primary reservations (including stopped VMs), and other floating IPs.",
    code: [
      "mvm floating-ip create api --network cluster",
      "mvm floating-ip inspect api --network cluster --json",
      "mvm floating-ip ls --network cluster --long",
    ],
    callout: "Names are unique within a network. Resource selectors accept a name, full ID, unambiguous ID prefix or IPv4. Inspection returns the immutable ID and generation. Reusing a freed name or address creates a different resource. Omit --network to select the default network.",
  },
  {
    id: "floating-ip-host",
    title: "Assign ownership from the host",
    description: "For eligible running VMs controller-1 and controller-2 in cluster, associate an unowned reservation, explicitly transfer it, or release it. Host assignments persist until release, transfer or VM stop and need neither a delegation nor a renewal loop. Guest leases always remain finite. Transfer fences the old owner before admitting the new one; association cannot replace an owner.",
    code: [
      "mvm floating-ip associate api controller-1 --network cluster",
      "mvm floating-ip transfer api controller-2 --network cluster",
      "mvm floating-ip release api --network cluster",
      "mvm floating-ip inspect api --network cluster --json",
    ],
    callout: "Optional --generation N binds an earlier observation; omission observes the current generation before compare-and-swap. Persistent ownership with zero remaining lease is not expired. Successful release reports absent after fencing; unowned inspection reports unobserved, which is not absence proof. Inspection does not contact the guest or establish alias readiness. Association and transfer wait for exact guest alias acknowledgment. An error can follow kernel commit without rollback: inspect ownership before deciding whether to retry.",
  },
  {
    id: "floating-ip-delegate",
    title: "Delegate exact methods",
    description: "For an eligible running VM named controller-1 in cluster, grant each needed method separately. Association and renewal require an explicit positive whole-second Go duration, such as 10s or 1m. Inspect and release forbid a lease. The 10s values below are examples, not defaults.",
    code: [
      "mvm floating-ip delegation grant api --network cluster --vm controller-1 --method inspect",
      "mvm floating-ip delegation grant api --network cluster --vm controller-1 --method associate --lease 10s",
      "mvm floating-ip delegation grant api --network cluster --vm controller-1 --method renew --lease 10s",
      "mvm floating-ip delegation grant api --network cluster --vm controller-1 --method release",
      "mvm floating-ip delegation ls api --network cluster --long",
    ],
    callout: "Each grant binds the exact resource, method and current VM incarnation under the same operator and network. It does not claim the address or renew ownership. Restart and restore do not transfer grants to a new incarnation. A guest cannot allocate resources, create grants, select another owner or run arbitrary host commands. Revoking a grant fences only ownership it sustained; unrelated revocation leaves an operator assignment intact. A current release grant for the owning VM can explicitly release its persistent assignment.",
  },
  {
    id: "floating-ip-guest",
    title: "Request ownership from guest root",
    description: "Run mvm-agent control floating-ip as guest root. Its root-only local socket is /run/mvm-agent/control.sock. Every application with guest-root access can exercise the VM's grants. The forms below are syntax: replace RESOURCE_ID with the full lowercase 32-character resource ID and N with the generation returned by a fresh inspect.",
    code: [
      "mvm-agent control floating-ip inspect RESOURCE_ID",
      "mvm-agent control floating-ip associate --generation N RESOURCE_ID",
      "mvm-agent control floating-ip renew --generation N RESOURCE_ID",
      "mvm-agent control floating-ip release --generation N RESOURCE_ID",
    ],
    callout: "JSON results contain resource_id, ipv4, generation, ownership (unassociated, self or other), lifetime and lease_remaining_ms. A persistent lifetime with zero remaining lease is not expired; guest renewal cannot extend or convert it. Inspect before each decision. Association cannot evict a healthy owner; renew only while the local service is healthy. A conflict, timeout or outcome_unknown requires inspection before another mutation. Ownership changes advance the generation; renewal retains it. Remaining finite time is measured at the host, not restarted by response delivery.",
  },
  {
    id: "floating-ip-traffic",
    title: "Allow service traffic separately",
    description: "Delegation grants no client access. For existing client, api and cluster resources, allow only the required service port. Choose one VM source or, alternatively, the selected source network's VMs. The exact floating destination follows its active owner, stays dormant while unassociated, and does not expose the owner's primary address or other aliases.",
    code: [
      "mvm policy traffic create --from-vm client --to-floating-ip api --to-network cluster --protocol tcp --port 6443",
      "# Alternative source scope:",
      "mvm policy traffic create --from-network cluster --to-floating-ip api --to-network cluster --protocol tcp --port 6443",
      "mvm policy traffic ls --json",
    ],
    callout: "--to-network selects the floating reservation's network (default network when omitted); it is invalid for other destinations. Inspect or remove a floating-IP traffic policy using its policy ID, --to-floating-ip and the boolean --from-vm or --from-network family flag. A --to-vm policy follows that VM's admitted addresses instead. Host-originated access still depends on host routing and firewall rules; floating-address delivery fencing still applies.",
  },
  {
    id: "floating-ip-remove",
    title: "Revoke and remove resources",
    description: "Stop lease controllers and release ownership before removing their resources. Use the complete lowercase 32-character grant ID from the grant list with mvm floating-ip delegation inspect GRANT_ID --network cluster or mvm floating-ip delegation revoke GRANT_ID --network cluster. These commands do not accept prefixes. Revocation fences ownership sustained by that exact grant, can finish after the VM stops, and cannot reactivate the revoked ID. Remove obsolete service policies, then the reservation:",
    code: ["mvm floating-ip rm api --network cluster"],
    callout: "--force skips confirmation, not ownership checks. Ordinary network removal requires floating reservations to be removed first. VM stop, deletion and restore fence secondary authority. Host reboot restores neither finite nor persistent ownership. Version 1 environment declarations retain exact resource and grant IDs for retries and cleanup; see the <a href='/docs/env-spec/#env-spec-floating-ip'>environment reference</a>.",
  },
] as const;

export const configSections = [
  {
    title: "Resource controls",
    description: "CPU, process-count and swap controls use cgroup v2. Memory is pressure-only: memory.high is guest RAM plus configured VMM headroom, while memory.max is unlimited. A VM can exceed the pressure threshold; host or enclosing-cgroup OOM can still kill it.",
    code: ["mvm vm inspect myvm --json"],
    callout: "Inspect requested and observed limits instead of treating guest RAM as a hard host-memory ceiling.",
  },
  {
    title: "Structured output",
    description: "Supported commands accept --json and return a schema-1 envelope with status, data and error. Errors and partial batch outcomes exit unsuccessfully; handle per-item results before retrying. Interactive init does not support JSON.",
    code: ["mvm vm ls --json", "mvm vm inspect myvm --json"],
  },
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
      "User settings and resource listings live in <code>~/.cache/mvmctl/mvmdb.db</code>; managed key files live in <code>~/.config/mvmctl</code>. <code>MVM_CACHE_DIR</code> and <code>MVM_CONFIG_DIR</code> override these locations. Root ownership records and trusted binaries live under <code>/var/lib/mvmctl</code>; runtime sockets and locks use <code>/run/mvmctl</code>. Copying the database does not transfer VM ownership.",
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
      "MVM_WARM_POOL          Set to disk to keep the warm pool in the cache",
      "MVM_TEMP_DIR           Override the temporary workspace directory",
      "MVM_ASSET_MIRROR       Local directory for asset mirroring",
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
      "# Preview complete cache removal before running it",
      "mvm cache clean --dry-run",
      "mvm cache clean",
    ],
    callout:
      "Preview cleanup with <code>--dry-run</code>. <code>prune --all</code> includes running VMs and protected assets; <code>cache clean</code> also retires the selected cache and its managed networking. These commands can delete VM data. Cleanup refuses unresolved ownership or active-reference conflicts.",
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
    title: "Install dependencies for your workflow",
    description:
      'Use the <a href="https://github.com/AlanD20/mvmctl/blob/0.3.0-release/docs/DEPENDENCIES.md">dependency guide</a> for distribution packages and command-specific requirements. Basic setup needs KVM, sudo, networking utilities, and image tools; GuestFS and kernel source builds need additional packages.',
  },
  {
    title: "Firewall support",
    description:
      "The host kernel must support nftables inet and bridge tables. mvmctl programs them directly through netlink; it does not require the nft CLI or an iptables backend.",
  },
  {
    title: "Host access",
    description:
      "Enable hardware virtualization, then use host init to enroll your operator account. Run ordinary VM commands without sudo. Host setup and workspace initialization are separate steps.",
  },
];

/* ───────────────────────────────────────────────────────────────
   CLOUD-INIT
   ─────────────────────────────────────────────────────────────── */

export const cloudInitSections = [
  {
    title: "What is cloud-init?",
    description:
      "Cloud-init applies first-boot user-data inside a guest image that includes it. Enable a mode when you need guest packages or startup scripts; it is off by default.",
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
      "<code>inject</code> — writes cloud-init files into the rootfs through the configured provisioner.",
      "<code>net</code> — serves metadata from the managed network gateway on fixed TCP port 8000. Requires guest networking and cloud-init; custom ports are rejected.",
      "<code>iso</code> — attaches a seed disk with cloud-init files. Requires cloud-init support in the guest and <code>cloud-localds</code> on the host.",
      "<code>off</code> (default) — skips cloud-init. mvmctl still performs its supported direct guest setup.",
    ],
    callout: undefined,
  },
  {
    title: "How nocloud-net (net mode) works",
    items: [
      "A temporary HTTP server binds to the VM network gateway on TCP port 8000",
      "Firewall rules allow only the specific VM to reach its server",
      "The VM boots with the nocloud-net kernel command line datasource",
      "Cloud-init fetches <code>meta-data</code>, <code>user-data</code>, and <code>network-config</code> via HTTP",
      "Removing a VM revokes its metadata access; the shared listener can remain while other VMs use it",
    ],
    callout: undefined,
  },
  {
    title: "Security model",
    items: [
      "Each VM has its own network namespace; metadata uses one listener per managed network",
      "Per-VM grants restrict metadata access to the admitted guest",
      "Servers bind to the bridge gateway IP, not <code>0.0.0.0</code>",
      "Custom metadata ports are not supported",
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

export const installIntro =
  "Install one system-wide binary, then enroll your operator account. Use fresh managed state for 0.3.0; preserve anything you need from an older installation before replacing it.";

export const installCallout =
  'Use <code>/usr/local/bin/mvm --version</code> to check the installed version. If <code>mvm</code> selects an older user-local binary, correct your PATH before continuing.';

export const hostInitIntro =
  "An administrator prepares the host once. You then initialize your own workspace and run everyday commands without prefixing them with sudo.";

export const firstVmIntro =
  "This walkthrough takes you from zero to a running microVM: generate an SSH key, download a kernel and OS image, boot the VM, connect, and clean up.";

export const vmLifecycleIntro =
  "Once your VM is created, these commands let you interact with, inspect, snapshot, and tear it down.";

export const resourceManagementIntro =
  "mvmctl manages five resource types: OS images (root filesystems), kernels (vmlinux binaries), Firecracker/jailer binaries, SSH keys, and persistent data disks (volumes).";

export const networkIntro =
  "Managed networks give VMs private addresses and optional internet access through NAT. Each VM has its own network namespace. Traffic between managed VMs is denied by default, including on the same network; explicit policies allow the connections you need.";

export const dependenciesIntro =
  "Host requirements depend on the operations you use. Keep package selection in sync with the repository dependency guide.";

export const cloudInitIntro =
  "Cloud-init is optional and off by default. Use an enabled mode and a compatible guest image for first-boot packages, files and commands.";

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
    problem: "Host setup is incomplete",
    fix: ["mvm host status", "sudo /usr/local/bin/mvm host init"],
    note: "Run setup from your normal operator account. Log out and back in if it changes your groups. Check that hardware virtualization is enabled and /dev/kvm exists.",
  },
  {
    problem: "Required Firecracker release is missing",
    fix: ["mvm bin pull 1.17.0 --default", "mvm bin ls"],
    note: "VM launch requires the matching Firecracker/Jailer 1.17.0 pair. Pulling an older release does not make it eligible for launch.",
  },
  {
    problem: "An image or kernel is missing",
    fix: ["mvm image pull ubuntu:24.04 --default", "mvm kernel pull --type firecracker --default"],
    note: "Use mvm image ls and mvm kernel ls to check local assets before creating a VM.",
  },
  {
    problem: "VM boots but a service is unreachable",
    fix: ["mvm vm inspect myvm", "mvm exec myvm -- ss -lnt"],
    note: "Check the service's bind address. Guest localhost is not the VM's network address. Connections from another managed VM also need a traffic policy, even on the same network.",
  },
  {
    problem: "Network synchronization reports a conflict",
    fix: ["mvm network ls", "mvm network sync"],
    note: "mvmctl refuses unexpected firewall state. Have an administrator resolve the reported conflict; do not flush the host firewall or kill unrelated services.",
  },
  {
    problem: "NoCloud NET cannot start",
    fix: ["mvm host status", "mvm network ls"],
    note: "NET mode uses gateway TCP port 8000, not a dynamic port range. Custom ports are unsupported. Inspect the reported network or listener conflict rather than terminating every NoCloud process.",
  },
  {
    problem: "Console relay is not responding",
    fix: ["mvm console myvm --state", "mvm console myvm --kill", "mvm console myvm"],
    note: "The console uses a serial PTY relay, not vsock. Killing the relay leaves the VM running.",
  },
  {
    problem: "Volume growth or removal is refused",
    fix: ["mvm volume inspect data-disk"],
    note: "Stop all attached VMs before growing a volume or force-removing it. Growing does not require detaching. Force removal deletes data and cannot bypass a running VM.",
  },
];

export const uninstallSections = [
  {
    title: "Uninstall",
    description: "The 0.3.0 uninstaller removes every enrolled operator's managed VMs, snapshots, volumes, images, kernels and key copies. Export anything you need and stop other operators using mvmctl first.",
    code: [
      "curl -fsSL https://mvmctl.aland20.com/uninstall.sh | bash",
    ],
    callout: "Requires Python 3.10+ and administrator access. Type UNINSTALL MVMCTL at the terminal prompt to confirm deletion. The launcher verifies its versioned Python files before running them.",
  },
  {
    title: "Optional preview and custom paths",
    description: "External asset mirrors, original external SSH files and shared system packages are preserved. Recorded host settings are restored. Unknown files, incompatible legacy state and unresolved runtime ownership stop cleanup; completed deletions are not rolled back.",
    code: [
      "curl -fsSL https://mvmctl.aland20.com/uninstall.sh | bash -s -- --dry-run",
      "curl -fsSL https://mvmctl.aland20.com/uninstall.sh | bash -s -- --cache alice=/srv/alice/mvm-cache --config alice=/srv/alice/mvm-config",
    ],
    callout: 'Repeat --cache or --config for unrecorded custom paths. Preview is optional. For unattended deletion, explicitly pass --yes. See the <a href="https://github.com/AlanD20/mvmctl/blob/0.3.0-release/docs/UNINSTALL.md">full uninstall guide</a> for refusal recovery. After success, install again and run host init and mvm init.',
  },
];
