const mongoose = require('mongoose')

const subcategorySchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    category : {
        type : String,
        ref : 'categories',
        required : true
    }

})

module.exports = mongoose.model('Subcategories', subcategorySchema)
