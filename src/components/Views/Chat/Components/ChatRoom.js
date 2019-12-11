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

        const id = JSON.parse(localStorage.getItem("userInfo")).userId;
        const UrlImageProfile = 'http://35.209.82.198:3000/user-images';

        axios.get(UrlImageProfile+"/byid/"+id)
        .then(element=>{
            
            this.setState({ 
                imageProfile:  element.data[0].user_image,
              })
            console.log(this.state.imageId);
            
        }).catch( (error) =>{
        if(error.status === 404){
            console.log("error 404, no encontrada la imagen");
        }
        });

    }

    

    render() {

        let d = new Date(this.props.date);
        let dformat = [d.getMonth()+1,
        d.getDate(),
        d.getFullYear()].join('/')+' '+
        [d.getHours(),
        d.getMinutes(),
        d.getSeconds()].join(':');


        return (
            <div className="chat_list chat-room-div" onClick={this.handleClick}>
                <div className="chat_people">
                    <div className="chat_img"><img src={'http://35.209.82.198:3000/'+this.state.imageProfile} alt=":)"/></div>
                    <div className="chat_ib">
                        <h5> {this.state.nickname} <span className="chat_date">{dformat}</span></h5>
                        <p> {this.props.lastMsg} </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatRoom
