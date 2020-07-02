import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {request, PERMISSIONS} from 'react-native-permissions';
import {deviceHeight, deviceWidth} from '../constant';

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPosition: {
        latitude: 37.421998333333335,
        longitude: -122.08400000000002,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      viewOne: true,
      searchbar: false,
    };
  }
  componentDidMount() {
    this.requestLocationPermission();
  }
  googleplaces = () => {
    this.setState({searchbar: !this.state.searchbar});
  };
  requestLocationPermission = async () => {
    while (Platform.OS == 'android') {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    }
  };
  locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        let initialPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        this.setState({initialPosition});
      },
      error => console.log(error.message),
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 3600000},
    );
  };
  

  render() {
      return(
      <View>
        <View style={{flexDirection: 'row', paddingTop: 10, paddingLeft: 15}}>
          <Icon
            name="md-arrow-back"
            size={25}
            onPress={() => this.props.navigation.navigate('AddAdress')}
          />
          <Text
            style={{
              fontFamily: 'Ubuntu',
              fontSize: 20,
              paddingLeft: 10,
              fontWeight: '500',
            }}>
            Add Address
          </Text>
        </View>
        <MapView
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          ref={map => (this._map = map)}
          style={Styles.map}
          initialRegion={this.state.initialPosition}>
          <Marker
            coordinate={{
              latitude: this.state.initialPosition.latitude,
              longitude: this.state.initialPosition.longitude,
            }}
            title={'Bangalore'}
          />
        </MapView>
        <>
          {this.state.searchbar && (
            <View style={{position: 'absolute', width: deviceWidth}}>
              <GooglePlacesAutocomplete
                placeholder="Search"
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                listViewDisplayed="true" // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => {
                  console.log(data);
                  console.log(details);
                }}
                getDefaultValue={() => {
                  return ''; // text input default value
                }}
                query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: 'AIzaSyBq0_41Va63cK2frNo2p9yfdZNqLL8EZ-E',
                  language: 'en', // language of the results
                  types: '(cities)', // default: 'geocode'
                }}
                styles={{
                  description: {
                    fontWeight: 'bold',
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb',
                  },
                }}
                onFail={error => console.log('err on fail', error)}
                nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                // GoogleReverseGeocodingQuery={
                //   {
                //     // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                //   }
                // }
                GooglePlacesSearchQuery={{
                  // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                  rankby: 'distance',
                  types: 'food',
                }}
                filterReverseGeocodingByTypes={[
                  'locality',
                  'administrative_area_level_3',
                ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                debounce={200}
              />
            </View>
          )}
        </>
        <View style={{padding: 24}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Ubuntu', fontSize: 15}}>
              DELIVERY LOCATION
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="md-search"
                size={20}
                onPress={this.googleplaces}
                color="#f4511e"
              />
              <Text
                style={{
                  color: '#f4511e',
                  fontFamily: 'Ubuntu',
                  fontWeight: 'bold',
                  fontSize: 15,
                  paddingLeft: 5,
                }}>
                Search
              </Text>
            </View>
          </View>

          <TouchableHighlight
            onPress={() => this.props.navigation.navigate("SaveAddress")}
            underlayColor="transparent">
            <View style={Styles.proceed}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 20,
                  fontFamily: 'Ubuntu',
                  fontWeight: 'bold',
                }}>
                Proceed
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
      )
   
  }
}
const Styles = StyleSheet.create({
  map: {
    height: deviceHeight - 200,
  },
  mapAddress: {
    height: deviceHeight - 400,
  },
  proceed: {
    backgroundColor: '#f4511e',
    height: 50,
    alignItems: 'center',
    marginTop: 35,
    borderRadius: 5,
    justifyContent: 'center',
  },
  placeholder: {
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 0.5,
  },
  placeholderLabel: {
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 0.5,
    width: 150,
  },
  placeholderNumber: {
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 0.5,
    width: 150,
    marginLeft: 20,
  },
  label: {
    flexDirection: 'row',
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    width: 80,
    justifyContent: 'center',
    paddingTop: 5,
  },
  labelSelected: {
    flexDirection: 'row',
    borderColor: '#f4511e',
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    width: 80,
    justifyContent: 'center',
    paddingTop: 5,
  },
  addAddress: {
    backgroundColor: '#f4511e',
    height: 50,
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 5,
    justifyContent: 'center',
  },
});
