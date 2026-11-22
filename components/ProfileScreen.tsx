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

export type ProfileSectionKey =
  | "editProfile"
  | "favorite"
  | "payment"
  | "privacy"
  | "settings"
  | "help";

interface ProfileScreenProps {
  userName?: string;
  avatarUri?: string;
  onChangeAvatar?: (newUri: string) => void;
  onChangeUserName?: (newName: string) => void;
  onSelectSection?: (section: ProfileSectionKey) => void;
  onOpenLogout?: () => void;
  onBackToHome: () => void;
  onOpenChat: () => void;
  onLogout?: () => void;
}

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80";

const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
];

export default function ProfileScreen({
  userName = "John Doe",
  avatarUri = DEFAULT_AVATAR,
  onChangeAvatar,
  onChangeUserName,
  onSelectSection,
  onOpenLogout,
  onBackToHome,
  onOpenChat,
  onLogout,
}: ProfileScreenProps) {
  const [localAvatar, setLocalAvatar] = useState<string>(avatarUri);
  const [localName, setLocalName] = useState<string>(userName);
  const [photoModalVisible, setPhotoModalVisible] = useState<boolean>(false);
  const [customUrlInput, setCustomUrlInput] = useState<string>("");
  const [editProfileModalVisible, setEditProfileModalVisible] =
    useState<boolean>(false);
  const [draftName, setDraftName] = useState<string>(userName);

  const currentAvatar = avatarUri || localAvatar || DEFAULT_AVATAR;
  const currentName = userName || localName || "John Doe";

  const applyNewAvatar = (uri: string) => {
    const cleanUri = uri.trim();
    if (!cleanUri) return;
    setLocalAvatar(cleanUri);
    if (onChangeAvatar) {
      onChangeAvatar(cleanUri);
    }
    setPhotoModalVisible(false);
    setCustomUrlInput("");
  };

  const handlePickFromGallery = async () => {
    try {
      const ImagePicker = await import("expo-image-picker");
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Рұқсат қажет",
          "Галереядан сурет таңдау үшін фотоларға рұқсат беріңіз."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        applyNewAvatar(result.assets[0].uri);
      }
    } catch {
      Alert.alert(
        "Галерея модулі",
        "Галереяны ашу үшін 'npx expo install expo-image-picker' орнатыңыз немесе төмендегі дайын/URL фотоны таңдаңыз."
      );
    }
  };

  const handleSaveName = () => {
    const trimmed = draftName.trim();
    if (!trimmed) return;
    setLocalName(trimmed);
    if (onChangeUserName) {
      onChangeUserName(trimmed);
    }
    setEditProfileModalVisible(false);
  };

  const handleLogoutPress = () => {
    if (onOpenLogout) {
      onOpenLogout();
      return;
    }

    Alert.alert("Logout", "Аккаунттан шыққыңыз келе ме?", [
      { text: "Болдырмау", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          if (onLogout) onLogout();
        },
      },
    ]);
  };

  const openSection = (section: ProfileSectionKey) => {
    if (onSelectSection) {
      onSelectSection(section);
    } else if (section === "editProfile") {
      setDraftName(currentName);
      setEditProfileModalVisible(true);
    }
  };

  const menuItems: {
    key: string;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    hasArrow: boolean;
    onPress: () => void;
  }[] = [
    {
      key: "profile",
      label: "Profile",
      icon: "person-outline",
      hasArrow: true,
      onPress: () => openSection("editProfile"),
    },
    {
      key: "favorite",
      label: "Favorite",
      icon: "heart-outline",
      hasArrow: true,
      onPress: () => openSection("favorite"),
    },
    {
      key: "payment",
      label: "Payment Method",
      icon: "wallet-outline",
      hasArrow: true,
      onPress: () => openSection("payment"),
    },
    {
      key: "privacy",
      label: "Privacy Policy",
      icon: "lock-closed-outline",
      hasArrow: true,
      onPress: () => openSection("privacy"),
    },
    {
      key: "settings",
      label: "Settings",
      icon: "settings-outline",
      hasArrow: true,
      onPress: () => openSection("settings"),
    },
    {
      key: "help",
      label: "Help",
      icon: "help",
      hasArrow: true,
      onPress: () => openSection("help"),
    },
    {
      key: "logout",
      label: "Logout",
      icon: "log-out-outline",
      hasArrow: false,
      onPress: handleLogoutPress,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={onBackToHome}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="chevron-back" size={24} color="#2563EB" />
            </TouchableOpacity>

            <Text style={styles.screenTitle}>My Profile</Text>

            <View style={styles.headerRightSpacer} />
          </View>

          <View style={styles.avatarSection}>
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => setPhotoModalVisible(true)}
              style={styles.avatarWrapper}
            >
              <Image
                source={{ uri: currentAvatar }}
                style={styles.avatarImage}
              />
              <TouchableOpacity
                style={styles.editBadgeBtn}
                onPress={() => setPhotoModalVisible(true)}
              >
                <Ionicons name="pencil" size={14} color="#FFFFFF" />
              </TouchableOpacity>
            </TouchableOpacity>

            <Text style={styles.profileName}>{currentName}</Text>
          </View>

          <View style={styles.menuList}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.key}
                activeOpacity={0.75}
                style={styles.menuRow}
                onPress={item.onPress}
              >
                <View style={styles.menuLeft}>
                  <View style={styles.menuIconCircle}>
                    <Ionicons name={item.icon} size={20} color="#2563EB" />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </View>

                {item.hasArrow && (
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color="#CBD5E1"
                  />
                )}
              </TouchableOpacity>
            ))}
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
              <View style={styles.modalTopRow}>
                <Text style={styles.modalTitle}>Профиль фотосын өзгерту</Text>
                <TouchableOpacity
                  onPress={() => setPhotoModalVisible(false)}
                  style={styles.modalCloseBtn}
                >
                  <Ionicons name="close" size={20} color="#0F172A" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.galleryButton}
                onPress={handlePickFromGallery}
              >
                <Ionicons name="images-outline" size={20} color="#FFFFFF" />
                <Text style={styles.galleryButtonText}>
                  Галереядан сурет таңдау
                </Text>
              </TouchableOpacity>

              <Text style={styles.modalSectionLabel}>Дайын фотолар:</Text>
              <View style={styles.presetsRow}>
                {PRESET_AVATARS.map((url, idx) => (
                  <TouchableOpacity
                    key={url}
                    onPress={() => applyNewAvatar(url)}
                    style={[
                      styles.presetItem,
                      currentAvatar === url && styles.presetItemActive,
                    ]}
                  >
                    <Image
                      source={{ uri: url }}
                      style={styles.presetImage}
                    />
                    <Text style={styles.presetLabel}>#{idx + 1}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.modalSectionLabel}>
                Немесе сурет сілтемесін (URL) қойыңыз:
              </Text>
              <View style={styles.urlRow}>
                <TextInput
                  value={customUrlInput}
                  onChangeText={setCustomUrlInput}
                  placeholder="https://..."
                  placeholderTextColor="#94A3B8"
                  style={styles.urlInput}
                />
                <TouchableOpacity
                  style={styles.applyUrlBtn}
                  onPress={() => applyNewAvatar(customUrlInput)}
                >
                  <Text style={styles.applyUrlText}>Сақтау</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          visible={editProfileModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setEditProfileModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <View style={styles.modalTopRow}>
                <Text style={styles.modalTitle}>Профиль мәліметтері</Text>
                <TouchableOpacity
                  onPress={() => setEditProfileModalVisible(false)}
                  style={styles.modalCloseBtn}
                >
                  <Ionicons name="close" size={20} color="#0F172A" />
                </TouchableOpacity>
              </View>

              <Text style={styles.modalSectionLabel}>Аты-жөніңіз:</Text>
              <TextInput
                value={draftName}
                onChangeText={setDraftName}
                placeholder="Аты-жөніңізді енгізіңіз"
                placeholderTextColor="#94A3B8"
                style={styles.nameInput}
              />

              <TouchableOpacity
                style={styles.galleryButton}
                onPress={handleSaveName}
              >
                <Text style={styles.galleryButtonText}>Өзгерісті сақтау</Text>
              </TouchableOpacity>
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
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="person" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "Күнтізбе",
                  "Қабылдау күндерін басты беттен көре аласыз."
                )
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
    paddingBottom: 12,
  },
  backButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2563EB",
  },
  headerRightSpacer: {
    width: 34,
  },
  avatarSection: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 22,
  },
  avatarWrapper: {
    position: "relative",
    width: 106,
    height: 106,
    borderRadius: 53,
  },
  avatarImage: {
    width: 106,
    height: 106,
    borderRadius: 53,
  },
  editBadgeBtn: {
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
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
  },
  menuList: {
    paddingHorizontal: 22,
    gap: 14,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  menuIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#DCE6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#0F172A",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  modalTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  modalCloseBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  galleryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563EB",
    borderRadius: 16,
    paddingVertical: 12,
    gap: 8,
    marginBottom: 14,
  },
  galleryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  modalSectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
  },
  presetsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  presetItem: {
    alignItems: "center",
    padding: 4,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "transparent",
  },
  presetItemActive: {
    borderColor: "#2563EB",
  },
  presetImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  presetLabel: {
    fontSize: 11,
    color: "#475569",
    marginTop: 4,
  },
  urlRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  urlInput: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 13,
    color: "#0F172A",
  },
  applyUrlBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 14,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  applyUrlText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  nameInput: {
    backgroundColor: "#F1F5F9",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: "#0F172A",
    marginBottom: 14,
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