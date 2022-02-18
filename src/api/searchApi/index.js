import axios from "axios";
//获取搜索内容 type 1:单曲,10:专辑,100:歌手,1000:歌单,1002:用户,1014:视频
export function getSearchContent(type,keyword,limit,offset){
    return axios(`/api/search?type=${type}&keywords=${keyword}&limit=${limit}&offset=${offset}`)
}

export default{
    getSearchContent
}