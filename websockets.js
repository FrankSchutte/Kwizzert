"use strict";
const ws = require('ws');
const socketMap = new WeakMap();

module.exports.create = (httpServer) => (
    new ws.Server({
        server: httpServer,
        path: '/ws'
    })
);

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
                    socketMap.set(websocket, newClientInfo);
                    break;

                case 'ADD_TEAM':
                    const clientInfo = socketMap.get(websocket);
                    clientInfo.teamName = messageObject.teamName;
                    sendTeamToMaster(wsServer, clientInfo.teamName, clientInfo.code);
                    break;

                case 'START_QUIZ':
                    sendMessageToRefusedTeams(wsServer, messageObject.teams, messageObject.code);
                    break;

                case 'PICK_QUESTION':
                    sendQuestionIdToClients(wsServer, messageObject.questionId, messageObject.code);
                    break;

                case 'START_QUESTION':
                    sendStartQuestionNoticeToClients(wsServer, messageObject.code);
                    break;

                case 'RATE_ANSWER':
                    // sendQuestionRatingToScoreboard(wsServer,
                    //     messageObject.answer,
                    //     messageObject.team,
                    //     messageObject.approved,
                    //     messageObject.code);
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

function sendTeamToMaster(wsServer, teamName, quizcode) {
    wsServer.clients.forEach((client) => {
        const clientInfo = socketMap.get(client);
        if (clientInfo.code === quizcode && clientInfo.type === 'quizmaster') {
            const message = {
                action: 'ADD_TEAM',
                teamName: teamName
            };
            client.send(JSON.stringify(message));
        }
    });
}

function sendMessageToRefusedTeams(wsServer, teams, quizcode) {
    teams.forEach((team) => {
        if (!team.allowed) {
            wsServer.clients.forEach((client) => {
                const clientInfo = socketMap.get(client);
                if (clientInfo.code === quizcode &&
                    clientInfo.type === 'team' &&
                    clientInfo.teamName === team.teamName) {
                    client.close();
                }
            });
        }
    });
}


function sendQuestionIdToClients(wsServer, questionId, quizcode) {
    wsServer.clients.forEach((client) => {
        const clientInfo = socketMap.get(client);
        if (clientInfo.code === quizcode && clientInfo.type !== 'quizmaster') {
            const message = {
                action: 'PICK_QUESTION',
                questionId: questionId
            };
            client.send(JSON.stringify(message));
        }
    });
}

function sendStartQuestionNoticeToClients(wsServer, quizcode) {
    wsServer.clients.forEach((client) => {
        const clientInfo = socketMap.get(client);
        if (clientInfo.code === quizcode && clientInfo.type !== 'quizmaster') {
            const message = {
                action: 'START_QUESTION'
            };
            client.send(JSON.stringify(message));
        }
    });
}


























module.exports.configure = configure;