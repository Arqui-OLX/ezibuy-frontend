import React, {Component} from 'react';
import FavoriteFrame from "./FavoriteFrame";
import ProfileNavBar from "../Profile/ProfileNavBar";
//import * as utils from "../../../utility/utils.js";


import './Favorites-styles.css';

class Favorites extends Component {
    

    render(){
        var dataProducts = require('../../../data/favorites.json')
        console.log(dataProducts);
        return (
            <div className="profile-navbar d-flex flex-column">
            <ProfileNavBar/>                
                {   
                    dataProducts.products.map((product)=>{
                        return <FavoriteFrame 
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

export default Favorites;