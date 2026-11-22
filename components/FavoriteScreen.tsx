import React from "react";
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FALLBACK_DOCTORS } from "./DashboardScreen";

interface SubScreenProps {
  onBackToProfile: () => void;
  onBackToHome: () => void;
  onOpenChat: () => void;
}

export default function FavoriteScreen({ onBackToProfile, onBackToHome, onOpenChat }: SubScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={onBackToProfile} style={styles.headerBtn}>
            <Ionicons name="chevron-back" size={24} color="#2563EB" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Favorite</Text>
          <View style={styles.headerBtn} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {FALLBACK_DOCTORS.slice(0, 3).map((doc) => (
            <View key={doc.id} style={styles.card}>
              <Image source={{ uri: doc.avatar }} style={styles.avatar} />
              <View style={styles.info}>
                <Text style={styles.title}>{doc.name}</Text>
                <Text style={styles.sub}>{doc.specialty}</Text>
                <Text style={styles.meta}>★ {doc.rating} • {doc.appointmentTime}</Text>
              </View>
              <Ionicons name="heart" size={22} color="#2563EB" />
            </View>
          ))}
        </ScrollView>

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
            <TouchableOpacity onPress={() => Alert.alert("Күнтізбе", "Қабылдау күндерін басты беттен қараңыз.")}>
              <Ionicons name="calendar-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  topHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 18, paddingTop: 14, paddingBottom: 12 },
  headerBtn: { width: 34, height: 34, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#2563EB" },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 105, gap: 12 },
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "#F8FAFC", borderRadius: 18, padding: 12, borderWidth: 1, borderColor: "#E2E8F0", gap: 12 },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  info: { flex: 1 },
  title: { fontSize: 15, fontWeight: "700", color: "#0F172A" },
  sub: { fontSize: 12, color: "#475569", marginTop: 2 },
  meta: { fontSize: 11, color: "#2563EB", fontWeight: "600", marginTop: 2 },
  bottomNavContainer: { position: "absolute", left: 22, right: 22, bottom: 18 },
  bottomNavBar: { backgroundColor: "#2563EB", borderRadius: 28, height: 56, flexDirection: "row", alignItems: "center", justifyContent: "space-around" },
});