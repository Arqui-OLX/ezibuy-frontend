import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from 'axios';

class Post extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            idImage: 0,
            price: 0
        };
    
        // Este enlace es necesario para hacer que `this` funcione en el callback
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(e) {
        this.setState({idImage: e.target.id});
    }

    componentDidMount() {
        const url ='http://35.208.241.159:5000/graphql?';

        const getProduct = {"query":"query {\n  catalogById(id: \"5dae83ffc22f297e5f0e2b8c\"){\n    \n    catalog{\n    vehiculos{\n      motos {\n        marca\n        anio\n        kilometraje\n        color\n        cilindrada\n        tipoVendedor\n        precio{\n          valorPrecio\n          tipoPago\n        }\n      }\n      carros{\n        marca\n        year\n        kilometraje\n        combustible\n        color\n        transmision\n        placa\n        precio{\n          valorPrecio\n          tipoPago\n        }\n      }\n    }\n    telefonosTablets{\n      telefonos{\n        marca\n        precio{\n          valorPrecio\n          tipoPago\n        }\n      }\n      tablets{\n        marca\n        precio{\n          valorPrecio\n          tipoPago\n        }\n      }\n    }\n    computadores{\n      computadorEscritorio{\n        precio{\n          valorPrecio\n          tipoPago\n        }\n      }\n      portatiles{\n        marca\n        precio{\n          valorPrecio\n          tipoPago\n        }\n      }\n    }\n    electrodomesticos{\n      cocinas{\n        tipo\n        precio{\n          valorPrecio\n          tipoPago\n        }\n      }\n      neveras{\n        precio{\n          valorPrecio\n          tipoPago\n        }\n      }\n    }\n    empleos{\n      buscarTrabajo{\n        tipo\n        enEsteAnuncio\n        nombreCompania\n        experienciaMin\n        experienciaMax\n        salarioMin\n        salarioMax\n      }\n    }\n    servicios{\n      clasesCursos{\n        tipo\n      }\n      reparaciones{\n        tipo\n      }\n      transporteMudanza{\n        tipo\n      }\n    }\n  }\n}\n}\n\n","variables":null};

        axios.post(url, getProduct)
        .then(res => {
            this.setState({ price: res.data.data.catalogById.catalog.telefonosTablets.telefonos.precio.valorPrecio });
        })
    }

    render() {

        var arregloURL =[
            "http://placehold.it/600x400?text=Product+01",
            "http://placehold.it/600x400?text=Product+02",
            "http://placehold.it/600x400?text=Product+03",
            "http://placehold.it/600x400?text=Product+04",
            "http://placehold.it/600x400?text=Product+05",
            "http://placehold.it/600x400?text=Product+06",
            "http://placehold.it/600x400?text=Product+07",
            "http://placehold.it/600x400?text=Product+08",
            "http://placehold.it/600x400?text=Product+09",
        ]

        var listItems = arregloURL.map((url, i) =>
        
            <div key={i} >
                <img className="img-fluid" src={url} id={i} onClick={this.handleClick}></img>  
            </div>

        );

        return (
                <div className="">
                    <div className="col-md-12">
                        <header>
                            <div className="title">
                                <h2>Titulo del post</h2>
                            </div>
                            
                            <div className="detalles">
                                <p className="date icons-material icon-material-time text-left"> Fecha publicacion </p>
                            </div>
                            <div className="price">
                                <h3 className="date icons-material icon-material-time text-left"> PRECIO: {this.state.price} </h3>
                            </div>

                        </header>


                        <div className="">
                            <img src={arregloURL[this.state.idImage]} className="w-100 h-auto"></img>
                        </div>
        
                        <div className="d-flex">
                            {listItems}          
                        </div>

                    </div>

                    <div className="col-md-12">

                        <h4 className="font-roboto-light font-size-20px-2c text-dark   letter-spacing-2px mt-2"><strong className="font-size-22px">Nombre usuario</strong></h4>
                        <h4 className="font-roboto-light font-size-20px-2c text-dark line-height-15 letter-spacing-2px"><strong className="font-size-22px">Telefono</strong></h4>

                        <form>
                                <div className="form-group">
                                    <input type="phone" className="form-control" id="numberUser" aria-describedby="emailHelp" placeholder="Numero de telefono" />
                                </div>
                                <div className="form-group">
                                    <textarea type="message" className="form-control" id="exampleInputPassword1" placeholder="Mensaje" rows="6"/>
                                </div>
                            
                                <button type="submit" className="btn btn-primary btn-block" >Enviar</button>
                        </form>
                    
                    </div>                     
                </div>
        );

    }
}


export default Post;