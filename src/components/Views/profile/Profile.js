import React, {Component} from 'react';
import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import ProfileNavBar from './ProfileNavBar';
import EditProfile from './EditProfile';

class Profile extends Component{

    state = {
        user: {},
        showView: true,
        imageProfile: "",
        imageId: ""
    };
    


    componentDidMount() {   

        const id = JSON.parse(localStorage.getItem("userInfo")).userId;

          const urlGraphql = 'http://35.209.170.220:4000';

        const queryProfile = {
          
            "variables":{},
            "query":`{
                profileByID(profile_id: ${id}) {
                    id
                    nickname
                    email 
                    phone  
                }
            }`
        } 

            const options = {
                method: 'POST',
                data: queryProfile,
                url: urlGraphql,
            };

        
        axios(options)
        .then(res => {
            this.setState({ 
            user: res.data.data.profileByID
            });                        
        })


        const UrlImageProfile = 'http://35.209.170.220:3000/user-images';


        axios.get(UrlImageProfile+"/byid/"+id)
        .then(element=>{
            console.log(element.data[0]._id);
            
            this.setState({ 
                imageProfile:  element.data[0].user_image,
                imageId: element.data[0]._id
              })
            console.log(this.state.imageId);
            
        }).catch( (error) =>{
        if(error.status === 404){
            console.log("error 404, no encontrada la imagen");
        }
        });
 
    }

        
    changeView(){

        const isVisible = this.state.showView;

        this.setState({
            showView: !isVisible
        })
        
    }

    callbackFunction = (EditProfileData) => {
        
        console.log("entra2");

        const id = JSON.parse(localStorage.getItem("userInfo")).userId;

        const urlGraphql = 'http://35.209.170.220:4000';

        const queryProfile = {
          
            "variables":{},
            "query":`{
                profileByID(profile_id: ${id}) {
                    id
                    nickname
                    email 
                    phone  
                }
            }`
        } 

            const options = {
                method: 'POST',
                data: queryProfile,
                url: urlGraphql,
            };

        axios(options)
        .then(res => {
            this.setState({ 
                user: res.data.data.profileByID,
                showView: EditProfileData
            });            
        })
    }

    render(){

        const data = this.state.user;
        
        return(

            <div>

                {
                    this.state.showView?
                    <div className="profile-navbar d-flex flex-column">
                
                    
                    <ProfileNavBar/>
                    <Container>
    
                        <div className="row">
                            <div className="col">
                                <br></br>
                                <img
                                    className="rounded-circle"
                                    width={171}
                                    height={180}
                                    src={'http://35.209.170.220:3000/'+this.state.imageProfile}
                                />
                                  
                                <br></br>
               
                               <div className="mt-3">
                                    <h4>Nombre: {this.state.user.nickname} </h4>
                                    <h4>Email: {this.state.user.email} </h4>
                                    <h4>Teléfono: {this.state.user.phone}</h4>
                               </div>

                            </div>
                        </div>

                    </Container>

                        <button  
                                type="button"
                                onClick={(e) => this.changeView()} 
                                className="btn btn-sm btn-primary w-25 mx-auto m-3"
                                data-toggle="modal" 
                                data-target="#exampleModal">
                                <h4 className="m-0">Editar perfil</h4>
                        </button>

                    </div>
                :
                <EditProfile 
                    
                    user = {this.state.user}
                    idImgage ={this.state.imageId}

                />

                }
               
                </div>
  
        );
    }
}

export default Profile;