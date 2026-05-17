/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import './RunSettings.css';
import { Settings, Palette, Download, Trash2, X, RefreshCw } from 'lucide-react';
import { THEMES } from '../utils/themes';

interface RunSettingsProps {
  settings: any;
  onUpdateSettings: (newSet: any) => void;
  onResetSettings: () => void;
  activeTheme: string;
  onThemeChange: (t: string) => void;
  bgImage: string | null;
  onBgUpload: (img: string) => void;
  onBgRemove: () => void;
  bgOpacity: number;
  onOpacityChange: (op: number) => void;
  isVisible: boolean;
}

export default function RunSettings({ 
  settings, 
  onUpdateSettings, 
  onResetSettings,
  activeTheme,
  onThemeChange,
  bgImage,
  onBgUpload,
  onBgRemove,
  bgOpacity,
  onOpacityChange,
  isVisible
}: RunSettingsProps) {
  if (!isVisible) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onBgUpload(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <aside className="run-settings">
      <div className="settings-section">
        <div className="section-header">
          <Settings size={16} />
          <span>RUN SETTINGS</span>
        </div>
        
        <div className="setting-control">
          <div className="control-label">
            <span>TEMPERATURE</span>
            <span className="value">{settings.temperature}</span>
          </div>
          <input 
            type="range" 
            min="0" max="2" step="0.1" 
            value={settings.temperature}
            onChange={(e) => onUpdateSettings({ temperature: parseFloat(e.target.value) })}
          />
        </div>

        <div className="setting-control">
          <div className="control-label">
            <span>MAX TOKENS</span>
            <span className="value">{settings.maxTokens}</span>
          </div>
          <input 
            type="number" 
            className="number-input"
            value={settings.maxTokens}
            onChange={(e) => onUpdateSettings({ maxTokens: parseInt(e.target.value) || 1 })}
          />
          <input 
            type="range" 
            min="1" max="8192" step="1" 
            value={settings.maxTokens}
            onChange={(e) => onUpdateSettings({ maxTokens: parseInt(e.target.value) })}
          />
        </div>

        <div className="setting-control">
          <div className="control-label">
            <span>TOP P</span>
            <span className="value">{settings.topP}</span>
          </div>
          <input 
            type="range" 
            min="0" max="1" step="0.05" 
            value={settings.topP}
            onChange={(e) => onUpdateSettings({ topP: parseFloat(e.target.value) })}
          />
        </div>

        <button className="reset-btn" onClick={onResetSettings}>
          <RefreshCw size={14} />
          RESET TO DEFAULTS
        </button>
      </div>

      <div className="settings-section">
        <div className="section-header">
          <Palette size={16} />
          <span>THEME PRESET</span>
        </div>
        <div className="theme-grid">
          {Object.keys(THEMES).map(t => (
            <button 
              key={t}
              className={`theme-btn ${activeTheme === t ? 'active' : ''}`}
              onClick={() => onThemeChange(t)}
              title={THEMES[t].name}
            >
              <div 
                className="theme-swatch" 
                style={{ backgroundColor: THEMES[t].vars['--accent-cyan'] }} 
              />
              <span className="theme-name">{THEMES[t].name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <div className="section-header">
          <Download size={14} />
          <span>WALLPAPER</span>
        </div>
        
        <div className="upload-area">
          <label className="upload-label">
            <Download size={20} />
            <span>UPLOAD_BG.JPG</span>
            <input 
              type="file" 
              className="hidden-input" 
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {bgImage && (
          <div className="bg-preview-container">
            <div className="preview-header">
              <span>PREVIEW</span>
              <button className="remove-btn" onClick={onBgRemove}>
                <Trash2 size={12} />
                REMOVE
              </button>
            </div>
            <img src={bgImage} className="bg-thumbnail" alt="Background thumbnail" />
          </div>
        )}

        <div className="setting-control">
          <div className="control-label">
            <span>OVERLAY DARKNESS</span>
            <span className="value">{bgOpacity}%</span>
          </div>
          <input 
            type="range" 
            min="0" max="100" step="1" 
            value={bgOpacity}
            onChange={(e) => onOpacityChange(parseInt(e.target.value))}
          />
        </div>
      </div>
    </aside>
  );
}
