import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from 'axios';
import "./CarouselLandingPage.css"



class CarouselLandingPage extends Component {
    
          
    state = {
        JsonPosts: [],
        JsonImages: [],
        current_fk: 0,
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
         
        var ArrayTextPost = [];
        var ArrayTextDescription = [];

        const data = this.state.JsonPosts;

        
        data.map((post) => 
            ArrayTextPost.push(post.title)
           
        );

        data.map((post) => 
        ArrayTextDescription.push(post.description)       
       );



        return (

            <div className="container bg-white ">
            <header className="firstContend jumbotron my-4 mb-5">
               {/* <p className="lead">Compra y vende lo que tu quieras</p> */}
              <div className="typewriter">
                <h1 className="title">¡Ezibuy!</h1>
             </div>
              <img className="img1"  src= "https://vue.ai/static/vuetag/v1/images/home/Automated-Product-Tagging.svg"  style={{height:'400px'}} alt="fotoPerfil"/>                  
            </header>
            
            {/* Page Features */}
              <h1>Los ultimos posts </h1>
            <div className="row text-center"> 
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100">
                  <img className="card-img-top" src= {'http://35.209.170.220:3000/'+this.state.JsonImages[0]} alt="" />
                  <div className="card-body">
                    <h4 className="card-title">{ArrayTextPost[0]}</h4>
                    <p className="card-text">{ArrayTextDescription[0]}</p>
                  </div>
                  <div className="card-footer">
                    <a href="/postlist" className="buttonCard btn">Ver mas</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100">
                  <img className="card-img-top"  src= {'http://35.209.170.220:3000/'+this.state.JsonImages[1]} alt="" />
                  <div className="card-body">
                    <h4 className="card-title">{ArrayTextPost[1]}</h4>
                    <p className="card-text">{ArrayTextDescription[1]}</p>
                  </div>
                  <div className="card-footer">
                    <a href="/postlist" className="buttonCard btn">Ver mas</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100">
                  <img className="card-img-top"  src= {'http://35.209.170.220:3000/'+this.state.JsonImages[2]} alt="" />
                  <div className="card-body">
                    <h4 className="card-title">{ArrayTextPost[2]}</h4>
                    <p className="card-text">{ArrayTextDescription[2]}</p>
                  </div>
                  <div className="card-footer">
                    <a href="/postlist" className="buttonCard btn">Ver mas</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100">
                  <img className="card-img-top"  src= {'http://35.209.170.220:3000/'+this.state.JsonImages[3]} alt="" />
                  <div className="card-body">
                    <h4 className="card-title">{ArrayTextPost[3]}</h4>
                    <p className="card-text">{ArrayTextDescription[3]}</p>
                  </div>
                  <div className="card-footer">
                    <a href="/postlist" className="buttonCard btn">Ver ma</a>
                  </div>
                </div>
              </div>
            </div>
            {/* /.row */}
          </div>

                
         );
    }
}

 
export default CarouselLandingPage;