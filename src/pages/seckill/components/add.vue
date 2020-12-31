<template>
  <div class="form">
    <!-- 44.绑定closed  -->
    <el-dialog :title="info.isadd?'添加活动':'编辑活动'" :visible.sync="info.isshow" @closed="cancel">
      <!-- 14.数据绑定到页面 -->
      <div>user:{{user}}</div>
      <div>time:{{time}}</div>
      <el-form :model="user">
        <el-form-item label="活动名称" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="100px">
          <div class="block">
            <el-date-picker
              v-model="time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="center"
            ></el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid" @change="changeFirstCateId">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid" @change="changeSecondCateId">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="100px">
          <el-select v-model="user.goodsid">
            <el-option value label="--请选择--" disabled></el-option>
            <el-option
              v-for="item in goodsCateList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
  reqcatelist,
  reqseckAdd,
  reqseckDetail,
  reqseckUpdate,
  reqgoodslist,
} from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
export default {
  // 4.接收info
  props: ["info"],
  data() {
    return {
      //3.初始化user
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      time: "",

      //二级分类的列表
      secondCateList: [],
      //商品列表
      goodsCateList: [],
    };
  },

  computed: {
    ...mapGetters({
      list: "seckill/list",
      //一级的list
      cateList: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      //分类列表的获取
      reqCateList: "cate/reqList",
      reqList: "seckill/reqList",
    }),
    //修改了一级分类
    changeFirstCateId() {
      //二级分类选中的要清除
      this.user.second_cateid = "";
      this.getSecondList();
    },
    //根据一级分类，计算出二级分类的list
    getSecondList() {
      reqcatelist({ pid: this.user.first_cateid }).then((res) => {
        if (res.data.code == 200) {
          this.secondCateList = res.data.list;
        }
      });
    },
    // 修改二级分类
    changeSecondCateId() {
      this.user.goodsid = "";
      this.getGoodsList();
    },
    getGoodsList() {
      reqgoodslist({
        pid: this.user.first_cateid,
        sid: this.user.second_cateid,
      }).then((res) => {
        if (res.data.code == 200) {
          this.goodsCateList = res.data.list;
        }
      });
    },

    //6.点了取消
    cancel() {
      //45.编辑清空数据
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //清空user
    empty() {
      (this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      }),
        (this.time = "");
    },
    //4.添加
    add() {
      reqseckAdd(this.user).then((res) => {
        this.user.begintime = JSON.stringify(this.time[0]);
        this.user.endtime = JSON.stringify(this.time[1]);
        if (res.data.code == 200) {
          // 封装了成功弹框
          successalert(res.data.msg);
          this.cancel();
          //5.清空user
          this.empty();
          //25.列表刷新
          this.reqList();
        }
      });
    },

    //10.获取详情
    getOne(id) {
      reqseckDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          //补id
          this.user.id = id;
        }
      });
    },
    //40修改
    update() {
      reqseckUpdate(this.user).then((res) => {
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
    },
  },
  mounted() {
    //如果没有请过分类数据，就发一下请求
    if (this.cateList.length === 0) {
      this.reqCateList();
    }
    this.getGoodsList();
  },
};
</script>

<style scoped lang="stylus"></style>