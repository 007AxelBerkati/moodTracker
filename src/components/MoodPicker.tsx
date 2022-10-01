import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { theme } from '../theme';
import { MoodOptionType } from '../type';

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

  const handleSelect = useCallback(() => {
    if (selectedMood) {
      onSelect(selectedMood);
      setSelectedMood(undefined);
    }
  }, [onSelect, selectedMood]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How Are You Right Now?</Text>
      <View style={styles.moodList}>
        {moodOptions.map(option => (
          <View>
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
    backgroundColor: theme.colorWhite,
    borderWidth: 2,
    borderColor: theme.colorPurple,
    borderRadius: 10,
    margin: 10,
  },

  heading: {
    fontSize: 20,
    letterSpacing: 1,
    color: theme.colorPurple,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
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
});
