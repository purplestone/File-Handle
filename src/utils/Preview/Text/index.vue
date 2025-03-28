<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue';

const props = defineProps<{
  content: string;
}>(); 

const iframeRef = useTemplateRef<HTMLIFrameElement>('iframeRef');

// 向iframe发送文本内容
const sendContentToIframe = (content: string) => {
  if (iframeRef.value && iframeRef.value.contentWindow) {
    iframeRef.value.contentWindow.postMessage(content, '*');
  }
};

onMounted(() => {
  // 监听来自父窗口的消息
  window.addEventListener('message', function(event:any) {
      // 确保消息来源安全
      // if (event.origin !== window.location.origin) return;
      
      const content = event.data;
      if (content == 'iframeTextLoaded') {
          // 渲染文本内容
          // 发送内容
          console.log('Text Component get iframeTextLoaded. ');
          sendContentToIframe(props.content);
      }else{
        try {
          let data = content;
          if (data.type == 'height') {
            iframeRef.value!.style.height = (data.value + 60) + 'px';
            console.log('Text Component get height: ', data.value);
            
            setTimeout(() => {
              console.log('Text Component show iframe');
              iframeRef.value!.style.visibility = 'visible';
            }, 200);
            
          }
        } catch (error) {
          console.log('Text Component get height Error: ', error);
        }
      }
  });
});
</script>

<template>
  <iframe
    ref="iframeRef"
    class="text-preview-frame"
    src="/res/src/components/Preview/Text/text.html"
    frameborder="0"
    style="visibility: hidden;"
  ></iframe>
</template>

<style scoped>
.text-preview-frame {
  width: 100%;
  height: 100%;
  border: none;
  background-color: white;
}
</style>