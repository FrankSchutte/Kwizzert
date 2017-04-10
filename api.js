"use strict";
const express = require('express');
const mongo = require('mongodb');
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const api = express.Router();
api.use(bodyParser.json());

// Connect to database
let db;

let key;
if(process.env.MONGODB_USERNAME && process.env.MONGODB_PASSWORD && process.env.KEY) {
    mongo.connect('mongodb://' +
        process.env.MONGODB_USERNAME + ':' +
        process.env.MONGODB_PASSWORD + '@' +
        'ds119220.mlab.com:19220/kwizzert', (err, database) => {
        if (err) throw err;
        db = database;
    });
    key = process.env.KEY;
} else {
    const secrets = require('./secrets');
    mongo.connect('mongodb://' +
        secrets.mongodb.username + ':' +
        secrets.mongodb.password + '@' +
        secrets.mongodb.url, (err, database) => {
        if (err) throw err;
        db = database;
    });
    key = secrets.key;
}

// KWIZ/CREATE
api.post('/kwiz/create', (req, res) => {
    const auth = req.query.key;
    if (auth === key) {
        addQuiz(res);
    } else {
        res.sendStatus(401);
    }
});


// KWIZ/CODE
api.get('/kwiz/:code', (req, res) => {
    const code = req.params.code;
    db.collection('quizzes').findOne({_id: code}, (err, quiz) => {
        if (err) throw err;
        let response;
        console.log(quiz);
        if (quiz) {
            response = {
                status: quiz.status
            };
        } else {
            response = {
                status: null
            }
        }
        res.status(200).json(response);
    });
});

// CATEGORIES
api.get('/categories', (req, res) => {
    db.collection('categorieen').find({}).toArray((err, categories) => {
        if (err) throw err;
        if (categories && categories.length > 0) {
            let response = [];
            categories.forEach((category) => {
                response.push({
                    categoryName: category.categoryName
                });
            });
            res.status(200).json(response);
        }
    });
});

// CATEGORIES/CATEGORYNAME/QUESTIONS
api.get('/categories/:categoryName/questions', (req, res) => {
    const auth = req.query.key;
    if (auth === key) {
        const category = req.params.categoryName;
        db.collection('vragen').find({category: category}).toArray((err, questions) => {
            if (err) throw err;
            if (questions && questions.length > 0) {
                const response = {
                    category: category,
                    questions: questions
                };
                res.status(200).json(response);
            }
        });
    } else {
        res.sendStatus(401);
    }
});

// QUESTIONS/ID
api.get('/questions/:id', (req, res) => {
    const auth = req.query.key;
    const id = ObjectID(req.params.id);
    db.collection('vragen').findOne({_id: id}, (err, question) => {
        if (err) throw err;
        if (question) {
            let response;

            if (auth === key) {
                response = {
                    question: question.question,
                    answer: question.answer,
                    category: question.category
                };
            }
            else {
                response = {
                    question: question.question,
                    category: question.category
                }
            }
            res.status(200).json(response);
        }
    });
});

const createCode = () => {
    let code = "";
    const characters = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    for( let i=0; i < 6; i++ )
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    return code;
};


const addQuiz  = (res) => {
    const code = createCode();
    db.collection('quizzes').findOne({_id: code}, (err, quiz) => {
        if (err) throw err;
        if (!quiz) {
            db.collection('quizzes').insertOne({_id: code, status: 'open'}, (err, r) => {
                if (err) throw err;
                const response = {
                    code: code,
                    status: 'open'
                };
                res.status(200).json(response);
            });
        } else {
            addQuiz(res);
        }
    });
};

module.exports = api;