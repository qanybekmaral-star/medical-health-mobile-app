import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const CONTACT_OPTIONS = [
  { id: '1', title: 'Customer Service', icon: '🎧' },
  { id: '2', title: 'Website', icon: '🌐' },
  { id: '3', title: 'Whatsapp', icon: '💬' },
  { id: '4', title: 'Facebook', icon: '📘' },
  { id: '5', title: 'Instagram', icon: '📷' },
];

export default function HelpCenterScreen() {
  const [tab, setTab] = useState<'FAQ' | 'Contact'>('Contact');
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity><Text style={styles.backBtn}>‹</Text></TouchableOpacity>
          <Text style={styles.headerTitle}>Help Center</Text>
          <View style={{ width: 24 }} />
        </View>

        <Text style={styles.subTitle}>How Can We Help You?</Text>

        {/* Search Bar */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabBtn, tab === 'FAQ' && styles.activeTabBtn]}
            onPress={() => setTab('FAQ')}>
            <Text style={[styles.tabText, tab === 'FAQ' && styles.activeTabText]}>FAQ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, tab === 'Contact' && styles.activeTabBtn]}
            onPress={() => setTab('Contact')}>
            <Text style={[styles.tabText, tab === 'Contact' && styles.activeTabText]}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content List */}
      <ScrollView style={styles.content}>
        {CONTACT_OPTIONS.map((item) => (
          <TouchableOpacity key={item.id} style={styles.optionRow}>
            <View style={styles.optionLeft}>
              <View style={styles.iconWrapper}>
                <Text style={styles.iconText}>{item.icon}</Text>
              </View>
              <Text style={styles.optionTitle}>{item.title}</Text>
            </View>
            <Text style={styles.arrowText}>∨</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    backgroundColor: '#2A65F0',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backBtn: { color: '#FFF', fontSize: 28, fontWeight: 'bold' },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '600' },
  subTitle: { color: '#FFF', textAlign: 'center', marginTop: 12, marginBottom: 12, fontSize: 13, opacity: 0.9 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    marginBottom: 16,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF40',
    borderRadius: 25,
    padding: 3,
  },
  tabBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 20 },
  activeTabBtn: { backgroundColor: '#2A65F0' },
  tabText: { color: '#FFF', fontSize: 14, fontWeight: '500' },
  activeTabText: { fontWeight: 'bold' },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 15 },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionLeft: { flexDirection: 'row', alignItems: 'center' },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E8F0FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: { fontSize: 16 },
  optionTitle: { fontSize: 15, fontWeight: '500', color: '#333' },
  arrowText: { color: '#999', fontSize: 14 },
});