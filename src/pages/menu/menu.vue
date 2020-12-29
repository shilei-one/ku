<template>
  <div>
    <el-button type="primary" @click="willadd">添加</el-button>
    <!-- 表格 -->
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
    <!-- 弹框 -->
    <!-- <v-add :info="info" @init="init" :list="list" ref='add'></v-add> -->
    <v-add :info="info" @init="init" :list="list" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { reqMenulist,  } from "../../utils/http";

export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        //  弹框消失
        isshow: false,
        // 用来判断是添加还是编辑
        isadd: true,
      },

      // 初始化列表数据
      list: [],
    };
  },
  methods: {
    // 点了添加按钮
    willadd() {
      // 弹框出现
      this.info.isshow = true;
      //是添加
      this.info.isadd = true;
    },
    init() {
      // 获取列表
      reqMenulist().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    //编辑
    edit(id) {
      // 弹框出现
      this.info.isshow = true;
      //是编辑
      this.info.isadd = false;
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