
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
  onSignUp: () => void;
  onLogin: (email: string, password: string) => void;
};

export default function LogInScreen1({
  onBack,
  onSignUp,
  onLogin,
}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Login тексеру
  const handleLogin = () => {
    let valid = true;

    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Email енгізіңіз!");
      valid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      setEmailError("Email дұрыс емес!");
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password енгізіңіз!");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password кемінде 6 таңба болуы керек!");
      valid = false;
    }

    if (!valid) return;

    onLogin(email.trim(), password);
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

          <Text style={styles.headerTitle}>Log In</Text>

          <View style={{ width: 25 }} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.welcome}>Welcome</Text>

          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.label}>
              Email or Mobile Number
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
            <Text style={[styles.label, { marginTop: 17 }]}>
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
                placeholder="************"
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

            {/* Forgot Password */}
            <TouchableOpacity
              style={styles.forgotButton}
              onPress={() => {}}
            >
              <Text style={styles.forgotText}>
                Forget Password
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>
                Log In
              </Text>
            </TouchableOpacity>
          </View>

          {/* Social Login */}
          <Text style={styles.orText}>
            or sign up with
          </Text>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.google}>G</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.facebook}>f</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.fingerprint}>◎</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don’t have an account?
            </Text>

            <TouchableOpacity onPress={onSignUp}>
              <Text style={styles.signUpText}>
                {" "}Sign Up
              </Text>
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

  statusBar: {
    height: 30,
    backgroundColor: "#EDF1FF",
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  time: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000000",
  },

  statusIcons: {
    color: "#000000",
    fontSize: 13,
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
    paddingBottom: 30,
  },

  welcome: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2860FF",
  },

  description: {
    fontSize: 11,
    color: "#222222",
    lineHeight: 14,
    marginTop: 5,
  },

  form: {
    marginTop: 48,
  },

  label: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111111",
    marginBottom: 10,
  },

  input: {
    height: 50,
    backgroundColor: "#EDF1FF",
    borderRadius: 16,
    paddingHorizontal: 15,
    fontSize: 17,
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
    fontSize: 16,
    color: "#222222",
  },

  eye: {
    fontSize: 24,
    color: "#111111",
  },

  forgotButton: {
    alignSelf: "flex-end",
    marginTop: 9,
  },

  forgotText: {
    color: "#2860FF",
    fontSize: 12,
    fontWeight: "500",
  },

  loginButton: {
    height: 52,
    backgroundColor: "#2860FF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 39,
    marginHorizontal: "15%",
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
  },

  orText: {
    textAlign: "center",
    fontSize: 11,
    color: "#222222",
    marginTop: 16,
  },

  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 12,
  },

  socialButton: {
    width: 45,
    height: 45,
    backgroundColor: "#CCD7FF",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  google: {
    color: "#2860FF",
    fontSize: 30,
    fontWeight: "500",
  },

  facebook: {
    color: "#2860FF",
    fontSize: 32,
    fontWeight: "600",
  },

  fingerprint: {
    color: "#2860FF",
    fontSize: 30,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },

  footerText: {
    fontSize: 11,
    color: "#222222",
  },

  signUpText: {
    fontSize: 11,
    color: "#2860FF",
    fontWeight: "600",
  },
});
