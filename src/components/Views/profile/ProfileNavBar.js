import React, {Component} from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
 
class ProfileNavBar extends Component{
    render(){
        return(
            
            <ButtonGroup size="lg">   
                <Button href="/myprofile/ads" variant="secondary">Mis anuncios</Button>
                {/* <Button href="/myprofile/favorites" variant="secondary">Mis favoritos</Button> */}
                <Button href= "/myprofile/profile" variant="secondary">Mi perfil</Button>
                <Button href="#" variant="secondary">Mis mensajes</Button>                  
            </ButtonGroup>
            
        );
    }
}
export default ProfileNavBar;