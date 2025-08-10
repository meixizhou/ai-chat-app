import { useState, useCallback } from 'react'
import { useMutation } from '@apollo/client'
import { SEND_MESSAGE } from '@/services/graphql'
import { Message, SendMessageInput, ChatResponse } from '@/types'

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const [sendMessageMutation] = useMutation<
    { sendMessage: ChatResponse },
    { input: SendMessageInput }
  >(SEND_MESSAGE)

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      content: content.trim(),
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const { data } = await sendMessageMutation({
        variables: {
          input: {
            message: content.trim()
          }
        }
      })

      if (data?.sendMessage) {
        const assistantMessage: Message = {
          id: data.sendMessage.id,
          content: data.sendMessage.message,
          role: 'assistant',
          timestamp: new Date()
        }

        setMessages(prev => [...prev, assistantMessage])
      }
    } catch (error) {
      console.error('Error sending message:', error)
      
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        content: 'Sorry, I encountered an error while processing your message. Please try again.',
        role: 'assistant',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [sendMessageMutation])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages
  }
}
