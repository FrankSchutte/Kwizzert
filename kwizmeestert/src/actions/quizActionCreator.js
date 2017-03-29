import {REQUEST_OPEN_QUIZ, RECEIVE_OPEN_QUIZ} from '../constants';
import KwizzertAPI from '../KwizzertAPI';

const QuizActionCreator = {
    openQuiz() {
        return (dispatch) => {
            dispatch({type: REQUEST_OPEN_QUIZ});
            KwizzertAPI.openQuiz((err, code) => {
                if (err) {
                    dispatch({type: RECEIVE_OPEN_QUIZ, success: false});
                } else {
                    dispatch({type: RECEIVE_OPEN_QUIZ, success: true, code});
                }
            });
        }
    }
};

export default QuizActionCreator;
