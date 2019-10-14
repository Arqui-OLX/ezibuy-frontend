import React, { Component } from 'react';

  

class PopularCategories extends Component {
    
    

    render() {
        return (
            <React.Fragment>
              
            <div className="container">
                <h3>Categorias más populares</h3>
                <div className="card-deck mb-3 text-center ">

                        <div className="card mb-4 box-shadow">
                            <div className="card-header">
                                <h4>Carros</h4>
                            </div>
                            <img className="card-img-top"  src="/ferrari-portofino.jpg" alt="fotoPerfil"/>                  

                            <div className="card-body">
                                 <button 
                                    type="button" 
                                    className="btn btn-lg btn-block bg-primary btn-outline-primary text-white">
                                    Aceptar
                                </button>
                            </div>
                        </div>

                        <div className="card mb-4 box-shadow">
                            <div className="card-header">
                                <h4>Carros</h4>
                            </div>
                            <img className="card-img-top" src="/ferrari-portofino.jpg" alt="fotoPerfil"  />                  

                            <div className="card-body">
                                 <button 
                                    type="button" 
                                    className="btn btn-lg btn-block bg-primary btn-outline-primary text-white">
                                    Aceptar
                                </button>
                            </div>
                        </div>

                        <div className="card mb-4 box-shadow">
                            <div className="card-header">
                                <h4>Carros</h4>
                            </div>
                            <img className="card-img-top"   src="/ferrari-portofino.jpg" alt="fotoPerfil"  />                  

                            <div className="card-body">
                                 <button 
                                    type="button" 
                                    className="btn btn-lg btn-block bg-primary btn-outline-primary text-white">
                                    Aceptar
                                </button>
                            </div>
                        </div>
                </div>
            </div>
            
            </React.Fragment>
        );
    }
}

 
export default PopularCategories;
