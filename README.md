# 天气预报单页应用

一个使用 React 和 TypeScript 构建的单页应用（SPA），展示城市的 7 天天气预报。通过 Open-Meteo API 获取实时天气数据。

## ✨ 功能

- **城市搜索**：输入城市名称获取对应天气预报
- **7 天天气数据**：显示每日最高/最低温度和天气状况
- **响应式设计**：适配各种设备屏幕
- **错误处理**：优雅处理无效输入或 API 异常

## 🛠️ 技术栈

- **前端框架**：React + TypeScript
- **样式**：CSS
- **API**：Open-Meteo API
- **HTTP 客户端**：Axios

## 🚀 安装与运行

```bash
# 克隆仓库
git clone https://github.com/your-username/my-weather-app.git
cd my-weather-app

# 安装依赖
pnpm install
# 或者
npm install

# 启动项目
npm run dev
```

## 📁 项目结构

```
my-weather-app/
├── public/
│   └── index.html
├── src/
│   ├── utils/
│   │   └── getWeatherDescription.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── app.css
├── package.json
├── tsconfig.json
└── README.md
```
