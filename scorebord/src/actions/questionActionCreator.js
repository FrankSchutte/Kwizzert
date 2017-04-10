import {PENDING_QUESTION, RECEIVE_QUESTION, START_QUESTION, STOP_QUESTION, RESET_QUESTION, ADD_RESULTS, INCREASE_QUESTION_COUNT, CALCULATE_SCORE, SHOW_ANSWERS} from '../constants';
import kwizzertAPI from '../kwizzertAPI';

const questionActionCreator = {
    fetchQuestion(questionId) {
        return (dispatch) => {
            dispatch({type: RESET_QUESTION});
            dispatch({type: INCREASE_QUESTION_COUNT});

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
    addAnswers(message) {
        return({type: SHOW_ANSWERS, message})
    },
    addResults(message) {
        return({type: ADD_RESULTS, message})
    }
};

export default questionActionCreator;