# TransCoda — Fabulous Media Transcoding System

## North Star: "Every file deserves a fabulous finale"
A lightweight, incredibly fast, and visually spectacular media transcoding system. The interface wraps core media processing with a humorous, queer-coded branding, combining extreme native performance with a gorgeous, interactive aesthetic.

## Visual Identity & Theming
Theme management is handled through a dedicated **Theme Selector** (The Wardrobe), allowing for instantaneous, theatrical aesthetic switching:
- **Minimalist Dark**: Clean, high-contrast, premium dark mode with emerald (`#34D399`) accents and Nord-inspired styling.
- **Rainbow Mode**: Vibrant pride gradients (pink-to-yellow-to-blue), neon borders, and smooth micro-animations.
- **Drag Mode**: Hot neon pinks (`#FF1493`), purples (`#8A2BE2`), gold (`#FFD700`), custom glitter animations, and high-impact theatrical transitions.
- **OS-Native Themes**: Light and dark adaptations mimicking macOS, Windows 11, and Ubuntu desktop styling.

### Customization Engine
The styling engine allows real-time tuning of theme parameters through CSS Custom Properties:
- **Glass Intensity**: Adjusts the transparency of background glass panels (translates to `--bg-card` and `--bg-panel` alphas).
- **App Transparency**: Modifies application base depth (`--bg-deep`) opacity.
- **Accent Override**: Overrides primary/accent colors and gradients from a palette of preset options (e.g., `#FF1493`, `#34D399`, `#0A84FF`).

## Typography
- **Primary Font**: `Outfit` (and system fallbacks) for a modern, sleek, friendly interface.
- **Secondary Font**: System Sans for high readability.
- **Technical Font**: Monospace font (`Courier New`, `SFMono`, etc.) for metadata, bitrates, logs, timecodes, and file paths.
- **Scale**: High-contrast, clean hierarchies that stand out beautifully against frosted glass backgrounds.

## Component Patterns
- **Glassmorphism**: Dashboards, cards, and modal panels use `backdrop-blur-xl`, semi-transparent backgrounds, and glowing border focus states (`--border-color`, `--shadow-glow`).
- **Dynamic Action Button (Glow-Up)**: Neon-pulsing action button that activates a glitter-gradient background when hovering or in Drag Mode.
- **Visual Scrubber**: A precision timeline trimming scrubber with timeline ticks, major/minor tick lines, and range highlights.
- **Native-Look Titlebar**: Custom draggable header mimicking native macOS window controls and displaying current studio/project badges.
- **Glow-Up Overlay**: Radial gradients and spinning neon indicators representing encoding/makeover progress.
- **Toast Notifications**: Slide-out popups displaying playful success messages.

## Information Architecture
- **Workspace (Dashboard)**: Central dashboard combining the live scrubber preview, file metadata grid, and the precision trim panel.
- **The Wardrobe (Sidebar)**: Controls for formatting (ProRes, H.264, HEVC), target bitrate slider, GPU Turbo-Mode toggle, audio layout selector, and theme quick-switcher.
- **Engine Configurations (Modal)**: High-density control popup for selecting video engines (AV1, H.265, H.264), hardware acceleration, and bitrate control models (CRF vs ABR).
- **Drag & Drop Overlay**: Fullscreen backdrop activating when a file or URL is dragged over, allowing automated starts for files or url demuxing.

## Experience Principles
1. **Humorous & Sassy Feedback**: Emojis-rich and humor-infused progress indicators (`[💅]`, `[👑]`, `[🦄]`) keep the user engaged during processing.
2. **Interactive Polish & Easter Eggs**: Native notifications with comedic responses, custom confettis on transcode completion, and a secret keyboard listener (`Ctrl+Shift+D`) to force-activate Drag Mode.
3. **Modular & Responsive Control**: Quick adjustments for video/audio layout parameters and live visual preview updates.

## Code Structure
- `src/App.tsx`: The primary React component managing layout, modals, drag-and-drop state, and encoding simulation.
- `src/themes/`: Structured TypeScript theme declarations defining custom CSS variable maps (`--primary`, `--bg-deep`, etc.) and optional inline CSS animations.
- `src/lib/theme.ts`: Helper utility to inject theme variables dynamically into the DOM root.
- `src/index.css`: Central stylesheet containing layout rules, custom scrollbars, animations, and typography imports.
