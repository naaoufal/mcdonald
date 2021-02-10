const mongoose  = require('mongoose');

const Schema  = mongoose.Schema;

const LogSchema = new Schema({
    time: Date,
    file: String,
    line: String,
    info: String,
    type: String

},{collection: 'logs'});

module.exports = mongoose.model('logs', LogSchema);