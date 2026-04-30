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
        "from mvmctl.api import VMOperation  # ✅ CORRECT",
        "from mvmctl.api.vm_operations import VMOperation  # ❌ WRONG — internal module",
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
      ["VMOperation", "VM lifecycle: create, remove, list, inspect, start/stop, pause/resume, reboot, snapshot, export"],
      ["NetworkOperation", "Network management: create, remove, list, inspect, IP allocation/release, reconcile, restore"],
      ["ImageOperation", "Image operations: fetch, import, list, set default, remove, inspect, warm"],
      ["KernelOperation", "Kernel operations: fetch, list, get, set default, remove, ensure default"],
      ["KeyOperation", "SSH key registry: add, create, list, get, remove, set defaults, export"],
      ["BinaryOperation", "Binary management: fetch, list local/remote, set active, remove, ensure default"],
      ["HostOperation", "Host init/reset/clean/prune, privilege checks, KVM access"],
      ["CacheOperation", "Cache lifecycle: init, prune per-asset-type, prune all"],
      ["SSHOperation", "SSH connection"],
      ["InitOperation", "Onboarding/init wizard API"],
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
          { field: "vcpu_count", type: "int", description: "Number of vCPUs" },
          { field: "mem_size_mib", type: "int", description: "Memory in MiB" },
          { field: "created_at", type: "str", description: "ISO 8601 creation timestamp" },
          { field: "updated_at", type: "str", description: "ISO 8601 update timestamp" },
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
          { field: "created_at", type: "str", description: "ISO 8601 creation timestamp" },
        ],
      },
      {
        title: "ImageItem",
        name: "ImageItem",
        fields: [
          { field: "id", type: "str", description: "Image ID (hash)" },
          { field: "os_slug", type: "str", description: "OS slug identifier" },
          { field: "os_name", type: "str", description: "Human-readable OS name" },
          { field: "arch", type: "str", description: "Architecture" },
          { field: "path", type: "str", description: "Relative path to image file" },
          { field: "fs_type", type: "str", description: "Filesystem type" },
          { field: "is_default", type: "bool", description: "Whether this is the default image" },
          { field: "is_present", type: "bool", description: "Whether the file exists on disk" },
          { field: "created_at", type: "str", description: "ISO 8601 creation timestamp" },
        ],
      },
      {
        title: "KernelItem",
        name: "KernelItem",
        fields: [
          { field: "id", type: "str", description: "Kernel ID (hash)" },
          { field: "name", type: "str", description: "Full filename" },
          { field: "version", type: "str", description: "Kernel version string" },
          { field: "arch", type: "str", description: "Architecture" },
          { field: "type", type: "str", description: "Kernel type (firecracker or official)" },
          { field: "path", type: "str", description: "Relative path to kernel file" },
          { field: "is_default", type: "bool", description: "Whether this is the default kernel" },
          { field: "created_at", type: "str", description: "ISO 8601 creation timestamp" },
        ],
      },
      {
        title: "BinaryItem",
        name: "BinaryItem",
        fields: [
          { field: "id", type: "str", description: "Binary ID (hash)" },
          { field: "name", type: "str", description: "Binary name (firecracker or jailer)" },
          { field: "version", type: "str", description: "Semantic version string" },
          { field: "path", type: "str", description: "Relative path to binary file" },
          { field: "is_default", type: "bool", description: "Whether this is the active binary" },
          { field: "is_present", type: "bool", description: "Whether the file exists on disk" },
          { field: "created_at", type: "str", description: "ISO 8601 creation timestamp" },
        ],
      },
      {
        title: "SSHKeyItem",
        name: "SSHKeyItem",
        fields: [
          { field: "id", type: "str", description: "Key ID (hash)" },
          { field: "name", type: "str", description: "Key name (used in --ssh-key)" },
          { field: "fingerprint", type: "str", description: "SHA256 fingerprint" },
          { field: "algorithm", type: "str", description: "Key algorithm" },
          { field: "public_key_path", type: "str", description: "Path to .pub file" },
          { field: "is_default", type: "bool", description: "Whether this is a default key" },
          { field: "created_at", type: "str", description: "ISO 8601 creation timestamp" },
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
      "├── VMNotFoundError",
      "├── NetworkNotFoundError",
      "├── ImageNotFoundError",
      "├── KernelNotFoundError",
      "├── BinaryNotFoundError",
      "├── KeyNotFoundError",
      "├── NetworkError",
      "├── ImageError",
      "│   ├── ImageCompressionError",
      "│   ├── ImageCorruptError",
      "│   └── ChecksumMismatchError",
      "├── KernelError",
      "├── FirecrackerClientError",
      "│   └── SocketNotFoundError",
      "├── FirecrackerSpawnError",
      "├── HostError",
      "│   └── PrivilegeError",
      "├── ConsoleError",
      "├── SSHError",
      "├── DatabaseError",
      "│   └── MigrationError",
      "├── ConfigError",
      "├── VMCreateError",
      "├── VMRequestError",
      "├── CloudInitError",
      "├── GuestfsNotAvailableError",
      "└── DownloadError",
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
              { param: "inputs.ssh_keys", type: "list[str]", default: "—", description: "SSH key names to inject (required)" },
              { param: "inputs.vcpu_count", type: "int | None", default: "None", description: "Number of vCPUs" },
              { param: "inputs.mem_size_mib", type: "int | None", default: "None", description: "Memory in MiB" },
              { param: "inputs.image", type: "str | None", default: "None", description: "Image name/ID (DB-backed default)" },
              { param: "inputs.network_name", type: "str | None", default: "None", description: "Network name" },
              { param: "inputs.cloud_init_mode", type: "str | None", default: "None", description: "inject, iso, net, or off" },
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
              { param: "inputs.name", type: "list[str]", default: "[]", description: "VM names to remove" },
              { param: "inputs.id", type: "list[str]", default: "[]", description: "VM IDs to remove" },
              { param: "inputs.force", type: "bool | None", default: "None", description: "Skip graceful shutdown" },
            ],
          },
          {
            signature: "VMOperation.list_all() -> list[VMInstanceItem]",
            description: "Return all registered VMs.",
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
              { param: "inputs.force", type: "bool | None", default: "None", description: "Skip graceful shutdown" },
            ],
          },
          {
            signature: "VMOperation.snapshot(inputs: VMInput) -> None",
            description: "Create a snapshot of a single VM's memory and state.",
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
            signature: "NetworkOperation.create(inputs: NetworkCreateInput) -> NetworkCreateResult",
            description:
              "Create a named bridge network: sets up the bridge device, assigns the gateway IP, optionally configures NAT rules.",
            parameters: [
              { param: "inputs.name", type: "str", default: "—", description: "Network name (must be unique)" },
              { param: "inputs.subnet", type: "str", default: "—", description: "Subnet in CIDR notation" },
              { param: "inputs.nat_enabled", type: "bool", default: "True", description: "Configure NAT/masquerade" },
            ],
            returns: "NetworkCreateResult wrapping the created NetworkItem",
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
            signature: "ImageOperation.fetch(inputs: ImageFetchInput) -> ImageAcquireResult",
            description: "Download and convert a VM rootfs image (qcow2, tar, or raw) to an ext4 file, then register it in the database.",
            parameters: [
              { param: "inputs.os_slug", type: "str", default: "—", description: "OS slug (e.g. ubuntu-24.04)" },
              { param: "inputs.force", type: "bool", default: "False", description: "Re-download even if cached" },
            ],
          },
          {
            signature: "ImageOperation.import_(inputs: ImageImportInput) -> ImageAcquireResult",
            description: "Import an existing local image file and register it in the database.",
          },
          {
            signature: "ImageOperation.remove(inputs: ImageInput, force: bool = False) -> None",
            description: "Remove an image from cache and database.",
          },
          {
            signature: "ImageOperation.list_(remote: bool = False) -> list[ImageItem] | list[ImageSpec]",
            description: "List local or remote images.",
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
            description: "Fetch or build a Firecracker kernel.",
            parameters: [
              { param: "inputs.kernel_type", type: "str", default: "—", description: "firecracker or official" },
              { param: "inputs.version", type: "str | None", default: "None", description: "Kernel version" },
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
              { param: "inputs.algorithm", type: "str | None", default: "None", description: "ed25519, rsa, or ecdsa" },
            ],
          },
          {
            signature: "KeyOperation.add(name: str, pub_key_path: Path, overwrite: bool = False) -> SSHKeyItem",
            description: "Import an existing .pub file into the cache.",
          },
          {
            signature: "KeyOperation.list_all() -> list[SSHKeyItem]",
            description: "List all keys in the cache.",
          },
          {
            signature: "KeyOperation.set_default(inputs: KeyInput) -> None",
            description: "Set one or more keys as defaults for new VMs.",
          },
          {
            signature: "KeyOperation.get_defaults() -> list[SSHKeyItem]",
            description: "Get all default keys.",
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
            signature: "BinaryOperation.fetch(inputs: BinaryFetchInput) -> BinaryFetchResult",
            description: "Download a specific Firecracker binary version from GitHub releases.",
            parameters: [
              { param: "inputs.version", type: "str", default: "—", description: "Semantic version string" },
              { param: "inputs.set_as_default", type: "bool", default: "False", description: "Set as default after download" },
            ],
          },
          {
            signature: "BinaryOperation.remove(inputs: BinaryInput, force: bool = False) -> None",
            description: "Remove binaries by identifier.",
          },
          {
            signature: "BinaryOperation.list_local() -> list[BinaryItem]",
            description: "List all locally installed binaries.",
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
            signature: "HostOperation.check_kvm_access() -> bool",
            description: "Return True if /dev/kvm exists and is accessible by the current user.",
          },
          {
            signature: "HostOperation.check_required_binaries() -> list[str]",
            description: "Return a list of missing required binary names.",
          },
          {
            signature: "HostOperation.reset(cache_dir: Path) -> list[str]",
            description: "Full rollback to pre-init state: networking, sysctl, sudoers, and group removal.",
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
            signature: "CacheOperation.prune_all(dry_run: bool = False, include_all: bool = False) -> dict",
            description: "Prune all cache resources in one call.",
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
              { param: "inputs.name", type: "str | None", default: "None", description: "VM name" },
              { param: "inputs.user", type: "str | None", default: "None", description: "SSH user" },
              { param: "inputs.cmd", type: "str | None", default: "None", description: "Command to execute" },
            ],
            returns: "Exit code from the SSH session.",
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
            signature: "InitOperation.init_database() -> None",
            description: "Initialize the local SQLite database (run migrations).",
          },
          {
            signature: "InitOperation.setup_host(cache_dir: Path) -> list[HostStateChangeItem]",
            description: "Set up host configuration. Delegates to HostOperation.init().",
          },
          {
            signature: "InitOperation.run_wizard() -> InitResult",
            description: "Run the full init wizard: local state -> host setup -> cache init -> binary fetch.",
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
