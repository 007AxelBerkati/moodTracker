import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { theme } from '../theme';
import { MoodOptionType } from '../type';
import { butterFlies } from '../assets';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Sound from 'react-native-sound';

const moodOptions: MoodOptionType[] = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];

type MoodPickerProps = {
  onSelect: (mood: MoodOptionType) => void;
};

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSetting: false,
};

var whoosh = new Sound('example.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
  console.log(
    'duration in seconds: ' +
      whoosh.getDuration() +
      'number of channels: ' +
      whoosh.getNumberOfChannels(),
  );
});

export const MoodPicker: React.FC<MoodPickerProps> = ({ onSelect }) => {
  const [selectedMood, setSelectedMood] = useState<MoodOptionType>();
  const [hasSelected, setHasSelected] = useState(false);
  const [start, setStart] = useState(false);
  const [timer, setTimer] = useState(null);
  const [counter, setCounter] = useState(0);

  const ReanimatePressable = Reanimated.createAnimatedComponent(Pressable);

  const buttonStyle = useAnimatedStyle(
    () => ({
      opacity: selectedMood ? withTiming(1) : withTiming(0.5),
      transform: [{ scale: selectedMood ? withTiming(1) : 0.8 }],
    }),
    [selectedMood],
  );

  const handleSelect = useCallback(() => {
    if (selectedMood) {
      ReactNativeHapticFeedback.trigger('impactLight', options);
      onSelect(selectedMood);
      setSelectedMood(undefined);
      setHasSelected(true);
      if (!start) {
        whoosh.play();
        const myTimer = setInterval(() => {
          setCounter(counter => counter - 1);
        }, 1000);
        setTimer(myTimer);
        setStart(start => !start);
      } else {
        whoosh.pause();
        clearInterval(timer);
        setCounter(null);
        setStart(start => !start);
      }
    }
  }, [onSelect, selectedMood]);

  if (hasSelected) {
    return (
      <View style={styles.container}>
        <Image source={butterFlies} style={styles.image} />
        <Pressable
          style={styles.button}
          onPress={() => {
            setHasSelected(false);
            setStart(false);
            whoosh.pause();
          }}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How Are You Right Now?</Text>
      <View style={styles.moodList}>
        {moodOptions.map(option => (
          <View key={option.emoji}>
            <Pressable
              onPress={() => setSelectedMood(option)}
              key={option.emoji}
              style={[
                styles.moodItem,
                option.emoji === selectedMood?.emoji
                  ? styles.selectedMoodItem
                  : undefined,
              ]}>
              <Text style={styles.emoji}>{option.emoji}</Text>
            </Pressable>
            <Text style={styles.descriptionText}>
              {selectedMood?.emoji === option.emoji ? option.description : ''}
            </Text>
          </View>
        ))}
      </View>
      <ReanimatePressable
        onPress={handleSelect}
        style={[styles.button, buttonStyle]}>
        <Text style={styles.buttonText}>Choose</Text>
      </ReanimatePressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 2,
    borderColor: theme.colorPurple,
    borderRadius: 10,
    margin: 10,
    justifyContent: 'space-between',
    height: 230,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },

  heading: {
    fontSize: 20,
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: theme.fontFamilyBold,
    color: theme.colorWhite,
  },
  moodText: {
    fontSize: 24,
    fontFamily: theme.fontFamilyLight,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  moodItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 5,
  },

  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: '#454C73',
    borderColor: '#fff',
  },

  descriptionText: {
    fontSize: 10,
    color: '#454C73',
    textAlign: 'center',
    fontFamily: theme.fontFamilyBold,
  },
  button: {
    backgroundColor: theme.colorPurple,
    alignSelf: 'center',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: theme.colorWhite,
    fontSize: 16,
    fontFamily: theme.fontFamilyBold,
  },

  emoji: {
    fontSize: 20,
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
