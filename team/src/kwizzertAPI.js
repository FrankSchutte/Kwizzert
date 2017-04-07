import request from 'superagent';

const url = location.origin;

let kwizzertAPI = {
    validQuizCode(code, callback) {
        request
            .get(url + '/api/v1/kwiz/' + code)
            .end(function (err, res) {
                callback(err, JSON.parse(res.text));
            });
    },
    fetchQuestion(id, callback) {
        request
            .get(url + '/api/v1/questions/' + id)
            .end(function (err, res) {
                callback(err, JSON.parse(res.text));
            })
    }
};

export default kwizzertAPI;
