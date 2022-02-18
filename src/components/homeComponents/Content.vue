<template>
    <div class="content">
        <div class="sidebar">
            <div class="sidebarTop">
                <router-link to="/music">发现音乐</router-link>
                <router-link to="/mv">视频</router-link>
            </div>
        </div>
        <div class="center">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    data() {
      return {
        // activeNames: ['1'],
        // activeNames: ['2'],
      };
    },
    methods: {
      handleChange(val) {
        // console.log(val);
      },
      //判断是否登录
    },
}
</script>

<style lang="less" scoped>
.content{
    width: 100%;
    height: 100%;
    display: flex;
    .sidebar::-webkit-scrollbar {
        width:3px;
    }
    .sidebar::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.2);
        background:rgb(224, 224, 224);
    }
    .sidebar{
        height: 100%;
        width: 13%;
        display: flex;
        flex-direction:column;
        overflow: auto;
        border-right: 1px solid rgb(225, 225, 225);
        .sidebarTop{
            font-size: 16px;
            padding-top: 10%;
            margin-left: 10%;
            margin-right:10%; 
            width: 80%;
            height: 12%;
            display: flex;
            flex-direction:column;
            justify-content: space-around;
            .router-link-active{
                font-weight: 600;
                background-color: rgb(246, 246, 247);
            }
            a{
                display: flex;
                align-items: center;
                padding-left: 7%;
                border-radius:5px;
                height: 50%;
                line-height: 36px;
                cursor: pointer; 
                text-decoration:none;
                color: black;
            }
            a:hover{
                background-color: rgb(246, 246, 247);
            }
        }
        .sidebarContent{
            width: 80%;
            height: 25%;
            font-size: 16px;
            margin-left: 10%;
            margin-right:10%; 
            display: flex;
            flex-direction:column;
            div:nth-child(1){
                font-size: 12px;
                color: rgb(159, 159, 159);
                padding-left: 10%;
                padding-bottom: 5%;
                margin-top: 10%;
                cursor: default;
            }
            .router-link-active{
                background-color: rgb(246, 246, 247);
            }
            a{
                display: flex;
                align-items: center;
                img{
                    margin-right: 5px;
                    width: 18px;
                    height: 18px;
                }
                padding-left: 7%;
                border-radius:5px;
                height: 25%;
                line-height: 36px;
                cursor: pointer; 
                text-decoration:none;
                color: black;
            }
            a:hover{
                background-color: rgb(246, 246, 247);
            }
        }
        .sidebarFooter{
            width: 80%;
            height: 30%;
            margin-left: 10%;
            margin-right:10%; 
            margin-top: 5%;
            display: flex;
            flex-direction:column;
            /deep/ .el-collapse{
                border:0px;
                margin-top: 3%;
            }
            /deep/ .el-collapse-item div{
                border:0px;
                
            }
            .el-collapse-item div{
                display: flex;
                align-items: center;
                img{
                    margin-right: 5px;
                    width: 16px;
                    height: 16px;
                }
                padding-left: 7%;
                border-radius:5px;
                height: 25%;
                line-height: 36px;
                cursor: pointer; 
                text-decoration:none;
                color: black;
                overflow: hidden;//超出隐藏
                text-overflow:ellipsis;//超出部分显示...
                white-space: nowrap;//文本不换行
            }
            .active{
                background-color: rgb(246, 246, 247);
            }
            .el-collapse-item a{
                display: flex;
                align-items: center;
                img{
                    margin-right: 5px;
                    width: 16px;
                    height: 16px;
                }
                padding-left: 7%;
                border-radius:5px;
                height: 25%;
                line-height: 36px;
                cursor: pointer; 
                text-decoration:none;
                color: black;
            }
            .router-link-active{
                background-color: rgb(246, 246, 247);
            }
            .el-collapse-item div:hover{
                background-color: rgb(245, 245, 246);
            }
            .el-collapse-item a:hover{
                background-color: rgb(245, 245, 246);
            }
            .el-collapse-item:nth-child(1){
                background-color:white;
            } 
        }
    }
    .center{
        width: 87%;
        height: 100%;
    }
}
</style>
<style>
.el-collapse-item__header{
    height: 35px;
}
</style>