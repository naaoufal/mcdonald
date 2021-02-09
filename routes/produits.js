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

// add One
router.post('/', async (req, res) => {

    const produit = new Produits({
        name : req.body.name,
        subcategory : req.body.subcategory,
        ingredient : req.body.ingredient,
        price : req.body.price,
        score : req.body.score
    })

    try {
        const newproduit = await produit.save()
        res.json(newproduit)
    } catch (error) {
        res.json({message : error.message})
    }
})

// edit ingredient
router.patch('/:id', (req, res) => {

    if(!req.body){
        return res.send({message : "they is not data !!!"})
    }
    const id = req.params.id
    Produits.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.send({
              message: `Cannot update product with id=${id}. Maybe product was not found!`
            });
          } else res.send({ message: "product was updated successfully." });
    })
    
})

// delete One
router.delete('/:id', (req, res) => {
    Produits.findByIdAndDelete(req.params.id).then( () => {
        res.json()
    })
})


module.exports = router