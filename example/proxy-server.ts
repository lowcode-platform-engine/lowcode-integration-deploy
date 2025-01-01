import express, { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import * as dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

const app = express();

// 静态资源目录配置
const staticDirs: Record<string, string> = {
  '/lowcode-center-web': path.join(__dirname, '../project/lowcode-center-web'),
  '/lowcode-platform': path.join(__dirname, '../project/lowcode-platform'),
};

// 配置静态资源服务
Object.keys(staticDirs).forEach((route) => {
  const dir = staticDirs[route];
  app.use(
    route,
    express.static(dir, {
      index: 'index.html', // 默认文件
    })
  );
});

// 后端接口代理
const backendProxyTable: Record<string, string> = {
  '/lowcode-center-server': `http://127.0.0.1:${process.env.SERVER_PORT || 10009}`, // 服务端接口
  '/file-server': `http://127.0.0.1:${process.env.SERVER_PORT || 10009}`,          // 文件服务
  '/lowcode-web': `http://127.0.0.1:${process.env.SERVER_PORT || 10009}`,          // 同服务端
};

Object.keys(backendProxyTable).forEach((context) => {
  const target = backendProxyTable[context];
  app.use(
    context,
    createProxyMiddleware({
      target,
      changeOrigin: true, // 支持跨域
      pathRewrite: (p, req) => {
        console.log(p, context)
        // return path.replace(context, '')
        return path.join(context, p)
      }, // 去掉路径前缀
    })
  );
});

// 健康检查接口
app.get('/health', (req: Request, res: Response) => {
  res.send('Proxy server is running');
});

// 启动服务
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Proxy server is running at http://127.0.0.1:${PORT}`);
  console.log(`Proxy server is running at http://127.0.0.1:${PORT}/lowcode-center-web`);
  console.log(`Proxy server is running at http://127.0.0.1:${PORT}/lowcode-platform`);
  console.log(`Serving lowcode-center-web from: ${staticDirs['/lowcode-center-web']}`);
  console.log(`Serving lowcode-platform from: ${staticDirs['/lowcode-platform']}`);
});
