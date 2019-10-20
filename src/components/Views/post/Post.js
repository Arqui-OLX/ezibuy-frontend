import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";

class Post extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            idImage: 0
        };
    
        // Este enlace es necesario para hacer que `this` funcione en el callback
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(e) {
        this.setState({idImage: e.target.id});
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
                <img className="img-fluid" src={url} id={i} onClick={this.handleClick} alt =""></img>  
            </div>

        );

        return (


            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <header>
                            <div className="title">
                                    <h1 className ="mb-3">Titulo del post</h1>
                            </div>
                        <div className="detalles">
                            <p className="date icons-material icon-material-time text-left"> Fecha publicacion </p>
                        </div>
                        <div className="price">
                            <h3 className="date icons-material icon-material-time text-left"> PRECIO</h3>
                        </div>

                        </header>


                        <div className="">
                            <img  src={arregloURL[this.state.idImage]} className="w-100 h-auto" alt =""></img>
                        </div>
        
                        <div className="d-flex">
 
                            {listItems}
                                        
                        </div>

                        <p className ="mt-2 text-left">
                        AUTOS CURIBA VENDE:RENAULT DUSTER EXPRESSION 
                            Modelo: 2013
                            Motor: 1.6
                            Transmisión: Mecánica 
                            Kilometraje: 107.000
                            Placa: Barranquilla 
                            Precio: 27’000.000
                            SOAT Vigente hasta Junio 2020, TECNO Vigente hasta Julio 2020
                            Única Dueña 
                            •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••• 
                            Recibimos tu Usado 
                            Ven a verlo: Carrera 44 # 82 - 133Barranquilla 
                            Contacto: 3164055672 - 3015127289
                            Síguenos en Instagram y mira nuestros vehículos @autoscuriba 
                            GESTIONAMOS TU CRÉDITO
                            
                        </p>

                    </div>

                    <div className="col-md-4">
                        <div className="mb-3">
                        <img className="rounded-circle" src= "https://dummyimage.com/300x200/000/fff" alt="fotoPerfil" style={{width:'230px',height:'230px'}}/>                  
                        <h4 className="font-roboto-light font-size-20px-2c text-dark   letter-spacing-2px mt-2"><strong className="font-size-22px">Nombre usuario</strong></h4>
                        <h4 className="font-roboto-light font-size-20px-2c text-dark line-height-15 letter-spacing-2px"><strong className="font-size-22px">Telefono</strong></h4>

                        </div>


                    <form>
                            <div className="form-group">
                                <input type="phone" className="form-control" id="numberUser" aria-describedby="emailHelp" placeholder="Numero de telefono" />
                            </div>
                            <div className="form-group">
                                <textarea type="password" className="form-control" id="exampleInputPassword1" placeholder="Mensaje" rows="6"/>
                            </div>
                        
                            <button type="submit" className="btn btn-primary btn-block" >Enviar</button>
                    </form>
                    
                    </div>
                    
                    
                </div>
            </div>    
        );

    }
}

 
export default Post;