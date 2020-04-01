import Axios from "axios";
import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';



export class MapContain extends React.Component {
    constructor(props){
        super(props)
        // this.state = {0: 123}
    }

    geocode() {
        var location = '22 Main st Boston MA'
        // this.props.getAddress(location)
        let res = Axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyA9w4yZlROGaoP6q-a338pBQU2haj_3v6s',{
                params: {
                        address: location,
                        key: 'AIzaSyA9w4yZlROGaoP6q-a338pBQU2haj_3v6s'
                    }
                }
        )
    
        .then(response => {
            
            console.log(response);
            var formattedAddress = response.data.results[0].geometry.location;
            console.log(formattedAddress)
            debugger
            this.setState = ({0: formattedAddress})
            console.log(this.state)
        })
    
    }

    render() {

        const mapStyles = {
            width: '50%',
            height: '50%',
          };
        return (
            <div>
                {/* <button onClick={this.geocode('22 Main st Boston MA')}></button> */}
                <div>{this.geocode()}</div>
                <div>{this.state}</div>
            {/* <Map
            google={this.props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={this.state}
            >
            <Marker position={{ lat: 36.40, lng: -122.00}} />
            </Map> */}
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA9w4yZlROGaoP6q-a338pBQU2haj_3v6s'
  })(MapContain);
