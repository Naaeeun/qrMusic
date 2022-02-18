import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    controllerMusic:{
      al:{
        picUrl:""
      },
      songerName:"",
      name:"",
      dj:{}
    },
    songerName:[],
    musicUrl:[],
    sumMusicUrl:[],
    sumMusicMessage:[],
    code:0,//判断登录状态 默认未登录
    currentTime:0,
    play:0, //判断播放状态 1为播放
  },
  mutations: {
    setControllerMusic(state,value){
      state.controllerMusic = value
      state.songerName= []
      value.ar.forEach((item,i)=>{
        if(i==value.ar.length-1){
          state.songerName.push(item.name)
        }else{
          state.songerName.push(item.name+'/')
        }
      })
    },
    setCode(state,value){
      state.code = value
    },
    setplay(state,value){
      state.play = value
    },
    setMusicUrl(state,value){
      state.musicUrl = value
    },
    clearMusicUrl(state,value){
      state.musicUrl = []
      state.sumMusicUrl = []
    },
    setSumMusicUrl(state,value){
      state.sumMusicUrl.push(value)
    },
    setSumMusicMessage(state,value){
      state.sumMusicMessage.push(value)
    },
    clearMusitList(state,value){
      state.sumMusicMessage = []
      state.sumMusicUrl = []
    },
    setDjMusic(state,value){
      state.controllerMusic = value
      state.songerName = value.songerName
    },
    setCurrentTime(state,value){
      state.currentTime = value
    },
  },
  actions: {
    
  },
})
