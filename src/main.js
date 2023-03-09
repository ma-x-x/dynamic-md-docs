import Vue from "vue";
import Fragment from "vue-fragment";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import store from "./store";

import "element-ui/lib/theme-chalk/index.css";

// 设置 Markdown 的配置函数
import setMarkDown from "./main-md.js";

// vuepress 主题
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";

const { VueMarkdownEditor, VMdPreview } = setMarkDown(vuepressTheme);

Vue.use(VueMarkdownEditor) // markDown编辑器
  .use(VMdPreview); // markDown 显示

Vue.use(ElementUI);

Vue.use(Fragment.Plugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
