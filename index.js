'use strict';

//var express = require('express');
var path = require('path');
var http = require('http');

var oas3Tools = require('oas3-tools');
var serverPort = 8080;

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
    
};


var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();

//app.use(express.json()); // Διαχειρίζεται JSON δεδομένα στο request body
//app.use(express.urlencoded({ extended: true })); 


// Initialize the Swagger middleware
if (process.env.NODE_ENV !== "test") {
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});
}



module.exports = app;