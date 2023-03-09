<template>
  <div
    style="position: fixed; width: 250px; right: 20px; top: 120px; z-index: 100"
  >
    <el-card class="box-card" style="margin-bottom: 20px">
      <template #header>
        <div class="card-header">
          <span>目录导航</span>
        </div>
      </template>
      <!--目录导航-->
      <div
        v-for="(anchor, index) in titles"
        :key="index"
        :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
        style="cursor: pointer"
        @click="handleAnchorClick(anchor)"
      >
        <!--目录连接-->
        <a style="cursor: pointer">{{ anchor.title }}</a>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Card as ElCard } from "element-ui";

export default {
  props: {
    titles: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ElCard,
  },
  methods: {
    handleAnchorClick(anchor) {
      console.log("anchor: ", anchor);
      this.$emit("handleAnchorClick", anchor);
    },
  },
};
</script>