import React, { Component } from 'react';
//import Col from 'react-bootstrap/Col';
//import Row from 'react-bootstrap/Row';
import './footer-styles.css'


class Footer extends Component{


    render(){

        return (

            <footer>
                <div className="container">
                    <div className ="row">
                            <div className="col-lg-4">
                                <h4>información util</h4>
                                <ul className="lista">
                                    <li><a href="http://google.com">Contactos y ayuda</a></li>
                                    <li><a href="http://google.com">Consejos y seguridad</a></li>
                                    <li><a href="http://google.com">Terminos y condiciones</a></li>
                                    <li><a href="http://google.com">Acerca de ezibuy</a></li>
                                    <li><a href="http://google.com">Trabaja con nosotros</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-4">
                                <h4 className="text-center">Nuestros servicios</h4>
                                <ul className="lista mt-4">
                                    <li><a href="http://google.com">Publicar un anuncio</a></li>
                                    <li><a href="http://google.com">Comprar un producto</a></li>
                                    <li><a href="http://google.com">Mis anuncios</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-4 my-auto">
                                <img className="logoFooter card-img-top" src="/logo.png" alt="fotoPerfil"  />                  
                                <p>Ezibuy, todos los derechos reservados, 2019</p>
                            </div>                             
                    </div>
                </div>
 
            </footer>        
        );
    }

}

export default Footer;
