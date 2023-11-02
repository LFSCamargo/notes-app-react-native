import 'react-native-gesture-handler';
import { Router } from "./src/router";
import { MachinesProvider } from './src/context'
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <MachinesProvider>
      <StatusBar translucent barStyle={'default'} />
      <Router />
    </MachinesProvider>
  )
}