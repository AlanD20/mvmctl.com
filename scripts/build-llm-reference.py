#!/usr/bin/env python3
"""Refresh the public references from their pinned mvmctl Git revisions."""

import argparse
import hashlib
from pathlib import Path, PurePosixPath
import posixpath
import re
import subprocess


SOURCE = "a402f6d6f00414b90f5fe7f6c86a52a44c095b0e"
REPOSITORY = "https://github.com/AlanD20/mvmctl"
SITE = Path(__file__).resolve().parents[1]
VERSION = "0.3"
ARCHIVE_SOURCE = "eff98faf289585bf6d4ba2dba6f425490a61b7b0"
ARCHIVE_MANUALS = {
    "docs/REFERENCES.md": "commands.md",
    "docs/ENV_SPEC_REFERENCE.md": "environment.md",
}

INTRO = """# mvmctl 0.3 — full command and environment reference

> mvmctl manages Firecracker microVMs on Linux with KVM. This reference covers the
> 0.3 prerelease. The environment blueprint schema version is `"1"`.

## Using this reference

- Check the installed build with `mvm version`, and use `mvm help <command>` for
  its command-specific usage. For 0.3 VM launch, select the exact matching
  Firecracker/Jailer 1.17.0 pair. The 0.3 installation requires fresh managed state.
- Ordinary operator commands run unprivileged after administrator installation
  and host initialization. Inspect the selected resources before changing them.
  Obtain operator authorization before destructive actions or changes to host
  setup, access policies, and persistent storage.
- For automation, use `--json` on supported finite commands and inspect the
  exit status, response `status`, and per-item errors. A partial result can
  include completed work. Inspect that work before retrying.
- For blueprints, start with `version: "1"` and use named YAML maps for steps.
  Give each reference a direct or transitive `depends_on` path. Review
  `mvm env diff <spec>` against saved workflow state before reapplying, and
  make command and copy steps safe to rerun. Review volume retention before
  destroy. Keep credentials and private keys out of shared specs and prompts.
- Use separate, narrowly scoped grants for service traffic, VM-to-VM execution,
  and floating-IP guest methods. Ask for the exact endpoints and permissions
  before generating grant commands.

## Public documentation

- [0.3 quickstart](https://mvmctl.aland20.com/docs/0.3/)
- [Command guide](https://mvmctl.aland20.com/docs/0.3/reference/)
- [Environment blueprint guide](https://mvmctl.aland20.com/docs/0.3/env-spec/)
- [Networking](https://mvmctl.aland20.com/docs/0.3/networking/)
- [Policies](https://mvmctl.aland20.com/docs/0.3/policies/)
- [Guest Control](https://mvmctl.aland20.com/docs/0.3/guest-control/)
- [Kubernetes HA blueprint example]({repository}/tree/{source}/examples/workflows/simple-k8s-cluster-ha)
- [GitHub releases](https://github.com/AlanD20/mvmctl/releases)
- [Versioned text](https://mvmctl.aland20.com/docs/0.3/llm.txt)
- [SHA-256 checksum](https://mvmctl.aland20.com/docs/0.3/llm.txt.sha256)
"""

UTILITY_COMMANDS = """### General commands

| Command | Description |
|---------|-------------|
| `mvm`, `mvm --help` | Show root help. `--help` and `-h` also work on individual commands. |
| `mvm help [COMMAND...]` | Show help for a command path. An unknown topic exits with an error. |
| `mvm version` | Show the version and build or tag information when available. Supports `--json`. |
| `mvm --version` | Show the version through the root version flag. Supports `--json`. |
| `mvm completion bash`, `mvm completion zsh`, `mvm completion fish` | Write shell completion to standard output. |

The `mvm run` command group is reserved for internal service subprocesses.
Operate console and cloud-init through their documented operator commands and flags.

"""


def pinned_markdown(repo, name):
    source = subprocess.check_output(["git", "-C", str(repo), "show", f"{SOURCE}:{name}"])

    def resolve_link(match):
        target, separator, fragment = match[1].partition("#")
        if not target or ":" in target:
            return match[0]
        if target == "ENV_SPEC_REFERENCE.md":
            return "](#environment-spec-reference)"
        path = posixpath.normpath(str(PurePosixPath(name).parent / target))
        return f"]({REPOSITORY}/blob/{SOURCE}/{path}{separator}{fragment})"

    return re.sub(r"\]\(([^\s)]+)\)", resolve_link, source.decode("utf-8"))


def render(repo):
    commands_name = "docs/REFERENCES.md"
    blueprints_name = "docs/ENV_SPEC_REFERENCE.md"
    commands = pinned_markdown(repo, commands_name)
    commands = commands.replace("- [Selectors](#selectors)", "- [General commands](#general-commands)\n- [Selectors](#selectors)", 1)
    commands = commands.replace("- [mvm env](#mvm-env)", "- [mvm self-update](#mvm-self-update)\n- [mvm env](#mvm-env)", 1)
    commands = commands.replace("### Selectors\n", UTILITY_COMMANDS + "### Selectors\n", 1)
    commands = commands.replace(
        "Read results now live under\n`data`, so scripts consuming the old bare list or object must be updated.",
        "Read results live under `data`.",
    )
    commands = commands.replace(
        "an interrupted initial global transaction must first be recovered by its original operator. Existing transitional\n"
        "wildcard sudo grants cannot establish administrator authentication: that sudo entry\n"
        "refuses them and directs the administrator to direct root with an explicit operator. Init does not install the binary.",
        "an interrupted initial global transaction must first be recovered by its original operator. The administrator\n"
        "installs the binary separately with `mvm host install-system`.",
        1,
    ).replace(
        "operator enrollment complete. Old schema-1 administrator journals require a clean installation; they are not adopted.",
        "operator enrollment complete. v0.3.0 requires a clean installation and fresh managed state.",
        1,
    ).replace(
        "older wildcard and raw-tool policies. No host policy activation or runtime qualification was performed in this pass.",
        "wildcard and raw-tool policies.",
        1,
    )

    blueprints = pinned_markdown(repo, blueprints_name)
    blueprints = blueprints.replace(
        "Create a virtual machine. Set initial labels with `labels: {cluster: demo, role: worker}`.",
        "Create a virtual machine. The `labels` map sets initial labels, as shown below.",
        1,
    ).replace(
        '  dev-vm:\n    network: "@network:default"\n    key: "@key:main-key"\n    image: "@image:os-image"\n    kernel:',
        '  dev-vm:\n    labels:\n      cluster: demo\n      role: worker\n    network: "@network:default"\n'
        '    key: "@key:main-key"\n    image: "@image:os-image"\n    kernel:',
        1,
    )

    provenance = (
        f"\nSource revision `{SOURCE}`. Includes the pinned "
        f"[command manual]({REPOSITORY}/blob/{SOURCE}/{commands_name}) and "
        f"[environment manual]({REPOSITORY}/blob/{SOURCE}/{blueprints_name}).\n"
    )
    intro = INTRO.format(repository=REPOSITORY, source=SOURCE)
    return (intro + provenance + "\n---\n\n" + commands.rstrip() + "\n\n---\n\n" + blueprints).encode("utf-8")


ARCHIVE_UTILITY_COMMANDS = b"""### General commands

| Command | Description |
|---------|-------------|
| `mvm`, `mvm --help` | Show root help. |
| `mvm help [COMMAND...]` | Show help for a command path. |
| `mvm version`, `mvm --version` | Show the installed version. |
| `mvm completion bash`, `mvm completion zsh`, `mvm completion fish` | Write shell completion to standard output. |

"""


def archived_manuals(repo):
    archive = SITE / "src" / "content" / "reference" / "0.2"
    for source, filename in ARCHIVE_MANUALS.items():
        manual = subprocess.check_output(["git", "-C", str(repo), "show", f"{ARCHIVE_SOURCE}:{source}"])
        if filename == "commands.md":
            manual = manual.replace(b"](#mvm-snapshot)", b"](#mvm-snapshot-alias-ss)")
            manual = manual.replace(b"](ENV_SPEC_REFERENCE.md)", b"](/docs/0.2/env-spec/)")
            manual = manual.replace(b"### Selectors\n", ARCHIVE_UTILITY_COMMANDS + b"### Selectors\n", 1)
            manual = manual.replace(b"- [Selectors](#selectors)", b"- [General commands](#general-commands)\n- [Selectors](#selectors)", 1)
            manual = manual.replace(b"- [mvm env](#mvm-env)", b"- [mvm self-update](#mvm-self-update)\n- [mvm env](#mvm-env)", 1)
        yield archive / filename, manual


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("mvmctl_checkout", type=Path, help="path to a Git checkout containing both pinned revisions")
    parser.add_argument("--check", action="store_true", help="verify the committed reference and checksum")
    args = parser.parse_args()

    reference = render(args.mvmctl_checkout)
    checksum = f"{hashlib.sha256(reference).hexdigest()}  llm.txt\n".encode("ascii")
    outputs = {
        SITE / "src" / "content" / "reference" / VERSION / "llm.txt": reference,
        SITE / "public" / "docs" / VERSION / "llm.txt.sha256": checksum,
        **dict(archived_manuals(args.mvmctl_checkout)),
    }
    for path, content in outputs.items():
        if args.check:
            if path.read_bytes() != content:
                parser.exit(1, f"{path.relative_to(SITE)} differs from the pinned source\n")
        else:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(content)


if __name__ == "__main__":
    main()
