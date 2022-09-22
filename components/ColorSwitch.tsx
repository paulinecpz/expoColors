import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

const ColorSwitch = ({ color, setColors, colors }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = (color) => {
    chooseColors(color);
    setIsEnabled((previousState) => !previousState);
  };
  const chooseColors = (color) => {
    if (colors.includes(color)) {
      setColors((colors) => colors.filter((c) => c !== color));
    } else {
      setColors((colors) => [...colors, color]);
    }
  };
  return (
    <View style={styles.toggleContainer}>
      <Text>{color.colorName}</Text>
      <Switch onChange={() => toggleSwitch(color)} value={isEnabled} />
    </View>
  );
};
const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    borderTopColor: 'grey',
    borderTopWidth: 1,
    paddingVertical: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
});
export default ColorSwitch;
