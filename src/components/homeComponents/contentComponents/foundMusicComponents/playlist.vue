<template>
    <div class="playlist">
        <div class="nav">
            <div class="left">
                <span>全部歌单</span>
                <img src="../../../../../public/img/右箭头.png" alt="">
            </div>
            <div class="right">
                <span ref="active" @click="screen(item,i,50,1)" v-for="(item,i) in title" :key="i">{{item}}</span>
            </div>
        </div>
        <div class="content">
            <div class="musicContent" @click="$router.push(`/musiclist?id=${item.id}`)" v-for="(item,i) in playlist" :key="i" :style="( i % 5==0 ? {margin:'2% 0 0 0'} : '')">
                <div class="center">
                    <img v-lazy="item.coverImgUrl">
                    <img src="../../../../../public/img/播放量.png">
                    <span>{{item.playCount >10000 ? parseInt(item.playCount/10000)+'万' : item.playCount}}</span>
                    <img src="../../../../../public/img/用户.png">
                    <span>{{item.creator.nickname}}</span>
                </div>
                <span></span>
            </div>
        </div>
        <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum"
        :page-size="queryinfo.pagesize" 
        layout="prev, pager, next"
        :total="500">
        </el-pagination>
    </div>
</template>

<script>
import api from '@/api/musicApi/index'
export default {
    data(){
        return{
            playlist:[],
            title:['华语','流行','摇滚','民谣','电子','另类/独立','轻音乐','综艺','影视原生','ACG'],
            queryinfo:{
                query:'',
                pagenum:1,
                pagesize:50
            }
        }
    },
    mounted(){
        this.getPlayList('',50,0)
    },
    methods:{
        async screen(type,i,limit,offset){
            let result = await api.getPlayList(type,limit,offset)
            this.playlist = result.data.playlists
            this.$refs.active.forEach(item=>{
                item.className = ''
            })
            this.$refs.active[i].className = 'active'
            
        },
        async getPlayList(type,limit,offset){
            let result = await api.getPlayList(type,limit,offset)
            this.playlist = result.data.playlists
        },
        handleSizeChange(newsize){
            //这里conso 选中第几页 最新的值
            // console.log(newsize)
            //最新的条数（newsize）赋值给 动态的 pagesie
            this.queryinfo.pagesize = newsize
            //获取到最新一页显示的数据  重新发送axios请求 这里是封装好的请求方法
            let offset = (newsize -1)*50
            this.getPlayList('',50,offset)
        },
        handleCurrentChange(newPage) {
            // console.log(newPage)
            //把最新的页码（newPage）赋值给 动态的 pagenum 
            this.queryinfo.pagenum = newPage
            //获取到最新显示的页码值  重新发送axios请求 这里是封装好的请求方法
            let offset = (newPage -1)*50
            this.getPlayList('',50,offset)
        }
    }
}
</script>

<style lang="less" scoped>
.playlist{
    margin-left: 10%;
    width: 80%;height: 100%;
    .nav{
        padding-top: 1%;
        height: 10%;
        display: flex;
        justify-content: space-between;
        width: 98%;
        align-items: center;
        .left{
            cursor: pointer;
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 999em;
            height: 50%;
            width: 10%;
            border: 1px solid rgb(224, 224, 224);
            img{
                width: 16px;height: 16px;
            }
        }
        .left:hover{
            background-color: rgb(242, 242, 242);
        }
        .right{
            width: 60%;
            display: flex;
            justify-content: space-around;
            font-size: 12px;
            cursor: default;
            span{
                border-radius: 999em;
                display: flex;
                justify-content: center;
                align-items: center;
                height:100%;
                padding-top: 1%;
                padding-bottom: 1%;
                width: 10%;
            }
        }
        .active{
            background-color: rgb(253, 245, 245);
            color: red;
        }
    }
    .content{
        width: 98%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .musicContent{
            cursor: pointer;
            margin-top: 2%;
            margin-left: 2.5%;
            height: 55%;
            width: 18%;
            display: flex;
            flex-direction: column;
            .center{
                height: 85%;
                width: 100%;
                position: relative;
                img:nth-child(1){
                    width: 100%;height: 100%;
                    border-radius: 5px;
                }
                img:nth-child(2){
                    height: 14px;width: 14px;
                    top: 3%;
                    right: 32%;
                    position: absolute;
                }
                span:nth-child(3){
                    color: white;
                    position: absolute;
                    font-size: 12px;
                    top: 2%;
                    left:70%;
                }
                img:nth-child(4){
                    position: absolute;
                    height: 13px;width: 13px;
                    left: 5%;
                    bottom: 5%;
                }
                span:nth-child(5){
                    font-size: 12px;
                    left: 16%;
                    top: 88%;
                    color: white;
                    position: absolute;
                }
            }
            span{
                height: 15%;
                width: 100%;
            }
        }
    }
    .el-pagination{
        margin:2% auto;
        display: flex;
        justify-content: center;
    } 
}
</style>