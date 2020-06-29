import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card} from 'react-native-paper'
export default class AddAdress extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.route.params == undefined) {
      return (
        <View style={Style.container}>
          <View style={Style.textView}>
          <Icon
              name="md-add-circle"
              size={30}
              color={'#000000'}
              onPress={() => this.props.navigation.navigate('MapScreen')}
            />
            <Text style={Style.textColor}>Add an address!</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={Style.container}>
          <View style={Style.textView}>
            <Icon
              name="md-add-circle"
              size={30}
              color={'#000000'}
              onPress={() => this.props.navigation.navigate('MapScreen')}
            />
            <Text style={Style.textColor}>Add an address!</Text>
          </View>
          <Card style={Style.addressCard}>
          <Text style={Style.addressText}>{this.props.route.params.addressLine1}</Text>
          <Text style={Style.addressText}>{this.props.route.params.addressLine2}</Text>
          </Card>
        </View>
      );
    }
  }
}
const Style = StyleSheet.create({
  textColor: {
    fontSize: 25,
    color: '#f4511e',
    paddingLeft: 5,
  },
  container: {
    padding: 24,
  },
  textView: {
    flexDirection: 'row',
  },
  addressCard:{
      height:100,
      backgroundColor:'#808080',
      borderRadius:10,
      padding:24,
      marginTop:10,
      elevation:2
  },
  addressText:{
      fontSize:15,
      color:'#FFF',
      fontFamily:'Roboto-Regular'
  }
});
