import React, {Component} from 'react';
import EzibuyMap from '../EzibuyMap'
import CustomMarker from '../CustomMarker/CustomMarker'
import "./MapWithMarker.css";


class MapWithMarker extends Component {

    constructor(props) {
      super(props)
      this.state = {
        lat: 4.657248,
        lng: -74.099235,
      }
      this.success = this.success.bind(this)
      this.handleReverseGeocoding = this.handleReverseGeocoding.bind(this)
      this.reportWindowSize = this.reportWindowSize.bind(this)
      this.updateFather = this.updateFather.bind(this)
    }



    options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };

    componentDidMount() {
     
      if (navigator.geolocation) 
          navigator.geolocation.getCurrentPosition(this.success, null, this.options);
      else 
          console.log("geolocation is not available in your browser")
      
      this.reportWindowSize()

      window.addEventListener('resize', this.reportWindowSize);
    }

    reportWindowSize(){
      if(document.getElementById('myMap') != undefined) {
        console.log("Evento resize")
        var pixels = (document.getElementById('myMap').offsetWidth - 178) / 2 ;
        var pixels_int = Math.floor(pixels);
        document.getElementById('message1').style.left = `${pixels_int}px` }
    }


    success(pos) {
      var crd = pos.coords;
      
      console.log('Your current position is:');
      console.log('Latitude : ' + crd.latitude);
      console.log('Longitude: ' + crd.longitude);

      this.setState({lat: crd.latitude, lng: crd.longitude})
    }

    handleReverseGeocoding(results, status){
      console.log("ENTRO")
      if(document.getElementById('messageContainer') !=  undefined ) {
      if (status === 'OK') {
        if (results[0]) {
            console.log(results[0])
            let components =  results[0].address_components;
            let countryComponent = components.find(findCountry)
            //console.log(countryComponent)
            if(countryComponent != undefined && countryComponent.long_name === 'Colombia') {
              document.getElementById('messageContainer').style.display = "none"
              document.getElementById('addressInput').value = results[0].formatted_address
              this.updateFather(results[0])
            } else {
              document.getElementById('messageContainer').style.display = "block" 
              document.getElementById('addressInput').value = "";
            }
            
        } else {
          console.error('No results found');
          document.getElementById('messageContainer').style.display = "block"
          document.getElementById('addressInput').value = "";
        }
      } else {
          console.log('Geocoder failed due to: ' + status);
          document.getElementById('messageContainer').style.display = "block"
          document.getElementById('addressInput').value = "";
      }
    }
      
    }

    updateFather(results) {
      let components =  results.address_components;
      let cityComponent = components.find(findCity)
      let departmentComponent = components.find(findDepartment)
      let lat = results.geometry.location.lat()
      let lng = results.geometry.location.lng()
      
      let cityComponentName = cityComponent === undefined ? "": cityComponent.long_name
      let departmentComponentName = departmentComponent === undefined ? "": departmentComponent.long_name
      

      this.props.updateCoordinates(lat, lng, cityComponentName, departmentComponentName)

    }

    render () {

      return (
        <div style={{height: '100%', width: '100%'}}>
          <EzibuyMap
            id="myMap"
            lat={this.state.lat}
            lng={this.state.lng}
            options={{
              center: { lat: this.state.lat, lng: this.state.lng},
              zoom: 14,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false
            }}
            onMapLoad={map => {

              var geocoder = new window.google.maps.Geocoder;

              map.addListener('idle', () => {
                
                
                geocoder.geocode({'location': map.getCenter()}, this.handleReverseGeocoding);



                
              })



              
              
            }}
         />
        <CustomMarker/>
        <div className="message" id="message1"><p className = "ezibuyp1">Elige la ubicación de <br />tu producto</p></div>

          <div className="warningEzibuy" id ="messageContainer" ><p className="ezibuyp">Ezibuy no está disponible fuera de colombia!</p></div>

          <input id="addressInput" className="searchBar" type="text" placeholder="Dirección"></input>
        
       </div>
    
    );
  }
    
}
  
function findCountry(type) {


  if(type.types.includes("country"))
    return true
  else
    return false
}

function findCity(type) {


  if(type.types.includes("locality") && type.types.includes("political"))
    return true
  else
    return false
}

function findDepartment(type) {

  if(type.types.includes("administrative_area_level_1") && type.types.includes("political"))
    return true
  else
    return false
}

export default MapWithMarker