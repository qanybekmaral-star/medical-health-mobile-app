import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SavedCardData } from "./AddCardScreen";

interface PaymentMethodScreenProps {
  savedCard?: SavedCardData | null;
  onOpenAddCard: () => void;
  onBackToProfile: () => void;
  onBackToHome: () => void;
  onOpenChat: () => void;
}

export default function PaymentMethodScreen({
  savedCard = null,
  onOpenAddCard,
  onBackToProfile,
  onBackToHome,
  onOpenChat,
}: PaymentMethodScreenProps) {
  const [selected, setSelected] = useState<"card" | "qr" | "wallet">("card");

  const cardSubtitle = savedCard?.cardNumber
    ? `${savedCard.holderName} • ${savedCard.cardNumber}`
    : "Bank Card қосу үшін басыңыз";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={onBackToProfile} style={styles.headerBtn}>
            <Ionicons name="chevron-back" size={24} color="#2563EB" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Method</Text>
          <View style={styles.headerBtn} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={[styles.card, selected === "card" && styles.activeCard]}
            onPress={() => {
              setSelected("card");
              onOpenAddCard();
            }}
          >
            <View style={styles.iconCircle}>
              <Ionicons name="card-outline" size={20} color="#2563EB" />
            </View>
            <View style={styles.info}>
              <Text style={styles.title}>Bank Card</Text>
              <Text style={styles.sub}>{cardSubtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#2563EB" />
          </TouchableOpacity>

          {[
            {
              id: "qr" as const,
              title: "QR Payment",
              sub: "Жылдам мобильді аударым",
              icon: "qr-code-outline" as const,
            },
            {
              id: "wallet" as const,
              title: "Digital Wallet",
              sub: "Apple Pay / Google Pay",
              icon: "wallet-outline" as const,
            },
          ].map((item) => {
            const active = selected === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, active && styles.activeCard]}
                onPress={() => setSelected(item.id)}
              >
                <View style={styles.iconCircle}>
                  <Ionicons name={item.icon} size={20} color="#2563EB" />
                </View>
                <View style={styles.info}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.sub}>{item.sub}</Text>
                </View>
                <Ionicons
                  name={active ? "checkmark-circle" : "ellipse-outline"}
                  size={22}
                  color="#2563EB"
                />
              </TouchableOpacity>
            );
          })}
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
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 12,
  },
  headerBtn: { width: 34, height: 34, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#2563EB" },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 105, gap: 12 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 12,
  },
  activeCard: { borderColor: "#2563EB", backgroundColor: "#EFF6FF" },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#DCE6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  info: { flex: 1 },
  title: { fontSize: 15, fontWeight: "700", color: "#0F172A" },
  sub: { fontSize: 12, color: "#475569", marginTop: 2 },
  bottomNavContainer: { position: "absolute", left: 22, right: 22, bottom: 18 },
  bottomNavBar: {
    backgroundColor: "#2563EB",
    borderRadius: 28,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});