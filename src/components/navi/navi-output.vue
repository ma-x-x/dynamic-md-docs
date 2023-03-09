<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <div class="header__wrapper">
        <h3>project.json</h3>
        <el-button type="" @click="downNavi" size="mini">下载导航</el-button>
      </div>
      <el-input v-model="naviJsonStr" v-bind="tempProps"></el-input>
    </el-col>
    <el-col :span="12">
      <div class="header__wrapper">
        <h3>menu.json</h3>
        <el-button type="" @click="downMenu" size="mini">下载菜单</el-button>
      </div>
      <el-input v-model="menuJsonStr" v-bind="tempProps"></el-input>
    </el-col>
  </el-row>
</template>

<script>
import { downloadFile } from "@/utils/download";
import { mapState } from "vuex";
export default {
  computed: {
    docInfoStr() {
      return JSON.stringify(this.$store.state.docInfo, null, 2);
    },
    ...mapState(["menuList", "projectInfo", "naviList"]),
  },
  watch: {
    naviList: {
      handler() {
        const _navi = {
          projectId: this.projectInfo.projectId,
          title: this.projectInfo.title,
          description: this.projectInfo.description,
          navi: this.naviList,
        };
        this.naviJsonStr = JSON.stringify(_navi, null, 2);
      },
      immediate: true,
      deep: true,
    },
    menuList: {
      handler() {
        this.menuJsonStr = JSON.stringify(this.menuList, null, 2);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {},
  data() {
    return {
      naviJsonStr: "",
      menuJsonStr: "",
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
    downNavi() {
      //encodeURIComponent解决中文乱码
      const uri =
        "data:text/json;charset=utf-8,\ufeff" +
        encodeURIComponent(this.naviJsonStr);
      downloadFile(uri, `project.json`);
    },
    downMenu() {
      //encodeURIComponent解决中文乱码
      const uri =
        "data:text/json;charset=utf-8,\ufeff" +
        encodeURIComponent(this.menuJsonStr);
      // 获取菜单名称
      downloadFile(uri, `menu.json`);
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
