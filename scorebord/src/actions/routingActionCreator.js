import {PENDING_REGISTER, RECEIVE_REGISTER,START_QUIZ, FINISH_QUIZ} from '../constants';
import kwizzertAPI from '../kwizzertAPI';
import kwizzertWebSocket from '../kwizzertWebSocket';

const routingActionCreator = {
    register(code) {
        return (dispatch) => {
            dispatch({type: PENDING_REGISTER});
            kwizzertAPI.validQuizCode(code, (err, res) => {
                if (err || res.status !== 'open')
                    dispatch({type: RECEIVE_REGISTER, success: false});
                else {
                    kwizzertWebSocket.register(code);
                    dispatch({type: RECEIVE_REGISTER, success: true, code: code});
                }
            });
        };
    },

    startQuiz() {
        return {type: START_QUIZ};
    },
    finishQuiz() {
        return {type: FINISH_QUIZ};
    }
};

export default routingActionCreator;