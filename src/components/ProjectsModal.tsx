/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import './ProjectsModal.css';
import { X, Save, Trash2, FolderOpen, Search } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectsModalProps {
  projects: any[];
  onSaveProject: (name: string) => void;
  onLoadProject: (project: any) => void;
  onDeleteProject: (id: string | number) => void;
  onClose: () => void;
  key?: string;
}

export default function ProjectsModal({ projects, onSaveProject, onLoadProject, onDeleteProject, onClose }: ProjectsModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [newProjectName, setNewProjectName] = useState('');

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="modal-content projects-modal"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
      >
        <div className="modal-header">
          <div className="title-group">
            <h2>Neural Archives</h2>
            <p>Manage and restore saved neural link projects</p>
          </div>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="save-project-area">
          <input 
            type="text" 
            placeholder="Archive name..." 
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <button className="cyber-btn primary" onClick={() => {
            if (newProjectName.trim()) {
              onSaveProject(newProjectName);
              setNewProjectName('');
            }
          }}>
            <Save size={16} />
            ARCHIVE CURRENT LINK
          </button>
        </div>

        <div className="search-projects">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search archives..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="projects-list">
          {filteredProjects.length === 0 ? (
            <div className="empty-projects">No archived links found.</div>
          ) : (
            filteredProjects.map(p => (
              <div key={p.id} className="project-item" onClick={() => { onLoadProject(p); onClose(); }}>
                <div className="project-info">
                  <div className="project-name">{p.name}</div>
                  <div className="project-meta">
                    {p.providerName} • {p.modelName} • {p.messageCount} messages • {new Date(p.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="project-actions">
                  <button className="delete-btn" onClick={(e) => {
                    e.stopPropagation();
                    onDeleteProject(p.id);
                  }}>
                    <Trash2 size={16} />
                  </button>
                  <FolderOpen size={16} className="open-icon" />
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
