
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
  onCreateAccount: () => void;
};

export default function SetPasswordScreen({
  onBack,
  onCreateAccount
}: Props) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleCreateAccount = () => {
    if (password.length < 6) {
      alert('Password must contain at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    onCreateAccount();
  };

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
          <Text style={styles.headerTitle}>Set Password</Text>
          <View style={styles.emptySpace} />
        </View>

        <View style={styles.welcome}>
          <Text style={styles.welcomeTitle}>Create Password</Text>
          <Text style={styles.description}>
            Create a strong password for your new account.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Password</Text>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter password"
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

          <Text style={styles.label}>Confirm Password</Text>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm password"
              placeholderTextColor="#829BFF"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              onPress={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              <Text style={styles.eyeIcon}>
                {showConfirmPassword ? '◉' : '◎'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.infoText}>
            Password must contain at least 6 characters.
          </Text>

          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateAccount}
          >
            <Text style={styles.createButtonText}>
              Create Account
            </Text>
          </TouchableOpacity>
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
    marginTop: 35
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2860FF'
  },
  description: {
    fontSize: 12,
    color: '#444444',
    marginTop: 8
  },
  form: {
    paddingHorizontal: 31,
    marginTop: 35
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 9,
    marginTop: 18
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
  infoText: {
    fontSize: 11,
    color: '#777777',
    marginTop: 12
  },
  createButton: {
    height: 47,
    backgroundColor: '#2860FF',
    borderRadius: 25,
    marginHorizontal: 13,
    marginTop: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  createButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF'
  }
});
