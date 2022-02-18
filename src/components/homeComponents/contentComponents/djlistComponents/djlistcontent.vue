<template>
    <div class="musiclistcontent">
        <div class="nav">
            <span>共{{DjList.length}}期</span>
            <div><span>排序</span><div><img src="../../../../../public/img/排序(黑).png"></div></div>
        </div>
        <div class="content">
            <div class="musicContent" v-for="(item,i) in DjList" :key="i" @dblclick="play(i)">
                <div class="left">
                    <span>{{i+1}}</span>
                    <img :src="item.coverUrl">
                    <span>{{item.name}}</span>
                </div>
                <div class="right">
                    <span><img style="width:15px;heigth:15px" src="../../../../../public/img/播放.png">{{parseInt(item.listenerCount/10000) < 1 ? item.listenerCount : parseInt(item.listenerCount/10000)+'万'}}</span>
                    <span><img src="../../../../../public/img/点赞.png">{{item.likedCount}}</span>
                    <span>{{item.createTime}}</span>
                    <span>{{ 
                        ( parseInt(item.duration/1000/60) < 10 ? '0'+ parseInt(item.duration/1000/60) : parseInt(item.duration/1000/60) )
                        + ':'+(parseInt((item.duration/1000/60 - parseInt(item.duration/1000/60))*60) < 10 ? '0'+parseInt((item.duration/1000/60 - parseInt(item.duration/1000/60))*60) : parseInt((item.duration/1000/60 - parseInt(item.duration/1000/60))*60))
                        }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api/radioApi/index'
import {mapMutations,mapState} from 'vuex'
export default {
    data(){
        return{
            DjList:[],//歌单所有歌曲信息 cp是音质 mv是mvid dt是歌曲时长
            DjListMessage:[] //格式优化后所有歌曲列表
        }
    },
    mounted(){
        this.getDjList(this.$route.query.id)
    },
    computed:{
        ...mapState(['controllerMusic','sumMusicMessage','musicUrl'])
    },
    methods:{
        ...mapMutations(['setSumMusicMessage','clearMusitList','setControllerMusic','setMusicUrl','setDjMusic','clearMusicUrl']),
        async play(i){
            this.clearMusitList()
            this.clearMusicUrl()
            let DjMessage = {
                al:{
                    picUrl:""
                },
                songerName:"",
                name:"",
                id:"",
                dj:{}
            }
            DjMessage.al.picUrl = this.DjList[i].coverUrl
            DjMessage.songerName =this.DjList[i].dj.nickname
            DjMessage.name = this.DjList[i].name
            DjMessage.id = this.DjList[i].id
            DjMessage.dj = this.DjList[i].dj
            this.setDjMusic(DjMessage)
            this.setSumMusicMessage(this.DjListMessage)
            // let result = await api1.getMusicUrl(this.DjList[i].id)
            // this.setMusicUrl(result.data.data[0])
        },
        async getDjList(id){
            let result = await api.getRadioShow(id)
            this.DjList= result.data.programs
            try{
                result.data.programs.forEach((item,i)=>{
                    let DjMessage = {
                    al:{
                        name:""
                    },
                    dt:'',
                    name:"",
                    id:"",
                    dj:{}
                }
                DjMessage.dt = item.duration
                DjMessage.name =item.name
                DjMessage.al.name = item.dj.nickname
                DjMessage.id = item.id
                DjMessage.dj = item.dj
                this.DjListMessage.push(DjMessage)
                })
                throw new Error('循环结束')
            }catch(e){

            }

            
        }
    }
}
</script>

<style lang="less" scoped>
.musiclistcontent{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    .nav{
        margin-top: 0.5%;
        height: 15%;
        display: flex;
        justify-content: space-between;
        padding-left: 2.5%;
        width: 97.5%;
        font-size: 14px;
        align-items: center;
        span{
            font-size: 12px;
        }
        div{
            margin-right: 1.5%;
            width: 5%;
            display: flex;
            justify-content: center;
            span{
                display: flex;
                color: rgb(207,207,207);
                justify-content: center;
                align-items: center;
                height: 50%;
                width: 50%;
            }
            div{
                font-size: 12px;
                padding:2% 0 ;
                width: 30%;
                background-color: rgb(242, 242, 242);
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    height: 12px;width: 12px;
                }
            }
        }
        
    }
    .content{
        height: 84.5%;
        .musicContent:nth-child(odd){
            background-color: rgb(249, 249, 249);
        }
        .musicContent{
            display: flex;
            height: 35%;
            font-size: 14px;
            .left{
                display: flex;
                align-items: center;
                width: 45.7%;
                span:nth-child(1){
                    text-align: right;
                    margin-left: 2%;
                    width: 5%;
                    cursor: default;
                }
                img:nth-child(2){
                    width: 60px;height: 60px;
                    margin-left: 3%;
                    cursor: pointer;
                    border-radius: 5px;
                }
                span:nth-child(3){
                    margin-left: 3%;
                    cursor: default;
                    overflow: hidden;//超出隐藏
                    text-overflow:ellipsis;//超出部分显示...
                    white-space: nowrap;//文本不换行
                }
            }
            .right{
                display: flex;
                align-items: center;
                width: 54.3%;
                font-size: 14px;
                span:nth-child(1){
                    cursor: default;
                    width: 25%;
                    display: flex;
                    align-items: center;
                    img{
                        margin-right: 1%;
                    }
                }
                span:nth-child(2){
                    width: 25%;
                    cursor: default;
                    overflow: hidden;//超出隐藏
                    text-overflow:ellipsis;//超出部分显示...
                    white-space: nowrap;//文本不换行
                    display: flex;
                    align-items: center;
                    img{
                        margin-right: 1%;
                        height: 15px;
                        width: 15px;
                    }
                }
                span:nth-child(3){
                    width: 25%;
                    cursor: default;
                }   
                span:nth-child(4){
                    margin-left: 5%;
                    width: 25%;
                    cursor: default;
                }
            }
        }
        .musicContent:hover{
            background-color: rgb(240, 241, 242);
        }
    }
    
}

</style>