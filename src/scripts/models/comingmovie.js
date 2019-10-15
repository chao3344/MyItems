module.exports = {
    get({}){
        return $.ajax({
            url: '/api/ajax/mostExpected?ci=1&limit=10&offset=0&token='
            
        })
    },

    getlist({}){
        return $.ajax({
            url: '/api/ajax/comingList?ci=1&token=&limit=10'
            
        })
    },
    getmorelist({string}){
        return $.ajax({
            url: `/api/ajax/moreComingList?ci=1&token=&limit=10&movieIds=${string}`
            
        })
    }

}