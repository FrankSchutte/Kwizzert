"use strict";
const ws = require('ws');

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
            const action = messageObject.action;
            const kwizcode = messageObject.code;

            if (action === 'REGISTER') {
                websocket.kwiz.code = kwizcode;
                websocket.kwiz.type = messageObject.type;
            } else {
                switch (action) {
                    case 'ADD_TEAM':
                        sendTeamToMaster(wsServer, messageObject.teamName, websocket.kwiz.code);
                        break;
                    case 'START_QUIZ':
                        sendMessageToRefusedTeams(wsServer, messageObject.teams, websocket.kwiz.code);
                        break;
                }
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
        if (client.kwiz.type === 'quizmaster' && client.kwiz.code === quizcode) {
            const message = {
                action: "ADD_TEAM",
                teamName: teamName
            };
            client.send(JSON.stringify(message));
        }
    });
}

function sendMessageToRefusedTeams(wsServer, teams, quizcode) {

}


module.exports.configure = configure;