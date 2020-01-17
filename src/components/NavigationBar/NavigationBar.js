import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import './navigationbar-styles.css';
import { NavDropdown } from 'react-bootstrap';
import './navigationbar-styles.css';
import { withRouter } from 'react-router-dom';
import store from  "../Redux/store";
import axios from 'axios';

 
class NavigationBar extends Component {

  state ={
    search: ""
   }

  handleChange = (e)=>{
    this.setState({

      [e.target.name] : e.target.value  
     
    });

       
    
  }
    
  constructor(props) {
    super(props)
    this.handleLoggoff = this.handleLoggoff.bind(this);
  }

  handleLoggoff(){
    localStorage.removeItem("userInfo");
    let path = `/home`;
    this.props.history.push(path);
    window.location.reload(); 
  }


  submitData = e => {
        
    const urlGraphql = 'http://35.209.170.220:4000';
    let search;
    let pagination = '&pageNumber=' + store.getState().currentPage + '&nPerPage='+ '10';

    if (this.state.search !== "") {
      search = store.getState().filter + 'search=' + this.state.search + pagination;	

    } else {
    
      search = '?' + pagination;
    }
    

    const queryPosts=  {
        "variables":{},
        "query":
        `{ 
            productByFilter(text: \"${search}\") {
                _id  
                title
                description
                price
                priceType
            }
        }`
    }

    const options = {
        method: 'POST',
        data: queryPosts,
        url: urlGraphql,
    };
          
    
    const urlImages ='http://35.209.170.220:3000/ads-images/byid/';
    
   
    axios(options)
    .then(result => {
     
        store.dispatch({type:"change",
          JsonPosts: result.data.data.productByFilter,
          JsonImages: new Array(result.data.data.productByFilter.length),	
          filter: store.getState().filter, 
          currentPage: store.getState().currentPage
        });

        result.data.data.productByFilter.forEach((post, i) => {         
            
            axios.get(urlImages+post._id)
            .then(element=>{

              store.dispatch({type:"change",
                JsonPosts: store.getState().JsonPosts,
                JsonImages: [...store.getState().JsonImages.slice(0, i), element.data[0].ad_image, ...store.getState().JsonImages.slice(i + 1)],	
                filter: store.getState().filter,
                currentPage: store.getState().currentPage
              });
                 
            }).catch( (error) =>{
                if(error.status === 404){
                    console.log("error 404, no encontrada la imagen");
                } 
            });

                

        });
    }).catch(console.log);
    
      e.preventDefault();
      //console.log(store.getState().search);

  
    }
    render(){
        return (

          <div>
             <nav className="navbar navbar-expand-lg navbar-light bg-white">
              <a className="navLogo" href="/home">
              < img 
                      src= "/logo.png"
                      width="110"
                      height="50"
                      alt="EZiBuy logo"
                    />
              </a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse"  id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  
                  <li className="nav-item active">
                     {!this.props.userLoggedIn && <a className="nav-link" href="/login">Ingresar</a>}
                  </li>
                  <li className="nav-item active">
                     {!this.props.userLoggedIn && <a  className="nav-link" href="/register">Registrate</a>}
                  </li>
                  <li className="nav-item active">
                      <a className="nav-link" href="/postlist">Catalogo</a>
                  </li>
                  <li className="nav-item active">
                    {this.props.userLoggedIn &&<a className="nav-link" href="/sale" >Vender</a>}
                  </li>
                  <li className="nav-item active">
                    {this.props.userLoggedIn &&<a className="nav-link" href="/myprofile/profile">Perfil</a>}
                  </li>                              
                </ul>
                
                <form className="form-inline my-2 my-lg-0" onSubmit={this.submitData}>
               
                  <div className="md-form mt-0 mr-2">
                    <input 
                      className="form-control" 
                      type="search" 
                      name="search"
                      placeholder="Ingresa el texto" 
                      aria-label="Search"
                      onChange={this.handleChange}
                      value={this.state.search} 
                    />

                  </div>
                  
                  <button type="button" class="btn btn-primary"  type="submit">Buscar</button>
                </form>
                 {this.props.userLoggedIn && 
                    
                    <button type="button" class="btn btn-danger ml-3"  variant="danger" onClick={this.handleLoggoff} type="submit">Cerrar Sesión</button>
 
                  }
              </div>
            </nav>
          </div>

        );
    }
}

export default withRouter(NavigationBar);