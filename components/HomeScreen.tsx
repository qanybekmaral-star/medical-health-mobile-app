
import React from 'react';
import {
  Pressable,
  StyleSheet,
  StatusBar,
} from 'react-native';

import SkinFirtsLogo from './SkinFirtsLogo';

type Props = {
  onContinue: () => void;
};

export default function HomeScreen({ onContinue }: Props) {
  return (
    <Pressable
      style={styles.container}
      onPress={onContinue}
    >
      <StatusBar barStyle="light-content" />

      <SkinFirtsLogo
        crossColor="#FFFFFF"
        leafColor="#2860F5"
        textColor="#FFFFFF"
        size={120}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#2860F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
