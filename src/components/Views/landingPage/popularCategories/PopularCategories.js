import axios from 'axios';


import React, { Component } from 'react';

class PopularCategories extends Component {

    state = {
        JsonPosts: [],
        JsonImages: [],
        current_fk: 0
      };
    

    componentDidMount() {


        
        const urlGraphql = 'http://35.208.164.215:4000';

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
        
        const urlImages ='http://35.209.82.198:3000/ads-images/byid/'; 
        
        
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
                <div className="row bg-white mt-5">
                    <div className="col-lg-6 my-auto ">
                        <h1 className="mt-5">Tus compras en el mejor lugar</h1>
                        <p>Todo lo que necesitas está acá. Si quieres comprar o vender un producto, ezybuy es el lugar que estabas buscando</p>
                    </div>
                    <div className="col-lg-6">
                        <img className=""  src= "buy.gif"   alt="fotoPerfil"/>                  
                    </div>
          </div>
            </div>
            
         );
    }
}

 
export default PopularCategories;