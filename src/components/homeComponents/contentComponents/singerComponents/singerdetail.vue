<template>
    <div class="singerdetail">
        <div class="content" v-for="(item,i) in singerdetail" :key="i">
            <div class="title">
                <h4>{{item.ti}}</h4>
            </div>
            <div v-html="br(item.txt)"  class="text"></div>
        </div>
    </div>
</template>
<script>
import api from '@/api/musicApi/index'
export default {
    data(){
        return{
            singerdetail:[]
        }
    },
    methods:{
        async getSingerDetail(){
            let result = await api.getSingerDetail(this.$route.query.id)
            this.singerdetail = result.data.introduction
            console.log(result.data.introduction)
        },
        //换行
        br(txt){
            let string = []
            for(let i = 0 ;i<txt.split('\n').length;i++){
                string.push(`<p>${txt.split('\n')[i]}</p>`)
            }
            let result = string.join('')
            console.log(txt.split('\n'))
            return result
        }
    },
    mounted(){
        this.getSingerDetail()
    }
}
</script>
<style lang="less" scoped>
.singerdetail{
    height: 100%;
    width: 100%;
    .content:nth-child(1){
        margin-top: 1%;
    }
    .content{
        margin-top: 3%;
        margin-left: 1.8%;
        width: 98.2%;
        .text{
            text-indent: 2rem;
            white-space: pre-wrap;
            line-height: 28px;
            margin-top: 1%;
            color: rgb(103, 103, 103);
            font-size: 14px;
        }
    }
}
</style>