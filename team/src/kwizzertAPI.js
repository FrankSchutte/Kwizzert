import request from 'superagent';

let url;
if(process.env.MONGODB_USERNAME && process.env.MONGODB_PASSWORD) {
    url = '';
} else {
    url = 'http://localhost:3000';
}

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
