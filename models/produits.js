const mongoose = require('mongoose')

const produitsSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    subcategory : {
        type : String,
        ref : 'subcategories',
        required : true
    }

})

module.exports = mongoose.model('produits', produitsSchema)