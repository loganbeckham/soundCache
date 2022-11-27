const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
    name: String,
    preview: String,
})

const collection = mongoose.model('Samples', sampleSchema);
module.exports = collection;