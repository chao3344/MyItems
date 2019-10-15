module.exports = {
    get({offset,CityId}){
        return $.ajax({
            url : `/api/ajax/cinemaList?&offset=${offset}&limit=20&cityId=${CityId}`
        })
        // http://m.maoyan.com/ajax/cinemaList?&offset=0&limit=20&cityId=40
    }
}
