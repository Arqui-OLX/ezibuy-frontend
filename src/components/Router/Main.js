import React from "react";
import { Switch, Route } from "react-router-dom";


import Login from "../Views/Login/Login"


const Main = () => (

    <Switch>
  
      <Route exact path="/login" component={Login} />
    </Switch>

);
export default Main;