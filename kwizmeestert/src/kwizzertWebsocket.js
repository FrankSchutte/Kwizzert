import questionActionCreator from './actions/questionActionCreator';
import {dispatch} from "redux";

import {CONFIRM_ANSWER} from './constants';

const webSocket = new WebSocket('ws://localhost:3000/ws');

webSocket.onopen = () => {
    console.log('connected to server');
};

webSocket.onmessage = (event) => {
    const message = JSON.parse(event.data);

    switch (message.action) {
        case CONFIRM_ANSWER:
            const answer = {team: message.team, answer: message.answer};
            dispatch(questionActionCreator.confirmAnswer(answer));
            break;
        default:
            break;
    }
};

webSocket.onclose = () => {
    console.log('connection closed with server');
};

export default webSocket;
