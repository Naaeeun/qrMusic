<template>
    <div class="singer">
        <div class="nav">
            <div class="top">
                <div class="left">
                   <img :src="singer.artist ? singer.artist.cover : '' ">
                </div>
                <div class="right">
                    <span class="singername">{{singer.artist.name}}</span>
                    <span>{{this.$route.query.name}}</span>
                    <div><img src="../../../../public/img/收藏(1).png"><span>收藏</span></div>
                    <div class="count">
                        <span>单曲数量:{{singer.artist.musicSize}}</span>
                        <span>专辑数:{{singer.artist.albumSize}}</span>   
                        <span>MV数:{{singer.artist.mvSize}}</span>   
                    </div>
                </div>
            </div>
            <div class="bottom">
                <router-link :to="`/singer/singermusic?id=${singer.artist.id}&name=${this.$route.query.name}`">歌曲</router-link>
                <router-link :to="`/singer/singeralbum?id=${singer.artist.id}&name=${this.$route.query.name}`">专辑</router-link>
                <router-link :to="`/singer/singermv?id=${singer.artist.id}&name=${this.$route.query.name}`">MV</router-link>
                <router-link :to="`/singer/singerdetail?id=${singer.artist.id}&name=${this.$route.query.name}`">歌手详情</router-link>
            </div>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import api from '@/api/musicApi/index'
export default {
    data(){
        return{
            singer:{
                artist:[]
            },
        }
    },
    methods:{
        async getSinger(){
            let result = await api.getSinger(this.$route.query.id)
            this.singer = result.data.data
        },
        
    },
    mounted(){
        this.getSinger()
    },
    watch:{
        '$route'(to,from){
            if(to.query.id !=from.query.id){
                this.getSinger()
            }
        }
    }
    
}
</script>

<style lang="less" scoped>
.singer::-webkit-scrollbar {
    width:3px;
}
.singer::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.2);
    background:rgb(224, 224, 224);
}
.singer{
    overflow: auto;
    width: 100%;
    height: 100%;
    .nav{
        height: 35%;
        width: 100%;
        .top{
            height: 90%;
            width: 100%;
            display: flex;
            .left{
                width: 13%;
                height: 100%;
                img{
                    margin:10% 0 0 10%;
                    width: 100%;
                    height: 80%;
                    border-radius: 5px;
                }
            }
            .right{
                margin-left: 2.5%;
                display: flex;
                flex-direction: column;
                width: 25%;
                .singername{
                    cursor: default;
                    margin-top: 6%;
                    font-weight: 600;
                    font-size: 25px;
                }
                span:nth-child(2){
                    cursor: default;
                    margin-top: 3%;
                }
                div:nth-child(3):hover{
                    background-color: rgb(242, 242, 242);
                }
                div:nth-child(3){
                    cursor: pointer;
                    margin-top: 3%;
                    width: 35%;
                    height: 15%;
                    border-radius: 999rem;
                    border: 1px solid rgb(216, 216, 216);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        height: 20px;
                        width: 20px;
                    }
                    span{
                        cursor: pointer;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        margin-left: 3%;
                        margin-top: 0;
                    }
                }
                .count{
                    cursor: default;
                    display: flex;
                    width: 100%;
                    margin-top: 0;
                    span{
                        font-size: 13px;
                        margin-top: 5%;
                        font-weight: normal;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                    }
                }
            }
        }
        .bottom{
            width: 18%;
            height: 10%;
            margin-left: 0.7%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            a{
                color: black;
                text-decoration: none;
                font-size: 14px;
                padding: 1% 0;
            }
            .router-link-active{
                border-bottom: 3px solid rgb(236, 65, 65);
                font-weight: 600;
            }
        }
    }
    .content{
        margin-top: 1%;
        height: 60%;
        width: 100%;
    }
}
</style>