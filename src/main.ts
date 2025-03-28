import './style.css';
import axios from 'axios';
import { sendContentToIframe, initWin } from './utils/Preview/common.js';

const iframe:HTMLIFrameElement|null = document.getElementById('previewer') as HTMLIFrameElement;

const path = URL.parse(window.location.href)?.searchParams.get('file') || '';
const viewer = URL.parse(window.location.href)?.searchParams.get('view') || '';
const fileInfo = URL.parse(window.location.href)?.searchParams.get('fileInfo') || '';

const data = {
  iframe: {
    value: iframe
  },
  content: {
    value: ''
  },
  fileInfo: {
    value: JSON.parse(fileInfo)
  }
};

initWin(data.content, data.iframe, data.fileInfo);

if (path) {
  axios.get(path, { responseType: 'stream'}).then((res)=>{
    data.content.value = res.data;
    data.iframe.value.src = `/res/src/utils/Preview/${viewer}/index.html`;
    // sendContentToIframe(data.content, data.iframe, {});
  });
}