import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { soft } from './SoftField';
import type { IconName } from './types';

const items: { icon: IconName; active?: boolean }[] = [
  { icon: 'home-outline' },
  { icon: 'chatbubble-outline' },
  { icon: 'person-outline', active: true },
  { icon: 'calendar-outline' },
];

export default function BottomNav() {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[s.nav, { bottom: bottom + 10 }]}>
      {items.map((item) => (
        <View key={item.icon} style={[s.item, item.active && s.active]}>
          <Ionicons name={item.icon} size={21} color="#fff" />
        </View>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  nav: {
    position: 'absolute',
    left: 16,
    right: 16,
    height: 54,
    borderRadius: 27,
    backgroundColor: soft.blue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  item: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  active: { backgroundColor: 'rgba(255,255,255,0.22)' },
});
