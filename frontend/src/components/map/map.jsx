import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React from 'react'

export class MapContainer extends React.Component {

    // geocode(location) {
    //     // var location = '22+Main+st+Boston+MA'
    //     // this.props.getAddress(location)
    //     let res = Axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyA9w4yZlROGaoP6q-a338pBQU2haj_3v6s',{
    //             params: {
    //                     address: location,
    //                     key: 'AIzaSyA9w4yZlROGaoP6q-a338pBQU2haj_3v6s'
    //                 }
    //             }
    //     )
    
    //     .then(response => {
    //         console.log(response);
    //         var formattedAddress = response.data.results[0].formatted_address;
    //         console.log(formattedAddress)
    //         var formattedAddressOutput = `
    //         <ul class="list-group">
    //             <li class="list-group-item">${formattedAddress}</li>
    //         </ul>
    //         `;
    //     })
    
    //         // var addressComponents = response.data.results[0].address_components;
    //         // var addressComponentsOutput = '<ul class="list-group>`';
    //         // for(var i = 0; i < addressComponents.length; i++){
    //         //     addressComponentsOutput += `
    //         //         <li class="list-group-item"><strong>${addressComponents[i].types[0]}
    //         //         </strong>: ${addressComponents[i].long_name}</li>
    //         //     `;
    //         // }
    //         // addressComponentsOutput += '</ul>';
    
    //         // document.getElementById('formatted-address').innerHTML = formattedAddressOutput;
    //         // document.getElementById('address-components').innerHTML = addressComponentsOutput;
    
    //     }

    render() {

        const mapStyles = {
            width: '50%',
            height: '50%',
          };

        return (
            <Map
            google={this.props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={{ lat: 36.444, lng: -122.176}}
            >
            <Marker position={{ lat: 36.40, lng: -122.00}} />
            </Map>
        );
    }

}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA9w4yZlROGaoP6q-a338pBQU2haj_3v6s'
  })(MapContainer);
