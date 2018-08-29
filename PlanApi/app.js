var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/route.js")();
var app = express();
app.use( bodyParser.json( { limit: '5MB' } ) );

//Route to handle all Publishing service request
app.use("/api/PlanPublisher", routes);
//Initiate the Expressss Server
var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});