<template>
  <div class="breadcrumb__wrapper">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in breadcrumb" :key="item.id">
        {{ item.text }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      breadcrumb: [
        { id: 1, text: "首页" },
        { id: 2, text: "用户管理" },
      ],
    };
  },
};
</script>

<style scoped>
.breadcrumb__wrapper {
  height: 30px;
}
</style>


