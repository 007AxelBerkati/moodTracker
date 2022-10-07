import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { History } from './History.screen';
import { Home } from './Home.screen';
import { Analytic } from './Analytic.screen';
import { AnalyticIcon, HistoryIcon, HomeIcon } from '../components/icons';
import { theme } from '../theme';

const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        headerTitleStyle: { fontFamily: theme.fontFamilyBold },
        tabBarActiveTintColor: theme.colorBlue,
        tabBarInactiveTintColor: theme.colorGrey,
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <HomeIcon color={color} size={size} />;
          }

          if (route.name === 'History') {
            return (
              <HistoryIcon color={color} size={size}>
                History
              </HistoryIcon>
            );
          }

          if (route.name === 'Analytic') {
            return (
              <AnalyticIcon color={color} size={size}>
                Analytics
              </AnalyticIcon>
            );
          }

          return null;
        },
      })}>
      <BottomTabs.Screen
        name="Home"
        component={Home}
        options={{ title: "Today's Mood" }}
      />
      <BottomTabs.Screen
        name="History"
        component={History}
        options={{ title: 'Past Moods' }}
      />
      <BottomTabs.Screen
        name="Analytic"
        component={Analytic}
        options={{ title: 'Fancy Charts' }}
      />
    </BottomTabs.Navigator>
  );
};
