import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface SavedCardData {
  holderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface AddCardScreenProps {
  defaultHolderName?: string;
  initialCard?: SavedCardData | null;
  onSaveCard: (card: SavedCardData) => void;
  onBackToPayment: () => void;
  onBackToHome: () => void;
  onOpenChat: () => void;
  onOpenProfile: () => void;
}

function formatCardNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 16);
  const parts: string[] = [];
  for (let i = 0; i < digits.length; i += 4) {
    parts.push(digits.slice(i, i + 4));
  }
  return parts.join(" ");
}

function formatExpiryDate(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function AddCardScreen({
  defaultHolderName = "John Doe",
  initialCard = null,
  onSaveCard,
  onBackToPayment,
  onBackToHome,
  onOpenChat,
  onOpenProfile,
}: AddCardScreenProps) {
  const [holderName, setHolderName] = useState<string>(
    initialCard?.holderName || ""
  );
  const [cardNumber, setCardNumber] = useState<string>(
    initialCard?.cardNumber || ""
  );
  const [expiryDate, setExpiryDate] = useState<string>(
    initialCard?.expiryDate || ""
  );
  const [cvv, setCvv] = useState<string>(initialCard?.cvv || "");

  const previewName = holderName.trim() || defaultHolderName || "John Doe";
  const previewNumber = cardNumber.trim() || "000 000 000 00";
  const previewExpiry = expiryDate.trim() || "04/28";

  const handleSave = () => {
    const cleanDigits = cardNumber.replace(/\D/g, "");
    if (!holderName.trim()) {
      Alert.alert("Мәлімет толтырылмаған", "Card Holder Name енгізіңіз.");
      return;
    }
    if (cleanDigits.length < 12) {
      Alert.alert("Карта нөмірі", "Card Number кемінде 12 саннан тұруы керек.");
      return;
    }
    if (expiryDate.replace(/\D/g, "").length < 4) {
      Alert.alert("Жарамдылық мерзімі", "Expiry Date форматын MM/YY етіп толтырыңыз.");
      return;
    }
    if (cvv.replace(/\D/g, "").length < 3) {
      Alert.alert("CVV коды", "CVV кодын енгізіңіз.");
      return;
    }

    onSaveCard({
      holderName: holderName.trim(),
      cardNumber: cardNumber.trim(),
      expiryDate: expiryDate.trim(),
      cvv: cvv.replace(/\D/g, ""),
    });

    Alert.alert("Save Card", "Банк картасы сәтті сақталды!", [
      { text: "OK", onPress: onBackToPayment },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Жоғарғы Header */}
          <View style={styles.topHeader}>
            <TouchableOpacity onPress={onBackToPayment} style={styles.headerBtn}>
              <Ionicons name="chevron-back" size={24} color="#2563EB" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add Card</Text>
            <View style={styles.headerBtn} />
          </View>

          {/* Көк банк картасы макеті */}
          <View style={styles.visualCard}>
            <View style={styles.cardAccentShape} />
            <View style={styles.cardTopSlot} />

            <Text style={styles.cardNumberPreview} numberOfLines={1}>
              {previewNumber}
            </Text>

            <View style={styles.cardBottomRow}>
              <View style={styles.cardMetaCol}>
                <Text style={styles.cardMetaLabel}>Card Holder Name</Text>
                <Text style={styles.cardMetaValue} numberOfLines={1}>
                  {previewName}
                </Text>
              </View>

              <View style={styles.cardExpiryCol}>
                <Text style={styles.cardMetaLabel}>Expiry Date</Text>
                <Text style={styles.cardMetaValue}>{previewExpiry}</Text>
              </View>

              <View style={styles.chipBox}>
                <View style={styles.chipInnerLine} />
              </View>
            </View>
          </View>

          {/* Өрістер */}
          <View style={styles.formSection}>
            <Text style={styles.label}>Card Holder Name</Text>
            <TextInput
              value={holderName}
              onChangeText={setHolderName}
              placeholder={defaultHolderName || "John Doe"}
              placeholderTextColor="#829EFF"
              style={styles.input}
            />

            <Text style={styles.label}>Card Number</Text>
            <TextInput
              value={cardNumber}
              onChangeText={(val) => setCardNumber(formatCardNumber(val))}
              placeholder="000 000 000 00"
              placeholderTextColor="#829EFF"
              keyboardType="number-pad"
              maxLength={19}
              style={styles.input}
            />

            <View style={styles.twoColRow}>
              <View style={styles.colItem}>
                <Text style={styles.label}>Expiry Date</Text>
                <TextInput
                  value={expiryDate}
                  onChangeText={(val) => setExpiryDate(formatExpiryDate(val))}
                  placeholder="04/28"
                  placeholderTextColor="#829EFF"
                  keyboardType="number-pad"
                  maxLength={5}
                  style={styles.input}
                />
              </View>

              <View style={styles.colItem}>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                  value={cvv}
                  onChangeText={(val) => setCvv(val.replace(/\D/g, "").slice(0, 4))}
                  placeholder="0000"
                  placeholderTextColor="#829EFF"
                  keyboardType="number-pad"
                  secureTextEntry
                  maxLength={4}
                  style={styles.input}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.saveCardBtn}
              activeOpacity={0.85}
              onPress={handleSave}
            >
              <Text style={styles.saveCardBtnText}>Save Card</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Төменгі көк навигация панелі */}
        <View style={styles.bottomNavContainer}>
          <View style={styles.bottomNavBar}>
            <TouchableOpacity onPress={onBackToHome}>
              <Ionicons name="home-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onOpenChat}>
              <Ionicons name="chatbubbles-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onOpenProfile}>
              <Ionicons name="person-outline" size={24} color="#FFFFFF" />
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
  scrollContent: {
    paddingBottom: 105,
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 14,
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
  visualCard: {
    marginHorizontal: 24,
    height: 176,
    borderRadius: 20,
    backgroundColor: "#2563EB",
    padding: 20,
    justifyContent: "space-between",
    overflow: "hidden",
    marginBottom: 18,
  },
  cardAccentShape: {
    position: "absolute",
    top: -40,
    left: -20,
    width: 240,
    height: 160,
    backgroundColor: "#4F83FF",
    borderBottomRightRadius: 110,
    opacity: 0.55,
  },
  cardTopSlot: {
    alignSelf: "flex-end",
    width: 58,
    height: 16,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.85)",
  },
  cardNumberPreview: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "600",
    letterSpacing: 1.5,
    marginTop: 18,
  },
  cardBottomRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 10,
  },
  cardMetaCol: {
    flex: 1.3,
  },
  cardExpiryCol: {
    flex: 0.9,
  },
  cardMetaLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 10,
    marginBottom: 2,
  },
  cardMetaValue: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  chipBox: {
    width: 38,
    height: 28,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.85)",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  chipInnerLine: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
  },
  formSection: {
    paddingHorizontal: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#E5ECFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: "#1E3A8A",
    fontWeight: "500",
  },
  twoColRow: {
    flexDirection: "row",
    gap: 12,
  },
  colItem: {
    flex: 1,
  },
  saveCardBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 28,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 26,
    marginHorizontal: 22,
  },
  saveCardBtnText: {
    color: "#FFFFFF",
    fontSize: 17,
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