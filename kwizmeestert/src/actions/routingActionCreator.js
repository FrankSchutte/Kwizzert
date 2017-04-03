import {REQUEST_CREATE_QUIZ, RECEIVE_CREATE_QUIZ, START_QUIZ, START_ROUND} from '../constants';
import kwizzertAPI from '../kwizzertAPI';
import {send} from '../kwizzertWebSocket';

const routingActionCreator = {
    createQuiz() {
        return (dispatch) => {
            dispatch({type: REQUEST_CREATE_QUIZ});
            kwizzertAPI.createQuiz((err, res) => {
                if (err) {
                    dispatch({type: RECEIVE_CREATE_QUIZ, success: false});
                } else {
                    const message = {
                        action: 'REGISTER',
                        code: res.code,
                        type: 'quizmaster'
                    };

                    send(JSON.stringify(message));
                    dispatch({type: RECEIVE_CREATE_QUIZ, success: true, code: res.code});
                }
            });
        };
    },
    startQuiz() {
        return {type: START_QUIZ};
    },
    startRound(categories) {
        return {type: START_ROUND, categories: [categories]}
    }
};

export default routingActionCreator;
