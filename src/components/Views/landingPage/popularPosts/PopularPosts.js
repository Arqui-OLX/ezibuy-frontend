import React, { Component } from 'react';
import axios from 'axios';

  

class PopularPosts extends Component {

    state = {
        JsonPosts: [],
        JsonImages: [],
        current_fk: 0
      };
          
    componentDidMount() {



        const urlGraphql = 'http://35.209.170.220:4000';

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
        
        const urlImages ='http://35.209.170.220:3000/ads-images/byid/'; 
        
        
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
            <div className="container bg-white">
            <div className="row bg-white">
                <div className="col-lg-6 my-auto ">
                    <img className=""  src= "addFavorites.gif"   alt="fotoPerfil"/>                  
                </div>
                <div className="col-lg-6 my-auto">
                    <h1 className="mt-5">Tus favoritos donde estés</h1>
                    <p>Agrega tus productos con un  click y  contacta al comprador cuando y donde quieras</p>
                </div>
            </div>
        </div>
         );
    }
}

 
export default PopularPosts;