import React, {Component} from 'react';
import FavoriteFrame from "./FavoriteFrame";
import ProfileNavBar from "../profile/ProfileNavBar";
 

import './Favorites.css';

class Favorites extends Component {
    

    render(){
        var dataProducts = require('../../../data/Favorites.json')
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