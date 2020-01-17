import React, {Component} from 'react';
import ProfileNavBar from "../profile/ProfileNavBar";
import PostList from '../postList/PostList'
import axios from 'axios'
import './Favorites.css';

class Favorites extends Component {
s
    constructor(props){
        super();
        this.state={

            favoriteList: "0"
        }
    }
    
    componentWillMount(){

        const urlGraphql = 'http://35.209.170.220:4000';

        
        const listFavorites= {
            "operationName":null,
            "variables":{},
            "query":`{
                getFavorites(userId: ${JSON.parse(localStorage.getItem("userInfo")).userId}) {
                    id
                    fk_post 
                }
            }
            `}
            
            const options = {
                method: 'POST',
                data: listFavorites,
                url: urlGraphql,
            };
            
            axios(options)
            .then(res=>{
                
                console.log(res.data.data.getFavorites);
                let dataString ="?";
                
                res.data.data.getFavorites.forEach(element => {
                
                    dataString = dataString + "posts[]=" + element.fk_post +"&"
                    
                });

                this.setState({
                    favoriteList: dataString
                })
                
                console.log(this.state.favoriteList);
                
            }).catch( (error) =>{
                
            });
            
            

    }
    

    render(){
     
        return (
            <div className="profile-navbar d-flex flex-column">
            <ProfileNavBar/>                
            <PostList favorite = {this.state.favoriteList}/>
            </div>
        )
    }

}

export default Favorites;