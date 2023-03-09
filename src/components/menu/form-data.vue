<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="formData"
    label-width="100px"
    class="demo-formData"
  >
    <el-form-item label="菜单编码" prop="menuId">
      <el-input
        style="width: 300px"
        v-model="formData.menuId"
        disabled
        placeholder="请输入菜单编码"
      ></el-input>
    </el-form-item>
    <el-form-item label="层级" prop="kind">
      <el-radio-group
        v-model="formData.kind"
        placeholder="请选择菜单层级"
        :disabled="disabledList.includes('kind')"
      >
        <el-radio :label="1">同级</el-radio>
        <el-radio :label="2">子级</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="菜单类型" prop="menuType">
      <el-radio-group
        v-model="formData.menuType"
        placeholder="请选择菜单类型"
        :disabled="disabledList.includes('menuType')"
      >
        <el-radio label="directory">目录</el-radio>
        <el-radio label="document">文档</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="菜单名称" prop="text">
      <el-input
        style="width: 300px"
        v-model="formData.text"
        placeholder="请输入菜单名称"
      ></el-input>
    </el-form-item>
    <el-form-item label="菜单图标" prop="icon">
      <el-select v-model="formData.icon" placeholder="请选择菜单图标">
        <el-option v-for="icon in icons" :value="icon" :key="icon">
          <i :class="`el-icon-${icon}`"></i>（{{ icon }}）
        </el-option>
      </el-select>
      <span style="margin-lef: 4px"
        ><i :class="`el-icon-${formData.icon}`"></i
      ></span>
    </el-form-item>
    <el-form-item label="描述" prop="desc">
      <el-input
        type="textarea"
        v-model="formData.desc"
        placeholder="请输入描述"
      ></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import icons from "./json/icons.json";
export default {
  props: {
    model: {
      type: Object,
      required: true,
    },
    disabledList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      icons,
      rules: {
        menuId: [
          { required: true, message: "请输入菜单编码", trigger: "blur" },
        ],
        text: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
      },
    };
  },
  computed: {
    formData: {
      get() {
        return this.model;
      },
      set(val) {
        this.$emit("update:model", val);
      },
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>