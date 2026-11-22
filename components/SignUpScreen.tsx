
import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";

type Props = {
  onBack: () => void;
  onLogin: () => void;
  onCreateAccount: (
    name: string,
    email: string,
    password: string
  ) => void;
};

export default function SignUpScreen({
  onBack,
  onLogin,
  onCreateAccount,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const handleRegister = () => {
    let valid = true;

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmError("");

    if (!name.trim()) {
      setNameError("Аты-жөніңізді енгізіңіз!");
      valid = false;
    }

    if (!email.trim()) {
      setEmailError("Email енгізіңіз!");
      valid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      setEmailError("Email дұрыс емес!");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password енгізіңіз!");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Кемінде 6 таңба болуы керек!");
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmError("Password қайталаңыз!");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmError("Password сәйкес келмейді!");
      valid = false;
    }

    if (!valid) return;

    onCreateAccount(name.trim(), email.trim(), password);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Sign Up</Text>

          <View style={{ width: 25 }} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.welcome}>Create Account</Text>

          <Text style={styles.description}>
            Create your account to get started with
            Skin Firts Dermatology Center.
          </Text>

          {/* Full Name */}
          <View style={styles.form}>
            <Text style={styles.label}>Full Name</Text>

            <TextInput
              style={[
                styles.input,
                nameError ? styles.inputError : null,
              ]}
              placeholder="Enter your full name"
              placeholderTextColor="#829EFF"
              value={name}
              onChangeText={(value) => {
                setName(value);
                setNameError("");
              }}
              autoCapitalize="words"
            />

            {nameError !== "" && (
              <Text style={styles.errorText}>
                {nameError}
              </Text>
            )}

            {/* Email */}
            <Text style={[styles.label, styles.labelMargin]}>
              Email Address
            </Text>

            <TextInput
              style={[
                styles.input,
                emailError ? styles.inputError : null,
              ]}
              placeholder="example@example.com"
              placeholderTextColor="#829EFF"
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                setEmailError("");
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            {emailError !== "" && (
              <Text style={styles.errorText}>
                {emailError}
              </Text>
            )}

            {/* Password */}
            <Text style={[styles.label, styles.labelMargin]}>
              Password
            </Text>

            <View
              style={[
                styles.passwordContainer,
                passwordError ? styles.inputError : null,
              ]}
            >
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter password"
                placeholderTextColor="#829EFF"
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                  setPasswordError("");
                }}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eye}>
                  {showPassword ? "◉" : "◎"}
                </Text>
              </TouchableOpacity>
            </View>

            {passwordError !== "" && (
              <Text style={styles.errorText}>
                {passwordError}
              </Text>
            )}

            {/* Confirm Password */}
            <Text style={[styles.label, styles.labelMargin]}>
              Confirm Password
            </Text>

            <View
              style={[
                styles.passwordContainer,
                confirmError ? styles.inputError : null,
              ]}
            >
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirm password"
                placeholderTextColor="#829EFF"
                value={confirmPassword}
                onChangeText={(value) => {
                  setConfirmPassword(value);
                  setConfirmError("");
                }}
                secureTextEntry={!showConfirm}
                autoCapitalize="none"
              />

              <TouchableOpacity
                onPress={() => setShowConfirm(!showConfirm)}
              >
                <Text style={styles.eye}>
                  {showConfirm ? "◉" : "◎"}
                </Text>
              </TouchableOpacity>
            </View>

            {confirmError !== "" && (
              <Text style={styles.errorText}>
                {confirmError}
              </Text>
            )}

            {/* Create Account */}
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleRegister}
            >
              <Text style={styles.createButtonText}>
                Create Account
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?
            </Text>

            <TouchableOpacity onPress={onLogin}>
              <Text style={styles.loginText}> Log In</Text>
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
    backgroundColor: "#FFFFFF",
  },

  header: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },

  backArrow: {
    fontSize: 38,
    color: "#2860FF",
    lineHeight: 42,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2860FF",
  },

  content: {
    paddingHorizontal: 33,
    paddingTop: 15,
    paddingBottom: 35,
  },

  welcome: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2860FF",
  },

  description: {
    fontSize: 12,
    color: "#222222",
    lineHeight: 17,
    marginTop: 7,
  },

  form: {
    marginTop: 30,
  },

  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111111",
    marginBottom: 9,
  },

  labelMargin: {
    marginTop: 18,
  },

  input: {
    height: 50,
    backgroundColor: "#EDF1FF",
    borderRadius: 16,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#222222",
  },

  inputError: {
    borderWidth: 1,
    borderColor: "#FF3333",
  },

  errorText: {
    color: "#FF3333",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },

  passwordContainer: {
    height: 50,
    backgroundColor: "#EDF1FF",
    borderRadius: 16,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: "#222222",
  },

  eye: {
    fontSize: 23,
    color: "#111111",
  },

  createButton: {
    height: 52,
    backgroundColor: "#2860FF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    marginHorizontal: "8%",
  },

  createButtonText: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "600",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },

  footerText: {
    fontSize: 12,
    color: "#222222",
  },

  loginText: {
    fontSize: 12,
    color: "#2860FF",
    fontWeight: "600",
  },
});
