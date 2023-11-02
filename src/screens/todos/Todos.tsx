import { Button, Text, View } from "react-native";
import { useRouter, useUser } from "../../hooks";

export function Todos() {
  const { userData, handlers } = useUser();
  const { reset } = useRouter();

  const handleExit = () => {
    handlers.logout();
    reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    })
  }

  return (
    <View className="flex flex-1 bg-white items-center justify-center">
      <Text className="text-2xl text-center text-black">{userData?.name}</Text>
      <Button title="Logout" onPress={handleExit} />
    </View>
  )
}