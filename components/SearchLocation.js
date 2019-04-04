import React from 'react'
import { View, StyleSheet } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

export default class SearchLocation extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={{ position: 'absolute', zIndex: 9999, width: '100%' }}>
            <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
            listViewDisplayed='false'    // true/false/undefined
            fetchDetails={true}
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            this.props.handler(data.description)
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyCHyVNEOn3jDR8KSJe_p6ZGDwt5lpeEYeE',
            language: 'en', // language of the results
            //types: '(cities)' // default: 'geocode'
          }}
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            />    
            </View>
        )
    }
}