import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { soft } from './SoftField';
import type { IconName, ScreenProps } from './types';

type Topic = 'popular' | 'general' | 'services';

const topics: { key: Topic; label: string }[] = [
  { key: 'popular', label: 'Популярное' },
  { key: 'general', label: 'Общие' },
  { key: 'services', label: 'Услуги' },
];

const faq: { q: string; a: string; topics: Topic[] }[] = [
  {
    q: 'Как записаться на приём к врачу?',
    a: 'Откройте главный экран, выберите врача и удобное время в календаре, затем подтвердите запись.',
    topics: ['popular', 'services'],
  },
  {
    q: 'Как отменить или перенести запись?',
    a: 'Откройте нужную запись в расписании и выберите «Отменить» или «Перенести». Сделать это можно не позднее чем за сутки до приёма.',
    topics: ['popular', 'services'],
  },
  {
    q: 'Как изменить данные профиля?',
    a: 'Перейдите в раздел «Профиль», измените нужные поля и нажмите «Обновить профиль».',
    topics: ['popular', 'general'],
  },
  {
    q: 'Что делать, если я забыл пароль?',
    a: 'На экране входа нажмите «Забыли пароль?» и следуйте инструкции. Ссылка для сброса придёт на вашу почту.',
    topics: ['popular', 'general'],
  },
  {
    q: 'Как добавить врача в избранное?',
    a: 'Нажмите на сердечко в карточке врача. Все избранные специалисты появятся в разделе «Избранное».',
    topics: ['general'],
  },
  {
    q: 'Какие способы оплаты доступны?',
    a: 'Оплатить приём можно банковской картой или через привязанный электронный кошелёк в разделе «Способ оплаты».',
    topics: ['services'],
  },
  {
    q: 'Как удалить аккаунт?',
    a: 'Откройте «Настройки» и выберите «Удалить аккаунт». Данные будут удалены без возможности восстановления.',
    topics: ['general'],
  },
];

const contacts: { icon: IconName; label: string; value: string }[] = [
  { icon: 'headset-outline', label: 'Служба поддержки', value: '+7 700 000 00 00' },
  { icon: 'mail-outline', label: 'Электронная почта', value: 'support@example.com' },
  { icon: 'logo-whatsapp', label: 'WhatsApp', value: '+7 700 000 00 01' },
  { icon: 'globe-outline', label: 'Сайт', value: 'www.example.com' },
];

export default function Help({ back }: ScreenProps) {
  const { top, bottom } = useSafeAreaInsets();
  const [tab, setTab] = useState<'faq' | 'contact'>('faq');
  const [topic, setTopic] = useState<Topic>('popular');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<number | null>(null);

  const items = faq.filter(
    (f) => f.topics.includes(topic) && f.q.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <View style={s.root}>
      <View style={[s.header, { paddingTop: top + 10 }]}>
        <View style={s.bar}>
          <Pressable onPress={back} hitSlop={12} style={s.side}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </Pressable>
          <Text style={s.title}>Центр помощи</Text>
          <View style={s.side} />
        </View>
        <Text style={s.ask}>Чем мы можем вам помочь?</Text>
        <View style={s.search}>
          <Ionicons name="search" size={16} color={soft.blue} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Поиск"
            placeholderTextColor={soft.hint}
            style={s.input}
          />
        </View>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[s.scroll, { paddingBottom: bottom + 24 }]}
      >
        <View style={s.tabs}>
          <Pressable style={[s.tab, tab === 'faq' && s.tabOn]} onPress={() => setTab('faq')}>
            <Text style={[s.tabText, tab === 'faq' && s.tabTextOn]}>Вопросы</Text>
          </Pressable>
          <Pressable style={[s.tab, tab === 'contact' && s.tabOn]} onPress={() => setTab('contact')}>
            <Text style={[s.tabText, tab === 'contact' && s.tabTextOn]}>Связаться с нами</Text>
          </Pressable>
        </View>

        {tab === 'faq' ? (
          <>
            <View style={s.chips}>
              {topics.map((t) => (
                <Pressable
                  key={t.key}
                  style={[s.chip, topic === t.key && s.chipOn]}
                  onPress={() => {
                    setTopic(t.key);
                    setOpen(null);
                  }}
                >
                  <Text style={[s.chipText, topic === t.key && s.chipTextOn]}>{t.label}</Text>
                </Pressable>
              ))}
            </View>

            {items.length === 0 ? <Text style={s.empty}>Ничего не найдено</Text> : null}

            {items.map((f, i) => (
              <Pressable key={f.q} style={s.item} onPress={() => setOpen(open === i ? null : i)}>
                <View style={s.itemHead}>
                  <Text style={s.question}>{f.q}</Text>
                  <Ionicons name={open === i ? 'chevron-up' : 'chevron-down'} size={16} color={soft.blue} />
                </View>
                {open === i ? <Text style={s.answer}>{f.a}</Text> : null}
              </Pressable>
            ))}
          </>
        ) : (
          contacts.map((c) => (
            <View key={c.label} style={s.contact}>
              <View style={s.contactIcon}>
                <Ionicons name={c.icon} size={18} color={soft.blue} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.question}>{c.label}</Text>
                <Text style={s.contactValue}>{c.value}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: soft.blue, paddingHorizontal: 20, paddingBottom: 22 },
  bar: { flexDirection: 'row', alignItems: 'center' },
  side: { width: 32 },
  title: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '700', color: '#fff' },
  ask: { textAlign: 'center', fontSize: 13, color: '#fff', marginTop: 14, marginBottom: 14 },
  search: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    borderRadius: 21,
    backgroundColor: '#fff',
  },
  input: { flex: 1, fontSize: 13, color: soft.text, padding: 0 },
  scroll: { paddingHorizontal: 20, paddingTop: 18 },
  tabs: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  tab: {
    flex: 1,
    height: 38,
    borderRadius: 19,
    backgroundColor: soft.band,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabOn: { backgroundColor: soft.blue },
  tabText: { fontSize: 13, fontWeight: '600', color: soft.blue },
  tabTextOn: { color: '#fff' },
  chips: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  chip: { paddingHorizontal: 14, height: 28, borderRadius: 14, backgroundColor: soft.field, justifyContent: 'center' },
  chipOn: { backgroundColor: soft.blue },
  chipText: { fontSize: 11, fontWeight: '600', color: soft.blue },
  chipTextOn: { color: '#fff' },
  empty: { textAlign: 'center', fontSize: 13, color: '#8A93A8', marginTop: 20 },
  item: { backgroundColor: soft.field, borderRadius: 12, paddingVertical: 14, paddingHorizontal: 14, marginBottom: 10 },
  itemHead: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  question: { flex: 1, fontSize: 13, fontWeight: '600', color: soft.blue },
  answer: { fontSize: 12, lineHeight: 18, color: soft.text, marginTop: 10 },
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: soft.field,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  contactIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactValue: { fontSize: 12, color: soft.text, marginTop: 2 },
});
