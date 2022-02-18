<template>
    <div class="singer">
        <div @click="$router.push(`/singer?id=${item.id}&name=${item.alia ? item.alia[0] : ''}`)" class="content" v-for="(item,i) in singerlist" :key="i">
            <img v-lazy="item.img1v1Url">
            <span>{{item.name}}</span>
            <span>{{item.alia ? '('+item.alia[0]+')' : ''}}</span>
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
        return{
            singerlist:[],
            queryinfo:{
                query:'',
                pagenum:1,
                pagesize:20
            }
        }
    },
    methods:{
        async getsinger(limit,offset){
            let result = await api.getSearchContent(100,this.$route.query.keyword,limit,offset)
            this.singerlist = result.data.result.artists
        },
        handleSizeChange(newsize){
            //这里conso 选中第几页 最新的值
            console.log(newsize)
            //最新的条数（newsize）赋值给 动态的 pagesie
            this.queryinfo.pagesize = newsize
            //获取到最新一页显示的数据  重新发送axios请求 这里是封装好的请求方法
            let offset = (newsize -1)*20
            this.getsinger(20,offset)
        },
        handleCurrentChange(newPage) {
            console.log(newPage)
            //把最新的页码（newPage）赋值给 动态的 pagenum 
            this.queryinfo.pagenum = newPage
            //获取到最新显示的页码值  重新发送axios请求 这里是封装好的请求方法
            let offset = (newPage -1)*20
            this.getsinger(20,offset)
        }
    },
    mounted(){
        this.getsinger(20,0)
    }
}
</script>

<style lang="less" scoped>
.singer{
    width: 100%;height: 100%;
    display: flex;
    flex-wrap: wrap;
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
        width: 100%;
        padding: 1% 0;
        img{
            margin-left: 2.5%;
            height: 60px;width: 60px;
            border-radius: 5px;
        }
        span:nth-child(2){
            margin-left: 1%;
            color: rgb(80, 125, 175);
        }
        span:nth-child(3){
            margin-left: 0.5%;
            color: rgb(159,159,159);
            font-size: 14px;
        }
    }
    .el-pagination{
        margin:2% auto;
        display: flex;
        justify-content: center;
    }
}
</style>