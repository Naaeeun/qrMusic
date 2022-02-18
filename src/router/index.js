import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component:Home,
    children:[
      {
        path:'/',
        name:'Content',
        component:resolve => require(['@/components/homeComponents/Content.vue'], resolve),
        redirect:'/music',
        children:[
          {
            path:'/music', //发现音乐页面
            component:resolve => require(['@/components/homeComponents/contentComponents/foundMusic.vue'], resolve),
            children:[
              {
                path:'/',
                name:'recommend',
                component:resolve => require(['@/components/homeComponents/contentComponents/foundMusicComponents/recommend.vue'], resolve)
              },
              {
                path:'/playlist',
                name:'playlist',
                component:resolve => require(['@/components/homeComponents/contentComponents/foundMusicComponents/playlist.vue'],resolve)
              },
              {
                path:'/newsradio',
                name:'newsradio',
                component:resolve => require(['@/components/homeComponents/contentComponents/foundMusicComponents/newsradio.vue'],resolve)
              },
              {
                path:'/top',
                name:'top',
                component:resolve => require(['@/components/homeComponents/contentComponents/foundMusicComponents/top.vue'],resolve)
              },
              {
                path:'/allsinger',
                name:'allsinger',
                component:resolve => require(['@/components/homeComponents/contentComponents/foundMusicComponents/allsinger.vue'],resolve)
              }
            ]
          },
          {
            path:'/mv', //MV页面
            name:'mv',
            component:resolve => require(['@/components/homeComponents/contentComponents/MV.vue'],resolve),
          },
          {
            path:'/musiclist',
            name:'musiclist',
            redirect:'/musiclist/musiclistcontent',
            component:resolve => require(['@/components/homeComponents/contentComponents/musiclist.vue'],resolve),
            children:[
              {
                path:'musiclistcontent', //歌单详情页面
                name:'musiclistcontent',
                component:resolve => require(['@/components/homeComponents/contentComponents/musiclistComponents/musiclistcontent.vue'],resolve),
              },
            ]
          },
          {
            path:'/djlist', //电台详情页面
            component:resolve => require(['@/components/homeComponents/contentComponents/djlist.vue'],resolve),
            children:[
              {
                path:'/',
                name:'djlistcontent',
                component:resolve => require(['@/components/homeComponents/contentComponents/djlistComponents/djlistcontent.vue'],resolve),
              }
            ]
          },
          {
            path:'/userinfo',
            name:'userinfo',
            component:() => import('../components/homeComponents/contentComponents/userinfo.vue')
          },
          {
            path:'/searchlist',//搜索详情页面
            name:'searchlist',
            redirect: '/searchlist/searchlistmusic',
            component:resolve => require(['@/components/homeComponents/contentComponents/searchlist.vue'],resolve),
            children:[
              {
                path:'searchlistmusic',
                name:'searchlistmusic',
                component:resolve => require(['@/components/homeComponents/contentComponents/searchlistComponents/music.vue'],resolve),
              },
              {
                path:'searchlistsinger',
                name:'searchlistsinger',
                component:resolve => require(['@/components/homeComponents/contentComponents/searchlistComponents/singer.vue'],resolve)
              },
              {
                path:'searchlistalbum',
                name:'searchlistalbum',
                component:resolve => require(['@/components/homeComponents/contentComponents/searchlistComponents/album.vue'],resolve)
              },
              {
                path:'searchlistvideo',
                name:'searchlistvideo',
                component:resolve => require(['@/components/homeComponents/contentComponents/searchlistComponents/video.vue'],resolve)
              },
              {
                path:'searchmusiclist',
                name:'searchmusiclist',
                component:resolve => require(['@/components/homeComponents/contentComponents/searchlistComponents/musiclist.vue'],resolve)
              },
              {
                path:'searchlistuser',
                name:'searchlistuser',
                component:resolve => require(['@/components/homeComponents/contentComponents/searchlistComponents/user.vue'],resolve)
              }
            ]
          },
          {
            path:'/singer',
            name:'singer',
            redirect: '/singer/singermusic',
            component:resolve => require(['@/components/homeComponents/contentComponents/singer.vue'],resolve),
            children:[
              {
                path:'singermusic',
                name:'singermusic',
                component:resolve => require(['@/components/homeComponents/contentComponents/singerComponents/music.vue'],resolve)
              },
              {
                path:'singeralbum',
                name:'singeralbum',
                component:resolve => require(['@/components/homeComponents/contentComponents/singerComponents/album.vue'],resolve)
              },
              {
                path:'singerdetail',
                name:'singerdetail',
                component:resolve => require(['@/components/homeComponents/contentComponents/singerComponents/singerdetail.vue'],resolve)
              },
              {
                path:'singermv',
                name:'singermv',
                component:resolve => require(['@/components/homeComponents/contentComponents/singerComponents/singermv.vue'],resolve)
              },
            ]
          },
          {
            path:'/albumlist',
            name:'albumlist',
            redirect: '/albumlist/albumlistcontent',
            component:resolve => require(['@/components/homeComponents/contentComponents/albumlist.vue'],resolve),
            children:[
              {
                path:'albumlistcontent',
                name:'albumlistcontent',
                component:resolve => require(['@/components/homeComponents/contentComponents/albumlistComponents/albumlistcontent.vue'],resolve),
              }
            ]
          },
        ]
      },
      {
        path:'/play',
        name:'play',
        component:resolve => require(['@/components/homeComponents/play.vue'],resolve),
      }
    ]
  },
  {
    path: '/mvdetail',
    name: 'mvDetail',
    component: resolve => require(['@/views/mvDetail.vue'],resolve)
  },
  {
    path:'*',
    name:'notFound',
    component:resolve => require(['@/views/noFound.vue'],resolve),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
