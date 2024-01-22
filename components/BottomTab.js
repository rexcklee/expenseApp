
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ExpensesList from '../screens/ExpensesList';
import NewItem from '../screens/NewItem';
import Summary from '../screens/Summary';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
      <>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarActiveTintColor: '#f5a9e2',
            tabBarInactiveTintColor: '#ffffff',
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: [
              {
                position: 'absolute',
                bottom: 15,
                left: 20,
                right: 20,
                elevation: 0,
                backgroundColor: '#000000',
                borderRadius: 15,
                height: 80,
              },
              null,
            ],
          })}
          initialRouteName="Summary">
          <Tab.Screen
            name="Summary"
            options={{
                unmountOnBlur: true,
              tabBarLabel: 'Summary',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="home" color={color} size={50} />
              ),
            }}
          >
            {(props) => <Summary {...props}/>}
            </Tab.Screen>


          <Tab.Screen
            name="NewItem"
            options={{
                unmountOnBlur: true,
              tabBarLabel: 'Add Item',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="plus-circle-outline" color={color} size={50} />
              ),
            }}
          >
          {(props) => <NewItem {...props}/>}
          </Tab.Screen>

          <Tab.Screen
            name="List"
            options={{
                unmountOnBlur: true,
              tabBarLabel: 'Item List',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="format-list-numbered" color={color} size={50} />
              ),
            }}
          >
            {(props) => <ExpensesList {...props}/>}
            </Tab.Screen>

        </Tab.Navigator>
      </>
    );
};

export default BottomTab;