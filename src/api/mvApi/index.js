import axios from "axios"
//获取视频详情
export function getVideoDetail(id){
    return axios.get(`/api/video/detail?id=${id}`)
}
//获取视频url
export function getVideoUrl(id){
    return axios.get(`/api/video/url?id=${id}`)
}
//获取视频点赞转发评论数数据
export function getVideoDetailInfo(id){
    return axios.get(`/api/video/detail/info?vid=${id}`)
}
//获取mv数据
export function getMvDetail(id){
    return axios.get(`/api/mv/detail?mvid=${id}`)
}
//获取mvurl
export function getMvUrl(id){
    return axios.get(`/api/mv/url?id=${id}`)
}
//获取mv点赞转发评论数数据
export function getMvDetailInfo(id){
    return axios.get(`/api/mv/detail/info?mvid=${id}`)
}
//获取视频评论
export function getVideoComment(id,limit,offset){
    return axios.get(`/api/comment/video?id=${id}&limit=${limit}&offset=${offset}`)
}
//获取mv评论
export function getMVComment(id,limit,offset){
    return axios.get(`/api/comment/mv?id=${id}&limit=${limit}&offset=${offset}`)
}
//获取热门评论
export function getHotComment(id,type){ //type 0 歌曲 1 mv 2 歌单 3 专辑 4 电台 5 视频
    return axios.get(`/api/comment/hot?id=${id}&type=${type}&limit=10`)
}

//获取相关视频 
export function getRelatedVideo(id){
    return axios.get(`/api/related/allvideo?id=${id}`)
}
export default{
    getVideoDetail,getVideoUrl,getVideoDetailInfo,getMvDetail,getMvUrl,getMvDetailInfo,getVideoComment,getMVComment,
    getHotComment,getRelatedVideo
}