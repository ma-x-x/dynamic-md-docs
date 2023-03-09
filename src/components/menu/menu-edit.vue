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
      ref="domMenu"
      class="el-menu-vertical-demo"
      :default-active="activeMenuId"
      :background-color="backgroundColor"
      @select="handleSelect"
    >
      <el-menu-item
        v-if="!Array.isArray(menus) || menus.length === 0"
        index="-1"
      >
        <i class="el-icon-plus" style="color: #1890ff">添加菜单 </i>
      </el-menu-item>
      <!--递归调用，支持n级菜单 myMenu-->
      <menu-edit-sub v-else :subMenus="menus" />
    </el-menu>
    <!--添加的表单-->
    <form-add
      v-if="dialogAddInfo.isShow"
      :menus="menus"
      :visible.sync="dialogAddInfo.isShow"
      :dialogInfo="dialogAddInfo"
      @submit="handleAdd"
    />
    <!--修改的表单-->
    <my-form-edit
      v-if="dialogModInfo.isShow"
      :current="current"
      :dialogInfo="dialogModInfo"
    />
  </div>
</template>


<script>
import { set, get, unset, find, cloneDeep } from "lodash";
import FormAdd from "./form-add.vue";
// import MyFormEdit from "./form-edit.vue";
import MenuEditSub from "./menu-edit-sub.vue";
import { mapState } from "vuex";
export default {
  components: {
    FormAdd,
    MenuEditSub,
  },
  provide() {
    return {
      menusIndex: 0,
      menus: this.menus,
      updateAddDialog: this.updateAddDialogInfo,
      updateModDialog: this.updateModDialogInfo,
      delMenu: this.delMenu,
    };
  },
  data() {
    return {
      menus: [],
      activeMenuId: "",
      current: {},
      dialogAddInfo: {
        isShow: false,
        title: "",
        content: "",
      },
      dialogModInfo: {
        isShow: false,
        id: "",
        title: "",
        content: "",
      },
    };
  },
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
    ...mapState(["menuList", "docsMap", "current"]),
  },
  watch: {
    "current.naviId": {
      handler(id) {
        this.updateMenus(id, this.menuList);
        this.handleNaviIdChange();
      },
      immediate: true,
      deep: true,
    },
    menuList: {
      handler(val) {
        this.updateMenus(this.current.naviId, val);
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      menus: [],
      dialogAddInfo: {
        isShow: false,
        path: "",
        menu: {},
      },
      dialogModInfo: {
        isShow: false,
        path: "",
        menu: {},
      },
    };
  },
  methods: {
    getFirstLeafMenuId(menus) {
      let firstLeafMenuId = "";
      for (let item of menus) {
        if (Array.isArray(item.children) && item.children.length > 0) {
          firstLeafMenuId = this.getFirstLeafMenu(item.children);
        } else {
          firstLeafMenuId = item.menuId;
        }
        return firstLeafMenuId;
      }
    },
    handleAddMenu() {
      console.log("handleAddMenu");
      this.dialogAddInfo = Object.assign({}, this.dialogAddInfo, {
        isShow: true,
        path: "",
        menu: [],
      });
    },
    updateMenus(naviId, menuList) {
      if (!naviId) return;
      const mm = menuList.find((item, index) => {
        if (item.naviId === naviId) {
          this.menusIndex = index;
          return true;
        }
        return false;
      });
      // 可能会找不到对应的菜单
      this.menus = [];
      if (mm) {
        this.menus.push(...mm.menus);
      }
    },
    handleNaviIdChange() {
      let id = this.$route.params.docId;
      if (this.$route.params.naviId !== this.current.naviId) {
        id = null;
      }
      const menuInfo =
        (id ? find(this.menus, { menuId: id }) : this.menus[0]) || {};
      this.$store.commit("resetMenuInfo", menuInfo);
      this.handleSelect(menuInfo?.menuId);
    },
    handleSelect(val) {
      if (val === "-1") {
        this.handleAddMenu();
        return;
      }
      const docInfo = this.docsMap[val] || {};
      this.$store.commit("resetDocInfo", docInfo);
      this.handleNav(docInfo.docId);
    },
    handleNav(docId) {
      let path = `/edit/${this.current.naviId}${docId ? `/${docId}` : ""}`;
      if (path !== this.$route.path) {
        this.$router.push({ path });
      }
    },
    savaMenuList() {
      const _menus = {
        naviId: this.current.naviId,
        ver: this.current.ver,
        menus: [],
      };
    },
    updateAddDialogInfo(curPath) {
      const menu = get(this.menus, curPath);
      this.dialogAddInfo = Object.assign({}, this.dialogAddInfo, {
        isShow: true,
        path: curPath,
        menu,
      });
    },
    updateModDialogInfo() {
      this.dialogModInfo.isShow = true;
    },
    delMenu(path) {
      const menus = cloneDeep(this.menus);
      const menu = get(this.menus, path);
      const menuList = cloneDeep(this.menuList);
      const lastPathIndex = path.lastIndexOf("[");
      const parentPath = path.substring(0, lastPathIndex);
      const lastPathNumber = Number(
        path.substring(lastPathIndex + 1, path.length - 1)
      );
      const parentMenu = parentPath ? get(menus, parentPath) : menus;
      parentMenu.splice(lastPathNumber, 1);
      set(menus, parentPath, parentMenu);
      menuList[this.menusIndex].menus = menus;
      this.$store.commit("updateMenuList", menuList);
      this.$store.commit("updateDocsMap", { [menu.menuId]: undefined });
      let firstDocId = this.getFirstLeafMenuId(this.menus);
      this.handleSelect(firstDocId);
    },
    handleAdd(model) {
      let kind = model.kind;
      const menus = cloneDeep(this.menus);
      const menuList = cloneDeep(this.menuList);
      const docInfo = {
        md: "请输入内容",
        ver: 3.1,
        time: new Date().getTime(),
        lastTime: new Date().getTime(),
        docId: model.menuId,
      };
      if (menus.length == 0) {
        menus.push(model);
        if (!this.menusIndex && this.menusIndex !== 0) {
          menuList.push({ naviId: this.current.naviId, menus: menus });
        } else {
          menuList[this.menusIndex].menus = menus;
        }
        this.$store.commit("updateMenuList", menuList);
        this.$store.commit("updateDocsMap", { [model.menuId]: docInfo });
        this.dialogAddInfo = { isShow: false, path: "", menu: {} };
        return;
      }
      const path = this.dialogAddInfo.path;
      const lastPathIndex = path.lastIndexOf("[");
      const parentPath = path.substring(0, lastPathIndex);
      const lastPathNumber = Number(
        path.substring(lastPathIndex + 1, path.length - 1)
      );
      // 同级增加
      if (kind === 1) {
        const parentMenu = parentPath ? get(menus, parentPath) : menus;
        parentMenu.splice(lastPathNumber + 1, 0, model);
        set(menus, parentPath, parentMenu);
      } else {
        const menu = get(menus, path);
        const children = menu.children || [];
        children.push(model);
        set(menus, `${path}.children`, children);
      }
      menuList[this.menusIndex].menus = menus;
      this.$store.commit("updateMenuList", menuList);
      this.$store.commit("updateDocsMap", { [model.menuId]: docInfo });
      this.dialogAddInfo = { isShow: false, path: "", menu: {} };
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


