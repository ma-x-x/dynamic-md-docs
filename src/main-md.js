

// Markdown 编辑器
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
// 在这里引入，不被识别？
// import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

// 代码高亮
import Prism from 'prismjs'


// emoji
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index'
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css'

// 流程图
// import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn'
// import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css'

// todoList
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index'
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css'

// 代码行号
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';

// 高亮代码行
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index'
import '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css'

// 复制代码
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'


// markdown 显示器
import VMdPreview from '@kangc/v-md-editor/lib/preview'
// import '@kangc/v-md-editor/lib/style/preview.css'


/**
 * 设置 Markdown 编辑器 和浏览器
 * @param {*} vuepressTheme 
 * @returns 
 */
export default function setMarkDown (vuepressTheme) {

  // 设置 vuePress 主题
  VueMarkdownEditor.use(vuepressTheme,
    {
      Prism,
      extend(md) {
        // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
        // md.set(option).use(plugin);
        // console.log(md)
      },
    }
  )
  
  // 预览
  VMdPreview.use(vuepressTheme,
    {
      Prism,
      extend(md) {
        // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
        // md.set(option).use(plugin);
      },
    }
  )


  // emoji
  VueMarkdownEditor.use(createEmojiPlugin())
  // 流程图
  // VueMarkdownEditor.use(createMermaidPlugin())
  // todoList
  VueMarkdownEditor.use(createTodoListPlugin())
  // 代码行号
  VueMarkdownEditor.use(createLineNumbertPlugin())
  // 高亮代码行
  VueMarkdownEditor.use(createHighlightLinesPlugin())
  // 复制代码
  VueMarkdownEditor.use(createCopyCodePlugin())



  // 预览的插件

  VMdPreview.use(createEmojiPlugin())   // emoji
  VMdPreview.use(createTodoListPlugin()) // todoList
  VMdPreview.use(createLineNumbertPlugin()) // 代码行号
  VMdPreview.use(createHighlightLinesPlugin()) // 高亮代码行
  VMdPreview.use(createCopyCodePlugin()) // 复制代码


  return {
    VueMarkdownEditor,
    VMdPreview
  }

}