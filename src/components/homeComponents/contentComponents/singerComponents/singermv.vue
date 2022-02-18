<template>
    <div class="singermv">
        <div class="content" v-for="(item,i) in mvlist" :key="i" @click="$router.push(`/mvDetail?id=${item.id}&type=0`)">
            <div class="top">
                <img :src="item.imgurl">
                <img src="../../../../../public/img/播放量.png">
                <span>{{item.playCount > 10000 ? parseInt(item.playCount/10000)+'万' : item.playCount}}</span>
            </div>
            <div class="bottom">
                {{item.name}}
            </div>
        </div>
    </div>
</template>
<script>
import api from '@/api/musicApi/index'
export default {
    data(){
        return{
            mvlist:[]
        }
    },
    methods:{
        async getSingerMv(){
            let result = await api.getSingerMv(this.$route.query.id)
            this.mvlist = result.data.mvs
        }
    },
    mounted(){
        this.getSingerMv()
    }
}
</script>
<style lang="less" scoped>
.singermv{
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .content:nth-child(5n+1){
        margin-left: 1.8%;
    }
    .content{
        cursor: pointer;
        margin-left: 2%;
        width: 17.68%;
        height: 50%;
        display: flex;
        flex-direction: column;
        .top{
            height: 80%;
            width: 100%;
            position: relative;
            img:nth-child(1){
                height: 100%;
                width: 100%;
                border-radius: 5px;
            }
            img:nth-child(2){
                height: 12px;
                width: 12px;
                top: 6%;
                right: 20%;
                position: absolute;
            }
            span{
                color: white;
                font-size: 12px;
                top: 5%;
                right: 5%;
                position:absolute;
            }
        }
        .bottom{
            margin-top: 2%;
            font-size: 14px;
            overflow: hidden;//超出隐藏
            text-overflow:ellipsis;//超出部分显示...
            white-space: nowrap;//文本不换行
            cursor: pointer;
        }
    }
}
</style>