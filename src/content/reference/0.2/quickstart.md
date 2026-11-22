# mvmctl 0.2 quickstart

This guide covers the v0.2.0 release. Use it with an installed 0.2 binary and its host setup.

## Before you begin

Use Linux with access to `/dev/kvm`. Install the [host dependencies for your distribution](https://github.com/AlanD20/mvmctl/blob/v0.2.0/docs/DEPENDENCIES.md).

## Install mvm

Choose the binary for your architecture from the [v0.2.0 release](https://github.com/AlanD20/mvmctl/releases/tag/v0.2.0), install it as `mvm` on your PATH, and check its version.

```bash
mvm --version
```

## Initialize the host

Run the setup wizard. It can request administrator access for host setup and guide you through installing the Firecracker binary, a kernel, an image, and an SSH key. If it adds your user to a group, sign out and back in before continuing.

```bash
mvm init
```

## Create your first VM

Pull a kernel and image if you skipped them during setup, then create a VM and connect through the guest agent.

```bash
mvm kernel pull --type firecracker --default
mvm image pull ubuntu:24.04 --default
mvm vm create myvm --image ubuntu:24.04 --vcpu 2 --mem 2G --disk-size 20G
mvm exec myvm
```

When you are finished, `mvm vm rm myvm` removes the VM.

## References

- [Command reference](/docs/0.2/reference/)
- [Environment blueprint reference](/docs/0.2/env-spec/)
- [Full plain-text reference](/docs/0.2/llm.txt)
- [Troubleshooting](https://github.com/AlanD20/mvmctl/blob/v0.2.0/docs/TROUBLESHOOTING.md)
