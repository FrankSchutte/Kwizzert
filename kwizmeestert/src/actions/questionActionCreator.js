import {REQUEST_QUESTIONS, RECEIVE_QUESTIONS, CHOOSE_QUESTION, TOGGLE_QUESTION_ACTIVITY, CONFIRM_ANSWER, TOGGLE_ANSWER, CLOSE_QUESTION} from '../constants';

import KwizzertAPI from '../kwizzertAPI';

const questionActionCreator = {
    fetchQuestions() {
        return (dispatch) => {
            dispatch({type: REQUEST_QUESTIONS});
            KwizzertAPI.fetchQuestions('DIEREN', (err, res) => {
                if(err) {
                    dispatch({type: RECEIVE_QUESTIONS, success: false});
                } else {
                    dispatch({type: RECEIVE_QUESTIONS, success: true, category: res.categoryName, questions: res.questions});
                }
            });
        };
    },
    chooseQuestion(question) {
        return {type: CHOOSE_QUESTION, question: question};
    },
    toggleQuestionActivity() {
        return {type: TOGGLE_QUESTION_ACTIVITY};
    },
    confirmAnswer(answer) {
        return {type: CONFIRM_ANSWER, answer: answer}
    },
    toggleAnswer(teamName) {
        return {type: TOGGLE_ANSWER, teamName: teamName};
    },
    closeQuestion(questionCount) {
        return {type: CLOSE_QUESTION};
    }
};

export default questionActionCreator;
