/* ───────────────────────────────────────────────────────────────
   TYPES
   ─────────────────────────────────────────────────────────────── */

export type ApiCodeBlock = {
  code: readonly string[];
};

export type ApiParamRow = {
  param: string;
  type: string;
  default: string;
  description: string;
};

export type ApiMethod = {
  signature: string;
  description: string;
  parameters?: readonly ApiParamRow[];
  returns?: string;
  raises?: string;
  example?: readonly string[];
  exampleTitle?: string;
  note?: string;
};

export type ApiModelField = {
  field: string;
  type: string;
  description: string;
};

export type ApiModel = {
  title: string;
  name: string;
  description?: string;
  fields: readonly ApiModelField[];
  resolvedFields?: readonly ApiModelField[];
};

export type ApiOperationGroup = {
  title: string;
  description: string;
  methods: readonly ApiMethod[];
};

export type ApiSectionBase = {
  id: string;
  title: string;
};

export type ApiSection =
  | (ApiSectionBase & {
      type: "intro";
      content: string;
    })
  | (ApiSectionBase & {
      type: "sub-intro";
      content: string;
    })
  | (ApiSectionBase & {
      type: "code";
      code: ApiCodeBlock;
    })
  | (ApiSectionBase & {
      type: "import-pattern";
      importCode: ApiCodeBlock;
      avoidCode: ApiCodeBlock;
      avoidNote?: string;
    })
  | (ApiSectionBase & {
      type: "module-table";
      rows: readonly [string, string][];
    })
  | (ApiSectionBase & {
      type: "model-group";
      models: readonly ApiModel[];
    })
  | (ApiSectionBase & {
      type: "exception-tree";
      tree: readonly string[];
      example?: ApiCodeBlock;
    })
  | (ApiSectionBase & {
      type: "operation-group";
      operations: readonly ApiOperationGroup[];
    })
  | (ApiSectionBase & {
      type: "e2e-example";
      description: string;
      code: ApiCodeBlock;
    });

/* ───────────────────────────────────────────────────────────────
   OVERVIEW
   ─────────────────────────────────────────────────────────────── */

export const apiSections: readonly ApiSection[] = [
  {
    id: "api-overview",
    title: "Overview",
    type: "intro",
    content:
      "Every CLI command maps 1:1 to a static method on an <code>*Operation</code> class in <code>mvmctl.api.*</code>. The CLI is a thin presentation layer — it handles argument parsing, output formatting, and exit codes, then calls the same functions documented here.",
  },
  {
    id: "api-overview-2",
    title: "Overview (cont.)",
    type: "sub-intro",
    content:
      "You can import the API directly to build automation scripts, GUIs, or TUIs without going through the CLI. All system interactions (KVM, iptables, bridge devices) happen lazily — importing the package has no side effects.",
  },
  {
    id: "api-overview-3",
    title: "Installation",
    type: "code",
    code: {
      code: [
        "# From source",
        "git clone https://github.com/AlanD20/mvmctl",
        "cd mvmctl",
        "uv sync",
      ],
    },
  },

  /* ───────────────────────────────────────────────────────────────
     IMPORT PATTERN
     ─────────────────────────────────────────────────────────────── */

  {
    id: "api-import-pattern",
    title: "Import Pattern",
    type: "import-pattern",
    importCode: {
      code: [
        "from mvmctl.api import VMOperation, VMCreateInput",
        "",
        'VMOperation.create(VMCreateInput(name="my-vm", ssh_keys=["my-key"], ...))',
      ],
    },
    avoidCode: {
      code: [
        "from mvmctl.api.vm_operations import VMOperation  # ❌ WRONG — use mvmctl.api instead",
      ],
    },
    avoidNote:
      "All public types are re-exported from <code>mvmctl.api</code>. Deep imports from sub-modules are <strong>not</strong> part of the public API.",
  },

  /* ───────────────────────────────────────────────────────────────
     MODULE OVERVIEW
     ─────────────────────────────────────────────────────────────── */

  {
    id: "api-module-overview",
    title: "Module Overview",
    type: "module-table",
    rows: [
      [
        "VMOperation",
        "VM lifecycle: create, remove, list_all, get, start, stop, pause, resume, reboot, snapshot, load_snapshot, inspect, export, import_, prune, attach_volume, detach_volume",
      ],
      [
        "NetworkOperation",
        "Network management: create, remove, list_all, get, set_default, inspect, sync, create_default_network, prune",
      ],
      [
        "ImageOperation",
        "Image operations: pull, import_, remove, list_all, get, set_default, inspect, warm, find_existing_image, prune",
      ],
      [
        "KernelOperation",
        "Kernel operations: pull, list_all, get, set_default, remove, inspect, prune",
      ],
      [
        "KeyOperation",
        "SSH key registry: add, create, list_all, get, inspect, remove, set_default, get_defaults, clear_defaults, export",
      ],
      [
        "BinaryOperation",
        "Binary management: pull, list_all, get, set_default, remove, remove_by_version, ensure_default, prune",
      ],
      [
        "HostOperation",
        "Host init/clean/reset, privilege checks, KVM access, binary checks, state, info, refresh_capacity, check_readiness, detect_resources, is_initialized, get_running_vms, get_ip_forward_status, check_kvm_access, check_required_binaries, get_state",
      ],
      [
        "CacheOperation",
        "Cache lifecycle: init_all, prune_vms, prune_networks, prune_images, prune_kernels, prune_binaries, prune_misc, prune_all, clean",
      ],
      [
        "ConsoleOperation",
        "Console access: get_connection_info, get_state, kill",
      ],
      ["LogOperation", "Log streaming: stream (boot/OS logs following)"],
      [
        "VolumeOperation",
        "Volume management: create, remove, list_all, get, inspect, resize",
      ],
      ["ConfigOperation", "Config management: get, set, reset, list_all"],
      [
        "CPOperation",
        "File copy operations between host and microVMs (tar-over-SSH)",
      ],
      ["SSHOperation", "SSH connection (interactive or command execution)"],
      [
        "InitOperation",
        "Onboarding wizard API: run, init_database, setup_host",
      ],
    ],
  },

  /* ───────────────────────────────────────────────────────────────
     DATA MODELS
     ─────────────────────────────────────────────────────────────── */

  {
    id: "api-data-models",
    title: "Data Models",
    type: "model-group",
    models: [
      {
        title: "VM Models",
        name: "VMStatus",
        description:
          "All data models are in <code>mvmctl.models.*</code>. Models are pure dataclasses with no business logic. Every domain record uses the <code>*Item</code> suffix.",
        fields: [
          {
            field: "STARTING",
            type: '"starting"',
            description: "VM is starting up",
          },
          { field: "RUNNING", type: '"running"', description: "VM is running" },
          { field: "PAUSED", type: '"paused"', description: "VM is paused" },
          {
            field: "STOPPING",
            type: '"stopping"',
            description: "VM is shutting down",
          },
          { field: "STOPPED", type: '"stopped"', description: "VM is stopped" },
          {
            field: "CRASHED",
            type: '"crashed"',
            description: "VM has crashed",
          },
          {
            field: "ERROR",
            type: '"error"',
            description: "VM is in error state",
          },
        ],
      },
      {
        title: "VMInstanceItem",
        name: "VMInstanceItem",
        fields: [
          { field: "id", type: "str", description: "VM ID (hash)" },
          {
            field: "name",
            type: "str",
            description: "VM name; used as hostname inside guest",
          },
          {
            field: "status",
            type: "str",
            description: "Current lifecycle state",
          },
          { field: "pid", type: "int", description: "Firecracker process PID" },
          {
            field: "ipv4",
            type: "str",
            description: "Assigned guest IP address",
          },
          {
            field: "mac",
            type: "str",
            description: "Assigned guest MAC address",
          },
          {
            field: "network_id",
            type: "str",
            description: "Network ID this VM is attached to",
          },
          {
            field: "tap_device",
            type: "str",
            description: "Host TAP interface name",
          },
          { field: "image_id", type: "str", description: "Image ID" },
          { field: "kernel_id", type: "str", description: "Kernel ID" },
          {
            field: "binary_id",
            type: "str",
            description: "Firecracker/jailer binary ID",
          },
          {
            field: "api_socket_path",
            type: "str",
            description: "Path to Firecracker API Unix socket",
          },
          {
            field: "config_path",
            type: "str",
            description: "Path to Firecracker JSON config",
          },
          {
            field: "cloud_init_mode",
            type: "str",
            description: "Cloud-init mode used",
          },
          { field: "vcpu_count", type: "int", description: "Number of vCPUs" },
          { field: "mem_size_mib", type: "int", description: "Memory in MiB" },
          {
            field: "disk_size_mib",
            type: "int",
            description: "Rootfs disk size in MiB",
          },
          {
            field: "rootfs_path",
            type: "str",
            description: "Path to rootfs image",
          },
          {
            field: "rootfs_suffix",
            type: "str",
            description: "Rootfs file suffix (e.g. .ext4)",
          },
          {
            field: "pci_enabled",
            type: "bool",
            description: "Whether PCI support is enabled",
          },
          {
            field: "nested_virt",
            type: "bool",
            description: "Nested virtualization enabled",
          },
          {
            field: "enable_logging",
            type: "bool",
            description: "Whether Firecracker logging is enabled",
          },
          {
            field: "enable_metrics",
            type: "bool",
            description: "Whether Firecracker metrics are enabled",
          },
          {
            field: "enable_console",
            type: "bool",
            description: "Whether serial console is enabled",
          },
          {
            field: "created_at",
            type: "str",
            description: "ISO 8601 creation timestamp",
          },
          {
            field: "updated_at",
            type: "str",
            description: "ISO 8601 update timestamp",
          },
          {
            field: "exit_code",
            type: "int | None",
            description: "Firecracker process exit code",
          },
          {
            field: "log_path",
            type: "str | None",
            description: "Path to Firecracker log file",
          },
          {
            field: "serial_output_path",
            type: "str | None",
            description: "Path to serial console log",
          },
          {
            field: "nocloud_net_port",
            type: "int | None",
            description: "Port for nocloud-net HTTP server",
          },
          {
            field: "nocloud_net_pid",
            type: "int | None",
            description: "PID of nocloud-net server",
          },
          {
            field: "relay_pid",
            type: "int | None",
            description: "PID of console relay process",
          },
          {
            field: "relay_socket_path",
            type: "str | None",
            description: "Path to console relay Unix socket",
          },
          {
            field: "process_start_time",
            type: "int | None",
            description: "Firecracker process start timestamp (epoch ms)",
          },
          {
            field: "lsm_flags",
            type: "str | None",
            description: "Linux Security Module flags",
          },
          {
            field: "boot_args",
            type: "str | None",
            description: "Custom kernel boot arguments",
          },
          {
            field: "ssh_keys",
            type: "list[str]",
            description: "SSH key names injected into the VM",
          },
          {
            field: "ssh_user",
            type: "str | None",
            description: "Default SSH user for the VM",
          },
          {
            field: "volume_ids",
            type: "list[str] | None",
            description: "Attached volume IDs",
          },
          {
            field: "cpu_config",
            type: "CpuConfig | None",
            description: "CPU template configuration (merged CPU config)",
          },
        ],
        resolvedFields: [
          {
            field: "kernel",
            type: "KernelItem | None",
            description: "Resolved kernel record",
          },
          {
            field: "image",
            type: "ImageItem | None",
            description: "Resolved image record",
          },
          {
            field: "binary",
            type: "BinaryItem | None",
            description: "Resolved binary record",
          },
          {
            field: "network",
            type: "NetworkItem | None",
            description: "Resolved network record",
          },
          {
            field: "volumes",
            type: "list[VolumeItem]",
            description: "Resolved volume records",
          },
        ],
      },
      {
        title: "NetworkItem",
        name: "NetworkItem",
        fields: [
          { field: "id", type: "str", description: "Network ID (hash)" },
          { field: "name", type: "str", description: "Network name" },
          {
            field: "subnet",
            type: "str",
            description: "IP subnet in CIDR notation",
          },
          {
            field: "bridge",
            type: "str",
            description: "Linux bridge device name",
          },
          {
            field: "ipv4_gateway",
            type: "str",
            description: "Host-side gateway IP",
          },
          {
            field: "bridge_active",
            type: "bool",
            description: "Whether bridge device exists",
          },
          {
            field: "nat_enabled",
            type: "bool",
            description: "Whether NAT rules are active",
          },
          {
            field: "is_default",
            type: "bool",
            description: "Whether this is the default network",
          },
          {
            field: "is_present",
            type: "bool",
            description: "Whether the network is present on the host",
          },
          {
            field: "created_at",
            type: "str",
            description: "ISO 8601 creation timestamp",
          },
          {
            field: "updated_at",
            type: "str",
            description: "ISO 8601 last update timestamp",
          },
          {
            field: "deleted_at",
            type: "str | None",
            description: "ISO 8601 soft-delete timestamp",
          },
          {
            field: "nat_gateways",
            type: "str | None",
            description: "Comma-separated physical NAT interfaces",
          },
          {
            field: "leases",
            type: "list[NetworkLeaseItem] | None",
            description: "IP leases associated with this network",
          },
          {
            field: "iptables_rules",
            type: "list[FirewallRule] | None",
            description: "Firewall rules associated with this network",
          },
          {
            field: "vms",
            type: "list[VMInstanceItem] | None",
            description: "VMs attached to this network for relation enrichment",
          },
        ],
      },
      {
        title: "ImageItem",
        name: "ImageItem",
        fields: [
          { field: "id", type: "str", description: "Image ID (SHA256 hash)" },
          {
            field: "type",
            type: "str",
            description: "Image type identifier (e.g. ubuntu, alpine, debian)",
          },
          {
            field: "version",
            type: "str",
            description: "Image version string (e.g. 24.04)",
          },
          {
            field: "name",
            type: "str",
            description: "Human-readable image name",
          },
          {
            field: "arch",
            type: "str",
            description: "Architecture (e.g. x86_64, arm64)",
          },
          {
            field: "path",
            type: "str",
            description: "Relative path to image file",
          },
          {
            field: "fs_type",
            type: "str",
            description: "Filesystem type (e.g. ext4, btrfs)",
          },
          {
            field: "minimum_rootfs_size_mib",
            type: "int",
            description: "Minimum rootfs size in MiB",
          },
          {
            field: "original_size",
            type: "int",
            description: "Original uncompressed size in bytes",
          },
          {
            field: "is_default",
            type: "bool",
            description: "Whether this is the default image",
          },
          {
            field: "is_present",
            type: "bool",
            description: "Whether the file exists on disk",
          },
          {
            field: "pulled_at",
            type: "str",
            description: "ISO 8601 download timestamp",
          },
          {
            field: "created_at",
            type: "str",
            description: "ISO 8601 creation timestamp",
          },
          {
            field: "updated_at",
            type: "str",
            description: "ISO 8601 last update timestamp",
          },
          {
            field: "distro",
            type: "str | None",
            description: "Detected Linux distribution (e.g. ubuntu)",
          },
          {
            field: "fs_uuid",
            type: "str | None",
            description: "Filesystem UUID",
          },
          {
            field: "compressed_size",
            type: "int | None",
            description: "Compressed size in bytes",
          },
          {
            field: "compression_ratio",
            type: "float | None",
            description: "Compression ratio",
          },
          {
            field: "compressed_format",
            type: "str | None",
            description: "Compression format (e.g. zst)",
          },
          {
            field: "deleted_at",
            type: "str | None",
            description: "ISO 8601 soft-delete timestamp",
          },
          {
            field: "vms",
            type: "list[VMInstanceItem] | None",
            description: "VMs referencing this image for relation enrichment",
          },
        ],
      },
      {
        title: "KernelItem",
        name: "KernelItem",
        fields: [
          { field: "id", type: "str", description: "Kernel ID (SHA256 hash)" },
          {
            field: "name",
            type: "str",
            description: "Full filename display name",
          },
          {
            field: "base_name",
            type: "str",
            description: "Base kernel name (e.g. vmlinux-firecracker)",
          },
          {
            field: "version",
            type: "str",
            description: "Kernel version string",
          },
          {
            field: "arch",
            type: "str",
            description: "Architecture (x86_64, arm64)",
          },
          {
            field: "type",
            type: "str",
            description: "Kernel type: firecracker or official",
          },
          {
            field: "path",
            type: "str",
            description: "Relative path to kernel file",
          },
          {
            field: "is_default",
            type: "bool",
            description: "Whether this is the default kernel",
          },
          {
            field: "is_present",
            type: "bool",
            description: "Whether the file exists on disk",
          },
          {
            field: "created_at",
            type: "str",
            description: "ISO 8601 creation timestamp",
          },
          {
            field: "updated_at",
            type: "str",
            description: "ISO 8601 last update timestamp",
          },
          {
            field: "deleted_at",
            type: "str | None",
            description: "ISO 8601 soft-delete timestamp",
          },
          {
            field: "vms",
            type: "list[VMInstanceItem] | None",
            description: "VMs using this kernel for relation enrichment",
          },
        ],
      },
      {
        title: "KernelPullResult",
        name: "KernelPullResult",
        description:
          "Unified result from kernel pull/build operations. Provides a consistent return type for both Firecracker download and official kernel build paths.",
        fields: [
          {
            field: "path",
            type: "Path",
            description: "Path to the built/fetched vmlinux",
          },
          {
            field: "version",
            type: "str",
            description: "Kernel version string",
          },
          {
            field: "arch",
            type: "str",
            description: "Architecture",
          },
          {
            field: "kernel_type",
            type: "str",
            description: "Kernel type: firecracker or official",
          },
          {
            field: "warnings",
            type: "list[str]",
            description: "Build warnings",
          },
          {
            field: "info_messages",
            type: "list[str]",
            description: "Informational messages",
          },
        ],
      },
      {
        title: "BinaryItem",
        name: "BinaryItem",
        fields: [
          { field: "id", type: "str", description: "Binary ID (SHA256 hash)" },
          {
            field: "name",
            type: "str",
            description: "Binary name: firecracker or jailer",
          },
          {
            field: "version",
            type: "str",
            description: "Semantic version string",
          },
          {
            field: "full_version",
            type: "str",
            description: "Full version string with metadata",
          },
          {
            field: "ci_version",
            type: "str | None",
            description: "Firecracker CI version tag",
          },
          {
            field: "path",
            type: "str",
            description: "Relative path to binary file",
          },
          {
            field: "is_default",
            type: "bool",
            description: "Whether this is the active default binary",
          },
          {
            field: "is_present",
            type: "bool",
            description: "Whether the file exists on disk",
          },
          {
            field: "created_at",
            type: "str",
            description: "ISO 8601 creation timestamp",
          },
          {
            field: "updated_at",
            type: "str",
            description: "ISO 8601 last update timestamp",
          },
          {
            field: "deleted_at",
            type: "str | None",
            description: "ISO 8601 soft-delete timestamp",
          },
          {
            field: "vms",
            type: "list[VMInstanceItem] | None",
            description: "VMs using this binary for relation enrichment",
          },
        ],
      },
      {
        title: "VolumeItem",
        name: "VolumeItem",
        description:
          "A persistent data disk attachable to VMs. Each volume has a name, size, format, and an attached status.",
        fields: [
          {
            field: "id",
            type: "str",
            description: "Volume ID (SHA256 hash of name + timestamp)",
          },
          {
            field: "name",
            type: "str",
            description: "Volume name (used in --volume flag)",
          },
          {
            field: "size_bytes",
            type: "int",
            description: "Volume size in bytes",
          },
          {
            field: "format",
            type: "str",
            description: "Disk format: raw or qcow2",
          },
          {
            field: "path",
            type: "str",
            description: "Relative path to volume disk file",
          },
          {
            field: "status",
            type: "VolumeStatus",
            description: "Current status: AVAILABLE or ATTACHED",
          },
          {
            field: "vm_id",
            type: "str | None",
            description: "VM ID this volume is attached to, if any",
          },
          {
            field: "created_at",
            type: "str",
            description: "ISO 8601 creation timestamp",
          },
          {
            field: "updated_at",
            type: "str",
            description: "ISO 8601 last update timestamp",
          },
          {
            field: "is_read_only",
            type: "bool",
            description: "Whether the volume is mounted read-only",
          },
        ],
      },
      {
        title: "SSHKeyItem",
        name: "SSHKeyItem",
        fields: [
          { field: "id", type: "str", description: "Key ID (SHA256 hash)" },
          {
            field: "name",
            type: "str",
            description: "Key name (used in --ssh-key)",
          },
          {
            field: "fingerprint",
            type: "str",
            description: "SHA256 fingerprint",
          },
          {
            field: "algorithm",
            type: "str",
            description: "Key algorithm (ed25519, rsa, ecdsa)",
          },
          { field: "comment", type: "str", description: "SSH key comment" },
          {
            field: "public_key_path",
            type: "str",
            description: "Path to .pub file",
          },
          {
            field: "is_default",
            type: "bool",
            description: "Whether this is a default key",
          },
          {
            field: "is_present",
            type: "bool",
            description: "Whether the key file exists on disk",
          },
          {
            field: "created_at",
            type: "str",
            description: "ISO 8601 creation timestamp",
          },
          {
            field: "updated_at",
            type: "str",
            description: "ISO 8601 last update timestamp",
          },
          {
            field: "private_key_path",
            type: "str | None",
            description: "Path to private key file",
          },
        ],
      },
      {
        title: "NetworkLeaseItem",
        name: "NetworkLeaseItem",
        fields: [
          { field: "id", type: "int | None", description: "Lease ID" },
          {
            field: "network_id",
            type: "str",
            description: "Network ID this lease belongs to",
          },
          { field: "ipv4", type: "str", description: "Leased IPv4 address" },
          {
            field: "vm_id",
            type: "str | None",
            description: "VM ID this lease is assigned to",
          },
          {
            field: "leased_at",
            type: "str",
            description: "ISO 8601 lease timestamp",
          },
          {
            field: "expires_at",
            type: "str | None",
            description: "ISO 8601 lease expiry timestamp",
          },
        ],
      },
      {
        title: "FirewallRule",
        name: "FirewallRule",
        fields: [
          { field: "id", type: "int | None", description: "Rule ID" },
          {
            field: "table_name",
            type: "FirewallTable",
            description: "Firewall table (filter, nat, mangle, raw, security)",
          },
          {
            field: "chain_name",
            type: "FirewallChain",
            description: "Firewall chain name",
          },
          {
            field: "rule_type",
            type: "FirewallRuleType",
            description:
              "Rule type: masquerade, forward_in, forward_out, nocloudnet_input",
          },
          {
            field: "protocol",
            type: "FirewallProtocol",
            description: "Protocol: tcp, udp, icmp, all",
          },
          { field: "source", type: "str", description: "Source CIDR or IP" },
          {
            field: "destination",
            type: "str",
            description: "Destination CIDR or IP",
          },
          {
            field: "in_interface",
            type: "str",
            description: "Input interface",
          },
          {
            field: "out_interface",
            type: "str",
            description: "Output interface",
          },
          {
            field: "target",
            type: "FirewallTarget",
            description: "Firewall target: ACCEPT, DROP, MASQUERADE, etc.",
          },
          { field: "sport", type: "int", description: "Source port" },
          { field: "dport", type: "int", description: "Destination port" },
          {
            field: "network_id",
            type: "str",
            description: "Network ID this rule belongs to",
          },
          {
            field: "is_active",
            type: "bool",
            description: "Whether the rule is currently active",
          },
          {
            field: "network_name",
            type: "str | None",
            description: "Network name",
          },
          {
            field: "command_string",
            type: "str | None",
            description: "Full iptables command string",
          },
          {
            field: "comment_tag",
            type: "str | None",
            description: "iptables comment tag",
          },
          {
            field: "created_at",
            type: "str | None",
            description: "ISO 8601 creation timestamp",
          },
          {
            field: "last_verified_at",
            type: "str | None",
            description: "ISO 8601 last verification timestamp",
          },
        ],
      },
      {
        title: "VMExportComputeConfig",
        name: "VMExportComputeConfig",
        description:
          "Compute resources configuration for VM export (vcpus, memory). Used as a sub-config within VMExportConfig.",
        fields: [
          {
            field: "vcpus",
            type: "int | None",
            description: "Number of vCPUs",
          },
          {
            field: "mem",
            type: "int | None",
            description: "Memory in MiB",
          },
        ],
      },
      {
        title: "VMExportImageConfig",
        name: "VMExportImageConfig",
        description:
          "Image specification using portable semantic refs (type, arch, disk_size). Part of VMExportConfig.",
        fields: [
          {
            field: "type",
            type: "str | None",
            description: "Image type (e.g. ubuntu-24.04)",
          },
          {
            field: "arch",
            type: "str | None",
            description: "Architecture (e.g. x86_64)",
          },
          {
            field: "disk_size",
            type: "str | None",
            description: "Rootfs disk size (e.g. 2G)",
          },
        ],
      },
      {
        title: "VMExportKernelConfig",
        name: "VMExportKernelConfig",
        description:
          "Kernel specification using portable semantic refs (version, arch, type). Part of VMExportConfig.",
        fields: [
          {
            field: "version",
            type: "str | None",
            description: "Kernel version (e.g. 6.1.0)",
          },
          {
            field: "arch",
            type: "str | None",
            description: "Architecture (e.g. x86_64)",
          },
          {
            field: "type",
            type: "str | None",
            description: "Kernel type: vmlinux or bzImage",
          },
        ],
      },
      {
        title: "VMExportBinaryConfig",
        name: "VMExportBinaryConfig",
        description:
          "Firecracker binary specification using portable semantic refs (name, version). Part of VMExportConfig.",
        fields: [
          {
            field: "name",
            type: "str",
            description: "Binary name: firecracker",
          },
          {
            field: "version",
            type: "str | None",
            description: "Semantic version string (e.g. v1.15.0)",
          },
        ],
      },
      {
        title: "VMExportNetworkConfig",
        name: "VMExportNetworkConfig",
        description:
          "Network configuration with portable semantic refs (name, subnet, gateway, NAT). Part of VMExportConfig.",
        fields: [
          {
            field: "name",
            type: "str | None",
            description: "Network name (e.g. default)",
          },
          {
            field: "subnet",
            type: "str | None",
            description: "Subnet in CIDR notation (e.g. 172.27.0.0/24)",
          },
          {
            field: "ipv4_gateway",
            type: "str | None",
            description: "Gateway IPv4 (e.g. 172.27.0.1)",
          },
          {
            field: "nat_gateways",
            type: "str | None",
            description: "Comma-separated NAT gateway interfaces",
          },
          {
            field: "nat_enabled",
            type: "bool | None",
            description: "Whether NAT rules are enabled",
          },
          {
            field: "ip",
            type: "str | None",
            description: "Assigned guest IP",
          },
          {
            field: "mac",
            type: "str | None",
            description: "Assigned guest MAC",
          },
        ],
      },
      {
        title: "VMExportBootConfig",
        name: "VMExportBootConfig",
        description:
          "Boot configuration (kernel args, console). Part of VMExportConfig.",
        fields: [
          {
            field: "args",
            type: "str | None",
            description: "Kernel boot arguments",
          },
          {
            field: "enable_console",
            type: "bool | None",
            description: "Whether serial console is enabled",
          },
        ],
      },
      {
        title: "VMExportFirecrackerConfig",
        name: "VMExportFirecrackerConfig",
        description:
          "Firecracker feature flags for VM export (PCI, LSM, nested virt, CPU config). Part of VMExportConfig.",
        fields: [
          {
            field: "enable_api_socket",
            type: "bool | None",
            description: "Whether the API socket is enabled",
          },
          {
            field: "pci_enabled",
            type: "bool | None",
            description: "Whether PCI support is enabled",
          },
          {
            field: "lsm_flags",
            type: "str | None",
            description: "Linux Security Module flags",
          },
          {
            field: "nested_virt",
            type: "bool | None",
            description: "Whether nested virtualization is enabled",
          },
          {
            field: "cpu_config",
            type: "str | None",
            description: "JSON string of merged CPU template config",
          },
        ],
      },
      {
        title: "VMExportCloudInitConfig",
        name: "VMExportCloudInitConfig",
        description:
          "Cloud-init configuration for VM export (mode, user, SSH key). Part of VMExportConfig.",
        fields: [
          {
            field: "mode",
            type: "str | None",
            description: "Cloud-init mode: inject, iso, net, off",
          },
          {
            field: "user",
            type: "str | None",
            description: "SSH user",
          },
          {
            field: "ssh_key",
            type: "str | None",
            description: "SSH key name or path",
          },
          {
            field: "keep_iso",
            type: "bool | None",
            description: "Retain cloud-init ISO after boot",
          },
          {
            field: "nocloud_net_port",
            type: "int | None",
            description: "Port for nocloud-net server (0 or None = auto-assign)",
          },
        ],
      },
      {
        title: "VMExportConfig",
        name: "VMExportConfig",
        description:
          "Portable VM configuration for export/import across hosts. Uses semantic field references (type, version, name) — NEVER internal IDs. On import, the API layer resolves semantic refs to actual paths via DB queries.",
        fields: [
          {
            field: "schema_version",
            type: "str",
            description: "Schema version (fixed: 1.0)",
          },
          {
            field: "name",
            type: "str",
            description: "VM name",
          },
          {
            field: "compute",
            type: "VMExportComputeConfig",
            description: "Compute resources sub-config",
          },
          {
            field: "image",
            type: "VMExportImageConfig",
            description: "Image specification sub-config",
          },
          {
            field: "kernel",
            type: "VMExportKernelConfig",
            description: "Kernel specification sub-config",
          },
          {
            field: "binary",
            type: "VMExportBinaryConfig",
            description: "Binary specification sub-config",
          },
          {
            field: "network",
            type: "VMExportNetworkConfig",
            description: "Network configuration sub-config",
          },
          {
            field: "boot",
            type: "VMExportBootConfig",
            description: "Boot configuration sub-config",
          },
          {
            field: "firecracker",
            type: "VMExportFirecrackerConfig",
            description: "Firecracker feature flags sub-config",
          },
          {
            field: "cloud_init",
            type: "VMExportCloudInitConfig",
            description: "Cloud-init configuration sub-config",
          },
        ],
      },
    ],
  },

  /* ───────────────────────────────────────────────────────────────
     ERROR HANDLING
     ─────────────────────────────────────────────────────────────── */

  {
    id: "api-error-handling",
    title: "Error Handling",
    type: "exception-tree",
    tree: [
      "MVMError",
      "├── MVMRuntimeError",
      "├── VMError",
      "│   ├── VMNotFoundError",
      "│   ├── VMCreateError",
      "│   ├── VMStateError",
      "│   ├── VMRequestError",
      "│   └── VMBuilderError",
      "├── BinaryNotFoundError",
      "├── KernelNotFoundError",
      "├── NetworkNotFoundError",
      "├── KeyNotFoundError",
      "├── ImageNotFoundError",
      "├── ImageAcquireError",
      "├── NetworkError",
      "├── IPTablesTrackerError",
      "├── ImageError",
      "│   ├── ImageCompressionError",
      "│   ├── ImageDecompressionError",
      "│   ├── ImageCorruptError",
      "│   ├── ImageEmptyError",
      "│   ├── ImageValidationError",
      "│   └── ChecksumMismatchError",
      "├── KernelError",
      "├── FirecrackerError",
      "│   ├── FirecrackerClientError",
      "│   │   └── SocketNotFoundError",
      "│   ├── FirecrackerSpawnError",
      "│   └── FirecrackerConfigError",
      "├── ConfigError",
      "├── DatabaseError",
      "│   └── MigrationError",
      "├── HostError",
      "│   └── PrivilegeError",
      "├── ConsoleError",
      "├── LogsError",
      "├── ProcessError",
      "├── BundledAssetError",
      "│   └── BundledAssetNotFoundError",
      "├── BinaryError",
      "│   └── BinaryAlreadyExistsError",
      "├── VersionError",
      "├── VersionGateError",
      "├── SSHError",
      "│   └── CPError",
      "│       ├── CPSourceNotFoundError",
      "│       ├── CPDestinationExistsError",
      "│       └── CPDestinationNotDirectoryError",
      "├── MVMKeyError",
      "│   ├── KeyExportError",
      "│   ├── KeyDependencyError",
      "│   └── KeyFileError",
      "├── VolumeNotFoundError",
      "├── VolumeError",
      "├── CloudInitError",
      "│   ├── CloudInitProvisionError",
      "│   ├── CloudInitModeError",
      "│   ├── CloudInitOffModeError",
      "│   ├── CloudInitInjectModeError",
      "│   ├── CloudInitIsoModeError",
      "│   └── CloudInitNetModeError",
      "├── GuestfsError",
      "│   ├── GuestfsNotAvailableError",
      "│   └── GuestfsWriteError",
      "├── LoopMountError",
      "│   ├── LoopMountBinaryNotFoundError",
      "│   └── LoopMountTimeoutError",
      "├── RootPartitionDetectionError",
      "├── TieDetectedError",
      "└── HttpDownloadError",
    ],
    example: {
      code: [
        "from mvmctl.api import NetworkOperation, NetworkCreateInput",
        "from mvmctl.exceptions import MVMError, NetworkError",
        "",
        "try:",
        "    result = NetworkOperation.create(",
        '        NetworkCreateInput(name="my-net", subnet="192.168.100.0/24")',
        "    )",
        "except NetworkError as e:",
        '    print(f"Network setup failed: {e}")',
        "except MVMError as e:",
        '    print(f"Unexpected MVM error: {e}")',
      ],
    },
  },

  /* ───────────────────────────────────────────────────────────────
     OPERATION REFERENCE
     ─────────────────────────────────────────────────────────────── */

  {
    id: "api-vm-operation",
    title: "VMOperation",
    type: "operation-group",
    operations: [
      {
        title: "VMOperation",
        description:
          "All methods are @staticmethod. VM instances are identified using VMInput objects.",
        methods: [
          {
            signature:
              "VMOperation.create(inputs: VMCreateInput, *, on_progress: Callable[[ProgressEvent], None] | None = None) -> OperationResult[list[VMInstanceItem]] | NeedsInteraction",
            description:
              "Create and start a new Firecracker microVM. Copies the rootfs image, generates cloud-init data, sets up bridge networking, writes the Firecracker JSON config, starts the Firecracker process, and registers the VM in the database.",
            parameters: [
              {
                param: "inputs.name",
                type: "str",
                default: "—",
                description: "VM name (required)",
              },
              {
                param: "inputs.ssh_keys",
                type: "list[str]",
                default: "—",
                description: "SSH key names to inject",
              },
              {
                param: "inputs.image",
                type: "str | None",
                default: "None",
                description: "Image name/ID or path",
              },
              {
                param: "inputs.kernel_id",
                type: "str | None",
                default: "None",
                description: "Kernel ID (DB-backed default)",
              },
              {
                param: "inputs.vcpu_count",
                type: "int | None",
                default: "None",
                description: "Number of vCPUs",
              },
              {
                param: "inputs.mem_size_mib",
                type: "str | None",
                default: "None",
                description: "Memory size (e.g. 512M, 1G)",
              },
              {
                param: "inputs.network_name",
                type: "str | None",
                default: "None",
                description: "Network name",
              },
              {
                param: "inputs.cloud_init_mode",
                type: "str | None",
                default: "None",
                description:
                  "off, inject, iso, or net (resolved to off by default)",
              },
              {
                param: "inputs.user",
                type: "str | None",
                default: "None",
                description: "Default SSH user",
              },
              {
                param: "inputs.disk_size",
                type: "str | None",
                default: "None",
                description: "Rootfs disk size (e.g. 1G)",
              },
              {
                param: "inputs.requested_guest_ip",
                type: "str | None",
                default: "None",
                description: "Guest IP address",
              },
              {
                param: "inputs.requested_guest_mac",
                type: "str | None",
                default: "None",
                description: "Guest MAC address",
              },
              {
                param: "inputs.custom_user_data",
                type: "Path | None",
                default: "None",
                description: "Custom cloud-init user-data file",
              },
              {
                param: "inputs.nocloud_net_port",
                type: "int | None",
                default: "None",
                description: "Port for nocloud-net server",
              },
              {
                param: "inputs.pci_enabled",
                type: "bool | None",
                default: "None",
                description: "Enable PCI support",
              },
              {
                param: "inputs.nested_virt",
                type: "bool | None",
                default: "None",
                description: "Enable nested virtualization",
              },
              {
                param: "inputs.cpu_template",
                type: "Path | None",
                default: "None",
                description:
                  "Path to a CPU template JSON file (maps to --cpu-template CLI flag)",
              },
              {
                param: "inputs.cpu_config",
                type: "CpuConfig | None",
                default: "None",
                description: "Pre-resolved CPU configuration (from import)",
              },
              {
                param: "inputs.enable_logging",
                type: "bool | None",
                default: "None",
                description: "Enable Firecracker logging",
              },
              {
                param: "inputs.enable_metrics",
                type: "bool | None",
                default: "None",
                description: "Enable Firecracker metrics",
              },
              {
                param: "inputs.enable_console",
                type: "bool | None",
                default: "None",
                description: "Enable serial console (DB-backed default)",
              },
              {
                param: "inputs.lsm_flags",
                type: "str | None",
                default: "None",
                description: "Linux Security Module flags",
              },
              {
                param: "inputs.boot_args",
                type: "str | None",
                default: "None",
                description: "Custom kernel boot arguments",
              },
              {
                param: "inputs.firecracker_bin",
                type: "str | None",
                default: "None",
                description: "Path to Firecracker binary",
              },
              {
                param: "inputs.binary_id",
                type: "str | None",
                default: "None",
                description: "Firecracker/jailer binary ID",
              },
              {
                param: "inputs.skip_cleanup",
                type: "bool",
                default: "False",
                description: "Skip cleanup on failure",
              },
              {
                param: "inputs.skip_ci_network_config",
                type: "bool",
                default: "False",
                description: "Skip cloud-init network config",
              },
              {
                param: "inputs.keep_cloud_init_iso",
                type: "bool",
                default: "False",
                description: "Keep cloud-init ISO after creation",
              },
              {
                param: "inputs.skip_deblob",
                type: "bool",
                default: "False",
                description: "Skip OS cache cleanup (deblob)",
              },
              {
                param: "inputs.count",
                type: "int | None",
                default: "None",
                description: "Number of VMs to create (batch mode)",
              },
              {
                param: "inputs.atomic",
                type: "bool",
                default: "False",
                description: "Roll back all VMs if any creation fails (batch mode)",
              },
              {
                param: "inputs.volumes",
                type: "list[str] | None",
                default: "None",
                description: "Volume names to attach on creation",
              },
              {
                param: "inputs.cloud_init_iso_path",
                type: "Path | None",
                default: "None",
                description: "Path to a pre-built cloud-init ISO",
              },
            ],
            raises:
              "VMCreateError, NetworkError, FirecrackerSpawnError, PrivilegeError",
            example: [
              "from mvmctl.api import VMOperation, VMCreateInput",
              "",
              "VMOperation.create(",
              "    VMCreateInput(",
              '        name="my-vm",',
              '        ssh_keys=["my-key"],',
              "        vcpu_count=2,",
              "        mem_size_mib=2048,",
              '        image="ubuntu:24.04",',
              "    )",
              ")",
            ],
          },
          {
            signature:
              "VMOperation.remove(inputs: VMInput) -> BatchResult[VMInstanceItem]",
            description:
              "Stop and remove one or more VMs. Sends SIGTERM (graceful shutdown), then SIGKILL if still running. Tears down TAP device and iptables rules.",
            parameters: [
              {
                param: "inputs.identifiers",
                type: "list[str]",
                default: "[]",
                description: "VM identifiers (names or IDs) to remove",
              },
              {
                param: "inputs.force",
                type: "bool",
                default: "False",
                description: "Skip graceful shutdown",
              },
            ],
          },
          {
            signature:
              "VMOperation.list_all(status: VMStatus | list[VMStatus] | None = None) -> list[VMInstanceItem]",
            description:
              "Return all registered VMs, optionally filtered by status.",
          },
          {
            signature: "VMOperation.get(inputs: VMInput) -> VMInstanceItem",
            description: "Look up a single VM by name, ID, IP, or MAC.",
            raises: "VMNotFoundError if not found or ambiguous.",
          },
          {
            signature:
              "VMOperation.start(inputs: VMInput) -> BatchResult[VMInstanceItem]",
            description: "Start one or more stopped VMs.",
          },
          {
            signature:
              "VMOperation.stop(inputs: VMInput) -> BatchResult[VMInstanceItem]",
            description: "Stop one or more running VMs gracefully.",
            parameters: [
              {
                param: "inputs.force",
                type: "bool",
                default: "False",
                description: "Skip graceful shutdown",
              },
            ],
          },
          {
            signature:
              "VMOperation.pause(inputs: VMInput) -> BatchResult[VMInstanceItem]",
            description: "Pause one or more running VMs.",
          },
          {
            signature:
              "VMOperation.resume(inputs: VMInput) -> BatchResult[VMInstanceItem]",
            description: "Resume one or more paused VMs.",
          },
          {
            signature:
              "VMOperation.reboot(inputs: VMInput) -> BatchResult[VMInstanceItem]",
            description: "Reboot one or more VMs.",
          },
          {
            signature:
              "VMOperation.snapshot(inputs: VMInput, mem_out: Path, state_out: Path) -> OperationResult[VMInstanceItem]",
            description:
              "Create a snapshot of a single VM's memory and state. Requires memory and state file output paths.",
          },
          {
            signature:
              "VMOperation.load_snapshot(inputs: VMInput, mem_in: Path, state_in: Path, resume_after: bool | None = None) -> OperationResult[VMInstanceItem]",
            description:
              "Load a VM from memory and state snapshot files. Optionally resume after loading.",
          },
          {
            signature:
              "VMOperation.inspect(inputs: VMInput) -> dict[str, Any]",
            description:
              "Show detailed information about a VM including all paths, features, and relations.",
          },
          {
            signature: "VMOperation.export(inputs: VMInput) -> VMExportConfig",
            description:
              "Export a VM's configuration to a portable VMExportConfig object.",
          },
          {
            signature:
              "VMOperation.import_(inputs: VMImportInput, *, on_progress: Callable[[ProgressEvent], None] | None = None) -> OperationResult[VMInstanceItem] | NeedsInteraction",
            description:
              "Create a VM from a portable config file. Resolves images, kernels, binaries, and networks.",
          },
          {
            signature:
              "VMOperation.prune(dry_run: bool = False, include_all: bool = False) -> OperationResult[list[str]]",
            description:
              "Prune VMs based on their status. By default, removes all VMs EXCEPT those in RUNNING or STARTING state. Use include_all=True to prune ALL VMs regardless of state.",
            parameters: [
              {
                param: "dry_run",
                type: "bool",
                default: "False",
                description: "Only report what would be removed, without actually removing",
              },
              {
                param: "include_all",
                type: "bool",
                default: "False",
                description: "Prune ALL VMs including RUNNING and STARTING",
              },
            ],
          },
          {
            signature:
              "VMOperation.attach_volume(vm_inputs: VMInput, volume_name: str) -> OperationResult[VMInstanceItem]",
            description:
              "Attach a volume to a running VM. Updates the VM record so the volume is included on next start.",
          },
          {
            signature:
              "VMOperation.detach_volume(vm_inputs: VMInput, volume_name: str) -> OperationResult[VMInstanceItem]",
            description:
              "Detach a volume from a running VM. Updates the VM record so the volume is excluded on next start.",
          },
        ],
      },
    ],
  },

  {
    id: "api-network-operation",
    title: "NetworkOperation",
    type: "operation-group",
    operations: [
      {
        title: "NetworkOperation",
        description:
          "All methods are @staticmethod. Networks are identified using NetworkInput objects.",
        methods: [
          {
            signature:
              "NetworkOperation.create(inputs: NetworkCreateInput) -> OperationResult[NetworkItem] | NeedsInteraction",
            description:
              "Create a named bridge network: sets up the bridge device, assigns the gateway IP, optionally configures NAT rules.",
            parameters: [
              {
                param: "inputs.name",
                type: "str",
                default: "—",
                description: "Network name (must be unique)",
              },
              {
                param: "inputs.subnet",
                type: "str",
                default: "—",
                description: "Subnet in CIDR notation",
              },
              {
                param: "inputs.ipv4_gateway",
                type: "str | None",
                default: "None",
                description: "Gateway IPv4 for the bridge",
              },
              {
                param: "inputs.nat_enabled",
                type: "bool",
                default: "True",
                description: "Configure NAT/masquerade",
              },
              {
                param: "inputs.nat_gateways",
                type: "list[str]",
                default: "[]",
                description: "Physical interfaces for NAT",
              },
            ],
          },
          {
            signature:
              "NetworkOperation.remove(inputs: NetworkInput, force: bool = False) -> OperationResult[NetworkItem]",
            description:
              "Remove a named network: tears down bridge and NAT rules, removes persisted state.",
            parameters: [
              {
                param: "force",
                type: "bool",
                default: "False",
                description: "Remove even if VMs reference it",
              },
            ],
          },
          {
            signature: "NetworkOperation.list_all() -> list[NetworkItem]",
            description: "List all named networks with lease enrichment.",
          },
          {
            signature:
              "NetworkOperation.get(inputs: NetworkInput) -> NetworkItem",
            description: "Get a single network by name or ID.",
            raises: "NetworkError if not found or ambiguous.",
          },
          {
            signature:
              "NetworkOperation.set_default(inputs: NetworkInput) -> OperationResult[NetworkItem]",
            description: "Set a network as the default for VM creation.",
          },
          {
            signature:
              "NetworkOperation.inspect(inputs: NetworkInput) -> dict[str, Any]",
            description:
              "Show detailed network information including leases and iptables rules.",
          },
          {
            signature:
              "NetworkOperation.sync(network_id: str | None = None) -> OperationResult[dict[str, dict[str, int]]]",
            description:
              "Sync iptables rules between database and host. Optionally target a specific network.",
          },
          {
            signature:
              "NetworkOperation.create_default_network() -> OperationResult[NetworkItem]",
            description:
              "Ensure the default network exists, creating it if needed. Called automatically by HostOperation.init(). Idempotent.",
          },
          {
            signature:
              "NetworkOperation.prune(dry_run: bool = False, include_all: bool = False) -> OperationResult[list[str]]",
            description:
              "Prune unused networks. By default, skips the default network and networks referenced by VMs or with active leases. Use include_all=True to remove ALL networks.",
            parameters: [
              {
                param: "dry_run",
                type: "bool",
                default: "False",
                description: "Only report what would be removed, without actually removing",
              },
              {
                param: "include_all",
                type: "bool",
                default: "False",
                description: "Remove ALL networks including default and referenced",
              },
            ],
          },

        ],
      },
    ],
  },

  {
    id: "api-image-operation",
    title: "ImageOperation",
    type: "operation-group",
    operations: [
      {
        title: "ImageOperation",
        description:
          "All methods are @staticmethod. Images are identified using ImageInput objects.",
        methods: [
          {
            signature:
              "ImageOperation.pull(inputs: ImagePullInput, *, on_progress: Callable[[ProgressEvent], None] | None = None) -> OperationResult[ImageItem] | NeedsInteraction",
            description:
              "Pull (download) a VM rootfs image (qcow2, tar, or raw), convert to ext4, and register in the database.",
            parameters: [
              {
                param: "inputs.type",
                type: "str",
                default: "—",
                description: "Image type (e.g. ubuntu, alpine, debian)",
              },
              {
                param: "inputs.version",
                type: "str | None",
                default: "None",
                description: "Image spec version",
              },
              {
                param: "inputs.no_cache",
                type: "bool",
                default: "False",
                description: "Skip cached version listing",
              },
              {
                param: "inputs.force",
                type: "bool",
                default: "False",
                description: "Re-download even if cached",
              },
              {
                param: "inputs.skip_optimization",
                type: "bool",
                default: "False",
                description: "Skip shrink and compression",
              },
              {
                param: "inputs.set_default",
                type: "bool",
                default: "False",
                description: "Set as default after download",
              },
              {
                param: "inputs.arch",
                type: "str | None",
                default: "None",
                description: "Image architecture",
              },
              {
                param: "inputs.disabled_detectors",
                type: "list[str]",
                default: "[]",
                description:
                  "Detectors to disable: type, label, size, filesystem",
              },
            ],
          },
          {
            signature:
              "ImageOperation.import_(inputs: ImageImportInput, *, on_progress: Callable[[ProgressEvent], None] | None = None) -> OperationResult[ImageItem]",
            description:
              "Import an existing local image file (qcow2, raw, tar-rootfs) and register it in the database.",
            parameters: [
              {
                param: "inputs.name",
                type: "str",
                default: "—",
                description: "Display name for the image",
              },
              {
                param: "inputs.source_path",
                type: "Path",
                default: "—",
                description: "Path to local image file",
              },
              {
                param: "inputs.format",
                type: "str | None",
                default: "None",
                description: "Image format: qcow2, raw, tar-rootfs, or auto",
              },
              {
                param: "inputs.arch",
                type: "str | None",
                default: "None",
                description: "Image architecture",
              },
              {
                param: "inputs.partition",
                type: "int | None",
                default: "None",
                description: "Root partition number",
              },
              {
                param: "inputs.force",
                type: "bool",
                default: "False",
                description: "Overwrite existing",
              },
              {
                param: "inputs.skip_optimization",
                type: "bool",
                default: "False",
                description: "Skip shrink and compression",
              },
              {
                param: "inputs.set_default",
                type: "bool",
                default: "False",
                description: "Set as default after import",
              },
              {
                param: "inputs.disabled_detectors",
                type: "list[str]",
                default: "[]",
                description:
                  "Detectors to disable: type, label, size, filesystem",
              },
            ],
          },
          {
            signature:
              "ImageOperation.remove(inputs: ImageInput, force: bool = False) -> BatchResult[ImageItem]",
            description: "Remove an image from cache and database.",
            parameters: [
              {
                param: "force",
                type: "bool",
                default: "False",
                description: "Remove even if referenced by VMs",
              },
            ],
          },
          {
            signature:
              "ImageOperation.list_all(inputs: ImageInput | None = None, *, remote: bool = False, no_cache: bool = False, type_filter: str | None = None) -> list[ImageItem] | list[ImageVersion]",
            description: "List local cached images or available remote images.",
            parameters: [
              {
                param: "no_cache",
                type: "bool",
                default: "False",
                description: "Skip cached version listing and fetch live",
              },
              {
                param: "type_filter",
                type: "str | None",
                default: "None",
                description: "Filter by image type (e.g. ubuntu)",
              },
            ],
          },
          {
            signature: "ImageOperation.get(inputs: ImageInput) -> ImageItem",
            description: "Get a single image by ID or OS slug.",
          },
          {
            signature:
              "ImageOperation.set_default(inputs: ImageInput) -> OperationResult[ImageItem]",
            description: "Set an image as the default for new VMs.",
          },
          {
            signature:
              "ImageOperation.inspect(inputs: ImageInput) -> dict[str, Any]",
            description:
              "Show detailed information about an image including compression stats and storage details.",
          },
          {
            signature:
              "ImageOperation.warm(inputs: ImageInput | None = None, *, all: bool = False, on_progress: Callable[[ProgressEvent], None] | None = None) -> OperationResult[list[Path]]",
            description:
              "Pre-decompress image to tmpfs ready pool for fast VM creation.",
            parameters: [
              {
                param: "all",
                type: "bool",
                default: "False",
                description: "Warm all images, not just the default",
              },
            ],
          },
          {
            signature:
              "ImageOperation.prune(dry_run: bool = False, include_all: bool = False) -> OperationResult[list[str]]",
            description:
              "Prune unused images. By default, skips the default image and images referenced by VMs. Use include_all=True to remove ALL images.",
            parameters: [
              {
                param: "dry_run",
                type: "bool",
                default: "False",
                description: "Only report what would be removed, without actually removing",
              },
              {
                param: "include_all",
                type: "bool",
                default: "False",
                description: "Remove ALL images including default and referenced",
              },
            ],
          },
          {
            signature:
              "ImageOperation.find_existing_image(spec: ImageSpec, images_dir: Path, repo: ImageRepository) -> ImageItem | None",
            description:
              "Check the database for an existing image matching the given spec. Returns the ImageItem if found on disk, otherwise None.",
            parameters: [
              {
                param: "spec",
                type: "ImageSpec",
                default: "—",
                description: "ImageSpec with type and version attributes to match against",
              },
              {
                param: "images_dir",
                type: "Path",
                default: "—",
                description: "Directory to search for image files",
              },
              {
                param: "repo",
                type: "ImageRepository",
                default: "—",
                description: "ImageRepository to query for existing records",
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "api-kernel-operation",
    title: "KernelOperation",
    type: "operation-group",
    operations: [
      {
        title: "KernelOperation",
        description:
          "All methods are @staticmethod. Kernels are identified using KernelInput objects.",
        methods: [
          {
            signature:
              "KernelOperation.pull(inputs: KernelPullInput, *, on_progress: Callable[[ProgressEvent], None] | None = None) -> OperationResult[KernelItem] | NeedsInteraction",
            description:
              "Pull (download) or build a Firecracker kernel. Requires kernel_type (firecracker or official).",
            parameters: [
              {
                param: "inputs.kernel_type",
                type: "str",
                default: "—",
                description: "firecracker or official",
              },
              {
                param: "inputs.version",
                type: "str | None",
                default: "None",
                description: "Kernel version (default: 6.19.9 for official)",
              },
              {
                param: "inputs.arch",
                type: "str | None",
                default: "None",
                description: "Architecture",
              },
              {
                param: "inputs.set_default",
                type: "bool",
                default: "False",
                description: "Set as default after fetch",
              },
              {
                param: "inputs.jobs",
                type: "int | None",
                default: "None",
                description: "Parallel build jobs (official only)",
              },
              {
                param: "inputs.keep_build_dir",
                type: "bool",
                default: "False",
                description: "Keep build directory (official only)",
              },
              {
                param: "inputs.clean_build",
                type: "bool",
                default: "False",
                description: "Skip build cache (official only)",
              },
              {
                param: "inputs.kernel_config",
                type: "Path | None",
                default: "None",
                description: "Custom kernel config fragment",
              },
              {
                param: "inputs.features",
                type: "str",
                default: "\"\"",
                description: "Comma-separated kernel features (kvm, nftables)",
              },
            ],
          },
          {
            signature:
              "KernelOperation.remove(inputs: KernelInput, force: bool = False) -> BatchResult[KernelItem]",
            description: "Remove a kernel from cache and database.",
          },
          {
            signature:
              "KernelOperation.list_all(remote: bool = False, *, no_cache: bool = False) -> list[KernelItem] | list[VersionInfo]",
            description:
              "List kernels. When remote=True, returns available remote kernel versions from upstream providers (kernel.org for official kernels, Firecracker S3 for firecracker kernels). When remote=False (default), returns locally cached kernels.",
            parameters: [
              {
                param: "remote",
                type: "bool",
                default: "False",
                description: "If True, list remote kernel versions instead of local",
              },
              {
                param: "no_cache",
                type: "bool",
                default: "False",
                description:
                  "Skip cached version listing and fetch live from upstream. Only relevant when remote=True.",
              },
            ],
          },
          {
            signature: "KernelOperation.get(inputs: KernelInput) -> KernelItem",
            description: "Get a single kernel by ID or name.",
          },
          {
            signature:
              "KernelOperation.inspect(inputs: KernelInput) -> dict[str, Any]",
            description: "Show detailed kernel information.",
          },
          {
            signature:
              "KernelOperation.set_default(inputs: KernelInput) -> OperationResult[KernelItem]",
            description: "Set a kernel as the default for VM creation.",
          },
          {
            signature:
              "KernelOperation.import_(inputs: KernelImportInput) -> OperationResult[KernelItem]",
            description:
              "Import a local vmlinux file as a kernel. Auto-detects version and architecture from the filename when not explicitly provided, copies the file to the kernels cache directory, and creates a KernelItem with type \"custom\".",
          },
        ],
      },
    ],
  },

  {
    id: "api-key-operation",
    title: "KeyOperation",
    type: "operation-group",
    operations: [
      {
        title: "KeyOperation",
        description:
          "All methods are @staticmethod. Keys are identified using KeyInput objects.",
        methods: [
          {
            signature:
              "KeyOperation.create(inputs: KeyCreateInput) -> OperationResult[SSHKeyItem]",
            description:
              "Generate a new SSH keypair via ssh-keygen and register it.",
            parameters: [
              {
                param: "inputs.name",
                type: "str",
                default: "—",
                description: "Key name and base filename",
              },
              {
                param: "inputs.algorithm",
                type: "str | None",
                default: "None",
                description: "Key algorithm: ed25519, rsa, or ecdsa",
              },
              {
                param: "inputs.bits",
                type: "int | None",
                default: "None",
                description: "Key size in bits (RSA only; default 4096)",
              },
              {
                param: "inputs.comment",
                type: "str | None",
                default: "None",
                description: "Key comment",
              },
              {
                param: "inputs.set_default",
                type: "bool",
                default: "False",
                description: "Set as default after creation",
              },
              {
                param: "inputs.overwrite",
                type: "bool",
                default: "False",
                description: "Overwrite existing key",
              },
              {
                param: "inputs.output_dir",
                type: "Path | None",
                default: "None",
                description: "Output directory for the keypair",
              },
            ],
          },
          {
            signature:
              "KeyOperation.add(name: str, pub_key_path: Path, overwrite: bool = False) -> OperationResult[SSHKeyItem]",
            description: "Import an existing .pub file into the cache.",
            parameters: [
              {
                param: "name",
                type: "str",
                default: "—",
                description: "Name for the key",
              },
              {
                param: "pub_key_path",
                type: "Path",
                default: "—",
                description: "Path to .pub file",
              },
              {
                param: "overwrite",
                type: "bool",
                default: "False",
                description: "Overwrite existing key with same name",
              },
            ],
          },
          {
            signature: "KeyOperation.list_all() -> list[SSHKeyItem]",
            description: "List all keys in the cache.",
          },
          {
            signature: "KeyOperation.get(inputs: KeyInput) -> SSHKeyItem",
            description: "Get a single key by name or ID.",
          },
          {
            signature:
              "KeyOperation.inspect(inputs: KeyInput) -> dict[str, Any]",
            description: "Show detailed key information.",
          },
          {
            signature:
              "KeyOperation.set_default(inputs: KeyInput) -> OperationResult[SSHKeyItem]",
            description: "Set one or more keys as defaults for new VMs.",
          },
          {
            signature: "KeyOperation.get_defaults() -> list[SSHKeyItem]",
            description: "Get all default keys.",
          },
          {
            signature: "KeyOperation.clear_defaults() -> OperationResult[None]",
            description: "Clear all default key assignments.",
          },
          {
            signature:
              "KeyOperation.remove(inputs: KeyInput) -> BatchResult[SSHKeyItem]",
            description: "Remove keys from the cache.",
          },
          {
            signature:
              "KeyOperation.export(inputs: KeyInput, destination: Path, overwrite: bool = False) -> OperationResult[tuple[Path, Path]]",
            description: "Export a keypair to a destination directory.",
          },
        ],
      },
    ],
  },

  {
    id: "api-binary-operation",
    title: "BinaryOperation",
    type: "operation-group",
    operations: [
      {
        title: "BinaryOperation",
        description:
          "All methods are @staticmethod. Binaries are identified using BinaryInput objects.",
        methods: [
          {
            signature:
              "BinaryOperation.pull(inputs: BinaryPullInput) -> OperationResult[list[BinaryItem]] | NeedsInteraction",
            description:
              "Pull (download) a specific Firecracker/jailer binary version from GitHub releases.",
            parameters: [
              {
                param: "inputs.name",
                type: "str",
                default: '"firecracker"',
                description:
                  "Binary name (only 'firecracker' is supported for download/build)",
              },
              {
                param: "inputs.version",
                type: "str",
                default: "—",
                description: "Semantic version string (e.g. 1.15.0)",
              },
              {
                param: "inputs.git_ref",
                type: "str | None",
                default: "None",
                description:
                  "Git ref to build from source (e.g. v1.15.0). When set, skips release download and builds from source instead.",
              },
              {
                param: "inputs.set_default",
                type: "bool",
                default: "False",
                description: "Set as default after download",
              },
              {
                param: "inputs.download_override",
                type: "bool",
                default: "True",
                description: "Re-download even if cached",
              },
            ],
          },
          {
            signature:
              "BinaryOperation.remove(inputs: BinaryInput, force: bool = False) -> BatchResult[BinaryItem]",
            description: "Remove binaries by identifier.",
          },
          {
            signature:
              "BinaryOperation.remove_by_version(version: str, force: bool = False) -> OperationResult[None]",
            description:
              "Remove both firecracker and jailer by version string.",
          },
          {
            signature:
              "BinaryOperation.list_all(remote: bool = False, limit: int | None = None) -> list[BinaryItem] | list[str]",
            description:
              "List binaries. When remote=False (default), returns locally installed binaries. When remote=True, returns available remote versions from GitHub.",
            parameters: [
              {
                param: "remote",
                type: "bool",
                default: "False",
                description: "If True, list remote versions instead of local",
              },
              {
                param: "limit",
                type: "int | None",
                default: "None",
                description: "Limit remote versions returned",
              },
            ],
          },
          {
            signature:
              "BinaryOperation.get(inputs: BinaryInput) -> list[BinaryItem]",
            description: "Get a binary by name and version.",
          },
          {
            signature:
              "BinaryOperation.set_default(inputs: BinaryInput) -> OperationResult[BinaryItem]",
            description: "Set a binary (by ID) as the active default.",
          },
          {
            signature:
              "BinaryOperation.ensure_default() -> OperationResult[BinaryItem]",
            description: "Ensure a default Firecracker binary exists.",
          },
          {
            signature:
              "BinaryOperation.prune(dry_run: bool = False, include_all: bool = False) -> OperationResult[list[str]]",
            description:
              "Prune unused binaries. By default, skips the default version and service binaries (mvm-*). Use include_all=True to remove ALL binaries including the default version.",
            parameters: [
              {
                param: "dry_run",
                type: "bool",
                default: "False",
                description: "Only report what would be removed, without actually removing",
              },
              {
                param: "include_all",
                type: "bool",
                default: "False",
                description: "Remove ALL binaries including default version",
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "api-volume-operation",
    title: "VolumeOperation",
    type: "operation-group",
    operations: [
      {
        title: "VolumeOperation",
        description:
          "All methods are @staticmethod. Volumes are identified using VolumeInput objects.",
        methods: [
          {
            signature:
              "VolumeOperation.create(inputs: VolumeCreateInput) -> OperationResult[VolumeItem]",
            description:
              "Create a new persistent data disk. Creates the disk file via fallocate (raw) or qemu-img (qcow2), registers the volume in the database.",
            parameters: [
              {
                param: "inputs.name",
                type: "str",
                default: "—",
                description: "Volume name (required)",
              },
              {
                param: "inputs.size",
                type: "str",
                default: "—",
                description: "Volume size (e.g. 10G, 512M)",
              },
              {
                param: "inputs.format",
                type: "str | None",
                default: "None",
                description:
                  "Disk format: raw or qcow2 (resolved to raw by default)",
              },
              {
                param: "inputs.read_only",
                type: "bool | None",
                default: "None",
                description:
                  "Mount volume as read-only (resolved to False by default)",
              },
            ],
            raises: "VolumeError",
            example: [
              "from mvmctl.api import VolumeOperation, VolumeCreateInput",

              "result = VolumeOperation.create(",
              '    VolumeCreateInput(name="my-data", size="10G")',
              ")",
            ],
          },
          {
            signature:
              "VolumeOperation.remove(inputs: VolumeInput, force: bool = False) -> BatchResult[VolumeItem]",
            description:
              "Remove one or more volumes by name or ID prefix. Deletes the disk file and removes from the database.",
            parameters: [
              {
                param: "inputs.identifiers",
                type: "list[str]",
                default: "[]",
                description: "Volume names or ID prefixes to remove",
              },
              {
                param: "force",
                type: "bool",
                default: "False",
                description: "Remove even if attached to VMs",
              },
            ],
          },
          {
            signature: "VolumeOperation.list_all() -> list[VolumeItem]",
            description: "List all volumes from the database.",
          },
          {
            signature: "VolumeOperation.get(inputs: VolumeInput) -> VolumeItem",
            description: "Get a single volume by name or ID.",
            raises: "VolumeNotFoundError if not found or ambiguous.",
          },
          {
            signature:
              "VolumeOperation.inspect(inputs: VolumeInput) -> dict[str, Any]",
            description:
              "Show detailed information about a volume including qemu-img disk info.",
          },
          {
            signature:
              "VolumeOperation.resize(inputs: VolumeCreateInput) -> OperationResult[VolumeItem]",
            description:
              "Resize a volume. Raw format supports grow only (fallocate). qcow2 supports both grow and shrink (qemu-img).",
            parameters: [
              {
                param: "inputs.name",
                type: "str",
                default: "—",
                description: "Volume name to resize",
              },
              {
                param: "inputs.size",
                type: "str",
                default: "—",
                description: "New size (e.g. 20G)",
              },
            ],
            raises: "VolumeError",
          },
        ],
      },
    ],
  },

  {
    id: "api-host-operation",
    title: "HostOperation",
    type: "operation-group",
    operations: [
      {
        title: "HostOperation",
        description: "All methods are @staticmethod.",
        methods: [
          {
            signature:
              "HostOperation.init(cache_dir: Path, *, on_progress: Callable[[ProgressEvent], None] | None = None) -> OperationResult[Any] | NeedsInteraction",
            description:
              "Apply host configuration: enable IP forwarding, persist sysctl, load KVM modules, create the mvm unix group, configure sudoers, set up iptables chains, and ensure the default network. Fully idempotent.",
            raises: "HostError, PrivilegeError",
          },
          {
            signature:
              "HostOperation.clean(cache_dir: Path) -> OperationResult[list[str]]",
            description:
              "Remove all networking config (bridges, TAPs, iptables rules). Does not touch sysctl, sudoers, or group.",
          },
          {
            signature:
              "HostOperation.reset(cache_dir: Path) -> OperationResult[list[str]]",
            description:
              "Full rollback to pre-init state: networking, sysctl, sudoers, and group removal.",
          },
          {
            signature: "HostOperation.check_kvm_access() -> bool",
            description:
              "Return True if /dev/kvm exists and is accessible by the current user.",
          },
          {
            signature: "HostOperation.check_required_binaries() -> list[str]",
            description: "Return a list of missing required binary names.",
          },
          {
            signature: "HostOperation.get_ip_forward_status() -> str",
            description: "Return the current net.ipv4.ip_forward value.",
          },
          {
            signature:
              "HostOperation.info() -> OperationResult[dict[str, object]]",
            description:
              "Return current host info with capacity analysis. Returns hardware, limits, resource usage, and capacity projections from stored or auto-detected state.",
          },
          {
            signature:
              "HostOperation.refresh_capacity() -> OperationResult[dict[str, object]]",
            description:
              "Redetect host hardware/limits and refresh info output. Returns the same structure as info() but forces fresh detection instead of using cached state.",
          },
          {
            signature: "HostOperation.get_state() -> HostStateItem | None",
            description: "Return the saved host state if one exists.",
          },
          {
            signature:
              "HostOperation.get_running_vms() -> list[VMInstanceItem]",
            description: "Return all currently running VMs.",
          },
        ],
      },
    ],
  },

  {
    id: "api-cache-operation",
    title: "CacheOperation",
    type: "operation-group",
    operations: [
      {
        title: "CacheOperation",
        description: "All methods are @staticmethod.",
        methods: [
          {
            signature:
              "CacheOperation.init_all(*, on_progress: Callable[[ProgressEvent], None] | None = None) -> OperationResult[dict[str, str | list[str] | None]]",
            description:
              "Initialize all cache directories and optionally build the libguestfs fixed appliance.",
          },
          {
            signature:
              "CacheOperation.prune_vms(dry_run: bool = False, include_all: bool = False) -> OperationResult[list[str]]",
            description:
              "Prune VMs. By default prunes all except RUNNING/STARTING.",
          },
          {
            signature:
              "CacheOperation.prune_networks(dry_run: bool = False, include_all: bool = False) -> OperationResult[list[str]]",
            description: "Prune unused networks.",
          },
          {
            signature:
              "CacheOperation.prune_images(dry_run: bool = False, include_all: bool = False) -> OperationResult[list[str]]",
            description: "Prune unused images.",
          },
          {
            signature:
              "CacheOperation.prune_kernels(dry_run: bool = False, include_all: bool = False) -> OperationResult[list[str]]",
            description: "Prune unused kernels.",
          },
          {
            signature:
              "CacheOperation.prune_binaries(dry_run: bool = False, include_all: bool = False) -> OperationResult[list[str]]",
            description: "Prune unused binaries.",
          },
          {
            signature:
              "CacheOperation.prune_misc(dry_run: bool = False) -> OperationResult[dict[str, bool]]",
            description:
              "Prune misc cache (libguestfs appliance, warm images).",
          },
          {
            signature:
              "CacheOperation.prune_all(dry_run: bool = False, include_all: bool = False) -> OperationResult[PruneAllResult]",
            description: "Prune all cache resources in one call.",
          },
          {
            signature:
              "CacheOperation.clean(dry_run: bool = False) -> OperationResult[CleanResult]",
            description:
              "Completely clean all cache — prune everything, clean host networking, remove cache directory.",
          },
        ],
      },
    ],
  },

  {
    id: "api-ssh-operation",
    title: "SSHOperation",
    type: "operation-group",
    operations: [
      {
        title: "SSHOperation",
        description: "",
        methods: [
          {
            signature:
              "SSHOperation.connect(inputs: SSHInput) -> OperationResult[int]",
            description:
              "Open an interactive SSH session into a VM, or execute a command.",
            parameters: [
              {
                param: "inputs.identifier",
                type: "str",
                default: "—",
                description: "VM identifier (name, ID, IP, or MAC)",
              },
              {
                param: "inputs.user",
                type: "str | None",
                default: "None",
                description: "SSH user",
              },
              {
                param: "inputs.key",
                type: "Path | None",
                default: "None",
                description: "SSH private key path or key name",
              },
              {
                param: "inputs.cmd",
                type: "str | None",
                default: "None",
                description: "Command to execute (None = interactive)",
              },
              {
                param: "inputs.timeout",
                type: "int | None",
                default: "None",
                description: "SSH connection timeout in seconds",
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "api-cp-operation",
    title: "CPOperation",
    type: "operation-group",
    operations: [
      {
        title: "CPOperation",
        description:
          "File copy operations between host and microVMs via tar-over-SSH. Supports three directions: host_to_vm, vm_to_host, and vm_to_vm. Paths use vm_name:/path syntax to reference VM-side locations.",
        methods: [
          {
            signature:
              "CPOperation.copy(inputs: CPInput, on_progress: Callable[[int], None] | None = None) -> OperationResult[dict[str, Any]]",
            description:
              "Copy files between the host and microVMs. Uses tar-over-SSH for efficient streaming. Returns an OperationResult with bytes transferred and a summary message.",
            parameters: [
              {
                param: "inputs.sources",
                type: "list[str]",
                default: "—",
                description: "Source paths (local paths or vm_name:/remote/path)",
              },
              {
                param: "inputs.dst",
                type: "str",
                default: "—",
                description: "Destination path (local path or vm_name:/remote/path)",
              },
              {
                param: "inputs.user",
                type: "str | None",
                default: "None",
                description: "SSH user (resolved from VM record if not set)",
              },
              {
                param: "inputs.key",
                type: "str | None",
                default: "None",
                description: "SSH key name or path (resolved from VM record if not set)",
              },
              {
                param: "inputs.force",
                type: "bool",
                default: "False",
                description: "Overwrite existing destination files",
              },
            ],
            raises: "CPError, CPSourceNotFoundError, CPDestinationExistsError, CPDestinationNotDirectoryError, SSHError",
          },
        ],
      },
    ],
  },

  {
    id: "api-console-operation",
    title: "ConsoleOperation",
    type: "operation-group",
    operations: [
      {
        title: "ConsoleOperation",
        description:
          "Methods for managing the VM serial console relay via vsock.",
        methods: [
          {
            signature:
              "ConsoleOperation.get_connection_info(identifier: str) -> ConsoleConnectionInfo",
            description:
              "Get connection info (socket path) for attaching to a VM serial console.",
          },
          {
            signature:
              "ConsoleOperation.get_state(identifier: str) -> dict[str, Any]",
            description:
              "Check the console relay state for a VM (running, PID, socket path).",
          },
          {
            signature:
              "ConsoleOperation.kill(identifier: str) -> OperationResult[bool]",
            description: "Kill the console relay process for a VM.",
          },
        ],
      },
    ],
  },

  {
    id: "api-log-operation",
    title: "LogOperation",
    type: "operation-group",
    operations: [
      {
        title: "LogOperation",
        description: "Methods for streaming VM logs.",
        methods: [
          {
            signature:
              "LogOperation.stream(inputs: LogInput) -> Generator[str]",
            description:
              "Stream VM boot or OS logs. Supports line limits and follow mode.",
          },
        ],
      },
    ],
  },

  {
    id: "api-config-operation",
    title: "ConfigOperation",
    type: "operation-group",
    operations: [
      {
        title: "ConfigOperation",
        description: "Methods for managing mvmctl settings.",
        methods: [
          {
            signature:
              "ConfigOperation.get(category: str, key: str | None = None) -> Any",
            description: "Get a config value by category and optional key.",
          },
          {
            signature:
              "ConfigOperation.set(category: str, key: str, value: Any) -> OperationResult[None]",
            description: "Set a config value persistently in config.json.",
          },
          {
            signature:
              "ConfigOperation.reset(category: str | None = None, key: str | None = None, all_overrides: bool = False) -> OperationResult[int]",
            description: "Reset config override(s) to defaults.",
          },
          {
            signature: "ConfigOperation.list_all() -> dict",
            description:
              "List all overridable settings with their current values and types.",
          },
        ],
      },
    ],
  },

  {
    id: "api-init-operation",
    title: "InitOperation",
    type: "operation-group",
    operations: [
      {
        title: "InitOperation",
        description: "",
        methods: [
          {
            signature:
              "InitOperation.run(skip_host: bool = False, non_interactive: bool = False, *, on_progress: Callable[[ProgressEvent], None] | None = None, sudo_completed: bool = False, host_setup_message: str | None = None, download_version: str | None = None, guestfs_enabled: bool | None = None) -> InitResult",
            description:
              "Run the full init wizard: local state → host setup → cache init → binary fetch.",
          },
          {
            signature: "InitOperation.init_database() -> None",
            description:
              "Initialize the local SQLite database (run migrations).",
          },
          {
            signature:
              "InitOperation.setup_host(cache_dir: Path) -> OperationResult[Any] | NeedsInteraction",
            description:
              "Set up host configuration. Delegates to HostOperation.init().",
          },
        ],
      },
    ],
  },

  /* ───────────────────────────────────────────────────────────────
     END-TO-END EXAMPLE
     ─────────────────────────────────────────────────────────────── */

  {
    id: "api-end-to-end",
    title: "End-to-End Example",
    type: "e2e-example",
    description:
      "Complete orchestration script: initialize database, set up host, fetch binary, create SSH key, ensure default network, create a VM, and list running instances.",
    code: {
      code: [
        "#!/usr/bin/env python3",
        '"""Orchestrate microVM lifecycle using the mvmctl Python API."""',
        "",
        "from pathlib import Path",
        "from mvmctl.api import (",
        "    BinaryOperation, BinaryPullInput,",
        "    HostOperation,",
        "    ImageOperation, ImagePullInput,",
        "    InitOperation,",
        "    KeyOperation, KeyCreateInput,",
        "    NetworkOperation,",
        "    VMOperation, VMCreateInput,",
        ")",
        "from mvmctl.exceptions import MVMError",
        "from mvmctl.models.result import NeedsInteraction, OperationResult",
        "",
        "",
        "# CacheUtils.get_cache_dir() is not part of the public API —",
        "# use Path.home() for the default cache path instead.",
        "CACHE_DIR = Path.home() / \".cache\" / \"mvmctl\"",
        "",
        "",
        "def main() -> None:",
        "    # 1. Initialise the SQLite database",
        "    InitOperation.init_database()",
        '    print("Database ready.")',
        "",
        "    # 2. Initialise the host (idempotent)",
        "    host_result = HostOperation.init(CACHE_DIR)",
        "    if isinstance(host_result, NeedsInteraction):",
        '        print("Host init requires sudo. Run: sudo mvm host init")',
        "        return",
        "    changes = host_result.metadata.get(\"changes\", [])",
        "    if changes:",
        "        for change in changes:",
        '            print(f"  Applied: {change.setting} = {change.applied_value}")',
        "    else:",
        '        print("Host already configured.")',
        "",
        "    # 3. Ensure a Firecracker binary is available",
        "    local = BinaryOperation.list_all()",
        "    if not local:",
        '        print("Downloading Firecracker 1.15.1 ...")',
        '        result = BinaryOperation.pull(BinaryPullInput(version="1.15.1"))',
        "        if isinstance(result, NeedsInteraction):",
        '            print("Binary download requires privileges.")',
        "            return",
        "        if result.is_error:",
        '            print(f"Download failed: {result.message}")',
        "            return",
        "",
        "    # 4. Ensure a kernel is available (via CLI: mvm kernel pull)",
        "    #    or use KernelOperation.pull() directly",
        "",
        "    # 5. Ensure an image is available (via CLI: mvm image pull)",
        "    #    or use ImageOperation.pull() directly",
        "",
        "    # 6. Create or register an SSH key",
        "    key_result = KeyOperation.create(",
        '        KeyCreateInput(name="my-api-key", set_default=True)',
        "    )",
        "    if key_result.is_error:",
        '        print(f"Key creation failed: {key_result.message}")',
        "        return",
        "    key = key_result.item",
        "    assert key is not None",
        '    print(f"Created SSH key: {key.name} ({key.fingerprint})")',
        "",
        "    # 7. Ensure the default network exists",
        "    net_result = NetworkOperation.create_default_network()",
        "    if net_result.is_error:",
        '        print(f"Network creation failed: {net_result.message}")',
        "        return",
        "    default_net = net_result.item",
        "    assert default_net is not None",
        '    print(f"Default network: {default_net.name} ({default_net.subnet})")',
        "",
        "    # 8. Create a VM using the API",
        "    create_result = VMOperation.create(",
        "        VMCreateInput(",
        '            name="my-api-vm",',
        '            ssh_keys=["my-api-key"],',
        "            vcpu_count=2,",
        "            mem_size_mib=2048,",
        '            image="ubuntu",',
        '            network_name="default",',
        "        )",
        "    )",
        "    if isinstance(create_result, NeedsInteraction):",
        '        print("VM creation requires privileges.")',
        "        return",
        "    if create_result.is_error:",
        '        print(f"VM creation failed: {create_result.message}")',
        "        return",
        "    created_vms = create_result.item or []",
        "    names = [vm.name for vm in created_vms]",
        '    print(f"Created VM(s): {\', \'.join(names)}")',
        "",
        "    # 9. List all VMs",
        "    instances = VMOperation.list_all()",
        '    print(f"\\nRegistered VMs ({len(instances)}):")',
        "    for vm in instances:",
        '        print(f"  {vm.name:20s}  {vm.status:10s}  {vm.ipv4}")',
        "",
        "",
        'if __name__ == "__main__":',
        "    try:",
        "        main()",
        "    except MVMError as e:",
        '        print(f"Error: {e}")',
        "        raise SystemExit(1)",
      ],
    },
  },
];
