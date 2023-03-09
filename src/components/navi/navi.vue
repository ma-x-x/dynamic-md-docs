<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-nav-horizontal-menu"
    mode="horizontal"
    :background-color="backgroundColor"
    @select="handleSelect"
  >
    <navi-sub :subMenus="naviList" />
  </el-menu>
</template>

<script>
import NaviSub from "./navi-sub.vue";
export default {
  components: {
    NaviSub,
  },
  props: {
    backgroundColor: {
      // 默认背景色
      type: String,
      default: "#ece5d9",
    },
    itemProps: Object,
  },
  mounted() {
    this.init();
  },
  computed: {
    current() {
      return this.$store.state.current;
    },
    naviList() {
      return this.$store.state.naviList;
    },
    activeIndex2() {
      let navId = this.$route.params.naviId;
      return navId;
    },
  },
  methods: {
    init() {
      let naviId = this.$route.params.naviId || this.naviList[0].naviId;
      this.$store.commit("updateCurrent", { attr: "naviId", val: naviId });
    },
    getNavi(arrNavi, arrPath, index) {
      const navi = arrNavi.find((item) => item.naviId === arrPath[index]);

      if (index === arrPath.length - 1) {
        // 最后一级，返回
        return navi;
      } else {
        return this.getNavi(navi.children, arrPath, index + 1);
      }
    },
    handleSelect(key, keyPath) {
      const navi = this.getNavi(this.naviList, keyPath, 0);
      if (navi.link === "menu") {
        // 打开菜单
        this.$store.commit("updateCurrent", { attr: "naviId", val: key });
      } else {
        // 打开连接
        window.open(navi.link, "_blank");
      }
    },
  },
};
</script>

<style >
.el-nav-horizontal-menu:not(.el-menu--collapse) {
  max-width: 800px;
}
</style>
