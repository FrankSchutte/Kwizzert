import request from 'superagent';

const url = location.origin;
const key = 'supurgeheimuhkie';

const kwizzertAPI = {
    validQuizCode(code, callback) {
        request
            .get(url + '/api/v1/kwiz/' + code)
            .end((err, res) => {
                callback(err, JSON.parse(res.text));
            });
    },

    fetchQuestion(questionId, callback) {
        request
            .get(url + '/api/v1/questions/' + questionId + '?key=' + key)
            .end((err, res) => {
                callback(err, JSON.parse(res.text));
            });
    }
};

export default kwizzertAPI;
