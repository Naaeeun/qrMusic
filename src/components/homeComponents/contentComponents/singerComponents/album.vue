<template>
    <div class="album">
        <div class="content" v-for="(item,i) in albumlist" :key="i" @click="$router.push(`/albumlist?id=${item.id}`)">
            <img v-lazy="item.picUrl">
            <span>{{item.name}}<span v-if="item.alias[0]">({{item.alias[0]}})</span></span>
            <span>{{item.size}}首</span>
        </div>
    </div>
</template>
<script>
import api from '@/api/musicApi/index'
export default {
    data(){
        return{
            albumlist:[]
        }
    },
    methods:{
        async getSingerAlbum(){
            let result = await api.getSingerAlbum(this.$route.query.id)
            this.albumlist = result.data.hotAlbums
            console.log(result.data.hotAlbums)
        }
    },
    mounted(){
        this.getSingerAlbum()
    }
}
</script>
<style lang="less" scoped>
.album{
    height: 100%;
    width: 100%;
    .content:nth-child(odd){
        background-color: rgb(249, 249, 249);
    }
    .content:hover{
        background-color: rgb(240, 241, 242);
    }
    .content{
        cursor: pointer;
        font-size: 12px;
        color: rgb(159, 159, 159);
        height: 20%;
        display: flex;
        align-items: center;
        img{      
            margin-left: 1.8%;
            height: 55px;
            width:55px;
            border-radius: 5px;
        }
        span:nth-child(2){
            width: 80%;
            margin-left: 1%;
            color: black;
            font-size: 14px;
            span{
                font-size: 13px;
                margin-left: 0.5%;
                color: rgb(159, 159, 159);
            }
        }
    }
}
</style>