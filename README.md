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

## Dependencies
1. Mongo DB
2. Node JS with npm (express, mongoose, body-parser)
3. bower (bootstrap, jquery)
