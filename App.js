import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from './router';

const fonts = async () => {
  await Font.loadAsync({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });
}

export default function App() {
  const routing = useRoute(null);

  if (!fonts) {
    return null;
  }

  return (
    <NavigationContainer style={styles.nav}>
      {routing}
    </NavigationContainer>
  );
}