<template>
    <div class="musiclist">
        <div class="musicListTop">
            <img :src="album.picUrl">
            <div class="right">
                <h3>{{album.name}}</h3>
                <div class="triplet">
                    <div class="first">
                    <div><img src="../../../../public/img/播放(白).png"><span>播放全部</span></div>
                    <div><img src="../../../../public/img/加号.png"></div>
                    </div>
                    <div class="second"><img src="../../../../public/img/收藏(1).png"><span>收藏</span></div>
                    <div class="third"><img src="../../../../public/img/分享.png"><span>分享({{album.info.shareCount}})</span></div>
                    <div class="fourth"><img src="../../../../public/img/下载全部.png"><span>下载全部</span></div>
                </div>
                <div class="title">
                    <span>歌手:</span>
                    <span @click="$router.push(`/singer?id=${album.artist.id}`)">{{album.artist.name}}</span>
                </div>
                <div class="createtime">
                    <span>时间:</span>
                    <span>{{time(album.publishTime)}}</span>
                </div>
            </div>
        </div>
        <div class="nav">
            <div class="playlist"><router-link :to="`/albumlist/albumlistcontent?id=${this.album.id}`">歌曲列表</router-link></div>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import api from '@/api/albumApi/index'
export default {
    data(){
        return{
            album:{
                info:[],
                artist:[]
            },
            count:'',
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
        async getAlbum(){
            let result  = await api.getAlbum(this.$route.query.id)
            this.album = result.data.album
            this.count = result.data.songs.length
        },
    },
    mounted () {
        this.getAlbum()
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
                }
                span:nth-child(2){
                    margin-left: 0.5%;
                    cursor: pointer;
                }
                span{
                    font-size: 13px;
                    color: rgb(80, 125, 175);
                }
            }
            .createtime{
                margin-top: 1%;
                span:nth-child(1){
                    color: black;
                }
                span:nth-child(2){
                    margin-left: 0.5%;
                    cursor: default;
                    color: rgb(103, 103, 103);
                }
                span{
                    font-size: 13px;
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