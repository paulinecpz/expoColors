import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Text,
  Switch,
  Button,
  FlatList,
  Alert,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ColorSwitch from '../components/ColorSwitch';
import { COLORS_LIST } from '../data';

const ColorPaletteModal = ({ navigation }) => {
  const [paletteName, setPaletteName] = useState<string>('');
  const [colors, setColors] = useState<Array<object>>([]);
  const submitForm = useCallback(() => {
    if (!paletteName) {
      Alert.alert('Please enter a name for your palette');
      return;
    }
    if (colors.length < 3) {
      Alert.alert('Please add at least 3 color to your palette');
      return;
    }
    const newColorPalette = {
      paletteName,
      colors: colors,
    };
    navigation.navigate('Home', { newColorPalette });
  }, [paletteName, colors]);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Name your Palette</Text>
        <TextInput
          style={styles.input}
          value={paletteName}
          onChangeText={setPaletteName}
          placeholder="Palette Name"
        />
        <FlatList
          style={styles.list}
          data={COLORS_LIST}
          keyExtractor={(item) => item.colorName}
          renderItem={({ item }) => (
            <ColorSwitch color={item} setColors={setColors} colors={colors} />
          )}
        />

        <TouchableOpacity onPress={submitForm} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 5,
    height: 40,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  button: {
    height: 40,
    backgroundColor: 'teal',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  list: {
    height: 500,
    marginBottom: 10,
  },
});
export default ColorPaletteModal;
