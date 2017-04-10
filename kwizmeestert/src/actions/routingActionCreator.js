import {PENDING_CREATE_QUIZ, RECEIVE_CREATE_QUIZ, START_QUIZ, START_ROUND, NEXT_ROUND, FINISH_QUIZ} from '../constants';
import kwizzertAPI from '../kwizzertAPI';
import kwizzertWebSocket from '../kwizzertWebSocket';

const routingActionCreator = {
    createQuiz() {
        return (dispatch) => {
            dispatch({type: PENDING_CREATE_QUIZ});
            kwizzertAPI.createQuiz((err, res) => {
                if (err) {
                    dispatch({type: RECEIVE_CREATE_QUIZ, success: false});
                } else {
                    kwizzertWebSocket.createQuiz(res.code);
                    dispatch({type: RECEIVE_CREATE_QUIZ, success: true, code: res.code});
                }
            });
        };
    },
    startQuiz(code, teams) {
        kwizzertWebSocket.startQuiz(code, teams);
        return {type: START_QUIZ};
    },
    startRound() {
        return {type: START_ROUND}
    },
    nextRound() {
        return {type: NEXT_ROUND};
    },
    finishQuiz(code) {
        kwizzertWebSocket.finishQuiz(code);
        return {type: FINISH_QUIZ};
    }
};

export default routingActionCreator;
