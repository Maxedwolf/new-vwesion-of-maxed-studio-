/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import './ApiKeyModal.css';
import { X, Eye, EyeOff, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ApiKeyModalProps {
  provider: any;
  onSave: (key: any) => void;
  onRemove: () => void;
  onClose: () => void;
  currentKey: any;
  key?: string;
}

export default function ApiKeyModal({ provider, onSave, onRemove, onClose, currentKey }: ApiKeyModalProps) {
  const [key, setKey] = useState(currentKey || '');
  const [showKey, setShowKey] = useState(false);
  
  // Custom provider fields
  const [customEndpoint, setCustomEndpoint] = useState(currentKey?.endpoint || '');
  const [customKey, setCustomKey] = useState(currentKey?.key || '');
  const [customModel, setCustomModel] = useState(currentKey?.model || '');

  const handleSave = () => {
    if (provider.id === 'custom') {
      onSave({ endpoint: customEndpoint, key: customKey, model: customModel });
    } else {
      onSave(key);
    }
    onClose();
  };

  const isCustom = provider.id === 'custom';

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="modal-content key-modal"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
      >
        <div className="modal-header">
          <div className="title-group">
            <h2>Configure {provider.name}</h2>
            <p>Your key is stored locally and never leaves your browser</p>
          </div>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="modal-body">
          {isCustom ? (
            <div className="custom-fields">
              <div className="input-group">
                <label>Endpoint URL</label>
                <input 
                  type="text" 
                  value={customEndpoint} 
                  onChange={(e) => setCustomEndpoint(e.target.value)}
                  placeholder="e.g. http://localhost:11434/v1/chat/completions"
                />
              </div>
              <div className="input-group">
                <label>API Key (Optional)</label>
                <input 
                  type="password" 
                  value={customKey} 
                  onChange={(e) => setCustomKey(e.target.value)}
                  placeholder="Enter key if required"
                />
              </div>
              <div className="input-group">
                <label>Model Name</label>
                <input 
                  type="text" 
                  value={customModel} 
                  onChange={(e) => setCustomModel(e.target.value)}
                  placeholder="e.g. llama3"
                />
              </div>
              <p className="helper-text">Compatible with Ollama, HuggingFace Spaces, or any OpenAI-compatible endpoint</p>
            </div>
          ) : (
            <div className="standard-key-input">
              <div className="input-with-icon">
                <input 
                  type={showKey ? "text" : "password"} 
                  value={key} 
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Enter your API Key"
                />
                <button 
                  className="eye-btn" 
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {provider.apiKeyLink && (
                <a href={provider.apiKeyLink} target="_blank" rel="noopener noreferrer" className="key-link">
                  Get API Key <ExternalLink size={12} />
                </a>
              )}
            </div>
          )}

          <div className="security-notice">
            <ShieldCheck size={16} />
            <span>Local Encryption Active</span>
          </div>
        </div>

        <div className="modal-footer">
          {currentKey && (
            <button className="cyber-btn danger" onClick={() => { onRemove(); onClose(); }}>
              Remove Key
            </button>
          )}
          <button className="cyber-btn primary" onClick={handleSave}>
            Save Configuration
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
