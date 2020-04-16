import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react'
import { mapStyles } from './map_style'


export class IndexMap extends Component {
    constructor (props) {
        super(props);
        this.state = { dataObj: {}}
    }
    componentDidMount() {
        let test = "https://maps.googleapis.com/maps/api/geocode/json?address=401 Berry St, San Francisco, CA 94158&key=AIzaSyD5B7ZusFtnsVcijiwuNtDMga34pB5Lf5c";


        fetch(test)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({ dataObj: data })
                
            });
    }
    render() {
        
        if (Object.keys(this.state.dataObj).length === 0 && this.state.dataObj.constructor === Object) {{
            return null;
        }}
        return (
            <div>
       
            <Map google={this.props.google} 
                zoom={12}
                center={{ lat: 37.733795, lng: -122.446747 } }
                styles={ mapStyles }
                mapContainerStyle={{
                    height: "100vh",
                    width: "50%"
                }}
            >
                

                <Marker onClick={this.onMarkerClick}
                    name={'Current location'}
                    icon={{ url: "gold-marker.png" }}
                        position={this.state.dataObj.results[0].geometry.location}
                        />
                <Marker onClick={this.onMarkerClick}
                    name={'Current location'}
                    icon={{ url: "gold-marker.png" }}
                        position={{ lat: 37.733795, lng: -122.446747 }}
                        />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    {/* <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div> */}
                </InfoWindow>
            </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyD5B7ZusFtnsVcijiwuNtDMga34pB5Lf5c')
})(IndexMap)