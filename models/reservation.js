const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({

    ingredient_id : {
        type : String,
        ref : '',
        required : true
    },
    score_num : {
        type : String,
        ref : '',
        required : true
    }

})

module.exports = mongoose.model('reservation', reservationSchema)