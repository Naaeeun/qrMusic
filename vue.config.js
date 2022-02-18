module.exports = {
    // lintOnSave: false, //关闭严格模式
    publicPath:'/',
    pages:{
        index:{
            entry:"src/main.js",
            title:"秋仁音乐", //打包后网站名
        },
    },
    devServer:{
        port:8000,
        proxy:{
            '/api':{
                target:'http://www.qiuren.ink:3000',
                pathRewrite:{'^/api':''}//重写地址
            },
        }
    },
    configureWebpack:{
        externals: {
            BMap: 'BMap',
            BMapLib:'BMapLib',
            google:"google"
        },
    }
    
}
  