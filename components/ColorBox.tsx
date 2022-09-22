import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

type ColorBoxProps = {
  colorName: string;
  hexCode: string;
};

const ColorBox = ({ colorName, hexCode }: ColorBoxProps) => {
  const boxColor = {
    backgroundColor: hexCode,
  };
  const textColor = {
    color:
      parseInt(hexCode.replace('#', ''), 16) > 0xffffff / 1.1
        ? 'black'
        : 'white',
  };
  return (
    <View style={[styles.box, boxColor]}>
      <Text style={[styles.boxText, textColor]}>
        {colorName}: {hexCode}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 40,
    marginVertical: 5,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  boxText: {
    color: 'white',
    fontSize: 12,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
export default ColorBox;
