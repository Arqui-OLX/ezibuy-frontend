import React, {Component} from 'react';
import EzibuyMap from '../EzibuyMap'

class MapWithCircle extends Component {

    constructor(props) {
        super(props)
        this.state = {
          lat: 4.657248,
          lng: -74.099235,
        }
    }

    render () {

        return (
            <div style={{height: '100%', width: '100%'}}>
                <EzibuyMap
                    id="myMapCircle"
                    options={{
                        center: { lat: this.state.lat, lng: this.state.lng},
                        zoom: 14,
                        mapTypeControl: false,
                        streetViewControl: false,
                        fullscreenControl: false }}
                    onMapLoad={map => {
                        
                        new window.google.maps.Circle({
                            strokeColor: '#FF0000',
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: '#FF0000',
                            fillOpacity: 0.35,
                            map: map,
                            center: {lat: this.state.lat, lng: this.state.lng},
                            radius: 1200
                          });
                    }}
                />
            
            </div>
        );
    }
}

export default MapWithCircle