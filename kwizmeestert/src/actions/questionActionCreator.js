import {
    PENDING_QUESTIONS,
    RECEIVE_QUESTIONS,
    CHOOSE_QUESTION,
    TOGGLE_QUESTION_ACTIVITY,
    SEND_ANSWER,
    TOGGLE_ANSWER,
    STOP_QUESTION,
    ROUND_FINISHED
} from '../constants';

import kwizzertAPI from '../kwizzertAPI';
import kwizzertWebSocket from '../kwizzertWebSocket';

const questionActionCreator = {
    fetchQuestions() {
        return (dispatch) => {
            dispatch({type: PENDING_QUESTIONS});
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
    toggleActivity(code, active) {
        if(active) {
            kwizzertWebSocket.stopQuestion(code);
        } else {
            kwizzertWebSocket.startQuestion(code);
        }
        return {type: TOGGLE_QUESTION_ACTIVITY};
    },
    confirmAnswer(answer) {
        return {type: SEND_ANSWER, answer: answer}
    },
    toggleAnswer(code, answer) {
        //TODO the reducer need to run first, then the webSocket must send a signal, should i use thunk here?
        kwizzertWebSocket.rateAnswer(code, answer);
        return {type: TOGGLE_ANSWER, teamName: answer.teamName};
    },
    stopQuestion(code, questionCount) {
        console.log('stopping question');
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
