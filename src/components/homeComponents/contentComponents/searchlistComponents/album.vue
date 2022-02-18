<template>
    <div class="album">
        <div class="content" v-for="(item,i) in albumlist" :key="i" @click="$router.push(`/albumlist?id=${item.id}`)">
            <div class="left">
                <img v-lazy="item.blurPicUrl">
                <span>{{item.name}}</span>
                <span>{{item.alias[0] ? '('+item.alias[0]+')' : ''}}</span>
            </div>
            <div class="right">
            <span>{{item.artist ? item.artist.name : ''}}</span>
            <span>{{item.artist.alias[0] ? '('+item.artist.alias[0]+')' : ''}}</span>
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
        return{
            albumlist:[],
            queryinfo:{
                query:'',
                pagenum:1,
                pagesize:20
            }
        }
    },
    methods:{
        async getalbum(limit,offset){
            let result = await api.getSearchContent(10,this.$route.query.keyword,limit,offset)
            this.albumlist = result.data.result.albums
        },
        handleSizeChange(newsize){
            //这里conso 选中第几页 最新的值
            // console.log(newsize)
            //最新的条数（newsize）赋值给 动态的 pagesie
            this.queryinfo.pagesize = newsize
            //获取到最新一页显示的数据  重新发送axios请求 这里是封装好的请求方法
            let offset = (newsize -1)*20
            this.getalbum(20,offset)
        },
        handleCurrentChange(newPage) {
            // console.log(newPage)
            //把最新的页码（newPage）赋值给 动态的 pagenum 
            this.queryinfo.pagenum = newPage
            //获取到最新显示的页码值  重新发送axios请求 这里是封装好的请求方法
            let offset = (newPage -1)*20
            this.getalbum(20,offset)
        }
    },
    mounted () {
        this.getalbum(20,0)  
    }
}
</script>

<style lang="less" scoped>
.album{
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
                color: rgb(80, 125, 175);
            }
            span:nth-child(3){
                margin-left: 0.5%;
                color: rgb(159,159,159);
                font-size: 13px;
            }
        }
        .right{
            font-size: 12px;
            display: flex;
            align-items: center;
            width: 50%;
            span{
                color: rgb(97, 97, 98);
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