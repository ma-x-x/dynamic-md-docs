<template>
  <div @click.stop="">
    <!--菜单项、导航项的操作按钮组-->
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        <el-icon class="el-icon-setting" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="add"> 添加 </el-dropdown-item>
          <el-dropdown-item command="mod">修改</el-dropdown-item>
          <el-dropdown-item command="del">删除</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { get } from "lodash";
export default {
  inject: ["updateAddDialog", "updateModDialog", "delMenu"],
  props: {
    path: String,
    subMenu: Array,
    menu: Object,
    index: Number,
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "add":
          this.updateAddDialog(this.path);
          break;
        case "mod":
          this.updateModDialog(this.path);
          break;
        case "del":
          console.log("this.path: ", this.path);
          let path = this.path;
          this.$confirm("确认删除？", { type: "warning" }).then((_) => {
            this.delMenu(path);
          });
          break;
        default:
          break;
      }
    },
  },
};
</script>

