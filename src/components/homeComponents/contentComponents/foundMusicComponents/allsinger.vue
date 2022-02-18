<template>
    <div class="allsinger">
        <div class="nav">
            <div class="nav-first">
                <div class="title">语种：</div>
                <div v-for="(item,i) in language" :key="i" @click="languageScreen(item)"><span ref="languageScreen" >{{item}}</span></div>
            </div>
            <div class="nav-secound">
                <div class="title">分类：</div>
                <div v-for="(item,i) in classify" :key="i" @click="classifyScreen(item)"><span ref="classifyScreen">{{item}}</span></div>
            </div>
            <div class="nav-thired">
                <div class="title">筛选：</div>
                <div v-for="(item,i) in screen" :key="i" @click="screenScreen(item)"><span ref="screenScreen">{{item}}</span></div>
            </div>
        </div>
        <div class="content">
            <div class="content-item" v-for="(item,i) in singerlist" :key="i">
                <div>
                    <img v-lazy="item.img1v1Url" @click="$router.push(`/singer?id=${item.id}&name=${item.alias != '' ? item.alias[0] : ''}`)">
                </div>
                <span @click="$router.push(`/singer?id=${item.id}&name=${item.alias != '' ? item.alias[0] : ''}`)">{{item.name}}</span>
            </div>
        </div>
        <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum"
        :page-size="queryinfo.pagesize" 
        layout="prev, pager, next"
        :total="600">
        </el-pagination>
    </div>
</template>

<script>
import api from '@/api/topApi/index'
export default {
    data(){
        return{
            language:['全部','华语','欧美','日本','韩国','其他'],
            classify:['全部','男歌手','女歌手','乐队组合'],
            screen:['热门','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#'],
            singerlist:[],
            defaultscreen:{
                language:-1,
                classify:-1,
                screen:-1
            },
            queryinfo:{
                query:'',
                pagenum:1,
                pagesize:60
            }
        }
    },
    methods:{
        async getSingerList(type,area,limit,offset,initial){
            let result = await api.getSingerList(type,area,limit,offset,initial)
            this.singerlist=result.data.artists
        },
        async languageScreen(item){
            for(let i =0;i<this.$refs.languageScreen.length;i++){
                if(this.$refs.languageScreen[i].innerText==item){
                    this.$refs.languageScreen[i].className='active'
                }else{
                    this.$refs.languageScreen[i].className=''
                }
            }
            switch(item){
                case '全部' : this.defaultscreen.language = -1
                break;
                case '华语' : this.defaultscreen.language = 7
                break;
                case '欧美' : this.defaultscreen.language = 96
                break;
                case '日本' : this.defaultscreen.language = 8
                break;
                case '韩国' : this.defaultscreen.language = 16
                break;
                case '其他' : this.defaultscreen.language = 0;
                break;
            }
            this.getSingerList(this.defaultscreen.classify,this.defaultscreen.language,60,0,this.defaultscreen.screen)
        },
        async classifyScreen(item){
            for(let i =0;i<this.$refs.classifyScreen.length;i++){
                if(this.$refs.classifyScreen[i].innerText==item){
                    this.$refs.classifyScreen[i].className='active'
                }else{
                    this.$refs.classifyScreen[i].className=''
                }
            }
            switch(item){
                case '全部' : this.defaultscreen.classify = -1
                break;
                case '男歌手' : this.defaultscreen.classify = 1
                break;
                case '女歌手' : this.defaultscreen.classify = 2
                break;
                case '乐队组合' : this.defaultscreen.classify = 3
                break;
            }
            this.getSingerList(this.defaultscreen.classify,this.defaultscreen.language,60,0,this.defaultscreen.screen)
        },
        async screenScreen(item){
            for(let i =0;i<this.$refs.screenScreen.length;i++){
                if(this.$refs.screenScreen[i].innerText==item){
                    this.$refs.screenScreen[i].className='active'
                }else{
                    this.$refs.screenScreen[i].className=''
                }
            }
            switch(item){
                case '热门' : this.defaultscreen.screen = -1
                break;
                default : this.defaultscreen.screen = item
            }
            this.getSingerList(this.defaultscreen.classify,this.defaultscreen.language,60,0,this.defaultscreen.screen)
        },
        handleSizeChange(newsize){
            //这里conso 选中第几页 最新的值
            // console.log(newsize)
            //最新的条数（newsize）赋值给 动态的 pagesie
            this.queryinfo.pagesize = newsize
            //获取到最新一页显示的数据  重新发送axios请求 这里是封装好的请求方法
            let offset = (newsize -1)*60
            this.getSingerList(this.defaultscreen.classify,this.defaultscreen.language,60,offset,this.defaultscreen.screen)
        },
        handleCurrentChange(newPage) {
            // console.log(newPage)
            //把最新的页码（newPage）赋值给 动态的 pagenum 
            this.queryinfo.pagenum = newPage
            //获取到最新显示的页码值  重新发送axios请求 这里是封装好的请求方法
            let offset = (newPage -1)*60
            this.getSingerList(this.defaultscreen.classify,this.defaultscreen.language,60,offset,this.defaultscreen.screen)
        }
    },
    mounted(){
        this.$refs.languageScreen[0].className='active'
        this.$refs.classifyScreen[0].className='active'
        this.$refs.screenScreen[0].className='active'
        this.getSingerList(this.defaultscreen.classify,this.defaultscreen.language,60,0,this.defaultscreen.screen)
    }
}
</script>

<style lang="less" scoped>
.allsinger{
    height: 100%;
    width: 80%;
    margin-left: 10%;
    .nav{
        color: rgb(103, 103, 103);
        margin-top: 1.5%;
        height: 25%;
        width: 100%;
        font-size: 13px;
        .nav-first{
            display: flex;
            .title{
                cursor: default;
            }
            .title:hover{
                color: rgb(103,103,103);
            }
            .active{
                background-color:rgb(253, 245, 245);
                color: rgb(236, 65, 65);
            }
            div{
                position: relative;
                cursor: pointer;
                padding: 0.5% 0;
                display: flex;
                justify-content: center;
                width: 6%;
                span{
                    display: flex;
                    padding: 1% 0;
                    justify-content: center;
                    height: 100%;
                    width: 80%;
                    border-radius: 999rem;
                }
            }
        }
        .nav-secound{
            display: flex;
            margin-top: 1%;
            .title{
                cursor: default;
            }
            .title:hover{
                color: rgb(103,103,103);
            }
            .active{
                background-color:rgb(253, 245, 245);
                color: rgb(236, 65, 65);
            }
            div{
                cursor: pointer;
                padding: 0.25% 0;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 8%;
                span{
                    display: flex;
                    padding: 1% 0;
                    width: 80%;
                    justify-content: center;
                    height: 100%;
                    border-radius: 999rem;
                }
            }
            div:nth-child(2){
                width: 6%;
                span:nth-child(1){
                    width: 80%;
                }
            }
            div:nth-child(1){
                width: 6%;
            }
            div:hover{
                color: rgb(55, 55, 55);
            }
        }
        .nav-thired{
            display: flex;
            flex-wrap: wrap;
            .title{
                cursor: default;
            }
            .title:hover{
                color: rgb(103,103,103);
            }
            .active{
                background-color:rgb(253, 245, 245);
                color: rgb(236, 65, 65);
            }
            div{
                margin-top: 1%;
                cursor: pointer;
                padding: 0.25% 0;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 5%;
                span{
                    display: flex;
                    padding: 1% 0;
                    justify-content: center;
                    height: 100%;
                    width: 50%;
                    border-radius: 999rem;
                }
            }
            div:nth-child(1){
                width: 6%;
            }
            div:nth-child(2){
                width: 6%;
                span:nth-child(1){
                    width: 80%;
                }
            }
            div:hover{
                color: rgb(55, 55, 55);
            }
        }
    }
    .content{
        // height: 75%;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .content-item{
            height: 42%;
            margin-top: 2%;
            margin-left: 1.5%;
            width: 15.4%;
            display: flex;
            flex-direction: column;
            div{
                height: 90%;
                width: 100%;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 5px;
                    cursor: pointer;
                }
            }
            span{
                color: rgb(55, 55, 55);
                margin-top: 3%;
                height: 10%;
                font-size: 14px;
                cursor: pointer;
            }
            span:hover{
                color: black;
            }
        }
        .content-item:nth-child(6n+1){
            margin-left: 0;
        }
        .content-item:nth-child(6n+1){
            margin-left: 0;
        }
    }
    .el-pagination{
        margin:2% auto;
        display: flex;
        justify-content: center;
    }
}
</style>