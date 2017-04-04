import {
    REQUEST_QUESTIONS,
    RECEIVE_QUESTIONS,
    CHOOSE_QUESTION,
    TOGGLE_QUESTION_ACTIVITY,
    CONFIRM_ANSWER,
    TOGGLE_ANSWER,
    CLOSE_QUESTION,
    CLOSE_ROUND
} from '../constants';

import kwizzertAPI from '../kwizzertAPI';
import kwizzertWebSocket from '../kwizzertWebSocket';

const questionActionCreator = {
    fetchQuestions() {
        return (dispatch) => {
            dispatch({type: REQUEST_QUESTIONS});
            kwizzertAPI.fetchQuestions('Algemeen', (err, res) => {
                if (err) {
                    dispatch({type: RECEIVE_QUESTIONS, success: false});
                } else {
                    dispatch({
                        type: RECEIVE_QUESTIONS,
                        success: true,
                        category: res.categoryName,
                        questions: res.questions
                    });
                }
            });
        };
    },
    selectQuestion(code, question) {
        kwizzertWebSocket.pickQuestion(code, question);
        return {type: CHOOSE_QUESTION, question: question};
    },
    toggleActivity(code) {
        kwizzertWebSocket.startQuestion(code);
        return {type: TOGGLE_QUESTION_ACTIVITY};
    },
    confirmAnswer(answer) {
        return {type: CONFIRM_ANSWER, answer: answer}
    },
    toggleAnswer(code, answer) {
        //TODO the reducer need to run first, then the webSocket must send a signal, should i use thunk here?
        kwizzertWebSocket.rateAnswer(code, answer);
        return {type: TOGGLE_ANSWER, teamName: answer.teamName};
    },
    closeQuestion(code, questionCount) {
        questionCount++;

        if (questionCount < 12) {
            return ({type: CLOSE_QUESTION, questionCount: questionCount});
        }
        questionCount = 0;

        kwizzertWebSocket.closeRound(code);
        return ({type: CLOSE_ROUND, questionCount: questionCount});
    }
};

export default questionActionCreator;
