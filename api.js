"use strict";
const express = require('express');
const secrets = require('./secrets');
const api = express.Router();

// LOGIN
api.post('/login', (req, res) => {
    res.sendStatus(200);
});

// KWIZ/CREATE
api.post('/kwiz/create', (req, res) => {
    const response = {
        code: "CHARACTERS"
    };
    res.status(200).send(JSON.stringify(response));
});

// KWIZ/CODE
api.get('/kwiz/:code', (req, res) => {
    const response = {
        status: "open"
    };
    res.status(200).send(JSON.stringify(response));
});

// CATEGORIES
api.get('/categories', (req, res) => {
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

// CATEGORIES/CATEGORYNAME/QUESTIONS
api.get('/categories/:categoryName/questions', (req, res) => {
    const response = {
        category: "DIEREN",
        questions: [
            {
                _id: "iets",
                question: "Hoeveel tenen heeft een geit?",
                answer: "veel"
            },
            {
                _id: "shdasjkdhsajkdh",
                question: "Hoeveel dieren heeft Freek Vonk doodgestoken?",
                answer: "Eén hele grote vis"
            }
        ]
    };
    res.status(200).send(JSON.stringify(response));
});

// QUESTIONS/ID
api.get('/questions/:id', (req, res) => {
    const response = {
        question: "Hoeveel tenen heeft een geit?",
        category: "DIEREN"
    };
    res.status(200).send(JSON.stringify(response));
});

module.exports = api;