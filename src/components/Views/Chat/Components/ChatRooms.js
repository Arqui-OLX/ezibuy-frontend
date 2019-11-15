import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import ChatRoom from './ChatRoom';
import './ChatRoom.css';
//import axios from 'axios'

class ChatRooms extends Component {

    constructor(props) {
        super(props)

        this.handleChatRoomChange = this.handleChatRoomChange.bind(this);
    }
    
    handleChatRoomChange(id){
        this.props.handleChatRoomChange(id);
    }


    
    render() {
        return (
            <Container>
                {this.props.chatRooms.map(room => 
                    <ChatRoom                           
                        key={room.id}
                        id = {room.id} 
                        src="https://dummyimage.com/50x50/000/fff"
                        receiverName= {room.user} 
                        date={room.lastMessage.created_at}
                        lastMsg={room.lastMessage.message}
                        handleChatRoomChange = {this.handleChatRoomChange}
                    />
                )}
            </Container>
        )
    }
}

export default ChatRooms
