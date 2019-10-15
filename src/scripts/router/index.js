import  indexController  from "../controllers/";

import  positionController  from "../controllers/position";
import  cinemaController  from "../controllers/cinema";
import  mineController  from "../controllers/mine";
import  detailController from "../controllers/detail"


import moviefhotController from '../controllers/comingmovie'

class Router{
    constructor(){
        this.render()
    }

    render(){
        window.addEventListener('load', this.handlePageload.bind(this))
        window.addEventListener('hashchange', this.handleHashchange.bind(this))
    }

    setActiveClass(hash) {
        $(`footer li[data-to=${hash}]`).addClass('active').siblings().removeClass('active')
    }

    setnavActiveClass(hash){
        
        $(`.hot-item[data-to=${hash}]`).addClass('active').siblings().removeClass('active')
    }

    renderDOM(hash){
        let pageControllers = {
            positionController,
            cinemaController,
            mineController,
            moviefhotController,
            detailController,
        }
        pageControllers[hash + 'Controller'].render()
    }

    handlePageload(){
        let hash = location.hash.substr(1) || 'position'
        if( hash == 'moviefhot'  ){
            positionController.render()
            moviefhotController.render()
            this.setnavActiveClass()
        }
        
        
        indexController.render()
        location.hash = hash
        // 初始化渲染DOM，高亮
        
        let re = /-\d+/g
       
        if( re.test(hash) ){
            hash = hash.replace(re,'')
            this.renderDOM(hash)
        }

        this.renderDOM(hash)
        this.setActiveClass(hash)
        this.setnavActiveClass(hash)
        
        
    }

    handleHashchange(e){
        let hash = location.hash.substr(1)
        let re = /-\d+/g
       
        if( re.test(hash) ){
            hash = hash.replace(re,'')
            this.renderDOM(hash)
        }
        else{
            //渲染DOM
        this.renderDOM(hash)
        // 设置高亮
        this.setActiveClass(hash)
        this.setnavActiveClass(hash)
        }
        
    }
    

}
new Router()