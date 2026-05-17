/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const STORAGE_KEYS = {
  KEY_PREFIX: 'mw_key_',
  SETTINGS: 'mw_settings',
  SYSTEM_PROMPT: 'mw_system_prompt',
  CHATS: 'mw_chats',
  PROJECTS: 'mw_projects',
  THEME: 'mw_theme',
  BG_IMAGE: 'mw_bg_image',
  BG_OPACITY: 'mw_bg_opacity'
};

export const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = (key, defaultValue = null) => {
  const stored = localStorage.getItem(key);
  if (!stored) return defaultValue;
  try {
    return JSON.parse(stored);
  } catch (e) {
    return defaultValue;
  }
};

export const deleteFromStorage = (key) => {
  localStorage.removeItem(key);
};

export const saveApiKey = (providerId, key) => {
  localStorage.setItem(STORAGE_KEYS.KEY_PREFIX + providerId, key);
};

export const getApiKey = (providerId) => {
  return localStorage.getItem(STORAGE_KEYS.KEY_PREFIX + providerId);
};

export const removeApiKey = (providerId) => {
  localStorage.removeItem(STORAGE_KEYS.KEY_PREFIX + providerId);
};
