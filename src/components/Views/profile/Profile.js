import React, {Component} from 'react';
import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios'
import ProfileNavBar from './ProfileNavBar'
import store from  "../../Redux/store"
class Profile extends Component{

    state = {

        user: {}
    
    };

     
    
changeName(name){
    store.dispatch({type:"cambio", name:name});
}

componentDidMount() {

    const url ='http://35.208.241.159:5000/graphql?';

    const getUser = {"query":"query {userById (user_id: 11) {data {\n  email\n  nick\n  location\n  cellphone\n}} }","variables":null};
    
    axios.post(url, getUser)
    .then(res => {
         // console.log(res.data.data.userById.data[0])
         this.setState({ user:  res.data.data.userById.data[0]});
    })
    }

    


    render(){


        console.log(store.getState());

        const data = this.state.user;

        
        //this.changeName("EL perri!!!!")

        return(
            <div className="profile-navbar d-flex flex-column">
             
                
                <ProfileNavBar/>
                <Container>


                    <form>
                    <button  className="btn btn-primary btn-block  mt-5" onClick={this.holamundof} >HACER</button>

                    </form>
                    <Row>
                        <Col>
                            <br></br>
                            <Figure>
                                <Figure.Image
                                    width={171}
                                    height={180}
                                    src="https://dummyimage.com/300x200/000/fff"
                                />
                                <Figure.Caption>
                                    <a href="/profile/myprofile#">Agrega tu foto</a>
                                </Figure.Caption>
                            </Figure>
                        </Col>
                        <Col>
                            <br></br>
                            <p><b>Datos de la Cuenta2</b></p>
                            <hr></hr>
                            <h3>{data.nick}</h3>
                            <p>Email: {data.email}</p>
                            <p>Teléfono: {data.cellphone}</p>
                            <p>location: {data.location}</p>

                         </Col>
                        <Col></Col>
                    </Row>

                </Container>
            </div>
            
        );
    }
}


export default Profile;