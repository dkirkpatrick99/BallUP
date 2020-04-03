import Axios from "axios";
import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';



export class MapContain extends React.Component {
    constructor(props){
        super(props)
        this.state = {key: 0};
    }

    componentDidMount() {
        this.geocode(this.props.location)
    }

    geocode(location) {
        // var location = '22 Main st Boston MA'
        // this.props.getAddress(location)
        // let res = Axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
        //         params: {
        //                 address: location,
        //                 key: 'AIzaSyA9w4yZlROGaoP6q-a338pBQU2haj_3v6s'
        //             }
        //         }
        // )
    
        // .then(response => {
        //     var formattedAddress = response.data.results[0].geometry.location;
        //     this.setState({key: formattedAddress})
        //     })
    
    }

    render() {
        if(this.state.key === 0) return null
        // this.geocode()
        const mapStyles = {
            width: '50%',
            height: '50%',
          };
        return (
            <div>
            <Map
            google={this.props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={this.state.key}
            >
            <Marker position={this.state.key}/>
            </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA9w4yZlROGaoP6q-a338pBQU2haj_3v6s'
  })(MapContain);
