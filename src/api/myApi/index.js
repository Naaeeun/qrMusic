import axios from "axios";
//获取我的音乐云盘内容
export function getCloudMusic(){
    return axios.get('/local/cloudmusic/musiclist')
}
//获取我的电台内容
export function getRadio(){
    return axios.get('/local/radio/radiolist')
}
//订阅电台
export function addCollet(id,imgurl,radioname,creator,count){
    return axios({
        method:'post',
        url:'/local/radio/addcollet',
        data:{
            id:id,
            imgurl:imgurl,
            radioname:radioname,
            creator:creator,
            count:count
        }
    })
}
//获取用户信息
export function getUserInfo(id){
    //进行判断如果是个人信息则没有id
    if(id){
        return axios.get(`/api/user/detail?uid=${id}`)
    }else{
        return axios.get('/local/lr/userinfo')
    }
}
//获取用户歌单
export function getUserPlayList(id){
    return axios.get(`/api/user/playlist?uid=${id}`)
}
//获取用户城市
export function getUserCity(code){
    return axios({
        method:'post',
        url:'/local/lr/getcity',
        data:{
            code:code
        }
    })
}
export default{
    getCloudMusic,getRadio,addCollet,getUserInfo,getUserPlayList,getUserCity
}