<template>
  <div
    style="
      position: fixed;
      width: 300px;
      left: 10px;
      top: 100px;
      border: 0px solid #123123;
      z-index: 100;
    "
  >
    <el-menu
      :default-active="activeMenuId"
      class="el-menu-vertical-demo"
      :background-color="backgroundColor"
      @select="handleSelect"
    >
      <menu-show-sub :subMenus="menus" />
    </el-menu>
  </div>
</template>

<script>
import { find } from "lodash";
import MenuShowSub from "./menu-show-sub.vue";
export default {
  components: { MenuShowSub },
  props: {
    backgroundColor: {
      // 默认背景色
      type: String,
      default: "#ece5d9",
    },
  },
  computed: {
    activeMenuId() {
      return this.$route.params.docId;
    },
  },
  watch: {
    "current.naviId": {
      handler(id) {
        if (!id) return;
        const mm = this.menuList.find((item) => item.naviId === id);
        this.menus = [];
        if (mm) {
          this.menus.push(...mm.menus);
        }
        this.handleNaviIdChange();
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      docsMap: this.$store.state.docsMap,
      menuList: this.$store.state.menuList,
      current: this.$store.state.current,
      menus: [],
    };
  },
  methods: {
    handleNaviIdChange() {
      let id = this.$route.params.docId;
      if (this.$route.params.naviId !== this.current.naviId) {
        id = null;
      }
      console.log("this.menus: ", this.menus);
      const menuInfo =
        (id ? this.findMenuInfo(this.menus, id) : this.menus[0]) || {};
      this.$store.commit("resetMenuInfo", menuInfo);
      this.handleSelect(menuInfo?.menuId);
    },
    handleSelect(val) {
      const docInfo = this.docsMap[val] || {};
      this.$store.commit("resetDocInfo", docInfo);
      this.handleNav(docInfo.docId);
    },
    handleNav(docId) {
      let path = `/view/${this.current.naviId}${docId ? `/${docId}` : ""}`;
      if (path !== this.$route.path) {
        this.$router.push({ path });
      }
    },
    findMenuInfo(menus, docId) {
      let menuInfo = null;
      for (let item of menus) {
        if (item.menuId === docId) {
          return item;
        }
        if (item.children) {
          menuInfo = this.findMenuInfo(item.children, docId);
          if (menuInfo) {
            return menuInfo;
          }
        }
      }
      return menuInfo;
    },
  },
};
</script>


<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  max-width: 320px;
  min-height: 400px;
}
</style>
