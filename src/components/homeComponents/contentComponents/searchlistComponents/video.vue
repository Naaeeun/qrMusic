<template>
    <div class="video">
        <div class="content">
            <div class="videoContent" v-for="(item,i) in videolist" :key="i" @click="$router.push(`/mvDetail?id=${item.vid}&type=${item.type}`)">
                <div class="top">
                    <img v-lazy="item.coverUrl">
                    <img src="../../../../../public/img/播放量.png">
                    <span>{{item.playTime > 10000 ? parseInt(item.playTime/10000)+'万' : item.playTime}}</span>
                    <span>
                        {{ 
                        ( parseInt(item.durationms/1000/60) < 10 ? '0'+ parseInt(item.durationms/1000/60) : parseInt(item.durationms/1000/60) )
                        + ':'+(parseInt((item.durationms/1000/60 - parseInt(item.durationms/1000/60))*60) < 10 ? '0'+parseInt((item.durationms/1000/60 - parseInt(item.durationms/1000/60))*60) : parseInt((item.durationms/1000/60 - parseInt(item.durationms/1000/60))*60))
                        }}
                    </span>
                </div>
                <div class="bottom">
                    <span>{{item.title}}</span>
                    <span>{{item.type == 1 ? 'by'+'&nbsp'+item.creator[0].userName : item.creator[0].userName}}</span>
                </div>
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
            videolist:[],
            queryinfo:{
                query:'',
                pagenum:1,
                pagesize:24
            }
        }
    },
    methods:{
        async getvideo(limit,offset){
            let result = await api.getSearchContent(1014,this.$route.query.keyword,limit,offset)
            this.videolist = result.data.result.videos
        },
        handleSizeChange(newsize){
            //这里conso 选中第几页 最新的值
            console.log(newsize)
            //最新的条数（newsize）赋值给 动态的 pagesie
            this.queryinfo.pagesize = newsize
            //获取到最新一页显示的数据  重新发送axios请求 这里是封装好的请求方法
            let offset = (newsize -1)*24
            this.getvideo(24,offset)
        },
        handleCurrentChange(newPage) {
            // console.log(newPage)
            //把最新的页码（newPage）赋值给 动态的 pagenum 
            this.queryinfo.pagenum = newPage
            //获取到最新显示的页码值  重新发送axios请求 这里是封装好的请求方法
            let offset = (newPage -1)*24
            this.getvideo(24,offset)
        }
    },
    mounted () {
        this.getvideo(24,0)
    }
}
</script>

<style lang="less" scoped>
.video{
    width: 100%;height: 100%;
    .content{
        width: 90%;height: 100%;
        margin-left: 5%;
        margin-top: 3%;
        display: flex;
        flex-wrap: wrap;
        .videoContent:nth-child(4n+1),.videoContent:nth-child(1){
            margin-left: 0;
        }
        .videoContent:nth-child(1),.videoContent:nth-child(2),.videoContent:nth-child(3),.videoContent:nth-child(4){
            margin-top: 0;
        }
        .videoContent{
            margin-top: 2%;
            width: 22.75%;
            margin-left: 3%;
            display: flex;
            flex-direction: column;
            .top{
                cursor: pointer;
                color: white;
                width: 100%;
                position: relative;
                img:nth-child(1){
                    border-radius: 5px;
                    width: 100%;
                    height: 100%;
                }
                img:nth-child(2){
                    position: absolute;
                    height: 12px;width: 12px;
                    right: 18%;
                    top: 4%;
                }
                span:nth-child(3){
                    position: absolute;
                    right: 3%;
                    top: 3%;
                    font-size: 12px;
                }
                span:nth-child(4){
                    position: absolute;
                    font-size: 12px;
                    bottom: 5%;
                    right: 3%;
                }
            }
            .bottom{
                height: 20%;
                width: 100%;
                display: flex;
                flex-direction: column;
                font-size: 12px;
                span:nth-child(1){
                    overflow: hidden;//超出隐藏
                    text-overflow:ellipsis;//超出部分显示...
                    white-space: nowrap;//文本不换行
                    cursor: pointer;
                }
                span:nth-child(2){
                    color: rgb(207,207,207);
                    margin-top: 0.5%;
                }
                span:nth-child(2):hover{
                    cursor: pointer;
                    color: rgb(159,159,159);
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