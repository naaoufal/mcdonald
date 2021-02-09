const express = require('express')
const router = express.Router()
const Command = require('../models/commands')

// get All 
router.get('/', async (req, res) => {
    try {
        const commands = await Command.find()
        res.json(commands)
    } catch (error) {
        res.json({message : error.message})
    }
})

// add One
router.post('/', async (req, res) => {

    const commands = new Command({
        price : req.body.price,
        cardNumber : req.body.cardNumber,
        idTable : req.body.idTable,
        nameProduct : req.body.nameProduct
        //paymentMethod : req.body.paymentMethod
    })

    try {
        const newcommand = await commands.save()
        res.json(newcommand)
    } catch (error) {
        res.json({message : error.message})
    }
})



module.exports = router