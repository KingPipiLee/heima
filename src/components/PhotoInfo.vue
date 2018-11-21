<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间:{{ photoinfo.add_time | dateFormat }}</span>
            <span>点击:{{ photoinfo.click }}次</span>
        </p>

        <hr>
        <!--速性图区域-->
        <vue-preview :slides="slide1" ></vue-preview>

        <!--图片区域-->
        <div class="content" v-html="photoinfo.content"></div>

        <!--放置一个现成的评论子组件-->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>


<script>
import comment from '../components/comment.vue'

export default{
    data(){
        return{
            id:this.$route.params.id,
            photoinfo:{},
            list:[],
            slide1:[
                {
                    src:'',
                    msrc: '',
                }
            ],
        };
    },
    created () {
      this.getPhotoInfo(); 
      this.getThumbs(); 
    },
    methods:{
        getPhotoInfo(){
            this.$http.get('api/getimageInfo/' + this.id).then( result => {
                if(result.body.status === 0){
                   this.photoinfo = result.body.message[0];
                }
            })
        },
        getThumbs(){
            this.$http.get('api/getthumimages/' + this.id).then( result => {
                if(result.body.status === 0){
                    //循环每个图片数据，补全图片宽和高
                   result.body.message.forEach(item=>{
                       item.w = 600;
                       item.h = 400;
                       item.msrc = item.src;
                   });
                   this.slide1 = result.body.message;
                }
            });
        }
    },
    components: {
        'cmt-box':comment
    }
}
</script>


<style lang="less" scoped>
.photoinfo-container{
    padding: 3px;
    h3{
        color: #26A2FF;
        font-size: 15px;
        text-align: center;
        margin: 15px 0px;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
}
/deep/.my-gallery{
    display: flex;
    flex-wrap: wrap;
    figure{
        width: 33.33%;
        margin: 0px;
        padding: 5px;
        img{
            width: 100%;
            box-shadow: 0 0 8px #999;
        }
    }
}
</style>
