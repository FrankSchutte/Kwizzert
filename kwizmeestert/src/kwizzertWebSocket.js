import teamActionCreator from './actions/teamActionCreator';
import questionActionCreator from './actions/questionActionCreator';

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
                case 'ADD_TEAM':
                    store.dispatch(teamActionCreator.addTeam(message.teamName));
                    break;
                case 'CONFIRM_ANSWER':
                    const answer = {
                        teamName: message.teamName,
                        answer: message.answer
                    };

                    store.dispatch(questionActionCreator.confirmAnswer(answer));
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
    rateAnswer(code, answer) {
        const message = {
            action: 'RATE_ANSWER',
            code: code,
            teamName: answer.teamName,
            answer: answer.answer,
            approved: answer.approved
        };

        webSocket.send(JSON.stringify(message));
    },
    closeQuestion(code) {
        const message = {
            code: code
        };

        webSocket.send(JSON.stringify(message));
    },
    closeRound(code) {
        const message = {
            action: 'CLOSE_ROUND',
            code: code
        };

        webSocket.send(JSON.stringify(message));
    }
};

export default kwizzertWebSocket;
