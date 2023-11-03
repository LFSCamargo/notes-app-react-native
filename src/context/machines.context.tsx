import { createContext, useContext } from 'react';
import { InterpreterFrom } from 'xstate';
import { userMachine, notesMachine } from '../machines';
import { useInterpret } from '@xstate/react';
import { xstateLogger } from 'xstate-logger';

export const MachinesContext = createContext(
  {} as {
    user: InterpreterFrom<typeof userMachine>;
    notes: InterpreterFrom<typeof notesMachine>;
  },
);

export function MachinesProvider({ children }: { children: React.ReactNode }) {
  const user = useInterpret(userMachine)
    .start()
    .onTransition((state) => xstateLogger(state as any));
  const notes = useInterpret(notesMachine)
    .start()
    .onTransition((state) => xstateLogger(state as any));

  return (
    <MachinesContext.Provider value={{ user, notes }}>
      {children}
    </MachinesContext.Provider>
  );
}
