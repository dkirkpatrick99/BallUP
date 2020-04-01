 import React from "react";
// import { Map, GoogleApiWrapper } from 'google-maps-react';
import MapContainer from '../map/map';
import GameItem from './game_item';
import { Link } from "react-router-dom";
import $ from 'jquery';
import './index.css'

class Courts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            location: '',
            time: '',
            game_date: ''
        };
        this.handleSumbit= this.handleSumbit.bind(this)

    }

    componentDidMount(){
        this.props.getGames();
        this.props.getAdress('1109 N Highland St, Arlington VA');
        $('.navbar').removeClass('navbar-b');
    }

    handleSumbit(e) {
        e.preventDefault();

        let game = {
            
            title: this.state.title,
            location: this.state.location,
            time: this.state.time,
            game_date: this.game_date,
            players: []
        };

        this.props.createGame(game);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

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
                <form onSubmit={this.handleSumbit}>
                   <input type="text"
                        value={this.state.title}
                        onChange={this.update('title')}
                        placeholder="Title"
                    /> 
                   <input type="text"
                        value={this.state.location}
                        onChange={this.update('location')}
                        placeholder="location"
                    /> 
                   <input type="text"
                        value={this.state.time}
                        onChange={this.update('time')}
                        placeholder="Time"
                    /> 
                   <input type="text"
                        value={this.state.game_date}
                        onChange={this.update('game_date')}
                        placeholder="Game Date"
                    /> 
                    <input type="submit" value="Submit" />
                </form>

            </div>  
        
        )}
}


export default Courts;