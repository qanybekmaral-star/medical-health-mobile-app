import React from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SubScreenProps {
  onBackToProfile: () => void;
  onBackToHome: () => void;
  onOpenChat: () => void;
}

export default function HelpScreen({ onBackToProfile, onBackToHome, onOpenChat }: SubScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={onBackToProfile} style={styles.headerBtn}>
            <Ionicons name="chevron-back" size={24} color="#2563EB" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Help</Text>
          <View style={styles.headerBtn} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.box}>
            <Text style={styles.title}>Көмек және жиі қойылатын сұрақтар</Text>
            <Text style={styles.text}>• Дәрігерді таңдап, қабылдауға жазылу үшін басты беттегі дәрігер карточкасын басыңыз.</Text>
            <Text style={styles.text}>• Дәрігермен жеке сөйлесу үшін төменгі панельдегі чат иконкасын таңдаңыз.</Text>
          </View>

          <TouchableOpacity style={styles.btn} onPress={onOpenChat}>
            <Text style={styles.btnText}>Чатқа өту</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.bottomNavContainer}>
          <View style={styles.bottomNavBar}>
            <TouchableOpacity onPress={onBackToHome}><Ionicons name="home-outline" size={24} color="#FFFFFF" /></TouchableOpacity>
            <TouchableOpacity onPress={onOpenChat}><Ionicons name="chatbubbles-outline" size={24} color="#FFFFFF" /></TouchableOpacity>
            <TouchableOpacity onPress={onBackToProfile}><Ionicons name="person" size={24} color="#FFFFFF" /></TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert("Күнтізбе", "Қабылдау күндерін басты беттен қараңыз.")}><Ionicons name="calendar-outline" size={24} color="#FFFFFF" /></TouchableOpacity>
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
  scrollContent: { paddingHorizontal: 20, paddingBottom: 105, gap: 16 },
  box: { backgroundColor: "#F8FAFC", borderRadius: 18, padding: 16, borderWidth: 1, borderColor: "#E2E8F0", gap: 10 },
  title: { fontSize: 16, fontWeight: "700", color: "#0F172A" },
  text: { fontSize: 13, color: "#334155", lineHeight: 20 },
  btn: { backgroundColor: "#2563EB", borderRadius: 28, paddingVertical: 14, alignItems: "center", marginHorizontal: 24 },
  btnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  bottomNavContainer: { position: "absolute", left: 22, right: 22, bottom: 18 },
  bottomNavBar: { backgroundColor: "#2563EB", borderRadius: 28, height: 56, flexDirection: "row", alignItems: "center", justifyContent: "space-around" },
});