# 情侣默契问卷 (Couple Quiz)

一个专为情侣设计的互动问卷应用，让你们测试彼此的默契度！

## ✨ 功能特点

- 📱 **移动端优先设计** - 完美适配手机屏幕
- 💕 **30道精心设计的题目** - 包含选择题和问答题
- 🎯 **逐题答题模式** - 答完一题才能看到对方答案
- 🖼️ **个性化照片展示** - 每5题一组，配有不同的照片
- 🎨 **精美的中转页** - 每完成5题显示鼓励页面
- 💬 **双向提问** - Lulu 可以向 Bob 提问
- 📊 **默契度统计** - 自动计算答案匹配度
- 🎉 **结果展示** - 查看所有题目的对比

## 🎯 用户流程

### Lulu 的体验流程

1. **欢迎页** - 看到自己的照片和开始按钮
2. **答题页** - 逐题回答，每答完一题立即看到 Bob 的答案
3. **中转页** - 每5题后显示鼓励页面
4. **提问页** - 可以添加想问 Bob 的问题
5. **结果页** - 查看所有题目对比和默契度

### Bob 的体验流程

1. **创建问卷** - 设置30道题目和答案
2. **上传照片** - 上传8张照片（欢迎页、中转页、6组题目）
3. **分享链接** - 发送给 Lulu
4. **回答 Lulu 的问题** - 在结果页看到 Lulu 的提问并回答

## 📁 项目结构

```
couple-quiz/
├── app/
│   ├── quiz/[id]/
│   │   ├── page.tsx              # 欢迎页
│   │   ├── questions/page.tsx    # 答题页
│   │   ├── transition/page.tsx   # 中转页
│   │   ├── ask-bob/page.tsx      # Lulu 提问页
│   │   └── results/page.tsx      # 结果展示页
│   └── bob/[id]/
│       └── answer-lulu/page.tsx  # Bob 回答页
├── components/
│   ├── ProgressBar.tsx           # 进度条组件
│   ├── ChoiceQuestion.tsx        # 选择题组件
│   ├── TextQuestion.tsx          # 问答题组件
│   └── AnswerReveal.tsx          # 答案展示组件
├── types/
│   └── index.ts                  # TypeScript 类型定义
├── lib/
│   └── db.ts                     # 数据库连接（待实现）
└── public/
    └── images/                   # 照片资源
        ├── lulu-welcome.jpg      # 欢迎页照片
        ├── transition.jpg        # 中转页照片
        ├── group1.jpg            # 第1-5题照片
        ├── group2.jpg            # 第6-10题照片
        ├── group3.jpg            # 第11-15题照片
        ├── group4.jpg            # 第16-20题照片
        ├── group5.jpg            # 第21-25题照片
        └── group6.jpg            # 第26-30题照片
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 准备照片

将以下8张照片放入 `public/images/` 目录：

- `lulu-welcome.jpg` - 欢迎页的 Lulu 照片
- `transition.jpg` - 中转页照片
- `group1.jpg` - 第1-5题顶部照片
- `group2.jpg` - 第6-10题顶部照片
- `group3.jpg` - 第11-15题顶部照片
- `group4.jpg` - 第16-20题顶部照片
- `group5.jpg` - 第21-25题顶部照片
- `group6.jpg` - 第26-30题顶部照片

### 3. 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 📱 移动端优化

项目针对移动端做了以下优化：

- ✅ 防止双击缩放
- ✅ 优化触摸滚动
- ✅ 防止 iOS 输入框自动缩放（font-size: 16px）
- ✅ 移除按钮点击高亮
- ✅ 优化字体渲染
- ✅ 响应式图片加载
- ✅ 流畅的动画效果

## 🎨 设计特点

### 颜色主题

- 主色调：粉色系 (#ff6b9d, #ffa8c5)
- 背景色：温暖的米白色 (#fef7f5)
- 强调色：渐变粉色

### 交互设计

- 逐题显示，答完才能进入下一题
- 答题后3秒自动进入下一题
- 每5题显示中转页鼓励
- 流畅的页面过渡动画

## 🔧 待实现功能

### 后端功能

- [ ] 数据库集成（MongoDB）
- [ ] API 路由实现
- [ ] 问卷创建接口
- [ ] 答案保存接口
- [ ] 结果查询接口

### Bob 创建问卷功能

- [ ] 问卷创建页面
- [ ] 题目编辑器
- [ ] 照片上传功能
- [ ] 分享链接生成

### 其他功能

- [ ] 结果分享功能
- [ ] 数据持久化
- [ ] 错误处理
- [ ] 加载状态

## 📦 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量（数据库连接等）
4. 部署完成

### 域名绑定

在 Vercel 项目设置中添加自定义域名。

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **部署**: Vercel
- **数据库**: MongoDB Atlas（待集成）

## 📝 开发说明

### 修改题目数据

目前使用模拟数据，在 `app/quiz/[id]/questions/page.tsx` 中：

```typescript
const mockQuestions = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  type: i % 3 === 0 ? 'text' : 'choice',
  question: `这是第 ${i + 1} 道题目`,
  // ...
}));
```

### 自定义样式

在 `app/globals.css` 中修改颜色变量：

```css
:root {
  --background: #fef7f5;
  --primary: #ff6b9d;
  --secondary: #ffa8c5;
}
```

## 💡 使用建议

1. **照片选择**: 选择清晰、有意义的照片
2. **题目设计**: 混合简单和深入的问题
3. **答案设置**: Bob 的答案要真实，不要为了匹配而修改
4. **体验优化**: 在真实手机上测试体验

## 📄 许可证

MIT License

## 🙏 致谢

感谢 Lulu 和 Bob 的爱情故事启发了这个项目 💕

---

**Made with ❤️ for Lulu & Bob**

