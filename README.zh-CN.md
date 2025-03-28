# File-Handle

![image](docs/logo-s.png)

一个功能简单的本地Web文件服务器，友好的界面，方便通过浏览器来对文件进行上传、下载、预览和管理。

## 已经开发完成的特性

- √ 快速启动本地文件服务器
- √ 直观的Web界面，支持拖拽上传
- √ 支持文件和目录的上传、下载
- √ 文件预览功能（图片、视频、音频、Markdown等）
- X 文件搜索和过滤
- √ 目录压缩下载
- √ 响应式设计，支持移动端访问
- X 可选的文件删除和编辑功能
- X 安全的文件操作和访问控制

## 安装

```bash
npm install -g file-handle
```

## 使用方法

### 基本使用

在希望共享的目录下运行以下命令，以启动文件服务器：

```bash
> file-handle
```

```bash
> fh
```

这将在默认端口（6688）启动服务器，并使用当前工作目录作为根目录。

### 命令行选项

```bash
> file-handle 
  -d <目录路径> 
  -p <端口号> 
  -i <IP地址, ...>
  -w
  --tls <证书路径> <密钥路径> 
  --del 
  --password <密码> 
  --edit 
  --limit <文件大小限制>
  --log
```

#### 参数说明

- `-d`：指定服务器的根目录，默认为当前工作目录
- `-p`：指定服务器监听的端口号，默认为6688
- `-i`：指定服务器允许访问的IP地址，多个IP地址用逗号分隔，默认为空（即允许所有IP访问）
- `-w`：允许公网访问（默认关闭）
- `--tls`：启用HTTPS安全传输，需提供证书和密钥文件路径
- `--del`：启用文件删除功能（默认关闭）
- `--password`：设置Web服务器的访问密码，默认为空
- `--edit`：启用文件编辑修改功能（默认关闭）
- `--limit`：设置文件上传大小限制，如：300MB（支持PB、TB、GB、MB、KB单位，默认3GB）
- `--log`：生成日志文件（默认关闭）

### 访问地址

- 主界面：`http://localhost:6688`
- 文件访问：`/fh/[filepath]`
- API接口：`/api/*`


## 许可证

Copyright [gaoyuan] 

Link: www.npmjs.com/package/file-handle

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
