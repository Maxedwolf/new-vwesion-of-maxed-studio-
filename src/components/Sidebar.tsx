/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import './Sidebar.css';
import { Zap, Plus, History, Settings, Trash2, ChevronLeft, ChevronRight, Wrench, Folder } from 'lucide-react';

interface SidebarProps {
  providers: any[];
  activeProvider: any;
  setActiveProvider: (p: any) => void;
  onNewChat: () => void;
  recentChats: any[];
  onLoadChat: (chat: any) => void;
  onDeleteChat: (id: string | number) => void;
  onOpenProjects: () => void;
  onOpenSettings: () => void;
  onToggleCollapse: () => void;
  isCollapsed: boolean;
  savedKeys: Record<string, string>;
}

export default function Sidebar({ 
  providers, 
  activeProvider, 
  setActiveProvider, 
  onNewChat, 
  recentChats, 
  onLoadChat, 
  onDeleteChat,
  onOpenProjects,
  onOpenSettings,
  onToggleCollapse,
  isCollapsed,
  savedKeys
}: SidebarProps) {
  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="brand">
          <Zap className="brand-icon" size={28} fill="currentColor" />
          {!isCollapsed && (
            <div className="brand-text">
              <div className="brand-main">MAXEDWOLF</div>
              <div className="brand-sub">AI STUDIO</div>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <button className="collapse-toggle" onClick={onToggleCollapse}>
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      <div className="sidebar-content">
        <button className="new-chat-btn cyber-btn primary" onClick={onNewChat}>
          <Plus size={18} />
          {!isCollapsed && <span>NEW NEURAL LINK +</span>}
        </button>

        <div className="section-label">PROVIDERS</div>
        <div className="providers-list">
          {providers.map(p => {
            const hasKey = !!savedKeys[p.id];
            const isActive = activeProvider?.id === p.id;
            return (
              <div 
                key={p.id} 
                className={`provider-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveProvider(p)}
              >
                <div className="provider-info">
                  {p.icon === 'wrench' ? (
                    <Wrench size={16} />
                  ) : (
                    <div 
                      className="status-dot" 
                      style={{ backgroundColor: hasKey ? p.color : '#333' }}
                    />
                  )}
                  {!isCollapsed && <span className="provider-name">{p.name}</span>}
                </div>
                {!isCollapsed && hasKey && (
                  <div className="key-active-indicator" style={{ backgroundColor: p.color }} />
                )}
              </div>
            );
          })}
        </div>

        <div className="section-label">RECENT CHATS</div>
        <div className="chats-list">
          {recentChats.map(chat => (
            <div key={chat.id} className="chat-item" onClick={() => onLoadChat(chat)}>
              <div className="chat-details">
                <div className="chat-title">{chat.title}</div>
                <div className="chat-meta">{chat.providerName} • {new Date(chat.timestamp).toLocaleTimeString()}</div>
              </div>
              <button 
                className="delete-chat-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(chat.id);
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="footer-item" onClick={onOpenProjects}>
          <Folder size={18} />
          {!isCollapsed && <span>Projects</span>}
        </div>
        <div className="footer-item" onClick={() => {
           window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
           // If on mobile/small screen, settings is in right panel, but user says scrolls to run settings
           onOpenSettings(); 
        }}>
          <Settings size={18} />
          {!isCollapsed && <span>Settings</span>}
        </div>
      </div>
    </aside>
  );
}
