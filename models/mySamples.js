const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
    name: String,
    preview: String,
});

const Sample = mongoose.model('sample', sampleSchema);
module.exports = Sample;