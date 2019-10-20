import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./PublicationPost.css"
import $ from 'jquery';

class PublicationPost extends Component {
    
    componentDidMount() {
       
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

    render() {

        return (
            <div className="container MB-5">
                <div className="row  w-75 mx-auto ">
                   <div className="col-lg-6 mx-auto">

                         <div id="menu" className="">
                            <ul className="topUl">
                                <li className="ddList ">
                                    <a href="#" title="Link2">Vehiculos</a>
                                    <ul>
                                    <li className="ddList2">
                                        <a href="#" title="SubLink2-1">Vehiculos</a>
                                        <a href="#" title="SubLink2-1">motos</a>
                                    </li>                               
                                    </ul>
                                </li>

                                <li className="ddList">
                                    <a href="#" title="Link2">Celulares</a>
                                    <ul>
                                    <li className="ddList2">
                                        <a href="#" title="SubLink2-1">Celulares</a>
                                        <a href="#" title="SubLink2-1">Computadores</a>
                                    </li>                               
                                    </ul>
                                </li>

                                <li className="ddList">
                                    <a href="#" title="Link2">Servicios</a>
                                    <ul>
                                    <li className="ddList2">
                                        <a href="#" title="SubLink2-1">Clases-Cursos</a>
                                        <a href="#" title="SubLink2-1">Seguridad</a>
                                    </li>                               
                                    </ul>
                                </li>            
                            </ul>
                        </div>
                  
                        <div className="mt-5 mb-2 ">
                            <form >
                                <div className="form-group  ">
                                    <input type="phone" className="form-control " id="numberUser" aria-describedby="emailHelp" placeholder="Numero de telefono" />
                                </div>
                                <div className="form-group">
                                    <textarea type="password" className="form-control" id="exampleInputPassword1" placeholder="Mensaje" rows="6"/>
                                </div>                         
                         
                                 <input className="mt-5" type="file" name="file" onChange={this.onChangeHandler}/>
                                 <button type="submit" className="btn btn-primary btn-block  mt-5" >Publicar</button>
                            </form>
                        </div> 
                         
                    </div>   
                 </div>
            </div>
         
            
        
        );

    }
}

 
export default PublicationPost;