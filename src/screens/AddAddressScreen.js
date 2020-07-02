import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {deviceWidth, deviceHeight} from '../constant';
import {data} from '../data';
export default class AddAdress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleted: false,
      data
    };
  }
  // componentDidMount() {
  //   this.updateDelete;
  // }
  // updateDelete = () => {
  //   this.setState({
  //     deleted: false,
  //   });
  // };
  // componentWillUnmount() {
  //   this.updateDelete;
  // }
  delete = () => {
    this.setState({
      deleted: !this.state.deleted,
    });
  };
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
    return (
      <View style={Style.container}>
        <View style={Style.addAddressHeader}>
          <Text style={Style.myAddresses}>My Addresses</Text>
        </View>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('MapScreen')}
          underlayColor="transparent">
          <View style={Style.textView}>
            <Icon name="md-add" size={22} color={'#f4511e'} />

            <Text style={Style.textColor}>Add New Address</Text>
          </View>
        </TouchableHighlight>
        <View style={Style.addressCard}>
          {this.state.data && this.state.data.map(item => (
            <>
              <View>
                <Text style={Style.label}>{item.label}</Text>
                <View style={{paddingTop: 10}}>
                  <Text style={Style.addressText}>{item.addressLine1}</Text>
                  <Text style={Style.addressText}>{item.addressLine2}</Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 15,
                  paddingTop: 10,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name="md-create"
                    color={'#808080'}
                    size={20}
                    onPress={() =>
                      this.props.navigation.navigate('SaveAddress')
                    }
                  />
                  <Text
                    style={{
                      color: '#808080',
                      paddingLeft: 15,
                      fontFamily: 'Ununtu',
                      color: '#808080',
                      fontSize: 15,
                    }}>
                    Edit
                  </Text>
                </View>
                <View style={{flexDirection: 'row', paddingLeft: 40}}>
                  <Icon
                    name="md-trash"
                    color={'#808080'}
                    size={20}
                    onPress={this.delete}
                  />
                  <Text
                    style={{
                      color: '#808080',
                      paddingLeft: 15,
                      fontFamily: 'Ubuntu',
                      color: '#808080',
                      fontSize: 15,
                    }}>
                    Delete
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: '#D3D3D3',
                  borderBottomWidth: 1,
                  paddingTop: 15,
                  marginLeft: 15,
                }}
              />
            </>
          ))}
        </View>
      </View>
    );
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
