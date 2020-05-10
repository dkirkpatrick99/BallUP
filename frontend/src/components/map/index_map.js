import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react'
import { mapStyles } from './map_style'
import $ from 'jquery'




export class IndexMap extends Component {
    constructor(props) {
        super(props);
        this.state = { games: [], coords: [] };
        this.clicked = "";
        this.pushCoords = this.pushCoords.bind(this);
    }
    componentDidMount() {

        if (this.props.games.length) {
            this.props.games.forEach(game => {
                this.pushCoords(game)
            })
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.games.length !== this.props.games.length) {
            this.props.history.push('/');
        }
    }
    pushCoords(game) {
        let address = '';
        for ( let i = 0; i < game.location.length; i++ ){
            if (game.location[i] === '&'){
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

                this.state.coords.push(data.results[0].geometry.location)
                this.setState({ coords: this.state.coords })
                game["coords"] = data.results[0].geometry.location;
                this.state.games.push(game);
                this.setState({ games: this.state.games })
            });
    }

    onMarkerClick(game) {

        let elmnt = document.getElementById("list-head");
        let itemY = $(`.${game._id}`).offset().top -
            $(`.navbar`).height() - elmnt.clientHeight;
        let listHeight = $(".game-list").height();

        if (this.clicked !== game._id) {
            $(`.highlight-item`).removeClass("highlight-item");
            $(`.${game._id}`).addClass("highlight-item");
            if (itemY > (listHeight - $(`.${game._id}`).height()) ||
                itemY < 0) {
                $('.game-list').animate({
                    scrollTop: $(`.${game._id}`).offset().top -
                        $(`.navbar`).height() - elmnt.clientHeight
                }, 1000)
            }
        }
        this.clicked = game._id;
    }

    onSetMarkerClick(game) {
        let elmnt = document.getElementById("list-head");
        let itemY = $(`.${game._id}`).offset().top -
            $(`.navbar`).height() - elmnt.clientHeight;
        let listHeight = $(".set-game-list").height();

        if (this.clicked !== game._id) {
            $(`.highlight-item`).removeClass("highlight-item");
            $(`.${game._id}`).addClass("highlight-item");
            if (itemY > (listHeight - $(`.${game._id}`).height()) ||
                itemY < 0) {
                $('.set-game-list').animate({
                    scrollTop: $(`.${game._id}`).offset().top -
                        $(`.navbar`).height() - elmnt.clientHeight
                }, 1000)
            }
        }
        this.clicked = game._id;
    }

    render() {


        let unset_games = this.state.games.filter(game =>
            !game.game_set
        )
        let set_games = this.state.games.filter(game =>
            game.game_set
        )
        return (
            <div className="map-container"
                style={{
                    width: "70%"
                }}

            >

                <Map google={this.props.google}
                    zoom={13}
                    center={{ lat: 37.774, lng: -122.446747 }}
                    styles={mapStyles}
                    style={{
                        width: "100%",
                        height: "95vh"
                    }}
                    disableDefaultUI={true}
                    zoomControl={true}
                    scrollwheel={false}

                >

                    {unset_games.map(game =>
                        <Marker onClick={() => {

                            this.onMarkerClick(game);
                        }}
                            name={game.title}
                            icon={{ url: "gold-marker.png" }}
                            position={game.coords}
                            key={game._id}
                        />
                    )}

                    {set_games.map(game =>
                        <Marker onClick={() => {

                            this.onSetMarkerClick(game);
                        }}
                            name={game.title}
                            icon={{ url: "white-marker.png" }}
                            position={game.coords}
                            key={game._id}
                        />
                    )}

                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyA9w4yZlROGaoP6q-a338pBQU2haj_3v6s')
})(IndexMap)