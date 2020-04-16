import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React from 'react'
import Axios from "axios";


export class MapContainer extends React.Component {



    componentDidMount() {
        this.geocode(this.props.location)
    }

    geocode(location) {
        // var location = '22 Main st Boston MA'
        // this.props.getAddress(location)
        let res = Axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
                params: {
                        address: location,
                        key: 'AIzaSyA9w4yZlROGaoP6q-a338pBQU2haj_3v6s'
                    }
                }
        )
    
        .then(response => {
            var formattedAddress = response.data.results[0].geometry.location;
            this.setState({key: formattedAddress})
            })
    
    }

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
            initialCenter={{lat: 0, lng:0}}
            >
            <Marker position= {{lat: 0, lng:0}}/>
            </Map>
        )
    }

}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA9w4yZlROGaoP6q-a338pBQU2haj_3v6s'
  })(MapContainer);
