import React, {Component} from 'react';








export default class ChatBar extends Component {

    constructor() {
        super();
    }


    onTextChange(event) {
        let content = event.target.value;
        if (content && (event.key === 'Enter')) {
            this.props.enterMessage(content);
            event.target.value = '';
        }
    }


    onUserTextChange(event) {
        let content = event.target.value;
        console.log(event.key)
        if (content && (event.key === 'Enter')) {
            this.props.updateUser(content);
        }
    }


    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username" defaultValue={this.props.currentUser.name} onKeyDown={ (event) => this.onUserTextChange(event)} />
                <input className="chatbar-message" onKeyDown={ (event) => this.onTextChange(event)} placeholder="Type a message and hit ENTER"/>
            </footer>
        );
    }

}
