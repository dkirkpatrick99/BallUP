 import React from "react";
// import { Map, GoogleApiWrapper } from 'google-maps-react';
import MapContainer from '../map/map';
import GameItem from './game_item';
import { Link } from "react-router-dom";

class Courts extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount(){
        this.props.getGames();
        this.props.getAdress('1109 N Highland St, Arlington VA')
    }

    // componentWillMount() {
    //     // this.props.getGames()
    // }

    render() {
        // debugger
        return (  
            <div>
                <h1>Hello</h1>

                <h1>Put the map of courts here</h1>
                {/* <p>{this.props.courts}</p> */}

                <h1>Put the list of filtered games here</h1>

                {this.props.games.map( game => 
                    <ul>
                        <Link to={`/games/${game._id}`}>
                            <GameItem game={game} />
                        </Link>
                    </ul>
                    
                    )}
                    <MapContainer />
            </div>  
        
        )}
}


export default Courts;