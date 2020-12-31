<template>
  <div class="form">
    <!-- 44.绑定closed  -->
    <el-dialog :title="info.isadd?'添加规格':'编辑规格'" :visible.sync="info.isshow" @closed="cancel">
      <!-- 14.数据绑定到页面 -->
      <el-form :model="user">
        <el-form-item label="规格名称" label-width="100px">
          <el-input v-model="user.specsname" placeholder></el-input>
        </el-form-item>

        <el-form-item
          label="规格属性"
          label-width="100px"
          v-for="(item,index) in attrsArr"
          :key="index"
        >
          <div class="box">
            <el-input v-model="item.value"></el-input>
            <el-button type="primary" v-if="index==0" @click="addAttr">新增规格属性</el-button>
            <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
          </div>
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
import {
  reqspecsAdd,
  reqspecsDetail,
  reqspecsUpdate,
} from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({}),
  },
  // 4.接收info
  props: ["info"],
  data() {
    return {
      //3.初始化user
      user: {
        specsname: "",
        attrs: "[]",
        status: 1,
      },
      attrsArr: [{ value: "" }],
    };
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqTotal: "specs/reqTotal",
    }),

    //6.点了取消
    cancel() {
      //45.编辑清空数据
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //新增属性
    addAttr() {
      this.attrsArr.push({ value: "" });
    },
    // 删除属性
    delAttr(index) {
      this.attrsArr.splice(index, 1);
    },
    //清空user
    empty() {
      //3.初始化user
      this.user = {
        specsname: "",
        attrs: "[]",
        status: 1,
      };
      this.attrsArr = [
        {
          value: "",
        },
      ];
    },
    checkProps() {
      return new Promise((resolve) => {
        if (this.user.specsname === "") {
          erroralert("规格名称不能为空");
          return;
        }
        if (this.attrsArr.some((item) => item.value === "")) {
          erroralert("请输入所有的规格属性");
          return;
        }
        resolve();
      });
    },

    //4.添加
    add() {
      this.checkProps().then(() => {
        //  将sttrsArr里面的值转成字符串数组赋给
        this.user.attrs = JSON.stringify(
          this.attrsArr.map((item) => item.value)
        );
        reqspecsAdd(this.user).then((res) => {
          if (res.data.code == 200) {
            // 封装了成功弹框
            successalert(res.data.msg);
            //弹框消失
            this.cancel();
            //5.清空user
            this.empty();
            //25.列表刷新
            this.reqList();
            this.reqTotal();
          }
        });
      });
    },

    //10.获取详情
    getOne(id) {
      reqspecsDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list[0];
          this.user.attrs = JSON.parse(this.user.attrs);

          this.attrsArr = this.user.attrs.map((item) => ({ value: item }));
        }
      });
    },
    //40修改
    update() {
      this.checkProps().then(() => {
        this.user.attrs = JSON.stringify(
          this.attrsArr.map((item) => item.value)
        );
        reqspecsUpdate(this.user).then((res) => {
          if (res.data.code == 200) {
            //弹成功
            successalert(res.data.msg);
            //弹框消失
            this.cancel();
            //数据清空
            this.empty();
            //刷新list
            this.reqList();
          }
        });
      });
    },
  },
};
</script>

<style scoped lang="stylus">
.box {
  width: 100%;
  display: flex;
}

.box el-button {
  flex: auto;
}

.box el-input {
  flex: 1;
}
</style>