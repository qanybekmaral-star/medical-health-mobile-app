import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Text style={styles.logo}>SkinFirst</Text>
        </View>

        <View style={styles.welcomeContainer}>
          <Text style={styles.title}>Welcome!</Text>

          <Text style={styles.description}>
            Your skin care journey starts here.
            Take care of your skin with us.
          </Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={onLogin}
          >
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={onSignUp}
          >
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 15,
  },

  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
  },

  backText: {
    fontSize: 17,
    color: '#333333',
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 70,
  },

  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#244C3B',
  },

  welcomeContainer: {
    alignItems: 'center',
    marginTop: 100,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#244C3B',
    marginBottom: 15,
  },

  description: {
    fontSize: 16,
    color: '#777777',
    textAlign: 'center',
    lineHeight: 24,
  },

  buttons: {
    marginTop: 80,
    gap: 15,
  },

  loginButton: {
    backgroundColor: '#244C3B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  loginText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  signupButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#244C3B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  signupText: {
    color: '#244C3B',
    fontSize: 17,
    fontWeight: 'bold',
  },
});