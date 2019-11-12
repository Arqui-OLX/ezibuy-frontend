import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from 'axios';


class Post extends Component {
    
    constructor(props) {
        
        super(props);
        this.state = {
            post : {},
            images: [],
            idImage: 0
        };
    
        // Este enlace es necesario para hacer que `this` funcione en el callback
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(e) {
        this.setState({idImage: e.target.id});
    }

    componentDidMount() {
        
        const urlPosts  ='http://35.209.82.198:3002/product/';
        const urlImages ='http://35.209.82.198:3001/ads-images/byid/';
        //const getProduct = {"query":"query {\n  catalogById(id: \"5dae83ffc22f297e5f0e2b8c\"){\n    \n    catalog{\n    vehiculos{\n      motos {\n        marca\n        anio\n        kilometraje\n        color\n        cilindrada\n        tipoVendedor\n        precio{\n          valorPrecio\n          tipoPago\n        }\n      }\n      carros{\n        marca\n        year\n        kilometraje\n        combustible\n        color\n        transmision\n        placa\n        precio{\n          valorPrecio\n          tipoPago\n        }\n      }\n    }\n    telefonosTablets{\n      telefonos{\n        marca\n        precio{\n          valorPrecio\n          tipoPago\n        }\n      }\n      tablets{\n        marca\n        precio{\n          valorPrecio\n          tipoPago\n        }\n      }\n    }\n    computadores{\n      computadorEscritorio{\n        precio{\n          valorPrecio\n          tipoPago\n        }\n      }\n      portatiles{\n        marca\n        precio{\n          valorPrecio\n          tipoPago\n        }\n      }\n    }\n    electrodomesticos{\n      cocinas{\n        tipo\n        precio{\n          valorPrecio\n          tipoPago\n        }\n      }\n      neveras{\n        precio{\n          valorPrecio\n          tipoPago\n        }\n      }\n    }\n    empleos{\n      buscarTrabajo{\n        tipo\n        enEsteAnuncio\n        nombreCompania\n        experienciaMin\n        experienciaMax\n        salarioMin\n        salarioMax\n      }\n    }\n    servicios{\n      clasesCursos{\n        tipo\n      }\n      reparaciones{\n        tipo\n      }\n      transporteMudanza{\n        tipo\n      }\n    }\n  }\n}\n}\n\n","variables":null};

        console.log(this.props.fk_post);
        
        axios.get(urlPosts+ this.props.fk_post)
        .then(res => {

    
            this.setState({ 
                post: res.data
            });

            axios.get(urlImages+ this.props.fk_post)
            .then(res => {
    
                
                this.setState({ 
                    images: res.data
                });
    
                //console.log(res);
    
            })

        })

     
    }

    render() {

 
        var listItems = this.state.images.map((url, i) =>



            <div key={i} >
                <img className="img-fluid" src={'http://35.209.82.198:3001/'+url.ad_image} id={i} onClick={this.handleClick} alt=""></img>  
            </div>

        );

         let ListFeatures =[];

        if(this.state.post.features !== undefined){
        
            ListFeatures = this.state.post.features.map((feature, i) =>
        
            <div key={i} >
                <h5>{feature.featureName}: {feature.featureValue}</h5>
            </div>

        );
        
        }
        

        return (
                <div className="">
                    <div className="col-md-12">
                        <header>
                            <div className="title">
                                <h2>{this.state.post.title}</h2>
                            </div>
                            
                            <div className="detalles">
                                <p className="date icons-material icon-material-time text-left">{this.state.post.created_at} </p>
                            </div>
                            <div className="price">
                                <h3 className="date icons-material icon-material-time text-left"> Precio: {this.state.post.price} </h3>
                            </div>
                           

                        </header>

                      
                        <div className="">
                            <img src={Image[this.state.idImage]} className="w-100 h-auto" alt=""></img>
                        </div>
        
                        <div className="d-flex">
                            {listItems}          
                        </div>

                        <div className="detalles">
                            <p className="date icons-material icon-material-time text-left">{this.state.post.description}</p>
                        </div>
                        
                        <h4 className="font-roboto-light font-size-20px-2c text-dark   letter-spacing-2px mt-2"><strong className="font-size-22px">{this.state.post.category}</strong></h4>
                        <h4 className="font-roboto-light font-size-20px-2c text-dark   letter-spacing-2px mt-2"><strong className="font-size-22px">{this.state.post.subcategory}</strong></h4>

                       {ListFeatures}
           
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