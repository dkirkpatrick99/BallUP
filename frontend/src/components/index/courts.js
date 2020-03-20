import React from "react";
// import { Map, GoogleApiWrapper } from 'google-maps-react';
// import MapContainer from '../map/map'

class Courts extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        // this.props.getGames()
    }

    render() {
        return (  
            <div>
                <h1>Hello</h1>

                <h1>Put the map of courts here</h1>
                <p>{this.props.courts}</p>

                <h1>Put the list of filtered games here</h1>
            </div>  
        
        )}
}


export default Courts;