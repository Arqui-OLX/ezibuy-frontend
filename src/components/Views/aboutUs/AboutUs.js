import React, { Component } from "react";

  
   

 
class AboutUs extends Component {


  btnFB() {
    window.open("https://www.facebook.com/groups/happypets2019");
}
btnSL() {
  window.open("https://join.slack.com/t/happypetsespacio/shared_invite/enQtNjc1NTA5OTE3MjY3LTkyMThmYzgyMjlkM2E5ZmU1ODczNjAyODRmMDQzYTQ1MmMxYzY0ZGY4YTJjYjJmYzkxZWQ3NjE2ZWFkODVhYzI");
}
btnGH() {
  window.open("https://github.com/perceptronunal");
}
btnYT() {
  window.open("https://www.youtube.com/channel/UCEjD8Q9nIAEkgzFAFBVbMcQ");
}
 
  render() { 
    return (
      <div className="bg-white">
         
  
        <div className= "container  mt-3">
            <div className="row">
              <div className="col-md-4 blog-main">
             
                  <h1 className="text-centerfont-size-40px mt-5 pt-5">Nosotros</h1>
                  <p className="font-quicksand font-size-15px m-3">
                      Ezibuy es un equipo de 6 programadores.
                      Nos pasamos horas y horas programando, editando
                      y mejorando este sitio web. El proyecto nació en 2019 
                      con el fin de brindarte la mejor experiencia  en tus compras.
                       Todo ocurre en Bogotá, en la ciudad universitaria, 
                       para la asignatura arquitectura de sofware.
                  </p>
              </div>

                <div className="col-md-8 d-inline">
                        
                            <div className= "row mt-1 ">

                                <div className="bg-petshappy-light col-md-3 m-3 border border-primary rounded  ">

                                    <img src="./Aguilera.jpg" alt="Contáctanos" className="img-fluid mt-2 rounded-circle " />
                                     
                                    <p className="text-center mt-3">
                                        Cristian Aguilera <br/>
                                     </p>

                                </div>

                                <div className="bg-petshappy-light col-md-3 m-3 border border-primary   rounded">

                                    <img src="Giron.png" alt="Contáctanos" className="img-fluid  mt-2 rounded-circle " />
                                    
                                    <p className="text-center mt-3">
                                       Juan Pablo Girón<br/>
                                    </p>

                                </div>

                                <div className="bg-petshappy-light col-md-3 m-3  border border-primary  rounded">
                                    <img src="Carreno.jpg" alt="Contáctanos" className="img-fluid mt-2 rounded-circle " />
                                    <p className="text-center mt-3">
                                      Cristian Carreño <br/>
                                     </p>
                                 </div>
                            </div>

                    {/*segunda columna*/}
                    <div className= "row">

                       

                        <div className="bg-petshappy-light col-md-3 m-3  border border-primary  rounded">
                     
                             <img src="Tafur.jpg" alt="Contáctanos" className="img-fluid mt-2 rounded-circle" />
                             <p className="text-center mt-3">
                               Cristian Tafur<br/>
                            </p>
                        </div> 

                        <div className="bg-petshappy-light col-md-3 m-3  border border-primary  rounded">

                                <img src="Rodriguez.jpg" alt="Contáctanos" className="img-fluid mt-2 rounded-circle" />
                                
                                <p className="text-center mt-3">
                                   Luis Rodriguez<br/>
                                </p>
                    
                        </div>

                        <div className="bg-petshappy-light col-md-3 m-3  border border-primary  rounded">

                            <img src="Rivera.jpg" alt="Contáctanos" className="img-fluid mt-2 rounded-circle" />

                            <p className="text-center mt-3">          
                                Jhonatan Rivera <br/>
                            </p>

                        </div>
                    </div>
                </div>
           </div>

        </div>

      </div>
    );
  }
}

 

export default AboutUs