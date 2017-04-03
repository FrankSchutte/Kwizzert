var socket;
var button = document.getElementById('button');
var button2 = document.getElementById('button2');

const createSocket = () => {
    socket = new WebSocket('ws://localhost:3001/ws');

    socket.onmessage = (event) => {
        console.log(JSON.parse(event.data));
    }
};

button.onclick = (event) => {
    event.preventDefault();
    createSocket();
};

button2.onclick = (event) => {
    event.preventDefault();
    buttonClick();
};

buttonClick = () => {
    const msg = {
        action: 'REGISTER',
        code: 'kaas',
        type: 'team',
        teamName: 'test'
    };
    socket.send(JSON.stringify(msg));
};