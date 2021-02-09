const express = require('express')
const router = express.Router()
const Subcategories = require('../models/subcategories')


// get All 
router.get('/', async (req, res) => {
    try {
        const subcategories = await Subcategories.find()
        res.json(subcategories)
    } catch (error) {
        res.json({message : error.message})
    }
})

// add One
router.post('/', async (req, res) => {

    const subcategory = new Subcategories({
        name : req.body.name,
        category : req.body.category
    })

    try {
        const newSubcategory = await subcategory.save()
        res.json(newSubcategory)
    } catch (error) {
        res.json({message : error.message})
    }
})

// get One by id subcategory :
router.get('/:id', getSubcategoryById, (req, res) => {
    res.json(res.subcategory)
})

// get one by id category :
router.get('/:category', getSubcategoryByCategoryId, (req, res) => {
    res.json(res.subcategory)
})

// call subcategory by id subcategory:
async function getSubcategoryById (req, res, next) {
    let subcategory;
    try {
        subcategory = await Subcategories.findById(req.params.id);
        if(subcategory == null) {
            return res.json({message : 'the subcategory is not found'});
        }
    } catch (error) {
        return res.json({message : error.message})
    }
    res.subcategory = subcategory
    next()
}

// call all subcategories by id category:
async function getSubcategoryByCategoryId(req, res, next) {
    let subcategory
    try {
        subcategory = await Subcategories.find(req.params.category)
        if(subcategory == null) {
            return res.json({message : 'the subcategory is not found'})
        }
    } catch (error) {
        return res.json({message : error.message})
    }
    res.subcategory = subcategory
    next()
}


// update One
router.patch('/:id', (req, res) => {

    if(!req.body){
        return res.send({message : "they is not data !!!"})
    }
    const id = req.params.id
    Subcategories.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.send({
              message: `Cannot update subcategory with id=${id}. Maybe subcategory was not found!`
            });
          } else res.send({ message: "Subcategory was updated successfully." });
    })
    
})

// delete One
router.delete('/:id', (req, res) => {
    Subcategories.findByIdAndDelete(req.params.id).then( () => {
        res.json()
    })
})


module.exports = router