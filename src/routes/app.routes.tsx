import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { View, Image, Text } from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';

import Dashboard from '../pages/Dashboard';
import Cart from '../pages/Cart';

import Logo from '../assets/logo.png';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: true,
      cardStyle: { backgroundColor: '#EBEEF8' },
    }}
    initialRouteName="Dashboard"
  >
    <App.Screen
      options={{
        headerShown: true,
        headerTransparent: true,
        // headerTitle: () => <Image source={Logo} />,
        headerTitle: () => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FeatherIcon name="shopping-bag" size={35} color="#003399" />
            <Text style={{ fontSize: 18, marginLeft: 10, color: '#003399' }}>
              Products List
            </Text>
          </View>
        ),
        headerTintColor: '#333',
      }}
      name="Dashboard"
      component={Dashboard}
    />
    <App.Screen
      options={{
        headerTransparent: true,
        // headerTitle: () => <Image source={Logo} />,
        headerTitle: () => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FeatherIcon name="shopping-cart" size={35} color="#003399" />
            <Text style={{ fontSize: 18, marginLeft: 10, color: '#003399' }}>
              Your Cart
            </Text>
          </View>
        ),
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {
          marginLeft: 20,
        },

        headerBackImage: () => <FeatherIcon name="chevron-left" size={24} />,
      }}
      name="Cart"
      component={Cart}
    />
  </App.Navigator>
);

export default AppRoutes;
