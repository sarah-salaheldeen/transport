import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import SearchLocation from './SearchLocation'
import Geocoder from 'react-native-geocoding'

export default class Map extends React.Component {
    constructor(props){
        super(props)

        // Initialize the module (needs to be done only once)
Geocoder.init("AIzaSyCHyVNEOn3jDR8KSJe_p6ZGDwt5lpeEYeE"); // use a valid API key
// With more options
// Geocoder.init("xxxxxxxxxxxxxxxxxxxxxxxxx", {language : "en"}); // set the language


        this.state = {
            mapRegion: null,
            gpsAccuracy: null,
            loc: "",
        }

        watchID = null
    }


        componentWillMount(){
            this.watchID = navigator.geolocation.watchPosition	((position) => {
                let region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0622,
                    longitudeDelta: 0.0421
                }
                this.onRegionChange(region, position.coords.accuracy)
            })
        }
    
        componentWillUnmount(){
            navigator.geolocation.clearWatch(this.watchID)
        }
        
        onRegionChange(region, gpsAccuracy){
            this.setState({
                mapRegion: region,
                gpsAccuracy: gpsAccuracy
            })
            if(this.state.mapRegion){
                this.setState({
                    userLocationMarker: <MapView.Marker coordinate={this.state.mapRegion} />
                })
            }
        }

        handler(arg) {
            this.setState({
              loc: arg
            });

            Geocoder.from(this.state.loc)
		.then(json => {
            var location = json.results[0].geometry.location;
            this.setState({
                mapRegion: location
            })
			console.log(this.state.mapRegion);
		})
		.catch(error => console.warn(error));
            return;
          }

        render() {
            return(
        <View style={{flex: 1}}>  
        <View style = {{ flexDirection: "column", flex : 1}}>
        <MapView 
           initialRegion={{
               latitude: 15.5007,
                 longitude: 32.5599,
                 latitudeDelta: 0.0622, 
                 longitudeDelta: 0.0421,
           }}
           region={this.state.mapRegion}
           style={styles.map}
           showsUserLocation={true}
            />
            </View>
        <SearchLocation handler={this.handler.bind(this)} />
        </View>
            )}
        }

    const styles = StyleSheet.create({
        mapContainer: {
            width: '100%', 
            height: '90%'
        },
        map: {
            width: '100%',
            height: '100%',
            marginTop: 20
        },
    })
