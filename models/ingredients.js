const mongoose = require('mongoose')

const ingredientsSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    score : {
        type : String,
        require : true
    }

})

module.exports = mongoose.model('ingredients', ingredientsSchema)