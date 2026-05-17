/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import './ChatArea.css';
import MessageBubble from './MessageBubble';
import MidChatSwitcher from './MidChatSwitcher';
import { FileText, ChevronDown, ChevronUp, Send, Zap, Paperclip, Image as ImageIcon, Mic } from 'lucide-react';

interface ChatAreaProps {
  messages: any[];
  onSendMessage: (content: string) => void;
  systemInstruction: string;
  onUpdateSystemInstruction: (val: string) => void;
  isProcessing: boolean;
  activeProvider: any;
  activeModel: any;
  onModelChange: (p: any, m: any) => void;
  providers: any[];
}

export default function ChatArea({ 
  messages, 
  onSendMessage, 
  systemInstruction, 
  onUpdateSystemInstruction,
  isProcessing,
  activeProvider,
  activeModel,
  onModelChange,
  providers
}: ChatAreaProps) {
  const [inputValue, setInputValue] = useState('');
  const [isSystemExpanded, setIsSystemExpanded] = useState(true);
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isProcessing]);

  const handleSend = () => {
    if (inputValue.trim() && !isProcessing) {
      onSendMessage(inputValue);
      setInputValue('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSend();
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  };

  return (
    <div className="chat-area">
      <div className={`system-instructions ${isSystemExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="system-header" onClick={() => setIsSystemExpanded(!isSystemExpanded)}>
          <div className="system-label">
            <FileText size={14} />
            <span>SYSTEM_INSTRUCTIONS.md</span>
          </div>
          {isSystemExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
        {isSystemExpanded && (
          <textarea 
            className="system-textarea"
            value={systemInstruction}
            onChange={(e) => onUpdateSystemInstruction(e.target.value)}
            placeholder="Enter directives for the AI personality..."
          />
        )}
      </div>

      <div className="messages-thread" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Zap size={48} />
            </div>
            <p>Select a provider and initiate neural link</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <MessageBubble key={msg.id || index} message={msg} />
          ))
        )}
        {isProcessing && (
          <div className="loading-indicator">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            Neural link processing...
          </div>
        )}
      </div>

      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <textarea 
            ref={textareaRef}
            className="chat-textarea"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              adjustTextareaHeight();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Enter command or query for the neural network..."
            rows={1}
          />
          <div className="chat-input-actions">
            <div className="input-tools">
              <button className="tool-btn"><Paperclip size={18} /></button>
              <button className="tool-btn"><ImageIcon size={18} /></button>
              <button className="tool-btn"><Mic size={18} /></button>
              <MidChatSwitcher 
                providers={providers} 
                activeProvider={activeProvider} 
                activeModel={activeModel}
                onModelChange={onModelChange}
              />
            </div>
            <button 
              className={`execute-btn cyber-btn ${inputValue.trim() ? 'primary' : ''}`}
              onClick={handleSend}
              disabled={isProcessing || !inputValue.trim()}
            >
              EXECUTE ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
