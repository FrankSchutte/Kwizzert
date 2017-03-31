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
app.use('/api/v1', require('./api'));

app.route('/static/*')
    .get((req, res) => {
    const referer = req.get('Referer');
    if (referer.includes('/kwizmeestert')) {
        res.sendFile(path.join(__dirname, 'kwizmeestert/build', req.path));
    }
    else if (referer.includes('/team')) {
        res.sendFIle(path.join(__dirname, 'team/build', req.path));
    }
    else if (referer.includes('/scorebord')) {
        res.sendFile(path.join(__dirname, 'scoreboard/build'));
    }});


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

app.route('/*')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

app.listen(port, () => {
    console.log("Server started and listening to ::" + port);
});