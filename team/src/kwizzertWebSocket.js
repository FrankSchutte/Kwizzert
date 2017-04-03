let webSocket;

if (!webSocket) {
    webSocket = new WebSocket('ws://localhost:3001/ws');

    webSocket.onopen = () => {
        console.log('connected to server');
    };

    webSocket.onclose = () => {
        console.log('connection closed with server');
    };
}

export default webSocket;
