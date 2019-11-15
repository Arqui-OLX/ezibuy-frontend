import React, { Component } from 'react';
import ChatMessage from './ChatMessage';
//import axios from 'axios';

class ChatRoomMessages extends Component {


    render() {
        return (
            <div className="d-flex flex-column w-100">

                { !!this.props.messages && this.props.messages.map(msg => 
                    <ChatMessage                            
                        key={msg._id}
                        id = {msg._id} 
                        senderId= {msg.userID} 
                        msg={msg.message}
                        isLeft={msg.userID === this.props.myId ? false : true}
                        
                    />
                )}
            </div>
        )
    }
}

export default ChatRoomMessages
