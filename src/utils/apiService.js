/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { generateGeminiResponse } from './geminiApi';

export const callAIProvider = async (provider, params) => {
  const { 
    model, 
    apiKey, 
    prompt, 
    history = [], 
    systemInstruction = '', 
    temperature = 0.7, 
    maxTokens = 1024, 
    topP = 0.95 
  } = params;

  if (provider.type === 'gemini') {
    return generateGeminiResponse(params);
  }

  try {
    let url = '';
    let headers = {
      'Content-Type': 'application/json'
    };
    let body = {};

    if (provider.type === 'openai-compatible' || provider.type === 'custom') {
      url = provider.type === 'custom' ? params.customEndpoint : provider.baseUrl;
      headers['Authorization'] = `Bearer ${apiKey}`;
      
      // Merge extra headers if any (like for OpenRouter)
      if (provider.extraHeaders) {
        headers = { ...headers, ...provider.extraHeaders };
      }

      const messages = history.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.parts[0].text
      }));

      if (systemInstruction) {
        messages.unshift({ role: 'system', content: systemInstruction });
      }

      messages.push({ role: 'user', content: prompt });

      body = {
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
        top_p: topP
      };
    } 
    else if (provider.type === 'anthropic') {
      url = 'https://api.anthropic.com/v1/messages';
      headers = {
        ...headers,
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'dangerously-allow-browser': 'true' // Some SDKs or proxies need this, though fetch doesn't respect it, Antropic might block browser fetch
      };

      const messages = history.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.parts[0].text
      }));
      messages.push({ role: 'user', content: prompt });

      body = {
        model,
        max_tokens: maxTokens,
        system: systemInstruction,
        messages,
        temperature
      };
    }
    else if (provider.type === 'cohere') {
      url = 'https://api.cohere.ai/v2/chat';
      headers['Authorization'] = `Bearer ${apiKey}`;
      
      const messages = history.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.parts[0].text
      }));
      messages.push({ role: 'user', content: prompt });

      body = {
        model,
        messages
      };
    }
    else if (provider.type === 'huggingface') {
      url = `https://router.huggingface.co/hf-inference/models/${model}/v1/chat/completions`;
      headers['Authorization'] = `Bearer ${apiKey}`;
      
      const messages = history.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.parts[0].text
      }));

      if (systemInstruction) {
        messages.unshift({ role: 'system', content: systemInstruction });
      }
      messages.push({ role: 'user', content: prompt });

      body = {
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
        top_p: topP
      };
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract text based on provider response format
    if (provider.type === 'openai-compatible' || provider.type === 'huggingface' || provider.type === 'custom') {
      return data.choices[0].message.content;
    } else if (provider.type === 'anthropic') {
      return data.content[0].text;
    } else if (provider.type === 'cohere') {
      return data.message.content[0].text;
    }

    return "No valid response format found.";
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error('CORS Error: This API blocks direct browser calls. Try a different provider.');
    }
    throw error;
  }
};
