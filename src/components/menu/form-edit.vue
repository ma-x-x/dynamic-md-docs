<template>
  <!--弹窗，添加菜单 :append-to-body="true" -->
  <el-dialog
    title="修改菜单"
    :visible.sync="modelVisible"
    :modal="true"
    width="800px"
    :close-on-click-modal="true"
    :destroy-on-close="true"
    append-to-body
  >
    <form-data :model.sync="model" :disabledList="disabledList"> </form-data>
    <div slot="footer" class="dialog-footer">
      <div slot="footer" class="dialog-footer">
        <el-button @click="modelVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOne">确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { set, cloneDeep } from "lodash";
import FormData from "./form-data.vue";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    dialogInfo: Object,
    menus: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    FormData,
  },
  computed: {
    modelVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
  },
  data() {
    const isDirectory = this.dialogInfo?.menu.menuType === "directory";
    return {
      model: {
        menuId: new Date().getTime() + "",
        kind: isDirectory ? 2 : 1,
        menuType: "document",
        icon: "document",
        desc: "",
      },
      disabledList: ["kind", "menuType"],
    };
  },
  methods: {
    addOne() {
      this.$emit("submit", this.model);
    },
  },
};
</script >




