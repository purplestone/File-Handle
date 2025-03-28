import './style.css';
import axios from 'axios';


const dataPreview = {
  markdown: {
    name: 'Markdown',
    desc: 'marked',
    demoList: [
      {
        title: '通用基础语法',
        data: 'static/data/markdown/base.md',
        fileInfo: {
          mimeType: 'text/markdown',
        }
      },
    ]
  },
  text: {
    name: 'Text',
    desc: 'highlight.js',
    demoList: [
      {
        title: 'JSON',
        data: 'static/data/text/test.json',
        fileInfo: {
          mimeType: 'application/json',
        }
      },
    ]
  }
};

rendenDemoList(dataPreview);

function rendenDemoList(params:any) {
  const previewTypes = Object.entries(dataPreview).map(([key, type]) => {
    const demoButtons = type.demoList.map(demo => `<li><a target="_blank" href="/res/main.html?file=${demo.data}&view=${type.name}&fileInfo=${encodeURIComponent(JSON.stringify(demo.fileInfo))}">${demo.title}</a></li>`).join('');
    return `
      <li>
        <dl>
          <dt>${type.name}</dt>
          <dd>
            <p>${type.desc}</p>
            <ul>
              ${demoButtons}
            </ul>
          </dd>
        </dl>
      </li>`;
  }).join('');

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="demoList">
      <ul>
        ${previewTypes}
      </ul>
    </div>
  `;

  
}
