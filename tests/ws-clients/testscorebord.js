var socket;
var connect_button = document.getElementById('connect_button');
var register_button = document.getElementById('register_button');
var status_header = document.getElementById('status');

const createSocket = () => {
    socket = new WebSocket('ws://localhost:3001/ws');

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        switch(data.action) {
            case 'START_QUIZ':
                status_header.innerHTML = 'Started quiz with ' + data.teams.length +' teams';
                break;

            case 'PICK_QUESTION':
                status_header.innerHTML = 'Picked question ' + data.questionId;
                break;

            case 'START_QUESTION':
                status_header.innerHTML = 'Question started';
                break;

            case 'CLOSE_QUESTION':
                status_header.innerHTML = 'Question closed';
                break;

            case 'RATE_ANSWER':
                status_header.innerHTML = 'Team: ' + data.teamName +
                        '<br/>Answer: ' + data.answer +
                        '<br/>Approved: ' + data.approved;
                break;

            case 'ROUND_FINISHED':
                status_header.innerHTML = 'Round finished';
                break;

            case 'QUIZ_FINISHED':
                status_header.innerHTML = 'Quiz finished';
                break;

            default:
                break;
        }
    }
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
        type: 'scoreboard'
    };
    socket.send(JSON.stringify(msg));
    status_header.innerHTML = 'Registered at server';
};