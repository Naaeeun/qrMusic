<template>
    <div class="mvDetail" v-if="mvdetail">
        <div class="left">
            <div class="top">
                <img src="../../public/img/左箭头.png" @click="$router.go(-1)"><h4>MV详情</h4>
            </div>
            <div class="content">
                <video :src="mvurl.url"  controls="controls"></video>
            </div>
            <div class="creatorinfo" @click="$router.push(`/singer?id=${mvdetail.artists[0].id}&name=${''}`)">
                <img :src="creatorimg ? creatorimg : mvdetail.avatarUrl"><span>{{mvdetail.artistName ? mvdetail.artistName : mvdetail.creator.nickname}}</span>
            </div>
            <h2>{{mvdetail.name ? mvdetail.name : mvdetail.title}}</h2>
            <div class="timecount">
                <span>发布:{{'&nbsp' +time(mvdetail.publishTime)}}</span>
                <span v-if="mvdetail.playCount">播放:{{mvdetail.playCount >10000 ?'&nbsp'+parseInt(mvdetail.playCount/10000)+'万次' : mvdetail.playCount + '次'}}</span>
                <span v-else>播放:{{mvdetail.playTime >10000 ?'&nbsp'+parseInt(mvdetail.playTime/10000)+'万次' : mvdetail.playTime + '次'}}</span>
            </div>
            <div class="title">
                <div v-for="(item,i) in mvdetail.videoGroup" :key="i">{{item.name}}</div>
            </div>
            <div class="button">
                <div><img src="../../public/img/点赞.png"><span>赞<span v-if="mvdetail.praisedCount">({{mvdetail.praisedCount}})</span></span></div>
                <div><img src="../../public/img/收藏1.png"><span>收藏({{mvdetail.subCount ? mvdetail.subCount : mvdetail.subscribeCount}})</span></div>
                <div><img src="../../public/img/分享.png"><span>分享({{mvdetail.shareCount}})</span></div>
                <div><img src="../../public/img/下载.png"><span>下载MV</span></div>
            </div>
            <h3>全部评论<span>({{mvdetail.commentCount}})</span></h3>
            <div class="comment" v-for="(item,i) in hotcomment" :key="i">
                <div class="top">
                    <img v-if="item.user" :src="item.user.avatarUrl" @click="$router.push(`/userinfo?id=${item.user.userId}`)">
                    <div class="content">
                        <span v-if="item.user" @click="$router.push(`/userinfo?id=${item.user.userId}`)">{{item.user.nickname}}：</span>
                        <span>{{item.content}}</span>
                    </div>
                </div>
                <div class="bottom">
                    <div class="time">
                        {{time1(item.time)}}
                    </div>
                    <div class="right">
                        <span><img src="../../public/img/点赞.png">
                        {{item.likedCount}}</span>
                        <span>丨</span>
                        <img src="../../public/img/分享.png">
                        <span>丨</span>
                        <img src="../../public/img/编辑.png">
                    </div>
                </div>
            </div>
            <div>
            <h4>最新评论</h4>
            <div class="comment" v-for="(item,i) in newcomment" :key="i">
                <div class="top">
                    <img v-if="item.user" :src="item.user.avatarUrl" @click="$router.push(`/userinfo?id=${item.user.userId}`)">
                    <div class="content">
                        <span v-if="item.user" @click="$router.push(`/userinfo?id=${item.user.userId}`)">{{item.user.nickname}}：</span>
                        <span>{{item.content}}</span>
                    </div>
                </div>
                <div class="bottom">
                    <div class="time">
                        {{time1(item.time)}}
                    </div>
                    <div class="right">
                        <span><img src="../../public/img/点赞.png">
                        {{item.likedCount}}</span>
                        <span>丨</span>
                        <img src="../../public/img/分享.png">
                        <span>丨</span>
                        <img src="../../public/img/编辑.png">
                    </div>
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
            :total="mvdetail.commentCount">
            </el-pagination>
        </div>
        <div class="right">
            <h4>相关视频</h4>
            <div class="content" v-for="(item,i) in getrelatedvideo" :key="i" @click="$router.push(`/mvDetail?id=${item.vid}&type=${item.type}`)">
                <div class="left">
                    <img :src="item.coverUrl">
                    <img src="../../public/img/播放量.png">
                    <span>{{item.playTime > 10000? parseInt(item.playTime/10000)+'万' :  item.playTime}}</span>
                    <span>
                        {{(parseInt(item.durationms/1000/60) < 10 ? '0'+ parseInt(item.durationms/1000/60) : parseInt(item.durationms/1000/60) )
                        + ':'+(parseInt((item.durationms/1000/60 - parseInt(item.durationms/1000/60))*60) < 10 ? '0'+parseInt((item.durationms/1000/60 - parseInt(item.durationms/1000/60))*60) : parseInt((item.durationms/1000/60 - parseInt(item.durationms/1000/60))*60))
                        }}
                    </span>
                </div>
                <div class="right">
                    <span>{{item.title}}</span>
                    <span>by<span>{{item.creator[0].userName}}</span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api/mvApi/index'
import api1 from '@/api/musicApi/index'
export default {
    data(){
        return{
            mvdetail:{
                creator:[],
                avatarUrl:''
            },
            mvurl:[],
            creatorimg:'',
            hotcomment:{},
            newcomment:{},
            queryinfo:{
                query:'',
                pagenum:1,
                pagesize:20
            },
            getrelatedvideo:[],
        }
    },
    methods:{
        time(time){
            let newtime = new Date(time)
            let year=newtime.getFullYear()
            let month=newtime.getMonth()+1;
            let day = newtime.getDate()
            return year+'-'+(month > 9 ? month : '0' + month)+'-'+(day > 9 ? day : '0' + day)
        },
        time1(time){
            let newtime = new Date(time)
            let year = newtime.getFullYear()
            let month=newtime.getMonth()+1;
            let day = newtime.getDate()
            let hour=newtime.getHours();
            let minute=newtime.getMinutes();
            return year + '年' + month +'月'+day+'日'+' '+(hour > 9 ? hour : '0'+hour)+':'+(minute > 9 ? minute : '0'+minute)
        },
        async getMvDetail(){
            if(this.$route.query.type==0 || this.$route.query.type==5 ){
                let result = await api.getMvDetail(this.$route.query.id)
                let result1 = await api.getMvUrl(this.$route.query.id)
                let result2 = await api1.getSinger(result.data.data.artistId)
                let result3 = await api.getHotComment(this.$route.query.id,1)
                this.hotcomment = result3.data.hotComments
                this.mvdetail = result.data.data
                this.mvurl = result1.data.data
                this.creatorimg = result2.data.data.artist.cover
            }else{
                let result = await api.getVideoDetail(this.$route.query.id)
                let result1 = await api.getVideoUrl(this.$route.query.id)
                let result2 = await api.getHotComment(this.$route.query.id,5)
                this.hotcomment = result2.data.hotComments
                this.mvdetail = result.data.data
                this.mvurl = result1.data.urls[0]
            }
            let result = await api.getRelatedVideo(this.$route.query.id)
            this.getrelatedvideo = result.data.data
        },
        async getNewComment(id,limit,offset){
            if(this.$route.query.type==0 || this.$route.query.type==5 ){
                let result = await api.getMVComment(id,limit,offset)
                this.newcomment = result.data.comments
            }else{
                let result = await api.getVideoComment(id,limit,offset)
                this.newcomment = result.data.comments
            }
        },
        handleSizeChange(newsize){
            //这里conso 选中第几页 最新的值
            console.log(newsize)
            //最新的条数（newsize）赋值给 动态的 pagesie
            this.queryinfo.pagesize = newsize
            //获取到最新一页显示的数据  重新发送axios请求 这里是封装好的请求方法
            let offset = (newsize -1)*20
            this.getNewComment(this.$route.query.id,20,offset)
        },
        handleCurrentChange(newPage) {
            // console.log(newPage)
            //把最新的页码（newPage）赋值给 动态的 pagenum 
            this.queryinfo.pagenum = newPage
            //获取到最新显示的页码值  重新发送axios请求 这里是封装好的请求方法
            let offset = (newPage -1)*20
            this.getNewComment(this.$route.query.id,20,offset)
        }
    },
    mounted(){
        this.getMvDetail()
        this.getNewComment(this.$route.query.id,20,1)
    },
    watch:{
        '$route'(to,from){
            if (to.query.id !== from.query.id) {
                this.getMvDetail()
                this.getNewComment(this.$route.query.id,20,1)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.mvDetail::-webkit-scrollbar {
    width:3px;
}
.mvDetail::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.2);
    background:rgb(224, 224, 224);
}
.mvDetail{
    overflow: auto;
    height: 100%;
    width: 82%;
    margin-left: 18%;
    // background-color: red;
    display:flex;
    .left{
        width: 50%;
        height: 100%;
        .top{
            margin-top: 2%;
            display: flex;
            img{
                height: 18px;
                width: 18px;
                cursor: pointer;
            }
            h4{
                margin-top: 0;
                margin-left: 1%;
                cursor: default;
            }
        }
        .content{
            width: 100%;
            margin-top: 2%;
            height: 50%;
            video{
                width: 100%;
            }
        }
        .creatorinfo{
            margin-top: 3%;
            display: flex;
            align-items: center;
            img{
                height: 50px;
                width: 50px;
                border-radius: 50%;
                cursor: pointer;
            }
            span{
                margin-left: 2%;
                color: rgb(103, 103, 103);
            }
            span:hover{
                color: rgb(55, 55, 55);
                cursor: pointer;
            }
        }
        h2{
            margin-top: 3%;
            cursor: default;
            // overflow: hidden;
            // text-overflow:ellipsis;
            // white-space: nowrap;
        }
        .timecount{
            margin-top: 2%;
            color: rgb(207, 207, 207);
            font-size: 12px;
            cursor: default;
            span:nth-child(2){
                margin-left: 3%;
            }
        }
        .title{
            margin-top: 2%;
            display: flex;
            div:nth-child(1){
                margin-left: 0;
            }
            div{
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                margin-left: 1%;
                font-size: 12px;
                padding: 1%;
                background-color: rgb(247, 247, 247);
                border-radius: 999rem;
            }
        }
        .button{
            margin-top: 5%;
            display: flex;
            div{
                justify-content: center;
                width: 16%;
                margin-left: 2%;
                border: 1px solid rgb(216, 216, 216);
                border-radius: 999rem;
                display: flex;
                align-items: center;
                padding: 1%;
                font-size: 13px;
                img{
                    height: 15px;
                    width: 15px;
                }
                span{
                    margin-left: 5%;
                    display: flex;
                }
            }
            div:nth-child(1){
                margin-left: 0;
            }
            div:nth-child(4){
                img{
                    height: 20px;
                    width: 20px;
                }
            }
            div:hover{
                background-color: rgb(242, 242, 242);
                cursor: pointer;
            }
        }
        h3{
            margin-top: 5%;
            span{
                font-size: 12px;
            }
        }
        h4{
            margin-top: 5%;
        }
        .comment{
            margin-top: 3%;
            padding-bottom: 2%;
            width: 100%;
            display: flex;
            flex-direction: column;
            border-bottom: 1px solid rgb(242, 242, 242);
            .top{
                margin-top: 0;
                width: 100%;
                height: 00%;
                font-size: 12px;
                img{
                    height: 40px;
                    width: 40px;
                    border-radius: 50%;
                }
                .content{
                    margin-left: 3%;
                    margin-top: 0;
                    color: rgb(103, 103, 103);
                    span:nth-child(1){
                        color: rgb(80, 125, 175);
                        cursor: pointer;
                    }
                    span:nth-child(2){
                        overflow: hidden;
                        text-overflow:ellipsis;
                        // white-space: nowrap;
                    }
                }
            }
            .bottom{
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                .time{
                    cursor: default;
                    color: rgb(159, 159, 159);
                    margin-left: 9.2%;
                }
                .right{
                    width: 20%;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    color: rgb(103, 103, 103);
                    span{
                        cursor: default;
                    }
                    span:nth-child(1){
                        display: flex;
                        justify-content: space-around;
                        align-items: center; 
                        cursor: pointer;
                    }
                    img{
                        height: 15px;
                        width: 15px;
                        cursor: pointer;
                    }
                    img:nth-child(4){
                        height: 14px;
                        width: 14px;
                    }
                }
            }
        }
        .el-pagination{
            margin:5% auto;
            padding-bottom: 10%;
            display: flex;
            justify-content: center;
        }
    }
    .right{
        margin-left: 3%;
        width: 22%;
        height: 100%;
        h4{
            margin-top: 5%;
        }
        .content{
            margin-top: 4%;
            width: 100%;
            height: 12%;
            display: flex;
            .left{
                cursor: pointer;
                width: 50%;
                position: relative;
                img:nth-child(1){
                    width: 100%;
                    height: 100%;
                    border-radius: 5px;
                }
                img:nth-child(2){
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    top: 5%;
                    right: 30%;
                }
                span:nth-child(3){
                    position: absolute;
                    top: 3%;
                    right: 5%;
                    color: white;
                    font-size: 12px;
                }
                span:nth-child(4){
                    position: absolute;
                    bottom: 5%;
                    right: 5%;
                    color: white;
                    font-size: 12px;
                }
            }
            .right{
                cursor: pointer;
                width: 50%;
                display: flex;
                flex-direction: column;
                span:nth-child(1){
                    height: 60%;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    width:100% ;
                }
                span:nth-child(2){
                    height: 40%;
                    font-size: 12px;
                    color: rgb(159, 159, 159);
                    display: flex;
                    align-items: center;
                    span{
                        font-size: 12px;
                        margin-left: 3%;
                    }
                    span:hover{
                        color: rgb(103, 103, 103);
                    }
                }
            }
        }
    }
}
</style>