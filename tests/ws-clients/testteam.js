var socket;
var connect_button = document.getElementById('connect_button');
var register_button = document.getElementById('register_button');
var confirm_button = document.getElementById('confirm_button');
var status_header = document.getElementById('status');

const createSocket = () => {
    socket = new WebSocket('ws://localhost:3001/ws');

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        switch(data.action) {
            case 'PICK_QUESTION':
                status_header.innerHTML = 'Picked question ' + data.questionId;
                break;

            case 'START_QUESTION':
                status_header.innerHTML = 'Question started';
                break;

            case 'STOP_QUESTION':
                status_header.innerHTML = 'Question closed';
                break;

            case 'QUIZ_FINISHED':
                status_header.innerHTML = 'Quiz finished';
                break;

            default:
                break;
        }
    };

    socket.onclose = (event) => {
        console.log("Connection closed");
        status_header.innerHTML = 'Kicked from server';
    };
};

connect_button.onclick = (event) => {
    event.preventDefault();
    createSocket();
    status_header.innerHTML = 'Connected to server';
};

register_button.onclick = (event) => {
    event.preventDefault();
    const msg = {
        action: 'REGISTER',
        code: 'kaas',
        type: 'team',
        teamName: 'test'
    };
    socket.send(JSON.stringify(msg));
    status_header.innerHTML = 'Registered at master';
};

confirm_button.onclick = (event) => {
    event.preventDefault();
    const msg = {
        action: 'SEND_ANSWER',
        code: 'kaas',
        teamName: 'test',
        answer: 'test answer'
    };
    socket.send(JSON.stringify(msg));
    status_header.innerHTML = 'Send answer';
};