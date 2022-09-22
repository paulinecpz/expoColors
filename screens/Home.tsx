import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PalettePreview, { ColorObject } from '../components/PalettePreview';

type HomeProps = {
  navigation: {
    navigate: (screen: string, arg?: object) => void;
  };
};
type ColorPalette = {
  paletteName: string;
  colors: ColorObject[];
};
const Home = ({ navigation, route }: HomeProps) => {
  const newColorPalette = route?.params?.newColorPalette;
  const [colorPalettes, setColorPalettes] = useState<ColorPalette[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fecthColors = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch(
        'https://color-palette-api.kadikraman.vercel.app/palettes',
      );

      const colors = await response.json();
      setColorPalettes(colors);
      setIsRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fecthColors();
  }, []);
  useEffect(() => {
    if (newColorPalette) {
      setColorPalettes((palettes) => [newColorPalette, ...palettes]);
    }
  }, [newColorPalette]);
  return (
    <View>
      {colorPalettes.length > 0 && (
        <FlatList
          data={colorPalettes}
          keyExtractor={(item) => item.paletteName}
          renderItem={({ item }) => (
            <PalettePreview
              title={item.paletteName}
              navigation={navigation}
              colors={item.colors}
            />
          )}
          refreshing={isRefreshing}
          onRefresh={fecthColors}
          ListHeaderComponent={
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ColorPaletteModal');
              }}
            >
              <Text style={styles.button}>Add a color scheme</Text>
            </TouchableOpacity>
          }
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'teal',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    overflow: 'hidden',
    textAlign: 'center',
  },
});

export default Home;
