const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuid = require('uuid/V1');

const PORT = 3001;



// Create a new express server
const server = express()
        .use(express.static('public'))
        .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

function socketSwitch(clientMsg, ws) {
    let clientMsgObj = JSON.parse(clientMsg);
    console.log(clientMsgObj);
    console.log(typeof clientMsgObj);

    switch(clientMsgObj.type) {
        case 'text':
            clientMsgObj.id = uuid();
            wss.clients.forEach( (client) => {
                if (client.readyState === WebSocket.OPEN ) {
                    client.send(JSON.stringify(clientMsgObj));
                }
            });
            break;
        case 'notification':
            let response = {
                type: 'notification',
                content: 'The user ' + clientMsgObj.currentUser.name + ' has changed their name to ' + clientMsgObj.content + '.' ,
                userName: 'Server Admin'
            };
            wss.clients.forEach( (client) => {
                if (client.readyState === WebSocket.OPEN ) {
                    client.send(JSON.stringify(response));
                }
            });
            break
    }
}

function sendClientNumber(numOfClients) {
    let notification = {
        type: 'notification',
        content: numOfClients +' chatters currently connected.',
        userName: 'Server Admin'
    };
    wss.clients.forEach( (client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(notification));
        }
    })
}


let numOfClients = 0;

wss.on('connection', (ws) => {
    console.log('Client connected');
    console.log('Number of clients: ', wss.clients.size);
    numOfClients = Number(numOfClients) + 1;
    sendClientNumber(numOfClients, ws);

    ws.on('message', (clientMessage) => {
        socketSwitch(clientMessage, ws);
    });

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => {
        console.log('Client disconnected');
        console.log(wss.clients.size);
        numOfClients = wss.clients.size;
        sendClientNumber(numOfClients);

    })


});