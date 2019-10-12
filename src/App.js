import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Main from "./components/Router/Main"
import Footer from './components/Footer/Footer';

import { BrowserRouter as Router } from "react-router-dom";


function App() {
  return (
      
        <div className="App">
          <Router>
            <NavigationBar/>
            <Main/>
            <Footer/>
          </Router>
        </div>
      
  );
}


export default App;
