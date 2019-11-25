import React, {Component} from 'react';
//import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios'
import ProfileNavBar from './ProfileNavBar'
import { FilePond } from 'react-filepond';
//import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import { thisExpression } from '@babel/types';
 


class  EditProfile extends Component{

    
  state = {

    user:  this.props.user,
    files: [],
    idImage: this.props.idImgage,
     
 };

    sendData = (e) => {

        const id = JSON.parse(localStorage.getItem("userInfo")).userId;
    
        const urlGraphql = 'http://35.208.241.159:4000';

        const queryEditProfile = {
            "variables":{},
            "query":`mutation {  
                updateProfile(
                    id: ${id}
                    profile: {
                        nickname: \"${this.state.user.nickname}\",
                        email: \"${this.state.user.email}\",
                        phone: \"${this.state.user.phone}\"
                })
            }`
        }

        const options = {
            method: 'POST',
            data: queryEditProfile,
            url: urlGraphql,
        };

        axios(options)
        .then(res => {
            console.log(res);
            this.setState({
                redirec: true
            })
        })

 
        var bodyFormData = new FormData();

        bodyFormData.set('user_id', id);

        bodyFormData.append('userImage',this.state.files[0]); 

         
        const UrlImageEditProfile = 'http://35.209.82.198:3001/user-images/';

        console.log(UrlImageEditProfile + this.state.idImage);
        

        if(this.state.files[0] != undefined){
            console.log("ENTRA");
            
            axios.patch(UrlImageEditProfile+this.state.idImage, bodyFormData)
           
            
            .then( (response)=>{
                console.log(response);

            }).catch((error) =>{
                
                console.log(error);
            });
        }
            
    
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