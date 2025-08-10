# 开发指南

## 🏗️ 项目架构

### 技术栈概览

#### 前端 (packages/frontend)
- **React 18** - 用户界面库
- **TypeScript** - 类型安全
- **Vite** - 构建工具和开发服务器
- **Tailwind CSS** - 样式框架
- **Apollo Client** - GraphQL客户端
- **React Query** - 数据获取和缓存
- **react-markdown** - Markdown渲染
- **Lucide React** - 图标库

#### 后端 (packages/backend)
- **Cloudflare Workers** - 边缘计算运行时
- **Hono.js** - 轻量级Web框架
- **GraphQL Yoga** - GraphQL服务器
- **TypeScript** - 类型安全
- **OpenAI API** - AI对话服务

### 目录结构详解

```
ai-chat-app/
├── packages/
│   ├── frontend/              # React前端应用
│   │   ├── src/
│   │   │   ├── components/    # React组件
│   │   │   │   ├── Message.tsx        # 消息组件
│   │   │   │   └── ChatInput.tsx      # 输入组件
│   │   │   ├── hooks/         # 自定义React Hooks
│   │   │   │   └── useChat.ts         # 聊天逻辑Hook
│   │   │   ├── services/      # API和服务层
│   │   │   │   ├── apollo-client.ts   # GraphQL客户端配置
│   │   │   │   └── graphql.ts         # GraphQL查询和变更
│   │   │   ├── types/         # TypeScript类型定义
│   │   │   ├── App.tsx        # 主应用组件
│   │   │   ├── main.tsx       # 应用入口点
│   │   │   └── index.css      # 全局样式
│   │   ├── public/            # 静态资源
│   │   ├── index.html         # HTML模板
│   │   ├── package.json       # 前端依赖
│   │   ├── vite.config.ts     # Vite配置
│   │   ├── tailwind.config.js # Tailwind配置
│   │   └── tsconfig.json      # TypeScript配置
│   └── backend/               # Cloudflare Workers后端
│       ├── src/
│       │   ├── graphql/       # GraphQL相关
│       │   │   └── schema.ts          # Schema和Resolvers
│       │   ├── services/      # 业务逻辑服务
│       │   │   └── openai.ts          # OpenAI API集成
│       │   ├── types/         # TypeScript类型
│       │   └── index.ts       # Worker入口点
│       ├── wrangler.toml      # Cloudflare配置
│       ├── package.json       # 后端依赖
│       └── tsconfig.json      # TypeScript配置
├── package.json               # 根package.json (workspaces)
├── README.md                  # 项目说明
├── DEPLOYMENT.md              # 部署指南
├── DEVELOPMENT.md             # 开发指南 (本文件)
└── .gitignore                 # Git忽略文件
```

## 🚀 开发环境搭建

### 1. 前置要求
- Node.js 18+ 
- npm 或 yarn
- Git
- 现代浏览器 (Chrome, Firefox, Safari, Edge)

### 2. 克隆和安装

```bash
# 克隆仓库
git clone https://github.com/meixizhou/ai-chat-app.git
cd ai-chat-app

# 安装依赖 (使用npm workspaces)
npm install
```

### 3. 环境变量配置

#### 前端环境变量
```bash
cd packages/frontend
cp .env.example .env
```

编辑 `.env` 文件：
```env
VITE_GRAPHQL_ENDPOINT=http://localhost:8787/graphql
```

#### 后端环境变量
```bash
cd packages/backend
cp .env.example .env
```

编辑 `.env` 文件：
```env
OPENAI_API_KEY=your_openai_api_key_here
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 4. 启动开发服务器

#### 方式一：分别启动（推荐）

```bash
# 终端1：启动后端开发服务器
npm run dev:worker

# 终端2：启动前端开发服务器  
npm run dev
```

#### 方式二：使用并发运行
```bash
# 安装并发工具
npm install -g concurrently

# 同时启动前后端
concurrently "npm run dev:worker" "npm run dev"
```

### 5. 访问应用
- 前端：http://localhost:3000
- 后端GraphQL Playground：http://localhost:8787/graphql

## 🔧 开发工作流

### 代码规范

#### TypeScript
- 启用严格模式
- 使用明确的类型定义
- 避免使用 `any` 类型
- 优先使用接口而不是类型别名

#### React最佳实践
- 使用函数组件和Hooks
- 遵循组件单一职责原则
- 使用TypeScript严格类型检查
- 合理使用useMemo和useCallback优化性能

#### 样式规范
- 优先使用Tailwind CSS实用类
- 使用语义化的CSS类名
- 响应式设计优先
- 保持样式的一致性

### Git工作流

#### 提交信息规范
使用Conventional Commits格式：

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

类型：
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式化
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

示例：
```bash
git commit -m "feat(chat): add markdown support for messages"
git commit -m "fix(api): handle OpenAI API rate limiting"
git commit -m "docs: update deployment guide"
```

#### 分支策略
- `main`: 主分支，稳定代码
- `develop`: 开发分支
- `feature/*`: 功能分支
- `fix/*`: 修复分支
- `hotfix/*`: 紧急修复分支

### 调试和测试

#### 前端调试
```bash
# 类型检查
npm run type-check --workspace=packages/frontend

# ESLint检查
npm run lint --workspace=packages/frontend

# 构建测试
npm run build --workspace=packages/frontend
```

#### 后端调试
```bash
# 类型检查  
npm run type-check --workspace=packages/backend

# 本地测试
npm run dev --workspace=packages/backend

# 查看实时日志
wrangler tail

# 部署到测试环境
wrangler deploy --env staging
```

#### GraphQL调试
访问 http://localhost:8787/graphql 使用GraphQL Playground进行查询测试：

```graphql
# 测试消息发送
mutation {
  sendMessage(input: { message: "Hello, AI!" }) {
    id
    message
  }
}

# 测试创建对话
mutation {
  createConversation {
    id
  }
}
```

## 📦 添加新功能

### 前端新组件

1. 在 `packages/frontend/src/components/` 创建新组件
2. 使用TypeScript接口定义props
3. 添加适当的样式（Tailwind CSS）
4. 导出组件并在需要的地方导入

示例：
```tsx
// packages/frontend/src/components/UserAvatar.tsx
import React from 'react'
import { User } from 'lucide-react'

interface UserAvatarProps {
  name?: string
  size?: 'sm' | 'md' | 'lg'
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ 
  name, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  }

  return (
    <div className={`${sizeClasses[size]} bg-gray-600 rounded-full flex items-center justify-center`}>
      <User className="w-4 h-4 text-white" />
    </div>
  )
}
```

### 后端新API

1. 在GraphQL schema中定义新的类型/查询/变更
2. 实现对应的resolver
3. 如需要，添加新的服务层逻辑

示例：
```typescript
// 在 packages/backend/src/graphql/schema.ts 中添加

// 1. 更新typeDefs
const typeDefs = `
  type User {
    id: String!
    name: String!
    email: String!
  }
  
  extend type Query {
    user(id: String!): User
  }
  
  extend type Mutation {
    createUser(name: String!, email: String!): User!
  }
`

// 2. 更新resolvers
const resolvers = {
  Query: {
    user: async (_: any, { id }: { id: string }) => {
      // 实现用户查询逻辑
    }
  },
  Mutation: {
    createUser: async (_: any, { name, email }: { name: string, email: string }) => {
      // 实现用户创建逻辑
    }
  }
}
```

### 添加新的Hook

```typescript
// packages/frontend/src/hooks/useUser.ts
import { useState, useCallback } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_USER, GET_USER } from '@/services/graphql'

export const useUser = () => {
  const [createUserMutation] = useMutation(CREATE_USER)
  
  const createUser = useCallback(async (name: string, email: string) => {
    try {
      const { data } = await createUserMutation({
        variables: { name, email }
      })
      return data?.createUser
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }, [createUserMutation])

  return {
    createUser
  }
}
```

## 🔍 常见开发任务

### 更新依赖
```bash
# 检查过时的依赖
npm outdated

# 更新依赖 (注意破坏性变更)
npm update

# 更新特定包
npm install package-name@latest
```

### 性能优化

#### 前端优化
- 使用React.memo包装纯组件
- 使用useMemo和useCallback优化重计算
- 代码分割和懒加载
- 图片优化和压缩

#### 后端优化
- 实现响应缓存
- 优化GraphQL查询
- 减少API调用次数
- 使用批处理请求

### 错误处理

#### 前端错误边界
```tsx
// packages/frontend/src/components/ErrorBoundary.tsx
import React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">出现了一些问题</h2>
            <p className="text-gray-600 mb-4">请刷新页面重试</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              刷新页面
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
```

#### 后端错误处理
- 使用适当的HTTP状态码
- 返回结构化的错误信息
- 记录详细的错误日志
- 实现重试机制

## 🧪 测试策略

### 前端测试
```bash
# 安装测试依赖
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# 运行测试
npm run test
```

### 后端测试
```bash
# 安装测试依赖
npm install --save-dev vitest @cloudflare/workers-types

# 运行测试
npm run test --workspace=packages/backend
```

## 📚 学习资源

### 官方文档
- [React文档](https://react.dev/)
- [TypeScript文档](https://www.typescriptlang.org/docs/)
- [Cloudflare Workers文档](https://developers.cloudflare.com/workers/)
- [GraphQL文档](https://graphql.org/learn/)
- [Tailwind CSS文档](https://tailwindcss.com/docs)

### 推荐阅读
- [React性能优化](https://react.dev/learn/render-and-commit)
- [TypeScript最佳实践](https://typescript-eslint.io/rules/)
- [Cloudflare Workers最佳实践](https://developers.cloudflare.com/workers/learning/security-practices/)

## 🆘 获取帮助

遇到问题时：
1. 查看控制台错误信息
2. 检查网络请求状态
3. 查看项目Issues
4. 搜索相关文档
5. 提交详细的Issue报告

Issue报告应包含：
- 问题描述
- 重现步骤
- 期望行为
- 实际行为
- 环境信息（Node.js版本、浏览器版本等）
- 相关日志或错误信息
