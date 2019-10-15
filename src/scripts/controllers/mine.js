import  mineView  from "../views/mine.art";

class Mine{

    render(){
        let html = mineView()

        $('main').html(html)
        $('header').html('我的')
    }
}

export default new Mine()