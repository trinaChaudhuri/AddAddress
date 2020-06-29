import 'react-native-gesture-handler';
import React, {Component} from 'react';
import AddAdress from './src/screens/AddAddressScreen';
import MapScreen from './src/screens/MapScreen';
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
            options={{
              title: 'Add an Address',
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen name="MapScreen" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
