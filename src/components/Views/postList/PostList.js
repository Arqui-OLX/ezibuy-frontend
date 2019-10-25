import React, { Component } from 'react';
import './PostList.css';
import axios from 'axios';

class PostList extends Component {

    state = {posts: []};
    

    componentDidMount() {
        const url ='http://35.208.241.159:5000/graphql?';

        const getPosts = {"query":"query {\n  allPosts {\n    title\n    description\n  }\n}"};

        axios.post(url, getPosts)
        .then(res => {
            this.setState({ posts: res.data.data.allPosts});
        })
    }


    render() {

        const data = this.state.posts;

        const result = data.map((post, index) => 
            <div key={index} className="row p-4 m-2 shadow bg-white rounded">
                <div className="d-inline col-md-3 m-0 p-0">
                    <img src="https://dummyimage.com/200x200/000/fff" className="" alt="..."/>
                </div>
                <div className="d-inline col-md-4">
                    <h4 className="text-md-left text-ms-center">{post.title}</h4>
                    <h5 className="text-md-left text-ms-center mb-2 text-muted">{post.description}</h5>
                </div>
                <div className="d-inline col-md-4 align-self-center">
                    <h4 className="text-center">Precio</h4>
                    <h5 className="text-center mb-2 text-muted">Tipo Precio</h5>
                    <button type="button" className="btn btn-secondary px-4 mt-4 float-right">
                        <h4 className="m-0">Contactar</h4>
                    </button>
                </div>
            </div>
        );



        return (
            <div className="position-relative">
            <div className="row m-4 justify-content-md-center position-relative" style={{backgroundColor: "#eceff1"}, {zIndex:50}}>
                <div className="h-100 col-md-3 col-ms-10 m-4 p-2 shadow bg-white rounded" style={{backgroundColor: "white"}}>

                    <div>
                        
                        <h4 className="bg-info p-2 m-0">Ubicación</h4>

                        <div className="">
                            <h6 className="select p-2 m-0">Bogotá</h6>
                            <h6 className="select p-2 m-0">Medellin</h6>
                            <h6 className="select p-2 m-0">Barranquilla</h6>
                        </div>
                    </div>

                    <div>
                        
                        <h4 className="bg-info p-2 m-0">Categorias</h4>

                        <div>
                            <h6 className="select p-2 m-0">Automoviles</h6>
                            <h6 className="select p-2 m-0">Celulares</h6>
                            <h6 className="select p-2 m-0">Servicios</h6>
                        </div>
                    </div>

                    <div>
                        <h4 className="bg-info p-2 m-0">Precio</h4>
                        <div className="my-2">
                            <input type="text" className="form-control px-4 mx-2 w-25 d-inline" placeholder="Min"></input>
                            <input type="text" className="form-control px-4 mx-2 w-25 d-inline" placeholder="Max"></input>
                            <button type="button" className="btn btn-secondary">
                                <i className="far fa-check-circle"></i>
                            </button>
                        </div>
                    </div>
                    
                </div>

                <div className="col-md-8 col-ms-10">
                    {result}
                </div>
            </div>
            <div className="position-fixed" style={{zIndex:100}}> 
                <h1>hello world</h1>
            </div>
            </div>
        );
    }

}

export default PostList;