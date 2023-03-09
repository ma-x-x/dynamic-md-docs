<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <div class="header__wrapper">
        <h3>{{ menuInfo.menuId }}.json</h3>
        <el-button type="" @click="downJson" size="mini">下载</el-button>
      </div>
      <el-input v-model="docInfoStr" v-bind="tempProps"></el-input>
    </el-col>
    <el-col :span="12">
      <div class="header__wrapper">
        <h3>MarkDown：{{ menuInfo.text }}</h3>
        <el-button type="" @click="downMD" size="mini">下载</el-button>
      </div>
      <el-input v-model="docInfo.md" v-bind="tempProps"></el-input>
    </el-col>
  </el-row>
</template>

<script>
import { downloadFile } from "@/utils/download";
export default {
  computed: {
    docInfo() {
      return this.$store.state.docInfo;
    },
    docInfoStr() {
      return JSON.stringify(this.$store.state.docInfo, null, 2);
    },
    menuInfo() {
      console.log("this.$store.state.menuInfo: ", this.$store.state.menuInfo);
      return this.$store.state.menuInfo;
    },
  },
  data() {
    return {
      tempProps: {
        // autosize: true,
        rows: 40,
        type: "textarea",
        placeholder: "下载内容",
      },
    };
  },
  methods: {
    // 下载json文件
    downJson() {
      //encodeURIComponent解决中文乱码
      const uri =
        "data:text/json;charset=utf-8,\ufeff" +
        encodeURIComponent(this.docInfoStr);
      downloadFile(uri, `${this.menuInfo.menuId}.json`);
    },
    // 下载纯 md 文件
    downMD() {
      //encodeURIComponent解决中文乱码
      const uri =
        "data:text/json;charset=utf-8,\ufeff" +
        encodeURIComponent(this.docInfo.md);
      // 获取菜单名称
      downloadFile(uri, `${this.menuInfo.menuId}.md`);
    },
  },
};
</script>


<style scoped lang="scss">
.header__wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  h3 {
    margin-right: 8px;
  }
}
</style>