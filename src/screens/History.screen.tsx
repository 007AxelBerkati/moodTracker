import React from 'react';
import { ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAppContext } from '../App.provider';
import { MoodItemRow } from '../components/MoodItemRow';

export const History: React.FC = () => {
  const appContext = useAppContext();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView>
        {appContext.moodList
          .slice()
          .reverse()
          .map(item => (
            <MoodItemRow item={item} key={item.timestamp} />
          ))}
      </ScrollView>
    </GestureHandlerRootView>
  );
};
