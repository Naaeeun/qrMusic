<template>
    <div class="musiclist">
        <div class="musicListTop">
            <img :src="djListDetails.picUrl">
            <div class="right">
                <h3>{{djListDetails.name}}</h3>
                <div class="nameTime">
                    <img :src="djListDetails.dj.avatarUrl">
                    <span>{{djListDetails.dj.nickname}}</span>
                </div>
                <div class="triplet">
                    <div class="first">
                    <div><img src="../../../../public/img/播放(白).png"><span>播放全部</span></div>
                    <div><img src="../../../../public/img/加号.png"></div>
                    </div>
                    <div class="second"><img src="../../../../public/img/收藏(1).png"><span>收藏({{djListDetails.subCount>10000 ? parseInt(djListDetails.subCount/10000)+'万' : djListDetails.subCount}})</span></div>
                    <div class="third"><img src="../../../../public/img/分享.png"><span>分享({{djListDetails.shareCount}})</span></div>
                    <div class="fourth"><img src="../../../../public/img/下载全部.png"><span>下载全部</span></div>
                </div>
                <div class="intro">
                    <span>简介:</span>
                    <span ref="description"></span>
                </div>
            </div>
        </div>
        <div class="nav">
            <div class="playlist"><router-link :to="`/djlist?id=${this.djListDetails.id}`">节目</router-link></div>
            <div class="comment"><router-link :to="`/musiclist/musiclistcomment?id=${this.djListDetails.id}`">订阅者</router-link></div>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import api from '@/api/radioApi/index.js'
export default {
    data(){
        return{
            djListDetails:{
                dj:{}
            }, //歌单详细信息
        }
    },
    mounted(){
        this.getDjList(this.$route.query.id)
    },
    methods:{
        async getDjList(id){
            let result = await api.getDjList(id)
            this.djListDetails = result.data.data
            this.$refs.description.innerHTML = (result.data.data.desc.split('')).length > 30 ? 
            result.data.data.desc.substring(0,30) : result.data.data.desc 
            //判断简介字数大于20 则截取到20
        },
        // getDescriptionLenght(){
        //     djListDetails.description.split('').lenght > 20
        //     return 'aa'
        // }
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
            margin-top: 3%;
            margin-left: 2%;
            .nameTime{
                display: flex;
                align-items: center;
                img{
                    margin-top: 1%;
                    margin-left: 0;
                    height: 25px;width: 25px;
                    border-radius: 25px;
                }
                span:nth-child(2){
                    margin-left: 1%;
                    margin-top: 1%;
                    color: rgb(80, 125, 175);
                    font-size: 12px;
                    cursor: pointer;
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
            .intro{
                margin-top: 3%;
                font-size: 13px;
                color: rgb(103,103,103);
                width: 40%;
                display: flex;
                span:nth-child(1){
                    width: 8%;
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
        .comment{
            margin-left: 1%;
        }
        .collector{
            margin-left: 1%;
        }
        input{
            border:0px;
            margin-left:70%;
            outline:none;
            border-radius:999em;
            padding-left: 0.8%;
            font-size: 12px;
            height: 80%;
            background-color: rgb(247, 247, 247);
        }
    }
    .content{
        height: 41%;
        width: 100%;
    }
}
</style>