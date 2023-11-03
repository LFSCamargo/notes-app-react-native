import { createMachine } from 'xstate';
import { XStatePersist, generateUUID } from '../helpers';

type Note = {
  id: string;
  title: string;
  content?: string;
  color: string;
  createdAt: Date;
};

type NotesMachineContext = {
  notes: Note[];
};

type NotesMachineEvent =
  | { type: 'DELETE_NOTE'; id: string }
  | { type: 'CLEAR_NOTES' }
  | { type: 'UPDATE_NOTE_CONTENT'; id: string; content: string }
  | { type: 'UPDATE_NOTE_META'; id: string; title: string; color: string }
  | { type: 'CREATE_NOTE'; title: string; color: string };

type NotesMachineServices = {
  hydrateContextFromStorage: {
    data: Note[];
  };
};

const colors = [
  '#ef4444',
  '#3b82f6',
  '#14b8a6',
  '#22c55e',
  '#eab308',
  '#6366f1',
  '#8b5cf6',
  '#6366f1',
  '#e11d48',
];

export const notesMachine = createMachine(
  {
    tsTypes: {} as import('./notes.machine.typegen').Typegen0,
    schema: {
      context: {} as NotesMachineContext,
      events: {} as NotesMachineEvent,
      services: {} as NotesMachineServices,
    },
    id: 'notes',
    initial: 'loading',
    context: {
      notes: [],
    },
    states: {
      loading: {
        invoke: {
          src: 'hydrateContextFromStorage',
          onDone: {
            target: 'idle',
            actions: 'setNotes',
          },
          onError: 'idle',
        },
      },
      idle: {
        on: {
          DELETE_NOTE: {
            actions: 'deleteNote',
          },
          UPDATE_NOTE_CONTENT: {
            actions: 'updateNote',
          },
          UPDATE_NOTE_META: {
            actions: 'updateNoteMeta',
          },
          CREATE_NOTE: {
            actions: 'createNote',
          },
          CLEAR_NOTES: {
            actions: 'clearNotes',
          },
        },
      },
    },
  },
  {
    actions: {
      clearNotes: (ctx) => {
        ctx.notes = [];
        XStatePersist.persistState(ctx.notes, 'notes');
      },
      setNotes: (ctx, event) => {
        ctx.notes = event.data;
      },
      deleteNote: (ctx, event) => {
        const { id } = event;
        ctx.notes = ctx.notes.filter((note) => note.id !== id);
        XStatePersist.persistState(ctx.notes, 'notes');
      },
      updateNoteMeta: (ctx, event) => {
        const { id, title, color } = event;
        ctx.notes = ctx.notes.map((note) => {
          if (note.id === id) {
            return {
              ...note,
              title,
              color,
            };
          }
          return note;
        });
        XStatePersist.persistState(ctx.notes, 'notes');
      },
      updateNote: (ctx, event) => {
        const { id, content } = event;
        ctx.notes = ctx.notes.map((note) => {
          if (note.id === id) {
            return {
              ...note,
              content,
            };
          }
          return note;
        });
        XStatePersist.persistState(ctx.notes, 'notes');
      },
      createNote: (ctx, event) => {
        const newNote: Note = {
          id: generateUUID(),
          title: 'Untitled Note',
          color: colors[Math.floor(Math.random() * colors.length)],
          createdAt: new Date(),
        };
        ctx.notes = [...ctx.notes, newNote];
        XStatePersist.persistState(ctx.notes, 'notes');
      },
    },
    services: {
      async hydrateContextFromStorage() {
        const recoverHydratedState = await XStatePersist.getStateForHydration<
          Note[]
        >('notes', []);
        return recoverHydratedState;
      },
    },
  },
);
