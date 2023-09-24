import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://localhost:8000');

function SocketIo() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };

        client.onmessage = (msg) => {
            const messageData = msg.data;
            if (typeof messageData === 'string') {
                setMessages((prevMessages) => [...prevMessages, messageData]);
            } else if (messageData instanceof Blob) {
                const reader = new FileReader();
                reader.onload = function () {
                    const text = reader.result;
                    setMessages((prevMessages) => [...prevMessages, text]);
                };
                reader.readAsText(messageData);
            }
        };
    }, [messages]);

    const renderMessage = messages.map((msg, index) => {
        return (
            <p key = {index}>{msg}</p>
        )
    })

    return (
        <div className="App">
            <h1>WebSocket Client</h1>
            <div>
                {renderMessage}
            </div>
      </div>
    );
}

export default SocketIo;
