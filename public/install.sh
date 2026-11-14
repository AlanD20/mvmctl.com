#!/usr/bin/env bash
# Download a checksum-verified release and use its administrator install command.
set -euo pipefail

version=0.3.0
usage() {
  cat <<'USAGE'
Usage: bash install.sh [--version VERSION]

Install the system binary at /usr/local/bin/mvm. Existing managed data is not
removed. Complete host and workspace setup separately after installation.
Defaults to 0.3.0; that release must be published before it can be downloaded.
USAGE
}
fail() { printf 'Install failed: %s\n' "$*" >&2; exit 1; }
while (($#)); do
  case "$1" in
    --version)
      (($# >= 2)) || fail '--version requires a value'
      version=${2#v}; shift 2 ;;
    -h|--help) usage; exit 0 ;;
    *) fail "unknown argument: $1" ;;
  esac
done
[[ "$version" =~ ^0\.3\.[0-9]+(-[0-9A-Za-z]+([.-][0-9A-Za-z]+)*)?$ ]] ||
  fail 'select an explicit 0.3.x release version'
for tool in curl sha256sum mktemp awk uname chmod id; do
  command -v "$tool" >/dev/null || fail "required command is missing: $tool"
done
[[ $(uname -s) == Linux ]] || fail 'mvmctl requires Linux and KVM'
case "$(uname -m)" in
  x86_64|amd64) artifact=mvm ;;
  aarch64|arm64) artifact=mvm-arm64 ;;
  *) fail "unsupported architecture: $(uname -m)" ;;
esac
if [[ $(id -u) != 0 ]]; then
  command -v sudo >/dev/null || fail 'administrator installation requires sudo'
fi

workdir=$(mktemp -d "${TMPDIR:-/tmp}/mvmctl-install.XXXXXXXX")
cleanup() {
  rm -f -- "$workdir/$artifact" "$workdir/checksums.sha256"
  rmdir -- "$workdir" || printf 'Temporary directory retained: %s\n' "$workdir" >&2
}
trap cleanup EXIT
base="https://github.com/AlanD20/mvmctl/releases/download/v$version"
printf 'Downloading mvmctl %s (%s)\n' "$version" "$artifact"
curl --proto '=https' --proto-redir '=https' --tlsv1.2 --connect-timeout 15 --max-time 600 --fail --location --silent --show-error \
  "$base/checksums.sha256" -o "$workdir/checksums.sha256" ||
  fail "release v$version or its checksums are unavailable; no fallback version was installed"
digest=$(awk -v wanted="$artifact" 'NF == 2 { name=$2; sub(/^\.\//,"",name); if (name==wanted) print $1 }' \
  "$workdir/checksums.sha256")
[[ "$digest" =~ ^[0-9a-f]{64}$ ]] || fail "missing or ambiguous checksum for $artifact"
curl --proto '=https' --proto-redir '=https' --tlsv1.2 --connect-timeout 15 --max-time 600 --fail --location --silent --show-error \
  "$base/$artifact" -o "$workdir/$artifact"
(cd "$workdir"; printf '%s  %s\n' "$digest" "$artifact" | sha256sum --check --strict -)
chmod 0755 "$workdir/$artifact"
reported=$("$workdir/$artifact" --version)
[[ "$reported" == "mvm $version" ]] || fail "downloaded binary reports an unexpected version: $reported"
if [[ $(id -u) == 0 ]]; then
  "$workdir/$artifact" host install-system
else
  sudo -- "$workdir/$artifact" host install-system
fi
printf '\nInstalled /usr/local/bin/mvm. Next: https://mvmctl.aland20.com/docs/#host-initialize\n'
printf 'Run host init as your operator through sudo; direct-root setup needs --operator USER.\n'
