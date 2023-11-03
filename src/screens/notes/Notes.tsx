import classNames from 'classnames';
import { Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from '../../hooks';
import { HomeHeader } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import { useNotes } from '../../hooks/notes.hook';
import { PencilSquareIcon } from 'react-native-heroicons/outline';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Notes() {
  const { top } = useSafeAreaInsets();
  const { notes, handlers } = useNotes();
  const { navigate } = useRouter();

  function addNote() {
    handlers.createNote();
  }

  function goToNote(id: string) {
    navigate('Note', { id });
  }

  return (
    <View
      className="flex flex-1 bg-blue-50"
      style={{
        paddingTop: top + 80,
      }}>
      <HomeHeader handleAdd={addNote} />
      {notes.length === 0 && (
        <View className="flex flex-1 gap-2 flex-col items-center justify-center">
          <PencilSquareIcon size={24} color="black" />
          <Text className="text-sm">You have no notes created</Text>
          <Text>Create one by pressing the add button</Text>
        </View>
      )}
      {notes.length > 0 && (
        <ScrollView className="px-4 py-4 flex-col">
          {notes.map((e, i) => (
            <TouchableOpacity
              key={e.id}
              onPress={() => goToNote(e.id)}
              className={classNames('w-full p-4 my-1 rounded-xl')}
              style={{
                backgroundColor: e.color,
              }}>
              <Text className="text-white font-bold text-start text-2xl">
                {e.title}
              </Text>
              {e.content && (
                <Text className="text-white text-start text-lg">
                  {e.content}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
