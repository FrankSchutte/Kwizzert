"use strict";
const express = require('express');
const secrets = require('./secrets');
const api = express.Router();

// LOGIN
api.post('/login', function (req, res) {
    res.sendStatus(200);
});

// KWIZ/CREATE
api.get('/kwiz/create', function (req, res) {
    const response = {
        code: "CHARACTERS"
    };
    res.status(200).send(JSON.stringify(response));
});

// KWIZ/CODE
api.get('/kwiz/:code', function (req, res) {
    const response = {
        status: "open"
    };
    res.status(200).send(JSON.stringify(response));
});

// CATEGORIES
api.get('/categories', function (req, res) {
    const response = [
        {
            categoryName: "eerste categorie"
        }, {
            categoryName: "DIEREN"
        }, {
            categoryName: "derde categorie"
        }
    ];
    res.status(200).send(JSON.stringify(response));
});

// QUESTIONS
api.get('/questions', function (req, res) {
    const response = [
        {
            _id: "iets",
            question: "Hoeveel tenen heeft een geit?",
            answer: "veel",
            category: "DIEREN"
        }, {
            _id: "idieeeee",
            question: "Wat doet de wasmachine?",
            answer: "kfhkjfhakjhak",
            category: "eerste categorie"
        }
    ];
    res.status(200).send(JSON.stringify(response));
});

// QUESTIONS/ID
api.get('/questions/:id', function (req, res) {
    const response = {
        question: "Hoeveel tenen heeft een geit?",
        category: "DIEREN"
    };
    res.status(200).send(JSON.stringify(response));
});

// KWIZMEESTERT-QUESTIONS/ID
api.get('/kwizmeestert-questions/:id', function (req, res) {
    const response = {
        question: "Hoeveel tenen heeft een geit?",
        answer: "veel",
        category: "DIEREN"
    };
    res.status(200).send(JSON.stringify(response));
});

module.exports = api;