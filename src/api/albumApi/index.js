import axios from "axios";
export function getAlbum(id){
    return axios(`/api/album?id=${id}`)
}

export default{
    getAlbum
}