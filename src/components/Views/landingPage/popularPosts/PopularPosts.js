import React, { Component } from 'react';
import axios from 'axios';

  

class PopularPosts extends Component {

    state = {
        JsonPosts: [],
        JsonImages: [],
        current_fk: 0
      };
    

        
    componentDidMount() {

        const urlImages ='http://35.209.82.198:3001/ads-images';
        const urlPosts  ='http://35.209.82.198:3002/product';

       
        axios.get(urlPosts)
        .then(result=>{

            this.setState({
                JsonPosts: result.data 
            });
            
            result.data.forEach(post => {         
                
                axios.get(urlImages+"/byid/"+post._id)
                .then(element=>{

                     
                    
                    this.setState({ 
                        JsonImages: [...this.state.JsonImages, element.data[0].ad_image]
                      })
                    
                }).catch( (error) =>{
                if(error.status === 404){
                    console.log("error 404, no encontrada la imagen");
                }
                });
    
                    

            });
        }).catch(console.log);

       
    }
    
    handleClick = (e, data) => {

        this.setState({

           current_fk: data

       })
   }
    

    render() {

        var arreglo3 = [];

        const data = this.state.JsonPosts;

        
        const result = data.map((post, index) => 
            arreglo3.push(post.title)

        );

         
 
        
        return (
                 <div className="container bg-white ">
                <h3>Lo que se está vendiendo</h3>
                    <div className="row  justify-content-md-center">
                        <div className="card-deck col-lg-12  mb-3 " >

                            <div className="card border-info mb-4 box-shadow">
                                <a href="http://google.com">
                                     <img className="card-img-top"   src= {'http://35.209.82.198:3001/'+this.state.JsonImages[0]} alt="fotoPerfil"/>                  
                                    <div className="card-body">
                                        <p>{arreglo3[0]}</p>
                                    </div>
                                </a>
                            </div>

                      
                            <div className="card border-info mb-4 box-shadow">
                                <a href="http://google.com">
                                    <img  className="card-img-top"  src= {'http://35.209.82.198:3001/'+this.state.JsonImages[1]} alt="fotoPerfil"/>                  
                                    <div className="card-body">
                                    <p>{arreglo3[1]}</p>
                                    </div>
                                </a>
                            </div>

                            <div className="card border-info mb-4 box-shadow">
                                <a href="http://google.com">
                                    <img className="card-img-top"   src= {'http://35.209.82.198:3001/'+this.state.JsonImages[2]} alt="fotoPerfil"/>                  
                                    <div className="card-body">
                                    <p>{arreglo3[2]}</p>
                                    </div>
                                </a>
                            </div>

                            <div className="card border-info mb-4 box-shadow">
                                <a href="http://google.com">
                                    <img  className="card-img-top"  src= {'http://35.209.82.198:3001/'+this.state.JsonImages[3]} alt="fotoPerfil"/>                  
                                    <div className="card-body">
                                        <p>{arreglo3[3]}</p>
                                    </div>
                                </a>
                            </div>
    
                        </div>
                    </div>

                    <div className="row justify-content-md-center">
                        <div className="card-deck col-lg-12  mb-3 " >

                            <div className="card border-info mb-4 box-shadow">
                                <a href="http://google.com">
                                    <img  className="card-img-top"   src= {'http://35.209.82.198:3001/'+this.state.JsonImages[4]} alt="fotoPerfil"/>                  
                                    <div className="card-body">
                                    <p>{arreglo3[4]}</p>
                                    </div>
                                </a>
                            </div>

                            <div className="card border-info mb-4 box-shadow">
                                <a href="http://google.com">
                                    <img  className="card-img-top"   src= {'http://35.209.82.198:3001/'+this.state.JsonImages[5]} alt="fotoPerfil"/>                  
                                    <div className="card-body">
                                    <p>{arreglo3[5]}</p>
                                    </div>
                                </a>
                            </div>

                            <div className="card border-info mb-4 box-shadow">
                               <a href="http://google.com"> 
                                    <img className="card-img-top"   src= {'http://35.209.82.198:3001/'+this.state.JsonImages[6]} alt="fotoPerfil"/>                  
                                    <div className="card-body">
                                    <p>{arreglo3[6]}</p>
                                    </div>
                               </a>
                            </div>

                            <div className="card border-info mb-4 box-shadow">
                               <a href="http://google.com">
                                    <img className="card-img-top"  src= {'http://35.209.82.198:3001/'+this.state.JsonImages[7]} alt="fotoPerfil" />                  
                                        <div className="card-body">
                                        <p>{arreglo3[7]}</p>
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