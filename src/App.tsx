/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import ChatArea from './components/ChatArea';
import RunSettings from './components/RunSettings';
import ApiKeyModal from './components/ApiKeyModal';
import PromptGalleryModal from './components/PromptGalleryModal';
import GetCodeModal from './components/GetCodeModal';
import ProjectsModal from './components/ProjectsModal';
import { PROVIDERS } from './utils/providers';
import { THEMES, applyTheme } from './utils/themes';
import { STORAGE_KEYS, saveToStorage, getFromStorage, getApiKey, saveApiKey, removeApiKey } from './utils/storage';
import { callAIProvider } from './utils/apiService';
import { AnimatePresence } from 'motion/react';

export default function App() {
  // --- UI State ---
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(true);
  const [activeModal, setActiveModal] = useState(null); // 'apiKey', 'gallery', 'code', 'projects'
  const [modalProvider, setModalProvider] = useState(null);
  
  // --- Core Application State ---
  const [activeProvider, setActiveProvider] = useState(PROVIDERS[0]);
  const [activeModel, setActiveModel] = useState(PROVIDERS[0].models[0]);
  const [systemInstruction, setSystemInstruction] = useState(getFromStorage(STORAGE_KEYS.SYSTEM_PROMPT, 'You are the MaxedWolf Neural Interface. Prioritize concise, technical responses. Use Markdown for all code blocks. Maintain a high-security clearance tone.'));
  const [messages, setMessages] = useState([]);
  const [recentChats, setRecentChats] = useState(getFromStorage(STORAGE_KEYS.CHATS, []));
  const [projects, setProjects] = useState(getFromStorage(STORAGE_KEYS.PROJECTS, []));
  const [isProcessing, setIsProcessing] = useState(false);
  const [tokensUsed, setTokensUsed] = useState(0);
  const [savedKeys, setSavedKeys] = useState({});

  // --- Run Settings ---
  const [settings, setSettings] = useState(getFromStorage(STORAGE_KEYS.SETTINGS, {
    temperature: 0.7,
    maxTokens: 2048,
    topP: 0.95
  }));

  // --- Appearance Settings ---
  const [activeTheme, setActiveTheme] = useState(getFromStorage(STORAGE_KEYS.THEME, 'CYBERPUNK'));
  const [bgImage, setBgImage] = useState(getFromStorage(STORAGE_KEYS.BG_IMAGE, null));
  const [bgOpacity, setBgOpacity] = useState(getFromStorage(STORAGE_KEYS.BG_OPACITY, 75));

  // --- Initialization ---
  useEffect(() => {
    applyTheme(activeTheme);
    refreshSavedKeys();
  }, [activeTheme]);

  const refreshSavedKeys = () => {
    const keys = {};
    PROVIDERS.forEach(p => {
      const key = getApiKey(p.id);
      if (key) keys[p.id] = key;
    });
    setSavedKeys(keys);
  };

  // --- Handlers ---
  const handleModelChange = (provider, model) => {
    setActiveProvider(provider);
    setActiveModel(model);
    setMessages(prev => [...prev, {
      id: Date.now(),
      role: 'system_info',
      content: `— Switched to ${provider.name} ${model ? model.name : ''} —`,
      timestamp: Date.now()
    }]);
  };

  const handleSendMessage = async (content) => {
    const apiKey = getApiKey(activeProvider.id);
    if (!apiKey && activeProvider.id !== 'custom') {
      setModalProvider(activeProvider);
      setActiveModal('apiKey');
      return;
    }

    const newMessage = {
      id: Date.now(),
      role: 'user',
      content,
      timestamp: Date.now()
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setIsProcessing(true);

    try {
      // Filter out system_info messages for context
      const history = updatedMessages
        .filter(m => m.role !== 'system_info' && m.role !== 'system_instruction')
        .slice(-10) // Keep last 10 messages for context
        .map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        }));

      // History for non-Gemini providers might need slight adjustment in callAIProvider
      const lastUserPrompt = content;
      const historyForCall = history.slice(0, -1); // Remove current message as it's passed as prompt

      const responseText = await callAIProvider(activeProvider, {
        model: activeModel.id,
        apiKey: activeProvider.id === 'custom' ? JSON.parse(apiKey || '{}').key : apiKey,
        customEndpoint: activeProvider.id === 'custom' ? JSON.parse(apiKey || '{}').endpoint : null,
        prompt: lastUserPrompt,
        history: historyForCall,
        systemInstruction,
        ...settings
      });

      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: responseText,
        provider: activeProvider.id.toUpperCase(),
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setTokensUsed(prev => prev + content.length / 4 + responseText.length / 4); // Very rough estimate
      
      // Update recent chats
      const chatTitle = content.substring(0, 30) + (content.length > 30 ? '...' : '');
      const currentChat = {
        id: messages[0]?.chatId || Date.now(),
        title: chatTitle,
        timestamp: Date.now(),
        providerName: activeProvider.name,
        messages: [...updatedMessages, assistantMessage],
        systemInstruction,
        settings
      };

      const newRecent = [currentChat, ...recentChats.filter(c => c.id !== currentChat.id)].slice(0, 20);
      setRecentChats(newRecent);
      saveToStorage(STORAGE_KEYS.CHATS, newRecent);

    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: `ERROR: ${error.message}`,
        provider: 'SYSTEM',
        timestamp: Date.now()
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const saveCurrentAsProject = (name) => {
    const project = {
      id: Date.now(),
      name,
      date: Date.now(),
      providerId: activeProvider.id,
      providerName: activeProvider.name,
      modelId: activeModel.id,
      modelName: activeModel?.name,
      messageCount: messages.length,
      messages,
      systemInstruction,
      settings
    };
    const newProjects = [project, ...projects].slice(0, 50);
    setProjects(newProjects);
    saveToStorage(STORAGE_KEYS.PROJECTS, newProjects);
  };

  const loadProject = (project) => {
    setMessages(project.messages);
    const p = PROVIDERS.find(prov => prov.id === project.providerId);
    if (p) {
      setActiveProvider(p);
      const m = p.models.find(mod => mod.id === project.modelId);
      if (m) setActiveModel(m);
    }
    setSystemInstruction(project.systemInstruction || '');
    setSettings(project.settings || { temperature: 0.7, maxTokens: 2048, topP: 0.95 });
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="app-container" style={{ position: 'relative' }}>
      <div className="scan-lines"></div>
      
      {bgImage && (
        <div 
          className="background-overlay" 
          style={{ 
            backgroundImage: `url(${bgImage})`,
            filter: `brightness(${100 - bgOpacity}%)`
          }}
        />
      )}

      <Sidebar 
        providers={PROVIDERS}
        activeProvider={activeProvider}
        setActiveProvider={(p) => {
          setModalProvider(p);
          setActiveModal('apiKey');
        }}
        onNewChat={clearChat}
        recentChats={recentChats}
        onLoadChat={(chat) => {
          setMessages(chat.messages);
          setSystemInstruction(chat.systemInstruction || '');
          setSettings(chat.settings || settings);
        }}
        onDeleteChat={(id) => {
          const filtered = recentChats.filter(c => c.id !== id);
          setRecentChats(filtered);
          saveToStorage(STORAGE_KEYS.CHATS, filtered);
        }}
        onOpenProjects={() => setActiveModal('projects')}
        onOpenSettings={() => setIsRightPanelVisible(true)}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isCollapsed={isSidebarCollapsed}
        savedKeys={savedKeys}
      />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar 
          activeProvider={activeProvider}
          activeModel={activeModel}
          onModelSelect={handleModelChange}
          tokensUsed={tokensUsed}
          onOpenLibrary={() => setActiveModal('gallery')}
          onOpenCode={() => setActiveModal('code')}
          onExport={(format) => {
            const content = messages.map(m => `${m.role}: ${m.content}`).join('\n\n');
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `maxedwolf-export.${format}`;
            a.click();
          }}
          onNewChat={clearChat}
          onToggleSettings={() => setIsRightPanelVisible(!isRightPanelVisible)}
        />

        <ChatArea 
          messages={messages}
          onSendMessage={handleSendMessage}
          systemInstruction={systemInstruction}
          onUpdateSystemInstruction={(val) => {
            setSystemInstruction(val);
            saveToStorage(STORAGE_KEYS.SYSTEM_PROMPT, val);
          }}
          isProcessing={isProcessing}
          activeProvider={activeProvider}
          activeModel={activeModel}
          onModelChange={handleModelChange}
          providers={PROVIDERS}
        />
      </main>

      <RunSettings 
        isVisible={isRightPanelVisible}
        settings={settings}
        onUpdateSettings={(newSet) => {
          const updated = { ...settings, ...newSet };
          setSettings(updated);
          saveToStorage(STORAGE_KEYS.SETTINGS, updated);
        }}
        onResetSettings={() => {
          const def = { temperature: 0.7, maxTokens: 2048, topP: 0.95 };
          setSettings(def);
          saveToStorage(STORAGE_KEYS.SETTINGS, def);
        }}
        activeTheme={activeTheme}
        onThemeChange={(t) => {
          setActiveTheme(t);
          saveToStorage(STORAGE_KEYS.THEME, t);
        }}
        bgImage={bgImage}
        onBgUpload={(img) => {
          setBgImage(img);
          saveToStorage(STORAGE_KEYS.BG_IMAGE, img);
        }}
        onBgRemove={() => {
          setBgImage(null);
          saveToStorage(STORAGE_KEYS.BG_IMAGE, null);
        }}
        bgOpacity={bgOpacity}
        onOpacityChange={(op) => {
          setBgOpacity(op);
          saveToStorage(STORAGE_KEYS.BG_OPACITY, op);
        }}
      />

      <AnimatePresence>
        {activeModal === 'apiKey' && (
          <ApiKeyModal 
            key="apiKey"
            provider={modalProvider}
            currentKey={getApiKey(modalProvider.id)}
            onSave={(key) => {
              if (modalProvider.id === 'custom') {
                saveApiKey(modalProvider.id, JSON.stringify(key));
              } else {
                saveApiKey(modalProvider.id, key);
              }
              refreshSavedKeys();
              setActiveProvider(modalProvider);
              if (modalProvider.models.length > 0) setActiveModel(modalProvider.models[0]);
            }}
            onRemove={() => {
              removeApiKey(modalProvider.id);
              refreshSavedKeys();
            }}
            onClose={() => setActiveModal(null)}
          />
        )}

        {activeModal === 'gallery' && (
          <PromptGalleryModal 
            key="gallery"
            onApply={(prompt) => {
              setSystemInstruction(prompt);
              saveToStorage(STORAGE_KEYS.SYSTEM_PROMPT, prompt);
            }}
            onClose={() => setActiveModal(null)}
          />
        )}

        {activeModal === 'code' && (
          <GetCodeModal 
            key="code"
            onClose={() => setActiveModal(null)}
            activeProvider={activeProvider}
            activeModel={activeModel}
            systemInstruction={systemInstruction}
            settings={settings}
          />
        )}

        {activeModal === 'projects' && (
          <ProjectsModal 
            key="projects"
            projects={projects}
            onSaveProject={saveCurrentAsProject}
            onLoadProject={loadProject}
            onDeleteProject={(id) => {
              const filtered = projects.filter(p => p.id !== id);
              setProjects(filtered);
              saveToStorage(STORAGE_KEYS.PROJECTS, filtered);
            }}
            onClose={() => setActiveModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
