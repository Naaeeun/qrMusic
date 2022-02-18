<template>
    <div class="home">
        <div class="homeCenter">
            <router-view></router-view>
        </div>
        <div class="homeController">
            <controller></controller>
        </div>
    </div>
</template>

<script>
import controller from '../components/homeComponents/controller.vue'
export default {
    components:{
        controller
    }
}
</script>


<style lang="less" scoped>
.home{
    width: 100%;height: 100%;
    .homeCenter{
        height: 90%;
        width: 100%;
    }
    .homeController{
        height: 10%;
        width: 100%;
    }
}
</style>