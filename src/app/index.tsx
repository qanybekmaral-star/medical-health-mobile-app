import { StyleSheet, View } from 'react-native';
import ProfileScreen from '../screens/profileScreen';

export default function Page() {
  return (
    <View style={styles.container}>
      <ProfileScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});