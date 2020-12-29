<template>
  <div>
    <!-- 24.遍历list -->
    <!-- :tree-props="{children:'哪个字段用来判断有下一层'}" -->
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="规格编号" sortable></el-table-column>
      <el-table-column prop="specsname" label="规格名称" sortable></el-table-column>
      <el-table-column label="规格属性" sortable width="180">
        <template slot-scope="scope">
          <el-tag type="success" v-for="(item,index) in scope.row.attrs" :key="index">{{item}}</el-tag>
        </template>
        
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="size"   @current-change="changePage"></el-pagination>
  </div>
</template>

<script>
import { reqspecsDel } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "specs/list",
      total:'specs/total',
      size:'specs/size'
    }),
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqTotal:'specs/reqTotal',
      changePage:'specs/changePage'
    }),

    //31.删除
    del(id) {
      reqspecsDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.reqList();
        }
      });
    },
    //34.点了编辑按钮
    edit(id) {
      //通知父组件有人点了编辑按钮
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.reqList();
    this.reqTotal()
  },
};
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>