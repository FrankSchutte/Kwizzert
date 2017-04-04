import {START_QUIZ, FINISH_QUIZ} from '../constants';

const routingActionCreator = {
    startQuiz() {
        return {type: START_QUIZ};
    },
    finishQuiz() {
        return {type: FINISH_QUIZ};
    }
};

export default routingActionCreator;