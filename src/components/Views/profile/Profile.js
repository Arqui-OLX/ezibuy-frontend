import React, {Component} from 'react';
import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import ProfileNavBar from './ProfileNavBar'

class Profile extends Component{

    render(){
        return(
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
                                <Figure.Caption>
                                    <a href="/profile/myprofile#">Agrega tu foto</a>
                                </Figure.Caption>
                            </Figure>
                        </Col>
                        <Col>
                            <br></br>
                            <p><b>Datos de la Cuenta</b></p>
                            <hr></hr>
                            <p>Nombre: Álvaro Uribe Vélez</p>
                            <p>Teléfono: 314 556 7768</p>
                            <p>Contraseña: ********</p>
                        </Col>
                        <Col></Col>
                    </Row>

                </Container>
            </div>
            
        );
    }
}


export default Profile;