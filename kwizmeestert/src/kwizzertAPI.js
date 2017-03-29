import request from 'superagent';

let KwizzertAPI = {
    openQuiz(callback) {
        request
            .get('/api/v1/kwiz/create')
            .end(function (err, res) {
                callback(err, res.body);
            });
    }
};

export default KwizzertAPI;
