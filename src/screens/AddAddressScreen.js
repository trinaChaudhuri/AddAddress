import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card} from 'react-native-paper';
import {deviceWidth} from '../constant';

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
          <Text style={Style.label}>{this.props.route.params.label}</Text>
          <Text style={Style.addressText}>{this.props.route.params.name}</Text>
        </>
      );
  };
  render() {
    if (this.props.route.params == undefined) {
      return (
        <View style={Style.container}>
          <View style={Style.textView}>
            <Icon
              name="md-add"
              size={30}
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
          <View style={Style.textView}>
            <Icon
              name="md-add"
              size={30}
              color={'#f4511e'}
              onPress={() => this.props.navigation.navigate('MapScreen')}
              
            />
            <Text style={Style.textColor}>Add New Address</Text>
          </View>
          <Card style={Style.addressCard}>
            <>{this.addressCard()}</>
            <Text style={Style.addressText}>
              {this.props.route.params.addressLine1}
            </Text>
            <Text style={Style.addressText}>
              {this.props.route.params.addressLine2}
            </Text>
          </Card>
        </View>
      );
    }
  }
}
const Style = StyleSheet.create({
  textColor: {
    fontSize: 20,
    color: '#f4511e',
    paddingLeft: 10,
    fontWeight:'bold'
  },
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
  },
  textView: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    width: deviceWidth,
    padding: 24,
    marginTop: 10,
  },
  addressCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 24,
    marginTop: 10,
    elevation: 2,
  },
  addressText: {
    fontSize: 15,
    color: '#808080',
    fontFamily: 'Roboto-Regular',
  },
  addAdressCard: {
    elevation: 2,
  },
  label:{
    fontSize:20,
    fontFamily:'Roboto-Bold',
    fontWeight:'bold'
  }
});
