# 階段一：Build stage (使用 Node 20 建置靜態檔案)
FROM node:20 AS builder
WORKDIR /app

# 複製 package.json 並安裝依賴套件
COPY package*.json ./
RUN npm ci

# 複製其餘原始碼並執行建置 (Vite)
COPY . .
RUN npm run build

# 階段二：Serve stage (使用 Nginx 提供靜態網頁服務)
FROM nginx:alpine

# 將前端編譯出的靜態檔案複製到 Nginx 的預設託管目錄
COPY --from=builder /app/dist /usr/share/nginx/html

# 宣告 Nginx 預設 port
EXPOSE 80

# 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]