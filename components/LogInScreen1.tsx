
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

type Props = {
  onBack: () => void;
  onContinue: () => void;
  onSignUp: () => void;
};

export default function LogInScreen1({
  onBack,
  onContinue,
  onSignUp
}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.time}>16:04</Text>
        <Text style={styles.statusIcons}>▮▮ ◉ ▰</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.backButton}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Log In</Text>
          <View style={styles.emptySpace} />
        </View>

        <View style={styles.welcome}>
          <Text style={styles.welcomeTitle}>Welcome</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email or Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="example@example.com"
            placeholderTextColor="#829BFF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="**************"
              placeholderTextColor="#829BFF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.eyeIcon}>
                {showPassword ? '◉' : '◎'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotButton}>
            <Text style={styles.forgotText}>Forget Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={onContinue}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>or sign up with</Text>

          <View style={styles.socialContainer}>
            <View style={styles.socialButton}>
              <Text style={styles.googleText}>G</Text>
            </View>
            <View style={styles.socialButton}>
              <Text style={styles.facebookText}>f</Text>
            </View>
            <View style={styles.socialButton}>
              <Text style={styles.fingerprint}>◎</Text>
            </View>
          </View>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={onSignUp}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  statusBar: {
    height: 27,
    backgroundColor: '#EAF0FF',
    paddingHorizontal: 27,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  time: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000'
  },
  statusIcons: {
    fontSize: 13,
    color: '#000000'
  },
  header: {
    height: 67,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28
  },
  backButton: {
    fontSize: 37,
    color: '#2860FF'
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2860FF'
  },
  emptySpace: {
    width: 25
  },
  welcome: {
    paddingHorizontal: 31,
    marginTop: 9
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2860FF'
  },
  description: {
    fontSize: 10,
    color: '#333333',
    marginTop: 7,
    lineHeight: 12
  },
  form: {
    paddingHorizontal: 31,
    marginTop: 45
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 9
  },
  input: {
    height: 46,
    backgroundColor: '#ECF1FF',
    borderRadius: 14,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#222222',
    marginBottom: 17
  },
  passwordContainer: {
    height: 46,
    backgroundColor: '#ECF1FF',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: '#222222'
  },
  eyeIcon: {
    fontSize: 23,
    color: '#111111'
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: 8
  },
  forgotText: {
    color: '#2860FF',
    fontSize: 11
  },
  loginButton: {
    height: 47,
    backgroundColor: '#2860FF',
    borderRadius: 25,
    marginHorizontal: 54,
    marginTop: 36,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginButtonText: {
    fontSize: 21,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  orText: {
    textAlign: 'center',
    fontSize: 10,
    color: '#444444',
    marginTop: 15
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 11,
    marginTop: 13
  },
  socialButton: {
    width: 41,
    height: 41,
    borderRadius: 25,
    backgroundColor: '#D1DCFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  googleText: {
    fontSize: 26,
    color: '#2860FF'
  },
  facebookText: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#2860FF'
  },
  fingerprint: {
    fontSize: 28,
    color: '#2860FF'
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 37,
    marginBottom: 30
  },
  signUpText: {
    fontSize: 11,
    color: '#444444'
  },
  signUpLink: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2860FF'
  }
});
