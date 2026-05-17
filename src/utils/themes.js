/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const THEMES = {
  DEFAULT: {
    name: 'Default',
    vars: {
      '--bg-primary': '#0f0f10',
      '--bg-sidebar': '#15151a',
      '--bg-panel': '#15151a',
      '--bg-card': '#1a1a24',
      '--bg-user-bubble': '#252538',
      '--bg-input': '#12121c',
      '--border-color': '#ffffff15',
      '--accent-cyan': '#00ffff',
      '--accent-purple': '#bf00ff',
      '--success': '#00ff9f',
      '--danger': '#ff003c',
      '--text-primary': '#e2e8f0',
      '--text-secondary': '#94a3b8',
      '--glow-cyan': '0 0 10px rgba(0, 255, 255, 0.4)',
      '--glow-purple': '0 0 10px rgba(191, 0, 255, 0.4)',
    }
  },
  CYBERPUNK: {
    name: 'Cyberpunk',
    vars: {
      '--bg-primary': '#0a0a0f',
      '--bg-sidebar': '#0d0d1a',
      '--bg-panel': '#0d0d1a',
      '--bg-card': '#111128',
      '--bg-user-bubble': '#1a1a35',
      '--bg-input': '#0f0f20',
      '--border-color': '#00ffff30',
      '--accent-cyan': '#00ffff',
      '--accent-purple': '#bf00ff',
      '--success': '#00ff9f',
      '--danger': '#ff003c',
      '--text-primary': '#e0f7ff',
      '--text-secondary': '#7899aa',
      '--glow-cyan': '0 0 10px #00ffff60, 0 0 20px #00ffff30',
      '--glow-purple': '0 0 10px #bf00ff60',
    }
  },
  MATRIX: {
    name: 'Matrix',
    vars: {
      '--bg-primary': '#000000',
      '--bg-sidebar': '#000000',
      '--bg-panel': '#000000',
      '--bg-card': '#051005',
      '--bg-user-bubble': '#0a1a0a',
      '--bg-input': '#050505',
      '--border-color': '#00ff4130',
      '--accent-cyan': '#00ff41',
      '--accent-purple': '#00ff41',
      '--success': '#00ff41',
      '--danger': '#ff003c',
      '--text-primary': '#00ff41',
      '--text-secondary': '#008f11',
      '--glow-cyan': '0 0 10px #00ff4160',
      '--glow-purple': '0 0 10px #00ff4160',
    }
  },
  MIDNIGHT: {
    name: 'Midnight',
    vars: {
      '--bg-primary': '#050510',
      '--bg-sidebar': '#020208',
      '--bg-panel': '#020208',
      '--bg-card': '#08081a',
      '--bg-user-bubble': '#0a0a25',
      '--bg-input': '#04040c',
      '--border-color': '#0066ff30',
      '--accent-cyan': '#0066ff',
      '--accent-purple': '#4d00ff',
      '--success': '#00ff9f',
      '--danger': '#ff003c',
      '--text-primary': '#e0f0ff',
      '--text-secondary': '#7088aa',
      '--glow-cyan': '0 0 10px #0066ff60',
      '--glow-purple': '0 0 10px #4d00ff60',
    }
  },
  CRIMSON: {
    name: 'Crimson',
    vars: {
      '--bg-primary': '#0f0005',
      '--bg-sidebar': '#0a0003',
      '--bg-panel': '#0a0003',
      '--bg-card': '#1a0008',
      '--bg-user-bubble': '#2a000d',
      '--bg-input': '#080002',
      '--border-color': '#ff003c30',
      '--accent-cyan': '#ff003c',
      '--accent-purple': '#ff00aa',
      '--success': '#00ff9f',
      '--danger': '#ff003c',
      '--text-primary': '#ffe0e6',
      '--text-secondary': '#aa7078',
      '--glow-cyan': '0 0 10px #ff003c60',
      '--glow-purple': '0 0 10px #ff00aa60',
    }
  }
};

export const applyTheme = (themeName) => {
  const theme = THEMES[themeName.toUpperCase()] || THEMES.CYBERPUNK;
  Object.entries(theme.vars).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
};
