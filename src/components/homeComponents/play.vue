<template>
    <div class="play">
        <div class="top">
            <div class="left">
                <div class="pic">
                    <img ref="pic" src="../../../public/img/needle-ab.png">
                    <img src="../../../public/img/quan.png">
                    <img ref="pic1" :src="musicinfo.al.picUrl">
                </div>
                <div class="button">
                    <div><img src="../../../public/img/喜欢(黑).png"></div>
                    <div><img src="../../../public/img/收藏(1).png"></div>
                    <div><img src="../../../public/img/下载.png"></div>
                    <div><img src="../../../public/img/分享.png"></div>
                </div>
            </div>
            <div class="right">
                <div class="songname">{{musicinfo.name}}</div>
                <div class="title">
                    <span>专辑：<span @click="$router.push(`/albumlist?id=${musicinfo.al.id}`)">{{musicinfo.al.name}}</span></span>
                    <span>歌手：<span @click="$router.push(`/singer?id=${item.id}&name=${''}`)" v-for="(item,i) in musicinfo.ar" :key="i">{{item.name}}<span v-if="i!=musicinfo.ar.length-1">/</span></span></span>
                </div>
                <div ref="roll" class="lyric">
                    <div ref="lyric" v-html="makelyric()"></div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="bottom-left">
                <h4 v-if="hotcomments!=''">热门评论</h4>
                <div class="comment" v-for="(item,i) in hotcomments" :key="i">
                    <div class="comment-left">
                        <img :src="item.user.avatarUrl" @click="$router.push(`/userinfo?id=${item.user.userId}`)">
                    </div>
                    <div class="comment-right">
                        <div class="comment-right-top">
                            <span @click="$router.push(`/userinfo?id=${item.user.userId}`)">{{item.user.nickname}}:</span>
                            {{item.content}}
                        </div>
                        <div class="comment-right-bottom">
                            <div class="time">    
                                {{time(item.time)}}
                            </div>
                            <div class="button">
                                <span><img src="../../../public/img/点赞.png">
                                {{item.likedCount}}</span>
                                <span>丨</span>
                                <img src="../../../public/img/分享.png">
                                <span>丨</span>
                                <img src="../../../public/img/编辑.png">
                            </div>
                        </div>
                    </div>
                </div>
                <h4 style="margin-top:10%" v-if="hotcomments!=''">最新评论</h4>
                <a>
                    <div class="comment" v-for="(item,i) in comments" :key="i">
                        <div class="comment-left">
                            <img :src="item.user.avatarUrl" @click="$router.push(`/userinfo?id=${item.user.userId}`)">
                        </div>
                        <div class="comment-right">
                            <div class="comment-right-top">
                                <span @click="$router.push(`/userinfo?id=${item.user.userId}`)">{{item.user.nickname}}:</span>
                                {{item.content}}
                            </div>
                            <div class="comment-right-bottom">
                                <div class="time">    
                                    {{time(item.time)}}
                                </div>
                                <div class="button">
                                    <span><img src="../../../public/img/点赞.png">
                                    {{item.likedCount}}</span>
                                    <span>丨</span>
                                    <img src="../../../public/img/分享.png">
                                    <span>丨</span>
                                    <img src="../../../public/img/编辑.png">
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            <div class="bottom-right">
                <h4 v-if="aboutmusiclist!=''">包含这首歌的歌单</h4>
                <div class="bottom-right-content" v-for="(item,i) in aboutmusiclist" :key="i" @click="$router.push(`/musiclist?id=${item.id}`)">
                    <img :src="item.coverImgUrl">
                    <div>
                        <span>{{item.name}}</span>
                        <span>播放：<span>{{item.playCount>10000 ? parseInt(item.playCount/10000)+"万" : item.playCount}}</span></span>
                    </div>
                </div>
                <h4 style="margin-top:10%">相似歌曲</h4>
                <a>
                    <div class="bottom-right-content" v-for="(item,i) in aboutmusic" :key="i"  @click="pl(item.id)">
                        <img :src="item.album.blurPicUrl" v-if="item.album">
                        <div>
                            <span>{{item.name}}</span>
                            <span><span v-for="(item,i) in item.artists" :key="i">{{item.name+' '}}</span></span>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import api from '@/api/musicApi/index'
import api1 from '@/api/mvApi/index'
import { mapState,mapMutations } from 'vuex'
export default {
    data(){
        return{
            musicinfo:{
                al:[]
            },
            hotcomments:[],
            aboutmusiclist:[],
            aboutmusic:[],
            comments:[],
            lyric:[],
        }
    },
    methods:{
        ...mapMutations(['setControllerMusic','setMusicUrl','setSumMusicUrl','setSumMusicMessage']),
        async pl(id){
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
        async getMusicInfo(id){
            let result = await api.getMusicInformation(id)
            let result2 = await api1.getHotComment(id,0) //获取热门评论
            let result3 = await api.getAboutMusicList(id)//获取包含此歌曲歌单
            let result4 = await api.getAboutMusic(id) // 获取相似歌曲
            let result1 = await api.getLyric(id) //获取歌词
            this.lyric = result1.data.lrc
            this.aboutmusic = result4.data.songs
            this.aboutmusiclist = result3.data.playlists  
            this.hotcomments = result2.data.hotComments
            this.musicinfo = result.data.songs[0]
        },
        makelyric(){ //设置将接口得到的歌词切割
            if(this.lyric.lyric){
                let txt = this.lyric.lyric
                let string = []
                for(let i = 0 ;i<txt.split('\n').length;i++){
                    string.push(`<p style="padding:1.5% 0"><span style="display:none">${txt.split('\n')[i].slice(0,6)+']'}</span>${txt.split('\n')[i].slice(txt.split('\n')[i].indexOf(']')+1)}</p>`)
                }
                let result = string.join('')
                return result
            } 
        },
        async getMusicComment(id,limit,offset){
            let result = await api.getMusicComment(id,limit,offset)
            this.comments = result.data.comments
        },
        time(time){
            let newtime = new Date(time)
            let year = newtime.getFullYear()
            let month=newtime.getMonth()+1;
            let day = newtime.getDate()
            let hour=newtime.getHours();
            let minute=newtime.getMinutes();
            return year + '年' + month +'月'+day+'日'+' '+(hour > 9 ? hour : '0'+hour)+':'+(minute > 9 ? minute : '0'+minute)
        },
       
    },
    mounted(){
        this.getMusicInfo(this.$route.query.id)
        this.getMusicComment(this.$route.query.id,20,1)
    },
    computed: {
        ...mapState(['currentTime','musicUrl','play','sumMusicMessage','controllerMusic'])
    },
    watch:{
        currentTime(newNum,oldValue){ //监听controller播放
            let that = this
            let result =  (parseInt(newNum/60)<10 ? '0'+parseInt(newNum/60) : parseInt(newNum/60))
            + ':'+(parseInt((newNum/60 - parseInt(newNum/60))*60)<10 ? '0'+parseInt((newNum/60 - parseInt(newNum/60))*60) :parseInt((newNum/60 - parseInt(newNum/60))*60))
            for(let i = 0; i<that.$refs.lyric.children.length;i++){ 
                if(that.$refs.lyric.children[i].innerHTML.slice(28,33)==result){  //设置正在播放歌词样式
                    for(let i = 0; i<that.$refs.lyric.children.length;i++){ 
                        that.$refs.lyric.children[i].style.fontWeight=null
                        that.$refs.lyric.children[i].style.color='rgb(102, 102, 102)'
                        that.$refs.lyric.children[i].style.fontSize='14px'
                    }
                    that.$refs.lyric.children[i].style.fontWeight='600'
                    that.$refs.lyric.children[i].style.fontSize='16px'
                    that.$refs.lyric.children[i].style.color='black'
                    if(that.$refs.lyric.children[i].offsetTop-150>that.$refs.roll.offsetHeight/2){ //设置歌词滚动到可视距离一般滚动条的值
                        that.$refs.roll.scrollTop=(that.$refs.lyric.children[i].offsetTop-150-that.$refs.roll.offsetHeight/2)
                    }else{
                        that.$refs.roll.scrollTop=0
                    }
                }
            }
            that.$refs.pic.style.transform = 'rotate(-12deg)';
            that.$refs.pic1.style.animationPlayState = 'running';
        },
        musicUrl(newValue,oldValue){ //监听歌曲切换 歌曲切换后重新跳转路由
            this.$router.push(`/play?id=${newValue.id}`)
            this.getMusicInfo(this.$route.query.id)
            this.getMusicComment(this.$route.query.id,20,1)
        },
        play(newValue,oldValue){
            let that = this
            if(newValue==1){
                that.$refs.pic.style.transform = 'rotate(-42deg)';
                that.$refs.pic1.style.animationPlayState = 'paused';
            }
        },
    }
}
</script>
<style lang="less" scoped>
.play::-webkit-scrollbar {
    width:3px;
}
.play::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.2);
    background:rgb(224, 224, 224);
}
.play{
    overflow: scroll;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    .top{
        overflow: hidden;
        margin-left: 20%;
        width: 60%;
        height: 80%;
        display: flex;
        .left{
            height: 100%;
            width: 45%;
            .pic{
                height: 80%;
                position: relative;
                width: 100%;
                border:1px solid transparent;
                display: flex;
                img:nth-child(1){
                    position: absolute;
                    width: 20%;
                    height: 35%;
                    z-index: 2;
                    top: 0;
                    left: 40%;
                    transform-origin:10% 0; // 旋转中心点
                    transform: rotate(-42deg);
                    transition: all 1s;
                }
                img:nth-child(2){
                    width: 82%;
                    height: 90%;
                    margin-left: 4%;
                    margin-top: 10%;
                    background-image: url(../../../public/img/quan.png);
                    background-size: 100%;
                    background-repeat: no-repeat;
                    z-index: 1;
                }
                @-webkit-keyframes rotation{
                    from{
                        transform: rotate(0deg);
                    }
                    to{
                        transform: rotate(360deg);
                    }
                }
                img:nth-child(3){
                    position: absolute;
                    width: 60%;
                    height: 60%;
                    top:25%;
                    left: 15%;
                    border-radius: 999rem;
                    animation: rotation 30s linear infinite;
                    animation-play-state: paused;
                }
            }
            .button{
                margin-left: 8%;
                width: 75%;
                height: 20%;
                display: flex;
                align-items: center;
                justify-content: space-around;
                div{
                    border-radius: 999rem;
                    height: 48%;
                    width: 15%;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    background-color: rgb(245, 245, 245);
                    img{
                        height: 50%;
                        width: 50%;
                    }
                }
                div:hover{
                    cursor: default;
                    background-color: rgb(235, 235, 235);
                }
                div:nth-child(3){
                    img{
                        height: 60%;
                        width: 60%;
                    }
                }
            }
        }
        .right{
            width: 50%;
            margin-left: 5%;
            height: 100%;
            .songname{
                display: flex;
                align-items: center;
                height: 10%;
                font-size: 25px;
                font-weight: 500;
                margin-top: 5%;
                cursor: default;
                overflow: hidden;//超出隐藏
                text-overflow:ellipsis;//超出部分显示...
                white-space: nowrap;//文本不换行
            }
            .title{
                display: flex;
                height: 7%;
                align-items: center;
                span{
                    overflow: hidden;//超出隐藏
                    text-overflow:ellipsis;//超出部分显示...
                    white-space: nowrap;//文本不换行
                    cursor: pointer;
                    font-size: 12px;
                    color: rgb(102, 102, 102);
                    span{
                        color: rgb(80, 125, 175);
                    }
                }
                span:nth-child(2){
                    width: 50%;
                    margin-left: 10%;
                    span{
                        margin-left: 0;
                    }
                }
            }
            .lyric::-webkit-scrollbar {
                width:3px;
            }
            .lyric::-webkit-scrollbar-thumb {
                border-radius: 10px;
                box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.2);
                background:rgb(224, 224, 224);
            }
            .lyric{
                overflow: auto;
                font-size: 14px;
                margin-top: 1%;
                width: 90%;
                height: 70%;
                border-right: 1px solid rgb(243, 243, 243);
                color: rgb(102, 102, 102);
            }
        }
    }
    .bottom{
        height: 15%;
        margin-top: 3%;
        width: 60%;
        margin-left: 20%;
        display: flex;
        .bottom-left{
            width: 60%;
            height: 100%;
            h4{
                cursor: default;
            }
            .comment{
                margin-top: 5%;
                font-size: 12px;
                width: 100%;
                padding-bottom: 3%;
                display: flex;
                border-bottom:  1px rgb(243, 243, 243) solid;
                .comment-left{
                    width: 7%;
                    height: 100%;
                    img{
                        border-radius: 999rem;
                        height: 100%;
                        width: 100%;
                        cursor: pointer;
                    }
                }
                .comment-right{
                    margin-left: 2%;
                    width: 90%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    .comment-right-top{
                        width: 100%;
                        span{
                            cursor: pointer;
                            color: rgb(80, 125, 175);
                        }
                    }
                    .comment-right-bottom{
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        margin-top: 1.5%;
                        .time{
                            cursor: default;
                            color: rgb(153, 153, 153);
                        }
                        .button{
                            cursor: default;
                            display: flex;
                            justify-content: space-around;          
                            width: 25%;
                            span{
                                display: flex;
                                img{
                                    margin-top: 2.5%;
                                }
                            }
                            img{
                                margin-top: 1%;
                                height: 13px;
                                width: 13px;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }
        .bottom-right{
            width: 40%;
            height: 35%;
            h4{
                cursor: default;
                margin-left: 20%;
            }
            .bottom-right-content:hover{
                background-color: rgb(241, 242, 243);
            }
            .bottom-right-content{
                cursor: default;
                margin-top: 3%;
                border-radius: 5px;
                margin-left: 20%;
                width: 70%;
                display: flex;
                align-content: center;
                font-size: 12px;
                img:nth-child(1){      
                    margin:2% 0 2% 2%;
                    width: 18%;
                    height: 80%;
                    border-radius: 5px;
                }
                div{
                    margin-left: 3%;
                    width: 75%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    span:nth-child(1){
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                    span:nth-child(2){
                        margin-top: 3%;
                        color: rgb(153, 153, 153);
                    }
                }
            }
        }
    }
}
</style>