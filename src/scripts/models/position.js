module.exports = {
    get({}){
        return $.ajax({
            url: '/api/ajax/movieOnInfoList?token='
        })
       
    }
}