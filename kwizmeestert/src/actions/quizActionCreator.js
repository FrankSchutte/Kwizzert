import {REQUEST_OPEN_QUIZ, SUCCESS_OPEN_QUIZ, ERROR_OPEN_QUIZ, START_QUIZ} from '../constants';
import KwizzertAPI from '../kwizzertAPI';

const QuizActionCreator = {
    openQuiz() {
        return (dispatch) => {
            dispatch({type: REQUEST_OPEN_QUIZ});
            KwizzertAPI.openQuiz((err, code) => {
                if (err) {
                    dispatch({type: ERROR_OPEN_QUIZ});
                } else {
                    dispatch({type: SUCCESS_OPEN_QUIZ, code});
                }
            });
        }
    },
    startQuiz() {
        return {type: START_QUIZ};
    }
};

export default QuizActionCreator;
