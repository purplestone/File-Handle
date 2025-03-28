import { initFrame, renderEndHook } from "../common.js";
import type { FileInfo } from "@/types/index";

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
          ["1C",null,[".1c"]],
          ["ABNF",null,[".abnf"]],
          ["Access logs",null,[".accesslog"]],
          ["Ada",null,[".ada"]],
          ["Arduino",null,[".arduino",".ino"]],
          ["ARM assembler",null,[".armasm",".arm"]],
          ["AVR assembler",null,[".avrasm"]],
          ["ActionScript",null,[".actionscript",".as"]],
          ["AngelScript",null,[".angelscript",".asc"]],
          ["Apache",null,[".apache",".apacheconf"]],
          ["AppleScript",null,[".applescript",".osascript"]],
          ["Arcade",null,[".arcade"]],
          ["AsciiDoc",null,[".asciidoc",".adoc"]],
          ["AspectJ",null,[".aspectj"]],
          ["AutoHotkey",null,[".autohotkey"]],
          ["AutoIt",null,[".autoit"]],
          ["Awk",null,[".awk",".mawk",".nawk",".gawk"]],
          ["Bash",null,[".bash",".sh",".zsh"]],
          ["Basic",null,[".basic"]],
          ["BNF",null,[".bnf"]],
          ["Brainfuck",null,[".brainfuck",".bf"]],
          ["C#",null,[".csharp",".cs"]],
          ["C",null,[".c",".h"]],
          ["C++",null,[".cpp",".hpp",".cc",".hh",".c++",".h++",".cxx",".hxx"]],
          ["C/AL",null,[".cal"]],
          ["Cache Object Script",null,[".cos",".cls"]],
          ["CMake",null,[".cmake",".cmake.in"]],
          ["Coq",null,[".coq"]],
          ["CSP",null,[".csp"]],
          ["Cap’n Proto",null,[".capnproto",".capnp"]],
          ["Clojure",null,[".clojure",".clj"]],
          ["CoffeeScript",null,[".coffeescript",".coffee",".cson",".iced"]],
          ["Crmsh",null,[".crmsh",".crm",".pcmk"]],
          ["Crystal",null,[".crystal",".cr"]],
          ["D",null,[".d"]],
          ["Dart",null,[".dart"]],
          ["Delphi",null,[".dpr",".dfm",".pas",".pascal"]],
          ["Diff",null,[".diff",".patch"]],
          ["Django",null,[".django",".jinja"]],
          ["DNS Zone file",null,[".dns",".zone",".bind"]],
          ["Dockerfile",null,[".dockerfile",".docker"]],
          ["DOS",null,[".dos",".bat",".cmd"]],
          ["dsconfig",null,[".dsconfig"]],
          ["DTS (Device Tree)",null,[".dts"]],
          ["Dust",null,[".dust",".dst"]],
          ["EBNF",null,[".ebnf"]],
          ["Elixir",null,[".elixir"]],
          ["Elm",null,[".elm"]],
          ["Erlang",null,[".erlang",".erl"]],
          ["Excel",null,[".excel",".xls",".xlsx"]],
          ["F#",null,[".fsharp",".fs",".fsx",".fsi",".fsscript"]],
          ["FIX",null,[".fix"]],
          ["Fortran",null,[".fortran",".f90",".f95"]],
          ["G-Code",null,[".gcode",".nc"]],
          ["Gams",null,[".gams",".gms"]],
          ["GAUSS",null,[".gauss",".gss"]],
          ["Gherkin",null,[".gherkin"]],
          ["Go",null,[".go",".golang"]],
          ["Golo",null,[".golo",".gololang"]],
          ["Gradle",null,[".gradle"]],
          ["GraphQL",null,[".graphql"]],
          ["Groovy",null,[".groovy"]],
          ["HTML, XML",null,[".xml",".html",".xhtml",".rss",".atom",".xjb",".xsd",".xsl",".plist",".svg"]],
          ["HTTP",null,[".http",".https"]],
          ["Haml",null,[".haml"]],
          ["Handlebars",null,[".handlebars",".hbs",".html.hbs",".html.handlebars"]],
          ["Haskell",null,[".haskell",".hs"]],
          ["Haxe",null,[".haxe",".hx"]],
          ["Hy",null,[".hy",".hylang"]],
          ["Ini, TOML",null,[".ini",".toml"]],
          ["Inform7",null,[".inform7",".i7"]],
          ["IRPF90",null,[".irpf90"]],
          ["JSON",null,[".json"]],
          ["Java",null,[".java",".jsp"]],
          ["Julia",null,[".julia",".jl"]],
          ["Julia REPL",null,[".julia-repl"]],
          ["Kotlin",null,[".kotlin",".kt"]],
          ["LaTeX",null,[".tex"]],
          ["Leaf",null,[".leaf"]],
          ["Lasso",null,[".lasso",".ls",".lassoscript"]],
          ["Less",null,[".less"]],
          ["LDIF",null,[".ldif"]],
          ["Lisp",null,[".lisp"]],
          ["LiveCode Server",null,[".livecodeserver"]],
          ["LiveScript",null,[".livescript",".ls"]],
          ["Lua",null,[".lua"]],
          ["Makefile",null,[".makefile",".mk",".mak",".make"]],
          ["Markdown",null,[".markdown",".md",".mkdown",".mkd"]],
          ["Mathematica",null,[".mathematica",".mma",".wl"]],
          ["Matlab",null,[".matlab"]],
          ["Maxima",null,[".maxima"]],
          ["Maya Embedded Language",null,[".mel"]],
          ["Mercury",null,[".mercury"]],
          ["MIPS Assembler",null,[".mips",".mipsasm"]],
          ["Mizar",null,[".mizar"]],
          ["Mojolicious",null,[".mojolicious"]],
          ["Monkey",null,[".monkey"]],
          ["Moonscript",null,[".moonscript",".moon"]],
          ["N1QL",null,[".n1ql"]],
          ["NSIS",null,[".nsis"]],
          ["Nginx",null,[".nginx",".nginxconf"]],
          ["Nim",null,[".nim",".nimrod"]],
          ["Nix",null,[".nix"]],
          ["OCaml",null,[".ocaml",".ml"]],
          ["Objective C",null,[".objectivec",".mm",".objc",".obj-c",".obj-c++",".objective-c++"]],
          ["OpenGL Shading Language",null,[".glsl"]],
          ["OpenSCAD",null,[".openscad",".scad"]],
          ["Oracle Rules Language",null,[".ruleslanguage"]],
          ["Oxygene",null,[".oxygene"]],
          ["PF",null,[".pf",".pf.conf"]],
          ["PHP",null,[".php"]],
          ["Parser3",null,[".parser3"]],
          ["Perl",null,[".perl",".pl",".pm"]],
          ["Plaintext",null,[".plaintext",".txt",".text"]],
          ["Pony",null,[".pony"]],
          ["PostgreSQL & PL/pgSQL",null,[".pgsql",".postgres",".postgresql"]],
          ["PowerShell",null,[".powershell",".ps",".ps1"]],
          ["Processing",null,[".processing"]],
          ["Prolog",null,[".prolog"]],
          ["Properties",null,[".properties"]],
          ["Protocol Buffers",null,[".proto",".protobuf"]],
          ["Puppet",null,[".puppet",".pp"]],
          ["Python",null,[".python",".py",".gyp"]],
          ["Python profiler results",null,[".profile"]],
          ["Python REPL",null,[".python-repl",".pycon"]],
          ["Q",null,[".k",".kdb"]],
          ["QML",null,[".qml"]],
          ["R",null,[".r"]],
          ["ReasonML",null,[".reasonml",".re"]],
          ["RenderMan RIB",null,[".rib"]],
          ["RenderMan RSL",null,[".rsl"]],
          ["Roboconf",null,[".graph",".instances"]],
          ["Ruby",null,[".ruby",".rb",".gemspec",".podspec",".thor",".irb"]],
          ["Rust",null,[".rust",".rs"]],
          ["SAS",null,[".SAS",".sas"]],
          ["SCSS",null,[".scss"]],
          ["SQL",null,[".sql"]],
          ["STEP Part 21",null,[".p21",".step",".stp"]],
          ["Scala",null,[".scala"]],
          ["Scheme",null,[".scheme"]],
          ["Scilab",null,[".scilab",".sci"]],
          ["Shell",null,[".shell",".console"]],
          ["Smali",null,[".smali"]],
          ["Smalltalk",null,[".smalltalk",".st"]],
          ["SML",null,[".sml",".ml"]],
          ["Stan",null,[".stan",".stanfuncs"]],
          ["Stata",null,[".stata"]],
          ["Stylus",null,[".stylus",".styl"]],
          ["SubUnit",null,[".subunit"]],
          ["Swift",null,[".swift"]],
          ["Tcl",null,[".tcl",".tk"]],
          ["Test Anything Protocol",null,[".tap"]],
          ["Thrift",null,[".thrift"]],
          ["TP",null,[".tp"]],
          ["Twig",null,[".twig",".craftcms"]],
          ["TypeScript",null,[".typescript",".ts",".tsx",".mts",".cts"]],
          ["VB.Net",null,[".vbnet",".vb"]],
          ["VBScript",null,[".vbscript",".vbs"]],
          ["VHDL",null,[".vhdl"]],
          ["Vala",null,[".vala"]],
          ["Verilog",null,[".verilog",".v"]],
          ["Vim Script",null,[".vim"]],
          ["X++",null,[".axapta",".x++"]],
          ["x86 Assembly",null,[".x86asm"]],
          ["XL",null,[".xl",".tao"]],
          ["XQuery",null,[".xquery",".xpath",".xq",".xqm"]],
          ["YAML",null,[".yml",".yaml"]],
          ["Zephir",null,[".zephir",".zep"]],
        ].some((a:any)=>{
          if (
            a[1] === info.mimeType 
            || (a[1]?.test && a[1]?.test(info.mimeType)) 
            || [].concat(a[2]).some((ext:string)=>info.name.endsWith(ext))
          ) {
            lang = a[0];
            return true;
          }
        })) {
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

initFrame(renderPreview);