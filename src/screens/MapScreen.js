import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Platform,
  Dimensions,
} from 'react-native';
import MapInput from '../components/MapInput';
import MyMapView from '../components/MapView';
import {
  getLocation,
  geocodeLocationByName,
} from '../services/location-services';
import Icon from 'react-native-vector-icons/Ionicons';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
class MapScreen extends React.Component {
  state = {
    region: {},
    searchbar: false,
  };

  componentDidMount() {
    this.getInitialState();
  }

  getInitialState() {
    getLocation().then(data => {
      console.log(data);
      this.setState({
        region: {
          latitude: data.latitude,
          longitude: data.longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        },
      });
    });
  }

  getCoordsFromName(loc) {
    this.setState({
      region: {
        latitude: loc.lat,
        longitude: loc.lng,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      },
    });
  }

  onMapRegionChange(region) {
    this.setState({region});
  }
  googleplaces = () => {
    this.setState({searchbar: !this.state.searchbar});
  };
  render() {
    return (
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
        <View style={{position: 'absolute'}}>
          {this.state.searchbar && (
            <View style={{width: deviceWidth}}>
              <MapInput notifyChange={loc => this.getCoordsFromName(loc)} />
            </View>
          )}
        </View>
        {this.state.region['latitude'] ? (
          <View>
            <MyMapView
              region={this.state.region}
              onRegionChange={reg => this.onMapRegionChange(reg)}
            />
          </View>
        ) : null}
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
            onPress={() => this.props.navigation.navigate('SaveAddress')}
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
    );
  }
}

export default MapScreen;
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
