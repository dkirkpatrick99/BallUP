import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react'
import { mapStyles } from './map_style'



export class IndexMap extends Component {
    constructor (props) {
        super(props);
        this.state = { dataObj: {}, games: [], coords: []};
        this.state.games = this.props.games;
        this.pushCoords = this.pushCoords.bind(this);
    }
    componentDidMount() {
      
        if (this.state.games.length) {
            this.state.games.forEach( game => {
                this.pushCoords(game.location)
            })
        }
    }

    componentWillReceiveProps() {
        // window.location.reload(false);
    }
    pushCoords(address) {
    
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyA9w4yZlROGaoP6q-a338pBQU2haj_3v6s`;


        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.state.coords.push(data.results[0].geometry.location)
                this.setState({ coords: this.state.coords })
            });
    }
    render() {
    
      
        // if (Object.keys(this.state.coords).length === 0){
        //     return (null);
        // }


        return (
            <div className="map-container">
       
            <Map google={this.props.google}
                zoom={13}
                center={{ lat: 37.77, lng: -122.446747 }}
                styles={mapStyles}
                style={{
                    width: "70%",
                    height: "90vh"
                    }}
                    disableDefaultUI={true}
                    zoomControl={true}
                    scrollwheel={false}
                
            >
                
                {this.state.coords.map( coord => 
                    <Marker onClick={this.onMarkerClick}
                        name={'Current location'}
                        icon={{ url: "gold-marker.png" }}
                        position={coord}
                    />
                    
                    )}
                

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
    apiKey: ('AIzaSyA9w4yZlROGaoP6q-a338pBQU2haj_3v6s')
})(IndexMap)