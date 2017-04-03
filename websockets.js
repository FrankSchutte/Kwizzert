"use strict";
const ws = require('ws');
const socketMap = new WeakMap();

module.exports.create = (httpServer) => (
    new ws.Server({
        server: httpServer,
        port: 3001,
        path: '/ws'
    })
);

const types = {
    scoreboard: 'scoreboard',
    quizmaster: 'quizmaster',
    team: 'team'
};

const configure = (wsServer) => {
    wsServer.on('connection', (websocket) => {
        console.log("Connection created");

        websocket.on('message', (message) => {
            console.log(message);
            const messageObject = JSON.parse(message);

            switch (messageObject.action) {

                case 'REGISTER':
                    const newClientInfo = {
                        code: messageObject.code,
                        type: messageObject.type
                    };
                    if (messageObject.teamName) {
                        newClientInfo.teamName = messageObject.teamName;
                        sendTeamToMaster(wsServer, newClientInfo.teamName, newClientInfo.code);
                    }
                    socketMap.set(websocket, newClientInfo);
                    break;

                case 'KICK_TEAM':
                    sendMessageToRefusedTeam(wsServer, messageObject.teamName, messageObject.code);
                    break;

                case 'START_QUIZ':
                    sendTeamsToScoreboard(wsServer, messageObject.teams, messageObject.code);
                    break;

                case 'PICK_QUESTION':
                    sendQuestionIdToClients(wsServer, messageObject.questionId, messageObject.code);
                    break;

                case 'CONFIRM_ANSWER':
                    sendAnswerToMaster(wsServer, messageObject.teamName, messageObject.answer, messageObject.code);
                    break;

                case 'START_QUESTION':
                    sendStartQuestionNoticeToClients(wsServer, messageObject.code);
                    break;

                case 'CLOSE_QUESTION':
                    sendCloseQuestionNoticeToClients(wsServer, messageObject.code);
                    break;

                case 'RATE_ANSWER':
                    sendQuestionRatingToScoreboard(wsServer,
                        messageObject.answer,
                        messageObject.team,
                        messageObject.approved,
                        messageObject.code);
                    break;

                case 'ROUND_FINISHED':
                    sendRoundFinishedNoticeToScoreboard(wsServer, messageObject.code);
                    break;

                case 'QUIZ_FINISHED':
                    sendQuizFinishedNoticeToClients(wsServer, messageObject.code);
                    break;
            }
        });

        websocket.on('close', () => {
            console.log("Connection closed");
            if (websocket.timeoutObject) {
                clearTimeout(websocket.timeoutObject);
            }
        });
    })
};

const sendTeamToMaster = (wsServer, teamName, quizcode) => {
    wsServer.clients.forEach((client) => {
        const clientInfo = socketMap.get(client);
        if (clientInfo && clientInfo.code === quizcode && clientInfo.type === types.quizmaster) {
            const message = {
                action: 'ADD_TEAM',
                teamName: teamName
            };
            client.send(JSON.stringify(message));
        }
    });
};

const sendTeamsToScoreboard = (wsServer, teams, quizcode) => {
    wsServer.clients.forEach((client) => {
        const clientInfo = socketMap.get(client);
        if (clientInfo && clientInfo.code === quizcode && clientInfo.type === type.scoreboard) {
            const message = {
                action: 'START_QUIZ',
                teams: teams
            };
            client.send(JSON.stringify(message));
        }
    });
};

const sendMessageToRefusedTeam = (wsServer, teamName, quizcode) => {
    wsServer.clients.forEach((client) => {
        const clientInfo = socketMap.get(client);
        if (clientInfo &&
            clientInfo.code === quizcode &&
            clientInfo.type === types.team &&
            clientInfo.teamName === teamName) {
            client.close();
        }
    });
};


const sendQuestionIdToClients = (wsServer, questionId, quizcode) => {
    wsServer.clients.forEach((client) => {
        const clientInfo = socketMap.get(client);
        if (clientInfo && clientInfo.code === quizcode && clientInfo.type !== types.quizmaster) {
            const message = {
                action: 'PICK_QUESTION',
                questionId: questionId
            };
            client.send(JSON.stringify(message));
        }
    });
};

const sendStartQuestionNoticeToClients = (wsServer, quizcode) => {
    wsServer.clients.forEach((client) => {
        const clientInfo = socketMap.get(client);
        if (clientInfo && clientInfo.code === quizcode && clientInfo.type !== types.quizmaster) {
            const message = {
                action: 'START_QUESTION'
            };
            client.send(JSON.stringify(message));
        }
    });
};

const sendQuestionRatingToScoreboard = (wsServer, team, answer, approved, quizcode) => {
    wsServer.clients.forEach((client) => {
        const clientInfo = socketMap.get(client);
        if (clientInfo && clientInfo.code === quizcode && clientInfo.type === types.scoreboard) {
            const message = {
                action: 'RATE_ANSWER',
                team: team,
                answer: answer,
                approved: approved
            };
            client.send(JSON.stringify(message));
        }
    });
};

const sendAnswerToMaster = (wsServer, team, answer, quizcode) => {
    wsServer.clients.forEach((client) => {
        const clientInfo = socketMap.get(client);
        if (clientInfo && clientInfo.code === quizcode && clientInfo.type === types.quizmaster) {
            const message = {
                action: 'CONFIRM_ANSWER',
                team: team,
                answer: answer
            };
            client.send(JSON.stringify(message));
        }
    });
};

const sendCloseQuestionNoticeToClients = (wsServer, quizcode) => {
    wsServer.clients.forEach((client) => {
        const clientInfo = socketMap.get(client);
        if (clientInfo && clientInfo.code === quizcode && clientInfo.type !== types.quizmaster) {
            const message = {
                action: 'CLOSE_QUESTION'
            };
            client.send(JSON.stringify(message));
        }
    });
};

const sendRoundFinishedNoticeToScoreboard = (wsServer, quizcode) => {
    wsServer.clients.forEach((client) => {
        const clientInfo = socketMap.get(client);
        if (clientInfo && clientInfo.code === quizcode && clientInfo.type === types.scoreboard) {
            const message = {
                action: 'ROUND_FINISHED'
            };
            client.send(JSON.stringify(message));
        }
    });
};

const sendQuizFinishedNoticeToClients = (wsServer, quizcode) => {
    wsServer.clients.forEach((client) => {
        const clientInfo = socketMap.get(client);
        if (clientInfo && clientInfo.code === quizcode && clientInfo.type !== types.quizmaster) {
            const message = {
                action: 'QUIZ_FINISHED'
            };
            client.send(JSON.stringify(message));
        }
    });
};

module.exports.configure = configure;