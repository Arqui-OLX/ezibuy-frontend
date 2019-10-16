import React, { Component } from 'react';

import PopularCategories from '../LandingPage/PopularCat/PopularCategories';
import Posts from '../LandingPage/Posts/Posts';
import Categories from '../LandingPage/Categories/Categories';
 
import './LandingPage.css';


class LandingPage extends Component {
    
    

    render() {
        return (
            <React.Fragment>

                <div className="container  ">
                    <div className="row ">

                        <div className = "col-md-8  "> 
                            <PopularCategories/>
                            <Posts/>       
                            <Categories/>

                        </div>

                        <div className = "divpublicidad col-md-4">    
                            <div className="publicidad container ">
                                <img className="card-img-top" src="/materialPublicitario.jpg" alt="fotoPerfil"  />                  
                            </div>
                        </div>


                    </div>
                </div>

          
            </React.Fragment>
        );
    }
}

 
export default LandingPage;
