import request from 'superagent';

const url = 'http://localhost:3000';

let kwizzertAPI = {
    validQuizCode(code, callback) {
        request
            .get(url + '/api/v1/kwiz/' + code)
            .end(function (err, res) {
                callback(err, res);
            });
    }
};

export default kwizzertAPI;
