import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  lastMessage?: string;
}

interface ChatListScreenProps {
  doctors: Doctor[];
  onSelectChat: (doctor: Doctor) => void;
  onNavigateHome: () => void;
  onNavigateProfile: () => void;
}

export default function ChatListScreen({ doctors, onSelectChat, onNavigateHome, onNavigateProfile }: ChatListScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages / Chats</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {doctors.map((doc) => (
          <TouchableOpacity 
            key={doc.id} 
            style={styles.chatCard}
            onPress={() => onSelectChat(doc)}
          >
            <Image source={{ uri: doc.image }} style={styles.avatar} />
            <View style={styles.chatInfo}>
              <Text style={styles.docName}>{doc.name}</Text>
              <Text style={styles.docSpec}>{doc.specialty}</Text>
              <Text style={styles.lastMsg} numberOfLines={1}>Хабарлама жазу үшін басыңыз...</Text>
            </View>
            <Text style={styles.arrow}>{'>'}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Төменгі навигация панелі */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={onNavigateHome}>
          <View style={styles.homeRoof} /><View style={styles.homeBody} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={[styles.chatBubble, { backgroundColor: '#fff' }]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={onNavigateProfile}>
          <View style={styles.userHead} /><View style={styles.userBody} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.calendarTopBar} /><View style={styles.calendarBody} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  header: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#0055FF', textAlign: 'center' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  chatCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, padding: 12, marginBottom: 12, alignItems: 'center', borderWidth: 1, borderColor: '#E5EEFF' },
  avatar: { width: 55, height: 55, borderRadius: 27.5, marginRight: 12 },
  chatInfo: { flex: 1 },
  docName: { fontWeight: 'bold', fontSize: 15, color: '#000', marginBottom: 2 },
  docSpec: { fontSize: 12, color: '#0055FF', marginBottom: 4 },
  lastMsg: { fontSize: 12, color: '#888' },
  arrow: { fontSize: 16, color: '#C4C4C4', fontWeight: 'bold' },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#1852FF', paddingVertical: 16, borderTopLeftRadius: 24, borderTopRightRadius: 24, position: 'absolute', bottom: 0, left: 0, right: 0 },
  navItem: { alignItems: 'center', justifyContent: 'center', width: 40, height: 30 },
  homeRoof: { width: 0, height: 0, borderLeftWidth: 10, borderLeftColor: 'transparent', borderRightWidth: 10, borderRightColor: 'transparent', borderBottomWidth: 8, borderBottomColor: '#A0C0FF', marginBottom: 1 },
  homeBody: { width: 14, height: 10, backgroundColor: '#A0C0FF', borderBottomLeftRadius: 2, borderBottomRightRadius: 2 },
  chatBubble: { width: 18, height: 14, backgroundColor: '#A0C0FF', borderRadius: 4 },
  userHead: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#A0C0FF', marginBottom: 2 },
  userBody: { width: 16, height: 8, borderTopLeftRadius: 8, borderTopRightRadius: 8, backgroundColor: '#A0C0FF' },
  calendarTopBar: { width: 16, height: 3, backgroundColor: '#A0C0FF', borderTopLeftRadius: 2, borderTopRightRadius: 2 },
  calendarBody: { width: 16, height: 13, backgroundColor: '#A0C0FF', borderRadius: 2, marginTop: 1 },
});