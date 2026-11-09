import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from './BottomNav';
import ConfirmDialog from './ConfirmDialog';
import TopBar from './TopBar';
import { soft } from './SoftField';
import type { IconName, Route, ScreenProps } from './types';

const rows: { icon: IconName; label: string; route?: Route; logout?: boolean }[] = [
  { icon: 'person-outline', label: 'Профиль', route: 'editProfile' },
  { icon: 'heart-outline', label: 'Избранное' },
  { icon: 'card-outline', label: 'Способ оплаты' },
  { icon: 'shield-checkmark-outline', label: 'Политика конфиденциальности', route: 'privacy' },
  { icon: 'settings-outline', label: 'Настройки', route: 'profileSettings' },
  { icon: 'help-circle-outline', label: 'Помощь', route: 'help' },
  { icon: 'log-out-outline', label: 'Выйти', logout: true },
];

export default function ProfileMain({ go, back, onLogout }: ScreenProps) {
  const [confirm, setConfirm] = useState(false);

  return (
    <View style={s.root}>
      <TopBar title="Мой профиль" onBack={back} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        <View style={s.profile}>
          <View style={s.avatar}>
            <Text style={s.initials}>ДД</Text>
            <View style={s.badge}>
              <Ionicons name="pencil" size={11} color="#fff" />
            </View>
          </View>
          <Text style={s.name}>Джон Доу</Text>
        </View>

        <View style={s.list}>
          {rows.map((r) => (
            <Pressable
              key={r.label}
              style={s.row}
              onPress={() => {
                if (r.logout) setConfirm(true);
                else if (r.route) go(r.route);
              }}
            >
              <View style={s.icon}>
                <Ionicons name={r.icon} size={16} color={soft.blue} />
              </View>
              <Text style={s.label}>{r.label}</Text>
              <Ionicons name="chevron-forward" size={16} color={soft.blue} />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <BottomNav />

      <ConfirmDialog
        visible={confirm}
        title="Выйти из аккаунта?"
        text="Чтобы снова пользоваться приложением, нужно будет войти в аккаунт."
        confirmLabel="Выйти"
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          setConfirm(false);
          onLogout?.();
        }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  scroll: { paddingBottom: 110 },
  profile: { alignItems: 'center', paddingTop: 22, paddingBottom: 22 },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: soft.band,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: { fontSize: 28, fontWeight: '700', color: soft.blue },
  badge: {
    position: 'absolute',
    right: 0,
    bottom: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: soft.blue,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontSize: 17, fontWeight: '700', color: soft.text, marginTop: 12 },
  list: { paddingHorizontal: 22 },
  row: { flexDirection: 'row', alignItems: 'center', height: 52, gap: 12 },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: soft.field,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { flex: 1, fontSize: 14, color: soft.text },
});
