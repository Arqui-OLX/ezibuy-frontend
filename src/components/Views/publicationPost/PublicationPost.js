import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./PublicationPost.css";
import  axios from 'axios';
import hash from 'object-hash';
 

import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import PostList from '../postList/PostList';
 
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
     loading: false,
     buffer: false,
     countPost: 0,
     countPhotos: 0,
     redirect: 0
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
            fistImage: this.state.files[0]

        };
        
        const urlPosts  ='http://35.209.82.198:3002/product';
        const urlImages ='http://35.209.82.198:3001/ads-images';

        var idPost = "";       
        axios.post(urlPosts, data)
        .then( (response) => {
            console.log(response.status);
            if(response.status === 200){
                this.setState({
                    countPost: 200,
                    redirect: this.redirect 
                })
            }
            console.log(response);
            idPost = response.data._id
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
                if(response.status === 200){
                    this.setState({
                        countPhotos:200
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

                       <li className="show-hidden-menu" onClick={(e) => this.showSubCategory(0,"vehiculos")} ></li>
 
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
                                    <li  onClick={(e) => this.showForm(9,features)}>clases</li>
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
                                    this.state.countPhotos === 200 && this.state.countPost === 200?

                                    <div className="alert alert-success mt-4" role="alert">
                                        <h4 className="alert-heading">Listo!</h4>
                                        <p>Su producto se ha registrado</p>
                                      
                                    </div>           

                                    :this.state.countPhotos === -1 || this.state.countPost === -1?
                                    <div className="alert alert-danger mt-4" role="alert">
                                        <h4 className="alert-heading">Error!</h4>
                                        <p>Ha ocurrido un problema al registrar su producto</p>
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