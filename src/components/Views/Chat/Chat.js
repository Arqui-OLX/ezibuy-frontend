import React, {Component} from 'react';
//import Container from 'react-bootstrap/Container';
import ChatRoomMessages from './Components/ChatRoomMessages';
import ChatRooms from './Components/ChatRooms';
import io from 'socket.io-client';
import axios from 'axios';
import ProfileNavBar from '../profile/ProfileNavBar';
import './Components/ChatRoom.css';


import './chat.css';

class App extends Component {

    constructor(props) {
        super(props)
    
        //this.handleChatRoomMessagesChange= this.handleChatRoomMessagesChange.bind(this);
        this.handleChatRoomChange = this.handleChatRoomChange.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleTextBoxChange = this.handleTextBoxChange.bind(this);
  
    }
    
    //My id =  (userId)
    state = {
        roomId: "",
        myId: JSON.parse(localStorage.getItem("userInfo")).userId,
        textBoxValue: "",
        messages: [],
        chatRooms: []

    }

    componentDidMount(){
        //Load all rooms
        axios.get("http://35.206.116.17:3001/"+ this.state.myId +"/room")
        .then(response => {
            const chatRooms = response.data;
            this.setState({chatRooms});  

            //after load all rooms, subscribe all of them and listen each
            var i
            for(i=0;i<chatRooms.length;i++){
                var id= chatRooms[i].id
                var socket = io('http://35.206.116.17:3001');
                socket.emit("subscribe", id);
                socket.on('conversation private post', (data ) => {
                    //if i receive some message add it to my state 
                    console.log(data);
                    
                    //update messages (if I selected some room)
                   this.handleChatRoomChange(this.state.roomId)
                    
                    //also refresh chatrooms with their last message sent/received
                    setTimeout(()=> {
                        axios.get("http://35.206.116.17:3001/"+ this.state.myId +"/room")
                        .then(response => {
                            const chatRooms = response.data;
                            this.setState({chatRooms:chatRooms});
                            //console.log(chatRooms)
                        })
                    }, 850);
                });
            }
            
        })
    }


    handleChatRoomChange(id){
        console.log("you clicked room :"+ id)
        this.setState({roomId: id})  

        // Get all messages in this chat room
        axios.get("http://35.206.116.17:3001/"+ id)
            .then(response => {
                const messages = response.data[0].messages;
                console.log(this.state.messages)
                this.setState({messages:messages})
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            
    }

    
    handleTextBoxChange(event){
        this.setState({textBoxValue: event.target.value})
    }

    handleSendMessage(){
        if(this.state.textBoxValue === "" || this.state.roomId===""){
            console.log("please enter a message.");
        }else{

            //Send message
            var socket = io('http://35.206.116.17:3001');
            socket.emit("send message", {
                room: this.state.roomId,
                userID: this.state.myId,
                message: this.state.textBoxValue	
            });    

            //Clean
            this.setState({textBoxValue : ""})

            //Updates chatrooms after message is sent
            setTimeout(()=> {
                axios.get("http://35.206.116.17:3001/"+ this.state.myId +"/room")
                .then(response => {
                    const chatRooms = response.data;
                    this.setState({chatRooms:chatRooms});
                    console.log(chatRooms)
                })
            }, 850);
               
           
            
            
        }

    }


 
    render() {
        return(
            <div className="profile-navbar d-flex flex-column">
            <ProfileNavBar/>
            <div className="container">
                <div className="messaging">

                    <div className="inbox_msg">
                        <div className="inbox_people">
                            <div className="inbox_chat">
                                { this.state.chatRooms !== [] && <ChatRooms chatRooms={this.state.chatRooms} handleChatRoomChange = {this.handleChatRoomChange} />}
                            </div>
                        </div>
                        <div className="mesgs">
                            <div className="msg_history">
                                { ( this.state.roomId !== "" )  && 
                                    <ChatRoomMessages 
                                        messages= {this.state.messages}
                                        roomId={this.state.roomId} 
                                        myId ={this.state.myId}
                                    />
                                }
                            </div>
                            <div className="type_msg">
                                <div className="input_msg_write">
                                <input type="text" className="write_msg" onChange={this.handleTextBoxChange} value={this.state.textBoxValue} placeholder="Type a message" />
                                <button className="msg_send_btn" type="button" onClick={this.handleSendMessage}>
                                    <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )

    };
}

export default App;
