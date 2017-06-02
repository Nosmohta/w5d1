import React, {Component} from 'react';



export default class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameStyle: 'color:'
        }
    }



    render() {
        let nameStyle = {
            color: this.props.style,
        };

        console.log( typeof (this.props.style))
        console.log( this.props.style)


        return (
            <div>
                <span className="message-username"  style={nameStyle}> {this.props.userName} </span>
                <span className="message-content"> {this.props.content}</span>
            </div>
        );
    }
};
