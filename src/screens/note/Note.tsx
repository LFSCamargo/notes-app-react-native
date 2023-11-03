import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';
import { NoteHeader } from '../../components/note-header/NoteHeader.component';
import { useNote, useRouter } from '../../hooks';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

export function Note() {
  const { params } = useRoute<RouteProp<RootStackParamList>>();
  const { note, handlers, colors } = useNote(params?.id as string);
  const { goBack } = useRouter();
  const { top } = useSafeAreaInsets();

  const [noteTitle, setNoteTitle] = useState(note?.title);
  const [noteContent, setNoteContent] = useState(note?.content || '');

  function deleteNote() {
    handlers.deleteNoteById();
    goBack();
  }

  function changeNoteColor(color: string) {
    handlers.updateNoteMeta({
      color,
    });
  }

  const debouncedUpdateNoteContent = useDebouncedCallback((content: string) => {
    handlers.updateNoteContent(content);
  }, 1000);

  function updateNoteContent(content: string) {
    setNoteContent(content);
    debouncedUpdateNoteContent(content);
  }

  const debouncedUpdateNoteTitle = useDebouncedCallback((title: string) => {
    handlers.updateNoteMeta({
      title,
    });
  }, 1000);

  function updateNoteTitle(title: string) {
    setNoteTitle(title);
    debouncedUpdateNoteTitle(title);
  }

  return (
    <View
      className="flex flex-1 bg-blue-50"
      style={{
        paddingTop: top + 80,
      }}>
      <NoteHeader handleRemove={deleteNote} note={note} />
      <ScrollView className="flex flex-1 p-5">
        <TextInput
          className="text-2xl font-bold text-black"
          value={noteTitle}
          onChangeText={updateNoteTitle}
        />
        <TextInput
          numberOfLines={Infinity}
          multiline
          className="text-xl flex-1 h-full mt-2 text-black"
          value={noteContent}
          onChangeText={updateNoteContent}
          placeholder="Enter your note content here..."
          placeholderTextColor="black"
        />
      </ScrollView>
      <View className="flex w-full pb-10 px-4 pt-4 border-t border-t-neutral-200">
        <Text className="mb-4 opacity-50">Change Note Color</Text>
        <View className="flex flex-row gap-3 w-full">
          {colors.map((color) => (
            <TouchableOpacity
              onPress={() => changeNoteColor(color)}
              style={{ backgroundColor: color }}
              className="w-10 rounded-lg h-10"
            />
          ))}
        </View>
      </View>
    </View>
  );
}
