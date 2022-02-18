<template>
  <div class="music">
    <div class="nav">
      <el-menu :default-active="activeIndex" class="el-menu-demo" active-text-color="red" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1"><router-link to="/"><div>个性推荐</div></router-link></el-menu-item>
            <el-menu-item index="2"><router-link to="/playlist"><div>歌单</div></router-link></el-menu-item>
            <el-menu-item index="3"><router-link to="/newsradio"><div>主播电台</div></router-link></el-menu-item>
            <el-menu-item index="4"><router-link to="/top"><div>排行榜</div></router-link></el-menu-item>
            <el-menu-item index="5"><router-link to="/allsinger"><div>歌手</div></router-link></el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <keep-alive><router-view></router-view></keep-alive>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: '1',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    }
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.music{
  height: 100%;
  width: 100%;
  .nav{
    margin-left: 10%;
    height: 10%;
    width: 90%;
    .el-menu.el-menu--horizontal{
      border:0px;
      a{
        text-decoration: none;
      }
    }
  }
  .content::-webkit-scrollbar {
      width:5px;
  }
  .content::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.2);
      background:rgb(224, 224, 224);
  }
  .content{
    width: 100%;
    height: 90%;
    overflow:auto;
  }
}
</style>
