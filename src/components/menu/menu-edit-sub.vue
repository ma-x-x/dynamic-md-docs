<template>
  <div>
    <template v-for="(item, index) in subMenus">
      <template v-if="item.children && item.children.length">
        <el-submenu :key="item.menuId + '_' + index" :index="item.menuId">
          <template slot="title">
            <div class="sub__item-title">
              <span>
                <i class="el-icon-folder-opened"></i>
                <!-- <i :class="item.icon"></i> -->
                <span>{{ item.text }}</span>
              </span>
              <span>
                <menu-option
                  :path="`${path}[${index}]`"
                  :subMenu="subMenus"
                  :menu="item"
                  :index="index"
                >
                </menu-option>
              </span>
            </div>
          </template>
          <!--递归子菜单-->
          <menu-edit-sub
            :path="`${path}[${index}].children`"
            :subMenus="item.children"
          />
        </el-submenu>
      </template>
      <!--树叶-->
      <template v-else>
        <el-menu-item :index="item.menuId" :key="item.menuId + 'son_' + index">
          <div class="sub__item-title">
            <span>
              <i class="el-icon-document"></i>
              <!-- <i :class="item.icon"></i> -->
              <span>{{ item.text }}</span>
            </span>
            <span>
              <menu-option
                :path="`${path}[${index}]`"
                :subMenu="subMenus"
                :menu="item"
                :index="index"
              >
              </menu-option>
            </span>
          </div>
        </el-menu-item>
      </template>
    </template>
  </div>
</template>

<script>
import MenuOption from "./menu-option.vue";
export default {
  name: "menuEditSub",
  components: {
    MenuOption,
  },
  props: {
    path: {
      type: String,
      default: "",
    },
    subMenus: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style scoped>
.sub__item-title {
  display: flex;
  justify-content: space-between;
  padding-right: 12px;
}

::v-deep .el-submenu__icon-arrow {
  transform: translateY(20%);
}
</style>

