import { StyleSheet, Text, View } from 'react-native';
import Tabs from './navigation/tabs';
import {NavigationContainer} from '@react-navigation/native'
import * as SystemUI from 'expo-system-ui';
import { CardContextProvider } from './components/Context';
SystemUI.setBackgroundColorAsync('white')

export default function App() {
  return (
    <CardContextProvider>
      <NavigationContainer>
          <Tabs/>
      </NavigationContainer>
    </CardContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
