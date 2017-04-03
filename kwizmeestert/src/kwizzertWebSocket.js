import {ADD_TEAM, CONFIRM_ANSWER} from './constants';
import teamActionCreator from './actions/teamActionCreator';

export let webSocket;

export function initWebSocket(store) {
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
            default:
                break;
        }
    };

    webSocket.onclose = () => {
       console.log('connection closed with server');
    };
}
