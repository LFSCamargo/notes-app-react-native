import { SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";

export function Welcome() {
  return (
    <SafeAreaView className="bg-blue-500 flex-1 items-start justify-end">
      <StatusBar translucent barStyle={'light-content'} />
      <View className="w-full flex-[0.4] px-3 pb-3">
      <View className="flex bg-white h-full rounded-xl p-4  w-full items-start justify-end">
        <Text className="text-lg -tracking-wider">Your offline note taking app</Text>
        <Text className="text-3xl font-bold -tracking-widest">Welcome to Take Note</Text>
        <View className="flex w-full">
          <Text className="-tracking-wider mt-2 mb-2">Please enter your name to continue</Text>
          <TextInput className="border border-black border-dashed p-3 rounded-lg" placeholderTextColor="black" placeholder="John Doe" />
        </View>
        <TouchableOpacity className="bg-blue-500 mt-8 p-3 rounded-lg w-full">
          <Text className="text-white text-lg leading-5 text-center">Enter the app</Text>
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  )
}