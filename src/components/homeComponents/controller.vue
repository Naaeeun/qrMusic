<template>
  <div class="controller">
    <div class="controllerLeft">
      <div v-if="controllerMusic"><img :src="controllerMusic.al.picUrl" v-show="controllerMusic.al.picUrl!=''" @click="$router.push(`/play?id=${controllerMusic.id}`)"></div>
      <div class="name" v-if="controllerMusic">
        <div class="songname">
          <span @click="$router.push(`/play?id=${controllerMusic.id}`)">{{controllerMusic.name}}</span><img  v-show="controllerMusic.al.picUrl" src="../../../public/img/收藏.png">
        </div>
        <div class="songer" v-if="controllerMusic.ar">
          <span v-for="(item,i) in controllerMusic.ar" :key="i" @click="item.id == 0 ? '' : $router.push(`/singer?id=${item.id}`)">{{item.name}}<span v-show="i != controllerMusic.ar.length-1">/</span></span>
        </div>
      </div>
    </div>
    <div class="controllerCenter">
      <div class="controllerImg">
        <img src="../../../public/img/循环播放.png">
        <img @click="last()" src="../../../public/img/上一首.png">
        <audio ref="audio" :src="musicUrl.url" autoplay="autoplay" v-if="musicUrl"></audio>
        <div @click="play()"><img ref="pic" src="../../../public/img/播放.png"></div>
        <img @click="next()" src="../../../public/img/下一首.png">
        <img src="../../../public/img/歌词.png">
      </div>
      <div class="progressBar">
        <div>{{startTime}}</div>
        <el-slider @change="drag(value)" v-model='value'></el-slider>
        <div>{{sumTime}}</div>
      </div>
    </div>
    <div class="controllerRight">
      <img src="../../../public/img/音量.png" ref="mute" @click="mute()">
      <el-slider @change="drag1(volume)" v-model='volume'></el-slider>
      <img src="../../../public/img/列表.png"  @click="drawer()" type="primary" style="margin-left: 16px;">
    </div>
    <el-drawer
      title="播放列表"
      :visible.sync="isDrawer"
      :direction="direction"
      >
      <div>
        <div class="title">
          <span>总{{sumMusicMessage[0] ? sumMusicMessage[0].length : 0}}首</span>
          <div><img src="../../../public/img/收藏(1).png"><span>收藏全部</span></div>
          <div><img src="../../../public/img/清空.png"><span>清空</span></div>
        </div>
        <div class="content" v-if="sumMusicMessage[0]">
          <div class="musicContent" @dblclick="dbplay(item.id,item.dj)" v-for="(item,i) in sumMusicMessage[0]" :key="i">
            <span :style="(item.id == controllerMusic.id ? {color:'red'} : '')">{{item.name}}</span>
            <span :style="(item.id == controllerMusic.id ? {color:'red'} : '')"><span v-for="(item,i) in item.ar" :key="i">{{item.name+' '}}</span></span>
            <span>
              {{ 
              ( parseInt(item.dt/1000/60) < 10 ? '0'+ parseInt(item.dt/1000/60) : parseInt(item.dt/1000/60) )
              + ':'+(parseInt((item.dt/1000/60 - parseInt(item.dt/1000/60))*60) < 10 ? '0'+parseInt((item.dt/1000/60 - parseInt(item.dt/1000/60))*60) : parseInt((item.dt/1000/60 - parseInt(item.dt/1000/60))*60))
              }}
            </span>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import api from '@/api/musicApi/index'
import api1 from '@/api/radioApi/index'
import {mapState,mapMutations} from 'vuex'
export default {
  data(){
    return{
      value: 0,
      volume:100,
      startTime:'00:00',
      sumTime:'00:00',
      isDrawer: false,
      direction: 'rtl',
      currentTime:0,
    }
  },
  mounted(){
    this.monitorCurrentTime()
  },
  methods:{
    ...mapMutations(['setControllerMusic','setMusicUrl','clearMusicUrl','setDjMusic','setCurrentTime','setplay']),
    drawer(){
      // console.log(this.controllerMusicList)
      this.isDrawer=true
    },
    //监听进度条数值变化方法
    drag(value){ 
      let that = this
      that.$refs.audio.currentTime = value/100 * that.$refs.audio.duration
    },
    //音量条
    drag1(volume){
      this.$refs.audio.volume = volume/100
    },
    //监听当前歌曲播放时间
    monitorCurrentTime(){
      let that = this
      that.$refs.audio.ontimeupdate=()=>{
        this.setplay(1) //播放状态为播放
        this.setCurrentTime(that.$refs.audio.currentTime)
        that.$refs.pic.src=require('../../../public/img/暂停.png')
        this.currentTime = that.$refs.audio.currentTime
        this.value = (that.$refs.audio.currentTime/that.$refs.audio.duration)*100
        let result1 = (parseInt(that.$refs.audio.currentTime/60)<10 ? '0'+parseInt(that.$refs.audio.currentTime/60) : parseInt(that.$refs.audio.currentTime/60))
        + ':'+(parseInt((that.$refs.audio.currentTime/60 - parseInt(that.$refs.audio.currentTime/60))*60)<10 ? '0'+parseInt((that.$refs.audio.currentTime/60 - parseInt(that.$refs.audio.currentTime/60))*60) :parseInt((that.$refs.audio.currentTime/60 - parseInt(that.$refs.audio.currentTime/60))*60) )
        let result = (parseInt(that.$refs.audio.duration/60) <10 ? '0'+ parseInt(that.$refs.audio.duration/60) :parseInt(that.$refs.audio.duration/60))
        + ':'+(parseInt((that.$refs.audio.duration/60 - parseInt(that.$refs.audio.duration/60))*60)<10 ? '0'+parseInt((that.$refs.audio.duration/60 - parseInt(that.$refs.audio.duration/60))*60) : parseInt((that.$refs.audio.duration/60 - parseInt(that.$refs.audio.duration/60))*60))
        this.sumTime = result
        this.startTime = result1
        //切换歌曲时重置进度条
        if(that.$refs.audio.currentTime==0){
          this.value = 0
          this.sumTime = '00:00'
        }
        //当歌曲播放完毕时
        if(that.$refs.audio.ended){
          that.next()
        }
        if(that.$refs.audio.paused){
          that.$refs.pic.src=require('../../../public/img/播放.png')
        }
        if(that.musicUrl == ''){
          that.$refs.audio.src = ''
          that.value =0
        }
      }
    },
    //歌曲播放暂停
    play(){
      let that = this
      if(that.$refs.audio.src){
        //currentTime 播放时时间
        //duration 总时长
        //监听ontimeupdate
        if(that.$refs.audio.paused){
          that.$refs.audio.play()
          that.$refs.pic.src=require('../../../public/img/暂停.png')
        }else{
          that.$refs.audio.pause()
          that.$refs.pic.src=require('../../../public/img/播放.png')
          that.setplay(0) //播放状态为暂停
        }
      }
    },
    async dbplay(i,type){
      if(type){
        this.clearMusicUrl()
        let result1 = await api1.getDjInformation(i)
        let DjMessage = {
                al:{
                    picUrl:""
                },
                songerName:"",
                name:"",
                coverUrl:'',
                id:{}
            }
        DjMessage.al.picUrl = result1.data.program.coverUrl
        DjMessage.songerName =result1.data.program.dj.nickname
        DjMessage.name = result1.data.program.name
        DjMessage.id = result1.data.program.id
        DjMessage.dj = result1.data.program.dj
        this.setDjMusic(DjMessage)
      }else{
        let result = await api.getMusicInformation(i)
        let result1 = await api.getMusicUrl(i)
        this.setMusicUrl(result1.data.data[0])
        this.setControllerMusic(result.data.songs[0])
      }
    },
    next(){
      let that = this 
      if(this.musicUrl == ''){
      }else{
        if(this.controllerMusic.id == this.sumMusicMessage[0][this.sumMusicMessage[0].length-1].id){
          this.setControllerMusic(this.sumMusicMessage[0][0])
          try{
            this.sumMusicUrl.forEach((item,i)=>{
              if(item.id == this.sumMusicMessage[0][0].id ){
                this.setMusicUrl(item)
                that.play()
                that.$refs.pic.src=require('../../../public/img/暂停.png')
                throw new Error('结束循环')
              }
            })
          }catch(e){
          }
        }else{
          try{
            this.sumMusicMessage[0].forEach((item,i)=>{
              if(item.id == this.controllerMusic.id ){
                this.setControllerMusic(this.sumMusicMessage[0][i+1])
                that.play()
                that.$refs.pic.src=require('../../../public/img/暂停.png')
                throw new Error('结束循环')
              }
            })
          }catch(e){
          }
          try{
            this.sumMusicUrl.forEach((item,i)=>{
              if(item.id == this.controllerMusic.id){
                this.setMusicUrl(item)
                throw new Error('结束循环')
              }
            })
          }catch(e){
          }
        }
      }
    },
    last(){
      let that = this
      if(this.musicUrl==''){
      }else{
        if(this.sumMusicMessage[0][0].id == this.controllerMusic.id){
          this.setControllerMusic(this.sumMusicMessage[0][this.sumMusicMessage[0].length-1])
          try{
            this.sumMusicUrl.forEach((item,i)=>{
              if(item.id == this.sumMusicMessage[0][this.sumMusicMessage[0].length-1].id){
                this.setMusicUrl(item)
                that.play()
                that.$refs.pic.src=require('../../../public/img/暂停.png')
                throw new Error('结束循环')
              }
            })
          }catch(e){
          }
        }else{
          try{
            this.sumMusicMessage[0].forEach((item,i)=>{
              if(item.id == this.controllerMusic.id ){
                this.setControllerMusic(this.sumMusicMessage[0][i-1])
                throw new Error('结束循环')
              }
            })
          }catch(e){
          }
          try{
            this.sumMusicUrl.forEach((item,i)=>{
              if(item.id == this.controllerMusic.id ){
                this.setMusicUrl(item)
                that.play()
                that.$refs.pic.src=require('../../../public/img/暂停.png')
                throw new Error('结束循环')
              }
            })
          }catch(e){
          }
        }
      }
      
    },
    mute(){//静音
      if(this.volume != 0 ){
        this.volume = 0
        this.$refs.audio.volume=0
        this.$refs.mute.src = require('../../../public/img/静音.png')
      }else{
        this.$refs.audio.volume=1
        this.volume = 100
        this.$refs.mute.src = require('../../../public/img/音量.png')
      }
    }
  },
  computed:{
    ...mapState(['controllerMusic','songerName','musicUrl','sumMusicMessage','sumMusicUrl']),
  },
}
</script>
<style lang="less" scoped>
.controller{
  height: 100%;
  width: 100%;
  background-color:rgba(246, 246, 248);
  display: flex;
  .controllerLeft{
    position: relative;
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    div:nth-child(1){
      margin-left: 3%;
      img:nth-child(1){ 
        height: 45px;
        width: 45px;
        border-radius: 5px;
        cursor: pointer;
      }
    }
    .name{
      display: flex;
      flex-direction: column;
      width: 80%;
      .songname{
        display: flex;
        align-items: center;
        cursor: pointer;
        span{
          overflow: hidden;//超出隐藏
          text-overflow:ellipsis;//超出部分显示...
          white-space: nowrap;//文本不换行
        }
        img{
          height: 18px;
          width: 18px;
          margin-left: 2%;
        }
      }
      .songer{
        margin-top: 2%;
        margin-left: 3%;
        display: flex;
        font-size: 12px;
        color: rgb(159, 159, 159);
        span{
          cursor: pointer;
        }
      }
    }
  }
  .controllerCenter{
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .controllerImg{
      margin-left: 30%;
      height: 70%;
      width: 40%;
      display: flex;
      justify-content: space-between;
      align-items:center;
      img:nth-child(1){
        height: 15px;width: 15px;
        cursor: pointer;
      }
      img:nth-child(2){
        height: 20px;width: 20px;
        cursor: pointer;
      }
      div{
        width: 15%;
        height: 70%;
        border-radius: 50%;
        background-color: rgb(235, 235, 237);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        img:nth-child(1){
          height: 28px;width: 28px;
        }
      }
      div:hover{
        background-color: rgb(221, 221, 222);
      }
      img:nth-child(5){
        height: 20px;width: 20px;
        cursor: pointer;
      }
      img:nth-child(6){
        height: 15px;width: 15px;
        cursor: pointer;
      }
    }
    .progressBar{
      height: 30%;
      width: 100%;
      position: relative;
      div:nth-child(1){
        left: 13%;
        top:0;
        position: absolute;
        font-size: 10px;
        color: rgb(159, 159, 159);
      }
      div:nth-child(3){
        position: absolute;
        top: 0;
        font-size: 10px;
        right: 13%;
        color: rgb(159, 159, 159);
      }
      .el-slider{
        /deep/ .el-slider__runway{
          width: 60%;
          margin: 1% auto;
          .el-slider__bar{
            background-color: rgb(255, 78, 78);
            border-radius: 5px;
          }
          .el-slider__button-wrapper{
            display: none;
          }
        }
      }
    }
  }
  .controllerRight{
    width: 30%;
    position: relative;
    height: 100%;
    img:nth-child(1){
      cursor: pointer;
      height: 20px;width: 20px;
      position: absolute;
      top:35%;
      right:30%;
    }
    .el-slider{
      margin-top: 6.5%;
      margin-left: 60%;
      /deep/ .el-slider__runway{
        width: 40%;
        margin: 1% auto;
        .el-slider__bar{
          background-color: rgb(255, 78, 78);
          border-radius: 5px;
        }
        .el-slider__button-wrapper{
          display: none;
        }
      }
    }
    img:nth-child(3){
      position: absolute;
      cursor: pointer;
      height: 20px;width: 20px;
      top:35%;
      right:5%;
    }
  }
  .el-drawer{
      .el-drawer__body{
        div{
          font-size: 14px;
          height: 100%;
          .title{
            height: 5%;
            font-size: 16px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            div:nth-child(2){
              cursor: pointer;
              display: flex;
              align-items: center;
              img{
                width: 20px;height: 20px;
              }
            }
            div:nth-child(3){
              cursor: pointer;
              display: flex;
              align-items: center;
              img{
                width: 25px;height: 25px;
              }
            }
            border-bottom: 1px solid rgb(242, 242, 242);
            padding-bottom: 3%;
          }
          .content::-webkit-scrollbar {
            width:3px;
          }
          .content::-webkit-scrollbar-thumb {
            border-radius: 10px;
            box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.2);
            background:rgb(224, 224, 224);
          }
          .content{
            height: 93%;
            overflow: auto;
            .musicContent:hover{
              background-color: rgb(244, 244, 244);
            }
            .musicContent:nth-child(even){
              background-color: rgb(250, 250, 250);
            }
            .musicContent{
              height: 5%;
              align-items: center;
              cursor: default;
              padding-left: 10%;
              padding-right: 10%;
              padding-top: 1.5%;
              padding-bottom: 1.5%;
              display: flex;
              width: 80%;
              span{
                width: 33%;
                overflow: hidden;//超出隐藏
                text-overflow:ellipsis;//超出部分显示...
                white-space: nowrap;//文本不换行
              }
              span:nth-child(2){
                text-align: center;
                cursor: pointer;
              }
              span:nth-child(3){
                text-align: right;
              }
            }
          }
        }
      }
    }
}
</style>
<style>
.el-tooltip__popper,.is-dark{
  display: none;
}
.el-drawer__body{
  overflow: hidden;
}
</style>