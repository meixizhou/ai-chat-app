# AI Chat App

现代化的AI聊天应用，基于以下技术栈构建：

## 🛠️ 技术栈

### 前端
- **React 18** - 用户界面库
- **TypeScript** - 类型安全的JavaScript
- **Vite** - 快速的构建工具
- **Tailwind CSS** - 实用优先的CSS框架
- **react-markdown** - Markdown渲染组件
- **React Query** - 数据获取和状态管理
- **GraphQL Client** - Apollo Client或urql

### 后端
- **Cloudflare Workers** - 边缘计算平台
- **GraphQL** - API查询语言
- **Hono.js** - 轻量级Web框架
- **GraphQL Yoga** - GraphQL服务器
- **OpenAI API** - AI对话能力

## 📁 项目结构

```
ai-chat-app/
├── packages/
│   ├── frontend/          # React前端应用
│   │   ├── src/
│   │   │   ├── components/    # React组件
│   │   │   ├── hooks/         # 自定义hooks
│   │   │   ├── services/      # API服务
│   │   │   ├── types/         # TypeScript类型
│   │   │   └── utils/         # 工具函数
│   │   ├── public/            # 静态资源
│   │   └── package.json
│   └── backend/           # Cloudflare Workers后端
│       ├── src/
│       │   ├── graphql/       # GraphQL schema和resolvers
│       │   ├── services/      # 业务逻辑服务
│       │   └── types/         # TypeScript类型
│       ├── wrangler.toml      # Cloudflare配置
│       └── package.json
├── package.json           # 根package.json（workspace）
└── README.md
```

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn
- Cloudflare账户

### 安装依赖
```bash
npm install
```

### 开发模式

#### 启动前端开发服务器
```bash
npm run dev
```

#### 启动Cloudflare Workers本地开发
```bash
npm run dev:worker
```

### 构建和部署

#### 构建项目
```bash
npm run build
```

#### 部署Cloudflare Worker
```bash
npm run deploy:worker
```

## ⚙️ 配置

### 环境变量

在`packages/backend`目录下创建`.env`文件：

```env
OPENAI_API_KEY=your_openai_api_key_here
ALLOWED_ORIGINS=http://localhost:3000,https://your-domain.com
```

### Cloudflare配置

在`packages/backend/wrangler.toml`中配置你的Cloudflare设置。

## 🎯 功能特性

- [x] 现代化UI设计
- [x] 实时AI对话
- [x] Markdown消息渲染
- [x] TypeScript类型安全
- [x] GraphQL API
- [x] 边缘计算部署
- [ ] 消息历史存储
- [ ] 用户认证
- [ ] 多模型支持
- [ ] 文件上传

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License
