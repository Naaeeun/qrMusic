<template>
    <div class="userinfo">
        <div class="nav">
            <div class="left">
                <img :src="userinfo.profile ? userinfo.profile.avatarUrl : 'http://localhost:3000'+userinfo.headimg">
            </div>
            <div class="right" v-if="userinfo.gender">
                <div class="top">
                    <h2>{{userinfo.nickname}}</h2>
                    <img v-if="userinfo.gender=='男性'" src="../../../../public/img/男性.png">
                    <img v-else-if="userinfo.gender=='女性'" src="../../../../public/img/女性.png">
                </div>
                <div class="bottom">
                    <span>个人介绍:<span>{{userinfo.introduce}}</span></span>
                </div>
            </div>
            <div class="right" v-else>
                <div class="top" v-if="userinfo.profile">
                    <h2>{{userinfo.profile.nickname}}</h2>
                    <img v-if="userinfo.profile.gender==1" src="../../../../public/img/男性.png">
                    <img v-else-if="userinfo.profile.gender==2" src="../../../../public/img/女性.png">
                </div>
                <div class="bottom" v-if="userinfo.profile">
                    <span>个人介绍:<span>{{userinfo.profile.signature}}</span></span>
                </div>
            </div>
        </div>
        <h3 style="margin:0 0 0 2%" v-if="userplaylist !=''">歌单</h3>
        <div class="content">
            <div class="musiclist" v-if="userplaylist!=''">
                <div class="music" v-for="(item,i) in userplaylist" :key="i">
                    <img :src="item.coverImgUrl" @click="i ==0 ? '' : $router.push(`/musiclist?id=${item.id}`)">
                    <div class="bottom">
                        <span @click="$router.push(`/musiclist?id=${item.id}`)">{{item.name}}</span>
                        <span>{{item.trackCount}}首</span>
                    </div>
                </div>
            </div>
            <h3 style="margin:5% 0 0 2%">收藏</h3>
            <div class="musiclist" style="margin-top:1%">
                <div class="music" v-for="(item,i) in usercollect" :key="i" @click="$router.push(`/musiclist?id=${item.id}`)">
                    <img :src="item.coverImgUrl">
                    <div class="bottom">
                        <span @click="$router.push(`/musiclist?id=${item.id}`)">{{item.name}}</span>
                        <span>{{item.trackCount}}首</span>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
import api from '@/api/myApi/index'
export default {
    data(){
        return{
            userinfo:[],
            userplaylist:[],
            usercollect:[],
        }
    },
    methods:{
        async getuserinfo(){
            if(this.$route.query.id){
                let result = await api.getUserInfo(this.$route.query.id)
                let result1 = await api.getUserPlayList(this.$route.query.id)
                this.userinfo = result.data
                for(let i = 0;i<result1.data.playlist.length;i++){
                    if(i+1 <= result.data.bindings.length){
                        this.userplaylist.push(result1.data.playlist[i])
                    }else{
                        this.usercollect.push(result1.data.playlist[i])
                    }
                }
            }else{
                let result = await api.getUserInfo()
                this.userinfo = result.data[0]
            }
        }
    },
    mounted () {
        this.getuserinfo()
    },
    watch:{
        "$route"(to,from){
            if(to.query.id!=from.query.id){
                this.getuserinfo()
            }
        }
    }
}
</script>

<style lang="less" scoped>
.userinfo::-webkit-scrollbar {
    width:5px;
}
.userinfo::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.2);
    background:rgb(224, 224, 224);
}
.userinfo{
    overflow: auto;
    width: 100%;height: 100%;
    .nav{
        height: 40%;
        width: 100%;
        display: flex;
        .left{
            width: 18%;
            height: 100%;
            img{
                margin-left: 10%;
                margin-top: 10%;
                height: 200px;
                width: 200px;
                border-radius: 999rem;
            }
        }
        .right{
            width: 82%;
            height: 100%;
            display: flex;
            flex-direction: column;
            .top{
                height: 40%;
                margin-left: 1%;
                width: 93%;
                align-items: center;
                border-bottom:1px solid rgb(229, 229, 229);
                display: flex;
                h2{
                    cursor: default;
                    margin-top: 5%;
                    width:auto;
                    overflow: hidden;//超出隐藏
                    text-overflow:ellipsis;//超出部分显示...
                    white-space: nowrap;//文本不换行
                }
                img{
                    width: 18px;height: 18px;
                    margin-top: 5.5%;
                    margin-left: 1%;
                }
                div{
                    border: 1px solid rgb(216, 216, 216);
                    border-radius: 999rem;
                    width: 15%;
                    height: 30%;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    margin-top: 5%;
                    align-items: center;
                    margin-left: 65%;
                    font-size: 14px;
                }
                div:hover{
                    background-color: rgb(242, 242, 242);
                }
            }
            .bottom{
                display: flex;
                flex-direction: column;
                width: 100%;
                font-size: 14px;
                color: rgb(55, 55, 55);
                cursor: default;
                span:nth-child(1){
                    margin: 3% 0 0 1%;
                    span{
                        margin-left: 0.5%;
                        color: rgb(103, 103, 103);
                    }
                }
                span:nth-child(2){
                    margin: 1% 0 0 1%;
                    width: 30%;
                    span{
                        margin-left: 0.5%;
                        width: 100%;
                        color: rgb(103, 103, 103);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
    .content{
        height: 60%;
        width: 100%;
        margin-top: 1%;
        margin-bottom: 1%;
        .musiclist{
            display: flex;
            height: 50%;
            margin-left: 2%;
            width:96%;
            flex-wrap: wrap;
            .music:nth-child(6n+1){
                margin-left: 0;
            }
            .music:nth-child(1),.music:nth-child(2),.music:nth-child(3),.music:nth-child(4),.music:nth-child(5),.music:nth-child(6){
                margin-top: 0;
            }
            .music{
                margin-top: 6%;
                width: 15%;
                margin-left: 2%;
                height: 100%;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .bottom{
                    margin-top: 1%;
                    height: 15%;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    span:nth-child(1){
                        cursor: pointer;
                        font-size: 14px;
                    }
                    span:nth-child(2){
                        cursor: default;
                        font-size: 12px;
                        color: rgb(159, 159, 159);
                    }
                }
            }
        }
        
        
    }
}
</style>