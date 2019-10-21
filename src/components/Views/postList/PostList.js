import React, { Component } from 'react';
import './PostList.css';

class PostList extends Component {

    render() {


        return (
            <div className="d-flex row m-4 h-100" style={{backgroundColor: "#eceff1"}}>
                <div className="col-3 mx-4" style={{backgroundColor: "white"}}>


                    <div>
                        
                        <h4 className="bg-info p-2 m-0">Ubicación</h4>

                        <div className="">
                            <h6 className="select p-2 m-0">Bogotá</h6>
                            <h6 className="select p-2 m-0">Medellin</h6>
                            <h6 className="select p-2 m-0">Barranquilla</h6>
                        </div>
                    </div>

                    
                    <div>
                        
                        <h4 className="bg-info p-2 m-0">Categorias</h4>

                        <div>
                            <h6 className="select p-2 m-0">Automoviles</h6>
                            <h6 className="select p-2 m-0">Celulares</h6>
                            <h6 className="select p-2 m-0">Servicios</h6>
                        </div>
                    </div>
                    



                    <div>
                        <h4 className="bg-info p-2">Precio</h4>
                        <div>
                            <input type="text" className="form-control w-25 d-inline" placeholder="Min"></input>
                            <input type="text" className="form-control w-25 d-inline" placeholder="Max"></input>
                            <button type="button" className="btn btn-secondary">
                                <i class="far fa-check-circle"></i>
                            </button>
                        </div>
                    </div>
                    
                </div>
                <div className="col-8" style={{backgroundColor: "white"}}>
                    
                    <div className="row">

                        <div className="d-inline col-3">
                            <img src="https://dummyimage.com/200x200/000/fff" className="" alt="..."/>
                        </div>
                        <div className="d-inline col-4">
                            <h4 className="text-left">Card title</h4>
                            <h5 className="text-left mb-2 text-muted">Card subtitle</h5>
                        </div>
                        <div className="col-3 mx-3 align-self-center">
                            <h4 className="text-center">Precio</h4>
                            <h5 className="text-center mb-2 text-muted">Tipo Precio</h5>
                            <button type="button" className="btn btn-secondary px-4 mt-4 float-right">
                                <h4>Contactar</h4>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

}

export default PostList;