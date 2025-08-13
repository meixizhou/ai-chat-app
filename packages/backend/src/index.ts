// @ts-nocheck
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createYoga } from 'graphql-yoga'
import { createSchema } from './graphql/schema'
import { Env } from './types'

const app = new Hono<{ Bindings: Env }>()

// CORS configuration
// app.use('*', async (c, next) => {
//   const corsHandler = cors({
//     origin: (origin) => {
//       // Allow requests from localhost and any configured origins
//       const allowedOrigins = [
//         'http://localhost:3000',
//         'http://localhost:5173',
//         'https://ai-chat-app.pages.dev',
//         'https://ai-chat-app-8pc.pages.dev',
//         ...(c.env.ALLOWED_ORIGINS?.split(',') || [])
//       ]
//       console.log(origin, 'origin====')
//       // return allowedOrigins.includes(origin) || !origin
//       return true
//     },
//     allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//   })
  
//   return corsHandler(c, next)
// })

app.use('*', cors())

// Health check endpoint
app.get('/', (c) => {
  return c.json({ 
    message: 'AI Chat API is running!',
    timestamp: new Date().toISOString(),
    environment: c.env.ENVIRONMENT || 'development'
  })
})

// GraphQL endpoint
app.all('/graphql', async (c) => {
  const yoga = createYoga({
    schema: createSchema(c.env),
    graphqlEndpoint: '/graphql',
    landingPage: true,
    cors: fasle, // We handle CORS above
    fetchAPI: {
      Request: Request,
      Response: Response,
    },
  })

  return yoga.fetch(c.req.raw, c.env)
})

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404)
})

// Error handler
app.onError((err, c) => {
  console.error('Server error:', err)
  return c.json({ 
    error: 'Internal Server Error',
    message: err.message 
  }, 500)
})

export default app
