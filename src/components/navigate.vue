<template>
    <div class="navigate">
        <div class="navLeft">
            <div class="left" @click="$router.push('/')">
                <img src="../../public/img/音乐.png">
                <span>秋仁音乐</span>
            </div>
            <div class="right">
                <div @click="$router.go(-1)"><img src="../../public/img/返回.png"></div>
                <div @click="$router.go(1)"><img src="../../public/img/前进.png"></div>
                <input type="text" v-model="value" placeholder="搜索" @keydown.enter="$router.push(`/searchlist?keyword=${value}`)">
            </div>
        </div>
        <div class="navRight">
            <div class="userinfo">
                <img v-show="userinfo.headimg" :src="'http://localhost:3000'+userinfo.headimg" @click="$router.push('/userinfo')">
                <span @click="menu()">{{userinfo.nickname ? userinfo.nickname : "未登录"}}</span>
                <div ref="dropdownlist" class="dropdownlist" v-if="userinfo.username">
                    <span>个人信息设置</span>
                    <span >退出登录</span>
                </div> 
            </div>
            <div class="setting">
                <img src="../../public/img/设置.png" alt="">
                <img src="../../public/img/皮肤.png" alt="">
                <img src="../../public/img/信息.png" alt="">
            </div>
        </div>
        <div class="login" ref="login">
            <div class="left">
                <img src="../../public/img/登录页.jpg">
            </div>
            <div class="right">
                <span @click="close()">×</span>
                <h2>欢迎登录</h2>
                <span>用户名</span>
                <input v-model="login.username" placeholder="请输入用户名" type="text">
                <span>密码</span>
                <input v-model="login.password" placeholder="请输入密码" type="password">
                <button>登录</button>
                <span @click="cut(0)">注册</span>
            </div>
        </div>
        <div class="register" ref="register">
            <div class="left">
                <img src="../../public/img/登录页.jpg">
            </div>
            <div class="right">
                <span @click="close()">×</span>
                <h2>欢迎注册</h2>
                <span>用户名</span>
                <input v-model="register.username" placeholder="请输入用户名" type="text">
                <span>密码</span>
                <input v-model="register.password" placeholder="请输入密码" type="password">
                <span>确认密码</span>
                <input v-model="register.repassword" placeholder="请再次输入密码" type="password">
                <button>注册</button>
                <span @click="cut(1)">返回登录页面</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            value:'',  //输入框的值
            register:{
                username:'',
                password:'',
                repassword:''
            },
            login:{
                username:'',
                password:''
            },
            userinfo:{
                username:''
            }
        }
    },
    methods:{
        menu(){
            if(this.userinfo.username){
                if(this.$refs.dropdownlist.style.display !='flex'){
                    this.$refs.dropdownlist.style.display ='flex'
                }
                this.$refs.dropdownlist.addEventListener('mouseleave',()=>{
                    this.$refs.dropdownlist.style.display ='none'
                })
            }else{
                this.$refs.login.style.display ='flex'
                this.$refs.register.style.display = 'flex'
            }
            
        },
        close(){
            this.$refs.login.style.display ='none'
            this.$refs.register.style.display = 'none'
            this.login.username=''
            this.login.password=''
            this.register.username=''
            this.register.password=''
            this.register.repassword=''
        },
        cut(n){
            if(n==0){
                this.$refs.register.style.zIndex = 9999
            }else{
                this.$refs.register.style.zIndex = 999
            }
        },

    },
}
</script>

<style lang="less" scoped>
.navigate{
    width: 100%;
    height: 100%;
    background-color:rgb(236, 65, 65);
    display: flex;
    justify-content: space-between;
    .navLeft{
        height: 100%;
        width: 30%;
        display: flex;
        .left{
            width: 43%;
            height: 100%;
            text-align: center;
            color: white;
            font-size: 18px;
            display:flex;
            justify-content:center;
            align-items:center;
            cursor: pointer;
            img{
                width: 30px;
                height: 30px;
            }
            span{
                margin-left: 5px;
            }
        }
        .right{
            display: flex;
            width: 57%;
            height: 100%;
            display:flex;
            align-items:center;
            div{
                display:flex;
                justify-content:center;
                align-items:center;
                border-radius: 50%;
                height: 20px;
                width: 35px;
                cursor: pointer;
                background-color:rgb(230, 63, 63);
                img{
                    height: 15px;
                    width: 15px;
                }
            }  
            div:nth-child(1){
                margin-left: 30px;
                width: 12%;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 40%;
            }
            div:nth-child(2){
                margin-left: 8px;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 12%;
                height: 40%;
            }
            input{
                padding-left: 30px;
                color: white;
                margin-left: 10px;
                height: 30px;
                border-radius: 30px;
                background-color:rgb(225, 62, 62);
                border: 0px;
                outline:none;
                width: 60%;
            }
            input::-webkit-input-placeholder{
                color: rgb(240, 158, 158);
                font-size: 13px;
            }
        }
    }
    .navRight{
        height: 100%;
        width: 20%;
        display: flex;
        justify-content:center;
        align-items:center;
        .userinfo{
            display:flex;
            justify-content:center;
            align-items:center;
            height: 100%;
            width: 50%;
            display: flex;
            color: white;
            font-size: 14px;
            span{
                margin-left: 5%;
                cursor: pointer;
            }
            img{
                cursor: pointer;
                height: 30px;
                width: 30px;
                border-radius: 999rem
            }
            .dropdownlist{
                display: none;
                box-shadow: 1px 1px 1px  1px rgb(213, 213, 213);
                border: 1px rgb(213, 213, 213);
                top: 8%;
                right: 10%;
                position:fixed;
                width: 10%;
                flex-direction: column;
                z-index: 2;
                background-color: white;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                span{
                    color: black;
                    display: flex;
                    justify-content: center;
                    padding: 5% 0;
                    width: 100%;
                    font-size: 14px;
                    margin-left: 0;
                    cursor: pointer;
                }
                span:hover{
                    background-color: rgb(241,242,242);
                }
            }
        }
        .setting{
            display:flex;
            justify-content:space-around;
            align-items:center;
            height: 100%;
            width: 50%;
            display: flex;
            img{
                height: 20px;
                width: 20px;
            }
        }
    }
    .login{
        position: fixed;
        top: 25%;
        left: 30%;
        height: 40%;width: 40%;
        z-index: 1000;
        display: none;
        background-color: white;
        border-radius: 5px;
        box-shadow: 1px 1px  1px rgb(213, 213, 213);
        .left{
            width: 50%;
            img{
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
                height: 100%;width: 100%;
            }
        }
        .right{
            width: 50%;
            display: flex;
            flex-direction: column;
            span:nth-child(1){
                cursor: pointer;
                margin-left: 93.5%;
                font-size: 18px;
                width: 5%;
            }
            h2{
                margin-top: 3%;
                text-align: center;
            }
            span:nth-child(3){
                font-size: 14px;
                margin-left: 15%;
                margin-top: 5%;
            }
            input::-webkit-input-placeholder { 
                font-size:12px;
                color:rgb(194, 194, 194);
            } 
            input:nth-child(4){
                margin-left: 15%;
                height: 10%;
                border: 0px;
                border-bottom: 1px solid #000;
                outline:none;
                width: 70%;
            }
            span:nth-child(5){
                font-size: 14px;
                margin-left: 15%;
                margin-top: 5%;
            }
            input:nth-child(6){
                border: 0px;
                border-bottom: 1px solid #000;
                margin-left: 15%;
                width: 70%;
                height: 10%;
                outline:none;
            }
            button{
                color: white;
                border:0px;
                margin-top: 10%;
                margin-left: 22%;
                height: 10%;
                width: 56%;
                cursor: pointer;
                border-radius: 999rem;
                background-color: rgb(234, 72, 72);
            }
            button:hover{
                background:rgb(199, 46, 46)
            }
            span:nth-child(8){
                cursor: pointer;
                text-align: center;
                font-size: 12px;
                text-decoration:underline;
                margin-top: 2%;
            }
        }
    }
    .register{
        position: fixed;
        top: 25%;
        left: 30%;
        height: 40%;width: 40%;
        z-index: 999;
        display: none;
        background-color: white;
        border-radius: 5px;
        box-shadow: 1px 1px  1px rgb(213, 213, 213);
        .left{
            width: 50%;
            img{
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
                height: 100%;width: 100%;
            }
        }
        .right{
            width: 50%;
            display: flex;
            flex-direction: column;
            span:nth-child(1){
                cursor: pointer;
                margin-left: 93.5%;
                font-size: 18px;
                width: 5%;
            }
            h2{
                margin-top: 1%;
                text-align: center;
            }
            span:nth-child(3){
                font-size: 14px;
                margin-left: 15%;
            }
            input::-webkit-input-placeholder { 
                font-size:12px;
                color:rgb(194, 194, 194);
            } 
            input:nth-child(4){
                margin-left: 15%;
                height: 10%;
                border: 0px;
                border-bottom: 1px solid #000;
                outline:none;
                width: 70%;
            }
            span:nth-child(5){
                font-size: 14px;
                margin-left: 15%;
                margin-top: 1%;
            }
            input:nth-child(6){
                border: 0px;
                border-bottom: 1px solid #000;
                margin-left: 15%;
                width: 70%;
                height: 10%;
                outline:none;
            }
            span:nth-child(7){
                font-size: 14px;
                margin-left: 15%;
                margin-top: 1%;
            }
            input:nth-child(8){
                border: 0px;
                border-bottom: 1px solid #000;
                margin-left: 15%;
                width: 70%;
                height: 10%;
                outline:none;
            }
            span:nth-child(10){
                cursor: pointer;
                text-align: center;
                font-size: 12px;
                text-decoration:underline;
                margin-top: 2%;
            }
            button{
                color: white;
                border:0px;
                margin-top: 5%;
                margin-left: 22%;
                height: 10%;
                width: 56%;
                cursor: pointer;
                border-radius: 999rem;
                background-color: rgb(234, 72, 72);
            }
            button:hover{
                background:rgb(199, 46, 46)
            }
        }
    }
}
</style>