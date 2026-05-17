/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import './TopBar.css';
import { LayoutGrid, Code, Download, Plus, Sliders, ChevronDown, User } from 'lucide-react';

interface TopBarProps {
  activeProvider: any;
  activeModel: any;
  onModelSelect: (provider: any, model: any) => void;
  tokensUsed: number;
  onOpenLibrary: () => void;
  onOpenCode: () => void;
  onExport: (format: string) => void;
  onNewChat: () => void;
  onToggleSettings: () => void;
}

export default function TopBar({ 
  activeProvider, 
  activeModel, 
  onModelSelect,
  tokensUsed,
  onOpenLibrary,
  onOpenCode,
  onExport,
  onNewChat,
  onToggleSettings
}: TopBarProps) {
  return (
    <header className="top-bar">
      <div className="top-bar-left">
        <div className="model-selector-container">
          <button className="model-selector-btn">
            {activeProvider?.name} - {activeModel?.name || 'Select Model'}
            <ChevronDown size={14} />
          </button>
          <div className="model-dropdown">
            {activeProvider?.models.map((model: any) => (
              <div 
                key={model.id} 
                className={`model-option ${activeModel?.id === model.id ? 'active' : ''}`}
                onClick={() => onModelSelect(activeProvider, model)}
              >
                {model.name}
              </div>
            ))}
          </div>
        </div>
        <div className="token-counter">
          <span className="token-label">TOKENS:</span>
          <span className="token-value">{tokensUsed.toLocaleString()} / 1M</span>
        </div>
      </div>

      <div className="top-bar-right">
        <button className="top-btn" onClick={onOpenLibrary} title="Prompt Library">
          <LayoutGrid size={18} />
          <span>Library</span>
        </button>
        <button className="top-btn" onClick={onOpenCode} title="Get Code">
          <Code size={18} />
          <span>Code</span>
        </button>
        <div className="export-container">
          <button className="top-btn" title="Export Chat">
            <Download size={18} />
            <span>Export</span>
          </button>
          <div className="export-dropdown">
            <div onClick={() => onExport('txt')}>Export as .txt</div>
            <div onClick={() => onExport('md')}>Export as .md</div>
          </div>
        </div>
        <button className="top-btn" onClick={onNewChat} title="New Chat">
          <Plus size={18} />
        </button>
        <button className="top-btn" onClick={onToggleSettings} title="Settings">
          <Sliders size={18} />
        </button>
        <button className="top-btn profile-btn">
          <User size={18} />
        </button>
      </div>
    </header>
  );
}
