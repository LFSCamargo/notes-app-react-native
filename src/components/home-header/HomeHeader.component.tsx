import { useActionSheet } from '@expo/react-native-action-sheet';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { PlusIcon, Bars3BottomRightIcon } from 'react-native-heroicons/outline';
import { useGlobalMachines, useRouter, useUser } from '../../hooks';

type HomeHeaderProps = {
  handleAdd?: () => void;
};

export function HomeHeader({ handleAdd }: HomeHeaderProps) {
  const actionSheet = useActionSheet();
  const { userData, handlers } = useUser();
  const { reset } = useRouter();
  const { notes } = useGlobalMachines();

  function handleMenuOptions() {
    actionSheet.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Logout'],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          notes.send('CLEAR_NOTES');
          handlers.logout();
          reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
          });
        }
      },
    );
  }

  return (
    <View className="flex flex-col justify-between bg-blue-500 min-h-20 w-full absolute top-0 left-0 right-0">
      <StatusBar translucent barStyle={'light-content'} />
      <SafeAreaView />
      <View className="flex flex-row w-full items-center px-4 py-4 justify-between">
        <View className="flex flex-row items-center gap-2">
          <View className=" w-10 h-10 bg-blue-800 rounded-full items-center justify-center">
            <Text className="text-white">
              {userData?.name[0].toUpperCase()}
            </Text>
          </View>
          <View className="flex flex-col">
            <Text className="text-sm text-white">Hey {userData?.name}</Text>
            <Text className="text-white">Welcome to your notes!</Text>
          </View>
        </View>
        <View className="flex flex-row gap-2">
          <TouchableOpacity
            onPress={handleAdd}
            className="w-10 h-10 items-center justify-center flex">
            <PlusIcon size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleMenuOptions}
            className="w-10 h-10 items-center justify-center flex">
            <Bars3BottomRightIcon size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
