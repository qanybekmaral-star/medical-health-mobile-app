import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';


export default function HealthView() {
  const [pulse, setPulse] = useState(75);
  const [pressure, setPressure] = useState('120/80');

  const checkAction = () => {
    Alert.alert('Сәтті', 'Жазылды!');
  };

  return (
    <ScrollView style={styles.box}>
      <Text style={styles.titleText}>Медициналық орталық</Text>

      <View style={styles.panel}>
        <Text style={styles.subTitle}>Денсаулық көрсеткіштері</Text>
        <View style={styles.row}>
          <Text style={styles.txt}>Пульс:</Text>
          <Text style={styles.val}>{pulse} рет</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.txt}>Қысым:</Text>
          <Text style={styles.val}>{pressure}</Text>
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.subTitle}>Қабылдауға жазылу</Text>
        <Text style={styles.info}>Дәрігер кеңесіне онлайн тіркелу</Text>
        <TouchableOpacity style={styles.btn} onPress={checkAction}>
          <Text style={styles.btnText}>Тіркелу</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  panel: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  txt: {
    color: '#666',
  },
  val: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  info: {
    color: '#666',
    fontSize: 13,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
});
