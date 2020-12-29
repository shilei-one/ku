import { reqbannerlist } from "../../utils/http"

 let state = {
    // 初始值
    list: [],
  
}
 let mutations = {
    // 修改list
   changeList(state,arr){
       state.list = arr
   },
 
}
let getters = {
    // 导出
   list(state){
       return state.list
   },
 
}
 let actions = {
    // 处理逻辑
    reqList(context,bool){
       
        reqbannerlist({istree:true}).then(res=>{
           if(res.data.code==200){
               context.commit('changeList',res.data.list)
           }
        })
    },
    //
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}