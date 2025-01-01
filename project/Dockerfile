# 1. 以 Node.js 为基础镜像
FROM node:18-alpine

ENV HOST 0.0.0.0
ENV APP_NAME lowcode-center-server
ENV MYSQL ''
ENV MYSQL_PASSWORD ''
ENV MYSQL_USER root
ENV MYSQL_DATABASE_NAME ''
ENV MYSQL_PORT ''
ENV REDIS ''
ENV REDIS_NAME user_token

# 2. 设置工作目录
WORKDIR /usr/src/app

# 3. 拷贝 Node.js 服务文件并安装依赖
COPY lowcode-center-server ./lowcode-center-server
WORKDIR /usr/src/app/lowcode-center-server/war
RUN npm install --production --registry=https://registry.npmmirror.com

# 4. 回到根目录准备静态资源
WORKDIR /usr/src/app
COPY lowcode-center-web ./lowcode-center-web
COPY lowcode-platform ./lowcode-platform

# 5. 安装 Nginx
RUN apk add --no-cache nginx

# 6. 配置 Nginx
COPY nginx/conf/default.conf /etc/nginx/conf.d/default.conf

# 7. 拷贝前端静态资源到 Nginx 目录
RUN mkdir -p /var/www/lowcode-center-web /var/www/lowcode-platform
COPY lowcode-center-web /var/www/lowcode-center-web
COPY lowcode-platform /var/www/lowcode-platform

# 8. 暴露端口
EXPOSE 80
EXPOSE 10009

# 10. 启动脚本：通过 pm2 同时启动 Nginx 和 Node.js 服务
CMD ["sh", "-c", "\
    nginx && \
    node /usr/src/app/lowcode-center-server/war/index.js"]
