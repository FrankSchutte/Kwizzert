import {PENDING_QUESTION, RECEIVE_QUESTION, START_QUESTION, SEND_ANSWER, STOP_QUESTION} from '../constants';

import kwizzertAPI from '../kwizzertAPI';
import kwizzertWebSocket from '../kwizzertWebSocket';

const questionActionCreator = {
    fetchQuestion(id) {
        return (dispatch) => {
            dispatch({type: PENDING_QUESTION});
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
    sendAnswer(code, teamName, answer) {
        kwizzertWebSocket.sendAnswer(code, teamName, answer);
        return {type: SEND_ANSWER};
    },
    stopQuestion() {
        return {type: STOP_QUESTION};
    }
};

export default questionActionCreator;
