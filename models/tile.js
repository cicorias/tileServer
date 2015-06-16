'use strict';
var mongoose   = require('mongoose');

var schema = mongoose.Schema({
    tile_id: { type: String, unique: true, required: true },

    country: { type: String },
    administrative_area_level_1: String,
    administrative_area_level_2: String,
    locality: String,

    raw: String
});

schema.set('toObject', {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Tile', schema);