<template>
    <div>
        <mt-swipe :auto="3000">
          <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
            <img :src="item.img" alt="" :class="{'full':isfull}">
          </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    props: ['lunbotuList','isfull']
}
</script>

<style lang="less" scoped>
.mint-swipe{
  height: 200px;
  .mint-swipe-item{
      text-align: center;
    // &:nth-child(1){
    //   background-color: red;
    // }
    // &:nth-child(2){
    //   background-color: yellow;
    // }
    // &:nth-child(3){
    //   background-color:pink;
    // }
    img{
    // width: 100%;
      height: 100%;
    }
  }
}

.full{
    width: 100%;
}
</style>
