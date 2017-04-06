import registerActionCreator from './actions/registerActionCreator';
import questionActionCreator from './actions/questionActionCreator';

let url;
if(process.env.MONGODB_USERNAME && process.env.MONGODB_PASSWORD) {
    url = '/ws';
} else {
    url = 'ws://localhost:3001/ws';
}

let webSocket;

const kwizzertWebSocket = {
    init(store) {
        webSocket = new WebSocket(url);

        webSocket.onopen = () => {
            console.log('connected to server');
        };

        webSocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('received:', message);
            switch (message.action) {
                case 'KICK_TEAM':
                    store.dispatch(registerActionCreator.kick());
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
                default:
                    break;
            }
        };

        webSocket.onclose = () => {
            store.dispatch(registerActionCreator.kick());
            console.log('connection closed with server');
        };
    },
    register(code, teamName) {
        const message = {
            action: 'REGISTER',
            code: code,
            type: 'team',
            teamName: teamName
        };

        webSocket.send(JSON.stringify(message));
    },
    sendAnswer(code, teamName, answer) {
        const message = {
            action: 'SEND_ANSWER',
            code: code,
            teamName: teamName,
            answer: answer
        };

        webSocket.send(JSON.stringify(message));
    }
};

export default kwizzertWebSocket;
