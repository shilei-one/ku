import axios from "axios"
import qs from "qs"
import Vue from "vue"
import { erroralert } from "./alert"
import store from "../store"
import router from "../router"
//开发环境使用 8080
let baseUrl = "/api"
Vue.prototype.$pre = "http://localhost:3000"

//生产环境使用 打包
// let baseUrl=""
// Vue.prototype.$pre=""

//请求拦截
axios.interceptors.request.use(config=>{
    if(config.url!==baseUrl+"/api/userlogin"){
        config.headers.authorization=store.state.userInfo.token
    }
    return config
})


//响应拦截
axios.interceptors.response.use(res => {

    //处理失败
    if (res.data.code !== 200) {
        erroralert(res.data.msg)
    }

    //处理list是null
    if (!res.data.list) {
        res.data.list = []
    }
    //掉线处理
    if (res.data.msg === "登录已过期或访问权限受限") {
        //清除用户登录的信息 userInfo
        store.dispatch("changeUser", {})
        //跳到登录页面
        router.push("/login")
    }


    console.group("本次请求地址是：" + res.config.url)
    console.log(res);
    console.groupEnd()

    return res
})


//post 带有文件,参数转换
function dataToFormData(user) {
    let data = new FormData()
    for (let i in user) {
        data.append(i, user[i])
    }
    return data
}

//登录
export let reqLogin = (user) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(user)
    })
}


/*****************************菜单管理  start***************************************/

// 添加
export const reqMenuAdd = (user) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(user)
    })
}


// 列表
export let reqMenulist = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        params: {
            istree: true
        }
    })
}

// 删除
export let reqMenuDel = (obj) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify(obj)
    })
}

// 一条数据
export let reqMenuDetail = (obj) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        params: obj
    })
}

// 修改接口
export let reqMenuUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(user)
    })
}

/****************************菜单  end*******************************************/

/****************************角色管理  start*******************************************/
//添加
export let reqRoleadd = (user) => {
    return axios({
        url: baseUrl + '/api/roleadd',
        method: "post",
        data: qs.stringify(user)
    })
}

// 列表
export let reqRolelist = () => {
    return axios({
        url: baseUrl + '/api/rolelist',
    })
}

//删除
export let reqRoledel = (obj) => {
    return axios({
        url: baseUrl + '/api/roledelete',
        method: 'post',
        data: qs.stringify(obj)
    })
}


// 一条数据
export let reqRoleDetail = (obj) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        params: obj
    })
}

// 修改接口
export let reqRoleUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(user)
    })
}

/****************************角色管理  end*******************************************/

/****************************管理员管理 start******************************************/

//添加
export let reqManageAdd = (user) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(user)
    })
}

//列表 obj={page:1,size:50}
export let reqManagelist = (obj) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: obj
    })
}

//详情 user={uid:123342}
export let reqManageDetail = (user) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: user
    })
}

//修改 user={uid:"必填"}
export let reqManageUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(user)
    })
}

//删除 user={uid:13432}
export let reqManageDel = (user) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify(user)
    })
}
//总数
export let reqManageCount = () => {
    return axios({
        url: baseUrl + "/api/usercount"
    })
}

/****************************管理员管理 end******************************************/

/****************************分类管理 start******************************************/

//添加 user={img:File,catename:"12",pid:1}
export let reqcateAdd = (user) => {
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: dataToFormData(user)
    })
}

//列表 p={istree:true} {pid:1}
export let reqcatelist = (p) => {
    return axios({
        url: baseUrl + "/api/catelist",
        params: p
    })
}

//详情 user={id:1}
export let reqcateDetail = (user) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: user
    })
}

//修改 user={id:"必填",img:file,catename:""}
export let reqcateUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: dataToFormData(user)
    })
}

//删除 user={id:1}
export let reqcateDel = (user) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify(user)
    })
}

/****************************分类管理 end******************************************/

/************商品规格管理 start**************************/

//添加 user={}
export let reqspecsAdd = (user) => {

    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//列表 p={page:1,size:500}
export let reqspecslist = (p) => {
    return axios({
        url: baseUrl + "/api/specslist",
        params: p
    })
}

//详情 user={id:1}
export let reqspecsDetail = (user) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: user
    })
}

//修改 user={id:"必填",img:file,specsname:""}
export let reqspecsUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(user)
    })
}

//删除 user={id:1}
export let reqspecsDel = (user) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify(user)
    })
}

//总数
export let reqspecsCount = () => {
    return axios({
        url: baseUrl + "/api/specscount"
    })
}

/************商品规格管理 end**************************/

/************商品管理 start**************************/

//添加 user={}
export let reqgoodsAdd = (user) => {

    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: dataToFormData(user)
    })
}

//列表 p={page:1,size:500}
export let reqgoodslist = (p) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        params: p
    })
}

//详情 user={id:1}
export let reqgoodsDetail = (user) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: user
    })
}

//修改 user={id:"必填",img:file,goodsname:""}
export let reqgoodsUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: dataToFormData(user)
    })
}

//删除 user={id:1}
export let reqgoodsDel = (user) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(user)
    })
}

//总数
export let reqgoodsCount = () => {
    return axios({
        url: baseUrl + "/api/goodscount"
    })
}

/************商品管理 end**************************/


/****************************会员管理  start*******************************************/

// 列表
export let reqmemberlist = () => {
    return axios({
        url: baseUrl + '/api/memberlist',
    })
}



// 一条数据
export let reqmemberDetail = (obj) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        params: obj
    })
}

// 修改接口
export let reqmemberUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: qs.stringify(user)
    })
}

/****************************会员管理  end*******************************************/

/****************************轮播图管理 start******************************************/

//添加 user={img:File,catename:"12",pid:1}
export let reqbannerAdd = (user) => {
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: dataToFormData(user)
    })
}

//列表 
export let reqbannerlist = () => {
    return axios({
        url: baseUrl + "/api/bannerlist",
    })
}

//详情 user={id:1}
export let reqbannerDetail = (user) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params: user
    })
}

//修改 user={id:"必填",img:file,bannername:""}
export let reqbannerUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: dataToFormData(user)
    })
}

//删除 user={id:1}
export let reqbannerDel = (user) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify(user)
    })
}

/****************************轮播图管理 end******************************************/

/****************************秒杀管理 start******************************************/

//添加
export let reqseckAdd = (user) => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//列表 
export let reqsecklist = () => {
    return axios({
        url: baseUrl + "/api/secklist",
    })
}

//详情 user={uid:123342}
export let reqseckDetail = (user) => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        method: "get",
        params: user
    })
}

//修改 user={uid:"必填"}
export let reqseckUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: "post",
        data: qs.stringify(user)
    })
}

//删除 user={uid:13432}
export let reqseckDel = (user) => {
    return axios({
        url: baseUrl + "/api/seckdelete",
        method: "post",
        data: qs.stringify(user)
    })
}

/****************************秒杀管理 end******************************************/