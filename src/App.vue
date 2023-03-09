<template>
  <div>
    <el-container>
      <el-header>
        <div class="header__container">
          <!--导航-->
          <div class="header-logo">
            <!--写网站logo、标题等-->
            <h1>{{ projectInfo.title || "帮助中心" }}</h1>
          </div>
          <div class="header-main">
            <!--网站导航-->
            <doc-navi></doc-navi>
            <el-tooltip content="设置标题及菜单" placement="bottom">
              <span @click="handleSetNavMenu">
                <el-icon class="el-icon-setting" />
              </span>
            </el-tooltip>
            <div class="header-setting">
              <!--写网站logo、标题等-->
              <el-switch
                :value="isView"
                v-bind="itemProps"
                @change="handleToggle"
              >
              </el-switch>
            </div>
          </div>
        </div>
      </el-header>
      <el-container>
        <!--左侧边栏-->
        <el-aside width="330px">
          <!--菜单-->
          <doc-menu v-if="isView" />
          <doc-menu-edit v-else />
        </el-aside>
        <el-main>
          <!-- <doc-breadcrumb></doc-breadcrumb> -->
          <!--文档区域-->
          <router-view></router-view>
          <!--讨论区域
        <iframe src="https://nfpress.gitee.io/nf-press-edit/vssue" style="width: 500px;height: 400px;"></iframe>
        -->
        </el-main>
      </el-container>
    </el-container>
    <navi-edit v-if="naviEditVisible" :visible.sync="naviEditVisible" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import DocNavi from "@/components/navi/navi.vue";
import DocMenu from "@/components/menu/menu-show.vue";
import DocMenuEdit from "@/components/menu/menu-edit.vue";
import DocBreadcrumb from "@/components/md/breadcrumb.vue";
import NaviEdit from "@/components/navi/navi-edit.vue";
// import { docMenu, docMenuEdit, docNavi } from "./lib/main"; // 菜单 导航 配置

export default {
  components: {
    DocNavi,
    DocMenu,
    DocMenuEdit,
    DocBreadcrumb,
    NaviEdit,
  },
  computed: {
    ...mapState(["projectInfo"]),
  },
  mounted() {},
  data() {
    return {
      isView: !this.$route.path.startsWith("/edit"),
      itemProps: {
        "inline-prompt": true,
        "active-text": "看",
        "inactive-text": "写",
        "active-color": "#378FEB",
        "inactive-color": "#EA9712",
      },
      naviEditVisible: false,
    };
  },
  methods: {
    handleToggle() {
      this.isView = !this.isView;
      let path = `/${this.isView ? "view" : "edit"}/${
        this.$route.params.naviId
      }/${this.$route.params.docId}`;
      if (path !== this.$route.path) {
        console.log("path: ", path);
        this.$router.replace(path);
      }
    },
    handleSetNavMenu() {
      this.naviEditVisible = true;
      console.log("this.naviEditVisible: ", this.naviEditVisible);
    },
  },
};
</script>

<style>
body {
  background-color: #ece5d9;
  margin: 0;
  padding: 0;
}
.el-header {
  background-color: #ece5d9;
  color: #303133;
  text-align: left;
  height: 80px !important;
  line-height: 30px;
  border: 1px solid #ccc !important;
  padding: 14px;
}

.el-aside {
  background-color: #ece5d9;
  color: #303133;
  text-align: left;
  line-height: 30px;
  min-height: 800px;
  border: 1px solid rgba(159, 196, 238, 0.315);
}

.el-main {
  background-color: #ece5d9;
  color: #303133;
  text-align: left;
  line-height: 18px;
}

body > .el-container {
  margin-bottom: 10px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 5px;
}

.header__container {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}

.header-logo {
  display: flex;
  align-items: center;
}

.header-main {
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  align-items: center;
}

.header-setting {
  margin-left: 60px;
  margin-right: 12px;
}

.el-icon-setting {
  cursor: pointer;
}
</style>
