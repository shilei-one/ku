<template>
  <div>
    <!-- 表格 -->
    <v-list :list="list"  @init="init" @edit="edit($event)"></v-list>
    <!-- 弹框 -->
    <v-add :info="info"  @init="init" :list="list" ref="add"></v-add>
  </div>
</template>

<script>
import { reqmemberlist  } from "../../utils/http";
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        isshow: false,
      },
      list: [],
    };
  },
  methods: {
    // 点击弹框出现
    willadd() {
      this.info.isshow = true;
    },
    // 获取列表
    init() {
      reqmemberlist().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
      
    },
    //编辑
    edit(id) {
      // 弹框出现
      this.info.isshow = true;
      // 触发add的getOne
      this.$refs.add.getOne(id);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>