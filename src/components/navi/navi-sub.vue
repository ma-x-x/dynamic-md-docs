<template>
  <fragment>
    <template v-for="(item, index) in subMenus">
      <template v-if="item.children && item.children.length > 0">
        <el-submenu :key="item.naviId + '_' + index" :index="item.naviId">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.text }}</span>
          </template>
          <navi-sub :subMenus="item.children" />
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :index="item.naviId" :key="item.naviId + 'son_' + index">
          <i :class="item.icon"></i>
          <span>{{ item.text }}</span>
        </el-menu-item>
      </template>
    </template>
  </fragment>
</template>

<script>
export default {
  name: "naviSub",
  props: {
    subMenus: {
      type: Array,
      default: () => [],
    },
    dialogAddInfo: {
      type: Object,
      default: () => {},
    },
    dialogModInfo: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
