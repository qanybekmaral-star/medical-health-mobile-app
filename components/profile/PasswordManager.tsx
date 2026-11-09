import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import SoftField, { soft } from './SoftField';
import TopBar from './TopBar';
import type { ScreenProps } from './types';

export default function PasswordManager({ back }: ScreenProps) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [repeat, setRepeat] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    if (!current) return setError('Введите текущий пароль');
    if (next.length < 8) return setError('Новый пароль должен содержать не менее 8 символов');
    if (next !== repeat) return setError('Пароли не совпадают');
    setError('');
    back();
  };

  return (
    <KeyboardAvoidingView style={s.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TopBar title="Управление паролем" onBack={back} />

      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={s.scroll}>
        <SoftField
          label="Текущий пароль"
          placeholder="••••••••••••"
          secure
          value={current}
          onChangeText={setCurrent}
          style={s.field}
        />
        <Text style={s.forgot}>Забыли пароль?</Text>

        <SoftField
          label="Новый пароль"
          placeholder="••••••••••••"
          secure
          value={next}
          onChangeText={setNext}
          style={s.field}
        />
        <SoftField
          label="Подтвердите новый пароль"
          placeholder="••••••••••••"
          secure
          value={repeat}
          onChangeText={setRepeat}
          style={s.field}
        />

        {error ? <Text style={s.error}>{error}</Text> : null}

        <Pressable style={({ pressed }) => [s.button, pressed && { opacity: 0.85 }]} onPress={submit}>
          <Text style={s.buttonText}>Изменить пароль</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  scroll: { paddingHorizontal: 22, paddingTop: 22 },
  field: { marginBottom: 18 },
  forgot: {
    alignSelf: 'flex-end',
    marginTop: -10,
    marginBottom: 18,
    fontSize: 11,
    fontWeight: '600',
    color: soft.blue,
  },
  error: { fontSize: 12, color: '#E5484D', textAlign: 'center', marginBottom: 12 },
  button: {
    alignSelf: 'center',
    marginTop: 10,
    height: 46,
    paddingHorizontal: 40,
    borderRadius: 23,
    backgroundColor: soft.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
