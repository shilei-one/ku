import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import {actions} from "./actions"
import {state,getters,mutations} from "./mutations"
import cate from './modules/cate'
import specs from './modules/specs'
import goods from './modules/goods'
import banner from './modules/banner'
import seckill from './modules/seckill'
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules:{
        cate,
        specs,
        goods,
        banner,
        seckill
    }
})