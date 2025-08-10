export interface Env {
  OPENAI_API_KEY: string
  ALLOWED_ORIGINS?: string
}

export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: string
}

export interface Conversation {
  id: string
  messages: Message[]
  createdAt: string
  updatedAt: string
}

export interface SendMessageInput {
  message: string
  conversationId?: string
}

export interface ChatResponse {
  id: string
  message: string
}
