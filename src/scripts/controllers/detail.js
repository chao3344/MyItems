import detailView from "../views/detail.art"
import detailModule from "../models/detail"

class Detail{
    constructor(){

    }

    // 改变图片格式
    changeImglist(arr){
        let re2 = /w\.h/g;
            
            let imgurl = arr.img;
            let newimgurl = imgurl.replace(re2,"148.208");
            // console.log(newimgurl)
            arr.img = newimgurl;
            
    }

    async render(){
        
        let that = this

        // 利用hash获取该影片的id
        let hash = location.hash.substr(1)
        let re = /\d+/g
        // console.log( hash.match(re)[0] )
        let id = hash.match(re)[0]

        let movieinfo = await detailModule.get({
            movieid : id
        })
        that.changeImglist(movieinfo.detailMovie)
        
        // console.log(movieinfo.detailMovie.img) 
        let detailHtml = detailView({
            Info : movieinfo
        })

        $('main').html(detailHtml) 
        $('.blur-bg').css('background-image',`url(${movieinfo.detailMovie.img})`)
        $('header').html(movieinfo.detailMovie.nm)
        $('.back').on('tap',function(){
        $('header').html('猫眼电影')
        })
    }


}

export default new Detail()