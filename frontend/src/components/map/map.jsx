import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React from 'react'

export class MapContainer extends React.Component {

    
    render() {

        const mapStyles = {
            width: '50%',
            height: '50%',
          };

        return (
            <Map
            google={this.props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={{ lat: 36.444, lng: -122.176}}
            >
            <Marker position={{ lat: 36.40, lng: -122.00}} />
            </Map>
        );
    }

}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA9w4yZlROGaoP6q-a338pBQU2haj_3v6s'
  })(MapContainer);
