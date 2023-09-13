import { View, StyleSheet } from 'react-native';
import InterestButton from '../buttons/buttonSelect';

function Preferences({navigation}) {
  return (
    <View style={styles.container}>
      <InterestButton title="Deportes" />
      <InterestButton title="Tecnología" />
      <InterestButton title="Viajes" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Preferences;
