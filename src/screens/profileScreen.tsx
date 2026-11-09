import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';

const MENU_ITEMS = [
  { id: '1', title: 'Profile', icon: '👤' },
  { id: '2', title: 'Favourite', icon: '💙' },
  { id: '3', title: 'Payment Method', icon: '💳' },
  { id: '4', title: 'Privacy Policy', icon: '🔒' },
  { id: '5', title: 'Settings', icon: '⚙️' },
  { id: '6', title: 'Help', icon: '❓' },
];

export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* Navigation Header */}
      <View style={styles.header}>
        <TouchableOpacity><Text style={styles.backBtn}>‹</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Avatar Section */}
      <View style={styles.avatarSection}>
        <Image
          source={{ uri: 'https://via.placeholder.com/80' }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>John Doe</Text>
      </View>

      {/* Menu List */}
      <View style={styles.menuList}>
        {MENU_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuRow}
            onPress={() => item.title === 'Help' && setModalVisible(true)}>
            <View style={styles.menuLeft}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuTitle}>{item.title}</Text>
            </View>
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Logout</Text>
            <Text style={styles.modalSubTitle}>are you sure you want to log out?</Text>

            <View style={styles.modalBtnGroup}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, styles.logoutBtn]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.logoutBtnText}>Yes, Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#8CAEF8' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backBtn: { color: '#2A65F0', fontSize: 28, fontWeight: 'bold' },
  headerTitle: { color: '#2A65F0', fontSize: 18, fontWeight: 'bold' },
  avatarSection: { alignItems: 'center', marginVertical: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#CCC' },
  userName: { color: '#1A3B8B', fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  menuList: { paddingHorizontal: 30 },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  menuIcon: { fontSize: 18, marginRight: 15, color: '#2A65F0' },
  menuTitle: { fontSize: 15, color: '#2A65F0', fontWeight: '500' },
  arrowText: { color: '#2A65F0', fontSize: 18 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#2A65F0', marginBottom: 8 },
  modalSubTitle: { fontSize: 13, color: '#666', marginBottom: 20 },
  modalBtnGroup: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  modalBtn: { flex: 1, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  cancelBtn: { backgroundColor: '#E0E7FF', marginRight: 10 },
  logoutBtn: { backgroundColor: '#2A65F0', marginLeft: 10 },
  cancelBtnText: { color: '#2A65F0', fontWeight: '600' },
  logoutBtnText: { color: '#FFF', fontWeight: '600' },
});