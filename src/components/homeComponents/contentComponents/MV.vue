<template>
    <div class="video">
        <div class="mv">
            <div class="mv-top">
                <h4>最新MV<img src="../../../../public/img/右箭头.png"></h4>
                <div class="mv-top-title">
                    <div ref="active" v-for="(item,i) in title" :key="i" @click="screen(item,i)">{{item}}</div>
                </div>
            </div>
            <div class="mv-content" >
                <div class="mv-content-item" v-for="(item,i) in firstMv" :key="i">
                    <div class="mv-content-top" @click="$router.push(`/mvDetail?id=${item.id}&type=0`)">
                        <img v-lazy="item.cover">
                        <img src="../../../../public/img/播放量.png">
                        <span>{{item.playCount>10000? parseInt(item.playCount/10000)+'万' : item.playCount}}</span>
                    </div>
                    <div class="mv-content-bottom">
                        <span @click="$router.push(`/mvDetail?id=${item.id}&type=0`)">{{item.name}}</span>
                        <span><span v-for="(item,i) in item.artists" :key="i" @click="$router.push(`/singer?id=${item.id}&name=${item.alia ? item.alia[0] : ''}`)">{{item.name+' '}}</span></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="mv" style="margin-top:0">
            <div class="mv-top">
                <h4>热播MV<img src="../../../../public/img/右箭头.png"></h4>
            </div>
            <div class="mv-content" >
                <div class="mv-content-item" v-for="(item,i) in hotMv" :key="i">
                    <div class="mv-content-top" @click="$router.push(`/mvDetail?id=${item.id}&type=0`)">
                        <img v-lazy="item.cover">
                        <img src="../../../../public/img/播放量.png">
                        <span>{{item.playCount>10000? parseInt(item.playCount/10000)+'万' : item.playCount}}</span>
                    </div>
                    <div class="mv-content-bottom">
                        <span @click="$router.push(`/mvDetail?id=${item.id}&type=0`)">{{item.name}}</span>
                        <span><span v-for="(item,i) in item.artists" :key="i" @click="$router.push(`/singer?id=${item.id}&name=${item.alia ? item.alia[0] : ''}`)">{{item.name+' '}}</span></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="mv"  style="margin-top:0">
            <div class="mv-top">
                <h4>自制出品<img src="../../../../public/img/右箭头.png"></h4>
            </div>
            <div class="mv-content">
                <div class="mv-content-item" v-for="(item,i) in Wy" :key="i">
                    <div class="mv-content-top" @click="$router.push(`/mvDetail?id=${item.id}&type=0`)">
                        <img v-lazy="item.cover">
                        <img src="../../../../public/img/播放量.png">
                        <span>{{item.playCount>10000? parseInt(item.playCount/10000)+'万' : item.playCount}}</span>
                    </div>
                    <div class="mv-content-bottom">
                        <span @click="$router.push(`/mvDetail?id=${item.id}&type=0`)">{{item.name}}</span>
                        <span><span v-for="(item,i) in item.artists" :key="i" @click="$router.push(`/singer?id=${item.id}&name=${item.alia ? item.alia[0] : ''}`)">{{item.name+' '}}</span></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="mvtop">
            <div class="mvtop-title">
                <h4>MV排行榜<img src="../../../../public/img/右箭头.png"></h4>
            </div>
            <div class="mvtop-content">
                <div class="mvtop-content-item" v-for="(item,i) in mvTop" :key="i">
                    <div class="item-left">
                        <span>{{i+1 ==10 ? i+1 : '0'+(i+1)}}</span>
                        <div @click="$router.push(`/mvDetail?id=${item.id}&type=0`)">
                            <img v-lazy="item.cover">
                            <img src="../../../../public/img/播放量.png">
                            <span>{{item.playCount > 10000 ? parseInt(item.playCount/10000)+'万' : item.playCount}}</span>
                        </div>
                    </div>
                    <div class="item-right">
                        <span @click="$router.push(`/mvDetail?id=${item.id}&type=0`)">{{item.name}}</span>
                        <span><span v-for="(item,i) in item.artists" :key="i" @click="$router.push(`/singer?id=${item.id}&name=${item.alia ? item.alia[0] : ''}`)">{{item.name+' '}}</span></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import api from '@/api/videoApi/index'
export default {
    data() {
        return {
            firstMv:[],
            hotMv:[],
            Wy:[],
            mvTop:[],
            title:['内地','港台','欧美','日本','韩国']
        };
    },
    methods: {
        async getMv(area){
            let result = await api.getMv(area)
            this.hotMv = result.data.data
        },
        async getFirstMv(area){
            let result = await api.getFirstMv(area)
            this.firstMv = result.data.data
        },
        async getMvTop(area){
            let result = await api.getMvTop(area)
            this.mvTop = result.data.data
        },
        async getWy(){
            let result = await api.getWy()
            this.Wy = result.data.data
        },
        async screen(item,i){
            this.$refs.active.forEach(item=>{
                item.className=''
            })
            this.$refs.active[i].className = 'active'
            this.getMv(item)
            this.getFirstMv(item)
            this.getMvTop(item)
        }
    },
    mounted(){
        this.getMv('内地')
        this.getFirstMv('内地')
        this.getMvTop('内地')
        this.getWy()
        this.$refs.active[0].className = 'active'
    },
    components: {
    }
}
</script>

<style lang="less" scoped>
.video::-webkit-scrollbar {
    width:5px;
}
.video::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.2);
    background:rgb(224, 224, 224);
}
.video{
    overflow: auto;
    width: 100%;
    height: 100%;
    .mv{
        margin:3% 0 0 10%;
        width: 80%;
        height: 80%;
        display: flex;
        flex-direction: column;
        .mv-top{
            display: flex;
            justify-content: space-between;
            h4{
                cursor: default;
                display: flex;
                align-content: center;
                width: 8%;
                img{
                    margin-left: 0.5%;
                    height: 20px;
                    width: 20px;
                }
            }
            .mv-top-title{
                display: flex;
                width: 30%;
                div{
                    cursor: pointer;
                    color: rgb(159, 159, 159);
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    margin-left: 5%;
                    font-size: 12px;
                    width: 20%;
                    border-radius:999rem;
                    padding:0.5%;
                }
                .active{
                    background-color: rgb(252, 235, 235);
                    color: rgb(236, 65, 65);
                }
            }
        }
        .mv-content{
            display: flex;
            flex-wrap: wrap;
            margin-top: 2%;
            width: 100%;
            height: 90%;
            .mv-content-item{
                cursor: pointer;
                height: 42%;
                width: 23.5%;
                margin-left: 2%;
                display: flex;
                flex-direction: column;
                .mv-content-top{
                    position: relative;
                    height: 80%;
                    img:nth-child(1){
                        height: 100%;
                        width: 100%;
                        border-radius: 5px;
                    }
                    img:nth-child(2){
                        width: 12px;
                        height: 12px;
                        position: absolute; 
                        right: 25%;
                        top: 5%;
                    }
                    span{
                        top: 3%;
                        right: 5%;
                        font-size: 12px;
                        color: white;
                        position: absolute;
                    }
                }
                .mv-content-bottom{
                    display: flex;
                    flex-direction: column;
                    height: 30%;
                    span:nth-child(1){
                        color: rgb(55, 55, 55);
                        margin-top: 2%;
                        font-size: 14px;
                        overflow: hidden;//超出隐藏
                        text-overflow:ellipsis;//超出部分显示...
                        white-space: nowrap;//文本不换行
                    }
                    span:nth-child(1):hover{
                        color: rgb(0, 0, 0);
                    }
                    span:nth-child(2){
                        span{
                            font-size: 12px;
                            color: rgb(103, 103, 103);
                        }
                        font-size: 12px;
                        margin-top: 1%;
                        color: rgb(103, 103, 103);
                        span:hover{
                            color: rgb(55, 55, 55);
                        }
                    }   
                }
            } 
            .mv-content-item:nth-child(1),.mv-content-item:nth-child(5){
                margin-left: 0;
            }
        } 
    }
    .mvtop{
        width: 80%;
        height: 100%;
        margin-left: 10%;
        display: flex;
        flex-direction: column;
        .mvtop-title{
            display: flex;
            width: 100%;
            h4{
                cursor: default;
                display: flex;
                align-content: center;
                width: 10%;
                img{
                    margin-left: 0.5%;
                    height: 20px;
                    width: 20px;
                }
            }
        }
        .mvtop-content{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            height: 90%;
            .mvtop-content-item{
                width: 45%;
                height: 25%;
                border-bottom:1px solid rgb(242, 242, 242);
                display: flex;
                align-items: center;
                .item-left{
                    height: 80%;
                    width: 50%;
                    display: flex;
                    align-items: center;
                    span{
                        font-size: 22px;
                        width: 20%;
                        color: rgb(159, 159, 159);
                    }
                    div{
                        cursor: pointer;
                        margin-left: 5%;
                        position: relative;
                        img:nth-child(1){
                            width: 100%;
                            border-radius: 5px;
                            // height: 100%;
                        }
                        img:nth-child(2){
                            position: absolute;
                            width: 12px;
                            top: 5%;
                            height: 12px;
                            right: 25%;
                        }
                        span:nth-child(3){
                            top:3%;
                            margin: 0;
                            color: white;
                            right: 5%;
                            width: auto;
                            position: absolute;
                            font-size: 12px;
                        }
                    }
                }
                .item-right{
                    height: 70%;
                    width: 50%;
                    display: flex;
                    flex-direction: column;
                    font-size: 13px;
                    margin-left: 3%;
                    span:nth-child(1){
                        margin-top: 3%;
                        color: rgb(55, 55, 55);
                        width: 65%;
                        overflow: hidden;//超出隐藏
                        text-overflow:ellipsis;//超出部分显示...
                        white-space: nowrap;//文本不换行
                        cursor: pointer;
                    }
                    span:nth-child(2){
                        margin-top: 6%;
                        color: rgb(103, 103, 103);
                        cursor: pointer;
                    }
                    span:nth-child(1):hover{
                        color: rgb(0, 0, 0);
                    }
                    span:nth-child(2):hover{
                        color: rgb(55, 55, 55); 
                    }
                }
            }
            .mvtop-content-item:nth-child(2n){
                border-left: 1px solid rgb(224, 224, 224);
                padding-left: 1.5%;
            }
        }
    }
}
</style>