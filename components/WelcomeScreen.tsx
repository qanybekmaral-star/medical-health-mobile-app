
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import SkinFirtsLogo from "./SkinFirtsLogo";

type Props = {
  onBack: () => void;
  onLogin: () => void;
  onSignUp: () => void;
};

export default function WelcomeScreen({
  onBack,
  onLogin,
  onSignUp,
}: Props) {
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <View style={styles.logo}>
        <SkinFirtsLogo
          crossColor="#2860F5"
          leafColor="#FFFFFF"
          textColor="#2860F5"
          size={120}
        />
      </View>

      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        {"\n"}sed do eiusmod tempor incididunt ut labore et dolore
        {"\n"}magna aliqua.
      </Text>

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    marginTop: -40,
  },

  description: {
    marginTop: 65,
    fontSize: 11,
    color: "#333333",
    textAlign: "center",
    lineHeight: 13,
  },

  loginButton: {
    width: "58%",
    height: 49,
    backgroundColor: "#2860FF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 37,
  },

  loginText: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "600",
  },

  signupButton: {
    width: "58%",
    height: 49,
    backgroundColor: "#CCD7FF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },

  signupText: {
    color: "#2860FF",
    fontSize: 23,
    fontWeight: "600",
  },
});
