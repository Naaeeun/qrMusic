<template>
    <div class="musiclist">
        <div class="content" v-for="(item,i) in musiclist" :key="i" @click="$router.push(`/musiclist?id=${item.id}`)">
            <div class="left">
                <img v-lazy="item.coverImgUrl">
                <span>{{item.name}}</span>
            </div>
            <div class="right">
            <span>{{item.trackCount}}首</span>
            <span><span v-if="item.type!=0" >by&nbsp;</span>{{item.creator.nickname}}</span>
            </div>
        </div>
        <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum"
        :page-size="queryinfo.pagesize" 
        layout="prev, pager, next"
        :total="100">
        </el-pagination>
    </div>
</template>

<script>
import api from '@/api/searchApi/index'
export default {
    data(){
        return {
            musiclist:[],
            queryinfo:{
                query:'',
                pagenum:1,
                pagesize:20
            }
        }
    },
    methods: {
        async getmusiclist(limit,offset){
            let result = await api.getSearchContent(1000,this.$route.query.keyword,limit,offset)
            this.musiclist = result.data.result.playlists
        },
        handleSizeChange(newsize){
            //这里conso 选中第几页 最新的值
            // console.log(newsize)
            //最新的条数（newsize）赋值给 动态的 pagesie
            this.queryinfo.pagesize = newsize
            //获取到最新一页显示的数据  重新发送axios请求 这里是封装好的请求方法
            let offset = (newsize -1)*20
            this.getmusiclist(20,offset)
        },
        handleCurrentChange(newPage) {
            // console.log(newPage)
            //把最新的页码（newPage）赋值给 动态的 pagenum 
            this.queryinfo.pagenum = newPage
            //获取到最新显示的页码值  重新发送axios请求 这里是封装好的请求方法
            let offset = (newPage -1)*20
            this.getmusiclist(20,offset)
        }
    },
    mounted () {
        this.getmusiclist(20,0)
    }
}
</script>

<style lang="less" scoped>
.musiclist{
    width: 100%;height: 100%;
    display: flex;
    flex-direction: column;
    .content:hover{
        background-color: rgb(240, 241, 242);
        cursor: pointer;
    }
    .content:nth-child(even){
        background-color: rgb(249, 249, 249);
    }
    .content{
        display: flex;
        align-items: center;
        padding: 1% 0;
        .left{
            display: flex;
            align-items: center;
            width: 50%;
            img{
                margin-left: 5%;
                height: 60px;width: 60px;
                border-radius: 5px;
            }
            span:nth-child(2){
                margin-left: 2%;
                font-size: 14px;
            }
        }
        .right{
            font-size: 12px;
            display: flex;
            align-items: center;
            width: 50%;
            span{
                width: 20%;   
            }
            span:nth-child(1){
                color: rgb(159, 159, 159);
            }
            span:nth-child(2){
                color: rgb(103, 103, 103);
                margin-left: 10%;
                span:nth-child(2){
                    font-size: 14px;
                }
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