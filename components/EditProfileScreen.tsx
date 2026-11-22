import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface EditProfileScreenProps {
  userName: string;
  userEmail?: string;
  userPhone?: string;
  userDob?: string;
  avatarUri: string;
  onUpdateProfileData: (data: {
    name: string;
    email: string;
    phone: string;
    dob: string;
  }) => void;
  onChangeAvatar: (newUri: string) => void;
  onBackToProfile: () => void;
  onBackToHome: () => void;
  onOpenChat: () => void;
}

const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
];

export default function EditProfileScreen({
  userName,
  userEmail = "johndoe@example.com",
  userPhone = "+123 567 89000",
  userDob = "",
  avatarUri,
  onUpdateProfileData,
  onChangeAvatar,
  onBackToProfile,
  onBackToHome,
  onOpenChat,
}: EditProfileScreenProps) {
  const [fullName, setFullName] = useState(userName);
  const [phoneNumber, setPhoneNumber] = useState(userPhone);
  const [email, setEmail] = useState(userEmail);
  const [dob, setDob] = useState(userDob);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [customUrl, setCustomUrl] = useState("");

  const applyAvatar = (uri: string) => {
    const clean = uri.trim();
    if (!clean) return;
    onChangeAvatar(clean);
    setPhotoModalVisible(false);
    setCustomUrl("");
  };

  const handlePickGallery = async () => {
    try {
      const ImagePicker = await import("expo-image-picker");
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        Alert.alert("Рұқсат қажет", "Галереядан сурет таңдау үшін рұқсат беріңіз.");
        return;
      }
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!res.canceled && res.assets?.[0]?.uri) {
        applyAvatar(res.assets[0].uri);
      }
    } catch {
      Alert.alert(
        "Галерея модулі",
        "Галереяны ашу үшін 'npx expo install expo-image-picker' орнатыңыз немесе төмендегі фотоларды қолданыңыз."
      );
    }
  };

  const handleSave = () => {
    onUpdateProfileData({
      name: fullName.trim() || userName,
      email: email.trim() || userEmail,
      phone: phoneNumber.trim() || userPhone,
      dob: dob.trim(),
    });
    Alert.alert("Profile", "Профиль мәліметтері жаңартылды!", [
      { text: "OK", onPress: onBackToProfile },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.topHeader}>
            <TouchableOpacity onPress={onBackToProfile} style={styles.headerBtn}>
              <Ionicons name="chevron-back" size={24} color="#2563EB" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity
              onPress={() => Alert.alert("Settings", "Профиль баптаулары")}
              style={styles.headerGearBtn}
            >
              <Ionicons name="settings" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.avatarCenter}>
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => setPhotoModalVisible(true)}
              style={styles.avatarBox}
            >
              <Image source={{ uri: avatarUri }} style={styles.avatarImg} />
              <TouchableOpacity
                style={styles.pencilCircle}
                onPress={() => setPhotoModalVisible(true)}
              >
                <Ionicons name="pencil" size={14} color="#FFFFFF" />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          <View style={styles.formBody}>
            <Text style={styles.fieldLabel}>Full Name</Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="John Doe"
              placeholderTextColor="#829EFF"
              style={styles.fieldInput}
            />

            <Text style={styles.fieldLabel}>Phone Number</Text>
            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="+123 567 89000"
              placeholderTextColor="#829EFF"
              keyboardType="phone-pad"
              style={styles.fieldInput}
            />

            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="johndoe@example.com"
              placeholderTextColor="#829EFF"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.fieldInput}
            />

            <Text style={styles.fieldLabel}>Date Of Birth</Text>
            <TextInput
              value={dob}
              onChangeText={setDob}
              placeholder="DD / MM /YYY"
              placeholderTextColor="#5B82FF"
              style={styles.fieldInput}
            />

            <TouchableOpacity style={styles.primaryBtn} onPress={handleSave}>
              <Text style={styles.primaryBtnText}>Update Profile</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Modal
          visible={photoModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setPhotoModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Фотоны өзгерту</Text>
                <TouchableOpacity onPress={() => setPhotoModalVisible(false)}>
                  <Ionicons name="close" size={22} color="#0F172A" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.galleryBtn} onPress={handlePickGallery}>
                <Ionicons name="images-outline" size={18} color="#FFFFFF" />
                <Text style={styles.galleryBtnText}>Галереядан таңдау</Text>
              </TouchableOpacity>

              <View style={styles.presetsRow}>
                {PRESET_AVATARS.map((url, idx) => (
                  <TouchableOpacity key={url} onPress={() => applyAvatar(url)}>
                    <Image source={{ uri: url }} style={styles.presetImg} />
                    <Text style={styles.presetText}>#{idx + 1}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.urlRow}>
                <TextInput
                  value={customUrl}
                  onChangeText={setCustomUrl}
                  placeholder="https://..."
                  placeholderTextColor="#94A3B8"
                  style={styles.urlInput}
                />
                <TouchableOpacity
                  style={styles.urlSaveBtn}
                  onPress={() => applyAvatar(customUrl)}
                >
                  <Text style={styles.urlSaveText}>Сақтау</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

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
              onPress={() => Alert.alert("Күнтізбе", "Қабылдау күндерін басты беттен қараңыз.")}
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
  scrollContent: { paddingBottom: 105 },
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
  headerGearBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarCenter: { alignItems: "center", marginTop: 6, marginBottom: 18 },
  avatarBox: { position: "relative", width: 108, height: 108, borderRadius: 54 },
  avatarImg: { width: 108, height: 108, borderRadius: 54 },
  pencilCircle: {
    position: "absolute",
    right: 2,
    bottom: 2,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#2563EB",
    borderWidth: 2.5,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  formBody: { paddingHorizontal: 26 },
  fieldLabel: { fontSize: 15, fontWeight: "700", color: "#0F172A", marginBottom: 6, marginTop: 10 },
  fieldInput: {
    backgroundColor: "#E5ECFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: "#1E3A8A",
    fontWeight: "500",
  },
  primaryBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 28,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 26,
    marginHorizontal: 24,
  },
  primaryBtnText: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(15, 23, 42, 0.45)", justifyContent: "flex-end" },
  modalCard: { backgroundColor: "#FFFFFF", borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  modalTitle: { fontSize: 16, fontWeight: "700", color: "#0F172A" },
  galleryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563EB",
    borderRadius: 14,
    paddingVertical: 12,
    gap: 8,
    marginBottom: 14,
  },
  galleryBtnText: { color: "#FFFFFF", fontWeight: "700", fontSize: 13 },
  presetsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 14 },
  presetImg: { width: 54, height: 54, borderRadius: 27 },
  presetText: { textAlign: "center", fontSize: 11, color: "#475569", marginTop: 4 },
  urlRow: { flexDirection: "row", gap: 8 },
  urlInput: { flex: 1, backgroundColor: "#F1F5F9", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 9, fontSize: 13, color: "#0F172A" },
  urlSaveBtn: { backgroundColor: "#2563EB", borderRadius: 12, paddingHorizontal: 14, justifyContent: "center" },
  urlSaveText: { color: "#FFFFFF", fontWeight: "700", fontSize: 13 },
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