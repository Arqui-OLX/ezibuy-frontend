import React from "react";
import { Switch, Route } from "react-router-dom";


import Login from "../Views/Login/Login"
import Profile from "../Views/Profile/Profile"
import Register from "../Views/Register/Register"
import Favorites from "../Views/Favorites/Favorites"
import Ads from "../Views/Ads/Ads"

const Main = () => (

    <Switch>
      <Route exact path="/myprofile/ads" component={Ads} /> 
      <Route exact path="/myprofile/favorites" component={Favorites} /> 
      <Route exact path="/myprofile/profile" component={Profile} />  
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>

);
export default Main;