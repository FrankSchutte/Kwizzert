import request from 'superagent';

const url = location.origin;
const key = 'supurgeheimuhkie';

let kwizzertAPI = {
    createQuiz(callback) {
        request
            .post(url + '/api/v1/kwiz/create?key=' + key)
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
            .get(url + '/api/v1/categories/' +  categoryName + '/questions?key=' + key)
            .end(function (err, res) {
                callback(err, JSON.parse(res.text));
            });
    }
};

export default kwizzertAPI;
