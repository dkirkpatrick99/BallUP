import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react'
import { mapStyles } from './map_style'

export class IndexMap extends Component {
    render() {
        return (
            <Map google={this.props.google} 
                zoom={12}
                center={{ lat: 37.733795, lng: -122.446747 } }
                styles={ mapStyles }
                mapContainerStyle={{
                    height: "100vh",
                    width: "50vw"
                }}
            >
                

                <Marker onClick={this.onMarkerClick}
                    name={'Current location'}
                    icon={{ url: "gold-marker.png" }}
                        />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    {/* <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div> */}
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyD5B7ZusFtnsVcijiwuNtDMga34pB5Lf5c')
})(IndexMap)