// Dependencies
var mongoose = require('mongoose');

// Schema
var Schema = mongoose.Schema;

var DataEntrySchema = new Schema({
    _sensor : {type: Schema.Types.ObjectId, ref: "Sensor"},
    date: { type: Date },
    o1: Number,
    o2: Number,
    o3: Number,
    o4: Number,
    o5: Number
});

// Return model
module.exports = mongoose.model('DataEntry', DataEntrySchema, 'dataEntries');