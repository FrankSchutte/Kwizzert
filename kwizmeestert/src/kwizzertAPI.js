import request from 'superagent';

const url = 'http://localhost:3000';

let KwizzertAPI = {
    createQuiz(callback) {
        request
            .get(url + '/api/v1/kwiz/create')
            .end(function (err, res) {
                callback(err, res);
            });
    },
    fetchCategories(callback) {
        request
            .get(url + '/api/v1/categories')
            .end(function (err, res) {
                console.log(res.body);
                callback(err, res);
            });
    }
};

export default KwizzertAPI;
