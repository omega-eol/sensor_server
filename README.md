# Simple API for sensor project

## Description
To start the server use: `node server.js`

1. `/` - main page
2. `/data/:sensorID` - top 20 data entries for sensor ID `:sensorID`
3. `/api` - path for API
	1. `GET /api/box` - returns all boxes
	2. `GET /api/sensors` - returns all sensors
	3. `GET /api/box/:id/sensors` - return all sensors or box with ID `:id`
	4. `GET /api/sensors/:id` - returns info about sensor ID `:id`
	5. `GET /api/sensors/:id/dataentries` - returns top 20 data entries of sensor ID `:id`
	6. `POST /api/box` - create a new sensor box
	7. `POST /api/box/:id/sensors` - creates a new sensor for box ID `:id`
	8. `POST /api/sensors/:id/dataentries` - creates a new data entry for sensor ID `:id`

## Data Model

Sensor box (`/models/box.js`) is the main entity in the system Each sensor box consists of 0 or more sensors.
```javascript
var BoxSchema = new Schema({
    address: String, // address where we deploy the sensor box
    deployment_date: { type: Date }, // when we deployed it
    sensors: [ { type: Schema.Types.ObjectId, ref: 'Sensor' } ]  // a set of Sensors inside the sensor box (0 or more)
});
```

Sensor (`/models/sensor.js`) - could any sensor we want.
```javascript
var SensorSchema = new Schema({
    _box: { type: Schema.Types.ObjectId, ref: 'Box'}, // foreign key to the Sensor Box
    name: String, // name of the sensor
    description: String, // description
    n_outputs: Number, // number of outputs
    dataEntries: [ { type: Schema.Types.ObjectId, ref: 'DataEntry' } ] // a set of Data Entries
});
```

Data Entry (`/models/sensor.js`) - here we store sensor's data. For now we keep the data model simple and assume that a sensor can output at most 5 values.
```javascript
var DataEntrySchema = new Schema({
    _sensor : {type: Schema.Types.ObjectId, ref: "Sensor"}, // foreign key to the Sensor
    date: { type: Date }, // timestamp of the data entry
    o1: Number, // output value 1
    o2: Number, // output value 2
    o3: Number, // output value 3
    o4: Number, // output value 4
    o5: Number  // output value 5
});
```

## Dependencies
1. Mongo DB
2. Node JS with npm (express, mongoose, body-parser)
3. bower (bootstrap, jquery)
