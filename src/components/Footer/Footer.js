import React, { Component } from 'react';
//import Col from 'react-bootstrap/Col';
//import Row from 'react-bootstrap/Row';
import './footer-styles.css'


class Footer extends Component{


    render(){

        return (

            <footer>
                <div className="container mt-5 mb-1">
                    <div className ="row bg-white">
                            <div className="col-lg-3 my-auto">
                                 
                                  <a href="http://google.com">Políticas de privacidad</a>                                             
                              
                            </div>
                            <div className="col-lg-3 my-auto">           
                                    <a href="http://google.com">Sobre nosotros</a>                                
                            </div>
                            <div className="row col-lg-3 my-auto mx-auto">
                                <p className="my-auto mx-auto">Ezibuy, Copyright, 2019</p> 
                            </div>  

                            <div className="row col-lg-3 my-auto">
                                <img className="logoFooter card-img-top d-inline mx-auto" src="/logo.png" style={{height:'50px', width:'100px'}} alt="fotoPerfil"  />                          
                            </div>  

                    </div>
                </div>
 
            </footer>        
        );
    }

}

export default Footer;
