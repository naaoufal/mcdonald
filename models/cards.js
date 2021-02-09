const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({

    generateId : {
        type : String
    },
    name : {
        type : String
    },
    score : {
        type : Number
    }

})

module.exports = mongoose.model('cards', cardSchema)