<template>
  <div class="main__container">
    <!--目录导航-->
    <MdCatalogue
      :titles="tag_title"
      :preview="preview"
      @handleAnchorClick="handleAnchorClick"
    >
    </MdCatalogue>
    <!--文档内容-->
    <div class="main__wrapper">
      <!--文档部分-->
      <v-md-preview
        ref="preview"
        :text="mdText"
        preview-class="vuepress-markdown-body"
        :height="editHeight + 'px'"
      >
      </v-md-preview>
      <div class="toc__space"></div>
    </div>
  </div>
</template>

<script>
import MdCatalogue from "@/components/md/md-catalogue.vue";
import { Row as ElRow, Col as ElCol } from "element-ui";

export default {
  components: {
    MdCatalogue,
    ElRow,
    ElCol,
  },
  computed: {
    mdText() {
      return this.$store.state.docInfo.md;
    },
  },
  watch: {
    mdText(val) {
      this.setAnchors();
    },
  },
  data() {
    return {
      preview: null,
      titles: [],
      tag_title: [],
      anchors: null,
      editHeight: document.documentElement.clientHeight - 200,
    };
  },
  mounted() {
    this.setAnchors();
  },
  methods: {
    // 设置标题导航
    setAnchors() {
      this.$nextTick(() => {
        this.titles.length = 0;
        this.tag_title.length = 0;

        this.anchors =
          this.$refs.preview.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");
        this.titles.push(
          ...Array.from(this.anchors).filter(
            (title) => !!title.innerText.trim()
          )
        );

        if (!this.titles.length) {
          this.tag_title.length = 0;
        }

        const hTags = Array.from(
          new Set(this.titles.map((title) => title.tagName))
        ).sort();

        this.tag_title.push(
          ...this.titles.map((el) => ({
            title: el.innerText,
            lineIndex: el.getAttribute("data-v-md-line"),
            indent: hTags.indexOf(el.tagName),
          }))
        );
      });
    },
    handleAnchorClick(anchor) {
      const { lineIndex } = anchor;

      const heading = this.$refs.preview.$el.querySelector(
        `[data-v-md-line="${lineIndex}"]`
      );

      if (heading) {
        this.$refs.preview.scrollToTarget({
          target: heading,
          scrollContainer: window,
          top: 60,
        });
      }
    },
  },
};
</script>

<style scoped>
.toc__space {
  width: 300px;
  flex-shrink: 0;
}
.main__wrapper {
  display: flex;
  width: 100%;
}

::v-deep .vuepress-markdown-body,
::v-deep .v-md-editor-preview {
  flex-grow: 1;
}
</style>



