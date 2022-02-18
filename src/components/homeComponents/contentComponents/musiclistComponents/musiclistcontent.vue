<template>
    <div class="musiclistcontent">
        <div class="nav">
            <span>音乐标题</span>
            <span>歌手</span>
            <span>专辑</span>
            <span>时长</span>
        </div>
        <div class="content">
            <div class="musicContent" v-for="(item,i) in musicList" :key="i" @dblclick="play(i)">
                <div class="left">
                    <span>{{i+1}}</span>
                    <img src="../../../../../public/img/收藏.png">
                    <img src="../../../../../public/img/下载(1).png">
                    <span>{{item.name}}</span>
                </div>
                <div class="right">
                    <span class="singer"><span v-for="(item,i) in item.ar" :key="i" @click="$router.push(`/singer?id=${item.id}&name=${''}`)">{{item.name}}</span></span>
                    <span class="album" @click="$router.push(`/albumlist?id=${item.al.id}`)">{{item.al.name}}</span>
                    <span class="time">{{ 
                        ( parseInt(item.dt/1000/60) < 10 ? '0'+ parseInt(item.dt/1000/60) : parseInt(item.dt/1000/60) )
                        + ':'+(parseInt((item.dt/1000/60 - parseInt(item.dt/1000/60))*60) < 10 ? '0'+parseInt((item.dt/1000/60 - parseInt(item.dt/1000/60))*60) : parseInt((item.dt/1000/60 - parseInt(item.dt/1000/60))*60))
                        }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api/musicApi/index'
import {mapMutations,mapState} from 'vuex'
export default {
    data(){
        return{
            musicListId:[], //歌单所有歌曲id
            musicList:[],//歌单所有歌曲信息 cp是音质 mv是mvid dt是歌曲时长
        }
    },
    mounted(){
        this.getMusicList(this.$route.query.id)
    },
    computed:{
        ...mapState(['controllerMusic','sumMusicMessage','sumMusicUrl'])
    },
    methods:{
        ...mapMutations(['setSumMusicMessage','setSumMusicUrl','clearMusitList','setControllerMusic','setMusicUrl']),
        async play(i){
            this.clearMusitList()
            let result = await api.getMusicUrl(this.musicListId)
            let result1 = await api.getMusicUrl(this.musicListId[i])
            for(let i =0 ;i<result.data.data.length;i++){
                this.setSumMusicUrl(result.data.data[i])
            }
            this.setSumMusicMessage(this.musicList)
            this.setControllerMusic(this.musicList[i])
            this.setMusicUrl(result1.data.data[0])
        },
        async getMusicList(id){
            this.musicListId = []
            this.musicList = []
            let result = await api.getMusicList(id)
            let playListId = result.data.playlist.trackIds
            playListId.forEach((item)=>{
                this.musicListId.push(item.id)
            })
            let result1 = await api.getMusicInformation(this.musicListId.toString())
            this.musicList = result1.data.songs
        },
    },
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
        padding-left: 6.5%;
        width: 93.5%;
        font-size: 14px;
        align-items: center;
        span{
            display: flex;
            align-items: center;
            height: 100%;
            padding-left: 1.2%;
            color: rgb(136, 136, 136);
        }
        span:nth-child(1){
            margin-left: 1%;
            width: 41%;
        }
        span:nth-child(2){
            width: 20%;
        }
        span:nth-child(3){
            width: 27%;
        }
        span:nth-child(4){
            width: 12%;
        }
        span:hover{
            background-color: rgb(240, 241, 242);
        }
    }
    .content{
        height: 84.5%;
        .musicContent:nth-child(odd){
            background-color: rgb(249, 249, 249);
        }
        .musicContent{
            display: flex;
            height: 15%;
            font-size: 14px;
            .left{
                display: flex;
                align-items: center;
                width: 45.7%;
                span:nth-child(1){
                    text-align: right;
                    margin-left: 2%;
                    width: 5%;
                }
                img:nth-child(2){
                    width: 16px;height: 16px;
                    margin-left: 3%;
                    cursor: pointer;
                }
                img:nth-child(3){
                    margin-left:0.5%;
                    width: 15px;height: 15px;
                    cursor: pointer;
                }
                span:nth-child(4){
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
                .singer{
                    display: flex;
                    cursor: pointer;
                    align-content: center;
                    width: 30%;
                    span{
                        margin-left: 0;
                        overflow: hidden;//超出隐藏
                        text-overflow:ellipsis;//超出部分显示...
                        white-space: nowrap;//文本不换行
                        width: auto;
                        margin-left: 3%;
                    }
                    span:nth-child(1){
                        margin-left: 0;
                    }
                }
                .album{
                    margin-left:4.8%;
                    width: 30%;
                    cursor: pointer;
                    overflow: hidden;//超出隐藏
                    text-overflow:ellipsis;//超出部分显示...
                    white-space: nowrap;//文本不换行
                }   
                .time{
                    margin-left: 15.5%;
                    width: 10%;
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