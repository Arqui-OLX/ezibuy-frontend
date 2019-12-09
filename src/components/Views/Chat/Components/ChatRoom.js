import React, { Component } from 'react';
import './ChatRoom.css';
import axios from 'axios';

class ChatRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nickname: ""
        }
        this.handleClick = this.handleClick.bind(this);
    }
    

    handleClick(){
        
        this.props.handleChatRoomChange(this.props.id);

    }

    componentWillMount() {

        const urlGraphql = 'http://35.208.164.215:4000';

        const query = {"query":`{
                    profileByID(profile_id: ${this.props.receiverName}) {
                        nickname  
                    } 
                } `};
        
        const options = {
            method: 'POST',
            data: query,
            url: urlGraphql,
        };

        axios(options)
        .then(res => {
            console.log(res.data.data.profileByID);
            this.setState({
                nickname: res.data.data.profileByID.nickname
            });

        });

    }

    

    render() {


        return (
            <div className="chat_list chat-room-div" onClick={this.handleClick}>
                <div className="chat_people">
                    <div className="chat_img"><img src={this.props.src} alt=":)"/></div>
                    <div className="chat_ib">
                        <h5> {this.state.nickname} <span className="chat_date">{this.props.date}</span></h5>
                        <p> {this.props.lastMsg} </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatRoom
