import axios from 'axios';


import React, { Component } from 'react';

class PopularCategories extends Component {

    state = {
        JsonPosts: [],
        JsonImages: [],
        current_fk: 0
      };
    

    componentDidMount() {


        
        const urlGraphql = 'http://35.208.241.159:4000';

        let queryPosts = {
           
            "variables":{},
            "query":`{
                allProducts {
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
                }
        `}

        const options = {
            method: 'POST',
            data: queryPosts,
            url: urlGraphql,
        };
        
        const urlImages ='http://35.209.82.198:3001/ads-images/byid/'; 
        
        
        axios(options)
        .then(result=>{
            console.log(result);
            

            
            this.setState({
                JsonPosts: result.data.data.allProducts,
                JsonImages: new Array(result.data.data.allProducts.length)
            });

            console.log(result.data.data.allProducts);
            
            
            result.data.data.allProducts.forEach((post, i) => {         
                
                axios.get(urlImages+post._id)
                .then(element=>{
                    
                    this.setState({ 
                        JsonImages: [...this.state.JsonImages.slice(0, i), element.data[0].ad_image, ...this.state.JsonImages.slice(i + 1)]
                    })
                    
                }).catch( (error) =>{
                    if(error.status === 404){
                        console.log("error 404, no encontrada la imagen");
                    }
                });
    
                    

            });
        }).catch(console.log);

 

    }
 
    render() {

        console.log(this.urlImages);
        var ArrayTextPost = [];

        const data = this.state.JsonPosts;

        
        data.map((post) => 
            ArrayTextPost.push(post.title)

        );
 
        return (
               
            <div className="container">
                <h3>Los ultimos posts</h3>
                <div className="card-deck mb-3 text-center">

                        <div className="card mb-4 box-shadow">
                           <a href="http://google.com">
                                <div className="card-header">
                                <p>{ArrayTextPost[this.state.JsonImages.length-1]}</p>
                            </div>
                            <img className="card-img-top"  src=  {'http://35.209.82.198:3001/'+this.state.JsonImages[this.state.JsonImages.length-1]} style={{height:'300px'}} alt="fotoPerfil"/>                  

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
                                <p>{ArrayTextPost[this.state.JsonImages.length-2]}</p>

                                </div>
                                <img className="card-img-top" src= {'http://35.209.82.198:3001/'+this.state.JsonImages[this.state.JsonImages.length-2]} style={{height:'300px'}}  alt="fotoPerfil"  />                  

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
                                 <p>{ArrayTextPost[this.state.JsonImages.length-3]}</p>

                                </div>
                                <img className="card-img-top"  src=  {'http://35.209.82.198:3001/'+this.state.JsonImages[this.state.JsonImages.length-3]} style={{height:'300px'}}  alt="fotoPerfil"  />                  

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