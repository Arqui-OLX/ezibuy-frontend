import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./PublicationPost.css";
import  axios from 'axios';
import hash from 'object-hash';
 

import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import { Redirect } from 'react-router-dom'

registerPlugin( FilePondPluginImagePreview);

const  stateInicial = { 
    // categories=["vehiculos","telefonos y tablets","computadores","inmuebles","empleo","servicios"],
    category: "ninguna",
    arraySubcategory: ["carros","motos","telefonos","tablets", "desktops", "portatiles","ventas de inmuebles","arriendo de inmuebles", "buscar empleos", "clases"], 
    post : {
        title : '',
        description : '',
        price: 0,
        priceType: ''
     },

     fields:[
         // ninguna
         [],
         //vehiculos
        ["marca", "año", "kilometraje", "combustible", "color", "transmisión", "placa"],//carros
        ["marca", "año", "kilometraje", "color", "cilindraje"],//motos
       
         //telefonosTablets
        ["marca"],//telefonos
        ["marca"],//tablets
      
        //computadores
        ["marca"],//desktop
        ["marca"],// portatil
       
        //inmuebles
        ["tipo","cuartos","metros cuadrados","antigüedad","estrato", "tipo de vendedor","parqueadero"],//ventas
        ["tipo","amueblado","metros cuadrados","antigüedad","estrato", "tipo de vendedor","parqueadero"],// arriendo

        //Empleo
        ["tipo","nombre de la compañia","experiencia mín","experiencia máx","salario mín", "salario máx"],//Buscar Empleo
       
        //Servicios
        ["tipo"]//clases
     ],
     features:[
       
     ],
     show: new Array(6).fill(false),
     showFeatures: false,
     subcategory: 0,
     files: [], 
     loading1: true,
     loading2:true,
     buffer: true,
     countPost: 0,
     countPhotos: 0,
     redirect: 0,
   
 }


class PublicationPost extends Component {

    state = { ...stateInicial  }

    componentDidMount() {
        this.id = setTimeout(() => this.setState({ redirect: 2 }), 3000)
      }
    
      componentWillUnmount() {
        clearTimeout(this.id)
      }

    
    showSubCategory = (index,category) => {
        var clone = Object.assign( {}, this.state.show ); //ES6 Clones Object
        switch(clone[index]){
            case false:
            clone[index] = true
                break;
            case true:
                clone[index] = false
                break;
            default:
                console.log("error al  cambiar estado de categoria")
        }
        this.setState({ 
            show: clone,
            category: category 
        });
    }


    showForm = (index, features) => { //showFeatures

       
        this.state.fields[index].forEach((element, i) => {
            features[i] = {
               featureName : element,
               featureValue : ""
            }
        });
        
        
        this.setState({ 
            
            showFeatures: this.state.subcategory === index ?  !this.state.showFeatures : this.state.showFeatures,
            subcategory: index,
            features :features

        });
 
    }
  

    submitData = e => {

        this.setState({
            showInfo: 100
        })
      

        e.preventDefault();  // recarga el formulario

        var uniqueId = hash(Buffer.from(JSON.stringify(this.state)));
 

        var data ={
            title: this.state.post.title,
            description: this.state.post.description,
            price: this.state.post.price,
            priceType: this.state.post.typePrice,
            features: this.state.features,
            category : this.state.category,
            subcategory : this.state.arraySubcategory[this.state.subcategory],
            _id: uniqueId,
            fistImage: this.state.files[0],
            fk_profile:  JSON.parse(localStorage.getItem("userInfo")).userId

        };
        
        //const urlPosts  ='http://35.209.82.198:3002/product';
        const urlImages ='http://35.209.82.198:3001/ads-images';
        const urlGraphql = 'http://35.208.241.159:4000';

        let mutation = {"operationName":null,"variables":{},"query":`mutation {\n  createProduct(product: {_id: \"${uniqueId}\", category: \"${data.category}\", subcategory: \"${data.subcategory}\", title: \"${data.title}\", description:\"${data.description}\", price:  ${data.price} , priceType: \"${data.priceType}\", fk_profile:  ${data.fk_profile} , features:  ${data.features} }) {\n    _id\n    title\n    description\n    price\n    priceType\n    features {\n      featureName\n      featureValue\n    }\n    fk_profile\n  }\n}\n`}

        let example = {"operationName":null,"variables":{},"query":"mutation {\n  createProduct(product: {_id: \"234234234\", category: \"automoviles\", subcategory: \"carros\", title: \"vendo carro\", description: \"Auto deportivo\", price: 10000, priceType: \"electivo\", fk_profile: 234234354, features: [{featureName: \"Kilometraje\", featureValue: \"1000\"}, {featureName: \"marca\", featureValue: \"kia\"}]}) {\n    _id\n    title\n    description\n    price\n    priceType\n    features {\n      featureName\n      featureValue\n    }\n    fk_profile\n  }\n}\n"};

        console.log(mutation);
        

       // var idPost = "";       
        axios.post(urlGraphql, mutation)
        .then( (response) => {
 
            if(response.status === 200){
                
           
                this.setState({
                    loading: false,
                })
            }
            console.log(response);
          //  idPost = response.data._id
            
         })
        .catch( (error) =>{
            this.setState({
                countPost: -1
            })
            console.log(error);
        });

       
    
        this.state.files.forEach((element) => {
        
            var bodyFormData = new FormData();

            bodyFormData.set('ad_id', uniqueId);

            bodyFormData.append('adImage',element); 

            axios.post(urlImages, bodyFormData)

            .then( (response)=>{
             
                if(response.status === 201){
                     this.setState({
                        loading2:false,
                        countPhotos:201
                    })
                }
            
                console.log(response);
                
            }).catch((error) =>{
                this.setState({
                    countPhotos: -1
                })
                console.log(error);
            });
            
        }); 
 
     }
 
    handleChange = e => {


        this.setState({
           post : {
               ...this.state.post,
               [e.target.name] : e.target.value
           }
 
        })
 
    }



    handleChange2 = e => {

        var buffer = [...this.state.features];
        buffer[e.target.id].featureValue = e.target.value;
        
        this.setState({
            features: buffer
        })
 
    }


    render() {

       var listItems = <div></div>;

       var features = [];
       if(this.state.subcategory !==-1){
           
            listItems = this.state.fields[this.state.subcategory].map((i, index) =>
               
                <div key={i} className="form-group">
                     <input 
                        id ={index} 
                        type="text" 
                        className="form-control" 
                        placeholder={i} 
                        name= "featureValue"
                        value={this.state.features[index].featureValue} 
                        onChange={this.handleChange2}                   
                    />
                    
                </div>     

             );
            
       }
        
         
        
 
        return (
 
            <div className="container mb-5">


                <div className="row  w-75 mx-auto bg-light ">

                <div className="col-lg-6  mb-3 mt-3">
                   
                   <ul className="listaProductos">

                       <li className="show-hidden-menu" onClick={(e) => this.showSubCategory(0,"vehiculos")} >vehiculos</li>
 
                            {
                                this.state.show[0]?
                                <ul>
                                    <li  onClick={(e) => this.showForm(1,features)}>carros</li>
                                    
                                    <li onClick={(e) => this.showForm(2,features)}>motos</li>
                                </ul>                                
                                :null
                            }
 
                       <li className="show-hidden-menu"  onClick={(e) => this.showSubCategory(1, "telefonos y tablets" )}  >Telefonos y tablets </li>
 
                            {
                                this.state.show[1]?
                                <ul>
                                    <li onClick={(e) => this.showForm(3,features)}>telefono</li>
                                    <li onClick={(e) => this.showForm(4,features)}>tablet</li>
                                </ul>                                
                                :null
                            }


                        <li className="show-hidden-menu" onClick={(e) => this.showSubCategory(2, "computadores")} >computadores</li>
                        
                            {
                                this.state.show[2]?
                                <ul>
                                    <li  onClick={(e) => this.showForm(5,features)}>computadores de escritorio</li>
                                    
                                    <li onClick={(e) => this.showForm(6,features)}>computadores portatiles</li>
                                </ul>                                
                                :null
                            }


                        <li className="show-hidden-menu" onClick={(e) => this.showSubCategory(3,"inmuebles")} >inmuebles</li>
                        
                            {
                                this.state.show[3]?
                                <ul>
                                    <li  onClick={(e) => this.showForm(7,features)}>venta de inmuebles</li>
                                    <li onClick={(e) => this.showForm(8,features)}>arriendo de inmuebles</li>
                                </ul>                                
                                :null
                            }


                        <li className="show-hidden-menu" onClick={(e) => this.showSubCategory(4,"empĺeo")} >empleo</li>
                        
                            {
                                this.state.show[4]?
                                <ul>
                                    <li  onClick={(e) => this.showForm(9,features)}>buscar empleo</li>
                                 </ul>                                
                                :null
                            }

      
                        <li className="show-hidden-menu" onClick={(e) => this.showSubCategory(5,"servicios")} >Servicios</li>
                        
                            {
                                this.state.show[5]?
                                <ul>
                                    <li  onClick={(e) => this.showForm(10,features)}>clases</li>
                                </ul>                                
                                :null
                            }
      
                   </ul>

                            
                       
              </div>

                   <div className="col-lg-6 mx-auto mt-3 mb-3">

                  
                        <div className=" mb-2 ">
                            <h4>Publicar un producto</h4>


                            <div>

                       

                         <form onSubmit={this.submitData}>

                            <FilePond  
                                onupdatefiles={(fileItems) => {
                                this.setState({files: fileItems.map(fileItem => fileItem.file)      });}}  
                                onDrop={this.handleUploadImages}
                                allowMultiple={true}
                                required ={true}
                            />

                            {
                                this.state.showFeatures?
                                    listItems                         
                                :null
                            }
      
                                
                                

                                <div className="form-group ">
                                    <input 
                                        type="text" 
                                        className="form-control w-100" 
                                        id="title" 
                                        placeholder="titulo" 
                                        name="title" 
                                        value={this.state.post.title} 
                                        onChange={this.handleChange}
                                     required/>
                                </div>

                                <div className="form-group">
                                    <textarea 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="description" 
                                        rows="6" 
                                        name="description" 
                                        value={this.state.post.description}  
                                        onChange={this.handleChange}
                                        required/>
                                </div>     

                                <div className="form-group row ">
                                   
                                    <input 
                                        type="number" 
                                        className="form-control w-25 mr-5 ml-3" 
                                        id="price" 
                                        placeholder="precio" 
                                        name="price"    
                                        onChange={this.handleChange}
                                        value={this.state.post.price}  
                                        required

                                    />

                                    
 
                                    <select id="field-priceType" name="priceType" className="custom-select w-50"  onChange={this.handleChange} value={this.state.post.priceType} required>
                                        
                                        <option name= "typePrice">Negociable</option>
                                    
                                        <option name= "typePrice">Precio Fijo</option>
                                    
                                        <option name= "typePrice">A consultar</option>
                                        
                                    </select>
                                </div>
                     
                               
                                <button type="submit" className="btn btn-primary btn-block  mt-5">Publicar</button>
                            </form>


             

                                    {
                                
                                    
                                    this.state.loading === true && this.state.loading2 === true?
                                     
                                    <Redirect to='/postlist'/>
                               

                                    : this.state.countPhotos === -1 || this.state.countPost === 200?
                                        <div className=" m-3 alert alert-danger" role="alert">
                                        Ha ocurrido un error al publicar tu producto
                                        </div>
                                    :null

                                }
 

                            

                                                        
                                
                         
                            </div>

 
                        </div> 

                         
                         
                    </div>   
                 </div>
            </div>
         
            
        
        );

    }
}

 
export default PublicationPost;