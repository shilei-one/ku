<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="uid" label="会员编号" width="180"></el-table-column>
      <el-table-column prop="nickname" label="会员名称"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>  
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  props: ["list"],
  methods: {
    // 点了编辑
    edit(id) {
      this.$emit("edit", id);
    },
  },
};
</script>

<style>
</style>