import React, {Component} from 'react';
import EzibuyMap from '../EzibuyMap'

class MapWithCircle extends Component {


    render () {

        const myLat = this.props.lat === undefined ? 4.657248 : this.props.lat
        const myLng = this.props.lng === undefined ? -74.099235 : this.props.lng
        
        return (
            <div style={{height: '100%', width: '100%'}}>
                <EzibuyMap
                    id="myMapCircle"
                    options={{
                        center: { lat: 0, lng: 0},
                        zoom: 14,
                        disableDefaultUI: true }}
                    onMapLoad={map => {
                        console.log(this.props.lat)
                        console.log(this.props.lng)
                        new window.google.maps.Circle({
                            strokeColor: '#FF0000',
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: '#FF0000',
                            fillOpacity: 0.35,
                            map: map,
                            center: {lat: this.props.lat, lng: this.props.lng},
                            radius: 1200
                          });

                        
                    }}
                />
            
            </div>
        );
    }
}

export default MapWithCircle