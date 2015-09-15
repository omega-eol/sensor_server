// Dependencies
var express = require('express'),
    router = express.Router();

// Models
var BoxModel = require('../models/box'),
    SensorModel = require('../models/sensor'),
    DataEntryModel = require('../models/dataEntry');

// GET - return all boxes
router.get('/box', function(req, res){
    return BoxModel.find().populate('sensors').exec(function (err, box) {
        if (!err) {
            return res.send(box);
        } else {
            return console.log(err);
        };
    });
});

// GET - return all sensors
router.get('/sensors', function(req, res){
    return SensorModel.find(function (err, sensor) {
        if (!err) {
            return res.send(sensor);
        } else {
            return console.log(err);
        };
    });
});

// GET - return all sensors of the box
router.get('/box/:id/sensors', function(req, res){
    return SensorModel.find({ _box : req.params.id }).exec(function (err, sensor) {
        if (!err) {
            return res.send(sensor);
        } else {
            return console.log(err);
        };
    });
});

// GET - return a sensor
router.get('/sensors/:id', function(req, res){
    return SensorModel.findById(req.params.id, function(err, sensor) {
        if (err) return console.log(err);
        return res.send(sensor);
    });
});

// GET - return all data entries of a sensor
router.get('/sensors/:id/dataentries', function(req, res){
    return DataEntryModel.find({ _sensor: req.params.id  }).exec(function (err, dataEntry) {
        if (err) return console.log(err);
        return res.send(dataEntry);
    });
});

// POST - create a box
router.post('/box', function(req, res) {
    var box = new BoxModel({
        address: req.body.address,
        deployment_date: req.body.deployment_date,
        sensors: req.body.sensors
    });

    // save box
    box.save(function (err) {
        if (!err) {
            return console.log("Box has been created.");
        } else {
            return console.log(err);
        };
    });

    // return the box object
    return res.send(box);
});

// POST - create a sensor for a box
router.post('/box/:id/sensor', function(req, res){
    
    // define new sensor
    var sensor = new SensorModel({
        _box: req.params.id,
        name: req.body.name,
        description: req.body.description,
        n_outputs: req.body.n_outputs
    });

    // save sensor
    sensor.save(function (err) {
        if (!err) {
            return console.log("Sensor has been created.");
        } else {
            return console.log(err);
        }
    });

    // Now we need to update the box ref for this sensor
    var box = BoxModel.findById(req.params.id, function(err, box) {
        if (!err) {
            box.sensors.push(sensor);
            box.save(function (err) {
                if (!err) {
                    return console.log('Box has been updated');
                };
                return console.log(err);
            });
        } else {
            return console.log(err);
        };
    });

    return res.send(sensor);
});

// POST - create a data entry and add it to the sensor
router.post('/sensors/:id/dataentry', function(req, res){
    
    // define a Data Entry
    var dataEntry = new DataEntryModel({
        _sensor : req.params.id,
        date: req.body.date,
        o1: req.body.o1,
        o2: req.body.o2,
        o3: req.body.o3,
        o4: req.body.o4,
        o5: req.body.o5
    });

    // save the Data Entry
    dataEntry.save(function (err) {
        if (!err) {
            return console.log("Data Entry has been created.");
        } else {
            return console.log(err);
        }
    });

    // Now we need to update the box ref for this sensor
    var sensor = SensorModel.findById(req.params.id, function(err, sensor) {
        if (!err) {
            if (sensor) {
                sensor.dataEntries.push(dataEntry);
                sensor.save(function (err) {
                    if (!err) {
                        return console.log('Sensor has been updated');
                    };
                    return console.log(err);
                });
            } else {
                console.log('Sensor with this ID is not found');
            }
        } else {
            return console.log(err);
        };
    });

    return res.send(dataEntry);
});


// Return router
module.exports = router;