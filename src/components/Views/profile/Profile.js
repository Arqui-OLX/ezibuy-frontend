import React, {Component} from 'react';
import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import ProfileNavBar from './ProfileNavBar';
import EditProfile from './EditProfile';
//import store from  "../../Redux/store"
class Profile extends Component{

    state = {

        user: {},
        showView: true
    
    };

    // changeName(name){
    //     store.dispatch({type:"cambio", name:name});
    // }

    componentDidMount() {
        const id = JSON.parse(localStorage.getItem("userInfo")).userId;

        const url ='http://35.208.164.215:3001/profile/'+id;
        
        axios.get(url)
        .then(res => {
            this.setState({ user: res.data[0]});
        })
    }
        

    
    changeView(){

        const isVisible = this.state.showView;

        this.setState({
            showView: !isVisible
        })
        
    }

    callbackFunction = (EditProfileData) => {

        const url ='http://35.208.164.215:3001/profile/1';

        axios.get(url)
        .then(res => {
            this.setState({ 
                user: res.data[0],
                showView: EditProfileData
            });
        })



    }

    render(){

        const data = this.state.user;
        
        return(

            <div>

                {
                    this.state.showView?
                    <div className="profile-navbar d-flex flex-column">
                
                    
                    <ProfileNavBar/>
                    <Container>
    
                        <Row>
                            <Col>
                                <br></br>
                                <Figure>
                                    <Figure.Image
                                        width={171}
                                        height={180}
                                        src="https://dummyimage.com/300x200/000/fff"
                                    />
                                </Figure>
                            </Col>
                            <Col>
                                <br></br>
                                <h2 className=""><strong>Tu información personal</strong></h2>
                                <hr></hr>
                                <p className="text-left">Nombre: {this.state.user.nickname} </p>
                                <p className="text-left">Email: {this.state.user.email} </p>
                                <p className="text-left">Teléfono: {this.state.user.phone}</p>
                            </Col>
                            <Col></Col>
                        </Row>

                    </Container>

                        <button  
                                type="button"
                                onClick={(e) => this.changeView()} 
                                className="btn btn-sm btn-primary w-25 mx-auto m-3"
                                data-toggle="modal" 
                                data-target="#exampleModal">
                                <h4 className="m-0">Editar perfil</h4>
                        </button>

                    </div>
                :
                <EditProfile 
                parentCallback = {this.callbackFunction}
                user = {this.state.user}
                />

                }
               
                </div>

            
        );
    }
}


export default Profile;