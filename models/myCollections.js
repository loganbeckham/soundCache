const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    collectionName: String,
    collectionSamples: [
        {
            name: String,
            preview: String,
        },
    ],
});

const Collection = mongoose.model('collection', collectionSchema);
module.exports = Collection;