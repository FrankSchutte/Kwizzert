import {PENDING_QUESTION, RECEIVE_QUESTION, START_QUESTION, STOP_QUESTION, RESET_QUESTION, SHOW_RESULTS, COUNT_QUESTIONS, CALCULATE_SCORE} from '../constants';
import kwizzertAPI from '../kwizzertAPI';

const questionActionCreator = {
    fetchQuestion(questionId) {
        return (dispatch) => {
            dispatch({type: PENDING_QUESTION});
            dispatch({type: RESET_QUESTION});
            dispatch({type: CALCULATE_SCORE});
            dispatch({type: COUNT_QUESTIONS});
            kwizzertAPI.fetchQuestion(questionId, (err, res) => {
                if (err)
                    dispatch({type: RECEIVE_QUESTION, success: false});
                else {
                    dispatch({type: RECEIVE_QUESTION, success: true, question: res});
                }
            });
        }
    },
    startQuestion() {
        return({type: START_QUESTION})
    },
    stopQuestion() {
        return({type: STOP_QUESTION})
    },
    showResults(message) {
        return({type: SHOW_RESULTS, message})
    }
};

export default questionActionCreator;