<template>
    <div class="recommend">
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="(item,i) in banner" :key="i">
            <h3 class="medium" @click="bannerPlay(i)"><img :src="item.imageUrl"></h3>
            </el-carousel-item>
        </el-carousel>
        <h3>推荐歌单</h3>
        <div class="musiclist">
            <div @click="$router.push(`/musiclist?id=${item.id}`)" class="musicListContent" v-for="(item,i) in recommendMusicList" :key=i>
                <div class="content">
                    <img :src="item.picUrl">
                    <img src="../../../../../public/img/播放量.png"><span>{{item.playCount >10000 ? parseInt(item.playCount/10000)+'万' : item.playCount}}</span>
                </div>
                <span>{{item.name}}</span>
            </div>
        </div>
        <h3 style="margin-top:3%">独家放送</h3>
        <div class="exclusive">
            <div class="exclusiveList" v-for="(item,i) in exclusiveList" :key=i @click="$router.push(`/mvDetail?id=${item.id}&type=${item.type}`)">
                <div class="exclusiveContent">
                    <img :src="item.sPicUrl">
                </div>
                <span>{{item.name}}</span>
            </div>
        </div>
        <h3 style="margin-top:3%">最新音乐</h3>
        <div class="newMusic">
            <div class="musicContent" v-for="(item,i) in newMusicList" :key="i">
                <img v-lazy="item.picUrl" @click="play(item.id)">
                <div><span>{{item.name}}</span><span @click="$router.push(`/singer?id=${item.song.artists[0].id}&name=''`)">{{item.song.artists[0].name}}</span></div>
            </div>
        </div>
        <h3 style="margin-top:3%">推荐MV</h3>
        <div class="recommendMv">
            <div class="mvContent" v-for="(item,i) in recommendMv" :key="i" @click="$router.push(`/mvDetail?id=${item.id}&type=${item.type}`)">
                <div class="mvImg">
                    <img :src="item.picUrl">
                    <img src="../../../../../public/img/播放量.png"><span>{{item.playCount}}</span>
                </div>
                <div class="mvName">
                    <span>{{item.name}}</span>
                    <span>{{item.artistName}}</span>
                </div>
            </div>
        </div>
        <h3 style="margin-top:3%">主播电台</h3>
        <div class="broadcastingStation">
            <div class="bsContent" @click="$router.push(`/djlist?id=${item.id}`)" v-for="(item,i) in recommendDj" :key="i">
                <div class="bsImg">
                    <img :src="item.picUrl">
                    <span>{{item.name}}</span>
                </div>
                <span>{{item.rcmdText}}</span>
            </div>
        </div>
        <div class="footer">
            您可以登录账号,会根据您个人喜好为您推荐歌单哟~
        </div>
    </div>
</template>

<script>
import api from '../../../../api/musicApi/index'
import {mapMutations,mapState} from 'vuex'
export default {
    data(){
        return{
            banner:[],
            recommendMusicList:[],
            exclusiveList:[],
            newMusicList:[],
            recommendMv:[],
            recommendDj:[]
        }   
    },
    computed:{
        ...mapState(['sumMusicMessage','sumMusicUrl','controllerMusic'])
    },
    methods:{
        ...mapMutations(['setControllerMusic','setMusicUrl','setSumMusicMessage','setSumMusicUrl']),
        async bannerPlay(i){
            let result = await api.getMusicInformation(this.banner[i].encodeId)
            if(this.banner[i].targetType==1000){
                this.$router.push(`/musiclist?id=${this.banner[i].encodeId}`)
            }else if(this.banner[i].targetType==10){
                this.$router.push(`/albumlist?id=${this.banner[i].encodeId}`)
            }else if(this.banner[i].targetType==1004){
                this.$router.push(`/mvDetail?id=${this.banner[i].encodeId}&type=0`)
            }else if(this.banner[i].targetType == 1){
                if(this.sumMusicMessage != ''){ //如果播放列表有歌曲  则将该歌曲加入到正在播放的歌曲后边
                    for(let i = 0;i<this.sumMusicMessage[0].length;i++){
                        if(this.controllerMusic.id == this.sumMusicMessage[0][i].id){
                            this.sumMusicMessage[0].splice(i+1,0,result.data.songs[0])
                        }
                    }
                }
                let result1 =  await api.getMusicUrl(this.banner[i].encodeId)
                this.setControllerMusic(result.data.songs[0])
                this.setMusicUrl(result1.data.data[0])
                this.setSumMusicUrl(result1.data.data[0])
                this.setSumMusicMessage(result.data.songs)
            }  
        },
        async play(id){
            let result = await api.getMusicInformation(id)
            if(this.sumMusicMessage != ''){ //如果播放列表有歌曲  则将该歌曲加入到正在播放的歌曲后边
                for(let i = 0;i<this.sumMusicMessage[0].length;i++){
                    if(this.controllerMusic.id == this.sumMusicMessage[0][i].id){
                        this.sumMusicMessage[0].splice(i+1,0,result.data.songs[0])
                    }
                }
            }
            let result1 =  await api.getMusicUrl(id)
            this.setControllerMusic(result.data.songs[0])
            this.setMusicUrl(result1.data.data[0])
            this.setSumMusicUrl(result1.data.data[0])
            this.setSumMusicMessage(result.data.songs)
        },
        async getBanner(){
            let result = await api.getBanner()
            this.banner = result.data.banners
        },
        async getRecommendMusicList(){
            let result = await api.getRecommendMusicList()
            this.recommendMusicList = result.data.result
        },
        async getExclusive(){
            let result = await api.getExclusive()
            this.exclusiveList = result.data.result
        },
        async getNewMuisc(){
            let result = await api.getNewMuisc()
            this.newMusicList = result.data.result
        },
        async getRecommendMv(){
            let result = await api.getRecommendMv()
            this.recommendMv = result.data.result
        },
        async getRecommendDj(){
            let result = await api.getRecommendDj()
            this.recommendDj = result.data.data
        }
    },
    mounted(){
        this.getNewMuisc()
        this.getBanner()
        this.getExclusive()
        this.getRecommendMusicList()
        this.getRecommendMv()
        this.getRecommendDj()
    },
}
</script>

<style lang="less" scoped>
.recommend{
    margin-left: 10%;
    width: 80%;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    height: 100%;width: 100%;
}
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
    border-radius: 5px;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
    border-radius: 5px;
}
.musiclist{
    display: flex;
    flex-wrap:wrap
}
.musicListContent{
    margin-left: 2.5%;
    margin-top: 1%;
    display: flex;
    flex-direction: column;
    width: 18%;
    cursor: pointer;
}
.musicListContent:nth-child(1),.musicListContent:nth-child(6){
    margin-left: 0;
}
.musicListContent span:nth-child(2){
    font-size: 14px;
}
.content{
    width: 100%;
    position: relative;
}
.content img:nth-child(1){
    height: 100%;
    width: 100%;
    border-radius: 5px;
}
.content img:nth-child(2){
    position: absolute;
    height: 15px;width: 15px;
    top: 3%;
    right: 25%;
}
.content span:nth-child(3){
    position: absolute;
    font-size: 1px;
    right: 5%;
    top: 3%;
    color: white;
}
.exclusive{
    display: flex;
    margin-top: 3%;
    cursor: pointer;
}
.exclusiveList{
    width: 32%;
    margin-left: 2%;
    font-size: 14px;
}
.exclusiveList:nth-child(1){
    margin-left: 0;
}
.exclusiveContent img:nth-child(1){
    height: 100%;width: 100%;
}
.newMusic{
    display: flex;
    flex-wrap: wrap;
}
.musicContent{
    cursor:default;
    margin-top: 1.5%;
    margin-left: 5%;
    width: 30%;
    display: flex;
    img:nth-child(1){
        height: 50px;
        width:50px;
        cursor: pointer;
    }
    div{
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        span:nth-child(1){
            overflow: hidden;//超出隐藏
            text-overflow:ellipsis;//超出部分显示...
            white-space: nowrap;//文本不换行
            font-size: 14px;
            margin-left: 5%;
        }
        span:nth-child(2){
            width: 18%;
            overflow: hidden;//超出隐藏
            text-overflow:ellipsis;//超出部分显示...
            white-space: nowrap;//文本不换行
            font-size: 10px;
            margin-left: 5%;
            margin-top: 2%;
            color: rgb(159,159,159);
        }
        span:nth-child(2):hover{
            cursor: pointer;
        }
    }
}
.musicContent:nth-child(1),.musicContent:nth-child(4),.musicContent:nth-child(7),.musicContent:nth-child(10){
    margin-left: 0;
}
.musicContent:hover{
    background-color: rgb(234, 234, 234);
}
.recommendMv{
    display: flex;
    width: 100%;
    .mvContent{
        cursor: pointer;
        margin-top: 1%;
        width: 100%;
        margin-left: 2%;
        display: flex;
        flex-direction: column;
        .mvImg{
            position: relative;
            img:nth-child(1){
                width: 100%;
                height: 100%;
            }
            img:nth-child(2){
                width: 15px;
                height: 15px;
                position: absolute;
                right: 18%;
            }
            span{
                position: absolute;
            }
        }
        .mvName{
            display: flex;
            flex-direction: column;
            span:nth-child(1){
                font-size: 14px;
                margin-top: 3%;
            }
            span:nth-child(2){
                font-size: 10px;
                color: rgb(159,159,159);
                margin-top: 1%;
                cursor: pointer;
            }
        }
    }
    .mvContent:nth-child(1){
        margin-left: 0;
    }
}
.broadcastingStation{
    margin-top: 1%;
    display: flex;
    width: 100%;
    .bsContent:nth-child(1){
        margin-left: 0;
    }
    .bsContent{
        cursor: pointer;
        margin-left: 2%;
        width: 15%;
        display: flex;
        flex-direction: column;
        .bsImg{
            position: relative;
            img{
                width: 100%;
                height: 100%;
                border:1px solid rgb(242,242,242);
            }
            span{
                position: absolute;
                font-size: 13px;
                bottom: 5%;
                left: 5%;
                overflow: hidden;
                color: rgb(255, 255, 255);
                
            }
        }
        span{
            margin-top: 5%;
            font-size: 14px;
        }
    }
}
.footer{
    text-align: center;
    margin-top: 2%;
    color: rgb(159,159,159);
    font-size: 14px;
    margin-bottom: 3%;
}
</style>