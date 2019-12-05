import React, {Component} from 'react';
//import AdFrame from "./AdFrame";
import ProfileNavBar from "../profile/ProfileNavBar";
import PostList from'../postList/PostList';

import './Ads.css';

class Ads extends Component {
    

    render(){
 
        return (
            <div className="profile-navbar d-flex flex-column">
            <ProfileNavBar/>                
                <PostList profile= {JSON.parse(localStorage.getItem("userInfo")).userId}/>
            </div>
        )
    }

}

export default Ads;