import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import TopBar from './TopBar';
import { soft } from './SoftField';
import type { ScreenProps } from './types';

const options = [
  { label: 'Общие уведомления', on: true },
  { label: 'Звук', on: true },
  { label: 'Звук звонка', on: true },
  { label: 'Вибрация', on: false },
  { label: 'Специальные предложения', on: false },
  { label: 'Платежи', on: true },
  { label: 'Акции и скидки', on: true },
  { label: 'Кешбэк', on: true },
];

export default function Notifications({ back }: ScreenProps) {
  const [values, setValues] = useState<boolean[]>(options.map((o) => o.on));

  const toggle = (i: number) => setValues((v) => v.map((x, k) => (k === i ? !x : x)));

  return (
    <View style={s.root}>
      <TopBar title="Уведомления" onBack={back} />

      <ScrollView contentContainerStyle={s.list} showsVerticalScrollIndicator={false}>
        {options.map((o, i) => (
          <View key={o.label} style={s.row}>
            <Text style={s.label}>{o.label}</Text>
            <Switch
              value={values[i]}
              onValueChange={() => toggle(i)}
              trackColor={{ false: '#C9D6FB', true: soft.blue }}
              thumbColor="#fff"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  list: { paddingHorizontal: 22, paddingTop: 10, paddingBottom: 30 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 52 },
  label: { fontSize: 14, color: soft.text },
});
