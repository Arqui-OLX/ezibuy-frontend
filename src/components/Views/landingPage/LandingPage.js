import React, { Component } from 'react';

import PopularCategories from './popularCategories/PopularCategories';
 
import './LandingPage.css';
import PopularPosts from './popularPosts/PopularPosts';
import Categories from './categories/Categories';
import CarouselLandingPage from './carouselLandingPage/CarouselLandingPage';
 

class LandingPage extends Component {
    
    
    render() {
        return (
 
           <div className="container">
                
                <CarouselLandingPage/>                        
                <PopularCategories/>
                <PopularPosts/>
                {/* <Categories/> */}

            </div>

          
         );
    }
}

 
export default LandingPage;