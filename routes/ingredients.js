const express = require('express')
const router = express.Router()
const Ingredients = require('../models/ingredients')


// get All 
router.get('/', async (req, res) => {
    try {
        const ingredients = await Ingredients.find()
        res.json(ingredients)
    } catch (error) {
        res.json({message : error.message})
    }
})

// get One category
router.get('/:id', getIngredients, (req, res) => {
    res.json(res.ingredient)
})

// add One
router.post('/', async (req, res) => {

    const ingredient = new Ingredients({
        name : req.body.name,
        score : req.body.score
    })

    try {
        const newIngredient = await ingredient.save()
        res.json(newIngredient)
    } catch (error) {
        res.json({message : error.message})
    }
})


// call category by id:
async function getIngredients (req, res, next) {
    let ingredient;
    try {
        ingredient = await Ingredients.findById(req.params.id);
        if(ingredient == null) {
            return res.json({message : 'the ingredient is not found'});
        }
    } catch (error) {
        return res.json({message : error.message})
    }
    res.ingredient = ingredient
    next()
}

// edit ingredient
router.patch('/:id', (req, res) => {

    if(!req.body){
        return res.send({message : "they is not data !!!"})
    }
    const id = req.params.id
    Ingredients.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.send({
              message: `Cannot update ingredient with id=${id}. Maybe ingredient was not found!`
            });
          } else res.send({ message: "ingredient was updated successfully." });
    })
    
})

// delete One
router.delete('/:id', (req, res) => {
    Ingredients.findByIdAndDelete(req.params.id).then( () => {
        res.json()
    })
})

module.exports = router