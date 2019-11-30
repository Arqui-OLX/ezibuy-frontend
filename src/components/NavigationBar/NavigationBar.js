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
  constructor(props) {
    super(props)
  
    this.handleTextBoxChange = this.handleTextBoxChange.bind(this); 
    this.handleLoggoff = this.handleLoggoff.bind(this);

    this.state = {
      search: ""
    }

    store.subscribe(()=>{
             
      this.setState({
         search: store.getState().search
       })

    })
  }
  

 

  handleTextBoxChange(event){
    this.setState({search: event.target.value})
  }
    

  handleLoggoff(){
    localStorage.removeItem("userInfo");
    let path = `/home`;
    this.props.history.push(path);
  }


  submitData = e => {
    
    const urlGraphql = 'http://35.208.241.159:4000';
    let search;
        var queryPosts
        if (this.state.search !== "") {
            search = '?pageNumber=1&nPerPage=1&search=' + this.state.search;
            queryPosts =  {
                
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
        } else {
            queryPosts =  {
            
                "operationName":null,
                "variables":{},
                "query":
                `{ 
                    productByFilter(text: "?pageNumber=1&nPerPage=1") {
                        _id  
                        title
                        description
                        price
                        priceType
                    }
                }`
            }
        }

    const options = {
        method: 'POST',
        data: queryPosts,
        url: urlGraphql,
    };
          
    
    const urlImages ='http://35.209.82.198:3001/ads-images/byid/';
    
   
    axios(options)
    .then(result => {
     
        store.dispatch({type:"change",
          JsonPosts: result.data.data.productByFilter,
          JsonImages: new Array(result.data.data.productByFilter.length),
          search: this.state.search
        });

        result.data.data.productByFilter.forEach((post, i) => {         
            
            axios.get(urlImages+post._id)
            .then(element=>{

              store.dispatch({type:"change",
                JsonPosts: store.getState().JsonPosts,
                JsonImages: [...store.getState().JsonImages.slice(0, i), element.data[0].ad_image, ...store.getState().JsonImages.slice(i + 1)],
                search: this.state.search
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
              <Navbar variant="dark"  expand="lg">
                <Navbar.Brand href="/" className = "navLogo" >
                    < img 
                      src= "/logo.png"
                      width="130"
                      height="70"
                      alt="EZiBuy logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link className="texto" href="/home" >EzIBuy</Nav.Link>
                    {!this.props.userLoggedIn && <Nav.Link href="/login">Ingresar</Nav.Link>}
                    {!this.props.userLoggedIn && <Nav.Link href="/register" >Registrarse</Nav.Link>}
                    <Nav.Link href="/postlist">Catalogo</Nav.Link> 
                    {this.props.userLoggedIn &&<Nav.Link href="/sale" >Vender</Nav.Link>}
                    {this.props.userLoggedIn &&<Nav.Link href="/myprofile/profile">Perfil</Nav.Link>}
                    <NavDropdown title="Ver más" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#action1">Categorías</NavDropdown.Item>
                      <NavDropdown.Item href="#action2">Sobre nosotros</NavDropdown.Item>
                      <NavDropdown.Item href="#action3">Contáctenos</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action4">Términos y condiciones</NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  <Form inline onSubmit={this.submitData}>
                  {this.props.userLoggedIn && 
                    
                      <Button className="mr-3" variant="danger" onClick={this.handleLoggoff} type="submit">Cerrar Sesión</Button>
                    
                  }
                    <FormControl 
                      type="text" 
                      placeholder="Buscar..." 
                      className="mr-sm-2" 
                      name="search"
                      onChange={this.handleTextBoxChange}
                    />
                    <Button variant="outline-light" type="submit" >Buscar</Button>
                  </Form>
                </Navbar.Collapse>
            </Navbar>
          </div>

        );
    }
}

export default withRouter(NavigationBar);