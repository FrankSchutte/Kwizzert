import teamActionCreator from './actions/teamActionCreator';
import questionActionCreator from './actions/questionActionCreator';

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

            switch (message.action) {
                case 'ADD_TEAM':
                    store.dispatch(teamActionCreator.addTeam(message.teamName));
                    break;
                case 'SEND_ANSWER':
                    const answer = {
                        teamName: message.teamName,
                        answer: message.answer
                    };

                    store.dispatch(questionActionCreator.sendAnswer(answer));
                    break;
                default:
                    break;
            }
        };
        webSocket.onclose = () => {
            console.log('connection closed with server');
        };
    },
    createQuiz(code) {
        const message = {
            action: 'REGISTER',
            code: code,
            type: 'quizmaster'
        };

        webSocket.send(JSON.stringify(message));
    },
    kickTeam(code, team) {
        const message = {
            action: 'KICK_TEAM',
            code: code,
            teamName: team.teamName
        };

        webSocket.send(JSON.stringify(message));
    },
    startQuiz(code, teams) {
        const message = {
            action: 'START_QUIZ',
            code: code,
            teams
        };

        webSocket.send(JSON.stringify(message));
    },
    pickQuestion(code, question) {
        const message = {
            action: 'PICK_QUESTION',
            code: code,
            questionId: question._id
        };

        webSocket.send(JSON.stringify(message));
    },
    startQuestion(code) {
        const message = {
            action: 'START_QUESTION',
            code: code
        };

        webSocket.send(JSON.stringify(message));
    },
    rateAnswer(code, answer, approved) {
        const message = {
            action: 'SEND_RATING',
            code: code,
            teamName: answer.teamName,
            answer: answer.answer,
            approved: approved
        };

        webSocket.send(JSON.stringify(message));
    },
    stopQuestion(code) {
        const message = {
            action: 'STOP_QUESTION',
            code: code
        };

        webSocket.send(JSON.stringify(message));
    },
    roundFinished(code) {
        const message = {
            action: 'ROUND_FINISHED',
            code: code
        };

        webSocket.send(JSON.stringify(message));
    }
};

export default kwizzertWebSocket;
