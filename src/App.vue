<template>
  <div id="app">
    <div class="nav">
      <navigate></navigate>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>
<script>
import navigate from './components/navigate.vue'
export default {
  data(){
    return{
    }
  },
  components:{
    navigate
  },
  mounted(){
  }
}
</script>
<style lang="less" scoped>
#app{
  height: 100vh;
  width: 100vw;
  .nav{
    height: 8vh;
    width: 100vw;
  }
  .content{
    height: 92vh;
    width: 100vw;
  }
}
</style>
