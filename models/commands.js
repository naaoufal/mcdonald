const mongoose = require('mongoose')

const commandSchema = new mongoose.Schema({

    price : {
        type : String,
        required : true
    },
    cardNumber : {
        type : String,
        required : true
    },
    idTable : {
        type : String,
        required : true
    },
    nameProduct : {
        type : String,
        required : true
    }

})

module.exports = mongoose.model('commands', commandSchema)