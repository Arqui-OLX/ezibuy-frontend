import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./PublicationPost.css";
import axios from 'axios';
import $ from 'jquery';


const stateInicial = { 

    post : {
        title : '',
        description : '',
     },
     show:[
        {
            showMe: false,
            showMe2: false,
            showMe3: false, 
            showMe4: false,
            showMe5: false
        }
     ]
   
 }



class PublicationPost extends Component {

      
    state = {...stateInicial}

 

    submitData = e => {
         
        const url ='http://35.208.241.159:5000/graphql?';


        const publication = {"query":`mutation {\n  createPost(post:{\n title: "${this.state.post.title}",\n    description: "${this.state.post.description}",\n    date_publication: "3/10/18",\n    date_expiration:"4/11/18",\n    fk_product: 123334\n  }) {\n    id\n  }\n  \n  \n}`,"variables":null}
        
        console.log(publication);
        
        axios.post(url, publication)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    
    }



    componentDidMount() {
        //console.log(this.state.show.showMe)
       
        $(".ddList>a").click(function(){
            var thisUl = $(this).siblings('ul');
            $(".ddList>a").siblings('ul').not(thisUl).slideUp(500);
            thisUl.slideToggle(500);
        });
        
        $(".ddList2>a").click(function(){
            var thisLevel3ul = $(this).siblings('ul');
            $(".ddList2>a").siblings('ul').not(thisLevel3ul).slideUp(500);
            thisLevel3ul.slideToggle(500);
        });
        var arrowElem = "<img class='arrowRight' style='float:right; position:relative; left:5px;' src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-right-b-128.png' width='15' height='15'/>";
        $(".ddList>a, .ddList2>a").append(arrowElem);
        
        $('.ddList, .ddList2').each(function(){
            var len = $(this).find("ul").length;
            if(len===0) {
                $(this).children('a').children('.arrowRight').hide();
            }
        });
      }



      operation(e){


        this.setState({
            ...stateInicial
        })

        const isVisible = this.state.show[1];
        
        console.log(this.state.show[1]);

        this.setState({
            
            e: !isVisible,
 
        });
      
    }

    operation2(){

        this.setState({
            ...stateInicial
        })

        const isVisible = this.state.showMe2;
 
        this.setState({
            
            showMe2: !isVisible,
 
        });
      
    }

    operation3(){

        this.setState({
            ...stateInicial
        })

        const isVisible = this.state.showMe3;
 
        this.setState({
            
            showMe3: !isVisible,
 
        });
      
    }

    operation4(){

        this.setState({
            ...stateInicial
        })

        const isVisible = this.state.showMe4;
 
        this.setState({
            
            showMe4: !isVisible,
 
        });
      
    }

    operation5(){

        this.setState({
            ...stateInicial
        })

        const isVisible = this.state.showMe5;
 
        this.setState({
            
            showMe5: !isVisible,
 
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

            

            
            <div className="container mb-5">





                <div className="row  w-50 mx-auto bg-light">


                    <div id="menu" className="w-75 mx-auto mb-2">
                                <ul className="topUl">
                                    <li className="ddList ">
                                        <a href="/#" title="Link2">Vehiculos</a>
                                        <ul>
                                        <li className="ddList2">
                                            <a  href="/#" title="SubLink2-1"  onClick={()=>this.operation(1)}>carros</a>
                                            <a href="/#" title="SubLink2-1" onClick={()=>this.operation2()}>motos</a>
                                        </li>                               
                                        </ul>
                                    </li>

                                    <li className="ddList">
                                        <a href="/#" title="Link2">Celulares</a>
                                        <ul>
                                        <li className="ddList2">
                                            <a href="/#" title="SubLink2-1" onClick={()=>this.operation3()}>Celulares</a>
                                            <a href="/#" title="SubLink2-1" onClick={()=>this.operation4()}>Tablets</a>
                                        </li>                               
                                        </ul>
                                    </li>

                                    <li className="ddList">
                                        <a href="/#" title="Link2">Servicios</a>
                                        <ul>
                                        <li className="ddList2">
                                            <a href="/#" title="SubLink2-1"onClick={()=>this.operation5()}>Clases-Cursos</a>
                                            <a href="/#" title="SubLink2-1"onClick={()=>this.operation5()}>Seguridad</a>
                                            <a href="/#" title="SubLink2-1"onClick={()=>this.operation5()}> Mudanza</a>
                                        </li>                               
                                        </ul>
                                    </li>            
                                </ul>
                            </div>

                   <div className="col-lg-6 mx-auto mt-5">

                  
                        <div className="mt-5 mb-2 ">
                            <h4>Publicar un producto</h4>

                            <form >


                                {
                                this.state.showMe?

                                    <div>
                                        <div className="form-group ">
                                             <input type="text" className="form-control w-75" id="numberUser" aria-describedby="emailHelp" placeholder="marca" name="title"   onChange={this.handleChange}/>
                                        </div>

                                        <div className="form-group ">
                                             <input type="text" className="form-control w-75" id="numberUser" aria-describedby="emailHelp" placeholder="año" name="title"   onChange={this.handleChange}/>
                                        </div>

                                        <div>

                                        <div className="form-group ">
                                             <input type="text" className="form-control w-75" id="numberUser" aria-describedby="emailHelp" placeholder="kilometraje" name="title"    onChange={this.handleChange}/>
                                        </div>

                                        <div className="form-group ">
                                             <input type="text" className="form-control w-75" id="numberUser" aria-describedby="emailHelp" placeholder="Combustible" name="title"    onChange={this.handleChange}/>
                                        </div>

                                        <div className="form-group ">
                                             <input type="text" className="form-control w-75" id="numberUser" aria-describedby="emailHelp" placeholder="Color" name="title"    onChange={this.handleChange}/>
                                        </div>
                                        <div className="form-group ">
                                             <input type="text" className="form-control w-75" id="numberUser" aria-describedby="emailHelp" placeholder="Transimision" name="title"    onChange={this.handleChange}/>
                                        </div>

                                        <div className="form-group ">
                                             <input type="text" className="form-control w-75" id="numberUser" aria-describedby="emailHelp" placeholder="placa" name="title"    onChange={this.handleChange}/>
                                        </div>

                                        <div className="form-group ">
                                             <input type="text" className="form-control w-75" id="numberUser" aria-describedby="emailHelp" placeholder="Precio" name="title"    onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    </div>

                                    
                                    :null
                                }

                            
                                {
                                this.state.showMe2?

                                    <div>
                                        <div className="form-group ">
                                             <input type="text" className="form-control w-75" id="numberUser" aria-describedby="emailHelp" placeholder="marca" name="title"   onChange={this.handleChange}/>
                                        </div>

                                        <div className="form-group ">
                                             <input type="text" className="form-control w-75" id="numberUser" aria-describedby="emailHelp" placeholder="año" name="title"   onChange={this.handleChange}/>
                                        </div>

                                        <div>

                                        <div className="form-group ">
                                             <input type="text" className="form-control w-75" id="numberUser" aria-describedby="emailHelp" placeholder="kilometraje" name="title"    onChange={this.handleChange}/>
                                        </div>

                                        <div className="form-group ">
                                             <input type="text" className="form-control w-75" id="numberUser" aria-describedby="emailHelp" placeholder="color" name="title"    onChange={this.handleChange}/>
                                        </div>

                                        <div className="form-group ">
                                             <input type="text" className="form-control w-75" id="numberUser" aria-describedby="emailHelp" placeholder="Cilindrada" name="title"    onChange={this.handleChange}/>
                                        </div>
                                        <div className="form-group ">
                                             <input type="text" className="form-control w-75" id="numberUser" aria-describedby="emailHelp" placeholder="Tipo vendedor" name="title"    onChange={this.handleChange}/>
                                        </div>

                                        <div className="form-group ">
                                             <input type="text" className="form-control w-75" id="numberUser" aria-describedby="emailHelp" placeholder="placa" name="title"    onChange={this.handleChange}/>
                                        </div>

                                        <div className="form-group ">
                                             <input type="text" className="form-control w-75" id="numberUser" aria-describedby="emailHelp" placeholder="Precio" name="title"    onChange={this.handleChange}/>
                                        </div>

                                        <div className="form-group ">
                                             <input type="text" className="form-control w-75" id="numberUser" aria-describedby="emailHelp" placeholder="Tipo Pago" name="title"    onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    </div>

                                    
                                    :null
                                }

                                {
                                this.state.showMe3?

                                    <div>
                                   
                                        <div className="form-group ">
                                             <input type="text" className="form-control w-75" id="numberUser" aria-describedby="emailHelp" placeholder="Marca"     onChange={this.handleChange}/>
                                        </div>

                                        <div className="form-group ">
                                             <input type="text" className="form-control w-75" id="numberUser" aria-describedby="emailHelp" placeholder="Precio"     onChange={this.handleChange}/>
                                        </div>

                                        <div className="form-group ">
                                             <input type="text" className="form-control w-75" id="numberUser" aria-describedby="emailHelp" placeholder="Tipo pago"   onChange={this.handleChange}/>
                                        </div>
                                    </div>

                                    
                                    :null
                                }


                                {
                                this.state.showMe4?

                                    <div>
                                   
                                        <div className="form-group ">
                                             <input type="text" className="form-control w-75" id="numberUser" aria-describedby="emailHelp" placeholder="Marca" name="title"    onChange={this.handleChange}/>
                                        </div>

                                        <div className="form-group ">
                                             <input type="text" className="form-control w-75" id="numberUser" aria-describedby="emailHelp" placeholder="Precio" name="title"    onChange={this.handleChange}/>
                                        </div>

                                        <div className="form-group ">
                                             <input type="text" className="form-control w-75" id="numberUser" aria-describedby="emailHelp" placeholder="Tipo pago" name="title"    onChange={this.handleChange}/>
                                        </div>
                                    </div>

                                    
                                    :null
                                }


{
                                this.state.showMe5?

                                    <div>
                                   
                                        <div className="form-group ">
                                             <input type="text" className="form-control w-75" id="numberUser" aria-describedby="emailHelp" placeholder="Tipo" name="title"    onChange={this.handleChange}/>
                                        </div>
                                    
                                    </div>

                                    
                                    :null
                                }



                                <div className="form-group ">
                                    <input type="text" className="form-control w-100" id="numberUser" aria-describedby="emailHelp" placeholder="titulo" name="title" value={this.state.post.title}  onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <textarea type="text" className="form-control" id="exampleInputPassword1" placeholder="descripcion" rows="6" name="description" value={this.state.post.description}  onChange={this.handleChange}/>
                                </div>                         
                         
                            </form>
                            <button  className="btn btn-primary btn-block  mt-5" onClick={this.submitData} >Publicar</button>
 
                        </div> 

                         
                         
                    </div>   
                 </div>
            </div>
         
            
        
        );

    }
}

 
export default PublicationPost;