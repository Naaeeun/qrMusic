<template>
    <div class="musiclist">
        <div class="musicListTop">
            <img :src="playListDetails.coverImgUrl">
            <div class="right">
                <h3>{{playListDetails.name}}</h3>
                <div class="nameTime">
                    <img :src="playListDetails.creator.avatarUrl">
                    <span @click="$router.push(`/userinfo?id=${playListDetails.creator.userId}`)">{{playListDetails.creator.nickname}}</span>
                    <span>{{time(playListDetails.createTime)}}创建</span>
                </div>
                <div class="triplet">
                    <div class="first">
                    <div><img src="../../../../public/img/播放(白).png"><span>播放全部</span></div>
                    <div><img src="../../../../public/img/加号.png"></div>
                    </div>
                    <div class="second"><img src="../../../../public/img/收藏(1).png"><span>收藏({{playListDetails.subscribedCount>10000 ? parseInt(playListDetails.subscribedCount/10000)+'万' : playListDetails.subscribedCount}})</span></div>
                    <div class="third"><img src="../../../../public/img/分享.png"><span>分享({{playListDetails.shareCount}})</span></div>
                    <div class="fourth"><img src="../../../../public/img/下载全部.png"><span>下载全部</span></div>
                </div>
                <div class="title" v-if="playListDetails.tags">
                    <span>标签:</span>
                    <span v-for="(item,i) in playListDetails.tags" :key="i">
                    {{item+''}}
                    </span>
                </div>
                <div class="count">
                    <span>歌曲:</span>
                    {{playListDetails.trackCount}}
                    <span>播放:</span>
                    {{parseInt(playListDetails.playCount/10000) ? parseInt(playListDetails.playCount/10000)+'万' : null}}
                </div>
                <div class="intro">
                    <span>简介:</span>
                    <span ref="description"></span>
                </div>
            </div>
        </div>
        <div class="nav">
            <div class="playlist"><router-link :to="`/musiclist/musiclistcontent?id=${this.playListDetails.id}`">歌曲列表</router-link></div>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import api from '@/api/musicApi/index.js'
export default {
    data(){
        return{
            playListDetails:{creator:{}}, //歌单详细信息
        }
    },
    mounted(){
        this.getMusicList(this.$route.query.id)
    },
    methods:{
        async getMusicList(id){
            let result = await api.getMusicList(id)
            this.playListDetails = result.data.playlist
            if(result.data.playlist.description){
                this.$refs.description.innerHTML = (result.data.playlist.description.split('')).length > 20 ? 
                result.data.playlist.description.substring(0,20) : result.data.playlist.description 
                //判断简介字数大于20 则截取到20
            }
        },
        getDescriptionLenght(){
            playListDetails.description.split('').lenght > 20
            return 'aa'
        },
        time(time){
            let newtime = new Date(time)
            let year=newtime.getFullYear()
            let month=newtime.getMonth()+1;
            let day = newtime.getDate()
            return year+'-'+(month > 9 ? month : '0' + month)+'-'+(day > 9 ? day : '0' + day)
        }
    },
    watch:{
        '$route'(to,from){
            if(to.query.id!=from.query.id){
                this.getMusicList(this.$route.query.id)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.musiclist::-webkit-scrollbar {
    width:3px;
}
.musiclist::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.2);
    background:rgb(224, 224, 224);
}
.musiclist{
    overflow: auto;
    height: 100%;width: 100%;
    display: flex;
    flex-direction: column;
    .musicListTop{
        height: 35%;
        display: flex;
        img{
            width:180px;height:180px;
            margin-top: 2%;
            margin-left: 2%;
            border-radius: 5px;
        }
        .right{
            flex: 1;
            display: flex;
            flex-direction: column;
            margin-top: 2%;
            margin-left: 2%;
            .nameTime{
                display: flex;
                align-items: center;
                img{
                    margin-top: 0.5%;
                    margin-left: 0;
                    height: 25px;width: 25px;
                    border-radius: 25px;
                }
                span:nth-child(2){
                    margin-left: 1%;
                    margin-top: 0.5%;
                    color: rgb(80, 125, 175);
                    font-size: 12px;
                    cursor: pointer;
                }
                span:nth-child(3){
                    margin-top: 0.5%;
                    margin-left: 1%;
                    font-size: 12px;
                    color: rgb(159,159,159);
                    cursor: default;
                }
            }
            .triplet{
                margin-top: 1%;
                display: flex;
                .first{
                    width: 12%;
                    height: 150%;
                    display: flex;
                    cursor: pointer;

                    div:nth-child(1){
                        border-radius: 75px 0 0 75px;
                        background-color: rgb(236,65,65);
                        width: 75%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-right: 1px rgb(237, 83, 83) solid;
                        color: white;
                        img{
                            height: 15px;
                            width: 15px;
                        }
                        span{
                            margin-left: 3%;
                            font-size: 14px;
                        }
                    }
                    div:nth-child(1):hover{
                        background-color: rgb(204, 50, 50);
                    }
                    div:nth-child(2){
                        background-color: rgb(236,65,65);
                        border-radius: 0 25px 25px 0;
                        width: 25%;
                        height: 100%;
                        align-items: center;
                        display: flex;
                        justify-content: center;
                        img{
                            height: 20px;
                            width: 20px;
                        }
                    }
                    div:nth-child(2):hover{
                        background-color: rgb(204, 50, 50);
                    }
                }
                .second:hover{
                    background-color: rgb(242, 242, 242);
                }
                .second{
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-left: 1%;
                    height: 150%;
                    width: 10%;
                    border: 1px solid rgb(216, 216, 216);
                    border-radius: 999em;
                    img{
                        height: 20px;
                        width: 20px;
                    }
                    span{
                        margin-left: 1%;
                        font-size: 14px;
                    }
                }
                .third:hover{
                    background-color: rgb(242, 242, 242);
                }
                .third{
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-left: 1%;
                    height: 150%;
                    border: 1px solid rgb(216, 216, 216);
                    border-radius: 999em;
                    width: 10%;
                    img{
                        height: 20px;
                        width: 20px;
                    }
                    span{
                        margin-left: 1%;
                        font-size: 14px;
                    }
                }
                .fourth:hover{
                    background-color: rgb(242, 242, 242);
                }
                .fourth{
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-left: 1%;
                    border: 1px solid rgb(216, 216, 216);
                    border-radius: 999em;
                    height: 150%;
                    width: 10%;
                    img{
                        height: 20px;
                        width: 20px;
                    }
                    span{
                        margin-left: 1%;
                        font-size: 14px;
                    }
                }
            }
            .title{
                margin-top: 2.5%;
                span:nth-child(1){
                    color: black;
                    font-size: 13px;
                }
                span{
                    cursor: pointer;
                    font-size: 13px;
                    color: rgb(80, 125, 175);
                }
            }
            .count{
                margin-top: 0.5%;
                font-size: 13px;
                color: rgb(103,103,103);
                span{
                    color: black;
                }
                span:nth-child(2){
                    margin-left: 0.5%;
                }
            }
            .intro{
                margin-top: 0.5%;
                font-size: 13px;
                color: rgb(103,103,103);
                width: 20%;
                display: flex;
                span:nth-child(1){
                    width: 20%;
                    color: black;
                }
                span:nth-child(2){
                    width: 80%;
                    overflow: hidden;//超出隐藏
                    text-overflow:ellipsis;//超出部分显示...
                    white-space: nowrap;//文本不换行
                }
            }
        }
    }
    .nav{
        font-size: 15px;
        margin-top: 1%;
        width: 100%;
        height: 5%;
        display: flex;
        align-items: center;
        a{
            text-decoration: none;
            color: black;
        }
        .router-link-active{
            font-weight: 600;
            border-bottom: 3px solid rgb(236, 65, 65);
        }
        .playlist{
            margin-left: 2%;
        }
    }
    .content{
        height: 41%;
        width: 100%;
    }
}
</style>