
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
  onLogin: () => void;
  onContinue: () => void;
};

export default function SignUpScreen({
  onBack,
  onLogin,
  onContinue
}: Props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

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
          <Text style={styles.headerTitle}>New Account</Text>
          <View style={styles.emptySpace} />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Full name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#829BFF"
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="example@example.com"
            placeholderTextColor="#829BFF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter mobile number"
            placeholderTextColor="#829BFF"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
          />

          <Text style={styles.dateLabel}>Date Of Birth</Text>
          <TextInput
            style={styles.dateInput}
            placeholder="DD / MM / YYYY"
            placeholderTextColor="#2860FF"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
          />

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By continuing, you agree to
            </Text>
            <Text style={styles.termsText}>
              <Text style={styles.blueText}>Terms of Use</Text>
              {' and '}
              <Text style={styles.blueText}>Privacy Policy.</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={onContinue}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
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

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={onLogin}>
              <Text style={styles.loginLink}>Log in</Text>
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
  form: {
    paddingHorizontal: 31,
    marginTop: 10
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
    fontSize: 15,
    color: '#222222',
    marginBottom: 14
  },
  dateLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111111',
    marginLeft: 20,
    marginBottom: 9
  },
  dateInput: {
    height: 46,
    backgroundColor: '#ECF1FF',
    borderRadius: 14,
    paddingHorizontal: 24,
    fontSize: 16,
    color: '#2860FF',
    marginHorizontal: 20
  },
  termsContainer: {
    alignItems: 'center',
    marginTop: 18
  },
  termsText: {
    fontSize: 10,
    color: '#444444',
    textAlign: 'center'
  },
  blueText: {
    color: '#2860FF'
  },
  signUpButton: {
    height: 47,
    backgroundColor: '#2860FF',
    borderRadius: 25,
    marginHorizontal: 47,
    marginTop: 13,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpButtonText: {
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 37,
    marginBottom: 25
  },
  loginText: {
    fontSize: 11,
    color: '#444444'
  },
  loginLink: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2860FF'
  }
});
