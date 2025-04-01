import { initFrame, renderEndHook } from "../common.js";
import type { FileInfo } from "@/types/index";

// const ext2lan = {
//   "sh": "bash",
//   "zsh": "bash",
//   "h": "c",
//   "cc": "cpp",
//   "c++": "cpp",
//   "h++": "cpp",
//   "hpp": "cpp",
//   "hh": "cpp",
//   "hxx": "cpp",
//   "cxx": "cpp",
//   "cs": "csharp",
//   "c#": "csharp",
//   "patch": "diff",
//   "golang": "go",
//   "gql": "graphql",
//   "toml": "ini",
//   "jsp": "java",
//   "js": "javascript",
//   "jsx": "javascript",
//   "mjs": "javascript",
//   "cjs": "javascript",
//   "jsonc": "json",
//   "kt": "kotlin",
//   "kts": "kotlin",
//   "pluto": "lua",
//   "mk": "makefile",
//   "mak": "makefile",
//   "make": "makefile",
//   "md": "markdown",
//   "mkdown": "markdown",
//   "mkd": "markdown",
//   "mm": "objectivec",
//   "objc": "objectivec",
//   "obj-c": "objectivec",
//   "obj-c++": "objectivec",
//   "objective-c++": "objectivec",
//   "pl": "perl",
//   "pm": "perl",
//   "text": "plaintext",
//   "txt": "plaintext",
//   "py": "python",
//   "gyp": "python",
//   "ipython": "python",
//   "pycon": "python-repl",
//   "rb": "ruby",
//   "gemspec": "ruby",
//   "podspec": "ruby",
//   "thor": "ruby",
//   "irb": "ruby",
//   "rs": "rust",
//   "console": "shell",
//   "shellsession": "shell",
//   "ts": "typescript",
//   "tsx": "typescript",
//   "mts": "typescript",
//   "cts": "typescript",
//   "vb": "vbnet",
//   "html": "xml",
//   "xhtml": "xml",
//   "rss": "xml",
//   "atom": "xml",
//   "xjb": "xml",
//   "xsd": "xml",
//   "xsl": "xml",
//   "plist": "xml",
//   "wsf": "xml",
//   "svg": "xml",
//   "yml": "yaml"
// };

function renderPreview(content:string, info:FileInfo) {
  if (typeof content === 'string') {
      const code = document.querySelector('code');
      function escapeHtml(text:string) {
          const div = document.createElement('div');
          div.textContent = text;
          return div.innerHTML;
      }
      if (code) {
        // code.innerHTML = lines.map((line,i) => 
        //     `<p><span class="line-number">${i+1}</span>${hljs.highlightAuto(escapeHtml(line || '')).value}</p>`
        // ).join('');
        let lang;
        let oontentHtml = '';
        if ([
          ['json', "application/json", ['.json', '.jsonl'] ],
          ['markdown', /[mM]arkdown/, '.md'],
          ['javascript', /[Jj]ava[Ss]cript/, ['.typescript', '.javascript', '.ts', '.js', '.cjs', '.mjs', '.jsx', '.tsx']],
          ['css', null, ['.css','.scss','.sass','.less','.styl','.stylus','.pcss','.postcss']],
        ].some((a:any)=>{
          if (
            a[1] === info.mimeType 
            || (a[1]?.test && a[1]?.test(info.mimeType)) 
            || [].concat(a[2]).some((ext:string)=>info.name.endsWith(ext))
          ) {
            lang = a[0];
            return true;
          }
        })
        || (lang = getLanguageByExtension(info.name))) {
          oontentHtml = hljs.highlight(escapeHtml(content || ''), {language: lang}).value;
        }else {
          oontentHtml = hljs.highlightAuto(escapeHtml(content || '')).value;
        }
        const lines = oontentHtml.split('\n');
        oontentHtml = lines.map((line,i) => 
            `<p><span class="line-number">${i+1}</span>${(line || '')}</p>`
        ).join('');
        code.innerHTML = oontentHtml;
        console.log('hljs lang: ', lang);
        
        setTimeout(() => {
          renderEndHook(code);
        });
      }
  }
}

function getLanguageByExtension(ext:string=''):string|null {
  // 去掉点号（如果存在）
  const aS = ext.split('.');
  ext = aS.length > 1 ? aS.pop() as string : aS[0];
  
  // 遍历所有语言
  for (const langName of hljs.listLanguages()) {
    const language = hljs.getLanguage(langName);
    if (langName == ext) {
      return langName;
    }
    // 检查扩展名是否在别名中
    if (language.aliases) {
      for (const alias of language.aliases) {
        if (alias.toLowerCase() === ext.toLowerCase()) {
          return langName;
        }
      }
    }
  }
  return null;
}

initFrame(renderPreview);