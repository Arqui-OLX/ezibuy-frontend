import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
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
            MessageDelete: false
        };
    
        // Este enlace es necesario para hacer que `this` funcione en el callback
        this.handleClick = this.handleClick.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this)
        this.addFavorite = this.addFavorite.bind(this)


    }
    
    handleClick(e) {
        this.setState({idImage: e.target.id});
    }


    componentDidMount() {
        
        const urlImages ='http://35.209.82.198:3001/ads-images/byid/';
        const urlGraphql = 'http://35.208.241.159:4000';

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
            console.log("entra en el if");
            


            const urlImages ='http://35.209.82.198:3001/ads-images/byid/';
            const urlGraphql = 'http://35.208.241.159:4000';
    
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

        }
     
    }

    submitData = e => {

        e.preventDefault();  // recarga el formulario

        console.log("esto entra");
        

        const urlChat = "http://35.206.116.17:3001/room";
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

        const urlGraphql = 'http://35.208.241.159:4000';

        const mutationCreateFavorite = {
            "operationName":null,
            "variables":{},
            "query":`mutation { 
                addFavToPost(
                    fav: {
                        id: ${JSON.parse(localStorage.getItem("userInfo")).userId},
                        fk_post: \"${this.props.fk_post}\"
                    })
            }`
        }

        const options= {
            method: 'POST',
            headers: { 'Authorization': 'Bearer '+JSON.parse(localStorage.getItem("userInfo")).token },
            data: mutationCreateFavorite,
            url: urlGraphql,
        };
        
        console.log("SI ENTRA A FAVORITOS");
        
        axios(options)
        .then(res => {
            console.log(res.data);
            
        }).catch(console.log);


        
        
    }

    deleteProduct(){

        console.log(this.props.fk_post);
        
        const urlGraphql = 'http://35.208.241.159:4000';

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
                        console.log(res.data);
                        
                    }).catch(console.log);

                    
                }
    
               

                   
            })
            
            this.setState({
                
                MessageDelete: true
            })

    }
             
    render() {

        

        console.log(JSON.parse(localStorage.getItem("userInfo")).userId);
        
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

                       {ListFeatures}
           
                    </div>

                   {this.state.post.fk_profile !== JSON.parse(localStorage.getItem("userInfo")).userId?
                    <div className="col-md-12">

                       <button onClick={this.addFavorite} className="buttonFavorite"><i className="far fa-heart"></i></button>
 
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
                        
                       

                    </div>      
                    :
                    <div>

                        <button  onClick={this.deleteProduct} className="btn btn-danger btn-block mt-3"><i class="far fa-trash-alt"></i></button>

                        {this.state.MessageDelete?
                            <div className="alert alert-warning mt-4" role="alert">
                                <strong>Exito!</strong> Tu producto ha sido eliminado
                          </div>
                        :null
                        }

                    </div>  
                     
                    }
                                   
                </div>
        );  

    }
}


export default Post;