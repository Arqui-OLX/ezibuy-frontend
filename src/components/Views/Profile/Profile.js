import React, {Component} from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import  './Profile-styles.css';


class Profile extends Component{

    render(){
        return(
            <div className="profile-navbar d-flex flex-column">
                
                <ButtonGroup size="lg">
                    <Button variant="secondary">Mis anuncios</Button>
                    <Button variant="secondary">Mis favoritos</Button>
                    <Button variant="secondary">Mi perfil</Button>
                    <Button variant="secondary">Mis productos</Button>  
                    <Button variant="secondary">Mis mensajes</Button>
                                      
                </ButtonGroup>
                
                <Row>
                    <Col>
                        <br></br>
                        <Figure>
                            <Figure.Image
                                width={171}
                                height={180}
                                src="./profile.png"
                            />
                            <Figure.Caption>
                                <a href="/profile#">Agrega tu foto</a>
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
            </div>
        );
    }
}


export default Profile;