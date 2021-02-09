const express = require('express')
const router = express.Router()
const Cards = require('../models/cards')


// get All 
router.get('/', async (req, res) => {
    try {
        const cards = await Cards.find()
        res.json(cards)
    } catch (error) {
        res.json({message : error.message})
    }
})

// get One category
router.get('/:id', getCardById, (req, res) => {
    res.json(res.card)
})

// add One
router.post('/', async (req, res) => {

    const card = new Cards({
        generateId : req.body.generateId,
        name : req.body.name,
        score : req.body.score
    })

    try {
        const newCard = await card.save()
        res.json(newCard)
    } catch (error) {
        res.json({message : error.message})
    }
})

// update a element in collectio:
router.patch('/:id', async (req, res) => {
    if(!req.body){
        return res.send({message : "they is not data !!!"})
    }
    const id = req.params.id
    Cards.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.send({
              message: `Cannot update card with id=${id}. Maybe card was not found!`
            });
          } else res.send({ message: "Card was updated successfully." });
    })
})

// update many elemnts in collection:
router.patch('/', async (req, res) => {
    if(!req.body){
        return res.send({message : "they is not data !!!"})
    }
    const id = req.params.id
    Cards.updateMany(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.send({
              message: `they is no Card !`
            });
          } else res.send({ message: "All Cards are updated successfully." })
    })
})

// delete One
router.delete('/:id', (req, res) => {
    
})

// 


// call card by id:
async function getCardById (req, res, next) {
    let card;
    try {
        card = await Cards.findById(req.params.id);
        if(card == null) {
            return res.json({message : 'the card is not found'});
        }
    } catch (error) {
        return res.json({message : error.message})
    }
    res.card = card
    next()
}

module.exports = router