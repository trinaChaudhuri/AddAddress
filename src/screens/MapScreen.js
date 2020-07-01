import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Platform,
  TextInput,
  ScrollView,
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
      addressLine1: '',
      addressLine2: '',
      searchbar: false,
      home: '',
      work: '',
      label: '',
      number: '',
      name: '',
      other: false,
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
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
    );
  };
  // componentWillUnmount() {
  //   this.locateCurrentPosition();
  // }
  proceed = () => {
    this.setState({
      viewOne: false,
    });
  };
  handleChangeaddressLine1 = event => {
    try {
      event.persist();
      this.setState({addressLine1: event.nativeEvent.text});
    } catch (err) {
      console.log(err);
    }
  };
  handleChangeaddressLine2 = event => {
    try {
      event.persist();
      this.setState({addressLine2: event.nativeEvent.text});
    } catch (err) {
      console.log(err);
    }
  };
  label = event => {
    event.persist();
    this.setState({label: event.nativeEvent.text});
  };
  number = event => {
    event.persist();
    this.setState({number: event.nativeEvent.text});
  };
  name = event => {
    event.persist();
    this.setState({name: event.nativeEvent.text});
  };
  home = () => {
    this.setState({home: 'Home'});
  };
  work = () => {
    this.setState({work: 'Work'});
  };
  other = () => {
    this.setState({other: !this.state.other});
  };
  addressBlock = () => {
    return (
      <ScrollView>
        <View>
          <View style={{flexDirection: 'row', paddingTop: 10, paddingLeft: 15}}>
            <Icon
              name="md-arrow-back"
              size={25}
              onPress={() => this.props.navigation.navigate('AddAdress')}
            />
            <Text style={{fontFamily: 'Ubuntu', fontSize: 20, paddingLeft: 10}}>
              Add Address
            </Text>
          </View>
          <MapView
            showsUserLocation={true}
            userLocationPriority='high'
            followsUserLocation={true}
            showsMyLocationButton	={true}
            provider={PROVIDER_GOOGLE}
            ref={map => (this._map = map)}
            style={Styles.mapAddress}
            initialRegion={this.state.initialPosition}>
            <Marker
              coordinate={{
                latitude: this.state.initialPosition.latitude,
                longitude: this.state.initialPosition.longitude,
              }}
              title={'Bangalore'}
            />
          </MapView>
          <View style={{padding: 24}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontFamily: 'Ubuntu', fontSize: 15}}>
                DELIVERY LOCATION
              </Text>
            </View>
            <Text style={{marginTop: 25}}>DETAILS</Text>
            <TextInput
              placeholder="Door no,Floor,Building Name"
              style={Styles.placeholder}
              onChange={this.handleChangeaddressLine1}
              value={this.state.addressLine1}
            />
            <TextInput
              placeholder="Landmark"
              style={Styles.placeholder}
              value={this.state.addressLine2}
              onChange={this.handleChangeaddressLine2}
            />
            <Text style={{marginTop: 10}}>Choose a Label</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <TouchableHighlight
                onPress={this.home}
                underlayColor="transparent">
                <View
                  style={[
                    this.state.home == '' ? Styles.label : Styles.labelSelected,
                  ]}>
                  <>
                    {this.state.home == '' ? (
                      <Icon name="md-home" size={18} />
                    ) : (
                      <Icon name="md-home" size={18} color="#f4511e" />
                    )}
                  </>
                  <Text style={{paddingLeft: 5}}>HOME</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={this.work}
                underlayColor="transparent">
                <View
                  style={[
                    this.state.work == '' ? Styles.label : Styles.labelSelected,
                  ]}>
                  <>
                    {this.state.work == '' ? (
                      <Icon name="md-briefcase" size={18} />
                    ) : (
                      <Icon name="md-briefcase" size={18} color="#f4511e" />
                    )}
                  </>

                  <Text style={{paddingLeft: 5}}>WORK</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={this.other}
                underlayColor="transparent">
                <View
                  style={[
                    this.state.other == ''
                      ? Styles.label
                      : Styles.labelSelected,
                  ]}>
                  <>
                    {this.state.other == '' ? (
                      <Icon name="md-globe" size={18} />
                    ) : (
                      <Icon name="md-globe" size={18} color="#f4511e" />
                    )}
                  </>
                  <Text style={{paddingLeft: 5}}>OTHER</Text>
                </View>
              </TouchableHighlight>
            </View>
            <>
              {this.state.other && (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <TextInput
                      placeholder="Label"
                      style={Styles.placeholderLabel}
                      onChange={this.label}
                      value={this.state.label}
                    />
                    <TextInput
                      placeholder="Number"
                      style={Styles.placeholderNumber}
                      onChange={this.number}
                      value={this.state.number}
                      keyboardType="phone-pad"
                    />
                  </View>
                  <TextInput
                    placeholder="Name"
                    style={Styles.placeholder}
                    onChange={this.name}
                    value={this.state.name}
                  />
                </View>
              )}
            </>
            <TouchableHighlight
              onPress={() =>
                this.props.navigation.navigate('AddAdress', {
                  addressLine1: this.state.addressLine1,
                  addressLine2: this.state.addressLine2,
                  home: this.state.home,
                  work: this.state.work,
                  label: this.state.label,
                  number: this.state.number,
                  name: this.state.name,
                })
              }
              underlayColor="transparent">
              <View style={Styles.addAddress}>
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: 20,
                    fontFamily: 'Ubuntu',
                    fontWeight: 'bold',
                  }}>
                  ADD ADDRESS
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  };
  render() {
    return this.state.viewOne == true ? (
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
                  key: 'AIzaSyBULtxI-73SoqLwlw9WbqHtoFt-Os3OmBw',
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
                GoogleReverseGeocodingQuery={
                  {
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                  }
                }
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
            onPress={() => this.proceed()}
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
    ) : (
      this.addressBlock()
    );
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
