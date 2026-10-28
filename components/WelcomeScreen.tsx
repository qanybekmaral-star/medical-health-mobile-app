
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  useWindowDimensions,
} from 'react-native';

import SkinFirtsLogo from './SkinFirtsLogo';

type Props = {
  onLogin: () => void;
  onSignUp: () => void;
};

export default function WelcomeScreen({
  onLogin,
  onSignUp,
}: Props) {
  const { height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        <SkinFirtsLogo
          crossColor="#2860F5"
          leafColor="#FFFFFF"
          textColor="#2860F5"
          size={120}
        />

        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </Text>

        <View
          style={[
            styles.buttons,
            { marginTop: height * 0.025 },
          ]}
        >
          <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.pressed,
            ]}
            onPress={onLogin}
          >
            <Text style={styles.loginText}>
              Log In
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.signUpButton,
              pressed && styles.pressed,
            ]}
            onPress={onSignUp}
          >
            <Text style={styles.signUpText}>
              Sign Up
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  description: {
    color: '#555555',
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'center',
    maxWidth: 300,
    marginTop: 60,
  },

  buttons: {
    width: '100%',
    maxWidth: 330,
  },

  loginButton: {
    width: '100%',
    height: 44,
    backgroundColor: '#2860F5',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },

  loginText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  signUpButton: {
    width: '100%',
    height: 44,
    backgroundColor: '#CFD7FF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  signUpText: {
    color: '#2860F5',
    fontSize: 16,
    fontWeight: '600',
  },

  pressed: {
    opacity: 0.7,
  },
});
