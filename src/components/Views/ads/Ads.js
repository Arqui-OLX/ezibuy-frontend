import React, {Component} from 'react';
import AdFrame from "./AdFrame";
import ProfileNavBar from "../profile/ProfileNavBar";
import PostList from'../postList/PostList';

import './Ads.css';

class Ads extends Component {
    

    render(){
        var dataProducts = require('../../../data/Favorites.json')
        console.log(dataProducts);
        return (
            <div className="profile-navbar d-flex flex-column">
            <ProfileNavBar/>                
                <PostList profile="1"/>
            </div>
        )
    }

}

export default Ads;