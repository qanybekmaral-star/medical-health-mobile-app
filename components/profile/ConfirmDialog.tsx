import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { soft } from './SoftField';

type Props = {
  visible: boolean;
  title: string;
  text: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmDialog({ visible, title, text, confirmLabel, onCancel, onConfirm }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={s.overlay}>
        <View style={s.dialog}>
          <Text style={s.title}>{title}</Text>
          <Text style={s.text}>{text}</Text>
          <View style={s.actions}>
            <Pressable style={[s.btn, s.outline]} onPress={onCancel}>
              <Text style={[s.label, { color: soft.blue }]}>Отмена</Text>
            </Pressable>
            <Pressable style={[s.btn, s.solid]} onPress={onConfirm}>
              <Text style={[s.label, { color: '#fff' }]}>{confirmLabel}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  dialog: { width: '100%', backgroundColor: '#fff', borderRadius: 20, padding: 22 },
  title: { textAlign: 'center', fontSize: 16, fontWeight: '700', color: soft.text },
  text: { textAlign: 'center', fontSize: 12, lineHeight: 18, color: '#6B7388', marginTop: 8, marginBottom: 20 },
  actions: { flexDirection: 'row', gap: 10 },
  btn: { flex: 1, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  outline: { borderWidth: 1, borderColor: soft.blue },
  solid: { backgroundColor: soft.blue },
  label: { fontSize: 14, fontWeight: '700' },
});
