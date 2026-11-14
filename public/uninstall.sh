#!/usr/bin/env bash
# Fetch the reviewed 0.3.0 administrator uninstaller with pinned content hashes.
set -euo pipefail

if [[ ${1:-} == --help || ${1:-} == -h ]]; then
  cat <<'USAGE'
Usage: bash uninstall.sh [--dry-run] [--yes] [--cache USER=PATH] [--config USER=PATH]

Requires Linux, Python 3.10+, and administrator access. Removes an initialized
0.3.0 installation and all enrolled operators' managed data. External mirrors,
original external SSH files and shared packages are preserved.

Preview with --dry-run. Without --yes, type UNINSTALL MVMCTL to confirm removal.
USAGE
  exit 0
fi
for tool in curl sha256sum mktemp python3 id; do
  command -v "$tool" >/dev/null || { printf 'Missing command: %s\n' "$tool" >&2; exit 1; }
done
python3 -c 'import sys; sys.exit(0 if sys.version_info >= (3, 10) else "Python 3.10+ is required")'
if [[ $(id -u) != 0 ]]; then
  command -v sudo >/dev/null || { printf 'Administrator access requires sudo\n' >&2; exit 1; }
fi
workdir=$(mktemp -d "${TMPDIR:-/tmp}/mvmctl-uninstall.XXXXXXXX")
cleanup() {
  rm -f -- "$workdir/uninstall.py" "$workdir/uninstall_files.py"
  rmdir -- "$workdir" || printf 'Temporary directory retained: %s\n' "$workdir" >&2
}
trap cleanup EXIT
base=https://mvmctl.aland20.com/scripts/0.3.0
for name in uninstall.py uninstall_files.py; do
  curl --proto '=https' --proto-redir '=https' --tlsv1.2 --connect-timeout 15 --max-time 120 --fail --location --silent --show-error \
    "$base/$name" -o "$workdir/$name"
done
(cd "$workdir"; sha256sum --check --strict <<'CHECKSUMS'
180b2fc5fb09c2f05d05916f51259329a893ff272170455314eb2c61c38de840  uninstall.py
d1b8de49891a0873b005dc5983dc8b35698ea9afbd4baa66adf16a54f11ba4f6  uninstall_files.py
CHECKSUMS
)
command=(python3 "$workdir/uninstall.py" "$@")
if [[ $(id -u) != 0 ]]; then
  command=(sudo -- "${command[@]}")
fi
needs_confirmation=true
for arg in "$@"; do
  case "$arg" in --yes|--dry-run) needs_confirmation=false ;; esac
done
if [[ ! -t 0 && "$needs_confirmation" == true ]]; then
  # Piping the launcher occupies stdin; read confirmation from the user's terminal.
  if ! { : </dev/tty; } 2>/dev/null; then
    printf 'Interactive uninstall requires a terminal; use --dry-run or explicitly pass --yes.\n' >&2
    exit 1
  fi
  "${command[@]}" </dev/tty
else
  "${command[@]}"
fi
