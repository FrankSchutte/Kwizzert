'use strict';

import request from 'superagent';

// const url = process.env.API_URL || 'http://localhost:3000';
const url = location.origin;
console.log('environment variable:', process.env.API_URL);
console.log('url:', url);

let kwizzertAPI = {
    createQuiz(callback) {
        request
            .post(url + '/api/v1/kwiz/create')
            .end(function (err, res) {
                callback(err, JSON.parse(res.text));
            });
    },
    fetchCategories(callback) {
        request
            .get(url + '/api/v1/categories')
            .end(function (err, res) {
                callback(err, JSON.parse(res.text));
            });
    },
    fetchQuestions(categoryName, callback) {
        request
            .get(url + '/api/v1/categories/' +  categoryName + '/questions')
            .end(function (err, res) {
                callback(err, JSON.parse(res.text));
            });
    }
};

export default kwizzertAPI;
