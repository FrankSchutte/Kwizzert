import routingActionCreator from './actions/routingActionCreator';
import questionActionCreator from './actions/questionActionCreator';
import teamsActionCreator from './actions/teamsActionCreator';

const url = location.origin.replace(/^http/, 'ws');

let webSocket;

const kwizzertWebSocket = {
    init (store) {
        webSocket = new WebSocket(url);

        webSocket.onopen = () => {
            console.log('connected to server');
        };

        webSocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('received:' + message);
            switch (message.action) {
                case 'START_QUIZ':
                    store.dispatch(teamsActionCreator.addTeams(message.teams));
                    store.dispatch(routingActionCreator.startQuiz());
                    break;
                case 'PICK_QUESTION':
                    store.dispatch(questionActionCreator.fetchQuestion(message.questionId));
                    break;
                case 'START_QUESTION':
                    store.dispatch(questionActionCreator.startQuestion());
                    break;
                case 'STOP_QUESTION':
                    store.dispatch(questionActionCreator.stopQuestion());
                    break;
                case 'SEND_ANSWER':
                    store.dispatch(questionActionCreator.addAnswers(message));
                    break;
                case 'SEND_RATING':
                    store.dispatch(questionActionCreator.addResults(message));
                    store.dispatch(teamsActionCreator.addScore(message));
                    break;
                case 'FINISH_ROUND':
                    store.dispatch(teamsActionCreator.calculateScore());
                    break;
                case 'FINISH_QUIZ':
                    store.dispatch(teamsActionCreator.calculateScore());
                    store.dispatch(routingActionCreator.finishQuiz());
            }
        };
    },

    register(code) {
        const message = {
            action: 'REGISTER',
            code: code,
            type: 'scoreboard'
        };
        webSocket.send(JSON.stringify(message));
    }
};

export default kwizzertWebSocket;