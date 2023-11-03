import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Welcome, Notes, Note } from './screens';
import { useUser } from './hooks';
import { ActivityIndicator, View } from 'react-native';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export function Router() {
  const { isLoading, userData } = useUser();

  if (isLoading) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={!userData ? 'Welcome' : 'Notes'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Notes" component={Notes} />
        <Stack.Screen name="Note" component={Note} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
