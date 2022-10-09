import { groupBy } from 'lodash';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useAppContext } from '../App.provider';
import { VictoryPie } from 'victory-native';

export const Analytic: React.FC = () => {
  const appContext = useAppContext();

  const data = Object.entries(groupBy(appContext.moodList, 'mood.emoji')).map(
    ([key, value]) => ({
      x: key,
      y: value.length,
    }),
  );

  return (
    <View style={styles.container}>
      <VictoryPie data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
