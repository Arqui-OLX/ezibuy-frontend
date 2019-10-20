import React, { Component } from 'react';

  

class PopularCategories extends Component {
    
    

    render() {
        return (
               
            <div className="container">
                <h3>Categorias más populares</h3>
                <div className="card-deck mb-3 text-center ">

                        <div className="card mb-4 box-shadow">
                           <a href="http://google.com">
                                <div className="card-header">
                                <p>Carros</p>
                            </div>
                            <img className="card-img-top"  src="https://dummyimage.com/300x200/000/fff" alt="fotoPerfil"/>                  

                            <div className="card-body">
                                 <button 
                                    type="button" 
                                    className="btn btn-lg btn-block bg-primary btn-outline-primary text-white  ">
                                    Aceptar
                                </button>
                            </div>
                           </a>
                        </div>

                        <div className="card mb-4 box-shadow">
                           <a href="http://google.com">
                            <div className="card-header">
                                    <p>Carros</p>
                                </div>
                                <img className="card-img-top" src="https://dummyimage.com/300x200/000/fff" alt="fotoPerfil"  />                  

                                <div className="card-body">
                                    <button 
                                        type="button" 
                                        className="btn btn-lg btn-block bg-primary btn-outline-primary text-white">
                                        Aceptar
                                    </button>
                                </div>
                           </a>
                        </div>

                        <div className="card mb-4 box-shadow">
                           <a href="http://google.com">
                            <div className="card-header">
                                    <p>Carros</p>
                                </div>
                                <img className="card-img-top"  src="https://dummyimage.com/300x200/000/fff" alt="fotoPerfil"  />                  

                                <div className="card-body">
                                    <button 
                                        type="button" 
                                        className="btn btn-lg btn-block bg-primary btn-outline-primary text-white">
                                        Aceptar
                                    </button>
                                </div>
                           </a>
                        </div>
                </div>
            </div>
            
         );
    }
}

 
export default PopularCategories;