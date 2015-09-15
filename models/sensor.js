// Dependencies
var mongoose = require('mongoose');

// Schema
var Schema = mongoose.Schema;

var SensorSchema = new Schema({
    _box: { type: Schema.Types.ObjectId, ref: 'Box'},
    name: String,
    description: String,
    n_outputs: Number,
    dataEntries: [ { type: Schema.Types.ObjectId, ref: 'DataEntry' } ]
});

// Return model
module.exports = mongoose.model('Sensor', SensorSchema, 'sensors');
