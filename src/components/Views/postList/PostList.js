import React, { Component } from 'react';
import './PostList.css';
import axios from 'axios';
import Post from '../post/Post'
class PostList extends Component {
    
 

    state = {
        JsonPosts: [],
        JsonImages: [],
        current_fk: 0
    };
    
      
      
    componentDidMount() {

        let urlPosts  ='http://35.209.82.198:3002/product';
        const urlGraphql = 'http://35.208.241.159:4000';

        const queryPosts= 
            {
                "operationName":null,
                "variables":{},
                "query":
                `{ 
                    allProducts {
                        title
                        description
                        price
                        priceType    
                        features {
                            featureName
                            featureValue
                        }   
                        _id
                        fk_profile  
                    }
                }`
            }

            const options = {
                method: 'POST',
                data: queryPosts,
                url: urlGraphql,
            };
              


        if (this.props.profile !== undefined) {
            urlPosts  ='http://35.209.82.198:3002/product?profile='+this.props.profile;
        }

        
        const urlImages ='http://35.209.82.198:3001/ads-images/byid/';
        
       
        axios(options)
        .then(result=>{
            console.log(result.data);
            
            this.setState({
                JsonPosts: result.data.data.allProducts ,
                JsonImages: new Array(result.data.data.allProducts.length)
            });
            
            result.data.data.allProducts.forEach((post, i) => {         
                
                axios.get(urlImages+post._id)
                .then(element=>{
                    
                    this.setState({ 
                        JsonImages: [...this.state.JsonImages.slice(0, i), element.data[0].ad_image, ...this.state.JsonImages.slice(i + 1)]
                    })
                    
                }).catch( (error) =>{
                    if(error.status === 404){
                        console.log("error 404, no encontrada la imagen");
                    }
                });
    
                    

            });
        }).catch(console.log);

        
    }

  
    handleClick = (data) => {


         this.setState({

            current_fk: data

        })
    }
    
    

    render() {

 
        const data = this.state.JsonPosts;

        
        const result = data.map((post, index) => 

             

            <div key={index} className="row p-4 m-2 shadow bg-white rounded">
                <div className="d-inline col-md-3 m-0 p-0">
                    <img src={'http://35.209.82.198:3001/'+this.state.JsonImages[index]}  alt="..." className="img-fluid"/>
                </div>
                <div className="d-inline col-md-4">
                    <h4 className="text-md-left text-ms-center">{post.title}</h4>
                    <h5 className="text-md-left text-ms-center mb-2 text-muted">{post.description}</h5>
                </div>
                <div className="d-inline col-md-4 mx-center">
                    <h4 className="text-center">Precio:</h4>
                    <h4 className="text-center">{post.price}</h4>
                    <h5 className="text-center mb-2 text-muted">{post.priceType}</h5>
                    <button   id={index}   onClick={((e) => this.handleClick(post._id))}
                        value={post._id}  
                        type="button"
                        className="btn btn-secondary px-4 mt-4"
                        data-toggle="modal" 
                        data-target="#exampleModal">
                        <h4 className="m-0">Ver mas</h4>
                    </button>
                 </div>
            </div>
        );


        return (

                
                <div className="row justify-content-md-center">
                    
                    <div className="col-md-8 col-ms-10">
                        {result}
                    </div>


                    <div>
 
                    
                    
                     <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {
                                this.state.current_fk!==0?
                                    <Post 
                                    fk_post = {this.state.current_fk}
                                    />
                                :null
                            }
                           
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                    </div> 

                </div>
                </div>

                



        );
    }

}

export default PostList;