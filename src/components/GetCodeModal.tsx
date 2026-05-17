/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import './GetCodeModal.css';
import { X, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface GetCodeModalProps {
  onClose: () => void;
  activeProvider: any;
  activeModel: any;
  systemInstruction: string;
  settings: any;
  key?: string;
}

export default function GetCodeModal({ onClose, activeProvider, activeModel, systemInstruction, settings }: GetCodeModalProps) {
  const [activeTab, setActiveTab] = useState('python');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const code = snippets[activeTab];
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const snippets = {
    python: `import requests

url = "${activeProvider?.baseUrl || 'https://generativelanguage.googleapis.com/v1beta/models/' + activeModel?.id + ':generateContent'}"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "model": "${activeModel?.id}",
    "messages": [
        {"role": "system", "content": "${systemInstruction.replace(/"/g, '\\"')}"},
        {"role": "user", "content": "Hello, AI!"}
    ],
    "temperature": ${settings.temperature}
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`,
    javascript: `const fetchData = async () => {
  const response = await fetch("${activeProvider?.baseUrl || 'https://generativelanguage.googleapis.com/v1beta/models/' + activeModel?.id + ':generateContent'}", {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "${activeModel?.id}",
      messages: [
        { role: "system", content: "${systemInstruction.replace(/"/g, '\\"')}" },
        { role: "user", content: "Hello, AI!" }
      ],
      temperature: ${settings.temperature}
    })
  });
  const data = await response.json();
  console.log(data);
};`,
    curl: `curl -X POST "${activeProvider?.baseUrl || 'https://generativelanguage.googleapis.com/v1beta/models/' + activeModel?.id + ':generateContent'}" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${activeModel?.id}",
    "messages": [
      {"role": "system", "content": "${systemInstruction.replace(/'/g, "'\\''")}"},
      {"role": "user", "content": "Hello, AI!"}
    ],
    "temperature": ${settings.temperature}
  }'`
  };

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="modal-content code-modal"
        initial={{ y: 20, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
      >
        <div className="modal-header">
          <h2>NEURAL LINK EXPORT</h2>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="tab-header">
          <button className={activeTab === 'python' ? 'active' : ''} onClick={() => setActiveTab('python')}>Python</button>
          <button className={activeTab === 'javascript' ? 'active' : ''} onClick={() => setActiveTab('javascript')}>JavaScript</button>
          <button className={activeTab === 'curl' ? 'active' : ''} onClick={() => setActiveTab('curl')}>cURL</button>
        </div>

        <div className="code-container">
          <button className="copy-btn" onClick={handleCopy}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
          <pre className="code-block">
            {snippets[activeTab]}
          </pre>
        </div>
      </motion.div>
    </motion.div>
  );
}
