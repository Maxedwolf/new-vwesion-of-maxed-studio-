/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import './MessageBubble.css';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface MessageBubbleProps {
  message: any;
  key?: any;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isAI = message.role === 'assistant';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`message-container ${isAI ? 'ai' : 'user'}`}>
      <div className="message-header">
        <div className="sender-label">
          {isAI ? (
            <>
              <span className="provider-tag">{message.provider || 'GEMINI'} • {new Date(message.timestamp || Date.now()).toLocaleTimeString()}</span>
            </>
          ) : (
            <>
              <span className="user-tag">OPERATOR_MAX</span>
            </>
          )}
        </div>
      </div>
      
      <div className="message-content-wrapper">
        <div className="message-bubble">
          {message.content}
          
          {isAI && (
            <button className="copy-btn" onClick={handleCopy} title="Copy to clipboard">
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
