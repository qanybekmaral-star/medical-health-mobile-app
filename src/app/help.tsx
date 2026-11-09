import { StyleSheet, View } from 'react-native';
import HelpCenterScreen from '../screens/helpCenterScreen';

export default function HelpPage() {
  return (
    <View style={styles.container}>
      <HelpCenterScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});