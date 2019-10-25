import React from "react";
import { Switch, Route } from "react-router-dom";


import Login from "../Views/Login/Login"
import LandingPage from "../Views/landingPage/LandingPage";
import Post from "../Views/post/Post";
import PublicationPost from "../Views/publicationPost/PublicationPost";
import Profile from "../Views/profile/Profile";
import Favorites from "../Views/favorites/Favorites"
import Ads from "../Views/ads/Ads"
import PostList from "../Views/postList/PostList";

const Main = () => (

    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/home" component={LandingPage} />
      <Route exact path="/post" component={Post} />
      <Route exact path="/sale" component={PublicationPost} />
      <Route exact path="/postlist" component={PostList} />
      <Route exact path="/myprofile/profile" component={Profile} /> 
      <Route exact path="/myprofile/favorites" component={Favorites} /> 
      <Route exact path="/myprofile/ads" component={Ads} /> 


    </Switch>

);
export default Main;