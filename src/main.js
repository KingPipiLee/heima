// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刚进入网站，肯定会调用 main.js 在刚调用的时候，先从本地存储中把购物车的数据读出来，放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
  state: {
    car: car
  },
  mutations: {
    addToCar(state, goodsinfo) {
      //点击加入购物车，把商品信息保存到 store 中的 car 上
      var flag = false;
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count);
          flag = true;
          return true;
        }
      });
      // 如果最终循环完毕，得到的 flag 还是 false ，则把商品数据直接 push 到购物车中
      if (!flag) {
        state.car.push(goodsinfo);
      }
      localStorage.setItem("car", JSON.stringify(state.car));
    },
    updateGoodsInfo(state, goodsinfo) {
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count);
          return true;
        }
      });
      localStorage.setItem("car", JSON.stringify(state.car));
    },
    removeFormCar(state,id){
      state.car.some((item, i) => {
        if(item.id == id){
          state.car.splice(i,1)
          return true;
        }
      })
      localStorage.setItem("car", JSON.stringify(state.car));
    },
    updateGoodsSelected(state,info){
      state.car.some(item => {
        if(item.id == info.id){
          item.selected = info.selected
        }
      })
      localStorage.setItem("car", JSON.stringify(state.car));
    }
  },
  getters: {
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count;
      });
      return c;
    },
    getGoodsCount(state) {
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.count;
      });
      return o;
    },
    getGoodsSelected(state){
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state){
      var o = {
        count:0,
        amount: 0
      }
      state.car.forEach(item => {
        if(item.selected){
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  }
});

import moment from 'moment'
Vue.filter('dateFormat',function(dataStr,pattern = 'YYYY-MM-DD HH:mm:ss'){
  return moment(dataStr).format(pattern)
})

import VueResource from 'vue-resource'
Vue.use(VueResource);

Vue.http.options.root = "http://027xin.com:8899";
Vue.http.options.emulateJSON = true;

import MintUI from "mint-ui"
Vue.use(MintUI)
import "mint-ui/lib/style.css"

import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import "./assets/mui/css/mui.min.css"
import "./assets/mui/css/icons-extra(1).css"

import app from './App.vue'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
