# Security Policy

## Supported Versions

| Version         | Supported             |
| --------------- | --------------------- |
| Latest (`main`) | ✅                    |
| Older releases  | ❌ — update to latest |

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Report vulnerabilities privately via one of these channels:

1. **GitHub Security Advisory** — use the "Report a vulnerability" button in the Security tab of this repository (preferred).
2. **Email** — send details to the maintainers listed in `package.json` or `CONTRIBUTING.md`.

### What to include

- Description of the vulnerability and its potential impact.
- Steps to reproduce.
- Affected version(s).
- Any suggested fix or mitigation (optional but appreciated).

### Response timeline

- **Acknowledgement**: within 72 hours.
- **Initial assessment**: within 7 days.
- **Fix / advisory**: as soon as reasonably possible, typically within 30 days for critical issues.

## Scope

### In scope

- Vulnerabilities in TransCoda application code (`src-tauri/`, `src/`).
- IPC security issues (Tauri commands, window settings, custom protocols).
- Dynamic theme script injection vulnerabilities.
- Path traversal or command injection in FFmpeg/FFprobe argument construction.

### Out of scope

- Vulnerabilities in third-party tools (local FFmpeg/FFprobe binaries) — report these directly to their respective projects.
- Issues that require physical access to the target machine.
- Social engineering.

## Security Model

TransCoda runs using Tauri's secure Command bridge. The renderer (React UI) has no raw access to the shell or file system — all system operations, hardware detection, and FFmpeg invocations run on the Rust side behind strict type-safe APIs.
