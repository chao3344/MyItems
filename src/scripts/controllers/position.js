const positionView = require('../views/position.art')
const positionModel = require('../models/position')
const positionsModelMore = require('../models/positionsMore')
const positionListView = require('../views/position-list.art')

const BScroll = require('better-scroll')

class Position{
    constructor(){
        // this.render()
        this.pagenum = 0
    }


    renderer(list){
        let positionListHtml = positionListView({
            list
        })

        $('main .list-wrap .hotmovie').html(positionListHtml)
        
        // 绑定事件
        $('.hot-item').on('tap',this.bindClick)
        $('.item').on('tap',this.binddetail)
    }
     

    // 改变图片的格式
    changeImg(arr){
        let re2 = /w\.h/g;
            for( var i=0;i<arr.length;i++){
                let imgurl = arr[i].img;
                let newimgurl = imgurl.replace(re2,"128.180");
                // console.log(newimgurl)
                arr[i].img = newimgurl;
            }
    }

    // 页面切换
    bindClick(){
        // console.log(1)
        location.hash = $(this).attr('data-to')
        $('header').html('猫眼电影')
    }

    // 切换详情页
    binddetail(){
        // console.log(111)
        location.hash = $(this).attr('data-id')
    }

    async render(){
        $('header').html('猫眼电影')
        // let main = document.querySelector('main')
        let that = this
        let result = await positionModel.get({
            
        })
        
        

        // console.log(pagenum)
        
        that.changeImg(result.movieList)
        

        // 先把positionView装到main当中
        let positionsHtml = positionView({})
        let $main = $('main')
        $main.html(positionsHtml)

        // 再把list装到list-wrap中
        let list = this.list = result.movieList

        this.renderer(list)


        

        // 定义图片对象
        let $imgHead = $('.head img')
        let $imgFoot = $('.foot img')

        // bScroll 是BetterScroll实例，将来可以用来调用API
        let bScroll = new BScroll.default($('.list-wrap').get(0),{
            probeType: 2
        })


        // bScroll.scrollBy(0,-40)

        bScroll.on('scrollEnd',async function(){
            // 下拉请求数据
            if( this.y >= 0 ){
                $imgHead.attr('src','/assets/images/ajax-loader.gif')
                
            }
            
            // 上拉加载更多数据
            let length = result.movieIds.length
            
            if( this.maxScrollY >= this.y  && (length - 12 - that.pagenum)>0 ){
                
                
                $imgFoot.attr('src','/assets/images/ajax-loader.gif')
                // console.log(that.pagenum)
                // 获取更多数据
                let moredata = result.movieIds;
                let moredatasId = '';
                
                for( var j=13+that.pagenum;j<that.pagenum+23;j++ ){
                    moredatasId += moredata[j] + '%2C';
                }
                let re1 = /\%2C$/g;
                moredatasId = moredatasId.replace(re1,"");


                let more = await positionsModelMore.get({
                    string: moredatasId
                })
                that.pagenum += 10;
                // console.log(more)

                // 编辑图片地址格式
                that.changeImg(more.coming)

                // 结构赋值
                let { coming: list } = more
                that.list = [...that.list, ...list]
                that.renderer(that.list)


                // bScroll.scrollBy(0,40)
                $imgFoot.attr('src','/assets/images/arrow.png')
                $imgFoot.removeClass('down')
            }

        })

        bScroll.on('scroll',function(){
            if( this.y > 0 ){
                $imgHead.addClass('up')
            }
            if( this.maxScrollY > this.y ){
                $imgFoot.addClass('down')
            }
           
        })


        

        
    }
}

export default new Position()
// new Position()

