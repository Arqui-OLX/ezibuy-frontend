import React, { Component } from 'react';

  

class Posts extends Component {
    
    

    render() {
        return (
            <React.Fragment>
                <div className="container bg-white">
                <h3>Lo que se está vendiendo</h3>
                    <div className="row">
                        <div className="card-deck col-lg-12  mb-3 " >

                            <div className="card border-info mb-4 box-shadow w-25">
                                 <img className="card-img-top"   src="/phone.jpg" alt="fotoPerfil"/>                  

                                <div className="card-body">
                                    <p>este es el contenido del telefono</p>
                                </div>
                            </div>

                            <div className="card border-info mb-4 box-shadow">
                                <img className="card-img-top"   src="/phone.jpg" alt="fotoPerfil"/>                  
                                <div className="card-body">
                                    <p>este es el contenido del telefono</p>
                                </div>
                            </div>

                            <div className="card border-info mb-4 box-shadow">
                                 <img className="card-img-top"   src="/phone.jpg" alt="fotoPerfil"/>                  
                                <div className="card-body">
                                    <p>este es el contenido del telefono</p>
                                </div>
                            </div>

                            <div className="card border-info mb-4 box-shadow">
                               <img  className="card-img-top"  src="/phone.jpg" alt="fotoPerfil"/>                  
                                <div className="card-body">
                                    <p>este es el contenido del telefono</p>
                                </div>
                            </div>
    
                        </div>
                    </div>

                    <div className="row">
                        <div className="card-deck col-lg-12  mb-3 " >

                            <div className="card border-info mb-4 box-shadow w-25">
                                 <img  className="card-img-top"  src="/phone.jpg" alt="fotoPerfil"/>                  

                                <div className="card-body">
                                    <p>este es el contenido del telefono</p>
                                </div>
                            </div>

                            <div className="card border-info mb-4 box-shadow">
                                <img  className="card-img-top"  src="/phone.jpg" alt="fotoPerfil"/>                  
                                <div className="card-body">
                                    <p>este es el contenido del telefono</p>
                                </div>
                            </div>

                            <div className="card border-info mb-4 box-shadow">
                                 <img className="card-img-top"  src="/phone.jpg" alt="fotoPerfil"/>                  
                                <div className="card-body">
                                    <p>este es el contenido del telefono</p>
                                </div>
                            </div>

                            <div className="card border-info mb-4 box-shadow">
                               <img className="card-img-top" src="/phone.jpg" alt="fotoPerfil" />                  
                                <div className="card-body">
                                    <p>este es el contenido del telefono</p>
                                </div>
                            </div>
    
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

 
export default Posts;
