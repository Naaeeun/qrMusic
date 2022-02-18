<template>
    <div class="newsradio">
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="(item,i) in banner" :key="i">
            <h3 class="medium"><img :src="item.pic" style="width:100%;height:auto;"></h3>
            </el-carousel-item>
        </el-carousel>
        <h3 style="margin-top:3%">电台个性推荐</h3>
        <div class="broadcastingStation">
            <div class="bsContent" v-for="(item,i) in recommendDj" :key="i" @click="$router.push(`/djlist?id=${item.id}`)">
                <div class="bsImg">
                    <img v-lazy="item.picUrl">
                    <span>{{item.name}}</span>
                </div>
                <span>{{item.rcmdText}}</span>
            </div>
        </div>
        <h3 style="margin-top:3%">有声书</h3>
        <div class="broadcastingStation">
            <div class="bsContent" v-for="(item,i) in audiobook" :key="i" @click="$router.push(`/djlist?id=${item.id}`)">
                <div class="bsImg">
                    <img v-lazy="item.picUrl">
                    <span>{{item.name}}</span>
                </div>
                <span>{{item.rcmdtext}}</span>
            </div>
        </div>
        <h3 style="margin-top:3%">创作翻唱</h3>
        <div class="broadcastingStation">
            <div class="bsContent" v-for="(item,i) in cover" :key="i"  @click="$router.push(`/djlist?id=${item.id}`)">
                <div class="bsImg">
                    <img v-lazy="item.picUrl">
                    <span>{{item.name}}</span>
                </div>
                <span>{{item.rcmdtext}}</span>
            </div>
        </div>
        <h3 style="margin-top:3%">音乐推荐</h3>
        <div class="broadcastingStation">
            <div class="bsContent" v-for="(item,i) in music" :key="i"  @click="$router.push(`/djlist?id=${item.id}`)">
                <div class="bsImg">
                    <img v-lazy="item.picUrl">
                    <span>{{item.name}}</span>
                </div>
                <span>{{item.rcmdtext}}</span>
            </div>
        </div>
        <h3 style="margin-top:3%">情感</h3>
        <div class="broadcastingStation">
            <div class="bsContent" v-for="(item,i) in emotion" :key="i"  @click="$router.push(`/djlist?id=${item.id}`)">
                <div class="bsImg">
                    <img v-lazy="item.picUrl">
                    <span>{{item.name}}</span>
                </div>
                <span>{{item.rcmdtext}}</span>
            </div>
        </div>
        <h3 style="margin-top:3%">脱口秀</h3>
        <div class="broadcastingStation" style="padding-bottom:5%">
            <div class="bsContent" v-for="(item,i) in talkshow" :key="i"  @click="$router.push(`/djlist?id=${item.id}`)">
                <div class="bsImg">
                    <img v-lazy="item.picUrl">
                    <span>{{item.name}}</span>
                </div>
                <span>{{item.rcmdtext}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import api from '@/api/radioApi/index'
import api1 from '@/api/musicApi/index'
export default {
    data(){
        return {
            banner:[],
            payfine:[],
            recommendDj:[],
            audiobook:[],
            cover:[],
            music:[],
            emotion:[],
            talkshow:[]
        }
    },
    mounted(){
        this.getDjBanner()
        this.getPayFine()
        this.getRecommendDj()
        this.getAudioBook()
        this.getCover()
        this.getMusic()
        this.getEmotion()
        this.getTalkShow()
    },
    methods:{
        async getDjBanner(){
            let result = await api.getDjBanner()
            this.banner = result.data.data
        },
        async getPayFine(){
            let result = await api.getPayFine()
            this.payfine = result.data.data.list
        },
        async getRecommendDj(){
            let result = await api1.getRecommendDj()
            this.recommendDj = result.data.data
        },
        async getAudioBook(){
            let result = await api.getAudioBook()
            this.audiobook = Array.from(result.data.djRadios).slice(0,6)
        },
        async getCover(){
            let result = await api.getCover()
            this.cover = Array.from(result.data.djRadios).slice(0,6)
        },
        async getMusic(){
            let result = await api.getMusic()
            this.music = Array.from(result.data.djRadios).slice(0,6)
        },
        async getEmotion(){
            let result = await api.getEmotion()
            this.emotion = Array.from(result.data.djRadios).slice(0,6)
        },
        async getTalkShow(){
            let result = await api.getTalkShow()
            this.talkshow = Array.from(result.data.djRadios).slice(0,6)
        },
    }
}
</script>

<style lang="less" scoped>
.newsradio{
    height: 100%;width: 80%;
    margin-left: 10%;
    
    .payfine{
        margin-top: 3%;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .content:nth-child(1),.content:nth-child(3){
            margin-left: 0;
        }
        .content:nth-child(1),.content:nth-child(2){
            margin-top: 0;
        }
        .content{
            margin-top: 3%;
            margin-left: 10%;
            display: flex;
            width: 40%;
            .left{
                width: 40%;height: 100%;
                position: relative;
                img{
                    height: 100%;
                    width: 100%;
                    border-radius: 5px;
                }
            }
            .right{
                margin-top: 6%;
                width: 60%;
                height: 50%;
                margin-left: 3%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .bottom{
                    margin-top: 12%;
                    color: rgb(159, 159, 159);
                    font-size: 12px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    span:nth-child(2){
                        display: flex;
                        margin-top: 3%;
                        align-items: center;
                        img{
                            height: 15px;width: 15px;
                        }
                    }
                    span:nth-child(3){
                        margin-top: 3%;
                        color: red;
                        font-size: 20px;
                    }
                }
            }
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
            margin-left: 2%;
            width: 15%;
            display: flex;
            flex-direction: column;
            cursor: pointer;
            .bsImg{
                position: relative;
                img{
                    width: 100%;
                    height: 100%;
                    border:1px solid rgb(242,242,242);
                    border-radius: 5px;
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
</style>