"use strict";
const ws = require('ws');
const socketMap = new WeakMap();

module.exports.create = (httpServer) => {
    const server = new ws.Server({
        server: httpServer
    });
    setInterval(() => keepConnectionAlive(server), 15000);
    return server;
};

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

                case 'SEND_ANSWER':
                    sendAnswerToMasterAndScoreboard(wsServer, messageObject.teamName, messageObject.answer, messageObject.code);
                    break;

                case 'START_QUESTION':
                    sendStartQuestionNoticeToClients(wsServer, messageObject.code);
                    break;

                case 'STOP_QUESTION':
                    sendCloseQuestionNoticeToClients(wsServer, messageObject.code);
                    break;

                case 'SEND_RATING':
                    sendQuestionRatingToScoreboard(wsServer,
                        messageObject.teamName,
                        messageObject.answer,
                        messageObject.approved,
                        messageObject.code);
                    break;

                case 'FINISH_ROUND':
                    sendRoundFinishedNoticeToScoreboard(wsServer, messageObject.code);
                    break;

                case 'FINISH_QUIZ':
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
        if (clientInfo && clientInfo.code === quizcode && clientInfo.type === types.scoreboard) {
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
                action: 'SEND_RATING',
                teamName: team,
                answer: answer,
                approved: approved
            };
            client.send(JSON.stringify(message));
        }
    });
};

const sendAnswerToMasterAndScoreboard = (wsServer, team, answer, quizcode) => {
    wsServer.clients.forEach((client) => {
        const clientInfo = socketMap.get(client);
        if (clientInfo && clientInfo.code === quizcode && clientInfo.type !== types.team) {
            const message = {
                action: 'SEND_ANSWER',
                teamName: team,
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
                action: 'STOP_QUESTION'
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
                action: 'FINISH_ROUND'
            };
            client.send(JSON.stringify(message));
        }
    });
};

const sendQuizFinishedNoticeToClients = (wsServer, quizcode) => {
    wsServer.clients.forEach((client) => {
        const clientInfo = socketMap.get(client);
        if (clientInfo && clientInfo.code === quizcode && clientInfo.type === types.scoreboard) {
            const message = {
                action: 'FINISH_QUIZ'
            };
            client.send(JSON.stringify(message));
        }
    });
};


const keepConnectionAlive = (wsServer) => {
    wsServer.clients.forEach((client) => {
        if (client.readyState !== 2 && client.readyState !== 3) {
            client.send(JSON.stringify({ping: 'pong'}));
        }
    });
};

module.exports.configure = configure;