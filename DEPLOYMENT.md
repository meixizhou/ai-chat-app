# 部署指南

## 📋 部署前准备

### 1. 环境要求
- Node.js 18+
- npm 或 yarn
- Cloudflare账户
- OpenAI API密钥

### 2. 获取必要的API密钥

#### OpenAI API密钥
1. 访问 [OpenAI Platform](https://platform.openai.com/)
2. 注册并登录账户
3. 进入 API Keys 页面
4. 创建新的API密钥并保存

#### Cloudflare账户设置
1. 注册 [Cloudflare](https://cloudflare.com/) 账户
2. 安装 Wrangler CLI：`npm install -g wrangler`
3. 登录账户：`wrangler auth login`

## 🚀 部署步骤

### 第一步：克隆并安装依赖

```bash
# 克隆仓库
git clone https://github.com/meixizhou/ai-chat-app.git
cd ai-chat-app

# 安装依赖
npm install
```

### 第二步：配置环境变量

#### 前端配置
```bash
cd packages/frontend
cp .env.example .env
```

编辑 `.env` 文件：
```env
VITE_GRAPHQL_ENDPOINT=https://your-worker-domain.workers.dev/graphql
```

#### 后端配置
```bash
cd packages/backend
cp .env.example .env
```

编辑 `.env` 文件：
```env
OPENAI_API_KEY=your_openai_api_key_here
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### 第三步：部署Cloudflare Worker

```bash
cd packages/backend

# 配置Wrangler
# 编辑 wrangler.toml 文件，设置你的worker名称

# 设置环境变量
wrangler secret put OPENAI_API_KEY
# 输入你的OpenAI API密钥

# 部署worker
npm run deploy
```

### 第四步：部署前端

#### 使用Cloudflare Pages (推荐)

1. 将代码推送到GitHub仓库
2. 在Cloudflare Dashboard中创建新的Pages项目
3. 连接到你的GitHub仓库
4. 配置构建设置：
   - **构建命令**: `cd packages/frontend && npm install && npm run build`
   - **构建输出目录**: `packages/frontend/dist`
   - **根目录**: `/`

5. 设置环境变量：
   - `VITE_GRAPHQL_ENDPOINT`: `https://your-worker-domain.workers.dev/graphql`

6. 部署并获取域名

#### 使用其他平台

你也可以部署到：
- Vercel
- Netlify
- GitHub Pages
- 或任何静态站点托管服务

构建命令：
```bash
cd packages/frontend
npm run build
```

构建输出在 `packages/frontend/dist` 目录

### 第五步：更新CORS设置

部署完成后，更新后端的CORS设置：

```bash
cd packages/backend
wrangler secret put ALLOWED_ORIGINS
# 输入: https://your-frontend-domain.com,https://additional-domain.com
```

重新部署worker：
```bash
npm run deploy
```

## 🔧 高级配置

### 自定义域名

#### Worker自定义域名
1. 在Cloudflare Dashboard中进入Workers
2. 选择你的worker
3. 进入Triggers选项卡
4. 添加自定义域名

#### Pages自定义域名
1. 在Cloudflare Dashboard中进入Pages
2. 选择你的项目
3. 进入Custom domains选项卡
4. 添加自定义域名

### 性能优化

#### 启用缓存
在wrangler.toml中添加：
```toml
[env.production.vars]
CACHE_TTL = "3600"
```

#### CDN优化
- Cloudflare自动提供全球CDN
- 启用Brotli压缩
- 启用Auto Minify for JS, CSS, HTML

### 监控和日志

#### 查看Worker日志
```bash
wrangler tail
```

#### 监控仪表板
在Cloudflare Dashboard中查看：
- 请求数量
- 错误率
- 响应时间
- CPU时间使用

## 🐛 故障排除

### 常见问题

1. **CORS错误**
   - 检查ALLOWED_ORIGINS环境变量
   - 确保前端域名在允许列表中

2. **OpenAI API错误**
   - 验证API密钥是否正确
   - 检查API配额是否足够

3. **构建失败**
   - 检查Node.js版本（需要18+）
   - 清除node_modules并重新安装

4. **Worker部署失败**
   - 检查wrangler登录状态
   - 验证账户权限

### 调试命令

```bash
# 本地开发
npm run dev                 # 启动前端开发服务器
npm run dev:worker         # 启动Worker本地开发

# 构建测试
npm run build              # 构建整个项目
npm run type-check         # 类型检查

# 日志查看
wrangler tail              # 查看Worker实时日志
```

## 📊 成本估算

### Cloudflare Workers
- 免费计划：100,000 请求/天
- 付费计划：$5/月 起，10M 请求

### Cloudflare Pages
- 免费计划：500 构建/月，100GB 带宽/月
- 付费计划：$20/月 起

### OpenAI API
- 按使用量计费
- GPT-3.5-turbo: ~$0.002/1K tokens

## 🔄 更新部署

```bash
# 更新前端
cd packages/frontend
npm run build
# 重新部署到Pages (自动)

# 更新后端
cd packages/backend
npm run deploy
```

## 🆘 获取帮助

如果遇到问题，请：
1. 查看项目Issues
2. 检查Cloudflare文档
3. 提交新的Issue并包含详细的错误信息
