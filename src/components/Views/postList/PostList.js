import React, { Component } from 'react';
import './PostList.css';
import axios from 'axios';
import Post from '../post/Post';
import store from  "../../Redux/store";
import Form from 'react-bootstrap/Form';	
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
 
class PostList extends Component {

    

    constructor(props){
        super();

        this.state = {
            JsonPosts: [],
            JsonImages: [],
            current_fk: 0,
            search: "?",	
            categories: Array(10).fill(false),	
            minPrice: "0",	
            maxPrice: "9999999999",
            currentPage: 1
 
        };

        this.handleClickLast = this.handleClickLast.bind(this)
        this.handleClickNext = this.handleClickNext.bind(this)
        
        
         store.subscribe(()=>{
             
           this.setState({
              JsonPosts: store.getState().JsonPosts,
              JsonImages: store.getState().JsonImages
            })
     
         })
       }

       handleClickLast(){
            if(this.state.currentPage !== 1){
                this.setState({currentPage: this.state.currentPage - 1}, this.searchPosts(this.state.currentPage-1))
                //this.handleUpdatePosts()
                store.dispatch({type:"change",
                    JsonPosts: store.getState().JsonPosts,
                    JsonImages: store.getState().JsonImages,	
                    filter: store.getState().filter,
                    currentPage: this.state.currentPage-1
                        
                });
            }

        }

        handleClickNext(){ 
             
            if(this.state.JsonPosts !== []){

                this.setState({currentPage: this.state.currentPage + 1}, this.searchPosts(this.state.currentPage+1))
                //this.handleUpdatePosts()
                store.dispatch({type:"change",
                JsonPosts: store.getState().JsonPosts,
                JsonImages: store.getState().JsonImages,	
                    filter: store.getState().filter,
                    currentPage: this.state.currentPage + 1
                });
            }
        }
       categories_map =
            [ 
                'carros', 'motos','telefonos', 'tablets',	
                'desktops', 'portatiles', 'ventas de inmuebles',	
                'arriendo de inmuebles','buscar empleos',	
                'clases'
            ];	
            min = 0;	
            max = 9999999999;	

    searchPosts(currentPage) {

         
       // let urlPosts  ='http://35.209.82.198:3002/product';
        const urlGraphql = 'http://35.208.164.215:4000';
        let pagination = '&pageNumber=' + currentPage + '&nPerPage='+ '10';
        
         
        let queryPosts =  {
            
            "operationName":null,
            "variables":{},
            "query":
            `{ 
                productByFilter(text: \"${this.state.search+pagination}\") {
                    _id  
                    title
                    description
                    price
                    priceType
                    city
                    department
                }
            }`
        }

           
              


        if (this.props.profile !== undefined) {

            const id = JSON.parse(localStorage.getItem("userInfo")).userId;

            queryPosts =  {
                "variables":{},
                "query":`{
                    productByFilter(
                        text: \"?profile=${id}\") {
                            _id   
                            title
                            description    
                            price    
                            priceType
                            city
                            department
                        }
                }`
            }

        }


        if (this.props.favorite !== undefined) {
            
            queryPosts =   {
                "operationName":null,
                "variables":{},
                "query":`{
                    getProducts(text: \"${this.props.favorite}\") {
                        _id    
                        title    
                        description   
                        price   
                        priceType
                        city
                        department  
                    }
                }
            `}

        }


 
        const options = {
            method: 'POST',
            data: queryPosts,
            url: urlGraphql,
        };
        
        const urlImages ='http://35.209.82.198:3000/ads-images/byid/';
        console.log(this.props.favorite);
        
       
        axios(options)
        .then(result=>{

            console.log("entra axios");
            
            let buffer = this.props.favorite !== undefined?result.data.data.getProducts:result.data.data.productByFilter;
            buffer = buffer.filter(Boolean);

            
            this.setState({
                JsonPosts: buffer,
                JsonImages: new Array(buffer.length)
            });

             
            
            buffer.forEach((post, i) => {         
                
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

  
    componentDidMount(){	
        this.searchPosts(this.state.currentPage);	

    }	

    componentWillReceiveProps(nextProps) {
        this.props = nextProps;
        this.searchPosts(this.state.currentPage);
    }

  
    handleClick = (data) => {

         this.setState({

            current_fk: data

        })
    }
    

    handleChange(index, event) {	
        const categories = this.state.categories.slice();	
        categories[index] = event.target.checked	
        this.changeFilter(categories, this.state.minPrice, this.state.maxPrice);	
    }	
    handleChangePrice(option, event) {	
        if(option === 1)	
            this.min = event.target.value	
        else	
            this.max = event.target.value	
    }	
    handlePriceButton(){	
        this.changeFilter(this.state.categories, this.min, this.max)	
    }	
    	
    changeFilter(categories, minPrice, maxPrice){	
        var arrayLength = categories.length	
        let filter = '?'	
        for (var i = 0; i < arrayLength; i++) {	
            if(categories[i])	
                filter += "subcategory[]=" + this.categories_map[i] + "&"	
        }	
        	
        minPrice = minPrice === "" ? "0": minPrice;	
        maxPrice = maxPrice === "" ? "9999999999": maxPrice;	
        filter += "priceFilter[]=" + minPrice + "&"	
        filter += "priceFilter[]=" + maxPrice + "&"	
        	
        this.setState({ categories: categories,	
                        search: filter,	
                        minPrice: minPrice,	
                        maxPrice: maxPrice}, () => this.searchPosts())	
        	
        store.dispatch({type:"change",	
                        JsonPosts: store.getState().JsonPosts,	
                        JsonImages: store.getState().JsonImages,	
                        filter: filter});	
    }	

    

    render() {

       
        

        let status;
        
        try {
            
           status = JSON.parse(localStorage.getItem("userInfo")).userId
            
        } catch (error) {

            status = 0
            
        }

        
        console.log(this.state.current_fk);
        
        const data = this.state.JsonPosts;

        
        const result = data.map((post, index) => 

             

            <div key={index} className="row p-4 m-2 shadow bg-white rounded">
                <div className="d-inline col-md-3 m-0 p-0">
                    <img src={'http://35.209.82.198:3000/'+this.state.JsonImages[index]}  width="160" height="160"/>
                </div>
                <div className="d-inline col-md-4">
                    <h3 className="text-md-left text-ms-center">{post.title}</h3>
                    <h4 className="text-md-left text-ms-center mb-2">{post.description}</h4>
                    <h5 className="text-md-left text-ms-center d-inline">{post.department} - </h5>
                    <h5 className="text-md-left text-ms-center d-inline">{post.city}</h5>
                </div>
                <div className="d-inline col-md-4 mx-center">
                    <h4 className="text-center">$:{post.price}</h4>
                    <h5 className="text-center mb-2">{post.priceType}</h5>
                    <button   id={index}   onClick={((e) => this.handleClick(post._id))}
                        value={post._id}  
                        type="button"
                        className="moreInfo btn btn-secondary px-4 mt-4"
                        data-toggle="modal" 
                        data-target="#exampleModal">
                        <span className="m-0">Ver mas</span>
                  
                    </button>
                 </div>
            </div>
        );


        return (

                
                <div className="row justify-content-md-center">

                    {
                    (this.props.profile === undefined && this.props.favorite === undefined) &&	
                        <div className="filtros col-lg-2 col-md-2 col-sm-12 shadow bg-white rounded text-left categories mt-2">	
                        <Form>	
                            {['Carros','Motos','Telefonos','Tablets',	
                            'Computadores de escritorio', 'Portatiles',	
                            'Venta de inmuebles', 'Arriendo de inmuebles',	
                            'Empleo', 'Clases'].map((type, index) => (	
                                <div key={`categories-${index}`} className="mb-3">	
                                <Form.Check 	
                                    checked={this.state.categories[index]}	
                                    type={'checkbox'}	
                                    id={`category-${index}`}	
                                    label={type}	
                                    onChange={(event) => this.handleChange(index, event)}	
                                />	
                                </div>	
                            ))}	
                            <Form.Group controlId="formMinPrice">	
                                <Form.Label>Precio Mínimo</Form.Label>	
                                <Form.Control onChange={(event) => this.handleChangePrice(1, event)} type="number" placeholder="Mín" />	
                            </Form.Group>	
                            <Form.Group controlId="formMaxPrice">	
                                <Form.Label>Precio Máximo</Form.Label>	
                                <Form.Control onChange={(event) => this.handleChangePrice(2, event)} type="number" placeholder="Máx" />	
                            </Form.Group>	
                        </Form>	
                        <Button onClick ={() => this.handlePriceButton()} variant="primary" type="submit">	
                                Buscar	
                        </Button>	
                            
                        </div>
                    }
                    
                    <div className="col-md-8 col-ms-10">
                        {result}
                    </div>


                    <div className="col-md-5 row justify-content-md-center">
                        {this.state.JsonPosts !== [] && <ButtonGroup aria-label="Basic example" size="lg">
                            <Button disabled={ (this.state.currentPage===1 ? true : false)} variant="secondary" onClick={this.handleClickLast}>Anterior</Button>
                            <Button disabled={ (this.state.JsonPosts.length > 0 ? false : true)}  variant="secondary" onClick={this.handleClickNext}>Siguiente</Button>
                        </ButtonGroup>}
                    </div>

                    <div>          
                    
                     <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close"  data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>                          
                        </div>
                        <div className="modal-body">
                            {
                                this.state.current_fk!==0?
                                    <Post 
                                        update={() => {this.forceUpdate()}}
                                        fk_post = {this.state.current_fk}
                                        id_profile = {status}
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