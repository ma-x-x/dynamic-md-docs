<template>
  <div>
    <v-md-editor
      :toolbar="toolbar"
      :disabled-menus="[]"
      left-toolbar="undo redo clear | tip emoji code | customToolbar | h bold italic strikethrough quote | ul ol table hr | link image  | save "
      :include-level="[1, 2, 3, 4]"
      v-model="mdText"
      @upload-image="handleUploadImage"
      :height="editHeight + 'px'"
      @save="mySave"
    >
    </v-md-editor>
  </div>
</template>

<script>
export default {
  computed: {
    mdText: {
      get() {
        return this.$store.state.docInfo.md;
      },
      set(val) {
        this.$store.commit("updateDocInfo", {
          md: val,
        });
      },
    },
  },
  watch: {
    "current.docInfo.md": {
      handler() {
        this.timeSave();
      },
    },
  },
  data() {
    return {
      toolbar: {},
      editHeight: document.documentElement.clientHeight - 200,
      timeout: null,
      isSaved: true,
    };
  },
  methods: {
    mySave() {
      this.$store.commit("updateDocInfo", {
        md: this.mdText,
      });
    },
    handleUploadImage(event, insertImage, files) {
      console.log("files: ", files);
      this.$store.commit("updateDocInfo", {
        image: files,
      });
    },
    timeSave() {
      if (this.isSaved) {
        // 保存过了，重新计时
        this.isSaved = false;
      } else {
        return; // 有计时，退出
      }

      timeout = setTimeout(() => {
        // 保存文档

        this.isSaved = true;
      }, 10000);
    },
  },
};
</script>

