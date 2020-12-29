<template>
  <div>
    <el-dialog :title="info.isadd?'添加':'编辑'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="80px">
          <el-input v-model="user.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="80px">
          <el-tree
            :data="menuList"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            :props="{ children:'children',label: 'title',}"
          ></el-tree>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successalert } from "../../../utils/alert";
import { indexRoutes } from "../../../router/index";
import {
  reqRoleadd,
  reqRoleDetail,
  reqRoleUpdate,
  reqMenulist,
} from "../../../utils/http";
export default {
  props: ["info", "list"],
  data() {
    return {
      user: {
        rolename: "",
        menus: "",
        status: 1,
      },
      menuList: [],
    };
  },
  mounted() {
    reqMenulist().then((res) => {
      if (res.data.code == 200) {
        this.menuList = res.data.list;
      }
    });
  },
  methods: {
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },

    // 清空user
    empty() {
      this.user = {
        rolename: "",
        menus: "",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    //点了添加
    add() {
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleadd(this.user).then((res) => {
        if (res.data.code == 200) {
          // 封装了成功弹框
          successalert(res.data.msg);
          // 弹框消失
          this.cancel();
          // 清空user
          this.empty();
          //列表刷新
          this.$emit("init");
        }
      });
    },
    // 获取详情
    getOne(id) {
      reqRoleDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.id = id;
          //给树形控件赋值
          this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));
        }
      });
    },
    //修改
    update() {
      //先取出树形控件的数据给menus，再发请求
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          //弹成功
          successalert(res.data.msg);
          //弹框消失
          this.cancel();
          //数据清空
          this.empty();
          //刷新list
          this.$emit("init");
        }
      });
    },
  },
};
</script>
 
<style>
</style>