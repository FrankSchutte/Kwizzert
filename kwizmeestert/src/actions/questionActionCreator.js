import {
    PENDING_QUESTIONS,
    RECEIVE_QUESTIONS,
    CHOOSE_QUESTION,
    TOGGLE_QUESTION_ACTIVITY,
    SEND_ANSWER,
    STOP_QUESTION,
    FINISH_ROUND
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
        if (active) {
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
        return (dispatch) => {
            questionCount++;
            kwizzertWebSocket.stopQuestion(code);
            dispatch({type: STOP_QUESTION, questionCount: questionCount});

            if (questionCount >= 2) {
                kwizzertWebSocket.roundFinished(code);
                dispatch({type: FINISH_ROUND});
            }
        }
    }
};

export default questionActionCreator;
