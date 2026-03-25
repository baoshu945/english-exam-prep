# 快速开始指南

## 📦 文件说明

您已收到以下文件：

1. **english-exam-prep-source.zip** — 完整源代码包
   - 包含所有源代码、配置文件、GitHub Actions 工作流
   - 不包含 node_modules（可通过 pnpm install 重新安装）
   - 已清理 Manus 平台特定代码，可独立部署

2. **本指南** — 快速开始说明

## 🚀 部署到 GitHub

### 第一步：准备工作

```bash
# 解压源代码
unzip english-exam-prep-source.zip
cd english-exam-prep-github

# 安装依赖
pnpm install

# 验证构建
pnpm build
```

### 第二步：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 创建新仓库 `english-exam-prep`
3. 选择 Public（推荐）或 Private
4. 不要初始化任何文件

### 第三步：推送代码到 GitHub

```bash
cd english-exam-prep-github

# 初始化 Git
git init
git add .
git commit -m "Initial commit: English exam prep tool"

# 添加远程仓库（替换 USERNAME 和 REPO_NAME）
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

### 第四步：启用 GitHub Pages

1. 进入仓库 Settings → Pages
2. 选择 **GitHub Actions** 作为源
3. 保存

### 第五步：验证部署

1. 进入仓库 Actions 标签
2. 查看工作流执行状态
3. 完成后访问 GitHub Pages URL：
   - `https://USERNAME.github.io/REPO_NAME`

## 📋 项目结构

```
english-exam-prep-github/
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions 自动化部署
├── client/
│   ├── index.html              # HTML 入口
│   └── src/
│       ├── pages/              # 页面组件
│       ├── components/         # UI 组件
│       ├── data/               # 题库数据
│       ├── lib/                # 工具函数
│       └── contexts/           # React Context
├── package.json                # 项目依赖
├── vite.config.ts              # Vite 配置
├── README.md                   # 详细文档
├── DEPLOYMENT.md               # 部署指南
└── pnpm-lock.yaml              # 依赖锁定文件
```

## 🛠️ 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 访问 http://localhost:3000

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 📝 自动化工作流

工作流文件 `.github/workflows/deploy.yml` 配置了：

- **自动构建** — 推送到 main 分支或创建 PR 时
- **类型检查** — 运行 TypeScript 检查
- **自动部署** — 仅在 main 分支 push 时部署到 GitHub Pages

## 🎯 主要功能

| 功能 | 说明 |
|------|------|
| 分类练习 | 按题型分类刷题（5 种题型，共 47 道题） |
| 模拟考试 | 限时作答，150 分钟倒计时 |
| 错题本 | 自动收集错题，支持重新练习 |
| 学习进度 | 查看完成题量、正确率、各题型表现 |
| 翻译与写作 | 主观题练习，含参考答案和自评清单 |

## 🔧 自定义配置

### 修改题库

编辑 `client/src/data/paper1.ts` 中的题目数据

### 修改样式

编辑 `client/src/index.css` 中的 CSS 变量

### 添加自定义域名

编辑 `.github/workflows/deploy.yml`：

```yaml
cname: exam.example.com
```

## ❓ 常见问题

**Q: 如何查看构建日志？**
A: 在 GitHub 仓库的 Actions 标签中点击工作流运行

**Q: 部署失败怎么办？**
A: 检查 TypeScript 错误（`pnpm check`）和构建（`pnpm build`）

**Q: 如何使用自定义域名？**
A: 在 DNS 配置 CNAME 指向 GitHub Pages，然后在工作流中设置 cname 字段

## 📚 更多信息

- README.md — 详细项目文档
- DEPLOYMENT.md — 完整部署指南
- GitHub Actions 文档 — https://docs.github.com/en/actions

## ✅ 检查清单

- [ ] 解压源代码
- [ ] 运行 `pnpm install`
- [ ] 运行 `pnpm build` 验证构建
- [ ] 创建 GitHub 仓库
- [ ] 推送代码到 GitHub
- [ ] 启用 GitHub Pages
- [ ] 验证部署成功

祝您使用愉快！🎉
