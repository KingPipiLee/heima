<template>
    <div>
        <cmtbox :id="$route.params.id"></cmtbox>
    </div>
</template>

<script>
import cmtbox from '../components/comment.vue'

export default {
    components: {
        cmtbox
    }
}
</script>

<style lang="less" scoped>

</style>
