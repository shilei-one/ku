<template>
  <div class="form">
    <!-- 44.绑定closed  -->
    <el-dialog :title="info.isadd?'添加分类':'编辑分类'" :visible.sync="info.isshow" @closed="cancel">
      <!-- 14.数据绑定到页面 -->

      <el-form :model="user">
        <el-form-item label="轮播图标题" label-width="100px">
          <el-input v-model="user.title"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="100px" v-if="user.pid!==0">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg2"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
  reqbannerAdd,
  reqbannerDetail,
  reqbannerUpdate,
} from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
export default {
  // 4.接收info
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  data() {
    return {
      //图片地址
      imgUrl: "",
      //3.初始化user
      user: {
        title: "",
        img: null,
        status: 1,
      },
    };
  },
  mounted() {},
  methods: {
    ...mapActions({
      reqList: "banner/reqList",
    }),
    //js 上传文件
    changeImg(e) {
      let file = e.target.files[0];

      //文件大小验证 1M=1024KB 1KB=1024B
      if (file.size > 2 * 1024 * 1024) {
        erroralert("文件大小不能超过2M");
        return;
      }
      //后缀名
      //   let extname=file.name.slice(file.name.lastIndexOf("."));
      let extname = path.extname(file.name);
      let arr = [".png", ".gif", ".jpg", ".jpeg"];
      if (!arr.some((item) => item === extname)) {
        erroralert("请上传图片");
        return;
      }

      // 将文件生成一个url地址
      this.imgUrl = URL.createObjectURL(file);
      //赋值给user.img
      this.user.img = file;
    },

    //ui上传文件
    changeImg2(e) {
      let file = e.raw;
      //判断
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
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
      this.imgUrl = "";
      //3.初始化user
      this.user = {
        title: "",
        img: null,
        status: 1,
      };
    },
    checkProps() {
      return new Promise((resolve, reject) => {
        if (this.user.title === "") {
          erroralert("活动名称不能为空");
          return;
        }
        if (!this.user.img) {
          erroralert("请上传图片");
          return;
        }
        resolve();
      });
    },
    //4.添加
    add() {
      this.checkProps().then(() => {
        reqbannerAdd(this.user).then((res) => {
          if (res.data.code == 200) {
            // 封装了成功弹框
            successalert(res.data.msg);
            //弹框消失
            this.cancel();
            //5.清空user
            this.empty();
            //25.列表刷新
            this.reqList();
          }
        });
      });
    },

    //10.获取详情
    getOne(id) {
      reqbannerDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          //补id
          this.user.id = id;
          //处理图片
          this.imgUrl = this.$pre + this.user.img;
        }
      });
    },
    //40修改
    update() {
      this.checkProps().then(() => {
        reqbannerUpdate(this.user).then((res) => {
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
/* 原生js的样式 */
.my-upload {
  width: 100px;
  height: 100px;
  border: 1px dashed #999;
  position: relative;
}

.my-upload .add {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color: #666;
}

.my-upload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}

.my-upload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}

/* element-ui的样式 */
.form >>>.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>