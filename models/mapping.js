const mongoose = require('mongoose');

module.exports.Mapping = mongoose.model("Mapping", new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    }
}));