import axios from 'axios';
//获取轮播图
export function getBanner(){
    return axios.get('/api/banner')
}
//获取推荐歌单
export function getRecommendMusicList(){
    return axios.get('/api/personalized?limit=10')
}
//获取独家放送
export function getExclusive(){
    return axios.get('/api/personalized/privatecontent/list?limit=3')
}
//获取最新音乐
export function getNewMuisc(){
    return axios.get('/api/personalized/newsong?limit=12')
}
//获取推荐MV
export function getRecommendMv(){
    return axios.get('/api/personalized/mv')
}
//获取推荐电台
export function getRecommendDj(){
    return axios.get('/api/dj/personalize/recommend')
}
//获取歌曲详细信息 
export function getMusicInformation(i){
    return axios.get(`/api/song/detail?ids=${i}`)
}
//获取歌曲url
export function getMusicUrl(i){
    return axios.get(`/api/song/url?id=${i}`)
}
//获取歌单列表详情
export function getMusicList(id){
    return axios.get(`/api/playlist/detail?id=${id}`)
}
//获取歌单
export function getPlayList(type,limit,offset){
    return axios.get(`/api/top/playlist?cat=${type}&limit=${limit}&offset=${offset}`)
}
//获取歌手页详情
export function getSinger(id){
    return axios.get(`/api/artist/detail?id=${id}`)
}
//获取歌手热门50首
export function getSingerHotMusic(id){
    return axios.get(`/api/artist/top/song?id=${id}`)
}
//获取歌手专辑
export function getSingerAlbum(id){
    return axios.get(`/api/artist/album?id=${id}`)
}
//获取歌手MV
export function getSingerMv(id){
    return axios.get(`/api/artist/mv?id=${id}`)
}
//获取歌手详情
export function getSingerDetail(id){
    return axios.get(`/api/artist/desc?id=${id}`)
}
//获取歌词
export function getLyric(id){
    return axios.get(`/api/lyric?id=${id}`)
}
//获取歌曲评论
export function getMusicComment(id,limit,offset){
    return axios.get(`/api/comment/music?id=${id}&limit=${limit}&offset=${offset}`)
}
//获取包含此歌曲歌单
export function getAboutMusicList(id){
    return axios.get(`/api/simi/playlist?id=${id}`)
}
//获取相似歌曲
export function getAboutMusic(id){
    return axios.get(`/api/simi/song?id=${id}`)
}
export default{
    getBanner,getRecommendMusicList,getExclusive,getNewMuisc,getRecommendMv,getRecommendDj,
    getMusicInformation,getMusicUrl,getMusicList,getPlayList,getSinger,getSingerHotMusic,
    getSingerAlbum,getSingerMv,getSingerDetail,getLyric,getMusicComment,getAboutMusicList,
    getAboutMusic
}