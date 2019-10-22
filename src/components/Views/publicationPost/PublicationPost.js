import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./PublicationPost.css"
  


class PublicationPost extends Component {

      state = { 
        post : {
            title : '',
            description : '',
        }
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
                         
                                  <button  className="btn btn-primary btn-block  mt-5" >Publicar</button>

                            </form>
 
                        </div> 

                         
                         
                    </div>   
                 </div>
            </div>
         
            
        
        );

    }
}

 
export default PublicationPost;