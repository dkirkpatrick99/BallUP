 import React from "react";
import { Map, GoogleApiWrapper } from 'google-maps-react';
// import MapContainer from '../map/map';
import GameItem from './game_item';
import { Link } from "react-router-dom";
import IndexMap from "../map/index_map"
import $ from 'jquery';
import './index.css';
import IndexMapContainer from "../map/index_map_container";


class Courts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            location: '',
            time: '',
            game_date: '',
            game_set: false,
            lat: 0,
            lng: 0
        };
        this.handleSumbit= this.handleSumbit.bind(this);
        this.createGameModal= this.createGameModal.bind(this);
        this.setCoords= this.setCoords.bind(this);

    }

    componentDidMount(){
        this.props.getGames();
        // this.props.getAddress('1109 N Highland St, Arlington VA');
        $('.navbar').removeClass('navbar-b');
    }

    handleSumbit() {
        
        let game = {
            
            title: this.state.title,
            location: this.state.location,
            time: this.state.time,
            game_date: this.state.game_date,
            players: [],
            game_set: false,
            lat: this.state.lat,
            lng: this.state.lng 
        };


        this.props.createGame(game)
            .then(() => this.props.history.push('/'));
            // window.location.reload(false);
    }

    setCoords(address) {
        
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyA9w4yZlROGaoP6q-a338pBQU2haj_3v6s`;


        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                
                this.state.lat = data.results[0].geometry.location.lat;
                this.state.lng = data.results[0].geometry.location.lng;
                
                this.setState({ lat: this.state.lat })
                this.setState({ lng: this.state.lng })

            });
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    createGameModal(e) {
        e.preventDefault();
        // $(".new-game").addClass(".new-game-b");
        $(".new-game").addClass("new-game-b");
    }

    closeModal(e) {
        e.preventDefault();
        $(".new-game").removeClass("new-game-b");
    }

    render() {

       let set_games = this.props.games.filter( game =>
            game.game_set
        )

       let unset_games = this.props.games.filter( game =>
            game.game_set !== true
        )
        let set_game_i = 1;
        let unset_game_i = 1;
        return (  
            <div className="index">

                <div className="top">

                    <div className="games">
                        <h2>Open Games &#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;
                           </h2> 
                        <div className="game-list">
                        {unset_games.map( game => 
                            <div className="game-list-item">
                                <ul className={game._id}><div className="num-circle">
                                    {unset_game_i}</div>
                                    <div className="hide-me">
                                        {unset_game_i++}</div>
                                    <Link to={`/games/${game._id}`}>
                                        <GameItem game={game} />
                                    </Link>
                                </ul>
                                
                            </div> 
                            )}
                        </div>
                        <h2 id="list-foot"> &#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;
                           </h2>
                    </div>

                    <div className="games">
                        <h2>Set Games &#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;</h2>
                        <div className="set-game-list">
                            {set_games.map(game =>
                                <div className="game-list-item">
                                    <ul className={game._id}><div className="num-circle-set">
                                        {set_game_i}</div>
                                        <div className="hide-me">
                                            {set_game_i++}</div>
                                        <Link to={`/setgames/${game._id}`}>
                                            <GameItem game={game} />
                                        </Link>

                                    </ul>
                                </div>
                            )}
                        </div>
                        <h2 id="list-foot"> &#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;
                           </h2>
                    </div>
                    
                    <div className="map">
                        <IndexMapContainer history={this.props.history}/>
                    </div>
                    {/* <div className="set-games">
                        <h2>Set Games</h2>
                        {set_games.map(game =>
                            <ul >
                                <Link to={`/setgames/${game._id}`}>
                                    <GameItem game={game} />
                                </Link>
                            </ul>
                        )}
                    </div> */}
                </div>

                <div className="new-game">
                  <p className="ng-closeout" onClick={this.closeModal}>&times;</p>
                   <h1>Create a New Game</h1>
                    <form onSubmit={ (e) => {
                        e.preventDefault();
                        this.setCoords(this.state.location)
                        this.handleSumbit()
                    }}>
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
                        <input type="hidden"
                            value={this.state.game_set}
                            onSubmit={this.update('game_set')}
                        />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                <p className="ng-btn" onClick={this.createGameModal}>
                    New Game</p> 
            </div> 
        
        )}
}


export default Courts;