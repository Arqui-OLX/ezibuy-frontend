import React from "react";
import { Switch, Route } from "react-router-dom";


import Login from "../Views/Login/Login"
import Profile from "../Views/Profile/Profile"


const Main = () => (

    <Switch>
      <Route exact path="/profile" component={Profile} />  
      <Route exact path="/login" component={Login} />
    </Switch>

);
export default Main;