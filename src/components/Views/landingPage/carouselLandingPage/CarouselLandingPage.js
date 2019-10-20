import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


class CarouselLandingPage extends Component {
    
    

    render() {
        return (

            <div className="w-75 mx-auto">
                <Carousel>
                        <div>
                            <img src="https://dummyimage.com/600x400/000/fff" alt="img1" />
                        </div>
                        <div>
                            <img src="https://dummyimage.com/600x400/000/fff" alt="img2"/>
                        </div>
                        <div>
                            <img src="https://dummyimage.com/600x400/000/fff" alt="img3"/>
                        </div>
                </Carousel>
            </div>

                
         );
    }
}

 
export default CarouselLandingPage;