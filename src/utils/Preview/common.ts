import { isPreviewAble } from "@/types/index.js";


export function renderEndHook(el:Element|Document) {
  el = el || document;
  el.querySelectorAll('a').forEach((a) => {
    a.target = '_top';
    if (linkIsRelative(a.getAttribute('href')||'')) {
      a.href = fixViewParams(a.href);
    }
  });
}

export function initFrame(renderPreview:Function){
  // 监听来自父窗口的消息
  window.addEventListener('message', function(event) {
    // 确保消息来源安全
    // if (event.origin !== window.location.origin) return;
    const content = event.data.content;
    console.log('markdown page get content , length: ', content.length);
    if (typeof content === 'string') {
      renderPreview(content, event.data.fileInfo);
    }
  });

  if (top) {
  top.postMessage('iframeLoaded', '*');
  }
  console.log('markdown page loaded. and post to parent');


}

// 向iframe发送markdown内容
export function sendContentToIframe(content:any, iframeRef:any, fileInfo:any) {
  if (iframeRef && iframeRef.contentWindow) {
    iframeRef.contentWindow.postMessage({content, fileInfo: cloneToJson(fileInfo)}, '*');
    iframeRef.style.visibility = 'visible';
  }
};

export function initWin(content:any, iframeRef:any, fileInfo:any) {
  // 监听来自父窗口的消息
  window.addEventListener('message', function(event:any) {
      // 确保消息来源安全
      // if (event.origin !== window.location.origin) return;

      const cmd = event.data;
      if (cmd == 'iframeLoaded') {
          // 发送内容,渲染文本内容
          console.log('preview Component get iframeLoaded. ');
          sendContentToIframe(content.value, iframeRef.value, fileInfo.value);
      }else{
        try {
          if (cmd) {
            switch (cmd.type) {
              case 'save':
                console.log('preview Component get save cmd. ');
                break;
            }
          }
        } catch (error) {
          console.log('preview get cmd Error: ', error);
        }
      }
  });
}


function cloneToJson(obj:any) {
  const o:any = {};
  for (const k in obj){
    o[k] = obj[k];
  }
  return JSON.parse(JSON.stringify(o));
}

function linkIsRelative(href:string) {
  return !href.startsWith('/') && !href.match(/^.+:\/\/.+/);
}

function fixViewParams(href:string) {
  const url = new URL(href);
  const extName = extname(href);
  const aPre = isPreviewAble(href);
  let viewer = null;

  if (extName && aPre) {
    viewer = 'text';
    aPre.some((item) => {
      if (item != 'text') {
        viewer = item;
        return true;
      }
    })
  }
  viewer && url.searchParams.set('view', viewer);
  return url.toString();
}

function extname(path:string) {
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