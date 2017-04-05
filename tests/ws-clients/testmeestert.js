var socket;
var connect_button = document.getElementById('connect_button');
var register_button = document.getElementById('register_button');
var kick_team_button = document.getElementById('kick_team_button');
var start_button = document.getElementById('start_button');
var pick_button = document.getElementById('pick_button');
var start_question_button = document.getElementById('start_question_button');
var close_question_button = document.getElementById('close_question_button');
var rate_answer_button = document.getElementById('rate_answer_button');
var finish_round_button = document.getElementById('finish_round_button');
var finish_quiz_button = document.getElementById('finish_quiz_button');
var status_header = document.getElementById('status');

const createSocket = () => {
    socket = new WebSocket('ws://localhost:3001/ws');

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        switch(data.action) {
            case 'ADD_TEAM':
                status_header.innerHTML = 'Added team: ' + data.teamName;
                break;

            case 'SEND_ANSWER':
                status_header.innerHTML = 'Team: ' + data.teamName + '</br>Answer: ' + data.answer;
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
        type: 'quizmaster'
    };
    socket.send(JSON.stringify(msg));
    status_header.innerHTML = 'Registered at server';
};

kick_team_button.onclick = (event) => {
    event.preventDefault();
    const msg = {
        action: 'KICK_TEAM',
        code: 'kaas',
        teamName: 'test'
    };
    socket.send(JSON.stringify(msg));
    status_header.innerHTML =  'Kicked team: test';
};

start_button.onclick = (event) => {
    event.preventDefault();
    const msg = {
        action: 'START_QUIZ',
        code: 'kaas',
        teams: [
            {
                teamName: 'test'
            }
        ]
    };
    socket.send(JSON.stringify(msg));
    status_header.innerHTML = 'Quiz started';
};

pick_button.onclick = (event) => {
    event.preventDefault();
    const msg = {
        action: 'PICK_QUESTION',
        code: 'kaas',
        questionId: 1
    };
    socket.send(JSON.stringify(msg));
    status_header.innerHTML = 'Picked question 1';
};

start_question_button.onclick = (event) => {
    event.preventDefault();
    const msg = {
        action: 'START_QUESTION',
        code: 'kaas'
    };
    socket.send(JSON.stringify(msg));
    status_header.innerHTML = 'Started question';
};

close_question_button.onclick = (event) => {
    event.preventDefault();
    const msg = {
        action: 'STOP_QUESTION',
        code: 'kaas'
    };
    socket.send(JSON.stringify(msg));
    status_header.innerHTML = 'Closed question';
};

rate_answer_button.onclick = (event) => {
    event.preventDefault();
    const msg = {
        action: 'SEND_RATING',
        code: 'kaas',
        teamName: 'test',
        answer: 'test answer',
        approved: true
    };
    socket.send(JSON.stringify(msg));
    status_header.innerHTML = 'Rated answer';
};

finish_round_button.onclick = (event) => {
    event.preventDefault();
    const msg = {
        action: 'FINISH_ROUND',
        code: 'kaas'
    };
    socket.send(JSON.stringify(msg));
    status_header.innerHTML = 'Round finished';
};

finish_quiz_button.onclick = (event) => {
    event.preventDefault();
    const msg = {
        action: 'FINISH_QUIZ',
        code: 'kaas'
    };
    socket.send(JSON.stringify(msg));
    status_header.innerHTML = 'Quiz finished';
};











