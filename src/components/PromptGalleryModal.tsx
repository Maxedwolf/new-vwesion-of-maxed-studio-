/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import './PromptGalleryModal.css';
import { X, Search, Terminal, PenTool, Briefcase, Database, GraduationCap, UserCircle } from 'lucide-react';
import { motion } from 'motion/react';

const CATEGORIES = [
  { id: 'coding', name: 'CODING', icon: <Database size={16} />, color: '#00ffff' },
  { id: 'writing', name: 'WRITING', icon: <PenTool size={16} />, color: '#bf00ff' },
  { id: 'business', name: 'BUSINESS', icon: <Briefcase size={16} />, color: '#00ff9f' },
  { id: 'data', name: 'DATA', icon: <Terminal size={16} />, color: '#ffbd2e' },
  { id: 'education', name: 'EDUCATION', icon: <GraduationCap size={16} />, color: '#4285F4' },
  { id: 'personal', name: 'PERSONAL', icon: <UserCircle size={16} />, color: '#ff003c' }
];

const TEMPLATES = [
  { category: 'coding', title: 'Code Reviewer', desc: 'Expert technical audit of source code with focus on security and efficiency.', prompt: 'You are a Senior Security Engineer. Review the following code for vulnerabilities, performance bottlenecks, and architectural flaws.' },
  { category: 'coding', title: 'Debugging Assistant', desc: 'Locate bugs in complex systems and provide remedial directives.', prompt: 'You are a Debugger AI. Analyze the error logs and code provided to find the root cause and provide a fix.' },
  { category: 'writing', title: 'Creative Writer', desc: 'Synthesize narrative strings and atmospheric descriptions.', prompt: 'You are a Sci-Fi Author. Help me expand this story beat into a vivid, atmospheric scene.' },
  { category: 'business', title: 'Customer Support', desc: 'Handle incoming neural queries with professional empathy.', prompt: 'You are an Elite Support Interface. Respond to this customer inquiry with clarity, empathy, and solution-oriented steps.' },
  { category: 'data', title: 'SQL Assistant', desc: 'Construct optimized query strings for relational databases.', prompt: 'You are a Database Architect. Convert this request into a highly optimized PostgreSQL query.' },
  { category: 'education', title: 'Tutor', desc: 'Personalized knowledge transfer across multiple disciplines.', prompt: 'You are a Socratic Tutor. Guide me through understanding this complex topic by asking probing questions.' }
];

interface PromptGalleryModalProps {
  onApply: (prompt: string) => void;
  onClose: () => void;
  key?: string;
}

export default function PromptGalleryModal({ onApply, onClose }: PromptGalleryModalProps) {
  return (
    <motion.div 
      className="modal-overlay full-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="modal-content gallery-modal"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
      >
        <div className="gallery-header">
          <div className="title-area">
            <h1>NEURAL TEMPLATE LIBRARY</h1>
            <p>Deploy specialized system instructions for the active model</p>
          </div>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        <div className="gallery-controls">
          <div className="search-bar">
            <Search size={18} />
            <input type="text" placeholder="Search templates..." />
          </div>
          <div className="category-filters">
            {CATEGORIES.map(cat => (
              <button key={cat.id} className="cat-btn" style={{ '--cat-color': cat.color }}>
                {cat.icon}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="gallery-grid">
          {TEMPLATES.map((tmpl, i) => (
            <motion.div 
              key={i} 
              className="template-card"
              whileHover={{ y: -5, borderColor: '#00ffff' }}
              onClick={() => { onApply(tmpl.prompt); onClose(); }}
            >
              <div className="card-cat" style={{ color: CATEGORIES.find(c => c.id === tmpl.category).color }}>
                {tmpl.category.toUpperCase()}
              </div>
              <h3>{tmpl.title}</h3>
              <p>{tmpl.desc}</p>
              <div className="card-footer">
                <span className="prompt-preview">{tmpl.prompt.substring(0, 40)}...</span>
                <button className="apply-btn">DEPLOY</button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
