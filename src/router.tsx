import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Welcome, Todos } from "./screens";
import { useUser } from "./hooks";
import { ActivityIndicator, View } from "react-native";
import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

export function Router() {
  const { isLoading, userData } = useUser();

  if (isLoading) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    )
  }
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={!userData ? 'Welcome' : 'Todos'} screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Todos" component={Todos} />
      </Stack.Navigator>
    </NavigationContainer>
  )  
}