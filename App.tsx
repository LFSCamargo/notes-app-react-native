import 'react-native-gesture-handler';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Router } from './src/router';
import { MachinesProvider } from './src/context';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <ActionSheetProvider>
      <MachinesProvider>
        <StatusBar translucent barStyle={'default'} />
        <Router />
      </MachinesProvider>
    </ActionSheetProvider>
  );
}
