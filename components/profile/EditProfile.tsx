import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import SoftField, { soft } from './SoftField';
import TopBar from './TopBar';
import type { ScreenProps } from './types';

export default function EditProfile({ back }: ScreenProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView style={s.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TopBar title="Профиль" onBack={back} />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[s.scroll, { paddingBottom: bottom + 24 }]}
      >
        <View style={s.avatarWrap}>
          <View style={s.avatar}>
            <Text style={s.initials}>ДД</Text>
            <View style={s.badge}>
              <Ionicons name="pencil" size={11} color="#fff" />
            </View>
          </View>
        </View>

        <SoftField label="Полное имя" defaultValue="Джон Доу" style={s.field} />
        <SoftField
          label="Номер телефона"
          defaultValue="+123 567 89000"
          keyboardType="phone-pad"
          style={s.field}
        />
        <SoftField
          label="Электронная почта"
          defaultValue="johndoe@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          style={s.field}
        />
        <SoftField
          label="Дата рождения"
          placeholder="ДД / ММ / ГГГГ"
          keyboardType="number-pad"
          style={s.field}
        />

        <Pressable style={({ pressed }) => [s.button, pressed && { opacity: 0.85 }]} onPress={back}>
          <Text style={s.buttonText}>Обновить профиль</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  scroll: { paddingHorizontal: 22, paddingTop: 20 },
  avatarWrap: { alignItems: 'center', marginBottom: 24 },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: soft.band,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: { fontSize: 26, fontWeight: '700', color: soft.blue },
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
  field: { marginBottom: 18 },
  button: {
    alignSelf: 'center',
    marginTop: 14,
    height: 46,
    paddingHorizontal: 40,
    borderRadius: 23,
    backgroundColor: soft.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
