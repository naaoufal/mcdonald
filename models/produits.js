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
    },
    ingredient : {
        type : String,
        ref : 'ingredients',
        require : true
    },
    price : {
        type : String,
        required : true
    },
    score : {
        type : String,
        required : true
    }

})

module.exports = mongoose.model('produits', produitsSchema)