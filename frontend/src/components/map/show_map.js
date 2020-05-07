import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react'
import { mapStyles } from './map_style'
import $ from 'jquery'


class ShowMap extends Component {
    constructor(props) {
        super(props);
        this.state = { coords: {} }
        this.pushCoords = this.pushCoords.bind(this);
    }
    componentDidMount(){
        if (this.props.game.players.length){
            this.pushCoords(this.props.game);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.game.players.length){
            this.pushCoords(nextProps.game);
        }
    }

    pushCoords(game) {

        let address = '';
        for (let i = 0; i < game.location.length; i++) {
            if (game.location[i] === '&') {
                address += 'and';
            } else {
                address += game.location[i];
            }
        }

        address += ' San Francisco, CA';

        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyA9w4yZlROGaoP6q-a338pBQU2haj_3v6s`;


        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.state.coords = data.results[0].geometry.location;
                this.setState({ coords: this.state.coords})
            });
    }

    render() {
        
        let icon = "gold-marker.png";
        if (this.props.game.game_set) icon ="white-marker.png";

        return (
            <Map google={this.props.google}
                zoom={13}
                center={this.state.coords}
                styles={mapStyles}
                style={{
                    width: "100%",
                    height: "50%",
                    opacity: "60%"
                }}
                disableDefaultUI={true}
                scrollwheel={false}

            >
            
            <Marker
                name={this.props.game.title}
                icon={{ url: icon}}
                position={this.state.coords}
                
            />

            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyA9w4yZlROGaoP6q-a338pBQU2haj_3v6s')
})(ShowMap)