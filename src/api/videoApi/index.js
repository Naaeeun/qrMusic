import axios from "axios";
//获取最新mv
export function getFirstMv(area){
    return axios.get(`/api/mv/first?limit=8&area=${area}`)
}
//获取最热mv
export function getMv(area){
    return axios.get(`/api/mv/all?type=官方版&area=${area}&order=最热&limit=8`)
}
//获取网易出品mv
export function getWy(){
    return axios.get(`/api/mv/exclusive/rcmd?limit=8`)
}
//获取mv排行
export function getMvTop(area){
    return axios.get(`/api/top/mv?limit=10&area=${area}`)
}
export default{
    getFirstMv,getMv,getWy,getMvTop
}