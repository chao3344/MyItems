// commonjs
const path = require('path')
const { src,dest,series,parallel,watch } = require('gulp')
const connect = require('gulp-connect')
const sass = require("gulp-sass");
const webpack = require('webpack-stream')
const proxy = require('http-proxy-middleware')

// copyhtml
function copyhtml(){
    return src('./src/*.html')
    .pipe(dest('./dev/'))
    .pipe(connect.reload())
}

// copylibs
function copylibs(){
    return src('./src/libs/**/*')
    .pipe(dest('./dev/libs'))
    
}

// copyassets
function copyassets(){
    return src('./src/assets/**/*')
    .pipe(dest('./dev/assets'))
    
}


// 启动server
function gulpServer(){
    return connect.server({
        name: 'Dist App',
        root: './dev',
        port: 8080,
        
        livereload: true,
        middleware: () =>{
            return [
                proxy('/api',{
                    target: 'https://m.maoyan.com',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': ''
                    }

                })
            ]
        }
    })
}

//编译scss
function packSCSS(){
    return src(['./src/styles/**/*.scss','!./src/styles/yo/**/*.scss'])
    .pipe(sass().on('error',sass.logError))
    .pipe(dest('./dev/styles/'))
    .pipe(connect.reload())
}

// JS模块化
function packJS(){
    return src('./src/scripts/**/*.js')
    .pipe(webpack({
        mode: 'development',
        entry: './src/scripts/app.js',
        output: {
            path: path.resolve(__dirname,'./dev'),
            // __dirname代表文件的物理路径,resolve是一种解析方法
            filename: 'app.js'
        },
        // 使用art-template-loader必须要有webpack-stream
        module: {
            rules: [
                {
                    test: /\.html$/,
                    loader: 'string-loader'
                },
                {
                    test: /\.art$/,
                    loader: "art-template-loader"
                }
            ]
        }
    }))
    .pipe(dest('./dev/scripts'))
    .pipe(connect.reload())
}

// watch
function watchFiles(){
    watch('./src/*.html',series(copyhtml) )
    watch('./src/**/*.scss',series(packSCSS) )
    watch('./src/**/*',series(packJS) )
    watch('./src/libs/*', series(copylibs))
    watch('./src/assets/*', series(copyassets))
    
}


// series:同步执行
// parallel:异步执行
exports.default = series(parallel(copyhtml,copyassets,copylibs,packSCSS,packJS),parallel(gulpServer,watchFiles))
