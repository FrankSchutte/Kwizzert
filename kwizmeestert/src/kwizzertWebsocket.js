const webSocket = new WebSocket('ws://localhost:3000/ws');

webSocket.onopen = () => {
    console.log('connected to server');
};

webSocket.onmessage = (event) => {
    const message = JSON.parse(event.data);

    switch (message.action) {
        case 'ADD_TEAM':

            break;
        default:
            break;
    }
};

export default webSocket;
