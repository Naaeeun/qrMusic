import axios from "axios";

//获取电台轮播图
export function getDjBanner(){
    return axios.get('/api/dj/banner')
}

//获取付费精选
export function getPayFine(){
    return axios.get('/api/dj/paygift?limit=4')
}
//获取有声书
export function getAudioBook(){
    return axios.get('/api/dj/recommend/type?type=10001')
}
//获取创作翻唱
export function getCover(){
    return axios.get('/api/dj/recommend/type?type=2001')
}

//获取音乐推荐
export function getMusic(){
    return axios.get('/api/dj/recommend/type?type=2')
}
//获取情感
export function getEmotion(){
    return axios.get('/api/dj/recommend/type?type=3')
}
//获取脱口秀
export function getTalkShow(){
    return axios.get('/api/dj/recommend/type?type=8')
}
//获取电台详细
export function getDjList(id){
    return axios.get(`/api/dj/detail?rid=${id}`)
}
//获取电台节目
export function getRadioShow(id){
    return axios.get(`/api/dj/program?rid=${id}`)
} 

//获取电台节目详情
export function getDjInformation(id){
    return axios.get(`/api/dj/program/detail?id=${id}`)
}

export default{
    getDjBanner,getPayFine,getAudioBook,getCover,getMusic,getEmotion,getTalkShow,
    getDjList,getRadioShow,getDjInformation

}