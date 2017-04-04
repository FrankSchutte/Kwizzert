import request from 'superagent';

const url = 'http://localhost:3000';

const kwizzertAPI = {
    fetchQuestion(questionId, callback) {
        request
            .get(url + '/api/v1/questions/' + questionId)
            .end((err, res) => {
                callback(err, JSON.parse(res.text));
            });
    }
};

export default kwizzertAPI;
