#!/bin/bash

# 设置目录路径
SOURCE_DIR="source"
PROJECT_DIR="project"

# 定义版本号变量
CENTER_SERVER_VERSION="1.0.0"
CENTER_WEB_VERSION="1.0.0"
PLATFORM_VERSION="0.0.9"

# 检查目录是否存在
if [ ! -d "$SOURCE_DIR" ]; then
  echo "Source directory ($SOURCE_DIR) does not exist. Exiting..."
  exit 1
fi

if [ ! -d "$PROJECT_DIR" ]; then
  echo "Project directory ($PROJECT_DIR) does not exist. Exiting..."
  exit 1
fi

# 解压和复制函数
extract_and_copy() {
  local zip_file=$1
  local target_dir=$2

  if [ -f "$zip_file" ]; then
    echo "Processing: $zip_file"
    # 临时解压目录
    temp_dir=$(mktemp -d)
    unzip -q "$zip_file" -d "$temp_dir"
    echo "Extracted to: $temp_dir"

    # 创建目标目录（如果不存在）
    mkdir -p "$target_dir"

    # 清空目标目录并复制文件
    rm -rf "$target_dir"/*
    cp -r "$temp_dir"/* "$target_dir"

    # 清理临时目录
    rm -rf "$temp_dir"
    echo "Copied contents to: $target_dir"
  else
    echo "File not found: $zip_file"
  fi
}

# 解压并复制
extract_and_copy "$SOURCE_DIR/lowcode-center-server.${CENTER_SERVER_VERSION}.zip" "$PROJECT_DIR/lowcode-center-server"
extract_and_copy "$SOURCE_DIR/lowcode-center-web.${CENTER_WEB_VERSION}.zip" "$PROJECT_DIR/lowcode-center-web"
extract_and_copy "$SOURCE_DIR/lowcode-set-up-platform.${PLATFORM_VERSION}.zip" "$PROJECT_DIR/lowcode-platform"

# 在 lowcode-center-server 目录下执行 npm install --production
SERVER_DIR="$PROJECT_DIR/lowcode-center-server/war"
if [ -d "$SERVER_DIR" ]; then
  echo "Navigating to $SERVER_DIR and running npm install --production with Taobao mirror"
  cd "$SERVER_DIR"

  # 设置 npm 镜像为淘宝镜像
  npm config set registry https://registry.npmmirror.com

  npm install -g pnpm

  pnpm  config set registry https://registry.npmmirror.com

  # 执行安装命令
  pnpm install --production --force
  if [ $? -eq 0 ]; then
    echo "npm install --production completed successfully."
  else
    echo "npm install --production failed. Check for errors."
    exit 1
  fi

  # 恢复默认 npm registry（可选）
  # npm config set registry https://registry.npmjs.org
else
  echo "Directory not found: $SERVER_DIR. Skipping npm install --production."
fi

# 检查是否成功
echo "All files processed and setup completed!"
