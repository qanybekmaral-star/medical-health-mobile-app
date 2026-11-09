import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ConfirmDialog from './ConfirmDialog';
import TopBar from './TopBar';
import { soft } from './SoftField';
import type { IconName, Route, ScreenProps } from './types';

const rows: { icon: IconName; label: string; route?: Route; remove?: boolean }[] = [
  { icon: 'notifications-outline', label: 'Настройки уведомлений', route: 'notifications' },
  { icon: 'lock-closed-outline', label: 'Управление паролем', route: 'passwordManager' },
  { icon: 'trash-outline', label: 'Удалить аккаунт', remove: true },
];

export default function ProfileSettings({ go, back, reset }: ScreenProps) {
  const [confirm, setConfirm] = useState(false);

  return (
    <View style={s.root}>
      <TopBar title="Настройки" onBack={back} />

      <View style={s.list}>
        {rows.map((r) => (
          <Pressable
            key={r.label}
            style={s.row}
            onPress={() => {
              if (r.remove) setConfirm(true);
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

      <ConfirmDialog
        visible={confirm}
        title="Удалить аккаунт?"
        text="Все ваши данные будут удалены без возможности восстановления."
        confirmLabel="Удалить"
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          setConfirm(false);
          reset('profile');
        }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  list: { paddingHorizontal: 22, paddingTop: 18 },
  row: { flexDirection: 'row', alignItems: 'center', height: 54, gap: 12 },
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
