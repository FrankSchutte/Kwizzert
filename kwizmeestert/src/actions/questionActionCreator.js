import {CHOOSE_QUESTION, TOGGLE_QUESTION_ACTIVITY, TOGGLE_ANSWER, CLOSE_QUESTION} from '../constants';

const questionActionCreator = {
    chooseQuestion(question) {
        return {type: CHOOSE_QUESTION, question: question};
    },
    toggleQuestionActivity() {
        return {type: TOGGLE_QUESTION_ACTIVITY};
    },
    toggleAnswer(teamName) {
        return {type: TOGGLE_ANSWER, teamName: teamName};
    },
    closeQuestion(questionCount) {
        return {type: CLOSE_QUESTION, questionCount: questionCount};
    }
};

export default questionActionCreator;
