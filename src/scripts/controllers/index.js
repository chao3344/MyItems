const layoutView = require('../views/layout.art')

class Index{
    
    bindclick(){
        // 页面切换
        location.hash = $(this).attr('data-to')
        
    }

    render(){
        const html = layoutView()

        $('#root').html(html)
        
        // 绑定点击事件
        $('footer li').on('click',this.bindclick)
    }
}

export default new Index()