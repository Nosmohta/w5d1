import React, {Component} from 'react';
import Message from './Message.jsx'
import Notification from "./Notification.jsx";



export default class MessageList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentUserNames: {},
            availableColours: [ '#660066', '#000066', 'ff0000', '#00cc00' ]
        }
    }

    render() {
        let activeUsersColours = {}

        const messages = this.props.messages.map( (message) =>  {
            console.log(message.username);

            if (!activeUsersColours.hasOwnProperty(message.username)) {
                let count = Object.keys(activeUsersColours).length;
                console.log('count: ', count);
                activeUsersColours[message.username] = this.state.availableColours[count];
            }

            return <Message
                className="message"
                content={message.content}
                userName={message.username}
                key={message.id }
                style={activeUsersColours[message.username]}
                />
            });

        console.log('about to create elements: ', activeUsersColours);

        return (
            <main className="messages">
                <div>
                    {messages}
                </div>
                <Notification notification={this.props.notification} >
                </Notification>
            </main>
        );
    }
}
