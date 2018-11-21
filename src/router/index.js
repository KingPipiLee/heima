import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from "@/components/Home";
import Member from "@/components/Member";
import Shopcar from "@/components/Shopcar";
import Search from "@/components/Search";
import NewsList from "@/components/NewsList";
import NewsInfo from "@/components/NewsInfo";
import PhotoList from "@/components/PhotoList";
import PhotoInfo from "@/components/PhotoInfo";
import GoodsList from "@/components/GoodsList";
import GoodsInfo from "@/components/GoodsInfo";
import GoodsDesc from "@/components/GoodsDesc";
import GoodsComment from "@/components/GoodsComment";

Vue.use(Router)

export default new Router({
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: Home },
    { path: "/member", component: Member },
    { path: "/shopcar", component: Shopcar },
    { path: "/search", component: Search },
    { path: "/home/newslist", component: NewsList },
    { path: "/home/newsinfo/:id", component: NewsInfo },
    { path: "/home/photolist/", component: PhotoList },
    { path: "/home/photoinfo/:id", component: PhotoInfo },
    { path: "/home/goodslist/", component: GoodsList },
    { path: "/home/goodsinfo/:id", component: GoodsInfo, name: "goodsinfo" },
    { path: "/home/goodsdesc/:id", component: GoodsDesc, name: "goodsdesc" },
    { path: "/home/goodscomment/:id", component: GoodsComment, name: "goodscomment" }
  ],
  linkActiveClass: "mui-active"
});
