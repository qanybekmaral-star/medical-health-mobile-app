import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'doctor';
}

interface ChatScreenProps {
  doctor: Doctor;
  onBack: () => void;
}

export default function ChatScreen({ doctor, onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: `Сәлеметсіз бе! Мен ${doctor.name}. Сізге қалай көмектесе аламын?`, sender: 'doctor' }
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim() === '') return;

    const newMsg: Message = { id: Date.now().toString(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Дәрігердің автоматты жауабы (имитация)
    setTimeout(() => {
      const replyMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        text: 'Түсінікті, сіздің сұрағыңызды қарастырамын. Қосымша сұрақтарыңыз бар ма?', 
        sender: 'doctor' 
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Жоғарғы панель */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
        <Image source={{ uri: doctor.image }} style={styles.headerAvatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{doctor.name}</Text>
          <Text style={styles.headerSpec}>{doctor.specialty}</Text>
        </View>
      </View>

      {/* Хабарламалар аймағы */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.chatScroll}>
          {messages.map((msg) => (
            <View 
              key={msg.id} 
              style={[
                styles.messageBubble, 
                msg.sender === 'user' ? styles.userBubble : styles.doctorBubble
              ]}
            >
              <Text style={msg.sender === 'user' ? styles.userText : styles.doctorText}>
                {msg.text}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Хабарлама жазатын жолақ */}
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input}
            placeholder="Хабарлама жазу..."
            placeholderTextColor="#888"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>➔</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderBottomWidth: 1, borderBottomColor: '#E5EEFF' },
  backButton: { fontSize: 24, fontWeight: 'bold', color: '#0055FF', marginRight: 15 },
  headerAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  headerInfo: { flex: 1 },
  headerName: { fontSize: 15, fontWeight: 'bold', color: '#000' },
  headerSpec: { fontSize: 12, color: '#0055FF' },
  chatScroll: { padding: 20 },
  messageBubble: { maxWidth: '75%', padding: 12, borderRadius: 16, marginBottom: 12 },
  userBubble: { backgroundColor: '#1852FF', alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  doctorBubble: { backgroundColor: '#fff', alignSelf: 'flex-start', borderBottomLeftRadius: 4, borderWidth: 1, borderColor: '#E5EEFF' },
  userText: { color: '#fff', fontSize: 14 },
  doctorText: { color: '#333', fontSize: 14 },
  inputContainer: { flexDirection: 'row', padding: 12, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E5EEFF', alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#F0F4FF', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, color: '#333', marginRight: 10 },
  sendButton: { backgroundColor: '#1852FF', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  sendButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});