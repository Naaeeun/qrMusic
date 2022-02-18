<template>
    <div class="music">
        <div class="nav">
            <div class="left">
                <span>音乐标题</span>
            </div>
            <div class="right">
                <span>歌手</span>
                <span>专辑</span>
                <span>时长</span>
            </div>
        </div>
        <div class="content">
            <div class="music" v-for="(item,i) in musicList" :key="i" @dblclick="play(item.id)">
                <div class="left">
                    <span>{{i+1 < 10 ? '0'+(i+1) : i+1 }}</span>
                    <img src="../../../../../public/img/收藏.png">
                    <img src="../../../../../public/img/下载(1).png">
                    <span>{{item.name}}</span>
                </div>
                <div class="right">
                    <span @click="$router.push(`/singer?id=${item.artists[0].id}&name=${''}`)">{{item.artists[0].name}}</span>
                    <span @click="$router.push(`/albumlist?id=${item.album.id}`)">{{item.album.name}}</span>
                    <span>
                        {{(parseInt(item.duration/1000/60) < 10 ? '0'+ parseInt(item.duration/1000/60) : parseInt(item.duration/1000/60) )
                        + ':'+(parseInt((item.duration/1000/60 - parseInt(item.duration/1000/60))*60) < 10 ? '0'+parseInt((item.duration/1000/60 - parseInt(item.duration/1000/60))*60) : parseInt((item.duration/1000/60 - parseInt(item.duration/1000/60))*60))
                        }}</span>
                </div>
            </div>
        </div>
        <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum"
        :page-size="queryinfo.pagesize" 
        layout="prev, pager, next"
        :total="300">
        </el-pagination>
    </div>
</template>
<script>
import api from '@/api/searchApi/index'
import api1 from '@/api/musicApi/index'
import {mapMutations,mapState} from 'vuex'
export default {
    data(){
        return{
            musicList:[],
            queryinfo:{
                query:'',
                pagenum:1,
                pagesize:100
            },
        }
    },
    computed:{
        ...mapState(['sumMusicMessage','controllerMusic'])
    },
    methods:{
        ...mapMutations(['setControllerMusic','setMusicUrl','setSumMusicMessage','setSumMusicUrl'])
        ,
        async getmusic(limit,offset){
            let result = await api.getSearchContent(1,this.$route.query.keyword,limit,offset)
            this.musicList = result.data.result.songs
        },
        handleSizeChange(newsize){
            //这里conso 选中第几页 最新的值
            console.log(newsize)
            //最新的条数（newsize）赋值给 动态的 pagesie
            this.queryinfo.pagesize = newsize
            //获取到最新一页显示的数据  重新发送axios请求 这里是封装好的请求方法
            let offset = (newsize -1)*100
            this.getmusic(100,offset)
        },
        handleCurrentChange(newPage) {
            // console.log(newPage)
            //把最新的页码（newPage）赋值给 动态的 pagenum 
            this.queryinfo.pagenum = newPage
            //获取到最新显示的页码值  重新发送axios请求 这里是封装好的请求方法
            let offset = (newPage -1)*100
            this.getmusic(100,offset)
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
    },
    mounted(){
        this.getmusic(100,0)
    },
    watch:{
        '$route'(to, from) {
            if (to.query.keyword !== from.query.keyword) {
                this.getmusic(100,0)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.music{
    height: 100%;width: 100%;
    .nav{
        font-size: 14px;
        color: rgb(136, 136, 136);
        height: 10%;
        display: flex;
        width: 100%;
        padding: 0.5% 0;
        cursor: default;
        .left{
            width: 45%;
            margin-left: 10%;
        }
        .right{
            display: flex;
            width: 55%;
            span{
                width: 33%;
            }
            span:nth-child(3){
                text-align: center;
            }
        }
    }
    .content{
        display: flex;
        flex-direction: column;
        .music:nth-child(odd){
            background-color: rgb(249, 249, 249);
        }
        .music:hover{
            background-color: rgb(229,229,229);
        }
        .music{
            width: 100%;
            display: flex;
            font-size: 13px;
            flex-wrap: wrap;
            .left{
                width: 50%;
                padding: 1% 0;
                display: flex;
                align-items: center;
                span:nth-child(1){
                    padding-left: 5.5%;
                    cursor: default;
                }
                img:nth-child(2){
                    width: 16px;height: 16px;
                    padding-left: 3%;
                    cursor: pointer;
                }
                img:nth-child(3){
                    width: 14px;height: 14px;
                    padding-left: 1%;
                    cursor: pointer;
                }
                span:nth-child(4){
                    padding-left: 3.8%;
                    cursor: default;
                }
            }
            .right{
                width: 50%;
                display: flex;
                align-items: center;
                span:nth-child(1){
                    padding-left: 1%;
                    width: 30%;
                    cursor: pointer;
                }
                span:nth-child(2){
                    width: 30%;
                    padding-left: 3%;
                    cursor: pointer;
                }
                span:nth-child(3){
                    width: 8%;
                    margin-left: 16.4%;
                }
            }
        }
    }
    .el-pagination{
        margin:2% auto;
        display: flex;
        justify-content: center;
    }
}
</style>