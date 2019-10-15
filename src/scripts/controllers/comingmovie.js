import comingmovieView from '../views/comingmovie.art'
import comingModel from '../models/comingmovie'
import movielistView from '../views/movielist.art'

const BScroll = require('better-scroll')

class Comingmovie{
    
    constructor(){
        this.pagenum = 0
    }

    renderer(list){

        // 把comingHtml装填到需要替换的样式中
        let comingHtml = comingmovieView({
            list
        })
        $('.list-wrap').html(comingHtml)
        
    }

    // 切换详情页
    binddetail(){
        // console.log(111)
        location.hash = $(this).attr('data-id')
        console.log('详情')
    }

    renderlist(result){
        // 把comingHtml装填到需要替换的样式中
        let ListHtml = movielistView({
            result
        })
        $('.coming-list').html(ListHtml)
        $('.item').on('tap',this.binddetail)
    }

    // 改变图片的格式
    changeImgnav(arr){
        let re2 = /w\.h/g;
            for( var i=0;i<arr.length;i++){
                let imgurl = arr[i].img;
                let newimgurl = imgurl.replace(re2,"170.230");
                // console.log(newimgurl)
                arr[i].img = newimgurl;
            }
    }

    // 改变下面列表的图片格式
    changeImglist(arr){
        let re2 = /w\.h/g;
            for( var i=0;i<arr.length;i++){
                let imgurl = arr[i].img;
                let newimgurl = imgurl.replace(re2,"128.180");
                // console.log(newimgurl)
                arr[i].img = newimgurl;
            }
    }

    

    async render(){
        let that = this
        let mostexcept = await comingModel.get({

        })
        
        that.changeImgnav(mostexcept.coming)
        
        // 填装nav数据
        let list = that.list = mostexcept.coming

        this.renderer(list)
        
        // 装填list数据
        let comingmovie = await comingModel.getlist({

        })
        // console.log(comingmovie)
        that.changeImglist(comingmovie.coming)
        let result = that.result = comingmovie.coming
        this.renderlist(result)

        
            
        let bscroll = new BScroll.default($('.most-expected-list-father').get(0),{
            probeType: 2,
            scrollX : true,
            scrollY : false
        })
        let aScroll = new BScroll.default($('.list-wrap').get(0),{
            probeType: 2,
            
        })

        
        

        

        aScroll.on('scrollEnd',async function(){
           
            
            
            // 上拉加载更多数据
            
            if( this.maxScrollY >= this.y  ){

                
                // console.log(that.pagenum)
                // 获取更多数据
                let moredata = comingmovie.movieIds;
                let moredatasId = '';
                
                for( var j=11+that.pagenum;j<that.pagenum+21;j++ ){
                    moredatasId += moredata[j] + '%2C';
                }
                
                // 把字符串最后的%2C去掉
                let re1 = /\%2C$/g;
                moredatasId = moredatasId.replace(re1,"");

                let more = await comingModel.getmorelist({
                    string : moredatasId
                })
                // console.log(moredatasId)
                that.pagenum += 10;
                // console.log(more)

                // 编辑图片地址格式
                that.changeImglist(more.coming)

                // 结构赋值
                let { coming: result } = more
                that.result = [...that.result, ...result]
                that.renderlist(that.result)


                
            }

        })
        
    }
    
}
export default new Comingmovie()

