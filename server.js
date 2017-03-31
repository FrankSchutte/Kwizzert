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
        res.sendFile(path.join(__dirname, "build", req.path));
    });

app.route('/item')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, "item/build/index.html"));
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

app.route('/*')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

app.listen(port, () => {
    console.log("Server started and listening to ::" + port);
});