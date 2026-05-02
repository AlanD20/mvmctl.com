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
      'Every CLI command maps 1:1 to a static method on an <code>*Operation</code> class in <code>mvmctl.api.*</code>. The CLI is a thin presentation layer — it handles argument parsing, output formatting, and exit codes, then calls the same functions documented here.',
  },
  {
    id: "api-overview",
    title: "Overview (cont.)",
    type: "sub-intro",
    content:
      'You can import the API directly to build automation scripts, GUIs, or TUIs without going through the CLI. All system interactions (KVM, iptables, bridge devices) happen lazily — importing the package has no side effects.',
  },
  {
    id: "api-overview",
    title: "Installation",
    type: "code",
    code: {
      code: [
        "# From source",
        "git clone https://github.com/your-org/mvmctl",
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
        "VMOperation.create(VMCreateInput(name=\"my-vm\", ssh_keys=[\"my-key\"], ...))",
      ],
    },
    avoidCode: {
      code: [
        "from mvmctl.api.vm_operations import VMOperation  # ❌ WRONG — use mvmctl.api instead",
      ],
    },
    avoidNote:
      'All public types are re-exported from <code>mvmctl.api</code>. Deep imports from sub-modules are <strong>not</strong> part of the public API.',
  },

  /* ───────────────────────────────────────────────────────────────
     MODULE OVERVIEW
     ─────────────────────────────────────────────────────────────── */

  {
    id: "api-module-overview",
    title: "Module Overview",
    type: "module-table",
    rows: [
      ["VMOperation", "VM lifecycle: create, remove, list_all, get, start, stop, pause, resume, reboot, snapshot, load_snapshot, inspect, export, import_"],
      ["NetworkOperation", "Network management: create, remove, list_all, get, set_default, inspect, sync, reconcile, restore, create_default_network"],
      ["ImageOperation", "Image operations: fetch, import_, remove, list_, get, set_default, inspect, warm, find_existing_image"],
      ["KernelOperation", "Kernel operations: fetch, list_all, get, set_default, remove, ensure_default"],
      ["KeyOperation", "SSH key registry: add, create, list_all, get, inspect, remove, set_default, get_defaults, clear_defaults, export"],
      ["BinaryOperation", "Binary management: fetch, list_local, list_remote, get, set_default, remove, remove_by_version, ensure_default"],
      ["HostOperation", "Host init/reset/clean/prune, privilege checks, KVM access, binary checks, state, get_running_vms, get_ip_forward_status"],
      ["CacheOperation", "Cache lifecycle: init, prune per-asset-type, prune_all, clean"],
      ["ConsoleOperation", "Console access: attach, get_state, kill"],
      ["LogOperation", "Log streaming: stream (boot/OS logs following)"],
      ["ConfigOperation", "Config management: get, set, reset, list_all"],
      ["SSHOperation", "SSH connection (interactive or command execution)"],
      ["InitOperation", "Onboarding wizard API: run, init_database, setup_host"],
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
          'All data models are in <code>mvmctl.models.*</code>. Models are pure dataclasses with no business logic. Every domain record uses the <code>*Item</code> suffix.',
        fields: [
          { field: "STARTING", type: '"starting"', description: "VM is starting up" },
          { field: "RUNNING", type: '"running"', description: "VM is running" },
          { field: "PAUSED", type: '"paused"', description: "VM is paused" },
          { field: "STOPPING", type: '"stopping"', description: "VM is shutting down" },
          { field: "STOPPED", type: '"stopped"', description: "VM is stopped" },
          { field: "CRASHED", type: '"crashed"', description: "VM has crashed" },
          { field: "ERROR", type: '"error"', description: "VM is in error state" },
        ],
      },
      {
        title: "VMInstanceItem",
        name: "VMInstanceItem",
        fields: [
          { field: "id", type: "str", description: "VM ID (hash)" },
          { field: "name", type: "str", description: "VM name; used as hostname inside guest" },
          { field: "status", type: "str", description: "Current lifecycle state" },
          { field: "pid", type: "int", description: "Firecracker process PID" },
          { field: "ipv4", type: "str", description: "Assigned guest IP address" },
          { field: "mac", type: "str", description: "Assigned guest MAC address" },
          { field: "network_id", type: "str", description: "Network ID this VM is attached to" },
          { field: "tap_device", type: "str", description: "Host TAP interface name" },
          { field: "image_id", type: "str", description: "Image ID" },
          { field: "kernel_id", type: "str", description: "Kernel ID" },
          { field: "binary_id", type: "str", description: "Firecracker/jailer binary ID" },
          { field: "api_socket_path", type: "str", description: "Path to Firecracker API Unix socket" },
          { field: "config_path", type: "str", description: "Path to Firecracker JSON config" },
          { field: "cloud_init_mode", type: "str", description: "Cloud-init mode used" },
          { field: "vcpu_count", type: "int", description: "Number of vCPUs" },
          { field: "mem_size_mib", type: "int", description: "Memory in MiB" },
          { field: "disk_size_mib", type: "int", description: "Rootfs disk size in MiB" },
          { field: "rootfs_path", type: "str", description: "Path to rootfs image" },
          { field: "rootfs_suffix", type: "str", description: "Rootfs file suffix (e.g. .ext4)" },
          { field: "enable_pci", type: "bool", description: "Whether PCI support is enabled" },
          { field: "enable_logging", type: "bool", description: "Whether Firecracker logging is enabled" },
          { field: "enable_metrics", type: "bool", description: "Whether Firecracker metrics are enabled" },
          { field: "enable_console", type: "bool", description: "Whether serial console is enabled" },
          { field: "created_at", type: "str", description: "ISO 8601 creation timestamp" },
          { field: "updated_at", type: "str", description: "ISO 8601 update timestamp" },
          { field: "exit_code", type: "int | None", description: "Firecracker process exit code" },
          { field: "log_path", type: "str | None", description: "Path to Firecracker log file" },
          { field: "serial_output_path", type: "str | None", description: "Path to serial console log" },
          { field: "nocloud_net_port", type: "int | None", description: "Port for nocloud-net HTTP server" },
          { field: "nocloud_net_pid", type: "int | None", description: "PID of nocloud-net server" },
          { field: "relay_pid", type: "int | None", description: "PID of console relay process" },
          { field: "relay_socket_path", type: "str | None", description: "Path to console relay Unix socket" },
          { field: "process_start_time", type: "int | None", description: "Firecracker process start timestamp (epoch ms)" },
          { field: "lsm_flags", type: "str | None", description: "Linux Security Module flags" },
          { field: "boot_args", type: "str | None", description: "Custom kernel boot arguments" },
        ],
        resolvedFields: [
          { field: "kernel", type: "KernelItem | None", description: "Resolved kernel record" },
          { field: "image", type: "ImageItem | None", description: "Resolved image record" },
          { field: "binary", type: "BinaryItem | None", description: "Resolved binary record" },
          { field: "network", type: "NetworkItem | None", description: "Resolved network record" },
        ],
      },
      {
        title: "NetworkItem",
        name: "NetworkItem",
        fields: [
          { field: "id", type: "str", description: "Network ID (hash)" },
          { field: "name", type: "str", description: "Network name" },
          { field: "subnet", type: "str", description: "IP subnet in CIDR notation" },
          { field: "bridge", type: "str", description: "Linux bridge device name" },
          { field: "ipv4_gateway", type: "str", description: "Host-side gateway IP" },
          { field: "bridge_active", type: "bool", description: "Whether bridge device exists" },
          { field: "nat_enabled", type: "bool", description: "Whether NAT rules are active" },
          { field: "is_default", type: "bool", description: "Whether this is the default network" },
          { field: "is_present", type: "bool", description: "Whether the network is present on the host" },
          { field: "nat_gateways", type: "str | None", description: "Comma-separated physical NAT interfaces" },
          { field: "created_at", type: "str", description: "ISO 8601 creation timestamp" },
          { field: "updated_at", type: "str", description: "ISO 8601 last update timestamp" },
        ],
      },
      {
        title: "ImageItem",
        name: "ImageItem",
        fields: [
          { field: "id", type: "str", description: "Image ID (SHA256 hash)" },
          { field: "os_slug", type: "str", description: "OS slug identifier (e.g. ubuntu-24.04)" },
          { field: "os_name", type: "str", description: "Human-readable OS name" },
          { field: "arch", type: "str", description: "Architecture (e.g. x86_64, arm64)" },
          { field: "path", type: "str", description: "Relative path to image file" },
          { field: "fs_type", type: "str", description: "Filesystem type (e.g. ext4, btrfs)" },
          { field: "minimum_rootfs_size_mib", type: "int", description: "Minimum rootfs size in MiB" },
          { field: "original_size", type: "int", description: "Original uncompressed size in bytes" },
          { field: "is_default", type: "bool", description: "Whether this is the default image" },
          { field: "is_present", type: "bool", description: "Whether the file exists on disk" },
          { field: "pulled_at", type: "str", description: "ISO 8601 download timestamp" },
          { field: "created_at", type: "str", description: "ISO 8601 creation timestamp" },
          { field: "updated_at", type: "str", description: "ISO 8601 last update timestamp" },
          { field: "fs_uuid", type: "str | None", description: "Filesystem UUID" },
          { field: "compressed_size", type: "int | None", description: "Compressed size in bytes" },
          { field: "compression_ratio", type: "float | None", description: "Compression ratio" },
          { field: "compressed_format", type: "str | None", description: "Compression format (e.g. zst)" },
          { field: "deleted_at", type: "str | None", description: "ISO 8601 soft-delete timestamp" },
        ],
      },
      {
        title: "KernelItem",
        name: "KernelItem",
        fields: [
          { field: "id", type: "str", description: "Kernel ID (SHA256 hash)" },
          { field: "name", type: "str", description: "Full filename display name" },
          { field: "base_name", type: "str", description: "Base kernel name (e.g. vmlinux-firecracker)" },
          { field: "version", type: "str", description: "Kernel version string" },
          { field: "arch", type: "str", description: "Architecture (x86_64, arm64)" },
          { field: "type", type: "str", description: "Kernel type: firecracker or official" },
          { field: "path", type: "str", description: "Relative path to kernel file" },
          { field: "is_default", type: "bool", description: "Whether this is the default kernel" },
          { field: "is_present", type: "bool", description: "Whether the file exists on disk" },
          { field: "created_at", type: "str", description: "ISO 8601 creation timestamp" },
          { field: "updated_at", type: "str", description: "ISO 8601 last update timestamp" },
          { field: "deleted_at", type: "str | None", description: "ISO 8601 soft-delete timestamp" },
        ],
      },
      {
        title: "BinaryItem",
        name: "BinaryItem",
        fields: [
          { field: "id", type: "str", description: "Binary ID (SHA256 hash)" },
          { field: "name", type: "str", description: "Binary name: firecracker or jailer" },
          { field: "version", type: "str", description: "Semantic version string" },
          { field: "full_version", type: "str", description: "Full version string with metadata" },
          { field: "ci_version", type: "str | None", description: "Firecracker CI version tag" },
          { field: "path", type: "str", description: "Relative path to binary file" },
          { field: "is_default", type: "bool", description: "Whether this is the active default binary" },
          { field: "is_present", type: "bool", description: "Whether the file exists on disk" },
          { field: "created_at", type: "str", description: "ISO 8601 creation timestamp" },
          { field: "updated_at", type: "str", description: "ISO 8601 last update timestamp" },
          { field: "deleted_at", type: "str | None", description: "ISO 8601 soft-delete timestamp" },
        ],
      },
      {
        title: "SSHKeyItem",
        name: "SSHKeyItem",
        fields: [
          { field: "id", type: "str", description: "Key ID (SHA256 hash)" },
          { field: "name", type: "str", description: "Key name (used in --ssh-key)" },
          { field: "fingerprint", type: "str", description: "SHA256 fingerprint" },
          { field: "algorithm", type: "str", description: "Key algorithm (ed25519, rsa, ecdsa)" },
          { field: "comment", type: "str", description: "SSH key comment" },
          { field: "public_key_path", type: "str", description: "Path to .pub file" },
          { field: "is_default", type: "bool", description: "Whether this is a default key" },
          { field: "is_present", type: "bool", description: "Whether the key file exists on disk" },
          { field: "created_at", type: "str", description: "ISO 8601 creation timestamp" },
          { field: "updated_at", type: "str", description: "ISO 8601 last update timestamp" },
          { field: "private_key_path", type: "str | None", description: "Path to private key file" },
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
      "├── AssetNotFoundError",
      "├── BinaryError",
      "│   └── BinaryAlreadyExistsError",
      "├── BundledAssetError",
      "│   └── BundledAssetNotFoundError",
      "├── CloudInitError",
      "│   ├── CloudInitProvisionError",
      "│   ├── CloudInitModeError",
      "│   ├── CloudInitOffModeError",
      "│   ├── CloudInitIsoModeError",
      "│   ├── CloudInitNetModeError",
      "│   └── CloudInitInjectModeError",
      "├── ConfigError",
      "├── ConsoleError",
      "├── DatabaseError",
      "│   └── MigrationError",
      "├── DownloadError",
      "├── FirecrackerClientError",
      "│   └── SocketNotFoundError",
      "├── FirecrackerConfigError",
      "├── FirecrackerSpawnError",
      "├── GuestfsNotAvailableError",
      "├── GuestfsLaunchError",
      "├── GuestfsMountError",
      "├── GuestfsWriteError",
      "├── HostError",
      "│   └── PrivilegeError",
      "├── HttpDownloadError",
      "├── IPTablesTrackerError",
      "├── ImageAcquireError",
      "├── ImageError",
      "│   ├── ImageCompressionError",
      "│   ├── ImageCorruptError",
      "│   ├── ImageDecompressionError",
      "│   ├── ImageEmptyError",
      "│   ├── ImageValidationError",
      "│   └── ChecksumMismatchError",
      "├── KernelError",
      "├── MVMKeyError",
      "│   ├── KeyExportError",
      "│   ├── KeyDependencyError",
      "│   └── KeyFileError",
      "├── NetworkError",
      "├── ProcessError",
      "├── RootPartitionDetectionError",
      "├── SSHError",
      "├── TieDetectedError",
      "├── VMBuilderError",
      "├── VMCreateError",
      "├── VMRequestError",
      "├── VMNotFoundError",
      "├── NetworkNotFoundError",
      "├── ImageNotFoundError",
      "├── KernelNotFoundError",
      "├── BinaryNotFoundError",
      "└── KeyNotFoundError",
    ],
    example: {
      code: [
        "from mvmctl.api import NetworkOperation, NetworkCreateInput",
        "from mvmctl.exceptions import MVMError, NetworkError",
        "",
        "try:",
        '    result = NetworkOperation.create(',
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
        description: "All methods are @staticmethod. VM instances are identified using VMInput objects.",
        methods: [
          {
            signature: "VMOperation.create(inputs: VMCreateInput) -> None",
            description:
              "Create and start a new Firecracker microVM. Copies the rootfs image, generates cloud-init data, sets up bridge networking, writes the Firecracker JSON config, starts the Firecracker process, and registers the VM in the database.",
            parameters: [
              { param: "inputs.name", type: "str", default: "—", description: "VM name (required)" },
              { param: "inputs.ssh_keys", type: "list[str]", default: "—", description: "SSH key names to inject" },
              { param: "inputs.image", type: "str | None", default: "None", description: "Image name/ID or path" },
              { param: "inputs.image_path", type: "Path | None", default: "None", description: "Direct path to rootfs file" },
              { param: "inputs.kernel_id", type: "str | None", default: "None", description: "Kernel ID or path" },
              { param: "inputs.kernel_path", type: "Path | None", default: "None", description: "Direct path to kernel file" },
              { param: "inputs.vcpu_count", type: "int | None", default: "None", description: "Number of vCPUs" },
              { param: "inputs.mem_size_mib", type: "int | None", default: "None", description: "Memory in MiB" },
              { param: "inputs.network_name", type: "str | None", default: "None", description: "Network name" },
              { param: "inputs.cloud_init_mode", type: "str | None", default: "None", description: "off, inject, iso, or net (resolved to off by default)" },
              { param: "inputs.user", type: "str | None", default: "None", description: "Default SSH user" },
              { param: "inputs.disk_size", type: "str | None", default: "None", description: "Rootfs disk size (e.g. 1G)" },
              { param: "inputs.requested_guest_ip", type: "str | None", default: "None", description: "Guest IP address" },
              { param: "inputs.requested_guest_mac", type: "str | None", default: "None", description: "Guest MAC address" },
              { param: "inputs.custom_user_data", type: "Path | None", default: "None", description: "Custom cloud-init user-data file" },
              { param: "inputs.nocloud_net_port", type: "int | None", default: "None", description: "Port for nocloud-net server" },
              { param: "inputs.enable_pci", type: "bool | None", default: "None", description: "Enable PCI support" },
              { param: "inputs.enable_logging", type: "bool | None", default: "None", description: "Enable Firecracker logging" },
              { param: "inputs.enable_metrics", type: "bool | None", default: "None", description: "Enable Firecracker metrics" },
              { param: "inputs.enable_console", type: "bool | None", default: "None", description: "Enable serial console (DB-backed default)" },
              { param: "inputs.lsm_flags", type: "str | None", default: "None", description: "Linux Security Module flags" },
              { param: "inputs.boot_args", type: "str | None", default: "None", description: "Custom kernel boot arguments" },
              { param: "inputs.firecracker_bin", type: "str | None", default: "None", description: "Path to Firecracker binary" },
              { param: "inputs.skip_cleanup", type: "bool", default: "False", description: "Skip cleanup on failure" },
            ],
            raises: "VMCreateError, NetworkError, FirecrackerSpawnError, PrivilegeError",
            example: [
              "from mvmctl.api import VMOperation, VMCreateInput",
              "",
              "VMOperation.create(",
              "    VMCreateInput(",
              '        name="my-vm",',
              '        ssh_keys=["my-key"],',
              "        vcpu_count=2,",
              "        mem_size_mib=2048,",
              '        image="ubuntu-24.04",',
              "    )",
              ")",
            ],
          },
          {
            signature: "VMOperation.remove(inputs: VMInput) -> None",
            description:
              "Stop and remove one or more VMs. Sends SIGTERM (graceful shutdown), then SIGKILL if still running. Tears down TAP device and iptables rules.",
            parameters: [
              { param: "inputs.identifiers", type: "list[str]", default: "[]", description: "VM identifiers (names or IDs) to remove" },
              { param: "inputs.force", type: "bool", default: "False", description: "Skip graceful shutdown" },
            ],
          },
          {
            signature: "VMOperation.list_all(status: list[VMStatus] | None = None) -> list[VMInstanceItem]",
            description: "Return all registered VMs, optionally filtered by status.",
          },
          {
            signature: "VMOperation.get(inputs: VMInput) -> VMInstanceItem",
            description: "Look up a single VM by name, ID, IP, or MAC.",
            raises: "VMNotFoundError if not found or ambiguous.",
          },
          {
            signature: "VMOperation.start(inputs: VMInput) -> None",
            description: "Start one or more stopped VMs.",
          },
          {
            signature: "VMOperation.stop(inputs: VMInput) -> None",
            description: "Stop one or more running VMs gracefully.",
            parameters: [
              { param: "inputs.force", type: "bool", default: "False", description: "Skip graceful shutdown" },
            ],
          },
          {
            signature: "VMOperation.pause(inputs: VMInput) -> None",
            description: "Pause one or more running VMs.",
          },
          {
            signature: "VMOperation.resume(inputs: VMInput) -> None",
            description: "Resume one or more paused VMs.",
          },
          {
            signature: "VMOperation.reboot(inputs: VMInput) -> None",
            description: "Reboot one or more VMs.",
          },
          {
            signature: "VMOperation.snapshot(inputs: VMInput) -> None",
            description: "Create a snapshot of a single VM's memory and state.",
          },
          {
            signature: "VMOperation.inspect(inputs: VMInput, is_json: bool = False) -> VMInspectInfo | dict",
            description: "Show detailed information about a VM including all paths, features, and relations.",
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
        description: "All methods are @staticmethod. Networks are identified using NetworkInput objects.",
        methods: [
          {
            signature: "NetworkOperation.create(inputs: NetworkCreateInput) -> NetworkOperation.CreateResult",
            description: "Create a named bridge network: sets up the bridge device, assigns the gateway IP, optionally configures NAT rules.",
            parameters: [
              { param: "inputs.name", type: "str", default: "—", description: "Network name (must be unique)" },
              { param: "inputs.subnet", type: "str", default: "—", description: "Subnet in CIDR notation" },
              { param: "inputs.nat_enabled", type: "bool", default: "True", description: "Configure NAT/masquerade" },
              { param: "inputs.nat_gateways", type: "list[str]", default: "[]", description: "Physical interfaces for NAT" },
              { param: "inputs.ipv4_gateway", type: "str | None", default: "None", description: "Gateway IPv4 for the bridge" },
            ],
            returns: "NetworkOperation.CreateResult wrapping the created NetworkItem",
          },
          {
            signature: "NetworkOperation.remove(inputs: NetworkInput, force: bool = False) -> None",
            description: "Remove a named network: tears down bridge and NAT rules, removes persisted state.",
            parameters: [
              { param: "force", type: "bool", default: "False", description: "Remove even if VMs reference it" },
            ],
          },
          {
            signature: "NetworkOperation.list_all() -> list[NetworkItem]",
            description: "List all named networks with lease enrichment.",
          },
          {
            signature: "NetworkOperation.get(inputs: NetworkInput) -> NetworkItem",
            description: "Get a single network by name or ID.",
            raises: "NetworkError if not found or ambiguous.",
          },
          {
            signature: "NetworkOperation.set_default(inputs: NetworkInput) -> None",
            description: "Set a network as the default for VM creation.",
          },
          {
            signature: "NetworkOperation.inspect(inputs: NetworkInput, is_json: bool = False) -> NetworkItem | dict",
            description: "Show detailed network information including leases and iptables rules.",
          },
          {
            signature: "NetworkOperation.sync(network_id: str | None = None) -> dict[str, dict[str, int]]",
            description: "Sync iptables rules between database and host. Optionally target a specific network.",
          },
          {
            signature: "NetworkOperation.create_default_network() -> NetworkItem",
            description: "Ensure the default network exists, creating it if needed. Called automatically by HostOperation.init(). Idempotent.",
            returns: "The default NetworkItem.",
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
        description: "All methods are @staticmethod. Images are identified using ImageInput objects.",
        methods: [
          {
            signature: "ImageOperation.fetch(inputs: ImageFetchInput, phase_callback=None) -> ImageAcquireResult",
            description: "Download and convert a VM rootfs image (qcow2, tar, or raw) to an ext4 file, then register it in the database.",
            parameters: [
              { param: "inputs.os_slug", type: "str", default: "—", description: "OS slug (e.g. ubuntu-24.04)" },
              { param: "inputs.type", type: "str", default: "—", description: "Image type from images.yaml" },
              { param: "inputs.version", type: "str | None", default: "None", description: "Image spec version" },
              { param: "inputs.force", type: "bool", default: "False", description: "Re-download even if cached" },
              { param: "inputs.skip_optimization", type: "bool", default: "False", description: "Skip shrink and compression" },
              { param: "inputs.set_default", type: "bool", default: "False", description: "Set as default after download" },
              { param: "inputs.arch", type: "str | None", default: "None", description: "Image architecture" },
              { param: "inputs.disabled_detectors", type: "list[str]", default: "[]", description: "Detectors to disable: type, label, size, filesystem" },
            ],
          },
          {
            signature: "ImageOperation.import_(inputs: ImageImportInput) -> ImageAcquireResult",
            description: "Import an existing local image file (qcow2, raw, tar-rootfs) and register it in the database.",
            parameters: [
              { param: "inputs.name", type: "str", default: "—", description: "Display name for the image" },
              { param: "inputs.source_path", type: "Path", default: "—", description: "Path to local image file" },
              { param: "inputs.format", type: "str", default: "—", description: "Image format: qcow2, raw, or tar-rootfs" },
              { param: "inputs.arch", type: "str | None", default: "None", description: "Image architecture" },
              { param: "inputs.skip_optimization", type: "bool", default: "False", description: "Skip shrink and compression" },
              { param: "inputs.set_default", type: "bool", default: "False", description: "Set as default after import" },
            ],
          },
          {
            signature: "ImageOperation.remove(inputs: ImageInput, force: bool = False) -> None",
            description: "Remove an image from cache and database.",
            parameters: [
              { param: "force", type: "bool", default: "False", description: "Remove even if referenced by VMs" },
            ],
          },
          {
            signature: "ImageOperation.list_(remote: bool = False) -> list[ImageItem] | list[ImageSpec]",
            description: "List local cached images or available remote images.",
          },
          {
            signature: "ImageOperation.set_default(inputs: ImageInput) -> None",
            description: "Set an image as the default for new VMs.",
          },
          {
            signature: "ImageOperation.inspect(inputs: ImageInput, is_json: bool = False) -> ImageItem | dict",
            description: "Show detailed information about an image including compression stats and storage details.",
          },
          {
            signature: "ImageOperation.warm(inputs: ImageInput) -> list[Path]",
            description: "Pre-decompress image to tmpfs ready pool for fast VM creation.",
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
        description: "All methods are @staticmethod. Kernels are identified using KernelInput objects.",
        methods: [
          {
            signature: "KernelOperation.fetch(inputs: KernelFetchInput) -> KernelItem",
            description: "Fetch or build a Firecracker kernel. Requires --type (firecracker or official).",
            parameters: [
              { param: "inputs.kernel_type", type: "str", default: "—", description: "firecracker or official" },
              { param: "inputs.version", type: "str | None", default: "None", description: "Kernel version (default: 6.19.9 for official)" },
              { param: "inputs.arch", type: "str | None", default: "None", description: "Architecture" },
              { param: "inputs.set_default", type: "bool", default: "False", description: "Set as default after fetch" },
              { param: "inputs.jobs", type: "int | None", default: "None", description: "Parallel build jobs (official only)" },
              { param: "inputs.keep_build_dir", type: "bool", default: "False", description: "Keep build directory (official only)" },
              { param: "inputs.clean_build", type: "bool", default: "False", description: "Skip build cache (official only)" },
              { param: "inputs.kernel_config", type: "Path | None", default: "None", description: "Custom kernel config fragment" },
            ],
          },
          {
            signature: "KernelOperation.remove(inputs: KernelInput, force: bool = False) -> None",
            description: "Remove a kernel from cache and database.",
          },
          {
            signature: "KernelOperation.list_all() -> list[KernelItem]",
            description: "List all kernels, syncing is_present with the filesystem.",
          },
          {
            signature: "KernelOperation.get(inputs: KernelInput) -> KernelItem",
            description: "Get a single kernel by ID or name.",
          },
          {
            signature: "KernelOperation.set_default(inputs: KernelInput) -> None",
            description: "Set a kernel as the default for VM creation.",
          },
          {
            signature: "KernelOperation.ensure_default() -> KernelItem",
            description: "Ensure the default kernel exists and is available on disk.",
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
        description: "All methods are @staticmethod. Keys are identified using KeyInput objects.",
        methods: [
          {
            signature: "KeyOperation.create(inputs: KeyCreateInput) -> SSHKeyItem",
            description: "Generate a new SSH keypair via ssh-keygen and register it.",
            parameters: [
              { param: "inputs.name", type: "str", default: "—", description: "Key name and base filename" },
              { param: "inputs.algorithm", type: "str | None", default: "None", description: "Key algorithm: ed25519, rsa, or ecdsa" },
              { param: "inputs.set_default", type: "bool", default: "False", description: "Set as default after creation" },
            ],
          },
          {
            signature: "KeyOperation.add(name: str, pub_key_path: Path, overwrite: bool = False) -> SSHKeyItem",
            description: "Import an existing .pub file into the cache.",
            parameters: [
              { param: "name", type: "str", default: "—", description: "Name for the key" },
              { param: "pub_key_path", type: "Path", default: "—", description: "Path to .pub file" },
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
            signature: "KeyOperation.set_default(inputs: KeyInput) -> None",
            description: "Set one or more keys as defaults for new VMs.",
          },
          {
            signature: "KeyOperation.get_defaults() -> list[SSHKeyItem]",
            description: "Get all default keys.",
          },
          {
            signature: "KeyOperation.remove(inputs: KeyInput) -> None",
            description: "Remove a key from the cache.",
          },
          {
            signature: "KeyOperation.export(inputs: KeyInput, dest: Path | None = None) -> Path",
            description: "Export a key to ~/.ssh or a custom destination.",
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
        description: "All methods are @staticmethod. Binaries are identified using BinaryInput objects.",
        methods: [
          {
            signature: "BinaryOperation.fetch(inputs: BinaryFetchInput) -> BinaryOperation.FetchResult",
            description: "Download a specific Firecracker/jailer binary version from GitHub releases.",
            parameters: [
              { param: "inputs.version", type: "str", default: "—", description: "Semantic version string (e.g. 1.15.0)" },
              { param: "inputs.set_as_default", type: "bool", default: "False", description: "Set as default after download" },
              { param: "inputs.download_override", type: "bool", default: "True", description: "Re-download even if cached" },
            ],
          },
          {
            signature: "BinaryOperation.remove(inputs: BinaryInput, force: bool = False) -> None",
            description: "Remove binaries by identifier.",
          },
          {
            signature: "BinaryOperation.remove_by_version(version: str, force: bool = False) -> None",
            description: "Remove both firecracker and jailer by version string.",
          },
          {
            signature: "BinaryOperation.list_local() -> list[BinaryItem]",
            description: "List all locally installed binaries.",
          },
          {
            signature: "BinaryOperation.list_remote(limit: int | None = None) -> list[str]",
            description: "List available remote versions from GitHub.",
          },
          {
            signature: "BinaryOperation.get(inputs: BinaryInput) -> BinaryItem | None",
            description: "Get a binary by name and version.",
          },
          {
            signature: "BinaryOperation.set_default(inputs: BinaryInput) -> None",
            description: "Set a binary (by ID) as the active default.",
          },
          {
            signature: "BinaryOperation.ensure_default() -> BinaryItem | None",
            description: "Ensure a default Firecracker binary exists.",
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
            signature: "HostOperation.init(cache_dir: Path) -> list[HostStateChangeItem]",
            description:
              "Apply host configuration: enable IP forwarding, persist sysctl, load KVM modules, create the mvm unix group, configure sudoers, set up iptables chains, and ensure the default network. Fully idempotent.",
            returns: "List of HostStateChangeItem describing every change applied.",
            raises: "HostError, PrivilegeError",
          },
          {
            signature: "HostOperation.clean(cache_dir: Path) -> list[str]",
            description: "Remove all networking config (bridges, TAPs, iptables rules). Does not touch sysctl, sudoers, or group.",
          },
          {
            signature: "HostOperation.reset(cache_dir: Path) -> list[str]",
            description: "Full rollback to pre-init state: networking, sysctl, sudoers, and group removal.",
          },
          {
            signature: "HostOperation.check_kvm_access() -> bool",
            description: "Return True if /dev/kvm exists and is accessible by the current user.",
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
            signature: "HostOperation.get_state() -> HostStateItem | None",
            description: "Return the saved host state if one exists.",
          },
          {
            signature: "HostOperation.get_running_vms() -> list[VMInstanceItem]",
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
            signature: "CacheOperation.init_all() -> dict",
            description: "Initialize all cache directories and optionally build the libguestfs fixed appliance.",
          },
          {
            signature: "CacheOperation.prune_vms(dry_run: bool = False, include_all: bool = False) -> list[str]",
            description: "Prune VMs. By default prunes all except RUNNING/STARTING.",
          },
          {
            signature: "CacheOperation.prune_networks(dry_run: bool = False, include_all: bool = False) -> list[str]",
            description: "Prune unused networks.",
          },
          {
            signature: "CacheOperation.prune_images(dry_run: bool = False, include_all: bool = False) -> list[str]",
            description: "Prune unused images.",
          },
          {
            signature: "CacheOperation.prune_kernels(dry_run: bool = False, include_all: bool = False) -> list[str]",
            description: "Prune unused kernels.",
          },
          {
            signature: "CacheOperation.prune_binaries(dry_run: bool = False, include_all: bool = False) -> list[str]",
            description: "Prune unused binaries.",
          },
          {
            signature: "CacheOperation.prune_misc(dry_run: bool = False) -> dict",
            description: "Prune misc cache (libguestfs appliance, warm images).",
          },
          {
            signature: "CacheOperation.prune_all(dry_run: bool = False, include_all: bool = False) -> PruneAllResult",
            description: "Prune all cache resources in one call.",
          },
          {
            signature: "CacheOperation.clean(dry_run: bool = False) -> CleanResult",
            description: "Completely clean all cache — prune everything, clean host networking, remove cache directory.",
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
            signature: "SSHOperation.connect(inputs: SSHInput) -> int",
            description: "Open an interactive SSH session into a VM, or execute a command.",
            parameters: [
              { param: "inputs.vm_id", type: "str | None", default: "None", description: "VM identifier (name, ID, IP, MAC)" },
              { param: "inputs.name", type: "str | None", default: "None", description: "VM name" },
              { param: "inputs.user", type: "str | None", default: "None", description: "SSH user" },
              { param: "inputs.cmd", type: "str | None", default: "None", description: "Command to execute" },
              { param: "inputs.key", type: "Path | None", default: "None", description: "SSH private key path" },
              { param: "inputs.ip", type: "str | None", default: "None", description: "IP address (skips validation)" },
              { param: "inputs.mac", type: "str | None", default: "None", description: "VM MAC address" },
            ],
            returns: "Exit code from the SSH session.",
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
        description: "Methods for managing the VM serial console relay via vsock.",
        methods: [
          {
            signature: "ConsoleOperation.attach(vm_id: str) -> ConsoleAttachInfo",
            description: "Attach to a VM's serial console. Returns socket path for interactive connection.",
          },
          {
            signature: "ConsoleOperation.get_state(vm_id: str) -> dict",
            description: "Check the console relay state for a VM (running, PID, socket path).",
          },
          {
            signature: "ConsoleOperation.kill(vm_id: str) -> bool",
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
            signature: "LogOperation.stream(inputs: LogInput) -> Generator[str]",
            description: "Stream VM boot or OS logs. Supports line limits and follow mode.",
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
            signature: "ConfigOperation.get(category: str, key: str | None = None) -> Any",
            description: "Get a config value by category and optional key.",
          },
          {
            signature: "ConfigOperation.set(category: str, key: str, value: Any) -> None",
            description: "Set a config value persistently in config.json.",
          },
          {
            signature: "ConfigOperation.reset(category: str | None = None, key: str | None = None, all_overrides: bool = False) -> int",
            description: "Reset config override(s) to defaults.",
          },
          {
            signature: "ConfigOperation.list_all() -> dict",
            description: "List all overridable settings with their current values and types.",
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
            signature: "InitOperation.run(skip_host: bool = False, non_interactive: bool = False, sudo_completed: bool = False, download_version: str | None = None) -> InitResult",
            description: "Run the full init wizard: local state → host setup → cache init → binary fetch.",
            returns: "InitResult with step-by-step results.",
          },
          {
            signature: "InitOperation.init_database() -> None",
            description: "Initialize the local SQLite database (run migrations).",
          },
          {
            signature: "InitOperation.setup_host(cache_dir: Path) -> list[HostStateChangeItem]",
            description: "Set up host configuration. Delegates to HostOperation.init().",
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
      'Complete orchestration script: initialize database, set up host, fetch binary, create SSH key, ensure default network, create a VM, and list running instances.',
    code: {
      code: [
        "#!/usr/bin/env python3",
        '"""Orchestrate microVM lifecycle using the mvmctl Python API."""',
        "",
        "from pathlib import Path",
        "from mvmctl.api import (",
        "    BinaryOperation, BinaryFetchInput,",
        "    HostOperation,",
        "    InitOperation,",
        "    KeyOperation, KeyCreateInput,",
        "    NetworkOperation,",
        "    VMOperation, VMCreateInput,",
        ")",
        "from mvmctl.exceptions import MVMError",
        "from mvmctl.utils.common import CacheUtils",
        "",
        "CACHE_DIR = CacheUtils.get_cache_dir()",
        "",
        "",
        "def main() -> None:",
        "    # 1. Initialise the SQLite database",
        "    InitOperation.init_database()",
        '    print("Database ready.")',
        "",
        "    # 2. Initialise the host (idempotent)",
        "    changes = HostOperation.init(CACHE_DIR)",
        "    if changes:",
        "        for change in changes:",
        '            print(f"  Applied: {change.setting} = {change.applied_value}")',
        "    else:",
        '        print("Host already configured.")',
        "",
        "    # 3. Ensure a Firecracker binary is available",
        '    BinaryOperation.fetch(BinaryFetchInput(version="1.15.0"))',
        "",
        "    # 4. Create or register an SSH key",
        '    key = KeyOperation.create(',
        '        KeyCreateInput(name="my-api-key", set_default=True)',
        "    )",
        '    print(f"Created SSH key: {key.name} ({key.fingerprint})")',
        "",
        "    # 5. Ensure the default network exists",
        "    default_net = NetworkOperation.create_default_network()",
        '    print(f"Default network: {default_net.name} ({default_net.subnet})")',
        "",
        "    # 6. Create a VM using the API",
        "    VMOperation.create(",
        "        VMCreateInput(",
        '            name="my-api-vm",',
        '            ssh_keys=["my-api-key"],',
        "            vcpu_count=2,",
        "            mem_size_mib=2048,",
        '            image="ubuntu-24.04",',
        "        )",
        "    )",
        '    print("VM created.")',
        "",
        "    # 7. List all VMs",
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
