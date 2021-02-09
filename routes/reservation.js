const express = require('express')
const router = express.Router()
const Categories = require('../models/ingredients')


// get All 
// router.get('/', async (req, res) => {
//     try {
//         const categories = await Categories.find()
//         res.json(categories)
//     } catch (error) {
//         res.json({message : error.message})
//     }
// })

// get One category
router.get('/:id', getCategoryById, (req, res) => {
    res.json(res.category)
})

// add One
router.post('/', async (req, res) => {

    const category = new Categories({
        name : req.body.name,
    })

    try {
        const newCategory = await category.save()
        res.json(newCategory)
    } catch (error) {
        res.json({message : error.message})
    }
})

// update One
// router.patch('/:id', (req, res) => {
    
// })

// delete One
// router.delete('/:id', (req, res) => {
    
// })

// 


// call category by id:
// async function getCategoryById (req, res, next) {
//     let category;
//     try {
//         category = await Categories.findById(req.params.id);
//         if(category == null) {
//             return res.json({message : 'the category is not found'});
//         }
//     } catch (error) {
//         return res.json({message : error.message})
//     }
//     res.category = category
//     next()
// }

module.exports = router