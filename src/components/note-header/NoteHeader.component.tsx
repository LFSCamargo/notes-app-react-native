import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNote, useRouter } from '../../hooks';
import { ArrowUturnLeftIcon, TrashIcon } from 'react-native-heroicons/outline';

type NoteHeaderProps = {
  note?: NonNullable<ReturnType<typeof useNote>['note']>;
  handleRemove?: (id: string) => void;
};

export function NoteHeader({ note, handleRemove = () => {} }: NoteHeaderProps) {
  const { goBack } = useRouter();

  return (
    <View
      className="flex flex-col justify-between min-h-20 w-full absolute top-0 left-0 right-0"
      style={{
        backgroundColor: note?.color,
      }}>
      <StatusBar translucent barStyle={'light-content'} />
      <SafeAreaView />
      <View className="flex flex-row w-full items-center px-4 py-4 justify-between">
        <View className="flex flex-row items-center gap-2">
          <TouchableOpacity
            onPress={goBack}
            className="w-10 h-10 items-center justify-center flex">
            <ArrowUturnLeftIcon size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-xl -tracking-widest text-white">
            {note?.title}
          </Text>
        </View>

        <View className="flex flex-row gap-2">
          <TouchableOpacity
            onPress={() => handleRemove(note?.id as string)}
            className="w-10 h-10 items-center justify-center flex">
            <TrashIcon size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
