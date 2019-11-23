import React, { Component } from 'react';
import './ChatRoom.css';

class ChatRoom extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }
    

    handleClick(){
        
        this.props.handleChatRoomChange(this.props.id);

    }

    render() {
        return (
            <div className="chat_list chat-room-div" onClick={this.handleClick}>
                <div className="chat_people">
                    <div className="chat_img"><img src={this.props.src} alt=":)"/></div>
                    <div className="chat_ib">
                        <h5> {this.props.receiverName /*esto obtiene el Id del usuario*/} <span className="chat_date">{this.props.date}</span></h5>
                        <p> {this.props.lastMsg} </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatRoom
