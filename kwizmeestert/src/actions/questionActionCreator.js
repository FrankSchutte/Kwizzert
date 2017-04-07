import {
    PENDING_QUESTIONS,
    RECEIVE_QUESTIONS,
    CHOOSE_QUESTION,
    TOGGLE_QUESTION_ACTIVITY,
    SEND_ANSWER,
    STOP_QUESTION,
    ROUND_FINISHED
} from '../constants';

import kwizzertAPI from '../kwizzertAPI';
import kwizzertWebSocket from '../kwizzertWebSocket';

const questionActionCreator = {
    fetchQuestions(categories) {
        return (dispatch) => {
            dispatch({type: PENDING_QUESTIONS});
            categories.forEach((category) => {
                kwizzertAPI.fetchQuestions(category.categoryName, (err, res) => {
                    if (err) {
                        dispatch({type: RECEIVE_QUESTIONS, success: false});
                    } else {
                        dispatch({
                            type: RECEIVE_QUESTIONS,
                            success: true,
                            categoryName: res.category,
                            questions: res.questions
                        });
                    }
                });
            });
        };
    },
    selectQuestion(code, question) {
        kwizzertWebSocket.pickQuestion(code, question);
        return {type: CHOOSE_QUESTION, question: question};
    },
    toggleActivity(code, active) {
        if(active) {
            kwizzertWebSocket.stopQuestion(code);
        } else {
            kwizzertWebSocket.startQuestion(code);
        }
        return {type: TOGGLE_QUESTION_ACTIVITY};
    },
    sendAnswer(answer) {
        return {type: SEND_ANSWER, answer: answer}
    },
    stopQuestion(code, questionCount) {
        questionCount++;
        kwizzertWebSocket.stopQuestion(code);

        if (questionCount >= 12) {
            questionCount = 0;
            kwizzertWebSocket.roundFinished(code);
            return ({type: ROUND_FINISHED, questionCount: questionCount});
        }
        return ({type: STOP_QUESTION, questionCount: questionCount});
    }
};

export default questionActionCreator;
