# 💅 Contributing to TransCoda

We are thrilled that you want to contribute to **TransCoda** – _"Every file deserves a fabulous finale"_! 🌈

To keep our codebase clean, fast, and absolutely stunning, please review the guidelines below before creating issues or sending Pull Requests.

---

## 🎭 The Agent Collaboration Protocol

Every contribution should align with our core specialized AI agents. Even if you are a human developer, you should ask yourself:

- **💅 Am I serving realness?** (Is the UI polished? Does it match the Minimalist, Rainbow, or Drag mode themes? Have I checked responsiveness?) -> _DivaAgent Check_
- **⚙️ Is this optimized?** (Does the FFmpeg command use hardware acceleration? Is memory usage kept to a minimum?) -> _TranscoderAgent Check_
- **🌐 Is it truly cross-platform?** (Does it compile on Tauri/Rust, load correctly on WebAssembly, and fit React Native layouts?) -> _PlatformAgent Check_
- **📝 Is it funny?** (Are logs prefixed with custom emojis? Are success messages entertaining?) -> _LogAgent Check_
- **🔍 Did it break anything?** (Have I run quality checks? Are container formats validated?) -> _InspectorAgent Check_

---

## 🛠️ Code Style Guidelines

### Frontend (React + TypeScript)

- Use functional components with hooks.
- Style components using TailwindCSS utilities or custom CSS variables for theme bindings. **Do not hardcode specific hex colors** in layouts. Use variables like `var(--accent-primary)` to ensure custom themes work.
- Maintain strict TypeScript types (avoid `any`).

### Backend (Rust / Tauri)

- Follow official Rust formatting guidelines (`cargo fmt`).
- Keep unsafe blocks to a minimum.
- Structure Tauri commands to return descriptive `Result<T, E>` types where errors are user-facing messages.

---

## 🌿 Git Workflow & Branching

We follow a simple branching model. Please create features from `main`:

1. **Branch Naming**:
   - For features: `feature/💅-short-description` or `feature/feather-name`
   - For bug fixes: `bugfix/🐛-short-description`
   - For refactoring: `refactor/🛠️-short-description`
2. **Commit Messages**:
   Keep commit messages descriptive and include a relevant emoji!
   - `feat: 💅 add fabulous drag-mode glitter effect`
   - `fix: ⚙️ fix hardware acceleration fallback for Apple M1/M2`
   - `chore: 📝 update log messages for closet-easter-egg`

---

## 🛠️ Local Development Setup

To run and develop TransCoda locally as a desktop application, follow these steps:

1. **Install the Tauri CLI** globally via Cargo (Rust's package manager):
   ```bash
   cargo install tauri-cli
   ```
2. **Install project dependencies** (using `pnpm` workspace):
   ```bash
   pnpm install
   ```
3. **Run in development mode**:
   ```bash
   pnpm tauri
   # or
   npm run tauri
   ```
   This will spin up the Vite development server on `http://localhost:5173` and launch the Tauri window automatically using the configurations set in `src-tauri/tauri.conf.json`.

---

## 💅 Code Formatting & Editor Setup

To prevent massive, chaotic diffs when saving files ("format on save"), we enforce standard formatting configurations:

- **VS Code Settings (`.vscode/settings.json`)**: Configured to auto-format files on save. It uses **Prettier** for all frontend files (TypeScript, React, CSS, Markdown, etc.) and **rust-analyzer** for Rust files.
- **Prettier Settings (`.prettierrc`)**: Defines standard stylistic preferences (e.g. single quotes, semi-colons, tab spacing).
- **Format Command**: You can manually format the entire codebase at any time by running:
  ```bash
  pnpm run format
  ```

Please make sure you have the **Prettier** and **Rust Analyzer** extensions installed in VS Code to ensure smooth, non-disruptive save actions.

---

## 📬 Pull Request Process

1. Create a branch from `main`.
2. Implement your changes, ensuring you write unit/integration tests where applicable.
3. Verify formatting and lints:
   - Frontend: `pnpm run format` / `pnpm run lint`
   - Backend: `cargo fmt` / `cargo clippy`
4. Submit a Pull Request using our [PULL_REQUEST_TEMPLATE](file:///.github/PULL_REQUEST_TEMPLATE.md).
5. Ensure your PR is reviewed and matches our [CODE_OF_CONDUCT](file:///CODE_OF_CONDUCT.md).

Thank you for serving realness with your code! 👑✨
