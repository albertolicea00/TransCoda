# TransCoda

<div align="center">

![Tauri](https://img.shields.io/badge/Tauri-v2-0F97EC?logo=tauri&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-workspace-F69220?logo=pnpm&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey)

**[⏬ Downloads](#️-download) · [🤝 Contributing](CONTRIBUTING.md) · [🐛 Report a Bug](https://github.com/albertolicea00/TransCoda/issues/new?template=bug_report.yml) · [💡 Request a Feature](https://github.com/albertolicea00/TransCoda/issues/new?template=feature_request.yml)**

</div>

---

**TransCoda** is a modern, open-source, cross-platform desktop app for transcoding video and audio files dynamically with a fabulous, queer-coded branding. Built on **Tauri v2 + React 19 + Vite 6** with a high-performance **Rust** backend, TransCoda wraps the raw power of FFmpeg in a lightweight, resource-efficient package. Every encode leverages native system speed with hardware-accelerated profiles.

---

## ✨ Features

|                               |                                                                                                                              |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 💅 **Fabulous design themes** | Switch visual modes (Minimalist Dark, Rainbow, Drag), override accent colors, and adjust glass transparency and text scale   |
| ⚡ **GPU Turbo-Mode**         | Auto-detection and automatic configuration of hardware encoders (NVIDIA NVENC, Apple VideoToolbox, Intel QuickSync, AMD AMF) |
| ✂\_**Precision trimming**     | Clip your videos with a responsive, frame-accurate timeline range selector                                                   |
| 📁 **Batch SCAN & Queueing**  | Scan folders, queue multiple files, and monitor live speeds, ETA, and progress indicators                                    |
| ⚙️ **Advanced Engine Config** | Swap video engines (AV1, H.265, H.264), select CRF (Quality) vs ABR (Bitrate), and adjust custom bitrates                    |
| 🪐 **Cloud integration**      | Auto-upload transcoded files directly to Google Drive and Microsoft OneDrive                                                 |
| 🎨 **OS-Native presets**      | Includes custom swatches and window chrome mappings matching macOS, Windows 11, Windows 10, and Ubuntu Yaru                  |
| 🎭 **Closet Easter Egg**      | Canvas confetti triggers and comical progress status logs (_"Your file just came out of the closet 🌈"_) on success          |

---

## ⚙️ Supported Profiles & Formats

TransCoda works with these presets and formats out of the box:

| Category               | Supported Options                                                      |
| ---------------------- | ---------------------------------------------------------------------- |
| 📱 **Device Presets**  | YouTube, Instagram Reels, TikTok, Apple TV, and Universal profiles     |
| 📦 **Containers**      | Output to `.MP4`, `.MKV`, and `.WebM` configurations                   |
| 🎥 **Video Encoders**  | AV1, H.265/HEVC, H.264, MPEG-4, MPEG-2, VP8, and VP9                   |
| 🎵 **Audio Encoders**  | AAC / HE-AAC, MP3, FLAC, AC3, E-AC3, Opus, and Vorbis                  |
| 🔗 **Audio Pass-thru** | AC-3, E-AC3, FLAC, DTS, DTS-HD, TrueHD, AAC, Opus, MP3, and MP2 tracks |

→ Detailed compilation flags and advanced parameters: **[PLAN.md](PLAN.md)**

---

## ⬇️ Download

<div style="border-left: 4px solid #f39c12; padding: 8px 12px;">
<strong>⚠️ Beta Notice:</strong>
The current version is still in beta.<br>
Package manager distributions will be published once they are ready.<br>
Please avoid using <b>brew</b>, <b>choco</b>, <b>winget</b> or <b>snap</b> for now.
</div>

### 🍎 macOS

```bash
# Homebrew (recommended)
brew install --cask transcoda
```

or **[⬇️ Download the latest release](https://github.com/albertolicea00/TransCoda/releases/latest)** — then grab:

- `TransCoda-<version>-arm64.dmg` — Apple Silicon (M1/M2/M3/M4)
- `TransCoda-<version>.dmg` — Intel

> Requires macOS 11 (Big Sur) or later. Apple Silicon and Intel supported.

---

### 🪟 Windows

```powershell
# winget
winget install albertolicea00.TransCoda

# Chocolatey
choco install transcoda
```

or **[⬇️ Download the latest release](https://github.com/albertolicea00/TransCoda/releases/latest)** — then grab:

- `TransCoda-Setup-<version>.exe` — installer
- `TransCoda-<version>-win.zip` — portable

> Requires Windows 10 or later (64-bit).

---

### 🐧 Linux

```bash
# Snap
snap install transcoda

# AUR (Arch Linux)
yay -S transcoda

# wget — AppImage (no install needed)
wget https://github.com/albertolicea00/TransCoda/releases/latest/download/TransCoda-linux.AppImage
chmod +x TransCoda-linux.AppImage
./TransCoda-linux.AppImage
```

or **[⬇️ Download the latest release](https://github.com/albertolicea00/TransCoda/releases/latest)** — then grab:

- `TransCoda-<version>.AppImage` — portable (chmod +x, then run)
- `transcoda_<version>_amd64.deb` — Debian/Ubuntu

> Tested on Ubuntu 22.04+, Fedora 38+, Arch Linux.

---

📋 [All releases & changelogs](https://github.com/albertolicea00/TransCoda/releases) · 🔧 [Build from source → CONTRIBUTING.md](CONTRIBUTING.md)

---

## 🛠️ Desktop Development Setup

To run and develop TransCoda locally as a desktop application, follow these steps:

### 1. Install Tauri CLI

Install the Tauri CLI tool globally using Cargo (Rust's package manager):

```bash
cargo install tauri-cli
```

### 2. Configure package.json

Verify that the `tauri` development script is configured in `package.json`:

```json
{
  "scripts": {
    "tauri": "tauri dev"
  }
}
```

### 3. Run Development Mode

Start the Vite dev server and launch the Tauri window:

```bash
# Using npm
npm run tauri

# Using pnpm (recommended for this project)
pnpm tauri

# Using npx (executes local CLI)
npx tauri dev

# Using Cargo directly
cargo tauri dev
```

### 4. Build Configuration (`src-tauri/tauri.conf.json`)

The desktop environment automatically starts the frontend Vite server using:

```json
"build": {
  "beforeDevCommand": "npm run dev",
  "devUrl": "http://localhost:5173"
}
```

> [!NOTE]
> Since TransCoda uses **Tauri v2**, the configuration uses `devUrl` instead of Tauri v1's `devPath` to prevent schema validation errors.

---

## 🚀 How to Use

1. 📁 **Import Files**: Drag and drop any media file (or folder) into the main dashboard.
2. 🎛 **Choose Profile**: Select an output format (ProRes, H.264, H.265) or adjust target bitrates in **The Wardrobe**.
3. ⚙️ **Tweak Engine settings**: Click sliders for AV1 selection, CRF/ABR mode toggling, and GPU turbo setups.
4. ⚡ **Start Glow-up**: Click to transcode and watch logs stream live. Celebrate with confetti once completed!

---

## 🤝 Contributing

Contributions of all kinds are welcome — bug fixes, UI improvements, theme designs, translation corrections, testing on different platforms.

→ **[CONTRIBUTING.md](CONTRIBUTING.md)** — dev setup, project structure, pull request guidelines

- 🐛 [Report a bug](https://github.com/albertolicea00/TransCoda/issues/new?template=bug_report.yml)
- 💡 [Request a feature](https://github.com/albertolicea00/TransCoda/issues/new?template=feature_request.yml)

---

## 🏗️ Architecture

```
src-tauri/
  src/                 Tauri main process — Rust backend, Commands, Hardware detection
  Cargo.toml           Rust manifest and sidecar definitions
src/
  App.tsx              React UI — Preview, Wardrobe, Trimming, Swatches, Engine Configs modal
  components/          UI components and theme swatches
  themes/              Built-in themes (Minimal, Rainbow, Drag, Windows/Mac/Ubuntu)
  lib/                 Theme injector (theme.ts)
  index.css            Custom CSS classes, timeline visual layout, layout styling
package.json           Node.js manifest and scripts
tsconfig.json          TypeScript compiler options
vite.config.ts         Vite bundler configurations
```

---

## 🧪 Tests

```bash
pnpm test            # run the suite once
pnpm test:watch      # re-run on every change
```

---

## ⚖️ License & Legal

TransCoda is released under the **[MIT License](LICENSE)**.

By using this software you agree to the **[EULA](EULA.md)**. You are solely responsible for using it in compliance with applicable law and the terms of service of any site you access. The developers do not endorse piracy or copyright infringement.

Third-party tools (primarily FFmpeg and FFprobe) are not bundled and governed by their own licenses.

🔐 Security vulnerabilities → **[SECURITY.md](SECURITY.md)**
