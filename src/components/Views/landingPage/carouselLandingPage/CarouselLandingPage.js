import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';


class CarouselLandingPage extends Component {
    
          
    state = {
        JsonPosts: [],
        JsonImages: [],
        current_fk: 0,
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





    render() {
        var arreglo3 = [];

        const data = this.state.JsonPosts;

        
        const result = data.map((post, index) => 
            arreglo3.push(post.title)

        );

        console.log(arreglo3[1]);
        
        
        return (

            <div className="w-50 h-25 mx-auto">
                <Carousel>
                        <div>
                            <img src= {'http://35.209.82.198:3001/'+this.state.JsonImages[1]} alt="img1" />
                            <h3>{arreglo3[1]}</h3>
                        </div>
                        <div>
                            <img src= {'http://35.209.82.198:3001/'+this.state.JsonImages[2]} alt="img2"/>
                        </div>
                        <div>
                            <img src= {'http://35.209.82.198:3001/'+this.state.JsonImages[3]} alt="img3"/>
                        </div>
                </Carousel>
            </div>

                
         );
    }
}

 
export default CarouselLandingPage;