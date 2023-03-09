<template>
  <div>
    <el-radio-group v-model="routerKind" size="mini">
      <el-radio-button label="编辑"></el-radio-button>
      <el-radio-button label="预览"></el-radio-button>
      <el-radio-button label="导出文档"></el-radio-button>
      <el-radio-button label="导出配置"></el-radio-button>
    </el-radio-group>
    <md-edit v-if="routerKind === '编辑'" />
    <md-preview v-if="routerKind === '预览'" />
    <md-output v-if="routerKind === '导出文档'" />
    <navi-output v-if="routerKind === '导出配置'" />
  </div>
</template>

<script >
import mdPreview from "@/components/md/md-preview.vue";
import mdEdit from "@/components/md/md-edit.vue";
import mdOutput from "@/components/md/md-output.vue";
import naviOutput from "@/components/navi/navi-output.vue";

export default {
  components: {
    mdPreview,
    mdEdit,
    mdOutput,
    naviOutput,
  },
  data() {
    return {
      routerKind: "预览",
    };
  },
};
// import {
//   RadioGroup as ElRadioGroup,
//   RadioButton as ElRadioButton,
// } from "element-ui";
// // 编辑和预览
// import {
//   mdEdit,
//   mdPreview,
//   mdOutput,
//   naviOutput,
//   docBreadcrumb,
// } from "@/lib/main";

// export default {
//   components: {
//     ElRadioGroup,
//     ElRadioButton,
//     mdEdit,
//     mdPreview,
//     mdOutput,
//     naviOutput,
//     docBreadcrumb,
//   },
//   data() {
//     return {
//       routerKind: "编辑",
//     };
//   },
// };
</script>