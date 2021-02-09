const express = require('express')
const router = express.Router()
const winston = require('winston')
const Command = require('../models/commands')


// config time
var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1; //As January is 0.
var year = date.getFullYear();
var hour = date.getHours();
var minute = date.getMinutes();
var second = date.getSeconds();

// add log files for commands
const logConfig = {
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: "./logger/logfile.log",
      }),
    ],
};
const myLogger = winston.createLogger(logConfig);

// get All 
router.get('/', async (req, res) => {
    try {
        const commands = await Command.find()
        res.json(commands)
        myLogger.log({
            message:" Command found",
            level: ["info"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
        });
    } catch (error) {
        res.json({message : error.message})
        myLogger.log({
            message: error.message,
            level: ["error"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
        });
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
        myLogger.log({
            message:" Command added",
            level: ["info"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
        });
    } catch (error) {
        res.json({message : error.message})
        myLogger.log({
            message: error.message,
            level: ["info"],
            Date: day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second,
        });
    }
})



module.exports = router