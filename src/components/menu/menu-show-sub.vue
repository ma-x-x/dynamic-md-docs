<template>
  <div>
    <template v-for="item in subMenus">
      <template v-if="item.children && item.children.length">
        <el-submenu :index="item.menuId" :key="item.menuId">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.text }}</span>
          </template>
          <menu-show-sub :subMenus="item.children" />
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :index="item.menuId" :key="item.menuId">
          <i :class="item.icon"></i>
          <span>{{ item.text }}</span>
        </el-menu-item>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "menuShowSub",
  props: {
    subMenus: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
