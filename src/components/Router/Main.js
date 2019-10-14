import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../Views/Login/Login"
import LandingPage from "../Views/LandingPage/LandingPage";


const Main = () => (

    <Switch>
      <Route exact path="/home" component={LandingPage} />
      <Route exact path="/login" component={Login} />
    </Switch>

);
export default Main;