import React, { useMemo, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Doctor } from "./DashboardScreen";

export interface ChatMessage {
  id: string;
  sender: "user" | "doctor";
  text: string;
  time: string;
}

interface ChatScreenProps {
  doctors: Doctor[];
  userName?: string;
  initialDoctorId?: string | null;
  onBackToHome: () => void;
}

function getCurrentTimeLabel(): string {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export default function ChatScreen({
  doctors,
  userName = "John Doe",
  initialDoctorId = null,
  onBackToHome,
}: ChatScreenProps) {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(
    initialDoctorId
  );
  const [draftText, setDraftText] = useState<string>("");

  const [messagesByDoctor, setMessagesByDoctor] = useState<
    Record<string, ChatMessage[]>
  >(() => {
    const initialMap: Record<string, ChatMessage[]> = {};
    doctors.forEach((doc, index) => {
      initialMap[doc.id] = [
        {
          id: `welcome-${doc.id}`,
          sender: "doctor",
          text: `Сәлеметсіз бе, ${userName}! Мен ${doc.name} (${doc.specialty}). Қандай сұрағыңыз немесе мазалап жүрген белгілер бар?`,
          time: index === 0 ? "09:45" : "10:15",
        },
      ];
    });
    return initialMap;
  });

  const activeDoctor = useMemo(
    () => doctors.find((d) => d.id === selectedDoctorId) || null,
    [doctors, selectedDoctorId]
  );

  const currentMessages = useMemo(() => {
    if (!selectedDoctorId) return [];
    const existing = messagesByDoctor[selectedDoctorId];
    if (existing && existing.length > 0) return existing;

    const doc = doctors.find((d) => d.id === selectedDoctorId);
    return doc
      ? [
          {
            id: `init-${doc.id}`,
            sender: "doctor" as const,
            text: `Сәлеметсіз бе, ${userName}! Мен ${doc.name}. Тыңдап тұрмын.`,
            time: getCurrentTimeLabel(),
          },
        ]
      : [];
  }, [selectedDoctorId, messagesByDoctor, doctors, userName]);

  const handleSendMessage = () => {
    const trimmed = draftText.trim();
    if (!trimmed || !selectedDoctorId) return;

    const nowLabel = getCurrentTimeLabel();
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: trimmed,
      time: nowLabel,
    };

    const doc = doctors.find((d) => d.id === selectedDoctorId);
    const replyMsg: ChatMessage = {
      id: `d-${Date.now() + 1}`,
      sender: "doctor",
      text: `Хабарламаңызды алдым (${doc?.specialty || "кеңес"}). Толығырақ сипаттап берсеңіз, қабылдауға дайындала аламыз.`,
      time: nowLabel,
    };

    setMessagesByDoctor((prev) => ({
      ...prev,
      [selectedDoctorId]: [...(prev[selectedDoctorId] || []), userMsg, replyMsg],
    }));
    setDraftText("");
  };

  if (!activeDoctor) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.listHeader}>
            <TouchableOpacity style={styles.iconCircleBtn} onPress={onBackToHome}>
              <Ionicons name="arrow-back" size={20} color="#0F172A" />
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>Хабарламалар</Text>
              <Text style={styles.headerSubtitle}>
                Дәрігерді таңдап, жеке чат бастаңыз
              </Text>
            </View>
            <View style={styles.placeholderBtn} />
          </View>

          <ScrollView
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          >
            {doctors.map((doc) => {
              const thread = messagesByDoctor[doc.id] || [];
              const lastMsg = thread[thread.length - 1];
              return (
                <TouchableOpacity
                  key={doc.id}
                  activeOpacity={0.85}
                  style={styles.threadCard}
                  onPress={() => setSelectedDoctorId(doc.id)}
                >
                  <Image source={{ uri: doc.avatar }} style={styles.threadAvatar} />
                  <View style={styles.threadInfo}>
                    <View style={styles.threadTopRow}>
                      <Text style={styles.threadName} numberOfLines={1}>
                        {doc.name}
                      </Text>
                      <Text style={styles.threadTime}>{lastMsg?.time || "10:00"}</Text>
                    </View>
                    <Text style={styles.threadSpecialty} numberOfLines={1}>
                      {doc.specialty}
                    </Text>
                    <Text style={styles.threadPreview} numberOfLines={1}>
                      {lastMsg?.text || "Чатты ашу үшін басыңыз..."}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#2563EB" />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.chatHeader}>
          <TouchableOpacity
            style={styles.iconCircleBtn}
            onPress={() => setSelectedDoctorId(null)}
          >
            <Ionicons name="arrow-back" size={20} color="#0F172A" />
          </TouchableOpacity>

          <Image source={{ uri: activeDoctor.avatar }} style={styles.chatHeaderAvatar} />

          <View style={styles.chatHeaderTextWrap}>
            <Text style={styles.chatHeaderName} numberOfLines={1}>
              {activeDoctor.name}
            </Text>
            <Text style={styles.chatHeaderStatus} numberOfLines={1}>
              Online • {activeDoctor.specialty}
            </Text>
          </View>

          <TouchableOpacity style={styles.iconCircleBtn} onPress={onBackToHome}>
            <Ionicons name="home-outline" size={18} color="#0F172A" />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.messagesScroll}
          showsVerticalScrollIndicator={false}
        >
          {currentMessages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <View
                key={msg.id}
                style={[
                  styles.bubble,
                  isUser ? styles.userBubble : styles.doctorBubble,
                ]}
              >
                <Text
                  style={[
                    styles.bubbleText,
                    isUser ? styles.userBubbleText : styles.doctorBubbleText,
                  ]}
                >
                  {msg.text}
                </Text>
                <Text
                  style={[
                    styles.bubbleTime,
                    isUser ? styles.userBubbleTime : styles.doctorBubbleTime,
                  ]}
                >
                  {msg.time}
                </Text>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.inputBar}>
          <TextInput
            value={draftText}
            onChangeText={setDraftText}
            placeholder="Хабарлама жазыңыз..."
            placeholderTextColor="#94A3B8"
            style={styles.messageInput}
            multiline
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSendMessage}>
            <Ionicons name="send" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    backgroundColor: "#F8FAFC",
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  iconCircleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderBtn: {
    width: 36,
  },
  headerCenter: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  headerSubtitle: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 1,
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  threadCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  threadAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  threadInfo: {
    flex: 1,
  },
  threadTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  threadName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    flex: 1,
  },
  threadTime: {
    fontSize: 11,
    color: "#2563EB",
    fontWeight: "600",
  },
  threadSpecialty: {
    fontSize: 12,
    color: "#2563EB",
    marginTop: 1,
  },
  threadPreview: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 3,
  },
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    gap: 10,
  },
  chatHeaderAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  chatHeaderTextWrap: {
    flex: 1,
  },
  chatHeaderName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  chatHeaderStatus: {
    fontSize: 11,
    color: "#16A34A",
    fontWeight: "500",
  },
  messagesScroll: {
    padding: 16,
    gap: 10,
    paddingBottom: 24,
  },
  bubble: {
    maxWidth: "80%",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#2563EB",
  },
  doctorBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#E0E7FF",
  },
  bubbleText: {
    fontSize: 13,
    lineHeight: 18,
  },
  userBubbleText: {
    color: "#FFFFFF",
  },
  doctorBubbleText: {
    color: "#0F172A",
  },
  bubbleTime: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: "flex-end",
  },
  userBubbleTime: {
    color: "#DBEAFE",
  },
  doctorBubbleTime: {
    color: "#475569",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    gap: 8,
  },
  messageInput: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
    fontSize: 13,
    color: "#0F172A",
    maxHeight: 100,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
});