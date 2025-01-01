import { spawn, ChildProcess } from "child_process";
import { join } from "path";
import * as dotenv from 'dotenv';
dotenv.config();

let serverProcess: ChildProcess | null = null;

function startServer() {
  if (serverProcess) {
    console.log("Server is already running. Restarting...");
    serverProcess.kill(); // 杀死旧的进程
  }

  const { MYSQL, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE_NAME, REDIS} = process.env;
  const env = {
    // ...process.env, // 保留现有环境变量
    MYSQL: MYSQL,
    MYSQL_PORT: MYSQL_PORT,
    MYSQL_USER: MYSQL_USER,
    MYSQL_PASSWORD: MYSQL_PASSWORD,
    MYSQL_DATABASE_NAME: MYSQL_DATABASE_NAME,
    REDIS: REDIS,
  };

  const serverScript = join(__dirname, "../project/lowcode-center-server", "war", "index.js");

  serverProcess = spawn("node", [serverScript], { env, stdio: "inherit" });

  serverProcess.on("close", (code) => {
    console.log(`Server process exited with code ${code}`);
    serverProcess = null; // 清除引用
  });

  serverProcess.on("error", (err) => {
    console.error("Failed to start server:", err);
    serverProcess = null; // 清除引用
  });
}

// 初始化启动
startServer();

// 捕获 `SIGUSR2` 信号（由 nodemon 发出）
process.on("SIGUSR2", () => {
  console.log("Nodemon triggered restart.");
  startServer();
});
