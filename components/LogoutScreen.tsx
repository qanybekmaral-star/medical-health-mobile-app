import React from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface LogoutScreenProps {
  userName?: string;
  avatarUri?: string;
  onConfirmLogout: () => void;
  onBackToProfile: () => void;
  onBackToHome: () => void;
  onOpenChat: () => void;
}

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80";

export default function LogoutScreen({
  userName = "John Doe",
  avatarUri = DEFAULT_AVATAR,
  onConfirmLogout,
  onBackToProfile,
  onBackToHome,
  onOpenChat,
}: LogoutScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Жоғарғы Header */}
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={onBackToProfile} style={styles.headerBtn}>
            <Ionicons name="chevron-back" size={24} color="#2563EB" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Logout</Text>
          <View style={styles.headerBtn} />
        </View>

        {/* Орталық растау карточкасы */}
        <View style={styles.centerContent}>
          <View style={styles.iconCircle}>
            <Ionicons name="log-out-outline" size={38} color="#2563EB" />
          </View>

          <Image source={{ uri: avatarUri }} style={styles.avatar} />
          <Text style={styles.userName}>{userName}</Text>

          <Text style={styles.title}>Аккаунттан шығу</Text>
          <Text style={styles.subtitle}>
            Шынымен де аккаунтыңыздан шыққыңыз келе ме? Қайта кіру үшін логин немесе тіркелу бетіне өтесіз.
          </Text>

          <TouchableOpacity
            style={styles.logoutBtn}
            activeOpacity={0.85}
            onPress={onConfirmLogout}
          >
            <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
            <Text style={styles.logoutBtnText}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelBtn}
            activeOpacity={0.85}
            onPress={onBackToProfile}
          >
            <Text style={styles.cancelBtnText}>Болдырмау</Text>
          </TouchableOpacity>
        </View>

        {/* Төменгі көк навигация панелі */}
        <View style={styles.bottomNavContainer}>
          <View style={styles.bottomNavBar}>
            <TouchableOpacity onPress={onBackToHome}>
              <Ionicons name="home-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onOpenChat}>
              <Ionicons name="chatbubbles-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onBackToProfile}>
              <Ionicons name="person" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Alert.alert("Күнтізбе", "Қабылдау күндерін басты беттен қараңыз.")
              }
            >
              <Ionicons name="calendar-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 12,
  },
  headerBtn: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2563EB",
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingBottom: 70,
  },
  iconCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: "#DCE6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: "#475569",
    textAlign: "center",
    lineHeight: 19,
    marginBottom: 24,
  },
  logoutBtn: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563EB",
    borderRadius: 28,
    paddingVertical: 14,
    gap: 8,
    marginBottom: 12,
  },
  logoutBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  cancelBtn: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5ECFF",
    borderRadius: 28,
    paddingVertical: 13,
  },
  cancelBtnText: {
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "700",
  },
  bottomNavContainer: {
    position: "absolute",
    left: 22,
    right: 22,
    bottom: 18,
  },
  bottomNavBar: {
    backgroundColor: "#2563EB",
    borderRadius: 28,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});