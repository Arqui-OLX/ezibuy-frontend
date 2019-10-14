import React, { Component } from 'react';

import PopularCategories from '../LandingPage/PopularCat/PopularCategories';

import Posts from '../LandingPage/Posts/Posts';

import Categories from '../LandingPage/Categories/Categories';


class LandingPage extends Component {
    
    

    render() {
        return (
            <React.Fragment>
          
              <PopularCategories/>
              <Posts/>       
              <Categories/>

            </React.Fragment>
        );
    }
}

 
export default LandingPage;
