<template>
    <div class="user">
        <div class="content" v-for="(item,i) in userlist" :key="i" @click="$router.push(`/userinfo?id=${item.userId}`)">
            <img v-lazy="item.avatarUrl">
            <span>
            {{item.nickname}}
            <span v-if="item.gender==1"><img src="../../../../../public/img/男性.png"></span>
            <span v-else-if="item.gender==2"><img src="../../../../../public/img/女性.png"></span>
            </span>
            <span>{{item.userType==4 ? '网易音乐人' : item.signature}}</span>
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
            userlist:[],
            queryinfo:{
                query:'',
                pagenum:1,
                pagesize:20
            }
        }
    },
    methods:{
        async getsinger(limit,offset){
            let result = await api.getSearchContent(1002,this.$route.query.keyword,limit,offset)
            this.userlist = result.data.result.userprofiles
        },
        handleSizeChange(newsize){
            //这里conso 选中第几页 最新的值
            // console.log(newsize)
            //最新的条数（newsize）赋值给 动态的 pagesie
            this.queryinfo.pagesize = newsize
            //获取到最新一页显示的数据  重新发送axios请求 这里是封装好的请求方法
            let offset = (newsize -1)*20
            this.getsinger(20,offset)
        },
        handleCurrentChange(newPage) {
            // console.log(newPage)
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
.user{
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
            border-radius: 50%
        }
        span:nth-child(2){
            display: flex;
            align-items: center;
            margin-left: 1%;
            color: rgb(80, 125, 175);
            width: 20%;
            span{
                img{
                    height: 15px;width: 15px;
                }
            }
        }
        span:nth-child(3){
            margin-left: 50%;
            width: 20%;
            text-align: right;
            color: rgb(153,153,153);
            font-size: 12px;
        }
    }
    .el-pagination{
        margin:2% auto;
        display: flex;
        justify-content: center;
    } 
}
</style>