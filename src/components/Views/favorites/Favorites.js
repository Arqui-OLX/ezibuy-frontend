import React, {Component} from 'react';
import ProfileNavBar from "../profile/ProfileNavBar";
import PostList from '../postList/PostList'

import './Favorites.css';

class Favorites extends Component {
    

    render(){
     
        return (
            <div className="profile-navbar d-flex flex-column">
            <ProfileNavBar/>                
            <PostList favorite = {JSON.parse(localStorage.getItem("userInfo")).userId}/>

            </div>
        )
    }

}

export default Favorites;