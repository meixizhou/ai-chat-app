import { gql } from '@apollo/client'

export const SEND_MESSAGE = gql`
  mutation SendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      id
      message
    }
  }
`

export const GET_CONVERSATION_HISTORY = gql`
  query GetConversationHistory($conversationId: String!) {
    conversation(id: $conversationId) {
      id
      messages {
        id
        content
        role
        timestamp
      }
    }
  }
`

export const CREATE_CONVERSATION = gql`
  mutation CreateConversation {
    createConversation {
      id
    }
  }
`
