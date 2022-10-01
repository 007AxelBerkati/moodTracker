import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { History } from './History.screen';
import { Home } from './Home.screen';
import { Analytic } from './Analytic.screen';

const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="Home" component={Home} />
      <BottomTabs.Screen name="History" component={History} />
      <BottomTabs.Screen name="Analytic" component={Analytic} />
    </BottomTabs.Navigator>
  );
};
