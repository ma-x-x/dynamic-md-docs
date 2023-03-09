<template>
  <el-dialog
    title="修改顶部导航"
    :visible.sync="modelVisible"
    top="50px"
    width="80%"
  >
    <el-form :model="formData" ref="formRef" :rules="rules">
      <el-form-item label="文档名称" prop="title">
        <el-input
          v-model="formData.title"
          placeholder="请输入文档名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="文档描述" prop="description">
        <el-input
          v-model="formData.description"
          type="textarea"
          placeholder="请输入文档描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="顶部导航" prop="naviJsonStr">
        <el-input
          v-model="formData.naviJsonStr"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 20 }"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="modelVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    modelVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
    ...mapState(["menuList", "projectInfo", "naviList"]),
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    naviList: {
      handler() {
        this.formData.naviJsonStr = JSON.stringify(this.naviList, null, 2);
      },
      immediate: true,
      deep: true,
    },
    projectInfo: {
      handler(val) {
        this.formData = Object.assign({}, this.formData, val);
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      formData: {
        title: this.projectInfo?.title,
        description: this.projectInfo?.description,
        naviJsonStr: JSON.stringify(this.naviList, null, 2),
      },
      rules: {
        title: [
          { required: true, message: "文档名称不能为空", trigger: "blur" },
        ],
        naviJsonStr: [{ validator: this.validateNaviMenu, trigger: "blur" }],
      },
      tempProps: {
        // autosize: true,
        autosize: "{ minRows: 10, maxRows: 20}",
        type: "textarea",
        placeholder: "下载内容",
      },
    };
  },
  methods: {
    validateNaviMenu(rule, value, callback) {
      if (!value || !value.trim()) {
        callback(new Error("请配置顶部导航"));
      } else if (!this.isJsonStr(value)) {
        console.log("value: ", value);
        callback(new Error("请正确配置顶部导航，格式为JSON"));
      }
      callback();
    },
    isJsonStr(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    },
    handleSave() {
      this.$refs["formRef"].validate((valid) => {
        if (valid) {
          let projectInfo = {
            title: this.formData.title,
            description: this.formData.description,
          };
          this.$store.commit("updateProjectInfo", projectInfo);
          let naviList = JSON.parse(this.formData.naviJsonStr);
          console.log("naviList: ", naviList);
          this.$store.commit("updateNaviList", naviList);
          this.modelVisible = false;
        }
      });
    },
  },
};
</script>