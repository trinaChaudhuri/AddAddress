import 'react-native-gesture-handler';
import React, {Component} from 'react';
import AddAdress from './src/screens/AddAddressScreen';
import MapScreen from './src/screens/MapScreen';
import SaveAddress from './src/screens/SaveAddressScreen'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AddAdress">
          <Stack.Screen
            name="AddAdress"
            component={AddAdress}
            options={{headerShown: false}}
          />
          <Stack.Screen name="MapScreen" component={MapScreen} options={{headerShown: false}}/>
          <Stack.Screen name="SaveAddress" component={SaveAddress} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
