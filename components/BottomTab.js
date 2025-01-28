
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ExpensesList from '../screens/ExpensesList';
import NewItem from '../screens/NewItem';
import Summary from '../screens/Summary';
const tailwindConfig = require('../tailwind.config.js');
const customColors = tailwindConfig.theme.extend.colors.test1;

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: customColors.second,
          tabBarInactiveTintColor: customColors.first,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: [
            {
              position: 'absolute',
              bottom: 10,
              left: 10,
              right: 10,
              elevation: 2,
              backgroundColor: customColors.special,
              borderRadius: 10,
              height: 70,
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
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chart-bar-stacked" color={color} size={40} />
            ),
          }}
        >
          {(props) => <Summary {...props} />}
        </Tab.Screen>


        <Tab.Screen
          name="NewItem"
          options={{
            unmountOnBlur: true,
            tabBarLabel: 'Add Item',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus-circle-outline" color={color} size={40} />
            ),
          }}
        >
          {(props) => <NewItem {...props} />}
        </Tab.Screen>

        <Tab.Screen
          name="List"
          options={{
            unmountOnBlur: true,
            tabBarLabel: 'Item List',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="format-list-numbered" color={color} size={40} />
            ),
          }}
        >
          {(props) => <ExpensesList {...props} />}
        </Tab.Screen>

      </Tab.Navigator>
    </>
  );
};

export default BottomTab;