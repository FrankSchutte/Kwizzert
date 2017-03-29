"use strict";
const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;
app.use('/api/v1', require('./api'));

app.route('/static/*')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, "build", req.path));
    });

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