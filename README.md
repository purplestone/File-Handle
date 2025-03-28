
# File-Handle

![image](static/logo-s.png)

A simple local web file server with a user-friendly interface, allowing easy file upload, download, preview, and management through a browser.

[npm link](https://www.npmjs.com/package/file-handle) 

The remaining code environment of the File Handle project is too complex and the requirements have not changed much. This code repository has open sourced extensible previewer code.



## Completed Features

- √ Quick start of a local file server
- √ Intuitive web interface with drag-and-drop upload support
- √ Support for file and directory upload and download
- √ File preview functionality (images, videos, audio, Markdown, etc.)
- X File search and filtering
- √ Directory compression and download
- √ Responsive design, supporting mobile access
- X Optional file deletion and editing functionality
- X Secure file operations and access control

## Installation

```bash
npm install -g file-handle
```

## Usage

### Basic Usage

Run the following command in the directory you wish to share to start the file server:

```bash
> file-handle
```

```bash
> fh
```

This will start the server on the default port (6688) and use the current working directory as the root directory.

### Command Line Options

```bash
> file-handle 
  -d <directory path> 
  -p <port number> 
  -i <IP addresses, ...>
  -w
  --tls <certificate path> <key path> 
  --del 
  --password <password> 
  --edit 
  --limit <file size limit>
  --log
```

#### Parameter Description

- `-d`: Specify the root directory of the server, default is the current working directory
- `-p`: Specify the port number the server listens to, default is 6688
- `-i`: Specify allowed IP addresses, separated by commas (null by default, all IP allowed addresses)
- `-w`: Allow public network access (disabled by default)
- `--tls`: Enable HTTPS secure transmission, requires certificate and key file paths
- `--del`: Enable file deletion functionality (disabled by default)
- `--password`: Set the access password for the web server, default is empty
- `--edit`: Enable file editing functionality (disabled by default)
- `--limit`: Set the file upload size limit, e.g., 300MB (supports PB, TB, GB, MB, KB units, default is 3GB)
- `--log`: Keep log files (disabled by default)

### Access URLs

- Main interface: `http://localhost:6688`
- File access: `/fh/[filepath]`
- API interface: `/api/*`

## License

Copyright [gaoyuan] 

link: https://github.com/purplestone/File-Handle

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

