/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const PROVIDERS = [
  {
    id: 'gemini',
    name: 'Google Gemini',
    color: '#4285F4',
    apiKeyLink: 'https://aistudio.google.com/app/apikey',
    storageKey: 'mw_key_gemini',
    models: [
      { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash' },
      { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash' },
      { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro' }
    ],
    type: 'gemini'
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    color: '#D97757',
    apiKeyLink: 'https://console.anthropic.com/',
    storageKey: 'mw_key_anthropic',
    models: [
      { id: 'claude-3-5-sonnet-20240620', name: 'Claude 3.5 Sonnet' },
      { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus' },
      { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku' }
    ],
    type: 'anthropic'
  },
  {
    id: 'openai',
    name: 'OpenAI',
    color: '#10A37F',
    apiKeyLink: 'https://platform.openai.com/api-keys',
    storageKey: 'mw_key_openai',
    models: [
      { id: 'gpt-4o', name: 'GPT-4o' },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini' },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' }
    ],
    type: 'openai-compatible',
    baseUrl: 'https://api.openai.com/v1/chat/completions'
  },
  {
    id: 'groq',
    name: 'Groq',
    color: '#F55036',
    apiKeyLink: 'https://console.groq.com/keys',
    storageKey: 'mw_key_groq',
    models: [
      { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B' },
      { id: 'gemma2-9b-it', name: 'Gemma 2 9B' },
      { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B' }
    ],
    type: 'openai-compatible',
    baseUrl: 'https://api.groq.com/openai/v1/chat/completions'
  },
  {
    id: 'mistral',
    name: 'Mistral',
    color: '#FDDA24',
    apiKeyLink: 'https://console.mistral.ai/',
    storageKey: 'mw_key_mistral',
    models: [
      { id: 'mistral-large-latest', name: 'Mistral Large' },
      { id: 'mistral-medium-latest', name: 'Mistral Medium' },
      { id: 'open-mistral-7b', name: 'Mistral 7B' }
    ],
    type: 'openai-compatible',
    baseUrl: 'https://api.mistral.ai/v1/chat/completions'
  },
  {
    id: 'cohere',
    name: 'Cohere',
    color: '#3BAA96',
    apiKeyLink: 'https://dashboard.cohere.com/api-keys',
    storageKey: 'mw_key_cohere',
    models: [
      { id: 'command-r-plus', name: 'Command R+' },
      { id: 'command-r', name: 'Command R' }
    ],
    type: 'cohere'
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    color: '#7e22ce',
    apiKeyLink: 'https://openrouter.ai/keys',
    storageKey: 'mw_key_openrouter',
    models: [
      { id: 'meta-llama/llama-3.3-70b-instruct:free', name: 'Llama 3.3 70B (Free)' },
      { id: 'deepseek/deepseek-r1:free', name: 'DeepSeek R1 (Free)' },
      { id: 'google/gemma-2-9b-it:free', name: 'Gemma 2 9B (Free)' },
      { id: 'mistralai/mistral-7b-instruct:free', name: 'Mistral 7B (Free)' }
    ],
    type: 'openai-compatible',
    baseUrl: 'https://openrouter.ai/api/v1/chat/completions',
    extraHeaders: {
      'HTTP-Referer': 'https://maxedwolf.ai',
      'X-Title': 'MaxedWolf AI Studio'
    }
  },
  {
    id: 'cerebras',
    name: 'Cerebras',
    color: '#34d399',
    apiKeyLink: 'https://cloud.cerebras.ai/',
    storageKey: 'mw_key_cerebras',
    models: [
      { id: 'llama3.3-70b', name: 'Llama 3.3 70B' },
      { id: 'qwen3-32b', name: 'Qwen3 32B' }
    ],
    type: 'openai-compatible',
    baseUrl: 'https://api.cerebras.ai/v1/chat/completions'
  },
  {
    id: 'github',
    name: 'GitHub Models',
    color: '#ffffff',
    apiKeyLink: 'https://github.com/settings/tokens',
    storageKey: 'mw_key_github',
    models: [
      { id: 'gpt-4o', name: 'GPT-4o' },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini' },
      { id: 'Llama-3.3-70B-Instruct', name: 'Llama 3.3 70B' },
      { id: 'Grok-3-Mini', name: 'Grok 3 Mini' }
    ],
    type: 'openai-compatible',
    baseUrl: 'https://models.inference.ai.azure.com/chat/completions'
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    color: '#ffbd2e',
    apiKeyLink: 'https://huggingface.co/settings/tokens',
    storageKey: 'mw_key_huggingface',
    models: [
      { id: 'google/gemma-3-27b-it', name: 'Gemma 3 27B' },
      { id: 'meta-llama/Llama-3.3-70B-Instruct', name: 'Llama 3.3 70B' },
      { id: 'mistralai/Mistral-7B-Instruct-v0.3', name: 'Mistral 7B' }
    ],
    type: 'huggingface'
  },
  {
    id: 'together',
    name: 'Together AI',
    color: '#0052cc',
    apiKeyLink: 'https://api.together.xyz/settings/api-keys',
    storageKey: 'mw_key_together',
    models: [
      { id: 'meta-llama/Llama-3.3-70B-Instruct-Turbo', name: 'Llama 3.3 70B' },
      { id: 'google/gemma-2-9b-it', name: 'Gemma 2 9B' },
      { id: 'mistralai/Mistral-7B-Instruct-v0.3', name: 'Mistral 7B' }
    ],
    type: 'openai-compatible',
    baseUrl: 'https://api.together.xyz/v1/chat/completions'
  },
  {
    id: 'xai',
    name: 'xAI Grok',
    color: '#ffffff',
    apiKeyLink: 'https://console.x.ai/',
    storageKey: 'mw_key_xai',
    models: [
      { id: 'grok-3', name: 'Grok 3' },
      { id: 'grok-3-mini', name: 'Grok 3 Mini' }
    ],
    type: 'openai-compatible',
    baseUrl: 'https://api.x.ai/v1/chat/completions'
  },
  {
    id: 'custom',
    name: 'Custom / Self-Hosted',
    color: '#6b7280',
    apiKeyLink: '',
    storageKey: 'mw_key_custom',
    models: [],
    type: 'custom',
    icon: 'wrench'
  }
];
