module.exports = {
    get({offset}){
        return $.ajax({
            url : '/api/dianying/cities.json'
        })

    }
}
