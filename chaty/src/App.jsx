import React, {Component} from 'react';
import ChatBar from './components/ChatBar.jsx';
import MessageList from './components/MessageList.jsx';


export default class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
            messages: [],
            notification: 'Notification sample'

        };

        this.enterMessage = this.enterMessage.bind(this);
        this.recieveMessage = this.recieveMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.updateCurrentUser = this.updateCurrentUser.bind(this);
    }


    sendMessage(data) {
        let chatMsgData = JSON.stringify(data);
        this.ws.send(chatMsgData)
    }


    enterMessage(content) {
        this.sendMessage({
            username: this.state.currentUser.name,
            content: content,
            type: 'text'
        });
    }


    recieveMessage(event) {
        let msgObj = JSON.parse( event.data)
        console.log( "messageObj recieved from server: ", msgObj);

        switch(msgObj.type) {
            case 'text':
                const messages = this.state.messages.concat(msgObj);
                this.setState({messages: messages});
                break;
            case 'notification':
                console.log("This is the app user change switch:")
                this.setState({notification: msgObj.content});
                break;
        }
    }

    updateCurrentUser(name) {
        console.log('update user: ', name)
        this.setState( {currentUser: { name: name}} );
        let userchangeObj = {
            currentUser: this.state.currentUser,
            type: 'notification',
            content: name
        };
        this.ws.send(JSON.stringify(userchangeObj));


    }

    componentDidMount() {
        this.ws = new WebSocket('ws://localhost:3001');
        this.ws.onopen = () => {
           // this.ws.send("Here's some text that the server is urgently awaiting!");
        };
        this.ws.onmessage = (wsMessage) =>{
            console.log(wsMessage);
            this.recieveMessage(wsMessage);
        }

        setTimeout(() => {
            this.setState({loading: true})  // change the state. this calls render() and the component updates.
        }, 500)
    }


    render() {
        return (
            <div>
                <MessageList messages={this.state.messages} notification={this.state.notification} ></MessageList>
                <ChatBar currentUser={this.state.currentUser} enterMessage={this.enterMessage} updateUser={this.updateCurrentUser} ></ChatBar>
            </div>
        );
    }


}





