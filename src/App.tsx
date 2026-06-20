import React, { useState, useEffect } from 'react';
import {
  Sliders,
  Cpu,
  Zap,
  CheckCircle2,
  Sparkles,
  X,
  FileVideo,
  Globe,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { applyTheme } from './lib/theme';

// Import themes
import transcodaMinimal from './themes/transcoda-minimal';
import transcodaRainbow from './themes/transcoda-rainbow';
import transcodaDrag from './themes/transcoda-drag';
import osWindows11Dark from './themes/os-windows-11-dark';
import osWindows11Light from './themes/os-windows-11-light';
import osMacosDark from './themes/os-macos-dark';
import osMacosLight from './themes/os-macos-light';
import osUbuntuDark from './themes/os-ubuntu-dark';
import osUbuntuLight from './themes/os-ubuntu-light';

const THEMES_LIST = [
  transcodaMinimal,
  transcodaRainbow,
  transcodaDrag,
  osWindows11Dark,
  osWindows11Light,
  osMacosDark,
  osMacosLight,
  osUbuntuDark,
  osUbuntuLight,
];

export default function App() {
  // Theme States
  const [activeThemeId, setActiveThemeId] = useState('transcoda-minimal');
  const [themeSettings, setThemeSettings] = useState({
    accentOverride: '',
    glassIntensity: 75,
    appTransparency: 100,
    fontScale: 100,
  });

  // Modal State
  const [showConfigModal, setShowConfigModal] = useState(false);

  // App Parameters (Screenshot 1)
  const [outputFormat, setOutputFormat] = useState('prores'); // 'prores' | 'h264' | 'h265'
  const [targetBitrate, setTargetBitrate] = useState(120); // 120 Mbps
  const [gpuTurboMode, setGpuTurboMode] = useState(true);
  const [audioLayout, setAudioLayout] = useState('5.1'); // '5.1' | 'stereo' | 'mono'

  // Precision Trimming States
  const [trimIn] = useState('00:00:12:00');
  const [trimOut] = useState('00:04:33:10');

  // Video metadata state
  const [metadata, setMetadata] = useState({
    resolution: '3840 x 2160 (4K)',
    frameRate: '59.94 FPS',
    duration: '00:12:44:02',
    codec: 'ProRes 422 HQ',
    timecode: '00:04:21:15',
    title: 'Neon_Runway_Final_Edit.mp4',
    isUrl: false,
    url: '',
  });

  // Engine Configuration States (Screenshot 2)
  const [videoEngine, setVideoEngine] = useState<'av1' | 'h265' | 'h264'>('h265');
  const [hwAcceleration, setHwAcceleration] = useState(true);
  const [bitrateControl, setBitrateControl] = useState<'crf' | 'abr'>('crf');
  const [crfValue, setCrfValue] = useState(23);
  const [targetBitrateInput, setTargetBitrateInput] = useState('12.0');
  const [maxBitrateInput, setMaxBitrateInput] = useState('18.5');

  // Encoding simulation state
  const [isEncoding, setIsEncoding] = useState(false);
  const [encodingProgress, setEncodingProgress] = useState(0);
  const [encodingLog, setEncodingLog] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Your file just came out of the closet! 🌈✨');

  // Apply Theme Effect
  useEffect(() => {
    const theme = THEMES_LIST.find(t => t.id === activeThemeId) || transcodaMinimal;
    // Map settings
    const settings = {
      ...themeSettings,
    };
    applyTheme(theme as any, settings);
  }, [activeThemeId, themeSettings]);

  // Keyboard shortcut listener: Ctrl+Shift+D to trigger Drag Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setActiveThemeId('transcoda-drag');
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FF1493', '#8A2BE2', '#FFD700', '#00FFFF'],
        });
        triggerToast();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerToast = (msg?: string) => {
    setToastMessage(msg || 'Your file just came out of the closet! 🌈✨');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4500);
  };

  // Simulate transcoding/glow-up / extraction
  const startTranscode = (type: 'file' | 'url' = 'file', name?: string) => {
    setIsEncoding(true);
    setEncodingProgress(0);

    const displayName = name || (type === 'url' ? metadata.url : metadata.title);

    const initialText =
      type === 'url'
        ? `[💅] Extracting media from URL: ${displayName}...`
        : `[💅] Initializing makeover for file: ${displayName}...`;

    setEncodingLog(initialText);

    const logs =
      type === 'url'
        ? [
            { p: 0, text: `[💅] Extracting media from URL: ${displayName}...` },
            { p: 15, text: '[🌐] Dialing up the server... establishing a fabulous connection!' },
            { p: 35, text: '[⚡] Downloading video stream... serving pure bandwidth realness!' },
            { p: 55, text: '[🌈] Demuxing audio and video streams... checking the outfit!' },
            { p: 75, text: '[💎] Polishing frames and extracting metadata...' },
            { p: 90, text: '[🎉] Saving local cache... preparing the final runway look!' },
            { p: 100, text: '[💅] Extraction complete! Your stream has been captured.' },
          ]
        : [
            { p: 0, text: `[💅] Initializing makeover for file: ${displayName}...` },
            { p: 15, text: '[👑] Probing system... GPU Turbo-Mode is serving pure power!' },
            { p: 35, text: '[🦄] Loading codecs... Your bits are getting dressed to impress.' },
            { p: 55, text: '[🌈] Processing frames... Serving realness, one pixel at a time!' },
            {
              p: 75,
              text: '[💎] Applying filters... Deblocking, deinterlacing, looking spectacular!',
            },
            {
              p: 90,
              text: '[🎉] Multiplexing... Adding the finishing touches for a fabulous finale.',
            },
            { p: 100, text: '[💅] Done! Your video has officially left the closet.' },
          ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      setEncodingProgress(currentProgress);

      const matchingLog = logs.find(l => l.p === currentProgress);
      if (matchingLog) {
        setEncodingLog(matchingLog.text);
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsEncoding(false);
          // If we finished a URL extraction, update the metadata with simulated extracted video info!
          if (type === 'url') {
            setMetadata(prev => ({
              ...prev,
              resolution: '1920 x 1080 (FHD)',
              frameRate: '30 FPS',
              duration: '00:05:44:12',
              codec: 'H.264 (Extracted)',
              title: displayName.split('/').pop() || 'Extracted_Media.mp4',
              isUrl: false,
            }));
          }
          // Trigger fabulous confetti!
          confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#FF007F', '#FFD700', '#00F0FF', '#34D399', '#8A2BE2'],
          });
          triggerToast(type === 'url' ? 'Your URL media has been extracted! 🌈✨' : undefined);
        }, 800);
      }
    }, 60);
  };

  // Drag and Drop States
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = React.useRef(0);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    const files = e.dataTransfer.files;
    const textData =
      e.dataTransfer.getData('text/plain') || e.dataTransfer.getData('text/uri-list');

    if (files && files.length > 0) {
      // Handle file drop
      const file = files[0];
      const extension = file.name.split('.').pop()?.toUpperCase() || 'MP4';

      setMetadata({
        title: file.name,
        resolution: '3840 x 2160 (4K)',
        frameRate: '60 FPS',
        duration: '00:03:40:00',
        codec: `${extension} Video`,
        timecode: '00:00:00:00',
        isUrl: false,
        url: '',
      });
      // Start formatting automatically!
      startTranscode('file', file.name);
    } else if (textData) {
      const isWebUrl =
        textData.startsWith('http://') ||
        textData.startsWith('https://') ||
        textData.includes('www.');
      if (isWebUrl) {
        // Handle URL drop
        setMetadata({
          title: textData,
          resolution: 'Detecting...',
          frameRate: 'Detecting...',
          duration: 'Detecting...',
          codec: 'Network Stream',
          timecode: '00:00:00:00',
          isUrl: true,
          url: textData,
        });
        // Start extraction automatically!
        startTranscode('url', textData);
      }
    }
  };

  const handleThemeSetting = (patch: Partial<typeof themeSettings>) => {
    setThemeSettings(prev => ({
      ...prev,
      ...patch,
    }));
  };

  return (
    <div
      className="app-container"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Background Orbs */}
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>

      {/* Simulated native Titlebar */}
      <header className="custom-titlebar">
        <div className="titlebar-left">
          <span className="studio-badge">The Professional Studio</span>
          <span className="project-name">Project: {metadata.title}</span>
        </div>
        <div className="titlebar-right">
          <div className="window-controls">
            <button className="control-btn control-minimize" title="Minimize"></button>
            <button className="control-btn control-maximize" title="Maximize"></button>
            <button className="control-btn control-close" title="Close"></button>
          </div>
        </div>
      </header>

      {/* Main Grid Panel */}
      <main className="main-dashboard">
        {/* Left Column: Visual Scrubber & Video Details */}
        <section className="workspace-column">
          {/* Glass Preview Panel */}
          <div className="preview-container">
            {/* Embedded image placeholder simulating dynamic render preview */}
            <img
              src="https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=800&auto=format&fit=crop"
              alt="TransCoda Neon Preview"
              className="preview-image"
            />
            {/* Neon glowing overlays to match custom drag/rainbow modes */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(255,20,147,0.15) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            ></div>
            <div className="timecode-badge">{metadata.timecode}</div>

            {/* Simulated Encoding Progress Screen */}
            {isEncoding && (
              <div className="encoding-progress-overlay">
                <div className="encoding-spinner"></div>
                <h3 className="encoding-title">Glow-Up in Progress...</h3>
                <span className="progress-text">{encodingLog}</span>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${encodingProgress}%` }}></div>
                </div>
                <span className="progress-text">{encodingProgress}%</span>
              </div>
            )}
          </div>

          {/* Media Info Cards */}
          <div className="metadata-grid">
            <div className="meta-card">
              <div className="meta-label">Resolution</div>
              <div className="meta-value">{metadata.resolution}</div>
            </div>
            <div className="meta-card">
              <div className="meta-label">Frame Rate</div>
              <div className="meta-value">{metadata.frameRate}</div>
            </div>
            <div className="meta-card">
              <div className="meta-label">Duration</div>
              <div className="meta-value">{metadata.duration}</div>
            </div>
            <div className="meta-card">
              <div className="meta-label">Codec</div>
              <div className="meta-value highlight">{metadata.codec}</div>
            </div>
          </div>

          {/* Precision Trimming Panel */}
          <div className="glass-card trimming-panel">
            <div className="trimming-header">
              <span className="trimming-title">Precision Trimming</span>
              <div className="trimming-values">
                <span>
                  IN: <span className="trim-in">{trimIn}</span>
                </span>
                <span>
                  OUT: <span className="trim-out">{trimOut}</span>
                </span>
              </div>
            </div>
            {/* Scrubber controls */}
            <div className="timeline-scrubber">
              {/* Highlight selection range */}
              <div className="range-highlight" style={{ left: '20%', right: '40%' }}></div>
              <div className="playhead" style={{ left: '42%' }}></div>

              <div className="scrubber-ticks">
                <div className="tick-line major"></div>
                <div className="tick-line"></div>
                <div className="tick-line"></div>
                <div className="tick-line"></div>
                <div className="tick-line major"></div>
                <div className="tick-line"></div>
                <div className="tick-line"></div>
                <div className="tick-line"></div>
                <div className="tick-line major"></div>
                <div className="tick-line"></div>
                <div className="tick-line"></div>
                <div className="tick-line"></div>
                <div className="tick-line major"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: "The Wardrobe" Sidebar */}
        <section className="wardrobe-column">
          <div className="wardrobe-header">
            <h2 className="wardrobe-title">The Wardrobe</h2>
            {/* Click triggers engine configuration modal */}
            <button
              className="config-trigger-btn"
              title="Engine Configurations"
              onClick={() => setShowConfigModal(true)}
            >
              <Sliders size={20} />
            </button>
          </div>

          {/* Output Format cards selector */}
          <div className="slider-container">
            <span className="option-label">Output Format</span>
            <div className="cards-group">
              <div
                className={`select-card ${outputFormat === 'prores' ? 'selected' : ''}`}
                onClick={() => setOutputFormat('prores')}
              >
                <span className="card-title">Apple ProRes 422</span>
                {outputFormat === 'prores' && (
                  <span className="card-icon-selected">
                    <Sparkles size={16} />
                  </span>
                )}
              </div>
              <div
                className={`select-card ${outputFormat === 'h264' ? 'selected' : ''}`}
                onClick={() => setOutputFormat('h264')}
              >
                <span className="card-title">H.264 High Profile</span>
                {outputFormat === 'h264' && (
                  <span className="card-icon-selected">
                    <Sparkles size={16} />
                  </span>
                )}
              </div>
              <div
                className={`select-card ${outputFormat === 'h265' ? 'selected' : ''}`}
                onClick={() => setOutputFormat('h265')}
              >
                <span className="card-title">H.265 (HEVC)</span>
                {outputFormat === 'h265' && (
                  <span className="card-icon-selected">
                    <Sparkles size={16} />
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Target Bitrate Slider */}
          <div className="slider-container">
            <div className="slider-labels">
              <span className="option-label">Target Bitrate</span>
              <span className="slider-val">{targetBitrate} Mbps</span>
            </div>
            <input
              type="range"
              min="1"
              max="400"
              value={targetBitrate}
              onChange={e => setTargetBitrate(Number(e.target.value))}
              className="range-input"
            />
            <div className="slider-boundaries">
              <span>1.0 Mbps</span>
              <span>400 Mbps</span>
            </div>
          </div>

          {/* GPU Acceleration Switch */}
          <div className="gpu-card">
            <div className="gpu-info">
              <span className="gpu-title">GPU Turbo-Mode</span>
              <span className="gpu-desc">Using NVIDIA RTX 4090</span>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={gpuTurboMode}
                onChange={e => setGpuTurboMode(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          {/* Audio Layout Toggle Button Group */}
          <div className="slider-container">
            <span className="option-label">Audio Layout</span>
            <div className="audio-toggle-group">
              <button
                className={`audio-btn ${audioLayout === '5.1' ? 'selected' : ''}`}
                onClick={() => setAudioLayout('5.1')}
              >
                5.1 Surround
              </button>
              <button
                className={`audio-btn ${audioLayout === 'stereo' ? 'selected' : ''}`}
                onClick={() => setAudioLayout('stereo')}
              >
                Stereo
              </button>
              <button
                className={`audio-btn ${audioLayout === 'mono' ? 'selected' : ''}`}
                onClick={() => setAudioLayout('mono')}
              >
                Mono
              </button>
            </div>
          </div>

          {/* Start Glow-up Trigger */}
          <button className="btn-glowup" onClick={() => startTranscode('file')} disabled={isEncoding}>
            <Zap size={16} />
            <span>Start Glow-Up</span>
          </button>

          {/* Theme Quick Switcher for Easy testing */}
          <div
            className="slider-container"
            style={{
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-color)',
            }}
          >
            <span className="option-label">The Wardrobe Mode (Themes)</span>
            <div className="themes-grid">
              {THEMES_LIST.map(theme => (
                <div
                  key={theme.id}
                  className={`theme-card ${activeThemeId === theme.id ? 'active' : ''}`}
                  onClick={() => setActiveThemeId(theme.id)}
                >
                  <div className="theme-preview-colors">
                    <div
                      className="preview-dot"
                      style={{ background: theme.variables['--primary'] }}
                    ></div>
                    <div
                      className="preview-dot"
                      style={{ background: theme.variables['--bg-deep'] }}
                    ></div>
                    <div
                      className="preview-dot"
                      style={{ background: theme.variables['--text-primary'] }}
                    ></div>
                  </div>
                  <span className="theme-card-name">{theme.name}</span>
                </div>
              ))}
            </div>

            {/* Custom Settings Adjuster */}
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                }}
              >
                <span>Glass Intensity</span>
                <span>{themeSettings.glassIntensity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={themeSettings.glassIntensity}
                onChange={e => handleThemeSetting({ glassIntensity: Number(e.target.value) })}
                style={{ width: '100%', accentColor: 'var(--primary)' }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                }}
              >
                <span>App Transparency</span>
                <span>{themeSettings.appTransparency}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={themeSettings.appTransparency}
                onChange={e => handleThemeSetting({ appTransparency: Number(e.target.value) })}
                style={{ width: '100%', accentColor: 'var(--primary)' }}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Engine Configurations Modal overlay (Screenshot 2) */}
      {showConfigModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <header className="modal-header">
              <div className="modal-title">
                <Sliders size={18} style={{ color: 'var(--primary)' }} />
                <span>Engine Configurations</span>
              </div>
              <button className="modal-close-btn" onClick={() => setShowConfigModal(false)}>
                <X size={18} />
              </button>
            </header>

            <div className="modal-body">
              {/* Video Engine Selection */}
              <div className="modal-section">
                <div className="modal-section-title">Video Engine</div>
                <div className="codec-grid">
                  <div
                    className={`codec-card ${videoEngine === 'av1' ? 'selected' : ''}`}
                    onClick={() => setVideoEngine('av1')}
                  >
                    <span className="codec-name">AV1</span>
                    <span className="codec-desc">Next Gen</span>
                  </div>
                  <div
                    className={`codec-card ${videoEngine === 'h265' ? 'selected' : ''}`}
                    onClick={() => setVideoEngine('h265')}
                  >
                    <span className="codec-name">H.265</span>
                    <span className="codec-desc">Efficient</span>
                  </div>
                  <div
                    className={`codec-card ${videoEngine === 'h264' ? 'selected' : ''}`}
                    onClick={() => setVideoEngine('h264')}
                  >
                    <span className="codec-name">H.264</span>
                    <span className="codec-desc">Universal</span>
                  </div>
                </div>
              </div>

              {/* Hardware Acceleration Auto-detect Engine */}
              <div className="modal-section">
                <div className="modal-section-title">Hardware Acceleration</div>
                <div className="gpu-card" style={{ background: 'var(--bg-input)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Cpu size={20} style={{ color: 'var(--primary)' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600 }}>Auto-detect Engine</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        NVIDIA NVENC (detected)
                      </span>
                    </div>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={hwAcceleration}
                      onChange={e => setHwAcceleration(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              {/* Bitrate Control */}
              <div className="modal-section">
                <div className="bitrate-mode-row">
                  <div className="modal-section-title">Bitrate Control</div>
                  <div className="bitrate-btn-group">
                    <button
                      className={`bitrate-mode-btn ${bitrateControl === 'crf' ? 'selected' : ''}`}
                      onClick={() => setBitrateControl('crf')}
                    >
                      CRF
                    </button>
                    <button
                      className={`bitrate-mode-btn ${bitrateControl === 'abr' ? 'selected' : ''}`}
                      onClick={() => setBitrateControl('abr')}
                    >
                      ABR
                    </button>
                  </div>
                </div>

                {bitrateControl === 'crf' ? (
                  <div className="slider-container" style={{ marginTop: '10px' }}>
                    <input
                      type="range"
                      min="0"
                      max="51"
                      value={crfValue}
                      onChange={e => setCrfValue(Number(e.target.value))}
                      className="range-input"
                    />
                    <div className="slider-boundaries" style={{ marginTop: '4px' }}>
                      <span>Faster / Low Qual (51)</span>
                      <span style={{ color: 'var(--primary)', fontWeight: 700 }}>
                        {crfValue} (Balanced)
                      </span>
                      <span>Slower / High Qual (0)</span>
                    </div>
                  </div>
                ) : (
                  <div className="inputs-row" style={{ marginTop: '10px' }}>
                    <div className="input-field-group">
                      <span className="field-label">Target Bitrate (Mbps)</span>
                      <input
                        type="text"
                        value={targetBitrateInput}
                        onChange={e => setTargetBitrateInput(e.target.value)}
                        className="field-input"
                      />
                    </div>
                    <div className="input-field-group">
                      <span className="field-label">Max Bitrate (Mbps)</span>
                      <input
                        type="text"
                        value={maxBitrateInput}
                        onChange={e => setMaxBitrateInput(e.target.value)}
                        className="field-input"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <footer className="modal-footer">
              <div className="footer-left">
                <button className="outline-btn">Save Preset</button>
                <button className="flat-btn">Reset</button>
              </div>
              <button className="solid-btn" onClick={() => setShowConfigModal(false)}>
                Apply Changes
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* Success Closet Toast notification */}
      {showToast && (
        <div className="toast-container">
          <div className="toast">
            <CheckCircle2 size={18} style={{ color: 'var(--primary)' }} />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Drag & Drop Fullscreen Overlay */}
      {isDragging && (
        <div className="drag-drop-overlay">
          <div className="drag-drop-zone">
            <div className="drag-icons">
              <div className="drag-icon-container">
                <FileVideo size={40} />
              </div>
              <span className="drag-icon-separator">OR</span>
              <div className="drag-icon-container">
                <Globe size={40} />
              </div>
            </div>
            <h2 className="drag-title">
              Drop files or <span className="drag-glow-text">URLs</span> here!
            </h2>
            <p className="drag-desc">
              Drag your media file directly to start a makeover, <br />
              or drop a web URL to extract media immediately. 💅✨
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
