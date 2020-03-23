 import React from "react";
// import { Map, GoogleApiWrapper } from 'google-maps-react';
import MapContainer from '../map/map';
import GameItem from './game_item';
import { Link } from "react-router-dom";
import './index.css'

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
       
        return (  
            <div className="index">

                <div className="games">
                    <h2>Games</h2>
                {this.props.games.map( game => 
                    <ul >
                        <Link to={`/games/${game._id}`}>
                            <GameItem game={game} />
                        </Link>
                    </ul>
                    
                    )}
            </div>
                <div className="map">
                    <MapContainer />
                </div>
            </div>  
        
        )}
}


export default Courts;