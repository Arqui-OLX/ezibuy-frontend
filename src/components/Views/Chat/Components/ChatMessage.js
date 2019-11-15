import React, { Component } from 'react'
import '../chat.css';


export class ChatMessage extends Component {
    render() {
        return (
            <div class={(this.props.isLeft ? "incoming_msg" : "outgoing_msg")}>
                <div class={(this.props.isLeft ? "received_msg" : "sent_msg")}>
                    <div class={(this.props.isLeft ? "received_withd_msg" : "")}>
                        <p>{this.props.msg}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatMessage
