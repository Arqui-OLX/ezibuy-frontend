import React, { Component } from 'react';
import axios from 'axios';

  

class PopularPosts extends Component {

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
                 <div className="container bg-white ">
                <h3>Lo que se está vendiendo</h3>
                    <div className="row  justify-content-md-center">
                        <div className="card-deck col-lg-12  mb-3" >

                            <div className="card border-info mb-4 box-shadow">
                                <a href="http://google.com">
                                     <img className="card-img-top"   src= {'http://35.209.82.198:3001/'+this.state.JsonImages[0]} style={{height:'200px'}}  alt="fotoPerfil"/>                  
                                    <div className="card-body">
                                        <p>{ArrayTextPost[0]}</p>
                                    </div>
                                </a>
                            </div>

                      
                            <div className="card border-info mb-4 box-shadow">
                                <a href="http://google.com">
                                    <img  className="card-img-top"  src= {'http://35.209.82.198:3001/'+this.state.JsonImages[1]}  style={{height:'200px'}} alt="fotoPerfil"/>                  
                                    <div className="card-body">
                                    <p>{ArrayTextPost[1]}</p>
                                    </div>
                                </a>
                            </div>

                            <div className="card border-info mb-4 box-shadow">
                                <a href="http://google.com">
                                    <img className="card-img-top"   src= {'http://35.209.82.198:3001/'+this.state.JsonImages[2]}  style={{height:'200px'}} alt="fotoPerfil"/>                  
                                    <div className="card-body">
                                    <p>{ArrayTextPost[2]}</p>
                                    </div>
                                </a>
                            </div>

                            <div className="card border-info mb-4 box-shadow">
                                <a href="http://google.com">
                                    <img  className="card-img-top"  src= {'http://35.209.82.198:3001/'+this.state.JsonImages[3]}  style={{height:'200px'}} alt="fotoPerfil"/>                  
                                    <div className="card-body">
                                        <p>{ArrayTextPost[3]}</p>
                                    </div>
                                </a>
                            </div>
    
                        </div>
                    </div>

                    <div className="row justify-content-md-center">
                        <div className="card-deck col-lg-12  mb-3 " >

                            <div className="card border-info mb-4 box-shadow">
                                <a href="http://google.com">
                                    <img  className="card-img-top"   src= {'http://35.209.82.198:3001/'+this.state.JsonImages[4]}  style={{height:'200px'}} alt="fotoPerfil"/>                  
                                    <div className="card-body">
                                    <p>{ArrayTextPost[4]}</p>
                                    </div>
                                </a>
                            </div>

                            <div className="card border-info mb-4 box-shadow">
                                <a href="http://google.com">
                                    <img  className="card-img-top"   src= {'http://35.209.82.198:3001/'+this.state.JsonImages[5]}  style={{height:'200px'}} alt="fotoPerfil"/>                  
                                    <div className="card-body">
                                    <p>{ArrayTextPost[5]}</p>
                                    </div>
                                </a>
                            </div>

                            <div className="card border-info mb-4 box-shadow">
                               <a href="http://google.com"> 
                                    <img className="card-img-top"   src= {'http://35.209.82.198:3001/'+this.state.JsonImages[6]}  style={{height:'200px'}} alt="fotoPerfil"/>                  
                                    <div className="card-body">
                                    <p>{ArrayTextPost[6]}</p>
                                    </div>
                               </a>
                            </div>

                            <div className="card border-info mb-4 box-shadow">
                               <a href="http://google.com">
                                    <img className="card-img-top"  src= {'http://35.209.82.198:3001/'+this.state.JsonImages[7]}  style={{height:'200px'}} alt="fotoPerfil" />                  
                                        <div className="card-body">
                                        <p>{ArrayTextPost[7]}</p>
                                        </div>
                               </a>
                            </div>
    
                        </div>
                    </div>
                </div>
         );
    }
}

 
export default PopularPosts;