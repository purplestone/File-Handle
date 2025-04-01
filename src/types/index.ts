import { previewerConfig as markdownConfig } from '../utils/Preview/Markdown/registrie.js';
import { previewerConfig as textConfig } from '../utils/Preview/Text/registrie.js';
import mime from 'mime-types';


// 文件/目录信息接口
export interface FileInfo {
  name: string;
  path: string;
  realPath?: string;
  isLink?: boolean;
  isDirectory: boolean;
  size?: number;
  modifiedTime: string;
  extension?: string | null;
  mimeType?: string | boolean;
  isPreviewable?: boolean|null|string[];
  isEditorViewable?: boolean|null|string[];
}


// 文件操作错误
export class FileOperationError extends Error {
  constructor(message: string, public code: number = 500) {
    super(message);
    this.name = 'FileOperationError';
  }
}

// 文件类型判断工具函数
export function getMime(fileName: string): string|false  {
  let ct = mime.lookup(fileName);
  if (!ct) {
    ct = textConfig.viewExtensions.some((ext:string) => ext === extname(fileName).slice(1)) ? 'text/plain' : false;
  }
  return ct;
}

export function isKnownExtensions(fileName: string): boolean {
  return !!getMime(fileName);
}

export function isPreviewAble(fileName: string): null|string[] {
  let extName = extname(fileName);
  if (!extName) {
    return null;
  }
  extName = extName.slice(1);
  const aExtAble = viewAbleExtensions.filter(([s])=>s == extName.toLowerCase()).map((a)=>a[1]);
  return aExtAble.length ? aExtAble : null;
}

export function isEditorAble(fileName: string): null|string[] {
  let extName = extname(fileName);
  if (!extName) {
    return null;
  }
  extName = extName.slice(1);
  const aExtAble = editAbleExtensions.filter(([s])=>s == extName.toLowerCase()).map(([name])=>name);
  return aExtAble.length ? aExtAble : null;
}

// 预览支持的文件类型
export type PreviewType = 'image' | 'video' | 'audio' | 'json' | 'text' | 'pdf' ;

export type EditorViewType = 'markdown' ;

// 预览配置接口
export interface PreviewConfig {
  type: PreviewType;
  mimeTypes: string[];
  extensions: string[];
}

// 有浏览器预览的文件类型
export const viewAbleExtensions:any[] = [];
[markdownConfig, textConfig].forEach((config) => {
  config.viewExtensions && config.viewExtensions.forEach((ext:string) => {
    viewAbleExtensions.push([ext, config.name]);
  });
});

// 有编辑器对应的文件类型
export const editAbleExtensions:any[] = [];
[markdownConfig, textConfig].forEach((config) => {
  config.editExtensions && config.editExtensions.forEach((ext:string) => {
    editAbleExtensions.push([ext, config.name]);
  });
});


export function extname(path: string) {
  // 去除路径末尾的斜杠
  path = path.replace(/[\\\/]+$/, '');
  const parts = path.split('/');
  const filename = parts[parts.length - 1];
  const dotIndex = filename.lastIndexOf('.');

  // 如果没有找到点号，或者文件名是'.'或'..'，返回空字符串
  if (dotIndex === -1 || filename === '.' || filename === '..') {
      return '';
  }

  // 如果点号在开头且后面没有其他点号，返回空字符串
  if (dotIndex === 0 && filename.indexOf('.', 1) === -1) {
      return '';
  }

  // 如果是以'..'开头的情况
  if (filename.startsWith('..')) {
      // 如果只有'..'，返回空字符串
      if (filename === '..') {
          return '';
      }
      // 对于所有以'..'开头的情况，都返回最后一个点号后面的内容
      const lastDotIndex = filename.lastIndexOf('.');
      if (lastDotIndex !== -1) {
          return filename.slice(lastDotIndex);
      }
      return '';
  }

  return dotIndex === -1 ? '' : filename.slice(dotIndex)
}
