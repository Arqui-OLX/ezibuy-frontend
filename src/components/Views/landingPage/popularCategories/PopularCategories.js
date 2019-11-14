import axios from 'axios';


import React, { Component } from 'react';

  

class PopularCategories extends Component {

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

        
 
        // setTimeout(function(){

        //     console.log(images);

        // }, 5000); 
    

    }

    
    

    render() {

        
        return (
               
            <div className="container">
                <h3>Los ultimos posts</h3>
                <div className="card-deck mb-3 text-center ">

                        <div className="card mb-4 box-shadow">
                           <a href="http://google.com">
                                <div className="card-header">
                                <p>Carros</p>
                            </div>
                            <img className="card-img-top"  src=  {'http://35.209.82.198:3001/'+this.state.JsonImages[this.state.JsonImages.length-1]} alt="fotoPerfil"/>                  

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
                                <img className="card-img-top" src= {'http://35.209.82.198:3001/'+this.state.JsonImages[this.state.JsonImages.length-2]} alt="fotoPerfil"  />                  

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
                                <img className="card-img-top"  src=  {'http://35.209.82.198:3001/'+this.state.JsonImages[this.state.JsonImages.length-3]} alt="fotoPerfil"  />                  

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