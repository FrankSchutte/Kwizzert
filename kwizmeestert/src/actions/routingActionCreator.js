import {REQUEST_CREATE_QUIZ, RECEIVE_CREATE_QUIZ, START_QUIZ, START_ROUND} from '../constants';
import KwizzertAPI from '../kwizzertAPI';

const routingActionCreator = {
    createQuiz() {
        return (dispatch) => {
            dispatch({type: REQUEST_CREATE_QUIZ});
            KwizzertAPI.createQuiz((err, res) => {
                if (err) {
                    dispatch({type: RECEIVE_CREATE_QUIZ, success: false});
                } else {
                    dispatch({type: RECEIVE_CREATE_QUIZ, success: true});
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
