/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import './MidChatSwitcher.css';
import { RefreshCw, ChevronRight } from 'lucide-react';

export default function MidChatSwitcher({ providers, activeProvider, activeModel, onModelChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredProvider, setHoveredProvider] = useState(null);

  return (
    <div className="mid-chat-switcher">
      <button className="tool-btn" onClick={() => setIsOpen(!isOpen)} title="Switch Model Mid-Chat">
        <RefreshCw size={18} />
      </button>

      {isOpen && (
        <div className="switcher-dropdown">
          <div className="provider-column">
            {providers.map(p => (
              <div 
                key={p.id} 
                className={`provider-row ${hoveredProvider?.id === p.id ? 'hovered' : ''} ${activeProvider?.id === p.id ? 'active' : ''}`}
                onMouseEnter={() => setHoveredProvider(p)}
              >
                <div className="provider-name-group">
                  <div className="status-dot" style={{ backgroundColor: p.color }} />
                  <span>{p.name}</span>
                </div>
                <ChevronRight size={12} />
              </div>
            ))}
          </div>

          <div className="model-column">
            {(hoveredProvider || activeProvider)?.models.map(m => (
              <div 
                key={m.id} 
                className={`model-row ${activeModel?.id === m.id && activeProvider?.id === (hoveredProvider || activeProvider).id ? 'active' : ''}`}
                onClick={() => {
                  onModelChange(hoveredProvider || activeProvider, m);
                  setIsOpen(false);
                }}
              >
                {m.name}
              </div>
            ))}
            {(hoveredProvider || activeProvider)?.models.length === 0 && (
              <div className="empty-models">No models available</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
