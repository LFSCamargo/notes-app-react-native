import { useSelector } from '@xstate/react';
import { useGlobalMachines } from './globalMachines.hook';
import { useRouter } from './router.hook';

export function useNotes() {
  const { notes: machine } = useGlobalMachines();

  const isLoading = useSelector(machine, (state) => state.matches('loading'));

  const notes = useSelector(machine, (state) => state.context.notes);

  function createNote() {
    machine.send('CREATE_NOTE');
  }

  function clearNotes() {
    machine.send('CLEAR_NOTES');
  }

  function deleteNoteById(id: string) {
    machine.send('DELETE_NOTE', {
      id,
    });
  }

  return {
    colors: [
      '#ef4444',
      '#3b82f6',
      '#14b8a6',
      '#22c55e',
      '#eab308',
      '#6366f1',
      '#e11d48',
    ],
    isLoading,
    notes,
    handlers: {
      createNote,
      deleteNoteById,
      clearNotes,
    },
  };
}
