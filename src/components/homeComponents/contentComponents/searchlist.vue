<template>
    <div class="searchlist">
        <div class="nav">
            <div>
                <router-link :to="`/searchlist/searchlistmusic?keyword=${this.$route.query.keyword}`">单曲</router-link>
                <router-link :to="`/searchlist/searchlistsinger?keyword=${this.$route.query.keyword}`">歌手</router-link>
                <router-link :to="`/searchlist/searchlistalbum?keyword=${this.$route.query.keyword}`">专辑</router-link>
                <router-link :to="`/searchlist/searchlistvideo?keyword=${this.$route.query.keyword}`">视频</router-link>
                <router-link :to="`/searchlist/searchmusiclist?keyword=${this.$route.query.keyword}`">歌单</router-link>
                <router-link :to="`/searchlist/searchlistuser?keyword=${this.$route.query.keyword}`">用户</router-link>
            </div>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.searchlist::-webkit-scrollbar {
    width:3px;
}
.searchlist::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.2);
    background:rgb(224, 224, 224);
}
.searchlist{
    overflow:auto;
    height: 100%;width: 100%;
    .nav{
        height: 10%;width: 100%;
        border-bottom: 1px solid rgb(229, 229, 229);
        div{
            margin-left: 2.5%;
            display: flex;
            justify-content: space-between;
            align-items:center;
            width: 40%;
            padding-top: 2.5%;
            a{
                font-size: 14px;
                text-decoration: none;
                color: black;
            }
            .router-link-active{
                font-weight: 600;
            }
        }
    }
}
</style>