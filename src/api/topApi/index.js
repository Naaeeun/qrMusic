import axios from "axios";
//获取歌曲排行榜
export function getMusicTop(){
    return axios.get('/api/toplist')
}
//获取歌手分类列表
export function getSingerList(type,area,limit,offset,initial){
    //type -1:全部1:男歌手2:女歌手3:乐队
    //area -1:全部7:华语96:欧美8:日本16:韩国0:其它
    //limit数量
    //offset偏移量
    //initial首字母 热门:-1#:0
    return axios.get(`/api/artist/list?type=${type}&area=${area}&limit=${limit}&offset=${offset}&initial=${initial}`)
}
export default{
    getMusicTop,getSingerList
}