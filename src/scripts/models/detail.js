module.exports = {
    get({movieid}){
        return $.ajax({
            url: `api/ajax/detailmovie?movieId=${movieid}`
        })
    }
}