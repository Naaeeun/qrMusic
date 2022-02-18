<template>
    <div class="music">
        <div class="content">
            <h3>热门50首</h3>
            <div class="musicContent" v-for="(item,i) in musiclist" :key="i" @dblclick="play(i)">
                <div class="left">
                    <span>{{(i+1) >= 10 ? (i+1) : '0'+(i+1)}}</span>
                    <img src="../../../../../public/img/收藏.png">
                    <img src="../../../../../public/img/下载(1).png">
                    <span>{{item.name}}<span v-if="item.tns">({{item.tns[0]}})</span></span>
                </div>
                <span>
                    {{
                        ( parseInt(item.dt/1000/60) < 10 ? '0'+ parseInt(item.dt/1000/60) : parseInt(item.dt/1000/60) )
                        + ':'+(parseInt((item.dt/1000/60 - parseInt(item.dt/1000/60))*60) < 10 ? '0'+parseInt((item.dt/1000/60 - parseInt(item.dt/1000/60))*60) : parseInt((item.dt/1000/60 - parseInt(item.dt/1000/60))*60))
                    }}
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import api from '@/api/musicApi/index'
import {mapMutations} from 'vuex'
export default {
    data(){
        return{
            musiclist:[],
            musiclistid:[]
        }
    },
    methods:{
        ...mapMutations(['setSumMusicMessage','setMusicUrl','setControllerMusic','clearMusitList','setSumMusicUrl']),
        async getmuslist(){
            let result = await api.getSingerHotMusic(this.$route.query.id)
            this.musiclist = result.data.songs
        },
        async getMusicList(){
            let result = await api.getSingerHotMusic(this.$route.query.id)
            let playListId = result.data.songs
            playListId.forEach((item)=>{
                this.musiclistid.push(item.id)
            })
        },
        async play(i){
            this.clearMusitList()
            let result = await api.getMusicUrl(this.musiclistid)
            let result1 = await api.getMusicUrl(this.musiclist[i].id)
            for(let i =0 ;i<result.data.data.length;i++){
                this.setSumMusicUrl(result.data.data[i])
            }
            this.setSumMusicMessage(this.musiclist)
            this.setControllerMusic(this.musiclist[i])
            this.setMusicUrl(result1.data.data[0])
        },
    },
    mounted(){
        this.getmuslist()
        this.getMusicList()
    },
    watch:{
        '$route'(to,from){
            if(to.query.id !=from.query.id){
                this.getmuslist()
            }
        }
    }
}
</script>
<style lang="less" scoped>
.music{
    width: 100%;
    height: 100%;
    .content{
        height: 100%;
        width: 100%;
        h3{
            margin: 0 0 0 1.5%;
        }
        .musicContent:nth-child(1){
            margin-top: 0.5%;
        }
        .musicContent:nth-child(odd){
            background-color: rgb(249, 249, 249);
        }
        .musicContent:hover{
            cursor: default;
            background-color: rgb((240), 241, 242);
        }
        .musicContent{
            height: 10%;
            display: flex;
            align-items: center;
            width: 100%;
            font-size: 14px;
            color: rgb(159, 159, 159);
            .left{
                width: 85%;
                height: 100%;
                display: flex;
                    align-items: center;
                span:nth-child(1){
                    margin-left: 3.4%;
                    width:2%;
                }
                img:nth-child(2){
                    cursor: pointer;
                    width: 18px;
                    height: 18px;
                    margin-left: 0.5%;
                }
                img:nth-child(3){
                    cursor: pointer;
                    margin-left: 0.5%;
                    width: 15px;
                    height: 15px;
                }
                span:nth-child(4){
                    color: black;
                    font-size: 16px;
                    margin-left: 1%;
                    width: 40%;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    display: flex;
                    align-items: center;
                    span{
                        margin-left: 0.5%;
                        color: rgb(159, 159, 159);
                        font-size: 13px;
                    }
                }
            }
        }
    }
}
</style>