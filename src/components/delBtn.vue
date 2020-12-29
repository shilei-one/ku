<template>
  <el-button type="danger" @click="del">删除</el-button>
</template>

<script>
export default {
  methods: {
    del() {
      this.$confirm("是否删除这条信息?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass: "el-button el-button--danger",
        type: "warning",
      })
        .then(() => {
            // 用户点了确定 通知删除
            this.$emit('confirm')
        })
        .catch(() => {});
    },
  },
};

</script>

<style>
</style>