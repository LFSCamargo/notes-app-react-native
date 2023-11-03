import { useSelector } from '@xstate/react';
import { useGlobalMachines } from './globalMachines.hook';
import { useNotes } from './notes.hook';

export function useNote(id: string) {
  const { notes } = useGlobalMachines();
  const { colors } = useNotes();

  const note = useSelector(notes, (state) => {
    return state.context.notes.find((note) => note.id === id);
  });

  function updateNoteContent(content: string) {
    notes.send('UPDATE_NOTE_CONTENT', {
      id,
      content,
    });
  }

  function updateNoteMeta(payload: { color?: string; title?: string }) {
    notes.send('UPDATE_NOTE_META', {
      id,
      title: payload.title || note?.title,
      color: payload.color || note?.color,
    });
  }

  function deleteNoteById() {
    notes.send('DELETE_NOTE', {
      id,
    });
  }

  return {
    note,
    colors,
    handlers: {
      updateNoteContent,
      updateNoteMeta,
      deleteNoteById,
    },
  };
}
