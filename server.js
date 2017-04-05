"use strict";
const http = require('http');
const express = require('express');
const path = require('path');
const websockets = require('./websockets');

const app = express();
const httpServer = http.createServer(app);
const wsServer = websockets.create(httpServer);
websockets.configure(wsServer);

const port = process.env.PORT || 3000;

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);
app.use('/api/v1', require('./api'));

app.route('/static/*')
    .get((req, res) => {
    const referer = req.get('Referer');
    if(referer) {
        if (referer.includes('/kwizmeestert')) {

            res.sendFile(path.join(__dirname, 'kwizmeestert/build', req.path));
        }
        else if (referer.includes('/team')) {
            res.sendFile(path.join(__dirname, 'team/build', req.path));
        }
        else if (referer.includes('/scorebord')) {
            res.sendFile(path.join(__dirname, 'scorebord/build'));
        }}}
    );

app.route('/team')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, "team/build/index.html"));
    });

app.route('/scorebord')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, "scorebord/build/index.html"));
    });

app.route('/kwizmeestert')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, "kwizmeestert/build/index.html"));
    });

app.route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

// Test route
app.use(express.static(path.join(__dirname, 'tests')));


// app.route('/*')
//     .get((req, res) => {
//         res.sendFile(path.join(__dirname, 'index.html'));
//     });

app.listen(port, () => {
    console.log("Server started and listening to ::" + port);
});

var filesystem = require("fs");
var _getAllFilesFromFolder = function(dir) {

    var results = [];

    filesystem.readdirSync(dir).forEach(function(file) {

        file = dir+'/'+file;
        var stat = filesystem.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(_getAllFilesFromFolder(file))
        } else console.log(file);

    });

};

_getAllFilesFromFolder(__dirname + '/kwizmeestert');
