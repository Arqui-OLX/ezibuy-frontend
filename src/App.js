import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Main from "./components/Router/Main"
import Footer from './components/Footer/Footer';


import { BrowserRouter as Router } from "react-router-dom";


class App extends React.Component{
  constructor(props) {
    super(props)
    this.handleSessionStorage = this.handleSessionStorage.bind(this);
 
  }
  

  state={
    userLoggedIn: false
  }

  handleSessionStorage(val){
    this.setState({userLoggedIn: val});
  }

  componentDidMount(){
    !!localStorage.getItem("userInfo") && this.setState({userLoggedIn: true}); 
  }

  render(){
    return (
        
          <div className="app h-100 ">
            <Router>
            
              <NavigationBar userLoggedIn ={this.state.userLoggedIn}/>
              <Main handleSessionStorage={this.handleSessionStorage} />
              <Footer/>
            
            </Router>
          </div>      
    );
  }
}


export default App;
