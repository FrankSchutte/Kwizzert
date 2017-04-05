"use strict";
const express = require('express');
const mongo = require('mongodb');
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const secrets = require('./secrets');
const api = express.Router();
api.use(bodyParser.json());

// Connect to database
let db;

if(process.env.MONGODB_USERNAME && process.env.MONGODB_PASSWORD) {
    mongo.connect('mongodb://' +
        'ds119220.mlab.com:19220/kwizzert' + ':' +
        process.env.MONGODB_USERNAME + '@' +
        process.env.MONGODB_PASSWORD, (err, database) => {
        if (err) throw err;
        db = database;
    });
} else {
    mongo.connect('mongodb://' +
        secrets.mongodb.username + ':' +
        secrets.mongodb.password + '@' +
        secrets.mongodb.url, (err, database) => {
        if (err) throw err;
        db = database;
    });
}

// LOGIN
api.post('/login', (req, res) => {
    res.sendStatus(200);
});

// KWIZ/CREATE
api.post('/kwiz/create', (req, res) => {
    addQuiz(res);
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
    const category = req.params.categoryName;
    db.collection('vragen').find({category: category}).toArray((err, questions) => {
        if (err) throw err;
        if (questions && questions.length > 0) {
            let questionsArray = questions.map((question) => ({
                    _id: question._id,
                    question: question.question,
                    answer: question.answer
            }));

            const response = {
                category: category,
                questions: questions
            };
            res.status(200).json(response);
        }
    });
});

// QUESTIONS/ID
api.get('/questions/:id', (req, res) => {
    const id = ObjectID(req.params.id);
    db.collection('vragen').findOne({_id: id}, (err, question) => {
        if (err) throw err;
        if (question) {
            const response = {
                question: question.question,
                answer: question.answer,
                category: question.category
            };
            res.status(200).json(response);
        }
    });
});

const createCode = () => {
    let code = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
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