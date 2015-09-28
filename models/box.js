// Dependencies
var mongoose = require('mongoose');

// Schema
var Schema = mongoose.Schema;

var BoxSchema = new Schema({
    address: String,
    deployment_date: { type: Date },
    sensors: [ { type: Schema.Types.ObjectId, ref: 'Sensor' } ]
});

// Return model
module.exports = mongoose.model('Box', BoxSchema, 'boxes');
