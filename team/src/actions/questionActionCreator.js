import {REQUEST_QUESTION, RECEIVE_QUESTION, START_QUESTION, CONFIRM_ANSWER, CLOSE_QUESTION} from '../constants';

import kwizzertAPI from '../kwizzertAPI';
import kwizzertWebSocket from '../kwizzertWebSocket';

const questionActionCreator = {
    fetchQuestion(id) {
        return (dispatch) => {
            dispatch({type: REQUEST_QUESTION});
            kwizzertAPI.fetchQuestion(id, (err, res) => {
                if(err) {
                    dispatch({type: RECEIVE_QUESTION, success: false});
                } else {
                    dispatch({type: RECEIVE_QUESTION, success: true, question: res});
                }
            });
        }
    },
    startQuestion() {
        return {type: START_QUESTION};
    },
    confirmAnswer(code, teamName, answer) {
        kwizzertWebSocket.confirmAnswer(code, teamName, answer);
        return {type: CONFIRM_ANSWER};
    },
    closeQuestion() {
        return {type: CLOSE_QUESTION};
    }
};

export default questionActionCreator;
