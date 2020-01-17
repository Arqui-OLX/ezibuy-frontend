import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MapWithCircle from '../../Map/MapWithCircle/MapWithCircle'
import axios from 'axios';
import './Post.css';

class Post extends Component {
    
    constructor(props) {
        
        super(props);

        this.state = {
            post : {},
            images: [],
            idImage: 0,
            chatData:{
            message: "",    
            },

            MessageDelete: false,
            isFavorite: false,
            map: null,
            circle: null
        };
    
        // Este enlace es necesario para hacer que `this` funcione en el callback
        this.handleClick = this.handleClick.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.addFavorite = this.addFavorite.bind(this);
        this.onScriptLoad = this.onScriptLoad.bind(this);
        this.updateMap = this.updateMap.bind(this);
        this.createHeart = this.createHeart.bind(this);

    }
    
    handleClick(e) {
        this.setState({idImage: e.target.id});
    }

    updateMap() {
        if(this.state.post.lat != undefined && this.state.post.lat != null && this.state.post.lng != undefined && this.state.post.lng != null) {
            this.state.map.setCenter({lat: this.state.post.lat, lng: this.state.post.lng})
            this.state.circle.setCenter({lat: this.state.post.lat, lng: this.state.post.lng})
        }else {
            this.state.map.setCenter({ lat: 4.657248, lng: -74.099235}) 
            this.state.circle.setCenter({lat: this.state.post.lat, lng: this.state.post.lng})
        }

    }

    onScriptLoad() {
        
        //console.log(this.state.post.lat)
        const map = new window.google.maps.Map(
          document.getElementById("mapaSimplificado"),
          {
            center: { lat: 4.657248, lng: -74.099235},
            zoom: 14,
            disableDefaultUI: true,
            gestureHandling: 'none'
         }
        );

        const circle = new window.google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: {lat: 4.657248, lng: -74.099235},
            radius: 1200
          });

        this.setState({map: map, circle: circle})
         
        console.log(map)
    }

    createHeart() {

        let heartClass

        if(this.state.isFavorite)
            heartClass = "fas fa-heart"
        else
            heartClass = "far fa-heart"


        return (
            <i className={heartClass}></i>
          );
    }


    componentDidMount() {

        console.log(this.props.fk_post);

        
        const urlImages ='http://35.209.170.220:3000/ads-images/byid/';
        const urlGraphql = 'http://35.209.170.220:4000';

        const isFavorite = {
            
            "operationName":null,
            "variables":{},
            "query":`{ 
                isFavorite(id_profile: ${this.props.id_profile}, fk_post: \"${this.props.fk_post}\")
            }
        `}

            
          
        const options2 = {
            method: 'POST',
            data: isFavorite,
            url: urlGraphql,
        };
      
        const queryPost = {
            "variables":{},
            "query":
            `{
                productById(id: \"${this.props.fk_post}\")
                 {   
                    title   
                    description
                    price
                    priceType   
                    features {
                        featureName      
                        featureValue   
                    }   
                    _id    
                    fk_profile
                    lat
                    lng
                    city
                    department
                      }
            }`
        }
         
        const options = {
            method: 'POST',
            data: queryPost,
            url: urlGraphql,
        };

     

        axios(options)
        .then(res => {
             
             
            this.setState({ 
                post: res.data.data.productById
            });

            axios.get(urlImages+ this.props.fk_post)
            .then(res => {
    
                
                this.setState({ 
                    images: res.data
                });
 

            })

        })



        axios(options2)
        .then(res => {
              this.setState({
                 isFavorite: res.data.data.isFavorite 
              })
            
        })

        //Cargar script de mapa 
        if(!window.google) {
            var s = document.createElement('script');
            s.type = 'text/javascript'
            s.src = 'https://maps.google.com/maps/api/js?key=AIzaSyDrlikUB7hm1mfHK9iIix2u_-b2P6YvVFU'
            document.head.insertBefore(s,null)
            s.addEventListener('load', e=> {
              this.onScriptLoad()
            })
    
          }else {
            this.onScriptLoad()
        }

    }


    handleChange = e => {
        // colocar lo que el usuario escribe en el state
        this.setState({
           chatData : {
               ...this.state.chatData,
               [e.target.name] : e.target.value
           }
        })
    }

  

    
    componentDidUpdate(prevProps) {   
        
           
        
        if (this.props.fk_post !== prevProps.fk_post) {
            
            console.log("entra2");

            const urlGraphql = 'http://35.209.170.220:4000';
            const urlImages ='http://35.209.170.220:3000/ads-images/byid/';
 
            console.log(this.props.fk_post);
            
            const queryPost = {
                "variables":{},
                "query":
                `{
                    productById(id: \"${this.props.fk_post}\")
                     {   
                        title   
                        description
                        price
                        priceType   
                        features {
                            featureName      
                            featureValue   
                        }   
                        _id    
                        fk_profile
                        lat
                        lng
                        city
                        department
                          }
                }`
            }
          

            const options = {
                method: 'POST',
                data: queryPost,
                url: urlGraphql,
            };

            axios(options)
            .then(res => {

                
                 this.setState({ 
                    post: res.data.data.productById
                });

                axios.get(urlImages+ this.props.fk_post)
                .then(res => {
        
                    
                    this.setState({ 
                        images: res.data
                    });
        
        
                })

            })


            const isFavorite = {
                
                "operationName":null,
                "variables":{},
                "query":`{ 
                    isFavorite(id_profile: ${this.props.id_profile}, fk_post: \"${this.props.fk_post}\")
                }
            `}
    
                
              
            const options2 = {
                method: 'POST',
                data: isFavorite,
                url: urlGraphql,
            };


            axios(options2)
            .then(res => {
                this.setState({
                    isFavorite: res.data.data.isFavorite 
                })
            
            })
             
                 
 
      

        }
     
    }

    submitData = e => {

        e.preventDefault();  // recarga el formulario

        console.log("esto entra");
        

        const urlChat = "http://35.209.82.198:3003/room";
        const id = JSON.parse(localStorage.getItem("userInfo")).userId;

        var data ={
            messages: [
                { 
                  userID: id, 
                  message: this.state.chatData.message
                }
              ],
              
              users: {
                buyerID: id, 
                sellerID: this.state.post.fk_profile
              }
        }
        console.log(this.state.chatData.message);



        axios.post(urlChat, data)

        .then( (response)=>{
          console.log(response);
          
        }).catch((error) =>{
            console.log(error);
        });
        
    }

    
    addFavorite(){      

        
        console.log("ENTRA");
        
        const urlGraphql = 'http://35.209.170.220:4000';


        const deleteFavorite =  {"operationName":null,
        "variables":{},
        "query":
        `mutation {
             deleteFavorite(id_profile: ${this.props.id_profile},
                 fk_post: \"${this.props.fk_post}\")
            }
        `}

        const options2= {
            method: 'POST',
            headers: { 'Authorization': 'Bearer '+this.props.id_profile },
            data: deleteFavorite,
            url: urlGraphql,
        };
        

        const mutationCreateFavorite = {
            "operationName":null,
            "variables":{},
            "query":`mutation { 
                addFavToPost(
                    fav: {
                        id: ${this.props.id_profile},
                        fk_post: \"${this.props.fk_post}\"
                    })
            }`
        }

        const options= {
            method: 'POST',
            headers: { 'Authorization': 'Bearer '+this.props.id_profile},
            data: mutationCreateFavorite,
            url: urlGraphql,
        };
        
        console.log(this.state.isFavorite);
        
        if(!this.state.isFavorite){
            axios(options)
            .then(res => {
                console.log(res.data);
                this.setState({
                    isFavorite:true
                })
                
            }).catch(console.log);

        }else{

            axios(options2)
            .then(res => {
            
                console.log(res.data);
                this.setState({
                    isFavorite: false
                })
                
            }).catch(console.log);


        }
        
        

        
        
    }

    deleteProduct(){

        console.log(this.props.fk_post);
        
        const urlGraphql = 'http://35.209.170.220:4000';

        const mutationDeleteProduct =  {
            "operationName":null,
            "variables":{},
            "query":
                `mutation {
                    deleteProduct(id: \"${this.props.fk_post}\") 
                    {
                        _id
                    }
                }`
            }

            console.log(mutationDeleteProduct);
            
            const options= {
                method: 'POST',
                headers: { 'Authorization': 'Bearer '+JSON.parse(localStorage.getItem("userInfo")).token },
                data: mutationDeleteProduct,
                url: urlGraphql,
            };

            axios(options)
            .then(res => {
               
             
                for (let i = 0; i < this.state.images.length; i++) {
                    
                    const mutationDelImgPost = {
                        "operationName":null,
                        "variables":{},
                        "query":`mutation {
                            deleteAdImage(id: \"${this.state.images[i]._id}\")
                        }`
                    }

                    const options= {
                        method: 'POST',
                        headers: { 'Authorization': 'Bearer '+JSON.parse(localStorage.getItem("userInfo")).token },
                        data: mutationDelImgPost,
                        url: urlGraphql,
                    };


                    axios(options)
                    .then(res => {
                        this.props.update();
                        
                    }).catch(console.log);

                    
                }
    
               

                   
            })
            
            this.setState({
                
                MessageDelete: true
            })

        


    }
             
    render() {

        if(this.state.map != null && this.state.circle != null)
            this.updateMap();
        
        var listItems = this.state.images.map((url, i) =>



            <div key={i} >
                <img className="img-fluid" src={'http://35.209.170.220:3000/'+url.ad_image} id={i} onClick={this.handleClick} alt=""></img>  
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

                       {ListFeatures}

                       <div  style={{height: '300px', width: '100%', marginBottom: '15px'}} className="position-sticky" id="mapaSimplificado">
                            <h1>acá está</h1>
                        </div>
           
                    </div>

                   {this.state.post.fk_profile !== this.props.id_profile?

                    <div className="col-md-12">
                          
                        {this.props.id_profile !== 0?
                            <button onClick={this.addFavorite} className="buttonFavorite">{this.createHeart()}</button>
                        :null
                        }

 
                        {this.props.id_profile !==0 ?
                            <form onSubmit={this.submitData}>               
                                    
                                    <div className="form-group">
                                        <textarea 

                                            type="message"
                                            className="form-control" 
                                            id="exampleInputPassword1"
                                            placeholder="Mensaje" 
                                            rows="6"  
                                            name= "message"
                                            onChange={this.handleChange}
                                            value={this.state.message}/>
                                   
                                    </div>

                                
                                
                                    <button type="submit" className="btn btn-primary btn-block">Enviar</button>
                            </form>                        
                        : null

                        }


                           
                    </div>      
                    :
                    <div>

                        

                    </div>  
                     
                    }

                    {
                        this.props.id_profile === this.state.post.fk_profile ?
                            <button onClick={this.deleteProduct} className="btn btn-danger btn-block mt-3"><i class="far fa-trash-alt"></i></button> 
                        :
                        null
                    }

                    {this.state.MessageDelete ?
                        <div>
                            <div className="alert alert-warning mt-4" role="alert">
                                <strong>Exito!</strong> Tu producto ha sido eliminado
                            </div>
                        </div>
                    :null
                    }
                
                
                </div>
        );  

    }
}


export default Post;