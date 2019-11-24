import React, {Component} from 'react';
import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import ProfileNavBar from './ProfileNavBar';
import EditProfile from './EditProfile';

class Profile extends Component{

    state = {
        user: {},
        showView: true
    };


    componentDidMount() {

        const id = JSON.parse(localStorage.getItem("userInfo")).userId;

          const urlGraphql = 'http://35.208.241.159:4000';

        const queryProfile = {
          
            "variables":{},
            "query":`{
                profileByID(profile_id: ${id}) {
                    id
                    nickname
                    email 
                    phone  
                }
            }`
        } 

            const options = {
                method: 'POST',
                data: queryProfile,
                url: urlGraphql,
            };

        
        axios(options)
        .then(res => {
            this.setState({ 
            user: res.data.data.profileByID
            });
        })
    }
        
    changeView(){

        const isVisible = this.state.showView;

        this.setState({
            showView: !isVisible
        })
        
    }

    callbackFunction = (EditProfileData) => {

        const id = JSON.parse(localStorage.getItem("userInfo")).userId;

        const urlGraphql = 'http://35.208.241.159:4000';

        const queryProfile = {
          
            "variables":{},
            "query":`{
                profileByID(profile_id: ${id}) {
                    id
                    nickname
                    email 
                    phone  
                }
            }`
        } 

            const options = {
                method: 'POST',
                data: queryProfile,
                url: urlGraphql,
            };

        axios(options)
        .then(res => {
            this.setState({ 
                user: res.data.data.profileByID,
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
                                <h1 className=""><strong>Tu información personal</strong></h1>
                                <hr></hr>
                                <h4 className="text-left">Nombre: {this.state.user.nickname} </h4>
                                <h4 className="text-left">Email: {this.state.user.email} </h4>
                                <h4 className="text-left">Teléfono: {this.state.user.phone}</h4>
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