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
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {request, PERMISSIONS} from 'react-native-permissions';
import {deviceHeight} from '../constant';

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPosition: {
        latitude: 12.9716,
        longitude: 77.5946,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      },
      viewOne: true,
      addressLine1: '',
      addressLine2: '',
    };
  }
  componentDidMount() {
    this.requestLocationPermission();
  }

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
  addressBlock = () => {
    return (
      <ScrollView>
        <View>
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
          <View style={{padding: 24}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Delivery Location</Text>
            </View>
            <Text>Details</Text>
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
            <TouchableHighlight
              onPress={() =>
                this.props.navigation.navigate('AddAdress', {
                  addressLine1: this.state.addressLine1,
                  addressLine2: this.state.addressLine2,
                })
              }
              underlayColor="transparent">
              <View style={Styles.proceed}>
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: 20,
                    fontFamily: 'Roboto-Bold',
                  }}>
                  Add Address
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
        <View style={{padding: 24}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Delivery Location</Text>
            {/* <Icon name="md-search" size={24} /> */}
          </View>

          <TouchableHighlight
            onPress={() => this.proceed()}
            underlayColor="transparent">
            <View style={Styles.proceed}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 20,
                  fontFamily: 'Roboto-Bold',
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
  proceed: {
    backgroundColor: '#f4511e',

    height: 40,
    alignItems: 'center',
    marginTop: 28,
    borderRadius: 10,
    justifyContent: 'center',
  },
  placeholder: {
    borderBottomColor: '#808080',
    borderBottomWidth: 2,
    borderStyle: 'dashed',
  },
});
