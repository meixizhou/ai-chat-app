import { makeExecutableSchema } from '@graphql-tools/schema'
import { Env, SendMessageInput, ChatResponse } from '../types'
import { OpenAIService } from '../services/openai'

// GraphQL Type Definitions
const typeDefs = `
  type Message {
    id: String!
    content: String!
    role: String!
    timestamp: String!
  }

  type Conversation {
    id: String!
    messages: [Message!]!
    createdAt: String!
    updatedAt: String!
  }

  type ChatResponse {
    id: String!
    message: String!
  }

  input SendMessageInput {
    message: String!
    conversationId: String
  }

  type Query {
    conversation(id: String!): Conversation
    conversations: [Conversation!]!
  }

  type Mutation {
    sendMessage(input: SendMessageInput!): ChatResponse!
    createConversation: Conversation!
  }
`

// GraphQL Resolvers
const createResolvers = (env: Env) => {
  const openaiService = new OpenAIService(env)

  return {
    Query: {
      conversation: async (_: any, { id }: { id: string }) => {
        // In a real app, you'd fetch from a database
        // For now, return a mock conversation
        return {
          id,
          messages: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      },
      conversations: async () => {
        // In a real app, you'd fetch from a database
        return []
      }
    },
    Mutation: {
      sendMessage: async (_: any, { input }: { input: SendMessageInput }): Promise<ChatResponse> => {
        try {
          const response = await openaiService.sendMessage(input.message)
          return response
        } catch (error) {
          console.error('Error in sendMessage resolver:', error)
          throw new Error('Failed to process message')
        }
      },
      createConversation: async () => {
        // In a real app, you'd create in a database
        return {
          id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          messages: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }
    }
  }
}

export const createSchema = (env: Env) => {
  return makeExecutableSchema({
    typeDefs,
    resolvers: createResolvers(env)
  })
}
