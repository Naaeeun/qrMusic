<template>
    <div class="top">
        <h3 style="margin-top:1%;cursor: default;">官方榜</h3>
        <div class="top-content">
            <div class="content-item" style="margin-top:2.5%" v-if="officiallist[0]">
                <div class="item-left">
                    <img :src="officiallist[0].coverImgUrl"  @click="$router.push(`/musiclist?id=${officiallist[0].id}`)">
                    <span>{{time(officiallist[0].updateTime)}}</span>
                </div>
                <div class="item-right">
                    <div class="item-right-content" v-for="(item,i) in musiclist[0]" :key="i" @dblclick="play(item.id)">
                        <div class="content-left">
                            <span v-if="(i+1)<=3">{{i+1}}</span>
                            <span v-else style="color:rgb(159,159,159)">{{i+1}}</span>
                            <span>{{item.name}}</span>
                        </div>
                        <div class="content-singer">
                            <span><span v-for="(item,i) in item.ar" :key="i">{{item.name+' '}}</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="top-content">
            <div class="content-item" v-if="officiallist[1]">
                <div class="item-left">
                    <img :src="officiallist[1].coverImgUrl"  @click="$router.push(`/musiclist?id=${officiallist[1].id}`)">
                    <span>{{time(officiallist[1].updateTime)}}</span>
                </div>
                <div class="item-right">
                    <div class="item-right-content" v-for="(item,i) in musiclist[1]" :key="i">
                        <div class="content-left">
                            <span v-if="(i+1)<=3">{{i+1}}</span>
                            <span v-else style="color:rgb(159,159,159)">{{i+1}}</span>
                            <span>{{item.name}}</span>
                        </div>
                        <div class="content-singer">
                            <span><span v-for="(item,i) in item.ar" :key="i">{{item.name+' '}}</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="top-content">
            <div class="content-item" v-if="officiallist[2]">
                <div class="item-left">
                    <img :src="officiallist[2].coverImgUrl"  @click="$router.push(`/musiclist?id=${officiallist[2].id}`)">
                    <span>{{time(officiallist[2].updateTime)}}</span>
                </div>
                <div class="item-right">
                    <div class="item-right-content" v-for="(item,i) in musiclist[2]" :key="i">
                        <div class="content-left">
                            <span v-if="(i+1)<=3">{{i+1}}</span>
                            <span v-else style="color:rgb(159,159,159)">{{i+1}}</span>
                            <span>{{item.name}}</span>
                        </div>
                        <div class="content-singer">
                            <span><span v-for="(item,i) in item.ar" :key="i">{{item.name+' '}}</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="top-content">
            <div class="content-item" v-if="officiallist[3]"> 
                <div class="item-left">
                    <img :src="officiallist[3].coverImgUrl"  @click="$router.push(`/musiclist?id=${officiallist[3].id}`)">
                    <span>{{time(officiallist[3].updateTime)}}</span>
                </div>
                <div class="item-right">
                    <div class="item-right-content" v-for="(item,i) in musiclist[3]" :key="i">
                        <div class="content-left">
                            <span v-if="(i+1)<=3">{{i+1}}</span>
                            <span v-else style="color:rgb(159,159,159)">{{i+1}}</span>
                            <span>{{item.name}}</span>
                        </div>
                        <div class="content-singer">
                            <span><span v-for="(item,i) in item.ar" :key="i">{{item.name+' '}}</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h3 style="margin-top:5%;cursor: default;">全球榜</h3>
        <div class="globallist">
            <div class="list-item" v-for="(item,i) in globallist" :key="i"  @click="$router.push(`/musiclist?id=${item.id}`)">
                <div class="item-top">
                    <img v-lazy="item.coverImgUrl">
                    <img src="../../../../../public/img/播放量.png">
                    <span>{{item.playCount>100000000?parseInt(item.playCount/100000000)+'亿' : parseInt(item.playCount/10000)+'万' }}</span>
                </div>
                <div class="item-bottom">
                    <span>{{item.name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import api from '@/api/topApi/index'
import api1 from '@/api/musicApi/index'
export default {
    data(){
        return{
            officiallist:[],
            globallist:[],
            musiclist:[],
            musiclistid:[]
        }
    },
    computed:{
        ...mapState(['sumMusicMessage','controllerMusic'])
    },
    methods:{
        ...mapMutations(['setSumMusicUrl','setControllerMusic','setMusicUrl','setSumMusicMessage']),
        async getMusicTop(){
            let result= await api.getMusicTop()
            for(let i = 0;i<result.data.list.length;i++){
                if(i<=3){
                    this.officiallist.push(result.data.list[i]) //获取前4个官方榜单
                    let result1 = await api1.getMusicList(result.data.list[i].id) //获取榜单详情
                    let arr = []
                    let arr1 = []
                    arr.push(result1.data.privileges)
                    for(let o = 0;o<arr.length;o++){
                        for(let i = 0;i<5;i++){     //获取榜单前五首歌的id
                            arr1.push(arr[o][i].id)
                        }
                    }       
                    let result2 =await api1.getMusicInformation(arr1.toString()) //根据歌曲id获取榜单前5首歌详情                 
                    this.musiclist.push(result2.data.songs)
                }else{
                    this.globallist.push(result.data.list[i])
                }
            }
        },
        async play(id){ 
            let result = await api1.getMusicInformation(id)
            if(this.sumMusicMessage != ''){ //如果播放列表有歌曲  则将该歌曲加入到正在播放的歌曲后边
                for(let i = 0;i<this.sumMusicMessage[0].length;i++){
                    if(this.controllerMusic.id == this.sumMusicMessage[0][i].id){
                        this.sumMusicMessage[0].splice(i+1,0,result.data.songs[0])
                    }
                }
            }
            let result1 =  await api1.getMusicUrl(id)
            this.setControllerMusic(result.data.songs[0])
            this.setMusicUrl(result1.data.data[0])
            this.setSumMusicUrl(result1.data.data[0])
            this.setSumMusicMessage(result.data.songs)
        },
        time(time){
            let newtime = new Date(time)
            let month=newtime.getMonth()+1;
            let day = newtime.getDate()
            return (month > 9 ? month : '0' + month)+'月'+(day > 9 ? day : '0' + day)+'日更新'
        },
    },
    mounted () {
        this.getMusicTop()
    }
}
</script>
<style lang="less" scoped>
.top{
    height: 100%;
    width: 80%;
    margin-left: 10%;
    .top-content{
        width: 100%;
        height: 35%;
        .content-item{
            margin-top: 5%;
            height: 100%;
            width: 100%;
            cursor: pointer;
            display: flex;
            .item-left{
                width: 18.5%;
                position: relative;
                height: 100%;
                display: flex;
                justify-content: center;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 5px;
                }
                span{
                    position: absolute;
                    font-size: 12px;
                    color: white;
                    top: 63%
                }
            }
            .item-right{
                height: 100%;
                width: 78.5%;
                margin-left: 3%;
                display: flex;
                flex-direction: column;
                .item-right-content:nth-child(odd){
                    background-color: rgb(249, 249, 249);
                }
                .item-right-content:hover{
                    background-color: rgb(239, 239, 239);
                }
                .item-right-content{
                    cursor: default;
                    width: 100%;
                    height: 25%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-radius: 5px;
                    .content-left{
                        width: 80%;
                        span:nth-child(1){
                            margin-left: 2%;
                            color: rgb(236, 65, 65);
                        }
                        span:nth-child(2){
                            font-size: 13px;
                            margin-left: 2%;
                        }
                    }
                    .content-singer{
                        width: 20%;
                        display: flex;
                        margin-right: 1%;
                        justify-content: right;
                        span{
                            overflow: hidden;//超出隐藏
                            text-overflow:ellipsis;//超出部分显示...
                            white-space: nowrap;//文本不换行
                            cursor: pointer;
                            color: rgb(149, 149, 149);
                            font-size: 13px;
                        }
                        span:hover{
                            color: rgb(59, 59, 59);
                        }
                    }
                }
            }
        }
    }
    .globallist{
        width: 100%;
        display: flex;
        padding-bottom: 2%;
        flex-wrap: wrap;
        .list-item{
            width: 18.4%;
            margin-left: 2%;
            margin-top: 2%;
            .item-top{
                height: 88%;
                position: relative;
                img:nth-child(1){
                    height: 100%;
                    width: 100%;
                    border-radius: 5px;
                    cursor: pointer;
                }
                img:nth-child(2){
                    height:12px;
                    width: 12px;
                    position: absolute;
                    top: 4%;
                    right: 27%;
                }
                span{
                    font-size: 12px;
                    position: absolute;
                    color: white;
                    top: 3%;
                    right: 5%;
                }
            }
            .item-bottom{
                height: 10%;
                font-size: 14px;
                margin-top: 2%;
                cursor: pointer;
                color: rgb(55, 55, 55);
            }
            .item-bottom:hover{
                color: rgb(0, 0, 0);
            }
        }
        .list-item:nth-child(5n+1){
            margin-left: 0;
        }
    }
}
</style>