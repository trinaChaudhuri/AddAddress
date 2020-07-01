import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card} from 'react-native-paper';
import {deviceWidth, deviceHeight} from '../constant';

export default class AddAdress extends Component {
  constructor(props) {
    super(props);
  }

  addressCard = () => {
    if (this.props.route.params.home) {
      return <Text style={Style.label}>{this.props.route.params.home}</Text>;
    } else if (this.props.route.params.work) {
      return (
        <>
          <Text style={Style.label}>{this.props.route.params.work}</Text>
        </>
      );
    } else
      return (
        <>
          <Text style={Style.label}>
            {this.props.route.params.label.charAt(0).toUpperCase() +
              this.props.route.params.label.slice(1)}
          </Text>
          <Text style={Style.addressText}>
            {this.props.route.params.name.charAt(0).toUpperCase() +
              this.props.route.params.name.slice(1)}
          </Text>
        </>
      );
  };
  render() {
    if (this.props.route.params == undefined) {
      return (
        <View style={Style.container}>
          <View style={Style.addAddressHeader}>
            <Text style={Style.myAddresses}>My Addresses</Text>
          </View>
          <View style={Style.textView}>
            <Icon
              name="md-add"
              size={22}
              color={'#f4511e'}
              onPress={() => this.props.navigation.navigate('MapScreen')}
            />
            <Text style={Style.textColor}>Add New Address</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={Style.container}>
          <View style={Style.addAddressHeader}>
            <Text style={Style.myAddresses}>My Addresses</Text>
          </View>
          <View style={Style.textView}>
            <Icon
              name="md-add"
              size={22}
              color={'#f4511e'}
              onPress={() => this.props.navigation.navigate('MapScreen')}
            />
            <Text style={Style.textColor}>Add New Address</Text>
          </View>
          <View style={Style.addressCard}>
            <>{this.addressCard()}</>
            <View style={{paddingTop: 10}}>
              <Text style={Style.addressText}>
                {this.props.route.params.addressLine1.charAt(0).toUpperCase() +
                  this.props.route.params.addressLine1.slice(1)}
              </Text>
              <Text style={Style.addressText}>
                {this.props.route.params.addressLine2.charAt(0).toUpperCase() +
                  this.props.route.params.addressLine2.slice(1)}
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
                paddingTop: 15,
                marginLeft: 15,
              }}
            />
          </View>
        </View>
      );
    }
  }
}
const Style = StyleSheet.create({
  textColor: {
    fontFamily: 'Ubuntu',
    fontSize: 15,
    color: '#f4511e',
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#DCDCDC',
  },
  textView: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    width: deviceWidth,
    height: 50,
    marginTop: 10,
    paddingTop: 10,
    paddingLeft: 15,
  },
  addressCard: {
    backgroundColor: '#FFF',

    marginTop: 10,
    height: deviceHeight,
  },
  addressText: {
    fontSize: 15,
    color: '#808080',

    paddingLeft: 15,
    fontFamily: 'Roboto-Regular',
  },
  addAdressCard: {
    elevation: 2,
  },
  label: {
    fontSize: 15,
    fontFamily: 'Ubuntu',
    paddingTop: 10,
    paddingLeft: 15,
  },
  addAddressHeader: {
    height: 50,
    marginTop: 0,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3,
  },
  myAddresses: {fontFamily: 'Ubuntu', fontSize: 20},
});
