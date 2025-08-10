import { Env, ChatResponse } from '../types'

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      role: string
      content: string
    }
  }>
}

export class OpenAIService {
  private apiKey: string

  constructor(env: Env) {
    this.apiKey = env.OPENAI_API_KEY
  }

  async sendMessage(message: string, conversationHistory: Array<{ role: string, content: string }> = []): Promise<ChatResponse> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured')
    }

    const messages: OpenAIMessage[] = [
      {
        role: 'system',
        content: 'You are a helpful AI assistant. Provide helpful, accurate, and engaging responses. You can use markdown formatting in your responses.'
      },
      ...conversationHistory.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ]

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages,
          max_tokens: 1000,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(`OpenAI API error: ${response.status} ${errorData}`)
      }

      const data: OpenAIResponse = await response.json()
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response from OpenAI')
      }

      const assistantMessage = data.choices[0].message.content

      return {
        id: `ai_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        message: assistantMessage
      }
    } catch (error) {
      console.error('OpenAI API error:', error)
      throw new Error('Failed to get response from AI service')
    }
  }
}
