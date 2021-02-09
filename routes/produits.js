const express = require('express')
const router = express.Router()
const Produits = require('../models/produits')


// get All 
router.get('/', async (req, res) => {
    try {
        const produits = await Produits.find()
        res.json(produits)
    } catch (error) {
        res.json({message : error.message})
    }
})

// get One category
router.get('/:id', getProduits, (req, res) => {
    res.json(res.produit)
})


// call category by id:
async function getProduits (req, res, next) {
    let produit;
    try {
        produit = await Produits.findById(req.params.id);
        if(produit == null) {
            return res.json({message : 'the product is not found'});
        }
    } catch (error) {
        return res.json({message : error.message})
    }
    res.produit = produit
    next()
}

module.exports = router