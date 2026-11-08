import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import SkinFirtsLogo from './SkinFirtsLogo';

type Props = {
  onLogin: () => void;
  onSignUp: () => void;
  onBack: () => void;
};

export default function WelcomeScreen({
  onLogin,
  onSignUp,
  onBack,
}: Props) {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <SkinFirtsLogo />

          <Text style={styles.logoText}>
            Skin
            {'\n'}
            Firts
          </Text>

          <Text style={styles.subtitle}>
            Dermatology Center
          </Text>
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            {'\n'}
            sed do eiusmod tempor incididunt ut labore et dolore
            {'\n'}
            magna aliqua.
          </Text>
        </View>

        {/* Log In and Sign Up */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={onLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginText}>
              Log In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={onSignUp}
            activeOpacity={0.8}
          >
            <Text style={styles.signupText}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },

  logoContainer: {
    position: 'absolute',
    top: '28%',
    alignItems: 'center',
    width: '100%',
  },

  logoText: {
    color: '#2860FF',
    fontSize: 52,
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: 48,
    letterSpacing: -2,
    marginTop: 5,
  },

  subtitle: {
    color: '#2860FF',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 18,
  },

  descriptionContainer: {
    position: 'absolute',
    bottom: '25%',
    width: '90%',
    alignItems: 'center',
  },

  description: {
    color: '#222222',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 14,
  },

  buttonsContainer: {
    position: 'absolute',
    bottom: '9%',
    width: '58%',
    alignItems: 'center',
  },

  loginButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#2860FF',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 9,
  },

  loginText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '500',
  },

  signupButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#CCD7FF',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  signupText: {
    color: '#2860FF',
    fontSize: 26,
    fontWeight: '500',
  },
});