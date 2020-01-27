import React from "react";
import { Switch, Route } from "react-router-dom";


import Login from "../Views/Login/Login"
import LandingPage from "../Views/landingPage/LandingPage"
import Post from "../Views/post/Post"
import PublicationPost from "../Views/publicationPost/PublicationPost"
import Profile from "../Views/profile/Profile"
import Favorites from "../Views/favorites/Favorites"
import Ads from "../Views/ads/Ads"
import PostList from "../Views/postList/PostList"
import Register from "../Views/Register/Register"
import Chat from  "../Views/Chat/Chat"
import Privacy from  "../Views/privacy/Privacy";
import AboutUs from  "../Views/aboutUs/AboutUs";

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.handleSessionStorage = this.handleSessionStorage.bind(this);
  }
  
  handleSessionStorage(val){
    this.props.handleSessionStorage(val);
  }

  render(){
    return(
      <Switch>
        <Route exact path="/" component={LandingPage} />

        <Route exact path="/login" component={() => 
          <Login 
            handleSessionStorage={this.props.handleSessionStorage}
            loginError= {false}
          />} 
        />

        <Route exact path="/home" component={LandingPage} />
        <Route exact path="/post" component={Post} />
        <Route exact path="/sale" component={PublicationPost} />
        <Route exact path="/postlist" component={PostList} />
        <Route exact path="/myprofile/profile" component={Profile} /> 
        <Route exact path="/myprofile/favorites" component={Favorites} /> 
        <Route exact path="/myprofile/ads" component={Ads} /> 
        <Route exact path="/myprofile/messages" component={Chat}/>
        <Route exact path="/register" component={Register}/> 
        <Route exact path="/privacy" component={Privacy}/> 
        <Route exact path="/aboutus" component={AboutUs}/> 

      </Switch>
    )
  }
}
export default Main;