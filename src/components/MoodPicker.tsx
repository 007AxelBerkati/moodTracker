import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { theme } from '../theme';
import { MoodOptionType } from '../type';
import { butterFlies } from '../assets';

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

export const MoodPicker: React.FC<MoodPickerProps> = ({ onSelect }) => {
  const [selectedMood, setSelectedMood] = useState<MoodOptionType>();
  const [hasSelected, setHasSelected] = useState(false);

  const handleSelect = useCallback(() => {
    if (selectedMood) {
      onSelect(selectedMood);
      setSelectedMood(undefined);
      setHasSelected(true);
    }
  }, [onSelect, selectedMood]);

  if (hasSelected) {
    return (
      <View style={styles.container}>
        <Image source={butterFlies} style={styles.image} />
        <Pressable style={styles.button} onPress={() => setHasSelected(false)}>
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
      <Pressable onPress={handleSelect} style={styles.button}>
        <Text style={styles.buttonText}>Choose</Text>
      </Pressable>
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
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colorWhite,
  },
  moodText: {
    fontSize: 24,
    color: 'black',
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
    fontWeight: 'bold',
    textAlign: 'center',
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
  },

  emoji: {
    fontSize: 20,
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
