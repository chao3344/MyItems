module.exports = {
    get({string}){
        return $.ajax({
            url: `/api/ajax/moreComingList?token=&movieIds=${string}`
        })
    }
}