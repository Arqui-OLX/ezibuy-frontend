import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./PublicationPost.css";
import axios from 'axios';


class PublicationPost extends Component {

      
    state = {
        
         post : {
            title : '',
            description : '',
         }
          
    
    };
    

    submitData = e => {
         
        const url ='http://35.208.241.159:5000/graphql?';

       // const publication = {"query":`mutation {\n  createPost(post: {  title: \"${this.state.post.title}\", description: \"${this.state.post.description}\", date_publication: \"2008\" , date_expiration: \"2020\", fk_product: 1234}) {\n    id\n  }\n}\n`};
       const publication = {"query":"mutation {\n  createPost(post:{\n    title: \"`${this.state.post.title}`\",\n    description:\`this.state.post.description`,\n    date_publication: \"3/10/18\",\n    date_expiration:\"4/11/18\",\n    fk_product: 123334\n  }) {\n    id\n  }\n  \n  \n}","variables":null}
         
        axios.post(url, publication)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    
    }






    
    handleChange = e => {
        // colocar lo que el usuario escribe en el state
        this.setState({
           post : {
               ...this.state.post,
               [e.target.name] : e.target.value
           }
 
        })
 
    }
   
    render() {

        return (
            <div className="container MB-5">
                <div className="row  w-75 mx-auto ">
                   <div className="col-lg-6 mx-auto">

                  
                        <div className="mt-5 mb-2 ">
                            <h1>Publicar un producto</h1>
                            <form >
                                <div className="form-group  ">
                                    <input type="text" className="form-control " id="numberUser" aria-describedby="emailHelp" placeholder="titulo" name="title" value={this.state.post.title}  onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <textarea type="text" className="form-control" id="exampleInputPassword1" placeholder="descripcion" rows="6" name="description" value={this.state.post.description}  onChange={this.handleChange}/>
                                </div>                         
                         
                                  <button  className="btn btn-primary btn-block  mt-5" onClick={this.submitData} >Publicar</button>

                            </form>
 
                        </div> 

                         
                         
                    </div>   
                 </div>
            </div>
         
            
        
        );

    }
}

 
export default PublicationPost;