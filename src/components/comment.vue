<template>
    <div class="cmt-container">
        <h3>凭本事说话</h3>
        <hr>
        <textarea placeholder="用力BB的没完没了了(只有120刀)" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">B刀B刀</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.id">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户:{{ item.user_name }}&nbsp;&nbsp;发表时间:{{ item.add_time | dateFormat }}
                </div>
                <div class="cmt-body">
                    {{ item.content === 'undefined' ? '路人甲不敢说真话': item.content }}
                </div>
            </div>

        </div>
        <mt-button type="danger" size="large" plain @click="getMore">欢迎偷看</mt-button>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default{
    data(){
        return{
            pageIndex:1 ,//默认展示第一页数据
            comments:[],
            msg:''
        };
    },
    created(){
      this.getComments();
    },
    methods:{
        getComments(){
            this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageIndex).then(result => {
             console.log(result.body)
            if(result.body.status === 0){
               //this.comments = result.body.message;
               this.comments = this.comments.concat(result.body.message);
               //console.log(this.comments)
            }else{
               Toast('获取评论失败...');
            }
          });
        },
        getMore(){
            this.pageIndex++;
            this.getComments();
        },
        postComment(){
            if(this.msg.trim().length === 0){
                return Toast('没BB不能刀...');
            }
            this.$http.post('api/postcomment/' + this.$route.params.id, { 
                content:this.msg.trim() 
            })
            .then(function(result){
                if(result.body.status === 0){
                    var cmt = { 
                        user_name: '匿名用户',
                        add_time:Date.now(),
                        content:this.msg.trim()
                    };
                    this.comments.unshift(cmt);
                    this.msg = '';
                }
            });
        }
    },
    props:['id']
}
</script>

<style lang="less" scoped>
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0px;
    }
    .cmt-list{
        margin: 10px 0px;
        .cmt-item{
            font-size: 13px;
           .cmt-title{
              background-color: #ccc;
              line-height:30px;
           } 
           .cmt-body{
              line-height:35px;
              text-indent: 2em;
           }
        }
    }
}
</style>
