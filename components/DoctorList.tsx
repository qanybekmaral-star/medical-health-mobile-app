import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';

export default function DoctorList() {
  const handleSelectDoctor = (doctorName: string) => {
    Alert.alert('Таңдау', `${doctorName} дәрігердің қабылдауына жазылу сұралды.`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Білікті мамандар</Text>

      <View style={styles.card}>
        <View style={styles.infoBox}>
          <Text style={styles.docName}>Др. Арайлым Серікқызы</Text>
          <Text style={styles.docDept}>Кардиолог • 8 жыл тәжірибе</Text>
          <Text style={styles.status}>🟢 Онлайн</Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => handleSelectDoctor('Др. Арайлым Серікқызы')}>
          <Text style={styles.btnText}>Жазылу</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.infoBox}>
          <Text style={styles.docName}>Др. Ербол Маратұлы</Text>
          <Text style={styles.docDept}>Жалпы тәжірибелік дәрігер • 5 жыл тәжірибе</Text>
          <Text style={styles.status}>🟢 Онлайн</Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => handleSelectDoctor('Др. Ербол Маратұлы')}>
          <Text style={styles.btnText}>Жазылу</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.infoBox}>
          <Text style={styles.docName}>Др. Динара Қанатқызы</Text>
          <Text style={styles.docDept}>Невролог • 10 жыл тәжірибе</Text>
          <Text style={styles.status}>🔴 Қабылдауда</Text>
        </View>
        <TouchableOpacity style={[styles.btn, styles.disabledBtn]} onPress={() => handleSelectDoctor('Др. Динара Қанатқызы')}>
          <Text style={styles.btnText}>Бос емес</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  infoBox: {
    flex: 1,
    marginRight: 10,
  },
  docName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  docDept: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 6,
  },
  status: {
    fontSize: 12,
    fontWeight: '500',
    color: '#10B981',
  },
  btn: {
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  disabledBtn: {
    backgroundColor: '#94A3B8',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});
