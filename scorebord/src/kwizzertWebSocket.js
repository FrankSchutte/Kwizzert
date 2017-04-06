import routingActionCreator from './actions/routingActionCreator';
import questionActionCreator from './actions/questionActionCreator';
import teamsActionCreator from './actions/teamsActionCreator';

let webSocket;

const kwizzertWebSocket = {
    init (store) {
        webSocket = new WebSocket('ws://localhost:3001/ws');

        webSocket.onopen = () => {
            console.log('connected to server');
        };

        webSocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
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
                case 'SEND_RATING':
                    store.dispatch(questionActionCreator.showResults(message));
                    if (message.approved) {
                        store.dispatch(teamsActionCreator.addScore(message.teamName));
                    }
                    break;
                case 'FINISH_ROUND':
                    //ToDo Finish round
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