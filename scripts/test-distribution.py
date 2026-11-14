"""Exercise launchers with local downloads and a temporary install marker, never sudo."""

import json
import os
from pathlib import Path
import subprocess
import tempfile
import unittest


ROOT = Path(__file__).resolve().parents[1]


class DistributionTests(unittest.TestCase):
    def setUp(self):
        base = ROOT / ".tmp/distribution-tests"
        base.mkdir(parents=True, exist_ok=True)
        self.temporary = tempfile.TemporaryDirectory(dir=base)
        self.addCleanup(self.temporary.cleanup)
        self.work = Path(self.temporary.name)
        self.tools = self.work / "tools"
        self.tools.mkdir()
        self.downloads = self.work / "downloads"
        self.downloads.mkdir()
        self.marker = self.work / "installed"
        self.trace = self.work / "requests"
        self.env = dict(os.environ, PATH=f"{self.tools}:{os.environ['PATH']}",
                        TMPDIR=str(self.downloads), MARKER=str(self.marker), TRACE=str(self.trace),
                        PUBLIC=str(ROOT / "public"), REPORTED_VERSION="0.3.0")
        binary = self.work / "binary"
        binary.write_text('''#!/usr/bin/env bash
set -eu
case "$*" in
  --version) printf 'mvm %s\\n' "${REPORTED_VERSION}" ;;
  'host install-system') printf 'installed\\n' > "$MARKER" ;;
  *) exit 98 ;;
esac
''')
        self.env["FIXTURE_BINARY"] = str(binary)
        self.install_tool("id", '#!/bin/sh\nprintf "%s\\n" "${FAKE_UID:-1000}"\n')
        self.install_tool("uname", '#!/bin/sh\ncase "$1" in -s) echo Linux;; -m) echo "${FAKE_ARCH:-x86_64}";; esac\n')
        self.install_tool("sudo", '''#!/usr/bin/python3
import subprocess,sys
assert sys.argv[1]=="--"
raise SystemExit(subprocess.call(sys.argv[2:]))
''')
        self.install_tool("curl", '''#!/usr/bin/python3
import hashlib,os,pathlib,sys
args=sys.argv[1:]
url=next(value for value in args if value.startswith("https://"))
name=url.rsplit("/",1)[1]
with open(os.environ["TRACE"],"a") as stream: stream.write(url+"\\n")
if name==os.environ.get("FAIL_DOWNLOAD"): raise SystemExit(22)
if name in {"mvm","mvm-arm64"}: raw=pathlib.Path(os.environ["FIXTURE_BINARY"]).read_bytes()
elif name=="checksums.sha256":
    raw=pathlib.Path(os.environ["FIXTURE_BINARY"]).read_bytes()
    digest=hashlib.sha256(raw).hexdigest()
    if os.environ.get("BAD_CHECKSUM"): digest="0"*64
    raw=(digest+"  ./mvm\\n"+digest+"  ./mvm-arm64\\n").encode()
    if os.environ.get("DUPLICATE_CHECKSUM"): raw+=raw
elif name in {"uninstall.py","uninstall_files.py"}:
    raw=(pathlib.Path(os.environ["PUBLIC"])/"scripts/0.3.0"/name).read_bytes()
else: raise SystemExit(22)
if name==os.environ.get("CORRUPT_PAYLOAD"): raw=b"corrupted payload"
pathlib.Path(args[args.index("-o")+1]).write_bytes(raw)
''')

    def install_tool(self, name, content):
        path = self.tools / name
        path.write_text(content)
        path.chmod(0o755)

    def run_script(self, name, *args, success):
        result = subprocess.run(["bash", str(ROOT / "public" / name), *args],
                                env=self.env, capture_output=True, text=True, timeout=20)
        if success:
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        else:
            self.assertNotEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertEqual(list(self.downloads.iterdir()), [], "private downloads must be cleaned")
        return result

    def test_installer_verifies_each_architecture_before_install(self):
        for arch, asset in (("x86_64", "mvm"), ("aarch64", "mvm-arm64")):
            with self.subTest(arch=arch):
                self.env["FAKE_ARCH"] = arch
                self.run_script("install.sh", "--version", "v0.3.0", success=True)
                self.assertEqual(self.marker.read_text(), "installed\n")
                self.assertEqual(self.trace.read_text().splitlines()[-1],
                                 f"https://github.com/AlanD20/mvmctl/releases/download/v0.3.0/{asset}")
                self.marker.unlink()

    def test_bad_or_duplicate_checksum_preserves_existing_installation(self):
        self.marker.write_text("original")
        for variable in ("BAD_CHECKSUM", "DUPLICATE_CHECKSUM"):
            with self.subTest(variable=variable):
                self.env[variable] = "1"
                self.run_script("install.sh", success=False)
                self.assertEqual(self.marker.read_text(), "original")
                del self.env[variable]

    def test_missing_release_never_falls_back(self):
        self.env["FAIL_DOWNLOAD"] = "checksums.sha256"
        self.run_script("install.sh", success=False)
        self.assertEqual(self.trace.read_text().splitlines(), [
            "https://github.com/AlanD20/mvmctl/releases/download/v0.3.0/checksums.sha256"])
        self.assertFalse(self.marker.exists())

    def test_wrong_binary_version_is_not_installed(self):
        self.env["REPORTED_VERSION"] = "0.2.0"
        self.run_script("install.sh", success=False)
        self.assertFalse(self.marker.exists())

    def test_invalid_version_refuses_before_download(self):
        self.run_script("install.sh", "--version", "../../other", success=False)
        self.assertFalse(self.trace.exists())
        self.assertFalse(self.marker.exists())

    def mock_python(self):
        self.install_tool("python3", '''#!/usr/bin/python3
import json,os,pathlib,sys
if sys.argv[1]!="-c": pathlib.Path(os.environ["MARKER"]).write_text(json.dumps(sys.argv[1:]))
''')

    def test_uninstaller_checks_both_pins_then_forwards_preview_options(self):
        self.mock_python()
        self.run_script("uninstall.sh", "--dry-run", "--cache", "alice=/srv/cache", success=True)
        args = json.loads(self.marker.read_text())
        self.assertEqual(Path(args[0]).name, "uninstall.py")
        self.assertEqual(args[1:], ["--dry-run", "--cache", "alice=/srv/cache"])

    def test_modified_uninstaller_payload_never_reaches_python(self):
        self.mock_python()
        for name in ("uninstall.py", "uninstall_files.py"):
            with self.subTest(name=name):
                self.env["CORRUPT_PAYLOAD"] = name
                self.run_script("uninstall.sh", "--yes", success=False)
                self.assertFalse(self.marker.exists())

    def test_help_needs_no_download_or_privilege(self):
        for name in ("install.sh", "uninstall.sh"):
            self.run_script(name, "--help", success=True)
        self.assertFalse(self.trace.exists())
        self.assertFalse(self.marker.exists())


if __name__ == "__main__":
    unittest.main()
