const mongoose = require('mongoose')

const promoSchema = new mongoose.Schema({

    points : {
        type : String
    }

})

module.exports = mongoose.model('promos', promoSchema)