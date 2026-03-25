# 同等学力英语备考测验工具

一个为 2025 年同等学力英语全国统考设计的完整备考应用，涵盖七大题型、模拟考试、错题本、学习进度追踪等功能。

## 功能特性

- **分类练习** — 按题型分类刷题（口语交际、词汇、阅读理解、完形填空、短文完成）
- **模拟考试** — 限时作答，模拟真实考场（150分钟倒计时）
- **错题本** — 自动收集错题，支持重新练习
- **学习进度** — 查看完成题量、正确率和各题型表现
- **翻译与写作** — 主观题练习，含参考答案和自评清单
- **数据持久化** — 所有进度通过 localStorage 保存在本地

## 技术栈

- **前端框架** — React 19 + TypeScript
- **构建工具** — Vite 7
- **样式** — Tailwind CSS 4 + shadcn/ui
- **路由** — Wouter
- **UI 组件** — Radix UI
- **字体** — DM Serif Display + DM Sans + Source Serif 4

## 快速开始

### 环境要求

- Node.js 20.x 或更高版本
- pnpm 10.4.1

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 访问 http://localhost:3000
```

### 构建生产版本

```bash
# 构建
pnpm build

# 预览生产版本
pnpm preview
```

## GitHub Actions 自动化部署

本项目已配置 GitHub Actions 工作流，支持自动构建和部署到 GitHub Pages。

### 工作流说明

**文件**: `.github/workflows/deploy.yml`

**触发条件**:
- 推送到 `main` 分支时自动构建
- Pull Request 到 `main` 分支时运行类型检查和构建

**步骤**:
1. 检出代码
2. 安装 Node.js 和 pnpm
3. 安装依赖（使用缓存加速）
4. 运行 TypeScript 类型检查
5. 构建项目
6. 部署到 GitHub Pages（仅 main 分支 push 时）

### 启用 GitHub Pages

1. 在 GitHub 仓库设置中找到 **Pages** 部分
2. 在 **Build and deployment** 中选择 **GitHub Actions** 作为源
3. 工作流会自动部署到 `https://<username>.github.io/<repo-name>`

### 自定义域名（可选）

在 `.github/workflows/deploy.yml` 中的 `cname` 字段添加您的自定义域名：

```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist
    cname: exam.example.com  # 替换为您的域名
```

## 项目结构

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 工作流
├── client/
│   ├── index.html              # HTML 入口
│   └── src/
│       ├── App.tsx             # 路由和顶层布局
│       ├── main.tsx            # React 入口点
│       ├── index.css           # 全局样式和设计系统
│       ├── components/         # 可复用 UI 组件
│       ├── pages/              # 页面级组件
│       ├── contexts/           # React Context
│       ├── hooks/              # 自定义 Hooks
│       ├── lib/                # 工具函数和类型定义
│       └── data/               # 题库数据
├── package.json                # 项目依赖
├── vite.config.ts              # Vite 配置
├── tsconfig.json               # TypeScript 配置
└── README.md                   # 项目文档
```

## 页面导航

| 页面 | 路由 | 功能 |
|------|------|------|
| 首页 | `/` | 展示学习模块入口和学习统计 |
| 分类练习 | `/practice` | 选择题型进行分类练习 |
| 练习测验 | `/practice/:type` | 按题型进行练习 |
| 模拟考试 | `/exam` | 限时模拟考试 |
| 错题本 | `/wrong-book` | 查看和重做错题 |
| 学习进度 | `/progress` | 查看学习统计数据 |
| 翻译与写作 | `/writing` | 主观题练习 |

## 设计系统

### 颜色方案（Focus Lab 北欧极简风格）

- **主色** — 深海蓝 (`#1a4d7a`)
- **成功** — 森林绿 (`#2d8659`)
- **错误** — 赤土橙 (`#d97706`)
- **进度** — 琥珀金 (`#f59e0b`)
- **背景** — 纸白 (`#fafaf8`)

### 排版

- **标题** — DM Serif Display（温暖学术感）
- **UI 文本** — DM Sans（清晰高效）
- **英文段落** — Source Serif 4（专业阅读体验）

## 数据持久化

所有用户数据通过 localStorage 存储：

- `exam_progress` — 各题型的练习进度
- `exam_answers` — 用户的答题记录
- `exam_wrong_answers` — 错题本数据
- `exam_exam_records` — 模拟考试记录

## 扩展题库

要添加新的试卷，请按照以下步骤：

1. 在 `client/src/data/` 目录下创建新文件（如 `paper2.ts`）
2. 按照 `paper1.ts` 的格式定义题目数据
3. 在 `client/src/data/index.ts` 中注册新试卷
4. 在首页添加试卷选择功能

## 常见问题

**Q: 如何修改题库？**
A: 编辑 `client/src/data/paper1.ts` 文件中的题目数据即可。

**Q: 如何自定义样式？**
A: 修改 `client/src/index.css` 中的 CSS 变量和 Tailwind 配置。

**Q: 如何添加新页面？**
A: 在 `client/src/pages/` 中创建新组件，然后在 `client/src/App.tsx` 中添加路由。

**Q: 如何部署到自己的服务器？**
A: 运行 `pnpm build` 生成 `dist` 文件夹，然后将其部署到任何静态文件服务器（如 Nginx、Apache 或云服务）。

## 许可证

MIT

## 支持

如有问题或建议，欢迎提交 Issue 或 Pull Request。
