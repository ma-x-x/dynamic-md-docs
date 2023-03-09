// 引入vue
import Vue from "vue";
// 引入vuex
import Vuex from "vuex";
// 应用Vux插件
Vue.use(Vuex);

//1. state用于存放数据
const state = {
  // 网站信息
  projectInfo: {
    ver: 1.0, // 版本信息
    projectId: "1000", // 暂时没啥用
    title: "帮助中心",
    description: "这是一个在线编辑文档的小工具",
  },
  // 导航列表
  naviList: [
    {
      naviId: "1010",
      text: "指南",
      link: "menu",
    },
    {
      naviId: "1020",
      text: "组件",
      link: "menu",
    },
    {
      naviId: "1300",
      text: "nf-press",
      link: "",
      children: [
        {
          naviId: "1301",
          text: "Gitee",
          link: "https://gitee.com/nfpress/nf-press-edit",
        },
        {
          naviId: "1302",
          text: "演示",
          link: "https://nfpress.gitee.io/nf-press-edit/",
        },
      ],
    },
    {
      naviId: "1350",
      text: "案例",
      link: "",
      children: [
        {
          naviId: "1351",
          text: "nf-webstorage",
          link: "https://nfpress.gitee.io/doc-webstorage/",
        },
        {
          naviId: "1352",
          text: "nf-state",
          link: "https://nfpress.gitee.io/nf-press-edit/",
        },
        {
          naviId: "1353",
          text: "nf-ui-core",
          link: "https://nfpress.gitee.io/doc-ui-core/",
        },
        {
          naviId: "1354",
          text: "nf-ui-elp",
          link: "https://nfpress.gitee.io/doc-ui-elp/",
        },
      ],
    },
    {
      naviId: "1395",
      text: "我要提意见",
      link: "https://gitee.com/nfpress/nf-press-edit/issues",
    },
  ],
  // 一个导航项，包含的菜单列表
  menuList: [
    {
      naviId: "1010",
      ver: 3.1,
      menus: [
        {
          menuId: "10_introduce",
          text: "介绍",
          description: "描述",
          icon: "Document",
          children: [],
        },
        {
          menuId: "11_quick_start",
          menuType: "directory",
          text: "快速上手",
          description: "描述",
          icon: "FolderOpened",
          children: [
            {
              menuId: "11_quick_start_1",
              text: "编辑文档项目",
              description: "",
              icon: "Document",
              children: [],
            },
            {
              menuId: "11_quick_start_2",
              text: "展示文档项目",
              description: "",
              icon: "Document",
            },
          ],
        },
        {
          menuId: "12_config",
          text: "配置",
          description: "描述",
          icon: "Document",
        },
        {
          menuId: "13_page",
          text: "页面",
          description: "",
          icon: "Document",
        },
        {
          menuId: "14_markdown",
          text: "Markdown",
          description: "",
          icon: "Document",
        },
        {
          menuId: "15_assets",
          text: "静态资源",
          description: "",
          icon: "Document",
        },
        {
          menuId: "16_package",
          text: "打包方式",
          description: "",
          icon: "Document",
        },
        {
          menuId: "17_loadcomp",
          text: "加载组件",
          description: "",
          icon: "Document",
          kind: 1,
        },
        {
          menuId: "18_runcode",
          text: "在线写/运代码",
          description: "",
          icon: "Document",
          kind: 1,
        },
      ],
    },
    {
      naviId: "1020",
      menus: [
        {
          menuId: "21_doc_navi",
          text: "导航（docNavi）",
          description: "描述",
          icon: "Document",
          children: [],
        },
        {
          menuId: "22_doc_menu",
          text: "菜单（docMenu）",
          description: "描述",
          icon: "Document",
        },
        {
          menuId: "22_doc_menu_edit",
          text: "编辑菜单（docMenuEdit）",
          description: "",
          link: "",
          icon: "Document",
        },
        {
          menuId: "23_md_edit",
          text: "编辑文档（mdEdit）",
          description: "",
          icon: "Document",
          kind: 1,
        },
        {
          menuId: "24_view",
          text: "浏览文档（md-preview）",
          description: "",
          icon: "Document",
          kind: 1,
        },
        {
          menuId: "25_upload_doc",
          text: "导出文档(md-output)",
          description: "",
          icon: "Document",
        },
        {
          menuId: "26_upload_set",
          text: "导出配置(navi-output)",
          description: "",
          icon: "Document",
        },
        {
          menuId: "27_breadcrumb",
          text: "面包屑(doc-breadcrumb)",
          description: "",
          icon: "Document",
        },
        {
          menuId: "38000",
          text: "Markdown 的使用",
          description: "",
          icon: "Document",
        },
        {
          menuId: "28000",
          text: "全局配置",
          description: "",
          icon: "Document",
        },
      ],
      ver: 3.1,
    },
  ],
  // 需要加载的组件，类似于动态路由
  comp: {},
  // 当前激活的各种信息
  current: {
    isView: true, // true：浏览状态；false：编辑状态
    ver: new Date().valueOf(), // 版本信息
    naviId: "", // 当前导航项ID，据此加载菜单列表
    // 面包屑，存放激活的每一级菜单的ID和名称，以及path
    breadcrumb: [],
    menuInfo: {
      // 当前激活的菜单项
      menuId: "",
      ver: 1.0,
      text: "", // 激活的菜单名称
    },
    docInfo: {
      // 当前激活的文档内容
      md: "# 这是标题", // 编辑文档的内容
      ver: 1.0,
      time: "", // 发布时间
      lastTime: "", // 最后修改时间
    },
  },
  breadcrumb: [],
  menuInfo: {},
  docInfo: {},
  docsMap: {
    "10_introduce": {
      md: "> 这里是在线演示和体验，可以单击右上角，切换为编辑模式，任何操作都只会影响浏览器的indexedDB数据库，不会影响别人的体验，也不会向外发布任何信息，所以可以放心折腾。\n**删除 indexedDB 的数据库，然后刷新即可恢复初始文档内容。**\n\n# 介绍\nnf-Press 是一个以 Markdown 为中心的在线文档 **编辑工具**和**展示工具**。你可以在vue3的项目里安装 [@naturefw/press-edit](https://www.npmjs.com/package/@naturefw/press-edit)插件，实现在线编写 Markdown 格式的帮助文档，并且展示的功能。或者导出给 VuePress（待实现）。\n\nnf-Press 诞生的初衷是为了自己写文档的时候可以更方便一些（我有好多文档要写），因为我喜欢这种在线编辑的快感，然后自动生成整个帮助文档的网站，而我只需要负责“写”就可以了，不用管其他配置。\n\n另外更新文档的时候，只需要上传对应的json文件即可，不需要重新编译项目。\n\n# nf-Press 的组件\n\nnf-Press 提供了若干组件，可以实现基础功能：\n\n* 导航组件\n* 菜单组件（编辑版）\n* 菜单组件（浏览版）\n* Markdown 编辑组件\n* Markdown 展示组件\n* 面包屑组件\n* 路由功能（导航 + 菜单自动实现）\n* 下载、导出功能\n\n::: tip\n  引入组件即可直接实现对应的功能。\n:::\n\n# 功能\n\n* 在线编辑菜单、文档。\n* 在线编写代码、修改代码、运行代码（vue的部分代码）。\n* 展示帮助文档。\n* 导入导出。\n* 前端缓存，准离线浏览。\n\n# nf-press 包含两个状态：\n\n- 编辑状态：在线编写菜单、文档，读、写模式。\n- 浏览状态：显示导航、菜单和帮助文档，只读模式。\n\n# 它是如何工作的？\n\n分为编辑状态和浏览状态。\n\n## 编辑状态\n帮助文档在线编辑版，本质上是一个用 [vite2](https://cn.vitejs.dev/) 建立的  [Vue3](https://v3.cn.vuejs.org/guide/introduction.html) 项目，UI库采用 [element-plus](https://element-plus.gitee.io/zh-CN/component/button.html)，Markdown 编辑器采用 [vue-markdown-editor](http://ckang1229.gitee.io/vue-markdown-editor/zh/)，可以实现在线设置菜单、编写文档的功能，以及导入导出的功能。\n\n## 浏览状态\n浏览帮助文档也是一个用 [vite2](https://cn.vitejs.dev/) 建立的  [Vue3](https://v3.cn.vuejs.org/guide/introduction.html) 项目，UI库采用 [element-plus](https://element-plus.gitee.io/zh-CN/component/button.html)，Markdown 编辑器采用 [vue-markdown-editor](http://ckang1229.gitee.io/vue-markdown-editor/zh/)，仅展示文档，以后可能加入其它辅助功能，比如查询、书签、版本对比等。\n\n\n## 步骤\n\n* 用 vite2 建立 vue3 的项目\n* 安装 @naturefw/press-edit，会自动安装依赖项。\n* 设置 main.js，挂载 vue-markdown-editor、路由、组件等 ，选择主题，设置 markdown 需要的插件。\n* 使用 @naturefw/press-edit 提供的组件实现导航、菜单和编辑等功能。\n* 运行项目，即可实现在线编辑。\n* 可以加载组件用于运行。\n\n编辑环境不仅可以编辑文档，还可以维护导航和菜单（侧边栏），菜单可以实现 n级分类，这样再也不用头疼路由的设置，直接添加即可。\n\n## 采用 indexedDB 存储文档\n\n为了实现在线编辑的功能，采用 indexedDB 来存放导航、菜单和文档，编辑完成之后，可以导出配置文件、文档文件。\n\n可以运行```yarn api```开启一个后端API，实现保存json文件的功能。\n\n# 特点\n\n## 在线编写代码且运行\n\n我知道有第三方网站支持在线写代码，但是那些网站的打开速度有点慢，体验效果差了一点点，所以我用 defineAsyncComponent 组件做了一个内置的在线编写代码、运行代码的功能，可以写vue组件里的 template 、setup 部分的代码。可以使用全局组件和全局变量。\n\n## 前端缓存文档\n\njson文件格式的文档被下载后，会被保存在前端的 indexedDB 数据库里面，这样下次再打开的时候，可以直接从 indexedDB 里面读取，这样速度就更快了。\n\n## 仅更改文档时，不需要重新打包编译\n\n如果仅仅是编写图文的帮助文档，那么在发布更新文档的时候并不需要再次打包，因为帮助文档会以 json文件的方式被下载，本身并不需要参与打包，所以更新的时候，直接上传json文件即可。\n\n为了保证用户可以看到最新文档，内置（简易）版本管理功能，避免用户看不到最新文档的情况。\n\n## 其他\n\n还想实现书签、查询这类的功能，暂时没有时间实现。\n\n# 为什么不是 ...?\n\n可能你会想，又在重复制造轮子，有现成的 VuePress 不去用，自己瞎折腾啥。\n\n我做这个项目，首先是因为自己的思路和 VuePress 的不太一样，另外就是想做一个有一点用途的项目练练手，最后想发掘一下 Vue3 可以做到什么程度，自己可以掌握哪些技能。\n\n做个项目验证一下自己的熟练程度，于是有了这个小工具。\n\n## VuePress\n\nVuePress 的官方定位是一个 “以 Markdown 为中心的静态网站生成器”。\n\n这个比较费解，为啥只是一个生成器？文档都编写好了，难道还无法生成网站吗？（也许是给不会写代码的人准备的？）\n\n举个例子，我去市场买菜、买肉，拿回来各种加工，然后跑到饭店找到大厨：大哥帮忙炒一下呗。\n\n我承认，我不会做满汉全席，但是做个西红柿炒鸡蛋还是可以的。所以，我想按照自己的口味做菜。\n\n\n## 为什么不用后端数据库保存文档？\n\n首先因为穷，没钱弄云服务器。\n\n另外用 indexedDB 保存文档，做在线演示的时候，每个人都可以有一份自己的文档，可以随意体验，也就是说可以瞎折腾，不会影响其他人的体验。\n\n另外，安全！在线体验版本，不会向外发送任何信息，大家都省心，对吧。\n",
      time: 1648019473001,
      lastTime: 1648019473001,
      docId: "10_introduce",
      ver: 3.1,
    },
    28000: {
      md: "# 全局配置\n\n内部设置代码\n\n```js\nimport { reactive } from 'vue'\n\n// 设置状态：浏览、编辑\nconst state = reactive({\n  isView: true\n})\n\n/**\n * 设置配置信息\n */\nexport default {\n  state, // 显示状态还是编辑状态\n  baseUrl: '/', // axios 访问的时候使用的基础路径\n  dbName: 'nf-press-doc', // 设置 indexedDB 数据库的名称\n  axios: {}, // 传入 axios 对象，或者实例\n  help: {} // indexedDB 访问实例\n}\n```\n\n## state \nisView 设置状态：浏览还是编辑\n\n## baseUrl \naxios 访问的时候使用的基础路径\n\n## dbName\n设置 indexedDB 数据库的名称，通过ver.json文件设置\n\n\n## axios\n传入 axios 对象，或者实例，用于访问json文件\n\n## help \nindexedDB 访问实例，内部自动设置\n\n",
      time: 1648019473001,
      lastTime: 1648019473001,
      docId: "28000",
      ver: 3.1,
    },
    "11_quick_start": {
      md: '# 技术栈\n\n* vite: ^2.7.0\n* vue: ^3.2.23 \n* @naturefw/press-edit：（自动安装下列插件）\n* axios: ^0.25.0 获取json格式的配置信息和文档\n* element-plus: ^2.0.2 UI库\n* @element-plus/icons-vue: ^0.2.4 图标\n* @naturefw/ui-elp": ^0.1.4 二次封装的UI库\n* @naturefw/nf-state": ^0.2.5 状态管理\n* @naturefw/storage": ^0.2.4 访问 indexedDB\n* @kangc/v-md-editor: ^2.3.13 md 编辑器\n* vite-plugin-prismjs: ^0.0.8 代码高亮\n\n# 快速上手\n\n主要功能都集中在 @naturefw/press-edit 里面，安装后即可使用。\n可以采用多种方式，可以简单粗暴，也可以灵活设置。\n\n## 开袋即食\n\n直接使用打包发布后的代码，建立网站、设置数据库名称，运行即可。\n\n\n## 灵活设置\n\n用 vite2 建立一个vue3的项目，然后安装 @naturefw/press-edit，使用其提供的组件，实现各种功能。\n\n可以灵活布局，设置logo、版权信息、备案信息、广告等内容。\n\n',
      ver: 3.1,
      time: 1648777998419,
      lastTime: 1648777998419,
      docId: "11_quick_start",
    },
    "11_quick_start_1": {
      md: '\n# 建立编辑文档的项目\n\n有多种方式，比如简单粗暴的开袋即食，或者自己建立项目灵活布局等。\n\n\n## 开袋即食\n\n直接使用打包后的代码（distp文件夹内）作为网站，运行即可。\n\n在 ver.json 里面设置版本号和 indexedDB 的数据库名称：\n\n/distp/docs/.nfpress/ver.json\n或者\n/public/docs/.nfpress/ver.json\n\n```json\n{\n  "dbName": "__nf-press-edit-doc__",\n  "ver": 1.6\n}\n```\n\n然后建立网站运行即可。\n\n\n## 建立项目，灵活设置\n\n1. 使用 vite 建立一个 vue3的项目。\n2. 安装插件：@naturefw/press-edit。\n3. 做配置。\n4. 运行项目看效果。\n\n\n\n# CDN 方式的项目\n\n有点小问题，以后再实现。\n\n',
      ver: 3.1,
      time: 1647004255776,
      lastTime: 1647004255776,
      docId: "11_quick_start_1",
    },
    "11_quick_start_2": {
      md: "# 建立展示文档的项目\n\n其实也差不多，原来想做个单独的插件的，但是有点麻烦，所以暂时用一个插件来实现，所以使用方式也就差不多。\n\n只需要设置一个状态即可实现切换。\n\n\n```html\n<el-switch\n  v-model=\"$state.current.isView\"\n  v-bind=\"itemProps\">\n</el-switch>\n```\n\n```js\n\n  const itemProps = {\n    'inline-prompt': true,\n    'active-text': '看',\n    'inactive-text': '写',\n    'active-color': '#378FEB',\n    'inactive-color': '#EA9712'\n  }\n\n```\n\n这样就可以切换编辑状态或者浏览状态。\n",
      ver: 3.1,
      time: 1647005024567,
      lastTime: 1647005024567,
      docId: "11_quick_start_2",
    },
    "12_config": {
      md: "# 配置\n\n基本上不需要手动配置，而是采用“可视化”的方式进行。\n\n## 全局配置\n\n内部设置代码\n\n```js\nimport { reactive } from 'vue'\n\n// 设置状态：浏览、编辑\nconst state = reactive({\n  isView: true\n})\n\n/**\n * 设置配置信息\n */\nexport default {\n  state, // 显示状态还是编辑状态\n  baseUrl: '/', // axios 访问的时候使用的基础路径\n  dbName: 'nf-press-doc', // 设置 indexedDB 数据库的名称\n  axios: {}, // 传入 axios 对象，或者实例\n  help: {} // indexedDB 访问实例\n}\n```\n\n### state \nisView 设置状态：浏览还是编辑\n\n### baseUrl \naxios 访问的时候使用的基础路径\n\n### dbName\n设置 indexedDB 数据库的名称，通过ver.json文件设置\n\n\n### axios\n传入 axios 对象，或者实例，用于访问json文件\n\n### help \nindexedDB 访问实例，内部自动设置\n\n## 配置导航\n本来想做成可以在线维护的形式，不过暂时先手动吧，等菜单维护稳定后会改为在线维护的方式。\n\n``` language\npublic\n└─ docs\n   ├─ .nfpress\n   │  ├─ menu.json  // 菜单\n   │  ├─ project.json  // 项目和导航\n   │  └─ ver.json  // 版本和数据库名称\n   └─ guide\n      ├─ 100.json  // 文档文件\n```\n\n借鉴 vurPress 的格式，在public文件夹下面建立 docs文件夹，再在里面建立.nfpress文件夹，设置三个json文件：\n\n* project.json 存放网站信息和导航信息\n* menu.json 存放菜单信息，可以在线维护\n* ver.json 存放版本号和数据库名称\n\n## 配置菜单\n可以通过在线编辑的形式维护，支持n级分组，可以导出json文件。\n\n## 配置 vue-markdown-editor 编辑器\n采用 [vue-markdown-editor](http://ckang1229.gitee.io/vue-markdown-editor/zh/theme/vuepress.html#介绍) 插件编辑文档，其提供了vuePress的主题，所以极大限度的支持了vuePress的各种格式，具体配置方式可以参考官网。\n\n## 配置 indexedDB\n\n内部自动配置，只需要在ver.json里面设置数据库名称即可。\n\n## 配置状态\n\n内部自动设置，状态内容：\n\n```js\n// 加载状态的类库\nimport { createStore } from '@naturefw/nf-state'\n\nexport default createStore({\n  // 读写状态，直接使用 reactive\n  state: {\n    // 网站信息\n    projectInfo: {\n      ver: 1.0, // 版本信息\n      projectId: '1000', // 暂时没啥用\n      title: 'nf-press-edit ！',\n      description: '这是一个在线编辑文档的小工具',\n    },\n    // 导航列表\n    naviList: [\n      { \"naviId\": \"1010\", \"text\": \"指南\", \"link\": \"menu\" },\n      { \"naviId\": \"1080\", \"text\": \"Gitee\", \"link\": \"https://gitee.com/nfpress/nf-press-edit\" },\n      { \"naviId\": \"1090\", \"text\": \"在线演示\", \"link\": \"https://nfpress.gitee.io/nf-press-edit/\" }\n    ],\n    // 菜单列表\n    menuList: [\n      {\n        \"naviId\": \"\",\n        \"ver\": 1.0,\n        \"menus\": []\n      }\n    ],\n    // 当前激活的各种信息\n    current: {\n      isView: true, // true：浏览状态；false：编辑状态\n      ver: new Date().valueOf(), // 版本信息\n      naviId: '', // 当前导航项ID，据此加载菜单列表\n      // 面包屑，存放激活的每一级菜单的ID和名称，以及path\n      breadcrumb: [],\n      menuInfo: { // 当前激活的菜单项\n        menuId: '',\n        ver: 1.0,\n        text: '', // 激活的菜单名称\n      },\n      docInfo: { // 当前激活的文档内容\n        md: '# 这是标题', // 编辑文档的内容\n        ver: 1.0,\n        time: '', // 发布时间\n        lastTime: '', // 最后修改时间\n        code: {\n          js:'',\n          template: '',\n          style: ''\n        }, // 一个文档包含的可以运行的代码，js 和 template\n        comp: {} // 一个文档包含的可以运行的组件 上一步、下一步\n      }\n    }\n  },\n  // 全局常量，使用 readonly \n  readonly:{\n   \n  },\n  // 跟踪状态，用 proxy 给 reactive 套娃\n  track: {\n   \n  },\n  // 可以给全局状态设置初始状态，同步数据可以直接在上面设置，如果是异步数据，可以在这里设置。\n  init (state, read) {\n    // console.log('状态-store', state)\n  }\n})\n```\n\n## 网站主题\n\nUI库采用 [element-plus](https://element-plus.gitee.io/zh-CN/guide/theming.html) ，所以设置主题的方式参考其官网说明。\n\n\n# Markdown的设置\n\n为了main.js 可以简洁一些，我们可以把 Markdown 的相关设置放在一个单独的文件进行。\n\nmain-md.js\n\n```js\n\n\n// Markdown 编辑器\nimport VueMarkdownEditor from '@kangc/v-md-editor'\nimport '@kangc/v-md-editor/lib/style/base-editor.css'\n// 在这里引入，不被识别？\n// import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'\nimport '@kangc/v-md-editor/lib/theme/style/vuepress.css'\n\n// 代码高亮\nimport Prism from 'prismjs'\n\n\n// emoji\nimport createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index'\nimport '@kangc/v-md-editor/lib/plugins/emoji/emoji.css'\n\n// 流程图\n// import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn'\n// import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css'\n\n// todoList\nimport createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index'\nimport '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css'\n\n// 代码行号\nimport createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';\n\n// 高亮代码行\nimport createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index'\nimport '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css'\n\n// 复制代码\nimport createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'\nimport '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'\n\n\n// markdown 显示器\nimport VMdPreview from '@kangc/v-md-editor/lib/preview'\n// import '@kangc/v-md-editor/lib/style/preview.css'\n\n\n/**\n * 设置 Markdown 编辑器 和浏览器\n * @param {*} vuepressTheme \n * @returns \n */\nexport default function setMarkDown (vuepressTheme) {\n\n  // 设置 vuePress 主题\n  VueMarkdownEditor.use(vuepressTheme,\n    {\n      Prism,\n      extend(md) {\n        // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展\n        // md.set(option).use(plugin);\n      },\n    }\n  )\n  \n  // 预览\n  VMdPreview.use(vuepressTheme,\n    {\n      Prism,\n      extend(md) {\n        // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展\n        // md.set(option).use(plugin);\n      },\n    }\n  )\n\n\n  // emoji\n  VueMarkdownEditor.use(createEmojiPlugin())\n  // 流程图\n  // VueMarkdownEditor.use(createMermaidPlugin())\n  // todoList\n  VueMarkdownEditor.use(createTodoListPlugin())\n  // 代码行号\n  VueMarkdownEditor.use(createLineNumbertPlugin())\n  // 高亮代码行\n  VueMarkdownEditor.use(createHighlightLinesPlugin())\n  // 复制代码\n  VueMarkdownEditor.use(createCopyCodePlugin())\n\n\n\n  // 预览的插件\n\n  VMdPreview.use(createEmojiPlugin())   // emoji\n  VMdPreview.use(createTodoListPlugin()) // todoList\n  VMdPreview.use(createLineNumbertPlugin()) // 代码行号\n  VMdPreview.use(createHighlightLinesPlugin()) // 高亮代码行\n  VMdPreview.use(createCopyCodePlugin()) // 复制代码\n\n\n  return {\n    VueMarkdownEditor,\n    VMdPreview\n  }\n\n}\n```\n\n然后 main.js\n\n```js\nimport { createApp } from 'vue'\nimport App from './App.vue'\n\n// 设置 axios 的 baseUrl\nconst baseUrl = (document.location.host.includes('.gitee.io')) ?\n  '/nf-press-edit/' :  '/'\n\n// 轻量级状态\n// 设置 indexedDB 数据库，存放文档的各种信息。\nimport { setupIndexedDB, setupStore, createRouter } from '/nf-press-edit'\n// 初始化 indexedDB 数据库\nsetupIndexedDB(baseUrl)\n  \n// UI库\nimport ElementPlus from 'element-plus'\nimport zhCn from 'element-plus/es/locale/lang/zh-cn'\n\n// 二次封装\nimport { nfElementPlus } from '@naturefw/ui-elp'\n// 设置icon\nimport installIcon from './icon/index.js'\n\n// 设置 Markdown 的配置函数\nimport setMarkDown from './main-md.js'\n\n// vuepress 主题\nimport vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'\n\nconst {\n  VueMarkdownEditor, // Markdown 的编辑器\n  VMdPreview // Markdown 的浏览器\n} = setMarkDown(vuepressTheme)\n\nconst app = createApp(App)\n\napp.use(setupStore) // 状态管理\n  .use(createRouter()) // 设置路由\n  .use(nfElementPlus) // 二次封装的组件\n  .use(installIcon) // 注册全局图标\n  .use(ElementPlus, { locale: zhCn, size: 'small' }) // UI库\n  .use(VueMarkdownEditor) // markDown编辑器\n  .use(VMdPreview) // markDown 显示\n  .mount('#app')\n\n```\n\n\n# 代码高亮\n\n需要在 vite.config.js 里面进行设置：\n\n```js\nimport { defineConfig, loadEnv } from 'vite'\nimport vue from '@vitejs/plugin-vue'\n// md 编辑器需要的 代码高亮功能\nimport prismjs from 'vite-plugin-prismjs'\n\ndefineConfig({\n  plugins: [\n    vue(),\n    prismjs({\n      languages: ['json', 'js','html', 'sql'], // all\n    })\n  ],\n  // 其他设置\n})\n\n```\n",
      ver: 3.1,
      time: 1647141697157,
      lastTime: 1647141697157,
      docId: "12_config",
    },
    "13_page": {
      md: "# 页面结构\n\n页面结构可以根据喜好进行设置，比如顶部用标题 + 导航；左侧用菜单，右侧显示文档内容。\n\n也可以采用其他布局方式。\n\nnf-press提供了几个基础组件（导航、菜单、文档等），然后可以进行灵活布局，可以自行加入版权信息、备案信息、广告等内容。\n\n# 举例\n\n* 使用 el-container 进行布局：\n\n```html\n  <el-container>\n    <el-header>\n      <!--导航-->\n      <div style=\"float: left;\">\n        <!--写网站logo、标题等-->\n        <h1>nf-press</h1>\n      </div>\n      <div style=\"float: right;min-width: 100px;height: 60px;padding-top: 13px;\">\n        <!--写网站logo、标题等-->\n        <el-switch v-model=\"$state.current.isView\" v-bind=\"itemProps\"></el-switch>\n      </div>\n      <div style=\"float: right;min-width: 600px;height: 60px;\">\n        <!--网站导航-->\n        <doc-navi ></doc-navi>\n      </div>\n    </el-header>\n    <el-container>\n      <!--左侧边栏-->\n      <el-aside width=\"330px\">\n        <!--菜单-->\n        <doc-menu v-if=\"$state.current.isView\" />\n        <doc-menu-edit v-else/>\n      </el-aside>\n      <el-main>\n        <!--文档区域-->\n        <component\n          :is=\"docControl[$state.current.isView]\"\n        />\n      </el-main>\n    </el-container>\n  </el-container>\n```\n\n* 然后加载组件：\n\n```js\n  import { defineAsyncComponent } from 'vue'\n  import { docMenu, docMenuEdit, docNavi } from '@naturefw/press-edit' // 菜单 导航 配置\n  import docView from './views/doc.vue' // 显示文档\n\n  // 加载文档\n  const docControl = {\n    true: docView,\n    false: defineAsyncComponent(() => import('./views/main.vue'))\n  }\n\n  const itemProps = {\n    'inline-prompt': true,\n    'active-text': '看',\n    'inactive-text': '写',\n    'active-color': '#378FEB',\n    'inactive-color': '#EA9712'\n  }\n```\n\n# 路由\n\n依据导航和菜单自动生成，总之很简单的样子。\n\n\n基本就是这样了。\n\n\n",
      ver: 3.1,
      time: 1647006100502,
      lastTime: 1647006100502,
      docId: "13_page",
    },
    "14_markdown": {
      md: "# Markdown\n\n在阅读本章节之前，请确保你已经对 Markdown 有所了解。如果你还不了解 Markdown ，请先学习一些  [Markdown](https://commonmark.org/help/) 教程。\n\n# 语法扩展\nnf-press 使用  [v-md-editor](http://ckang1229.gitee.io/vue-markdown-editor/zh/) 编写文档， v-md-editor 使用  [markdown-it](https://github.com/markdown-it/markdown-it) 来解析 Markdown 内容，因此可以借助于 markdown-it 插件来实现 语法扩展 。\n\n## 内置\n\nv-md-editor 提供了各种功能，很好很强大。\n\n## 标题锚点\n\nv-md-editor 提供了一种生成标题导航的功能，可以在右侧实现一个标题导航，便于浏览。\n\n## 连接\n还没想好。\n\n## Emoji\nv-md-editor 支持 [Emoji](http://ckang1229.gitee.io/vue-markdown-editor/zh/plugins/emoji.html)，可以在工具栏里面的“笑脸”输入Emoji。比如：\n:grinning: :heavy_check_mark:\n\n只是好像和 VuePress 的 Emoji不一致。\n\n## 代码块\nv-md-editor 提供了[代码高亮](http://ckang1229.gitee.io/vue-markdown-editor/zh/plugins/highlight-lines.html)、[行号](http://ckang1229.gitee.io/vue-markdown-editor/zh/plugins/line-number.html#引入)、[复制代码](http://ckang1229.gitee.io/vue-markdown-editor/zh/plugins/copy-code.html)等功能。\n\n# 在线编写、运行Vue代码（部分）\n\n让Vue的代码在文档里面运行起来，而且可以在线修改代码，然后再次运行，这个是不是很便于用于的体验？\n\n研究了一下Vue提供的动态组件，发现可以设置 template 以及 setup函数，那么是不是可以用这个组件实现呢？\n\n尝试了几次之后，发现，真的可以！\n\n我们可以在文档中编写 template 和 setup函数，template 本身就是字符串形式，直接设置即可。\n\nsetup 需要是函数，那么可以请出来 eval 做转换。\n\n然后我们就得到了，可以在线编写、运行Vue代码的功能。\n\n\n",
      ver: 3.1,
      time: 1647134289733,
      lastTime: 1647134289733,
      docId: "14_markdown",
    },
    "15_assets": {
      md: "# 静态资源\n\n## 插入本地图片\n\n1. 在 public 文件夹里面设置一个 img 的文件夹（也可以是其他名称），里面存放需要的图片。\n2. 使用工具栏“插入本地图片”插入图片，设置图片名称。\n\n![图片描述]({_baseUrl_}img/104_imptool.png)\n\n::: tip\n  因为考虑到本地环境和发布后的环境，baseUrl不一致，所以设置了一个“{\\_baseUrl_}”标签，会根据运行环境进行替换。\n:::\n\n",
      ver: 3.1,
      time: 1648019200004,
      lastTime: 1648019200004,
      docId: "15_assets",
    },
    "16_package": {
      md: "# 打包方式\n\n一开始采用vite的默认打包方式，但是发现单个js文件过大，于是改为按照模块分开打包的方式。\n\n但是文件还是有点大，于是又把编辑状态和浏览状态分开打包的方式，这样基本不会太大了。\n\n# 设置方式\n\n需要在 vite.config.js 里面进行设置\n\n```js\n    // 打包配置\n    build: {\n      sourcemap: true,\n      outDir: 'distp', //指定输出路径\n      assetsDir: 'static/img/', // 指定生成静态资源的存放路径\n      rollupOptions: {\n        output: {\n          manualChunks(id) {\n            if (id.includes('node_modules')) {\n              const arr = id.toString().split('node_modules/')[1].split('/')\n              switch(arr[0]) {\n                // case '@kangc': // md 编辑器\n                // case 'axios':\n                case '@popperjs':\n                case '@vue':\n                case 'element-plus': // UI 库\n                case '@element-plus': // 图标\n                case '@naturefw': // 自然框架\n                  return '_' + arr[0]\n                  break\n                default :\n                  return '__vendor' // 其他的模块统一打包\n                  break\n              }\n            }\n          },\n          chunkFileNames: 'static/js1/[name]-[hash].js',\n          entryFileNames: 'static/js2/[name]-[hash].js',\n          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'\n        },\n        brotliSize: false, // 不统计\n        target: 'esnext', \n        minify: 'esbuild' // 混淆器，terser构建后文件体积更小\n      }\n    },\n```\n\n* 不能分开打包的模块\n@kangc（@kangc/v-md-editor）、axios 分开打包的话，运行时会报错，所以不分开了。\n\n* 可以分开打包的模块\n其他的几个已知模块可以分开打包，比如 element-plus、vue等。\n\n# 编辑状态\n\n本地运行的时候需要编辑状态，我们设置 main.js、main-md.js、App.vue实现功能\n\n\n## main.js\n\n```js\nimport { createApp } from 'vue'\nimport App from './App.vue'\n\n// 设置 axios 的 baseUrl\nconst baseUrl = (document.location.host.includes('.gitee.io')) ?\n  '/doc-ui-elp/' :  '/'\n\n// 轻量级状态\n// 设置 indexedDB 数据库，存放文档的各种信息。\nimport { setupIndexedDB, setupStore, createRouter } from '@naturefw/press-edit'\n// 初始化 indexedDB 数据库\nsetupIndexedDB(baseUrl)\n  \n// UI库\n// import ElementPlus from 'element-plus'\n// import 'element-plus/lib/theme-chalk/index.css'\n// import 'dayjs/locale/zh-cn'\n// import zhCn from 'element-plus/es/locale/lang/zh-cn'\n\n// 二次封装\nimport { nfElementPlus } from '@naturefw/ui-elp'\n// 设置icon\nimport installIcon from './icon/index.js'\n\n// 设置 Markdown 的配置函数\nimport setMarkDown from './main-md.js'\n\n// 主题\nimport vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'\n\nconst {\n  VueMarkdownEditor, // Markdown 的编辑器\n  VMdPreview // Markdown 的浏览器\n} = setMarkDown(vuepressTheme)\n\nconst app = createApp(App)\n\napp.use(setupStore) // 状态管理\n  .use(createRouter()) // 设置路由\n  .use(nfElementPlus) // 二次封装的组件\n  .use(installIcon) // 注册全局图标\n  // .use(ElementPlus, { locale: zhCn, size: 'small' }) // UI库\n  .use(VueMarkdownEditor) // markDown编辑器\n  .use(VMdPreview) // markDown 显示\n  .mount('#app')\n\n```\n\n### main-md.js\n\n```js\n\n\n// Markdown 编辑器\nimport VueMarkdownEditor from '@kangc/v-md-editor'\nimport '@kangc/v-md-editor/lib/style/base-editor.css'\n// 在这里引入，不被识别？\n// import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'\nimport '@kangc/v-md-editor/lib/theme/style/vuepress.css'\n\n// 代码高亮\nimport Prism from 'prismjs'\n\n\n// emoji\nimport createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index'\nimport '@kangc/v-md-editor/lib/plugins/emoji/emoji.css'\n\n// 流程图\n// import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn'\n// import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css'\n\n// todoList\nimport createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index'\nimport '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css'\n\n// 代码行号\nimport createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';\n\n// 高亮代码行\nimport createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index'\nimport '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css'\n\n// 复制代码\nimport createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'\nimport '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'\n\n\n// markdown 显示器\nimport VMdPreview from '@kangc/v-md-editor/lib/preview'\n// import '@kangc/v-md-editor/lib/style/preview.css'\n\n\n/**\n * 设置 Markdown 编辑器 和浏览器\n * @param {*} vuepressTheme \n * @returns \n */\nexport default function setMarkDown (vuepressTheme) {\n\n  // 设置 vuePress 主题\n  VueMarkdownEditor.use(vuepressTheme,\n    {\n      Prism,\n      extend(md) {\n        // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展\n        // md.set(option).use(plugin);\n      },\n    }\n  )\n  \n  // 预览\n  VMdPreview.use(vuepressTheme,\n    {\n      Prism,\n      extend(md) {\n        // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展\n        // md.set(option).use(plugin);\n      },\n    }\n  )\n\n  \n  // emoji\n  VueMarkdownEditor.use(createEmojiPlugin())\n  // 流程图\n  // VueMarkdownEditor.use(createMermaidPlugin())\n  // todoList\n  VueMarkdownEditor.use(createTodoListPlugin())\n  // 代码行号\n  VueMarkdownEditor.use(createLineNumbertPlugin())\n  // 高亮代码行\n  VueMarkdownEditor.use(createHighlightLinesPlugin())\n  // 复制代码\n  VueMarkdownEditor.use(createCopyCodePlugin())\n  \n\n\n  // 预览的插件\n  \n  VMdPreview.use(createEmojiPlugin())\n  VMdPreview.use(createTodoListPlugin())\n  VMdPreview.use(createLineNumbertPlugin())\n  VMdPreview.use(createHighlightLinesPlugin())\n  VMdPreview.use(createCopyCodePlugin())\n  \n\n  return {\n    VueMarkdownEditor,\n    VMdPreview\n  }\n\n}\n```\n\n### App.vue\n```html\n  <el-container>\n    <el-header>\n      <!--导航-->\n      <div style=\"float: left;\">\n        <!--写网站logo、标题等-->\n        <h1> elementPlus二次封装的文档</h1>\n      </div>\n      <div style=\"float: right;min-width: 100px;height: 60px;padding-top: 13px;\">\n        <!--写网站logo、标题等-->\n        <el-switch v-model=\"$state.current.isView\" v-bind=\"itemProps\"></el-switch>\n      </div>\n      <div style=\"float: right;min-width: 500px;height: 60px;\">\n        <!--网站导航-->\n        <doc-navi ></doc-navi>\n      </div>\n    </el-header>\n    <el-container>\n      <!--左侧边栏-->\n      <el-aside width=\"330px\">\n        <!--菜单-->\n        <doc-menu v-if=\"$state.current.isView\" />\n        <doc-menu-edit v-else/>\n      </el-aside>\n      <el-main>\n        <!--文档区域-->\n        <component\n          :is=\"docControl[$state.current.isView]\"\n        />\n      </el-main>\n    </el-container>\n  </el-container>\n```\n\n```js\n  import { reactive, defineAsyncComponent } from 'vue'\n  import { ElHeader, ElContainer ,ElAside, ElMain, ElSwitch  } from 'element-plus'\n  import { docMenu, docMenuEdit, docNavi } from '@naturefw/press-edit' // 菜单 导航\n  import docView from './views/doc.vue' // 显示文档\n\n  // 加载菜单子控件\n  const docControl = {\n    true: docView,\n    false: defineAsyncComponent(() => import('./views/main.vue'))\n  }\n\n  const itemProps = reactive({\n    'inline-prompt': true,\n    'active-text': '看',\n    'inactive-text': '写',\n    'active-color': '#378FEB',\n    'inactive-color': '#EA9712'\n  })\n\n```\n\n## 浏览状态\n\n发布的版本并不需要编辑功能，所以我们可以去掉编辑的部分，只保留浏览功能，我们设置 view-main.js、view-main-md.js、view-App.vue实现功能。\n\n### view-main.js\n```js\nimport { createApp } from 'vue'\nimport App from './view-App.vue'\n\n// 设置 axios 的 baseUrl\nconst baseUrl = (document.location.host.includes('.gitee.io')) ?\n  '/doc-ui-elp/' :  '/'\n\n// 轻量级状态\n// 设置 indexedDB 数据库，存放文档的各种信息。\nimport { setupIndexedDB, setupStore, createRouter } from '@naturefw/press-edit'\n// 初始化 indexedDB 数据库\nsetupIndexedDB(baseUrl)\n   \n// 设置icon\nimport installIcon from './icon/index.js'\n\n// 设置 Markdown 的配置函数\nimport setMarkDown from './view-main-md.js'\n\n// 主题\nimport vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'\n\nconst {\n  VMdPreview // Markdown 的浏览器\n} = setMarkDown(vuepressTheme)\n\nconst app = createApp(App)\n\napp.use(setupStore) // 状态管理\n  .use(createRouter()) // 设置路由\n  .use(installIcon) // 注册全局图标\n  .use(VMdPreview) // markDown 显示\n  .mount('#app')\n\n```\n\n### view-main-md.js\n```js\n\n\n// Markdown 编辑器\nimport '@kangc/v-md-editor/lib/style/base-editor.css'\n// 在这里引入，不被识别？\n// import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'\nimport '@kangc/v-md-editor/lib/theme/style/vuepress.css'\n\n// 代码高亮\nimport Prism from 'prismjs'\n\n\n// emoji\nimport createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index'\nimport '@kangc/v-md-editor/lib/plugins/emoji/emoji.css'\n\n// 流程图\n// import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn'\n// import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css'\n\n// todoList\nimport createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index'\nimport '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css'\n\n// 代码行号\nimport createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';\n\n// 高亮代码行\nimport createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index'\nimport '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css'\n\n// 复制代码\nimport createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'\nimport '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'\n\n\n// markdown 显示器\nimport VMdPreview from '@kangc/v-md-editor/lib/preview'\n// import '@kangc/v-md-editor/lib/style/preview.css'\n\n\n/**\n * 设置 Markdown 编辑器 和浏览器\n * @param {*} vuepressTheme \n * @returns \n */\nexport default function setMarkDown (vuepressTheme) {\n  \n  // 预览\n  VMdPreview.use(vuepressTheme,\n    {\n      Prism,\n      extend(md) {\n        // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展\n        // md.set(option).use(plugin);\n      },\n    }\n  )\n\n  // 预览的插件\n  VMdPreview.use(createEmojiPlugin())\n  VMdPreview.use(createTodoListPlugin())\n  VMdPreview.use(createLineNumbertPlugin())\n  VMdPreview.use(createHighlightLinesPlugin())\n  VMdPreview.use(createCopyCodePlugin())\n  \n  return {\n    VMdPreview\n  }\n\n}\n```\n\n### view-App.vue\n```html\n  <el-container>\n    <el-header>\n      <!--导航-->\n      <div style=\"float: left;\">\n        <!--写网站logo、标题等-->\n        <h1> elementPlus二次封装的文档</h1>\n      </div>\n      <div style=\"float: right;min-width: 100px;height: 60px;padding-top: 13px;\">\n        <!--写网站logo、标题等-->\n      </div>\n      <div style=\"float: right;min-width: 500px;height: 60px;\">\n        <!--网站导航-->\n        <doc-navi ></doc-navi>\n      </div>\n    </el-header>\n    <el-container>\n      <!--左侧边栏-->\n      <el-aside width=\"330px\">\n... (10672 total length)",
      ver: 3.1,
      time: 1647134983689,
      lastTime: 1647134983689,
      docId: "16_package",
    },
    "17_loadcomp": {
      md: "# 加载vue组件\n\n一般我们会写一些组件作为演示demo，那么这些组件可以加到文档里面吗？\n\n当然可以了，设置方式也比较简单，首先需要在项目里做一下配置，然后在文档里面加入DIV即可。\n\n# 设置方式\n\n## 在项目里注册组件\n\n可以用 createRouter 进行注册，类似设置动态路由。\n\n/router/index.js\n```js\nimport { createRouter } from '@naturefw/press-edit'\n\n// 设置 axios 的 baseUrl\nconst baseUrl = (document.location.host.includes('.gitee.io')) ?\n  '/nf-press-edit/' :  '/'\n\nexport default createRouter({\n  baseUrl,\n  components: {\n    testComponent: () => import('../components/testCode.vue'),\n    testComponent2: () => import('../components/testCode2.vue')\n  }\n})\n```\n\n# 在 main.js 里挂载\n\n```js\nimport { createApp } from 'vue'\nimport App from './App.vue'\nimport router from './router'\n\napp.use(router) // 需要加载组件的路由\n  .mount('#app')\n\n```\n\n## 在文档里加载组件\n\n文档里面设置一个 div，设置id（定位用），然后设置组件的key和标题。可以用工具栏里面的“插入组件”快捷设置。\n\n![图片描述]({_baseUrl_}img/103_comptool.png)\n\n```html\n<div\n  id=\"test2\"\n  data-key=\"testComponent\"\n  data-title=\"这是一个好看的标题\"\n  data-props='{\"msg\":\"属性消息\"}'\n>\n  加载中\n</div>\n```\n\n* id：定位用。\n* data-key 注册组件的key，标识要加载的组件。\n* data-title 组件上面显示的标题。\n* data-props 组件需要的props属性，标准json格式。\n\n\n# 测试加载组件\n\n<div\n  id=\"test2\"\n  data-key=\"testComponent\"\n  data-title=\"加载组件的测试\"\n  data-props='{\"msg\":\"div设置的属性\"}'\n>\n  加载中\n</div>\n\n\n\n# 疑问\n\n* 为什么用div？\n因为还不会做 markdown-it 的插件\n\n* 为什么用 data-*？\n因为只有id和data-*被保留了，其他属性都被“吃掉”了。\n",
      ver: 3.1,
      time: 1648008974870,
      lastTime: 1648008974870,
      docId: "17_loadcomp",
    },
    "18_runcode": {
      md: '# 在线编写代码\n\n在线编写代码、修改代码，然后运行代码看效果，这样是不是很便于上手体验！于是实现了这个功能。\n\n::: warning\n  目前仅支持Vue相关的一些简单代码的演示。\n:::\n\n\n## 设置代码\n\n提供了一个简单的编写代码的方式，比较简陋，可以把写好的代码赋值粘贴过来。\n\n可以设置多段代码，每段代码都需要设置一个ID，主要是定位用，然后可以设置template和setup的代码。\n\nsetup里面需要设置 return。\n\n## 设置方式图例\n\n![设置代码的方式]({_baseUrl_}img/100_runcode.png)\n\n## 代码定位\n\n可以用工具栏里的“代码定位”，插入默认的div，然后ID设置为代码的ID即可。\n\n比如这样：\n\n![插入代码定位]({_baseUrl_}img/102_codetool.png)\n\n```html\n<div id="演示ref的使用方式">加载中</div>\n```\n\n::: tip\n  1. 直接使用DIV。\n  2. ID支持中文，但是中间不要有空格。\n  3. 如果不设置div，代码会在文档的最下面显示。\n:::\n\n## 展示效果实例图\n\n![设置代码的方式]({_baseUrl_}img/101_runcodeview.png)\n\n# 可以使用的代码\n\n* js的各种用法；\n* reactive、ref等；\n\n# 不支持的代码\n\n* import\n* 其他\n\n::: warning\n因为采用 iframe + CDN 的方式运行代码，所以需要在 /public/runcode/index.html 里面，按照 CDN的方式进行设置，无法共享项目里的全局组件、状态等。\n\n默认文件做了一些初始设置，如果需要自持其他插件，可以自行设置。\n\n:::\n\n# 亲自上手试试\n\n可以在下面修改代码，然后运行看效果。\n\n## 举例：ref 的使用方式\n<div id="演示ref的使用方式">加载中</div>\n\n## 举例： reactive 的使用方式\n<div id="演示reactive的使用方式">加载中</div>\n',
      ver: 3.1,
      time: 1648786755629,
      lastTime: 1648786755629,
      docId: "18_runcode",
    },
    "21_doc_navi": {
      md: '# 导航组件（docNavi）\n显示帮助文档的导航，可以设置为多级（暂未实现），导航分为两类：\n\n1. 链接菜单\n2. 链接外部URL\n\nlink设置为“menu”，表示单击后打开对应的菜单；\n设置为“URL地址”，表示单击后打开URL对应的网站。\n\n# 基于 el-menu 实现\n\n导航组件基于element-plus 的 el-menu，所以可以使用其属性、事件和方法。\n\n# 属性\n可以使用 el-menu 的各种属性，组件内部字段设置 el-menu-item 的 index属性。\n\n# 使用方式\n\n* template：\n```html\n<doc-navi></doc-navi>\n```\n或者\n```html\n<doc-navi\n  background-color="#545c64"\n  text-color="#fff"\n  active-text-color="#ffd04b"\n></doc-navi>\n```\n\n* js：\n```js\nimport { docMenu, docNavi } from \'@naturefw/press-edit\' // 菜单 导航\n```\n\n因为组件比较少，所以没有实现全局注册的功能。\n\n\n\n',
      ver: 3.1,
      time: 1645779946865,
      lastTime: 1645779946865,
      docId: "21_doc_navi",
    },
    "22_doc_menu": {
      md: '# 菜单组件（docMenu）—— 浏览版\n\n菜单组件，显示当前激活的导航项对应的菜单，可以多级，每一个菜单项对应一个文档（不能对应多个文档）。\n\n直接维护菜单，实现添加菜单、修改菜单和删除菜单，移动菜单项的功能待开发。\n\n## 编辑状态\n* 设置状态为“编辑”时，可以实现编辑功能\n* 设置状态为“浏览”时，仅有浏览功能\n\n# 基于el-menu开发\n\n菜单组件基于 element-plus 的 el-menu 开发，所以可以使用其属性、事件和方法。\n\n\n## 设置属性\n可以使用 el-menu 的各种属性，组件内部字段设置 el-menu-item 的 index属性。\n\n# 使用方式\n\n* template\n\n```html\n<doc-menu></doc-menu>\n```\n或者\n```html\n<doc-menu\n  background-color="#545c64"\n  text-color="#fff"\n  active-text-color="#ffd04b"\n></doc-menu>\n```\n\njs：\n```js\nimport { docMenu, docNavi } from \'/nf-press-edit\' // 菜单\n```\n',
      ver: 3.1,
      time: "",
      lastTime: "",
      docId: "22_doc_menu",
    },
    "23_md_edit": {
      md: "# 编辑 Markdown\n\n采用 v-md-editor 实现 Markdown 的编辑，支持各种插件，可以在main.js进行配置。\n\n# 支持可以运行的代码\n\n可以编写 template 模板，和 setup 里面的代码，可以在线运行，便于进行简单的代码演示，代码可以在线修改。\n\n# 其他功能（待完成）\n\n还想把 Markdown 里面不太方便的功能进行一下优化：\n\n* 表格的处理，Markdown 的表格方式比较麻烦，很容易弄错，所以想做个可以维护的表格。\n* 支持视频播放，HTML的video标签可以支持视频播放，那么设置好视频地址应该可以，尝试一下加入视频的功能。\n* 做个后端程序，自动创建文件，这样就不用手动下载文件了。\n* 导入 xxx.d.ts 文件，自动生成API文档。（待实现）\n\n\n\n",
      ver: 3.1,
      time: 1643976525243,
      lastTime: 1643976525243,
      docId: "23_md_edit",
    },
    "24_view": {
      md: "# 预览\n\n可以切换为预览模式，这样就和浏览版的界面基本一致了，便于实时查看效果。\n\n",
      time: 1648019460342,
      lastTime: 1648019460342,
      docId: "24_view",
      ver: 3.1,
    },
    "25_upload_doc": {
      md: '# 导出文档\n\n编辑好的文档可以导出json文件，也可以导出md格式的文件（不包括代码等内容）。\n\n## 导出json格式\n\n包括 编号、内容、最后修改时间戳、代码、组件等信息。\n\n示例：\n\n```json\n{\n  "md": "文档内容",\n  "ver": 1.5,\n  "time": 1643970489311,\n  "lastTime": 1643970489311,\n  "code": {\n    "js": "",\n    "template": "",\n    "style": ""\n  },\n  "comp": {},\n  "docId": "25000"\n}\n```\n\n## 导出 md 格式\n仅包括文档内容，便于在其他环境使用，比如交给VuePress。\n\n示例：\n\n```md\n# 导出文档\n\n编辑好的文档可以导出json文件，也可以导出md格式的文件（不包括代码等内容）。\n\n## 导出json格式\n\n包括 编号、内容、最后修改时间戳、代码、组件等信息。\n\n\n{\n  "md": "文档内容",\n  "ver": 1.5,\n  "time": 1643970489311,\n  "lastTime": 1643970489311,\n  "code": {\n    "js": "",\n    "template": "",\n    "style": ""\n  },\n  "comp": {},\n  "docId": "25000"\n}\n\n\n```',
      ver: 3.1,
      time: 1643086517354,
      lastTime: 1643086517354,
      docId: "25_upload_doc",
    },
    "26_upload_set": {
      md: "# 导出配置\n\n## 导出菜单\n导出全部的菜单。\n\n## 导出导航\n\n包括网站信息和导航信息。",
      ver: 3.1,
      time: 1643086517354,
      lastTime: 1643086517354,
      docId: "26_upload_set",
    },
  },
};
// 2.getter用于state中数据加工
const getters = {
  getMenuList(state) {
    return state.menuList;
  },
};
// 3.mutations用于操作数据
const mutations = {
  updateCurrent(state, { attr, val }) {
    Vue.set(state.current, attr, val);
  },
  updateBreadcrumb(state, val) {
    state.breadcrumb = Object.assign({}, state.breadcrumb, val);
  },
  updateDocInfo(state, val) {
    state.docInfo = Object.assign({}, state.docInfo, val);
  },
  resetDocInfo(state, val) {
    state.docInfo = Object.assign({}, val);
  },
  resetMenuInfo(state, val) {
    state.menuInfo = Object.assign({}, val);
  },
  updateMenuInfo(state, val) {
    state.menuInfo = Object.assign({}, state.menuInfo, val);
  },
  updateDocsMap(state, val) {
    state.docsMap = Object.assign({}, state.docsMap, val);
  },
  updateMenuList(state, val) {
    state.menuList = [...val];
  },
  updateProjectInfo(state, val) {
    state.projectInfo = Object.assign({}, state.projectInfo, val);
  },
  updateNaviList(state, val) {
    state.naviList = [...val];
  },
};
// 4.actions用于响应组件中的动作
const actions = {
  // 两秒之后进行性别的修改
  delayUpdateSex(content, val) {
    // 直接通过改变state中的数据
    // content.state.sex = val

    // 通过调用mutations对象中的函数对state中的数据进行操作
    setTimeout(() => {
      content.commit("updateSex", val);
      console.log("我是3秒后才执行的函数");
    }, 3000);
  },
};
// 创建并暴露store
export default new Vuex.Store({
  state,
  mutations,
});
