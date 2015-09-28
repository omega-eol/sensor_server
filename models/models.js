// This model is deprecated

// Dependencies
var mongoose = require('mongoose');

// Schema
var Schema = mongoose.Schema;

var DataEntrySchema = new Schema({
    _sensor : {type: Number, ref: "Sensor"}
    date: { type: Date},
    o1: Number,
    o2: Number,
    o3: Number,
    o4: Number,
    o5: Number
});

var SensorSchema = new Schema({
    _id: Number,
    _box: { type: Number, ref: 'Box'}
    name: String,
    description: String,
    n_outputs: Number,
    dataEntries: [ { type: Number, ref: 'DataEntry' } ]
});

var BoxSchema = new Schema({
    _id: Number
    address: {
        street: String,
        city: String,
        state: String,
        zip: String
    },
    deployment_date: { type: Date, default: Date.now },
    sensors: [ SensorSchema ]
});

// Return model
module.exports = mongoose.model('Box', BoxSchema);
module.exports = mongoose.model('Sensor', SensorSchema);
module.exports = mongoose.model('DataEntry', DataEntrySchema);