import { initFrame, renderEndHook } from "../common";
// 配置marked选项
marked.setOptions({
  highlight: function(code:string, lang:string) {
      if (lang && hljs.getLanguage(lang)) {
          try {
              return hljs.highlight(lang, code).value;
          } catch (e) {
              console.error(e);
              return code;
          }
      }
      return code;
  },
  breaks: true,
  gfm: true
});

function renderPreview(content:string) {
  // 渲染markdown内容
  const elm = (document.getElementById('preview') as HTMLElement);
  elm.innerHTML = marked.parse(content);
  // 高亮所有代码块
  document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
  });
  renderEndHook(elm);
}

initFrame(renderPreview);