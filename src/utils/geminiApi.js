/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const generateGeminiResponse = async ({
  model,
  apiKey,
  prompt,
  history = [],
  systemInstruction = '',
  temperature = 0.7,
  maxTokens = 1024,
  topP = 0.95
}) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  
  const contents = [...history];
  contents.push({
    role: "user",
    parts: [{ text: prompt }]
  });

  const body = {
    contents,
    generationConfig: {
      temperature,
      maxOutputTokens: maxTokens,
      topP
    }
  };

  if (systemInstruction) {
    body.system_instruction = {
      parts: [{ text: systemInstruction }]
    };
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Gemini API Error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('No response from Gemini neural network.');
    }
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error('CORS Error: This API blocks direct browser calls. Try a different provider.');
    }
    throw error;
  }
};
