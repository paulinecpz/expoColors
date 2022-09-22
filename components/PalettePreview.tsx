import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type PalettePreviewProps = {
  title: string;
  navigation: {
    navigate: (screen: string, arg?: object) => void;
  };
  colors: ColorObject[];
};

export type ColorObject = {
  colorName: string;
  hexCode: string;
};

const PalettePreview = ({ title, navigation, colors }: PalettePreviewProps) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ColorPalette', {
          paletteName: title,
          colors: colors,
        })
      }
    >
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={colors.slice(0, 5)}
        numColumns={5}
        renderItem={(item) => {
          const hexCode = item.item.hexCode;
          return <View style={[styles.square, { backgroundColor: hexCode }]} />;
        }}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  square: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
});
export default PalettePreview;
