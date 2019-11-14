import React, {Component} from 'react';
import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios'
import ProfileNavBar from './ProfileNavBar'
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
 
//import store from  "../../Redux/store"


class  EditProfile extends Component{

    
  state = {

    user:  this.props.user
    
 
 };
     
// changeName(name){
//     store.dispatch({type:"cambio", name:name});
// }

 
    
    sendData = (e) => {
        this.props.parentCallback(e);

        const url ='http://35.208.164.215:3001/profile/1';

     
        let data = this.state.user;
    
        axios.put(url, data)
        .then(res => {
            
            console.log(res)
            // this.setState({ user:  res.data.data.userById.data[0]});
        })
        
   }




   

   handleChange = e => {

         
        this.setState({
            user : {
                ...this.state.user,
                [e.target.name] : e.target.value
            }
        })
    }

    render(){


 
        
        return(
            <div className="profile-navbar d-flex flex-column">
             
                
                <ProfileNavBar/>
                <Container>
 
                    <Row>
                        <Col className="mt-5">
                            <br></br>
                           
                                <FilePond  
                                    onupdatefiles={(fileItems) => {
                                    this.setState({files: fileItems.map(fileItem => fileItem.file)      });}}  
                                    onDrop={this.handleUploadImages}
                                    allowMultiple={false}
                                    required ={true}
                                />
                                 <p>Agrega tu foto de perfil</p>
                            
                           
                        </Col>
                        <Col>
                            <br></br>
                            <h2 className=""><strong>Edita tu información</strong></h2>
                            <hr></hr>
                            <input 
                                        id="mascota"
                                        type="text" 
                                        className="form-control w-100" 
                                        id="title" 
                                        placeholder="Nickname" 
                                        name="nickname"   
                                        onChange={this.handleChange}
                                        value={this.state.user.nickname}
                                        
                                     required/>

                                <input 
                                        type="text" 
                                        className="form-control w-100 mt-3" 
                                        id="title" 
                                        placeholder="email" 
                                         name="email"   
                                        onChange={this.handleChange}
                                        value={this.state.user.email}                
                                     required/>

                                <input 
                                        type="number" 
                                        className="form-control w-100 mt-3" 
                                        id="title" 
                                        placeholder="Telefono" 
                                         name="phone"   
                                        onChange={this.handleChange}
                                        value={this.state.user.phone}                   
                                     required/>
                         </Col>
                        <Col></Col>
                    </Row>

                </Container>

                <button  
                    onClick={(e) => this.sendData(true)} 
                    type="button"
                    className="btn btn-sm btn-success w-25 mx-auto m-3"
                    data-toggle="modal" 
                    data-target="#exampleModal">
                    Aceptar 
                </button>

            </div>
            
        );
    }
}


export default EditProfile;