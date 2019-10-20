import React, {Component} from 'react';
import AdFrame from "./AdFrame";
import ProfileNavBar from "../Profile/ProfileNavBar";
//import * as utils from "../../../utility/utils.js";


import './Ads-styles.css';

class Ads extends Component {
    

    render(){
        var dataProducts = require('../../../data/favorites.json')
        console.log(dataProducts);
        return (
            <div className="profile-navbar d-flex flex-column">
            <ProfileNavBar/>                
                {   
                    dataProducts.products.map((product)=>{
                        return <AdFrame 
                                    key={product.id}
                                    productName= {product.name} 
                                    productPrice= {product.price} 
                                    productLocation= {product.location} 
                                    imgSrc= {product.imgurl}
                                />
                    })
                        
                }
            </div>
        )
    }

}

export default Ads;