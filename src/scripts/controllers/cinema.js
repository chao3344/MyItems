import cinemaView from "../views/cinema.art";
import cinemaListView from "../views/cinemalist.art"
import cinemaModule from "../models/cinema"
import cityListModule from "../models/cityList"



const BScroll = require('better-scroll')

class Cinema{

    constructor(){
        this.offset = 0;
        this.CityId = 1;
        this.CityName = '北京'
    }

    renderer(list){
        let listHtml = cinemaListView({
            list
        })
        $('.cinema-list').html(listHtml)
    }

    // 添加城市
    addCity(city){
        let that = this
        
        // 
        for( var i=0;i<26;i++ ){
            $('<div>',{class:"city-list city-list-block clearfix"}).insertAfter($('.city-title-letter')[i])
            /* let itemclass = $('.city-title-letter').eq(2).attr('id')
            console.log(itemclass) */
        }
        

        // 首字母转大写,城市分类
        for( var j=0;j<city.length;j++  ){
            let Frist = city[j].py.slice(0,1).toUpperCase()
            for( let k=0;k<26;k++ ){
                let itemclass = $('.city-title-letter').eq(k).attr('id')
                if( Frist == itemclass ){
                    
                    $('.city-title-letter').eq(k).next().append( $('<div>',{text:`${city[j].nm}`,class:"city-item",'data-nm':`${city[j].nm}`,'data-id':`${city[j].id}`} ) )
                    
                }
                
            }
        }
        $('.city-item').on('tap',function(){
            $('.city-list-container').css('display','none')
            // $('.city-name').html($(this).attr('data-nm'))
            that.CityId = $(this).attr('data-id')
            that.CityName = $(this).attr('data-nm')
            that.render(that.CityName)
            
        })
        
    }

    async render(){
        $('header').html('影院')
        let that = this
        let html = cinemaView()
        $('main').html(html)
        
        $('.city-name').html(this.CityName)
        let movielist = await cinemaModule.get({
            offset : that.offset,
            CityId:that.CityId
        })
        

        let list = that.list = movielist.cinemas

        this.renderer(list)

        // 拿到城市列表的数据
        let citylist = await cityListModule.get({
            
        })

        this.addCity(citylist.cts)
        


        let bScroll = new BScroll.default($('.cinema-list-father').get(0),{
            probeType: 2,
            scrollX:false,
            scrollY:true,
            // bounce:false
        })
       
        
        bScroll.on('scrollEnd',async function(){

            if( this.maxScrollY >= this.y  ){
                // console.log(1)
                
                // 获取更多数据
                
                that.offset += 20;
                let more = await cinemaModule.get({
                    offset: that.offset,
                    CityId:that.CityId
                })
                
                // console.log(more)


                // 结构赋值,拼接数据
                let { cinemas: list } = more
                that.list = [...that.list, ...list]
                that.renderer(that.list)
  
            }
        })
        $('.city-name').on('tap',function(){
            // $(this).html('1')
            $('#city-class').toggle()
        })
        


        
    }



}

export default new Cinema()