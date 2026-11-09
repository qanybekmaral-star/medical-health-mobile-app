import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopBar from './TopBar';
import { soft } from './SoftField';
import type { ScreenProps } from './types';

const intro = [
  'Мы ценим ваше доверие и бережно относимся к персональным данным. В этом документе объясняется, какие сведения мы собираем, как их используем и каким образом защищаем.',
  'Используя приложение, вы соглашаетесь с условиями настоящей политики. Если вы не согласны с какими-либо положениями, пожалуйста, прекратите использование приложения.',
];

const terms = [
  'Мы собираем данные, которые вы указываете при регистрации: имя, адрес электронной почты, номер телефона и дату рождения.',
  'Информация используется для записи на приём, напоминаний о визитах, улучшения работы сервиса и связи с вами по вопросам поддержки.',
  'Мы не продаём ваши данные третьим лицам. Передача сведений возможна только партнёрам, без которых работа сервиса невозможна, и только в необходимом объёме.',
  'Данные хранятся на защищённых серверах и передаются в зашифрованном виде. Доступ к ним имеют только уполномоченные сотрудники.',
  'Вы вправе в любой момент запросить копию своих данных, исправить их или удалить аккаунт в разделе «Настройки».',
  'Мы можем обновлять эту политику. О существенных изменениях мы сообщим в приложении заранее.',
];

export default function Privacy({ back }: ScreenProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={s.page}>
      <TopBar title="Политика конфиденциальности" onBack={back} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={s.root}
        contentContainerStyle={[s.scroll, { paddingBottom: bottom + 28 }]}
      >
        <Text style={s.date}>Последнее обновление: 9 ноября 2026</Text>

        {intro.map((p) => (
          <Text key={p} style={s.text}>
            {p}
          </Text>
        ))}

        <Text style={s.heading}>Условия использования</Text>

        {terms.map((p, i) => (
          <Text key={p} style={s.text}>
            {i + 1}. {p}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff' },
  root: { backgroundColor: '#fff' },
  scroll: { paddingHorizontal: 22, paddingTop: 20 },
  date: { fontSize: 11, color: soft.blue, marginBottom: 14 },
  heading: { fontSize: 16, fontWeight: '700', color: soft.blue, marginTop: 10, marginBottom: 12 },
  text: { fontSize: 12, lineHeight: 19, color: soft.text, marginBottom: 12 },
});
